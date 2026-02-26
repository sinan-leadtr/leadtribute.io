"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Sidebar } from "../components/sidebar";

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
      <span className="text-sm font-medium text-white/90">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full border transition focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
          checked
            ? "border-white/70 bg-white/20"
            : "border-zinc-700 bg-zinc-900"
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

export default function SettingsPage() {
  const [fullName, setFullName] = useState("Sinan O.");
  const [email, setEmail] = useState("sinan@leadtribute.com");
  const [saved, setSaved] = useState(false);
  const [digest, setDigest] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [announcements, setAnnouncements] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      toast.success("Profile updated successfully ✅");
      setSaved(false);
    }, 500);
  };

  return (
    <div
      className="flex min-h-screen bg-black text-white"
      style={{ backgroundColor: "#000000" }}
    >
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <header className="mb-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-white/60">
            <Link href="/dashboard" className="cursor-pointer transition hover:text-white/90">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white/90">Settings</span>
          </nav>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">
            Settings
          </h1>
          <p className="text-xs text-white/60">
            Manage your profile, notifications and billing.
          </p>
        </header>

        <div className="space-y-8">
          {/* 1. Profile & Account */}
          <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white/80">
              Profile &amp; Account
            </h2>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex flex-col items-center gap-3 sm:shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-zinc-700 bg-zinc-900">
                  <span className="text-2xl font-semibold text-white">S</span>
                </div>
                <button
                  type="button"
                  onClick={() => toast.info("Photo upload is coming soon.")}
                  className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-xs font-medium text-white/80 transition hover:border-white/60 hover:bg-white/5"
                >
                  Change Photo
                </button>
              </div>
              <div className="min-w-0 flex-1 space-y-4">
                <div>
                  <label htmlFor="fullName" className="mb-1 block text-xs font-medium text-white/60">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1 block text-xs font-medium text-white/60">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/60"
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

          {/* 2. Notifications */}
          <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white/80">
              Notifications
            </h2>
            <div className="divide-y divide-zinc-800">
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

          {/* 3. Billing & Plan */}
          <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
            <h2 className="mb-6 text-sm font-semibold uppercase tracking-wider text-white/80">
              Billing &amp; Plan
            </h2>
            <div className="space-y-6">
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Pro Plan</p>
                    <p className="mt-0.5 text-xs text-white/50">Active</p>
                  </div>
                  <p className="text-lg font-semibold text-white">49 € / month</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    toast.info("Redirecting to Stripe Customer Portal...")
                  }
                  className="mt-4 rounded-full border border-zinc-700 bg-transparent px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/60 hover:bg-white/5"
                >
                  Manage Subscription
                </button>
              </div>
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
                  Recent Invoices
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-zinc-800">
                  <table className="w-full min-w-[280px] border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-zinc-800 bg-zinc-900/50 text-[11px] font-medium uppercase tracking-wider text-white/50">
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                        <th className="px-4 py-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-white/90">
                      {mockInvoices.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-zinc-800/80 last:border-0"
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
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
