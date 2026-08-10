import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Tableau de bord de Fraude" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col h-full w-72 bg-surface-container-lowest fixed inset-y-0 left-0 z-50 p-4 shadow-md border-r border-outline-variant">
<div className="mb-8 px-2">
<span className="font-headline font-bold text-primary text-2xl tracking-tight">Edukora</span>
</div>
<div className="flex items-center gap-3 p-4 mb-8 bg-surface-container rounded-xl">
<div className="w-12 h-12 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center text-primary font-bold">
                PK
            </div>
<div>
<p className="font-semibold text-on-surface text-sm">Pr. Koffi Kouassi</p>
<p className="text-on-surface-variant text-xs">SVT - Terminale C</p>
</div>
</div>
<nav className="space-y-2 flex-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-body text-sm">Mes Classes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined">quiz</span>
<span className="font-body text-sm">Tests Blancs</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container font-semibold rounded-full shadow-sm" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>description</span>
<span className="font-body text-sm">Rapports de Fraude</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined">archive</span>
<span className="font-body text-sm">Archives</span>
</a>
</nav>
<div className="mt-auto border-t border-outline-variant pt-4">
<a className="flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container rounded-full transition-all duration-200" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-body text-sm">Déconnexion</span>
</a>
</div>
</aside>

<main className="flex-1 md:ml-72 pb-24 md:pb-8">

<header className="bg-surface sticky top-0 z-40 border-b border-outline-variant flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-primary">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-primary text-xl md:text-2xl">Tableau de bord de Fraude</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden sm:block text-right">
<p className="text-xs text-on-surface-variant font-medium">Session Active</p>
<p className="text-sm font-bold text-primary">Bac Blanc SVT</p>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-high border-2 border-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-primary">person</span>
</div>
</div>
</header>
<div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

<div className="col-span-1 sm:col-span-2 lg:col-span-2 glass-card rounded-xl p-6 flex flex-col justify-between overflow-hidden relative">
<div className="z-10">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
<span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
                            Analyse en cours
                        </div>
<h2 className="text-2xl font-bold text-on-surface mb-2">Session: Bac Blanc SVT 2024</h2>
<p className="text-on-surface-variant">Lycée Classique d'Abidjan • Terminale C</p>
</div>
<div className="mt-6 flex items-center gap-4 z-10">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold">AI</div>
<div className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-[10px] font-bold">DET</div>
</div>
<span className="text-xs font-medium text-on-surface-variant">Système de surveillance Edukora v4.2</span>
</div>
<span className="absolute -bottom-8 -right-8 material-symbols-outlined text-primary/5 text-[160px] pointer-events-none">security</span>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-center">
<p className="text-on-surface-variant text-sm font-medium mb-1">Copies Analysées</p>
<div className="flex items-end justify-between">
<span className="text-4xl font-bold text-primary">120</span>
<span className="text-tertiary text-xs font-bold bg-tertiary-container/20 px-2 py-1 rounded mb-1">98% complété</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full mt-4 overflow-hidden">
<div className="bg-tertiary h-full w-[98%] rounded-full"></div>
</div>
</div>

<div className="glass-card rounded-xl p-6 flex flex-col justify-center">
<p className="text-on-surface-variant text-sm font-medium mb-1">Taux d'Intégrité Global</p>
<div className="flex items-end justify-between">
<span className="text-4xl font-bold text-secondary">94.2%</span>
<span className="text-error text-xs font-bold mb-1">-0.8% vs session préc.</span>
</div>
<div className="flex items-center gap-1 mt-4">
<span className="material-symbols-outlined text-secondary text-sm">verified_user</span>
<span className="text-xs font-medium text-on-surface-variant">Validation académique stable</span>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center justify-between">
<h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-error">warning</span>
                        Alertes de Fraude (7)
                    </h3>
<div className="flex gap-2">
<button className="bg-surface-container px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span> Filtrer
                        </button>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                            Tout marquer comme vu
                        </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low border-b border-outline-variant">
<th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Étudiant</th>
<th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Niveau de Risque</th>
<th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Type de Détection</th>
<th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Heure</th>
<th className="px-6 py-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-error-container flex items-center justify-center text-error font-bold text-xs">BT</div>
<span className="font-semibold text-on-surface">Bakayoko Tidjane</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error text-on-error">ÉLEVÉ</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2 text-on-surface-variant text-sm">
<span className="material-symbols-outlined text-sm">content_copy</span> Plagiat (85%)
                                        </div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">10:45</td>
<td className="px-6 py-4 text-right">
<a className="text-primary font-bold text-sm hover:underline flex items-center justify-end gap-1" href="#">
                                            Détails <span className="material-symbols-outlined text-sm">chevron_right</span>
</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">MA</div>
<span className="font-semibold text-on-surface">Moussa Adama</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">MOYEN</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2 text-on-surface-variant text-sm">
<span className="material-symbols-outlined text-sm">psychology</span> Texte généré par IA
                                        </div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">10:52</td>
<td className="px-6 py-4 text-right">
<a className="text-primary font-bold text-sm hover:underline flex items-center justify-end gap-1" href="#">
                                            Détails <span className="material-symbols-outlined text-sm">chevron_right</span>
</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant font-bold text-xs">KE</div>
<span className="font-semibold text-on-surface">Kouamé Edwige</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-error text-on-error">ÉLEVÉ</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2 text-on-surface-variant text-sm">
<span className="material-symbols-outlined text-sm">visibility_off</span> Comportement inhabituel
                                        </div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">11:15</td>
<td className="px-6 py-4 text-right">
<a className="text-primary font-bold text-sm hover:underline flex items-center justify-end gap-1" href="#">
                                            Détails <span className="material-symbols-outlined text-sm">chevron_right</span>
</a>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-xs">DO</div>
<span className="font-semibold text-on-surface">Diallo Oumar</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container">MOYEN</span>
</td>
<td className="px-6 py-4">
<div className="flex items-center gap-2 text-on-surface-variant text-sm">
<span className="material-symbols-outlined text-sm">content_copy</span> Plagiat (42%)
                                        </div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">11:22</td>
<td className="px-6 py-4 text-right">
<a className="text-primary font-bold text-sm hover:underline flex items-center justify-end gap-1" href="#">
                                            Détails <span className="material-symbols-outlined text-sm">chevron_right</span>
</a>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 bg-surface-container-low flex justify-center">
<button className="text-primary font-semibold text-sm hover:text-primary-container transition-colors">Afficher toutes les alertes (7)</button>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="p-6 rounded-xl bg-primary text-on-primary flex items-center justify-between">
<div>
<h4 className="text-lg font-bold mb-1">Générer le rapport final</h4>
<p className="text-primary-fixed-dim text-sm">Compilation de toutes les preuves de fraude détectées.</p>
</div>
<button className="w-12 h-12 rounded-full bg-on-primary text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
<span className="material-symbols-outlined">download</span>
</button>
</div>
<div className="p-6 rounded-xl bg-secondary text-on-secondary flex items-center justify-between">
<div>
<h4 className="text-lg font-bold mb-1">Paramètres de l'IA</h4>
<p className="text-secondary-fixed text-sm">Ajuster la sensibilité de détection du plagiat.</p>
</div>
<button className="w-12 h-12 rounded-full bg-on-secondary text-secondary flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
<span className="material-symbols-outlined">tune</span>
</button>
</div>
</section>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-3 bg-surface border-t border-outline-variant z-50 shadow-lg">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-[10px]">Tableau</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">spellcheck</span>
<span className="font-label text-[10px]">Correction</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>assignment_late</span>
<span className="font-label text-[10px] font-bold">Rapports</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-5 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-[10px]">Paramètres</span>
</a>
</nav>
<script>
        // Simple interactivity for demonstration
        document.querySelectorAll('tr').forEach(row =&gt; &#123;
            row.addEventListener('click', () =&gt; &#123;
                const name = row.querySelector('.font-semibold').textContent;
                console.log('Détails pour:', name);
            &#125;);
        &#125;);

        // Search highlight effect
        const searchInput = document.createElement('input');
        // This is just a conceptual hook for where JS logic could live
    </script>

    </div>
  );
}
