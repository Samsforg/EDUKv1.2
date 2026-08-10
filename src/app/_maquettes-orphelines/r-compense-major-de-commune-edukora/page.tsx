import type { Metadata } from "next";

export const metadata: Metadata = { title: "EduIvoir - Major de Commune" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-margin-mobile h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-299.png" alt="A professional student portrait avatar for an educational app, high-quality digital illustration, clean corporate style, Academic Blue and National Orange highlights, bright light-mode aesthetic." />
</div>
<span className="font-display-lg-mobile text-display-lg-mobile text-primary dark:text-primary-fixed-dim">EduIvoir</span>
</div>
<button className="material-symbols-outlined text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 duration-100">notifications</button>
</header>
<main className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center px-margin-mobile pb-32">

<div className="absolute inset-0 pointer-events-none overflow-hidden" id="confetti-container"></div>

<div className="celebrate-entry flex flex-col items-center text-center max-w-lg mx-auto">

<div className="relative mb-8 float-animation">
<div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl scale-125"></div>
<img alt="Médaille Major de Commune" className="w-64 h-64 relative z-10 drop-shadow-2xl" src="/images/ecran-300.png" />
</div>

<div className="space-y-2 mb-10">
<h1 className="font-headline-md text-headline-md-mobile text-primary tracking-tight">Félicitations, Major !</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xs mx-auto">
                    Vous êtes classé <span className="font-bold text-primary">#1</span> dans la commune de <span className="font-bold text-secondary">Cocody</span>.
                </p>
</div>

<div className="grid grid-cols-2 gap-3 w-full mb-10">
<div className="col-span-2 bg-surface-container p-4 rounded-xl border border-outline-variant flex items-center gap-4 transition-all hover:border-primary">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div className="text-left">
<p className="font-label-xs text-label-xs text-primary uppercase">Récompense Principale</p>
<p className="font-body-md font-bold">Badge exclusif débloqué</p>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col items-center justify-center transition-all hover:bg-surface-container">
<span className="material-symbols-outlined text-secondary text-3xl mb-1">bolt</span>
<p className="font-body-md font-bold">+500 XP</p>
<p className="text-xs text-on-surface-variant">Progression</p>
</div>
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant flex flex-col items-center justify-center transition-all hover:bg-surface-container">
<span className="material-symbols-outlined text-tertiary-container text-3xl mb-1">star</span>
<p className="font-body-md font-bold text-sm">Accès Premium</p>
<p className="text-xs text-on-surface-variant">7 jours offerts</p>
</div>
</div>

<div className="flex flex-col gap-4 w-full">
<button className="shine-effect relative overflow-hidden w-full h-14 bg-primary text-white rounded-full font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform">
<span className="material-symbols-outlined">share</span>
                    Partager mon succès
                </button>
<button className="w-full h-14 bg-surface text-primary border-2 border-primary rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary-fixed transition-colors active:scale-95">
<span className="material-symbols-outlined">auto_stories</span>
                    Continuer mes révisions
                </button>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-20 px-2 pb-safe bg-surface dark:bg-surface-dim shadow-[0_-1px_4px_rgba(0,0,0,0.1)]">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-all">
<span className="material-symbols-outlined">bookmark</span>
<span className="font-label-xs text-label-xs">Favoris</span>
</div>

<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Simple Confetti Animation
        function createConfetti() &#123;
            const container = document.getElementById('confetti-container');
            const colors = ['#00327d', '#954a00', '#003f23', '#ffdcc6', '#b1c5ff'];
            
            for (let i = 0; i &lt; 50; i++) &#123;
                const confetti = document.createElement('div');
                confetti.classList.add('confetti');
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = Math.random() &gt; 0.5 ? '50%' : '2px';
                confetti.style.transform = `rotate($&#123;Math.random() * 360&#125;deg)`;
                
                container.appendChild(confetti);
                
                const animation = confetti.animate([
                    &#123; top: '-10px', opacity: 1, transform: `translate(0, 0) rotate(0deg)` &#125;,
                    &#123; top: '100vh', opacity: 0, transform: `translate($&#123;(Math.random() - 0.5) * 200&#125;px, 0) rotate($&#123;Math.random() * 1000&#125;deg)` &#125;
                ], &#123;
                    duration: 2000 + Math.random() * 3000,
                    easing: 'cubic-bezier(0, 0, 0.2, 1)',
                    delay: Math.random() * 500
                &#125;);

                animation.onfinish = () =&gt; confetti.remove();
            &#125;
        &#125;

        // Trigger on load
        window.onload = () =&gt; &#123;
            setTimeout(createConfetti, 300);
            // Re-trigger every few seconds for celebration vibes
            setInterval(createConfetti, 4000);
        &#125;;
    </script>

    </div>
  );
}
