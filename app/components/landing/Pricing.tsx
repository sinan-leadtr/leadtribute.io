"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const tiers = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    yearly: 0,
    period: "Free",
    description: "Für Einsteiger.",
    features: [
      "Bis zu 3 verbundene Konten",
      "Basis ROAS & Spend",
      "7 Tage Daten-Historie",
      "E-Mail-Support",
    ],
    cta: "Get Started",
    href: "/register",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    monthly: 49,
    yearly: 39,
    period: "mo",
    description: "Für wachsende Brands.",
    features: [
      "Unbegrenzte Konten",
      "Echtzeit ROAS & MER",
      "Voller Verlauf & Export",
      "Prioritäts-Support",
      "Shopify & Klaviyo Sync",
    ],
    cta: "Get Started",
    href: "/register",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    id: "scale",
    name: "Scale",
    monthly: 149,
    yearly: 119,
    period: "mo",
    description: "Für Agenturen & große Teams.",
    features: [
      "Alles aus Pro",
      "Multi-User & Rollen",
      "White-Label Reports",
      "Dedizierter Success Manager",
      "API-Zugang",
    ],
    cta: "Kontakt",
    href: "#",
    highlighted: false,
  },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          {...sectionFade}
        >
          Einfaches Pricing
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-white/60">
          Starte kostenlos. Wechsle jederzeit.
        </p>

        {/* Toggle: Monthly / Yearly */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
          {...sectionFade}
        >
          <span className={`text-sm font-medium ${!yearly ? "text-white" : "text-white/50"}`}>
            Monatlich
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            onClick={() => setYearly((v) => !v)}
            className="relative h-8 w-14 rounded-full border border-white/20 bg-zinc-900/80 transition hover:border-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
            <span
              className={`absolute top-1 left-1 h-6 w-6 rounded-full bg-orange-500 shadow-lg shadow-orange-500/30 transition-transform ${yearly ? "translate-x-6" : "translate-x-0"}`}
            />
          </button>
          <span className={`text-sm font-medium ${yearly ? "text-white" : "text-white/50"}`}>
            Jährlich
          </span>
          <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/40">
            Save 20%
          </span>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {tiers.map((tier, i) => {
            const price = yearly ? tier.yearly : tier.monthly;
            const isFree = price === 0;
            return (
              <motion.div
                key={tier.id}
                className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 ${
                  tier.highlighted
                    ? "border-2 border-orange-500/50 bg-zinc-950/90 shadow-[0_0_40px_-10px_rgba(249,115,22,0.25)] lg:-mt-2 lg:scale-[1.02]"
                    : "border-zinc-800/80 bg-zinc-900/50"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-black">
                    {tier.badge}
                  </div>
                )}
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {isFree ? "0" : price} €
                  </span>
                  {!isFree && (
                    <span className="text-sm text-white/60">
                      /{tier.period}
                      {yearly && " (jährl.)"}
                    </span>
                  )}
                </div>
                {isFree && (
                  <span className="mt-1 text-sm text-white/60">Für immer kostenlos</span>
                )}
                <p className="mt-4 text-sm text-white/70">{tier.description}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/80">
                      <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Link
                    href={tier.href}
                    className={`inline-flex w-full justify-center rounded-full px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${
                      tier.highlighted
                        ? "bg-orange-500 text-black shadow-lg shadow-orange-500/25 hover:bg-orange-400 hover:shadow-orange-500/35"
                        : "border border-white/20 bg-transparent text-white hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
