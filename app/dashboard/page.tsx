import { createClient } from "@/lib/supabase/server";
import { DashboardContent } from "../components/dashboard-content";
import type { Campaign } from "../components/campaign-table";
import type { Integration } from "./actions";
import { getForecast } from "./actions";

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

type ForecastShape = { forecastedRevenue: number; trendPercentage: number } | null;

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let campaigns: Campaign[] = [];
  let integrations: Integration[] = [];
  let blended: BlendedPoint[] = [];
  let totals = { totalSpend: 0, totalRevenue: 0, roas: 0 };
  let forecast: ForecastShape = null;

  if (user) {
    const today = new Date();
    const start = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - 29));
    const startDate = start.toISOString().slice(0, 10);

    const [campaignsRes, integrationsRes, analyticsRes, forecastRes] = await Promise.all([
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
      getForecast(),
    ]);

    if (campaignsRes.data && Array.isArray(campaignsRes.data)) {
      campaigns = (campaignsRes.data as DbCampaign[]).map(toCampaign);
    }
    if (integrationsRes.data && Array.isArray(integrationsRes.data)) {
      integrations = integrationsRes.data as Integration[];
    }

    if (analyticsRes.data && Array.isArray(analyticsRes.data)) {
      blended = analyticsRes.data.map((row: any) => ({
        date: row.date as string,
        spend: Number(row.spend ?? 0),
        revenue: Number(row.revenue ?? 0),
        roas: Number(row.roas ?? 0),
      }));
      const totalSpend = blended.reduce((sum, d) => sum += d.spend, 0);
      const totalRevenue = blended.reduce((sum, d) => sum += d.revenue, 0);
      const roas = totalSpend > 0 ? totalRevenue / totalSpend : 0;
      totals = {
        totalSpend,
        totalRevenue,
        roas,
      };
    }

    if (forecastRes && forecastRes.ok) {
      forecast = {
        forecastedRevenue: forecastRes.forecastedRevenue,
        trendPercentage: forecastRes.trendPercentage,
      };
    }
  }

  return (
    <DashboardContent
      campaigns={campaigns}
      integrations={integrations}
      analytics={{ blended, totals }}
      forecast={forecast}
    />
  );
}
