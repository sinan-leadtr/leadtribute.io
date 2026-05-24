import { toast } from "sonner";
import { oauthCallbackUrl } from "@/lib/auth/oauth-callback-url";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

type OAuthProvider = "google" | "apple";

export async function startOAuthSignIn(provider: OAuthProvider): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    toast.error(
      "Sign-in is not configured on this deployment. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel, then redeploy.",
    );
    return false;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: oauthCallbackUrl(),
      },
    });

    if (error) {
      toast.error(error.message);
      return false;
    }

    if (data?.url) {
      window.location.assign(data.url);
      return true;
    }

    toast.error(`Could not start ${provider === "google" ? "Google" : "Apple"} sign-in.`);
    return false;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign-in failed.";
    toast.error(message);
    return false;
  }
}
