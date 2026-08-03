import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Statistiques Globales" };

export default function Page() {
  return (
    <div className="text-on-surface antialiased pb-24 md:pb-8" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 py-3 bg-primary dark:bg-primary-fixed-dim shadow-sm">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="h-8 w-8 object-contain rounded-sm" src="/images/ecran-335.png" />
<h1 className="font-headline text-headline-md font-bold text-on-primary dark:text-on-primary-fixed">Edukora Admin</h1>
</div>
<div className="hidden md:flex gap-6 items-center">
<nav className="flex gap-4">
<a className="text-on-primary-container opacity-80 hover:bg-primary-container transition-colors px-3 py-1 rounded-lg" href="#">Aperçu</a>
<a className="text-on-primary-container opacity-80 hover:bg-primary-container transition-colors px-3 py-1 rounded-lg" href="#">Utilisateurs</a>
<a className="text-on-primary-container opacity-80 hover:bg-primary-container transition-colors px-3 py-1 rounded-lg" href="#">Cours</a>
<a className="text-on-primary font-bold hover:bg-primary-container transition-colors px-3 py-1 rounded-lg" href="#">Analyses</a>
</nav>
<div className="h-8 w-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs cursor-pointer active:scale-95 transition-transform">
                AP
            </div>
</div>
<div className="md:hidden flex items-center gap-2">
<span className="material-symbols-outlined text-on-primary">search</span>
<span className="material-symbols-outlined text-on-primary">notifications</span>
</div>
</header>

<main className="mt-20 px-4 md:px-8 max-w-7xl mx-auto pb-12">

<section className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<h2 className="text-display-lg-mobile md:text-display-lg font-bold text-primary">Statistiques Globales</h2>
<p className="text-on-surface-variant body-md">Tableau de bord pour la performance académique et la croissance de la plateforme.</p>
</div>
<div className="flex bg-surface-container p-1 rounded-xl w-fit">
<button className="px-4 py-2 text-label-sm font-semibold rounded-lg tab-active transition-all duration-200">Derniers 30 Jours</button>
<button className="px-4 py-2 text-label-sm font-semibold rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200">Dernier Trimestre</button>
<button className="px-4 py-2 text-label-sm font-semibold rounded-lg text-on-surface-variant hover:bg-surface-container-high transition-all duration-200">Année</button>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between overflow-hidden relative">
<div>
<span className="text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">TOTAL UTILISATEURS</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="text-3xl font-bold text-on-surface">124 850</span>
<span className="text-tertiary text-label-xs font-bold flex items-center">
<span className="material-symbols-outlined text-sm">trending_up</span> +15.4%
                        </span>
</div>
</div>
<div className="mt-4 chart-container flex items-end gap-1 h-12">
<div className="bg-primary-fixed-dim w-full h-[40%] rounded-t-sm"></div>
<div className="bg-primary-fixed-dim w-full h-[55%] rounded-t-sm"></div>
<div className="bg-primary-fixed-dim w-full h-[45%] rounded-t-sm"></div>
<div className="bg-primary-fixed-dim w-full h-[70%] rounded-t-sm"></div>
<div className="bg-primary-fixed-dim w-full h-[60%] rounded-t-sm"></div>
<div className="bg-primary-fixed-dim w-full h-[85%] rounded-t-sm"></div>
<div className="bg-primary w-full h-[100%] rounded-t-sm"></div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<span className="text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">ABONNEMENTS ACTIFS</span>
<div className="mt-3 flex items-center justify-between">
<div className="flex flex-col">
<span className="text-2xl font-bold text-on-surface">42 300</span>
<span className="text-label-xs text-on-surface-variant">Membres Premium</span>
</div>
<div className="relative h-16 w-16">
<svg className="h-full w-full" viewBox="0 0 36 36">
<circle className="stroke-surface-container-highest" cx="18" cy="18" fill="none" r="16" strokeWidth="4" />
<circle className="stroke-secondary" cx="18" cy="18" fill="none" r="16" strokeDasharray="75, 100" strokeLinecap="round" strokeWidth="4" />
</svg>
<span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">75%</span>
</div>
</div>
<div className="mt-6 space-y-2">
<div className="flex justify-between text-label-xs">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> Premium</span>
<span className="font-bold">42.3k</span>
</div>
<div className="flex justify-between text-label-xs">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-outline-variant"></span> Gratuit</span>
<span className="font-bold">14.1k</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between">
<div>
<span className="text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">REVENU TOTAL</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="text-3xl font-bold text-on-surface">18 450 200 <small className="text-sm font-medium">FCFA</small></span>
</div>
</div>
<div className="mt-4">
<div className="flex justify-between items-end mb-1">
<span className="text-label-xs text-on-surface-variant">Objectif Mensuel (25M)</span>
<span className="text-label-xs font-bold text-primary">73.8%</span>
</div>
<div className="w-full bg-surface-container-highest rounded-full h-3">
<div className="bg-secondary h-3 rounded-full" style={{"width":"73.8%"}}></div>
</div>
</div>
<div className="mt-4 flex items-center gap-2 text-label-xs text-tertiary bg-tertiary-fixed bg-opacity-30 p-2 rounded-lg">
<span className="material-symbols-outlined text-sm">auto_graph</span>
<span>Projection de dépassement de l'objectif de 12%</span>
</div>
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<div className="flex justify-between items-center mb-6">
<h3 className="text-headline-md font-bold text-primary">Acquisition d'Utilisateurs</h3>
<span className="material-symbols-outlined text-outline cursor-pointer">more_vert</span>
</div>
<div className="h-64 flex items-end gap-2 border-b border-l border-outline-variant pb-2 pl-2 relative">

<svg className="absolute inset-0 w-full h-full px-8 pb-4" preserveAspectRatio="none">
<path d="M0,80 Q50,60 100,100 T200,40 T300,90 T400,20 T500,50" fill="none" stroke="#0047ab" strokeWidth="3" />
<path d="M0,120 Q50,110 100,130 T200,100 T300,110 T400,95 T500,115" fill="none" stroke="#954a00" strokeDasharray="4" strokeWidth="2" />
</svg>
<div className="w-full flex justify-between px-8 absolute bottom-0 translate-y-6 text-label-xs text-on-surface-variant">
<span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span>
</div>
</div>
<div className="mt-10 flex gap-4">
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full bg-primary-container"></div>
<span className="text-label-xs">Étudiants</span>
</div>
<div className="flex items-center gap-2">
<div className="w-3 h-3 rounded-full border border-secondary border-dashed"></div>
<span className="text-label-xs">Experts</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<div className="flex justify-between items-center mb-6">
<h3 className="text-headline-md font-bold text-primary">Impact du Contenu</h3>
<div className="flex gap-2">
<button className="text-label-xs font-bold border border-outline-variant px-3 py-1 rounded-lg">Fiches</button>
<button className="text-label-xs font-bold bg-surface-container px-3 py-1 rounded-lg">Séries</button>
</div>
</div>
<div className="space-y-5">
<div className="space-y-1">
<div className="flex justify-between text-label-sm">
<span className="font-medium">Série D : Mathématiques (Terminale)</span>
<span className="font-bold">92%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full">
<div className="bg-tertiary h-2 rounded-full" style={{"width":"92%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between text-label-sm">
<span className="font-medium">Série C : Physique-Chimie</span>
<span className="font-bold">78%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full">
<div className="bg-tertiary h-2 rounded-full" style={{"width":"78%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between text-label-sm">
<span className="font-medium">Série A1 : Philosophie</span>
<span className="font-bold">65%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full">
<div className="bg-tertiary h-2 rounded-full" style={{"width":"65%"}}></div>
</div>
</div>
</div>
<div className="mt-8 pt-6 border-t border-outline-variant">
<span className="text-label-xs font-bold text-on-surface-variant uppercase block mb-3">TOP 5 FICHES D'ÉTUDE</span>
<ul className="space-y-3">
<li className="flex items-center gap-3">
<span className="w-6 h-6 rounded bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">01</span>
<span className="text-body-md flex-1">Nombres Complexes - Résumé</span>
<span className="text-label-xs text-on-surface-variant">12.4k vues</span>
</li>
<li className="flex items-center gap-3">
<span className="w-6 h-6 rounded bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">02</span>
<span className="text-body-md flex-1">Probabilités (Cours &amp; Exercices)</span>
<span className="text-label-xs text-on-surface-variant">9.8k vues</span>
</li>
</ul>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<h3 className="text-headline-md font-bold text-primary mb-6">Santé Financière</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
<div>
<span className="text-label-xs font-bold text-on-surface-variant uppercase block mb-4">SOURCES DE REVENUS</span>
<div className="space-y-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">subscriptions</span>
</div>
<div className="flex-1">
<p className="text-label-sm font-bold">Packs Mensuels</p>
<p className="text-label-xs text-on-surface-variant">65% du revenu total</p>
</div>
<p className="text-label-sm font-bold">12.1M</p>
</div>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined">shopping_bag</span>
</div>
<div className="flex-1">
<p className="text-label-sm font-bold">Exercices Individuels</p>
<p className="text-label-xs text-on-surface-variant">22% du revenu total</p>
</div>
<p className="text-label-sm font-bold">4.2M</p>
</div>
</div>
</div>
<div className="bg-surface-container rounded-xl p-6 flex flex-col items-center justify-center text-center">
<span className="text-label-xs font-bold text-on-surface-variant uppercase mb-4">TAUX DE RÉTENTION UTILISATEURS</span>
<div className="text-4xl font-extrabold text-secondary mb-2">84.2%</div>
<p className="text-label-xs text-on-surface-variant px-4">Grande satisfaction due à l'intégration du Tuteur IA à la fin du T3.</p>
<button className="mt-4 text-primary text-label-sm font-bold flex items-center gap-1">Voir les Cohortes <span className="material-symbols-outlined text-sm">arrow_forward</span></button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<h3 className="text-headline-md font-bold text-primary mb-6">Engagement</h3>
<div className="space-y-8">
<div className="text-center">
<div className="text-label-xs font-bold text-on-surface-variant uppercase mb-2">TEMPS D'ÉTUDE QUOTIDIEN MOYEN</div>
<div className="flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-primary">timer</span>
<span className="text-3xl font-bold">54m <small className="text-sm font-medium">/ utilisateur</small></span>
</div>
</div>
<div className="pt-6 border-t border-outline-variant">
<div className="text-label-xs font-bold text-on-surface-variant uppercase mb-4">INTERACTION TUTEUR IA</div>
<div className="flex items-center justify-between">
<div className="flex flex-col">
<span className="text-xl font-bold">8.4x</span>
<span className="text-label-xs text-on-surface-variant">Sessions par utilisateur</span>
</div>
<div className="h-10 w-24 bg-tertiary-fixed rounded-lg flex items-center justify-center overflow-hidden">
<svg className="w-full h-full" viewBox="0 0 100 40">
<path d="M0,35 L10,30 L20,32 L30,20 L40,25 L50,15 L60,18 L70,5 L80,10 L90,2 L100,8" fill="none" stroke="#003f23" strokeWidth="2" />
</svg>
</div>
</div>
</div>
<div className="bg-primary bg-opacity-5 p-4 rounded-xl">
<p className="text-label-xs font-medium italic text-primary-container">"Les étudiants interagissant avec le Tuteur IA au moins 5 fois par semaine affichent des taux de complétion 30 % plus élevés."</p>
</div>
</div>
</div>
</section>
</main>

<footer className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 pb-safe bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-3 py-1.5 active:scale-90 transition-all duration-150 cursor-pointer">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs font-semibold">Aperçu</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-3 py-1.5 active:scale-90 transition-all duration-150 cursor-pointer">
<span className="material-symbols-outlined">group</span>
<span className="font-label text-label-xs font-semibold">Utilisateurs</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-3 py-1.5 active:scale-90 transition-all duration-150 cursor-pointer">
<span className="material-symbols-outlined">book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed rounded-xl px-3 py-1.5 active:scale-90 transition-all duration-150 cursor-pointer">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<span className="font-label text-label-xs font-semibold">Analyses</span>
</div>
</footer>

<button className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-secondary rounded-full text-on-secondary shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 z-40">
<span className="material-symbols-outlined">picture_as_pdf</span>
</button>
<script>
        // Simple micro-interaction for tabs
        const tabs = document.querySelectorAll('button[class*="px-4 py-2"]');
        tabs.forEach(tab =&gt; &#123;
            tab.addEventListener('click', () =&gt; &#123;
                tabs.forEach(t =&gt; t.classList.remove('tab-active', 'text-on-surface-variant'));
                tabs.forEach(t =&gt; t.classList.add('text-on-surface-variant'));
                tab.classList.add('tab-active');
                tab.classList.remove('text-on-surface-variant');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
