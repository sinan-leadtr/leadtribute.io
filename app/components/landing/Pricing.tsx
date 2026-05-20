"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { PricingFeatureList } from "./PricingFeatureList";
import { PricingTierBadge } from "./PricingTierBadge";
import { pricingTiers } from "./pricing-features";

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
      <motion.div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          {...sectionFade}
        >
          Simple pricing
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-black/60">
          Try Pro free for 14 days. Keep Starter forever if you don&apos;t upgrade.
        </p>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-black/50"
          {...sectionFade}
        >
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
            Included
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber-500" aria-hidden />
            Limited
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden />
            Not included
          </span>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          {...sectionFade}
        >
          <span className={`text-sm font-medium ${!yearly ? "text-black" : "text-black/50"}`}>
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            onClick={() => setYearly((v) => !v)}
            className="relative h-8 w-14 rounded-full border border-black/10 bg-black/80 transition hover:border-black focus:outline-none focus:ring-2 focus:ring-black/50"
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-white shadow-lg shadow-black/40 transition-transform ${yearly ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-black" : "text-black/50"}`}>
            Yearly
          </span>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-500/40">
            Save 20%
          </span>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {pricingTiers.map((tier, i) => {
            const price = yearly ? tier.yearly : tier.monthly;
            const isFree = price === 0;
            return (
              <motion.div
                key={tier.id}
                className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 ${
                  tier.highlighted
                    ? "z-10 border-2 border-emerald-500/50 bg-zinc-950 shadow-[0_0_70px_-18px_rgba(16,185,129,0.45)] ring-1 ring-emerald-500/25 lg:-mt-2 lg:scale-[1.03]"
                    : "border-white/20 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                {tier.cornerBadge && (
                  <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
                    <PricingTierBadge
                      label={tier.cornerBadge.label}
                      variant={tier.cornerBadge.variant}
                    />
                  </div>
                )}
                <h3 className="pr-24 text-lg font-semibold text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {isFree ? "€0" : `€${price}`}
                  </span>
                  {!isFree && (
                    <span className="text-sm text-white/65">
                      /{tier.period}
                      {yearly && " billed yearly"}
                      {tier.afterTrial && " after trial"}
                    </span>
                  )}
                </div>
                {tier.priceNote && (
                  <p className="mt-1 text-sm font-medium text-white/90">{tier.priceNote}</p>
                )}
                {tier.priceSub && (
                  <p className="mt-0.5 text-xs text-white/55">{tier.priceSub}</p>
                )}
                <p className="mt-4 text-sm text-white/80">{tier.description}</p>
                <PricingFeatureList
                  features={tier.features}
                  emphasized={tier.highlighted}
                />
                <div className="mt-8 pt-2">
                  <Link
                    href={tier.href}
                    className={`inline-flex w-full justify-center px-4 py-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      tier.highlighted
                        ? "btn-white-glow focus:ring-emerald-500/40 focus:ring-offset-zinc-950"
                        : "rounded-full border border-white/30 bg-white/10 text-white transition hover:border-white/50 hover:bg-white/15 focus:ring-white/40 focus:ring-offset-zinc-950"
                    }`}
                  >
                    {tier.highlighted ? <span>{tier.cta}</span> : tier.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
