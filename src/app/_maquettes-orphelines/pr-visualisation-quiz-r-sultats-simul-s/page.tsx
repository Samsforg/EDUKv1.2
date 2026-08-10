import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Résultats du Test" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container font-headline text-headline-md font-semibold docked full-width top-0 border-b border-outline-variant shadow-md flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
<span className="text-xl font-headline font-bold">Prévisualisation Quiz</span>
</div>
<button className="bg-secondary-container text-on-secondary-container px-4 py-1.5 rounded-xl font-label text-label-sm active:scale-95 duration-200 transition-all hover:bg-secondary transition-colors">
            Quitter le test
        </button>
</header>
<main className="max-w-5xl mx-auto px-4 py-8">

<div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">

<div className="md:col-span-5 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant shadow-sm flex flex-col items-center justify-center text-center">
<h2 className="text-on-surface-variant font-label text-label-sm uppercase tracking-widest mb-6">Résultat Global</h2>
<div className="relative w-40 h-40 flex items-center justify-center rounded-full score-circle">
<div className="absolute inset-2 bg-surface-container-lowest rounded-full flex flex-col items-center justify-center">
<span className="text-display-lg text-primary font-bold">18/20</span>
<span className="text-tertiary font-semibold text-label-sm">Excellent !</span>
</div>
</div>
<div className="mt-8 grid grid-cols-2 gap-4 w-full">
<div className="bg-surface-container-low p-3 rounded-lg">
<p className="text-outline text-label-xs mb-1">Précision</p>
<p className="text-on-surface font-bold">90%</p>
</div>
<div className="bg-surface-container-low p-3 rounded-lg">
<p className="text-outline text-label-xs mb-1">Temps</p>
<p className="text-on-surface font-bold">12:45</p>
</div>
</div>
</div>

<div className="md:col-span-7 flex flex-col gap-4">
<div className="bg-tertiary-container/10 border border-tertiary-container/20 rounded-xl p-6 h-full">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-tertiary" data-icon="auto_awesome">auto_awesome</span>
<h3 className="font-headline font-bold text-tertiary">Analyse Pédagogique</h3>
</div>
<div className="space-y-4">
<div className="flex gap-4">
<div className="mt-1 w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-tertiary-fixed text-sm" data-icon="thumb_up">thumb_up</span>
</div>
<div>
<h4 className="font-bold text-on-surface text-body-md">Points Forts</h4>
<p className="text-on-surface-variant text-label-sm">Excellente maîtrise des concepts de base et de la méthodologie de résolution. Rapidité d'exécution notable.</p>
</div>
</div>
<div className="flex gap-4">
<div className="mt-1 w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-secondary-fixed text-sm" data-icon="lightbulb">lightbulb</span>
</div>
<div>
<h4 className="font-bold text-on-surface text-body-md">Axe de Progression</h4>
<p className="text-on-surface-variant text-label-sm">Attention aux détails lors de l'application de la règle de Grammaire III. Une relecture plus approfondie est conseillée.</p>
</div>
</div>
</div>
</div>
</div>
</div>

<section className="mb-12">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline font-bold text-headline-md text-on-surface">Révision par question</h3>
<div className="flex gap-2">
<span className="px-3 py-1 rounded-full bg-surface-container-highest text-outline text-label-xs">Toutes</span>
<span className="px-3 py-1 rounded-full bg-tertiary/10 text-tertiary text-label-xs font-bold border border-tertiary/20">Correctes (18)</span>
<span className="px-3 py-1 rounded-full bg-error/10 text-error text-label-xs font-bold border border-error/20">Erreurs (2)</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-4 bg-surface-container flex justify-between items-center">
<span className="text-label-xs font-bold text-outline uppercase tracking-wider">Question 04 • Grammaire Française</span>
<span className="flex items-center gap-1 text-tertiary font-bold text-label-sm">
<span className="material-symbols-outlined text-sm" data-icon="check_circle">check_circle</span> Correct
                    </span>
</div>
<div className="p-6">
<p className="text-on-surface font-headline font-semibold text-lg mb-6">
                        "Dans quelle phrase le participe passé est-il correctement accordé ?"
                    </p>
<div className="space-y-3 mb-8">
<div className="p-4 border border-outline-variant rounded-lg bg-surface flex items-center gap-4 opacity-50">
<div className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">A</div>
<span className="text-on-surface-variant">Les pommes que j'ai mangé...</span>
</div>
<div className="p-4 border-2 border-tertiary rounded-lg bg-tertiary/5 flex items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="w-6 h-6 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center text-xs font-bold">B</div>
<span className="text-on-surface font-semibold">Les fleurs qu'elle a cueillies...</span>
</div>
<span className="material-symbols-outlined text-tertiary" data-icon="task_alt">task_alt</span>
</div>
<div className="p-4 border border-outline-variant rounded-lg bg-surface flex items-center gap-4 opacity-50">
<div className="w-6 h-6 rounded-full border border-outline-variant flex items-center justify-center text-xs">C</div>
<span className="text-on-surface-variant">Elles se sont téléphonées...</span>
</div>
</div>

<div className="bg-primary/5 border-l-4 border-primary p-5 rounded-r-lg">
<div className="flex items-center gap-3 mb-2">
<div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-sm" data-icon="school">school</span>
</div>
<h4 className="font-bold text-primary">Explication de l'Expert</h4>
</div>
<p className="text-on-surface-variant text-body-md leading-relaxed">
                            Le participe passé employé avec l'auxiliaire <strong>avoir</strong> s'accorde en genre et en nombre avec le complément d'objet direct (COD) si celui-ci est placé <strong>avant</strong> le verbe. Ici, "qu'" mis pour "les fleurs" est le COD, féminin pluriel.
                        </p>
<div className="mt-4 flex items-center gap-4">
<button className="text-primary font-bold text-label-sm hover:underline flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="menu_book">menu_book</span> Revoir le cours
                            </button>
<button className="text-primary font-bold text-label-sm hover:underline flex items-center gap-1">
<span className="material-symbols-outlined text-sm" data-icon="forum">forum</span> Demander au tuteur IA
                            </button>
</div>
</div>
</div>
</div>
</section>

<div className="flex flex-col items-center gap-4 py-8">
<button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
                Quitter le mode test
            </button>
<p className="text-outline text-label-xs text-center max-w-sm">
                En tant que professeur, ces résultats ne seront pas enregistrés dans votre base de données personnelle, mais servent uniquement à la prévisualisation de l'expérience élève.
            </p>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-surface-container-low shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-all px-4 py-1 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
<span className="font-label text-label-sm">Aperçu</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-all px-4 py-1 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="list_alt">list_alt</span>
<span className="font-label text-label-sm">Questions</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-icon="analytics" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<span className="font-label text-label-sm">Score</span>
</a>
</nav>
<script>
        // Micro-interaction for the score circle or cards
        document.querySelectorAll('.glass-card, .bg-surface-container-lowest').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.3s ease';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);

        // Simple mock tab switching
        const tabs = document.querySelectorAll('nav a');
        tabs.forEach(tab =&gt; &#123;
            tab.addEventListener('click', (e) =&gt; &#123;
                e.preventDefault();
                tabs.forEach(t =&gt; &#123;
                    t.className = "flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-all px-4 py-1 rounded-lg";
                    const icon = t.querySelector('.material-symbols-outlined');
                    icon.style.fontVariationSettings = "'FILL' 0";
                &#125;);
                tab.className = "flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1 active:scale-90 transition-transform";
                const icon = tab.querySelector('.material-symbols-outlined');
                icon.style.fontVariationSettings = "'FILL' 1";
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
