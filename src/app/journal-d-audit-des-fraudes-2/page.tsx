import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Journal d'Audit" };

export default function Page() {
  return (
    <div className="text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-md flex justify-between items-center px-4 md:px-8 py-3">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="w-8 h-8 rounded-full bg-white p-0.5 object-contain" src="/images/ecran-198.png" />
<h1 className="font-headline text-display-lg-mobile font-bold text-on-primary dark:text-on-primary-container">Edukora Admin</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<span className="text-on-primary/80 font-medium cursor-pointer hover:bg-primary-container/20 transition-colors px-2 py-1 rounded">Alertes Fraude</span>
<span className="text-on-primary/80 font-medium cursor-pointer hover:bg-primary-container/20 transition-colors px-2 py-1 rounded">Enquêtes</span>
<span className="text-on-primary/80 font-medium cursor-pointer hover:bg-primary-container/20 transition-colors px-2 py-1 rounded">Moteur de Règles</span>
<span className="text-on-primary font-bold underline decoration-secondary decoration-2 cursor-pointer px-2 py-1 rounded">Journal d'Audit</span>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20 cursor-pointer active:scale-95 transition-transform">
<img className="w-full h-full object-cover" src="/images/ecran-197.png" alt="Close up professional portrait of a West African male systems administrator in a modern office" />
</div>
</div>
</header>

<aside className="fixed left-0 top-0 h-full w-64 hidden lg:block bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline pt-20 z-40">
<div className="flex flex-col gap-2 p-4 h-full">
<div className="flex items-center gap-3 mb-6 p-2">
<div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary-container" data-icon="admin_panel_settings">admin_panel_settings</span>
</div>
<div>
<p className="font-headline text-body-md font-semibold text-primary">Panneau Admin</p>
<p className="text-xs text-on-surface-variant">Surveillance Fraude</p>
</div>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span className="font-body text-body-md">Alertes Fraude</span>
</a>
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="search_check">search_check</span>
<span className="font-body text-body-md">Enquêtes</span>
</a>
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="rule">rule</span>
<span className="font-body text-body-md">Moteur de Règles</span>
</a>
<a className="flex items-center gap-3 p-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-body text-body-md">Journal d'Audit</span>
</a>
</nav>
<div className="mt-auto p-4 bg-surface-container rounded-xl">
<p className="text-xs font-semibold text-primary mb-2">ÉTAT DU SYSTÈME</p>
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
<span className="text-xs text-on-surface">Surveillance Active</span>
</div>
</div>
</div>
</aside>

<main className="flex-1 lg:pl-64 pt-20 pb-20 lg:pb-8">
<div className="max-w-7xl mx-auto px-4 md:px-8 py-6">

<div className="mb-8">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
<div>
<h2 className="font-headline text-headline-md font-semibold text-primary mb-1">Journal d'Audit</h2>
<p className="text-on-surface-variant text-body-md">Suivi et surveillance des actions administratives pour l'intégrité académique.</p>
</div>
<div className="flex items-center gap-2 text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg border border-outline-variant">
<span className="material-symbols-outlined text-sm" data-icon="update">update</span>
<span className="text-xs font-medium">Dernière mise à jour: 2 min ago</span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-4 items-end">
<div className="flex-1 w-full md:w-auto">
<label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">PÉRIODE</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="calendar_month">calendar_month</span>
<select className="w-full pl-10 pr-4 py-2.5 bg-surface border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-primary">
<option>Dernières 24 Heures</option>
<option>Derniers 7 Jours</option>
<option>Derniers 30 Jours</option>
<option>Période Personnalisée</option>
</select>
</div>
</div>
<div className="flex-1 w-full md:w-auto">
<label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">CATÉGORIE DE FRAUDE</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="filter_list">filter_list</span>
<select className="w-full pl-10 pr-4 py-2.5 bg-surface border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-primary">
<option>Toutes les Catégories</option>
<option>Fraude d'Identité</option>
<option>Écart de Paiement</option>
<option>Compromis d'Examen</option>
<option>Abus d'Accès</option>
</select>
</div>
</div>
<div className="flex-1 w-full md:w-auto">
<label className="block text-xs font-semibold text-on-surface-variant mb-1.5 uppercase tracking-wider">RECHERCHER ADMIN / RÈGLE</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" data-icon="search">search</span>
<input className="w-full pl-10 pr-4 py-2.5 bg-surface border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Filtrer les entrées du journal..." type="text" />
</div>
</div>
<button className="w-full md:w-auto px-6 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-icon="tune">tune</span>
                        Appliquer
                    </button>
</div>
</div>

<div className="grid grid-cols-1 gap-4">

<div className="bg-white border border-outline-variant rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-lg bg-error-container/20 flex flex-col items-center justify-center text-error border border-error-container">
<span className="text-[10px] font-bold uppercase leading-none">nov.</span>
<span className="text-xl font-bold leading-none">24</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-1">
<span className="font-semibold text-on-surface">Koffi Kouamé</span>
<span className="text-xs text-on-surface-variant">• 14:32:10 GMT</span>
</div>
<h3 className="text-body-md font-bold text-primary mb-1">Compte #8821 bloqué</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="gavel">gavel</span>
                                    Règle: IP_VELOCITY_LIMIT
                                </span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[11px] font-bold uppercase">FRAUDE D'IDENTITÉ</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/30">
<div className="text-right hidden sm:block">
<p className="text-[10px] text-on-surface-variant font-semibold uppercase">Score de déclenchement</p>
<p className="text-lg font-bold text-error">94/100</p>
</div>
<button className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant rounded-lg text-body-md font-semibold text-primary transition-colors flex items-center gap-2">
                            Voir les Détails
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex flex-col items-center justify-center text-primary border border-outline-variant/30">
<span className="text-[10px] font-bold uppercase leading-none">nov.</span>
<span className="text-xl font-bold leading-none">24</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-1">
<span className="font-semibold text-on-surface">Aminata Diallo</span>
<span className="text-xs text-on-surface-variant">• 12:05:44 GMT</span>
</div>
<h3 className="text-body-md font-bold text-primary mb-1">Demande de remboursement signalée pour révision manuelle</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="gavel">gavel</span>
                                    Règle: RECURRING_PAYMENT_FAILURE
                                </span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold uppercase">ÉCART DE PAIEMENT</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/30">
<div className="text-right hidden sm:block">
<p className="text-[10px] text-on-surface-variant font-semibold uppercase">Score de déclenchement</p>
<p className="text-lg font-bold text-secondary">68/100</p>
</div>
<button className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant rounded-lg text-body-md font-semibold text-primary transition-colors flex items-center gap-2">
                            Voir les Détails
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-lg bg-error-container/20 flex flex-col items-center justify-center text-error border border-error-container">
<span className="text-[10px] font-bold uppercase leading-none">nov.</span>
<span className="text-xl font-bold leading-none">23</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-1">
<span className="font-semibold text-on-surface">Koffi Kouamé</span>
<span className="text-xs text-on-surface-variant">• 17:15:30 GMT</span>
</div>
<h3 className="text-body-md font-bold text-primary mb-1">Adresse IP 192.168.1.45 sur liste noire</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="gavel">gavel</span>
                                    Règle: BRUTE_FORCE_DETECTED
                                </span>
<span className="px-2 py-0.5 rounded bg-error-container text-on-error-container text-[11px] font-bold uppercase">ABUS D'ACCÈS</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/30">
<div className="text-right hidden sm:block">
<p className="text-[10px] text-on-surface-variant font-semibold uppercase">Score de déclenchement</p>
<p className="text-lg font-bold text-error">99/100</p>
</div>
<button className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant rounded-lg text-body-md font-semibold text-primary transition-colors flex items-center gap-2">
                            Voir les Détails
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-shadow group">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex flex-col items-center justify-center text-tertiary border border-outline-variant/30">
<span className="text-[10px] font-bold uppercase leading-none">nov.</span>
<span className="text-xl font-bold leading-none">23</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-1">
<span className="font-semibold text-on-surface">Aminata Diallo</span>
<span className="text-xs text-on-surface-variant">• 09:40:12 GMT</span>
</div>
<h3 className="text-body-md font-bold text-primary mb-1">Nouvelle règle de fraude 'BAC_EXAM_TICKET' activée</h3>
<div className="flex flex-wrap gap-2">
<span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant text-[11px] font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="settings">settings</span>
                                    Mise à jour de la configuration de règle
                                </span>
<span className="px-2 py-0.5 rounded bg-tertiary-container text-on-tertiary-container text-[11px] font-bold uppercase">CONFIG SYSTÈME</span>
</div>
</div>
</div>
<div className="flex items-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/30">
<div className="text-right hidden sm:block">
<p className="text-[10px] text-on-surface-variant font-semibold uppercase">Niveau d'impact</p>
<p className="text-lg font-bold text-tertiary">Global</p>
</div>
<button className="px-4 py-2 bg-surface hover:bg-surface-container border border-outline-variant rounded-lg text-body-md font-semibold text-primary transition-colors flex items-center gap-2">
                            Voir les Détails
                            <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
<p className="text-sm text-on-surface-variant">Affichage de 1 à 10 sur 254 entrées</p>
<div className="flex items-center gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors disabled:opacity-50" disabled={true}>
<span className="material-symbols-outlined" data-icon="chevron_left">chevron_left</span>
</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-bold">1</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-bold">2</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-bold">3</button>
<span className="px-2">...</span>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors font-bold">26</button>
<button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-safe px-4 bg-surface dark:bg-surface-container-highest lg:hidden border-t border-outline-variant dark:border-outline shadow-lg">
<div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="manage_search">manage_search</span>
<span className="font-label text-label-xs">Enquête</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="settings_suggest">settings_suggest</span>
<span className="font-label text-label-xs">Règles</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform active:scale-90">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-label text-label-xs">Audit</span>
</div>
</nav>

<script>
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', function() &#123;
                this.classList.add('scale-95');
            &#125;);
            button.addEventListener('mouseup', function() &#123;
                this.classList.remove('scale-95');
            &#125;);
        &#125;);

        // Simple animation for new log items (visual only)
        const entries = document.querySelectorAll('.group');
        entries.forEach((entry, index) =&gt; &#123;
            entry.style.opacity = '0';
            entry.style.transform = 'translateY(10px)';
            setTimeout(() =&gt; &#123;
                entry.style.transition = 'all 0.4s ease-out';
                entry.style.opacity = '1';
                entry.style.transform = 'translateY(0)';
            &#125;, index * 100);
        &#125;);
    </script>

    </div>
  );
}
