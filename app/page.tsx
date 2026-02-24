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
  Check,
} from "lucide-react";
import { HeroDashboardPreview } from "./components/landing/HeroDashboardPreview";
import { Pricing } from "./components/landing/Pricing";
import { Footer } from "./components/landing/Footer";
import { Testimonials } from "./components/landing/Testimonials";
import {
  GoogleLogo,
  MetaLogo,
  ShopifyLogo,
  KlaviyoLogo,
  KlaviyoLogoText,
  TikTokLogo,
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
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
};

const faqItems = [
  {
    q: "Do you support TikTok?",
    a: "Yes. We integrate with TikTok Ads, Meta, Google, Shopify, and Klaviyo so you see everything in one place.",
  },
  {
    q: "Is my data safe?",
    a: "We use encryption at rest and in transit. Data is stored in the EU and we are GDPR compliant.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Absolutely. No long-term contract. Cancel from your settings and your data stays exportable for 30 days.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are live in under 15 minutes. Connect your ad accounts and Shopify, and we sync historical data automatically.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes. 14 days free, no credit card required. Full access to the Pro plan so you can test with real data.",
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
            Stop guessing. Start scaling. Integrate Meta, Google, and Shopify in
            one real-time dashboard.
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
                <span>Start Free Trial</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        <div className="mx-auto mt-16 max-w-5xl px-4 sm:mt-20 lg:mt-24">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/50 backdrop-blur-xl"
            style={{
              transform: "perspective(1200px) rotateX(4deg) rotateY(-2deg)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px -20px rgba(0,0,0,0.6), 0 0 60px -20px rgba(249,115,22,0.15)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 50px 100px -20px rgba(0,0,0,0.7), 0 0 80px -15px rgba(249,115,22,0.25)",
            }}
          >
            <HeroDashboardPreview />
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.03) 0%, transparent 50%)",
              }}
              aria-hidden
            />
          </motion.div>
        </div>

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
            {/* Starter */}
            <div className="flex flex-col rounded-3xl border border-black/5 bg-white p-6 shadow-xl sm:p-8">
              <h3 className="text-lg font-semibold">Starter</h3>
              <p className="mt-3 text-3xl font-bold">0 €</p>
              <p className="mt-1 text-sm">Free</p>
              <p className="mt-4 text-sm">Perfect for side projects.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["Up to 3 connected accounts", "Basic ROAS & spend", "7-day data history"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href="/register"
                  className="inline-flex w-full justify-center rounded-full border border-black/10 bg-white/60 px-4 py-3 text-sm font-semibold text-black/80 shadow-sm transition hover:bg-white hover:border-black/20"
                >
                  Get Started
                </Link>
              </div>
            </div>
            {/* Pro – Most Popular */}
            <div className="relative flex flex-col rounded-3xl border-2 border-black p-6 shadow-[0_0_60px_-20px_rgba(0,0,0,0.65)] sm:-mt-1 sm:p-8 sm:scale-[1.02]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold">Pro</h3>
              <p className="mt-3 text-3xl font-bold">49 €</p>
              <p className="mt-1 text-sm">per month</p>
              <p className="mt-4 text-sm">The CMO Suite.</p>
              <ul className="mt-6 space-y-3 text-sm">
                {["Unlimited accounts", "Real-time ROAS & MER", "Full history & export", "Priority support"].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Check className="h-5 w-5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-8">
                <Link
                  href="/register"
                  className="btn-black inline-flex w-full justify-center px-4 py-3 text-sm font-semibold"
                >
                  <span>Get Started</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── LogoTicker: Seamlessly integrated with top platforms ─── */}
      <section className="relative z-10 border-y border-white/5 py-10 sm:py-12">
        <p className="mx-auto mb-8 max-w-6xl px-6 text-center text-xs font-medium uppercase tracking-widest sm:text-sm">
          Seamlessly integrated with top platforms
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6">
          <span
            className="flex items-center gap-2 text-zinc-500 transition [&>svg]:opacity-70 hover:text-[#0668E1] hover:[&>svg]:opacity-100"
            aria-label="Meta"
          >
            <MetaLogo size={28} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            <span className="text-sm font-semibold sm:text-base">Meta Ads</span>
          </span>
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:opacity-100 [&>svg]:opacity-70 hover:[&>svg]:opacity-100"
            aria-label="Google Ads"
          >
            <GoogleLogo size={28} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            <span className="text-sm font-semibold sm:text-base">Google Ads</span>
          </span>
          <span
            className="flex items-center gap-2 text-zinc-500 transition [&>svg]:opacity-70 hover:text-[#96BF48] hover:[&>svg]:opacity-100"
            aria-label="Shopify"
          >
            <ShopifyLogo size={28} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            <span className="text-sm font-semibold sm:text-base">Shopify</span>
          </span>
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:text-[#F26522]"
            aria-label="Klaviyo"
          >
            <KlaviyoLogoText className="text-lg sm:text-xl" />
          </span>
          <span
            className="flex items-center gap-2 text-zinc-500 transition [&>svg]:opacity-80 hover:[&>svg]:opacity-100"
            aria-label="TikTok"
          >
            <TikTokLogo size={28} className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
            <span className="text-sm font-semibold sm:text-base">TikTok Ads</span>
          </span>
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
                text: "Meta says 10 sales. Shopify says 4. Who is lying?",
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
                className="group rounded-[32px] border border-black/5 bg-zinc-900/95 p-6 text-white shadow-[0_18px_45px_rgba(0,0,0,0.85)] sm:p-8"
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

      {/* ─── Testimonials (Trusted by growth teams – Lösung nach „Stop flying blind“) ─── */}
      <Testimonials />

      {/* ─── Loved by Growth Teams (Social Proof Cases) ───────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Loved by Growth Teams
          </motion.h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-black/60">
            See why marketing leaders trust Leadtribute.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {[
              {
                name: "Sarah M.",
                role: "CMO at GlowUp",
                quote:
                  "Finally, I can see my real ROAS. We scaled from 10k to 50k spend in one month.",
                initials: "SM",
                accent: "bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/40",
              },
              {
                name: "Tom B.",
                role: "Founder of SneakerDrop",
                quote:
                  "The Shopify integration is seamless. No more spreadsheets.",
                initials: "TB",
                accent: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40",
              },
              {
                name: "AgencyFlow Team",
                role: "Performance Agency",
                quote:
                  "We use Leadtribute for all our clients. Reporting time cut by 90%.",
                initials: "AF",
                accent: "bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/40",
              },
            ].map((item, i) => (
              <motion.div
                key={item.name}
                className="rounded-[32px] border border-zinc-800/80 bg-zinc-950/90 p-6 text-white shadow-xl shadow-black/50 transition hover:border-white/70 hover:shadow-[0_0_60px_-18px_rgba(0,0,0,0.9)] sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${item.accent}`}
                    aria-hidden
                  >
                    {item.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-xs">{item.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it Works (Zig-Zag) ───────────────────────────────────────── */}
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
              <div className="rounded-[32px] border border-black/5 bg-zinc-950/95 p-8 text-white shadow-[0_24px_65px_rgba(0,0,0,0.95)]">
                <div className="flex flex-wrap items-center justify-center gap-5">
                  {[
                    { label: "Meta", Icon: MetaLogo, glow: "shadow-[0_0_20px_-4px_rgba(6,104,225,0.5)]" },
                    { label: "Google", Icon: GoogleLogo, glow: "shadow-[0_0_20px_-4px_rgba(66,133,244,0.4)]" },
                    { label: "TikTok", Icon: TikTokLogo, glow: "shadow-[0_0_20px_-4px_rgba(238,29,82,0.4)]" },
                    { label: "Shopify", Icon: ShopifyLogo, glow: "shadow-[0_0_20px_-4px_rgba(150,191,72,0.5)]" },
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
                    title="Und mehr"
                  >
                    <span className="text-xs font-medium">+ more</span>
                  </div>
                </div>
                <div className="mt-6 flex justify-center gap-2 text-white/80">
                  <Link2 className="h-5 w-5" />
                  <span className="text-sm">Connections</span>
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed">
                  Schluss mit manuellen CSV-Exporten und Datenchaos. Leadtribute zentralisiert deine Datenströme automatisch und fehlerfrei.
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
                Link Meta, Google, TikTok, Shopify, and Klaviyo in minutes. One
                dashboard, one source of truth.
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
              <div className="rounded-[32px] border border-black/5 bg-zinc-950/95 p-6 text-white shadow-[0_24px_65px_rgba(0,0,0,0.95)]">
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-sm">Dashboard</span>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl border border-white/5 bg-black/30">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-black/10 text-[10px] font-medium uppercase tracking-wider">
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
                <p className="mt-4 text-center text-sm leading-relaxed">
                  Hör auf, im Dunkeln zu tappen. Verstehe endlich den wahren ROAS über alle Kanäle hinweg, statt isolierten Plattform-Metriken zu vertrauen.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Scale – Image left, Text right */}
          <motion.div
            className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
            {...sectionFade}
          >
            <div className="relative order-2 lg:order-1">
              <div className="rounded-[32px] border border-black/5 bg-zinc-950/95 p-8 text-white shadow-[0_24px_65px_rgba(0,0,0,0.95)]">
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
                  Skaliere Budgets basierend auf echtem Profit, nicht auf Bauchgefühl. Erkenne die Gewinner-Kampagnen sofort.
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
          <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
            Everything you need to run performance marketing like a pro.
          </p>
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: "Real-time ROAS",
                text: "See ROAS and spend update live. No more guessing from yesterday's numbers.",
              },
              {
                icon: TrendingUp,
                title: "Profit First",
                text: "MER calculation built in. Know your true margin before you scale.",
              },
              {
                icon: Sparkles,
                title: "Creative Insights",
                text: "Know which ad scales. Creative-level performance at a glance.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                className="group rounded-[32px] border border-zinc-800/80 bg-zinc-950/90 p-6 text-white shadow-xl shadow-black/50 sm:p-8"
                initial={false}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.18), 0 25px 60px -12px rgba(0,0,0,0.8), 0 0 70px -18px rgba(129,140,248,0.55)",
                  transition: { duration: 0.25 },
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 ring-1 ring-black/10 transition group-hover:ring-black/60">
                  <item.icon className="h-6 w-6 text-white" />
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
          <div className="mt-12 space-y-2">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-[999px] border border-black/5 bg-zinc-900/95 text-white shadow-[0_18px_45px_rgba(0,0,0,0.85)] overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 20px 55px rgba(0,0,0,0.9), 0 0 60px -18px rgba(148,163,184,0.6)",
                }}
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-white/90 transition hover:bg-white/5"
                >
                  <span className="font-medium">{item.q}</span>
                  <motion.span
                    animate={{ rotate: faqOpen === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5 shrink-0 text-white/50" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/5 px-6 py-4 text-sm text-white/70">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
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
            Join growth teams who run on one dashboard.
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
              <span>Start 14-day Free Trial</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Social Proof ───────────────────────────────── */}
      <section className="relative z-10 border-t border-black/5 px-6 py-20 sm:px-8 sm:py-24">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          {...sectionFade}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-black/40">
            Trusted by growth teams at
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            {["Nova", "Flux", "Apex", "Stride", "Venture"].map((name) => (
              <span
                key={name}
                className="text-xl font-semibold text-black/40 transition hover:text-black/70 sm:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Footer (Logo, Product, Company, Legal, Copyright) ────────────── */}
      <Footer />
    </div>
  );
}
