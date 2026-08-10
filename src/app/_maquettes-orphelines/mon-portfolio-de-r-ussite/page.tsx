import type { Metadata } from "next";

export const metadata: Metadata = { title: "Portfolio de Réussite - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body pb-20" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm">
<div className="flex items-center h-16 px-4 w-full">
<button className="p-2 transition-colors duration-200 active:opacity-80 hover:bg-primary-container/20 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="ml-4 font-headline text-headline-md font-semibold truncate">Mon Portfolio</h1>
<div className="ml-auto">
<span className="material-symbols-outlined text-on-primary/70">share</span>
</div>
</div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-8">

<section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
<div className="relative p-0.5 rounded-xl gold-shimmer shadow-lg">
<div className="bg-surface-container-lowest rounded-[10px] p-6 flex flex-col items-center text-center">
<div className="relative mb-4">
<div className="w-24 h-24 rounded-full border-4 border-secondary-container p-1 bg-surface-container">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-247.png" alt="A professional studio portrait of a young Ivorian student named Koffi Konan, smiling confidently with a bright educational background. The style is modern corporate photography with soft, warm lighting that emphasizes a friendly and ambitious personality, consistent with a premium educational platform aesthetic." />
</div>
<div className="absolute -bottom-1 -right-1 bg-secondary-container text-on-secondary-container rounded-full p-1 border-2 border-surface-container-lowest">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
</div>
<h2 className="font-headline text-2xl font-bold text-primary mb-1">Koffi Konan</h2>
<p className="text-on-surface-variant font-medium mb-6">Candidat BAC Série D</p>
<div className="grid grid-cols-3 gap-4 w-full pt-4 border-t border-outline-variant">
<div className="flex flex-col">
<span className="text-secondary font-bold text-lg">84%</span>
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Score Global</span>
</div>
<div className="flex flex-col border-x border-outline-variant">
<span className="text-primary font-bold text-lg">12</span>
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Fiches</span>
</div>
<div className="flex flex-col">
<span className="text-tertiary font-bold text-lg">4</span>
<span className="text-xs text-on-surface-variant uppercase tracking-wider font-semibold">Badges</span>
</div>
</div>
</div>
</div>
</section>

<section className="space-y-4">
<div className="flex justify-between items-end px-1">
<h3 className="font-headline text-xl font-bold text-on-surface">Mes Badges d'Excellence</h3>
<button className="text-primary text-sm font-semibold hover:underline">Voir tout</button>
</div>
<div className="flex overflow-x-auto gap-4 pb-2 hide-scrollbar -mx-4 px-4">

<div className="flex-shrink-0 w-32 bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm border border-outline-variant/30">
<img className="w-16 h-16 mb-2 drop-shadow-md" src="/images/ecran-248.png" />
<span className="text-xs font-bold text-on-surface leading-tight mb-1">Excellence Gold</span>
<span className="text-[10px] text-on-surface-variant">12 Oct. 2023</span>
</div>

<div className="flex-shrink-0 w-32 bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm border border-outline-variant/30">
<img className="w-16 h-16 mb-2 drop-shadow-md" src="/images/ecran-249.png" />
<span className="text-xs font-bold text-on-surface leading-tight mb-1">Assiduité</span>
<span className="text-[10px] text-on-surface-variant">05 Nov. 2023</span>
</div>

<div className="flex-shrink-0 w-32 bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm border border-outline-variant/30">
<img className="w-16 h-16 mb-2 drop-shadow-md" src="/images/ecran-250.svg" />
<span className="text-xs font-bold text-on-surface leading-tight mb-1">Vitesse Éclair</span>
<span className="text-[10px] text-on-surface-variant">20 Nov. 2023</span>
</div>

<div className="flex-shrink-0 w-32 bg-surface-container-low p-4 rounded-xl flex flex-col items-center text-center shadow-sm border border-outline-variant/30">
<img className="w-16 h-16 mb-2 drop-shadow-md" src="/images/ecran-251.png" />
<span className="text-xs font-bold text-on-surface leading-tight mb-1">Persévérance</span>
<span className="text-[10px] text-on-surface-variant">02 Dec. 2023</span>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-xl font-bold text-on-surface px-1">Fiches Certifiées par les Profs</h3>
<div className="space-y-3">

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4 transition-transform active:scale-[0.98]">
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined">calculate</span>
</div>
<div className="flex-grow">
<h4 className="font-semibold text-on-surface">Mathématiques: Intégrales</h4>
<p className="text-sm text-on-surface-variant">Par M. Kouassi</p>
</div>
<div className="bg-tertiary-container/20 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        CERTIFIÉE
                    </div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4 transition-transform active:scale-[0.98]">
<div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">strikethrough_s</span>
</div>
<div className="flex-grow">
<h4 className="font-semibold text-on-surface">SVT: Génétique</h4>
<p className="text-sm text-on-surface-variant">Par Mme. Yao</p>
</div>
<div className="bg-tertiary-container/20 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        CERTIFIÉE
                    </div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4 transition-transform active:scale-[0.98]">
<div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">history_edu</span>
</div>
<div className="flex-grow">
<h4 className="font-semibold text-on-surface">Philosophie: La Liberté</h4>
<p className="text-sm text-on-surface-variant">Par M. Bakayoko</p>
</div>
<div className="bg-tertiary-container/20 text-tertiary text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        CERTIFIÉE
                    </div>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-xl font-bold text-on-surface px-1">Tableau d'Honneur (BAC)</h3>
<div className="bg-primary text-on-primary rounded-xl p-6 relative overflow-hidden">

<div className="absolute -right-8 -bottom-8 opacity-10">
<span className="material-symbols-outlined text-[120px]" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
<div className="flex items-center gap-6 relative z-10">
<div className="relative flex items-center justify-center">
<svg className="w-24 h-24 transform -rotate-90">
<circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
<circle className="text-secondary-container stroke-[round] transition-all duration-1000" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="50.24" strokeWidth="8" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-xl font-bold leading-none">16/20</span>
<span className="text-[10px] uppercase tracking-tighter opacity-80">Moyenne</span>
</div>
</div>
<div className="flex-grow">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-secondary-container" style={{"fontVariationSettings":"'FILL' 1"}}>trophy</span>
<span className="font-headline font-bold text-lg">Simul. #3</span>
</div>
<p className="text-on-primary-container text-sm font-medium mb-3">Meilleure performance enregistrée</p>
<div className="flex gap-2">
<span className="bg-white/10 px-2 py-1 rounded text-[10px] font-semibold">MATH: 18</span>
<span className="bg-white/10 px-2 py-1 rounded text-[10px] font-semibold">PHY: 15</span>
<span className="bg-white/10 px-2 py-1 rounded text-[10px] font-semibold">SVT: 16</span>
</div>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg">
<div className="flex justify-around items-center h-16 w-full px-2 pb-safe">

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-transform duration-150 scale-95" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-transform duration-150 scale-95" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-transform duration-150 scale-95" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform duration-150 scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
<span className="font-label text-label-xs font-semibold">Portfolio</span>
</a>
</div>
</nav>
<script>
        // Simple entry animations and micro-interactions
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const cards = document.querySelectorAll('main &gt; section');
            cards.forEach((card, index) =&gt; &#123;
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = `all 0.5s ease-out $&#123;index * 0.15&#125;s`;
                setTimeout(() =&gt; &#123;
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                &#125;, 50);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
