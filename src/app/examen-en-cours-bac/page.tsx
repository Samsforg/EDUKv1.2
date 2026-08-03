import type { Metadata } from "next";

export const metadata: Metadata = { title: "EduKora BAC - Session d'Examen" };

export default function Page() {
  return (
    <div className="font-body-md text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface sticky top-0 w-full z-50 px-margin-mobile md:px-margin-desktop h-16 flex justify-between items-center border-b border-outline-variant">
<div className="flex items-center gap-3">
<button className="p-2 -ml-2 rounded-full hover:bg-surface-container-low active:scale-95 transition-all">
<span className="material-symbols-outlined text-primary">close</span>
</button>
<div>
<h1 className="font-headline-md text-headline-md text-primary leading-tight">Mathématiques</h1>
<p className="text-label-xs font-label-xs text-on-surface-variant uppercase tracking-wider">Session BAC Blanc</p>
</div>
</div>
<div className="flex items-center gap-4">

<div className="flex items-center gap-2 bg-error-container text-on-error-container px-3 py-1.5 rounded-xl border border-error/20" id="exam-timer">
<span className="material-symbols-outlined text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>timer</span>
<span className="font-label-sm text-label-sm font-bold tabular-nums">01:42:15</span>
</div>
</div>
</header>

<div className="w-full bg-surface-container-low px-margin-mobile md:px-margin-desktop py-4 flex flex-col gap-2">
<div className="flex justify-between items-end mb-1">
<span className="font-label-sm text-label-sm text-primary font-bold">Question 4 sur 20</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">20% complété</span>
</div>
<div className="h-2 w-full bg-outline-variant rounded-full overflow-hidden">
<div className="h-full bg-primary w-1/5 rounded-full transition-all duration-500 ease-out"></div>
</div>
</div>

<main className="flex-grow flex flex-col max-w-3xl mx-auto w-full px-margin-mobile py-stack-lg gap-stack-lg">

<section className="bg-surface p-6 rounded-xl border border-outline-variant focus-mode-shadow">
<h2 className="font-headline-md text-headline-md text-on-surface mb-6">
                Soit la fonction f définie sur ℝ par f(x) = 2x² - 4x + 1. Quel est l'extremum de cette fonction sur son domaine de définition ?
            </h2>

<div className="mb-6 rounded-lg overflow-hidden border border-outline-variant aspect-video relative group">
<img className="w-full h-full object-cover" src="/images/ecran-139.png" alt="A clean, minimalist mathematical graph plotted on a coordinate plane, showing a parabolic curve in deep academic blue. The background is a subtle grid on a light grey surface, reflecting a professional education portal style. High contrast labels and clear axes in black provide an institutional and authoritative look for high school students." />
<div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors"></div>
</div>
</section>

<section className="flex flex-col gap-3">
<label className="answer-card relative flex items-center p-4 rounded-xl border-2 border-outline-variant cursor-pointer bg-surface hover:bg-surface-container-low transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-fixed">
<input className="hidden peer" name="exam_choice" type="radio" />
<span className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center font-bold text-label-sm text-on-surface-variant peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary mr-4">A</span>
<span className="font-body-md text-body-md text-on-surface">L'extremum est un minimum égal à -1 pour x = 1.</span>
<span className="material-symbols-outlined ml-auto text-primary opacity-0 peer-checked:opacity-100">check_circle</span>
</label>
<label className="answer-card relative flex items-center p-4 rounded-xl border-2 border-outline-variant cursor-pointer bg-surface hover:bg-surface-container-low transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-fixed">
<input className="hidden peer" name="exam_choice" type="radio" />
<span className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center font-bold text-label-sm text-on-surface-variant peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary mr-4">B</span>
<span className="font-body-md text-body-md text-on-surface">L'extremum est un maximum égal à 1 pour x = 2.</span>
<span className="material-symbols-outlined ml-auto text-primary opacity-0 peer-checked:opacity-100">check_circle</span>
</label>
<label className="answer-card relative flex items-center p-4 rounded-xl border-2 border-outline-variant cursor-pointer bg-surface hover:bg-surface-container-low transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-fixed">
<input className="hidden peer" name="exam_choice" type="radio" />
<span className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center font-bold text-label-sm text-on-surface-variant peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary mr-4">C</span>
<span className="font-body-md text-body-md text-on-surface">L'extremum est un minimum égal à 3 pour x = 0.</span>
<span className="material-symbols-outlined ml-auto text-primary opacity-0 peer-checked:opacity-100">check_circle</span>
</label>
<label className="answer-card relative flex items-center p-4 rounded-xl border-2 border-outline-variant cursor-pointer bg-surface hover:bg-surface-container-low transition-all has-[:checked]:border-primary has-[:checked]:bg-primary-fixed">
<input className="hidden peer" name="exam_choice" type="radio" />
<span className="w-8 h-8 rounded-full border-2 border-outline flex items-center justify-center font-bold text-label-sm text-on-surface-variant peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary mr-4">D</span>
<span className="font-body-md text-body-md text-on-surface">La fonction n'admet aucun extremum sur ℝ.</span>
<span className="material-symbols-outlined ml-auto text-primary opacity-0 peer-checked:opacity-100">check_circle</span>
</label>
</section>

<div className="mt-4 p-4 rounded-xl bg-tertiary-container/10 border border-tertiary/20 flex items-start gap-4">
<span className="material-symbols-outlined text-tertiary-container mt-1" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
<div>
<p className="font-label-sm text-label-sm text-tertiary-container font-bold mb-1">Besoin d'un indice ?</p>
<p className="text-label-sm text-on-surface-variant leading-relaxed">Pensez à utiliser la formule du sommet pour une parabole : x = -b / (2a).</p>
</div>
<button className="ml-auto p-2 bg-white rounded-full shadow-sm active:scale-95 transition-transform">
<span className="material-symbols-outlined text-tertiary-container">auto_awesome</span>
</button>
</div>
</main>

<footer className="sticky bottom-0 w-full bg-surface-container-lowest p-margin-mobile md:px-margin-desktop md:py-6 border-t border-outline-variant flex justify-between items-center gap-4 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
<button className="flex-1 max-w-[160px] flex items-center justify-center gap-2 h-12 rounded-xl border border-outline-variant text-on-surface-variant font-bold hover:bg-surface-container-low transition-colors active:scale-95">
<span className="material-symbols-outlined">chevron_left</span>
            Précédent
        </button>
<div className="hidden md:flex gap-2">
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary border border-primary/20 hover:bg-primary-container/20">1</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary border border-primary/20 hover:bg-primary-container/20">2</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary border border-primary/20 hover:bg-primary-container/20">3</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold">4</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant border border-outline-variant hover:bg-surface-container-low">...</button>
</div>
<button className="flex-1 max-w-[160px] flex items-center justify-center gap-2 h-12 rounded-xl bg-secondary text-on-secondary font-bold hover:opacity-90 transition-all active:scale-95 shadow-sm">
            Suivant
            <span className="material-symbols-outlined">chevron_right</span>
</button>
</footer>

<script>
        document.querySelectorAll('.answer-card').forEach(card =&gt; &#123;
            card.addEventListener('click', () =&gt; &#123;
                // Focus ring logic could be added here for non-native radio behavior if needed
            &#125;);
        &#125;);

        // Simple Timer Countdown Logic
        let seconds = 3600 + 42 * 60 + 15;
        const timerElement = document.querySelector('#exam-timer span:last-child');
        
        function updateTimer() &#123;
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;
            
            timerElement.textContent = [h, m, s]
                .map(v =&gt; v &lt; 10 ? "0" + v : v)
                .join(":");
            
            if (seconds &gt; 0) seconds--;
        &#125;
        
        setInterval(updateTimer, 1000);
    </script>

    </div>
  );
}
