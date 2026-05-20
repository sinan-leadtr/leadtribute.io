"use client";

import Link from "next/link";
import type { UserPlanState } from "@/lib/plans/types";

type Props = {
  planState: UserPlanState;
};

export function PlanBanner({ planState }: Props) {
  const { entitlements, isOnProTrial, daysLeftOnTrial, trialExpired } = planState;

  if (entitlements.planId === "scale") {
    return (
      <div className="mb-6 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
        <span className="font-semibold">Scale plan</span>
        <span className="text-sky-800/80"> — agency features enabled.</span>
      </div>
    );
  }

  if (isOnProTrial && daysLeftOnTrial != null) {
    return (
      <div className="mb-6 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-900">
        <span className="font-semibold">Pro trial</span>
        <span className="text-violet-800/90">
          {" "}
          — {daysLeftOnTrial} day{daysLeftOnTrial === 1 ? "" : "s"} left. Then you&apos;ll
          move to Starter (free) unless you subscribe.
        </span>
      </div>
    );
  }

  if (entitlements.planId === "starter") {
    return (
      <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-amber-950">
          <span className="font-semibold">Starter plan</span>
          <span className="text-amber-900/80">
            {" "}
            — {entitlements.historyDays}-day history, up to {entitlements.maxIntegrations}{" "}
            connections.
            {trialExpired ? " Your Pro trial has ended." : ""}
          </span>
        </p>
        <Link
          href="/settings"
          className="shrink-0 rounded-full border border-emerald-300 bg-emerald-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-emerald-700"
        >
          Upgrade to Pro
        </Link>
      </div>
    );
  }

  return null;
}
