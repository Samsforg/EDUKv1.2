import type { Metadata } from "next";

export const metadata: Metadata = { title: "Statistiques d'Impact - Professeur" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-container-lowest dark:bg-surface-container-lowest flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full fixed top-0 z-50 border-b border-surface-border dark:border-outline-variant">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-333.png" alt="A professional headshot of an academic professor in a light-filled office environment. The professor is wearing a navy blazer over a crisp white shirt, reflecting a sense of authority and intellectual clarity. The lighting is soft and even, characteristic of a high-end educational institution's promotional material. The overall aesthetic is clean, professional, and trustworthy." />
</div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora Professor</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors duration-200">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</header>
<main className="pt-20 px-container-padding-mobile flex flex-col gap-stack-md max-w-md mx-auto">

<section className="mt-4">
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Statistiques d'Impact</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">Votre contribution pédagogique certifiée</p>
</section>

<section className="grid grid-cols-2 gap-4">
<div className="col-span-2 bg-surface-container-lowest border border-surface-border rounded-xl p-stack-md relative overflow-hidden group">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-primary text-6xl">analytics</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Score d'Impact Global</p>
<div className="flex items-baseline gap-2">
<span className="font-metric-num text-[40px] leading-none text-primary">94</span>
<span className="font-title-md text-title-md text-on-surface-variant">/100</span>
</div>
<div className="mt-4 flex items-center gap-2 text-impact-emerald">
<span className="material-symbols-outlined text-[18px]">trending_up</span>
<span className="font-label-md text-label-md">+2.4% ce mois</span>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-md">
<p className="font-label-md text-label-md text-on-surface-variant uppercase mb-2">Élèves Aidés</p>
<p className="font-metric-num text-metric-num text-primary">1,240</p>
<div className="mt-1 h-1 w-12 bg-primary rounded-full"></div>
</div>
<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-md">
<p className="font-label-md text-label-md text-on-surface-variant uppercase mb-2">Rang Expert</p>
<div className="flex items-center gap-1">
<span className="font-metric-num text-metric-num text-expert-purple">#3</span>
<span className="material-symbols-outlined text-expert-purple text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<p className="font-label-md text-label-md text-expert-purple mt-1">Mathématiques</p>
</div>
</section>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-md flex flex-col gap-4">
<h3 className="font-title-md text-title-md text-primary">Indicateurs de Performance</h3>
<div className="space-y-4">

<div>
<div className="flex justify-between mb-1.5">
<span className="font-body-md text-body-md font-semibold">Clarté Pédagogique</span>
<span className="font-label-md text-label-md text-primary">96%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{"width":"96%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between mb-1.5">
<span className="font-body-md text-body-md font-semibold">Rigueur Scientifique</span>
<span className="font-label-md text-label-md text-primary">98%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{"width":"98%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between mb-1.5">
<span className="font-body-md text-body-md font-semibold">Réactivité</span>
<span className="font-label-md text-label-md text-primary">89%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary rounded-full" style={{"width":"89%"}}></div>
</div>
</div>
</div>
</section>

<section className="success-bg-gradient rounded-xl p-stack-md text-on-primary relative overflow-hidden">
<div className="relative z-10">
<h3 className="font-title-md text-title-md text-white mb-2">Contribution à la réussite</h3>
<p className="font-display-lg text-[40px] leading-tight font-bold text-white">85%</p>
<p className="font-body-md text-body-md text-white/90">de réussite sur vos fiches certifiées</p>
<button className="mt-4 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded font-label-md text-label-md uppercase tracking-widest text-white border border-white/30">
                    Voir les rapports
                </button>
</div>

<div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
</section>

<section>
<div className="flex justify-between items-center mb-4">
<h3 className="font-title-md text-title-md text-primary">Retours Étudiants</h3>
<span className="material-symbols-outlined text-primary cursor-pointer">arrow_forward</span>
</div>
<div className="flex overflow-x-auto hide-scrollbar gap-4 pb-2 -mx-1 px-1">

<div className="min-w-[280px] bg-white border border-surface-border rounded-xl p-4 shadow-sm">
<div className="flex gap-2 mb-2">
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<p className="font-body-md text-body-md text-on-surface italic italic">"La fiche sur les dérivées est d'une clarté incroyable. J'ai enfin compris mon cours de Licence !"</p>
<p className="font-label-md text-label-md text-on-surface-variant mt-3">— Thomas R., L1 Mathématiques</p>
</div>

<div className="min-w-[280px] bg-white border border-surface-border rounded-xl p-4 shadow-sm">
<div className="flex gap-2 mb-2">
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined text-validation-amber text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<p className="font-body-md text-body-md text-on-surface italic italic">"Merci professeur ! Grâce à vos corrections d'annales, j'ai eu 17 à mon partiel final."</p>
<p className="font-label-md text-label-md text-on-surface-variant mt-3">— Sarah M., Prépa MPSI</p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 bg-surface-container-lowest dark:bg-surface-container-lowest px-4 border-t border-surface-border dark:border-outline-variant">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-5 py-1 hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-5 py-1 hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">
<span className="material-symbols-outlined">verified_user</span>
<span className="font-label-md text-label-md mt-1">Vérifier</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-container text-on-secondary-container dark:text-on-secondary-container rounded-full px-5 py-1 active:scale-95 transition-transform duration-100" href="#">
<span className="material-symbols-outlined">leaderboard</span>
<span className="font-label-md text-label-md mt-1 font-bold">Metrics</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-on-surface-variant px-5 py-1 hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md mt-1">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for carousel snapping and progress bar animation
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const bars = document.querySelectorAll('.h-full.bg-primary');
            bars.forEach(bar =&gt; &#123;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() =&gt; &#123;
                    bar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
                    bar.style.width = width;
                &#125;, 200);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
