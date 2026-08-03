import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Catalogue des Cours" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24" >

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-150.png" alt="A professional studio portrait of a young West African student smiling warmly." />
</div>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Edukora</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</header>
<main className="pt-20 px-margin-mobile">

<section className="mt-4 mb-stack-lg">
<div className="relative group mb-stack-md">
<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline">search</span>
</div>
<input className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md outline-none" placeholder="Rechercher un cours..." type="text" />
</div>

<div className="mb-stack-sm">
<p className="text-label-xs text-on-surface-variant font-semibold mb-2 ml-1">CHOISIR TA SÉRIE</p>
<div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
<button className="serie-btn px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all shadow-sm" data-serie="all">Toutes</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="A">Série A</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="C">Série C</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="D">Série D</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="G2">Série G2 (Compta)</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="B">Série B (Technique)</button>
</div>
</div>
</section>

<h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Programme MENAET</h2>
<div className="grid grid-cols-1 gap-4" id="course-container">

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="A,C,D,G2,B">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary-container" style={{"fontVariationSettings":"'FILL' 1"}}>calculate</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">Mathématiques</h3>
<p className="text-on-surface-variant font-label-xs">24 Leçons • Tronc commun / Spécifique</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">65%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"65%"}}></div>
</div>
</div>
</div>

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="G2">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-on-secondary-fixed-variant flex items-center justify-center">
<span className="material-symbols-outlined text-secondary-fixed" style={{"fontVariationSettings":"'FILL' 1"}}>account_balance_wallet</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">Comptabilité &amp; Gestion</h3>
<p className="text-on-surface-variant font-label-xs">16 Leçons • Spécialité G2</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">15%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"15%"}}></div>
</div>
</div>
</div>

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="G2,B">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-white" style={{"fontVariationSettings":"'FILL' 1"}}>payments</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">Économie Générale</h3>
<p className="text-on-surface-variant font-label-xs">12 Leçons • Séries Techniques</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">0%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"0%"}}></div>
</div>
</div>
</div>

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="A,C,D,G2,B">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-fixed" style={{"fontVariationSettings":"'FILL' 1"}}>auto_stories</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">Français</h3>
<p className="text-on-surface-variant font-label-xs">18 Leçons • Dissertation &amp; Résumé</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">30%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"30%"}}></div>
</div>
</div>
</div>

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="D,C">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-tertiary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container" style={{"fontVariationSettings":"'FILL' 1"}}>biotech</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">SVT</h3>
<p className="text-on-surface-variant font-label-xs">15 Leçons • Génétique &amp; Écologie</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">85%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"85%"}}></div>
</div>
</div>
</div>

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="A">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-on-tertiary-fixed-variant flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary-fixed" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">Philosophie</h3>
<p className="text-on-surface-variant font-label-xs">20 Leçons • Spécialité Série A</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">50%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"50%"}}></div>
</div>
</div>
</div>

<div className="course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200" data-series="C,D,B">
<div className="flex justify-between items-start">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-lg bg-on-primary-fixed-variant flex items-center justify-center">
<span className="material-symbols-outlined text-primary-fixed" style={{"fontVariationSettings":"'FILL' 1"}}>science</span>
</div>
<div>
<h3 className="font-headline-md text-[18px] text-on-surface">Physique-Chimie</h3>
<p className="text-on-surface-variant font-label-xs">22 Leçons • Mécanique &amp; Chimie</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs">BAC</div>
</div>
<div className="mt-2">
<div className="flex justify-between items-center mb-1">
<span className="font-label-xs text-on-surface-variant">Progression</span>
<span className="font-label-xs text-primary">45%</span>
</div>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full" style={{"width":"45%"}}></div>
</div>
</div>
</div>
</div>

<div className="mt-stack-lg bg-primary-container rounded-2xl p-6 relative overflow-hidden">
<div className="relative z-10 flex flex-col gap-2">
<span className="font-label-xs text-on-primary-container uppercase tracking-wider">Nouveau</span>
<h3 className="font-headline-md text-white">Besoin d'aide pour réviser ?</h3>
<p className="font-body-md text-on-primary-container mb-4">Ton tuteur IA est disponible 24h/7 pour répondre à toutes tes questions sur le programme.</p>
<button className="bg-white text-primary px-6 py-3 rounded-full font-label-sm self-start active:scale-95 transition-transform shadow-lg">Discuter avec l'IA</button>
</div>
<div className="absolute -right-4 -bottom-4 opacity-20">
<span className="material-symbols-outlined text-[120px] text-white" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-background shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<div className="relative">
<span className="material-symbols-outlined">bookmark</span>
<div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border border-surface dark:border-on-background flex items-center justify-center"><span className="text-white text-[10px] font-bold leading-none">3</span></div>
</div>
<span className="font-label-xs text-label-xs">Favoris</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
    // Series filtering logic
    const serieButtons = document.querySelectorAll('.serie-btn');
    const courseCards = document.querySelectorAll('.course-card');

    serieButtons.forEach(btn =&gt; &#123;
        btn.addEventListener('click', () =&gt; &#123;
            const selectedSerie = btn.getAttribute('data-serie');
            
            // Toggle active styles for buttons
            serieButtons.forEach(b =&gt; &#123;
                b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
                b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
            &#125;);
            btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

            // Filter courses
            courseCards.forEach(card =&gt; &#123;
                const cardSeries = card.getAttribute('data-series').split(',');
                if (selectedSerie === 'all' || cardSeries.includes(selectedSerie)) &#123;
                    card.classList.remove('hidden');
                    card.classList.add('flex');
                &#125; else &#123;
                    card.classList.add('hidden');
                    card.classList.remove('flex');
                &#125;
            &#125;);
        &#125;);
    &#125;);

    // Micro-interaction for search focus
    const searchInput = document.querySelector('input[type="text"]');
    const searchContainer = searchInput.parentElement;
    
    searchInput.addEventListener('focus', () =&gt; &#123;
        searchContainer.classList.add('scale-[1.01]');
    &#125;);
    
    searchInput.addEventListener('blur', () =&gt; &#123;
        searchContainer.classList.remove('scale-[1.01]');
    &#125;);
</script>

    </div>
  );
}
