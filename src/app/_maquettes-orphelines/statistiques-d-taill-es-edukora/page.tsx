import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Statistiques BAC" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex items-center justify-between px-margin-mobile h-16 w-full">
<div className="flex items-center gap-4">
<button className="active:scale-95 duration-100 hover:bg-surface-container-low p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md-mobile text-primary dark:text-primary-fixed font-bold">Statistiques BAC</h1>
</div>
<button className="active:scale-95 duration-100 hover:bg-surface-container-low p-2 rounded-full transition-colors">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">settings</span>
</button>
</header>
<main className="px-margin-mobile pt-stack-md pb-32 max-w-md mx-auto">

<section className="grid grid-cols-1 gap-gutter mb-stack-lg">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col items-center text-center shadow-sm">
<h2 className="font-label-sm text-on-surface-variant mb-base self-start">Niveau Global</h2>
<div className="relative w-32 h-32 flex items-center justify-center my-stack-sm">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-highest" cx="64" cy="64" fill="transparent" r="45" stroke="currentColor" strokeWidth="10" />
<circle className="text-primary gauge-path" cx="64" cy="64" fill="transparent" r="45" stroke="currentColor" strokeLinecap="round" strokeWidth="10" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="font-headline-md text-headline-md text-primary">75%</span>
<span className="font-label-xs text-on-surface-variant">Prêt</span>
</div>
</div>
<div className="flex items-center gap-2 bg-primary-fixed px-3 py-1 rounded-full mt-stack-sm">
<span className="material-symbols-outlined text-[18px] text-on-primary-fixed" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-sm text-on-primary-fixed">12,450 XP Total</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md mb-stack-lg shadow-sm">
<div className="flex justify-between items-end mb-stack-md">
<div>
<h2 className="font-label-sm text-on-surface-variant">Heures d'étude</h2>
<p className="font-headline-md text-primary">18h <span className="font-label-sm text-on-surface-variant font-normal">cette semaine</span></p>
</div>
<span className="material-symbols-outlined text-primary">analytics</span>
</div>
<div className="flex items-end justify-between h-32 gap-2 mt-4 px-1">
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-primary-container rounded-t-sm h-[40%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2">L</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-primary-container rounded-t-sm h-[60%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2">M</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-primary-container rounded-t-sm h-[85%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2">M</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-primary-container rounded-t-sm h-[45%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2">J</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-primary-container rounded-t-sm h-[70%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2">V</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-secondary-container rounded-t-sm h-[100%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2 font-bold">S</span>
</div>
<div className="flex flex-col items-center flex-1">
<div className="w-full bg-primary-container rounded-t-sm h-[30%] transition-all duration-500"></div>
<span className="font-label-xs text-on-surface-variant mt-2">D</span>
</div>
</div>
</section>

<section className="mb-stack-lg">
<h2 className="font-label-sm text-on-surface-variant mb-stack-md uppercase tracking-wider">Maîtrise par matière</h2>
<div className="space-y-stack-md">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-3 shadow-sm">
<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">functions</span>
<span className="font-body-md font-semibold text-on-surface">Mathématiques</span>
</div>
<span className="font-label-sm text-primary">82%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[82%] rounded-full"></div>
</div>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-3 shadow-sm">
<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">science</span>
<span className="font-body-md font-semibold text-on-surface">Physique-Chimie</span>
</div>
<span className="font-label-sm text-secondary">65%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[65%] rounded-full"></div>
</div>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex flex-col gap-3 shadow-sm">
<div className="flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary">translate</span>
<span className="font-body-md font-semibold text-on-surface">Français</span>
</div>
<span className="font-label-sm text-tertiary">48%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-tertiary-container h-full w-[48%] rounded-full"></div>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-2 gap-gutter mb-stack-lg">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
<span className="material-symbols-outlined text-tertiary mb-base">task_alt</span>
<h3 className="font-label-xs text-on-surface-variant">Taux de réussite</h3>
<p className="font-headline-md text-on-surface">78%</p>
<span className="font-label-xs text-tertiary">+5% vs hier</span>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md shadow-sm">
<span className="material-symbols-outlined text-primary mb-base">quiz</span>
<h3 className="font-label-xs text-on-surface-variant">Quizz terminés</h3>
<p className="font-headline-md text-on-surface">142</p>
<span className="font-label-xs text-on-surface-variant">Mois en cours</span>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md mb-stack-lg shadow-sm">
<h2 className="font-label-sm text-on-surface-variant mb-stack-md uppercase tracking-wider">Analyse de Performance</h2>
<div className="space-y-4">
<div className="flex gap-4">
<div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-tertiary-fixed">trending_up</span>
</div>
<div>
<h4 className="font-body-md font-bold text-on-surface">Point Fort</h4>
<p className="font-body-md text-on-surface-variant">Géométrie : Excellente maîtrise des vecteurs et aires.</p>
</div>
</div>
<div className="h-px bg-outline-variant w-full"></div>
<div className="flex gap-4">
<div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-error-container">warning</span>
</div>
<div>
<h4 className="font-body-md font-bold text-on-surface">Point à travailler</h4>
<p className="font-body-md text-on-surface-variant">Optique : Difficultés notées sur les lentilles convergentes.</p>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface dark:bg-surface-dim border-t border-outline-variant shadow-[0_-4px_6px_-1px_rgba(0,71,171,0.1)] rounded-t-xl">
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-90 duration-200 relative">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
<span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-container text-white text-[10px] flex items-center justify-center rounded-full border-2 border-surface">3</span>
</button>
<button className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>leaderboard</span>
<span className="font-label-xs text-label-xs">Stats</span>
</button>
</nav>
<script>
        // Micro-interactions and interactive states
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                // Haptic feedback simulation or navigation logic could go here
            &#125;);
        &#125;);

        // Initialize progress bars with a small delay for animation effect
        window.addEventListener('load', () =&gt; &#123;
            const bars = document.querySelectorAll('.bg-primary, .bg-secondary-container, .bg-tertiary-container');
            bars.forEach(bar =&gt; &#123;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() =&gt; &#123;
                    bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = width;
                &#125;, 300);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
