import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const faq = [
  {
    q: "Puis-je commencer gratuitement ?",
    a: "Oui ! Le plan Découverte est 100% gratuit et sans engagement. Il te donne accès à 10 fiches de révision par mois et 5 questions quotidiennes à Kora, notre tuteur IA.",
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

export default function Page() {
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

        <section className="px-4 md:px-8 pb-24">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-outline-variant relative overflow-hidden hover:border-primary/30 transition-all">
              <div className="mb-8">
                <h3 className="text-headline-md text-on-surface mb-2">Plan Découverte</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-primary">0 FCFA</span>
                  <span className="text-on-surface-variant">/mois</span>
                </div>
                <p className="text-label-sm text-on-surface-variant mt-2">Idéal pour tester la plateforme</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-label-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Accès à 10 fiches de révision / mois
                </li>
                <li className="flex items-center gap-3 text-label-sm">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  5 questions quotidiennes à Kora IA
                </li>
                <li className="flex items-center gap-3 text-label-sm text-outline">
                  <span className="material-symbols-outlined text-[20px]">block</span>
                  Simulateur d'examen (Accès limité)
                </li>
              </ul>
              <Link
                href="/inscription-1-2-edukora"
                className="w-full block text-center py-4 rounded-[16px] border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
              >
                Commencer maintenant
              </Link>
            </div>
            <div className="bg-primary rounded-[32px] p-8 relative overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all">
              <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-fixed px-6 py-2 rounded-bl-[24px] text-label-xs font-bold uppercase tracking-tighter">
                Populaire
              </div>
              <div className="mb-8">
                <h3 className="text-headline-md text-white mb-2">Premium Réussite</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-bold text-primary-fixed">4,900 FCFA</span>
                  <span className="text-primary-container">/mois</span>
                </div>
                <p className="text-on-primary-container text-label-sm mt-2">L'outil ultime pour le BAC &amp; BEPC</p>
              </div>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-label-sm text-white">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                  Accès illimité à toutes les fiches
                </li>
                <li className="flex items-center gap-3 text-label-sm text-white">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                  Kora IA illimité 24h/24
                </li>
                <li className="flex items-center gap-3 text-label-sm text-white">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                  Simulateur complet + Correction détaillée
                </li>
                <li className="flex items-center gap-3 text-label-sm text-white">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                  Support prioritaire par nos professeurs
                </li>
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
