"use client";

import type { ReactNode } from "react";
import { Sidebar } from "@/app/components/sidebar";
import { UserNav } from "@/app/components/user-nav";
import { PlanBanner } from "./PlanBanner";
import type { UserPlanState } from "@/lib/plans/types";
import { appPageBg } from "@/lib/ui/app-surfaces";

type Props = {
  planState: UserPlanState;
  title: string;
  subtitle: string;
  headerActions?: ReactNode;
  children: ReactNode;
};

export function DashboardShell({
  planState,
  title,
  subtitle,
  headerActions,
  children,
}: Props) {
  const badgeClass =
    planState.entitlements.planId === "pro"
      ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
      : planState.entitlements.planId === "scale"
        ? "border-sky-500/40 bg-sky-500/15 text-sky-300"
        : "border-amber-500/40 bg-amber-500/15 text-amber-200";

  return (
    <div className={`flex ${appPageBg}`}>
      <Sidebar planLabel={planState.entitlements.displayName} />
      <main className="flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <nav className="flex flex-wrap items-center gap-2 text-xs font-medium text-white/45">
              <span>Home</span>
              <span className="text-white/25">/</span>
              <span className="text-white/70">Dashboard</span>
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {title}
              </h1>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${badgeClass}`}
              >
                {planState.entitlements.displayName}
              </span>
            </div>
            <p className="text-xs text-white/50">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            {headerActions}
            <UserNav />
          </div>
        </header>
        <PlanBanner planState={planState} />
        {children}
      </main>
    </div>
  );
}
