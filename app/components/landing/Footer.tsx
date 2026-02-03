"use client";

import Link from "next/link";

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#pricing" },
  { label: "Login", href: "/login" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Contact", href: "#" },
];

const legalLinks = [
  { label: "Impressum", href: "/legal/impressum" },
  { label: "Datenschutz", href: "/legal/datenschutz" },
  { label: "AGB", href: "/legal/agb" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/40">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-16">
          {/* Logo & Slogan */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 ring-1 ring-orange-500/20">
                <span className="text-lg font-bold text-orange-400">LT</span>
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">
                Leadtribute
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              The Operating System for Performance Marketers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Product
            </h3>
            <ul className="mt-4 space-y-3">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition hover:text-orange-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition hover:text-orange-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal (rechtssicher für Deutschland) */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/70 transition hover:text-orange-400"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 border-t border-white/5 pt-8 text-center sm:mt-20 sm:pt-10">
          <p className="text-sm text-white/50">
            © 2026 Leadtribute. Made in 🇩🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
