"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Sidebar } from "../components/sidebar";
import type { UserPlanState } from "@/lib/plans/types";
import { appBreadcrumb, appCard, appPageBg, appSection, appTextMuted } from "@/lib/ui/app-surfaces";

function Switch({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="text-sm font-medium text-zinc-800">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-zinc-900/20 focus:ring-offset-2 focus:ring-offset-white ${
          checked
            ? "border-zinc-900 bg-zinc-900"
            : "border-zinc-300 bg-zinc-100"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

const mockInvoices = [
  { date: "2025-01-01", amount: "49 €", status: "Paid" },
  { date: "2024-12-01", amount: "49 €", status: "Paid" },
  { date: "2024-11-01", amount: "49 €", status: "Paid" },
];

function billingSummary(planState: UserPlanState) {
  const { entitlements, isOnProTrial, daysLeftOnTrial, trialExpired } = planState;

  if (isOnProTrial && daysLeftOnTrial != null) {
    return {
      name: "Pro trial",
      status: `${daysLeftOnTrial} day${daysLeftOnTrial === 1 ? "" : "s"} left — then Starter (free)`,
      price: "Free during trial",
      showManage: false,
    };
  }

  if (entitlements.planId === "starter") {
    return {
      name: "Starter",
      status: trialExpired ? "Pro trial ended · Free forever" : "Free · Limited features",
      price: "€0",
      showManage: false,
    };
  }

  if (entitlements.planId === "scale") {
    return {
      name: "Scale",
      status: "Active",
      price: "Custom",
      showManage: true,
    };
  }

  return {
    name: "Pro",
    status: "Active",
    price: "49 € / month",
    showManage: true,
  };
}

type Props = {
  planState: UserPlanState;
};

export function SettingsContent({ planState }: Props) {
  const [fullName, setFullName] = useState("Sinan O.");
  const [email, setEmail] = useState("sinan@leadtribute.com");
  const [saved, setSaved] = useState(false);
  const [digest, setDigest] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [announcements, setAnnouncements] = useState(false);

  const billing = billingSummary(planState);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      toast.success("Profile updated successfully ✅");
      setSaved(false);
    }, 500);
  };

  return (
    <div className={`flex ${appPageBg}`}>
      <Sidebar planLabel={planState.entitlements.displayName} />

      <main className="flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <header className="mb-6">
          <nav className={`flex items-center gap-2 ${appBreadcrumb}`}>
            <Link href="/dashboard" className="cursor-pointer transition hover:text-zinc-900">
              Home
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-zinc-700">Settings</span>
          </nav>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl">
            Settings
          </h1>
          <p className={`text-xs ${appTextMuted}`}>
            Manage your profile, notifications and billing.
          </p>
        </header>

        <div className="space-y-8">
          <section className={`${appSection} p-6`}>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-800">
              Profile &amp; Account
            </h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-3 sm:shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-200 bg-zinc-100">
                  <span className="text-2xl font-semibold text-zinc-900">S</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Photo upload is coming soon.")}
                  className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  Change Photo
                </button>
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-xs font-medium text-zinc-500">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/15"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-medium text-zinc-500">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/15"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn-black px-6 py-3 text-sm font-semibold"
                >
                  <span>{saved ? "Saved!" : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </section>

          <section className={`${appSection} p-6`}>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-800">
              Notifications
            </h2>
            <div className="divide-y divide-zinc-200">
              <Switch
                label="Daily Performance Digest"
                checked={digest}
                onCheckedChange={setDigest}
              />
              <Switch
                label="Budget Alerts (>90% spent)"
                checked={budgetAlerts}
                onCheckedChange={setBudgetAlerts}
              />
              <Switch
                label="New Feature Announcements"
                checked={announcements}
                onCheckedChange={setAnnouncements}
              />
            </div>
          </section>

          <section className={`${appSection} p-6`}>
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-zinc-800">
              Billing &amp; Plan
            </h2>
            <div className="space-y-6">
              <div className={`rounded-2xl p-4 ${appCard}`}>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">{billing.name} plan</p>
                    <p className="mt-0.5 text-xs text-white/50">{billing.status}</p>
                  </div>
                  <p className="text-lg font-semibold text-white">{billing.price}</p>
                </div>
                {billing.showManage ? (
                  <button
                    type="button"
                    onClick={() =>
                      toast.info("Redirecting to Stripe Customer Portal...")
                    }
                    className="mt-4 w-full rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
                  >
                    Manage Subscription
                  </button>
                ) : planState.effectivePlanId === "starter" ? (
                  <Link
                    href="/#pricing"
                    className="mt-4 inline-flex rounded-full border border-emerald-500/40 bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
                  >
                    Upgrade to Pro
                  </Link>
                ) : null}
              </div>
              {billing.showManage ? (
                <div>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Recent Invoices
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-zinc-200">
                    <table className="w-full min-w-[280px] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50 text-[11px] font-medium uppercase tracking-wider text-zinc-500">
                          <th className="px-4 py-3">Date</th>
                          <th className="px-4 py-3 text-right">Amount</th>
                          <th className="px-4 py-3 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="text-zinc-800">
                        {mockInvoices.map((row, i) => (
                          <tr
                            key={i}
                            className="border-b border-zinc-100 last:border-0"
                          >
                            <td className="px-4 py-3">{row.date}</td>
                            <td className="px-4 py-3 text-right tabular-nums">
                              {row.amount}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span className="inline-flex rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400 ring-1 ring-emerald-500/40">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
