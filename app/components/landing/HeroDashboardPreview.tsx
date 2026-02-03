"use client";

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

const stats = [
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
    accent: "text-orange-400",
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

const tableRows = [
  ["Q1 Brand", "€4.2k", "4.2x", "Active"],
  ["Search", "€1.9k", "5.1x", "Active"],
  ["UGC Test", "€620", "1.4x", "Learning"],
];

export function HeroDashboardPreview() {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-zinc-900/95 to-zinc-950/98 p-5 shadow-2xl backdrop-blur-xl sm:p-6">
      {/* Top bar mock */}
      <div className="mb-4 flex items-center gap-3">
        <div className="h-8 w-28 rounded-lg bg-white/5" />
        <div className="h-8 flex-1 rounded-lg bg-white/5" />
        <div className="h-8 w-20 rounded-full bg-orange-500/20" />
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

      {/* Graph + table area */}
      <div className="mt-4 flex flex-1 flex-col gap-3 sm:mt-5">
        <div className="flex h-20 flex-1 rounded-xl border border-white/5 bg-white/[0.02] sm:h-24">
          {/* Mini bar chart simulation */}
          <div className="flex flex-1 items-end justify-between gap-1 px-4 py-3">
            {[35, 50, 45, 65, 55, 70, 60, 80, 75, 90].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t bg-orange-500/30 transition hover:bg-orange-500/50"
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
              <span className="text-white/80">{row[0]}</span>
              <span className="tabular-nums">{row[1]}</span>
              <span className="tabular-nums text-emerald-400/90">{row[2]}</span>
              <span className="text-emerald-400/80">{row[3]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Subtle glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(249,115,22,0.04) 0%, transparent 50%)",
        }}
        aria-hidden
      />
    </div>
  );
}
