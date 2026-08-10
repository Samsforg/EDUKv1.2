import type { Metadata } from "next";

export const metadata: Metadata = { title: "État de Synchronisation - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-background border-b border-outline-variant dark:border-outline z-40">
<div className="flex justify-between items-center px-4 h-16 w-full max-w-5xl mx-auto">
<button className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">sync</span>
</button>
<h1 className="font-headline font-bold text-headline-md text-primary dark:text-primary-fixed">Edukora</h1>
<button className="flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">account_circle</span>
</button>
</div>
</header>
<main className="flex-grow pt-24 pb-32 px-4 max-w-2xl mx-auto w-full">

<div className="mb-8 text-center sm:text-left">
<h2 className="text-3xl font-headline font-bold text-primary mb-2">État de Synchronisation</h2>
<p className="text-on-surface-variant text-body-md">Consultez l'historique de vos sessions hors-ligne synchronisées avec nos serveurs.</p>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm">
<div className="w-16 h-16 bg-tertiary-container rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary-fixed text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>cloud_done</span>
</div>
<div>
<h3 className="font-headline font-bold text-lg text-on-surface">Tout est à jour</h3>
<p className="text-label-sm text-on-surface-variant">Dernière vérification : il y a quelques instants</p>
</div>
<div className="sm:ml-auto">
<div className="bg-tertiary/10 text-on-tertiary-container px-3 py-1 rounded-full text-label-xs font-bold flex items-center gap-1">
<span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
                    OPÉRATIONNEL
                </div>
</div>
</div>

<div className="space-y-4">
<h3 className="text-label-xs font-bold text-outline tracking-widest uppercase mb-4">Activités Récentes</h3>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 hover:border-primary transition-all group">
<div className="flex justify-between items-start">
<div className="flex gap-4">
<div className="p-3 bg-primary-fixed/30 rounded-xl">
<span className="material-symbols-outlined text-primary-fixed-variant">calculate</span>
</div>
<div>
<h4 className="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">Quiz Mathématiques : Intégrales</h4>
<p className="text-label-xs text-on-surface-variant">12 Oct, 10:45 • <span className="text-tertiary font-medium">Synchronisé</span></p>
</div>
</div>
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex gap-3 pt-2 border-t border-surface-container">
<div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-secondary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="text-label-sm font-bold">18/20</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-tertiary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
<span className="text-label-sm font-bold text-on-tertiary-container">+250 XP</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 hover:border-primary transition-all group">
<div className="flex justify-between items-start">
<div className="flex gap-4">
<div className="p-3 bg-secondary-fixed/30 rounded-xl">
<span className="material-symbols-outlined text-secondary-fixed-variant">menu_book</span>
</div>
<div>
<h4 className="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">Test de Diagnostic : Français</h4>
<p className="text-label-xs text-on-surface-variant">12 Oct, 11:20 • <span className="text-tertiary font-medium">Synchronisé</span></p>
</div>
</div>
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex gap-3 pt-2 border-t border-surface-container">
<div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-secondary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="text-label-sm font-bold">15/20</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-tertiary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
<span className="text-label-sm font-bold text-on-tertiary-container">+180 XP</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 hover:border-primary transition-all group">
<div className="flex justify-between items-start">
<div className="flex gap-4">
<div className="p-3 bg-primary-container/20 rounded-xl">
<span className="material-symbols-outlined text-primary">science</span>
</div>
<div>
<h4 className="font-headline font-semibold text-on-surface group-hover:text-primary transition-colors">Simulateur BAC : Physique</h4>
<p className="text-label-xs text-on-surface-variant">12 Oct, 14:30 • <span className="text-tertiary font-medium">Synchronisé</span></p>
</div>
</div>
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex gap-3 pt-2 border-t border-surface-container">
<div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-secondary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="text-label-sm font-bold">19/20</span>
</div>
<div className="flex items-center gap-1.5 bg-surface-container rounded-lg px-3 py-1.5">
<span className="material-symbols-outlined text-tertiary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
<span className="text-label-sm font-bold text-on-tertiary-container">+450 XP</span>
</div>
</div>
</div>
</div>

<div className="mt-12 flex flex-col items-center">
<button className="w-full sm:w-auto px-10 py-4 bg-secondary text-on-secondary font-headline font-bold rounded-xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined">arrow_back</span>
                Retour à l'accueil
            </button>
<p className="mt-4 text-label-xs text-outline italic">Toutes vos données sont chiffrées localement avant synchronisation.</p>
</div>
</main>


<script>
        // Micro-interaction for feedback
        document.querySelectorAll('.group').forEach(item =&gt; &#123;
            item.addEventListener('click', () =&gt; &#123;
                item.style.transform = 'scale(0.98)';
                setTimeout(() =&gt; &#123;
                    item.style.transform = 'scale(1)';
                &#125;, 100);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
