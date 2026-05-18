import type { AdChannel } from "@/lib/commerce/platforms";

export type AttributionModelId =
  | "markov"
  | "last_click"
  | "first_click"
  | "linear"
  | "time_decay"
  | "u_shaped";

export type Journey = {
  conversionId: string;
  revenue: number;
  touches: { channel: AdChannel; occurredAt: string }[];
};

export type AttributionCredit = {
  channel: AdChannel;
  creditedRevenue: number;
  creditShare: number;
  orderCount: number;
};

function emptyCredits(channels: AdChannel[]): AttributionCredit[] {
  return channels.map((channel) => ({
    channel,
    creditedRevenue: 0,
    creditShare: 0,
    orderCount: 0,
  }));
}

function normalizeCredits(
  credits: Map<AdChannel, { revenue: number; orders: number }>,
  totalRevenue: number,
): AttributionCredit[] {
  const entries = [...credits.entries()];
  const denom = totalRevenue > 0 ? totalRevenue : 1;
  return entries.map(([channel, v]) => ({
    channel,
    creditedRevenue: Math.round(v.revenue * 100) / 100,
    creditShare: Math.round((v.revenue / denom) * 1000) / 1000,
    orderCount: v.orders,
  }));
}

export function attributeLastClick(journeys: Journey[]): AttributionCredit[] {
  const map = new Map<AdChannel, { revenue: number; orders: number }>();
  let total = 0;
  for (const j of journeys) {
    const last = j.touches[j.touches.length - 1]?.channel ?? "direct";
    const cur = map.get(last) ?? { revenue: 0, orders: 0 };
    cur.revenue += j.revenue;
    cur.orders += 1;
    map.set(last, cur);
    total += j.revenue;
  }
  return normalizeCredits(map, total);
}

export function attributeFirstClick(journeys: Journey[]): AttributionCredit[] {
  const map = new Map<AdChannel, { revenue: number; orders: number }>();
  let total = 0;
  for (const j of journeys) {
    const first = j.touches[0]?.channel ?? "direct";
    const cur = map.get(first) ?? { revenue: 0, orders: 0 };
    cur.revenue += j.revenue;
    cur.orders += 1;
    map.set(first, cur);
    total += j.revenue;
  }
  return normalizeCredits(map, total);
}

export function attributeLinear(journeys: Journey[]): AttributionCredit[] {
  const map = new Map<AdChannel, { revenue: number; orders: number }>();
  let total = 0;
  for (const j of journeys) {
    const unique = [...new Set(j.touches.map((t) => t.channel))];
    const share = j.revenue / Math.max(unique.length, 1);
    for (const ch of unique) {
      const cur = map.get(ch) ?? { revenue: 0, orders: 0 };
      cur.revenue += share;
      cur.orders += 1 / unique.length;
      map.set(ch, cur);
    }
    total += j.revenue;
  }
  return normalizeCredits(map, total);
}

/** Simplified Markov-style removal effect on channel transitions */
export function attributeMarkov(journeys: Journey[]): AttributionCredit[] {
  if (journeys.length === 0) return [];

  const channels = [
    ...new Set(journeys.flatMap((j) => j.touches.map((t) => t.channel))),
  ] as AdChannel[];

  if (channels.length === 0) return emptyCredits(["direct" as AdChannel]);

  const baseline = journeys.length;
  const scores = new Map<AdChannel, number>();

  for (const channel of channels) {
    const without = journeys.filter(
      (j) => !j.touches.some((t) => t.channel === channel),
    ).length;
    const removal = Math.max(0, baseline - without);
    scores.set(channel, removal);
  }

  const scoreSum = [...scores.values()].reduce((a, b) => a + b, 0) || 1;
  const map = new Map<AdChannel, { revenue: number; orders: number }>();
  let total = 0;

  for (const j of journeys) {
    total += j.revenue;
    for (const [channel, score] of scores) {
      const share = score / scoreSum;
      const portion = j.revenue * share;
      const cur = map.get(channel) ?? { revenue: 0, orders: 0 };
      cur.revenue += portion;
      cur.orders += share;
      map.set(channel, cur);
    }
  }

  return normalizeCredits(map, total);
}

export function computeAttribution(
  model: AttributionModelId,
  journeys: Journey[],
): AttributionCredit[] {
  switch (model) {
    case "markov":
      return attributeMarkov(journeys);
    case "first_click":
      return attributeFirstClick(journeys);
    case "linear":
      return attributeLinear(journeys);
    case "last_click":
    default:
      return attributeLastClick(journeys);
  }
}
