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
    period: "mo",
    description: "Perfect for side projects and testing.",
    features: [
      "Up to 3 connected accounts",
      "Basic ROAS & spend",
      "7-day data history",
      "Email support",
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
    description: "For growing brands and teams.",
    features: [
      "Unlimited accounts",
      "Real-time ROAS & MER",
      "Full history & export",
      "Priority support",
      "Shopify & Klaviyo sync",
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
    description: "For agencies and larger teams.",
    features: [
      "Everything in Pro",
      "Multi-user & roles",
      "White-label reports",
      "Dedicated success manager",
      "API access",
    ],
    cta: "Contact sales",
    href: "mailto:hello@leadtribute.io",
    highlighted: false,
  },
];

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
          Start free. Upgrade when you are ready to scale.
        </p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
          {tiers.map((tier, i) => {
            const price = yearly ? tier.yearly : tier.monthly;
            const isFree = price === 0;
            return (
              <motion.div
                key={tier.id}
                className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 ${
                  tier.highlighted
                    ? "z-10 border-2 border-black bg-zinc-950 shadow-[0_0_60px_-20px_rgba(0,0,0,0.75)] lg:-mt-2 lg:scale-[1.03]"
                    : "border-white/20 bg-gradient-to-b from-zinc-900 to-zinc-950 shadow-[0_18px_45px_rgba(0,0,0,0.45)]"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                {tier.badge && (
                  <motion.div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-black shadow-md">
                    {tier.badge}
                  </motion.div>
                )}
                <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">
                    {isFree ? "€0" : `€${price}`}
                  </span>
                  {!isFree && (
                    <span className="text-sm text-white/65">
                      /{tier.period}
                      {yearly && " billed yearly"}
                    </span>
                  )}
                </div>
                {isFree && (
                  <span className="mt-1 text-sm text-white/65">Free forever</span>
                )}
                <p className="mt-4 text-sm text-white/80">{tier.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/85">
                      <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-2">
                  <Link
                    href={tier.href}
                    className={`inline-flex w-full justify-center rounded-full px-4 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-zinc-950 ${
                      tier.highlighted
                        ? "btn-black"
                        : "border border-white/30 bg-white/10 text-white hover:border-white/50 hover:bg-white/15"
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
