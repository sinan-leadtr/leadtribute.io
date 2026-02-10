import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IntegrationsForm } from "./IntegrationsForm";
import type { ApiKeyRow } from "../actions";

export default async function DashboardIntegrationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard/integrations");
  }

  // Do not select api_key – never send secrets to client; only need to show "Connected" and pre-fill non-secret fields
  const { data: rows } = await supabase
    .from("api_keys")
    .select("id, user_id, service, account_id, shop_url, created_at")
    .eq("user_id", user.id);

  const initialKeys: ApiKeyRow[] = Array.isArray(rows)
    ? rows.map((r) => ({
        id: r.id,
        user_id: r.user_id,
        service: r.service as ApiKeyRow["service"],
        api_key: null,
        account_id: r.account_id ?? null,
        shop_url: r.shop_url ?? null,
        created_at: r.created_at,
      }))
    : [];

  return <IntegrationsForm initialKeys={initialKeys} />;
}
