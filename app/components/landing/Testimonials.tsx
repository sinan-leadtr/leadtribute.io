"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Finally I can see which channel is actually profitable.",
    name: "Martin S.",
    title: "E-Com Founder",
    initials: "MS",
    accent: "bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/40",
  },
  {
    quote: "Setup took five minutes. A real game-changer for our team.",
    name: "Lena K.",
    title: "Performance Lead",
    initials: "LK",
    accent: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40",
  },
  {
    quote: "No more spreadsheet hell. Leadtribute is my homepage now.",
    name: "Tim B.",
    title: "Agency Owner",
    initials: "TB",
    accent: "bg-sky-500/20 text-sky-400 ring-1 ring-sky-500/40",
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
      <motion.div className="mx-auto max-w-6xl">
        <motion.p
          className="text-center text-sm font-medium uppercase tracking-widest text-black/40 sm:text-base"
          {...sectionFade}
        >
          Trusted by growth teams.
        </motion.p>
        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-3 sm:gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-6 shadow-xl shadow-black/50 transition hover:border-white/60 hover:shadow-[0_0_50px_-14px_rgba(0,0,0,0.9)] sm:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                &ldquo;{item.quote}&rdquo;
              </p>
              <motion.div className="mt-6 flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${item.accent}`}
                  aria-hidden
                >
                  {item.initials}
                </div>
                <motion.div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-white/50 sm:text-sm">{item.title}</p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
