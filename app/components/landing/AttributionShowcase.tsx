"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Layers, Sparkles } from "lucide-react";
import { ChannelLogo } from "@/app/components/icons";
import { COMMERCE_PLATFORMS } from "@/lib/commerce/platforms";
import { AttributionCreditRow } from "./AttributionCreditRow";
import { CommercePlatformChip } from "./CommercePlatformChip";
import { PreviewTabs } from "./PreviewTabs";
import {
  previewCard,
  previewLabel,
  previewPanel,
  previewShell,
} from "./preview-styles";

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

const DEMO_CREDITS: Record<
  string,
  { channel: string; channelId: string; share: number }[]
> = {
  markov: [
    { channel: "Meta", channelId: "meta", share: 38 },
    { channel: "Google", channelId: "google", share: 31 },
    { channel: "TikTok", channelId: "tiktok", share: 18 },
    { channel: "Email", channelId: "email", share: 9 },
    { channel: "Organic", channelId: "organic", share: 4 },
  ],
  last_click: [
    { channel: "Meta", channelId: "meta", share: 52 },
    { channel: "Google", channelId: "google", share: 28 },
    { channel: "TikTok", channelId: "tiktok", share: 12 },
    { channel: "Email", channelId: "email", share: 5 },
    { channel: "Organic", channelId: "organic", share: 3 },
  ],
  first_click: [
    { channel: "Google", channelId: "google", share: 41 },
    { channel: "Meta", channelId: "meta", share: 29 },
    { channel: "TikTok", channelId: "tiktok", share: 16 },
    { channel: "Email", channelId: "email", share: 10 },
    { channel: "Organic", channelId: "organic", share: 4 },
  ],
  linear: [
    { channel: "Meta", channelId: "meta", share: 34 },
    { channel: "Google", channelId: "google", share: 34 },
    { channel: "TikTok", channelId: "tiktok", share: 17 },
    { channel: "Email", channelId: "email", share: 9 },
    { channel: "Organic", channelId: "organic", share: 6 },
  ],
};

const JOURNEY_STEPS = [
  { label: "Google", id: "google" },
  { label: "Meta", id: "meta" },
  { label: "Email", id: "email" },
  { label: "Meta", id: "meta" },
  { label: "Purchase", id: "purchase" },
];

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
            <CommercePlatformChip
              key={p.id}
              id={p.id}
              label={p.label}
              status={p.status}
            />
          ))}
        </motion.div>

        <motion.div
          className={`relative mt-14 ${previewShell}`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="border-b border-white/10 p-4 sm:p-6">
            <PreviewTabs
              tabs={MODEL_TABS}
              activeId={activeModel}
              onChange={setActiveModel}
              ariaLabel="Attribution models"
            />
          </div>

          <motion.div className="grid gap-6 p-6 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:gap-10">
            <motion.div
              key={activeModel}
              className="min-w-0"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/20 ring-1 ring-violet-500/40"
                  animate={
                    activeModel === "markov" ? { scale: [1, 1.05, 1] } : { scale: 1 }
                  }
                  transition={{
                    repeat: activeModel === "markov" ? Infinity : 0,
                    duration: 2.5,
                  }}
                >
                  <GitBranch className="h-5 w-5 text-violet-300" />
                </motion.div>
                <div>
                  <p className={previewLabel}>Attribution model</p>
                  <h3 className="text-lg font-semibold">{activeTab.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {activeTab.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-2.5">
                {credits.map((row, i) => (
                  <AttributionCreditRow
                    key={`${activeModel}-${row.channelId}`}
                    channel={row.channel}
                    channelId={row.channelId}
                    share={row.share}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>

            <motion.div className={`flex flex-col justify-center min-w-0 p-6 ${previewCard}`}>
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Layers className="h-4 w-4 text-violet-300" />
                Sample journey
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                {JOURNEY_STEPS.map((step, i) => (
                  <motion.span
                    key={`${step.id}-${i}`}
                    className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 font-medium ${
                      step.id === "purchase"
                        ? "border-emerald-500/40 bg-emerald-500/20 text-emerald-300"
                        : "border-white/10 bg-white/5 text-white/90"
                    }`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                  >
                    {step.id !== "purchase" ? (
                      <ChannelLogo channel={step.id} size={16} />
                    ) : null}
                    {step.label}
                    {i < JOURNEY_STEPS.length - 1 ? (
                      <span className="ml-1 hidden text-white/30 sm:inline">→</span>
                    ) : null}
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
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[32px]"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.08) 0%, transparent 50%)",
            }}
            aria-hidden
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
