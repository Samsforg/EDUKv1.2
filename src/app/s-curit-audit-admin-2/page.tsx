import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Sécurité & Audit" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 bg-primary shadow-md flex justify-between items-center px-4 h-16 text-on-primary">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary">security</span>
<h1 className="font-headline text-headline-md font-bold text-on-primary">Sécurité &amp; Audit</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6">
<span className="text-on-primary font-bold">Sécurité</span>
<span className="text-primary-fixed-dim hover:bg-primary-container/20 transition-colors cursor-pointer px-2 py-1 rounded">Aperçu</span>
<span className="text-primary-fixed-dim hover:bg-primary-container/20 transition-colors cursor-pointer px-2 py-1 rounded">Utilisateurs</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center border-2 border-on-primary/20 overflow-hidden">
<img alt="Administrateur principal" className="w-full h-full object-cover" src="/images/ecran-317.png" />
</div>
</div>
</header>

<nav className="fixed left-0 top-0 h-full w-72 bg-surface border-r border-outline-variant flex flex-col pt-20 hidden md:flex">
<div className="px-6 py-4 mb-4 border-b border-outline-variant">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center overflow-hidden border border-outline-variant">
<img alt="Logo Edukora" className="w-10 h-10 object-contain" src="/images/ecran-318.png" />
</div>
<div>
<p className="font-headline text-on-surface font-bold text-body-md">Administration centrale</p>
<p className="text-on-surface-variant text-label-xs">Contrôle Institutionnel</p>
</div>
</div>
</div>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 active:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md font-medium">Aperçu</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 active:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-body text-body-md font-medium">Utilisateurs</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 active:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined">book_5</span>
<span className="font-body text-body-md font-medium">Cours</span>
</a>

<a className="bg-primary-container text-on-primary-container rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 active:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined">lock</span>
<span className="font-body text-body-md font-medium">Sécurité</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 active:translate-x-1 duration-200" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body text-body-md font-medium">Analyses</span>
</a>
<div className="mt-auto p-4">
<div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant">
<p className="text-label-xs font-semibold text-primary mb-2">STATUT SYSTÈME</p>
<div className="flex items-center justify-between text-label-sm mb-1">
<span className="text-on-surface-variant">Disponibilité</span>
<span className="text-tertiary font-bold">99.9%</span>
</div>
<div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
<div className="bg-tertiary h-full w-[99.9%]"></div>
</div>
</div>
</div>
</nav>

<main className="md:ml-72 pt-24 px-6 pb-12 transition-all">
<div className="max-w-6xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="glass-card p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-4">
<h3 className="font-headline font-bold text-on-surface">Intégrité des Données</h3>
<span className="material-symbols-outlined text-tertiary">verified_user</span>
</div>
<div className="space-y-4">
<div>
<p className="text-label-xs text-on-surface-variant mb-1">Statut du Chiffrement</p>
<div className="flex items-center gap-2">
<span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded uppercase">AES-256 ACTIF</span>
<span className="material-symbols-outlined text-sm text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
</div>
<div>
<p className="text-label-xs text-on-surface-variant mb-1">Dernière Sauvegarde Complète</p>
<p className="text-body-md font-bold text-on-surface">Aujourd'hui, 04:12 GMT</p>
</div>
</div>
</div>
<button className="mt-6 w-full py-2 bg-surface-container text-on-surface text-label-sm font-bold rounded-lg border border-outline hover:bg-surface-container-high transition-colors">
                        Sauvegarde Manuelle
                    </button>
</div>

<div className="glass-card p-6 rounded-xl border border-outline-variant shadow-sm relative overflow-hidden">
<div className="relative z-10">
<h3 className="font-headline font-bold text-on-surface mb-1">Adoption 2FA</h3>
<p className="text-label-xs text-on-surface-variant mb-4">Niveau d'application parmi le personnel</p>
<div className="flex items-end gap-3 mb-4">
<span className="text-4xl font-bold text-primary">85%</span>
<span className="text-tertiary text-label-xs font-bold flex items-center mb-1">
<span className="material-symbols-outlined text-sm">arrow_upward</span> +5.2%
                            </span>
</div>
<div className="w-full bg-surface-container-highest h-3 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[85%] rounded-full"></div>
</div>
</div>
<div className="absolute -right-4 -bottom-4 opacity-5">
<span className="material-symbols-outlined text-8xl" style={{"fontVariationSettings":"'FILL' 1"}}>lock_open</span>
</div>
</div>

<div className="glass-card rounded-xl border border-outline-variant shadow-sm overflow-hidden relative min-h-[200px]">
<div className="relative z-10 p-6">
<h3 className="font-headline font-bold text-on-surface mb-1">Trafic &amp; Sécurité</h3>
<p className="text-label-xs text-on-surface-variant mb-4">Analyse en temps réel active</p>
<div className="flex gap-2">
<span className="flex h-2 w-2 rounded-full bg-tertiary animate-pulse mt-1.5"></span>
<div>
<p className="text-label-sm font-bold text-on-surface">Aucune menace détectée</p>
<p className="text-[10px] text-on-surface-variant">Surveillance Globale Active</p>
</div>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-8 space-y-8">

<section className="glass-card rounded-xl border border-outline-variant overflow-hidden">
<div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">manage_accounts</span>
<h2 className="font-headline font-bold text-on-surface">Contrôle des Accès</h2>
</div>
<button className="text-primary text-label-sm font-bold hover:underline">Gérer les Rôles</button>
</div>
<div className="p-6">
<p className="text-label-sm text-on-surface-variant mb-4">Sessions Administrateurs Actives</p>
<div className="space-y-3">

<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary/30 transition-colors">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<p className="text-body-md font-bold text-on-surface">Ibrahim Traoré <span className="text-label-xs font-normal text-on-surface-variant ml-2">(Admin Principal)</span></p>
<p className="text-label-xs text-on-surface-variant">IP: 197.231.10.45 • Abidjan, CI</p>
</div>
</div>
<div className="flex items-center gap-3">
<span className="text-label-xs text-tertiary font-bold px-2 py-1 bg-tertiary-container/20 rounded">Cette Session</span>
<button className="material-symbols-outlined p-2 text-on-surface-variant hover:text-error transition-colors">logout</button>
</div>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<p className="text-body-md font-bold text-on-surface">Yasmine Kouadio <span className="text-label-xs font-normal text-on-surface-variant ml-2">(Personnel d'Audit)</span></p>
<p className="text-label-xs text-on-surface-variant">IP: 41.202.219.12 • Yamoussoukro, CI</p>
</div>
</div>
<div className="flex items-center gap-3">
<span className="text-label-xs text-on-surface-variant">Actif il y a 5 min</span>
<button className="bg-error text-on-error text-label-xs font-bold px-3 py-1.5 rounded-lg hover:bg-error/90 active:scale-95 transition-all">Révoquer</button>
</div>
</div>
</div>
</div>
</section>

<section className="glass-card rounded-xl border border-outline-variant overflow-hidden">
<div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">history_edu</span>
<h2 className="font-headline font-bold text-on-surface">Journal d'Audit</h2>
</div>
<div className="flex gap-2">
<button className="p-2 bg-surface border border-outline-variant rounded-lg material-symbols-outlined text-sm hover:bg-surface-container">filter_list</button>
<button className="p-2 bg-surface border border-outline-variant rounded-lg material-symbols-outlined text-sm hover:bg-surface-container">download</button>
</div>
</div>
<div className="p-0 overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-outline-variant">
<tr>
<th className="px-6 py-3 text-label-xs font-bold text-on-surface-variant uppercase">Horodatage</th>
<th className="px-6 py-3 text-label-xs font-bold text-on-surface-variant uppercase">Action</th>
<th className="px-6 py-3 text-label-xs font-bold text-on-surface-variant uppercase">Catégorie</th>
<th className="px-6 py-3 text-label-xs font-bold text-on-surface-variant uppercase">Statut</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm text-on-surface-variant">14:22:10</td>
<td className="px-6 py-4">
<p className="text-label-sm font-bold text-on-surface">Utilisateur #8829 banni par Admin Ibrahim</p>
<p className="text-[10px] text-on-surface-variant">Raison : Faute Académique</p>
</td>
<td className="px-6 py-4"><span className="px-2 py-0.5 bg-error-container text-on-error-container text-[10px] font-bold rounded">Accès</span></td>
<td className="px-6 py-4"><span className="material-symbols-outlined text-tertiary text-sm">done_all</span></td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm text-on-surface-variant">14:05:45</td>
<td className="px-6 py-4">
<p className="text-label-sm font-bold text-on-surface">Cours math-01 modifié par Prof. Kouassi</p>
<p className="text-[10px] text-on-surface-variant">Mis à jour : Lien Vidéo Module 4</p>
</td>
<td className="px-6 py-4"><span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded">Contenu</span></td>
<td className="px-6 py-4"><span className="material-symbols-outlined text-tertiary text-sm">done_all</span></td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4 text-label-sm text-on-surface-variant">13:45:00</td>
<td className="px-6 py-4">
<p className="text-label-sm font-bold text-on-surface">Clé API Renouvelée : Agent Système #2</p>
<p className="text-[10px] text-on-surface-variant">Maintenance auto-planifiée</p>
</td>
<td className="px-6 py-4"><span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold rounded">Système</span></td>
<td className="px-6 py-4"><span className="material-symbols-outlined text-tertiary text-sm">done_all</span></td>
</tr>
</tbody>
</table>
</div>
<div className="px-6 py-3 border-t border-outline-variant bg-surface-container-low text-center">
<button className="text-primary text-label-xs font-bold hover:underline">Voir les 1 240 journaux restants</button>
</div>
</section>
</div>

<div className="lg:col-span-4 space-y-6">
<section className="glass-card p-6 rounded-xl border border-outline-variant shadow-sm">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-secondary">verified</span>
<h2 className="font-headline font-bold text-on-surface">Protocoles de Sécurité</h2>
</div>
<div className="space-y-6">

<div className="flex items-start justify-between gap-4">
<div className="flex-1">
<p className="text-body-md font-bold text-on-surface">Liste Blanche IP</p>
<p className="text-label-xs text-on-surface-variant">Restriction aux IPs connues de l'administration.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex items-start justify-between gap-4">
<div className="flex-1">
<p className="text-body-md font-bold text-on-surface">Géorepérage CI Uniquement</p>
<p className="text-label-xs text-on-surface-variant">Bloquer les accès hors Côte d'Ivoire pour le panel admin.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex items-start justify-between gap-4">
<div className="flex-1">
<p className="text-body-md font-bold text-on-surface">Expiration automatique de session</p>
<p className="text-label-xs text-on-surface-variant">Déconnexion après 15 min d'inactivité.</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
<div className="mt-8 p-4 bg-secondary-container/10 border border-secondary/20 rounded-xl">
<div className="flex gap-3">
<span className="material-symbols-outlined text-secondary text-lg">warning</span>
<div>
<p className="text-label-xs font-bold text-secondary uppercase tracking-wider">Contexte d'Avertissement</p>
<p className="text-label-xs text-on-secondary-container mt-1">La désactivation du Géorepérage augmentera la surface d'attaque de 40%.</p>
</div>
</div>
</div>
</section>
<div className="glass-card p-6 rounded-xl border border-outline-variant bg-gradient-to-br from-primary to-primary-container text-on-primary shadow-lg">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>shield</span>
<h3 className="font-headline font-bold">Score de Santé</h3>
</div>
<div className="flex items-baseline gap-2 mb-2">
<span className="text-5xl font-extrabold">98</span>
<span className="text-xl font-bold opacity-70">/ 100</span>
</div>
<p className="text-label-sm opacity-90 leading-relaxed">Votre infrastructure respecte les standards de sécurité académique nationaux.</p>
<button className="mt-6 w-full py-2 bg-on-primary text-primary text-label-sm font-bold rounded-lg hover:bg-primary-fixed transition-all active:scale-95">
                            Rapport Complet
                        </button>
</div>
</div>
</div>
</div>
</main>
<script>
        // Micro-interactions
        document.querySelectorAll('.material-symbols-outlined').forEach(icon =&gt; &#123;
            icon.addEventListener('mouseenter', () =&gt; &#123;
                icon.classList.add('scale-110');
            &#125;);
            icon.addEventListener('mouseleave', () =&gt; &#123;
                icon.classList.remove('scale-110');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
