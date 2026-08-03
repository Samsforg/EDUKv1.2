import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Défis de la Ligue" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full h-16 bg-surface z-50 flex justify-between items-center px-container-padding-mobile border-b border-surface-border">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-2xl">school</span>
<h1 className="font-headline-md text-headline-md-mobile font-bold text-primary">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<button className="p-2 rounded-full hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden bg-secondary-fixed border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-097.png" alt="A professional studio portrait of a university professor with a warm, encouraging smile. The background is a clean, bright academic office with soft daylight and blurred books on a shelf. The lighting is high-key and modern, emphasizing intellectual clarity and trust, matching the Edukora corporate minimalism aesthetic." />
</div>
</div>
</header>
<main className="pt-24 pb-28 px-4 max-w-7xl mx-auto md:px-container-padding-desktop">

<section className="mb-12">
<div className="relative overflow-hidden rounded-xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 glass-card shadow-sm">
<div className="relative z-10">
<span className="font-label-md text-label-md text-primary uppercase tracking-widest mb-2 block">Statut Actuel</span>
<h2 className="font-headline-lg text-headline-lg-mobile text-on-surface mb-2">Ligue Argent</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md">Vous progressez vers le sommet ! Relevez les défis spécifiques pour débloquer la Ligue Or et des récompenses exclusives.</p>
</div>
<div className="relative z-10 flex flex-col items-center">
<div className="w-24 h-24 league-silver-gradient rounded-full flex items-center justify-center shadow-lg border-4 border-white">
<span className="material-symbols-outlined text-white text-5xl" style={{"fontVariationSettings":"'FILL' 1"}}>shield</span>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="h-2 w-32 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-3/4 rounded-full"></div>
</div>
<span className="font-label-md text-label-md text-primary">750/1000 XP</span>
</div>
</div>

<div className="absolute right-0 top-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
</div>
</section>

<section className="mb-12">
<div className="flex items-center justify-between mb-8">
<h3 className="font-headline-md text-headline-md-mobile text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-validation-amber">workspace_premium</span>
                    Défis de la Ligue Argent
                </h3>
<span className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">3 Défis actifs</span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="glass-card rounded-xl p-6 flex flex-col justify-between card-hover-effect border-l-4 border-l-primary">
<div>
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 bg-primary-container/10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-2xl">functions</span>
</div>
<div className="flex items-center gap-1 text-impact-emerald bg-impact-emerald/10 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label-md text-label-md">200 XP</span>
</div>
</div>
<h4 className="font-title-md text-title-md text-on-surface mb-2">Marathon de Maths</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Réalisez 10 exercices d'un coup sans faire de pause pour prouver votre endurance.</p>
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between mb-1">
<span className="font-label-md text-label-md text-on-surface-variant">Progression</span>
<span className="font-label-md text-label-md text-primary">6/10</span>
</div>
<div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary w-[60%] rounded-full"></div>
</div>
</div>
<button className="w-full py-3 bg-primary text-white font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm uppercase tracking-wide">
                            Commencer
                        </button>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-between card-hover-effect border-l-4 border-l-expert-purple">
<div>
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 bg-expert-purple/10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-expert-purple text-2xl">translate</span>
</div>
<div className="flex items-center gap-1 text-validation-amber bg-validation-amber/10 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="font-label-md text-label-md">Trophée Bronze</span>
</div>
</div>
<h4 className="font-title-md text-title-md text-on-surface mb-2">Expert en Français</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Réussissez 3 quiz de niveau 2 avec un score parfait de 100%.</p>
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between mb-1">
<span className="font-label-md text-label-md text-on-surface-variant">Progression</span>
<span className="font-label-md text-label-md text-primary">1/3</span>
</div>
<div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-expert-purple w-[33%] rounded-full"></div>
</div>
</div>
<button className="w-full py-3 bg-primary text-white font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm uppercase tracking-wide">
                            Commencer
                        </button>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-between card-hover-effect border-l-4 border-l-impact-emerald">
<div>
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 bg-impact-emerald/10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-impact-emerald text-2xl">groups</span>
</div>
<div className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
<span className="font-label-md text-label-md">Badge Spécial</span>
</div>
</div>
<h4 className="font-title-md text-title-md text-on-surface mb-2">Aide aux Novices</h4>
<p className="font-body-md text-body-md text-on-surface-variant mb-6">Aidez 5 étudiants dans le forum communautaire en répondant à leurs questions.</p>
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between mb-1">
<span className="font-label-md text-label-md text-on-surface-variant">Progression</span>
<span className="font-label-md text-label-md text-primary">0/5</span>
</div>
<div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-impact-emerald w-0 rounded-full"></div>
</div>
</div>
<button className="w-full py-3 bg-primary text-white font-label-md text-label-md rounded hover:bg-primary-container transition-colors shadow-sm uppercase tracking-wide">
                            Commencer
                        </button>
</div>
</div>
</div>
</section>

<section className="opacity-70 grayscale-[0.5]">
<div className="flex items-center gap-2 mb-8">
<h3 className="font-headline-md text-headline-md-mobile text-on-surface-variant">Défis de la Ligue Or</h3>
<span className="material-symbols-outlined text-outline">lock</span>
</div>
<div className="relative">

<div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-6">
<div className="bg-surface/90 p-8 rounded-xl shadow-xl border border-surface-border backdrop-blur-sm">
<span className="material-symbols-outlined text-4xl text-validation-amber mb-4">lock_open</span>
<h4 className="font-headline-md text-on-surface mb-2">Contenu Verrouillé</h4>
<p className="font-body-md text-on-surface-variant mb-6 max-w-xs mx-auto">Atteignez le rang "Expert Silver" ou cumulez 1000 XP pour débloquer ces défis légendaires.</p>
<button className="px-6 py-2 border-2 border-primary text-primary font-label-md rounded hover:bg-primary/5 transition-colors">En savoir plus</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter blur-md select-none pointer-events-none">
<div className="glass-card rounded-xl p-6 flex flex-col justify-between border-t-4 border-t-validation-amber/50">
<div className="h-48"></div>
</div>
<div className="glass-card rounded-xl p-6 flex flex-col justify-between border-t-4 border-t-validation-amber/50">
<div className="h-48"></div>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-20 bg-surface border-t border-surface-border px-4 pb-safe">
<a className="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1 hover:bg-secondary-container/50 transition-all rounded-full" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary rounded-full px-4 py-1 transition-transform duration-150 scale-100" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>menu_book</span>
<span className="font-label-md text-label-md">Sujets</span>
</a>
<a className="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1 hover:bg-secondary-container/50 transition-all rounded-full" href="#">
<span className="material-symbols-outlined">local_library</span>
<span className="font-label-md text-label-md">Bibliothèque</span>
</a>
<a className="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1 hover:bg-secondary-container/50 transition-all rounded-full" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for buttons
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                button.style.transform = 'scale(0.95)';
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.style.transform = 'scale(1)';
            &#125;);
            button.addEventListener('mouseleave', () =&gt; &#123;
                button.style.transform = 'scale(1)';
            &#125;);
        &#125;);

        // Add a subtle parallax effect to the header blur
        window.addEventListener('mousemove', (e) =&gt; &#123;
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            const blur = document.querySelector('.blur-3xl');
            if(blur) &#123;
                blur.style.transform = `translate($&#123;moveX&#125;px, $&#123;moveY&#125;px)`;
            &#125;
        &#125;);
    </script>

    </div>
  );
}
