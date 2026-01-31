"use client";

import { Image as ImageIcon, Play } from "lucide-react";

interface Creative {
  id: string;
  name: string;
  thumbnail: string | null;
  roas: number;
  spend: number;
  ctr: number;
}

const mockCreatives: Creative[] = [
  { id: "1", name: "UGC_Hook_V3_Final", thumbnail: null, roas: 5.8, spend: 1240, ctr: 2.4 },
  { id: "2", name: "Carousel_Summer_Sale_01", thumbnail: null, roas: 4.2, spend: 890, ctr: 1.8 },
  { id: "3", name: "Story_Testimonial_DE", thumbnail: null, roas: 6.1, spend: 2100, ctr: 3.1 },
  { id: "4", name: "Static_Offer_BlackFri", thumbnail: null, roas: 3.9, spend: 560, ctr: 1.2 },
];

function RoasDisplay({ roas, large = false }: { roas: number; large?: boolean }) {
  const isLow = roas < 2;
  const isHigh = roas >= 4;
  const className = isLow
    ? "text-red-400"
    : isHigh
      ? "text-emerald-400"
      : "text-orange-400";
  return (
    <span className={`font-semibold tabular-nums ${className} ${large ? "text-xl" : "text-sm"}`}>
      {roas.toFixed(1)}x
    </span>
  );
}

export function CreativesGrid() {
  const maxRoas = Math.max(...mockCreatives.map((c) => c.roas));

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-950/50 p-4 shadow-xl shadow-black/50">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-sm font-semibold text-white">Top Performing Creatives</h2>
        <span className="text-[10px] text-white/50">Last 30 days</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCreatives.map((creative) => {
          const isWinner = creative.roas === maxRoas;
          return (
            <article
              key={creative.id}
              className={`group relative flex flex-col overflow-hidden rounded-xl border bg-black/80 transition-all duration-300 hover:border-white/20 ${
                isWinner
                  ? "border-orange-500 ring-2 ring-orange-500/40"
                  : "border-white/10"
              }`}
            >
              {isWinner && (
                <span className="absolute left-2 top-2 z-10 rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold text-black">
                  Winner
                </span>
              )}
              {/* Thumbnail – 4:5 vertical video style */}
              <div className="relative aspect-[4/5] w-full shrink-0 overflow-hidden bg-white/5">
                {creative.thumbnail ? (
                  <img
                    src={creative.thumbnail}
                    alt={creative.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/5">
                    <ImageIcon className="h-12 w-12 text-white/20" />
                  </div>
                )}
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition group-hover:opacity-100">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-black">
                    <Play className="h-6 w-6 fill-current pl-0.5" />
                  </span>
                </div>
              </div>
              {/* Name */}
              <div className="border-t border-white/5 px-3 py-2">
                <p className="truncate text-sm font-medium text-white" title={creative.name}>
                  {creative.name}
                </p>
              </div>
              {/* KPIs */}
              <div className="flex flex-wrap items-center gap-3 border-t border-white/5 px-3 py-3">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-white/50">ROAS</span>
                  <RoasDisplay roas={creative.roas} large />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-white/50">Spend</span>
                  <span className="text-sm font-medium tabular-nums text-white/90">
                    {creative.spend.toLocaleString("de-DE")} €
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-white/50">CTR</span>
                  <span className="text-sm font-medium tabular-nums text-white/90">
                    {creative.ctr}%
                  </span>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
