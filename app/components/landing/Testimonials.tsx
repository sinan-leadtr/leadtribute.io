"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Endlich sehe ich, welcher Channel wirklich profitabel ist.",
    name: "Martin S.",
    title: "E-Com Founder",
    initials: "MS",
    accent: "bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/40",
  },
  {
    quote:
      "Das Setup hat nur 5 Minuten gedauert. Ein Gamechanger.",
    name: "Lena K.",
    title: "Performance Lead",
    initials: "LK",
    accent: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40",
  },
  {
    quote:
      "Keine Excel-Hölle mehr. Leadtribute ist meine Startseite geworden.",
    name: "Tim B.",
    title: "Agency Owner",
    initials: "TB",
    accent: "bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/40",
  },
];

const sectionFade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45 },
};

export function Testimonials() {
  return (
    <section className="relative z-10 px-6 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.p
          className="text-center text-sm font-medium uppercase tracking-widest text-white/50 sm:text-base"
          {...sectionFade}
        >
          Trusted by growth teams.
        </motion.p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/50 transition hover:border-orange-500/20 hover:shadow-[0_0_30px_-10px_rgba(249,115,22,0.12)] sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${item.accent}`}
                  aria-hidden
                >
                  {item.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/50 sm:text-sm">{item.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
