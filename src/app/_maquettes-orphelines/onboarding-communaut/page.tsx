import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Réussir ensemble" };

export default function Page() {
  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary" style={{ minHeight: "max(884px, 100dvh)" }}>

<main className="min-h-screen flex flex-col items-center justify-center relative px-container-padding-mobile md:px-container-padding-desktop py-stack-md">

<div className="absolute inset-0 overflow-hidden pointer-events-none">
<div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
<div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-expert-purple/5 rounded-full blur-[100px]"></div>
</div>
<div className="max-w-4xl w-full z-10 flex flex-col md:flex-row items-center gap-12">

<div className="w-full md:w-1/2 grid grid-cols-2 gap-4 card-perspective">

<div className="col-span-1 bg-surface-container-lowest border border-surface-border p-6 rounded-xl bento-item flex flex-col items-center justify-center text-center floating" style={{"animationDelay":"0.2s"}}>
<div className="w-16 h-16 bg-validation-amber/10 rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-validation-amber text-[40px]" style={{"fontVariationSettings":"'FILL' 1"}}>trophy</span>
</div>
<span className="font-label-md text-label-md text-secondary uppercase">Ligues</span>
<span className="font-title-md text-title-md text-on-surface">Diamant</span>
</div>

<div className="col-span-1 bg-surface-container-lowest border border-surface-border p-6 rounded-xl bento-item flex flex-col items-center justify-center text-center floating" style={{"animationDelay":"0.5s"}}>
<div className="w-16 h-16 bg-expert-purple/10 rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-expert-purple text-[40px]" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
<span className="font-label-md text-label-md text-secondary uppercase">Succès</span>
<span className="font-title-md text-title-md text-on-surface">Top 1%</span>
</div>

<div className="col-span-2 bg-surface-container-lowest border border-surface-border p-6 rounded-xl bento-item flex items-center gap-6 overflow-hidden">
<div className="flex -space-x-3">
<div className="w-12 h-12 rounded-full border-2 border-surface-container-lowest bg-surface-variant overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-265.png" alt="A professional portrait of a diverse university student in a bright modern library setting, wearing a simple blue sweater, looking friendly and engaged." />
</div>
<div className="w-12 h-12 rounded-full border-2 border-surface-container-lowest bg-surface-variant overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-266.png" alt="A focused portrait of a young male student with glasses in a tech-focused academic environment, with soft cinematic lighting and cool blue tones." />
</div>
<div className="w-12 h-12 rounded-full border-2 border-surface-container-lowest bg-surface-variant overflow-hidden flex items-center justify-center text-primary bg-primary-fixed font-bold text-sm">
                            +42
                        </div>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Votre Groupe</span>
<span className="font-body-md text-body-md text-secondary">Aide tes camarades aujourd'hui</span>
</div>
<div className="ml-auto">
<span className="material-symbols-outlined text-impact-emerald text-3xl">groups</span>
</div>
</div>

<div className="col-span-2 bg-primary text-on-primary p-4 rounded-xl bento-item flex justify-between items-center px-8">
<div>
<p className="font-label-md text-label-md opacity-80 uppercase tracking-widest">Points d'entraide</p>
<p className="font-metric-num text-metric-num">2,850 XP</p>
</div>
<div className="h-10 w-24 bg-on-primary/10 rounded flex items-center justify-center">
<div className="flex items-end gap-1 h-6">
<div className="bg-on-primary w-1 rounded-t h-3 animate-pulse"></div>
<div className="bg-on-primary w-1 rounded-t h-5 animate-pulse" style={{"animationDelay":"0.1s"}}></div>
<div className="bg-on-primary w-1 rounded-t h-4 animate-pulse" style={{"animationDelay":"0.2s"}}></div>
<div className="bg-on-primary w-1 rounded-t h-6 animate-pulse" style={{"animationDelay":"0.3s"}}></div>
</div>
</div>
</div>
</div>

<div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-stack-md">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full mb-2">
<span className="material-symbols-outlined text-sm">rocket_launch</span>
<span className="font-label-md text-label-md">ÉTAPE 3 SUR 3</span>
</div>
<h1 className="font-display-lg text-display-lg md:text-display-lg text-primary leading-tight">
                    Réussir ensemble
                </h1>
<p className="font-body-lg text-body-lg text-secondary max-w-md">
                    Rejoins les défis de ta commune, grimpe dans les ligues et débloque des badges exclusifs en aidant tes camarades. L'apprentissage est plus puissant quand il est partagé.
                </p>

<div className="w-full flex flex-col space-y-gutter pt-8">
<button className="w-full md:w-max px-12 py-4 bg-primary text-on-primary font-title-md text-title-md rounded-lg shadow-sm hover:bg-primary-container active:scale-95 transition-all duration-150 flex items-center justify-center gap-2 group" id="finish-btn">
                        C'est parti !
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>

<div className="flex items-center justify-center md:justify-start gap-3">
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<div className="w-8 h-2 rounded-full bg-primary shadow-sm"></div>
</div>
</div>
</div>
</div>

<div className="absolute bottom-10 left-0 w-full flex justify-center opacity-50">
<p className="font-label-md text-label-md flex items-center gap-2">
<span className="material-symbols-outlined text-sm">info</span>
                Des milliers d'étudiants utilisent déjà Edukora
            </p>
</div>
</main>
<script>
        // Micro-interaction for the finish button
        document.getElementById('finish-btn').addEventListener('click', function() &#123;
            // Add a completion effect
            this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Chargement...';
            this.classList.add('opacity-80', 'pointer-events-none');
            
            // Artificial delay to simulate transition to dashboard
            setTimeout(() =&gt; &#123;
                const mainContent = document.querySelector('main');
                mainContent.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
                mainContent.style.opacity = '0';
                mainContent.style.transform = 'scale(0.98)';
                
                // Final destination logic would go here
                console.log("Onboarding completed. Navigating to Dashboard...");
            &#125;, 800);
        &#125;);

        // Add slight parallax or tilt effect to bento items
        const bentoItems = document.querySelectorAll('.bento-item');
        document.addEventListener('mousemove', (e) =&gt; &#123;
            const &#123; clientX, clientY &#125; = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (clientX - centerX) / 100;
            const moveY = (clientY - centerY) / 100;
            
            bentoItems.forEach((item, index) =&gt; &#123;
                const depth = (index + 1) * 0.5;
                item.style.transform = `translate($&#123;moveX * depth&#125;px, $&#123;moveY * depth&#125;px) translateY(-4px)`;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
