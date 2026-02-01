"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Campaign } from "../campaign-table";

function aggregateRevenueByDate(campaigns: Campaign[]): { date: string; revenue: number }[] {
  const byDate: Record<string, number> = {};
  for (const c of campaigns) {
    const day = c.created_at?.slice(0, 10) ?? "—";
    byDate[day] = (byDate[day] ?? 0) + c.revenue;
  }
  const entries = Object.entries(byDate)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date));
  return entries.length > 0 ? entries : [{ date: "—", revenue: 0 }];
}

function formatDate(iso: string): string {
  if (iso === "—") return iso;
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", { day: "2-digit", month: "short" });
}

export function RevenueChart({ campaigns }: { campaigns: Campaign[] }) {
  const data = aggregateRevenueByDate(campaigns);

  return (
    <div className="h-[280px] w-full rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Revenue over time
      </p>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(249,115,22)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="rgb(249,115,22)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `€ ${(v / 1000).toFixed(0)}k`}
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(24,24,27)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "12px",
            }}
            labelFormatter={formatDate}
            formatter={(value: number) => [`€ ${value.toLocaleString("de-DE")}`, "Revenue"]}
            labelClassName="text-white/70"
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="rgb(249,115,22)"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
