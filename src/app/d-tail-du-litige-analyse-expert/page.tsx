import type { Metadata } from "next";

export const metadata: Metadata = { title: "Détail du Litige | Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-lowest border-r border-surface-border flex flex-col py-stack-md z-50">

<div className="px-6 mb-8 flex flex-col items-start gap-3">
<div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-111.png" alt="A professional studio portrait of a female university professor, Dr. Elena Vance. She has a knowledgeable and kind expression, wearing elegant academic attire. The background is a soft-focus library with shelves of scholarly books. The lighting is soft and natural, emphasizing a high-end corporate and intellectual aesthetic with blue and white tones." />
</div>
<div>
<h2 className="font-headline-md text-headline-md font-bold text-primary">Dr. Elena Vance</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Expert Senior en Pédagogie</p>
<p className="font-label-md text-label-md text-outline mt-1 uppercase tracking-wider">ID: EDU-8829</p>
</div>
</div>

<nav className="flex-1 px-4 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-label-md text-label-md">Validation de fiches</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-primary rounded-lg font-bold scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined">gavel</span>
<span className="font-label-md text-label-md">Gestion des litiges</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined">query_stats</span>
<span className="font-label-md text-label-md">Statistiques d'impact</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg group" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Réseau d'experts</span>
</a>
</nav>
</aside>

<header className="fixed top-0 right-0 w-[calc(100%-280px)] bg-surface-container-lowest border-b border-surface-border flex justify-between items-center px-container-padding-desktop h-20 z-40">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container rounded-full transition-all">
<span className="material-symbols-outlined text-primary">menu</span>
</button>
<h1 className="font-title-md text-title-md font-bold text-primary">Détail du Litige #LIT-4492</h1>
</div>
<div className="flex items-center gap-4">
<div className="px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">Expert Privilégié</span>
</div>
<button className="w-10 h-10 rounded-full overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-112.png" alt="Avatar icon for a profile picture, clean minimalist design with corporate blue accents, matching the professional professor dashboard style." />
</button>
</div>
</header>

<main className="ml-[280px] pt-20 p-container-padding-desktop min-h-screen">
<div className="max-w-7xl mx-auto">

<div className="flex items-center justify-between mb-8">
<button className="flex items-center gap-2 text-primary hover:underline font-body-md">
<span className="material-symbols-outlined">arrow_back</span>
                    Retour à la liste des litiges
                </button>
<div className="flex items-center gap-3">
<span className="font-label-md text-label-md text-outline uppercase">Statut actuel:</span>
<span className="px-3 py-1 bg-validation-amber/10 text-validation-amber border border-validation-amber/20 rounded-lg font-label-md flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">pending</span>
                        En cours d'examen
                    </span>
</div>
</div>

<div className="grid grid-cols-12 gap-gutter">

<div className="col-span-12 lg:col-span-8 space-y-gutter">

<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 relative overflow-hidden">
<div className="absolute top-0 left-0 w-1 h-full bg-validation-amber"></div>
<h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">description</span>
                            Contenu contesté
                        </h3>
<div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant/30 flex items-start gap-4">
<div className="w-20 h-28 bg-white border border-surface-border rounded shadow-sm flex items-center justify-center">
<span className="material-symbols-outlined text-4xl text-outline-variant">article</span>
</div>
<div className="flex-1">
<h4 className="font-body-lg text-body-lg font-bold text-on-surface">Les bases de la thermodynamique quantique</h4>
<p className="font-body-md text-body-md text-on-surface-variant mt-1 line-clamp-2">Ce document explore les principes fondamentaux de la thermodynamique appliqués aux systèmes quantiques, incluant les cycles de Carnot quantiques...</p>
<div className="mt-4 flex items-center gap-4">
<button className="text-primary font-label-md hover:underline flex items-center gap-1">
<span className="material-symbols-outlined text-sm">open_in_new</span> Consulter la fiche complète
                                    </button>
<span className="text-outline-variant">|</span>
<span className="font-label-md text-label-md text-outline">Auteur: ID-STUD-112</span>
</div>
</div>
</div>
</section>

<section className="bg-white border border-surface-border rounded-xl p-6">
<h3 className="font-title-md text-title-md mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">report</span>
                            Détails du signalement
                        </h3>
<div className="grid grid-cols-2 gap-6 mb-8">
<div className="p-4 bg-surface-bright rounded-lg border border-surface-border">
<span className="font-label-md text-label-md text-outline block mb-1">Signalé par</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">account_circle</span>
<span className="font-body-md text-body-md font-bold">Étudiant ID: 22941-X</span>
</div>
</div>
<div className="p-4 bg-surface-bright rounded-lg border border-surface-border">
<span className="font-label-md text-label-md text-outline block mb-1">Date du signalement</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">calendar_today</span>
<span className="font-body-md text-body-md font-bold">14 Octobre 2023, 10:24</span>
</div>
</div>
</div>
<div className="mb-8">
<h4 className="font-label-md text-label-md text-outline uppercase mb-2">Motif &amp; Commentaire</h4>
<p className="font-body-md text-body-md text-on-surface leading-relaxed p-4 bg-surface-container-low rounded-lg italic">
                                "La fiche contient des erreurs conceptuelles majeures au chapitre 3. L'explication de l'entropie de von Neumann mélange les concepts avec l'entropie classique de Shannon sans distinction claire, ce qui induit les étudiants en erreur pour l'examen final."
                            </p>
</div>
<div>
<h4 className="font-label-md text-label-md text-outline uppercase mb-3">Preuves &amp; Pièces jointes</h4>
<div className="flex flex-wrap gap-3">
<div className="flex items-center gap-3 p-3 border border-surface-border rounded-lg bg-white hover:bg-surface-bright cursor-pointer transition-colors w-full sm:w-auto">
<span className="material-symbols-outlined text-validation-amber">image</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md">screenshot_errata.png</span>
<span className="text-[10px] text-outline">1.2 MB</span>
</div>
</div>
<div className="flex items-center gap-3 p-3 border border-surface-border rounded-lg bg-white hover:bg-surface-bright cursor-pointer transition-colors w-full sm:w-auto">
<span className="material-symbols-outlined text-primary">picture_as_pdf</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md">comparatif_cours.pdf</span>
<span className="text-[10px] text-outline">4.5 MB</span>
</div>
</div>
</div>
</div>
</section>

<section className="bg-white border border-surface-border rounded-xl p-6">
<h3 className="font-title-md text-title-md mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">history</span>
                            Historique des actions
                        </h3>
<div className="space-y-6">

<div className="relative pl-8 workflow-step">
<div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-surface-container flex items-center justify-center z-10">
<span className="material-symbols-outlined text-[14px]">flag</span>
</div>
<div>
<p className="font-body-md text-body-md font-bold">Signalement créé</p>
<p className="font-body-sm text-[12px] text-on-surface-variant">14/10/2023 - 10:24 • Système</p>
</div>
</div>

<div className="relative pl-8 workflow-step">
<div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center z-10">
<span className="material-symbols-outlined text-[14px]">visibility</span>
</div>
<div>
<p className="font-body-md text-body-md font-bold">Pris en charge par l'expert</p>
<p className="font-body-sm text-[12px] text-on-surface-variant">15/10/2023 - 09:15 • Dr. Elena Vance</p>
</div>
</div>

<div className="relative pl-8 workflow-step">
<div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-surface-container flex items-center justify-center z-10">
<span className="material-symbols-outlined text-[14px]">edit_note</span>
</div>
<div>
<p className="font-body-md text-body-md font-bold">Note interne ajoutée</p>
<p className="font-body-sm text-[12px] text-on-surface-variant">15/10/2023 - 11:30 • Dr. Elena Vance</p>
<p className="mt-1 text-sm text-outline italic">"Besoin de vérifier la source citée en page 12."</p>
</div>
</div>
</div>
</section>
</div>

<div className="col-span-12 lg:col-span-4 space-y-gutter">

<section className="bg-white border border-surface-border rounded-xl p-6 sticky top-24">
<h3 className="font-title-md text-title-md mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">task_alt</span>
                            Prendre une décision
                        </h3>
<form className="space-y-6">

<div>
<label className="block font-body-md font-bold mb-2">Note interne (confidentielle)</label>
<textarea className="w-full border border-surface-border rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="Ajoutez vos réflexions sur ce litige ici..." rows={4}></textarea>
</div>

<div>
<label className="block font-body-md font-bold mb-2">Changer le statut</label>
<select className="w-full border border-surface-border rounded-lg p-3 text-body-md bg-white focus:ring-2 focus:ring-primary/20 outline-none">
<option>En cours d'examen</option>
<option>En attente d'informations</option>
<option>Litige résolu</option>
</select>
</div>
<hr className="border-surface-border" />

<div className="space-y-3">
<button className="w-full bg-error text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" type="button">
<span className="material-symbols-outlined">delete_forever</span>
                                    Valider le signalement
                                </button>
<button className="w-full bg-primary text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined">cancel</span>
                                    Rejeter le signalement
                                </button>
<button className="w-full border border-primary text-primary font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors" type="button">
<span className="material-symbols-outlined">edit</span>
                                    Demander une correction
                                </button>
</div>
<p className="text-center font-label-md text-label-md text-outline">
                                Ces actions notifieront l'auteur de la fiche.
                            </p>
</form>
</section>

<section className="bg-expert-purple/5 border border-expert-purple/20 rounded-xl p-6">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-expert-purple">info</span>
<h4 className="font-title-md text-title-md text-expert-purple">Rappel Expert</h4>
</div>
<p className="font-body-md text-body-md text-on-secondary-fixed-variant leading-relaxed">
                            En tant qu'expert sénior, votre décision sur ce litige est finale. Elle impactera directement le score de fiabilité de l'auteur et la qualité globale de la bibliothèque Edukora.
                        </p>
<div className="mt-4 pt-4 border-t border-expert-purple/10">
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md text-on-surface-variant">Confiance de l'IA</span>
<span className="text-impact-emerald font-bold">88%</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-2">
<div className="bg-impact-emerald h-full rounded-full w-[88%]"></div>
</div>
</div>
</section>
</div>
</div>
</div>
</main>
<script>
        // Simple micro-interaction for buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('mousedown', () =&gt; &#123;
                btn.classList.add('scale-95');
            &#125;);
            btn.addEventListener('mouseup', () =&gt; &#123;
                btn.classList.remove('scale-95');
            &#125;);
            btn.addEventListener('mouseleave', () =&gt; &#123;
                btn.classList.remove('scale-95');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
