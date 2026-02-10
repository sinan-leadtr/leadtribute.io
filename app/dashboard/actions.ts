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
