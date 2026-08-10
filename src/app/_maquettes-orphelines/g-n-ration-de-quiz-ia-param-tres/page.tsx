import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Configuration IA" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-primary dark:bg-surface-container-highest shadow-sm flex justify-between items-center px-4 h-16 z-40">
<div className="flex items-center gap-3">
<button className="text-on-primary p-2 hover:bg-primary-container/20 transition-colors rounded-lg active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary dark:text-primary-fixed-dim text-headline-md tracking-tight">Edukora Professor</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-4">
<span className="text-on-primary font-bold cursor-pointer transition-colors">Bibliothèque</span>
<span className="text-on-primary/80 cursor-pointer hover:text-on-primary transition-colors">Generate</span>
<span className="text-on-primary/80 cursor-pointer hover:text-on-primary transition-colors">Drafts</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden bg-white/10 flex items-center justify-center">
<img className="w-full h-full object-cover" src="/images/ecran-158.png" alt="A professional portrait of an Ivorian academic professor with a warm, authoritative expression. He is wearing a crisp white shirt and dark blazer against a soft-focus university library background. The lighting is high-key and optimistic, following a professional light-mode aesthetic with subtle Academic Blue accents." />
</div>
</div>
</header>
<main className="flex-grow flex flex-col max-w-5xl w-full mx-auto px-4 py-8 mb-24">

<div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto pb-2">
<div className="flex items-center gap-2 shrink-0">
<div className="w-8 h-8 rounded-full flex items-center justify-center step-inactive font-bold">1</div>
<span className="text-label-sm text-on-surface-variant whitespace-nowrap">Source</span>
</div>
<div className="h-px w-8 bg-outline-variant"></div>
<div className="flex items-center gap-2 shrink-0">
<div className="w-8 h-8 rounded-full flex items-center justify-center step-active font-bold">2</div>
<span className="text-label-sm text-primary font-bold whitespace-nowrap">Configuration IA</span>
</div>
<div className="h-px w-8 bg-outline-variant"></div>
<div className="flex items-center gap-2 shrink-0">
<div className="w-8 h-8 rounded-full flex items-center justify-center step-inactive font-bold">3</div>
<span className="text-label-sm text-on-surface-variant whitespace-nowrap">Vérification</span>
</div>
</div>

<div className="mb-10 text-center md:text-left">
<h2 className="font-display font-bold text-primary text-3xl md:text-4xl mb-2">Configuration IA</h2>
<p className="text-on-surface-variant text-body-lg">Personnalisez la manière dont Kora IA extrait les questions.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm space-y-4">
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-primary">category</span>
<h3 className="font-headline font-semibold text-lg">Type de Question</h3>
</div>
<div className="flex flex-wrap gap-3">
<button className="px-4 py-2 rounded-full border-2 border-primary bg-primary-fixed text-on-primary-fixed font-medium flex items-center gap-2 active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                        QCM
                    </button>
<button className="px-4 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary transition-all flex items-center gap-2 active:scale-95">
<span className="material-symbols-outlined text-sm">add_circle</span>
                        Réponses libres
                    </button>
<button className="px-4 py-2 rounded-full border-2 border-outline-variant text-on-surface-variant hover:border-primary-container hover:text-primary transition-all flex items-center gap-2 active:scale-95">
<span className="material-symbols-outlined text-sm">add_circle</span>
                        Vrai/Faux
                    </button>
</div>
<p className="text-label-xs text-on-surface-variant italic">Sélection multiple possible.</p>
</section>

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm space-y-6">
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-secondary">signal_cellular_alt</span>
<h3 className="font-headline font-semibold text-lg">Difficulté</h3>
</div>
<div className="relative pt-2">
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" max={3} min={1} type="range" value="2" />
<div className="flex justify-between mt-4 text-label-sm font-semibold text-on-surface-variant">
<span>Facile</span>
<span className="text-primary">Intermédiaire</span>
<span>Difficile</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm space-y-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary">format_list_numbered</span>
<h3 className="font-headline font-semibold text-lg">Nombre de Questions</h3>
</div>
<span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-lg text-label-sm font-bold">Recommended: 10</span>
</div>
<div className="flex items-center gap-4">
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container text-primary active:scale-90 transition-all">
<span className="material-symbols-outlined">remove</span>
</button>
<input className="flex-grow h-12 text-center text-xl font-bold border-none bg-surface-container-low rounded-lg focus:ring-2 focus:ring-primary" max={50} min={5} type="number" value="10" />
<button className="w-12 h-12 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container text-primary active:scale-90 transition-all">
<span className="material-symbols-outlined">add</span>
</button>
</div>
<p className="text-label-xs text-on-surface-variant text-center">Générer entre 5 et 50 questions par session.</p>
</section>

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm space-y-4">
<div className="flex items-center gap-3 mb-2">
<span className="material-symbols-outlined text-on-secondary-fixed-variant">psychology</span>
<h3 className="font-headline font-semibold text-lg">Focus de l'extraction</h3>
</div>
<div className="space-y-3">
<label className="flex items-center p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
<input checked={true} className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
<span className="ml-3 font-medium text-on-surface group-hover:text-primary transition-colors">Concepts clés</span>
</label>
<label className="flex items-center p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
<span className="ml-3 font-medium text-on-surface group-hover:text-primary transition-colors">Dates &amp; Formules</span>
</label>
<label className="flex items-center p-3 rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
<input className="w-5 h-5 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
<span className="ml-3 font-medium text-on-surface group-hover:text-primary transition-colors">Analyse critique</span>
</label>
</div>
</section>
</div>

<div className="mt-12 opacity-40 hover:opacity-100 transition-opacity duration-700">
<div className="h-24 w-full rounded-2xl bg-gradient-to-r from-primary/10 via-secondary-container/10 to-tertiary-container/10 flex items-center justify-center border border-dashed border-outline-variant">
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined animate-pulse">auto_awesome</span>
<span className="font-label text-label-sm uppercase tracking-widest">Moteur IA Kora actif</span>
</div>
</div>
</div>
</main>

<footer className="fixed bottom-0 w-full bg-surface dark:bg-surface-container-lowest z-50 rounded-t-xl shadow-[0_-4px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant">
<div className="max-w-5xl mx-auto px-4 h-20 flex justify-between items-center">
<button className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-2 rounded-lg active:scale-95">
<span className="material-symbols-outlined">arrow_back</span>
<span className="font-label text-label-xs mt-1">Retour</span>
</button>
<button className="bg-secondary text-on-secondary px-8 h-12 rounded-lg font-bold flex items-center gap-3 shadow-md hover:brightness-110 active:scale-95 transition-all">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>auto_fix_high</span>
                Lancer la génération
            </button>

<div className="hidden md:flex flex-col items-end">
<span className="text-label-sm font-bold text-primary">Estimation</span>
<span className="text-label-xs text-on-surface-variant">~45 secondes</span>
</div>
</div>
</footer>

<div className="h-20 md:hidden"></div>
<script>
        // Simple interactivity for the multi-select tags
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            if(btn.innerText.trim() === 'Réponses libres' || btn.innerText.trim() === 'Vrai/Faux') &#123;
                btn.addEventListener('click', function() &#123;
                    this.classList.toggle('border-primary');
                    this.classList.toggle('bg-primary-fixed');
                    this.classList.toggle('text-on-primary-fixed');
                    this.classList.toggle('border-outline-variant');
                    this.classList.toggle('text-on-surface-variant');
                    
                    const icon = this.querySelector('.material-symbols-outlined');
                    if (icon.innerText === 'add_circle') &#123;
                        icon.innerText = 'check_circle';
                        icon.style.fontVariationSettings = "'FILL' 1";
                    &#125; else &#123;
                        icon.innerText = 'add_circle';
                        icon.style.fontVariationSettings = "'FILL' 0";
                    &#125;
                &#125;);
            &#125;
        &#125;);

        // Stepper for number of questions
        const numInput = document.querySelector('input[type="number"]');
        const buttons = document.querySelectorAll('section button');
        buttons.forEach(btn =&gt; &#123;
            if(btn.innerHTML.includes('remove')) &#123;
                btn.onclick = () =&gt; &#123; if(numInput.value &gt; 5) numInput.value--; &#125;;
            &#125;
            if(btn.innerHTML.includes('add')) &#123;
                btn.onclick = () =&gt; &#123; if(numInput.value &lt; 50) numInput.value++; &#125;;
            &#125;
        &#125;);
    </script>

    </div>
  );
}
