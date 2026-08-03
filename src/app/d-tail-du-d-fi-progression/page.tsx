import type { Metadata } from "next";

export const metadata: Metadata = { title: "Détail du Défi - Cocody vs Abobo" };

export default function Page() {
  return (
    <div className="font-body-md text-body-md antialiased" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 z-50 bg-surface border-b border-outline-variant flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16">
<div className="flex items-center gap-4">
<button className="active:scale-95 transition-transform p-2 hover:bg-surface-container-low rounded-full">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Cocody vs Abobo</h1>
</div>
<div className="flex items-center">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-104.png" alt="A professional studio portrait of a young Ivorian student smiling confidently. The lighting is soft and bright, highlighting their face against a clean, minimalist off-white background. The overall aesthetic is modern, academic, and high-quality, aligning with a premium educational platform's visual identity using a palette of soft blues and clean whites." />
</div>
</div>
</header>
<main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop pb-32 pt-stack-md">

<section className="relative mb-stack-lg overflow-hidden rounded-xl bg-surface-container shadow-sm border border-outline-variant p-6">
<div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">

</div>
<div className="flex justify-between items-end mb-4">
<div className="text-left">
<span className="font-label-xs text-label-xs uppercase text-primary font-bold">Cocody</span>
<div className="font-display-lg text-display-lg text-primary">124,500 <span className="text-body-md font-normal">XP</span></div>
</div>
<div className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-bold text-sm animate-pulse">LIVE</div>
<div className="text-right">
<span className="font-label-xs text-label-xs uppercase text-secondary font-bold">Abobo</span>
<div className="font-display-lg text-display-lg text-secondary">118,200 <span className="text-body-md font-normal">XP</span></div>
</div>
</div>

<div className="relative w-full h-12 bg-surface-container-highest rounded-full overflow-hidden flex progress-shadow border border-outline-variant">

<div className="h-full bg-primary-container transition-all duration-1000 ease-out relative" style={{"width":"52%"}}>
<div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
</div>

<div className="h-full w-1 bg-white z-10 -ml-0.5"></div>

<div className="h-full bg-secondary-container transition-all duration-1000 ease-out" style={{"width":"48%"}}>
<div className="absolute inset-0 bg-gradient-to-l from-transparent to-white/20"></div>
</div>
</div>
<div className="mt-4 text-center">
<p className="font-label-sm text-label-sm text-on-surface-variant">Cocody mène de <span className="font-bold text-primary">6,300 XP</span> !</p>
</div>
</section>

<section className="grid grid-cols-2 gap-gutter mb-stack-lg">
<div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-primary mb-2" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Ma Contribution</span>
<span className="font-headline-md text-headline-md text-primary">+450 XP</span>
</div>
<div className="bg-surface border border-outline-variant p-4 rounded-xl flex flex-col items-center justify-center text-center">
<span className="material-symbols-outlined text-secondary mb-2" style={{"fontVariationSettings":"'FILL' 1"}}>leaderboard</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Rang dans Cocody</span>
<span className="font-headline-md text-headline-md text-secondary">12ème</span>
</div>
</section>

<section className="mb-stack-lg bg-tertiary-fixed text-on-tertiary-fixed p-6 rounded-xl border border-tertiary flex items-center gap-4">
<div className="bg-on-tertiary-container/10 p-3 rounded-full">
<span className="material-symbols-outlined text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
</div>
<div>
<h3 className="font-bold font-headline-sm">Récompenses Collectives</h3>
<p className="text-body-md">Si Cocody gagne : <span className="font-bold text-tertiary">+20% Boost XP</span> pendant 3 jours pour tous les participants.</p>
</div>
</section>

<section className="mb-stack-lg">
<h3 className="font-headline-md text-headline-md text-primary mb-4">Top Contributeurs</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
<div className="bg-primary-container text-white px-4 py-2 font-bold flex justify-between items-center">
<span>Commune: Cocody</span>
<span className="material-symbols-outlined">shield</span>
</div>
<div className="p-2 space-y-1">
<div className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
<span className="font-bold text-primary w-6">1.</span>
<div className="w-10 h-10 rounded-full bg-outline-variant overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-105.png" alt="Close-up avatar of a focused Ivorian high school student, modern photographic style, warm morning lighting, academic setting background, clean composition." />
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Kouassi A.</p>
<p className="text-xs text-on-surface-variant">12 sessions complétées</p>
</div>
<span className="font-bold text-primary">2,400 XP</span>
</div>
<div className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
<span className="font-bold text-primary w-6">2.</span>
<div className="w-10 h-10 rounded-full bg-outline-variant overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-106.png" alt="Avatar portrait of a young female student with braided hair, smiling, high-quality digital photography, bright educational environment with corporate blue accents." />
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Bamba F.</p>
<p className="text-xs text-on-surface-variant">9 sessions complétées</p>
</div>
<span className="font-bold text-primary">1,850 XP</span>
</div>
<div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/10 rounded-lg">
<span className="font-bold text-primary w-6">3.</span>
<div className="w-10 h-10 rounded-full bg-outline-variant overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-107.png" alt="A young man in a school uniform, profile picture style, professional lighting, neutral background, sharp focus, vibrant skin tones." />
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Yao M.</p>
<p className="text-xs text-on-surface-variant">7 sessions complétées</p>
</div>
<span className="font-bold text-primary">1,200 XP</span>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
<div className="bg-secondary text-white px-4 py-2 font-bold flex justify-between items-center">
<span>Commune: Abobo</span>
<span className="material-symbols-outlined">flag</span>
</div>
<div className="p-2 space-y-1">
<div className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
<span className="font-bold text-secondary w-6">1.</span>
<div className="w-10 h-10 rounded-full bg-outline-variant overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-108.png" alt="Dynamic portrait of an Ivorian student athlete, confident expression, soft focus library background, modern lighting using orange and blue tones." />
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Diallo S.</p>
<p className="text-xs text-on-surface-variant">14 sessions complétées</p>
</div>
<span className="font-bold text-secondary">3,100 XP</span>
</div>
<div className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
<span className="font-bold text-secondary w-6">2.</span>
<div className="w-10 h-10 rounded-full bg-outline-variant overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-109.png" alt="Portrait of a female student wearing glasses, smart and studious appearance, cinematic lighting, corporate academic style, high resolution." />
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Touré L.</p>
<p className="text-xs text-on-surface-variant">10 sessions complétées</p>
</div>
<span className="font-bold text-secondary">2,100 XP</span>
</div>
<div className="flex items-center gap-3 p-3 hover:bg-surface-container-low transition-colors rounded-lg">
<span className="font-bold text-secondary w-6">3.</span>
<div className="w-10 h-10 rounded-full bg-outline-variant overflow-hidden flex-shrink-0">
<img className="w-full h-full object-cover" src="/images/ecran-110.png" alt="Headshot of a smiling young Ivorian student, vibrant orange shirt, blurred classroom background, high-end photography, bright colors." />
</div>
<div className="flex-grow">
<p className="font-bold text-on-surface">Bakayoko K.</p>
<p className="text-xs text-on-surface-variant">8 sessions complétées</p>
</div>
<span className="font-bold text-secondary">1,400 XP</span>
</div>
</div>
</div>
</div>
</section>

<div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-md px-margin-mobile z-40">
<button className="w-full py-4 bg-primary text-on-primary font-bold rounded-full shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group">
<span className="material-symbols-outlined group-hover:animate-bounce">bolt</span>
                Contribuer maintenant
            </button>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe">
<button className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>swords</span>
<span className="font-label-sm text-label-sm">Défis</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-sm text-label-sm">Tuteur AI</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Profil</span>
</button>
</nav>
<script>
        // Micro-interaction: Progress bar simulation
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const progress = document.querySelector('.bg-primary-container');
            const aboboProgress = document.querySelector('.bg-secondary-container');
            
            // Randomly fluctuate progress slightly to simulate "live" data
            setInterval(() =&gt; &#123;
                const currentWidth = parseFloat(progress.style.width);
                const change = (Math.random() - 0.5) * 0.5;
                const newWidth = Math.min(Math.max(currentWidth + change, 45), 55);
                
                progress.style.width = `$&#123;newWidth&#125;%`;
                aboboProgress.style.width = `$&#123;100 - newWidth&#125;%`;
            &#125;, 3000);
        &#125;);
    </script>

    </div>
  );
}
