import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Quiz de diagnostic" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 bg-surface border-b border-surface-border">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-headline-md">school</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Edukora Academic</h1>
</div>
<div className="flex items-center gap-4">
<button className="md:hidden p-2 rounded-full hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">close</span>
</button>
<div className="hidden md:flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-sm">person</span>
</div>
<span className="font-body-md text-body-md">S. Konaté</span>
</div>
</div>
</header>
<main className="flex-grow pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-4xl mx-auto w-full">

<div className="mb-stack-md">
<div className="flex justify-between items-end mb-2">
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Étape 2 sur 4 : Mathématiques</span>
<span className="font-title-md text-title-md text-primary">Question 3 / 5</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full transition-all duration-500 ease-out" style={{"width":"60%"}}></div>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border p-6 md:p-10 mb-stack-md relative overflow-hidden">

<div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
<span className="material-symbols-outlined text-9xl">functions</span>
</div>
<div className="relative z-10">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full mb-4">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">BAC SÉRIE C</span>
</div>
<h2 className="font-headline-md text-headline-md mb-6 leading-tight">
                    Calcul d'une intégrale définie par parties.
                </h2>
<div className="font-body-lg text-body-lg bg-surface-container-low p-6 border-l-4 border-primary math-scroll overflow-x-auto whitespace-nowrap mb-6">
                    Soit la fonction $f$ définie sur $[1, e]$ par $f(x) = x \ln(x)$. <br />
                    Quelle est la valeur exacte de l'intégrale $I = \int_&#123;1&#125;^&#123;e&#125; x \ln(x) dx$ ?
                </div>
<p className="font-body-md text-body-md text-secondary">
                    Sélectionnez la réponse exacte parmi les propositions ci-dessous. Prenez votre temps pour vérifier les constantes d'intégration.
                </p>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<button className="option-card group flex items-start gap-4 p-5 bg-surface-container-lowest border border-surface-border text-left transition-all duration-200 active:scale-95">
<div className="radio-indicator mt-1 w-5 h-5 rounded-full border-2 border-outline-variant flex-shrink-0 transition-colors"></div>
<div>
<span className="font-label-md text-label-md text-outline block mb-1">A</span>
<p className="font-body-lg text-body-lg">$\frac&#123;e^2 + 1&#125;&#123;4&#125;$</p>
</div>
</button>

<button className="option-card group flex items-start gap-4 p-5 bg-surface-container-lowest border border-surface-border text-left transition-all duration-200 active:scale-95">
<div className="radio-indicator mt-1 w-5 h-5 rounded-full border-2 border-outline-variant flex-shrink-0 transition-colors"></div>
<div>
<span className="font-label-md text-label-md text-outline block mb-1">B</span>
<p className="font-body-lg text-body-lg">$\frac&#123;e^2 - 1&#125;&#123;4&#125;$</p>
</div>
</button>

<button className="option-card group flex items-start gap-4 p-5 bg-surface-container-lowest border border-surface-border text-left transition-all duration-200 active:scale-95">
<div className="radio-indicator mt-1 w-5 h-5 rounded-full border-2 border-outline-variant flex-shrink-0 transition-colors"></div>
<div>
<span className="font-label-md text-label-md text-outline block mb-1">C</span>
<p className="font-body-lg text-body-lg">$\frac&#123;e^2 - 2&#125;&#123;4&#125;$</p>
</div>
</button>

<button className="option-card group flex items-start gap-4 p-5 bg-surface-container-lowest border border-surface-border text-left transition-all duration-200 active:scale-95">
<div className="radio-indicator mt-1 w-5 h-5 rounded-full border-2 border-outline-variant flex-shrink-0 transition-colors"></div>
<div>
<span className="font-label-md text-label-md text-outline block mb-1">D</span>
<p className="font-body-lg text-body-lg">$\frac&#123;e^2 + 2&#125;&#123;4&#125;$</p>
</div>
</button>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full z-50 bg-surface-container-lowest border-t border-surface-border h-20 px-container-padding-mobile md:px-container-padding-desktop flex justify-between items-center">
<button className="flex items-center gap-2 text-secondary font-title-md text-title-md hover:text-primary transition-colors">
<span className="material-symbols-outlined">arrow_back</span>
<span className="hidden md:inline">Précédent</span>
</button>
<div className="flex items-center gap-4">
<button className="hidden md:flex items-center gap-2 text-outline font-title-md text-title-md hover:text-on-surface transition-colors px-4">
                Passer la question
            </button>
<button className="bg-primary text-white font-bold px-8 h-12 rounded-[4px] opacity-50 cursor-not-allowed transition-all hover:bg-primary-container flex items-center gap-2" disabled={true} id="nextBtn">
                Suivant
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</footer>


<script>
        function selectOption(element) &#123;
            // Remove active class from all options
            const options = document.querySelectorAll('.option-card');
            options.forEach(opt =&gt; opt.classList.remove('active'));
            
            // Add active class to clicked option
            element.classList.add('active');
            
            // Enable Next Button
            const nextBtn = document.getElementById('nextBtn');
            nextBtn.disabled = false;
            nextBtn.classList.remove('opacity-50', 'cursor-not-allowed');
            nextBtn.classList.add('shadow-sm');
        &#125;

        // Simple animation for the progress bar on load
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const progressBar = document.querySelector('.bg-primary.h-full');
            progressBar.style.width = '0%';
            setTimeout(() =&gt; &#123;
                progressBar.style.width = '60%';
            &#125;, 100);
        &#125;);
    </script>

    </div>
  );
}
