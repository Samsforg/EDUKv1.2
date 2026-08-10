import type { Metadata } from "next";

export const metadata: Metadata = { title: "Rapport d'Analyse de Fraude - Détail | Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky flex justify-between items-center px-4 h-16 w-full bg-surface dark:bg-surface-container-low border-b border-outline-variant dark:border-outline z-50">
<div className="flex items-center gap-3">
<button className="material-symbols-outlined text-primary cursor-pointer active:opacity-80 p-2 hover:bg-surface-container-high transition-colors rounded-full">arrow_back</button>
<h1 className="font-headline font-bold text-primary text-headline-md">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<span className="hidden md:block font-label text-label-sm text-on-surface-variant">Pr. Koffi Kouassi</span>
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed border border-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-305.png" alt="A professional portrait of an Ivorian university professor, middle-aged with a kind but serious expression, wearing a crisp white shirt and dark blazer. The lighting is soft and corporate, set against a blurred background of a modern academic library with rows of books in Côte d'Ivoire. The aesthetic is clean, trustworthy, and high-quality." />
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-4 py-8 mb-24 lg:mb-8">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
<div>
<nav className="flex gap-2 text-label-xs text-on-surface-variant mb-2">
<span className="uppercase">Rapports de Fraude</span>
<span>/</span>
<span className="text-primary font-bold">Détail du Cas #829</span>
</nav>
<h2 className="text-display-lg-mobile md:text-display-lg font-bold text-primary">Rapport d'Analyse de Fraude</h2>
</div>
<div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant/30">
<div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
</div>
<div>
<p className="font-bold text-on-surface">Moussa Traoré</p>
<p className="text-label-sm text-on-surface-variant">SVT - Terminale C | 12 Avril 2024</p>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 flex flex-col gap-6">

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<div className="flex items-center gap-2 mb-4 text-primary">
<span className="material-symbols-outlined">quiz</span>
<h3 className="font-bold text-label-sm uppercase tracking-wider">Question Analysée</h3>
</div>
<p className="text-body-lg font-semibold text-on-surface italic">
                        "Expliquez le mécanisme de la synapse neuro-musculaire et le rôle des ions calcium dans la contraction."
                    </p>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden flex flex-col">
<div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<div className="flex gap-4">
<span className="flex items-center gap-1 text-label-xs font-semibold"><span className="w-3 h-3 plagiarism-highlight block border-b-2"></span> Plagiat Web</span>
<span className="flex items-center gap-1 text-label-xs font-semibold"><span className="w-3 h-3 ai-highlight block border-b-2"></span> Probabilité IA</span>
</div>
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors">full_screen</button>
</div>
<div className="p-8 text-body-md leading-relaxed text-on-surface whitespace-pre-wrap">
Le mécanisme de la synapse neuro-musculaire commence par l'arrivée d'un potentiel d'action au bouton synaptique. <span className="plagiarism-highlight" title="Source: Wikipedia - Transmission Synaptique">Cette dépolarisation provoque l'ouverture des canaux calciques voltage-dépendants, entraînant une entrée massive d'ions Ca2+ dans l'élément présynaptique.</span> L'augmentation de la concentration de calcium déclenche l'exocytose des vésicules contenant de l'acétylcholine.

<span className="ai-highlight" title="Indicateurs de structure GPT: 94% de confiance">L'acétylcholine diffuse ensuite dans la fente synaptique et se fixe sur les récepteurs spécifiques de la membrane post-synaptique (sarcolemme). Cela génère un potentiel de plaque motrice qui, s'il atteint le seuil, déclenche un nouveau potentiel d'action se propageant le long des tubules T.</span>

Enfin, ce signal provoque la libération du calcium stocké dans le réticulum sarcoplasmique, permettant la liaison entre actine et myosine et donc la contraction. <span className="plagiarism-highlight" title="Source: Manuel Scolaire CI - SVT Terminale">Sans calcium, le complexe troponine-tropomyosine bloque le site d'interaction, empêchant tout mouvement de glissement des filaments.</span>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-6">

<div className="grid grid-cols-2 gap-4">
<div className="bg-error-container p-4 rounded-xl border border-error/20 flex flex-col items-center text-center">
<span className="text-on-error-container text-label-xs font-bold uppercase mb-2">Plagiat</span>
<div className="text-4xl font-display font-bold text-on-error-container">42%</div>
<span className="text-on-error-container/70 text-xs mt-1">Niveau Critique</span>
</div>
<div className="bg-primary-container p-4 rounded-xl border border-primary/20 flex flex-col items-center text-center">
<span className="text-on-primary-container text-label-xs font-bold uppercase mb-2">Détection IA</span>
<div className="text-4xl font-display font-bold text-on-primary-container">68%</div>
<span className="text-on-primary-container/70 text-xs mt-1">Probable</span>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<h3 className="font-bold text-primary text-label-sm uppercase mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">link</span> Sources Identifiées
                    </h3>
<ul className="space-y-4">
<li className="group cursor-pointer">
<div className="flex justify-between items-start">
<span className="text-label-sm font-semibold text-on-surface line-clamp-1">Wikipedia: Transmission Neuro-musculaire</span>
<span className="text-error font-bold text-xs">28%</span>
</div>
<p className="text-[10px] text-on-surface-variant truncate">https://fr.wikipedia.org/wiki/Synapse...</p>
<div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
<div className="bg-error h-full" style={{"width":"28%"}}></div>
</div>
</li>
<li className="group cursor-pointer">
<div className="flex justify-between items-start">
<span className="text-label-sm font-semibold text-on-surface line-clamp-1">Archive Examens BAC 2022</span>
<span className="text-error font-bold text-xs">14%</span>
</div>
<p className="text-[10px] text-on-surface-variant truncate">https://edukora.ci/archives/svt-t-c-2022</p>
<div className="w-full bg-surface-container-high h-1 rounded-full mt-2 overflow-hidden">
<div className="bg-error h-full" style={{"width":"14%"}}></div>
</div>
</li>
</ul>
</div>

<div className="bg-white p-6 rounded-xl border-2 border-primary shadow-lg ring-4 ring-primary/5">
<h3 className="font-bold text-on-surface text-label-sm uppercase mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">gavel</span> Décision de l'Enseignant
                    </h3>
<div className="space-y-3">
<button className="w-full py-3 px-4 bg-error text-on-error font-bold rounded-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined">block</span>
                            Appliquer Pénalité (00/20)
                        </button>
<button className="w-full py-3 px-4 bg-primary text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container active:scale-95 transition-all">
<span className="material-symbols-outlined">mail</span>
                            Demander Clarification
                        </button>
<button className="w-full py-3 px-4 border border-outline text-on-surface-variant font-semibold rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container-low active:scale-95 transition-all">
<span className="material-symbols-outlined">done_all</span>
                            Ignorer l'Alerte
                        </button>
</div>
<div className="mt-6 pt-6 border-t border-outline-variant">
<label className="block text-label-xs font-bold text-on-surface-variant uppercase mb-2">Commentaires interne</label>
<textarea className="w-full h-24 bg-surface-container-low border-outline-variant rounded-lg text-body-md p-3 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Rédigez une note justificative..."></textarea>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-3 bg-surface dark:bg-surface-container border-t border-outline-variant dark:border-outline z-50 shadow-lg">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1 hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs">Tableau</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1 hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined">spellcheck</span>
<span className="font-label text-label-xs">Correction</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>assignment_late</span>
<span className="font-label text-label-xs font-bold">Rapports</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1 hover:text-primary transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</a>
</nav>

<div className="fixed bottom-24 left-1/2 -translate-x-1/2 transform scale-0 opacity-0 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 shadow-xl z-[60]" id="decision-toast">
<span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
<span className="font-body text-body-md">Décision enregistrée avec succès.</span>
</div>
<script>
        // Simple micro-interaction for buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                if(this.innerText.includes('Appliquer') || this.innerText.includes('Ignorer')) &#123;
                    const toast = document.getElementById('decision-toast');
                    toast.classList.remove('scale-0', 'opacity-0');
                    toast.classList.add('scale-100', 'opacity-100');
                    setTimeout(() =&gt; &#123;
                        toast.classList.add('scale-0', 'opacity-0');
                        toast.classList.remove('scale-100', 'opacity-100');
                    &#125;, 3000);
                &#125;
            &#125;);
        &#125;);

        // Hover effect for text highlighting
        const highlights = document.querySelectorAll('.plagiarism-highlight, .ai-highlight');
        highlights.forEach(h =&gt; &#123;
            h.addEventListener('mouseenter', function() &#123;
                this.style.backgroundColor = this.classList.contains('plagiarism-highlight') ? 'rgba(186, 26, 26, 0.3)' : 'rgba(0, 71, 171, 0.2)';
            &#125;);
            h.addEventListener('mouseleave', function() &#123;
                this.style.backgroundColor = '';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
