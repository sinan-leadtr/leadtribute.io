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

const LEADTRIBUTE_ACCENT = "#6366f1";

export type RevenueChartPoint = {
  day: string;
  revenue: number;
};

export function RevenueChart({ data }: { data: RevenueChartPoint[] }) {
  const hasData = data.some((d) => d.revenue > 0);

  if (!hasData) {
    return (
      <div className="flex h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/50 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Revenue (last 30 days)
        </p>
        <p className="mt-3 text-sm text-white/50">
          Run Sync Now after connecting Shopify to load revenue.
        </p>
      </div>
    );
  }

  const chartData = data.slice(-14);

  return (
    <div className="h-[280px] w-full">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Revenue (last 14 days)
      </p>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <AreaChart
          data={chartData}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="revenueAccentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LEADTRIBUTE_ACCENT} stopOpacity={0.4} />
              <stop offset="100%" stopColor={LEADTRIBUTE_ACCENT} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="day"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) =>
              v >= 1000 ? `€ ${(v / 1000).toFixed(1)}k` : `€ ${v}`
            }
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={48}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(24,24,27)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "#e5e7eb",
            }}
            labelStyle={{ color: "#e5e7eb" }}
            itemStyle={{ color: "#e5e7eb" }}
            formatter={(value) => [
              `€ ${Number(value ?? 0).toLocaleString("de-DE")}`,
              "Revenue",
            ]}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={LEADTRIBUTE_ACCENT}
            strokeWidth={2}
            fill="url(#revenueAccentGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
