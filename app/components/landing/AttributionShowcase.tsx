"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  GitBranch,
  Layers,
  MousePointerClick,
  Route,
  Sparkles,
  Split,
} from "lucide-react";
import { ChannelLogo } from "@/app/components/icons";
import { COMMERCE_PLATFORMS } from "@/lib/commerce/platforms";
import { AttributionCreditRow } from "./AttributionCreditRow";
import { AttributionJourney } from "./AttributionJourney";
import { CommercePlatformChip } from "./CommercePlatformChip";
import { PreviewTabs } from "./PreviewTabs";
import { previewCard, previewLabel, previewShell } from "./preview-styles";

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

const MODEL_META: Record<
  string,
  {
    icon: typeof GitBranch;
    banner: string;
    bannerClass: string;
    headerRing: string;
    headerBg: string;
    iconClass: string;
  }
> = {
  markov: {
    icon: GitBranch,
    banner: "Path-weighted attribution — recommended for budget decisions",
    bannerClass:
      "border-violet-500/40 bg-violet-500/15 text-violet-200 ring-1 ring-violet-500/30",
    headerRing: "ring-violet-500/50",
    headerBg: "bg-violet-500/20",
    iconClass: "text-violet-300",
  },
  last_click: {
    icon: MousePointerClick,
    banner: "Single-touch: only the last click before purchase is credited",
    bannerClass: "border-white/15 bg-white/5 text-white/70",
    headerRing: "ring-white/20",
    headerBg: "bg-white/10",
    iconClass: "text-white/80",
  },
  first_click: {
    icon: Route,
    banner: "Single-touch: only the first discovery touch is credited",
    bannerClass: "border-white/15 bg-white/5 text-white/70",
    headerRing: "ring-white/20",
    headerBg: "bg-white/10",
    iconClass: "text-white/80",
  },
  linear: {
    icon: Split,
    banner: "Equal split: every touch in the path receives the same share",
    bannerClass: "border-sky-500/30 bg-sky-500/10 text-sky-200",
    headerRing: "ring-sky-500/30",
    headerBg: "bg-sky-500/15",
    iconClass: "text-sky-300",
  },
};

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

export function AttributionShowcase() {
  const [activeModel, setActiveModel] = useState("markov");
  const isMarkov = activeModel === "markov";

  const credits = useMemo(
    () => DEMO_CREDITS[activeModel] ?? DEMO_CREDITS.markov,
    [activeModel],
  );
  const activeTab = MODEL_TABS.find((t) => t.id === activeModel) ?? MODEL_TABS[0];
  const meta = MODEL_META[activeModel] ?? MODEL_META.markov;
  const ModelIcon = meta.icon;
  const topChannel = credits[0];

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
          className={`relative mt-14 transition-shadow duration-500 ${previewShell} ${
            isMarkov
              ? "ring-2 ring-violet-500/50 shadow-[0_0_80px_-20px_rgba(139,92,246,0.75)]"
              : "ring-1 ring-white/10"
          }`}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <div className="space-y-4 border-b border-white/10 p-4 sm:p-6">
            <PreviewTabs
              tabs={MODEL_TABS}
              activeId={activeModel}
              onChange={setActiveModel}
              ariaLabel="Attribution models"
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={activeModel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
                className={`rounded-xl px-3 py-2 text-center text-xs font-medium sm:text-sm ${meta.bannerClass}`}
              >
                {meta.banner}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="grid gap-6 p-6 sm:gap-8 sm:p-8 lg:grid-cols-2 lg:gap-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModel}
                className={`min-w-0 rounded-2xl p-4 transition-colors duration-500 ${
                  isMarkov ? "bg-violet-500/[0.08] ring-1 ring-violet-500/25" : ""
                }`}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ring-1 ${meta.headerBg} ${meta.headerRing}`}
                    animate={isMarkov ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{
                      repeat: isMarkov ? Infinity : 0,
                      duration: 2.5,
                    }}
                  >
                    <ModelIcon className={`h-5 w-5 ${meta.iconClass}`} />
                  </motion.div>
                  <div>
                    <p className={previewLabel}>Attribution model</p>
                    <h3 className="text-lg font-semibold">{activeTab.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/60">
                      {activeTab.description}
                    </p>
                  </div>
                </div>

                {topChannel ? (
                  <motion.div
                    key={`top-${activeModel}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`mt-5 flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                      isMarkov
                        ? "border-violet-500/35 bg-violet-500/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <ChannelLogo channel={topChannel.channelId} size={20} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-wider text-white/45">
                        Top credited channel
                      </p>
                      <p className="font-semibold text-white">
                        {topChannel.channel}{" "}
                        <span className="text-violet-300">{topChannel.share}%</span>
                      </p>
                    </div>
                  </motion.div>
                ) : null}

                <div className="mt-6 space-y-2.5">
                  {credits.map((row, i) => (
                    <AttributionCreditRow
                      key={`${activeModel}-${row.channelId}`}
                      channel={row.channel}
                      channelId={row.channelId}
                      share={row.share}
                      index={i}
                      modelKey={activeModel}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className={`flex min-w-0 flex-col justify-center p-6 ${previewCard} ${
                isMarkov ? "ring-1 ring-violet-500/20" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Layers className="h-4 w-4 text-violet-300" />
                Sample journey
                <span className="ml-auto rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/50">
                  {activeTab.label}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <div className="mt-6">
                  <AttributionJourney modelId={activeModel} isMarkov={isMarkov} />
                </div>
              </AnimatePresence>

              <ul className="mt-6 space-y-2 border-t border-white/10 pt-4 text-sm text-white/60">
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
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-[32px]"
            animate={{
              background: isMarkov
                ? "linear-gradient(135deg, rgba(139,92,246,0.14) 0%, transparent 55%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)",
            }}
            transition={{ duration: 0.5 }}
            aria-hidden
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
