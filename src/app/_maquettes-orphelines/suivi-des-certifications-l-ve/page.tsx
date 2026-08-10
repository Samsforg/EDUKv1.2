import type { Metadata } from "next";

export const metadata: Metadata = { title: "Suivi des Certifications | Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 shadow-md bg-primary flex justify-between items-center px-4 py-3 h-16">
<div className="flex items-center gap-4">
<button className="text-on-primary hover:bg-primary-container/20 p-2 rounded-full transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-on-primary tracking-tight">Certifications</h1>
</div>
<button className="text-on-primary hover:bg-primary-container/20 p-2 rounded-full transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="mt-4">
<div className="bg-primary-container rounded-xl p-6 shadow-sm relative overflow-hidden">
<div className="absolute -right-8 -top-8 w-32 h-32 bg-on-primary-container/10 rounded-full blur-3xl"></div>
<h2 className="text-on-primary-container font-headline font-semibold mb-4 opacity-90">Impact Global</h2>
<div className="grid grid-cols-3 gap-2">
<div className="text-center">
<p className="text-3xl font-bold text-on-primary">12</p>
<p className="text-[10px] uppercase tracking-wider text-on-primary-container/80 font-medium">Fiches Soumises</p>
</div>
<div className="text-center border-x border-on-primary-container/20">
<p className="text-3xl font-bold text-on-primary">8</p>
<p className="text-[10px] uppercase tracking-wider text-on-primary-container/80 font-medium">Certifiées</p>
</div>
<div className="text-center">
<p className="text-3xl font-bold text-on-primary">4</p>
<p className="text-[10px] uppercase tracking-wider text-on-primary-container/80 font-medium">En attente</p>
</div>
</div>
</div>
</section>

<nav className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
<button className="px-4 py-2 rounded-full bg-primary text-on-primary text-sm font-semibold whitespace-nowrap shadow-sm">Toutes</button>
<button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest transition-colors">En attente</button>
<button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest transition-colors">Certifiées</button>
<button className="px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest transition-colors">À modifier</button>
</nav>

<div className="space-y-4">

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
<div className="flex justify-between items-start mb-3">
<div className="flex flex-col gap-1">
<span className="inline-flex items-center px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase tracking-wide w-fit">Mathématiques</span>
<h3 className="font-headline text-lg font-semibold text-on-surface">Calcul Intégral et Primitives</h3>
</div>
<span className="text-outline text-xs font-medium">12 Oct 2023</span>
</div>
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                        Certifiée
                    </div>
<button className="flex items-center gap-1 text-primary text-sm font-bold group-hover:underline">
                        Détails
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</article>

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
<div className="flex justify-between items-start mb-3">
<div className="flex flex-col gap-1">
<span className="inline-flex items-center px-2 py-0.5 rounded bg-primary-container text-on-primary-container text-[10px] font-bold uppercase tracking-wide w-fit">Physique-Chimie</span>
<h3 className="font-headline text-lg font-semibold text-on-surface">Oxydoréduction en Solution</h3>
</div>
<span className="text-outline text-xs font-medium">Hier</span>
</div>
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2 bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]">schedule</span>
                        En cours d'analyse
                    </div>
<button className="flex items-center gap-1 text-primary text-sm font-bold group-hover:underline">
                        Détails
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</article>

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group border-l-4 border-l-secondary-container">
<div className="flex justify-between items-start mb-3">
<div className="flex flex-col gap-1">
<span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wide w-fit">SVT</span>
<h3 className="font-headline text-lg font-semibold text-on-surface">Transmission des Caractères</h3>
</div>
<span className="text-outline text-xs font-medium">08 Oct 2023</span>
</div>
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2 bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]">chat_bubble</span>
                        Commentaires reçus
                    </div>
<button className="flex items-center gap-2 bg-secondary-container text-on-secondary px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform">
                        Voir les remarques
                    </button>
</div>
</article>

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow group">
<div className="flex justify-between items-start mb-3">
<div className="flex flex-col gap-1">
<span className="inline-flex items-center px-2 py-0.5 rounded bg-surface-variant text-on-surface-variant text-[10px] font-bold uppercase tracking-wide w-fit">Français</span>
<h3 className="font-headline text-lg font-semibold text-on-surface">L'Art de la Dissertation</h3>
</div>
<span className="text-outline text-xs font-medium">05 Oct 2023</span>
</div>
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2 bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                        Certifiée
                    </div>
<button className="flex items-center gap-1 text-primary text-sm font-bold group-hover:underline">
                        Détails
                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
</article>
</div>
</main>

<button className="fixed right-6 bottom-24 bg-secondary-container text-on-secondary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-secondary transition-all active:scale-90 z-40">
<span className="material-symbols-outlined text-3xl">add</span>
</button>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface border-t border-outline-variant shadow-[0_-2px_10px_rgba(0,50,125,0.08)] flex justify-around items-center px-2 py-2 pb-safe">
<button className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium mt-1">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium mt-1">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-medium mt-1">Tuteur AI</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label text-label-xs font-medium mt-1">Défis</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-medium mt-1">Profil</span>
</button>
</nav>
<script>
        // Simple filter interaction simulation
        document.querySelectorAll('nav button').forEach(button =&gt; &#123;
            button.addEventListener('click', () =&gt; &#123;
                if (button.parentElement.classList.contains('overflow-x-auto')) &#123;
                    document.querySelectorAll('nav.overflow-x-auto button').forEach(b =&gt; &#123;
                        b.classList.remove('bg-primary', 'text-on-primary');
                        b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                    &#125;);
                    button.classList.add('bg-primary', 'text-on-primary');
                    button.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
                &#125;
            &#125;);
        &#125;);

        // Add visual feedback to list items on tap
        document.querySelectorAll('article').forEach(card =&gt; &#123;
            card.addEventListener('touchstart', () =&gt; &#123;
                card.classList.add('scale-[0.98]', 'bg-surface-container-high');
            &#125;);
            card.addEventListener('touchend', () =&gt; &#123;
                card.classList.remove('scale-[0.98]', 'bg-surface-container-high');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
