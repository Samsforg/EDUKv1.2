import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Tableau de Bord" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24" >

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border border-primary-fixed bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-001.png" alt="A professional headshot of a young Ivorian student in a bright, modern learning environment. The student is smiling warmly at the camera, wearing a clean, academic-style polo shirt. The background is a soft-focus library with shelves of books and bright, natural sunlight streaming in. The image has a high-key, professional light-mode aesthetic with a palette of soft blues and whites." />
</div>
<span className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Edukora</span>
</div>
<div className="flex items-center gap-1 bg-secondary-container/10 px-3 py-1.5 rounded-full border border-secondary-container/20 active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined text-secondary text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<span className="font-bold text-secondary text-label-sm">7</span>
</div><button className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined">notifications</span>
</button>
</header>
<main className="pt-20 px-margin-mobile space-y-stack-lg gap-8">

<section className="mt-4">
<h1 className="font-headline-md text-headline-md text-on-surface">Salut, Koffi 👋</h1>
<p className="text-on-surface-variant font-body-md mt-1">Prêt pour tes révisions du BAC aujourd'hui ?</p>
</section>

<section className="grid grid-cols-2 gap-gutter">

<div className="col-span-2 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant flex items-center gap-4 shadow-sm">
<div className="relative w-14 h-14">
<svg className="w-full h-full">
<circle className="text-outline-variant" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeWidth="4" />
<circle className="text-primary progress-ring" cx="28" cy="28" fill="transparent" r="24" stroke="currentColor" strokeDasharray="150.8" strokeDashoffset="48.2" strokeLinecap="round" strokeWidth="4" />
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="text-label-xs font-bold text-primary">68%</span>
</div>
</div>
<div className="flex-1">
<p className="text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">Progression BAC 2024</p>
<p className="text-body-md font-bold text-on-surface">Excellent rythme ! Continue comme ça.</p>
</div>
</div>

<div className="col-span-2 bg-primary p-6 rounded-xl text-on-primary shadow-md relative overflow-hidden">
<div className="absolute top-0 right-0 w-40 h-40 bg-on-primary/5 rounded-full -mr-10 -mt-10"></div>
<div className="relative z-10">
<p className="text-label-sm font-label-sm opacity-90 mb-1">CONTINUER L'ÉTUDE</p>
<h3 className="text-[24px] font-bold leading-tight mb-6">Mathématiques :<br />Calcul d'Intégrales</h3>
<button className="w-full bg-on-primary text-primary py-3 rounded-full font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform">
      Reprendre le cours
      <span className="material-symbols-outlined">play_arrow</span>
</button>
</div>
</div>

<div className="col-span-2 grid grid-cols-2 gap-3">
<div className="col-span-2 flex justify-between items-center mb-1">
<h2 className="font-bold text-on-surface">Objectifs</h2>
</div>
<div className="bg-surface-container-high/50 p-3 rounded-xl border border-outline-variant flex items-center gap-3">
<div className="w-10 h-10 bg-secondary-container/20 rounded-lg flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
</div>
<div>
<p className="text-[10px] uppercase font-bold text-on-surface-variant">Série</p>
<p className="text-label-sm font-bold">7/30 jrs</p>
</div>
</div>
<div className="bg-surface-container-high/50 p-3 rounded-xl border border-outline-variant flex items-center gap-3">
<div className="w-10 h-10 bg-primary-container/20 rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
<div>
<p className="text-[10px] uppercase font-bold text-on-surface-variant">Badge</p>
<p className="text-label-sm font-bold">Niveau 2</p>
</div>
</div>
</div>
</section>

<section className="space-y-stack-md pb-8">
<div className="flex justify-between items-center">
<h2 className="font-headline-md text-headline-md text-on-surface">Tes Matières</h2>
<button className="text-primary font-label-sm">Voir tout</button>
</div>
<div className="grid grid-cols-1 gap-gutter">

<div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-14 h-14 rounded-lg bg-[#E0E7FF] flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[32px]">calculate</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">Mathématiques</h4>
<div className="flex items-center gap-3 mt-1">
<div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[75%] rounded-full"></div>
</div>
<span className="text-label-xs font-label-xs text-on-surface-variant">75%</span>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-14 h-14 rounded-lg bg-[#FFEDD5] flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[32px]">menu_book</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">Français</h4>
<div className="flex items-center gap-3 mt-1">
<div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[45%] rounded-full"></div>
</div>
<span className="text-label-xs font-label-xs text-on-surface-variant">45%</span>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-14 h-14 rounded-lg bg-[#DCFCE7] flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-[32px]">science</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">Physique-Chimie</h4>
<div className="flex items-center gap-3 mt-1">
<div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[30%] rounded-full"></div>
</div>
<span className="text-label-xs font-label-xs text-on-surface-variant">30%</span>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors cursor-pointer">
<div className="w-14 h-14 rounded-lg bg-[#FEE2E2] flex items-center justify-center text-error">
<span className="material-symbols-outlined text-[32px]">public</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg text-on-surface">Histoire-Géo</h4>
<div className="flex items-center gap-3 mt-1">
<div className="flex-1 h-1.5 bg-outline-variant rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[60%] rounded-full"></div>
</div>
<span className="text-label-xs font-label-xs text-on-surface-variant">60%</span>
</div>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2">

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#"><div className="relative">
<span className="material-symbols-outlined">bookmark</span>
<span className="absolute -top-1 -right-1 flex items-center justify-center h-4 w-4 rounded-full bg-error border border-surface text-[10px] font-bold text-on-primary">3</span>
</div>
<span className="font-label-xs text-label-xs">Favoris</span></a><a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for cards
        document.querySelectorAll('.bento-card, .bg-surface').forEach(card =&gt; &#123;
            card.addEventListener('mousedown', () =&gt; &#123;
                card.style.transform = 'scale(0.98)';
            &#125;);
            card.addEventListener('mouseup', () =&gt; &#123;
                card.style.transform = 'scale(1)';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'scale(1)';
            &#125;);
        &#125;);

        // Pull-to-refresh feel (vibration simulation)
        let lastTouchY = 0;
        window.addEventListener('touchstart', (e) =&gt; &#123;
            lastTouchY = e.touches[0].clientY;
        &#125;, &#123; passive: true &#125;);

        window.addEventListener('touchmove', (e) =&gt; &#123;
            const touchY = e.touches[0].clientY;
            if (window.scrollY === 0 &amp;&amp; touchY &gt; lastTouchY) &#123;
                // Potential pull down
            &#125;
        &#125;, &#123; passive: true &#125;);
    </script>

    </div>
  );
}
