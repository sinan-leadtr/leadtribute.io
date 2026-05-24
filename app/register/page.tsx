"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { startOAuthSignIn } from "@/lib/auth/start-oauth";
import { initializeUserProfile } from "@/app/dashboard/plan-actions";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    setIsLoading(true);

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value?.trim() ?? "";
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value ?? "";
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement)?.value?.trim() ?? "";

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: fullName ? { full_name: fullName } : undefined,
        },
      });

      if (error) {
        console.error("[Register] signUp error:", error.message, error);
        setFormError(error.message);
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      console.log("[Register] signUp success:", data.user?.id);
      await initializeUserProfile();
      toast.success("Account created! Your 14-day Pro trial has started.");
      router.push("/dashboard");
      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      console.error("[Register] unexpected error:", err);
      setFormError(message);
      toast.error(message);
      setIsLoading(false);
    }
  }

  async function handleGoogleSignUp() {
    if (isLoading) return;
    setIsLoading(true);
    const started = await startOAuthSignIn("google");
    if (!started) setIsLoading(false);
  }

  async function handleAppleSignUp() {
    if (isLoading) return;
    setIsLoading(true);
    const started = await startOAuthSignIn("apple");
    if (!started) setIsLoading(false);
  }

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white text-black"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 opacity-40 blur-3xl"
        aria-hidden
      />

      {/* Register-Card */}
      <div className="relative z-10 w-full max-w-[400px] rounded-3xl border border-black/5 bg-white px-8 py-8 shadow-2xl shadow-black/10 transition-colors hover:border-black/20 hover:shadow-[0_18px_45px_rgba(0,0,0,0.12)] focus-within:border-black/30">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-black text-white">
            <span className="text-xl font-semibold">LT</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-black">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-black/60">
            Start optimizing your ads today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="sr-only">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              disabled={isLoading}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/40 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              disabled={isLoading}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/40 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              disabled={isLoading}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/40 disabled:opacity-60"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              autoComplete="new-password"
              disabled={isLoading}
              className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/40 transition focus:border-black focus:outline-none focus:ring-2 focus:ring-black/40 disabled:opacity-60"
            />
          </div>
          {formError && (
            <p className="text-sm text-red-400" role="alert">
              {formError}
            </p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-black flex w-full items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <span>Sign Up</span>
            )}
          </button>
        </form>

        {/* Social */}
        <div className="mt-6">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/10" />
            </div>
            <span className="relative bg-white px-3 text-xs text-black/50">
              Or continue with
            </span>
          </div>
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleGoogleSignUp}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-medium text-black/80 transition hover:bg-black hover:text-white disabled:opacity-60"
            >
              <GoogleIcon className="h-4 w-4" />
              Google
            </button>
            <button
              type="button"
              disabled={isLoading}
              onClick={handleAppleSignUp}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-black/15 bg-white px-4 py-3 text-sm font-medium text-black/80 transition hover:bg-black hover:text-white disabled:opacity-60"
            >
              <AppleIcon className="h-4 w-4" />
              Apple
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="mt-6 text-center text-sm text-black/60">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-black transition hover:text-black/80"
          >
            Sign In
          </Link>
        </p>
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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
