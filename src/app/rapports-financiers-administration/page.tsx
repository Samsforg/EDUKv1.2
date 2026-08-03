import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Rapports Financiers" };

export default function Page() {
  return (
    <div className="min-h-screen pb-20" >

<header className="w-full sticky top-0 z-40 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline flex items-center justify-between px-4 md:px-8 py-4">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="w-8 h-8 rounded-lg shadow-sm" src="/images/ecran-308.png" />
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed-dim">Rapports Financiers</h1>
</div>
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">search</span>
</button>
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center border border-outline-variant">
<span className="text-xs font-bold text-on-primary-fixed">AD</span>
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8">

<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div>
<span className="text-on-surface-variant font-label text-label-sm block mb-2">Revenu Total</span>
<div className="flex items-baseline gap-2">
<span className="text-2xl font-bold font-headline text-primary">12,450,000</span>
<span className="text-sm font-semibold text-primary">FCFA</span>
</div>
</div>
<div className="mt-4 flex items-center gap-1 text-tertiary">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>trending_up</span>
<span className="text-xs font-bold">+15% vs mois dernier</span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
<span className="text-on-surface-variant font-label text-label-sm block mb-2">Abonnements Actifs</span>
<div className="flex items-center gap-3">
<div className="bg-primary-container p-2 rounded-lg text-on-primary-container">
<span className="material-symbols-outlined">group</span>
</div>
<div>
<span className="text-2xl font-bold font-headline text-on-surface">2,450</span>
<span className="block text-xs text-on-surface-variant">Membres actifs</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm">
<span className="text-on-surface-variant font-label text-label-sm block mb-2">Commissions Experts</span>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-bold font-headline text-secondary">1,867,500</span>
<span className="text-sm font-semibold text-secondary">FCFA</span>
</div>
<div className="mt-2 h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
<div className="bg-secondary h-full" style={{"width":"15%"}}></div>
</div>
<span className="text-[10px] text-on-surface-variant mt-1 block">15% du CA total</span>
</div>

<div className="bg-primary p-5 rounded-xl border border-primary-container shadow-md text-white">
<span className="text-on-primary-container font-label text-label-sm block mb-2">Revenu Net Plateforme</span>
<div className="flex items-baseline gap-1">
<span className="text-2xl font-bold font-headline">10,582,500</span>
<span className="text-sm font-semibold">FCFA</span>
</div>
<div className="mt-4 flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary-fixed text-sm">verified</span>
<span className="text-xs text-primary-fixed">Montant disponible</span>
</div>
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="lg:col-span-2 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<div className="flex items-center justify-between mb-8">
<h2 className="font-headline text-body-lg font-bold text-on-surface">Croissance Mensuelle</h2>
<div className="flex gap-2">
<button className="px-3 py-1 text-xs font-semibold rounded-md bg-surface-container-high text-on-surface">6 Mois</button>
<button className="px-3 py-1 text-xs font-semibold rounded-md text-on-surface-variant hover:bg-surface-container">1 An</button>
</div>
</div>

<div className="relative h-64 w-full flex items-end justify-between px-2 pt-10">
<div className="absolute inset-x-0 bottom-0 flex flex-col justify-between h-full pointer-events-none opacity-10">
<div className="border-t border-on-surface w-full"></div>
<div className="border-t border-on-surface w-full"></div>
<div className="border-t border-on-surface w-full"></div>
<div className="border-t border-on-surface w-full"></div>
<div className="border-t border-on-surface w-full"></div>
</div>

<div className="group relative flex flex-col items-center gap-2 w-full">
<div className="w-8 md:w-12 bg-primary-fixed hover:bg-primary-container transition-colors rounded-t-sm" style={{"height":"40%"}}></div>
<span className="text-[10px] font-label text-on-surface-variant">JAN</span>
</div>
<div className="group relative flex flex-col items-center gap-2 w-full">
<div className="w-8 md:w-12 bg-primary-fixed hover:bg-primary-container transition-colors rounded-t-sm" style={{"height":"55%"}}></div>
<span className="text-[10px] font-label text-on-surface-variant">FEV</span>
</div>
<div className="group relative flex flex-col items-center gap-2 w-full">
<div className="w-8 md:w-12 bg-primary-fixed hover:bg-primary-container transition-colors rounded-t-sm" style={{"height":"48%"}}></div>
<span className="text-[10px] font-label text-on-surface-variant">MAR</span>
</div>
<div className="group relative flex flex-col items-center gap-2 w-full">
<div className="w-8 md:w-12 bg-primary-fixed hover:bg-primary-container transition-colors rounded-t-sm" style={{"height":"70%"}}></div>
<span className="text-[10px] font-label text-on-surface-variant">AVR</span>
</div>
<div className="group relative flex flex-col items-center gap-2 w-full">
<div className="w-8 md:w-12 bg-primary-fixed hover:bg-primary-container transition-colors rounded-t-sm" style={{"height":"85%"}}></div>
<span className="text-[10px] font-label text-on-surface-variant">MAI</span>
</div>
<div className="group relative flex flex-col items-center gap-2 w-full">
<div className="w-8 md:w-12 bg-primary rounded-t-sm" style={{"height":"95%"}}></div>
<span className="text-[10px] font-label font-bold text-primary">JUIN</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col">
<h2 className="font-headline text-body-lg font-bold text-on-surface mb-6">Répartition par Source</h2>
<div className="flex-grow flex flex-col justify-center items-center relative mb-6">

<div className="w-40 h-40 rounded-full border-[16px] border-surface-container relative flex items-center justify-center">
<div className="absolute inset-0 rounded-full border-[16px] border-primary border-t-transparent border-l-transparent rotate-45"></div>
<div className="text-center">
<span className="text-xl font-bold font-headline text-on-surface block">100%</span>
<span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Total</span>
</div>
</div>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-primary"></div>
<span className="text-sm font-medium text-on-surface">Pass Annuel</span>
</div>
<span className="text-sm font-bold text-on-surface">65%</span>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-primary-fixed"></div>
<span className="text-sm font-medium text-on-surface">Pass Mensuel</span>
</div>
<span className="text-sm font-bold text-on-surface">35%</span>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div className="p-6 border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 className="font-headline text-body-lg font-bold text-on-surface">Transactions Récentes</h2>
<p className="text-sm text-on-surface-variant">Dernières activités de paiement sur la plateforme</p>
</div>
<button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface rounded-lg font-label text-label-sm hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-sm">download</span>
                    Exporter (.CSV)
                </button>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Utilisateur</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Date</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Service</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Montant</th>
<th className="px-6 py-4 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Statut</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim text-on-primary-fixed-variant flex items-center justify-center text-xs font-bold">KB</div>
<span className="text-sm font-semibold text-on-surface">Koffi Bakayoko</span>
</div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Aujourd'hui, 14:20</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Pass Annuel BAC</td>
<td className="px-6 py-4 font-bold text-on-surface">15,000 FCFA</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant">
<span className="w-1 h-1 rounded-full bg-on-tertiary-fixed-variant"></span> Succès
                                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold">AD</div>
<span className="text-sm font-semibold text-on-surface">Awa Diop</span>
</div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Aujourd'hui, 11:05</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Pass Mensuel BEPC</td>
<td className="px-6 py-4 font-bold text-on-surface">2,500 FCFA</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant">
<span className="w-1 h-1 rounded-full bg-on-tertiary-fixed-variant"></span> Succès
                                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold">JM</div>
<span className="text-sm font-semibold text-on-surface">Jean-Marc Yao</span>
</div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Hier, 18:45</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Pass Annuel Concours</td>
<td className="px-6 py-4 font-bold text-on-surface">25,000 FCFA</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-secondary-fixed text-on-secondary-fixed-variant">
<span className="w-1 h-1 rounded-full bg-on-secondary-fixed-variant"></span> En attente
                                </span>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-xs font-bold">ST</div>
<span className="text-sm font-semibold text-on-surface">Sali Toure</span>
</div>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">15 Juin 2024</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Pass Mensuel BAC</td>
<td className="px-6 py-4 font-bold text-on-surface">2,500 FCFA</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant">
<span className="w-1 h-1 rounded-full bg-on-tertiary-fixed-variant"></span> Succès
                                </span>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 bg-surface-container-low border-t border-outline-variant flex justify-center">
<button className="text-sm font-bold text-primary hover:underline">Voir toutes les transactions</button>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 pb-safe bg-surface-container-lowest border-t border-outline-variant shadow-md">

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined text-[24px]">dashboard</span>
<span className="font-label text-label-xs font-semibold mt-1">Tableau de bord</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined text-[24px]">payments</span>
<span className="font-label text-label-xs font-semibold mt-1">Tarifs</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-on-primary-fixed-variant dark:text-on-primary-container rounded-full px-4 py-1 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined text-[24px]" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<span className="font-label text-label-xs font-semibold mt-1">Rapports</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined text-[24px]">person</span>
<span className="font-label text-label-xs font-semibold mt-1">Profil</span>
</a>
</nav>
<script>
        // Simple Interaction logic for card hover effects and numbers
        document.querySelectorAll('.hover\\:bg-surface-container-low\\/50').forEach(row =&gt; &#123;
            row.addEventListener('click', () =&gt; &#123;
                // Future navigation to transaction details
                console.log('Transaction details view...');
            &#125;);
        &#125;);

        // Dynamic date injection example
        const today = new Date();
        const options = &#123; day: 'numeric', month: 'long', year: 'numeric' &#125;;
        console.log(`Financial overview generated for $&#123;today.toLocaleDateString('fr-FR', options)&#125;`);
    </script>

    </div>
  );
}
