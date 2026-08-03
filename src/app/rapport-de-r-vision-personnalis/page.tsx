import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rapport de Révision - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 z-50 bg-surface dark:bg-background border-b border-outline-variant dark:border-outline h-16 flex items-center">
<div className="flex justify-between items-center px-4 w-full max-w-screen-xl mx-auto">
<div className="flex items-center gap-3">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-150 text-primary">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Rapport de Révision</h1>
</div>
<div className="flex items-center gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-150 text-on-surface-variant">
<span className="material-symbols-outlined">settings</span>
</button>
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-307.png" alt="A portrait of a young Ivorian student with a confident and friendly expression, wearing a simple navy blue polo shirt. The background is a soft, out-of-focus academic setting with bright, natural light filtering through windows. The overall aesthetic is professional, clean, and optimistic, matching the Edukora corporate identity." />
</div>
</div>
</div>
</header>
<main className="max-w-screen-md mx-auto px-4 pt-6 pb-24">

<section className="mb-8">
<div className="glass-card rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
<div className="relative w-48 h-48 mb-4">

<svg className="w-full h-full">
<circle className="text-surface-container-highest" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="12" />
<circle className="progress-ring-circle text-secondary-container" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeDasharray="553" strokeDashoffset="121.6" strokeLinecap="round" strokeWidth="12" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-5xl font-extrabold text-primary font-headline">78%</span>
</div>
</div>
<h2 className="text-xl font-bold text-on-surface font-headline mb-1">Niveau de préparation global</h2>
<p className="text-on-surface-variant text-sm max-w-xs">Tu es en bonne voie pour ton examen ! Continue tes efforts sur les matières cibles.</p>
</div>
</section>

<section className="mb-8">
<div className="bg-primary text-on-primary rounded-xl p-5 relative overflow-hidden flex items-start gap-4 border-l-4 border-secondary-container">
<div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
<span className="material-symbols-outlined text-white" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="relative z-10">
<h3 className="font-headline font-bold text-lg mb-1 flex items-center gap-2">
                        Tuteur Kora 
                        <span className="text-[10px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded uppercase font-bold tracking-wider">Conseil IA</span>
</h3>
<p className="text-on-primary-container font-medium leading-relaxed">
                        "Tes axes d'effort prioritaires : <span className="underline decoration-secondary-container decoration-2 underline-offset-2">La Physique-Chimie et le Français</span>. Je te suggère de refaire le quiz sur les lois de Newton."
                    </p>
</div>

<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-secondary-container/20 rounded-full blur-2xl"></div>
</div>
</section>

<section className="mb-10">
<h2 className="font-headline text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">analytics</span>
                Performance par matière
            </h2>
<div className="space-y-4">

<div className="glass-card p-4 rounded-xl">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-lg">calculate</span>
</div>
<span className="font-semibold text-on-surface">Mathématiques</span>
</div>
<span className="text-primary font-bold">85%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full" style={{"width":"85%"}}></div>
</div>
</div>

<div className="glass-card p-4 rounded-xl">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-lg">menu_book</span>
</div>
<span className="font-semibold text-on-surface">Français</span>
</div>
<span className="text-primary font-bold">62%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary-container rounded-full" style={{"width":"62%"}}></div>
</div>
</div>

<div className="glass-card p-4 rounded-xl border-error/20 bg-error-container/5">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-lg">science</span>
</div>
<span className="font-semibold text-on-surface">Physique-Chimie</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-error text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
<span className="text-error font-bold">45%</span>
</div>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-error rounded-full" style={{"width":"45%"}}></div>
</div>
</div>

<div className="glass-card p-4 rounded-xl">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-lg">eco</span>
</div>
<span className="font-semibold text-on-surface">SVT</span>
</div>
<span className="text-primary font-bold">90%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full" style={{"width":"90%"}}></div>
</div>
</div>

<div className="glass-card p-4 rounded-xl">
<div className="flex justify-between items-center mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-lg">language</span>
</div>
<span className="font-semibold text-on-surface">Allemand (Option)</span>
</div>
<span className="text-primary font-bold">70%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{"width":"70%"}}></div>
</div>
</div>
</div>
</section>

<section className="flex flex-col gap-3">
<button className="w-full h-12 flex items-center justify-center gap-2 bg-secondary-container text-on-secondary-container font-bold rounded-xl active:scale-95 transition-transform shadow-md">
<span className="material-symbols-outlined">calendar_today</span>
                Générer un planning de révision
            </button>
<button className="w-full h-12 flex items-center justify-center gap-2 bg-surface-container-high text-primary font-bold rounded-xl active:scale-95 transition-transform border border-outline-variant">
<span className="material-symbols-outlined">share</span>
                Partager mon rapport
            </button>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface shadow-[0_-1px_4px_rgba(0,50,125,0.1)] h-16 flex justify-around items-center px-2 pb-safe">

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-xl px-3 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Simple entry animation for progress items
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const bars = document.querySelectorAll('.h-full');
            bars.forEach(bar =&gt; &#123;
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() =&gt; &#123;
                    bar.style.transition = 'width 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    bar.style.width = targetWidth;
                &#125;, 300);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
