import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Impact Statistique" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<nav className="bg-surface-container-lowest dark:bg-surface-container-low border-b border-surface-border dark:border-outline-variant w-full top-0 sticky z-50 flex justify-between items-center px-container-padding-desktop h-16">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary">menu</span>
<span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora Professeur</span>
</div>
<div className="flex items-center gap-stack-sm">
<div className="hidden md:flex gap-4">
<button className="text-on-surface-variant hover:bg-surface-container-low px-3 py-1 rounded transition-colors duration-200 font-label-md text-label-md">Messages</button>
<button className="text-primary font-bold px-3 py-1 bg-secondary-container rounded transition-colors duration-200 font-label-md text-label-md">Statistiques</button>
</div>
<div className="w-10 h-10 rounded-full bg-cover bg-center border border-surface-border" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuD0CDVstUNjYCVnTqQBFCo8qe0z508qCYxsHXiCjMafDIZ335xh_ZWHY7dzqI4ny2wUwBA3KkG4tJt68bvMhb5dzZtmmdtGXMqF60lXZS1HwxdNMByj5xGoJXSHpVc2mhTsYbHX8dxt2PPqfBOxk6N4tFvQNolrjQlLdJ5wrnyPrt64rff0m0dPPHIGNMBbE15Kqic8TqQ6WTz9dhxrSfI7AQMEdrXEITo-UQTW5bMIvEsqQPCt4WVH')"}}></div>
</div>
</nav>

<aside className="hidden md:flex h-full w-[280px] fixed left-0 top-16 bg-surface-container-low border-r border-surface-border flex-col py-stack-md z-40">
<div className="px-6 pb-8">
<div className="flex items-center gap-3 mb-2">
<div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">school</span>
</div>
<div>
<p className="font-title-md text-title-md text-primary font-bold">Dr. Martin</p>
<p className="font-label-md text-label-md text-on-surface-variant">Expert Pédagogique</p>
</div>
</div>
<div className="inline-flex items-center gap-1 bg-expert-purple/10 text-expert-purple px-2 py-1 rounded-full text-[10px] font-bold">
<span className="material-symbols-outlined text-[12px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                CERTIFIÉ SENIOR
            </div>
</div>
<nav className="flex flex-col gap-1 px-4">
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-lg text-body-lg">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-lg text-body-lg">Validation</span>
</a>
<a className="flex items-center gap-3 p-3 bg-primary-container text-on-primary-container font-bold rounded-r-full transition-all shadow-sm" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body-lg text-body-lg">Statistiques</span>
</a>
<hr className="my-4 border-surface-border" />
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">description</span>
<span className="font-body-lg text-body-lg">Ressources Admin</span>
</a>
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body-lg text-body-lg">Assistance</span>
</a>
<a className="flex items-center gap-3 p-3 text-error hover:bg-error-container/20 rounded-r-full transition-all mt-auto" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-body-lg text-body-lg">Déconnexion</span>
</a>
</nav>
</aside>

<main className="md:ml-[280px] p-container-padding-mobile md:p-container-padding-desktop pb-24 md:pb-12">

<header className="mb-stack-md flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-surface">Votre Impact Pédagogique</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Analyse approfondie de vos contributions au réseau Edukora.</p>
</div>
<div className="flex gap-2">
<button className="bg-white border border-surface-border px-4 py-2 flex items-center gap-2 rounded text-primary font-bold hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">download</span>
                    Exporter Rapport
                </button>
</div>
</header>

<section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-md">

<div className="bg-white border border-surface-border p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
<div>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Fiches Certifiées</span>
<h2 className="font-metric-num text-metric-num text-primary mt-2">124</h2>
</div>
<div className="mt-4 flex items-center gap-2">
<span className="material-symbols-outlined text-impact-emerald text-sm">trending_up</span>
<span className="text-impact-emerald font-bold text-xs">+8 ce mois</span>
</div>
</div>

<div className="bg-white border border-surface-border p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-validation-amber"></div>
<div>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Questions résolues</span>
<h2 className="font-metric-num text-metric-num text-primary mt-2">450</h2>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="h-1 flex-1 bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-validation-amber w-3/4"></div>
</div>
<span className="text-on-surface-variant font-bold text-xs">75% objectif</span>
</div>
</div>

<div className="bg-white border border-surface-border p-6 rounded-lg flex flex-col justify-between relative overflow-hidden group">
<div className="absolute top-0 left-0 w-1 h-full bg-expert-purple"></div>
<div>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Progression élèves</span>
<h2 className="font-metric-num text-metric-num text-impact-emerald mt-2">+15%</h2>
</div>
<div className="mt-4 h-8">

<div className="flex items-end gap-1 h-full">
<div className="w-2 bg-impact-emerald/20 h-2 rounded-t-sm"></div>
<div className="w-2 bg-impact-emerald/30 h-4 rounded-t-sm"></div>
<div className="w-2 bg-impact-emerald/40 h-3 rounded-t-sm"></div>
<div className="w-2 bg-impact-emerald/50 h-6 rounded-t-sm"></div>
<div className="w-2 bg-impact-emerald/60 h-5 rounded-t-sm"></div>
<div className="w-2 bg-impact-emerald h-8 rounded-t-sm"></div>
</div>
</div>
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mb-stack-md">

<div className="lg:col-span-8 bg-white border border-surface-border p-6 rounded-lg">
<div className="flex justify-between items-center mb-6">
<h3 className="font-title-md text-title-md text-on-surface">Validations par semaine</h3>
<select className="text-xs border-none bg-surface-container-low rounded px-2 py-1 focus:ring-primary">
<option>Derniers 30 jours</option>
<option>Dernier trimestre</option>
</select>
</div>
<div className="h-64 flex items-end justify-between gap-2 px-4 border-b border-surface-border pb-2">

<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[40%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S21</span>
</div>
<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[65%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S22</span>
</div>
<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[55%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S23</span>
</div>
<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[85%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S24</span>
</div>
<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[30%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S25</span>
</div>
<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[95%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S26</span>
</div>
<div className="flex flex-col items-center flex-1 group">
<div className="w-full bg-primary-fixed hover:bg-primary transition-colors rounded-t-sm h-[75%]"></div>
<span className="text-[10px] mt-2 font-label-md text-on-surface-variant">S27</span>
</div>
</div>
</div>

<div className="lg:col-span-4 bg-white border border-surface-border p-6 rounded-lg">
<h3 className="font-title-md text-title-md text-on-surface mb-6">Matières Tendances</h3>
<div className="space-y-4">
<div className="heatmap-grid">

<div className="heatmap-cell bg-primary/20"></div>
<div className="heatmap-cell bg-primary/40"></div>
<div className="heatmap-cell bg-primary/10"></div>
<div className="heatmap-cell bg-primary/80"></div>
<div className="heatmap-cell bg-primary/30"></div>
<div className="heatmap-cell bg-primary/60"></div>
<div className="heatmap-cell bg-primary/90"></div>

<div className="heatmap-cell bg-primary/10"></div>
<div className="heatmap-cell bg-primary/50"></div>
<div className="heatmap-cell bg-primary/70"></div>
<div className="heatmap-cell bg-primary/20"></div>
<div className="heatmap-cell bg-primary/40"></div>
<div className="heatmap-cell bg-primary/30"></div>
<div className="heatmap-cell bg-primary/80"></div>

</div>
<div className="space-y-2 mt-4">
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface">Mathématiques</span>
<span className="text-primary font-bold">42%</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full">
<div className="bg-primary h-full w-[42%]"></div>
</div>
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface">Physique-Chimie</span>
<span className="text-primary font-bold">28%</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full">
<div className="bg-primary h-full w-[28%]"></div>
</div>
<div className="flex items-center justify-between">
<span className="font-body-md text-body-md text-on-surface">Algorithmique</span>
<span className="text-primary font-bold">15%</span>
</div>
<div className="w-full bg-surface-container h-1 rounded-full">
<div className="bg-primary h-full w-[15%]"></div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-white border border-surface-border rounded-lg overflow-hidden">
<div className="p-6 border-b border-surface-border flex justify-between items-center">
<h3 className="font-title-md text-title-md text-on-surface">Top 5 fiches les plus consultées</h3>
<span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary">more_vert</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low">
<th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">TITRE DE LA FICHE</th>
<th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">MATIÈRE</th>
<th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">VUES</th>
<th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">NOTE MOYENNE</th>
<th className="px-6 py-4 font-label-md text-label-md text-on-surface-variant">ACTIONS</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-border">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<p className="font-body-md text-body-md text-on-surface font-bold">Introduction à l'Analyse Complexe</p>
<p className="text-[10px] text-outline">Mis à jour le 12 Mai</p>
</td>
<td className="px-6 py-4">
<span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded-full">Maths Sup</span>
</td>
<td className="px-6 py-4 font-body-md text-body-md font-bold">2,450</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-bold text-sm">4.9</span>
</div>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 text-primary hover:underline font-bold text-xs transition-opacity">Voir analytics</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<p className="font-body-md text-body-md text-on-surface font-bold">Les bases de la Thermodynamique</p>
<p className="text-[10px] text-outline">Mis à jour le 05 Juin</p>
</td>
<td className="px-6 py-4">
<span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded-full">Physique</span>
</td>
<td className="px-6 py-4 font-body-md text-body-md font-bold">1,820</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-bold text-sm">4.7</span>
</div>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 text-primary hover:underline font-bold text-xs transition-opacity">Voir analytics</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<p className="font-body-md text-body-md text-on-surface font-bold">Graphes et Algorithmes</p>
<p className="text-[10px] text-outline">Mis à jour le 20 Juin</p>
</td>
<td className="px-6 py-4">
<span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded-full">Informatique</span>
</td>
<td className="px-6 py-4 font-body-md text-body-md font-bold">1,640</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-bold text-sm">4.8</span>
</div>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 text-primary hover:underline font-bold text-xs transition-opacity">Voir analytics</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<p className="font-body-md text-body-md text-on-surface font-bold">Probabilités Discrètes</p>
<p className="text-[10px] text-outline">Mis à jour le 15 Mai</p>
</td>
<td className="px-6 py-4">
<span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded-full">Maths L2</span>
</td>
<td className="px-6 py-4 font-body-md text-body-md font-bold">1,120</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-bold text-sm">4.5</span>
</div>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 text-primary hover:underline font-bold text-xs transition-opacity">Voir analytics</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4">
<p className="font-body-md text-body-md text-on-surface font-bold">Électromagnétisme Appliqué</p>
<p className="text-[10px] text-outline">Mis à jour le 10 Juin</p>
</td>
<td className="px-6 py-4">
<span className="bg-secondary-container text-on-secondary-container text-[11px] font-bold px-2 py-0.5 rounded-full">Ingénierie</span>
</td>
<td className="px-6 py-4 font-body-md text-body-md font-bold">980</td>
<td className="px-6 py-4">
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-bold text-sm">4.6</span>
</div>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 text-primary hover:underline font-bold text-xs transition-opacity">Voir analytics</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest border-t border-surface-border flex justify-around items-center py-2 px-4 shadow-lg">
<button className="flex flex-col items-center justify-center text-on-surface-variant p-2 scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Tableau</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant p-2 scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-label-md text-label-md">Validation</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-md text-label-md">Stats</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant p-2 scale-95 active:scale-90 transition-transform">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md">Profil</span>
</button>
</nav>


<script>
        // Micro-interaction for bar highlights
        document.querySelectorAll('.group').forEach(item =&gt; &#123;
            item.addEventListener('mouseenter', () =&gt; &#123;
                // Potential for adding tooltips or dynamic data labels via JS
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
