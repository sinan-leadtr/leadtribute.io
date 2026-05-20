import { BadgeCheck } from "lucide-react";
import type { TierBadgeVariant } from "./pricing-features";

const darkVariantClass: Record<TierBadgeVariant, string> = {
  neutral:
    "border-white/20 bg-white/10 text-white/70",
  best: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30",
  team: "border-sky-500/35 bg-sky-500/10 text-sky-200 ring-1 ring-sky-500/25",
};

const lightVariantClass: Record<TierBadgeVariant, string> = {
  neutral:
    "border-black/15 bg-black/[0.04] text-black/55",
  best: "border-emerald-600/35 bg-emerald-500/10 text-emerald-700 ring-1 ring-emerald-500/25",
  team: "border-sky-600/30 bg-sky-500/10 text-sky-700 ring-1 ring-sky-500/20",
};

type Props = {
  label: string;
  variant: TierBadgeVariant;
  theme?: "dark" | "light";
};

export function PricingTierBadge({ label, variant, theme = "dark" }: Props) {
  const variantClass = theme === "light" ? lightVariantClass : darkVariantClass;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${variantClass[variant]}`}
    >
      {variant === "best" ? <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
      {label}
    </span>
  );
}
