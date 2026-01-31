"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    router.push("/dashboard");
  }

  async function handleGoogleLogin() {
    if (isLoading) return;
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${typeof window !== "undefined" ? window.location.origin : ""}/auth/callback`,
      },
    });
    if (error) {
      toast.error(error.message);
      setIsLoading(false);
      return;
    }
    toast.info("Redirecting to Google…");
  }

  async function handleAppleLogin() {
    if (isLoading) return;
    toast("Apple Login coming soon.", { duration: 2500 });
  }

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Dezenter orangener Blob im Hintergrund */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 opacity-20 blur-3xl"
        aria-hidden
      />

      {/* Login-Card */}
      <div className="relative z-10 w-full max-w-[400px] rounded-3xl border border-zinc-800 bg-zinc-950 px-8 py-8 shadow-2xl shadow-black/50 transition-colors hover:border-orange-500/40 hover:shadow-[0_0_50px_-15px_rgba(249,115,22,0.2)] focus-within:border-orange-500/60">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-400/60">
            <span className="text-xl font-semibold text-orange-400">LT</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-white">
            Welcome back, Sinan
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Login to manage your performance.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              disabled={isLoading}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              disabled={isLoading}
              className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-orange-400 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.4)] focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-zinc-950 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Divider + Social */}
        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800" />
            </div>
            <span className="relative bg-zinc-950 px-3 text-xs text-white/50">
              Or continue with
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleLogin}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-medium text-white/90 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 disabled:opacity-60"
            >
              <GoogleIcon className="h-4 w-4 shrink-0" />
              Google
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAppleLogin}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm font-medium text-white/90 transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400 disabled:opacity-60"
            >
              <AppleIcon className="h-4 w-4 shrink-0" />
              Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor" />
    </svg>
  );
}
