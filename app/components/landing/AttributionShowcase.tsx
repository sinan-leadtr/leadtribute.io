"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Layers, Sparkles } from "lucide-react";
import { COMMERCE_PLATFORMS } from "@/lib/commerce/platforms";

type ModelTab = {
  id: string;
  label: string;
  description: string;
  highlight?: boolean;
};

const MODEL_TABS: ModelTab[] = [
  {
    id: "markov",
    label: "Markov",
    description:
      "Removal-effect model: credits each channel for how often it appears on paths to conversion.",
    highlight: true,
  },
  {
    id: "last_click",
    label: "Last click",
    description: "100% credit to the final touch before purchase.",
  },
  {
    id: "first_click",
    label: "First click",
    description: "100% credit to the channel that started the journey.",
  },
  {
    id: "linear",
    label: "Linear",
    description: "Equal split across every touch in the path.",
  },
];

const DEMO_CREDITS: Record<string, { channel: string; share: number; color: string }[]> = {
  markov: [
    { channel: "Meta", share: 38, color: "bg-[#0668E1]" },
    { channel: "Google", share: 31, color: "bg-[#4285F4]" },
    { channel: "TikTok", share: 18, color: "bg-zinc-800" },
    { channel: "Email", share: 9, color: "bg-[#F26522]" },
    { channel: "Organic", share: 4, color: "bg-emerald-500" },
  ],
  last_click: [
    { channel: "Meta", share: 52, color: "bg-[#0668E1]" },
    { channel: "Google", share: 28, color: "bg-[#4285F4]" },
    { channel: "TikTok", share: 12, color: "bg-zinc-800" },
    { channel: "Email", share: 5, color: "bg-[#F26522]" },
    { channel: "Organic", share: 3, color: "bg-emerald-500" },
  ],
  first_click: [
    { channel: "Google", share: 41, color: "bg-[#4285F4]" },
    { channel: "Meta", share: 29, color: "bg-[#0668E1]" },
    { channel: "TikTok", share: 16, color: "bg-zinc-800" },
    { channel: "Email", share: 10, color: "bg-[#F26522]" },
    { channel: "Organic", share: 4, color: "bg-emerald-500" },
  ],
  linear: [
    { channel: "Meta", share: 34, color: "bg-[#0668E1]" },
    { channel: "Google", share: 34, color: "bg-[#4285F4]" },
    { channel: "TikTok", share: 17, color: "bg-zinc-800" },
    { channel: "Email", share: 9, color: "bg-[#F26522]" },
    { channel: "Organic", share: 6, color: "bg-emerald-500" },
  ],
};

export function AttributionShowcase() {
  const [activeModel, setActiveModel] = useState("markov");
  const credits = useMemo(
    () => DEMO_CREDITS[activeModel] ?? DEMO_CREDITS.markov,
    [activeModel],
  );
  const activeTab = MODEL_TABS.find((t) => t.id === activeModel) ?? MODEL_TABS[0];

  return (
    <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
      <motion.div
        className="mx-auto max-w-6xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="mx-auto flex max-w-xl items-center justify-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-2 text-sm font-medium text-violet-700"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Sparkles className="h-4 w-4" />
          Multi-touch attribution
        </motion.div>

        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Markov attribution,{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            not guesswork
          </span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-black/60 sm:text-lg">
          Unify ad spend and commerce revenue from Shopify, WooCommerce, and
          more. Compare Markov, last-click, and linear models on real order
          journeys — one dashboard for performance marketers.
        </p>

        <motion.div
          className="mt-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {COMMERCE_PLATFORMS.map((p) => (
            <span
              key={p.id}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${
                p.status === "available"
                  ? "border-black/10 bg-white text-black shadow-sm"
                  : "border-black/5 bg-zinc-50 text-black/40"
              }`}
            >
              {p.label}
              {p.status === "coming_soon" && (
                <span className="ml-1.5 text-[10px] uppercase tracking-wide text-black/30">
                  soon
                </span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.div
          className="mt-14 overflow-hidden rounded-[32px] border border-black/5 bg-zinc-950 text-white shadow-[0_24px_65px_rgba(0,0,0,0.85)]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <motion.div
            className="flex flex-wrap gap-2 border-b border-white/10 p-4 sm:p-6"
            role="tablist"
            aria-label="Attribution models"
          >
            {MODEL_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeModel === tab.id}
                onClick={() => setActiveModel(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  activeModel === tab.id
                    ? tab.highlight
                      ? "bg-violet-500 text-white shadow-[0_0_24px_-4px_rgba(139,92,246,0.8)]"
                      : "bg-white text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab.label}
                {tab.highlight && activeModel !== tab.id && (
                  <span className="ml-1 text-violet-300">★</span>
                )}
              </button>
            ))}
          </motion.div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12">
            <motion.div
              key={activeModel}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 ring-1 ring-violet-500/40"
                  animate={
                    activeModel === "markov"
                      ? { scale: [1, 1.05, 1] }
                      : { scale: 1 }
                  }
                  transition={{ repeat: activeModel === "markov" ? Infinity : 0, duration: 2.5 }}
                >
                  <GitBranch className="h-5 w-5 text-violet-300" />
                </motion.div>
                <motion.div>
                  <h3 className="text-lg font-semibold">{activeTab.label} model</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {activeTab.description}
                  </p>
                </motion.div>
              </div>

              <motion.div className="mt-8 space-y-4">
                {credits.map((row, i) => (
                  <motion.div
                    key={row.channel}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <motion.div
                      className="mb-1.5 flex justify-between text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.06 + 0.1 }}
                    >
                      <span className="font-medium">{row.channel}</span>
                      <span className="text-white/50">{row.share}% credited</span>
                    </motion.div>
                    <motion.div className="h-2.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full ${row.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${row.share}%` }}
                        transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Layers className="h-4 w-4" />
                Sample journey
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                {["Google", "Meta", "Email", "Meta", "Purchase"].map((step, i) => (
                  <motion.span
                    key={`${step}-${i}`}
                    className={`rounded-lg px-3 py-2 font-medium ${
                      step === "Purchase"
                        ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/40"
                        : "bg-white/10 text-white/90"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    {step}
                    {i < 4 && (
                      <span className="ml-2 hidden text-white/30 sm:inline">→</span>
                    )}
                  </motion.span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/50">
                Leadtribute builds paths from order landing URLs, referrers, and
                ad platforms — then runs your chosen model so budget follows true
                influence, not platform-reported last clicks alone.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/60">
                <li className="flex gap-2">
                  <span className="text-violet-400">•</span>
                  Commerce truth: Shopify, WooCommerce, BigCommerce & more
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400">•</span>
                  Ad layers: Meta, Google, TikTok, email
                </li>
                <li className="flex gap-2">
                  <span className="text-violet-400">•</span>
                  MER & ROAS on blended spend vs. store revenue
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
