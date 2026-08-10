import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Paramètres Système" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-8 h-16 bg-surface-container-lowest border-b border-outline-variant">
<div className="flex items-center gap-4">
<button className="p-2 cursor-pointer active:opacity-80 hover:bg-surface-container-high transition-colors rounded-lg">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary">Paramètres Système</h1>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">shield_person</span>
<span className="font-label text-label-sm font-medium text-on-surface-variant">Administration centrale</span>
</div>
</header>

<aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 flex flex-col p-4 w-72 bg-surface-container-low border-r border-outline-variant">
<div className="mb-6 px-4">
<p className="text-primary font-headline text-display-lg-mobile font-bold">Edukora</p>
<p className="text-on-surface-variant text-label-xs uppercase tracking-widest mt-1">Console de Supervision</p>
</div>
<nav className="space-y-1 flex-1">
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:scale-95 duration-200 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-label-sm font-medium">System Overview</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:scale-95 duration-200 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
<span className="material-symbols-outlined">group</span>
<span className="font-body text-label-sm font-medium">User Management</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:scale-95 duration-200 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
<span className="material-symbols-outlined">school</span>
<span className="font-body text-label-sm font-medium">Course Maintenance</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:scale-95 duration-200 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
<span className="material-symbols-outlined">account_balance</span>
<span className="font-body text-label-sm font-medium">Rapports financiers</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:scale-95 duration-200 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all">
<span className="material-symbols-outlined">security</span>
<span className="font-body text-label-sm font-medium">Audit de sécurité</span>
</div>

<div className="flex items-center gap-3 px-4 py-3 cursor-pointer active:scale-95 duration-200 bg-primary-container text-on-primary-container rounded-lg font-bold transition-all shadow-sm">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>settings</span>
<span className="font-body text-label-sm">Paramètres de la plateforme</span>
</div>
</nav>
<div className="mt-auto pt-4 border-t border-outline-variant flex items-center gap-3 px-2">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">AC</div>
<div>
<p className="text-label-sm font-bold text-on-surface">Administration centrale</p>
<p className="text-xs text-on-surface-variant">Nœud Live : CI-01</p>
</div>
</div>
</aside>

<main className="ml-72 pt-20 pb-24 px-8 max-w-7xl">

<div className="grid grid-cols-12 gap-6">

<section className="col-span-12 lg:col-span-7 space-y-4">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">warning</span>
<h2 className="text-headline-md font-bold text-primary">Alertes Techniques</h2>
</div>
<span className="text-xs font-semibold px-2 py-1 bg-surface-container-high text-on-surface-variant rounded">Seuils Actifs</span>
</div>
<div className="space-y-3">

<div className="group flex items-center justify-between p-4 bg-error-container/30 border border-error/20 rounded-lg hover:border-error transition-colors">
<div className="flex items-center gap-4">
<div className="bg-error text-on-error w-10 h-10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">timer</span>
</div>
<div>
<p className="font-bold text-on-error-container">Latence Critique</p>
<p className="text-xs text-on-surface-variant">Seuil: &gt; 200ms</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none right-0 border-primary" id="lat-toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary-fixed cursor-pointer" htmlFor="lat-toggle"></label>
</div>
<button className="p-2 hover:bg-white rounded-full transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">edit</span>
</button>
</div>
</div>

<div className="group flex items-center justify-between p-4 bg-surface-container-low border border-transparent rounded-lg hover:border-outline-variant transition-all">
<div className="flex items-center gap-4">
<div className="bg-secondary-container text-on-secondary-container w-10 h-10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">memory</span>
</div>
<div>
<p className="font-bold text-on-surface">Charge Serveur</p>
<p className="text-xs text-on-surface-variant">Seuil: &gt; 85%</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none right-0 border-primary" id="load-toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-primary-fixed cursor-pointer" htmlFor="load-toggle"></label>
</div>
<button className="p-2 hover:bg-white rounded-full transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">edit</span>
</button>
</div>
</div>

<div className="group flex items-center justify-between p-4 bg-surface-container-low border border-transparent rounded-lg hover:border-outline-variant transition-all">
<div className="flex items-center gap-4">
<div className="bg-tertiary-container text-on-tertiary-container w-10 h-10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined">running_with_errors</span>
</div>
<div>
<p className="font-bold text-on-surface">Taux d'erreurs</p>
<p className="text-xs text-on-surface-variant">Seuil: &gt; 1%</p>
</div>
</div>
<div className="flex items-center gap-4">
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none border-outline-variant left-0" id="error-toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer" htmlFor="error-toggle"></label>
</div>
<button className="p-2 hover:bg-white rounded-full transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">edit</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-tertiary">monitor_heart</span>
<h2 className="text-headline-md font-bold text-primary">Santé des Services</h2>
</div>
<div className="space-y-6">

<div>
<div className="flex justify-between mb-2">
<span className="text-label-sm font-bold text-on-surface">API Gateway</span>
<span className="text-xs font-medium text-tertiary">99.9% Optimal</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-tertiary h-2 rounded-full" style={{"width":"99%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between mb-2">
<span className="text-label-sm font-bold text-on-surface">Database Cluster</span>
<span className="text-xs font-medium text-secondary">Charge élevée 82 %</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-secondary-container h-2 rounded-full" style={{"width":"82%"}}></div>
</div>
</div>

<div>
<div className="flex justify-between mb-2">
<span className="text-label-sm font-bold text-on-surface">Moteur IA (tuteur Edukora)</span>
<span className="text-xs font-medium text-primary">94% Stable</span>
</div>
<div className="w-full bg-surface-container-high rounded-full h-2">
<div className="bg-primary h-2 rounded-full" style={{"width":"94%"}}></div>
</div>
</div>
</div>
</div>
</section>

<div className="col-span-12 lg:col-span-5 space-y-6">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-secondary">build</span>
<h2 className="text-headline-md font-bold text-primary">Maintenance</h2>
</div>
<div className="space-y-4">
<div className="relative">
<label className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-primary uppercase">Date et Heure</label>
<input className="w-full px-4 py-3 rounded-lg border-2 border-outline-variant focus:border-primary outline-none text-on-surface text-sm transition-colors" type="datetime-local" value="2023-10-25T02:00" />
</div>
<div className="relative">
<label className="absolute -top-2 left-3 px-1 bg-white text-[10px] font-bold text-primary uppercase">Durée estimée</label>
<select className="w-full px-4 py-3 rounded-lg border-2 border-outline-variant focus:border-primary outline-none text-on-surface text-sm appearance-none">
<option>30 minutes</option>
<option selected={true}>1 heure</option>
<option>2 heures</option>
<option>4 heures (Mise à jour majeure)</option>
</select>
</div>
<div className="p-4 bg-surface-container border border-outline-variant rounded-lg flex items-center justify-between">
<div>
<p className="font-bold text-on-surface text-sm">Mode Maintenance</p>
<p className="text-xs text-on-surface-variant">Activer le message d'attente global</p>
</div>
<div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer outline-none border-outline-variant left-0" id="maint-toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-5 rounded-full bg-surface-variant cursor-pointer" htmlFor="maint-toggle"></label>
</div>
</div>
<button className="w-full py-3 bg-primary-fixed text-on-primary-fixed font-bold rounded-lg hover:bg-primary-fixed-dim transition-colors text-sm">
                            Programmer la maintenance
                        </button>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm overflow-hidden">
<div className="flex items-center justify-between mb-6">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant">history</span>
<h2 className="text-headline-md font-bold text-primary">Incidents</h2>
</div>
<button className="text-xs font-bold text-primary hover:underline">Voir tout</button>
</div>
<div className="space-y-4">

<div className="flex gap-4 pb-4 border-b border-outline-variant">
<div className="mt-1">
<span className="material-symbols-outlined text-error text-sm">circle</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<p className="font-bold text-on-surface text-sm">Délai d'expiration API Gateway</p>
<span className="text-[10px] font-bold text-error px-2 py-0.5 bg-error-container rounded-full uppercase">Critique</span>
</div>
<p className="text-xs text-on-surface-variant mt-1">21 Oct, 14:45 - Resolvé en 12min</p>
</div>
</div>

<div className="flex gap-4 pb-4 border-b border-outline-variant">
<div className="mt-1">
<span className="material-symbols-outlined text-secondary text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<p className="font-bold text-on-surface text-sm">Latence DB Elevée</p>
<span className="text-[10px] font-bold text-secondary px-2 py-0.5 bg-secondary-fixed rounded-full uppercase">Avertissement</span>
</div>
<p className="text-xs text-on-surface-variant mt-1">20 Oct, 09:12 - Auto-scaling déclenché</p>
</div>
</div>

<div className="flex gap-4">
<div className="mt-1">
<span className="material-symbols-outlined text-tertiary text-sm">check_circle</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start">
<p className="font-bold text-on-surface text-sm">Backup Quotidien Réussi</p>
<span className="text-[10px] font-bold text-tertiary px-2 py-0.5 bg-tertiary-fixed rounded-full uppercase">Infos</span>
</div>
<p className="text-xs text-on-surface-variant mt-1">19 Oct, 03:00 - Intégrité vérifiée</p>
</div>
</div>
</div>
</section>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-72 right-0 bg-surface-container-lowest border-t border-outline-variant px-8 py-4 flex justify-between items-center z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
<div className="flex items-center gap-4 text-xs text-on-surface-variant">
<span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span> Statut: En ligne</span>
<span className="border-l border-outline-variant pl-4">Version Core: 4.2.0-stable</span>
</div>
<div className="flex gap-4">
<button className="px-6 py-2 rounded-lg font-bold text-primary hover:bg-surface-container transition-colors">Annuler</button>
<button className="px-8 py-2 bg-secondary-container text-on-secondary-container rounded-lg font-bold shadow-lg shadow-secondary-container/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2">
<span className="material-symbols-outlined text-[20px]">save</span>
                Sauvegarder les modifications
            </button>
</div>
</footer>
<script>
        // Simple micro-interaction for toggle switches
        document.querySelectorAll('.toggle-checkbox').forEach(toggle =&gt; &#123;
            toggle.addEventListener('change', function() &#123;
                const dot = this;
                if(this.checked) &#123;
                    dot.style.right = '0';
                    dot.style.left = 'auto';
                    dot.classList.remove('left-0', 'border-outline-variant');
                    dot.classList.add('right-0', 'border-primary');
                &#125; else &#123;
                    dot.style.right = 'auto';
                    dot.style.left = '0';
                    dot.classList.remove('right-0', 'border-primary');
                    dot.classList.add('left-0', 'border-outline-variant');
                &#125;
            &#125;);
        &#125;);

        // Background Atmosphere Script
        window.addEventListener('load', () =&gt; &#123;
            console.log('Edukora Admin System Settings Initialized');
        &#125;);
    </script>

    </div>
  );
}
