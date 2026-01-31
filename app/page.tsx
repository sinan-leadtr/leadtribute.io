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
  ShoppingBag,
  Music2,
} from "lucide-react";

const sectionFade = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
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
    <div
      className="relative min-h-screen overflow-hidden bg-black text-white"
      style={{ backgroundColor: "#000000" }}
    >
      {/* M3 Dynamic Color Blobs – animated background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute -left-[20%] top-[10%] h-[60vmax] w-[60vmax] rounded-full bg-orange-500/25 blur-[100px] md:blur-[120px]"
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 1.05, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <motion.div
          className="absolute -right-[15%] top-[30%] h-[50vmax] w-[50vmax] rounded-full bg-amber-600/20 blur-[100px] md:blur-[130px]"
          animate={{
            x: [0, -30, 25, 0],
            y: [0, 25, -15, 0],
            scale: [1.05, 1, 1.1, 1.05],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <motion.div
          className="absolute bottom-[5%] left-1/2 h-[40vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-red-950/30 blur-[90px] md:blur-[110px]"
          animate={{
            x: ["-50%", "-48%", "-52%", "-50%"],
            y: [0, 15, -10, 0],
            scale: [1, 1.08, 1.02, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"
          aria-hidden
        />
      </div>

      {/* ─── Navbar ───────────────────────────────────────── */}
      <header className="relative z-10 border-b border-white/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-400/40">
              <span className="text-lg font-bold text-orange-400">LT</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">
              Leadtribute
            </span>
          </Link>
          <nav className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/login"
                className="inline-block rounded-full border border-white/20 bg-transparent px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-orange-500/50 hover:bg-orange-500/5 hover:text-orange-400"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/register"
                className="inline-block rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/35"
              >
                Get Started
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 pt-16 pb-24 sm:px-8 sm:pt-24 sm:pb-32 lg:pt-32 lg:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl xl:leading-[1.1]">
            The Operating System for{" "}
            <span
              className="bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 bg-clip-text font-extrabold text-transparent"
              style={{ textShadow: "0 0 80px rgba(249, 115, 22, 0.25)" }}
            >
              Performance Marketers.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl">
            Stop guessing. Start scaling. Integrate Meta, Google, and Shopify in
            one real-time dashboard.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-full bg-orange-500 px-10 py-4 text-base font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                Start Free Trial
              </Link>
            </motion.div>
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-5xl px-4 sm:mt-20 lg:mt-24">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/80 shadow-2xl shadow-black/50 backdrop-blur-xl"
            style={{
              transform: "perspective(1200px) rotateX(4deg) rotateY(-2deg)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.05), 0 40px 80px -20px rgba(0,0,0,0.6), 0 0 60px -20px rgba(249,115,22,0.15)",
            }}
            whileHover={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.08), 0 50px 100px -20px rgba(0,0,0,0.7), 0 0 80px -15px rgba(249,115,22,0.25)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="aspect-[16/10] w-full bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-6 sm:p-8">
              <div className="flex h-full flex-col gap-4">
                <div className="flex gap-4">
                  <div className="h-10 w-32 rounded-xl bg-white/5" />
                  <div className="h-10 flex-1 rounded-xl bg-white/5" />
                  <div className="h-10 w-24 rounded-full bg-orange-500/20" />
                </div>
                <div className="grid flex-1 grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-white/5 bg-white/[0.02]"
                    />
                  ))}
                </div>
                <div className="h-24 rounded-2xl border border-white/5 bg-white/[0.02]" />
              </div>
            </div>
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(249,115,22,0.03) 0%, transparent 50%)",
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ─── LogoTicker: Seamlessly integrated with top platforms ─── */}
      <section className="relative z-10 border-y border-white/5 py-10 sm:py-12">
        <p className="mx-auto mb-8 max-w-6xl px-6 text-center text-xs font-medium uppercase tracking-widest text-white/50 sm:text-sm">
          Seamlessly integrated with top platforms
        </p>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-12 gap-y-6 px-6">
          {/* Meta – blue infinity symbol */}
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:text-[#0668E1]"
            aria-label="Meta"
          >
            <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5.5 8.5C7 6 9 4 12 4c3 0 5 2 6.5 4.5" />
              <path d="M18.5 15.5C17 18 15 20 12 20c-3 0-5-2-6.5-4.5" />
              <path d="M12 4v16" />
            </svg>
            <span className="text-sm font-semibold sm:text-base">Meta Ads</span>
          </span>
          {/* Google – multicolor G on hover */}
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:[color:#4285F4]"
            aria-label="Google Ads"
          >
            <svg className="h-7 w-7 sm:h-8 sm:w-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            <span className="text-sm font-semibold sm:text-base">Google Ads</span>
          </span>
          {/* Shopify – green bag */}
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:text-[#96BF48]"
            aria-label="Shopify"
          >
            <ShoppingBag className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} />
            <span className="text-sm font-semibold sm:text-base">Shopify</span>
          </span>
          {/* Klaviyo – bold text */}
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:text-orange-400"
            aria-label="Klaviyo"
          >
            <span className="text-lg font-bold tracking-tight sm:text-xl">Klaviyo</span>
          </span>
          {/* TikTok – note icon */}
          <span
            className="flex items-center gap-2 text-zinc-500 transition hover:text-white"
            aria-label="TikTok"
          >
            <Music2 className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={2} />
            <span className="text-sm font-semibold sm:text-base">TikTok Ads</span>
          </span>
        </div>
      </section>

      {/* ─── The Problem ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
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
                accent: "orange",
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
                className="rounded-[32px] border border-zinc-800/80 bg-zinc-900/50 p-6 sm:p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                    item.accent === "orange"
                      ? "bg-orange-500/10 ring-1 ring-orange-500/30"
                      : item.accent === "red"
                        ? "bg-red-500/10 ring-1 ring-red-500/30"
                        : "bg-violet-500/10 ring-1 ring-violet-500/30"
                  }`}
                >
                  <item.icon
                    className={`h-7 w-7 ${
                      item.accent === "orange"
                        ? "text-orange-400"
                        : item.accent === "red"
                          ? "text-red-400"
                          : "text-violet-400"
                    }`}
                  />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Loved by Growth Teams (Social Proof Cases) ───────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Loved by Growth Teams
          </motion.h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
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
                accent: "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40",
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
                className="rounded-[32px] border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/50 transition hover:border-orange-500/30 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.15)] sm:p-8"
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
                    <p className="font-semibold text-white">{item.name}</p>
                    <p className="text-xs text-white/60">{item.role}</p>
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
            className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
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
              <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {["Meta", "Google", "TikTok", "Shopify", "Klaviyo"].map(
                    (label) => (
                      <div
                        key={label}
                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xs font-medium text-white/70"
                      >
                        {label.slice(0, 2)}
                      </div>
                    )
                  )}
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  <Link2 className="h-5 w-5 text-orange-400" />
                  <span className="text-sm text-white/50">Connections</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                Step 1
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Connect everything.
              </h3>
              <p className="mt-4 text-white/70">
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
              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Analyze in real-time.
              </h3>
              <p className="mt-4 text-white/70">
                ROAS, spend, and revenue update live. No more exporting CSVs or
                waiting for tomorrow's numbers.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-white/50">
                  <LayoutDashboard className="h-5 w-5" />
                  <span className="text-sm">Dashboard</span>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="h-12 rounded-xl border border-white/5 bg-white/5"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 3: Scale – Image left, Text right */}
          <motion.div
            className="mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
            {...sectionFade}
          >
            <div className="relative order-2 lg:order-1">
              <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-sm">
                <div className="flex items-end justify-between gap-2 px-4">
                  {[40, 55, 45, 70, 85, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-orange-500/40"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2 text-emerald-400">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Profit trend</span>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-sm font-semibold uppercase tracking-wider text-orange-400">
                Step 3
              </span>
              <h3 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                Scale with confidence.
              </h3>
              <p className="mt-4 text-white/70">
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
            className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
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
                className="group rounded-[32px] border border-zinc-800/80 bg-zinc-950/90 p-6 sm:p-8"
                initial={false}
                whileHover={{
                  y: -6,
                  boxShadow:
                    "0 0 0 1px rgba(249,115,22,0.15), 0 25px 50px -12px rgba(0,0,0,0.5), 0 0 60px -15px rgba(249,115,22,0.35)",
                  transition: { duration: 0.25 },
                }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500/10 ring-1 ring-orange-500/20 transition group-hover:ring-orange-500/40">
                  <item.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Simple pricing
          </motion.h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-white/60">
            Start free. Upgrade when you're ready.
          </p>
          <div className="mt-16 grid gap-6 sm:grid-cols-3">
            {/* Starter */}
            <motion.div
              className="flex flex-col rounded-[32px] border border-zinc-800/80 bg-zinc-900/50 p-6 sm:p-8"
              {...sectionFade}
            >
              <h3 className="text-lg font-semibold text-white">Starter</h3>
              <p className="mt-4 text-3xl font-bold text-white">0 €</p>
              <p className="mt-1 text-sm text-white/60">Free</p>
              <p className="mt-4 text-sm text-white/70">
                Perfect for side projects.
              </p>
              <div className="mt-auto pt-8">
                <Link
                  href="/register"
                  className="inline-flex w-full justify-center rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm font-semibold text-white transition hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
            {/* Pro – Popular, larger */}
            <motion.div
              className="relative flex flex-col rounded-[32px] border-2 border-orange-500/50 bg-zinc-950/90 p-6 shadow-[0_0_40px_-10px_rgba(249,115,22,0.25)] sm:p-8 lg:-mt-2 lg:scale-[1.02]"
              {...sectionFade}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-black">
                Popular
              </div>
              <h3 className="text-lg font-semibold text-white">Growth</h3>
              <p className="mt-4 text-3xl font-bold text-orange-400">49 €</p>
              <p className="mt-1 text-sm text-white/60">per month</p>
              <p className="mt-4 text-sm text-white/70">The CMO Suite.</p>
              <div className="mt-auto pt-8">
                <Link
                  href="/register"
                  className="inline-flex w-full justify-center rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-orange-400 hover:shadow-orange-500/35"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
            {/* Agency */}
            <motion.div
              className="flex flex-col rounded-[32px] border border-zinc-800/80 bg-zinc-900/50 p-6 sm:p-8"
              {...sectionFade}
            >
              <h3 className="text-lg font-semibold text-white">Agency</h3>
              <p className="mt-4 text-3xl font-bold text-white">Custom</p>
              <p className="mt-1 text-sm text-white/60">Contact us</p>
              <p className="mt-4 text-sm text-white/70">For big teams.</p>
              <div className="mt-auto pt-8">
                <Link
                  href="#"
                  className="inline-flex w-full justify-center rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm font-semibold text-white transition hover:border-violet-500/50 hover:bg-violet-500/10 hover:text-violet-400"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FAQ (Accordion) ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
            {...sectionFade}
          >
            Frequently asked
          </motion.h2>
          <div className="mt-12 space-y-2">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                className="rounded-3xl border border-zinc-800/80 bg-zinc-900/50 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-white transition hover:bg-white/5"
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
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Ready to optimize?
          </h2>
          <p className="mt-4 text-lg text-white/70">
            Join growth teams who run on one dashboard.
          </p>
          <motion.div
            className="mt-10"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-orange-500 px-12 py-5 text-lg font-semibold text-black shadow-xl shadow-orange-500/30 transition hover:bg-orange-400 hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              Start 14-day Free Trial
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Social Proof ───────────────────────────────── */}
      <section className="relative z-10 border-t border-white/5 px-6 py-20 sm:px-8 sm:py-24">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          {...sectionFade}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-white/40">
            Trusted by growth teams at
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16">
            {["Nova", "Flux", "Apex", "Stride", "Venture"].map((name) => (
              <span
                key={name}
                className="text-xl font-semibold text-white/30 transition hover:text-white/50 sm:text-2xl"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Footer ──────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/5 px-6 py-12 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20">
              <span className="text-sm font-bold text-orange-400">LT</span>
            </div>
            <span className="text-sm font-medium text-white/80">
              Leadtribute
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <Link
              href="/register"
              className="rounded-full border border-white/20 bg-transparent px-4 py-2 font-medium text-white/90 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
            >
              Get Started
            </Link>
            <Link href="#" className="transition hover:text-orange-400">
              Impressum
            </Link>
            <Link href="#" className="transition hover:text-orange-400">
              Privacy
            </Link>
            <Link href="#" className="transition hover:text-orange-400">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
