import type { AdChannel } from "@/lib/commerce/platforms";

const SOURCE_MAP: Record<string, AdChannel> = {
  facebook: "meta",
  fb: "meta",
  instagram: "meta",
  meta: "meta",
  google: "google",
  goog: "google",
  gclid: "google",
  tiktok: "tiktok",
  klaviyo: "email",
  email: "email",
  newsletter: "email",
};

export function channelFromUrl(url: string | null | undefined): AdChannel {
  if (!url) return "direct";

  try {
    const parsed = new URL(url.startsWith("http") ? url : `https://${url}`);
    const host = parsed.hostname.toLowerCase();
    const params = parsed.searchParams;

    const utmSource = (params.get("utm_source") ?? "").toLowerCase();
    if (utmSource && SOURCE_MAP[utmSource]) return SOURCE_MAP[utmSource];

    if (params.has("gclid")) return "google";
    if (params.has("fbclid")) return "meta";
    if (params.has("ttclid")) return "tiktok";

    if (host.includes("facebook") || host.includes("instagram")) return "meta";
    if (host.includes("google.")) return "google";
    if (host.includes("tiktok")) return "tiktok";
    if (host.includes("klaviyo")) return "email";

    if (host && !host.includes("myshopify") && !host.includes("localhost")) {
      return "organic";
    }
  } catch {
    return "direct";
  }

  return "direct";
}

export function touchpointsFromOrderContext(input: {
  landingSite?: string | null;
  referringSite?: string | null;
  occurredAt: string;
}): { channel: AdChannel; touchType: string; occurredAt: string }[] {
  const touches: { channel: AdChannel; touchType: string; occurredAt: string }[] = [];
  const baseTime = new Date(input.occurredAt).getTime();

  if (input.referringSite) {
    touches.push({
      channel: channelFromUrl(input.referringSite),
      touchType: "click",
      occurredAt: new Date(baseTime - 2 * 60 * 60 * 1000).toISOString(),
    });
  }

  if (input.landingSite) {
    touches.push({
      channel: channelFromUrl(input.landingSite),
      touchType: touches.length > 0 ? "view" : "click",
      occurredAt: new Date(baseTime - 30 * 60 * 1000).toISOString(),
    });
  }

  if (touches.length === 0) {
    touches.push({
      channel: "direct",
      touchType: "direct",
      occurredAt: input.occurredAt,
    });
  }

  return touches;
}
