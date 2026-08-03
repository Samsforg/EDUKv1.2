import type { Metadata } from "next";

export const metadata: Metadata = { title: "Abonnement - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-on-background border-b border-outline-variant dark:border-on-surface-variant flex items-center justify-between px-margin-mobile h-16 z-50">
<div className="flex items-center gap-4">
<button className="transition-colors duration-200 active:scale-95 text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Paiement Sécurisé</h1>
</div>
<div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low">
<span className="material-symbols-outlined text-outline">help_outline</span>
</div>
</header>
<main className="pt-24 px-margin-mobile max-w-4xl mx-auto">

<section className="text-center mb-10">
<h2 className="text-3xl font-bold text-primary mb-2">Passez au niveau supérieur</h2>
<p className="text-on-surface-variant max-w-md mx-auto">Débloquez tout le potentiel de votre réussite scolaire avec nos outils d'apprentissage avancés.</p>
</section>

<div className="flex justify-center mb-8">
<div className="bg-surface-container-high p-1 rounded-xl flex gap-1">
<button className="px-6 py-2 rounded-lg bg-surface-container-lowest text-primary font-semibold shadow-sm transition-all" id="toggle-monthly">Mensuel</button>
<button className="px-6 py-2 rounded-lg text-on-surface-variant font-semibold hover:bg-surface-container transition-all" id="toggle-trim">Trimestriel</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-8 flex flex-col transition-transform hover:scale-[1.02]">
<div className="mb-6">
<h3 className="text-xl font-bold text-on-surface mb-1">Pass Découverte</h3>
<p className="text-sm text-on-surface-variant">Idéal pour explorer nos ressources de base.</p>
</div>
<div className="mb-8">
<span className="text-4xl font-extrabold text-on-surface">Gratuit</span>
</div>
<ul className="space-y-4 mb-10 flex-grow">
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span>Accès limité aux cours</span>
</li>
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span>3 questions/jour au Tuteur AI</span>
</li>
<li className="flex items-center gap-3 text-outline opacity-50">
<span className="material-symbols-outlined text-xl">block</span>
<span className="line-through">Mode Hors-ligne</span>
</li>
<li className="flex items-center gap-3 text-outline opacity-50">
<span className="material-symbols-outlined text-xl">block</span>
<span className="line-through">Simulateur d'examen complet</span>
</li>
</ul>
<button className="w-full py-3 px-4 rounded-lg border border-primary text-primary font-bold transition-all active:scale-95 hover:bg-primary-container hover:text-on-primary-container">
                    Continuer en gratuit
                </button>
</div>

<div className="relative bg-primary text-on-primary rounded-xl p-8 flex flex-col shadow-xl transition-transform hover:scale-[1.02] overflow-hidden">

<div className="absolute top-4 right-4 bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                    Le plus populaire
                </div>
<div className="mb-6">
<h3 className="text-xl font-bold mb-1">Pass Premium</h3>
<p className="text-sm text-on-primary-container/80">L'expérience complète pour réussir votre examen.</p>
</div>
<div className="mb-8">
<div id="price-container">
<span className="text-4xl font-extrabold" id="price-value">1,000</span>
<span className="text-xl font-bold ml-1">FCFA</span>
<span className="text-sm font-normal opacity-80" id="price-period">/ mois</span>
</div>
<div className="hidden mt-1 text-xs font-bold text-secondary-fixed" id="savings-badge">Économisez 500 FCFA par trimestre</div>
</div>
<ul className="space-y-4 mb-10 flex-grow">
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">Tuteur IA illimité 24/7</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">Fiches certifiées par les profs</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">Simulateur d'examen illimité</span>
</li>
<li className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary-fixed text-xl fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-medium">Mode Hors-ligne complet</span>
</li>
</ul>
<button className="w-full py-4 px-4 rounded-lg bg-secondary-container text-on-secondary-container font-extrabold text-lg shadow-lg transition-all active:scale-95 hover:brightness-110">
                    S'abonner maintenant
                </button>
<p className="mt-4 text-[10px] text-center opacity-60">Sans engagement. Annulez à tout moment.</p>
</div>
</div>

<div className="mt-12 grid grid-cols-3 gap-4">
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">verified_user</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface-variant">Sécurisé</span>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">school</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface-variant">Certifié</span>
</div>
<div className="flex flex-col items-center text-center">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-full mb-2">
<span className="material-symbols-outlined text-primary">support_agent</span>
</div>
<span className="text-[10px] font-bold uppercase text-on-surface-variant">Support 24/7</span>
</div>
</div>

<div className="mt-16 bg-surface-container-low rounded-xl p-6">
<h4 className="font-bold text-on-surface mb-4">Questions fréquentes</h4>
<div className="space-y-4">
<details className="group">
<summary className="list-none flex justify-between items-center cursor-pointer font-semibold text-sm text-on-surface-variant">
                        Quels sont les moyens de paiement ?
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<p className="mt-2 text-sm text-on-surface-variant/80">Nous acceptons Orange Money, MTN MoMo, Wave et les cartes bancaires locales pour une transaction fluide en Côte d'Ivoire.</p>
</details>
<div className="h-px bg-outline-variant"></div>
<details className="group">
<summary className="list-none flex justify-between items-center cursor-pointer font-semibold text-sm text-on-surface-variant">
                        Comment fonctionne le tutorat IA ?
                        <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
</summary>
<p className="mt-2 text-sm text-on-surface-variant/80">Notre IA est entraînée spécifiquement sur le programme national ivoirien pour répondre à vos questions 24h/24 comme un vrai tuteur.</p>
</details>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-2 pb-safe bg-surface dark:bg-on-background shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90 hover:text-primary" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform duration-200 ease-in-out active:scale-90" href="#">
<span className="material-symbols-outlined fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        const btnMonthly = document.getElementById('toggle-monthly');
        const btnTrim = document.getElementById('toggle-trim');
        const priceVal = document.getElementById('price-value');
        const pricePeriod = document.getElementById('price-period');
        const savingsBadge = document.getElementById('savings-badge');

        btnMonthly.addEventListener('click', () =&gt; &#123;
            btnMonthly.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnTrim.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnTrim.classList.add('text-on-surface-variant');
            
            priceVal.innerText = '1,000';
            pricePeriod.innerText = '/ mois';
            savingsBadge.classList.add('hidden');
        &#125;);

        btnTrim.addEventListener('click', () =&gt; &#123;
            btnTrim.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnMonthly.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
            btnMonthly.classList.add('text-on-surface-variant');
            
            priceVal.innerText = '2,500';
            pricePeriod.innerText = '/ trimestre';
            savingsBadge.classList.remove('hidden');
        &#125;);
    </script>

    </div>
  );
}
