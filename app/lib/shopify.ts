export type ShopifyRevenuePoint = {
  date: string; // YYYY-MM-DD (UTC)
  revenue: number;
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

/**
 * Fetch aggregated Shopify revenue per day for the last `days` days.
 *
 * Uses the Admin REST Orders API:
 *   /admin/api/2024-01/orders.json
 *
 * The caller is responsible for passing a valid `shopUrl` and `accessToken`.
 */
export async function fetchShopifyRevenue(
  shopUrl: string,
  accessToken: string,
  days: number = 30,
): Promise<ShopifyRevenuePoint[]> {
  if (!shopUrl || !accessToken) {
    return [];
  }

  const baseUrl = normaliseShopUrl(shopUrl);

  const createdAtMin = new Date();
  createdAtMin.setUTCDate(createdAtMin.getUTCDate() - days);

  const params = new URLSearchParams({
    status: "any",
    created_at_min: createdAtMin.toISOString(),
    fields: "created_at,total_price,current_total_price",
    limit: "250",
  });

  const url = `${baseUrl}/admin/api/2024-01/orders.json?${params.toString()}`;

  const res = await fetch(url, {
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

  const json: any = await res.json();
  const orders: any[] = Array.isArray(json?.orders) ? json.orders : [];

  const byDate = new Map<string, number>();

  for (const order of orders) {
    const createdAt: string | undefined = order?.created_at;
    if (!createdAt) continue;

    const dt = new Date(createdAt);
    if (Number.isNaN(dt.getTime())) continue;

    const dateKey = dt.toISOString().slice(0, 10);
    const raw =
      typeof order?.current_total_price === "string"
        ? order.current_total_price
        : typeof order?.total_price === "string"
          ? order.total_price
          : "0";
    const value = Number.parseFloat(raw) || 0;
    if (value <= 0) continue;

    byDate.set(dateKey, (byDate.get(dateKey) ?? 0) + value);
  }

  const dates = lastNDatesUTC(days);
  return dates.map((date) => ({
    date,
    revenue: byDate.get(date) ?? 0,
  }));
}

