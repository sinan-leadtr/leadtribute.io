"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { fetchShopifyRevenue } from "@/app/lib/shopify";

const DEMO_CAMPAIGNS = [
  { name: "Q1 Brand Awareness", platform: "meta" as const, status: "active" as const, spend: 4250, revenue: 17850 },
  { name: "Search - High Intent", platform: "google" as const, status: "active" as const, spend: 1890, revenue: 9639 },
  // Use only statuses allowed by the Supabase CHECK constraint ('active', 'paused')
  { name: "UGC Test - Gen Z", platform: "tiktok" as const, status: "active" as const, spend: 620, revenue: 868 },
  { name: "Retargeting - Cart Abandoners", platform: "meta" as const, status: "active" as const, spend: 2100, revenue: 8190 },
  { name: "Stories - Product Launch", platform: "meta" as const, status: "active" as const, spend: 1250, revenue: 3500 },
];

export type GenerateDemoDataResult = { ok: true } | { ok: false; error: string };

export async function generateDemoData(): Promise<GenerateDemoDataResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  const rows = DEMO_CAMPAIGNS.map((c) => ({
    user_id: user.id,
    name: c.name,
    platform: c.platform,
    status: c.status,
    spend: c.spend,
    revenue: c.revenue,
  }));

  const { error } = await supabase.from("campaigns").insert(rows);
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/dashboard");
  return { ok: true };
}

// --- Integrations ---
export type Integration = {
  id: string;
  platform: string;
  status: string;
  connected_at: string;
};

export type ConnectIntegrationResult = { ok: true } | { ok: false; error: string };
export type DisconnectIntegrationResult = { ok: true } | { ok: false; error: string };

export async function connectIntegration(platform: "google" | "meta"): Promise<ConnectIntegrationResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  // Simulated connection delay (1–2s) so loading spinner is visible
  await new Promise((r) => setTimeout(r, 1500));

  const { error } = await supabase.from("integrations").upsert(
    { user_id: user.id, platform, status: "active", connected_at: new Date().toISOString() },
    { onConflict: "user_id,platform" }
  );
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function disconnectIntegration(platform: "google" | "meta"): Promise<DisconnectIntegrationResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  const { error } = await supabase
    .from("integrations")
    .delete()
    .eq("user_id", user.id)
    .eq("platform", platform);
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/dashboard");
  return { ok: true };
}

// --- API Keys (Integrations credentials) ---
export type ApiKeyService = "meta" | "google" | "shopify" | "tiktok" | "klaviyo";

export type ApiKeyRow = {
  id: string;
  user_id: string;
  service: ApiKeyService;
  api_key: string | null;
  account_id: string | null;
  shop_url: string | null;
  created_at: string;
};

export type SaveApiKeysPayload = {
  api_key?: string;
  account_id?: string;
  shop_url?: string;
};

export type SaveApiKeysResult = { ok: true } | { ok: false; error: string };

export async function saveApiKeys(
  service: ApiKeyService,
  payload: SaveApiKeysPayload
): Promise<SaveApiKeysResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  const row = {
    user_id: user.id,
    service,
    api_key: payload.api_key?.trim() || null,
    account_id: payload.account_id?.trim() || null,
    shop_url: payload.shop_url?.trim() || null,
  };

  const { error } = await supabase.from("api_keys").upsert(row, {
    onConflict: "user_id,service",
  });
  if (error) {
    return { ok: false, error: error.message };
  }
  revalidatePath("/dashboard/integrations");
  return { ok: true };
}

// --- Analytics (daily aggregates) ---

export type AnalyticsDailyRow = {
  id: string;
  user_id: string;
  created_at: string;
  date: string;
  platform: "meta" | "google" | "shopify" | "tiktok" | "klaviyo" | "blended";
  spend: number;
  revenue: number;
  roas: number;
  impressions: number | null;
  clicks: number | null;
};

export type SyncDataResult = { ok: true } | { ok: false; error: string };

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function lastNDatesUTC(n: number): string[] {
  const dates: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    dates.push(d.toISOString().slice(0, 10));
  }
  return dates;
}

export async function syncData(): Promise<SyncDataResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  const { data: apiKeys, error: apiError } = await supabase
    .from("api_keys")
    .select("service, api_key, account_id, shop_url")
    .eq("user_id", user.id);

  if (apiError) {
    return { ok: false, error: apiError.message };
  }

  const keys = apiKeys ?? [];
  const hasMeta = keys.some((k) => k.service === "meta");
  const hasGoogle = keys.some((k) => k.service === "google");
  const shopifyKey = keys.find(
    (k) => k.service === "shopify" && k.shop_url && k.api_key,
  );
  const hasShopify = !!shopifyKey;

  if (!hasMeta && !hasGoogle && !hasShopify) {
    return { ok: false, error: "No connected integrations found. Connect Meta, Google or Shopify first." };
  }

  const dates = lastNDatesUTC(30);
  const rows: Omit<AnalyticsDailyRow, "id" | "created_at">[] = [];

  // Shopify: real revenue per day via Admin API
  let shopifyByDate: Record<string, number> = {};
  if (hasShopify && shopifyKey) {
    try {
      const data = await fetchShopifyRevenue(
        shopifyKey.shop_url as string,
        shopifyKey.api_key as string,
        30,
      );
      shopifyByDate = data.reduce<Record<string, number>>((acc, row) => {
        acc[row.date] = (acc[row.date] ?? 0) + row.revenue;
        return acc;
      }, {});
    } catch (error: any) {
      console.error("Failed to sync Shopify revenue", error);
      return {
        ok: false,
        error: "Shopify API request failed. Please check your credentials.",
      };
    }
  }

  dates.forEach((date, idx) => {
    let totalSpend = 0;
    let totalRevenue = 0;

    // Real Shopify revenue (no spend)
    const shopifyRevenue = shopifyByDate[date] ?? 0;
    if (hasShopify && shopifyRevenue > 0) {
      rows.push({
        user_id: user.id,
        date,
        platform: "shopify",
        spend: 0,
        revenue: shopifyRevenue,
        roas: 0,
        impressions: null,
        clicks: null,
      });
      totalRevenue += shopifyRevenue;
    }

    // Meta mock data: spend about 20–30% of its own revenue (ROAS ~ 3.3–4.5)
    if (hasMeta) {
      const spend = Math.round(randomInRange(80, 260) + idx * 1.5);
      const roas = Number(randomInRange(3.3, 4.5).toFixed(2));
      const revenue = Math.round(spend * roas);
      const impressions = Math.round(spend * randomInRange(80, 140));
      const clicks = Math.round(impressions * randomInRange(0.01, 0.03));

      rows.push({
        user_id: user.id,
        date,
        platform: "meta",
        spend,
        revenue,
        roas,
        impressions,
        clicks,
      });
      totalSpend += spend;
      totalRevenue += revenue;
    }

    // Google mock data: spend about 20–30% of its own revenue (ROAS ~ 3.3–4.5)
    if (hasGoogle) {
      const spend = Math.round(randomInRange(40, 180) + idx);
      const roas = Number(randomInRange(3.3, 4.5).toFixed(2));
      const revenue = Math.round(spend * roas);
      const impressions = Math.round(spend * randomInRange(90, 160));
      const clicks = Math.round(impressions * randomInRange(0.015, 0.035));

      rows.push({
        user_id: user.id,
        date,
        platform: "google",
        spend,
        revenue,
        roas,
        impressions,
        clicks,
      });
      totalSpend += spend;
      totalRevenue += revenue;
    }

    if (totalSpend > 0 || totalRevenue > 0) {
      rows.push({
        user_id: user.id,
        date,
        platform: "blended",
        spend: totalSpend,
        revenue: totalRevenue,
        roas: totalSpend > 0 ? Number((totalRevenue / totalSpend).toFixed(2)) : 0,
        impressions: null,
        clicks: null,
      });
    }
  });

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];

  // Clean out previous data for this user & date range to avoid duplicates
  const { error: deleteError } = await supabase
    .from("analytics_daily")
    .delete()
    .eq("user_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate);

  if (deleteError) {
    return { ok: false, error: deleteError.message };
  }

  if (rows.length > 0) {
    const { error: insertError } = await supabase
      .from("analytics_daily")
      .insert(rows);
    if (insertError) {
      return { ok: false, error: insertError.message };
    }
  }

  revalidatePath("/dashboard");
  return { ok: true };
}

export type ForecastResult =
  | { ok: true; forecastedRevenue: number; trendPercentage: number }
  | { ok: false; error: string };

export async function getForecast(): Promise<ForecastResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  const today = new Date();
  const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 29));
  const startDate = start.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("analytics_daily")
    .select("date, revenue")
    .eq("user_id", user.id)
    .eq("platform", "blended")
    .gte("date", startDate)
    .order("date", { ascending: true });

  if (error) {
    return { ok: false, error: error.message };
  }

  const rows = (data ?? []).map((r) => ({ date: r.date as string, revenue: Number(r.revenue ?? 0) }));
  if (rows.length === 0) {
    return { ok: true, forecastedRevenue: 0, trendPercentage: 0 };
  }
  if (rows.length === 1) {
    return { ok: true, forecastedRevenue: rows[0].revenue, trendPercentage: 0 };
  }

  const n = rows.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  rows.forEach((row, i) => {
    const x = i;
    const y = row.revenue;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
  });

  const denom = n * sumX2 - sumX * sumX;
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
  const intercept = n !== 0 ? (sumY - slope * sumX) / n : 0;

  const lastIdx = n - 1;
  const lastDate = new Date(rows[lastIdx].date + "T00:00:00Z");
  const endOfMonth = new Date(Date.UTC(lastDate.getUTCFullYear(), lastDate.getUTCMonth() + 1, 0));
  const diffDays = Math.max(
    0,
    Math.round((endOfMonth.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
  );

  const forecastIndex = lastIdx + diffDays;
  const forecastedRevenueRaw = slope * forecastIndex + intercept;
  const forecastedRevenue = Number(Math.max(0, forecastedRevenueRaw).toFixed(0));

  const firstRev = rows[0].revenue;
  const lastRev = rows[lastIdx].revenue;
  const trendPercentage =
    firstRev > 0 ? Number((((lastRev - firstRev) / firstRev) * 100).toFixed(1)) : 0;

  return { ok: true, forecastedRevenue, trendPercentage };
}
