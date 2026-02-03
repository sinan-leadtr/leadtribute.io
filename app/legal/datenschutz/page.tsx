import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:border-orange-500 hover:bg-orange-500/10 hover:text-orange-400"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          Back to Home
        </Link>

        <div className="rounded-3xl border border-zinc-800/80 bg-zinc-950/90 p-8 shadow-xl shadow-black/50 sm:p-10">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Datenschutzerklärung
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Stand: Januar 2026
          </p>

          <div className="mt-8 space-y-6 text-white/80">
            <section>
              <h2 className="text-lg font-semibold text-white">1. Einleitung</h2>
              <p className="mt-2 leading-relaxed">
                Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Diese Datenschutzerklärung informiert Sie über die Verarbeitung personenbezogener Daten bei der Nutzung unserer Website und unserer Dienste. Maßgeblich sind die Bestimmungen der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">2. Verantwortlicher</h2>
              <p className="mt-2 leading-relaxed">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
                Mustermann GmbH<br />
                Musterstraße 123<br />
                40213 Düsseldorf<br />
                E-Mail: datenschutz@mustermann-gmbh.de
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">3. Erhobene Daten und Zweck</h2>
              <p className="mt-2 leading-relaxed">
                Bei jedem Zugriff auf unsere Website werden automatisch Zugriffsdaten (z. B. IP-Adresse, Datum, Uhrzeit, aufgerufene Seite) in Logfiles gespeichert. Diese Daten dienen der Sicherstellung des Betriebs und der Sicherheit. Personenbezogene Daten, die Sie uns im Rahmen einer Registrierung oder Kontaktaufnahme überlassen (z. B. E-Mail, Name), werden nur zur Vertragserfüllung bzw. zur Beantwortung Ihrer Anfrage verarbeitet.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">4. Rechtsgrundlagen</h2>
              <p className="mt-2 leading-relaxed">
                Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung), lit. f DSGVO (berechtigte Interessen) sowie, soweit Sie eingewilligt haben, lit. a DSGVO. Eine Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">5. Speicherdauer und Ihre Rechte</h2>
              <p className="mt-2 leading-relaxed">
                Daten werden nur so lange gespeichert, wie es für den genannten Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit sowie das Recht, sich bei einer Aufsichtsbehörde zu beschweren.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">6. Cookies und externe Dienste</h2>
              <p className="mt-2 leading-relaxed">
                Soweit wir Cookies oder externe Dienste (z. B. Analyse-Tools) einsetzen, werden Sie in separaten Hinweisen oder über unser Cookie-Banner informiert. Die Nutzung kann über Ihre Browser-Einstellungen bzw. Widerspruchsmöglichkeiten eingeschränkt werden.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
