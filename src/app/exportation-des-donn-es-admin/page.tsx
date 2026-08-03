import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Exportation des Données" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col h-screen sticky top-0 bg-surface-container-low border-r border-outline-variant w-72 shrink-0">
<div className="p-6">
<h1 className="font-headline text-headline-md text-primary font-bold">Edukora Admin</h1>
</div>
<div className="px-4 py-6 flex items-center gap-4 mb-4">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-151.png" alt="A professional headshot of a mature West African man in corporate attire, sitting in a modern office with glass walls and soft focus technology dashboards in the background. The lighting is bright and professional, following a light-mode corporate aesthetic with academic blue accents. High-quality corporate photography style." />
</div>
<div>
<p className="font-semibold text-on-surface">Utilisateur admin</p>
<p className="text-label-xs text-on-surface-variant">Responsable de plateforme</p>
</div>
</div>
<nav className="flex-1 px-2 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">assessment</span>
<span className="font-body text-body-md">Rapports</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>ios_share</span>
<span className="font-body text-body-md">Data Export</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">security</span>
<span className="font-body text-body-md">Sécurité</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
<div className="p-4 border-t border-outline-variant">
<p className="text-label-xs text-outline text-center">v1.2.0</p>
</div>
</aside>

<main className="flex-1 flex flex-col min-h-screen pb-20 md:pb-0">

<header className="sticky top-0 z-40 bg-primary shadow-sm flex justify-between items-center w-full px-4 md:px-8 py-4 text-on-primary">
<div className="flex items-center gap-4">
<button className="md:hidden">
<span className="material-symbols-outlined">menu</span>
</button>
<h2 className="font-headline text-headline-md font-semibold">Exportation &amp; Rapports</h2>
</div>
<div className="flex items-center gap-2">
<span className="hidden md:inline text-primary-fixed-dim text-label-sm mr-2">Profil admin</span>
<div className="w-8 h-8 rounded-full border border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-152.png" alt="Close-up of a circular user avatar icon showing a professional professional woman in a modern office environment. The style is minimalist and high-contrast, using a color palette of deep academic blues and white. Lighting is soft and even, highlighting a corporate professional aesthetic suitable for an administrative dashboard." />
</div>
</div>
</header>
<section className="p-4 md:p-8 space-y-6 max-w-6xl mx-auto w-full">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-7 space-y-6">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="text-headline-md font-semibold text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">tune</span>
                            Paramètres d'Exportation
                        </h3>
<div className="space-y-8">

<div>
<label className="block text-label-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Période des données</label>
<div className="grid grid-cols-3 gap-2">
<button className="px-4 py-3 rounded-lg border border-primary text-primary font-medium bg-primary-fixed hover:bg-primary-fixed-dim transition-colors text-sm text-center">
                                        Derniers 30 jours
                                    </button>
<button className="px-4 py-3 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors text-sm text-center">
                                        Mois en cours
                                    </button>
<button className="px-4 py-3 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors text-sm text-center flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                                        Personnalisé
                                    </button>
</div>
</div>

<div>
<label className="block text-label-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Catégories de données</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
<label className="flex items-center gap-3 p-4 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input checked={true} className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant" type="checkbox" />
<div className="flex flex-col">
<span className="text-body-md font-medium text-on-surface">Statistiques Académiques</span>
<span className="text-label-xs text-on-surface-variant">Performances BEPC &amp; BAC</span>
</div>
</label>
<label className="flex items-center gap-3 p-4 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant" type="checkbox" />
<div className="flex flex-col">
<span className="text-body-md font-medium text-on-surface">Rapports Financiers</span>
<span className="text-label-xs text-on-surface-variant">Souscriptions et revenus</span>
</div>
</label>
<label className="flex items-center gap-3 p-4 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant" type="checkbox" />
<div className="flex flex-col">
<span className="text-body-md font-medium text-on-surface">Incidents de Sécurité</span>
<span className="text-label-xs text-on-surface-variant">Logs d'accès et alertes</span>
</div>
</label>
<label className="flex items-center gap-3 p-4 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant" type="checkbox" />
<div className="flex flex-col">
<span className="text-body-md font-medium text-on-surface">Activité des Experts</span>
<span className="text-label-xs text-on-surface-variant">Taux de réponse AI &amp; Tutorat</span>
</div>
</label>
</div>
</div>

<div>
<label className="block text-label-sm font-semibold text-on-surface-variant mb-3 uppercase tracking-wider">Format du fichier</label>
<div className="inline-flex p-1 bg-surface-container-high rounded-xl gap-1">
<button className="px-6 py-2 rounded-lg bg-surface-container-lowest shadow-sm text-primary font-bold transition-all">PDF</button>
<button className="px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">CSV</button>
<button className="px-6 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">Excel</button>
</div>
</div>

<div className="pt-4">
<button className="w-full py-4 bg-secondary-container hover:bg-secondary text-on-secondary-container font-bold text-lg rounded-xl shadow-lg shadow-secondary/20 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
<span className="material-symbols-outlined">download_for_offline</span>
                                    Générer le rapport
                                </button>
<p className="text-center text-label-xs text-on-surface-variant mt-4">L'extraction peut prendre jusqu'à 2 minutes pour les gros volumes de données.</p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 space-y-6">
<div className="bg-surface-container-low border border-outline-variant rounded-xl overflow-hidden flex flex-col h-full shadow-sm">
<div className="p-6 border-b border-outline-variant bg-surface-container-lowest">
<h3 className="text-headline-md font-semibold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined">history</span>
                                Historique Récent
                            </h3>
</div>
<div className="flex-1 overflow-y-auto divide-y divide-outline-variant">

<div className="p-4 hover:bg-surface-container-highest transition-colors flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>picture_as_pdf</span>
</div>
<div>
<h4 className="text-body-md font-semibold text-on-surface">Rapport_Mensuel_Mai_2024.pdf</h4>
<p className="text-label-xs text-on-surface-variant">Aujourd'hui, 09:45 • 4.2 MB</p>
<span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant uppercase tracking-tighter">Prêt</span>
</div>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors group-hover:scale-110">
<span className="material-symbols-outlined">download</span>
</button>
</div>

<div className="p-4 hover:bg-surface-container-highest transition-colors flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
<span className="material-symbols-outlined animate-spin">sync</span>
</div>
<div>
<h4 className="text-body-md font-semibold text-on-surface">Global_Stats_Export.csv</h4>
<p className="text-label-xs text-on-surface-variant">Aujourd'hui, 10:12 • --</p>
<span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-primary-fixed text-on-primary-fixed-variant uppercase tracking-tighter">En cours</span>
</div>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-outline cursor-not-allowed">
<span className="material-symbols-outlined">hourglass_empty</span>
</button>
</div>

<div className="p-4 hover:bg-surface-container-highest transition-colors flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>description</span>
</div>
<div>
<h4 className="text-body-md font-semibold text-on-surface">Securite_Incidents_Q2.xlsx</h4>
<p className="text-label-xs text-on-surface-variant">Hier, 16:30 • 12.8 MB</p>
<span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant uppercase tracking-tighter">Prêt</span>
</div>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors group-hover:scale-110">
<span className="material-symbols-outlined">download</span>
</button>
</div>

<div className="p-4 hover:bg-surface-container-highest transition-colors flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-error-container/20 flex items-center justify-center text-error">
<span className="material-symbols-outlined">report_problem</span>
</div>
<div>
<h4 className="text-body-md font-semibold text-on-surface">Financial_Detailed_2023.pdf</h4>
<p className="text-label-xs text-on-surface-variant">24 Mai 2024 • --</p>
<span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-error-container text-on-error-container uppercase tracking-tighter">Échoué</span>
</div>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors">
<span className="material-symbols-outlined">refresh</span>
</button>
</div>

<div className="p-4 hover:bg-surface-container-highest transition-colors flex items-center justify-between group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-tertiary-container/10 flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>picture_as_pdf</span>
</div>
<div>
<h4 className="text-body-md font-semibold text-on-surface">Expert_Activity_Weekly.pdf</h4>
<p className="text-label-xs text-on-surface-variant">22 Mai 2024 • 1.1 MB</p>
<span className="inline-flex items-center px-2 py-0.5 mt-1 rounded-full text-[10px] font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant uppercase tracking-tighter">Prêt</span>
</div>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors group-hover:scale-110">
<span className="material-symbols-outlined">download</span>
</button>
</div>
</div>
<div className="p-4 bg-surface-container-highest">
<button className="w-full text-center text-label-sm font-bold text-primary hover:underline">Voir l'archive complète</button>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-primary text-on-primary p-6 rounded-xl relative overflow-hidden">
<div className="relative z-10">
<p className="text-primary-fixed-dim text-label-sm uppercase font-bold mb-1">Volume Exporté</p>
<h4 className="text-display-lg font-bold">142 GB</h4>
<p className="text-label-xs text-on-primary-container mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-xs">trending_up</span> +12% ce mois
                        </p>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl opacity-10 rotate-12">database</span>
</div>
<div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant">
<p className="text-on-surface-variant text-label-sm uppercase font-bold mb-1">Dernière sauvegarde</p>
<h4 className="text-display-lg font-bold text-on-surface">Hier, 23:00</h4>
<p className="text-label-xs text-tertiary-container mt-2 flex items-center gap-1">
<span className="material-symbols-outlined text-xs">verified</span> Automatique &amp; Sécurisé
                    </p>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border-2 border-dashed border-outline-variant flex flex-col justify-center items-center group cursor-pointer hover:border-primary transition-colors">
<span className="material-symbols-outlined text-primary text-4xl mb-2 group-hover:scale-110 transition-transform">add_task</span>
<p className="font-bold text-on-surface">Planifier un rapport</p>
<p className="text-label-xs text-on-surface-variant">Programmation récurrente</p>
</div>
</div>
</section>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container-highest border-t border-outline-variant shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs">Rapports</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>file_download</span>
<span className="font-label text-label-xs">Exporter</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform active:scale-90" href="#">
<span className="material-symbols-outlined">history</span>
<span className="font-label text-label-xs">History</span>
</a>
</nav>
</main>
<script>
        // Micro-interaction for buttons
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                button.classList.add('scale-95');
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
            button.addEventListener('mouseleave', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
        &#125;);

        // Toggle checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox =&gt; &#123;
            checkbox.addEventListener('change', function() &#123;
                const parent = this.closest('label');
                if (this.checked) &#123;
                    parent.classList.add('bg-primary-fixed', 'border-primary');
                    parent.classList.remove('bg-surface-container-low', 'border-outline-variant');
                &#125; else &#123;
                    parent.classList.remove('bg-primary-fixed', 'border-primary');
                    parent.classList.add('bg-surface-container-low', 'border-outline-variant');
                &#125;
            &#125;);
        &#125;);

        // Initialize active state logic (simplified simulation)
        console.log("Edukora Export Screen Initialized");
    </script>

    </div>
  );
}
