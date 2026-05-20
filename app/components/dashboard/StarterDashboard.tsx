"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Sparkles, AlertCircle, Check, X } from "lucide-react";
import { CampaignTable, type Campaign } from "@/app/components/campaign-table";
import { RevenueChart } from "@/app/components/dashboard/RevenueChart";
import { Integrations } from "@/app/components/dashboard/Integrations";
import { DashboardShell } from "./DashboardShell";
import { UpgradeGate } from "./UpgradeGate";
import { syncData } from "@/app/dashboard/actions";
import type { UserPlanState } from "@/lib/plans/types";
import { appBtnPrimary, appCard } from "@/lib/ui/app-surfaces";
import { useState } from "react";

type Props = {
  planState: UserPlanState;
  campaigns: Campaign[];
  integrations: { id: string; platform: string; status: string; connected_at: string }[];
  analytics: {
    blended: { date: string; spend: number; revenue: number; roas: number }[];
    totals: { totalSpend: number; totalRevenue: number; roas: number };
  };
  integrationCount: number;
};

export function StarterDashboard({
  planState,
  campaigns,
  integrations,
  analytics,
  integrationCount,
}: Props) {
  const router = useRouter();
  const [syncLoading, setSyncLoading] = useState(false);
  const { entitlements } = planState;
  const days = entitlements.historyDays;
  const blended = analytics.blended;
  const totals = analytics.totals;
  const atIntegrationLimit = integrationCount >= entitlements.maxIntegrations;

  const chartData = blended.map((d) => ({
    day: new Date(d.date + "T00:00:00Z").toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    }),
    revenue: Math.round(d.revenue),
  }));

  async function handleSync() {
    setSyncLoading(true);
    const result = await syncData();
    setSyncLoading(false);
    if (result.ok) {
      toast.success(`Synced last ${days} days.`);
      router.refresh();
    } else {
      toast.error(result.error);
    }
  }

  const headerActions = (
    <button
      type="button"
      onClick={handleSync}
      disabled={syncLoading}
      className={appBtnPrimary}
    >
      {syncLoading ? "Syncing…" : "Sync now"}
    </button>
  );

  return (
    <DashboardShell
      planState={planState}
      title="Starter overview"
      subtitle={`Last ${days} days · Up to ${entitlements.maxIntegrations} connections`}
      headerActions={headerActions}
    >
      <section className="mb-6 grid gap-4 md:grid-cols-3">
        {[
          { label: "Spend", value: `€${totals.totalSpend.toLocaleString("en-GB")}`, ok: true },
          { label: "Revenue", value: `€${totals.totalRevenue.toLocaleString("en-GB")}`, ok: true },
          { label: "ROAS", value: `${totals.roas.toFixed(2)}x`, ok: true },
        ].map((kpi) => (
          <article key={kpi.label} className={`${appCard} p-5`}>
            <p className="text-xs font-medium uppercase tracking-wider text-white/50">
              {kpi.label}
            </p>
            <p className="mt-2 text-2xl font-bold text-white">{kpi.value}</p>
            <p className="mt-1 flex items-center gap-1 text-xs text-emerald-400">
              <Check className="h-3.5 w-3.5" aria-hidden />
              {days}-day window
            </p>
          </article>
        ))}
      </section>

      <div className={`${appCard} mb-6 p-5`}>
        <RevenueChart data={chartData} />
        <p className="mt-3 text-center text-xs text-amber-400/90">
          Pro unlocks 30-day history, spend + ROAS chart, and exports.
        </p>
      </div>

      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <div className={appCard}>
          <Integrations integrations={integrations} />
          {atIntegrationLimit ? (
            <p className="border-t border-white/10 px-5 pb-5 text-xs text-amber-400">
              <AlertCircle className="mr-1 inline h-3.5 w-3.5" aria-hidden />
              {integrationCount} / {entitlements.maxIntegrations} connections used. Upgrade for
              more.
            </p>
          ) : (
            <p className="border-t border-white/10 px-5 pb-5 text-xs text-white/45">
              {integrationCount} / {entitlements.maxIntegrations} connections
            </p>
          )}
        </div>

        <UpgradeGate
          title="Markov multi-touch attribution"
          description="See how Meta, Google, TikTok, and email share credit on real order journeys — not just last-click."
          compact
        />
      </div>

      <section className="mb-6">
        <h2 className="mb-3 text-sm font-semibold text-white/80">Campaigns</h2>
        {campaigns.length === 0 ? (
          <div className={`${appCard} p-10 text-center`}>
            <p className="text-sm text-white/60">Connect accounts and sync to see campaigns.</p>
            <Link href="/dashboard/integrations" className="btn-black mt-4 inline-flex px-5 py-2.5 text-sm">
              <span>Connect data sources</span>
            </Link>
          </div>
        ) : (
          <CampaignTable campaigns={campaigns} historyLabel={`Last ${days} days`} />
        )}
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <UpgradeGate
          title="Data export"
          description="Export full history and reports for clients or finance."
          compact
        />
        <UpgradeGate
          title="AI copilot"
          description="Get budget recommendations based on live ROAS shifts."
          compact
        />
      </section>

      <ul className={`${appCard} mt-6 space-y-2 p-5 text-sm`}>
        <li className="flex items-center gap-2 text-emerald-400/90">
          <Check className="h-4 w-4 shrink-0" aria-hidden />
          Basic ROAS &amp; spend
        </li>
        <li className="flex items-center gap-2 text-amber-400/90">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {days}-day history only
        </li>
        <li className="flex items-center gap-2 text-red-400/80">
          <X className="h-4 w-4 shrink-0" aria-hidden />
          No Markov attribution or export
        </li>
      </ul>
    </DashboardShell>
  );
}
