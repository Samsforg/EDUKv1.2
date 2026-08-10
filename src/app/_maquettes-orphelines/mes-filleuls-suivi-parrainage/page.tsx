import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes Filleuls - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 h-16">
<div className="flex items-center gap-3">
<button className="material-symbols-outlined p-2 hover:bg-primary-container/20 transition-colors rounded-full active:scale-95 duration-150">
                arrow_back
            </button>
<h1 className="font-headline text-headline-md font-semibold">Mes Filleuls</h1>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined p-2 hover:bg-primary-container/20 transition-colors rounded-full active:scale-95 duration-150">notifications</span>
</div>
</header>
<main className="mt-20 px-4 max-w-2xl mx-auto space-y-6">

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm relative overflow-hidden">
<div className="absolute -right-4 -top-4 opacity-10">
<span className="material-symbols-outlined text-9xl text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>group</span>
</div>
<div className="relative z-10">
<p className="text-on-surface-variant text-label-sm uppercase tracking-wider font-semibold">Récompenses cumulées</p>
<div className="flex items-baseline gap-2 mt-1">
<span className="text-4xl font-bold font-headline text-primary">14</span>
<span className="text-xl font-medium text-on-surface-variant">jours Premium gagnés</span>
</div>
</div>
</div>

<div className="flex gap-2 overflow-x-auto pb-2 scroll-hide">
<button className="bg-primary text-on-primary px-5 py-2 rounded-full text-label-sm font-medium flex-shrink-0 transition-all active:scale-95">
                Tous
            </button>
<button className="bg-surface-container-high text-on-surface-variant px-5 py-2 rounded-full text-label-sm font-medium flex-shrink-0 hover:bg-surface-container-highest transition-all active:scale-95">
                Inscrits
            </button>
<button className="bg-surface-container-high text-on-surface-variant px-5 py-2 rounded-full text-label-sm font-medium flex-shrink-0 hover:bg-surface-container-highest transition-all active:scale-95">
                En attente
            </button>
</div>

<div className="space-y-3">

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4 hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container font-bold text-lg">
                    SK
                </div>
<div className="flex-1">
<h3 className="font-semibold text-on-surface">Sarah Koné</h3>
<div className="flex items-center gap-2 mt-1">
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter">Membre Actif</span>
<span className="text-tertiary font-bold text-label-xs flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                            +7 jours
                        </span>
</div>
</div>
<span className="material-symbols-outlined text-outline-variant">chevron_right</span>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4 hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-lg">
                    AO
                </div>
<div className="flex-1">
<h3 className="font-semibold text-on-surface">Amina Ouattara</h3>
<div className="flex items-center gap-2 mt-1">
<span className="bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter">Inscrite</span>
<span className="text-primary font-bold text-label-xs flex items-center gap-0.5">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                            +7 jours
                        </span>
</div>
</div>
<span className="material-symbols-outlined text-outline-variant">chevron_right</span>
</div>

<div className="bg-surface-container-low p-4 rounded-xl border border-dashed border-outline-variant flex items-center gap-4 opacity-70">
<div className="w-12 h-12 rounded-full bg-surface-dim flex items-center justify-center text-on-surface-variant font-bold text-lg">
                    MT
                </div>
<div className="flex-1">
<h3 className="font-semibold text-on-surface">Moussa Traoré</h3>
<div className="flex items-center gap-2 mt-1">
<span className="bg-surface-dim text-on-surface-variant text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-tighter">En attente d'inscription</span>
</div>
</div>
<button className="bg-secondary px-3 py-1.5 rounded-lg text-on-secondary text-label-xs font-bold hover:bg-secondary-container transition-colors active:scale-95">
                    Relancer
                </button>
</div>
</div>

<div className="bg-secondary-container/10 border-2 border-secondary-container p-5 rounded-2xl flex gap-4 items-center mt-8">
<div className="bg-secondary-container p-3 rounded-xl text-on-secondary-container">
<span className="material-symbols-outlined text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div>
<p className="text-on-secondary-container font-headline font-bold text-lg leading-tight">Prochain objectif : Ambassadeur Élite</p>
<p className="text-on-surface-variant text-label-sm mt-1">Invite plus d'amis pour débloquer le badge Ambassadeur Élite et 30 jours de bonus.</p>
</div>
</div>
<div className="pt-4 flex justify-center">
<button className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-container transition-all active:scale-95">
<span className="material-symbols-outlined">share</span>
                Inviter un nouvel ami
            </button>
</div>
</main>

<nav className="fixed bottom-0 w-full rounded-t-xl z-50 bg-surface dark:bg-surface-container-low border-t border-outline-variant dark:border-outline shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-medium">tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200">
<span className="material-symbols-outlined">bookmark</span>
<span className="font-label text-label-xs font-medium">Favoris</span>
</button>

<button className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-bold">Profil</span>
</button>
</nav>
<script>
        // Light micro-interactions for filters
        const filterButtons = document.querySelectorAll('button[class*="rounded-full"]');
        filterButtons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                if (btn.innerText === "Relancer") return;
                filterButtons.forEach(b =&gt; &#123;
                    b.classList.remove('bg-primary', 'text-on-primary');
                    if (!b.classList.contains('bg-secondary')) &#123;
                         b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                    &#125;
                &#125;);
                btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
                btn.classList.add('bg-primary', 'text-on-primary');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
