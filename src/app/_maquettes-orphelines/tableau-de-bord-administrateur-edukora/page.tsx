import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Console admin - Vue d'ensemble" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col" >

<aside className="fixed left-0 top-0 h-full flex flex-col z-40 bg-surface dark:bg-inverse-surface h-full w-64 border-r border-outline-variant flat no shadows hidden md:flex">
<div className="px-6 py-8 flex flex-col items-start gap-4">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="w-10 h-10 rounded-lg shadow-sm" src="/images/ecran-346.png" />
<div>
<h1 className="font-headline text-headline-md font-bold text-primary leading-tight">Console admin</h1>
<p className="font-body text-label-xs text-on-surface-variant">Contrôleur de plateforme</p>
</div>
</div>
</div>
<nav className="flex-1 mt-4">

<a className="flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg p-3 mx-2 Active: scale-95 duration-150 transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>dashboard</span>
<span className="font-body text-body-md">Overview</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-body text-body-md">User Management</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body text-body-md">Course Approval</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body text-body-md">Surveillance des examens</span>
</a>
<a className="flex items-center gap-3 text-on-surface-variant p-3 mx-2 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all" href="#">
<span className="material-symbols-outlined">history</span>
<span className="font-body text-body-md">Journaux système</span>
</a>
</nav>
<div className="p-4 border-t border-outline-variant">
<div className="flex items-center gap-3 p-2">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">
                    AD
                </div>
<div>
<p className="font-label text-label-sm font-semibold">Utilisateur admin</p>
<p className="font-label text-label-xs text-on-surface-variant">Super Admin</p>
</div>
</div>
</div>
</aside>

<main className="md:ml-64 flex-1 flex flex-col min-h-screen">

<header className="w-full top-0 sticky z-30 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex justify-between items-center px-margin-mobile md:px-margin-desktop py-4">
<div className="flex items-center gap-4">
<button className="md:hidden text-on-primary p-2">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary">shield_person</span>
<span className="font-headline text-headline-md font-bold text-on-primary">Edukora Admin</span>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6">
<button className="text-on-primary-container/80 hover:bg-primary-container/20 transition-colors px-3 py-1 rounded-full text-label-sm">Protocole de sécurité</button>
<button className="text-on-primary-container/80 hover:bg-primary-container/20 transition-colors px-3 py-1 rounded-full text-label-sm">Assistance</button>
</div>
<div className="w-10 h-10 rounded-full bg-on-primary-container flex items-center justify-center text-primary border-2 border-on-primary/20">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
</div>
</div>
</header>

<div className="p-margin-mobile md:p-margin-desktop flex flex-col gap-stack-lg">

<section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-display text-[28px] md:text-display-lg font-bold text-on-surface">Tableau de Bord</h2>
<p className="text-on-surface-variant font-body mt-1">Surveillance en temps réel de l'écosystème Edukora.</p>
</div>
<div className="flex gap-2">
<button className="bg-surface-container-high text-on-surface px-4 py-2 rounded-lg font-label text-label-sm flex items-center gap-2 hover:bg-surface-container-highest transition-colors">
<span className="material-symbols-outlined text-[18px]">calendar_today</span>
                        Aujourd'hui
                    </button>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label text-label-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm">
<span className="material-symbols-outlined text-[18px]">download</span>
                        Exporter Rapport
                    </button>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl admin-card-hover flex flex-col justify-between h-32">
<div className="flex justify-between items-start">
<span className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg material-symbols-outlined">group</span>
<span className="text-tertiary font-label text-label-xs flex items-center gap-1">+12% <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
</div>
<div>
<p className="text-on-surface-variant text-label-sm font-medium">Utilisateurs Actifs</p>
<h3 className="text-headline-md font-bold text-primary">12,482</h3>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl admin-card-hover flex flex-col justify-between h-32">
<div className="flex justify-between items-start">
<span className="p-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg material-symbols-outlined">pending_actions</span>
<span className="text-error font-label text-label-xs flex items-center gap-1">+5 <span className="material-symbols-outlined text-[14px]">priority_high</span></span>
</div>
<div>
<p className="text-on-surface-variant text-label-sm font-medium">Fiches en attente</p>
<h3 className="text-headline-md font-bold text-primary">156</h3>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl admin-card-hover flex flex-col justify-between h-32">
<div className="flex justify-between items-start">
<span className="p-2 bg-error-container text-on-error-container rounded-lg material-symbols-outlined">report</span>
<span className="text-on-surface-variant font-label text-label-xs">Stable</span>
</div>
<div>
<p className="text-on-surface-variant text-label-sm font-medium">Signalements Critiques</p>
<h3 className="text-headline-md font-bold text-error">03</h3>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl admin-card-hover flex flex-col justify-between h-32">
<div className="flex justify-between items-start">
<span className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg material-symbols-outlined">payments</span>
<span className="text-tertiary font-label text-label-xs flex items-center gap-1">+8% <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
</div>
<div>
<p className="text-on-surface-variant text-label-sm font-medium">Revenus du jour</p>
<h3 className="text-headline-md font-bold text-primary">450k FCFA</h3>
</div>
</div>
</section>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
<div className="p-6 border-b border-outline-variant flex justify-between items-center">
<h3 className="font-headline text-headline-md font-semibold text-on-surface">Flux d'Activité Récente</h3>
<button className="text-primary font-label text-label-sm hover:underline">Voir tout</button>
</div>
<div className="flex-1 divide-y divide-outline-variant">

<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-primary-fixed-dim flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>person_add</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<p className="font-body text-body-md font-semibold text-on-surface">Nouvel expert inscrit</p>
<span className="text-label-xs text-on-surface-variant">Il y a 5 min</span>
</div>
<p className="text-on-surface-variant text-body-md">Dr. Koffi Aman - Spécialité: Mathématiques BAC.</p>
<div className="mt-2 flex gap-2">
<button className="text-primary border border-primary px-3 py-1 rounded text-label-xs hover:bg-primary-container/10 transition-colors">Profil</button>
<button className="bg-primary text-on-primary px-3 py-1 rounded text-label-xs hover:opacity-90">Approuver</button>
</div>
</div>
</div>

<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings":"'FILL' 1"}}>dns</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<p className="font-body text-body-md font-semibold text-on-surface">Alerte serveur</p>
<span className="text-label-xs text-on-surface-variant">Il y a 12 min</span>
</div>
<p className="text-on-surface-variant text-body-md">Pic de latence détecté sur le module Exam-Simulator-02.</p>
<div className="mt-2">
<span className="inline-flex items-center px-2 py-0.5 rounded text-label-xs font-medium bg-error-container text-on-error-container">Urgence: Haute</span>
</div>
</div>
</div>

<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed-dim flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<p className="font-body text-body-md font-semibold text-on-surface">Paiement Premium validé</p>
<span className="text-label-xs text-on-surface-variant">Il y a 45 min</span>
</div>
<p className="text-on-surface-variant text-body-md">Utilisateur #8829 a souscrit au Pack BEPC Réussite.</p>
</div>
</div>

<div className="p-4 flex items-start gap-4 hover:bg-surface-container transition-colors">
<div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-on-surface-variant">update</span>
</div>
<div className="flex-1">
<div className="flex justify-between">
<p className="font-body text-body-md font-semibold text-on-surface">Mise à jour système</p>
<span className="text-label-xs text-on-surface-variant">Il y a 2 heures</span>
</div>
<p className="text-on-surface-variant text-body-md">Déploiement du nouveau moteur d'tuteur IA v2.1.4 complété.</p>
</div>
</div>
</div>
</section>

<section className="lg:col-span-4 flex flex-col gap-gutter">
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl">
<h3 className="font-headline text-headline-md font-semibold text-on-surface mb-4">Accès Rapide</h3>
<div className="grid grid-cols-2 gap-3">
<a className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant" href="#">
<span className="material-symbols-outlined text-3xl">manage_accounts</span>
<span className="text-label-xs font-semibold text-center">Gestion Utilisateurs</span>
</a>
<a className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant" href="#">
<span className="material-symbols-outlined text-3xl">auto_stories</span>
<span className="text-label-xs font-semibold text-center">Approbation Cours</span>
</a>
<a className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant" href="#">
<span className="material-symbols-outlined text-3xl">quiz</span>
<span className="text-label-xs font-semibold text-center">Suivi Examens</span>
</a>
<a className="flex flex-col items-center justify-center gap-2 p-4 bg-surface-container rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-all text-on-surface-variant" href="#">
<span className="material-symbols-outlined text-3xl">settings</span>
<span className="text-label-xs font-semibold text-center">Paramètres Système</span>
</a>
</div>
</div>

<div className="bg-primary-container text-on-primary-container p-6 rounded-xl shadow-lg relative overflow-hidden">
<div className="relative z-10">
<div className="flex items-center gap-2 mb-2">
<div className="w-2 h-2 bg-tertiary-fixed rounded-full animate-pulse"></div>
<span className="text-label-xs font-bold uppercase tracking-wider">État des Services</span>
</div>
<h4 className="font-display text-headline-md font-bold mb-4">Tout est opérationnel</h4>
<div className="space-y-3">
<div className="flex justify-between items-center text-label-sm">
<span>API Backend</span>
<span className="font-semibold text-on-tertiary-container">99.9%</span>
</div>
<div className="w-full bg-white/20 h-1.5 rounded-full">
<div className="bg-tertiary-fixed h-full rounded-full w-[99.9%]"></div>
</div>
<div className="flex justify-between items-center text-label-sm">
<span>Moteur du tuteur IA</span>
<span className="font-semibold text-on-tertiary-container">98.5%</span>
</div>
<div className="w-full bg-white/20 h-1.5 rounded-full">
<div className="bg-tertiary-fixed h-full rounded-full w-[98.5%]"></div>
</div>
</div>
</div>

<div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
</div>
</section>
</div>
</div>

<footer className="w-full bottom-0 border-t border-outline-variant bg-surface-container-low dark:bg-surface-container-lowest flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-6 w-full mt-auto">
<div className="flex flex-col md:flex-row gap-4 items-center">
<p className="font-label text-label-xs text-on-surface-variant">© 2024 Edukora Admin - Portail de Sécurité Académique</p>
</div>
<div className="flex gap-6 mt-4 md:mt-0">
<a className="font-label text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Privacy Policy</a>
<a className="font-label text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Protocole de sécurité</a>
<a className="font-label text-label-xs text-on-surface-variant hover:text-primary transition-colors" href="#">Assistance</a>
</div>
</footer>
</main>

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-highest flex justify-around items-center py-3 z-50 border-t border-outline-variant">
<a className="flex flex-col items-center gap-1 text-primary" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>dashboard</span>
<span className="text-[10px] font-bold">Overview</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span className="material-symbols-outlined">group</span>
<span className="text-[10px]">Users</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="text-[10px]">Cours</span>
</a>
<a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="text-[10px]">Analytics</span>
</a>
</nav>
<script>
        // Simple dashboard interaction logic
        document.querySelectorAll('.admin-card-hover').forEach(card =&gt; &#123;
            card.addEventListener('click', () =&gt; &#123;
                console.log('Admin Action: Card details view requested');
                // Could trigger a modal or navigation
            &#125;);
        &#125;);

        // Search highlight mock
        const topBarSearch = document.createElement('input');
        // This is where future interactive JS would live for real data updates
    </script>

    </div>
  );
}
