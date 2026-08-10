import type { Metadata } from "next";

export const metadata: Metadata = { title: "Correction - EduKora BAC" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-32" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16 w-full sticky top-0 z-50">
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Correction</h1>
</div>
<div className="flex items-center gap-2"><button aria-label="Ajouter aux favoris" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 0"}}>bookmark</span>
</button>
<span className="bg-primary-container text-white px-3 py-1 rounded-full font-label-xs text-label-xs">Question 4/15</span>
</div>
</header>
<main className="max-w-3xl mx-auto px-margin-mobile mt-stack-md space-y-stack-md">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md overflow-hidden">
<h2 className="font-label-sm text-label-sm text-outline mb-base">ÉNONCÉ DE LA QUESTION</h2>
<p className="font-body-lg text-body-lg mb-stack-md">
                Soit la fonction <span className="font-bold">f(x) = x² - 4x + 3</span>. Déterminez les coordonnées du sommet de la parabole représentée ci-dessous.
            </p>
<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-white border border-outline-variant mb-base">
<img className="w-full h-full object-contain p-4" src="/images/ecran-087.png" alt="A precise mathematical graph of a parabola showing the function y equals x squared minus four x plus three on a clean white Cartesian coordinate system. The x and y axes are clearly labeled with black lines. The parabola is drawn in a vibrant academic blue color, with its vertex clearly visible at the point two comma negative one. The lighting is flat and professional, resembling a high-quality educational textbook illustration for a national exam preparation platform." />
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="bg-error-container/20 border border-error/30 rounded-xl p-stack-md">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-error">close</span>
<h3 className="font-label-sm text-label-sm text-error">VOTRE RÉPONSE</h3>
</div>
<p className="font-headline-md text-headline-md text-on-error-container">(4 ; 3)</p>
</div>
<div className="bg-tertiary-fixed/20 border border-tertiary-container/30 rounded-xl p-stack-md">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-on-tertiary-fixed-variant" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<h3 className="font-label-sm text-label-sm text-on-tertiary-fixed-variant">BONNE RÉPONSE</h3>
</div>
<p className="font-headline-md text-headline-md text-on-tertiary-fixed-variant">(2 ; -1)</p>
</div>
</section>

<section className="bg-surface rounded-xl border border-outline-variant p-stack-md">
<h2 className="font-headline-md text-headline-md text-primary mb-stack-md">Résolution pas à pas</h2>
<div className="space-y-stack-lg relative">

<div className="flex gap-4 relative step-line" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 z-10 font-bold" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>1</div>
<div style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<h3 className="font-label-sm text-label-sm text-primary mb-1">IDENTIFICATION DE LA FORMULE</h3>
<p className="text-on-surface-variant">Pour une fonction de type <span className="font-mono bg-surface-container px-1 rounded italic">ax² + bx + c</span>, l'abscisse du sommet (h) est donnée par la formule :</p>
<div className="my-stack-sm bg-surface-container-high p-stack-sm rounded-lg text-center font-bold text-primary">
                            h = -b / 2a
                        </div>
</div>
</div>

<div className="flex gap-4 relative step-line" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center shrink-0 z-10 font-bold" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>2</div>
<div style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<h3 className="font-label-sm text-label-sm text-primary mb-1">APPLICATION NUMÉRIQUE</h3>
<p className="text-on-surface-variant">Ici, <span className="font-bold">a = 1</span> et <span className="font-bold">b = -4</span>.</p>
<ul className="list-disc list-inside mt-2 space-y-1 text-on-surface">
<li className=""><span className="font-bold">h</span> = -(-4) / (2 * 1) = 4 / 2 = <span className="text-tertiary font-bold">2</span></li>
<li className=""><span className="font-bold">k</span> = f(2) = 2² - 4(2) + 3 = 4 - 8 + 3 = <span className="text-tertiary font-bold">-1</span></li>
</ul>
</div>
</div>

<div className="flex gap-4 relative" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 z-10 font-bold" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>3</div>
<div style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<h3 className="font-label-sm text-label-sm text-primary mb-1">RÉSULTAT FINAL</h3>
<p className="text-on-surface-variant">Le sommet S de la parabole a pour coordonnées :</p>
<p className="mt-2 text-headline-md font-bold text-primary">S(2 ; -1)</p>
<p className="text-sm mt-1 text-outline italic">Interprétation : C'est le point minimum de la courbe car a &gt; 0.</p>
</div>
</div>
</div>
</section>

<section className="bg-primary-container text-white rounded-xl p-stack-md shadow-lg overflow-hidden relative">

<div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<span className="material-symbols-outlined text-[120px]">psychology</span>
</div>
<div className="relative z-10" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<div className="flex items-center gap-3 mb-stack-sm" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
</div>
<div>
<h4 className="font-bold text-lg leading-tight">Conseil de Kora</h4>
<p className="text-xs text-on-primary-container opacity-80 uppercase tracking-widest font-semibold">Tuteur IA</p>
</div>
</div>
<div className="bg-white/10 backdrop-blur-sm rounded-lg p-stack-sm border border-white/20" style={{"opacity":"1","transform":"translateY(0px)","transition":"0.4s ease-out"}}>
<p className="font-body-md italic leading-relaxed">
                        "Attention au signe du discriminant et des coefficients ! Beaucoup d'élèves oublient que dans <span className="font-bold">-b / 2a</span>, si b est négatif (comme ici -4), le résultat devient positif. Prends toujours le temps de bien noter tes valeurs <span className="underline">a, b, c</span> avant de calculer."
                    </p>
</div>
<button className="mt-stack-md flex items-center gap-2 text-sm font-bold bg-white text-primary px-4 py-2 rounded-full hover:bg-surface-bright transition-colors active:scale-95">
<span className="material-symbols-outlined text-[18px]">forum</span>
                    Demander plus d'explications
                </button>
</div>
</section>
</main>

<div className="fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant p-4 z-40 md:flex md:justify-center">
<div className="max-w-3xl w-full flex gap-3">
<button className="flex-1 h-12 bg-surface-container-high text-on-surface-variant rounded-full font-bold hover:bg-surface-container-highest transition-all active:scale-95">
                Réessayer
            </button>
<button className="flex-[2] h-12 bg-secondary-container text-on-secondary-container rounded-full font-bold flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all active:scale-95">
                Question suivante
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            // Subtle entry animations for steps
            const steps = document.querySelectorAll('.step-line, .relative &gt; div');
            steps.forEach((step, index) =&gt; &#123;
                step.style.opacity = '0';
                step.style.transform = 'translateY(10px)';
                setTimeout(() =&gt; &#123;
                    step.style.transition = 'all 0.4s ease-out';
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                &#125;, index * 150);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
