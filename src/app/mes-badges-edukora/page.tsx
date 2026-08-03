import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes Badges - BAC Edukora" };

export default function Page() {
  return (
    <div className="font-body-md text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky z-50 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-mobile py-base">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-100" data-icon="arrow_back">arrow_back</button>
<h1 className="font-headline-md text-headline-md-mobile font-bold text-primary dark:text-primary-fixed-dim">Mes Badges</h1>
</div>
<button className="material-symbols-outlined text-primary dark:text-primary-fixed-dim hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-100" data-icon="notifications">notifications</button>
</header>
<main className="pb-24 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto">

<section className="mt-stack-lg mb-stack-lg">
<div className="bg-primary-container p-6 rounded-xl text-on-primary-container flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">

<div className="absolute right-0 top-0 opacity-10 pointer-events-none">
<span className="material-symbols-outlined text-[120px]" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
<div className="flex-1">
<h2 className="font-display-lg-mobile text-display-lg-mobile text-white mb-2">Mes Réussites</h2>
<p className="font-body-md text-on-primary-container opacity-90">Continuez à briller ! Chaque badge rapproche de votre réussite au BAC.</p>
</div>
<div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 flex flex-col items-center">
<span className="text-4xl font-extrabold text-white">04</span>
<span className="font-label-xs uppercase tracking-widest text-white/80">Badges Totaux</span>
</div>
</div>
</section>

<section className="mb-stack-lg">
<div className="flex items-center justify-between mb-stack-md">
<h3 className="font-headline-md text-headline-md-mobile text-primary">Badges Débloqués</h3>
<span className="font-label-sm text-outline px-3 py-1 bg-surface-container rounded-full">Recents</span>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter">

<div className="bento-card bg-white border border-outline-variant p-4 rounded-xl flex flex-col items-center text-center">
<div className="w-20 h-20 mb-3 bg-surface-container-low rounded-full p-2">
<img alt="Badge Assiduité" className="w-full h-full object-contain" src="/images/ecran-216.png" />
</div>
<span className="font-label-sm text-primary mb-1">Assiduité</span>
<span className="text-[10px] text-outline font-medium">Obtenu le 12/05</span>
</div>

<div className="bento-card bg-white border border-outline-variant p-4 rounded-xl flex flex-col items-center text-center">
<div className="w-20 h-20 mb-3 bg-surface-container-low rounded-full p-2">
<img alt="Badge Excellence" className="w-full h-full object-contain" src="/images/ecran-217.png" />
</div>
<span className="font-label-sm text-primary mb-1">Excellence</span>
<span className="text-[10px] text-outline font-medium">Obtenu le 10/05</span>
</div>

<div className="bento-card bg-white border border-outline-variant p-4 rounded-xl flex flex-col items-center text-center">
<div className="w-20 h-20 mb-3 bg-surface-container-low rounded-full p-2">
<img alt="Badge Persévérance" className="w-full h-full object-contain" src="/images/ecran-218.png" />
</div>
<span className="font-label-sm text-primary mb-1">Persévérance</span>
<span className="text-[10px] text-outline font-medium">Obtenu le 05/05</span>
</div>

<div className="bento-card bg-white border border-outline-variant p-4 rounded-xl flex flex-col items-center text-center">
<div className="w-20 h-20 mb-3 bg-surface-container-low rounded-full p-2">
<img alt="Badge Rapidité" className="w-full h-full object-contain" src="/images/ecran-219.png" />
</div>
<span className="font-label-sm text-primary mb-1">Rapidité</span>
<span className="text-[10px] text-outline font-medium">Obtenu le 01/05</span>
</div>
</div>
</section>

<section className="mb-stack-lg">
<h3 className="font-headline-md text-headline-md-mobile text-primary mb-stack-md">En cours</h3>
<div className="space-y-gutter">

<div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-4">
<div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center grayscale opacity-60">
<span className="material-symbols-outlined text-3xl text-outline" data-icon="functions">functions</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-end mb-2">
<h4 className="font-label-sm text-on-surface">Maître des Maths</h4>
<span className="font-label-xs text-primary">80%</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="progress-bar-fill h-full bg-primary" style={{"width":"80%"}}></div>
</div>
<p className="text-[11px] text-outline mt-2">Réalisez encore 2 exercices parfaits pour débloquer.</p>
</div>
</div>

<div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-4">
<div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center grayscale opacity-60">
<span className="material-symbols-outlined text-3xl text-outline" data-icon="biotech">biotech</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-end mb-2">
<h4 className="font-label-sm text-on-surface">Explorateur Scientifique</h4>
<span className="font-label-xs text-primary">45%</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="progress-bar-fill h-full bg-primary" style={{"width":"45%"}}></div>
</div>
<p className="text-[11px] text-outline mt-2">Complétez les modules de Physique-Chimie.</p>
</div>
</div>

<div className="bg-white border border-outline-variant p-4 rounded-xl flex items-center gap-4 opacity-50">
<div className="w-16 h-16 bg-surface-container-highest rounded-full flex items-center justify-center grayscale">
<span className="material-symbols-outlined text-3xl text-outline" data-icon="translate">translate</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-end mb-2">
<h4 className="font-label-sm text-on-surface">Polyglotte</h4>
<span className="font-label-xs text-outline">12%</span>
</div>
<div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
<div className="progress-bar-fill h-full bg-outline" style={{"width":"12%"}}></div>
</div>
<p className="text-[11px] text-outline mt-2">Commencez vos révisions d'Anglais ou d'Espagnol.</p>
</div>
</div>
</div>
</section>

<section className="mt-stack-lg">
<div className="bg-tertiary-fixed p-6 rounded-xl border border-tertiary-container/20">
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-tertiary" data-icon="lightbulb" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
<div>
<p className="italic font-body-md text-on-tertiary-fixed-variant mb-2">"Le succès n'est pas final, l'échec n'est pas fatal : c'est le courage de continuer qui compte."</p>
<span className="font-label-xs text-on-tertiary-fixed uppercase font-bold">— Winston Churchill</span>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl shadow-lg bg-surface-container-lowest dark:bg-surface-dim shadow-[0_-4px_10px_rgba(0,50,125,0.1)] flex justify-around items-center h-16 px-gutter">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="bookmark">bookmark</span>
<span className="font-label-xs text-label-xs">Favoris</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary-fixed-dim dark:text-on-primary-fixed rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for progress bars on load
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const bars = document.querySelectorAll('.progress-bar-fill');
            bars.forEach(bar =&gt; &#123;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() =&gt; &#123;
                    bar.style.width = targetWidth;
                &#125;, 300);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
