import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/60 hover:bg-white/10"
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

          <div className="mt-8 space-y-6 text-white/80">
            <section>
              <h2 className="text-lg font-semibold text-white">Anbieter</h2>
              <p className="mt-2 leading-relaxed">
                Mustermann GmbH<br />
                Musterstraße 123<br />
                40213 Düsseldorf<br />
                Deutschland
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Vertreten durch</h2>
              <p className="mt-2 leading-relaxed">
                Geschäftsführer: Max Mustermann
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Kontakt</h2>
              <p className="mt-2 leading-relaxed">
                Telefon: +49 (0) 211 12345678<br />
                E-Mail: info@mustermann-gmbh.de
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Registereintrag</h2>
              <p className="mt-2 leading-relaxed">
                Eintragung im Handelsregister.<br />
                Registergericht: Amtsgericht Düsseldorf<br />
                Registernummer: HRB 12345
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Umsatzsteuer-ID</h2>
              <p className="mt-2 leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
                DE 123 456 789
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">Verantwortlich für den Inhalt</h2>
              <p className="mt-2 leading-relaxed">
                Max Mustermann<br />
                Musterstraße 123<br />
                40213 Düsseldorf
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
