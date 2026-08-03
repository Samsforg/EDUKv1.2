import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Academic - Votre Planning Personnalisé" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 bg-surface border-b border-surface-border">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-headline-md" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora Academic</span>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-2">
<div className="w-8 h-1 bg-primary rounded-full"></div>
<div className="w-8 h-1 bg-primary rounded-full"></div>
<div className="w-8 h-1 bg-primary rounded-full"></div>
<div className="w-8 h-1 bg-primary rounded-full"></div>
</div>
<span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Étape 4 sur 4</span>
</div>
</header>
<main className="pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">

<section className="mb-stack-md fade-in">
<h1 className="font-headline-lg text-headline-lg text-primary mb-2">Votre plan de réussite est prêt.</h1>
<p className="font-body-lg text-body-lg text-secondary max-w-2xl">
                Basé sur vos résultats au diagnostic, nous avons structuré votre semaine pour maximiser vos points d'impact en Maths et Physique, tout en maintenant votre excellent niveau en Français.
            </p>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<aside className="lg:col-span-3 flex flex-col gap-base">
<div className="bg-surface-container-lowest border border-surface-border p-stack-sm rounded-lg fade-in" style={{"animationDelay":"0.1s"}}>
<span className="font-label-md text-label-md text-secondary uppercase">Focus Prioritaire</span>
<div className="mt-2 flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-validation-amber/10 flex items-center justify-center">
<span className="material-symbols-outlined text-validation-amber">functions</span>
</div>
<div>
<p className="font-title-md text-title-md text-on-surface">Mathématiques</p>
<p className="font-label-md text-label-md text-secondary">Révision intensive</p>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-stack-sm rounded-lg fade-in" style={{"animationDelay":"0.2s"}}>
<span className="font-label-md text-label-md text-secondary uppercase">Intensité Hebdomadaire</span>
<div className="mt-2">
<span className="font-metric-num text-metric-num text-primary">12h</span>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-impact-emerald text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>trending_up</span>
<span className="font-label-md text-label-md text-impact-emerald">+3h vs moyenne</span>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-stack-sm rounded-lg fade-in" style={{"animationDelay":"0.3s"}}>
<span className="font-label-md text-label-md text-secondary uppercase">Statut Expert</span>
<div className="mt-2 flex items-center gap-2 bg-expert-purple/10 p-2 rounded-full border border-expert-purple/20">
<span className="material-symbols-outlined text-expert-purple text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md text-expert-purple">Profil Analytique</span>
</div>
</div>
</aside>

<div className="lg:col-span-9 bg-surface-container-lowest border border-surface-border rounded-lg overflow-hidden flex flex-col fade-in" style={{"animationDelay":"0.4s"}}>

<div className="grid grid-cols-8 border-b border-surface-border bg-surface-container-low/50">
<div className="p-4 border-r border-surface-border"></div>
<div className="p-4 text-center border-r border-surface-border"><p className="font-label-md text-label-md text-secondary">LUN</p></div>
<div className="p-4 text-center border-r border-surface-border"><p className="font-label-md text-label-md text-secondary">MAR</p></div>
<div className="p-4 text-center border-r border-surface-border"><p className="font-label-md text-label-md text-secondary">MER</p></div>
<div className="p-4 text-center border-r border-surface-border"><p className="font-label-md text-label-md text-secondary">JEU</p></div>
<div className="p-4 text-center border-r border-surface-border"><p className="font-label-md text-label-md text-secondary">VEN</p></div>
<div className="p-4 text-center border-r border-surface-border"><p className="font-label-md text-label-md text-secondary">SAM</p></div>
<div className="p-4 text-center"><p className="font-label-md text-label-md text-secondary">DIM</p></div>
</div>

<div className="flex-1 overflow-y-auto">

<div className="grid grid-cols-8 border-b border-surface-border group">
<div className="p-4 border-r border-surface-border bg-surface-container-low/30 flex flex-col justify-center">
<span className="font-label-md text-label-md text-secondary">09:00</span>
</div>

<div className="p-2 border-r border-surface-border relative">
<div className="bg-primary/5 border-l-4 border-primary p-2 rounded-sm h-full group-hover:bg-primary/10 transition-colors">
<p className="font-label-md text-[10px] text-primary uppercase font-bold">Maths</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">Algèbre Linéaire</p>
</div>
</div>

<div className="p-2 border-r border-surface-border"></div>

<div className="p-2 border-r border-surface-border">
<div className="bg-expert-purple/5 border-l-4 border-expert-purple p-2 rounded-sm h-full">
<p className="font-label-md text-[10px] text-expert-purple uppercase font-bold">Physique</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">Optique</p>
</div>
</div>

<div className="p-2 border-r border-surface-border"></div>

<div className="p-2 border-r border-surface-border">
<div className="bg-primary/5 border-l-4 border-primary p-2 rounded-sm h-full">
<p className="font-label-md text-[10px] text-primary uppercase font-bold">Maths</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">Analyse</p>
</div>
</div>

<div className="p-2 border-r border-surface-border bg-surface-container-low/20"></div>

<div className="p-2 bg-surface-container-low/20"></div>
</div>

<div className="grid grid-cols-8 border-b border-surface-border">
<div className="p-4 border-r border-surface-border bg-surface-container-low/30 flex flex-col justify-center">
<span className="font-label-md text-label-md text-secondary">14:00</span>
</div>

<div className="p-2 border-r border-surface-border"></div>

<div className="p-2 border-r border-surface-border">
<div className="bg-impact-emerald/5 border-l-4 border-impact-emerald p-2 rounded-sm h-full">
<p className="font-label-md text-[10px] text-impact-emerald uppercase font-bold">Français</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">Commentaire de texte</p>
</div>
</div>

<div className="p-2 border-r border-surface-border"></div>

<div className="p-2 border-r border-surface-border">
<div className="bg-primary/5 border-l-4 border-primary p-2 rounded-sm h-full">
<p className="font-label-md text-[10px] text-primary uppercase font-bold">Maths</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">Probabilités</p>
</div>
</div>

<div className="p-2 border-r border-surface-border"></div>

<div className="p-2 border-r border-surface-border">
<div className="bg-validation-amber/5 border-l-4 border-validation-amber p-2 rounded-sm h-full">
<p className="font-label-md text-[10px] text-validation-amber uppercase font-bold">Révision</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">QCM Synthèse</p>
</div>
</div>

<div className="p-2"></div>
</div>

<div className="grid grid-cols-8">
<div className="p-4 border-r border-surface-border bg-surface-container-low/30 flex flex-col justify-center">
<span className="font-label-md text-label-md text-secondary">18:00</span>
</div>
<div className="p-2 border-r border-surface-border"></div>
<div className="p-2 border-r border-surface-border"></div>
<div className="p-2 border-r border-surface-border">
<div className="bg-expert-purple/5 border-l-4 border-expert-purple p-2 rounded-sm h-full">
<p className="font-label-md text-[10px] text-expert-purple uppercase font-bold">Physique</p>
<p className="font-body-md text-[11px] leading-tight text-on-surface">Mécanique</p>
</div>
</div>
<div className="p-2 border-r border-surface-border"></div>
<div className="p-2 border-r border-surface-border"></div>
<div className="p-2 border-r border-surface-border"></div>
<div className="p-2"></div>
</div>
</div>

<div className="p-4 border-t border-surface-border bg-surface-bright flex gap-6 items-center">
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-primary rounded-full"></span>
<span className="font-label-md text-label-md text-secondary">Maths</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-expert-purple rounded-full"></span>
<span className="font-label-md text-label-md text-secondary">Physique</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-impact-emerald rounded-full"></span>
<span className="font-label-md text-label-md text-secondary">Français</span>
</div>
<div className="flex items-center gap-2">
<span className="w-3 h-3 bg-validation-amber rounded-full"></span>
<span className="font-label-md text-label-md text-secondary">Évaluation</span>
</div>
</div>
</div>
</div>

<div className="mt-stack-md flex flex-col md:flex-row items-center justify-between gap-gutter fade-in" style={{"animationDelay":"0.5s"}}>
<div className="flex items-start gap-4">
<span className="material-symbols-outlined text-validation-amber bg-validation-amber/10 p-3 rounded-full" style={{"fontVariationSettings":"'FILL' 1"}}>lightbulb</span>
<div>
<p className="font-title-md text-title-md text-on-surface">Astuce du coach</p>
<p className="font-body-md text-body-md text-secondary">Commencez par vos sessions de Maths le matin quand votre attention est à son maximum.</p>
</div>
</div>
<button className="w-full md:w-auto px-10 py-4 bg-primary-container text-on-primary font-bold text-body-lg rounded-lg shadow-sm hover:bg-primary transition-all active:scale-95 flex items-center justify-center gap-3">
                Commencer mon parcours
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</main>

<div className="fixed top-0 right-0 -z-10 opacity-10">
<div className="w-[600px] h-[600px] bg-primary rounded-full blur-[120px] -mr-64 -mt-64"></div>
</div>


<script>
        // Micro-interaction for calendar cells
        document.querySelectorAll('.bg-primary\\/5, .bg-expert-purple\\/5, .bg-impact-emerald\\/5, .bg-validation-amber\\/5').forEach(cell =&gt; &#123;
            cell.addEventListener('mouseenter', () =&gt; &#123;
                cell.classList.add('shadow-md', 'scale-[1.02]');
                cell.classList.remove('shadow-sm');
            &#125;);
            cell.addEventListener('mouseleave', () =&gt; &#123;
                cell.classList.remove('shadow-md', 'scale-[1.02]');
                cell.classList.add('shadow-sm');
            &#125;);
        &#125;);

        // Simulating the "Start Journey" transition
        const startBtn = document.querySelector('button');
        startBtn.addEventListener('click', () =&gt; &#123;
            startBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;refresh&lt;/span&gt; Chargement...';
            setTimeout(() =&gt; &#123;
                // Redirect logic would go here
                alert('Direction le Dashboard Edukora !');
            &#125;, 1000);
        &#125;);
    </script>

    </div>
  );
}
