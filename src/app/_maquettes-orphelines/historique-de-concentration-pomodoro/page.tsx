import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Historique Pomodoro" };

export default function Page() {
  return (
    <div className="text-on-background min-h-screen flex flex-col pb-20 md:pb-0 md:pt-16" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex items-center justify-between px-4 h-16">
<div className="flex items-center gap-4">
<button className="hover:bg-primary-container/20 p-2 rounded-full transition-colors duration-200">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-semibold">Edukora</h1>
</div>
<div className="flex items-center gap-3">
<span className="hidden md:block font-label text-label-sm">Koffi Konan</span>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-188.png" alt="A professional headshot of a young West African student with a friendly expression, set against a blurred academic library background. The lighting is bright and natural, reinforcing the Edukora light-mode aesthetic. High resolution and clean composition." />
</div>
</div>
</header>
<main className="flex-1 max-w-5xl mx-auto w-full px-4 pt-20 md:pt-8 animate-in fade-in duration-700">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<h2 className="text-display-lg-mobile md:text-3xl font-bold text-primary">Historique de concentration</h2>
<p className="text-on-surface-variant mt-1">Suivez vos progrès et restez discipliné pour le BAC.</p>
</div>
<div className="flex gap-2">
<button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined">timer</span>
                    Nouveau Pomodoro
                </button>
<button className="bg-surface-container-high text-primary px-4 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined">insights</span>
                    Analyses
                </button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
<div className="bg-primary text-on-primary p-6 rounded-xl flex flex-col justify-between min-h-[160px] shadow-sm relative overflow-hidden">
<div className="z-10">
<span className="text-on-primary/80 font-label text-label-sm uppercase tracking-wider">Temps total focalisé</span>
<div className="text-4xl font-bold mt-2">42h <span className="text-xl font-normal opacity-70">15m</span></div>
</div>
<div className="z-10 flex items-center gap-1 text-tertiary-fixed font-semibold">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span>+12% vs mois dernier</span>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10 rotate-12">schedule</span>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between min-h-[160px]">
<div>
<span className="text-on-surface-variant font-label text-label-sm uppercase tracking-wider">Session Moyenne / Jour</span>
<div className="text-3xl font-bold text-on-surface mt-2">3h 15m</div>
</div>
<div className="w-full bg-surface-container rounded-full h-2 mt-4 overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{"width":"75%"}}></div>
</div>
<p className="text-on-surface-variant text-label-xs mt-2">Objectif: 4h / jour</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col justify-between min-h-[160px]">
<div>
<span className="text-on-surface-variant font-label text-label-sm uppercase tracking-wider">Série actuelle</span>
<div className="text-3xl font-bold text-on-surface mt-2 flex items-center gap-2">
                        12 jours
                        <span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
</div>
</div>
<div className="flex gap-1 mt-4">
<div className="w-full h-8 bg-tertiary-container/30 rounded flex items-center justify-center text-tertiary-container"><span className="material-symbols-outlined text-sm">check_circle</span></div>
<div className="w-full h-8 bg-tertiary-container/30 rounded flex items-center justify-center text-tertiary-container"><span className="material-symbols-outlined text-sm">check_circle</span></div>
<div className="w-full h-8 bg-tertiary-container/30 rounded flex items-center justify-center text-tertiary-container"><span className="material-symbols-outlined text-sm">check_circle</span></div>
<div className="w-full h-8 bg-tertiary-container/30 rounded flex items-center justify-center text-tertiary-container"><span className="material-symbols-outlined text-sm">check_circle</span></div>
<div className="w-full h-8 bg-surface-container rounded"></div>
<div className="w-full h-8 bg-surface-container rounded"></div>
<div className="w-full h-8 bg-surface-container rounded"></div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">

<div className="lg:col-span-3 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-bold">Activité de la semaine</h3>
<div className="flex items-center gap-2 text-label-xs text-on-surface-variant">
<span className="w-3 h-3 bg-primary rounded-sm"></span> Heures d'étude
                    </div>
</div>
<div className="h-64 flex items-end justify-between gap-2 px-2">

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">4.2h</div>
<div className="w-full bg-primary/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[60%]">
<div className="absolute bottom-0 w-full bg-primary h-full"></div>
</div>
<span className="text-label-xs font-semibold">LUN</span>
</div>

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">3.5h</div>
<div className="w-full bg-primary/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[50%]">
<div className="absolute bottom-0 w-full bg-primary h-full"></div>
</div>
<span className="text-label-xs font-semibold text-primary">MAR</span>
</div>

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">5.8h</div>
<div className="w-full bg-primary/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[85%]">
<div className="absolute bottom-0 w-full bg-primary h-full"></div>
</div>
<span className="text-label-xs font-semibold">MER</span>
</div>

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">2.1h</div>
<div className="w-full bg-primary/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[30%]">
<div className="absolute bottom-0 w-full bg-primary h-full"></div>
</div>
<span className="text-label-xs font-semibold">JEU</span>
</div>

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">4.9h</div>
<div className="w-full bg-primary/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[70%]">
<div className="absolute bottom-0 w-full bg-primary h-full"></div>
</div>
<span className="text-label-xs font-semibold">VEN</span>
</div>

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">6.2h</div>
<div className="w-full bg-secondary-container/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[90%]">
<div className="absolute bottom-0 w-full bg-secondary-container h-full"></div>
</div>
<span className="text-label-xs font-semibold">SAM</span>
</div>

<div className="flex flex-col items-center gap-2 w-full group">
<div className="text-label-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">1.5h</div>
<div className="w-full bg-primary/20 rounded-t-md relative chart-bar-animation overflow-hidden h-[20%]">
<div className="absolute bottom-0 w-full bg-primary h-full"></div>
</div>
<span className="text-label-xs font-semibold">DIM</span>
</div>
</div>
</div>

<div className="lg:col-span-2 space-y-4">
<h3 className="text-lg font-bold px-1">Dernières Sessions</h3>
<div className="space-y-3 custom-scrollbar overflow-y-auto max-h-[400px] pr-2">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl hover:border-primary transition-colors cursor-pointer">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="bg-primary/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-primary">functions</span>
</div>
<div>
<div className="font-bold text-on-surface">Mathématiques</div>
<div className="text-label-xs text-on-surface-variant">Hier, 14:30 - 17:00</div>
</div>
</div>
<div className="bg-tertiary-container/20 text-tertiary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Complet</div>
</div>
<div className="mt-4 flex items-center justify-between text-label-xs">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">history</span>
                                2h 30m (5 cycles)
                            </div>
<div className="flex items-center gap-1 text-secondary font-bold">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
                                High Focus
                            </div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl hover:border-primary transition-colors cursor-pointer">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="bg-primary/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-primary">biotech</span>
</div>
<div>
<div className="font-bold text-on-surface">Physique-Chimie</div>
<div className="text-label-xs text-on-surface-variant">12 Mai, 09:15 - 10:45</div>
</div>
</div>
<div className="bg-secondary-container/20 text-secondary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Interrompu</div>
</div>
<div className="mt-4 flex items-center justify-between text-label-xs">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">history</span>
                                1h 30m (3 cycles)
                            </div>
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">low_priority</span>
                                Modéré
                            </div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl hover:border-primary transition-colors cursor-pointer opacity-80">
<div className="flex items-start justify-between">
<div className="flex items-center gap-3">
<div className="bg-primary/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-primary">menu_book</span>
</div>
<div>
<div className="font-bold text-on-surface">Philosophie</div>
<div className="text-label-xs text-on-surface-variant">11 Mai, 16:00 - 17:30</div>
</div>
</div>
<div className="bg-tertiary-container/20 text-tertiary px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Complet</div>
</div>
<div className="mt-4 flex items-center justify-between text-label-xs">
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">history</span>
                                1h 30m (3 cycles)
                            </div>
<div className="flex items-center gap-1 text-secondary font-bold">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
                                Focus Intense
                            </div>
</div>
</div>
</div>
<button className="w-full py-3 text-primary font-bold text-label-sm border border-primary/20 rounded-xl hover:bg-primary/5 transition-colors">
                    Voir toutes les sessions
                </button>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface dark:bg-on-surface shadow-md flex justify-around items-center h-16 px-2 pb-safe border-t border-outline-variant dark:border-outline rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label text-label-xs">Examens</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">timer</span>
<span className="font-label text-label-xs">Pomodoro</span>
</a>
</nav>

<aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container border-r border-outline-variant flex-col p-4">
<div className="flex items-center gap-3 p-4 mb-8 bg-surface-container-highest rounded-xl">
<div className="w-12 h-12 rounded-full border-2 border-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-189.png" alt="A close up portrait of a young male African student, smiling warmly, wearing a clean white polo shirt. The lighting is bright and airy, and the image focus is sharp on his features. Soft bokeh background with hint of school flags." />
</div>
<div>
<p className="font-bold text-on-surface">Koffi Konan</p>
<p className="text-xs text-on-surface-variant">BAC D - 2024</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
<span className="font-medium">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">event_note</span>
<span className="font-medium">Planning</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg bg-primary-container text-on-primary-container font-semibold transition-all" href="#">
<span className="material-symbols-outlined">timer</span>
<span className="font-medium">Sessions Focus</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">bar_chart</span>
<span className="font-medium">Statistiques</span>
</a>
<div className="pt-4 mt-4 border-t border-outline-variant">
<a className="flex items-center gap-3 p-3 rounded-lg text-on-surface-variant hover:bg-surface-container-highest transition-all group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">settings</span>
<span className="font-medium">Paramètres</span>
</a>
<a className="flex items-center gap-3 p-3 rounded-lg text-error hover:bg-error-container/20 transition-all" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-medium">Déconnexion</span>
</a>
</div>
</nav>
</aside>
<script>
        // Micro-interaction for bar charts
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const bars = document.querySelectorAll('.chart-bar-animation div');
            bars.forEach(bar =&gt; &#123;
                const finalHeight = bar.parentElement.style.height;
                bar.style.height = '0';
                setTimeout(() =&gt; &#123;
                    bar.style.height = '100%';
                &#125;, 300);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
