import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Mode Hors-ligne" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-background border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16 w-full z-50">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed cursor-pointer transition-colors hover:bg-surface-container-low p-2 rounded-full active:opacity-80" data-icon="sync">sync</span>
<h1 className="font-headline font-bold text-primary dark:text-primary-fixed text-headline-md tracking-tight">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<div className="p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80 relative">
<span className="material-symbols-outlined text-on-surface-variant dark:text-outline-variant" data-icon="notifications">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-secondary-container rounded-full border-2 border-surface"></span>
</div>
<span className="material-symbols-outlined text-on-surface-variant dark:text-outline-variant p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80" data-icon="account_circle">account_circle</span>
</div>
</header>

<main className="pt-16 pb-24">

<div className="bg-[#FFD700] bg-opacity-90 px-4 py-3 flex items-center gap-3 animate-pulse-subtle">
<span className="material-symbols-outlined text-on-secondary-container text-[20px]" data-icon="cloud_off">cloud_off</span>
<p className="text-label-sm font-medium text-on-secondary-container">Vous êtes hors-ligne. Vos progrès sont enregistrés localement.</p>
</div>
<div className="px-4 mt-6 max-w-2xl mx-auto space-y-6">

<section>
<h2 className="font-display text-display-lg-mobile md:text-display-lg text-primary">Salut, Koffi 👋</h2>
<p className="text-on-surface-variant mt-1">Prêt pour une session de révision rapide ?</p>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col justify-between min-h-[160px] relative overflow-hidden group">
<div className="z-10">
<p className="text-label-xs font-semibold uppercase tracking-wider text-on-surface-variant">Session en cours</p>
<h3 className="font-headline font-bold text-primary text-xl mt-2">Progression BAC 2024</h3>
</div>
<div className="z-10 flex items-end justify-between mt-4">
<span className="font-display text-4xl font-bold text-primary">68%</span>
<div className="w-24 h-24 absolute -right-4 -bottom-4 opacity-10 rotate-12 transition-transform group-hover:rotate-0">
<span className="material-symbols-outlined text-[120px]" data-icon="school">school</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
<div className="bg-tertiary h-full rounded-full transition-all duration-1000 ease-out" style={{"width":"68%"}}></div>
</div>
</div>

<div className="bg-secondary-container text-on-secondary-container p-6 rounded-xl flex flex-col justify-between min-h-[160px] active:scale-[0.98] transition-transform cursor-pointer shadow-sm">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined" data-icon="sync" style={{"fontVariationSettings":"'wght' 600"}}>sync</span>
<span className="text-label-sm font-bold uppercase tracking-widest">Action requise</span>
</div>
<h3 className="font-headline font-bold text-lg leading-tight">3 scores en attente de synchronisation</h3>
</div>
<p className="text-label-xs font-medium opacity-90 italic">Ils seront envoyés dès le retour de la connexion.</p>
</div>
</div>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h4 className="font-headline font-bold text-on-surface">Cours disponibles hors-ligne</h4>
<span className="text-primary font-semibold text-label-sm">Voir tout</span>
</div>
<div className="grid grid-cols-1 gap-3">

<div className="flex items-center p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant transition-all cursor-pointer">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="calculate">calculate</span>
</div>
<div className="ml-4 flex-1">
<h5 className="font-semibold text-on-surface">Mathématiques</h5>
<p className="text-label-xs text-on-surface-variant">Chapitre 4 : Fonctions Logarithmes</p>
</div>
<span className="material-symbols-outlined text-tertiary" data-icon="download_done">download_done</span>
</div>

<div className="flex items-center p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant transition-all cursor-pointer">
<div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
</div>
<div className="ml-4 flex-1">
<h5 className="font-semibold text-on-surface">Philosophie</h5>
<p className="text-label-xs text-on-surface-variant">L'existence humaine et la culture</p>
</div>
<span className="material-symbols-outlined text-tertiary" data-icon="download_done">download_done</span>
</div>

<div className="flex items-center p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-outline-variant transition-all cursor-pointer">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="biotech">biotech</span>
</div>
<div className="ml-4 flex-1">
<h5 className="font-semibold text-on-surface">Physique-Chimie</h5>
<p className="text-label-xs text-on-surface-variant">Cinétique chimique</p>
</div>
<span className="material-symbols-outlined text-tertiary" data-icon="download_done">download_done</span>
</div>
</div>
</section>

<div className="h-10"></div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline shadow-sm flex justify-around items-center h-20 pb-safe px-2">

<button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-95 transition-transform hover:bg-surface-container-high">
<span className="material-symbols-outlined" data-icon="home" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label text-label-xs mt-1">Accueil</span>
</button>

<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 active:scale-95 transition-transform hover:bg-surface-container-high">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs mt-1">Cours</span>
</button>

<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 active:scale-95 transition-transform hover:bg-surface-container-high opacity-50 cursor-not-allowed">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs mt-1">tuteur IA</span>
</button>

<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 active:scale-95 transition-transform hover:bg-surface-container-high">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs mt-1">Profil</span>
</button>
</nav>
<script>
        // Micro-interaction for synchronizing visual
        document.querySelector('[data-icon="sync"]').addEventListener('click', function() &#123;
            this.classList.add('animate-spin');
            setTimeout(() =&gt; &#123;
                this.classList.remove('animate-spin');
            &#125;, 1000);
        &#125;);

        // Add small hover effects and tactile feedback logic
        const buttons = document.querySelectorAll('button, .cursor-pointer');
        buttons.forEach(btn =&gt; &#123;
            btn.addEventListener('touchstart', () =&gt; &#123;
                btn.style.opacity = '0.7';
            &#125;);
            btn.addEventListener('touchend', () =&gt; &#123;
                btn.style.opacity = '1';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
