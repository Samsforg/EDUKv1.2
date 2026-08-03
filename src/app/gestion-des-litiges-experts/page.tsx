import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Gestion des Litiges" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-lowest border-r border-surface-border flex flex-col py-stack-md z-50">
<div className="px-6 mb-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Edukora</h1>
</div>
<nav className="flex-1 space-y-1 px-3">

<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg font-body-md" href="#">
<span className="material-symbols-outlined">dashboard</span>
                Tableau de bord
            </a>

<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg font-body-md" href="#">
<span className="material-symbols-outlined">fact_check</span>
                Validation de fiches
            </a>

<div className="relative">
<div className="active-tab-indicator"></div>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-primary rounded-lg font-bold font-body-md scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>gavel</span>
                    Gestion des litiges
                </a>
</div>

<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg font-body-md" href="#">
<span className="material-symbols-outlined">query_stats</span>
                Statistiques d'impact
            </a>

<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-colors rounded-lg font-body-md" href="#">
<span className="material-symbols-outlined">school</span>
                Réseau d'experts
            </a>
</nav>

<div className="mt-auto px-6 py-4 border-t border-surface-border">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-168.png" alt="A professional headshot of a middle-aged female professor with glasses, wearing a smart navy blazer, in a brightly lit academic office environment with bookshelves in the blurred background. The style is clean, corporate, and high-fidelity, reflecting academic authority and professional trust." />
</div>
<div>
<p className="font-title-md text-primary font-bold">Dr. Elena Vance</p>
<p className="text-label-md text-on-surface-variant">Expert Senior</p>
</div>
</div>
</div>
</aside>

<main className="ml-[280px] min-h-screen">

<header className="fixed top-0 right-0 w-[calc(100%-280px)] bg-surface-container-lowest border-b border-surface-border h-20 px-container-padding-desktop flex justify-between items-center z-40">
<h2 className="font-headline-md text-headline-md font-bold text-primary">Gestion des Litiges</h2>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container rounded-full transition-all">
<span className="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
<div className="h-8 w-[1px] bg-surface-border mx-2"></div>
<div className="flex items-center gap-2">
<span className="font-label-md text-on-surface-variant">ID: EDU-8829</span>
</div>
</div>
</header>

<div className="pt-28 px-container-padding-desktop pb-10 space-y-gutter">

<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border flex flex-col md:flex-row justify-between items-center gap-4">
<div className="flex gap-2 p-1 bg-surface-container rounded-lg">
<button className="px-6 py-2 rounded-md bg-surface-container-lowest text-primary font-bold shadow-sm transition-all">Tous</button>
<button className="px-6 py-2 rounded-md text-on-surface-variant hover:bg-surface-container-low transition-all">Urgent</button>
<button className="px-6 py-2 rounded-md text-on-surface-variant hover:bg-surface-container-low transition-all">Résolu</button>
</div>
<div className="relative w-full md:w-96">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border border-surface-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-body-md" placeholder="Rechercher une fiche ou un motif..." type="text" />
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border">
<p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Litiges en attente</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-headline-lg text-primary">24</span>
<span className="text-validation-amber font-bold flex items-center text-label-md mb-2">
<span className="material-symbols-outlined text-[16px] mr-1">priority_high</span> 5 Urgents
                        </span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border">
<p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Temps moyen de résolution</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-headline-lg text-primary">4.2h</span>
<span className="text-impact-emerald font-bold flex items-center text-label-md mb-2">
<span className="material-symbols-outlined text-[16px] mr-1">trending_down</span> -12%
                        </span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border">
<p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-2">Taux de précision initial</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-headline-lg text-primary">98.5%</span>
<span className="text-expert-purple font-bold flex items-center text-label-md mb-2">
<span className="material-symbols-outlined text-[16px] mr-1">verified</span> stable
                        </span>
</div>
</div>
</div>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-surface-border">
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Fiche de Révision</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase text-center">Priorité</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Motif du Signalement</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Statut</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase">Date</th>
<th className="px-6 py-4 font-label-md text-on-surface-variant uppercase text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-border">

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-5 border-l-4 border-l-validation-amber">
<div className="flex flex-col">
<span className="font-title-md text-primary font-bold">Mathématiques - Intégrales Complexes</span>
<span className="text-label-md text-on-surface-variant">Auteur: Marc Durand (L3)</span>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error-container text-error">
                                        HAUTE
                                    </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-validation-amber text-[20px]">warning</span>
<span className="font-body-md">Erreur factuelle</span>
</div>
</td>
<td className="px-6 py-5">
<span className="inline-flex items-center gap-1.5 font-label-md text-on-surface-variant">
<span className="w-2 h-2 rounded-full bg-validation-amber animate-pulse"></span>
                                        À traiter
                                    </span>
</td>
<td className="px-6 py-5">
<span className="font-body-md text-on-surface-variant">Aujourd'hui, 09:42</span>
</td>
<td className="px-6 py-5 text-right">
<button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded font-bold text-label-md transition-all">
                                        Détails
                                    </button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-5 border-l-4 border-l-outline-variant">
<div className="flex flex-col">
<span className="font-title-md text-primary font-bold">Histoire - Révolution Française</span>
<span className="text-label-md text-on-surface-variant">Auteur: Sophie L. (M1)</span>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">
                                        MOYENNE
                                    </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">copyright</span>
<span className="font-body-md">Plagiat suspecté</span>
</div>
</td>
<td className="px-6 py-5">
<span className="inline-flex items-center gap-1.5 font-label-md text-primary">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                                        En cours d'examen
                                    </span>
</td>
<td className="px-6 py-5">
<span className="font-body-md text-on-surface-variant">Hier, 14:15</span>
</td>
<td className="px-6 py-5 text-right">
<button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded font-bold text-label-md transition-all">
                                        Détails
                                    </button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-5 border-l-4 border-l-impact-emerald">
<div className="flex flex-col opacity-60">
<span className="font-title-md text-primary font-bold line-through">Biologie - Synthèse Protéique</span>
<span className="text-label-md text-on-surface-variant">Auteur: Jean-Paul M. (L2)</span>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-surface-container text-on-surface-variant">
                                        BASSE
                                    </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2 text-on-surface-variant opacity-60">
<span className="material-symbols-outlined text-[20px]">block</span>
<span className="font-body-md">Contenu inapproprié</span>
</div>
</td>
<td className="px-6 py-5">
<span className="inline-flex items-center gap-1.5 font-label-md text-impact-emerald">
<span className="material-symbols-outlined text-[16px]">check_circle</span>
                                        Résolu
                                    </span>
</td>
<td className="px-6 py-5">
<span className="font-body-md text-on-surface-variant">22 Oct 2023</span>
</td>
<td className="px-6 py-5 text-right">
<button className="border border-primary text-primary hover:bg-secondary-container px-4 py-2 rounded font-bold text-label-md transition-all">
                                        Historique
                                    </button>
</td>
</tr>

<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-5 border-l-4 border-l-validation-amber">
<div className="flex flex-col">
<span className="font-title-md text-primary font-bold">Économie - Courbe de Laffer</span>
<span className="text-label-md text-on-surface-variant">Auteur: Amélie Dubois</span>
</div>
</td>
<td className="px-6 py-5 text-center">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error-container text-error">
                                        HAUTE
                                    </span>
</td>
<td className="px-6 py-5">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-validation-amber text-[20px]">warning</span>
<span className="font-body-md">Erreur factuelle</span>
</div>
</td>
<td className="px-6 py-5">
<span className="inline-flex items-center gap-1.5 font-label-md text-on-surface-variant">
<span className="w-2 h-2 rounded-full bg-validation-amber animate-pulse"></span>
                                        À traiter
                                    </span>
</td>
<td className="px-6 py-5">
<span className="font-body-md text-on-surface-variant">23 Oct 2023</span>
</td>
<td className="px-6 py-5 text-right">
<button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded font-bold text-label-md transition-all">
                                        Détails
                                    </button>
</td>
</tr>
</tbody>
</table>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

<div className="bg-gradient-to-br from-primary to-primary-container p-8 rounded-2xl text-on-primary flex items-center justify-between shadow-lg relative overflow-hidden">
<div className="relative z-10 space-y-4 max-w-md">
<h3 className="font-headline-md text-headline-md font-bold">Ressources d'arbitrage</h3>
<p className="font-body-md opacity-90">Consultez les directives académiques mises à jour pour la résolution des litiges complexes et le plagiat généré par IA.</p>
<button className="bg-on-primary text-primary px-6 py-2 rounded font-bold hover:bg-secondary-fixed transition-all">Télécharger le guide PDF</button>
</div>
<span className="material-symbols-outlined text-[120px] opacity-10 absolute -right-4 -bottom-4 select-none">gavel</span>
</div>

<div className="bg-surface-container-highest p-8 rounded-2xl flex flex-col justify-center border border-surface-border">
<div className="flex items-start gap-4">
<div className="p-3 bg-primary-container/20 rounded-xl">
<span className="material-symbols-outlined text-primary">support_agent</span>
</div>
<div className="space-y-2">
<h3 className="font-title-md text-primary font-bold">Besoin d'un second avis ?</h3>
<p className="font-body-md text-on-surface-variant">Transférez le dossier à un autre expert senior pour une validation collégiale.</p>
<a className="inline-block mt-2 font-bold text-primary hover:underline" href="#">Ouvrir un ticket d'arbitrage →</a>
</div>
</div>
</div>
</div>
</div>
</main>

<div className="fixed bottom-8 right-8 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-2xl translate-y-20 opacity-0 transition-all duration-300 flex items-center gap-3 z-[60]" id="toast">
<span className="material-symbols-outlined text-impact-emerald">check_circle</span>
<p className="font-body-md">Action enregistrée avec succès.</p>
</div>
<script>
        // Micro-interaction for Detail Buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                if (this.innerText === 'Détails') &#123;
                    const toast = document.getElementById('toast');
                    toast.classList.remove('translate-y-20', 'opacity-0');
                    setTimeout(() =&gt; &#123;
                        toast.classList.add('translate-y-20', 'opacity-0');
                    &#125;, 3000);
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
