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

// Simulierter Umsatzverlauf der letzten 7 Tage
function getLast7DaysData(): { day: string; revenue: number }[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const base = [4200, 5100, 3800, 6200, 5800, 7400, 6100];
  return days.map((day, i) => ({ day, revenue: base[i] }));
}

const chartData = getLast7DaysData();

export function RevenueChart() {
  return (
    <div className="h-[280px] w-full">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Revenue (last 7 days)
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
            tickFormatter={(v) => `€ ${(v / 1000).toFixed(1)}k`}
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
            formatter={(value: any) => [`€ ${Number(value ?? 0).toLocaleString("de-DE")}`, "Revenue"]}
            labelClassName="text-white/70"
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
