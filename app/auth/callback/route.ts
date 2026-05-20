import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ensureUserProfile } from "@/lib/plans/get-user-plan";

/** Use the same host the callback was hit on so session cookies and Location match. */
function callbackSiteOrigin(request: Request): string {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");
  if (forwardedHost) {
    const proto =
      forwardedProto ?? (forwardedHost.split(":")[0] === "localhost" ? "http" : "https");
    return `${proto}://${forwardedHost}`;
  }
  return url.origin;
}

/**
 * Auth callback: exchange OAuth PKCE code for a session and attach cookies to the redirect.
 * Always send users to /dashboard after success so Supabase `next=/` or Site URL quirks
 * cannot drop them on the marketing homepage.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const site = callbackSiteOrigin(request);

  if (code) {
    const cookieStore = await cookies();
    const response = NextResponse.redirect(new URL("/dashboard", site));

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await ensureUserProfile(user.id, supabase);
      }
      return response;
    }
  }

  return NextResponse.redirect(new URL("/login?error=auth_callback", site));
}

