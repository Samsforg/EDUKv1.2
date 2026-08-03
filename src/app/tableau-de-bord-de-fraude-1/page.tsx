import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin | Surveillance de la Fraude" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-md flex justify-between items-center px-4 md:px-8 py-3">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="h-8 w-8 object-contain bg-white rounded-sm" src="/images/ecran-356.png" />
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Edukora Admin</h1>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-6">
<a className="text-on-primary font-bold underline decoration-secondary decoration-2" href="#">Tableau de bord</a>
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-2 py-1 rounded" href="#">Analyses</a>
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-2 py-1 rounded" href="#">Rapports</a>
</nav>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden cursor-pointer active:scale-95 transition-transform">
<img className="w-full h-full object-cover" src="/images/ecran-357.png" alt="A professional studio portrait of a system administrator in a clean-cut corporate office. The lighting is crisp and academic, using soft blue and white tones that match the Edukora brand colors. The person is an Ivorian professional with a confident, friendly expression, looking directly at the camera, wearing a modern navy blue blazer. Minimalist office background." />
</div>
</div>
</header>

<aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col gap-2 p-4 pt-24 bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline z-40">
<div className="mb-6 px-2">
<div className="flex items-center gap-3 mb-1">
<div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container font-bold">A</div>
<span className="font-headline text-headline-md text-primary font-bold">Panneau Admin</span>
</div>
<p className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Surveillance Fraude</p>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<span>Alertes de Fraude</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="search_check">search_check</span>
<span>Enquêtes</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="rule">rule</span>
<span>Moteur de Règles</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span>Journal d'Audit</span>
</a>
</nav>
<div className="mt-auto p-4 bg-surface-container rounded-xl border border-outline-variant/30">
<p className="text-xs font-semibold text-primary mb-2">Santé du Système</p>
<div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
<div className="bg-tertiary-container h-full w-[94%]"></div>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 text-right">94% de disponibilité</p>
</div>
</aside>

<main className="lg:ml-64 pt-24 pb-20 lg:pb-8 px-4 md:px-8 max-w-7xl mx-auto">

<div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="text-3xl font-bold text-primary mb-1">Tableau de bord de Sécurité</h2>
<p className="text-on-surface-variant">Surveillance de la fraude et intégrité académique en temps réel.</p>
</div>
<div className="flex items-center gap-2 text-sm font-medium bg-surface-container-high px-4 py-2 rounded-full text-on-surface">
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                SURVEILLANCE EN DIRECT ACTIVE
            </div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-error-container rounded-lg text-on-error-container">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
</div>
<span className="text-xs font-bold text-error bg-error-container/20 px-2 py-1 rounded">+12% vs hier</span>
</div>
<p className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">ALERTES ACTIVES</p>
<h3 className="text-4xl font-extrabold text-on-surface mt-1">42</h3>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-secondary-container/20 rounded-lg text-secondary">
<span className="material-symbols-outlined" data-icon="speed">speed</span>
</div>
</div>
<p className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">SCORE DE RISQUE GLOBAL</p>
<div className="flex items-baseline gap-2">
<h3 className="text-4xl font-extrabold text-on-surface mt-1">2.4</h3>
<span className="text-on-surface-variant text-sm">/ 10</span>
</div>
<div className="absolute bottom-0 left-0 w-full h-1 bg-surface-container-highest">
<div className="bg-secondary-container h-full w-[24%]"></div>
</div>
</div>

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-primary-container/10 rounded-lg text-primary">
<span className="material-symbols-outlined" data-icon="block">block</span>
</div>
</div>
<p className="text-on-surface-variant text-sm font-medium uppercase tracking-wider">UTILISATEURS BLOQUÉS (24h)</p>
<h3 className="text-4xl font-extrabold text-on-surface mt-1">118</h3>
</div>
</div>

<div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

<div className="xl:col-span-2 space-y-4">
<div className="flex items-center justify-between mb-2">
<h3 className="text-xl font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="list_alt">list_alt</span>
                        Flux d'Alertes en Direct
                    </h3>
<div className="flex gap-2">
<button className="text-xs font-bold px-3 py-1 bg-surface-container text-on-surface rounded border border-outline-variant">Filtrer</button>
<button className="text-xs font-bold px-3 py-1 bg-surface-container text-on-surface rounded border border-outline-variant">Exporter</button>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant severity-high flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-center">
<div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error">
<span className="material-symbols-outlined" data-icon="payments">payments</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="text-xs font-bold text-error uppercase">PRIORITÉ HAUTE</span>
<span className="text-xs text-on-surface-variant">• il y a 2 mins</span>
</div>
<h4 className="font-bold text-on-surface">Modèle de Paiement Suspect</h4>
<p className="text-sm text-on-surface-variant">ID Utilisateur : <span className="font-mono text-primary">USR-9283-BAC</span></p>
</div>
</div>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-2">
<span>Enquêter</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant severity-med flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-center">
<div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="group">group</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="text-xs font-bold text-secondary uppercase">PRIORITÉ MOYENNE</span>
<span className="text-xs text-on-surface-variant">• il y a 15 mins</span>
</div>
<h4 className="font-bold text-on-surface">Partage de Compte Détecté</h4>
<p className="text-sm text-on-surface-variant">ID Utilisateur : <span className="font-mono text-primary">USR-4412-BEPC</span></p>
</div>
</div>
<button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform flex items-center gap-2">
<span>Enquêter</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant severity-low flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-center">
<div className="w-12 h-12 rounded-full bg-outline/10 flex items-center justify-center text-outline">
<span className="material-symbols-outlined" data-icon="school">school</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="text-xs font-bold text-on-surface-variant uppercase">PRIORITÉ FAIBLE</span>
<span className="text-xs text-on-surface-variant">• il y a 1 heure</span>
</div>
<h4 className="font-bold text-on-surface">Signalement d'Intégrité Académique</h4>
<p className="text-sm text-on-surface-variant">ID Utilisateur : <span className="font-mono text-primary">USR-1055-BAC</span></p>
</div>
</div>
<button className="bg-surface-container-high text-on-surface px-6 py-2 rounded-lg text-sm font-bold active:scale-95 transition-transform flex items-center gap-2">
<span>Enquêter</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant severity-high flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-center">
<div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error">
<span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
</div>
<div>
<div className="flex items-center gap-2 mb-1">
<span className="text-xs font-bold text-error uppercase">PRIORITÉ HAUTE</span>
<span className="text-xs text-on-surface-variant">• il y a 2 heures</span>
</div>
<h4 className="font-bold text-on-surface">Comportement de type Bot dans le Simulateur d'Examen</h4>
<p className="text-sm text-on-surface-variant">ID Utilisateur : <span className="font-mono text-primary">USR-7731-BEPC</span></p>
</div>
</div>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-2">
<span>Enquêter</span>
<span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>

<div className="space-y-6">

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
<h3 className="text-lg font-bold mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="map">map</span>
                        Zones Géographiques Critiques
                    </h3>
<div className="aspect-video w-full rounded-lg overflow-hidden relative mb-4">
<div className="absolute inset-0 bg-primary-container/10"></div>
<img className="w-full h-full object-cover" src="/images/ecran-358.png" alt="A stylized minimalist digital map showing heat concentrations over major cities in Côte d'Ivoire" />
</div>
<div className="space-y-3">
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Abidjan</span>
<span className="font-bold text-error">64% des alertes</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full">
<div className="bg-error h-full w-[64%]"></div>
</div>
<div className="flex justify-between items-center text-sm">
<span className="text-on-surface-variant">Yamoussoukro</span>
<span className="font-bold text-secondary">18% des alertes</span>
</div>
<div className="w-full bg-surface-container-high h-1.5 rounded-full">
<div className="bg-secondary h-full w-[18%]"></div>
</div>
</div>
</div>

<div className="bg-primary p-6 rounded-xl text-on-primary shadow-lg overflow-hidden relative group">
<div className="relative z-10">
<h3 className="font-bold text-xl mb-1">Gain d'Efficacité</h3>
<p className="text-on-primary/70 text-sm mb-4">L'auto-modération a résolu 84 cas aujourd'hui.</p>
<button className="bg-on-primary text-primary px-4 py-2 rounded font-bold text-sm hover:bg-secondary-fixed transition-colors">Voir les Logs</button>
</div>
<div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-container rounded-full opacity-50 blur-3xl"></div>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-safe px-4 bg-surface dark:bg-surface-container-highest border-t border-outline-variant dark:border-outline shadow-lg lg:hidden">
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform p-2 rounded-lg">
<span className="material-symbols-outlined" data-icon="manage_search">manage_search</span>
<span className="font-label text-label-xs">Enquête</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform p-2 rounded-lg">
<span className="material-symbols-outlined" data-icon="settings_suggest">settings_suggest</span>
<span className="font-label text-label-xs">Règles</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high active:scale-90 transition-transform p-2 rounded-lg">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Simple micro-interactions
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function(e) &#123;
                if (this.innerText.includes('Enquêter')) &#123;
                    const row = this.closest('div[class*="severity-"]');
                    row.style.opacity = '0.5';
                    row.style.pointerEvents = 'none';
                    this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin" data-icon="refresh"&gt;refresh&lt;/span&gt;';
                    setTimeout(() =&gt; &#123;
                        row.remove();
                    &#125;, 800);
                &#125;
            &#125;);
        &#125;);

        // Simulating live feed update
        setInterval(() =&gt; &#123;
            const kpis = document.querySelectorAll('.text-4xl');
            const kpi = kpis[0]; // Active alerts
            if (kpi &amp;&amp; Math.random() &gt; 0.7) &#123;
                const currentVal = parseInt(kpi.innerText);
                kpi.innerText = currentVal + (Math.random() &gt; 0.5 ? 1 : -1);
                kpi.classList.add('text-secondary');
                setTimeout(() =&gt; kpi.classList.remove('text-secondary'), 1000);
            &#125;
        &#125;, 5000);
    </script>

    </div>
  );
}
