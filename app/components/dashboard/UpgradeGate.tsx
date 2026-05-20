"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  children?: ReactNode;
  compact?: boolean;
};

export function UpgradeGate({ title, description, children, compact }: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-zinc-900/90 to-zinc-950 ${compact ? "p-5" : "p-8"}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 ring-1 ring-emerald-500/40">
          <Lock className="h-5 w-5 text-emerald-400" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/60">{description}</p>
          <Link
            href="/register"
            className="btn-white-glow mt-4 inline-flex px-5 py-2.5 text-sm font-semibold"
          >
            <span>Start 14-day Pro trial</span>
          </Link>
        </div>
      </div>
      {children ? (
        <div className="pointer-events-none mt-6 select-none opacity-40 blur-[2px]">
          {children}
        </div>
      ) : null}
    </div>
  );
}
