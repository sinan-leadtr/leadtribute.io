import { createClient } from "@/lib/supabase/server";
import { DashboardContent } from "../components/dashboard-content";
import type { Campaign } from "../components/campaign-table";
import type { Integration } from "./actions";
import { getAttributionCredits, getForecast } from "./actions";
import { getUserPlanState, historyStartDateIso } from "@/lib/plans/get-user-plan";

type DbCampaign = {
  id: string;
  user_id?: string;
  name: string;
  platform: "meta" | "google" | "tiktok";
  status: "active" | "paused" | "learning";
  spend: number;
  revenue: number;
  roas?: number;
  created_at?: string;
};

function toCampaign(row: DbCampaign): Campaign {
  const spend = Number(row.spend) || 0;
  const revenue = Number(row.revenue) || 0;
  const roas = row.roas != null ? Number(row.roas) : spend > 0 ? revenue / spend : 0;
  return {
    id: String(row.id),
    name: row.name,
    platform: row.platform,
    status: row.status,
    spend,
    roas: Math.round(roas * 10) / 10,
    revenue,
    created_at: row.created_at || new Date().toISOString(),
  };
}

type BlendedPoint = {
  date: string;
  spend: number;
  revenue: number;
  roas: number;
};

export type PlatformSpendPoint = {
  platform: string;
  spend: number;
};

type ForecastShape = { forecastedRevenue: number; trendPercentage: number } | null;

const PLATFORM_LABELS: Record<string, string> = {
  meta: "Meta",
  google: "Google",
  tiktok: "TikTok",
};

function aggregatePlatformSpend(
  rows: { platform: string; spend: number }[],
): PlatformSpendPoint[] {
  const totals: Record<string, number> = { meta: 0, google: 0, tiktok: 0 };
  for (const row of rows) {
    if (row.platform in totals) {
      totals[row.platform] += Number(row.spend ?? 0);
    }
  }
  return (["meta", "google", "tiktok"] as const).map((platform) => ({
    platform: PLATFORM_LABELS[platform] ?? platform,
    spend: Math.round(totals[platform] ?? 0),
  }));
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const planState = user ? await getUserPlanState() : null;
  const historyDays = planState?.entitlements.historyDays ?? 30;
  const startDate = historyStartDateIso(historyDays);

  let campaigns: Campaign[] = [];
  let integrations: Integration[] = [];
  let blended: BlendedPoint[] = [];
  let platformSpend: PlatformSpendPoint[] = [];
  let totals = { totalSpend: 0, totalRevenue: 0, roas: 0 };
  let forecast: ForecastShape = null;
  let attributionCredits: { channel: string; creditedRevenue: number; creditShare: number }[] =
    [];
  let integrationCount = 0;

  if (user) {
    const [campaignsRes, integrationsRes, analyticsRes, platformRes, forecastRes, attrRes] =
      await Promise.all([
        supabase
          .from("campaigns")
          .select("*")
          .eq("user_id", user.id)
          .order("spend", { ascending: false }),
        supabase
          .from("integrations")
          .select("id, platform, status, connected_at")
          .eq("user_id", user.id),
        supabase
          .from("analytics_daily")
          .select("date, platform, spend, revenue, roas")
          .eq("user_id", user.id)
          .eq("platform", "blended")
          .gte("date", startDate)
          .order("date", { ascending: true }),
        supabase
          .from("analytics_daily")
          .select("platform, spend")
          .eq("user_id", user.id)
          .in("platform", ["meta", "google", "tiktok"])
          .gte("date", startDate),
        planState?.entitlements.forecast ? getForecast() : Promise.resolve(null),
        planState?.entitlements.markovAttribution
          ? getAttributionCredits()
          : Promise.resolve(null),
      ]);

    if (campaignsRes.data && Array.isArray(campaignsRes.data)) {
      campaigns = (campaignsRes.data as DbCampaign[]).map(toCampaign);
    }
    if (integrationsRes.data && Array.isArray(integrationsRes.data)) {
      integrations = integrationsRes.data as Integration[];
      integrationCount = integrations.length;
    }

    if (analyticsRes.data && Array.isArray(analyticsRes.data)) {
      blended = analyticsRes.data.map((row: { date: string; spend: unknown; revenue: unknown; roas: unknown }) => ({
        date: row.date as string,
        spend: Number(row.spend ?? 0),
        revenue: Number(row.revenue ?? 0),
        roas: Number(row.roas ?? 0),
      }));
      const totalSpend = blended.reduce((sum, d) => sum + d.spend, 0);
      const totalRevenue = blended.reduce((sum, d) => sum + d.revenue, 0);
      const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
      totals = {
        totalSpend,
        totalRevenue,
        roas,
      };
    }

    if (platformRes.data && Array.isArray(platformRes.data)) {
      platformSpend = aggregatePlatformSpend(
        platformRes.data as { platform: string; spend: number }[],
      );
    }

    if (forecastRes && forecastRes.ok) {
      forecast = {
        forecastedRevenue: forecastRes.forecastedRevenue,
        trendPercentage: forecastRes.trendPercentage,
      };
    }

    if (attrRes && attrRes.ok) {
      attributionCredits = attrRes.credits;
    }
  }

  if (!planState) {
    return null;
  }

  return (
    <DashboardContent
      planState={planState}
      campaigns={campaigns}
      integrations={integrations}
      integrationCount={integrationCount}
      attributionCredits={attributionCredits}
      analytics={{ blended, totals, platformSpend }}
      forecast={forecast}
    />
  );
}
