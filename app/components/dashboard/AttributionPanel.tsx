"use client";

import { ChannelLogo } from "@/app/components/icons";
import { appCard } from "@/lib/ui/app-surfaces";

type Credit = {
  channel: string;
  creditedRevenue: number;
  creditShare: number;
};

type Props = {
  credits: Credit[];
};

export function AttributionPanel({ credits }: Props) {
  const top = credits[0];

  return (
    <section className={`${appCard} p-6`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-violet-300">
            Markov attribution
          </p>
          <h2 className="mt-1 text-lg font-semibold text-white">Channel credit (latest run)</h2>
        </div>
        {top ? (
          <span className="rounded-full border border-emerald-500/35 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
            Top: {top.channel} · {(top.creditShare * 100).toFixed(0)}%
          </span>
        ) : null}
      </div>
      <ul className="mt-6 space-y-3">
        {credits.length === 0 ? (
          <li className="text-sm text-white/50">
            Sync Shopify and run a sync to compute attribution credits.
          </li>
        ) : (
          credits.map((c) => (
            <li
              key={c.channel}
              className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <ChannelLogo channel={c.channel} size={20} />
                <span className="font-medium text-white">{c.channel}</span>
              </div>
              <div className="text-right text-sm">
                <p className="font-semibold tabular-nums text-emerald-300">
                  {(c.creditShare * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-white/45 tabular-nums">
                  €{c.creditedRevenue.toLocaleString("de-DE", { maximumFractionDigits: 0 })}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
