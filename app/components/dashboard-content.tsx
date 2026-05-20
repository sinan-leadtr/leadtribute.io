"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CampaignTable, Campaign } from "./campaign-table";
import { RevenueChart } from "./dashboard/RevenueChart";
import { PlatformSpendChart } from "./charts/platform-spend-chart";
import { Integrations } from "./dashboard/Integrations";
import { CreativesGrid } from "./creatives-grid";
import { DashboardShell } from "./dashboard/DashboardShell";
import { StarterDashboard } from "./dashboard/StarterDashboard";
import { AttributionPanel } from "./dashboard/AttributionPanel";
import { Bot, Calendar, ShoppingBag, Sparkles } from "lucide-react";
import type { UserPlanState } from "@/lib/plans/types";
import { generateDemoData, syncData } from "@/app/dashboard/actions";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    ComposedChart,
} from "recharts";

const pacingTarget = 20000;
const pacingSpent = 12500;
const pacingPct = (pacingSpent / pacingTarget) * 100;
const pacingPlanPct = 60; // z.B. Plan für Tag X im Monat
const pacingDelta = pacingPct - pacingPlanPct;
const pacingIsOver = pacingDelta > 3; // Toleranz

type ChannelFilter = "all" | "meta" | "google" | "tiktok";

type AttributionCredit = {
    channel: string;
    creditedRevenue: number;
    creditShare: number;
};

interface DashboardContentProps {
    planState: UserPlanState;
    campaigns: Campaign[];
    integrations: { id: string; platform: string; status: string; connected_at: string }[];
    integrationCount: number;
    attributionCredits: AttributionCredit[];
    analytics: {
        blended: { date: string; spend: number; revenue: number; roas: number }[];
        totals: { totalSpend: number; totalRevenue: number; roas: number };
        platformSpend: { platform: string; spend: number }[];
    };
    forecast: { forecastedRevenue: number; trendPercentage: number } | null;
}

export function DashboardContent({
    planState,
    campaigns,
    integrations = [],
    integrationCount,
    attributionCredits = [],
    analytics,
    forecast,
}: DashboardContentProps) {
    const router = useRouter();
    const [channel, setChannel] = useState<ChannelFilter>("all");
    const [aiOpen, setAiOpen] = useState(false);
    const [aiReply, setAiReply] = useState<"yes" | "no" | null>(null);
    const [demoLoading, setDemoLoading] = useState(false);
    const [syncLoading, setSyncLoading] = useState(false);

    if (planState.effectivePlanId === "starter") {
        return (
            <StarterDashboard
                planState={planState}
                campaigns={campaigns}
                integrations={integrations}
                analytics={{
                    blended: analytics?.blended ?? [],
                    totals: analytics?.totals ?? { totalSpend: 0, totalRevenue: 0, roas: 0 },
                }}
                integrationCount={integrationCount}
            />
        );
    }

    const historyDays = planState.entitlements.historyDays;
    const showForecast = planState.entitlements.forecast;
    const showAi = planState.entitlements.aiCopilot;
    const showMarkov = planState.entitlements.markovAttribution;

    const blended = analytics?.blended ?? [];
    const platformSpend = analytics?.platformSpend ?? [];
    const totals = analytics?.totals ?? { totalSpend: 0, totalRevenue: 0, roas: 0 };
    const hasAnalytics = blended.length > 0;

    const totalSpend = totals.totalSpend;
    const totalRevenue = totals.totalRevenue;
    const totalRoas = totals.roas;

    const hasForecast = showForecast && !!forecast && forecast.forecastedRevenue > 0;
    const forecastRevenue = hasForecast ? forecast!.forecastedRevenue : 0;
    const forecastTrend = hasForecast ? forecast!.trendPercentage : 0;
    const forecastChip = hasForecast
        ? `AI model • ${forecastTrend >= 0 ? "+" : ""}${forecastTrend.toFixed(1)}% vs. start`
        : "No forecast yet";
    const forecastTone: KpiTone = !hasForecast
        ? "sky"
        : forecastTrend >= 0
            ? "emerald"
            : "sky";

    const chartData = blended.map((d) => ({
        day: new Date(d.date + "T00:00:00Z").toLocaleDateString("de-DE", {
            day: "2-digit",
            month: "short",
        }),
        spend: Math.round(d.spend),
        revenue: Math.round(d.revenue),
        roas: d.roas,
    }));

    const revenueChartData = chartData;

    async function handleGenerateDemo() {
        setDemoLoading(true);
        const result = await generateDemoData();
        setDemoLoading(false);
        if (result.ok) {
            toast.success("5 demo campaigns created. Refreshing…");
            router.refresh();
        } else {
            toast.error(result.error);
        }
    }

    async function handleSyncData() {
        setSyncLoading(true);
        const result = await syncData();
        setSyncLoading(false);
        if (result.ok) {
            toast.success(`Analytics synced for the last ${historyDays} days.`);
            router.refresh();
        } else {
            toast.error(result.error);
        }
    }

    const headerActions = (
        <button
            type="button"
            onClick={handleSyncData}
            disabled={syncLoading}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/15"
        >
            {syncLoading ? (
                <>
                    <span className="h-3 w-3 animate-spin rounded-full border border-white/20 border-t-white" />
                    Syncing…
                </>
            ) : (
                <>
                    <Sparkles className="h-3.5 w-3.5" />
                    Sync now
                </>
            )}
        </button>
    );

    return (
        <>
        <DashboardShell
            planState={planState}
            title="Performance overview"
            subtitle={`Last ${historyDays} days · All channels · UTC`}
            headerActions={headerActions}
        >
                {/* Control Bar – Filter & Date */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-sm font-semibold text-white">Performance overview</h2>
                    <div className="flex flex-wrap items-center gap-2">
                        {(
                            [
                                { id: "all" as const, label: "All Channels" },
                                { id: "meta" as const, label: "Meta" },
                                { id: "google" as const, label: "Google" },
                                { id: "tiktok" as const, label: "TikTok" },
                            ] as const
                            ).map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => {
                                    setChannel(id);
                                    const msg =
                                        id === "all"
                                            ? "Showing all channels"
                                            : `Filtering for ${label} Ads...`;
                                    toast(msg, { duration: 2000 });
                                }}
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                                    channel === id
                                        ? "bg-white text-zinc-950 shadow-lg shadow-black/30"
                                        : "border border-white/15 bg-white/[0.06] text-white/85 hover:border-white/25 hover:bg-white/[0.1] hover:text-white"
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => toast(`Date range: Last ${historyDays} days`, { duration: 2000 })}
                            className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-900 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-black hover:border-black"
                        >
                            <Calendar className="h-3.5 w-3.5" aria-hidden />
                            <span>Last {historyDays} days</span>
                        </button>
                    </div>
                </div>

                {/* KPI cards */}
                <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <KpiCard
                        label="Total Spend"
                        value={`€ ${totalSpend.toLocaleString("de-DE")}`}
                        chip={`Last ${historyDays} days`}
                        chipTone="sky"
                    />
                    <KpiCard
                        label="ROAS"
                        value={`${totalRoas.toFixed(2)}x`}
                        chip={`Blended ROAS (${historyDays}d)`}
                        chipTone="emerald"
                    />
                    <KpiCard
                        label="Revenue"
                        value={`€ ${totalRevenue.toLocaleString("de-DE")}`}
                        chip={`Last ${historyDays} days`}
                        chipTone="sky"
                    />
                    <KpiCard
                        label="AI Forecast (Revenue)"
                        value={`€ ${forecastRevenue.toLocaleString("de-DE")}`}
                        chip={forecastChip}
                        chipTone={forecastTone}
                        icon={<Bot className="h-3 w-3 text-emerald-300" />}
                    />
                </section>

                {/* Chart + Monthly pacing */}
                <section className="flex flex-1 flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-black/5">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                        {/* Monthly pacing card */}
                        <div className="w-full rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-900 shadow-lg shadow-black/5 lg:w-72">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                                        Monthly Pacing
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900">
                                        Budget alignment
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${pacingIsOver
                                        ? "bg-red-100 text-red-800 ring-1 ring-red-300/80"
                                        : "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300/80"
                                        }`}
                                >
                                    {pacingIsOver ? "Over" : "On track"}
                                </span>
                            </div>

                            <div className="mb-3 flex items-baseline justify-between text-xs">
                                <span className="text-slate-600">
                                    Spent:{" "}
                                    <span className="font-semibold text-slate-900">
                                        € {pacingSpent.toLocaleString("de-DE")}
                                    </span>{" "}
                                    / € {pacingTarget.toLocaleString("de-DE")}
                                </span>
                                <span className="font-medium text-slate-700">
                                    {pacingPct.toFixed(0)}%
                                </span>
                            </div>

                            <div className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                                {/* Planned line */}
                                <div
                                    className="pointer-events-none absolute inset-y-0 w-[2px] bg-white/20"
                                    style={{ left: `${Math.min(pacingPlanPct, 100)}%` }}
                                />
                                {/* Actual progress */}
                                <div
                                    className={`h-full rounded-full ${pacingIsOver ? "bg-red-500" : "bg-emerald-500"
                                        }`}
                                    style={{ width: `${Math.min(pacingPct, 110)}%` }}
                                />
                            </div>

                            <p className="text-xs text-slate-600">
                                {pacingIsOver ? (
                                    <>
                                        You are{" "}
                                        <span className="font-semibold text-red-700">
                                            {pacingDelta.toFixed(1)}% above
                                        </span>{" "}
                                        the planned budget.
                                    </>
                                ) : (
                                    <>
                                        You are{" "}
                                        <span className="font-semibold text-emerald-800">
                                            {Math.abs(pacingDelta).toFixed(1)}% below
                                        </span>{" "}
                                        the planned budget — on track.
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Dual-axis chart */}
                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-sm font-semibold text-slate-900">
                                        Spend &amp; ROAS – last {historyDays} days
                                    </h2>
                                    <p className="text-xs text-slate-500">
                                        Combined view: daily spend (bars) and ROAS (line).
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <button className="rounded-full border border-slate-300 bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white shadow-sm shadow-black/30 transition hover:bg-black hover:border-black">
                                        Last {historyDays} days
                                    </button>
                                    <button className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-700 transition hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900">
                                        Compare period
                                    </button>
                                </div>
                            </div>

                            <div className="h-[320px] w-full rounded-2xl border border-slate-200 bg-white p-2 sm:h-[360px] lg:h-[400px]">
                                {!hasAnalytics ? (
                                    <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                                        <p className="text-sm font-medium text-slate-900">
                                            No analytics yet
                                        </p>
                                        <p className="max-w-sm text-xs text-slate-500">
                                            Connect Shopify under Data Sources, then click Sync
                                            Now to load your last {historyDays} days.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={handleSyncData}
                                            disabled={syncLoading}
                                            className="inline-flex items-center gap-1.5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white"
                                        >
                                            {syncLoading ? "Syncing…" : "Sync Now"}
                                        </button>
                                    </div>
                                ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart
                                        data={chartData}
                                        margin={{ top: 12, right: 16, left: 0, bottom: 8 }}
                                    >
                                        <CartesianGrid
                                            stroke="#1e293b"
                                            strokeDasharray="3 3"
                                            vertical={false}
                                        />
                                        <XAxis
                                            dataKey="day"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#94a3b8", fontSize: 10 }}
                                            interval={4}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#64748b", fontSize: 10 }}
                                            tickFormatter={(v) => `€${v}`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: "rgba(15,23,42,0.75)" }}
                                            content={<CustomDualAxisTooltip />}
                                        />
                                        <Legend wrapperStyle={{ fontSize: 11 }} />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="spend"
                                            name="Ad Spend"
                                            radius={[4, 4, 0, 0]}
                                            fill="#38bdf8"
                                            opacity={0.9}
                                            maxBarSize={18}
                                        />
                                        <Line
                                            yAxisId="left"
                                            type="monotone"
                                            dataKey="revenue"
                                            name="Revenue"
                                            stroke="#6366f1"
                                            strokeWidth={2.4}
                                            dot={{ r: 3, strokeWidth: 1.5, stroke: "#c7d2fe", fill: "#6366f1" }}
                                            activeDot={{ r: 4.5 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profitability & Unit Economics */}
                <section className="mt-6">
                    <h2 className="mb-4 text-sm font-semibold text-white">Profitability &amp; unit economics</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Shopify Revenue */}
                        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                                    <ShoppingBag className="h-4 w-4" />
                                </span>
                                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                    Shopify Revenue
                                </span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight text-white">
                                € {totalRevenue.toLocaleString("de-DE")}
                            </p>
                            <p className="text-[11px] text-emerald-400/90">+15% vs last month</p>
                        </div>

                        {/* MER */}
                        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
                            <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                MER (Marketing Efficiency Ratio)
                            </span>
                            <p className="text-2xl font-bold tracking-tight text-white">4.3 MER</p>
                            <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                                <div
                                    className="h-full rounded-full bg-emerald-500"
                                    style={{ width: "min(100%, (4.3 / 5) * 100%)" }}
                                />
                            </div>
                            <p className="text-[11px] text-white/50">Target &gt; 3.0 · Healthy</p>
                        </div>

                        {/* Net Profit (Est.) */}
                        <div
                            className="group relative flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]"
                            title="Based on estimated 30% COGS"
                        >
                            <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                Net Profit (Est.)
                            </span>
                            <p className="text-2xl font-bold tracking-tight text-emerald-400">71.800 €</p>
                            <p className="text-[11px] text-white/50">Revenue − Ad Spend − 30% COGS</p>
                            <span className="absolute right-2 top-2 rounded bg-zinc-800 px-1.5 py-0.5 text-[9px] text-white/40 opacity-0 transition group-hover:opacity-100">
                                Based on estimated 30% COGS
                            </span>
                        </div>

                        {/* New Customer Rate */}
                        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
                            <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                New Customer Rate
                            </span>
                            <p className="text-2xl font-bold tracking-tight text-white">65%</p>
                            <p className="text-[11px] text-white/50">New Customers (Shopify)</p>
                        </div>
                    </div>
                </section>

                {/* Email & Retention Performance (Klaviyo Mock) */}
                <section className="mt-6">
                    <h2 className="mb-4 text-sm font-semibold text-white">Email & Retention Performance</h2>
                    <div className="rounded-3xl border border-zinc-800 border-l-4 border-l-[#25D366] bg-zinc-950/80 p-4 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)] lg:p-5">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            {/* Left: Email Revenue + List Growth */}
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                        Email Revenue
                                    </span>
                                    <p className="mt-0.5 text-2xl font-bold tracking-tight text-white">45.000 €</p>
                                    <p className="mt-0.5 text-[11px] text-[#25D366]">32% of Total Revenue · 30%+ is strong</p>
                                </div>
                                <div className="relative rounded-2xl border border-zinc-800 bg-black/40 p-3">
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                        List Growth
                                    </span>
                                    <p className="mt-0.5 text-xl font-bold tracking-tight text-[#25D366]">+1.200</p>
                                    <p className="text-[11px] text-white/50">New subscribers this month</p>
                                    {/* Mini sparkline */}
                                    <div className="absolute bottom-3 right-3 h-8 w-24 opacity-60">
                                        <svg viewBox="0 0 96 32" className="h-full w-full" preserveAspectRatio="none">
                                            <polyline
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-[#25D366]"
                                                points="0,28 16,24 32,20 48,14 64,10 80,6 96,4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* Right: Engagement + Top Campaign */}
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                        Engagement Stats
                                    </span>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-medium text-emerald-400 ring-1 ring-emerald-500/40">
                                            Open Rate: 42%
                                        </span>
                                        <span className="rounded-full bg-amber-500/20 px-2.5 py-1 text-[11px] font-medium text-amber-400 ring-1 ring-amber-500/40">
                                            Click Rate: 3.5%
                                        </span>
                                        <span className="rounded-full bg-zinc-800 px-2.5 py-1 text-[11px] font-medium text-white/70 ring-1 ring-zinc-700">
                                            Bounce Rate: 0.4%
                                        </span>
                                    </div>
                                </div>
                                <div className="rounded-2xl border border-zinc-800 bg-black/40 p-3">
                                    <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                        Top Campaign (Last Newsletter)
                                    </span>
                                    <p className="mt-1 truncate text-sm font-medium text-white" title="Sunday Sale: 20% off everything">
                                        Sunday Sale: 20% off everything
                                    </p>
                                    <p className="mt-0.5 text-lg font-bold tracking-tight text-[#25D366]">8.500 €</p>
                                    <p className="text-[11px] text-white/50">Revenue from this send</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Analytics Charts – Cards über der Tabelle */}
                <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
                        <RevenueChart data={revenueChartData} />
                    </div>
                    <div className="rounded-2xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:border-white/60 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]">
                        <PlatformSpendChart platformSpend={platformSpend} />
                    </div>
                </section>

                {/* Integrations – Google Ads & Meta Ads */}
                <Integrations integrations={integrations} />

                {showMarkov ? (
                    <section className="mt-6">
                        <AttributionPanel credits={attributionCredits} />
                    </section>
                ) : null}

                {/* Active Campaigns */}
                <section id="campaigns" className="mt-6 scroll-mt-4">
                    {campaigns.length === 0 ? (
                        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-10 text-center shadow-xl shadow-black/50 sm:p-14">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 ring-1 ring-violet-500/40">
                                <Sparkles className="h-7 w-7 text-violet-300" />
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-white">
                                No campaigns yet
                            </h2>
                            <p className="mt-2 max-w-sm mx-auto text-sm text-white/60">
                                Connect your ad accounts or generate demo data to see your performance table here.
                            </p>
                            <button
                                type="button"
                                onClick={handleGenerateDemo}
                                disabled={demoLoading}
                                className="btn-black mt-6 inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold disabled:opacity-70 disabled:cursor-wait"
                            >
                                {demoLoading ? (
                                    <>Creating…</>
                                ) : (
                                    <>
                                        <Sparkles className="h-4 w-4" />
                                        Generate Demo Data
                                    </>
                                )}
                            </button>
                        </div>
                    ) : (
                        <CampaignTable campaigns={campaigns} historyLabel={`Last ${historyDays} days`} />
                    )}
                </section>

                {/* Top Performing Creatives */}
                <section className="mt-6">
                    <CreativesGrid />
                </section>
        </DashboardShell>

            {showAi ? (
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
                {aiOpen && (
                    <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950/95 shadow-2xl shadow-black/80 backdrop-blur-sm sm:max-w-xs">
                        <div className="border-b border-white/10 px-4 py-3">
                            <p className="text-xs font-semibold text-sky-400">AI Copilot</p>
                            <p className="text-[10px] text-white/50">Leadtribute Assistant</p>
                        </div>
                        <div className="space-y-3 p-4">
                            <div className="rounded-xl border border-white/5 bg-black/50 px-3 py-2.5 text-xs text-white/90">
                                <p>
                                    Hi! Your TikTok ROAS is up 15% today. 🎉 Want me to scale the budget?
                                </p>
                            </div>
                            {aiReply === null ? (
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setAiReply("yes")}
                                        className="btn-black px-3 py-1.5 text-xs font-medium"
                                    >
                                        <span>Yes, increase +20%</span>
                                    </button>
                                    <button
                                        onClick={() => setAiReply("no")}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10"
                                    >
                                        No, ignore
                                    </button>
                                </div>
                            ) : (
                                <p className="text-[11px] text-white/50">
                                    {aiReply === "yes"
                                        ? "OK — budget increased by 20%. (Mock)"
                                        : "Got it — no changes made. (Mock)"}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setAiOpen((o) => !o)}
                    className="btn-black flex h-14 w-14 items-center justify-center text-white"
                    aria-label="Open AI Copilot"
                >
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-black">
                        <span
                            className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-tr from-sky-500 via-violet-500 to-emerald-400 opacity-80 blur-sm"
                            aria-hidden
                        />
                        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-black">
                            <Bot className="h-4 w-4 text-white" />
                        </span>
                    </span>
                </button>
            </div>
            ) : null}
        </>
    );
}

type KpiTone = "violet" | "sky" | "emerald";

interface KpiCardProps {
    label: string;
    value: string;
    chip: string;
    chipTone?: KpiTone;
    icon?: React.ReactNode;
}

function KpiCard({
    label,
    value,
    chip,
    chipTone = "emerald",
    icon,
}: KpiCardProps) {
    const chipBase =
        chipTone === "violet"
            ? "bg-violet-500/10 text-violet-300 border-violet-400/40"
            : chipTone === "sky"
                ? "bg-sky-500/10 text-sky-300 border-sky-400/40"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-400/40";

    const dotBase =
        chipTone === "violet"
            ? "bg-violet-400 shadow-violet-400/70"
            : chipTone === "sky"
                ? "bg-sky-400 shadow-sky-400/70"
                : "bg-emerald-400 shadow-emerald-400/70";

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/60 hover:bg-zinc-900 hover:shadow-[0_0_50px_-16px_rgba(0,0,0,0.9)]">
            <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                        {icon}
                        {label}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/40 px-2 py-0.5 text-[10px] font-medium text-white/80 backdrop-blur-sm transition group-hover:border-white group-hover:text-white">
                        <span
                            className={`h-1.5 w-1.5 rounded-full shadow ${dotBase}`}
                        />
                        Live
                    </span>
                </div>

                <p className="text-2xl font-semibold tracking-tight text-white">
                    {value}
                </p>

                <div className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm transition group-hover:border-white/80 group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.6)] group-hover:brightness-110">
                    <span className={`rounded-full px-1.5 py-0.5 text-[9px] ${chipBase}`}>
                        {chip}
                    </span>
                    <span className="text-white/60">vs. baseline</span>
                </div>
            </div>
        </article>
    );
}

type TooltipPayloadItem = {
    value: number;
    dataKey: string;
};

type TooltipProps = {
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
};

function CustomDualAxisTooltip({ active, payload, label }: TooltipProps) {
    if (!active || !payload || payload.length === 0) return null;

    const spendItem = payload.find((p) => p.dataKey === "spend");
    const revenueItem = payload.find((p) => p.dataKey === "revenue");


    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 px-3 py-2 text-xs text-white shadow-2xl shadow-black/70">
            <p className="mb-1 text-[11px] font-medium text-white">{label}</p>
            <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1 text-white/90">
                        <span className="h-2 w-2 rounded-sm bg-sky-400" />
                        Ad Spend
                    </span>
                    <span className="font-medium text-white">
                        € {Number(spendItem?.value ?? 0).toLocaleString("de-DE")}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1 text-white/90">
                        <span className="h-2 w-2 rounded-full bg-violet-400" />
                        Revenue
                    </span>
                    <span className="font-medium text-violet-200">
                        € {Number(revenueItem?.value ?? 0).toLocaleString("de-DE")}
                    </span>
                </div>
            </div>
        </div>
    );
}
