import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Portail Documentaire" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row" >

<aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant shadow-sm z-50">
<div className="p-6">
<h1 className="text-headline-md font-bold text-primary mb-8">Edukora Pro</h1>
<div className="flex items-center gap-3 mb-8 p-3 bg-surface-container-low rounded-xl border border-outline-variant/30">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">DK</div>
<div>
<p className="font-semibold text-on-surface leading-tight">Dr. Koffi</p>
<p className="text-xs text-on-surface-variant">Session BAC 2024</p>
</div>
</div>
<nav className="space-y-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-body text-body-md">Sessions Live</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-body text-body-md">Modération Chat</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-semibold shadow-sm" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body text-body-md">Portail Docs</span>
</a>
</nav>
</div>
</aside>

<header className="md:hidden fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-surface border-b border-outline-variant z-40">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
<h1 className="font-headline font-bold text-primary text-xl">Edukora Pro</h1>
</div>
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs text-white font-bold">DK</div>
</header>

<main className="flex-1 md:ml-64 px-4 md:px-8 py-20 md:py-8 min-h-screen">

<header className="mb-8">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
<div>
<h2 className="text-3xl font-extrabold text-primary mb-2">Portail Documentaire</h2>
<p className="text-on-surface-variant max-w-2xl">Gestion centralisée de vos ressources pédagogiques. Organisez vos supports de cours, fiches et annales pour vos élèves.</p>
</div>
<button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-transform active:scale-95 shadow-md">
<span className="material-symbols-outlined">add_circle</span>
                Nouveau Fichier
            </button>
</div>

<div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
<div className="relative flex-1 w-full">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all text-body-md" placeholder="Rechercher par nom, chapitre ou tag..." type="text" />
</div>
<div className="flex items-center gap-2 w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-surface-container border border-outline-variant rounded-xl text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-xl">filter_list</span>
<span>Filtrer</span>
</button>
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-surface-container border border-outline-variant rounded-xl text-on-surface hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-xl">sort</span>
<span>Trier</span>
</button>
</div>
</div>
</header>

<nav className="flex gap-2 mb-8 overflow-x-auto hide-scrollbar pb-2">
<button className="whitespace-nowrap px-6 py-2 bg-primary text-on-primary rounded-full font-semibold shadow-sm transition-colors">
            Tous les documents
        </button>
<button className="whitespace-nowrap px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-semibold hover:bg-surface-container-highest transition-colors border border-outline-variant/30">
            Supports de cours
        </button>
<button className="whitespace-nowrap px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-semibold hover:bg-surface-container-highest transition-colors border border-outline-variant/30">
            Fiches de révision
        </button>
<button className="whitespace-nowrap px-6 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-semibold hover:bg-surface-container-highest transition-colors border border-outline-variant/30">
            Annales d'examens
        </button>
</nav>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<section className="lg:col-span-8">
<div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-sm overflow-hidden flex flex-col h-full">
<div className="p-5 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
<h3 className="text-lg font-bold text-on-surface">Documents récents</h3>
<span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-2 py-1 rounded">24 fichiers</span>
</div>
<div className="flex-1 overflow-x-auto custom-scrollbar">
<table className="w-full text-left">
<thead className="bg-surface-container-low text-label-sm text-on-surface-variant uppercase tracking-wider">
<tr>
<th className="px-6 py-4 font-bold">Document</th>
<th className="px-6 py-4 font-bold">Détails</th>
<th className="px-6 py-4 font-bold text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-600 border border-red-100">
<span className="material-symbols-outlined text-3xl">picture_as_pdf</span>
</div>
<div>
<div className="flex items-center gap-2">
<p className="font-bold text-on-surface">Cours_Proba_Terminal_D.pdf</p>
<span className="inline-flex items-center gap-1 bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full text-[10px] font-bold border border-tertiary-container/30 uppercase">
<span className="material-symbols-outlined text-[12px]">verified</span> Certifiée
                                                </span>
</div>
<p className="text-xs text-on-surface-variant mt-1">1.2 MB • Probabilités - Révisions BAC</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-xs font-semibold text-outline">Uploadé hier</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-xs text-tertiary">download</span>
<span className="text-xs font-bold text-tertiary">248</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors"><span className="material-symbols-outlined text-on-surface-variant">edit</span></button>
<button className="p-2 hover:bg-red-50 hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-on-surface-variant">delete</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
<span className="material-symbols-outlined text-3xl">description</span>
</div>
<div>
<p className="font-bold text-on-surface">Serie_Exercices_Log.docx</p>
<p className="text-xs text-on-surface-variant mt-1">450 KB • Fonctions Logarithmes</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-xs font-semibold text-outline">Le 12/05/2024</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-xs text-on-surface-variant">download</span>
<span className="text-xs font-bold text-on-surface-variant">156</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors"><span className="material-symbols-outlined text-on-surface-variant">edit</span></button>
<button className="p-2 hover:bg-red-50 hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-on-surface-variant">delete</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 border border-orange-100">
<span className="material-symbols-outlined text-3xl">folder_zip</span>
</div>
<div>
<div className="flex items-center gap-2">
<p className="font-bold text-on-surface">Annexes_Chimie_Exam.zip</p>
<span className="inline-flex items-center gap-1 bg-tertiary-container/20 text-tertiary px-2 py-0.5 rounded-full text-[10px] font-bold border border-tertiary-container/30 uppercase">
<span className="material-symbols-outlined text-[12px]">verified</span> Certifiée
                                                </span>
</div>
<p className="text-xs text-on-surface-variant mt-1">8.5 MB • Synthèse Organique</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<p className="text-xs font-semibold text-outline">Le 10/05/2024</p>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-xs text-tertiary">download</span>
<span className="text-xs font-bold text-tertiary">312</span>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors"><span className="material-symbols-outlined text-on-surface-variant">edit</span></button>
<button className="p-2 hover:bg-red-50 hover:text-error rounded-full transition-colors"><span className="material-symbols-outlined text-on-surface-variant">delete</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>

<section className="lg:col-span-4 space-y-6">

<div className="bg-surface-container-highest p-6 rounded-2xl border border-outline-variant relative overflow-hidden shadow-sm">
<div className="relative z-10">
<div className="flex justify-between items-start mb-4">
<h3 className="text-lg font-bold text-primary">Impact Documentaire</h3>
<span className="p-2 bg-primary/10 text-primary rounded-lg">
<span className="material-symbols-outlined">trending_up</span>
</span>
</div>
<div className="flex flex-col gap-1 mb-6">
<span className="text-4xl font-extrabold text-primary">84%</span>
<p className="text-sm font-medium text-on-surface-variant">Taux de téléchargement global</p>
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between text-xs font-bold mb-1">
<span className="text-on-surface">Supports de cours</span>
<span className="text-primary">92%</span>
</div>
<div className="h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"92%"}}></div>
</div>
</div>
<div>
<div className="flex justify-between text-xs font-bold mb-1">
<span className="text-on-surface">Fiches de révision</span>
<span className="text-tertiary">78%</span>
</div>
<div className="h-2 bg-surface-container rounded-full overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{"width":"78%"}}></div>
</div>
</div>
</div>
<p className="text-[11px] text-on-surface-variant mt-4 italic">+12% d'engagement par rapport au mois dernier</p>
</div>
<div className="absolute -right-6 -bottom-6 opacity-5 pointer-events-none">
<span className="material-symbols-outlined text-[180px]">auto_graph</span>
</div>
</div>

<div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/50 border-dashed">
<h3 className="text-sm font-bold text-primary mb-3 flex items-center gap-2 uppercase tracking-tight">
<span className="material-symbols-outlined text-sm">link</span> Liaison Rapide
                </h3>
<p className="text-xs text-on-surface-variant mb-4">Liez instantanément un document existant à votre prochain Live.</p>
<div className="space-y-3">
<select className="w-full bg-white border border-outline-variant rounded-lg p-2 text-sm focus:ring-2 focus:ring-primary">
<option>Choisir un Live...</option>
<option>Révisions Probabilités</option>
<option>Session Examens Blancs</option>
</select>
<button className="w-full bg-surface-container-highest text-primary py-2 rounded-lg font-bold text-sm hover:bg-primary/5 transition-colors border border-primary/20">
                        Associer Fichier
                    </button>
</div>
</div>
</section>
</div>

<div className="mt-8 bg-primary-container/10 border border-primary-container/30 p-5 rounded-2xl flex items-start gap-4">
<div className="bg-primary-container/20 p-2 rounded-full">
<span className="material-symbols-outlined text-primary text-2xl">lightbulb</span>
</div>
<div>
<p className="text-primary font-bold">Conseil Pédagogique</p>
<p className="text-sm text-on-primary-fixed-variant mt-1 leading-relaxed">
                Mettre à disposition les <strong>fiches de révision</strong> 48h avant une évaluation augmente le score moyen des élèves de 15 points. N'oubliez pas d'utiliser le badge "Certifiée" pour valoriser vos contenus validés.
            </p>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-safe bg-surface border-t border-outline-variant shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
<a className="flex-1 py-3 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-[10px] font-semibold mt-0.5">Bord</span>
</a>
<a className="flex-1 py-3 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-label text-[10px] font-semibold mt-0.5">En direct</span>
</a>
<a className="flex-1 py-3 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-label text-[10px] font-semibold mt-0.5">Discussion</span>
</a>
<a className="flex-1 py-3 flex flex-col items-center justify-center text-primary relative transition-transform active:scale-95" href="#">
<div className="bg-primary-container/40 absolute inset-x-2 inset-y-1 rounded-xl -z-10"></div>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>menu_book</span>
<span className="font-label text-[10px] font-bold mt-0.5">Docs</span>
</a>
</nav>
<script>
    // Ripple and click effects
    document.querySelectorAll('button, a').forEach(el =&gt; &#123;
        el.addEventListener('click', (e) =&gt; &#123;
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
        &#125;);
    &#125;);

    // Mobile menu toggle logic could go here
</script>

    </div>
  );
}
