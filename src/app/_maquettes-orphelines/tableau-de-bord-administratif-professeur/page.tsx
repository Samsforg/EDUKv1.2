import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Tableau de bord" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="fixed left-0 top-0 h-full w-[280px] bg-surface border-r border-surface-border flex flex-col py-stack-md gap-base z-40 hidden md:flex">
<div className="px-6 mb-8 flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-3xl">school</span>
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
</div>
<div className="px-6 mb-10 flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-fixed-dim">
<img className="w-full h-full object-cover" src="/images/ecran-347.png" alt="A professional headshot of a distinguished male university professor in his late 50s, wearing glasses and a charcoal blazer. He is positioned against a soft-focus background of a classic academic library. The lighting is bright and natural, reflecting a clean light-mode aesthetic with high clarity and professional trust." />
</div>
<div>
<p className="font-title-md text-title-md text-on-surface leading-tight">Dr. Elena Vance</p>
<p className="font-label-md text-label-md text-on-surface-variant">Senior Faculty</p>
<span className="expert-status-badge">Statut d'expert</span>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-4 px-6 py-3 text-primary font-bold border-r-4 border-primary bg-primary-fixed-dim/10 transition-all duration-200" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-secondary-container hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-md text-body-md">Validation Lab</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-secondary-container hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined">insights</span>
<span className="font-body-md text-body-md">Impact Analytics</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-secondary-container hover:bg-surface-container-high transition-all duration-200" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
</nav>
<div className="px-6 mt-auto">
<div className="p-4 bg-surface-container rounded-xl border border-surface-border">
<p className="font-label-md text-label-md text-on-surface-variant mb-2 uppercase">Session en cours</p>
<div className="flex items-center gap-2 text-impact-emerald">
<span className="w-2 h-2 rounded-full bg-impact-emerald animate-pulse"></span>
<span className="font-body-md text-body-md font-bold">Surveillance en direct</span>
</div>
</div>
</div>
</aside>

<main className="md:ml-[280px] min-h-screen pb-20 md:pb-10">

<header className="hidden md:flex justify-between items-center px-container-padding-desktop w-full h-16 bg-surface border-b border-surface-border sticky top-0 z-30">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Tableau de bord</h1>
<div className="flex items-center gap-6">
<div className="flex items-center bg-surface-container-low px-4 py-2 rounded-lg border border-surface-border">
<span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-md w-48" placeholder="Rechercher une fiche..." type="text" />
</div>
<div className="relative">
<span className="material-symbols-outlined text-on-surface-variant cursor-pointer">notifications</span>
<span className="absolute -top-1 -right-1 w-4 h-4 bg-error text-white text-[10px] flex items-center justify-center rounded-full">3</span>
</div>
<div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">EV</div>
</div>
</header>

<div className="p-container-padding-mobile md:p-container-padding-desktop">

<section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-10">

<div className="metric-card p-6 rounded-xl relative overflow-hidden group">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-validation-amber/10 rounded-lg">
<span className="material-symbols-outlined text-validation-amber">pending_actions</span>
</div>
<span className="text-on-surface-variant font-label-md">+4 today</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Fiches en attente</p>
<h2 className="font-metric-num text-metric-num text-on-surface mt-1">42</h2>
<div className="mt-4 pt-4 border-t border-surface-border flex items-center justify-between">
<span className="text-body-md text-primary font-bold cursor-pointer group-hover:underline">Voir la file d'attente</span>
<span className="material-symbols-outlined text-primary text-sm">arrow_forward</span>
</div>
</div>

<div className="metric-card p-6 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-primary-fixed-dim/20 rounded-lg">
<span className="material-symbols-outlined text-primary">verified</span>
</div>
<span className="text-impact-emerald font-label-md text-xs flex items-center">
<span className="material-symbols-outlined text-xs mr-1">trending_up</span> 12%
                        </span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Validations</p>
<h2 className="font-metric-num text-metric-num text-on-surface mt-1">1,284</h2>
<div className="absolute bottom-6 right-6">
<svg className="sparkline" viewBox="0 0 80 30">
<path d="M0 25 L10 20 L20 22 L30 15 L40 18 L50 10 L60 12 L70 5 L80 8" />
</svg>
</div>
</div>

<div className="metric-card p-6 rounded-xl relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="p-2 bg-expert-purple/10 rounded-lg">
<span className="material-symbols-outlined text-expert-purple">auto_graph</span>
</div>
<span className="expert-status-badge">Rang Élite</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Score d'impact</p>
<h2 className="font-metric-num text-metric-num text-on-surface mt-1">98.2</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-2">Top 1% des contributeurs</p>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-8 space-y-gutter">
<div className="bg-white border border-surface-border rounded-xl shadow-sm overflow-hidden">
<div className="px-6 py-4 border-b border-surface-border flex justify-between items-center bg-surface-container-low">
<h3 className="font-title-md text-title-md text-on-surface">Demandes prioritaires</h3>
<div className="flex gap-2">
<button className="px-3 py-1 bg-white border border-outline-variant text-label-md rounded hover:bg-surface-container-high">Filtres</button>
<button className="px-3 py-1 bg-white border border-outline-variant text-label-md rounded hover:bg-surface-container-high">Tout voir</button>
</div>
</div>
<div className="divide-y divide-surface-border">

<div className="validation-row p-6 flex items-center gap-6">
<div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-primary">functions</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<p className="font-title-md text-title-md text-on-surface">Calcul intégral : Méthode de substitution</p>
<span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded uppercase">Haute Priorité</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Mathématiques • Soumis par Marc Durand • Il y a 2h</p>
</div>
<div className="flex items-center gap-3">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/5 rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="px-4 py-2 bg-primary-container text-white font-bold text-body-md rounded hover:bg-primary transition-colors">
                                        Valider
                                    </button>
</div>
</div>

<div className="validation-row p-6 flex items-center gap-6">
<div className="w-12 h-12 bg-expert-purple/10 flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-expert-purple">bolt</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<p className="font-title-md text-title-md text-on-surface">Thermodynamique : Deuxième principe</p>
<span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase">Standard</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Physique • Soumis par Sophie Morel • Il y a 5h</p>
</div>
<div className="flex items-center gap-3">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/5 rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="px-4 py-2 bg-primary-container text-white font-bold text-body-md rounded hover:bg-primary transition-colors">
                                        Valider
                                    </button>
</div>
</div>

<div className="validation-row p-6 flex items-center gap-6">
<div className="w-12 h-12 bg-primary-container/10 flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-primary">calculate</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<p className="font-title-md text-title-md text-on-surface">Algèbre linéaire : Espaces vectoriels</p>
<span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded uppercase">Urgent</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Mathématiques • Soumis par Jean-Luc P. • Il y a 10m</p>
</div>
<div className="flex items-center gap-3">
<button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary-container/5 rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="px-4 py-2 bg-primary-container text-white font-bold text-body-md rounded hover:bg-primary transition-colors">
                                        Valider
                                    </button>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-gutter">

<div className="bg-primary text-white p-6 rounded-xl shadow-lg relative overflow-hidden">
<div className="relative z-10">
<h4 className="font-headline-md text-headline-md mb-2">Prêt à corriger ?</h4>
<p className="font-body-md text-body-md opacity-90 mb-6">Vous avez 42 fiches en attente de votre expertise académique.</p>
<button className="w-full py-4 bg-white text-primary font-bold rounded-lg shadow-sm hover:bg-surface-bright transition-all active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">play_arrow</span>
                                Commencer les validations
                            </button>
</div>
<div className="absolute -right-8 -bottom-8 opacity-10">
<span className="material-symbols-outlined text-[180px]">history_edu</span>
</div>
</div>

<div className="bg-white border border-surface-border p-6 rounded-xl">
<h4 className="font-title-md text-title-md mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">bar_chart</span>
                            Objectif hebdomadaire
                        </h4>
<div className="space-y-6">
<div>
<div className="flex justify-between mb-2">
<span className="font-label-md text-label-md text-on-surface-variant">Validations</span>
<span className="font-label-md text-label-md font-bold">128/150</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"85%"}}></div>
</div>
</div>
<div>
<div className="flex justify-between mb-2">
<span className="font-label-md text-label-md text-on-surface-variant">Précision de l'IA</span>
<span className="font-label-md text-label-md font-bold">94%</span>
</div>
<div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
<div className="bg-impact-emerald h-full rounded-full" style={{"width":"94%"}}></div>
</div>
</div>
</div>
<div className="mt-6 p-4 bg-surface-container-low rounded-lg border border-dashed border-outline-variant">
<p className="font-body-md text-body-md text-on-surface-variant text-center">
                                Continuez ainsi ! Vous êtes à <span className="font-bold text-primary">22 fiches</span> du bonus hebdomadaire.
                            </p>
</div>
</div>

<div className="bg-white border border-surface-border p-6 rounded-xl">
<h4 className="font-title-md text-title-md mb-4">Retours récents</h4>
<div className="space-y-4">
<div className="flex gap-3">
<div className="w-10 h-10 rounded bg-surface-container-high flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-sm">person</span>
</div>
<div>
<p className="font-body-md text-body-md italic text-on-surface-variant">"Explication très claire sur les intégrales complexes, merci Professeur !"</p>
<p className="font-label-md text-label-md text-primary mt-1">— Étudiant M2, Maths</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 pb-safe bg-surface border-t border-surface-border shadow-sm z-50 md:hidden">
<a className="flex flex-col items-center justify-center text-primary font-bold scale-95 transition-transform active:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant transition-transform active:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">approval</span>
<span className="font-label-md text-label-md">Vérifier</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant transition-transform active:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">monitoring</span>
<span className="font-label-md text-label-md">Metrics</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant transition-transform active:bg-surface-container-high" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>

<script>
        document.querySelectorAll('.validation-row').forEach(row =&gt; &#123;
            row.addEventListener('mouseenter', () =&gt; &#123;
                row.querySelector('button.bg-primary-container').classList.add('scale-105');
            &#125;);
            row.addEventListener('mouseleave', () =&gt; &#123;
                row.querySelector('button.bg-primary-container').classList.remove('scale-105');
            &#125;);
        &#125;);

        // Simple alert for quick actions
        document.querySelector('button.bg-white.text-primary').addEventListener('click', () =&gt; &#123;
            const btn = document.querySelector('button.bg-white.text-primary');
            btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Chargement...';
            setTimeout(() =&gt; &#123;
                btn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;play_arrow&lt;/span&gt; Commencer les validations';
                alert('Session de validation initialisée. Chargement de la première fiche...');
            &#125;, 1000);
        &#125;);
    </script>

    </div>
  );
}
