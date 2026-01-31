import { createClient } from "@/lib/supabase/server";
import { DashboardContent } from "./components/dashboard-content";
import type { Campaign } from "./components/campaign-table";

const MOCK_CAMPAIGNS: Campaign[] = [
  { id: "1", name: "Q1 Brand Awareness", platform: "meta", status: "active", spend: 4250, roas: 4.2, revenue: 17850, created_at: "2025-01-01T00:00:00Z" },
  { id: "2", name: "Search - High Intent", platform: "google", status: "active", spend: 1890, roas: 5.1, revenue: 9639, created_at: "2025-01-01T00:00:00Z" },
  { id: "3", name: "UGC Test - Gen Z", platform: "tiktok", status: "learning", spend: 620, roas: 1.4, revenue: 868, created_at: "2025-01-01T00:00:00Z" },
  { id: "4", name: "Retargeting - Cart Abandoners", platform: "meta", status: "active", spend: 2100, roas: 3.9, revenue: 8190, created_at: "2025-01-01T00:00:00Z" },
  { id: "5", name: "Performance Max - Summer", platform: "google", status: "paused", spend: 0, roas: 0, revenue: 0, created_at: "2025-01-01T00:00:00Z" },
  { id: "6", name: "Stories - Product Launch", platform: "meta", status: "active", spend: 1250, roas: 2.8, revenue: 3500, created_at: "2025-01-01T00:00:00Z" },
  { id: "7", name: "In-Feed - Broad Reach", platform: "tiktok", status: "active", spend: 980, roas: 2.1, revenue: 2058, created_at: "2025-01-01T00:00:00Z" },
  { id: "8", name: "Search - Brand Terms", platform: "google", status: "active", spend: 540, roas: 6.0, revenue: 3240, created_at: "2025-01-01T00:00:00Z" },
];

export default async function Home() {
  const hasSupabase =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let campaigns: Campaign[] = MOCK_CAMPAIGNS;

  if (hasSupabase) {
    try {
      const supabase = await createClient();
      const { data } = await supabase
        .from("campaigns")
        .select("*")
        .order("spend", { ascending: false });
      if (data && Array.isArray(data) && data.length > 0) {
        campaigns = data as unknown as Campaign[];
      }
    } catch {
      // Supabase nicht erreichbar oder Tabelle fehlt – Mock-Daten nutzen
    }
  }

  return <DashboardContent campaigns={campaigns} />;
}
