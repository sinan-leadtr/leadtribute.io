import { createClient } from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/plans/get-user-plan";
import { NextResponse } from "next/server";

/**
 * Auth callback route: Google (and other OAuth providers) redirect here
 * after sign-in. We exchange the auth code for a session (PKCE flow)
 * and redirect to the dashboard.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await ensureUserProfile(user.id);
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback`);
}
