import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import PromoRentreeBanner from "@/components/PromoRentreeBanner";
import { getCachedPremiumPlans, planFeatures, formatPlanPrice, formatPlanInterval, type PlanRow } from "@/lib/plans";
import { isRentreePromoActive } from "@/lib/promo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs et abonnements",
  description:
    "Tarifs Edukora en FCFA : plan Découverte gratuit, Premium Réussite et Premium Plus. Paiement Mobile Money (Orange, MTN, Moov), carte bancaire ou USSD. Sans engagement.",
  alternates: { canonical: "/tarifs" },
};

export const revalidate = 300;

const faq = [
  {
    q: "Puis-je commencer gratuitement ?",
    a: "Oui ! Le plan Découverte est 100% gratuit et sans engagement. Il te donne accès à 10 fiches de révision par mois et 5 questions mensuelles à Kora, notre tuteur IA.",
  },
  {
    q: "Comment payer mon abonnement Premium ?",
    a: "Le paiement se fait en FCFA via Mobile Money (Orange, MTN, Moov), carte bancaire ou USSD. L'abonnement se renouvelle automatiquement chaque mois, et tu peux l'annuler à tout moment.",
  },
  {
    q: "Le Premium est-il remboursable ?",
    a: "Oui, nous offrons une garantie satisfait ou remboursé de 7 jours. Contacte notre support si tu n'es pas convaincu par la plateforme.",
  },
  {
    q: "Puis-je partager mon abonnement avec mon frère ou ma sœur ?",
    a: "Chaque compte est personnel et lié à une filière (BAC ou BEPC). Pour plusieurs enfants, chaque enfant doit avoir son propre compte et son propre suivi de progression.",
  },
];

const FALLBACK_DECOUVERTE: PlanRow = {
  id: 0,
  name: "Plan Découverte",
  interval: "month",
  price_cents: 0,
  currency: "XOF",
  features: ["Accès à 10 fiches de révision / mois", "5 questions par mois à Kora IA", "Simulateur d'examen (Accès limité)"].join("\n"),
  sort_order: 0,
};

const FALLBACK_REUSSITE: PlanRow = {
  id: 0,
  name: "Premium Réussite",
  interval: "month",
  price_cents: 4900,
  currency: "XOF",
  features: ["Accès illimité à toutes les fiches", "30 questions par mois à Kora IA", "Simulateur complet + Correction détaillée", "Support prioritaire par nos professeurs"].join("\n"),
  sort_order: 1,
};

export default async function Page() {
  let plans: PlanRow[] = [];
  try {
    plans = await getCachedPremiumPlans();
  } catch {
    plans = [];
  }
  const decouverte = plans.find((p) => p.price_cents === 0 && p.interval === "month") ?? FALLBACK_DECOUVERTE;
  const reussite = plans.find((p) => p.price_cents > 0 && p.interval === "month") ?? FALLBACK_REUSSITE;
  const decouverteFeatures = planFeatures(decouverte);
  const reussiteFeatures = planFeatures(reussite);

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden pt-16 pb-20 px-4 md:px-8">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary opacity-[0.06] rounded-[999px] blur-3xl" />
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-[999px] text-label-xs font-bold mb-6">
              <span className="material-symbols-outlined text-[16px]">sell</span>
              NOS TARIFS
            </div>
            <h1 className="text-[40px] md:text-[56px] leading-[1.08] font-extrabold text-primary mb-6">
              Un investissement pour ton futur
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Choisis le plan qui te convient le mieux pour tes révisions. Commence gratuitement, passe en Premium
              quand tu es prêt.
            </p>
          </div>
        </section>

        {isRentreePromoActive() && (
          <section className="px-4 md:px-8 pb-10">
            <div className="max-w-5xl mx-auto">
              <PromoRentreeBanner />
            </div>
          </section>
        )}

        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-outline-variant relative overflow-hidden hover:border-primary/30 transition-all">
              <div className="mb-8">
                <h3 className="text-headline-md text-on-surface mb-2">{decouverte.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-primary">{formatPlanPrice(decouverte.price_cents)}</span>
                  <span className="text-on-surface-variant">{formatPlanInterval(decouverte.interval)}</span>
                </div>
                <p className="text-label-sm text-on-surface-variant mt-2">Idéal pour tester la plateforme</p>
              </div>
              <ul className="space-y-4 mb-10">
                {decouverteFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-label-sm">
                    <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/inscription-1-2-edukora"
                className="w-full block text-center py-4 rounded-[16px] border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] align-middle mr-1">rocket_launch</span>
                Essayer gratuitement
              </Link>
            </div>
            <div className="bg-primary rounded-[32px] p-8 relative overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all">
              <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-fixed px-6 py-2 rounded-bl-[24px] text-label-xs font-bold uppercase tracking-tighter">
                Populaire
              </div>
              <div className="mb-8">
                <h3 className="text-headline-md text-white mb-2">{reussite.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-primary-fixed">{formatPlanPrice(reussite.price_cents)}</span>
                  <span className="text-primary-container">{formatPlanInterval(reussite.interval)}</span>
                </div>
                {isRentreePromoActive() && (
                  <p className="text-tertiary-fixed text-label-xs font-bold mt-1">
                    -30 % avec le code RENTREE30 au paiement
                  </p>
                )}
                <p className="text-on-primary-container text-label-sm mt-2">L'outil ultime pour le BAC &amp; BEPC</p>
              </div>
              <ul className="space-y-4 mb-10">
                {reussiteFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-label-sm text-white">
                    <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/plans-d-abonnement-edukora-1"
                className="w-full block text-center py-4 rounded-[16px] bg-secondary-container text-on-secondary-fixed font-bold hover:shadow-lg transition-all active:scale-95"
              >
                S'abonner maintenant
              </Link>
            </div>
          </div>
          <p className="text-center text-label-sm text-on-surface-variant mt-8">
            Des questions ? Consulte notre FAQ ci-dessous ou contacte le support.
          </p>
        </section>

        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-5xl mx-auto py-20">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4 text-center">Compare les plans</h2>
            <p className="text-body-md text-on-surface-variant mb-12 text-center">
              Tous les plans incluent l'accès aux leçons de ton programme (BAC ou BEPC).
            </p>

            <div className="bg-white/90 backdrop-blur-md rounded-[32px] border border-outline-variant overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_1fr_1fr] border-b border-outline-variant">
                <div className="p-5 md:p-6" />
                <div className="p-5 md:p-6 text-center">
                  <p className="text-label-sm font-bold text-on-surface">{decouverte.name}</p>
                  <p className="text-label-xs text-on-surface-variant mt-1">{formatPlanPrice(decouverte.price_cents)}/mois</p>
                </div>
                <div className="p-5 md:p-6 text-center bg-primary-fixed/40">
                  <p className="text-label-sm font-bold text-primary">{reussite.name}</p>
                  <p className="text-label-xs text-primary mt-1">{formatPlanPrice(reussite.price_cents)}/mois</p>
                </div>
              </div>

              {[
                { feature: "Fiches de révision", decouverte: "10 fiches / mois", reussite: "Accès illimité", highlight: true },
                { feature: "Questions à Kora (IA)", decouverte: "5 questions / mois", reussite: "30 questions / mois", highlight: true },
                { feature: "Simulateur d'examen", decouverte: "Accès limité", reussite: "Complet + corrections détaillées", highlight: true },
                { feature: "Suivi de progression", decouverte: "Oui", reussite: "Oui + rapports détaillés" },
                { feature: "Accès mobile & web", decouverte: "Oui", reussite: "Oui" },
                { feature: "Support", decouverte: "Communauté", reussite: "Prioritaire par nos professeurs" },
                { feature: "Garantie satisfait ou remboursé", decouverte: "—", reussite: "7 jours" },
              ].map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_1fr_1fr] ${i % 2 === 0 ? "bg-surface-container-low/60" : ""} ${row.highlight ? "font-semibold" : ""}`}
                >
                  <div className="p-5 md:p-6 text-label-sm text-on-surface">{row.feature}</div>
                  <div className="p-5 md:p-6 text-center text-label-sm text-on-surface-variant">{row.decouverte}</div>
                  <div className="p-5 md:p-6 text-center text-label-sm text-primary bg-primary-fixed/40">{row.reussite}</div>
                </div>
              ))}

              <div className="border-t border-outline-variant bg-white">
                <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_1fr_1fr]">
                  <div className="p-5 md:p-6" />
                  <div className="p-5 md:p-6 flex justify-center">
                    <Link
                      href="/inscription-1-2-edukora"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] border-2 border-primary text-primary text-label-sm font-bold hover:bg-primary/5 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                      Essayer gratuitement
                    </Link>
                  </div>
                  <div className="p-5 md:p-6 flex justify-center bg-primary-fixed/40">
                    <Link
                      href="/plans-d-abonnement-edukora-1"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-[16px] bg-primary text-on-primary text-label-sm font-bold hover:bg-primary/90 transition-all active:scale-95"
                    >
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                      Choisir Réussite
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 md:px-8 bg-surface-container-low">
          <div className="max-w-3xl mx-auto py-20">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4 text-center">Questions fréquentes</h2>
            <p className="text-body-md text-on-surface-variant mb-12 text-center">
              Tout ce qu'il faut savoir avant de t'abonner.
            </p>
            <div className="space-y-4">
              {faq.map((f) => (
                <details
                  key={f.q}
                  className="group bg-white/80 backdrop-blur-md rounded-[20px] border border-outline-variant/40 p-6 open:shadow-md transition-shadow"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-label-sm font-bold text-on-surface">
                    {f.q}
                    <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">expand_more</span>
                  </summary>
                  <p className="mt-4 text-body-md text-on-surface-variant leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 md:px-8 pt-8">
          <div className="max-w-7xl mx-auto bg-primary rounded-[32px] md:rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-6">Prêt à décrocher ton diplôme ?</h2>
              <p className="text-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto">
                Commence gratuitement aujourd'hui et passe en Premium quand tu es prêt à aller plus loin.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/inscription-1-2-edukora"
                  className="bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-[20px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl"
                >
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Créer mon compte gratuit
                </Link>
                <Link
                  href="/connexion-edukora"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-body-md font-bold px-10 py-5 rounded-[20px] border border-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">login</span>
                  J'ai déjà un compte
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
