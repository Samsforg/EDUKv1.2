import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Session Express" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<div className="fixed top-0 left-0 w-full h-1.5 bg-surface-container-high z-[60]">
<div className="progress-fill h-full bg-secondary-container w-[0%]" id="progressBar"></div>
</div>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-mobile h-16">
<button aria-label="Fermer la session" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-on-surface-variant">close</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Session Express : Maths</h1>
<div className="w-10"></div> 
</header>

<main className="flex-grow pt-20 pb-24 px-margin-mobile max-w-2xl mx-auto w-full">

<section className="mb-stack-lg">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex items-center gap-4 shadow-sm">
<div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>functions</span>
</div>
<div>
<span className="font-label-xs text-label-xs text-secondary-container uppercase tracking-wider">Sujet du jour</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Mathématiques : Intégrales</h2>
</div>
</div>
</section>

<section className="mb-stack-lg">
<div className="bg-surface-container-low rounded-xl p-stack-lg min-h-[160px] flex flex-col justify-center border-l-4 border-primary">
<span className="font-label-sm text-label-sm text-on-surface-variant mb-2">Question 1 de 3</span>
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                    Calculez l'intégrale de <strong className="font-bold">f(x) = 2x</strong> entre <strong className="font-bold">0</strong> et <strong className="font-bold">2</strong>.
                </p>
</div>
</section>

<section className="grid grid-cols-1 gap-stack-md">
<button className="option-btn group bg-surface border border-outline-variant rounded-xl p-stack-md flex items-center gap-4 transition-all active:scale-[0.98] hover:bg-surface-container-low text-left">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary group-[.option-selected]:bg-primary group-[.option-selected]:text-on-primary transition-colors">A</div>
<span className="font-body-md text-body-md text-on-surface">2</span>
</button>
<button className="option-btn group bg-surface border border-outline-variant rounded-xl p-stack-md flex items-center gap-4 transition-all active:scale-[0.98] hover:bg-surface-container-low text-left">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary group-[.option-selected]:bg-primary group-[.option-selected]:text-on-primary transition-colors">B</div>
<span className="font-body-md text-body-md text-on-surface">4</span>
</button>
<button className="option-btn group bg-surface border border-outline-variant rounded-xl p-stack-md flex items-center gap-4 transition-all active:scale-[0.98] hover:bg-surface-container-low text-left">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary group-[.option-selected]:bg-primary group-[.option-selected]:text-on-primary transition-colors">C</div>
<span className="font-body-md text-body-md text-on-surface">6</span>
</button>
<button className="option-btn group bg-surface border border-outline-variant rounded-xl p-stack-md flex items-center gap-4 transition-all active:scale-[0.98] hover:bg-surface-container-low text-left">
<div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary group-[.option-selected]:bg-primary group-[.option-selected]:text-on-primary transition-colors">D</div>
<span className="font-body-md text-body-md text-on-surface">8</span>
</button>
</section>
</main>

<footer className="fixed bottom-0 w-full bg-surface dark:bg-on-background shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-margin-mobile py-4 flex items-center justify-center z-50">
<button className="w-full max-w-2xl h-14 rounded-full bg-outline-variant text-on-surface-variant font-bold text-body-lg flex items-center justify-center gap-2 transition-all duration-300 disabled:cursor-not-allowed" disabled={true} id="validateBtn">
<span>Valider</span>
<span className="material-symbols-outlined">arrow_forward</span>
</button>
</footer>

<div className="fixed top-24 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
<div className="fixed bottom-32 -right-12 w-48 h-48 bg-secondary-container/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
<script>
        let selectedElement = null;

        function selectOption(el) &#123;
            // Clear previous selection
            const buttons = document.querySelectorAll('.option-btn');
            buttons.forEach(btn =&gt; btn.classList.remove('option-selected', 'ring-2', 'ring-primary'));
            
            // Set new selection
            el.classList.add('option-selected', 'ring-2', 'ring-primary');
            selectedElement = el;

            // Enable "Valider" button
            const validateBtn = document.getElementById('validateBtn');
            validateBtn.disabled = false;
            validateBtn.classList.remove('bg-outline-variant', 'text-on-surface-variant');
            validateBtn.classList.add('bg-secondary-container', 'text-on-secondary-container', 'hover:opacity-90', 'active:scale-95');
        &#125;

        // Simple validation feedback logic
        const validateBtn = document.getElementById('validateBtn');
        validateBtn.addEventListener('click', () =&gt; &#123;
            if (!selectedElement) return;

            const isCorrect = selectedElement.innerText.includes('B'); // B is 4, which is correct for 2x integrated from 0 to 2
            
            if (isCorrect) &#123;
                selectedElement.classList.add('bg-tertiary-fixed', 'border-tertiary');
                validateBtn.innerText = "Correct !";
                validateBtn.classList.replace('bg-secondary-container', 'bg-tertiary');
                validateBtn.classList.replace('text-on-secondary-container', 'text-white');
                document.getElementById('progressBar').style.width = '33.33%';
            &#125; else &#123;
                selectedElement.classList.add('bg-error-container', 'border-error');
                validateBtn.innerText = "Essayer encore";
                validateBtn.classList.replace('bg-secondary-container', 'bg-error');
                validateBtn.classList.replace('text-on-secondary-container', 'text-white');
            &#125;
        &#125;);
    </script>

    </div>
  );
}
