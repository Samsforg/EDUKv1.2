import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Gestionnaire de Ressources Live" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col md:flex-row" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant shadow-sm z-50">
<div className="p-6">
<h1 className="text-headline-md font-bold text-primary mb-8">Edukora</h1>
<div className="flex items-center gap-3 mb-8 p-3 bg-surface-container-low rounded-xl">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">DK</div>
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
<span className="font-body text-body-md">Ressources</span>
</a>
</nav>
</div>
</aside>

<header className="md:hidden fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-surface border-b border-outline-variant z-40">
<span className="material-symbols-outlined text-primary cursor-pointer">menu</span>
<h1 className="font-headline font-bold text-primary text-xl">Edukora Professeur</h1>
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-xs text-on-primary-container">DK</div>
</header>

<main className="flex-1 md:ml-64 px-4 md:px-8 py-20 md:py-8 min-h-screen">

<header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="text-3xl font-extrabold text-primary mb-2">Gestionnaire de Ressources</h2>
<p className="text-on-surface-variant max-w-2xl">Téléchargez et associez vos supports de cours (PDF, exercices) aux sessions en direct pour vos élèves de Terminale D.</p>
</div>
<button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-transform active:scale-95 shadow-md">
<span className="material-symbols-outlined">cloud_upload</span>
                Nouveau Fichier
            </button>
</header>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<section className="lg:col-span-4 space-y-6">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">link</span>
                        Lier à un Live
                    </h3>
<form className="space-y-4">
<div>
<label className="block text-label-sm font-semibold mb-1 text-on-surface-variant">Choisir le Live</label>
<select className="w-full bg-surface-container-low border-none rounded-lg p-3 text-body-md focus:ring-2 focus:ring-primary">
<option>Probabilités - Révisions BAC</option>
<option>Fonctions Logarithmes</option>
<option>Synthèse Organique - Chimie</option>
</select>
</div>
<div>
<label className="block text-label-sm font-semibold mb-1 text-on-surface-variant">Sélectionner les fichiers</label>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer group bg-surface-bright">
<span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary transition-colors">upload_file</span>
<p className="text-body-md text-on-surface-variant mt-2">Cliquez pour parcourir vos documents</p>
<p className="text-xs text-outline mt-1">PDF, DOCX ou ZIP max 20Mo</p>
</div>
</div>
<button className="w-full bg-primary py-3 text-white rounded-lg font-bold hover:bg-primary-container transition-colors" type="submit">
                            Enregistrer la liaison
                        </button>
</form>
</div>
<div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant relative overflow-hidden">
<div className="relative z-10">
<h3 className="text-lg font-bold text-primary mb-1">Impact du Support</h3>
<p className="text-sm text-on-surface-variant mb-4">Moyenne de téléchargements par session</p>
<div className="flex items-baseline gap-2">
<span className="text-4xl font-extrabold text-primary">84%</span>
<span className="text-tertiary font-bold text-sm flex items-center">
<span className="material-symbols-outlined text-sm">trending_up</span> +12%
                            </span>
</div>
<p className="text-xs text-on-surface-variant mt-2">Vs le mois dernier</p>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-9xl">analytics</span>
</div>
</div>
</section>

<section className="lg:col-span-8">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden h-full flex flex-col">
<div className="p-6 border-b border-outline-variant flex justify-between items-center bg-surface-bright">
<h3 className="text-xl font-bold text-primary">Ressources Partagées</h3>
<div className="flex items-center gap-2 bg-surface-container p-2 rounded-lg">
<span className="material-symbols-outlined text-on-surface-variant">search</span>
<input className="bg-transparent border-none focus:ring-0 text-sm w-48" placeholder="Rechercher un fichier..." type="text" />
</div>
</div>
<div className="flex-1 overflow-x-auto custom-scrollbar">
<table className="w-full text-left">
<thead className="bg-surface-container-low text-label-sm text-on-surface-variant">
<tr>
<th className="px-6 py-4 font-semibold">Nom du fichier</th>
<th className="px-6 py-4 font-semibold">Session associée</th>
<th className="px-6 py-4 font-semibold">Type</th>
<th className="px-6 py-4 font-semibold text-center">Téléchargements</th>
<th className="px-6 py-4 font-semibold text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-red-100 flex items-center justify-center text-red-600">
<span className="material-symbols-outlined">picture_as_pdf</span>
</div>
<div>
<p className="font-semibold text-on-surface">Cours_Proba_Terminal_D.pdf</p>
<p className="text-xs text-outline">1.2 MB • Uploadé hier</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="text-sm text-on-surface-variant truncate max-w-[150px] inline-block">Probabilités - Révisions...</span>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">PDF</span>
</td>
<td className="px-6 py-4 text-center">
<div className="flex flex-col items-center">
<span className="font-bold text-primary">248</span>
<div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
<div className="bg-tertiary h-full" style={{"width":"75%"}}></div>
</div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
<span className="material-symbols-outlined">description</span>
</div>
<div>
<p className="font-semibold text-on-surface">Serie_Exercices_04.docx</p>
<p className="text-xs text-outline">450 KB • Uploadé le 12/05</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="text-sm text-on-surface-variant truncate max-w-[150px] inline-block">Fonctions Logarithmes</span>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">DOCX</span>
</td>
<td className="px-6 py-4 text-center">
<div className="flex flex-col items-center">
<span className="font-bold text-primary">156</span>
<div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
<div className="bg-tertiary h-full" style={{"width":"45%"}}></div>
</div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-orange-100 flex items-center justify-center text-orange-600">
<span className="material-symbols-outlined">folder_zip</span>
</div>
<div>
<p className="font-semibold text-on-surface">Annexes_Chimie_BAC.zip</p>
<p className="text-xs text-outline">8.5 MB • Uploadé le 10/05</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<span className="text-sm text-on-surface-variant truncate max-w-[150px] inline-block">Synthèse Organique</span>
</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">ZIP</span>
</td>
<td className="px-6 py-4 text-center">
<div className="flex flex-col items-center">
<span className="font-bold text-primary">312</span>
<div className="w-16 h-1 bg-surface-container-high rounded-full overflow-hidden mt-1">
<div className="bg-tertiary h-full" style={{"width":"90%"}}></div>
</div>
</div>
</td>
<td className="px-6 py-4 text-right">
<div className="flex justify-end gap-2">
<button className="p-2 hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
<button className="p-2 hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
</div>

<div className="mt-8 bg-primary-container/10 border border-primary-container p-4 rounded-xl flex items-start gap-4">
<span className="material-symbols-outlined text-primary-container">info</span>
<div>
<p className="text-primary font-bold">Conseil Pédagogique</p>
<p className="text-sm text-on-primary-fixed-variant">Associer un PDF de résumé de cours au moins 30 minutes avant le début du Live augmente le taux de réussite des exercices interactifs de 25%.</p>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-safe bg-surface border-t border-outline-variant shadow-lg z-50">
<a className="flex-1 py-2 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs">Bord</span>
</a>
<a className="flex-1 py-2 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-label text-label-xs">En direct</span>
</a>
<a className="flex-1 py-2 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-label text-label-xs">Discussion</span>
</a>
<a className="flex-1 py-2 flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>folder_open</span>
<span className="font-label text-label-xs">Docs</span>
</a>
</nav>
<script>
        // Simple Interaction logic
        document.querySelectorAll('button, a').forEach(el =&gt; &#123;
            el.addEventListener('click', (e) =&gt; &#123;
                const ripple = document.createElement('div');
                ripple.className = 'ripple';
                // Add ripple effect logic here if desired
            &#125;);
        &#125;);

        // Hover animation logic for rows
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row =&gt; &#123;
            row.addEventListener('mouseenter', () =&gt; &#123;
                row.classList.add('translate-x-1');
            &#125;);
            row.addEventListener('mouseleave', () =&gt; &#123;
                row.classList.remove('translate-x-1');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
