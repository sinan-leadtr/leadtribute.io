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
import type { Campaign } from "../campaign-table";

const PLATFORM_COLORS: Record<string, string> = {
  meta: "#1877F2",
  google: "#FBBC05",
  tiktok: "#EE1D52",
};

function aggregateSpendByPlatform(campaigns: Campaign[]): { platform: string; spend: number; fill: string }[] {
  const order = ["meta", "google", "tiktok"] as const;
  const byPlatform: Record<string, number> = { meta: 0, google: 0, tiktok: 0 };
  for (const c of campaigns) {
    byPlatform[c.platform] = (byPlatform[c.platform] ?? 0) + c.spend;
  }
  return order.map((platform) => ({
    platform: platform.charAt(0).toUpperCase() + platform.slice(1),
    spend: byPlatform[platform] ?? 0,
    fill: PLATFORM_COLORS[platform] ?? "rgba(255,255,255,0.5)",
  }));
}

export function PlatformSpendChart({ campaigns }: { campaigns: Campaign[] }) {
  const data = aggregateSpendByPlatform(campaigns);

  return (
    <div className="h-[280px] w-full rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        Spend by platform
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
            formatter={(value: any, _name: any, props: any) => [
              `€ ${Number(value ?? 0).toLocaleString("de-DE")}`,
              props?.payload?.platform ?? "",
            ]}
            cursor={{ fill: "rgba(255,255,255,0.04)" }}
          />
          <Bar dataKey="spend" radius={[6, 6, 0, 0]} isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
