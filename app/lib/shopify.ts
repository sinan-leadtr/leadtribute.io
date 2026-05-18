export type ShopifyRevenuePoint = {
  date: string; // YYYY-MM-DD (UTC)
  revenue: number;
};

export type ShopifyOrderRow = {
  id: string;
  revenue: number;
  occurredAt: string;
  landingSite: string | null;
  referringSite: string | null;
};

function lastNDatesUTC(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(
      Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() - i,
      ),
    );
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

function normaliseShopUrl(shopUrl: string): string {
  const trimmed = shopUrl.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return withProtocol.replace(/\/+$/, "");
}

function parseNextLink(linkHeader: string | null): string | null {
  if (!linkHeader) return null;
  const parts = linkHeader.split(",");
  for (const part of parts) {
    const match = part.match(/<([^>]+)>;\s*rel="next"/);
    if (match) return match[1];
  }
  return null;
}

async function fetchShopifyOrdersRaw(
  shopUrl: string,
  accessToken: string,
  days: number,
): Promise<ShopifyOrderRow[]> {
  if (!shopUrl || !accessToken) return [];

  const baseUrl = normaliseShopUrl(shopUrl);
  const createdAtMin = new Date();
  createdAtMin.setUTCDate(createdAtMin.getUTCDate() - days);

  const params = new URLSearchParams({
    status: "any",
    created_at_min: createdAtMin.toISOString(),
    fields:
      "id,created_at,total_price,current_total_price,landing_site,referring_site",
    limit: "250",
  });

  let nextUrl: string | null =
    `${baseUrl}/admin/api/2024-01/orders.json?${params.toString()}`;
  const rows: ShopifyOrderRow[] = [];

  while (nextUrl) {
    const res = await fetch(nextUrl, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("Shopify orders fetch failed", {
        status: res.status,
        statusText: res.statusText,
        body,
      });
      throw new Error("Failed to fetch Shopify orders from Shopify API");
    }

    const json: { orders?: unknown[] } = await res.json();
    const orders = Array.isArray(json?.orders) ? json.orders : [];

    for (const order of orders) {
      const o = order as {
        id?: number | string;
        created_at?: string;
        current_total_price?: string;
        total_price?: string;
        landing_site?: string | null;
        referring_site?: string | null;
      };
      const createdAt = o?.created_at;
      if (!createdAt || o.id == null) continue;

      const raw =
        typeof o.current_total_price === "string"
          ? o.current_total_price
          : typeof o.total_price === "string"
            ? o.total_price
            : "0";
      const revenue = Number.parseFloat(raw) || 0;
      if (revenue <= 0) continue;

      rows.push({
        id: String(o.id),
        revenue,
        occurredAt: createdAt,
        landingSite: o.landing_site ?? null,
        referringSite: o.referring_site ?? null,
      });
    }

    nextUrl = parseNextLink(res.headers.get("link"));
  }

  return rows;
}

/** Fetch aggregated Shopify revenue per day for the last `days` days. */
export async function fetchShopifyRevenue(
  shopUrl: string,
  accessToken: string,
  days: number = 30,
): Promise<ShopifyRevenuePoint[]> {
  const orders = await fetchShopifyOrdersRaw(shopUrl, accessToken, days);
  const byDate = new Map<string, number>();
  for (const o of orders) {
    const dateKey = new Date(o.occurredAt).toISOString().slice(0, 10);
    byDate.set(dateKey, (byDate.get(dateKey) ?? 0) + o.revenue);
  }
  const dates = lastNDatesUTC(days);
  return dates.map((date) => ({
    date,
    revenue: byDate.get(date) ?? 0,
  }));
}

/** Orders with fields needed for multi-touch attribution. */
export async function fetchShopifyOrders(
  shopUrl: string,
  accessToken: string,
  days: number = 30,
): Promise<ShopifyOrderRow[]> {
  return fetchShopifyOrdersRaw(shopUrl, accessToken, days);
}
