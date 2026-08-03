import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Onboarding Exam Simulator" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full max-w-md mx-auto sticky top-0 bg-surface z-40 flex justify-between items-center px-4 py-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-[28px]" data-icon="school">school</span>
<span className="font-headline text-[20px] font-bold text-primary tracking-tight">Edukora</span>
</div>
<button className="text-on-surface-variant font-label text-label-sm font-semibold hover:opacity-80 transition-opacity">Passer</button>
</header>
<main className="flex-1 w-full max-w-md mx-auto flex flex-col px-6 pb-20 mt-4">

<div className="relative w-full aspect-[4/5] rounded-xl bg-surface-container-low overflow-hidden mb-8 border border-outline-variant shadow-sm flex flex-col">

<div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
<div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-container/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

<div className="relative z-10 flex flex-col h-full p-6">

<div className="flex justify-between items-center mb-6">
<div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-outline-variant shadow-sm">
<span className="material-symbols-outlined text-secondary text-sm" data-icon="timer">timer</span>
<span className="text-label-xs font-bold text-on-surface">14:59</span>
</div>
<div className="flex items-center gap-1">
<div className="h-1.5 w-12 bg-tertiary rounded-full"></div>
<div className="h-1.5 w-8 bg-outline-variant rounded-full"></div>
</div>
</div>

<div className="flex-1 flex items-center justify-center">
<div className="w-full max-w-[280px] bg-white rounded-xl border border-outline shadow-xl p-5 transform -rotate-2">
<div className="space-y-4">

<div className="flex items-start gap-3">
<div className="bg-primary-container text-white p-2 rounded-lg shrink-0">
<span className="material-symbols-outlined" data-icon="terminal">terminal</span>
</div>
<div>
<p className="text-label-xs font-semibold text-primary uppercase tracking-wider">Physique-Chimie</p>
<h4 className="text-body-md font-bold text-on-surface mt-1">L'unité de la force est...</h4>
</div>
</div>

<div className="space-y-2 pt-2">
<div className="p-3 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-center gap-3">
<div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
<span className="text-label-sm font-medium">Le Pascal</span>
</div>
<div className="p-3 rounded-lg border-2 border-primary bg-primary-container/5 flex items-center gap-3">
<div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
<div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
</div>
<span className="text-label-sm font-bold text-primary">Le Newton</span>
</div>
<div className="p-3 rounded-lg border border-outline-variant bg-surface-container-lowest flex items-center gap-3">
<div className="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
<span className="text-label-sm font-medium">Le Joule</span>
</div>
</div>
</div>
</div>
</div>

<div className="mt-auto self-center bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-full flex items-center gap-2 shadow-lg translate-y-3">
<span className="material-symbols-outlined text-tertiary-fixed" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="text-label-xs font-semibold">Correction détaillée instantanée</span>
</div>
</div>
</div>

<div className="space-y-4">
<h1 className="text-display-lg-mobile md:text-display-lg text-on-surface font-bold leading-tight">
                Prépare-toi avec le <span className="text-primary">Simulateur</span>
</h1>
<p className="text-body-md text-on-surface-variant">
                Entraîne-toi dans les conditions réelles de l'examen avec nos sessions chronométrées et nos corrections détaillées.
            </p>
</div>

<div className="mt-8 p-4 rounded-xl bg-surface-container border border-outline-variant flex items-center gap-4 transition-all hover:shadow-md feature-card-hover">
<div className="bg-secondary p-3 rounded-xl shadow-inner">
<span className="material-symbols-outlined text-white" data-icon="history_edu">history_edu</span>
</div>
<div>
<p className="text-body-md font-bold text-on-surface">Plus de 500 épreuves types</p>
<p className="text-label-xs text-on-surface-variant">Pour maîtriser chaque sujet du programme.</p>
</div>
</div>
</main>

<footer className="fixed bottom-0 w-full max-w-md mx-auto bg-surface/80 backdrop-blur-md px-6 py-6 border-t border-outline-variant z-50">
<div className="flex items-center justify-between gap-6">

<div className="flex gap-2">
<div className="h-1.5 step-inactive rounded-full"></div>
<div className="h-1.5 step-inactive rounded-full"></div>
<div className="h-1.5 step-active rounded-full transition-all duration-300"></div>
<div className="h-1.5 step-inactive rounded-full"></div>
</div>

<button className="bg-secondary-container hover:bg-secondary text-white font-label text-label-sm font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-secondary-container/20 transition-all flex items-center gap-2 btn-hover">
                Suivant
                <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</footer>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const btn = document.querySelector('.btn-hover');
            btn.addEventListener('click', () =&gt; &#123;
                // Future transition logic could go here
                console.log('Transitioning to the next onboarding screen...');
            &#125;);

            // Micro-animation for the timer (visual only)
            let seconds = 59;
            const timerSpan = document.querySelector('.text-on-surface.font-bold');
            if (timerSpan) &#123;
                setInterval(() =&gt; &#123;
                    seconds--;
                    if (seconds &lt; 0) seconds = 59;
                    timerSpan.innerText = `14:$&#123;seconds &lt; 10 ? '0' + seconds : seconds&#125;`;
                &#125;, 1000);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
