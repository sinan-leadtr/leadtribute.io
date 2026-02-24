"use client";

import Link from "next/link";

const productLinks = [
  { label: "Features", href: "#" },
  { label: "Pricing", href: "#pricing" },
  { label: "Login", href: "/login" },
];

const companyLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const legalLinks = [
  { label: "Impressum", href: "/legal/impressum" },
  { label: "Datenschutz", href: "/legal/datenschutz" },
  { label: "AGB", href: "/legal/agb" },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:px-8 sm:py-20">
        {/* Link-Spalten */}
        <div className="grid gap-8 text-sm sm:grid-cols-3">
          <div className="space-y-2">
            {productLinks.map(({ label, href }) => (
              <div key={label}>
                <Link
                  href={href}
                  className="text-sm text-black/70 transition hover:text-black"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {companyLinks.map(({ label, href }) => (
              <div key={label}>
                <Link
                  href={href}
                  className="text-sm text-black/70 transition hover:text-black"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {legalLinks.map(({ label, href }) => (
              <div key={label}>
                <Link
                  href={href}
                  className="text-sm text-black/70 transition hover:text-black"
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Leadtribute Wortmarke + Copyright */}
        <div className="border-t border-black/5 pt-10 pb-2">
          <div className="text-center text-[48px] font-semibold tracking-tight text-black sm:text-[64px] md:text-[80px]">
            <span className="relative inline-flex items-center justify-center">
              <span>Leadtribute</span>
              <span
                className="attribution-dot ml-3 mt-2"
                aria-hidden
              />
            </span>
          </div>
          <div className="mt-2 text-center text-xs text-black/40">
            © 2026 Leadtribute. Made in Düsseldorf
          </div>
        </div>
      </div>
    </footer>
  );
}
