"use client";

import { useState } from "react";
import { BarChart3, Euro, Target, TrendingUp } from "lucide-react";

/** Pulsierender grüner Status-Punkt (Live-Aktivität) */
function LiveStatusDot() {
  return (
    <span className="relative inline-flex h-3 w-3 shrink-0" aria-hidden>
      <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-green-500/75 opacity-75" />
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
    </span>
  );
}

type PreviewTab = "overview" | "creatives" | "profit";

const overviewStats = [
  {
    label: "Revenue",
    value: "€42,500",
    trend: "+12%",
    icon: Euro,
    accent: "text-emerald-400",
  },
  {
    label: "ROAS",
    value: "4.2",
    trend: "+0.4",
    icon: BarChart3,
    accent: "text-sky-400",
  },
  {
    label: "Ad Spend",
    value: "€10,000",
    trend: "+8%",
    icon: Target,
    accent: "text-white/80",
  },
  {
    label: "Leads",
    value: "340",
    trend: "+24%",
    icon: TrendingUp,
    accent: "text-emerald-400",
  },
];

const creativesStats = [
  {
    label: "Top ROAS",
    value: "6.4x",
    trend: "+32%",
    icon: BarChart3,
    accent: "text-emerald-400",
  },
  {
    label: "Winning Creative",
    value: "UGC_Hook_V3",
    trend: "Best this week",
    icon: TrendingUp,
    accent: "text-sky-400",
  },
  {
    label: "Testing",
    value: "8 live",
    trend: "+3 today",
    icon: Target,
    accent: "text-white/80",
  },
  {
    label: "Spend on tests",
    value: "€3,200",
    trend: "26% of budget",
    icon: Euro,
    accent: "text-emerald-400",
  },
];

const profitStats = [
  {
    label: "Profit",
    value: "€18,900",
    trend: "+34%",
    icon: TrendingUp,
    accent: "text-emerald-400",
  },
  {
    label: "MER",
    value: "4.3",
    trend: "Target > 3.0",
    icon: BarChart3,
    accent: "text-sky-400",
  },
  {
    label: "Blended CPA",
    value: "€24",
    trend: "-12% vs last week",
    icon: Target,
    accent: "text-white/80",
  },
  {
    label: "Email share",
    value: "32%",
    trend: "Healthy",
    icon: Euro,
    accent: "text-emerald-400",
  },
];

const TABS: { id: PreviewTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "creatives", label: "Creatives" },
  { id: "profit", label: "Profit" },
];

const tableRows = [
  ["Q1 Brand", "€4.2k", "4.2x", "Active"],
  ["Search", "€1.9k", "5.1x", "Active"],
  ["UGC Test", "€620", "1.4x", "Learning"],
  ["Retargeting High ROAS", "€2.1k", "6.4x", "Active"],
  ["TikTok Scale", "€3.4k", "2.8x", "Learning"],
  ["Klaviyo Welcome Flow", "€150", "12.1x", "Active"],
];

function AttributionHint() {
  return (
    <div className="mt-1 flex items-center gap-2 text-[10px] text-white/55 sm:text-xs">
      <div className="relative flex items-center gap-1">
        <span className="attribution-dot" />
        <span className="h-px w-6 rounded-full bg-emerald-400/60" />
        <span className="h-px w-10 rounded-full bg-sky-400/30" />
      </div>
      <span className="truncate">
        Smart attribution from clicks to leads.
      </span>
    </div>
  );
}

export function HeroDashboardPreview() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("overview");

  const stats =
    activeTab === "overview"
      ? overviewStats
      : activeTab === "creatives"
      ? creativesStats
      : profitStats;

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-zinc-950/98 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      {/* Top bar mock */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center gap-3">
          <div className="h-8 w-28 rounded-lg bg-white/5" />
          <div className="h-8 flex-1 rounded-lg bg-white/5" />
          <div className="h-8 w-20 rounded-full bg-white/10" />
        </div>
        <div
          className="inline-flex items-center gap-2 rounded-full bg-black/60 px-1.5 py-1 text-[10px] text-white/60 shadow-[0_12px_35px_rgba(0,0,0,0.8)] sm:text-xs"
          role="tablist"
          aria-label="Dashboard preview modes"
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                role="tab"
                aria-selected={isActive}
                className="cursor-pointer focus:outline-none"
              >
                <div
                  className={`rounded-full ${
                    isActive ? "tab-ring" : "border border-white/15"
                  }`}
                >
                  <div
                    className={`rounded-full px-3 py-1 text-[10px] sm:text-xs transition ${
                      isActive
                        ? "bg-black text-white"
                        : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map(({ label, value, trend, icon: Icon, accent }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 sm:p-4"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-xs">
                {label}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 sm:text-xs">
                <LiveStatusDot />
                {trend}
              </span>
            </div>
            <p className={`mt-1 text-lg font-bold tabular-nums sm:text-xl ${accent}`}>
              {value}
            </p>
            <Icon className="mt-1.5 h-4 w-4 text-white/20 sm:h-5 sm:w-5" />
          </div>
        ))}
      </div>

      {/* Graph + detail area – switches per tab */}
      <div className="mt-4 flex flex-1 flex-col gap-3 sm:mt-5">
        {activeTab === "overview" && (
          <>
            <div className="flex h-20 flex-1 rounded-xl border border-white/5 bg-white/[0.02] sm:h-24">
              {/* Mini bar chart simulation */}
              <div className="flex flex-1 items-end justify-between gap-1 px-4 py-3">
                {[35, 50, 45, 65, 55, 70, 60, 80, 75, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-sky-500/40 transition hover:bg-sky-400/60"
                    style={{ height: `${h}%`, minHeight: 4 }}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2 text-[10px] text-white/50 sm:text-xs">
              <div className="grid grid-cols-4 gap-2 font-medium text-white/70">
                <span>Campaign</span>
                <span>Spend</span>
                <span>ROAS</span>
                <span>Status</span>
              </div>
              {tableRows.map((row, i) => (
                <div key={i} className="grid grid-cols-4 gap-2 border-t border-white/5 py-1.5 pt-2 first:border-0">
                  <span className="truncate text-white/80" title={row[0]}>{row[0]}</span>
                  <span className="tabular-nums">{row[1]}</span>
                  <span className="tabular-nums text-emerald-400/90">{row[2]}</span>
                  <span className={row[3] === "Learning" ? "text-amber-400/90" : "text-emerald-400/80"}>{row[3]}</span>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between border-t border-white/5 pt-2">
                <span className="text-white/40">Campaigns</span>
                <span className="text-white/50">Page 1 of 4</span>
              </div>
              <AttributionHint />
            </div>
          </>
        )}

        {activeTab === "creatives" && (
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-3 text-[10px] text-white/60 sm:text-xs">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-white/80">Top creatives</span>
              <span className="text-[10px] text-white/50">Last 7 days</span>
            </div>
            <div className="space-y-2">
              {[
                { name: "UGC_Hook_V3_Final.mp4", roas: "6.4x", spend: "€2.1k" },
                { name: "Carousel_Summer_Sale", roas: "4.2x", spend: "€1.4k" },
                { name: "Story_Testimonial_DE", roas: "3.8x", spend: "€980" },
              ].map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/5 bg-black/40 px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-[10px] text-white/70">
                      4:5
                    </span>
                    <span className="max-w-[150px] truncate text-white/80">{c.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] tabular-nums">
                    <span className="text-emerald-400 font-semibold">{c.roas}</span>
                    <span className="text-white/70">{c.spend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profit" && (
          <div className="flex h-32 flex-col justify-between rounded-2xl border border-white/5 bg-gradient-to-br from-emerald-500/25 via-emerald-500/15 to-transparent px-4 py-3 text-[10px] text-white/70 sm:h-36 sm:text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300">
                <TrendingUp className="h-4 w-4" />
                <span className="text-xs font-medium">Profit trend</span>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-200 ring-1 ring-emerald-400/60">
                +34% Profit
              </span>
            </div>
            <div className="h-16 w-full">
              <svg viewBox="0 0 120 48" className="h-full w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="previewProfitGradient" x1="0" y1="1" x2="0" y2="0">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 40 Q 15 38 30 32 T 60 24 T 90 16 T 120 8 L 120 48 L 0 48 Z"
                  fill="url(#previewProfitGradient)"
                />
                <path
                  d="M 0 40 Q 15 38 30 32 T 60 24 T 90 16 T 120 8"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="120" cy="8" r="3" fill="#22c55e" className="drop-shadow-[0_0_6px_rgba(34,197,94,0.8)]" />
              </svg>
            </div>
            <p className="text-[10px] text-white/80">
              See your blended profit curve and MER in one place – no more guessing from platform ROAS.
            </p>
          </div>
        )}
      </div>

      {/* Subtle glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, transparent 50%)",
        }}
        aria-hidden
      />
    </div>
  );
}
