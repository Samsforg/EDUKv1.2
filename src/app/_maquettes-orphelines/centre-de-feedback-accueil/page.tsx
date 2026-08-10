import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Feedback & Amélioration" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface pb-24" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container flex items-center justify-between px-4 h-16 w-full shadow-md">
<div className="flex items-center gap-3">
<button className="text-on-primary dark:text-on-primary-container material-symbols-outlined active:scale-95 transition-transform p-2 rounded-full hover:bg-primary-container/20">arrow_back</button>
<div className="flex items-center gap-2">
<img alt="Edukora Logo" className="h-8 w-8 rounded-lg" src="/images/ecran-044.png" />
<h1 className="font-headline font-bold text-on-primary text-headline-md leading-tight">Support Edukora</h1>
</div>
</div>
<div className="flex items-center gap-2">
<button className="text-on-primary dark:text-on-primary-container material-symbols-outlined active:scale-95 transition-transform p-2 rounded-full hover:bg-primary-container/20">account_circle</button>
</div>
</header>
<main className="mt-20 px-4 md:px-8 max-w-5xl mx-auto space-y-8">

<section className="space-y-4">
<div className="space-y-1">
<h2 className="font-headline text-3xl font-extrabold text-primary">Feedback &amp; Amélioration</h2>
<p className="text-on-surface-variant text-body-md">Aidez-nous à construire le futur de l'éducation en Côte d'Ivoire.</p>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col items-center text-center">
<span className="text-primary font-headline text-2xl font-bold">1,2k+</span>
<span className="text-label-xs text-on-surface-variant uppercase tracking-wider">Idées Proposées</span>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col items-center text-center">
<span className="text-secondary font-headline text-2xl font-bold">450</span>
<span className="text-label-xs text-on-surface-variant uppercase tracking-wider">Bugs Résolus</span>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col items-center text-center">
<span className="text-tertiary font-headline text-2xl font-bold">98%</span>
<span className="text-label-xs text-on-surface-variant uppercase tracking-wider">Satisfaction</span>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col items-center text-center">
<span className="text-primary-container font-headline text-2xl font-bold">24h</span>
<span className="text-label-xs text-on-surface-variant uppercase tracking-wider">Temps de Réponse</span>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-xl font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-primary">bolt</span> Actions Principales
            </h3>
<div className="bento-grid">

<button className="col-span-1 md:col-span-1 bg-error-container text-on-error-container p-6 rounded-xl flex flex-col justify-between items-start text-left hover:scale-[1.02] active:scale-95 transition-all shadow-sm border border-error/10">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>bug_report</span>
<div className="mt-4">
<span className="font-headline font-bold text-lg block">Signaler un Bug</span>
<span className="text-label-sm opacity-80">Signalez un dysfonctionnement technique</span>
</div>
</button>

<button className="col-span-1 md:col-span-2 bg-primary text-on-primary p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center text-left hover:scale-[1.02] active:scale-95 transition-all shadow-md relative overflow-hidden">
<div className="relative z-10">
<span className="material-symbols-outlined text-4xl mb-4 block" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
<span className="font-headline font-bold text-2xl block">Proposer une Idée</span>
<p className="text-label-sm opacity-90 max-w-xs mt-2 text-primary-fixed">Vous avez une suggestion pour améliorer votre apprentissage ? Partagez-la avec nous !</p>
</div>
<span className="material-symbols-outlined text-9xl absolute -right-8 -bottom-8 opacity-10 pointer-events-none">auto_awesome</span>
</button>

<button className="col-span-2 md:col-span-3 bg-secondary-container text-on-secondary-container p-6 rounded-xl flex items-center justify-between text-left hover:scale-[1.01] active:scale-95 transition-all shadow-sm">
<div className="flex gap-4 items-center">
<div className="bg-on-secondary-container/20 p-3 rounded-lg">
<span className="material-symbols-outlined text-3xl">star_rate</span>
</div>
<div>
<span className="font-headline font-bold text-lg block">Laisser un Avis</span>
<span className="text-label-sm opacity-80">Dites-nous ce que vous pensez de l'expérience Edukora</span>
</div>
</div>
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</section>

<section className="space-y-4 mb-8">
<div className="flex items-center justify-between">
<h3 className="font-headline text-xl font-bold text-on-surface">Mes Contributions Récentes</h3>
<button className="text-primary text-label-sm font-semibold hover:underline">Voir tout</button>
</div>
<div className="space-y-3">

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary">bug_report</span>
</div>
<div>
<p className="font-headline font-semibold text-on-surface">Problème d'affichage BEPC Math</p>
<p className="text-label-xs text-on-surface-variant">Posté le 12 Oct. 2023</p>
</div>
</div>
<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-tighter">In analysis</span>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary">lightbulb</span>
</div>
<div>
<p className="font-headline font-semibold text-on-surface">Mode sombre automatique</p>
<p className="text-label-xs text-on-surface-variant">Posté le 05 Oct. 2023</p>
</div>
</div>
<span className="bg-tertiary-fixed text-on-tertiary-fixed-variant px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-tighter">Resolved</span>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">forum</span>
</div>
<div>
<p className="font-headline font-semibold text-on-surface">Suggestion Quiz Interactif</p>
<p className="text-label-xs text-on-surface-variant">Posté le 28 Sept. 2023</p>
</div>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed-variant px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-tighter">Under review</span>
</div>
</div>
</section>

<section className="bg-tertiary-container text-on-tertiary-container p-6 rounded-2xl relative overflow-hidden">
<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h4 className="font-headline font-bold text-xl">Devenez Beta-Testeur</h4>
<p className="text-body-md opacity-90 max-w-md">Testez les nouvelles fonctionnalités avant tout le monde et donnez votre avis en direct à nos équipes.</p>
</div>
<button className="bg-tertiary text-on-tertiary px-6 py-3 rounded-xl font-bold hover:bg-tertiary/90 transition-colors">S'inscrire au programme</button>
</div>
<div className="absolute right-0 top-0 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-9xl">psychology</span>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-md flex justify-around items-center h-20 px-2 pb-2 w-full">
<button className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-200 hover:bg-surface-container-high p-2 rounded-xl">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-200 hover:bg-surface-container-high p-2 rounded-xl">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-200 hover:bg-surface-container-high p-2 rounded-xl">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">Tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200 shadow-lg">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs">Profil</span>
</button>
</nav>
<script>
        // Simple micro-interaction for cards
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                button.classList.add('scale-95');
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
