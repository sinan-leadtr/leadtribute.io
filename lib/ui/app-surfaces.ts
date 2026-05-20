/** Shared surfaces — white canvas, AMOLED dark cards (matches landing) */

export const appPageBg = "min-h-screen bg-white text-zinc-900";

/** Primary dark card — same family as homepage landingDarkCard */
export const appDarkCard =
  "rounded-[32px] border border-white/10 bg-gradient-to-b from-zinc-900/95 to-black text-white shadow-[0_18px_45px_rgba(0,0,0,0.85)]";

/** Compact KPI / metric / nested card */
export const appDarkCardSm =
  "rounded-2xl border border-white/10 bg-black text-white shadow-[0_12px_32px_rgba(0,0,0,0.75)] transition hover:border-white/25 hover:shadow-[0_0_40px_-16px_rgba(0,0,0,0.9)]";

export const appCard = appDarkCard;

export const appCardMuted =
  "rounded-2xl border border-white/10 bg-white/[0.03] text-white";

/** Large dashboard section (charts, tables wrapper) */
export const appSection = appDarkCard;

export const appChartWell =
  "rounded-2xl border border-white/10 bg-black/70 p-2";

/** Section titles on the white dashboard canvas */
export const appHeading = "text-sm font-semibold text-zinc-900";

export const appSectionTitle =
  "text-xs font-semibold uppercase tracking-[0.16em] text-white/50";

/** Titles on dark appCard surfaces */
export const appCardTitle = "text-sm font-semibold text-white";

export const appBreadcrumb = "text-xs font-medium text-zinc-500";

export const appTextMuted = "text-zinc-500";

export const appTextSubtle = "text-zinc-400";

/** Copy / labels inside dark panels */
export const appOnDarkMuted = "text-white/50";

export const appOnDarkBody = "text-white/80";

export const appOnDarkLabel = "mb-1 block text-xs font-medium text-white/50";

export const appOnDarkInput =
  "w-full rounded-2xl border border-white/15 bg-black/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10";

export const appBtnSecondary =
  "inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-900 shadow-sm transition hover:border-zinc-300 hover:bg-zinc-50";

export const appBtnPrimary =
  "inline-flex items-center gap-1.5 rounded-full bg-black px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:bg-zinc-800";

export const appChipActive =
  "rounded-full bg-black px-3 py-1.5 text-xs font-medium text-white shadow-sm";

export const appChipIdle =
  "rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900";

/** Chart filter chips on dark sections */
export const appChipOnDarkActive =
  "rounded-full border border-white/30 bg-white px-2.5 py-1 text-[11px] font-medium text-black shadow-sm";

export const appChipOnDarkIdle =
  "rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/70 transition hover:border-white/30 hover:bg-white/10 hover:text-white";
