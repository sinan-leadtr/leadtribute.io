import { createClient } from "@/lib/supabase/server";
import { DashboardContent } from "../components/dashboard-content";
import type { Campaign } from "../components/campaign-table";
import type { Integration } from "./actions";

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
  let integrations: Integration[] = [];

  if (user) {
    const [campaignsRes, integrationsRes] = await Promise.all([
      supabase
        .from("campaigns")
        .select("*")
        .eq("user_id", user.id)
        .order("spend", { ascending: false }),
      supabase
        .from("integrations")
        .select("id, platform, status, connected_at")
        .eq("user_id", user.id),
    ]);

    if (campaignsRes.data && Array.isArray(campaignsRes.data)) {
      campaigns = (campaignsRes.data as DbCampaign[]).map(toCampaign);
    }
    if (integrationsRes.data && Array.isArray(integrationsRes.data)) {
      integrations = integrationsRes.data as Integration[];
    }
  }

  return <DashboardContent campaigns={campaigns} integrations={integrations} />;
}
