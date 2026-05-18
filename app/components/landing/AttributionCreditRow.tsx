"use client";

import { motion } from "framer-motion";
import { ChannelLogo } from "@/app/components/icons";
import { previewCard } from "./preview-styles";

const BAR_COLORS: Record<string, string> = {
  meta: "#0668E1",
  google: "#4285F4",
  tiktok: "#a1a1aa",
  email: "#F26522",
  organic: "#22c55e",
};

type Props = {
  channel: string;
  channelId: string;
  share: number;
  index: number;
  modelKey: string;
};

export function AttributionCreditRow({
  channel,
  channelId,
  share,
  index,
  modelKey,
}: Props) {
  const barColor = BAR_COLORS[channelId] ?? "#8b5cf6";

  return (
    <motion.div
      key={`${modelKey}-${channelId}`}
      className={`${previewCard} p-3 sm:p-3.5`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
            <ChannelLogo channel={channelId} size={18} />
          </span>
          <span className="truncate text-sm font-medium text-white">{channel}</span>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xl font-bold tabular-nums leading-none text-white">
            {share}
            <span className="ml-0.5 text-sm font-semibold text-white/70">%</span>
          </p>
          <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-white/40">
            credited
          </p>
        </div>

        <div className="col-span-2">
          <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ backgroundColor: barColor }}
              initial={{ width: 0 }}
              animate={{ width: `${share}%` }}
              transition={{
                duration: 0.65,
                delay: index * 0.08 + 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
