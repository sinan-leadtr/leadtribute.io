"use client";

import { motion } from "framer-motion";
import { ChannelLogo } from "@/app/components/icons";

export type JourneyStep = {
  id: string;
  label: string;
  emphasis: "none" | "credit" | "full" | "winner";
  creditLabel?: string;
};

export type ModelJourney = {
  steps: JourneyStep[];
  caption: string;
  insight: string;
};

export const MODEL_JOURNEYS: Record<string, ModelJourney> = {
  markov: {
    steps: [
      { id: "google", label: "Google", emphasis: "credit", creditLabel: "31%" },
      { id: "meta", label: "Meta", emphasis: "credit", creditLabel: "38%" },
      { id: "email", label: "Email", emphasis: "credit", creditLabel: "9%" },
      { id: "tiktok", label: "TikTok", emphasis: "credit", creditLabel: "18%" },
      { id: "purchase", label: "Purchase", emphasis: "winner" },
    ],
    caption: "Path-based credit — influence split across touches",
    insight:
      "Markov credits Meta & Google most: they show up on the majority of converting journeys, not just the last click.",
  },
  last_click: {
    steps: [
      { id: "tiktok", label: "TikTok", emphasis: "none" },
      { id: "google", label: "Google", emphasis: "none" },
      { id: "email", label: "Email", emphasis: "none" },
      { id: "meta", label: "Meta", emphasis: "winner", creditLabel: "100%" },
      { id: "purchase", label: "Purchase", emphasis: "winner" },
    ],
    caption: "Last touch gets all credit",
    insight:
      "Only Meta before checkout is credited — earlier TikTok and Google touches get zero revenue share.",
  },
  first_click: {
    steps: [
      { id: "google", label: "Google", emphasis: "winner", creditLabel: "100%" },
      { id: "meta", label: "Meta", emphasis: "none" },
      { id: "email", label: "Email", emphasis: "none" },
      { id: "tiktok", label: "TikTok", emphasis: "none" },
      { id: "purchase", label: "Purchase", emphasis: "winner" },
    ],
    caption: "First touch gets all credit",
    insight:
      "Google discovery is credited in full — Meta, Email, and TikTok later in the path receive nothing.",
  },
  linear: {
    steps: [
      { id: "meta", label: "Meta", emphasis: "full", creditLabel: "25%" },
      { id: "google", label: "Google", emphasis: "full", creditLabel: "25%" },
      { id: "email", label: "Email", emphasis: "full", creditLabel: "25%" },
      { id: "tiktok", label: "TikTok", emphasis: "full", creditLabel: "25%" },
      { id: "purchase", label: "Purchase", emphasis: "winner" },
    ],
    caption: "Equal credit on every touch",
    insight:
      "Each channel in the path receives the same share — simple, but ignores true influence differences.",
  },
};

function stepClass(step: JourneyStep, isMarkov: boolean): string {
  const base =
    "inline-flex items-center gap-2 rounded-xl border px-3 py-2 font-medium transition-colors";

  if (step.id === "purchase") {
    return `${base} border-emerald-500/40 bg-emerald-500/20 text-emerald-300`;
  }

  switch (step.emphasis) {
    case "winner":
      return `${base} border-emerald-400/50 bg-emerald-500/15 text-emerald-200 ring-2 ring-emerald-400/40`;
    case "credit":
      return isMarkov
        ? `${base} border-violet-400/50 bg-violet-500/15 text-violet-100 ring-2 ring-violet-400/35`
        : `${base} border-white/10 bg-white/5 text-white/90`;
    case "full":
      return `${base} border-sky-400/40 bg-sky-500/10 text-sky-100 ring-1 ring-sky-400/30`;
    default:
      return `${base} border-white/10 bg-white/[0.03] text-white/45 opacity-70`;
  }
}

type Props = {
  modelId: string;
  isMarkov: boolean;
};

export function AttributionJourney({ modelId, isMarkov }: Props) {
  const journey = MODEL_JOURNEYS[modelId] ?? MODEL_JOURNEYS.markov;

  return (
    <motion.div
      key={modelId}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
    >
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/45">
        {journey.caption}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
        {journey.steps.map((step, i) => (
          <motion.span
            key={`${modelId}-${step.id}-${i}`}
            className={stepClass(step, isMarkov)}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.07 }}
          >
            {step.id !== "purchase" ? (
              <ChannelLogo channel={step.id} size={16} />
            ) : null}
            <span>{step.label}</span>
            {step.creditLabel ? (
              <span
                className={`ml-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-bold tabular-nums ${
                  step.emphasis === "winner"
                    ? "bg-emerald-500/30 text-emerald-200"
                    : step.emphasis === "full"
                      ? "bg-sky-500/25 text-sky-200"
                      : "bg-violet-500/30 text-violet-200"
                }`}
              >
                {step.creditLabel}
              </span>
            ) : null}
            {i < journey.steps.length - 1 ? (
              <span className="ml-0.5 hidden text-white/25 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </motion.span>
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-white/55">{journey.insight}</p>
    </motion.div>
  );
}
