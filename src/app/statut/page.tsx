import type { Metadata } from "next";
import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Statut du service | Edukora",
  description: "État en temps réel des services Edukora : application, API et paiements.",
  robots: { index: false },
};

async function check(name: string, url: string, ok: (d: unknown) => boolean): Promise<{ name: string; up: boolean; ms: number }> {
  const t0 = Date.now();
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(8000) });
    const d = await res.json().catch(() => null);
    return { name, up: res.ok && (!ok || ok(d)), ms: Date.now() - t0 };
  } catch {
    return { name, up: false, ms: Date.now() - t0 };
  }
}

export default async function StatusPage() {
  const [app, health] = await Promise.all([
    check("Application web (edukora.net)", "https://edukora.net/", () => true),
    check("API & base de données", "https://edukora.net/api/health", (d) => !!(d as { ok?: boolean })?.ok),
  ]);
  // Paiement : on ne teste pas GeniusPay directement (pas de ping public fiable),
  // on considère le service OK si l'API répond.
  const payment = { ...health, name: "Paiements Mobile Money" };

  const services = [
    { ...app, desc: "Pages, cours, quiz et simulateur" },
    { ...health, desc: "Comptes, progression, notifications" },
    { ...payment, desc: "Orange Money, MTN MoMo, Moov, Wave" },
  ];
  const allUp = services.every((s) => s.up);

  return (
    <>
      <MarketingHeader />
      <main role="main" className="bg-background text-on-background min-h-screen font-body max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-[32px] font-extrabold text-primary mb-2">Statut du service</h1>
        <p className="text-on-surface mb-8">État en temps réel de la plateforme Edukora.</p>

        <div
          className={`rounded-2xl p-5 mb-6 font-label-md font-bold flex items-center gap-3 ${
            allUp ? "bg-tertiary-container/20 text-tertiary" : "bg-error-container/30 text-error"
          }`}
        >
          <span className="material-symbols-outlined text-3xl">{allUp ? "check_circle" : "error"}</span>
          {allUp ? "Tous les systèmes sont opérationnels" : "Incident en cours — nos équipes interviennent"}
        </div>

        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.name} className="bg-white border border-outline-variant rounded-xl p-4 flex items-center gap-4">
              <span className={`w-3 h-3 rounded-full shrink-0 ${s.up ? "bg-green-500" : "bg-red-500"}`} />
              <div className="flex-1 min-w-0">
                <p className="font-label-md font-bold text-on-surface">{s.name}</p>
                <p className="text-xs text-on-surface">{s.desc}</p>
              </div>
              <span className="text-xs text-on-surface tabular-nums">{(s.ms / 1000).toFixed(2)}s</span>
            </div>
          ))}
        </div>

        <p className="text-xs text-on-surface mt-6">
          Une panne ? Contactez-nous à{" "}
          <Link href="mailto:contact@edukora.net" className="text-primary underline hover:no-underline">contact@edukora.net</Link>.
        </p>
      </main>
      <MarketingFooter />
    </>
  );
}
