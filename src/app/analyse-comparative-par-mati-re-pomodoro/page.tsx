import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analyse par Matière - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background pb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex items-center justify-between px-4 h-16">
<div className="flex items-center gap-3">
<button className="w-10 h-10 flex items-center justify-center hover:bg-primary-container/20 transition-colors duration-200 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Analyse par Matière</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-012.png" alt="A clean, professional close-up portrait of a West African student smiling warmly, wearing a simple white polo shirt. The lighting is soft and natural, against a blurred library background. The image has a bright, high-contrast light-mode aesthetic consistent with a premium educational platform." />
</div>
</div>
</header>
<main className="mt-20 px-4 space-y-6 max-w-2xl mx-auto">

<section className="animate-fade-in bg-primary text-on-primary rounded-xl p-6 shadow-md relative overflow-hidden">
<div className="absolute -right-8 -top-8 w-32 h-32 bg-on-primary/10 rounded-full blur-2xl"></div>
<div className="relative z-10 flex flex-col items-center">
<span className="text-on-primary-container font-label text-label-sm uppercase tracking-wider">Temps Total de Focus</span>
<div className="font-headline text-5xl font-bold mt-1">42h 15m</div>

<div className="mt-6 bg-white/10 backdrop-blur-md rounded-xl p-4 flex gap-3 border border-white/20">
<span className="material-symbols-outlined text-secondary-container" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<p className="text-body-md leading-snug">
                        "Koffi, ton équilibre est excellent cette semaine. Cependant, n'oublie pas le Français pour garder tes chances de mention au BAC !"
                    </p>
</div>
</div>
</section>

<section className="animate-fade-in bg-white border border-outline-variant rounded-xl p-6 space-y-6">
<div className="flex justify-between items-center">
<h2 className="font-headline text-headline-md text-primary">Distribution par Temps</h2>
<span className="material-symbols-outlined text-outline">pie_chart</span>
</div>
<div className="flex flex-col space-y-4">

<div className="space-y-3">
<div className="space-y-1">
<div className="flex justify-between text-label-sm font-semibold">
<span>Mathématiques</span>
<span>38%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{"width":"38%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between text-label-sm font-semibold">
<span>Physique-Chimie</span>
<span>25%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary-container rounded-full" style={{"width":"25%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between text-label-sm font-semibold">
<span>SVT</span>
<span>20%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container rounded-full" style={{"width":"20%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between text-label-sm font-semibold text-on-surface-variant">
<span>Français</span>
<span>10%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-outline rounded-full" style={{"width":"10%"}}></div>
</div>
</div>
<div className="space-y-1">
<div className="flex justify-between text-label-sm font-semibold text-on-surface-variant">
<span>Autres</span>
<span>7%</span>
</div>
<div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-outline-variant rounded-full" style={{"width":"7%"}}></div>
</div>
</div>
</div>
</div>
</section>

<section className="animate-fade-in space-y-4">
<h2 className="font-headline text-headline-md text-primary px-2">Détails des Sessions</h2>
<div className="space-y-3">

<div className="bg-white border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-primary-fixed rounded-xl flex items-center justify-center">
<span className="material-symbols-outlined text-primary">functions</span>
</div>
<div>
<h3 className="font-bold text-body-lg">Mathématiques</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-label-sm">
<span>16h 04m</span>
<span className="w-1 h-1 bg-outline-variant rounded-full"></span>
<span>32 cycles</span>
</div>
</div>
</div>
<div className="bg-tertiary-container/10 text-tertiary-container px-3 py-1 rounded-full text-label-xs font-bold border border-tertiary-container/20">
                        EXCELLENT
                    </div>
</div>
<div className="bg-white border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-secondary-fixed rounded-xl flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">science</span>
</div>
<div>
<h3 className="font-bold text-body-lg">Physique-Chimie</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-label-sm">
<span>10h 30m</span>
<span className="w-1 h-1 bg-outline-variant rounded-full"></span>
<span>21 cycles</span>
</div>
</div>
</div>
<div className="bg-secondary-container/10 text-secondary-container px-3 py-1 rounded-full text-label-xs font-bold border border-secondary-container/20">
                        SÉRIEUX
                    </div>
</div>
<div className="bg-white border border-outline-variant rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-all duration-300">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant">history_edu</span>
</div>
<div>
<h3 className="font-bold text-body-lg">Français</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-label-sm">
<span>4h 15m</span>
<span className="w-1 h-1 bg-outline-variant rounded-full"></span>
<span>8 cycles</span>
</div>
</div>
</div>
<div className="bg-error-container/20 text-error px-3 py-1 rounded-full text-label-xs font-bold border border-error-container/30">
                        À RENFORCER
                    </div>
</div>
</div>
</section>

<section className="animate-fade-in bg-surface-container-low rounded-xl p-6 border-l-4 border-secondary-container">
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-on-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
</div>
<h2 className="font-headline text-headline-md text-on-secondary-container">Les Conseils de Kora</h2>
</div>
<div className="space-y-4">
<div className="p-4 bg-white rounded-lg border border-outline-variant">
<h4 className="font-bold text-tertiary-container flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-sm">check_circle</span>
                        Points Forts (Maîtrise)
                    </h4>
<p className="text-body-md text-on-surface-variant">
                        Tes sessions en <strong>Mathématiques</strong> sont les plus productives. Tu as atteint une régularité de 25min sans interruption. C'est parfait pour les chapitres d'Intégration.
                    </p>
</div>
<div className="p-4 bg-white rounded-lg border border-outline-variant">
<h4 className="font-bold text-error flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-sm">warning</span>
                        Points d'Attention (Négligé)
                    </h4>
<p className="text-body-md text-on-surface-variant">
                        Le <strong>Français</strong> et la <strong>Philosophie</strong> sont en dessous de tes objectifs hebdomadaires. Ces matières comptent pour un coefficient total de 6 au BAC D. Planifie une session Pomodoro de 2h demain matin.
                    </p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-surface shadow-md border-t border-outline-variant dark:border-outline flex justify-around items-center h-16 px-2 pb-safe">
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label text-label-xs">Examens</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">timer</span>
<span className="font-label text-label-xs">Pomodoro</span>
</button>
</nav>
<script>
        // Simple micro-interaction for cards
        document.querySelectorAll('.animate-fade-in').forEach((el, index) =&gt; &#123;
            el.style.animationDelay = `$&#123;index * 0.1&#125;s`;
        &#125;);
    </script>

    </div>
  );
}
