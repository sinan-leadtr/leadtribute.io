import { createClient } from "@/lib/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getEntitlementsForPlan, PRO_TRIAL_DAYS } from "./entitlements";
import type { PlanId, UserPlanState } from "./types";

type ProfileRow = {
  user_id: string;
  plan: PlanId;
  trial_ends_at: string | null;
  stripe_subscription_id: string | null;
};

function addDaysIso(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString();
}

function daysUntil(iso: string): number {
  const ms = new Date(iso).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
}

/** Paid Scale/Pro with active Stripe sub — skip trial downgrade */
function hasActiveSubscription(profile: ProfileRow): boolean {
  return Boolean(profile.stripe_subscription_id);
}

function shouldDowngradeToStarter(profile: ProfileRow): boolean {
  if (hasActiveSubscription(profile)) return false;
  if (profile.plan !== "pro") return false;
  if (!profile.trial_ends_at) return false;
  return new Date(profile.trial_ends_at).getTime() < Date.now();
}

export async function ensureUserProfile(
  userId: string,
  supabase?: SupabaseClient,
): Promise<void> {
  const client = supabase ?? (await createClient());
  const { data: existing } = await client
    .from("user_profiles")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (existing) return;

  await client.from("user_profiles").insert({
    user_id: userId,
    plan: "pro",
    trial_ends_at: addDaysIso(PRO_TRIAL_DAYS),
  });
}

export async function getUserPlanState(): Promise<UserPlanState | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  await ensureUserProfile(user.id);

  let { data: profile } = await supabase
    .from("user_profiles")
    .select("user_id, plan, trial_ends_at, stripe_subscription_id")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    await ensureUserProfile(user.id);
    const refetch = await supabase
      .from("user_profiles")
      .select("user_id, plan, trial_ends_at, stripe_subscription_id")
      .eq("user_id", user.id)
      .single();
    profile = refetch.data;
  }

  if (!profile) return null;

  const row = profile as ProfileRow;
  let effectivePlanId = row.plan as PlanId;

  if (shouldDowngradeToStarter(row)) {
    effectivePlanId = "starter";
    await supabase
      .from("user_profiles")
      .update({
        plan: "starter",
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);
  }

  const trialEndsAt = row.trial_ends_at;
  const trialExpired =
    Boolean(trialEndsAt) &&
    new Date(trialEndsAt as string).getTime() < Date.now();
  const isOnProTrial =
    effectivePlanId === "pro" &&
    row.plan === "pro" &&
    Boolean(trialEndsAt) &&
    !trialExpired &&
    !hasActiveSubscription(row);

  return {
    planId: row.plan as PlanId,
    effectivePlanId,
    entitlements: getEntitlementsForPlan(effectivePlanId),
    trialEndsAt,
    isOnProTrial,
    trialExpired,
    daysLeftOnTrial:
      trialEndsAt && !trialExpired ? daysUntil(trialEndsAt) : null,
  };
}

export function historyStartDateIso(historyDays: number): string {
  const today = new Date();
  const start = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate() - (historyDays - 1),
    ),
  );
  return start.toISOString().slice(0, 10);
}
