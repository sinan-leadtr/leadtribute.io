"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Ad Spend nach Plattform: Meta Blau, Google Bunt/Gelb, TikTok Schwarz/Weiß
const PLATFORM_DATA = [
  { platform: "Meta", spend: 12400, fill: "#1877F2" },
  { platform: "Google", spend: 9800, fill: "#FBBC05" },
  { platform: "TikTok", spend: 6200, fill: "#a1a1aa" },
];

export function PlatformSpendChart() {
  return (
    <div className="h-[280px] w-full">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Ad Spend by platform
      </p>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <BarChart
          data={PLATFORM_DATA}
          margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          barCategoryGap="28%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="platform"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fill: "rgba(255,255,255,0.6)", fontSize: 12 }}
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
            formatter={(value: number, _name, props: { payload: { platform: string } }) => [
              `€ ${value.toLocaleString("de-DE")}`,
              props.payload.platform,
            ]}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar dataKey="spend" radius={[6, 6, 0, 0]} isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
