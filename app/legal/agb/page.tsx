import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AGBPage() {
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
            Allgemeine Geschäftsbedingungen (AGB)
          </h1>
          <p className="mt-2 text-sm text-white/50">
            Stand: Januar 2026
          </p>

          <div className="mt-8 space-y-6 text-white/80">
            <section>
              <h2 className="text-lg font-semibold text-white">§ 1 Geltungsbereich</h2>
              <p className="mt-2 leading-relaxed">
                Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der Mustermann GmbH (nachfolgend „Anbieter“) und dem Kunden über die Nutzung der Software und der damit verbundenen Leistungen. Abweichende Bedingungen des Kunden werden nicht anerkannt, sofern der Anbieter ihrer Geltung nicht ausdrücklich schriftlich zugestimmt hat.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">§ 2 Vertragsschluss und Leistungsumfang</h2>
              <p className="mt-2 leading-relaxed">
                Der Vertrag kommt durch Registrierung und Bestätigung durch den Anbieter zustande. Der Umfang der geschuldeten Leistungen ergibt sich aus der gewählten Produktvariante (z. B. Starter, Pro, Scale) und der jeweiligen Produktbeschreibung auf der Website. Der Anbieter erbringt seine Leistungen mit der gebotenen Sorgfalt; ein bestimmter Erfolg wird nicht geschuldet.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">§ 3 Laufzeit und Kündigung</h2>
              <p className="mt-2 leading-relaxed">
                Die Laufzeit richtet sich nach der gewählten Abrechnungsperiode (monatlich/jährlich). Das Vertragsverhältnis verlängert sich automatisch um die gewählte Periode, sofern nicht mit einer Frist von mindestens 14 Tagen zum Ende der Laufzeit gekündigt wird. Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt. Die Kündigung erfolgt in textform (z. B. per E-Mail).
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">§ 4 Preise und Zahlung</h2>
              <p className="mt-2 leading-relaxed">
                Die aktuellen Preise gelten zum Zeitpunkt der Bestellung. Die Abrechnung erfolgt im Voraus für die gewählte Abrechnungsperiode. Zahlungen sind innerhalb von 14 Tagen nach Rechnungsstellung ohne Abzug fällig. Bei Zahlungsverzug können Verzugszinsen in gesetzlicher Höhe berechnet werden.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">§ 5 Nutzungsrechte und Pflichten des Kunden</h2>
              <p className="mt-2 leading-relaxed">
                Dem Kunden wird ein nicht ausschließliches, nicht übertragbares, zeitlich auf die Vertragslaufzeit beschränktes Recht zur Nutzung der Software eingeräumt. Der Kunde ist verpflichtet, Zugangsdaten geheim zu halten und die Nutzung nur im Rahmen des Vertragszwecks vorzunehmen. Eine Weitergabe an Dritte oder die Nutzung für rechtswidrige Zwecke ist untersagt.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">§ 6 Haftung und Gewährleistung</h2>
              <p className="mt-2 leading-relaxed">
                Die Haftung des Anbieters ist auf Vorsatz und grobe Fahrlässigkeit sowie auf die Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) beschränkt, soweit nicht zwingend gehaftet wird. Die Gewährleistung richtet sich nach den gesetzlichen Vorschriften. Bei Mängeln ist der Anbieter zunächst zur Nacherfüllung berechtigt.
              </p>
            </section>
            <section>
              <h2 className="text-lg font-semibold text-white">§ 7 Schlussbestimmungen</h2>
              <p className="mt-2 leading-relaxed">
                Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Gerichtsstand für Streitigkeiten ist, soweit gesetzlich zulässig, der Sitz des Anbieters. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
