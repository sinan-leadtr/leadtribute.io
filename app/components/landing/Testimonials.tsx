"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { landingDarkCard } from "./preview-styles";

const testimonials = [
  {
    quote:
      "Markov attribution finally showed us which channels earn their spend. We reallocated budget in a week and ROAS climbed 28%.",
    name: "Martin S.",
    role: "Founder",
    company: "Northline DTC",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face",
    accent: "ring-violet-500/40",
  },
  {
    quote:
      "We scaled from €10k to €50k monthly ad spend without flying blind. One dashboard for Meta, Google, and Shopify revenue.",
    name: "Sarah M.",
    role: "CMO",
    company: "GlowUp",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=face",
    accent: "ring-emerald-500/40",
  },
  {
    quote:
      "Setup took five minutes. We cut client reporting time by 90% and finally compare attribution models side by side.",
    name: "Lena K.",
    role: "Head of Performance",
    company: "AgencyFlow",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face",
    accent: "ring-sky-500/40",
  },
];

const teamLogos = ["Nova", "Flux", "Apex", "Stride", "Venture"];

const sectionFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

function TestimonialCard({
  item,
  index,
}: {
  item: (typeof testimonials)[number];
  index: number;
}) {
  return (
    <motion.article
      className={`flex h-full flex-col p-6 transition hover:border-white/25 sm:p-8 ${landingDarkCard}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden />
          ))}
        </div>
        <Quote className="h-8 w-8 shrink-0 text-white/10" aria-hidden />
      </div>
      <p className="mt-5 flex-1 text-sm leading-relaxed text-white/80 sm:text-base">
        &ldquo;{item.quote}&rdquo;
      </p>
      <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-6">
        <div
          className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-2 ${item.accent}`}
        >
          <Image
            src={item.image}
            alt={`Photo of ${item.name}`}
            width={48}
            height={48}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-white">{item.name}</p>
          <p className="truncate text-xs text-white/55 sm:text-sm">
            {item.role}
            <span className="text-white/35"> · </span>
            {item.company}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

export function Testimonials() {
  return (
    <section className="relative z-10 px-6 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div className="mx-auto max-w-2xl text-center" {...sectionFade}>
          <p className="text-sm font-medium uppercase tracking-widest text-violet-600">
            Social proof
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Trusted and loved by growth teams
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/60 sm:text-lg">
            Marketers, founders, and agencies use Leadtribute to unify attribution,
            commerce revenue, and spend—without spreadsheet chaos.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.name} item={item} index={i} />
          ))}
        </div>

        <motion.div
          className="mt-20 border-t border-black/5 pt-14 text-center"
          {...sectionFade}
          transition={{ ...sectionFade.transition, delay: 0.15 }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-black/40">
            Used by teams at
          </p>
          <motion.div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {teamLogos.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold text-black/35 transition hover:text-black/60 sm:text-xl"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
