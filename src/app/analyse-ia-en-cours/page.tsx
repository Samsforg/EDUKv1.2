import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Analyse IA" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col items-center overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-primary shadow-sm flex justify-between items-center px-4 h-16 z-40">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary">menu</span>
<h1 className="font-headline font-bold text-headline-md text-on-primary">Edukora Professor</h1>
</div>
<div className="h-10 w-10 rounded-full bg-surface-container-high overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-018.png" alt="A professional high-quality portrait of a West African academic professor with a kind, intelligent expression, wearing modern glasses and a crisp white shirt. The background is a blurred university library setting with warm, scholarly lighting. The overall style is clean, corporate, and trustworthy, fitting a premium light-mode academic application." />
</div>
</header>
<main className="flex-1 w-full max-w-4xl px-6 flex flex-col items-center justify-center relative">

<div className="relative flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

<div className="relative">

<div className="absolute inset-0 rounded-full border-4 border-secondary-container animate-pulse-ring"></div>
<div className="absolute inset-0 rounded-full border-4 border-primary-container/30 animate-pulse-ring" style={{"animationDelay":"0.5s"}}></div>

<div className="relative w-32 h-32 bg-primary-container rounded-full flex items-center justify-center shadow-lg border-4 border-on-primary/10 overflow-hidden">

<div className="scan-line absolute w-full top-0"></div>
<span className="material-symbols-outlined text-on-primary text-6xl animate-float" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>

<div className="absolute -right-2 -top-2 bg-secondary-container text-on-secondary-container p-2 rounded-lg shadow-md animate-bounce">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>magic_button</span>
</div>
</div>
</div>

<div className="space-y-4 max-w-md">
<h2 className="font-headline text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    Kora analyse votre document...
                </h2>
<p className="text-body-md text-on-surface-variant font-medium leading-relaxed">
                    Extraction des concepts clés et rédaction des questions en cours. Cela prend généralement moins d'une minute.
                </p>
</div>

<div className="w-full max-w-sm space-y-3">
<div className="flex justify-between items-end px-1">
<span className="text-label-xs font-bold text-primary uppercase tracking-widest">Analyse IA</span>
<span className="text-display-lg-mobile font-headline text-secondary leading-none">65%</span>
</div>
<div className="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden p-[2px]">
<div className="h-full bg-secondary-container rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(253,129,0,0.5)]" id="progress-bar" style={{"width":"65%"}}></div>
</div>
<div className="flex items-center justify-center gap-2 text-tertiary font-medium">
<span className="material-symbols-outlined text-sm animate-spin">sync</span>
<span className="text-label-sm">Génération des questions à choix multiples...</span>
</div>
</div>
</div>
</main>

<div className="w-full max-w-lg px-6 pb-24 md:pb-12">
<div className="bg-surface-container-low border border-outline-variant rounded-xl p-5 flex gap-4 shadow-sm relative overflow-hidden group">

<div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
<div className="flex-shrink-0">
<div className="w-10 h-10 rounded-lg bg-secondary-container/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
</div>
</div>
<div className="space-y-1">
<h4 className="text-label-xs font-bold text-secondary uppercase tracking-tight">Le saviez-vous ?</h4>
<p className="text-label-sm text-on-surface-variant italic leading-snug">
                    Plus votre support est structuré (titres, listes), meilleure est la pertinence des questions générées.
                </p>
</div>
</div>
</div>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface border-t border-outline-variant shadow-md flex justify-around items-center h-20 px-2 pb-2 md:hidden">
<div className="flex flex-col items-center justify-center text-on-surface-variant opacity-40 pointer-events-none">
<span className="material-symbols-outlined">book</span>
<span className="font-label text-label-xs">Bibliothèque</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>psychology</span>
<span className="font-label text-label-xs">Generate</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant opacity-40 pointer-events-none">
<span className="material-symbols-outlined">edit_note</span>
<span className="font-label text-label-xs">Drafts</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant opacity-40 pointer-events-none">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</div>
</nav>
<script>
        // Micro-interaction: Progress bar simulation
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.querySelector('.text-display-lg-mobile');
        let progress = 65;

        const updateProgress = () =&gt; &#123;
            if (progress &lt; 98) &#123;
                progress += Math.random() * 0.5;
                progressBar.style.width = `$&#123;progress&#125;%`;
                progressText.textContent = `$&#123;Math.floor(progress)&#125;%`;
            &#125;
        &#125;;

        setInterval(updateProgress, 1500);

        // Interaction: Subtle scaling for icons
        document.querySelectorAll('.material-symbols-outlined').forEach(icon =&gt; &#123;
            icon.addEventListener('mouseover', () =&gt; &#123;
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.2s ease';
            &#125;);
            icon.addEventListener('mouseout', () =&gt; &#123;
                icon.style.transform = 'scale(1)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
