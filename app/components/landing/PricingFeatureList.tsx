"use client";

import { AlertCircle, Check, X } from "lucide-react";
import type { FeatureStatus, PricingFeature } from "./pricing-features";

const darkStyles: Record<
  FeatureStatus,
  { icon: typeof Check; iconClass: string; textClass: string }
> = {
  included: {
    icon: Check,
    iconClass: "text-emerald-400",
    textClass: "text-white/90",
  },
  limited: {
    icon: AlertCircle,
    iconClass: "text-amber-400",
    textClass: "text-amber-100/90",
  },
  excluded: {
    icon: X,
    iconClass: "text-red-400",
    textClass: "text-white/45",
  },
};

const lightStyles: Record<
  FeatureStatus,
  { icon: typeof Check; iconClass: string; textClass: string }
> = {
  included: {
    icon: Check,
    iconClass: "text-emerald-600",
    textClass: "text-black/85",
  },
  limited: {
    icon: AlertCircle,
    iconClass: "text-amber-600",
    textClass: "text-amber-900/80",
  },
  excluded: {
    icon: X,
    iconClass: "text-red-500",
    textClass: "text-black/40",
  },
};

type Props = {
  features: PricingFeature[];
  theme?: "dark" | "light";
  /** Brighter greens on the featured Pro card (dark theme) */
  emphasized?: boolean;
};

export function PricingFeatureList({ features, theme = "dark", emphasized }: Props) {
  const statusStyles = theme === "light" ? lightStyles : darkStyles;

  return (
    <ul className="mt-6 flex-1 space-y-3">
      {features.map((feature) => {
        const style = statusStyles[feature.status];
        const Icon = style.icon;
        const iconClass =
          emphasized && feature.status === "included" && theme === "dark"
            ? "text-emerald-300"
            : style.iconClass;
        const textClass =
          emphasized && feature.status === "included" && theme === "dark"
            ? "text-white"
            : style.textClass;

        return (
          <li
            key={feature.label}
            className={`flex items-start gap-2.5 text-sm ${textClass}`}
          >
            <Icon className={`h-5 w-5 shrink-0 ${iconClass}`} aria-hidden />
            <span>{feature.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
