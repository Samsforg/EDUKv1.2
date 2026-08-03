import type { Metadata } from "next";

export const metadata: Metadata = { title: "onboarding_plan_ia" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop" style={{ minHeight: "max(884px, 100dvh)" }}>

<main className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">

<div className="md:col-span-7 lg:col-span-8 order-2 md:order-1 relative">
<div className="grid grid-cols-6 grid-rows-6 gap-4 h-[400px] md:h-[500px]">

<div className="col-span-4 row-span-4 bg-surface-container-lowest border border-surface-border rounded-xl p-6 shadow-sm overflow-hidden relative">
<div className="flex justify-between items-center mb-6">
<span className="font-title-md text-title-md text-primary">Semaine 01</span>
<div className="flex gap-2">
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-secondary-container"></div>
</div>
</div>
<div className="space-y-4">
<div className="p-3 bg-surface-container-low border-l-4 border-primary rounded-lg flex items-center gap-4">
<span className="material-symbols-outlined text-primary">auto_stories</span>
<div className="flex-1">
<div className="h-2 w-2/3 bg-outline-variant rounded-full mb-2"></div>
<div className="h-2 w-1/3 bg-outline-variant/50 rounded-full"></div>
</div>
<span className="text-label-md font-label-md text-primary">90%</span>
</div>
<div className="p-3 bg-surface-container-low border-l-4 border-validation-amber rounded-lg flex items-center gap-4">
<span className="material-symbols-outlined text-validation-amber">psychology</span>
<div className="flex-1">
<div className="h-2 w-1/2 bg-outline-variant rounded-full mb-2"></div>
<div className="h-2 w-1/4 bg-outline-variant/50 rounded-full"></div>
</div>
<span className="text-label-md font-label-md text-validation-amber">En cours</span>
</div>
<div className="p-3 bg-surface-container-low border-l-4 border-impact-emerald rounded-lg flex items-center gap-4">
<span className="material-symbols-outlined text-impact-emerald">military_tech</span>
<div className="flex-1">
<div className="h-2 w-3/4 bg-outline-variant rounded-full mb-2"></div>
<div className="h-2 w-1/2 bg-outline-variant/50 rounded-full"></div>
</div>
<span className="text-label-md font-label-md text-impact-emerald">Prévu</span>
</div>
</div>
</div>

<div className="col-span-2 row-span-3 col-start-5 bg-primary-container text-on-primary rounded-xl p-4 flex flex-col justify-center items-center text-center">
<span className="material-symbols-outlined text-[40px] mb-2" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
<span className="font-label-md text-label-md uppercase tracking-wider opacity-80">Focus</span>
<span className="font-title-md text-title-md">Algèbre</span>
</div>

<div className="col-span-2 row-span-2 col-start-5 row-start-4 bg-surface-container-lowest border border-surface-border rounded-xl p-4 flex flex-col justify-center shadow-sm">
<span className="font-label-md text-label-md text-secondary">Rétention</span>
<div className="flex items-end gap-1 mt-1">
<div className="w-1 h-4 bg-impact-emerald rounded-full"></div>
<div className="w-1 h-6 bg-impact-emerald rounded-full"></div>
<div className="w-1 h-3 bg-impact-emerald rounded-full"></div>
<div className="w-1 h-8 bg-impact-emerald rounded-full"></div>
<span className="font-metric-num text-metric-num ml-2">+12%</span>
</div>
</div>

<div className="col-span-3 row-span-2 row-start-5 bg-white border border-surface-border rounded-full py-3 px-6 flex items-center gap-3 shadow-lg absolute -bottom-4 right-1/4">
<div className="w-8 h-8 rounded-full bg-expert-purple/10 flex items-center justify-center">
<span className="material-symbols-outlined text-expert-purple text-lg" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<div>
<p className="font-label-md text-label-md text-expert-purple">EXPERT STATUS</p>
<p className="font-body-md text-body-md font-bold">Moteur IA Kora</p>
</div>
</div>
</div>
</div>

<div className="md:col-span-5 lg:col-span-4 order-1 md:order-2 flex flex-col justify-center space-y-stack-md py-stack-md">

<div className="flex items-center gap-2 mb-2">
<div className="w-10 h-10 bg-primary-container flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-on-primary" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<span className="font-display-lg text-primary text-[28px]">Edukora</span>
</div>

<div className="space-y-4">
<h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary leading-tight">
                    Ton Plan de Révision Intelligent
                </h1>
<p className="font-body-lg text-body-lg text-secondary leading-relaxed">
                    Kora analyse ton niveau pour créer un programme sur mesure qui s'adapte à ton rythme. Ne perds plus de temps sur ce que tu maîtrises déjà.
                </p>
</div>

<div className="flex flex-col gap-4 pt-4">
<button className="w-full bg-primary-container text-on-primary py-4 px-6 rounded-lg font-bold hover:bg-primary transition-all active:scale-95 flex justify-between items-center">
<span>Suivant</span>
<span className="material-symbols-outlined">arrow_forward</span>
</button>
<button className="w-full text-secondary py-2 px-6 rounded-lg font-bold hover:bg-surface-container-low transition-colors">
                    Passer
                </button>
</div>

<div className="flex gap-3 pt-stack-md justify-center md:justify-start">
<div className="h-2 w-8 bg-primary rounded-full transition-all"></div>
<div className="h-2 w-2 bg-outline-variant rounded-full hover:bg-outline transition-all cursor-pointer"></div>
<div className="h-2 w-2 bg-outline-variant rounded-full hover:bg-outline transition-all cursor-pointer"></div>
<div className="h-2 w-2 bg-outline-variant rounded-full hover:bg-outline transition-all cursor-pointer"></div>
</div>
</div>
</main>

<script>
        function handleNext() &#123;
            const body = document.querySelector('main');
            body.classList.add('opacity-0', 'translate-x-[-20px]');
            body.style.transition = 'all 0.4s ease-in-out';
            setTimeout(() =&gt; &#123;
                // In a real app, logic to go to step 2
                console.log("Navigating to step 2...");
                body.classList.remove('opacity-0', 'translate-x-[-20px]');
            &#125;, 400);
        &#125;

        function handleSkip() &#123;
            const container = document.querySelector('main');
            container.style.opacity = '0';
            container.style.transform = 'scale(0.95)';
            container.style.transition = 'all 0.5s ease-in';
            setTimeout(() =&gt; &#123;
                console.log("Skipping onboarding...");
            &#125;, 500);
        &#125;

        // Entrance animation
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const elements = document.querySelectorAll('.onboarding-card, .grid &gt; div');
            elements.forEach((el, index) =&gt; &#123;
                el.style.opacity = '0';
                el.style.transform = 'translateY(10px)';
                setTimeout(() =&gt; &#123;
                    el.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                &#125;, 100 * index);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
