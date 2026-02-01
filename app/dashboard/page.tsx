import { createClient } from "@/lib/supabase/server";
import { DashboardContent } from "../components/dashboard-content";
import type { Campaign } from "../components/campaign-table";

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

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let campaigns: Campaign[] = [];

  if (user) {
    const { data } = await supabase
      .from("campaigns")
      .select("*")
      .eq("user_id", user.id)
      .order("spend", { ascending: false });
    if (data && Array.isArray(data)) {
      campaigns = (data as DbCampaign[]).map(toCampaign);
    }
  }

  return <DashboardContent campaigns={campaigns} />;
}
