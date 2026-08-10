import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Rapport de Performance Orale" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-24" >

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 w-full bg-primary dark:bg-primary-container shadow-md">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary" data-icon="menu">menu</span>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-headline-md">Edukora</h1>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20">
<img alt="Profile Avatar" className="w-full h-full object-cover" src="/images/ecran-017.png" />
</div>
</header>
<main className="pt-20 px-4 md:px-8 max-w-4xl mx-auto space-y-6">

<section className="flex flex-col items-center justify-center py-8 bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30">
<h2 className="text-on-surface-variant font-label text-label-sm mb-6">RÉSULTAT DE LA SESSION ORALE</h2>
<div className="relative w-48 h-48 flex items-center justify-center">

<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="90" stroke="currentColor" strokeWidth="12" />
<circle className="text-secondary-container animate-progress" cx="96" cy="96" fill="transparent" r="90" stroke="currentColor" strokeDasharray="565.48" strokeDashoffset="565.48" strokeWidth="12" style={{"strokeLinecap":"round","strokeDashoffset":"113.1"}} />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-display-lg font-bold text-primary">16/20</span>
<span className="text-label-xs font-semibold text-tertiary">TRÈS BIEN</span>
</div>
</div>
<p className="mt-6 text-center px-6 text-body-md text-on-surface-variant max-w-md">
                Félicitations ! Votre expression orale s'améliore. Vous avez montré une belle assurance sur le thème de l'environnement.
            </p>
</section>

<section className="space-y-4">
<h3 className="font-headline font-semibold text-headline-md text-primary px-2">Analyse Détaillée</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/20 shadow-sm">
<div className="flex justify-between items-end mb-2">
<span className="font-label text-label-sm font-bold text-on-surface">Fluidité</span>
<span className="text-primary font-bold">85%</span>
</div>
<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container" style={{"width":"85%"}}></div>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/20 shadow-sm">
<div className="flex justify-between items-end mb-2">
<span className="font-label text-label-sm font-bold text-on-surface">Vocabulaire</span>
<span className="text-secondary font-bold">70%</span>
</div>
<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary-container" style={{"width":"70%"}}></div>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/20 shadow-sm">
<div className="flex justify-between items-end mb-2">
<span className="font-label text-label-sm font-bold text-on-surface">Grammaire</span>
<span className="text-tertiary font-bold">75%</span>
</div>
<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container" style={{"width":"75%"}}></div>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="bg-tertiary/5 border-l-4 border-tertiary p-6 rounded-r-xl shadow-sm">
<div className="flex items-center gap-2 mb-4 text-tertiary">
<span className="material-symbols-outlined" data-icon="thumb_up" style={{"fontVariationSettings":"'FILL' 1"}}>thumb_up</span>
<h4 className="font-headline font-bold">Points forts</h4>
</div>
<ul className="space-y-3 text-body-md text-on-surface-variant">
<li className="flex gap-2">
<span className="text-tertiary">•</span>
                        Prononciation claire et articulation soignée des sons complexes.
                    </li>
<li className="flex gap-2">
<span className="text-tertiary">•</span>
                        Utilisation pertinente des connecteurs logiques (donc, cependant).
                    </li>
</ul>
</div>

<div className="bg-secondary/5 border-l-4 border-secondary p-6 rounded-r-xl shadow-sm">
<div className="flex items-center gap-2 mb-4 text-secondary">
<span className="material-symbols-outlined" data-icon="lightbulb" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
<h4 className="font-headline font-bold">À améliorer</h4>
</div>
<ul className="space-y-3 text-body-md text-on-surface-variant">
<li className="flex gap-2">
<span className="text-secondary">•</span>
                        Attention à la concordance des temps au passé composé.
                    </li>
<li className="flex gap-2">
<span className="text-secondary">•</span>
                        Essayez de varier les adjectifs pour éviter les répétitions.
                    </li>
</ul>
</div>
</div>

<section className="bg-primary p-6 rounded-xl text-on-primary flex items-start gap-4 shadow-lg">
<div className="w-12 h-12 flex-shrink-0 bg-on-primary rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-3xl" data-icon="smart_toy">smart_toy</span>
</div>
<div>
<h4 className="font-headline font-bold text-lg mb-1">Le conseil de Kora</h4>
<p className="text-body-md text-primary-fixed leading-relaxed">
                    "Tu as fait un excellent travail sur l'intonation ! Pour ta prochaine session, essaie de préparer 3 synonymes pour les mots que tu utilises le plus souvent. Cela boostera ton score de richesse lexicale."
                </p>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
<button className="flex items-center justify-center gap-2 h-14 bg-surface-container-highest text-primary font-bold rounded-xl active:scale-95 transition-all hover:bg-surface-container-high">
<span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
                Réécouter l'analyse
            </button>
<button className="flex items-center justify-center gap-2 h-14 bg-secondary-container text-on-secondary-container font-bold rounded-xl shadow-md active:scale-95 transition-all hover:brightness-105">
<span className="material-symbols-outlined" data-icon="refresh">refresh</span>
                Nouvel essai
            </button>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl flex justify-around items-center h-20 px-2 pb-2 w-full bg-surface dark:bg-inverse-surface border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-3 py-1 transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="mic" style={{"fontVariationSettings":"'FILL' 1"}}>mic</span>
<span className="font-label text-label-xs font-medium">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for feedback sections
        document.querySelectorAll('.bg-tertiary\\/5, .bg-secondary\\/5').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.2s ease-out';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
