"use client";

import { AlertCircle, Check, X } from "lucide-react";
import type { ComparisonRow } from "./pricing-comparison";
import type { FeatureStatus } from "./pricing-features";

function rowStyles(
  status: FeatureStatus,
  dimmed: boolean,
  emphasized: boolean,
): { Icon: typeof Check; iconClass: string; labelClass: string; valueClass: string } {
  if (emphasized) {
    return {
      Icon: Check,
      iconClass: "text-emerald-400",
      labelClass: "text-white/55",
      valueClass: "font-medium text-white",
    };
  }

  if (dimmed) {
    switch (status) {
      case "included":
        return {
          Icon: Check,
          iconClass: "text-white/35",
          labelClass: "text-white/40",
          valueClass: "font-medium text-white/50",
        };
      case "limited":
        return {
          Icon: AlertCircle,
          iconClass: "text-white/40",
          labelClass: "text-white/40",
          valueClass: "font-medium text-white/50",
        };
      case "excluded":
        return {
          Icon: X,
          iconClass: "text-red-400",
          labelClass: "text-white/40",
          valueClass: "font-medium text-white/45",
        };
    }
  }

  switch (status) {
    case "included":
      return {
        Icon: Check,
        iconClass: "text-emerald-400",
        labelClass: "text-white/55",
        valueClass: "font-medium text-white/90",
      };
    case "limited":
      return {
        Icon: AlertCircle,
        iconClass: "text-amber-400",
        labelClass: "text-white/55",
        valueClass: "font-medium text-amber-100/90",
      };
    case "excluded":
      return {
        Icon: X,
        iconClass: "text-red-400",
        labelClass: "text-white/55",
        valueClass: "font-medium text-white/45",
      };
  }
}

type Props = {
  rows: ComparisonRow[];
  dimmed?: boolean;
  emphasized?: boolean;
};

export function ComparisonFeatureRows({ rows, dimmed = false, emphasized = false }: Props) {
  return (
    <ul className="mt-6 flex-1 space-y-4 border-t border-white/10 pt-6">
      {rows.map((row) => {
        const { Icon, iconClass, labelClass, valueClass } = rowStyles(
          row.status,
          dimmed,
          emphasized,
        );
        return (
          <li key={row.label} className="flex items-start gap-3">
            <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${iconClass}`} aria-hidden />
            <div className="min-w-0">
              <p className={`text-xs font-medium uppercase tracking-wide ${labelClass}`}>
                {row.label}
              </p>
              <p className={`mt-0.5 text-sm ${valueClass}`}>{row.value}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
