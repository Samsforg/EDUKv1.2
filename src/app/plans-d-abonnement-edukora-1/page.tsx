import type { Metadata } from "next";
import { getPremiumPlans, planFeatures, type PlanRow } from "@/lib/plans";
import PromoRentreeBanner from "@/components/PromoRentreeBanner";
import PlanSelector from "@/components/PlanSelector";
import { isRentreePromoActive } from "@/lib/promo";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abonnement Premium",
  description:
    "Choisissez votre abonnement Edukora Premium et payez en toute sécurité par Mobile Money (Orange, MTN, Moov) en FCFA. Accédez à toutes les fiches, le simulateur et le tuteur IA.",
  alternates: { canonical: "/plans-d-abonnement-edukora-1" },
};

// Rendu à la volée : le pré-rendu au build s'exécute sans DATABASE_URL (SQLite local),
// ce qui figerait l'état « plans indisponibles » au déploiement. Ne jamais mettre en cache.
export const dynamic = "force-dynamic";

async function fetchPlansRobustly(): Promise<PlanRow[]> {
  // Pas de fallback silencieux et pas de cache figé : au cold start la base Neon
  // (autosuspend) peut mettre 5-15 s à se réveiller et chaque tentative échoue
  // vite (ECONNREFUSED / ETIMEDOUT). On étale les retries sur ~25 s avant de conclure.
  const delays = [0, 1000, 2500, 4500, 7000, 10000];
  for (let attempt = 0; attempt < delays.length; attempt++) {
    if (attempt > 0) await new Promise((r) => setTimeout(r, delays[attempt]));
    try {
      return await getPremiumPlans();
    } catch (err) {
      console.error(`[plans] tentative ${attempt + 1} échouée :`, err);
    }
  }
  return [];
}

export default async function Page() {
  const plans = await fetchPlansRobustly();
  const monthPlan = plans.find((p) => p.price_cents > 0 && p.interval === "month") ?? null;
  const quarterPlan =
    plans.find((p) => p.price_cents > 0 && p.interval === "quarter" && p.name.includes("Trimestriel")) ??
    plans.find((p) => p.price_cents > 0 && p.interval === "quarter") ??
    null;
  const quarterDisplay = quarterPlan ?? (monthPlan ? { ...monthPlan, id: 0, interval: "quarter" as const, price_cents: 0 } : null);
  const monthFeatures = monthPlan ? planFeatures(monthPlan) : [];
  const quarterFeatures = quarterPlan?.features
    ? planFeatures(quarterPlan)
    : monthFeatures.map((f) => (f.includes("Kora IA") ? "100 questions par trimestre à Kora IA" : f));

  return (
    <>
      <header className="fixed top-0 w-full bg-surface dark:bg-on-background border-b border-outline-variant dark:border-on-surface-variant flex items-center justify-between px-margin-mobile h-16 z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="transition-colors duration-200 active:scale-95 text-primary dark:text-primary-fixed">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Paiement Sécurisé</h1>
        </div>
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low">
          <span className="material-symbols-outlined text-outline">help_outline</span>
        </div>
      </header>
      <main role="main" className="bg-background text-on-background min-h-screen pb-24 pt-24 px-margin-mobile max-w-4xl mx-auto" style={{ minHeight: "max(884px, 100dvh)" }}>

<section className="text-center mb-10">
<h2 className="text-3xl font-bold text-primary mb-2">Passez au niveau supérieur</h2>
<p className="text-on-surface max-w-md mx-auto">Débloquez tout le potentiel de votre réussite scolaire avec nos outils d'apprentissage avancés.</p>
</section>

{isRentreePromoActive() && <div className="max-w-4xl mx-auto mb-8"><PromoRentreeBanner /></div>}

<div className="max-w-4xl mx-auto mb-8 bg-gradient-to-r from-tertiary-container/30 to-secondary-container/30 border border-tertiary/20 rounded-xl p-4 flex items-center gap-4">
  <div className="w-10 h-10 rounded-full bg-tertiary/20 flex items-center justify-center shrink-0">
    <span className="material-symbols-outlined text-tertiary">diversity_3</span>
  </div>
  <div>
    <p className="text-sm font-bold text-on-surface">Code de parrainage ? Profitez de <span className="text-primary">-20% sur votre 1er mois</span> !</p>
    <p className="text-xs text-on-surface-variant mt-0.5">Vous avez un code EDK-XXXXXX d&apos;un ami ? Il sera automatiquement appliqué lors du paiement.</p>
  </div>
  <Link href="/parrainage" className="shrink-0 text-xs font-bold text-primary hover:underline whitespace-nowrap">En savoir plus →</Link>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col transition-transform hover:scale-[1.02]">
<div className="mb-6">
<h3 className="text-xl font-bold text-on-surface mb-1">Découverte</h3>
<p className="text-sm text-on-surface">Idéal pour explorer nos ressources de base.</p>
</div>
<div className="mb-8">
<span className="text-4xl font-extrabold text-on-surface">Gratuit</span>
</div>
<ul className="space-y-4 mb-10 flex-grow">
<li className="flex items-center gap-3 text-on-surface">
<span className="material-symbols-outlined text-tertiary-container text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span>Accès limité aux cours</span>
</li>
<li className="flex items-center gap-3 text-on-surface">
<span className="material-symbols-outlined text-tertiary-container text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span>5 questions/mois au Tuteur AI</span>
</li>
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-xl">block</span>
<span className="line-through">Mode Hors-ligne</span>
</li>
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-xl">block</span>
<span className="line-through">Simulateur d'examen complet</span>
</li>
</ul>
<Link href="/accueil-edukora" className="block w-full py-3 px-4 rounded-lg border border-primary text-primary font-bold transition-all active:scale-95 hover:bg-primary-container hover:text-on-primary-container text-center">
                    Continuer en gratuit
                </Link>
</div>

<div className="relative bg-primary text-on-primary rounded-xl p-8 flex flex-col shadow-xl transition-transform hover:scale-[1.02] overflow-hidden">
{monthPlan ? (
<>
<div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Le plus populaire
                </div>
<div className="mb-6">
<h3 className="text-xl font-bold mb-1">Réussite</h3>
<p className="text-sm text-on-primary">L'expérience complète pour réussir votre examen.</p>
</div>

<ul className="space-y-4 mb-6 flex-grow">
{monthFeatures.map((f) => (
<li className="flex items-center gap-3" key={f}>
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">{f}</span>
</li>
))}
</ul>

<PlanSelector
  monthPlan={{ id: monthPlan.id, name: monthPlan.name, price_cents: monthPlan.price_cents }}
  quarterPlan={quarterDisplay?.id ? { id: quarterDisplay.id, name: quarterDisplay.name ?? "Réussite Trimestriel", price_cents: quarterDisplay.price_cents } : null}
/>
</>
) : (
<div className="flex flex-col items-center justify-center text-center py-16">
<span className="material-symbols-outlined text-5xl mb-4 opacity-90">hourglass_empty</span>
<h3 className="text-xl font-bold mb-2">Plans temporairement indisponibles</h3>
<p className="text-sm text-on-primary max-w-xs">Veuillez recharger la page dans quelques instants pour souscrire à Réussite.</p>
</div>
)}
</div>
</div>

<div className="mt-12 grid grid-cols-3 gap-4">
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">verified_user</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface">Sécurisé</span>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">menu_book</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface">Programme officiel</span>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">support_agent</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface">Support réactif</span>
</div>
</div>

<div className="mt-16 bg-surface-container-low rounded-xl p-6">
<h4 className="font-bold text-on-surface mb-4">Questions fréquentes</h4>
<div className="space-y-4">
<details className="group">
<summary className="list-none flex justify-between items-center cursor-pointer font-semibold text-sm text-on-surface">
                        Quels sont les moyens de paiement ?
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<p className="mt-2 text-sm text-on-surface">Nous acceptons Orange Money, MTN MoMo, Wave et les cartes bancaires locales pour une transaction fluide en Côte d'Ivoire.</p>
</details>
<div className="h-px bg-outline-variant"></div>
<details className="group">
<summary className="list-none flex justify-between items-center cursor-pointer font-semibold text-sm text-on-surface">
                        Comment fonctionne le tutorat IA ?
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<p className="mt-2 text-sm text-on-surface">Notre IA est entraînée spécifiquement sur le programme national ivoirien pour répondre à vos questions 24h/24 comme un vrai tuteur.</p>
</details>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 pb-safe bg-surface dark:bg-on-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<Link className="flex flex-col items-center justify-center text-on-surface dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="/accueil-edukora">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</Link>
<Link className="flex flex-col items-center justify-center text-on-surface dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="/fiches">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</Link>
<Link className="flex flex-col items-center justify-center text-on-surface dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="/tuteur-ia">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur AI</span>
</Link>
<Link className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90" href="/profil">
<span className="material-symbols-outlined fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</Link>
</nav>
    </>
  );
}
