import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Synchronisation" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-background z-40 border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed spin-slow" data-icon="sync">sync</span>
<span className="font-headline font-bold text-primary dark:text-primary-fixed text-[24px] leading-[32px]">Edukora</span>
</div>
<div className="flex items-center gap-2">
<button className="p-2 hover:bg-surface-container-low transition-colors rounded-full active:opacity-80">
<span className="material-symbols-outlined text-on-surface-variant dark:text-outline-variant" data-icon="account_circle">account_circle</span>
</button>
</div>
</header>

<div className="mt-16 bg-primary-container text-on-primary-container px-4 py-3 flex items-center justify-between overflow-hidden relative">
<div className="flex items-center gap-3 z-10">
<span className="material-symbols-outlined text-sm" data-icon="cloud_sync">cloud_sync</span>
<p className="text-[14px] font-medium font-label">Connexion rétablie ! Synchronisation de vos données...</p>
</div>
<div className="w-24 h-1 bg-primary/20 rounded-full overflow-hidden z-10">
<div className="loading-bar-animation h-full w-1/2 bg-on-primary-container rounded-full"></div>
</div>

<div className="absolute inset-0 opacity-10 pointer-events-none">
<div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
</div>
</div>

<main className="px-4 mt-6 max-w-5xl mx-auto space-y-8">

<section className="space-y-2">
<h1 className="font-display font-bold text-primary text-[28px] leading-[36px]">Bonjour, Jean-Marc</h1>
<p className="text-on-surface-variant text-[16px]">Prêt pour votre session de révision BAC ?</p>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-4">

<div className="md:col-span-2 bg-surface-container-lowest border border-primary rounded-xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden group">
<div className="flex justify-between items-start relative z-10">
<div className="space-y-1">
<span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[12px] font-bold tracking-wider">EN COURS</span>
<h3 className="font-headline font-bold text-[20px] text-primary mt-2">Révision : Mathématiques (BAC)</h3>
<p className="text-on-surface-variant text-[14px]">Chapitre 4 : Fonctions Logarithmes</p>
</div>
<div className="flex flex-col items-end gap-1">
<span className="material-symbols-outlined text-primary text-3xl spin-slow" data-icon="sync">sync</span>
<span className="text-[10px] font-bold text-primary uppercase">Syncing...</span>
</div>
</div>
<div className="mt-8 space-y-2 relative z-10">
<div className="flex justify-between items-end text-[12px] font-bold text-on-surface-variant">
<span>Progression locale sauvegardée</span>
<span>85%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary" style={{"width":"85%"}}></div>
</div>
</div>

<div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-fixed/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
</div>

<div className="bg-primary text-on-primary rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4">
<span className="material-symbols-outlined text-4xl" data-icon="timer">timer</span>
<div>
<h4 className="text-[12px] font-bold uppercase tracking-widest opacity-80">BAC J-14</h4>
<p className="font-display font-extrabold text-[32px]">336h 12m</p>
</div>
<button className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold text-[14px] hover:scale-105 transition-transform active:scale-95 shadow-lg">
                    Démarrer un test
                </button>
</div>
</section>

<section className="space-y-4">
<div className="flex justify-between items-center">
<h2 className="font-headline font-bold text-[20px] text-primary">Continuer l'apprentissage</h2>
<a className="text-primary font-bold text-[14px] flex items-center gap-1" href="#">Voir tout <span className="material-symbols-outlined text-[18px]" data-icon="chevron_right">chevron_right</span></a>
</div>
<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 snap-x">

<div className="min-w-[280px] bg-white border border-outline-variant rounded-xl overflow-hidden snap-start shadow-sm">
<div className="h-32 w-full relative" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkhesYRNNUkOnE8KaLPIY11Hal6pXq5daotxnHaqexwiszDY_seNULT4o_CsoF57ZrXRYZQMnIGa8aTsP6o9BzmtwBlJgrHI31CqzcawjIK4QtlxTYqSy2KjuceMr3OZk1RYlyPaC9r0og0m1ngMEE3OuwNXmd_LeQf__1bI3ad9B1uY9LGV78gBjaByqVSk8b_qrDJ1o39TvMtxLFrJzH-Zwl2PUB0UK7ErBbspS1YA7LXA3ysWX-')"}}>
<div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg text-[12px] font-bold text-primary">15 min</div>
</div>
<div className="p-4 space-y-3">
<h4 className="font-headline font-bold text-[16px] text-on-surface">SVT : La génétique humaine</h4>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container text-[18px]" data-icon="biotech">biotech</span>
</div>
<span className="text-[12px] text-on-surface-variant font-medium">Science</span>
</div>
<div className="h-1.5 w-16 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary" style={{"width":"40%"}}></div>
</div>
</div>
</div>
</div>

<div className="min-w-[280px] bg-white border border-outline-variant rounded-xl overflow-hidden snap-start shadow-sm">
<div className="h-32 w-full relative" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBq5qY9MYefySSLM1bjs_5GkDu5vcY2ELcXSYxjbZmD7IEuZqWkiaABZ9xzIefsylo5h3KIWjmBuTtunEivj8qRZItH9Wq-OWtaoLArmrEusmVzX-VYJ9tvaf1a8TlhV-aNmKZw7dSRs1xepft6FiApYGRMw1hIjfl_-w0QCzS1keaFQyXVOMbfFOr9OEPYhGAFP_wgP0TkQ-DRirDQFG1gMilZMNlAFAlfj6KiAI6Yln8zhKBsBGll')"}}>
<div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-lg text-[12px] font-bold text-primary">25 min</div>
</div>
<div className="p-4 space-y-3">
<h4 className="font-headline font-bold text-[16px] text-on-surface">Histoire : L'indépendance de la CI</h4>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-fixed text-[18px]" data-icon="history_edu">history_edu</span>
</div>
<span className="text-[12px] text-on-surface-variant font-medium">Histoire</span>
</div>
<div className="h-1.5 w-16 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary" style={{"width":"15%"}}></div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-low rounded-xl p-6 border border-outline-variant flex items-center gap-6">
<div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0 border border-primary-fixed">
<span className="material-symbols-outlined text-4xl text-primary" data-icon="smart_toy" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="flex-1 space-y-1">
<h3 className="font-headline font-bold text-[18px] text-primary">Besoin d'aide immédiate ?</h3>
<p className="text-[14px] text-on-surface-variant">Posez vos questions à notre IA spécialisée sur le programme national.</p>
<div className="pt-2 flex gap-2 overflow-x-auto pb-1">
<span className="whitespace-nowrap px-3 py-1 bg-white border border-outline-variant rounded-full text-[12px] font-medium text-primary cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors">Explique moi Thalès</span>
<span className="whitespace-nowrap px-3 py-1 bg-white border border-outline-variant rounded-full text-[12px] font-medium text-primary cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-colors">Résumé de "Sous l'orage"</span>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-surface-container-lowest border-t border-outline-variant dark:border-outline shadow-sm flex justify-around items-center h-20 pb-safe w-full px-2">

<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="home" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>

<script>
        // Simple logic to mock sync completion
        setTimeout(() =&gt; &#123;
            const banner = document.querySelector('.bg-primary-container');
            const syncCardStatus = document.querySelector('.bg-secondary-container');
            const syncIcons = document.querySelectorAll('[data-icon="sync"]');
            
            if(banner) &#123;
                banner.classList.remove('bg-primary-container', 'text-on-primary-container');
                banner.classList.add('bg-tertiary-container', 'text-on-tertiary-container');
                banner.querySelector('p').textContent = "Synchronisation terminée avec succès !";
                banner.querySelector('.w-24').classList.add('hidden');
                banner.querySelector('[data-icon="cloud_sync"]').innerHTML = "check_circle";
                
                // Card update
                if(syncCardStatus) &#123;
                    syncCardStatus.textContent = "SYNCHRONISÉ";
                    syncCardStatus.parentElement.parentElement.querySelector('.text-[10px]').textContent = "Up to date";
                    syncCardStatus.parentElement.parentElement.querySelector('.text-[10px]').classList.remove('text-primary');
                    syncCardStatus.parentElement.parentElement.querySelector('.text-[10px]').classList.add('text-tertiary');
                &#125;

                syncIcons.forEach(icon =&gt; &#123;
                    icon.classList.remove('spin-slow');
                    icon.classList.add('text-tertiary');
                &#125;);

                // Fade out banner after 3 seconds
                setTimeout(() =&gt; &#123;
                    banner.style.transition = "opacity 0.5s ease, height 0.5s ease, margin 0.5s ease";
                    banner.style.opacity = "0";
                    banner.style.height = "0";
                    banner.style.padding = "0";
                    banner.style.margin = "0";
                &#125;, 3000);
            &#125;
        &#125;, 5000);
    </script>

    </div>
  );
}
