import type { Metadata } from "next";

export const metadata: Metadata = { title: "Gestion des Litiges - Edukora Admin" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-sm flex items-center justify-between px-4 md:px-8 h-16">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary text-2xl">admin_panel_settings</span>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Gestion des Litiges</h1>
</div>
<div className="flex items-center gap-2">
<div className="hidden md:flex flex-col items-end mr-2">
<span className="text-on-primary text-xs font-semibold">Service Financier</span>
<span className="text-on-primary-container text-[10px]">Administrateur Systéme</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center text-primary font-bold overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-167.png" alt="A professional headshot of a financial administrator in a modern office, wearing professional attire. The lighting is bright and clean, reflecting an academic and institutional atmosphere consistent with the Edukora brand's focus on trust and authority." />
</div>
</div>
</header>
<main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">

<nav className="flex border-b border-outline-variant mt-4 overflow-x-auto hide-scroll">
<button className="tab-active py-4 px-6 flex items-center gap-2 whitespace-nowrap transition-colors" id="tab-remboursements">
<span className="material-symbols-outlined text-xl">payments</span>
<span>Remboursements</span>
<span className="bg-error text-on-error text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">3</span>
</button>
<button className="py-4 px-6 flex items-center gap-2 whitespace-nowrap text-on-surface-variant hover:text-primary transition-colors" id="tab-echecs">
<span className="material-symbols-outlined text-xl">error_outline</span>
<span>Échecs de prélèvement</span>
<span className="bg-surface-container-highest text-on-surface-variant text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1">12</span>
</button>
</nav>

<section className="flex gap-3 py-6 overflow-x-auto hide-scroll">
<button className="bg-primary text-on-primary px-5 py-1.5 rounded-full text-sm font-medium shadow-sm transition-transform active:scale-95">Tout</button>
<button className="bg-surface-container-high text-on-surface-variant border border-outline-variant px-5 py-1.5 rounded-full text-sm font-medium hover:bg-surface-container-highest transition-colors">Urgent</button>
<button className="bg-surface-container-high text-on-surface-variant border border-outline-variant px-5 py-1.5 rounded-full text-sm font-medium hover:bg-surface-container-highest transition-colors">En attente</button>
</section>

<div className="space-y-4" id="content-remboursements">
<h2 className="text-body-lg font-semibold text-on-surface-variant mb-4">Dossiers prioritaires</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
<div className="absolute top-0 right-0 p-3">
<span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-0.5 rounded-sm">URGENT</span>
</div>
<div className="flex items-start gap-4 mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary font-bold">KK</div>
<div>
<h3 className="font-bold text-on-surface">Koffi Konan</h3>
<p className="text-xs text-on-surface-variant">ID: #ED-82910</p>
</div>
</div>
<div className="space-y-2 mb-6">
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Montant:</span>
<span className="font-bold text-primary">5 000 FCFA</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Date :</span>
<span>12 Oct 2023</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Motif:</span>
<span className="italic text-on-surface">Double débit</span>
</div>
</div>
<div className="grid grid-cols-2 gap-3">
<button className="bg-primary text-on-primary py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">Approuver</button>
<button className="border border-error text-error py-2 rounded-lg text-sm font-semibold hover:bg-error-container/20 transition-colors">Rejeter</button>
</div>
</article>

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start gap-4 mb-4">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary font-bold">AD</div>
<div>
<h3 className="font-bold text-on-surface">Aminata Diallo</h3>
<p className="text-xs text-on-surface-variant">ID: #ED-77123</p>
</div>
</div>
<div className="space-y-2 mb-6">
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Montant:</span>
<span className="font-bold text-primary">12 500 FCFA</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Date :</span>
<span>14 Oct 2023</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Motif:</span>
<span className="italic text-on-surface">Cours non accessible</span>
</div>
</div>
<div className="grid grid-cols-2 gap-3">
<button className="bg-primary text-on-primary py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">Approuver</button>
<button className="border border-error text-error py-2 rounded-lg text-sm font-semibold hover:bg-error-container/20 transition-colors">Rejeter</button>
</div>
</article>

<article className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
<div className="flex items-start gap-4 mb-4">
<div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold">BT</div>
<div>
<h3 className="font-bold text-on-surface">Bakary Touré</h3>
<p className="text-xs text-on-surface-variant">ID: #ED-90442</p>
</div>
</div>
<div className="space-y-2 mb-6">
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Montant:</span>
<span className="font-bold text-primary">2 500 FCFA</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Date :</span>
<span>15 Oct 2023</span>
</div>
<div className="flex justify-between text-sm">
<span className="text-on-surface-variant">Motif:</span>
<span className="italic text-on-surface">Erreur de saisie</span>
</div>
</div>
<div className="grid grid-cols-2 gap-3">
<button className="bg-primary text-on-primary py-2 rounded-lg text-sm font-semibold hover:bg-primary-container transition-colors">Approuver</button>
<button className="border border-error text-error py-2 rounded-lg text-sm font-semibold hover:bg-error-container/20 transition-colors">Rejeter</button>
</div>
</article>
</div>
</div>

<div className="hidden space-y-4" id="content-echecs">
<div className="flex items-center justify-between mb-4">
<h2 className="text-body-lg font-semibold text-on-surface-variant">Échecs cette semaine (12)</h2>
<button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-sm">history</span>
                    Historique complet
                </button>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-high text-on-surface-variant text-xs uppercase tracking-wider">
<tr>
<th className="px-6 py-3 font-semibold">Élève</th>
<th className="px-6 py-3 font-semibold">Motif de l'erreur</th>
<th className="px-6 py-3 font-semibold">Date</th>
<th className="px-6 py-3 font-semibold text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4">
<div className="font-medium text-on-surface">Jean-Luc Kouadio</div>
<div className="text-[10px] text-on-surface-variant">Orange Money</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-error text-sm">
<span className="material-symbols-outlined text-sm">warning</span>
                                    Solde insuffisant
                                </span>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Il y a 2h</td>
<td className="px-6 py-4 text-right">
<button className="text-primary-container font-semibold text-xs border border-primary-container px-3 py-1 rounded-lg hover:bg-primary-container hover:text-on-primary transition-all">Relancer manuellement</button>
</td>
</tr>

<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4">
<div className="font-medium text-on-surface">Marie-Claire Yao</div>
<div className="text-[10px] text-on-surface-variant">Visa **** 4432</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-on-surface-variant text-sm">
<span className="material-symbols-outlined text-sm">credit_card_off</span>
                                    Carte expirée
                                </span>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">Hier, 16:45</td>
<td className="px-6 py-4 text-right">
<button className="text-primary-container font-semibold text-xs border border-primary-container px-3 py-1 rounded-lg hover:bg-primary-container hover:text-on-primary transition-all">Relancer manuellement</button>
</td>
</tr>

<tr className="hover:bg-surface-container/30 transition-colors">
<td className="px-6 py-4">
<div className="font-medium text-on-surface">Ibrahim Sangaré</div>
<div className="text-[10px] text-on-surface-variant">Moov Money</div>
</td>
<td className="px-6 py-4">
<span className="flex items-center gap-1.5 text-error text-sm">
<span className="material-symbols-outlined text-sm">wifi_off</span>
                                    Échec technique réseau
                                </span>
</td>
<td className="px-6 py-4 text-sm text-on-surface-variant">14 Oct, 09:20</td>
<td className="px-6 py-4 text-right">
<button className="text-primary-container font-semibold text-xs border border-primary-container px-3 py-1 rounded-lg hover:bg-primary-container hover:text-on-primary transition-all">Relancer manuellement</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="mt-8 p-6 bg-primary-fixed rounded-xl flex items-center gap-6">
<div className="w-16 h-16 bg-on-primary-container rounded-full flex items-center justify-center text-primary-container shrink-0">
<span className="material-symbols-outlined text-3xl">insights</span>
</div>
<div>
<h4 className="font-bold text-on-primary-fixed text-lg">Aperçu Hebdomadaire</h4>
<p className="text-on-primary-fixed-variant text-sm">Le taux d'échec est en baisse de 4% par rapport à la semaine dernière. Continuez vos actions de relance.</p>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface md:bg-surface-container-low shadow-md border-t border-outline-variant md:border-none">

<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs">Aperçu</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-1 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">gavel</span>
<span className="font-label text-label-xs">Litiges</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">receipt_long</span>
<span className="font-label text-label-xs">Échecs</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        function switchTab(tab) &#123;
            const remTab = document.getElementById('tab-remboursements');
            const echTab = document.getElementById('tab-echecs');
            const remContent = document.getElementById('content-remboursements');
            const echContent = document.getElementById('content-echecs');

            if (tab === 'remboursements') &#123;
                remTab.classList.add('tab-active');
                remTab.classList.remove('text-on-surface-variant');
                echTab.classList.remove('tab-active');
                echTab.classList.add('text-on-surface-variant');
                
                remContent.classList.remove('hidden');
                echContent.classList.add('hidden');
            &#125; else &#123;
                echTab.classList.add('tab-active');
                echTab.classList.remove('text-on-surface-variant');
                remTab.classList.remove('tab-active');
                remTab.classList.add('text-on-surface-variant');
                
                echContent.classList.remove('hidden');
                remContent.classList.add('hidden');
            &#125;
        &#125;
    </script>

    </div>
  );
}
