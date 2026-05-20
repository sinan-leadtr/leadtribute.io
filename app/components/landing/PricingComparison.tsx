"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ComparisonFeatureRows } from "./ComparisonFeatureRows";
import { PricingTierBadge } from "./PricingTierBadge";
import { pricingComparisonColumns } from "./pricing-comparison";

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

export function PricingComparison() {
  return (
    <section
      id="compare"
      className="relative z-10 scroll-mt-20 px-6 py-24 sm:px-8 sm:py-32"
    >
      <motion.div className="mx-auto max-w-6xl">
        <motion.div className="mx-auto max-w-2xl text-center" {...sectionFade}>
          <p className="text-sm font-medium uppercase tracking-widest text-violet-600">
            Compare
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Leadtribute vs. the alternatives
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            See how one dashboard stacks up against platform-only reporting and
            spreadsheet workflows.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3 lg:gap-5">
          {pricingComparisonColumns.map((column, i) => (
            <motion.div
              key={column.id}
              className={`relative flex flex-col rounded-3xl border p-6 sm:p-7 ${
                column.highlighted
                  ? "z-10 border-white/20 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-[0_0_80px_-20px_rgba(56,189,248,0.55)] ring-1 ring-sky-500/40 lg:-mt-3 lg:scale-[1.04]"
                  : `border-white/10 bg-zinc-950/80 opacity-90 ${column.dimmed ? "lg:mt-4" : ""}`
              }`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: column.dimmed ? 0.9 : 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              <div className="absolute right-4 top-4 sm:right-5 sm:top-5">
                <PricingTierBadge
                  label={column.cornerBadge.label}
                  variant={column.cornerBadge.variant}
                />
              </div>

              <div className="pr-20">
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    column.highlighted
                      ? "bg-gradient-to-r from-violet-300 via-sky-300 to-indigo-300 bg-clip-text text-transparent"
                      : "text-white/80"
                  }`}
                >
                  {column.name}
                </h3>
                <p
                  className={`mt-2 text-2xl font-bold ${
                    column.highlighted ? "text-white" : "text-white/70"
                  }`}
                >
                  {column.price}
                </p>
                {column.priceSub && (
                  <p
                    className={`mt-1 text-sm ${
                      column.highlighted ? "text-white/65" : "text-white/45"
                    }`}
                  >
                    {column.priceSub}
                  </p>
                )}
              </div>

              <ComparisonFeatureRows
                rows={column.rows}
                dimmed={column.dimmed}
                emphasized={column.highlighted}
              />

              {column.cta && (
                <div className="mt-8 pt-2">
                  <Link
                    href={column.cta.href}
                    className="inline-flex w-full justify-center rounded-full bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-500 px-4 py-3.5 text-sm font-semibold text-white shadow-[0_8px_32px_-8px_rgba(56,189,248,0.65)] transition hover:brightness-110 hover:shadow-[0_12px_40px_-8px_rgba(56,189,248,0.75)] focus:outline-none focus:ring-2 focus:ring-sky-400/50 focus:ring-offset-2 focus:ring-offset-zinc-950"
                  >
                    {column.cta.label}
                  </Link>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-xl text-center text-xs text-black/45">
          *Platform ad tools are free to use but don&apos;t unify commerce revenue or
          multi-touch attribution.
        </p>
      </motion.div>
    </section>
  );
}
