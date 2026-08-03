import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Kora ton tuteur personnel" };

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<main className="flex-grow flex flex-col items-center justify-center p-container-padding-mobile md:p-container-padding-desktop">
<div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-stack-md lg:gap-gutter items-center">

<div className="relative flex flex-col items-center justify-center h-[300px] md:h-[450px]">

<div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>

<div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white shadow-xl">
<img className="w-full h-full object-cover" src="/images/ecran-267.png" alt="A futuristic, friendly robot tutor character named Kora, designed with sleek white metallic surfaces and glowing soft blue interface eyes. The robot sits in a high-tech academic study room with holographic data floating around. The lighting is soft and bright, emphasizing a light-mode corporate aesthetic. Detailed 3D rendering with a professional, trustworthy, and intelligent atmosphere." />
</div>

<div className="absolute top-4 left-0 md:-left-12 chat-bubble glass-card p-4 rounded-xl shadow-lg max-w-[200px]">
<p className="font-body-md text-body-md text-primary font-bold">"Comment puis-je t'aider aujourd'hui ?"</p>
</div>
<div className="absolute bottom-12 right-0 md:-right-8 chat-bubble glass-card p-4 rounded-xl shadow-lg max-w-[220px]">
<p className="font-body-md text-body-md text-secondary">"Explique-moi la loi d'Ohm simplement."</p>
<div className="mt-2 h-1 w-full bg-primary/10 rounded-full overflow-hidden">
<div className="h-full bg-primary w-1/3"></div>
</div>
</div>
<div className="absolute top-1/2 -right-4 md:-right-16 chat-bubble glass-card p-3 rounded-xl shadow-lg border-l-4 border-validation-amber">
<span className="material-symbols-outlined text-validation-amber text-lg">psychology</span>
<p className="font-label-md text-label-md mt-1">Analyse en cours...</p>
</div>
</div>

<div className="flex flex-col space-y-stack-md">
<div className="space-y-4">
<div className="inline-flex items-center space-x-2 px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<span className="font-label-md text-label-md uppercase tracking-wider">Assistant IA Intelligente</span>
</div>
<h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
                        Kora, ton tuteur personnel
                    </h1>
<p className="font-body-lg text-body-lg text-secondary max-w-md">
                        Une question sur un cours ? Un exercice difficile ? Kora est là 24h/7 pour t'expliquer chaque concept pas à pas.
                    </p>
</div>

<div className="grid grid-cols-1 gap-4">
<div className="flex items-start space-x-3 p-4 rounded-lg bg-surface-container-lowest border border-surface-border transition-all hover:border-primary/30">
<div className="p-2 bg-primary/5 rounded-lg">
<span className="material-symbols-outlined text-primary">schedule</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-primary">Disponibilité Totale</h3>
<p className="font-body-md text-body-md text-secondary">Réponses instantanées, jour et nuit.</p>
</div>
</div>
<div className="flex items-start space-x-3 p-4 rounded-lg bg-surface-container-lowest border border-surface-border transition-all hover:border-primary/30">
<div className="p-2 bg-impact-emerald/5 rounded-lg">
<span className="material-symbols-outlined text-impact-emerald">step_into</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-primary">Méthode Pas-à-Pas</h3>
<p className="font-body-md text-body-md text-secondary">Décomposition des problèmes complexes.</p>
</div>
</div>
</div>

<div className="pt-stack-md flex flex-col space-y-6">
<div className="flex items-center justify-between">
<button className="px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-all active:scale-95 duration-150">
                            Précédent
                        </button>
<button className="px-10 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-container shadow-md hover:shadow-lg transition-all active:scale-95 duration-150 flex items-center space-x-2">
<span>Suivant</span>
<span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>

<div className="flex justify-center space-x-3">
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<div className="w-8 h-2 rounded-full bg-primary transition-all duration-300"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
</div>
</div>
</div>
</div>
</main>

<header className="w-full fixed top-0 px-container-padding-mobile py-4 flex justify-between items-center z-50">
<div className="flex items-center space-x-2">
<span className="material-symbols-outlined text-primary text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>auto_stories</span>
<span className="font-display-lg text-headline-md text-primary tracking-tight">Edukora</span>
</div>
<button className="text-secondary font-label-md uppercase tracking-widest hover:text-primary transition-colors">
            Passer l'introduction
        </button>
</header>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const bubbles = document.querySelectorAll('.chat-bubble');
            
            // Random floating micro-movements
            bubbles.forEach((bubble, index) =&gt; &#123;
                const randomDelay = Math.random() * 2;
                bubble.style.animationDelay = `$&#123;randomDelay&#125;s`;
            &#125;);

            // Button click interactions handled by active:scale-95 classes
        &#125;);
    </script>

    </div>
  );
}
