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
<button className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined">notifications</span>
</button>
</header>
<main className="pt-20 px-margin-mobile space-y-stack-lg">

<section className="mt-4">
<h1 className="font-headline-md text-headline-md text-on-surface">Salut, Koffi 👋</h1>
<p className="text-on-surface-variant font-body-md mt-1">Prêt pour tes révisions du BAC aujourd'hui ?</p>
</section>

<section className="grid grid-cols-2 gap-gutter">

<div className="col-span-2 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex items-center justify-between shadow-sm">
<div className="space-y-1">
<p className="text-label-sm font-label-sm text-on-surface-variant">Progression BAC 2024</p>
<p className="text-display-lg-mobile font-display-lg-mobile text-primary">68%</p>
<p className="text-label-xs font-label-xs text-on-tertiary-container bg-tertiary-container/10 px-2 py-0.5 rounded-full inline-block">Excellent rythme !</p>
</div>
<div className="relative w-20 h-20">
<svg className="w-full h-full">
<circle className="text-outline-variant" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeWidth="6" />
<circle className="text-primary progress-ring" cx="40" cy="40" fill="transparent" r="32" stroke="currentColor" strokeDasharray="201.06" strokeDashoffset="64.34" strokeLinecap="round" strokeWidth="6" />
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
</div>
</div>

<div className="col-span-2 bg-primary p-5 rounded-xl text-on-primary flex flex-col gap-4 shadow-md relative overflow-hidden">
<div className="absolute top-0 right-0 w-32 h-32 bg-on-primary/10 rounded-bl-full -mr-8 -mt-8"></div>
<div className="z-10">
<p className="text-label-sm font-label-sm opacity-80 uppercase tracking-wider">Votre Focus du Jour</p>
<div className="flex items-center gap-3 mt-2">
<div className="w-12 h-12 rounded-full bg-on-primary/20 flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-[28px]">functions</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md">Mathématiques</h3>
<p className="text-label-sm opacity-90">Révision intensive : Algèbre Linéaire</p>
</div>
</div>
</div>
<div className="z-10 flex items-center justify-between mt-2">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-primary bg-on-primary/20 flex items-center justify-center text-[10px] font-bold">09:00</div>
</div>
<button className="bg-on-primary text-primary px-6 py-2 rounded-full text-label-sm font-bold flex items-center gap-2 active:scale-95 transition-transform">
      Commencer <span className="material-symbols-outlined text-[18px]">play_arrow</span>
</button>
</div>
</div>

<div className="col-span-2 bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm">
<div className="flex justify-between items-center mb-3">
<p className="text-label-sm font-label-sm text-on-surface-variant uppercase">Aperçu de la Semaine</p>
<span className="text-label-xs text-primary font-bold">12h prévues</span>
</div>
<div className="grid grid-cols-7 gap-1">
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant">L</span>
<div className="w-full h-8 bg-primary rounded-sm flex items-center justify-center"><span className="w-1.5 h-1.5 bg-on-primary rounded-full"></span></div>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant">M</span>
<div className="w-full h-8 bg-secondary-container/20 rounded-sm flex items-center justify-center"><span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span></div>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant">M</span>
<div className="w-full h-8 bg-tertiary-container/20 rounded-sm flex items-center justify-center"><span className="w-1.5 h-1.5 bg-tertiary-container rounded-full"></span></div>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant">J</span>
<div className="w-full h-8 bg-primary/20 rounded-sm flex items-center justify-center"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span></div>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant">V</span>
<div className="w-full h-8 bg-primary/20 rounded-sm flex items-center justify-center"><span className="w-1.5 h-1.5 bg-primary rounded-full"></span></div>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant">S</span>
<div className="w-full h-8 bg-secondary-container/20 rounded-sm flex items-center justify-center"><span className="w-1.5 h-1.5 bg-secondary-container rounded-full"></span></div>
</div>
<div className="flex flex-col items-center gap-1">
<span className="text-[10px] text-on-surface-variant text-primary font-bold">D</span>
<div className="w-full h-8 border border-dashed border-outline-variant rounded-sm"></div>
</div>
</div>
</div><button className="col-span-2 bento-card bg-surface-container-high border border-outline-variant p-4 rounded-xl flex items-center gap-4 group active:bg-inverse-surface active:text-inverse-on-surface transition-colors">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="text-left">
<p className="font-label-sm text-on-surface">Parler au Tuteur AI</p>
<p className="text-label-xs text-on-surface-variant">Une question sur un cours ?</p>
</div>
<span className="material-symbols-outlined ml-auto text-primary group-active:text-inverse-on-surface">chevron_right</span>
</button>
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
<div className="bg-secondary-container/10 border border-secondary-container/30 p-4 rounded-xl flex items-start gap-4 mb-8">
<div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary-container" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
</div>
<div>
<p className="font-label-sm text-on-secondary-container font-bold">Astuce du coach</p>
<p className="text-label-xs text-on-surface-variant mt-0.5">Commence par tes sessions de Maths le matin quand ton attention est à son maximum pour un impact optimal.</p>
</div>
</div></main>

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
