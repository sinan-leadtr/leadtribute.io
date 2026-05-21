"use server";

import { createClient } from "@/lib/supabase/server";
import { getUserPlanState } from "@/lib/plans/get-user-plan";
import { revalidatePath } from "next/cache";
import { fetchShopifyOrders, fetchShopifyRevenue } from "@/app/lib/shopify";
import { touchpointsFromOrderContext } from "@/lib/attribution/utm";
import {
  computeAttribution,
  type AttributionModelId,
  type Journey,
} from "@/lib/attribution/models";
import {
  adsErrorMessage,
  fetchGoogleDailyInsights,
  fetchMetaDailyInsights,
  metricsByDate,
} from "@/lib/ads";

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
  return {
    ok: false,
    error: `Connect ${platform === "meta" ? "Meta" : "Google"} Ads under Data Sources → Integrations (access token + account ID).`,
  };
}

export async function disconnectIntegration(platform: "google" | "meta"): Promise<DisconnectIntegrationResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  const { error: integrationError } = await supabase
    .from("integrations")
    .delete()
    .eq("user_id", user.id)
    .eq("platform", platform);

  const { error: keyError } = await supabase
    .from("api_keys")
    .delete()
    .eq("user_id", user.id)
    .eq("service", platform);

  if (integrationError) {
    return { ok: false, error: integrationError.message };
  }
  if (keyError) {
    return { ok: false, error: keyError.message };
  }
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/integrations");
  return { ok: true };
}

async function upsertAdIntegrationRecord(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  platform: "google" | "meta",
) {
  await supabase.from("integrations").upsert(
    {
      user_id: userId,
      platform,
      status: "active",
      connected_at: new Date().toISOString(),
    },
    { onConflict: "user_id,platform" },
  );
}

// --- API Keys (Integrations credentials) ---
export type ApiKeyService =
  | "meta"
  | "google"
  | "shopify"
  | "woocommerce"
  | "bigcommerce"
  | "magento"
  | "wix"
  | "tiktok"
  | "klaviyo";

export type CommercePlatformId =
  | "shopify"
  | "woocommerce"
  | "bigcommerce"
  | "magento"
  | "wix"
  | "squarespace"
  | "shopware"
  | "prestashop"
  | "custom";

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

  const planState = await getUserPlanState();
  const maxIntegrations = planState?.entitlements.maxIntegrations ?? 3;

  const { data: existingKeys } = await supabase
    .from("api_keys")
    .select("service")
    .eq("user_id", user.id);

  const services = (existingKeys ?? []).map((r) => r.service as string);
  const isNew = !services.includes(service);
  if (isNew && services.length >= maxIntegrations) {
    return {
      ok: false,
      error: `Starter plan allows up to ${maxIntegrations} connections. Upgrade to Pro for more.`,
    };
  }

  let apiKey = payload.api_key?.trim() || null;
  const accountId = payload.account_id?.trim() || null;
  const shopUrl = payload.shop_url?.trim() || null;

  if ((service === "meta" || service === "google") && !apiKey) {
    const { data: existing } = await supabase
      .from("api_keys")
      .select("api_key")
      .eq("user_id", user.id)
      .eq("service", service)
      .maybeSingle();
    apiKey = existing?.api_key ?? null;
  }

  if (service === "meta") {
    if (!apiKey || !accountId) {
      return { ok: false, error: "Meta requires an access token and ad account ID." };
    }
  }

  if (service === "google") {
    if (!apiKey || !accountId) {
      return {
        ok: false,
        error: "Google Ads requires an OAuth refresh token and customer ID.",
      };
    }
    if (!process.env.GOOGLE_ADS_DEVELOPER_TOKEN?.trim()) {
      return {
        ok: false,
        error: "Server missing GOOGLE_ADS_DEVELOPER_TOKEN. Add it in Vercel environment variables.",
      };
    }
  }

  const row = {
    user_id: user.id,
    service,
    api_key: apiKey,
    account_id: accountId,
    shop_url: shopUrl,
  };

  const { error } = await supabase.from("api_keys").upsert(row, {
    onConflict: "user_id,service",
  });
  if (error) {
    return { ok: false, error: error.message };
  }

  if (service === "meta" || service === "google") {
    await upsertAdIntegrationRecord(supabase, user.id, service);
  }

  revalidatePath("/dashboard/integrations");
  revalidatePath("/dashboard");
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

  const planState = await getUserPlanState();
  const historyDays = planState?.entitlements.historyDays ?? 30;
  const canRunMarkov = planState?.entitlements.markovAttribution ?? false;

  const { data: apiKeys, error: apiError } = await supabase
    .from("api_keys")
    .select("service, api_key, account_id, shop_url")
    .eq("user_id", user.id);

  if (apiError) {
    return { ok: false, error: apiError.message };
  }

  const keys = apiKeys ?? [];
  const metaKey = keys.find(
    (k) => k.service === "meta" && k.api_key && k.account_id,
  );
  const googleKey = keys.find(
    (k) => k.service === "google" && k.api_key && k.account_id,
  );
  const shopifyKey = keys.find(
    (k) => k.service === "shopify" && k.shop_url && k.api_key,
  );
  const hasMeta = !!metaKey;
  const hasGoogle = !!googleKey;
  const hasShopify = !!shopifyKey;

  if (!hasMeta && !hasGoogle && !hasShopify) {
    return {
      ok: false,
      error:
        "No connected integrations found. Add credentials under Dashboard → Data Sources → Integrations.",
    };
  }

  const dates = lastNDatesUTC(historyDays);
  const startDate = dates[0];
  const endDate = dates[dates.length - 1];
  const rows: Omit<AnalyticsDailyRow, "id" | "created_at">[] = [];

  let shopifyByDate: Record<string, number> = {};
  if (hasShopify && shopifyKey) {
    try {
      const data = await fetchShopifyRevenue(
        shopifyKey.shop_url as string,
        shopifyKey.api_key as string,
        historyDays,
      );
      shopifyByDate = data.reduce<Record<string, number>>((acc, row) => {
        acc[row.date] = (acc[row.date] ?? 0) + row.revenue;
        return acc;
      }, {});
    } catch (error: unknown) {
      console.error("Failed to sync Shopify revenue", error);
      return {
        ok: false,
        error: "Shopify API request failed. Please check your credentials.",
      };
    }
  }

  let metaByDate: Record<string, { spend: number; impressions: number; clicks: number }> = {};
  if (hasMeta && metaKey) {
    try {
      const metaRows = await fetchMetaDailyInsights(
        {
          accessToken: metaKey.api_key as string,
          adAccountId: metaKey.account_id as string,
        },
        startDate,
        endDate,
      );
      metaByDate = metricsByDate(metaRows);
      await upsertAdIntegrationRecord(supabase, user.id, "meta");
    } catch (error: unknown) {
      console.error("Failed to sync Meta Ads", error);
      return { ok: false, error: adsErrorMessage(error, "meta") };
    }
  }

  let googleByDate: Record<string, { spend: number; impressions: number; clicks: number }> = {};
  if (hasGoogle && googleKey) {
    try {
      const googleRows = await fetchGoogleDailyInsights(
        {
          refreshOrAccessToken: googleKey.api_key as string,
          customerId: googleKey.account_id as string,
        },
        startDate,
        endDate,
      );
      googleByDate = metricsByDate(googleRows);
      await upsertAdIntegrationRecord(supabase, user.id, "google");
    } catch (error: unknown) {
      console.error("Failed to sync Google Ads", error);
      return { ok: false, error: adsErrorMessage(error, "google") };
    }
  }

  for (const date of dates) {
    let totalSpend = 0;
    let totalRevenue = 0;

    const shopifyRevenue = shopifyByDate[date] ?? 0;

    if (hasShopify) {
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

    if (hasMeta) {
      const metric = metaByDate[date];
      const spend = metric?.spend ?? 0;
      const impressions = metric?.impressions ?? 0;
      const clicks = metric?.clicks ?? 0;
      rows.push({
        user_id: user.id,
        date,
        platform: "meta",
        spend,
        revenue: 0,
        roas: 0,
        impressions,
        clicks,
      });
      totalSpend += spend;
    }

    if (hasGoogle) {
      const metric = googleByDate[date];
      const spend = metric?.spend ?? 0;
      const impressions = metric?.impressions ?? 0;
      const clicks = metric?.clicks ?? 0;
      rows.push({
        user_id: user.id,
        date,
        platform: "google",
        spend,
        revenue: 0,
        roas: 0,
        impressions,
        clicks,
      });
      totalSpend += spend;
    }

    if (hasShopify || hasMeta || hasGoogle) {
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
  }

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

  if (hasShopify && shopifyKey && canRunMarkov) {
    const attrResult = await syncShopifyConversionsAndAttribution(
      supabase,
      user.id,
      shopifyKey.shop_url as string,
      shopifyKey.api_key as string,
      startDate,
      endDate,
    );
    if (!attrResult.ok) {
      return attrResult;
    }
  }

  revalidatePath("/dashboard");
  return { ok: true };
}

async function syncShopifyConversionsAndAttribution(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string,
  shopUrl: string,
  accessToken: string,
  periodStart: string,
  periodEnd: string,
): Promise<SyncDataResult> {
  try {
    const orders = await fetchShopifyOrders(shopUrl, accessToken, 30);

    await supabase
      .from("conversion_events")
      .delete()
      .eq("user_id", userId)
      .eq("commerce_platform", "shopify")
      .gte("occurred_at", `${periodStart}T00:00:00Z`)
      .lte("occurred_at", `${periodEnd}T23:59:59Z`);

    await supabase
      .from("marketing_touchpoints")
      .delete()
      .eq("user_id", userId)
      .gte("occurred_at", `${periodStart}T00:00:00Z`)
      .lte("occurred_at", `${periodEnd}T23:59:59Z`);

    const journeys: Journey[] = [];

    for (const order of orders) {
      const { data: conversion, error: convError } = await supabase
        .from("conversion_events")
        .upsert(
          {
            user_id: userId,
            commerce_platform: "shopify",
            external_order_id: order.id,
            revenue: order.revenue,
            currency: "EUR",
            occurred_at: order.occurredAt,
            landing_site: order.landingSite,
            referring_site: order.referringSite,
          },
          { onConflict: "user_id,commerce_platform,external_order_id" },
        )
        .select("id")
        .single();

      if (convError || !conversion) continue;

      const touches = touchpointsFromOrderContext({
        landingSite: order.landingSite,
        referringSite: order.referringSite,
        occurredAt: order.occurredAt,
      });

      const touchRows = touches.map((t) => ({
        user_id: userId,
        conversion_id: conversion.id,
        channel: t.channel,
        touch_type: t.touchType,
        source_platform: "shopify",
        occurred_at: t.occurredAt,
      }));

      if (touchRows.length > 0) {
        await supabase.from("marketing_touchpoints").insert(touchRows);
      }

      journeys.push({
        conversionId: conversion.id,
        revenue: order.revenue,
        touches: touches.map((t) => ({
          channel: t.channel,
          occurredAt: t.occurredAt,
        })),
      });
    }

    const models: AttributionModelId[] = [
      "markov",
      "last_click",
      "first_click",
      "linear",
    ];

    for (const model of models) {
      const credits = computeAttribution(model, journeys);
      const { data: run, error: runError } = await supabase
        .from("attribution_runs")
        .insert({
          user_id: userId,
          model,
          period_start: periodStart,
          period_end: periodEnd,
          status: journeys.length > 0 ? "completed" : "completed",
          metadata: { order_count: journeys.length },
        })
        .select("id")
        .single();

      if (runError || !run) continue;

      if (credits.length > 0) {
        await supabase.from("attribution_credits").insert(
          credits.map((c) => ({
            run_id: run.id,
            user_id: userId,
            channel: c.channel,
            credited_revenue: c.creditedRevenue,
            credit_share: c.creditShare,
            order_count: Math.round(c.orderCount),
          })),
        );
      }
    }

    return { ok: true };
  } catch (e) {
    console.error("Attribution sync failed", e);
    return {
      ok: false,
      error: "Failed to sync order journeys for attribution.",
    };
  }
}

export type AttributionCreditsResult =
  | {
      ok: true;
      model: AttributionModelId;
      credits: { channel: string; creditedRevenue: number; creditShare: number }[];
    }
  | { ok: false; error: string };

export async function getAttributionCredits(
  model: AttributionModelId = "markov",
): Promise<AttributionCreditsResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not logged in" };

  const planState = await getUserPlanState();
  if (!planState?.entitlements.markovAttribution) {
    return {
      ok: false,
      error: "Markov attribution is available on Pro and Scale. Upgrade to unlock.",
    };
  }

  const { data: run } = await supabase
    .from("attribution_runs")
    .select("id")
    .eq("user_id", user.id)
    .eq("model", model)
    .order("computed_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!run) {
    return { ok: true, model, credits: [] };
  }

  const { data: credits, error } = await supabase
    .from("attribution_credits")
    .select("channel, credited_revenue, credit_share")
    .eq("run_id", run.id)
    .order("credited_revenue", { ascending: false });

  if (error) return { ok: false, error: error.message };

  return {
    ok: true,
    model,
    credits: (credits ?? []).map((c) => ({
      channel: c.channel as string,
      creditedRevenue: Number(c.credited_revenue ?? 0),
      creditShare: Number(c.credit_share ?? 0),
    })),
  };
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

  const planState = await getUserPlanState();
  if (!planState?.entitlements.forecast) {
    return { ok: true, forecastedRevenue: 0, trendPercentage: 0 };
  }

  const historyDays = planState.entitlements.historyDays;
  const today = new Date();
  const start = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - (historyDays - 1)),
  );
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
