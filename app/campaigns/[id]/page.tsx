"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Image, Video } from "lucide-react";
import { Sidebar } from "../../components/sidebar";
import { appPageBg } from "@/lib/ui/app-surfaces";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Mock campaign lookup (same IDs as campaign-table)
const MOCK_CAMPAIGNS: Record<
  string,
  { name: string; status: "active" | "paused" | "learning"; spend: number; roas: number; revenue: number }
> = {
  "1": { name: "Q1 Brand Awareness", status: "active", spend: 4250, roas: 4.2, revenue: 17850 },
  "2": { name: "Search - High Intent", status: "active", spend: 1890, roas: 5.1, revenue: 9639 },
  "3": { name: "UGC Test - Gen Z", status: "learning", spend: 620, roas: 1.4, revenue: 868 },
  "4": { name: "Retargeting - Cart Abandoners", status: "active", spend: 2100, roas: 3.9, revenue: 8190 },
  "5": { name: "Performance Max - Summer", status: "paused", spend: 0, roas: 0, revenue: 0 },
  "6": { name: "Stories - Product Launch", status: "active", spend: 1250, roas: 2.8, revenue: 3500 },
  "7": { name: "In-Feed - Broad Reach", status: "active", spend: 980, roas: 2.1, revenue: 2058 },
  "8": { name: "Search - Brand Terms", status: "active", spend: 540, roas: 6.0, revenue: 3240 },
};

// Mock chart data for this campaign (last 14 days)
function getCampaignChartData(campaignId: string) {
  const base = MOCK_CAMPAIGNS[campaignId] ?? { spend: 1000, roas: 3 };
  return Array.from({ length: 14 }).map((_, i) => ({
    day: `Day ${i + 1}`,
    spend: Math.round((base.spend / 14) * (0.8 + Math.sin(i / 2) * 0.3 + (i % 3) * 0.05)),
    roas: Number((base.roas * (0.9 + Math.cos(i / 3) * 0.15)).toFixed(2)),
  }));
}

// Mock ad sets & creatives
const MOCK_CREATIVES = [
  { id: "c1", type: "image" as const, name: "Hero_Banner_1200x628", spend: 1200, roas: 4.1, convRate: 4.2 },
  { id: "c2", type: "video" as const, name: "UGC_15s_Reel", spend: 980, roas: 3.8, convRate: 3.6 },
  { id: "c3", type: "image" as const, name: "Carousel_1_1080x1080", spend: 720, roas: 4.5, convRate: 5.0 },
  { id: "c4", type: "video" as const, name: "Stories_9x16_Test", spend: 450, roas: 2.9, convRate: 2.8 },
  { id: "c5", type: "image" as const, name: "Lead_Ad_Square", spend: 900, roas: 5.2, convRate: 6.1 },
];

function CustomTooltip(props: {
  active?: boolean;
  payload?: Array<{ dataKey?: string; value?: number }>;
  label?: string;
}) {
  const { active, payload, label } = props;
  if (!active || !payload?.length) return null;
  const spendItem = payload.find((p) => p.dataKey === "spend");
  const roasItem = payload.find((p) => p.dataKey === "roas");
  if (!spendItem || !roasItem) return null;
  return (
    <div className="rounded-xl border border-white/10 bg-black/95 px-3 py-2 text-xs text-white shadow-2xl shadow-black/70">
      <p className="mb-1 text-[11px] font-medium text-white/70">{label}</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/60">Ad Spend</span>
          <span className="font-medium text-white">€ {Number(spendItem.value).toLocaleString("de-DE")}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-white/60">ROAS</span>
          <span className="font-medium text-sky-400">{Number(roasItem.value).toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}

export default function CampaignDetailPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "1";
  const campaign = MOCK_CAMPAIGNS[id] ?? {
    name: `Campaign ${id}`,
    status: "active" as const,
    spend: 1500,
    roas: 3.2,
    revenue: 4800,
  };
  const chartData = getCampaignChartData(id);

  const statusConfig = {
    active: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50",
    paused: "bg-white/10 text-white/60 ring-1 ring-white/20",
    learning: "bg-red-500/20 text-red-400 ring-1 ring-red-500/50",
  };
  const statusLabel = { active: "Active", paused: "Paused", learning: "Learning Phase" };

  return (
    <div className={`flex ${appPageBg}`}>
      <Sidebar />

      <main className="flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        {/* Back + Header */}
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm font-medium text-white/80 transition hover:border-white/60 hover:bg-white/5"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Campaign Analysis: {campaign.name}
            </h1>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-medium ${statusConfig[campaign.status]}`}
            >
              {statusLabel[campaign.status]}
            </span>
          </div>
          <p className="mt-1 text-xs text-white/60">Drill-down • Last 14 days • This campaign only</p>
        </div>

        {/* KPI cards */}
        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">Spend</p>
            <p className="mt-1 text-xl font-bold tabular-nums text-white sm:text-2xl">
              € {campaign.spend.toLocaleString("de-DE")}
            </p>
          </article>
          <article className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">ROAS</p>
            <p className="mt-1 text-xl font-bold tabular-nums text-sky-400 sm:text-2xl">
              {campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : "—"}
            </p>
          </article>
          <article className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:-translate-y-0.5 hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">Revenue</p>
            <p className="mt-1 text-xl font-bold tabular-nums text-white sm:text-2xl">
              € {campaign.revenue.toLocaleString("de-DE")}
            </p>
          </article>
        </section>

        {/* Chart */}
        <section className="mb-6 rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
          <h2 className="mb-3 text-sm font-semibold text-white">Spend & ROAS – this campaign</h2>
          <div className="h-[360px] w-full rounded-2xl border border-zinc-800 bg-zinc-950/80 p-2 sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 12, right: 32, left: 0, bottom: 8 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 10 }}
                  tickFormatter={(v) => `€${v}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#38bdf8", fontSize: 10 }}
                  tickFormatter={(v) => `${Number(v).toFixed(1)}x`}
                />
                <Tooltip cursor={{ fill: "rgba(15,23,42,0.75)" }} content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11 }} formatter={(v) => (v === "spend" ? "Ad Spend" : "ROAS")} />
                <Bar
                  yAxisId="left"
                  dataKey="spend"
                  name="Ad Spend"
                  radius={[4, 4, 0, 0]}
                  fill="#e5e7eb"
                  opacity={0.9}
                  maxBarSize={24}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="roas"
                  name="ROAS"
                  stroke="#6366f1"
                  strokeWidth={2.4}
                  dot={{ r: 3, strokeWidth: 1.5, stroke: "#c7d2fe", fill: "#6366f1" }}
                  activeDot={{ r: 4.5 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Ad Sets & Creatives */}
        <section className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.2)]">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-sm font-semibold text-white">Ad Sets & Creatives</h2>
            <span className="text-[10px] text-white/50">Images & videos • Performance</span>
          </div>
          <div className="overflow-x-auto -mx-1">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-medium uppercase tracking-wider text-white/50">
                  <th className="pb-3 pr-4 pt-0">Type</th>
                  <th className="pb-3 pr-4 pt-0">Creative</th>
                  <th className="pb-3 pr-4 pt-0 text-right">Spend</th>
                  <th className="pb-3 pr-4 pt-0 text-right">ROAS</th>
                  <th className="pb-3 pr-4 pt-0 text-right">Conv. Rate</th>
                </tr>
              </thead>
              <tbody className="text-white/90">
                {MOCK_CREATIVES.map((row) => (
                  <tr key={row.id} className="border-b border-white/5 transition-colors hover:bg-zinc-900">
                    <td className="py-3 pr-4">
                      {row.type === "image" ? (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70">
                          <Image className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/70">
                          <Video className="h-4 w-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      <span className="font-medium text-white truncate max-w-[200px] block">{row.name}</span>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums text-white/80">
                      € {row.spend.toLocaleString("de-DE")}
                    </td>
                    <td className="py-3 pr-4 text-right">
                        <span
                          className={
                            row.roas >= 4
                              ? "text-emerald-400"
                              : row.roas < 2
                                ? "text-red-400"
                                : "text-sky-400"
                          }
                        >
                        {row.roas.toFixed(1)}x
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums text-white/80">
                      {row.convRate.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
