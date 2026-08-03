import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paiement Réussi - Edukora Premium" };

export default function Page() {
  return (
    <div className="bg-surface-bright text-on-background font-body-md min-h-screen flex flex-col overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-bright dark:bg-on-background text-primary dark:text-primary-fixed w-full top-0 sticky border-b border-surface-border dark:border-outline-variant transition-colors duration-200 z-40">
<div className="flex justify-between items-center px-gutter py-base w-full max-w-full mx-auto">
<div className="flex items-center gap-base">
<span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora</span>
</div>
<div className="flex items-center gap-stack-md">
<button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors">notifications</button>
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold border border-primary-container">
                    ÉP
                </div>
</div>
</div>
</header>
<main className="flex-grow flex items-center justify-center p-gutter relative overflow-hidden">

<div className="pointer-events-none absolute inset-0 z-0" id="confetti-wrapper"></div>

<div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center z-10">

<div className="md:col-span-5 flex flex-col items-center justify-center order-2 md:order-1">
<div className="relative w-full aspect-square bg-surface-container-lowest rounded-xl border border-surface-border overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="/images/ecran-268.png" alt="A sophisticated and celebratory digital artwork representing academic excellence. A gold and blue mortarboard cap sits atop a stack of glowing, translucent books. The scene is illuminated by soft, professional volumetric lighting with tiny golden sparkles floating in the air. The overall aesthetic is clean, corporate, and minimalist, using a palette of Edukora brand blues and pristine whites." />

<div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 flex items-center gap-2 shadow-lg animate-bounce">
<span className="material-symbols-outlined text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md text-primary">PREMIUM ACTIVE</span>
</div>
</div>
</div>

<div className="md:col-span-7 flex flex-col space-y-stack-md order-1 md:order-2 text-center md:text-left">
<div className="space-y-base">
<div className="flex items-center justify-center md:justify-start gap-2 text-impact-emerald">
<span className="material-symbols-outlined text-[32px]">check_circle</span>
<span className="font-title-md text-title-md font-bold">Paiement validé</span>
</div>
<h1 className="font-headline-lg text-headline-lg md:text-display-lg md:font-display-lg text-primary leading-tight">
                        Bienvenue dans l'expérience Premium !
                    </h1>
</div>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Votre abonnement est désormais actif. Vous avez maintenant un accès illimité à toutes les ressources d'Edukora : fiches de révision exclusives, exercices interactifs et statistiques détaillées.
                </p>

<div className="grid grid-cols-2 gap-stack-sm pt-4">
<div className="bg-surface-container-low p-stack-sm rounded-lg border border-surface-border flex items-start gap-3">
<span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">menu_book</span>
<div>
<p className="font-title-md text-label-md text-primary">Contenu Illimité</p>
<p className="font-body-md text-[12px] text-on-surface-variant">Accédez à +5000 cours</p>
</div>
</div>
<div className="bg-surface-container-low p-stack-sm rounded-lg border border-surface-border flex items-start gap-3">
<span className="material-symbols-outlined text-expert-purple bg-secondary-fixed p-2 rounded-lg">analytics</span>
<div>
<p className="font-title-md text-label-md text-primary">Analyses IA</p>
<p className="font-body-md text-[12px] text-on-surface-variant">Boostez vos points faibles</p>
</div>
</div>
</div>
<div className="pt-base flex flex-col sm:flex-row gap-stack-sm">
<a className="bg-primary-container hover:bg-primary text-white font-bold px-8 py-4 rounded-lg text-center transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2" href="#">
                        Commencer à réviser
                        <span className="material-symbols-outlined">arrow_forward</span>
</a>
<a className="border border-primary text-primary hover:bg-surface-container-low font-bold px-8 py-4 rounded-lg text-center transition-all flex items-center justify-center" href="#">
                        Voir mon profil
                    </a>
</div>
<div className="flex items-center gap-2 pt-base justify-center md:justify-start">
<div className="flex -space-x-3">
<div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold">JD</div>
<div className="w-8 h-8 rounded-full border-2 border-white bg-green-100 flex items-center justify-center text-[10px] font-bold">ML</div>
<div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-[10px] font-bold">AR</div>
</div>
<span className="font-label-md text-label-md text-outline">Rejoignez 12,000+ étudiants premium</span>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<button className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim">
<span className="material-symbols-outlined">stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</button>
</nav>
<script>
        // Simple confetti effect for celebration
        function createConfetti() &#123;
            const wrapper = document.getElementById('confetti-wrapper');
            const colors = ['#0047AB', '#10B981', '#6366F1', '#F59E0B', '#dae2ff'];
            
            for (let i = 0; i &lt; 50; i++) &#123;
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                
                const size = Math.random() * 8 + 4;
                confetti.style.width = `$&#123;size&#125;px`;
                confetti.style.height = `$&#123;size&#125;px`;
                
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.animationDelay = (Math.random() * 2) + 's';
                confetti.style.opacity = Math.random();
                
                wrapper.appendChild(confetti);

                // Cleanup
                setTimeout(() =&gt; &#123;
                    confetti.remove();
                &#125;, 5000);
            &#125;
        &#125;

        // Initialize on load
        window.addEventListener('load', () =&gt; &#123;
            createConfetti();
            
            // Re-trigger every few seconds for a continuous vibe
            setInterval(createConfetti, 6000);
        &#125;);
    </script>

    </div>
  );
}
