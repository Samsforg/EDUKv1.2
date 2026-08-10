import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Prévisualisation Quiz" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center w-full px-4 py-3 sticky top-0 z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container border-b border-outline-variant shadow-md">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
<h1 className="font-headline text-headline-md font-semibold">Prévisualisation Quiz</h1>
</div>
<button className="bg-error px-4 py-1.5 rounded-xl font-label text-label-sm text-on-error hover:bg-on-error-container transition-colors active:scale-95 duration-200">
            Quitter le test
        </button>
</header>
<main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 mb-24">

<div className="flex flex-wrap items-center justify-between gap-4 mb-8">
<div className="flex items-center gap-2">
<span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label text-label-sm font-bold tracking-wider animate-pulse">
<span className="material-symbols-outlined text-[16px] mr-1" data-icon="terminal">terminal</span>
                    MODE TEST
                </span>
</div>
<div className="flex items-center gap-4 bg-surface-container-high px-4 py-2 rounded-xl">
<div className="flex flex-col items-end">
<span className="text-label-xs text-on-surface-variant uppercase font-bold">Temps restant</span>
<span className="font-headline font-bold text-primary" id="timer">18:45</span>
</div>
<span className="material-symbols-outlined text-primary" data-icon="timer">timer</span>
</div>
</div>

<div className="mb-8">
<div className="flex justify-between items-end mb-2">
<h2 className="font-headline text-2xl font-bold text-on-surface">Question 1 sur 12</h2>
<span className="text-label-sm font-medium text-on-surface-variant">Intégrales et Primitives</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[8.33%] rounded-full transition-all duration-500"></div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<div className="md:col-span-12 glass-card p-6 rounded-xl shadow-sm border-l-4 border-l-primary">
<p className="text-body-lg text-on-surface mb-6 leading-relaxed">
                    Calculer l'intégrale suivante sur l'intervalle donné :
                </p>
<div className="bg-surface-container-low p-8 rounded-lg flex justify-center items-center mb-6">
<div className="text-3xl font-serif math-font text-primary-container">
                        I = ∫<sub>0</sub><sup>1</sup> (3x<sup>2</sup> - 2x + 1) dx
                    </div>
</div>
<p className="text-on-surface-variant font-medium italic">
                    Astuce : Identifiez d'abord une primitive de la fonction f(x) = 3x² - 2x + 1.
                </p>
</div>

<div className="md:col-span-8 flex flex-col gap-4">
<label className="group relative flex items-center p-4 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-fixed cursor-pointer transition-all active:scale-[0.98]">
<input className="w-5 h-5 text-primary border-outline focus:ring-primary" name="quiz_option" type="radio" />
<span className="ml-4 text-body-md font-medium text-on-surface">I = 1</span>
</label>
<label className="group relative flex items-center p-4 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-fixed cursor-pointer transition-all active:scale-[0.98]">
<input className="w-5 h-5 text-primary border-outline focus:ring-primary" name="quiz_option" type="radio" />
<span className="ml-4 text-body-md font-medium text-on-surface">I = 2</span>
</label>
<label className="group relative flex items-center p-4 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-fixed cursor-pointer transition-all active:scale-[0.98]">
<input className="w-5 h-5 text-primary border-outline focus:ring-primary" name="quiz_option" type="radio" />
<span className="ml-4 text-body-md font-medium text-on-surface">I = 0</span>
</label>
<label className="group relative flex items-center p-4 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-primary-fixed cursor-pointer transition-all active:scale-[0.98]">
<input className="w-5 h-5 text-primary border-outline focus:ring-primary" name="quiz_option" type="radio" />
<span className="ml-4 text-body-md font-medium text-on-surface">I = 1.5</span>
</label>
</div>

<div className="md:col-span-4 flex flex-col gap-4">
<div className="aspect-square rounded-xl overflow-hidden relative shadow-inner">
<img className="w-full h-full object-cover" src="/images/ecran-287.png" alt="A clean, professional 3D educational illustration of a mathematical graph showing the area under a curve. The curve is a simple parabola, with the area between x equals zero and x equals one highlighted in a soft semi-transparent academic blue. The background is a crisp white grid. The style is modern, minimalist, and uses a light-mode color palette of white, slate grey, and academic blue to maintain a serious yet accessible educational tone." />
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
<div className="absolute bottom-3 left-3 text-white font-label text-label-xs font-bold">REPRÉSENTATION VISUELLE</div>
</div>
<button className="w-full py-4 bg-secondary-container text-on-secondary-container font-headline font-bold rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                    Question Suivante
                    <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-surface-container-low border-t border-surface-container shadow-lg rounded-t-xl">
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1 transition-all">
<span className="material-symbols-outlined" data-icon="play_circle" style={{"fontVariationSettings":"'FILL' 1"}}>play_circle</span>
<span className="font-label text-label-sm">Aperçu</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-all px-4 py-1 rounded-lg">
<span className="material-symbols-outlined" data-icon="list_alt">list_alt</span>
<span className="font-label text-label-sm">Questions</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-highest transition-all px-4 py-1 rounded-lg">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span className="font-label text-label-sm">Score</span>
</div>
</nav>
<script>
        // Simple countdown logic for the simulated test
        let timeLeft = 18 * 60 + 45;
        const timerElement = document.getElementById('timer');

        setInterval(() =&gt; &#123;
            if (timeLeft &gt; 0) &#123;
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerElement.textContent = `$&#123;minutes&#125;:$&#123;seconds.toString().padStart(2, '0')&#125;`;
            &#125;
        &#125;, 1000);

        // Interaction for radio choices
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio =&gt; &#123;
            radio.addEventListener('change', (e) =&gt; &#123;
                radios.forEach(r =&gt; r.parentElement.classList.remove('bg-primary-fixed', 'border-primary'));
                if (e.target.checked) &#123;
                    e.target.parentElement.classList.add('bg-primary-fixed', 'border-primary');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
