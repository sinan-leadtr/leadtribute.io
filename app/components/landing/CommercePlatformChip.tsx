"use client";

import { CommercePlatformLogo } from "@/app/components/icons";
import type { CommercePlatformId } from "@/lib/commerce/platforms";

type Props = {
  id: CommercePlatformId;
  label: string;
  status: "available" | "coming_soon";
};

export function CommercePlatformChip({ id, label, status }: Props) {
  const soon = status === "coming_soon";

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        soon
          ? "border-black/5 bg-zinc-50 text-black/40"
          : "border-black/10 bg-white text-black shadow-sm hover:border-black/20"
      }`}
    >
      <CommercePlatformLogo
        platform={id}
        size={18}
        className={`shrink-0 ${soon ? "opacity-40" : ""}`}
      />
      {label}
      {soon ? (
        <span className="text-[10px] uppercase tracking-wide text-black/30">
          soon
        </span>
      ) : null}
    </span>
  );
}
