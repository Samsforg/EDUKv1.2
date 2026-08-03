import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Rejoins la Communauté" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container overflow-x-hidden min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-surface flex justify-between items-center px-4 py-4 z-50">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary font-bold" data-icon="school">school</span>
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<button className="text-on-surface-variant font-label text-label-sm font-semibold hover:opacity-80 transition-opacity">
            Passer
        </button>
</header>
<main className="flex-grow flex flex-col items-center justify-center px-6 py-8 max-w-md mx-auto w-full relative overflow-hidden gradient-mesh">

<div className="flex gap-2 mb-12">
<div className="h-1.5 w-8 rounded-full bg-outline-variant"></div>
<div className="h-1.5 w-8 rounded-full bg-outline-variant"></div>
<div className="h-1.5 w-8 rounded-full bg-outline-variant"></div>
<div className="h-1.5 w-12 rounded-full bg-secondary-container transition-all duration-500"></div>
</div>

<div className="relative w-full aspect-square mb-10 flex items-center justify-center animate-float">

<div className="absolute inset-0 opacity-10 bg-no-repeat bg-center bg-contain grayscale pointer-events-none" data-location="Ivory Coast" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDdwdvuwaCnTWPjaf1_qnTwrTk2H4qGZiApzJ9RjUCIeima5s8PYrpO_Xm3GnleZ6q3-7pbnETFNrtrJlqBR1sycAAOzo-cOvwgvDi1yr9yocrYZdjcNQCp3UHqQAnY25-ecQ3hEsZL-YvKpb7uw-W9P9zUM8jLX0PZiAUEAvrQfQrMTBwXJVz24a8ci9B3nLXl54Ktr86nSb3uNdWavzj1lU9FIasC5zUK6WCoVUyodNV6SiF4t9Va')"}}>
</div>

<div className="relative z-10 w-full h-full flex items-center justify-center">
<div className="w-full h-full rounded-[2rem] overflow-hidden border-4 border-surface-container-highest shadow-xl">
<img className="w-full h-full object-cover" src="/images/ecran-286.png" alt="A diverse and joyful group of high school students in Côte d'Ivoire wearing neat school uniforms, collaborating around a modern digital tablet in a bright, sunlit outdoor courtyard. The scene is vibrant with a color palette of academic blue and national orange accents. In the background, a subtle, stylized map of Côte d'Ivoire is visible. The lighting is warm and golden, evoking the hopeful atmosphere of a bright future and academic success." />
</div>

<div className="absolute -top-4 -right-4 bg-secondary-container text-white p-3 rounded-xl shadow-lg flex items-center gap-2 transform rotate-6 border-2 border-white">
<span className="material-symbols-outlined" data-icon="emoji_events" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="font-label text-label-xs font-bold">MAJOR</span>
</div>
<div className="absolute -bottom-2 -left-4 bg-tertiary-container text-white p-3 rounded-xl shadow-lg flex items-center gap-2 transform -rotate-3 border-2 border-white">
<span className="material-symbols-outlined" data-icon="groups" style={{"fontVariationSettings":"'FILL' 1"}}>groups</span>
<span className="font-label text-label-xs font-bold">COLLAB</span>
</div>
</div>
</div>

<div className="text-center space-y-4 mb-12">
<h1 className="font-headline text-[32px] leading-[40px] font-bold text-primary tracking-tight">
                Rejoins la Communauté
            </h1>
<p className="text-on-surface-variant font-body text-body-md leading-relaxed px-2">
                Collabore avec les élèves de ta commune, participe aux défis et deviens le <span className="text-secondary font-bold">Major de ta ville</span> !
            </p>
</div>

<div className="w-full bg-surface-container-low p-4 rounded-xl border border-outline-variant flex items-center gap-4 mb-8">
<div className="bg-primary-container p-3 rounded-lg text-white">
<span className="material-symbols-outlined" data-icon="location_on" style={{"fontVariationSettings":"'FILL' 1"}}>location_on</span>
</div>
<div className="flex-grow">
<p className="text-label-xs text-on-surface-variant uppercase tracking-wider font-bold">Ta région</p>
<p className="font-headline text-primary font-bold">District d'Abidjan</p>
</div>
<div className="text-right">
<p className="text-label-xs text-on-surface-variant font-medium">Rang local</p>
<p className="text-secondary font-bold">#142</p>
</div>
</div>
</main>

<footer className="p-6 pb-10 bg-surface w-full max-w-md mx-auto sticky bottom-0">
<button className="w-full bg-secondary-container text-on-secondary text-lg font-headline font-bold py-4 rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-3 hover:brightness-110">
            C'est parti !
            <span className="material-symbols-outlined font-bold" data-icon="arrow_forward">arrow_forward</span>
</button>
<p className="text-center mt-4 text-label-xs text-outline font-medium">
            En continuant, tu acceptes nos Conditions d'Utilisation.
        </p>
</footer>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const button = document.querySelector('button');
            button.addEventListener('touchstart', () =&gt; &#123;
                button.style.transform = 'scale(0.98)';
            &#125;);
            button.addEventListener('touchend', () =&gt; &#123;
                button.style.transform = 'scale(1)';
            &#125;);
            
            // Success Haptic Feedback (Simulation)
            button.addEventListener('click', () =&gt; &#123;
                if ('vibrate' in navigator) &#123;
                    navigator.vibrate(20);
                &#125;
                console.log('Navigating to Home Dashboard...');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
