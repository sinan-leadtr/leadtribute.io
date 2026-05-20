"use server";

import { ensureUserProfile, getUserPlanState } from "@/lib/plans/get-user-plan";
import type { UserPlanState } from "@/lib/plans/types";
import { createClient } from "@/lib/supabase/server";

export async function initializeUserProfile(): Promise<{ ok: true } | { ok: false; error: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "Not logged in" };
  }

  try {
    await ensureUserProfile(user.id);
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to initialize profile";
    return { ok: false, error: message };
  }
}

export async function fetchUserPlanState(): Promise<UserPlanState | null> {
  return getUserPlanState();
}
