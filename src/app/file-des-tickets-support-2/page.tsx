import type { Metadata } from "next";

export const metadata: Metadata = { title: "Console de Support Edukora - Tickets d'Abonnement" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md h-16 flex items-center justify-between px-8">
<div className="flex items-center gap-4">
<img alt="Edukora Logo" className="h-10 w-10 object-contain bg-white rounded-lg p-1" src="/images/ecran-157.png" />
<h1 className="font-headline text-headline-md font-semibold">Console de Support Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex flex-col items-end mr-2">
<span className="text-label-sm font-bold">Responsable Support</span>
<span className="text-[10px] opacity-80">admin@edukora.ci</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden bg-surface-container-highest flex items-center justify-center">
<img alt="Responsable Support" className="w-full h-full object-cover" src="/images/ecran-156.png" />
</div>
</div>
</header>

<aside className="hidden md:flex h-screen w-72 fixed left-0 top-0 bg-surface-container-low dark:bg-inverse-surface flex-col py-6 border-r border-outline-variant pt-20">
<div className="px-6 mb-8">
<div className="flex items-center gap-3 p-3 bg-surface-container-high rounded-xl">
<div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">support_agent</span>
</div>
<div>
<p className="text-label-xs font-bold text-primary">Statut: Actif</p>
<p className="text-[10px] text-on-surface-variant">Accès Niveau 3</p>
</div>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 bg-secondary-container text-on-secondary-container font-semibold rounded-full transition-all group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform" style={{"fontVariationSettings":"'FILL' 1"}}>confirmation_number</span>
<span className="font-body text-body-md">Tickets d'Abonnement</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">receipt_long</span>
<span className="font-body text-body-md">Vérification de Facturation</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">payments</span>
<span className="font-body text-body-md">Moyens de Paiement</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all group" href="#">
<span className="material-symbols-outlined group-hover:scale-110 transition-transform">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
<div className="px-6 mt-auto">
<div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
<p className="text-label-xs font-bold text-primary mb-1">Charge de la file</p>
<div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary w-[65%] rounded-full"></div>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 text-right">65% de Capacité</p>
</div>
</div>
</aside>

<main className="md:ml-72 pt-20 pb-20 md:pb-8 px-4 md:px-8">

<div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<nav className="flex items-center gap-2 text-on-surface-variant text-label-xs mb-2">
<span>Console</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-primary font-semibold">Tickets d'Abonnement</span>
</nav>
<h2 className="font-headline text-display-lg-mobile md:text-display-lg text-primary">File d'Attente des Tickets</h2>
</div>
<div className="flex gap-4">
<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 min-w-[140px]">
<div className="p-2 bg-error-container rounded-lg">
<span className="material-symbols-outlined text-error">priority_high</span>
</div>
<div>
<p className="text-label-xs text-on-surface-variant">Non Résolus</p>
<p className="text-headline-md font-bold text-error">24</p>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex items-center gap-4 min-w-[140px]">
<div className="p-2 bg-tertiary-container text-on-tertiary-container rounded-lg">
<span className="material-symbols-outlined">check_circle</span>
</div>
<div>
<p className="text-label-xs text-on-surface-variant">Terminés</p>
<p className="text-headline-md font-bold text-tertiary">142</p>
</div>
</div>
</div>
</div>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 mb-6 flex flex-wrap gap-4 items-center shadow-sm">
<div className="flex items-center gap-2 bg-surface-container rounded-lg px-3 py-2 border border-outline-variant">
<span className="material-symbols-outlined text-on-surface-variant text-[20px]">search</span>
<input className="bg-transparent border-none focus:ring-0 text-body-md w-48 md:w-64 placeholder:text-outline" placeholder="Rechercher par ID ou Nom..." type="text" />
</div>
<div className="flex flex-wrap gap-3">
<div className="flex flex-col">
<label className="text-[10px] font-bold text-outline-variant mb-1 ml-1 uppercase">STATUT</label>
<select className="bg-surface-bright border border-outline-variant rounded-lg px-4 py-2 text-label-sm font-medium focus:ring-primary focus:border-primary">
<option>Tous les Statuts</option>
<option>Ouvert</option>
<option>En cours</option>
<option>Résolu</option>
</select>
</div>
<div className="flex flex-col">
<label className="text-[10px] font-bold text-outline-variant mb-1 ml-1 uppercase">CATÉGORIE</label>
<select className="bg-surface-bright border border-outline-variant rounded-lg px-4 py-2 text-label-sm font-medium focus:ring-primary focus:border-primary">
<option>Toutes les Catégories</option>
<option>Facturation</option>
<option>Technique</option>
<option>Compte</option>
</select>
</div>
</div>
<button className="ml-auto bg-primary text-on-primary px-6 py-2.5 rounded-lg text-label-sm font-bold hover:bg-primary-container transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-[18px]">filter_list</span>
                Appliquer les Filtres
            </button>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div className="overflow-x-auto custom-scrollbar">
<table className="w-full text-left border-collapse min-w-[800px]">
<thead className="bg-surface-container text-on-surface-variant text-label-xs uppercase tracking-wider font-bold">
<tr>
<th className="px-6 py-4 border-b border-outline-variant">ID TICKET</th>
<th className="px-6 py-4 border-b border-outline-variant">UTILISATEUR</th>
<th className="px-6 py-4 border-b border-outline-variant">PROBLÈME</th>
<th className="px-6 py-4 border-b border-outline-variant">CATÉGORIE</th>
<th className="px-6 py-4 border-b border-outline-variant">DATE D'ENVOI</th>
<th className="px-6 py-4 border-b border-outline-variant">STATUT</th>
<th className="px-6 py-4 border-b border-outline-variant text-right">ACTION</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono text-label-sm text-primary font-semibold">#TKT-8291</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-[10px] font-bold">KA</div>
<span className="text-body-md font-medium">Kouassi Amenan</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface max-w-xs truncate">Double facturation sur abonnement Wave</td>
<td className="px-6 py-4">
<span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-label-xs font-bold text-on-surface-variant">Facturation</span>
</td>
<td className="px-6 py-4 text-label-sm text-on-surface-variant">Aujourd'hui, 09:42</td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-secondary-container/20 text-secondary font-bold text-[11px] rounded-full uppercase border border-secondary/30">Ouvert</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono text-label-sm text-primary font-semibold">#TKT-8285</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-[10px] font-bold">MD</div>
<span className="text-body-md font-medium">Moussa Diop</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface max-w-xs truncate">Leçon vidéo ne charge pas sur PWA</td>
<td className="px-6 py-4">
<span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-label-xs font-bold text-on-surface-variant">Technique</span>
</td>
<td className="px-6 py-4 text-label-sm text-on-surface-variant">Hier, 14:15</td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-primary/10 text-primary font-bold text-[11px] rounded-full uppercase border border-primary/30">En cours</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono text-label-sm text-primary font-semibold">#TKT-8277</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center text-[10px] font-bold">YT</div>
<span className="text-body-md font-medium">Yasmine Touré</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface max-w-xs truncate">Mot de passe oublié, email non reçu</td>
<td className="px-6 py-4">
<span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-label-xs font-bold text-on-surface-variant">Compte</span>
</td>
<td className="px-6 py-4 text-label-sm text-on-surface-variant">12 Oct 2023</td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-tertiary-container/10 text-tertiary font-bold text-[11px] rounded-full uppercase border border-tertiary/30">Résolu</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 font-mono text-label-sm text-primary font-semibold">#TKT-8270</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center text-[10px] font-bold">IB</div>
<span className="text-body-md font-medium">Ibrahim Bakayoko</span>
</div>
</td>
<td className="px-6 py-4 text-body-md text-on-surface max-w-xs truncate">Échec transaction Orange Money mais débité</td>
<td className="px-6 py-4">
<span className="px-2.5 py-1 bg-surface-container-highest rounded-full text-label-xs font-bold text-on-surface-variant">Facturation</span>
</td>
<td className="px-6 py-4 text-label-sm text-on-surface-variant">11 Oct 2023</td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-secondary-container/20 text-secondary font-bold text-[11px] rounded-full uppercase border border-secondary/30">Ouvert</span>
</td>
<td className="px-6 py-4 text-right">
<button className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="bg-surface-container px-6 py-4 flex items-center justify-between border-t border-outline-variant">
<p className="text-label-xs text-on-surface-variant">Affichage <span className="font-bold text-on-surface">1 - 4</span> sur 166 tickets</p>
<div className="flex gap-2">
<button className="p-2 rounded-lg border border-outline-variant bg-surface-bright text-outline hover:text-primary disabled:opacity-50" disabled={true}>
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="px-3 py-1 rounded-lg bg-primary text-on-primary font-bold text-label-sm">1</button>
<button className="px-3 py-1 rounded-lg bg-surface-bright border border-outline-variant text-on-surface font-medium text-label-sm hover:bg-surface-container-high">2</button>
<button className="px-3 py-1 rounded-lg bg-surface-bright border border-outline-variant text-on-surface font-medium text-label-sm hover:bg-surface-container-high">3</button>
<button className="p-2 rounded-lg border border-outline-variant bg-surface-bright text-on-surface hover:text-primary">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 md:hidden bg-surface-container-highest dark:bg-surface-dim border-t border-outline-variant shadow-lg h-16 flex justify-around items-center px-4 py-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs">Stats</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-xl p-2 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>list_alt</span>
<span className="font-label text-label-xs">File</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-label text-label-xs">Discussion</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple interactivity for demonstration
        document.querySelectorAll('tbody tr').forEach(row =&gt; &#123;
            row.addEventListener('click', () =&gt; &#123;
                row.classList.add('bg-primary/5');
                setTimeout(() =&gt; row.classList.remove('bg-primary/5'), 200);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
