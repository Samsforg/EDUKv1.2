import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Academic - Analyse IA" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 bg-surface border-b border-surface-border">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary text-headline-md" data-icon="school">school</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Edukora Academic</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 items-center">
<a className="text-secondary font-label-md transition-colors hover:text-primary" href="#">Accueil</a>
<a className="text-primary font-bold font-label-md" href="#">Diagnostic</a>
<a className="text-secondary font-label-md transition-colors hover:text-primary" href="#">Planning</a>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-surface-border flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-015.png" alt="A professional studio portrait of a university student looking confident and engaged, set against a clean, softly lit academic background with cool blue and grey tones to match the corporate educational aesthetic of the dashboard." />
</div>
</div>
</header>
<main className="pt-24 pb-24 md:pb-12 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto min-h-[calc(100vh-64px)] flex flex-col items-center justify-center relative">

<div className="w-full max-w-md mb-stack-md">
<div className="flex justify-between items-center mb-2">
<span className="text-label-md font-label-md text-secondary uppercase tracking-wider">Étape 3 de 4</span>
<span className="text-label-md font-label-md text-primary font-bold">Analyse IA</span>
</div>
<div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary w-3/4 transition-all duration-1000 ease-out"></div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter w-full">

<div className="lg:col-span-5 flex flex-col items-center justify-center space-y-stack-md py-stack-md">
<div className="relative group">
<div className="absolute -inset-4 bg-primary/5 rounded-full blur-2xl pulse-soft"></div>

<div className="relative w-48 h-48 md:w-64 md:h-64 floating-kora flex items-center justify-center bg-surface-container-lowest rounded-full border border-surface-border shadow-lg overflow-hidden">
<img className="w-40 h-40 md:w-56 md:h-56 object-contain" src="/images/ecran-016.png" alt="A friendly and intelligent robotic AI tutor mascot named Kora, designed with sleek white surfaces and warm blue accents. Kora has expressive digital eyes and a welcoming posture, positioned in a clean, brightly lit modern lab environment that conveys professional pedagogical authority." />
<div className="scanning-line"></div>
</div>

<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
<div className="loading-ring opacity-30"></div>
</div>
</div>
<div className="text-center space-y-2">
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">Analyse de vos résultats...</h2>
<p className="text-body-lg text-secondary max-w-sm mx-auto">Kora examine vos réponses pour construire votre parcours d'apprentissage personnalisé.</p>
</div>
</div>

<div className="lg:col-span-7 flex flex-col space-y-gutter">
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="bg-surface-container-lowest border border-surface-border p-stack-md rounded-xl relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-impact-emerald"></div>
<div className="flex items-center gap-3 mb-stack-sm">
<span className="material-symbols-outlined text-impact-emerald" data-icon="task_alt">task_alt</span>
<h3 className="font-title-md text-title-md">Points forts identifiés</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-impact-emerald text-sm mt-0.5" data-icon="check_circle">check_circle</span>
<span className="text-body-md text-on-surface-variant">Maîtrise des concepts théoriques fondamentaux</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-impact-emerald text-sm mt-0.5" data-icon="check_circle">check_circle</span>
<span className="text-body-md text-on-surface-variant">Excellente capacité de synthèse critique</span>
</li>
</ul>
<div className="mt-4 pt-4 border-t border-surface-border/50 flex items-center justify-between">
<span className="text-label-md text-secondary uppercase">Score d'assurance</span>
<span className="text-metric-num text-impact-emerald">88%</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border p-stack-md rounded-xl relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-validation-amber"></div>
<div className="flex items-center gap-3 mb-stack-sm">
<span className="material-symbols-outlined text-validation-amber" data-icon="trending_up">trending_up</span>
<h3 className="font-title-md text-title-md">Axes d'amélioration</h3>
</div>
<ul className="space-y-3">
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-validation-amber text-sm mt-0.5" data-icon="error_outline">error_outline</span>
<span className="text-body-md text-on-surface-variant">Application pratique des algorithmes complexes</span>
</li>
<li className="flex items-start gap-2">
<span className="material-symbols-outlined text-validation-amber text-sm mt-0.5" data-icon="error_outline">error_outline</span>
<span className="text-body-md text-on-surface-variant">Gestion du temps lors des épreuves rédactionnelles</span>
</li>
</ul>
<div className="mt-4 pt-4 border-t border-surface-border/50">
<div className="flex items-center justify-between mb-1">
<span className="text-label-md text-secondary uppercase">Priorité de remédiation</span>
<span className="text-label-md font-bold text-validation-amber">ÉLEVÉE</span>
</div>
<div className="h-1 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-validation-amber w-2/3"></div>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border p-stack-md rounded-xl">
<div className="flex flex-col md:flex-row justify-between gap-gutter">
<div className="space-y-1">
<span className="text-label-md text-secondary uppercase block">Charge cognitive estimée</span>
<div className="flex items-center gap-4">
<span className="text-metric-num font-metric-num">Optimale</span>
<span className="material-symbols-outlined text-expert-purple" data-icon="neurology">neurology</span>
</div>
</div>
<div className="flex-1 max-w-xs">
<div className="flex justify-between mb-2">
<span className="text-label-md text-secondary uppercase">Traitement des données</span>
<span className="text-label-md font-bold text-primary" id="progress-pct">74%</span>
</div>
<div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-primary transition-all duration-300" id="progress-bar" style={{"width":"74%"}}></div>
</div>
</div>
</div>

<div className="mt-stack-md h-24 w-full bg-surface-container-low rounded-lg flex items-end px-4 gap-2 overflow-hidden border border-surface-border/30">
<div className="flex-1 bg-primary/20 h-1/4 rounded-t-sm"></div>
<div className="flex-1 bg-primary/20 h-2/4 rounded-t-sm"></div>
<div className="flex-1 bg-primary/20 h-1/3 rounded-t-sm"></div>
<div className="flex-1 bg-primary/30 h-3/4 rounded-t-sm"></div>
<div className="flex-1 bg-primary/40 h-2/3 rounded-t-sm"></div>
<div className="flex-1 bg-primary/60 h-4/5 rounded-t-sm pulse-soft"></div>
<div className="flex-1 bg-primary/20 h-1/5 rounded-t-sm"></div>
<div className="flex-1 bg-primary/30 h-1/2 rounded-t-sm"></div>
</div>
</div>

<div className="flex justify-end pt-4">
<button className="bg-primary text-on-primary font-bold px-8 py-3 rounded-lg flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md group">
                        Générer mon plan final
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe px-4 bg-surface-container-lowest border-t border-surface-border">
<a className="flex flex-col items-center justify-center text-secondary font-label-md transition-all" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span>Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold bg-secondary-container/30 rounded-full px-4 py-1 font-label-md scale-95 transition-transform" href="#">
<span className="material-symbols-outlined" data-icon="analytics">analytics</span>
<span>Diagnostic</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary font-label-md transition-all" href="#">
<span className="material-symbols-outlined" data-icon="event_note">event_note</span>
<span>Planning</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary font-label-md transition-all" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span>Profil</span>
</a>
</nav>
<script>
        // Micro-interaction: Progress bar simulation
        const progressBar = document.getElementById('progress-bar');
        const progressPct = document.getElementById('progress-pct');
        let currentProgress = 74;

        const simulateProgress = () =&gt; &#123;
            if (currentProgress &lt; 99) &#123;
                currentProgress += Math.random() * 2;
                const capped = Math.min(Math.floor(currentProgress), 99);
                progressBar.style.width = `$&#123;capped&#125;%`;
                progressPct.textContent = `$&#123;capped&#125;%`;
            &#125;
        &#125;;

        setInterval(simulateProgress, 1500);

        // Interaction for "Generate" button
        document.querySelector('button').addEventListener('click', function() &#123;
            this.innerHTML = `
                &lt;span class="animate-spin material-symbols-outlined"&gt;sync&lt;/span&gt;
                Préparation du parcours...
            `;
            this.classList.add('opacity-80', 'pointer-events-none');
            
            setTimeout(() =&gt; &#123;
                alert("Analyse terminée ! Redirection vers votre plan d'étude personnalisé...");
            &#125;, 1000);
        &#125;);
    </script>

    </div>
  );
}
