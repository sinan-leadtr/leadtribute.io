"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImprintPage() {
  return (
    <div
      className="min-h-screen bg-black text-white"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to Home
        </Link>

        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-8 shadow-xl shadow-black/50 sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Impressum
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Angaben gemäß § 5 TMG
          </p>

          <dl className="mt-8 space-y-4 text-white/90">
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/50">
                Anbieter
              </dt>
              <dd className="mt-1 text-base font-medium text-white">
                Sinan Öztürk Basar
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/50">
                Ort
              </dt>
              <dd className="mt-1 text-base text-white/90">
                Düsseldorf, Deutschland
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/50">
                Kontakt
              </dt>
              <dd className="mt-1 text-base text-white/90">
                01743824814
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-wider text-white/50">
                E-Mail
              </dt>
              <dd className="mt-1">
                <a
                  href="mailto:sinan@leadtribute.io"
                  className="font-medium text-orange-400 transition hover:text-orange-300"
                >
                  sinan@leadtribute.io
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
