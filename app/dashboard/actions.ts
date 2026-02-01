"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const DEMO_CAMPAIGNS = [
  { name: "Q1 Brand Awareness", platform: "meta" as const, status: "active" as const, spend: 4250, revenue: 17850 },
  { name: "Search - High Intent", platform: "google" as const, status: "active" as const, spend: 1890, revenue: 9639 },
  { name: "UGC Test - Gen Z", platform: "tiktok" as const, status: "learning" as const, spend: 620, revenue: 868 },
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
