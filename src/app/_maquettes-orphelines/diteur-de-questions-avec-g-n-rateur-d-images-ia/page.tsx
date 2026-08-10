import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Éditeur de Questions" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container z-50 shadow-none">
<div className="flex justify-between items-center px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer hover:bg-primary-container/20 p-2 rounded-full transition-all">menu</span>
<span className="brand text-2xl font-bold tracking-tight">Edukora Pro</span>
</div>
<div className="hidden md:flex items-center gap-8">
<nav className="flex gap-6">
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors text-sm font-medium" href="#">Tableau de bord</a>
<a className="text-on-primary font-bold border-b-2 border-secondary transition-all text-sm" href="#">Mes Quiz</a>
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors text-sm font-medium" href="#">Ressources</a>
</nav>
<div className="h-10 w-10 rounded-full bg-surface-container overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-125.png" alt="Close up portrait of a professional African professor with glasses, smiling confidently, wearing a formal suit, set against a blurred academic background of a university hallway. The lighting is soft and natural, emphasizing trust and authority in a modern light-mode interface style." />
</div>
</div>
<div className="md:hidden">
<span className="material-symbols-outlined text-on-primary">account_circle</span>
</div>
</div>
</header>
<main className="flex-1 flex flex-col items-center w-full max-w-7xl mx-auto px-4 md:px-8 pt-6 pb-24">

<div className="w-full mb-8">
<div className="flex justify-between items-end mb-3">
<div>
<span className="text-sm font-medium text-primary uppercase tracking-wider">Création du Quiz</span>
<h2 className="text-2xl font-bold text-on-surface">Éditeur de Questions</h2>
</div>
<div className="text-right">
<span className="text-headline-md font-bold text-primary">4</span>
<span className="text-on-surface-variant">/10 questions</span>
</div>
</div>
<div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-[40%] rounded-full shadow-[0_0_8px_rgba(0,158,96,0.4)]"></div>
</div>
</div>
<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

<aside className="hidden lg:flex lg:col-span-3 flex-col gap-4">
<div className="bg-surface-container-low p-5 rounded-xl border border-outline-variant">
<h3 className="font-bold text-sm text-on-surface-variant mb-4 uppercase tracking-tighter">Structure du Quiz</h3>
<div className="grid grid-cols-4 gap-3">
<button className="h-10 w-10 flex items-center justify-center rounded-lg bg-tertiary text-on-tertiary font-bold text-sm ring-2 ring-tertiary ring-offset-2">1</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg bg-tertiary text-on-tertiary font-bold text-sm ring-2 ring-tertiary ring-offset-2">2</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg bg-tertiary text-on-tertiary font-bold text-sm ring-2 ring-tertiary ring-offset-2">3</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold text-sm shadow-lg transform scale-110">4</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-dashed border-outline-variant text-outline hover:border-primary hover:text-primary transition-all">5</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-dashed border-outline-variant text-outline">6</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-dashed border-outline-variant text-outline">7</button>
<button className="h-10 w-10 flex items-center justify-center rounded-lg border-2 border-dashed border-outline-variant text-outline">8</button>
</div>
</div>
<div className="bg-primary-container/10 p-5 rounded-xl border border-primary-container/20">
<div className="flex items-center gap-3 mb-2 text-primary">
<span className="material-symbols-outlined">lightbulb</span>
<span className="font-bold text-sm">Conseil Pédagogique</span>
</div>
<p className="text-xs text-on-surface-variant leading-relaxed">
                        Variez les distracteurs pour mieux évaluer la compréhension réelle de l'étudiant. Évitez les options "Toutes les réponses ci-dessus".
                    </p>
</div>
</aside>

<section className="lg:col-span-9 space-y-6">

<div className="glass-card p-6 md:p-8 rounded-2xl shadow-sm">
<div className="flex items-center justify-between mb-6">
<span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-bold uppercase">Question à choix multiple (QCM)</span>
<div className="flex gap-2">
<button className="p-2 hover:bg-surface-container rounded-lg text-outline transition-colors" title="Paramètres">
<span className="material-symbols-outlined">settings</span>
</button>
<button className="p-2 hover:bg-error/10 rounded-lg text-error transition-colors" title="Supprimer">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<label className="block text-sm font-bold text-on-surface mb-2">Énoncé de la question</label>
<textarea className="w-full bg-surface-container-lowest border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-body-md min-h-[120px] transition-all" placeholder="Saisissez votre question ici... (ex: Quelle est la capitale économique de la Côte d'Ivoire ?)">Quelle est la fonction principale des mitochondries au sein d'une cellule eucaryote ?</textarea>
</div><div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">image</span>
<h3 className="font-bold text-on-surface">Illustrations</h3>
</div>
<span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Kora IA</span>
</div>
<div className="space-y-4">
<div className="flex flex-col gap-3">
<label className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Générateur d'images IA</label>
<div className="flex flex-col md:flex-row gap-3">
<div className="flex-1">
<input className="w-full bg-surface-container-lowest border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl px-4 py-3 text-sm transition-all" placeholder="Décrivez l'image souhaitée..." type="text" />
</div>
<button className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-on-secondary font-bold rounded-xl shadow-md hover:brightness-110 transition-all whitespace-nowrap">
<span className="material-symbols-outlined">auto_awesome</span>
                    Générer avec Kora IA
                </button>
</div>
</div>
<div className="w-full h-48 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center bg-surface-container-lowest/50 text-outline-variant">
<span className="material-symbols-outlined text-4xl mb-2">add_photo_alternate</span>
<p className="text-xs font-medium">L'image générée apparaîtra ici</p>
</div>
</div>
</div>

<div className="grid grid-cols-1 gap-4">
<div className="flex items-center gap-4 group">
<div className="flex-shrink-0 flex flex-col items-center gap-1">
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" name="correct_answer" type="radio" />
<div className="w-8 h-8 bg-surface-container border-2 border-outline-variant rounded-full peer peer-checked:bg-tertiary peer-checked:border-tertiary flex items-center justify-center transition-all">
<span className="material-symbols-outlined text-white text-lg scale-0 peer-checked:scale-100 transition-transform" style={{"fontVariationSettings":"'FILL' 1"}}>check</span>
</div>
</label>
<span className="text-[10px] font-bold text-outline-variant group-focus-within:text-tertiary">VALIDE</span>
</div>
<div className="flex-1 bg-surface-container-lowest border border-outline-variant group-focus-within:border-tertiary group-focus-within:ring-1 group-focus-within:ring-tertiary rounded-xl p-4 flex items-center transition-all">
<input className="w-full border-none focus:ring-0 p-0 text-body-md font-medium text-on-surface bg-transparent" placeholder="Réponse A" type="text" value="Production d'énergie sous forme d'ATP" />
<span className="text-outline-variant font-bold text-xs ml-2">A</span>
</div>
</div>
<div className="flex items-center gap-4 group">
<div className="flex-shrink-0 flex flex-col items-center gap-1">
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" name="correct_answer" type="radio" />
<div className="w-8 h-8 bg-surface-container border-2 border-outline-variant rounded-full peer peer-checked:bg-tertiary peer-checked:border-tertiary flex items-center justify-center transition-all">
<span className="material-symbols-outlined text-white text-lg scale-0 peer-checked:scale-100 transition-transform" style={{"fontVariationSettings":"'FILL' 1"}}>check</span>
</div>
</label>
<span className="text-[10px] font-bold text-outline-variant">VALIDE</span>
</div>
<div className="flex-1 bg-surface-container-lowest border border-outline-variant focus-within:border-primary rounded-xl p-4 flex items-center transition-all">
<input className="w-full border-none focus:ring-0 p-0 text-body-md text-on-surface bg-transparent" placeholder="Réponse B" type="text" value="Synthèse des protéines ribosomiques" />
<span className="text-outline-variant font-bold text-xs ml-2">B</span>
</div>
</div>
<div className="flex items-center gap-4 group">
<div className="flex-shrink-0 flex flex-col items-center gap-1">
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" name="correct_answer" type="radio" />
<div className="w-8 h-8 bg-surface-container border-2 border-outline-variant rounded-full peer peer-checked:bg-tertiary peer-checked:border-tertiary flex items-center justify-center transition-all">
<span className="material-symbols-outlined text-white text-lg scale-0 peer-checked:scale-100 transition-transform" style={{"fontVariationSettings":"'FILL' 1"}}>check</span>
</div>
</label>
<span className="text-[10px] font-bold text-outline-variant">VALIDE</span>
</div>
<div className="flex-1 bg-surface-container-lowest border border-outline-variant focus-within:border-primary rounded-xl p-4 flex items-center transition-all">
<input className="w-full border-none focus:ring-0 p-0 text-body-md text-on-surface bg-transparent" placeholder="Réponse C" type="text" value="Stockage de l'information génétique" />
<span className="text-outline-variant font-bold text-xs ml-2">C</span>
</div>
</div>
<div className="flex items-center gap-4 group">
<div className="flex-shrink-0 flex flex-col items-center gap-1">
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" name="correct_answer" type="radio" />
<div className="w-8 h-8 bg-surface-container border-2 border-outline-variant rounded-full peer peer-checked:bg-tertiary peer-checked:border-tertiary flex items-center justify-center transition-all">
<span className="material-symbols-outlined text-white text-lg scale-0 peer-checked:scale-100 transition-transform" style={{"fontVariationSettings":"'FILL' 1"}}>check</span>
</div>
</label>
<span className="text-[10px] font-bold text-outline-variant">VALIDE</span>
</div>
<div className="flex-1 bg-surface-container-lowest border border-outline-variant focus-within:border-primary rounded-xl p-4 flex items-center transition-all">
<input className="w-full border-none focus:ring-0 p-0 text-body-md text-on-surface bg-transparent" placeholder="Réponse D" type="text" value="Digestion des déchets cellulaires" />
<span className="text-outline-variant font-bold text-xs ml-2">D</span>
</div>
</div>
</div>

<div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">psychology</span>
<h3 className="font-bold text-on-surface">Feedback Pédagogique</h3>
</div>
<textarea className="w-full bg-surface-container-lowest border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl p-4 text-sm min-h-[80px] transition-all" placeholder="Expliquez pourquoi la réponse A est correcte et aidez l'étudiant à comprendre son erreur si il se trompe.">Les mitochondries sont souvent décrites comme les "centrales énergétiques" de la cellule car elles effectuent la respiration cellulaire pour générer de l'ATP (Adénosine Triphosphate).</textarea>
</div>

<div className="flex flex-wrap gap-4 pt-4">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-surface-container-high hover:bg-surface-variant text-on-surface font-semibold rounded-xl transition-all">
<span className="material-symbols-outlined">visibility</span>
                        Aperçu
                    </button>
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-outline hover:bg-surface-container-low text-on-surface font-semibold rounded-xl transition-all">
<span className="material-symbols-outlined">save</span>
                        Brouillon
                    </button>
<div className="hidden md:block flex-grow"></div>
<button className="w-full md:w-auto px-10 py-3 bg-secondary text-on-secondary font-bold rounded-xl shadow-lg shadow-secondary/30 hover:brightness-110 active:scale-95 transition-all">
                        Finaliser le Quiz
                    </button>
</div>
</section>
</div>
</main>

<button className="fixed bottom-20 right-6 md:bottom-10 md:right-10 flex items-center gap-3 bg-primary text-on-primary px-6 py-4 rounded-full shadow-2xl hover:bg-primary-container transition-all group z-50">
<span className="material-symbols-outlined font-bold">add</span>
<span className="font-bold tracking-tight">Ajouter une question</span>
</button>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant shadow-md flex justify-around items-center h-16 px-4">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label text-label-xs font-medium">Quiz</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">help</span>
<span className="font-label text-label-xs font-medium">Aide</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for radio selection
        const radioInputs = document.querySelectorAll('input[name="correct_answer"]');
        radioInputs.forEach(input =&gt; &#123;
            input.addEventListener('change', (e) =&gt; &#123;
                // Visual feedback logic could go here if needed for more complex states
            &#125;);
        &#125;);

        // Simple draft saving notification logic
        const saveDraftBtn = document.querySelector('button:contains("Brouillon")');
        if(saveDraftBtn) &#123;
            saveDraftBtn.addEventListener('click', () =&gt; &#123;
                alert('Brouillon enregistré avec succès !');
            &#125;);
        &#125;
    </script>

    </div>
  );
}
