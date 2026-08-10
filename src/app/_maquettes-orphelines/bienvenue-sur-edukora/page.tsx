import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bienvenue sur Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col overflow-x-hidden" >


<header className="w-full top-0 sticky bg-surface dark:bg-on-background z-50">
<div className="flex justify-between items-center px-4 py-4 w-full max-w-md mx-auto">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" data-icon="school">school</span>
<span className="font-headline text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora</span>
</div>
<button className="text-on-surface-variant dark:text-outline-variant font-label text-label-sm font-semibold hover:opacity-80 transition-opacity active:scale-95 transition-transform">
                Passer
            </button>
</div>
</header>
<main className="flex-grow flex flex-col items-center justify-between px-6 pb-12 pt-4 w-full max-w-md mx-auto onboarding-gradient relative">

<div className="flex flex-col items-center text-center w-full space-y-8 mt-4">

<div className="w-24 h-24 rounded-full bg-white shadow-sm flex items-center justify-center p-4">
<img alt="Edukora Logo" className="w-full h-full object-contain" src="/images/ecran-038.png" />
</div>

<div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-surface-container-low flex items-center justify-center">
<img className="w-full h-full object-cover" src="/images/ecran-039.png" alt="A cinematic, high-quality digital illustration of a smiling Ivorian high school student, male and female, confidently standing in front of a modern architectural school building in Abidjan. They are holding heavy academic textbooks and a digital tablet, symbolizing the blend of traditional study and modern AI tools. The lighting is bright and optimistic, with a soft golden hour glow reflecting a professional yet hopeful academic atmosphere. The colors are dominated by soft blues and vibrant orange accents, matching the Ivory Coast's educational excellence theme." />

<div className="absolute bottom-4 right-4 bg-secondary-container text-on-secondary-container px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
<span className="material-symbols-outlined text-[16px]" data-icon="military_tech">military_tech</span>
                    Objectif BAC 2024
                </div>
</div>

<div className="space-y-3">
<h1 className="font-headline text-[32px] leading-[40px] font-bold text-primary tracking-tight">
                    Bienvenue sur Edukora
                </h1>
<p className="font-body text-body-md text-on-surface-variant leading-relaxed px-2">
                    Ton allié pour réussir le BAC et le BEPC en Côte d'Ivoire.
                </p>
</div>

<div className="w-full bg-white border border-outline-variant p-4 rounded-xl flex items-start gap-4 text-left shadow-sm">
<div className="flex-shrink-0 w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container" data-icon="verified">verified</span>
</div>
<div>
<p className="font-body text-[15px] font-medium text-on-surface">
                        Des milliers de fiches de révision certifiées par des professeurs experts.
                    </p>
</div>
</div>
</div>

<div className="w-full mt-12 flex flex-col items-center space-y-6">

<div className="flex gap-2">
<div className="w-8 h-1.5 rounded-full bg-primary"></div>
<div className="w-2 h-1.5 rounded-full bg-outline-variant"></div>
<div className="w-2 h-1.5 rounded-full bg-outline-variant"></div>
</div>

<button className="w-full bg-secondary-container text-on-secondary-container py-4 rounded-xl font-headline text-headline-md font-bold shadow-lg shadow-secondary-container/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                Suivant
                <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
</button>

<p className="font-label text-label-xs text-outline font-medium">
                Déjà un compte ? <span className="text-primary font-bold cursor-pointer">Se connecter</span>
</p>
</div>
</main>

<script>
        // Micro-interaction for the primary button
        document.querySelector('button.bg-secondary-container').addEventListener('click', function() &#123;
            this.classList.add('opacity-90');
            setTimeout(() =&gt; &#123;
                this.classList.remove('opacity-90');
            &#125;, 150);
        &#125;);

        // Simple entrance animation
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const main = document.querySelector('main');
            main.style.opacity = '0';
            main.style.transform = 'translateY(10px)';
            main.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            
            requestAnimationFrame(() =&gt; &#123;
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
