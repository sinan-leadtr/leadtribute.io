"use client";

import { useState } from "react";
import { toast } from "sonner";
import { CampaignTable, Campaign } from "./campaign-table";
import { CreativesGrid } from "./creatives-grid";
import { Sidebar } from "./sidebar";
import { UserNav } from "./user-nav";
import { Bot, Calendar, ShoppingBag } from "lucide-react";
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

const dualAxisData = Array.from({ length: 30 }).map((_, index) => {
    const day = index + 1;
    const baseSpend = 350 + Math.sin(index / 3) * 60 + (index % 5) * 18;
    const baseRoas = 3.6 + Math.cos(index / 4) * 0.5 + (index % 7) * 0.03;

    return {
        day: `Day ${day}`,
        spend: Math.round(baseSpend),
        roas: Number(baseRoas.toFixed(2)),
    };
});

const pacingTarget = 20000;
const pacingSpent = 12500;
const pacingPct = (pacingSpent / pacingTarget) * 100;
const pacingPlanPct = 60; // z.B. Plan für Tag X im Monat
const pacingDelta = pacingPct - pacingPlanPct;
const pacingIsOver = pacingDelta > 3; // Toleranz

type ChannelFilter = "all" | "meta" | "google" | "tiktok";

interface DashboardContentProps {
    campaigns: Campaign[];
}

export function DashboardContent({ campaigns }: DashboardContentProps) {
    const [channel, setChannel] = useState<ChannelFilter>("all");
    const [aiOpen, setAiOpen] = useState(false);
    const [aiReply, setAiReply] = useState<"ja" | "nein" | null>(null);

    return (
        <div className="flex min-h-screen bg-black text-white" style={{ backgroundColor: "#000000" }}>
            <Sidebar />

            {/* Main content – no background so body black shows through */}
            <main className="flex min-h-screen flex-1 flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                {/* Header */}
                <header className="mb-4 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                        <nav className="flex items-center gap-2 text-xs font-medium text-white/60">
                            <span className="cursor-pointer transition hover:text-white/90">
                                Home
                            </span>
                            <span className="text-white/40">/</span>
                            <span className="cursor-pointer transition hover:text-white/90">
                                Analytics
                            </span>
                            <span className="text-white/40">/</span>
                            <span className="text-white/90">Leadtribute Dashboard</span>
                        </nav>
                        <h1 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                            Leadtribute Performance Overview
                        </h1>
                        <p className="text-xs text-white/60">
                            Last 30 days • All channels • UTC
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => toast.success("Report export started. PDF will be ready shortly.")}
                            className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 shadow-sm shadow-black/30 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400 sm:inline-flex"
                        >
                            Export report
                        </button>

                        {/* Notifications */}
                        <button
                            type="button"
                            onClick={() => toast.info("You have no new notifications.")}
                            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/80 text-white/70 shadow-sm shadow-black/30 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
                        >
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-orange-400 shadow-sm shadow-orange-400/80" />
                            <span className="h-4 w-4 border-b border-white/40" />
                        </button>

                        <UserNav />
                    </div>
                </header>

                {/* Control Bar – Filter & Date */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-sm font-semibold text-white">Performance Overview</h2>
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
                                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${channel === id
                                    ? "bg-orange-500 text-black shadow-lg shadow-orange-500/20"
                                    : "border border-white/10 bg-black/80 text-white/70 hover:border-white/20 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                        <button
                            type="button"
                            onClick={() => toast("Date range: Last 30 Days", { duration: 2000 })}
                            className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/80 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
                        >
                            <Calendar className="h-3.5 w-3.5" aria-hidden />
                            <span>Last 30 Days</span>
                        </button>
                    </div>
                </div>

                {/* KPI cards */}
                <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <KpiCard
                        label="Total Spend"
                        value="€ 128.4K"
                        chip="+12.4% vs. last period"
                        chipTone="orange"
                    />
                    <KpiCard
                        label="ROAS"
                        value="4.32x"
                        chip="+0.41 uplift"
                        chipTone="orange"
                    />
                    <KpiCard
                        label="Revenue"
                        value="€ 554.2K"
                        chip="+96.2K vs. target"
                        chipTone="sky"
                    />
                    <KpiCard
                        label="CPR"
                        value="€ 18.67"
                        chip="-7.8% cost per lead"
                        chipTone="orange"
                    />
                </section>

                {/* Chart + Monthly pacing */}
                <section className="flex flex-1 flex-col gap-4 rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                        {/* Monthly pacing card */}
                        <div className="w-full rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 text-sm shadow-lg shadow-black/50 lg:w-72">
                            <div className="mb-3 flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/60">
                                        Monthly Pacing
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">
                                        Budget alignment
                                    </p>
                                </div>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${pacingIsOver
                                        ? "bg-red-500/10 text-red-300 ring-1 ring-red-500/40"
                                        : "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/40"
                                        }`}
                                >
                                    {pacingIsOver ? "Over" : "On track"}
                                </span>
                            </div>

                            <div className="mb-3 flex items-baseline justify-between text-xs">
                                <span className="text-white/60">
                                    Spent:{" "}
                                    <span className="font-semibold text-white">
                                        € {pacingSpent.toLocaleString("de-DE")}
                                    </span>{" "}
                                    / € {pacingTarget.toLocaleString("de-DE")}
                                </span>
                                <span className="font-medium text-white/70">
                                    {pacingPct.toFixed(0)}%
                                </span>
                            </div>

                            <div className="relative mb-2 h-2 w-full overflow-hidden rounded-full bg-white/5">
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

                            <p className="text-xs text-white/60">
                                {pacingIsOver ? (
                                    <>
                                        Du bist{" "}
                                        <span className="font-semibold text-red-300">
                                            {pacingDelta.toFixed(1)}% über
                                        </span>{" "}
                                        dem geplanten Budget.
                                    </>
                                ) : (
                                    <>
                                        Du liegst{" "}
                                        <span className="font-semibold text-emerald-300">
                                            {Math.abs(pacingDelta).toFixed(1)}% unter
                                        </span>{" "}
                                        dem geplanten Budget – stabil.
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Dual-axis chart */}
                        <div className="flex-1">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-sm font-semibold text-white">
                                        Spend &amp; ROAS – last 30 days
                                    </h2>
                                    <p className="text-xs text-white/60">
                                        Kombinierter Überblick: Tages-Spend (Balken) &amp; ROAS
                                        (Linie).
                                    </p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <button className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/90 shadow-sm shadow-black/30 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400">
                                        Last 30 days
                                    </button>
                                    <button className="rounded-full border border-transparent bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60 transition hover:border-white/10 hover:bg-white/5 hover:text-white">
                                        Compare period
                                    </button>
                                </div>
                            </div>

                            <div className="h-[320px] w-full rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-2 sm:h-[360px] lg:h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart
                                        data={dualAxisData}
                                        margin={{ top: 12, right: 32, left: 0, bottom: 8 }}
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
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            tickLine={false}
                                            axisLine={false}
                                            tick={{ fill: "#f97316", fontSize: 10 }}
                                            tickFormatter={(v) => `${v.toFixed ? v.toFixed(1) : v}x`}
                                        />
                                        <Tooltip
                                            cursor={{ fill: "rgba(15,23,42,0.75)" }}
                                            content={<CustomDualAxisTooltip />}
                                        />
                                        <Legend
                                            wrapperStyle={{ fontSize: 11 }}
                                            formatter={(value) =>
                                                value === "spend" ? "Ad Spend" : "ROAS"
                                            }
                                        />
                                        <Bar
                                            yAxisId="left"
                                            dataKey="spend"
                                            name="Ad Spend"
                                            radius={[4, 4, 0, 0]}
                                            fill="#e5e7eb"
                                            opacity={0.9}
                                            maxBarSize={18}
                                        />
                                        <Line
                                            yAxisId="right"
                                            type="monotone"
                                            dataKey="roas"
                                            name="ROAS"
                                            stroke="#f97316"
                                            strokeWidth={2.4}
                                            dot={{ r: 3, strokeWidth: 1.5, stroke: "#fed7aa", fill: "#f97316" }}
                                            activeDot={{ r: 4.5 }}
                                        />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profitability & Unit Economics */}
                <section className="mt-6">
                    <h2 className="mb-4 text-sm font-semibold text-white">Profitability & Unit Economics</h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Shopify Revenue */}
                        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-orange-500/30 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]">
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
                                    <ShoppingBag className="h-4 w-4" />
                                </span>
                                <span className="text-xs font-medium uppercase tracking-wider text-white/50">
                                    Shopify Revenue
                                </span>
                            </div>
                            <p className="text-2xl font-bold tracking-tight text-white">
                                154.000 €
                            </p>
                            <p className="text-[11px] text-emerald-400/90">+15% vs last month</p>
                        </div>

                        {/* MER */}
                        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-orange-500/30 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]">
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
                            className="group relative flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-orange-500/30 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]"
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
                        <div className="flex flex-col gap-2 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-4 transition hover:border-orange-500/30 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.2)]">
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
                    <div className="rounded-3xl border border-zinc-800 border-l-4 border-l-[#25D366] bg-zinc-950/80 p-4 transition hover:border-orange-500/20 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.15)] lg:p-5">
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

                {/* Active Campaigns */}
                <section id="campaigns" className="mt-6 scroll-mt-4">
                    <CampaignTable campaigns={campaigns} />
                </section>

                {/* Top Performing Creatives */}
                <section className="mt-6">
                    <CreativesGrid />
                </section>
            </main>

            {/* AI Copilot – Floating Action Button + Chat Popover */}
            <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
                {aiOpen && (
                    <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950/95 shadow-2xl shadow-black/80 backdrop-blur-sm sm:max-w-xs">
                        <div className="border-b border-white/10 px-4 py-3">
                            <p className="text-xs font-semibold text-orange-400">AI Copilot</p>
                            <p className="text-[10px] text-white/50">Leadtribute Assistant</p>
                        </div>
                        <div className="space-y-3 p-4">
                            <div className="rounded-xl border border-white/5 bg-black/50 px-3 py-2.5 text-xs text-white/90">
                                <p>
                                    Hi Sinan! Dein ROAS auf TikTok ist heute um 15% gestiegen. 🎉 Soll ich das Budget skalieren?
                                </p>
                            </div>
                            {aiReply === null ? (
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setAiReply("ja")}
                                        className="rounded-full bg-orange-500 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-orange-400"
                                    >
                                        Ja, mach +20%
                                    </button>
                                    <button
                                        onClick={() => setAiReply("nein")}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition hover:bg-white/10"
                                    >
                                        Nein, ignorieren
                                    </button>
                                </div>
                            ) : (
                                <p className="text-[11px] text-white/50">
                                    {aiReply === "ja"
                                        ? "Okay, Budget wird um 20% erhöht. (Mock)"
                                        : "Alles klar, keine Änderung. (Mock)"}
                                </p>
                            )}
                        </div>
                    </div>
                )}
                <button
                    onClick={() => setAiOpen((o) => !o)}
                    className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-400 hover:shadow-orange-500/30"
                    aria-label="AI Copilot öffnen"
                >
                    <Bot className="h-7 w-7" />
                </button>
            </div>
        </div>
    );
}

type KpiTone = "orange" | "sky" | "emerald";

interface KpiCardProps {
    label: string;
    value: string;
    chip: string;
    chipTone?: KpiTone;
}

function KpiCard({
    label,
    value,
    chip,
    chipTone = "emerald",
}: KpiCardProps) {
    const chipBase =
        chipTone === "orange"
            ? "bg-orange-500/10 text-orange-300 border-orange-400/40"
            : chipTone === "sky"
                ? "bg-sky-500/10 text-sky-300 border-sky-400/40"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-400/40"; // Added default emerald handling

    const dotBase =
        chipTone === "orange"
            ? "bg-orange-400 shadow-orange-400/70"
            : chipTone === "sky"
                ? "bg-sky-400 shadow-sky-400/70"
                : "bg-emerald-400 shadow-emerald-400/70";

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-4 shadow-xl shadow-black/50 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-orange-500/50 hover:bg-orange-500/10 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)]">
            <div className="relative flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                        {label}
                    </p>
                    <span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm transition group-hover:border-orange-400/60 group-hover:text-orange-200">
                        <span
                            className={`h-1.5 w-1.5 rounded-full shadow ${dotBase}`}
                        />
                        Live
                    </span>
                </div>

                <p className="text-2xl font-semibold tracking-tight text-white">
                    {value}
                </p>

                <div className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm transition group-hover:shadow-[0_0_0_1px_rgba(249,115,22,0.65)] group-hover:brightness-110">
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
    const roasItem = payload.find((p) => p.dataKey === "roas");

    if (!spendItem || !roasItem) return null;

    return (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/95 px-3 py-2 text-xs text-white shadow-2xl shadow-black/70">
            <p className="mb-1 text-[11px] font-medium text-white/70">{label}</p>
            <div className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1 text-white/60">
                        <span className="h-2 w-2 rounded-sm bg-white/30" />
                        Ad Spend
                    </span>
                    <span className="font-medium text-white">
                        € {spendItem.value.toLocaleString("de-DE")}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-1 text-white/60">
                        <span className="h-2 w-2 rounded-full bg-orange-400" />
                        ROAS
                    </span>
                    <span className="font-medium text-orange-300">
                        {roasItem.value.toFixed(2)}x
                    </span>
                </div>
            </div>
        </div>
    );
}
