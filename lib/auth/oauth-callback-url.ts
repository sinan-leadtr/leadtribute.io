/** OAuth redirect target; must match Supabase Auth → URL configuration. */
export function oauthCallbackUrl(): string {
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin).replace(/\/$/, "");
  return `${origin}/auth/callback`;
}
