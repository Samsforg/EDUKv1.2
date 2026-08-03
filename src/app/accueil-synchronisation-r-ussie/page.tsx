import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Accueil" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-background border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16 w-full z-40">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" data-icon="sync">sync</span>
<h1 className="font-headline font-bold text-primary dark:text-primary-fixed text-headline-md">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<div className="flex items-center bg-surface-container rounded-full px-3 py-1 gap-1">
<span className="material-symbols-outlined text-secondary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-label text-label-sm font-bold text-on-surface">12 Jours</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-low transition-colors p-2 rounded-full cursor-pointer" data-icon="account_circle">account_circle</span>
</div>
</header>

<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="mt-4">
<h2 className="font-headline text-2xl font-bold text-on-surface">Bonjour, Moussa ! 👋</h2>
<p className="text-on-surface-variant font-body">Prêt pour tes révisions du BAC aujourd'hui ?</p>
</section>

<div className="bg-tertiary-container/10 border border-tertiary-container/30 p-4 rounded-xl flex items-center gap-4">
<div className="bg-tertiary-container text-on-tertiary rounded-full p-2">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="font-label text-label-sm font-bold text-on-tertiary-container">Toutes vos données sont à jour</p>
<p className="text-xs text-on-surface-variant">Dernière synchronisation : à l'instant</p>
</div>
</div>

<div className="grid grid-cols-2 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="text-on-surface-variant font-label text-label-xs uppercase tracking-wider">Points XP</span>
<span className="material-symbols-outlined text-primary text-xl">insights</span>
</div>
<div className="mt-2">
<span className="text-3xl font-headline font-extrabold text-primary xp-pop">2,850</span>
<span className="text-xs text-tertiary-container font-bold ml-1">+150 Today</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col justify-between">
<div className="flex justify-between items-start">
<span className="text-on-surface-variant font-label text-label-xs uppercase tracking-wider">Objectif Hebdo</span>
<span className="material-symbols-outlined text-secondary text-xl">emoji_events</span>
</div>
<div className="mt-2">
<span className="text-3xl font-headline font-extrabold text-on-surface">85%</span>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-1">
<div className="bg-secondary-container h-1.5 rounded-full" style={{"width":"85%"}}></div>
</div>
</div>
</div>
</div>

<section className="relative overflow-hidden bg-primary-container text-on-primary rounded-xl p-6 shadow-md">
<div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex-1">
<span className="bg-on-primary-container text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest mb-2 inline-block">Mathématiques</span>
<h3 className="font-headline text-xl font-bold mb-1">Suites Numériques</h3>
<p className="text-on-primary-container text-sm mb-4 opacity-90">Tu as complété 65% de ce chapitre. Continue sur ta lancée !</p>
<button className="bg-secondary-container text-on-secondary-container font-label text-label-sm font-bold py-3 px-6 rounded-lg active:scale-95 transition-transform">Reprendre le cours</button>
</div>
<div className="hidden sm:block w-32 h-32 opacity-20">
<span className="material-symbols-outlined text-[120px]" style={{"fontVariationSettings":"'FILL' 1"}}>functions</span>
</div>
</div>

<div className="absolute inset-0 opacity-10 pointer-events-none" style={{"backgroundImage":"radial-gradient(circle at 2px 2px, white 1px, transparent 0)","backgroundSize":"24px 24px"}}></div>
</section>

<section className="bg-surface-container-low border border-outline-variant rounded-xl p-5 flex items-center gap-4">
<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-primary/10 shadow-sm shrink-0">
<span className="material-symbols-outlined text-primary text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="flex-1">
<h4 className="font-headline font-bold text-on-surface">Besoin d'aide ?</h4>
<p className="text-sm text-on-surface-variant">Ton tuteur IA est prêt à t'expliquer n'importe quel concept en ivoirien ou en français.</p>
</div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</section>

<div className="rounded-xl overflow-hidden h-40 relative group cursor-pointer">
<div className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6jt7h3djjaxERxAm7yxMKY9h_YrQI0aACgRx9HzaYTcAqTZ8ygQfDnR00sbsbKd1Q60XSDyruasMVFao5X6Ng45UdrJjrm_EHn7n8-3KWbkVFCVqmkD8GkHV7u75VRPAQTF8V_13ualPqQ5xpMw2u-6Bx-bCed9W1Nln5Y1DuRtfbMxBm5oXU38kqaXB1xhX7IV3C4Ly01pulIZvqhtyd-l4YBqqMb6CDX9zRLYaR_psMRnKC1QCl')"}}></div>
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
<p className="text-white font-label text-label-sm font-medium">Découvre les annales du BAC 2023</p>
</div>
</div>
</main>

<div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-md bg-tertiary text-on-tertiary px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 success-toast-animation z-[60]" id="sync-toast">
<span className="material-symbols-outlined text-tertiary-fixed" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<div className="flex-1">
<p className="text-sm font-bold">Synchronisation réussie !</p>
<p className="text-xs opacity-90">Vos statistiques sont à jour. <span className="font-bold">+150 XP</span> ajoutés.</p>
</div>
<button className="material-symbols-outlined text-lg opacity-60 hover:opacity-100">close</button>
</div>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline shadow-sm flex justify-around items-center h-20 pb-safe w-full px-2">

<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 scale-95 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label text-label-xs mt-0.5">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs mt-0.5">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs mt-0.5">tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs mt-0.5">Profil</span>
</a>
</nav>
<script>
        // Auto-dismiss toast after 5 seconds
        setTimeout(() =&gt; &#123;
            const toast = document.getElementById('sync-toast');
            if (toast) &#123;
                toast.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(20px) translateX(-50%)';
                setTimeout(() =&gt; toast.remove(), 500);
            &#125;
        &#125;, 5000);

        // Simple haptic-like interaction on buttons
        document.querySelectorAll('button, a').forEach(el =&gt; &#123;
            el.addEventListener('click', () =&gt; &#123;
                if (window.navigator.vibrate) &#123;
                    window.navigator.vibrate(10);
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
