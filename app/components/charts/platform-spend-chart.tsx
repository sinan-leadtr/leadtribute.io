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

const PLATFORM_COLORS: Record<string, string> = {
  Meta: "#1877F2",
  Google: "#FBBC05",
  TikTok: "#EE1D52",
};

export type PlatformSpendPoint = {
  platform: string;
  spend: number;
};

export function PlatformSpendChart({
  platformSpend,
}: {
  platformSpend: PlatformSpendPoint[];
}) {
  const data = platformSpend.map((row) => ({
    ...row,
    fill: PLATFORM_COLORS[row.platform] ?? "#a1a1aa",
  }));

  const hasData = data.some((d) => d.spend > 0);

  if (!hasData) {
    return (
      <div className="flex h-[280px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-950/50 p-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
          Ad Spend by platform
        </p>
        <p className="mt-3 text-sm text-white/50">
          Connect integrations and run Sync Now to see platform spend.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[280px] w-full">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Ad Spend by platform
      </p>
      <ResponsiveContainer width="100%" height="100%" minHeight={200}>
        <BarChart
          data={data}
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
              color: "#e5e7eb",
            }}
            labelStyle={{ color: "#e5e7eb" }}
            itemStyle={{ color: "#e5e7eb" }}
            formatter={(value) => [
              `€ ${Number(value ?? 0).toLocaleString("de-DE")}`,
              "Spend",
            ]}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar dataKey="spend" radius={[6, 6, 0, 0]} isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
