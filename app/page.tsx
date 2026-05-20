"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Sparkles,
  TrendingUp,
  LineChart,
  BatteryLow,
  Boxes,
  ChevronDown,
  Link2,
  LayoutDashboard,
} from "lucide-react";
import { HeroDashboardPreview } from "./components/landing/HeroDashboardPreview";
import { AttributionShowcase } from "./components/landing/AttributionShowcase";
import { IntegrationLogo } from "./components/landing/IntegrationLogo";
import { landingDarkCard } from "./components/landing/preview-styles";
import { Pricing } from "./components/landing/Pricing";
import { PricingFeatureList } from "./components/landing/PricingFeatureList";
import { PricingTierBadge } from "./components/landing/PricingTierBadge";
import { heroPricingTierIds, pricingTiers } from "./components/landing/pricing-features";
import { Footer } from "./components/landing/Footer";
import { Testimonials } from "./components/landing/Testimonials";
import {
  BigCommerceLogo,
  GoogleLogo,
  MetaLogo,
  ShopifyLogo,
  KlaviyoLogo,
  TikTokLogo,
  WooCommerceLogo,
} from "./components/icons";

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.6,
    },
  },
};

const heroWord = {
  hidden: { opacity: 0, x: -24, y: 8 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 1.1 },
  },
};

const faqItems = [
  {
    q: "How is Markov attribution different from last-click?",
    a: "Last-click gives 100% credit to the final ad touch before purchase. Markov models the full journey and splits credit by how often each channel appears on paths that convert—so earlier touches like email or discovery ads get fair share.",
  },
  {
    q: "Which platforms can I connect?",
    a: "Meta, Google, and TikTok Ads, plus Klaviyo for email. For revenue, connect Shopify, WooCommerce, BigCommerce, and more—with additional commerce platforms on the roadmap.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams connect ad and commerce accounts in under 15 minutes. We sync historical data automatically so your dashboard fills in without manual CSV exports.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. Data is encrypted in transit and at rest, stored in the EU, and we operate in line with GDPR requirements.",
  },
  {
    q: "What happens after the 14-day Pro trial?",
    a: "You get full Pro features for 14 days with no credit card required. When the trial ends, subscribe to Pro or continue on the free Starter plan with limited accounts and 7-day history.",
  },
  {
    q: "Can I cancel or switch plans anytime?",
    a: "Yes. No long-term contract. Upgrade, downgrade to Starter, or cancel from settings. After cancellation, you can export your data for 30 days.",
  },
];

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black">

      {/* ─── Navbar ───────────────────────────────────────── */}
      <header className="relative z-10 border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white">
              <span className="text-lg font-bold">LT</span>
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Leadtribute
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-current">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                className="inline-block rounded-full border border-black/10 bg-white/60 px-5 py-2.5 text-sm font-medium text-black/80 shadow-sm transition hover:bg-white hover:border-black/20"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="btn-black px-5 py-2.5 text-sm font-semibold"
              >
                <span>Get Started</span>
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl xl:leading-[1.1]"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            {["The", "Operating", "System", "for"].map((word, idx) => (
              <motion.span
                key={`${word}-${idx}`}
                variants={heroWord}
                className="hero-shimmer inline-block bg-clip-text text-transparent pr-1 md:pr-2"
              >
                {word}
              </motion.span>
            ))}
            <motion.span
              variants={heroWord}
              className="hero-shimmer inline-block bg-clip-text font-extrabold text-transparent"
              style={{ textShadow: "0 0 80px rgba(59, 130, 246, 0.35)" }}
            >
              Performance Marketers.
            </motion.span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            Stop guessing. Start scaling with Markov attribution and live ROAS
            in one dashboard.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/register"
                className="btn-black px-10 py-4 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
              >
                <span>Start 14-day Pro trial</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-16 max-w-5xl px-4 sm:mt-20 lg:mt-24"
          style={{ transform: "perspective(1200px) rotateX(4deg) rotateY(-2deg)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroDashboardPreview />
        </motion.div>

        {/* ─── Pricing (2 plans, right under Hero) ───────────────────── */}
        <motion.div
          className="mx-auto mt-20 max-w-4xl px-4 sm:mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-center text-sm font-medium uppercase tracking-widest">
            Simple pricing
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-8">
            {pricingTiers
              .filter((t) => (heroPricingTierIds as readonly string[]).includes(t.id))
              .map((tier) => {
                const price = tier.monthly;
                const isFree = price === 0;
                return (
                  <div
                    key={tier.id}
                    className={`relative flex flex-col rounded-3xl border p-6 sm:p-8 ${
                      tier.highlighted
                        ? "border-2 border-emerald-600/40 shadow-[0_0_50px_-16px_rgba(16,185,129,0.35)] sm:-mt-1 sm:scale-[1.02]"
                        : "border-black/5 bg-white shadow-xl"
                    }`}
                  >
                    {tier.cornerBadge && (
                      <div className="absolute right-4 top-4">
                        <PricingTierBadge
                          label={tier.cornerBadge.label}
                          variant={tier.cornerBadge.variant}
                          theme="light"
                        />
                      </div>
                    )}
                    <h3 className="pr-24 text-lg font-semibold">{tier.name}</h3>
                    <p className="mt-3 text-3xl font-bold">
                      {isFree ? "€0" : `€${price}`}
                    </p>
                    {tier.priceNote && (
                      <p className="mt-1 text-sm text-black/60">{tier.priceNote}</p>
                    )}
                    {tier.priceSub && (
                      <p className="mt-0.5 text-xs text-black/45">{tier.priceSub}</p>
                    )}
                    <p className="mt-4 text-sm text-black/70">{tier.description}</p>
                    <PricingFeatureList
                      features={tier.features.slice(0, tier.highlighted ? 5 : 4)}
                      theme="light"
                    />
                    <div className="mt-auto pt-8">
                      <Link
                        href={tier.href}
                        className={
                          tier.highlighted
                            ? "btn-black inline-flex w-full justify-center px-4 py-3 text-sm font-semibold"
                            : "inline-flex w-full justify-center rounded-full border border-black/10 bg-white/60 px-4 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:bg-white hover:border-black/20"
                        }
                      >
                        {tier.highlighted ? (
                          <span>{tier.cta}</span>
                        ) : (
                          tier.cta
                        )}
                      </Link>
                    </div>
                  </div>
                );
              })}
          </div>
        </motion.div>
      </section>

      {/* ─── LogoTicker: Seamlessly integrated with top platforms ─── */}
      <section className="relative z-10 border-y border-white/5 py-10 sm:py-12">
        <p className="mx-auto mb-8 max-w-6xl px-6 text-center text-xs font-medium uppercase tracking-widest sm:text-sm">
          Seamlessly integrated with top platforms
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-5 px-6">
          <IntegrationLogo id="meta" label="Meta Ads" />
          <IntegrationLogo id="google" label="Google Ads" />
          <IntegrationLogo id="shopify" label="Shopify" />
          <IntegrationLogo id="woocommerce" label="WooCommerce" />
          <IntegrationLogo id="bigcommerce" label="BigCommerce" />
          <IntegrationLogo id="tiktok" label="TikTok Ads" />
          <IntegrationLogo id="klaviyo" label="Klaviyo" />
        </div>
      </section>

      {/* ─── The Problem ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Stop flying blind.
          </motion.h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Attribution Hell",
                icon: LineChart,
                text: "Meta says 10 sales. Your store says 4. Markov shows who actually drove them.",
                accent: "black",
              },
              {
                title: "Creative Fatigue",
                icon: BatteryLow,
                text: "You don't know which ad is burning out your budget.",
                accent: "red",
              },
              {
                title: "Data Silos",
                icon: Boxes,
                text: "Tabs open for Ads, Email, and Shop. It's a mess.",
                accent: "violet",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className={`group p-6 sm:p-8 ${landingDarkCard}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 22px 60px rgba(0,0,0,0.9), 0 0 70px -16px rgba(148,163,184,0.55)",
                }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    item.accent === "black"
                      ? "bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
                      : item.accent === "red"
                        ? "bg-red-500/10 ring-1 ring-red-500/30"
                        : "bg-violet-500/10 ring-1 ring-violet-500/30"
                  }`}
                >
                  <item.icon
                    className={`h-7 w-7 ${
                      item.accent === "black"
                        ? "text-white"
                        : item.accent === "red"
                          ? "text-red-400"
                          : "text-violet-400"
                    }`}
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AttributionShowcase />

      <Testimonials />

      {/* ─── Loved by Growth Teams (Social Proof Cases) ───────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            How it works
          </motion.h2>

          {/* Step 1: Connect – Image left, Text right */}
          <motion.div
            className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
            {...sectionFade}
          >
            <div className="relative order-2 lg:order-1">
              <div className={`p-8 ${landingDarkCard}`}>
                <div className="flex flex-wrap items-center justify-center gap-5">
                  {[
                    { label: "Meta", Icon: MetaLogo, glow: "shadow-[0_0_20px_-4px_rgba(6,104,225,0.5)]" },
                    { label: "Google", Icon: GoogleLogo, glow: "shadow-[0_0_20px_-4px_rgba(66,133,244,0.4)]" },
                    { label: "TikTok", Icon: TikTokLogo, glow: "shadow-[0_0_20px_-4px_rgba(238,29,82,0.4)]" },
                    { label: "Shopify", Icon: ShopifyLogo, glow: "shadow-[0_0_20px_-4px_rgba(150,191,72,0.5)]" },
                    { label: "WooCommerce", Icon: WooCommerceLogo, glow: "shadow-[0_0_20px_-4px_rgba(150,88,138,0.5)]" },
                    { label: "BigCommerce", Icon: BigCommerceLogo, glow: "shadow-[0_0_20px_-4px_rgba(18,17,24,0.5)]" },
                    { label: "Klaviyo", Icon: KlaviyoLogo, glow: "shadow-[0_0_20px_-4px_rgba(242,101,34,0.5)]" },
                  ].map(({ label, Icon, glow }) => (
                    <div
                      key={label}
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/5 transition hover:ring-white/15 ${glow}`}
                      title={label}
                    >
                      <Icon size={28} className="shrink-0" />
                    </div>
                  ))}
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-dashed border-black/20 bg-transparent transition hover:border-black/40"
                    title="And more"
                  >
                    <span className="text-xs font-medium">+ more</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center gap-2 text-white/80">
                  <Link2 className="h-5 w-5" />
                  <span className="text-sm">Connections</span>
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed text-white/55">
                  No more manual CSV exports or scattered spreadsheets. Leadtribute centralizes your ad and commerce data automatically.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-black">
                Step 1
              </span>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Connect everything.
              </h3>
              <p className="mt-4">
                Link ad platforms and commerce stores — Shopify, WooCommerce,
                BigCommerce, and more — plus Klaviyo. One dashboard, one source
                of truth.
              </p>
            </div>
          </motion.div>

          {/* Step 2: Analyze – Text left, Image right */}
          <motion.div
            className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
            {...sectionFade}
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                Step 2
              </span>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Analyze in real-time.
              </h3>
              <p className="mt-4">
                ROAS, spend, and revenue update live. No more exporting CSVs or
                waiting for tomorrow's numbers.
              </p>
            </div>
            <div className="relative">
              <motion.div className={`p-6 ${landingDarkCard}`}>
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-sm">Dashboard</span>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/30">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/10 text-[10px] font-medium uppercase tracking-wider text-white/50">
                        <th className="px-3 py-2.5">Campaign</th>
                        <th className="px-3 py-2.5 text-right">Spend</th>
                        <th className="px-3 py-2.5 text-right">ROAS</th>
                        <th className="w-8 px-2 py-2.5" />
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Retargeting Q1", spend: "€4.2k", roas: "4.2x", active: true, spark: [30, 45, 40, 60, 70] },
                        { name: "Cold Traffic", spend: "€2.1k", roas: "3.1x", active: true, spark: [50, 55, 50, 65, 75] },
                        { name: "Advantage+", spend: "€5.8k", roas: "5.0x", active: true, spark: [20, 35, 50, 65, 85] },
                      ].map((row) => (
                        <tr key={row.name} className="border-b border-white/5 last:border-0">
                          <td className="px-3 py-2.5 font-medium">{row.name}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums">{row.spend}</td>
                          <td className="px-3 py-2.5 text-right tabular-nums text-emerald-400/90">{row.roas}</td>
                          <td className="px-2 py-2.5">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" title="Active" />
                              <svg viewBox="0 0 24 12" className="h-3 w-12 opacity-70" preserveAspectRatio="none">
                                <polyline fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500" points={row.spark.map((v, i) => `${(i / (row.spark.length - 1)) * 24},${12 - (v / 100) * 10}`).join(" ")} />
                              </svg>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed text-white/55">
                  Stop guessing from isolated platform metrics. See true ROAS across every channel in one live view.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Step 3: Scale – Image left, Text right */}
          <motion.div
            className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
            {...sectionFade}
          >
            <div className="relative order-2 lg:order-1">
              <div className={`p-8 ${landingDarkCard}`}>
                <div className="h-32 w-full">
                  <svg viewBox="0 0 120 64" className="h-full w-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="profitGradient" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 50 Q 15 48 30 42 T 60 28 T 90 18 T 120 8 L 120 64 L 0 64 Z"
                      fill="url(#profitGradient)"
                    />
                    <path
                      d="M 0 50 Q 15 48 30 42 T 60 28 T 90 18 T 120 8"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="120" cy="8" r="3" fill="#10b981" className="drop-shadow-[0_0_6px_rgba(16,185,129,0.8)]" />
                  </svg>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                    <span className="text-sm font-medium">Profit trend</span>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/40">
                    +34% Profit
                  </span>
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed text-white/55">
                  Scale budgets from real profit, not gut feel. Spot winning campaigns the moment they emerge.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-black">
                Step 3
              </span>
              <h3 className="mt-2 text-2xl font-bold sm:text-3xl">
                Scale with confidence.
              </h3>
              <p className="mt-4">
                See true margin and MER. Scale what works and cut what doesn't—
                with data, not guesswork.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Feature Grid (Bento) ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Built for scale
          </motion.h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-black/60">
            Everything you need to run performance marketing like a pro.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: "Real-time ROAS",
                text: "See ROAS and spend update live. No more guessing from yesterday's numbers.",
                accent: "sky" as const,
              },
              {
                icon: TrendingUp,
                title: "Profit First",
                text: "MER calculation built in. Know your true margin before you scale.",
                accent: "emerald" as const,
              },
              {
                icon: Sparkles,
                title: "Creative Insights",
                text: "Know which ad scales. Creative-level performance at a glance.",
                accent: "violet" as const,
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                className={`group p-6 sm:p-8 ${landingDarkCard}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 22px 60px rgba(0,0,0,0.9), 0 0 70px -16px rgba(148,163,184,0.55)",
                }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    item.accent === "sky"
                      ? "bg-sky-500/10 ring-1 ring-sky-500/30"
                      : item.accent === "emerald"
                        ? "bg-emerald-500/10 ring-1 ring-emerald-500/30"
                        : "bg-violet-500/10 ring-1 ring-violet-500/30"
                  }`}
                >
                  <item.icon
                    className={`h-7 w-7 ${
                      item.accent === "sky"
                        ? "text-sky-400"
                        : item.accent === "emerald"
                          ? "text-emerald-400"
                          : "text-violet-400"
                    }`}
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing (Monthly / Yearly Toggle, 3 Tiers) ───────────────────── */}
      <section id="pricing" className="relative z-10 scroll-mt-20">
        <Pricing />
      </section>

      {/* ─── FAQ (Accordion) ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Frequently asked
          </motion.h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-black/60">
            Quick answers about attribution, integrations, and plans.
          </p>
          <motion.div className="mt-12 space-y-3">
            {faqItems.map((item, i) => {
              const isOpen = faqOpen === i;
              return (
                <motion.div
                  key={i}
                  className={`overflow-hidden transition-colors ${landingDarkCard} ${
                    isOpen
                      ? "border-violet-500/35 ring-1 ring-violet-500/25"
                      : "hover:border-white/25"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => setFaqOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-white/[0.04]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-white">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5"
                    >
                      <ChevronDown className="h-4 w-4 text-white/70" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-white/10 px-6 py-4 text-sm leading-relaxed text-white/65">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── Final CTA ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-32 sm:px-8 sm:py-40">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          {...sectionFade}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Ready to optimize?
          </h2>
          <p className="mt-4 text-lg text-black/70">
            14-day Pro trial, no credit card. Stay on Starter free if you don&apos;t upgrade.
          </p>
          <motion.div
            className="mt-10"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/register"
              className="btn-black px-12 py-5 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            >
              <span>Start 14-day Pro trial</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Footer (Logo, Product, Company, Legal, Copyright) ────────────── */}
      <Footer />
    </div>
  );
}
