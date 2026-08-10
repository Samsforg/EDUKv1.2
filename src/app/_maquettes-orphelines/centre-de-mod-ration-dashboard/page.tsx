import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Administration & Modération" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container font-headline fixed top-0 w-full z-50 border-b border-outline-variant shadow-sm flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-2xl" data-icon="admin_panel_settings">admin_panel_settings</span>
<h1 className="font-bold text-lg md:text-2xl">Modération Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6">
<span className="text-on-primary font-bold cursor-pointer">Tableau de bord</span>
<span className="text-on-primary-container opacity-80 hover:bg-primary-fixed-variant/20 transition-colors cursor-pointer px-2 py-1 rounded">Signalements</span>
</div>
<div className="flex items-center gap-2 bg-primary-container/20 p-1 pr-3 rounded-full border border-on-primary/10">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">AU</div>
<span className="hidden md:inline text-sm font-medium">Utilisateur admin</span>
</div>
</div>
</header>

<nav className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 h-full w-64 border-r border-outline-variant bg-surface dark:bg-inverse-surface">
<div className="p-6">
<h2 className="font-headline font-semibold text-primary text-sm uppercase tracking-wider mb-4">Menu Admin</h2>
<div className="space-y-2">
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg font-semibold cursor-pointer transition-transform duration-200 active:scale-95">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest cursor-pointer transition-transform duration-200 active:scale-95">
<span className="material-symbols-outlined" data-icon="report">report</span>
<span className="font-body text-body-md">Signalements</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest cursor-pointer transition-transform duration-200 active:scale-95">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
<span className="font-body text-body-md">Config IA</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-highest cursor-pointer transition-transform duration-200 active:scale-95">
<span className="material-symbols-outlined" data-icon="history">history</span>
<span className="font-body text-body-md">Logs Système</span>
</a>
</div>
</div>
<div className="mt-auto p-6 border-t border-outline-variant">
<div className="flex items-center gap-2 text-on-surface-variant text-xs">
<span className="material-symbols-outlined text-sm" data-icon="verified_user">verified_user</span>
<span>Version 2.4.0-admin</span>
</div>
</div>
</nav>

<main className="pt-20 pb-20 md:pb-8 md:pl-72 pr-4 md:pr-8 min-h-screen">
<div className="max-w-7xl mx-auto space-y-8">

<section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<p className="text-primary font-semibold text-sm">Vue d'ensemble</p>
<h2 className="text-3xl font-bold text-on-surface tracking-tight">Statistiques de Modération</h2>
</div>
<div className="flex gap-2">
<button className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all">
<span className="material-symbols-outlined text-lg" data-icon="calendar_today">calendar_today</span>
                        Derniers 7 jours
                    </button>
<button className="bg-primary text-on-primary hover:bg-primary-container px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium shadow-md transition-all active:scale-95">
<span className="material-symbols-outlined text-lg" data-icon="download">download</span>
                        Exporter
                    </button>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-2">
<div className="flex justify-between items-start">
<div className="p-2 bg-error-container text-on-error-container rounded-lg">
<span className="material-symbols-outlined" data-icon="pending_actions">pending_actions</span>
</div>
<span className="text-error text-xs font-bold bg-error-container/30 px-2 py-0.5 rounded-full">+12%</span>
</div>
<p className="text-on-surface-variant text-sm font-medium">Signalements en attente</p>
<h3 className="text-3xl font-bold text-on-surface">142</h3>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-2">
<div className="flex justify-between items-start">
<div className="p-2 bg-tertiary-container text-on-tertiary-container rounded-lg">
<span className="material-symbols-outlined" data-icon="timer">timer</span>
</div>
<span className="text-tertiary text-xs font-bold bg-tertiary-fixed/30 px-2 py-0.5 rounded-full">-5 min</span>
</div>
<p className="text-on-surface-variant text-sm font-medium">Temps de réponse moyen</p>
<h3 className="text-3xl font-bold text-on-surface">18<span className="text-lg font-medium ml-1">min</span></h3>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-2">
<div className="flex justify-between items-start">
<div className="p-2 bg-surface-container-high text-on-surface-variant rounded-lg">
<span className="material-symbols-outlined" data-icon="block">block</span>
</div>
</div>
<p className="text-on-surface-variant text-sm font-medium">Bannis récemment</p>
<h3 className="text-3xl font-bold text-on-surface">24</h3>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex flex-col gap-2">
<div className="flex justify-between items-start">
<div className="p-2 bg-primary-container text-on-primary-container rounded-lg">
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
</div>
</div>
<p className="text-on-surface-variant text-sm font-medium">Précision IA (Auto-mod)</p>
<h3 className="text-3xl font-bold text-on-surface">94.2<span className="text-lg font-medium ml-1">%</span></h3>
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

<div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center justify-between mb-6">
<h3 className="text-lg font-bold">Activité de signalement hebdomadaire</h3>
<div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant">
<div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-primary"></span> Signalements</div>
<div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-secondary-container"></span> Résolus</div>
</div>
</div>

<div className="h-64 flex items-end justify-between gap-2 px-2">
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-32 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-24"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Lun</span>
</div>
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-40 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-36"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Mar</span>
</div>
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-28 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-20"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Mer</span>
</div>
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-48 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-44"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Jeu</span>
</div>
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-56 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-52"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Ven</span>
</div>
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-36 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-28"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Sam</span>
</div>
<div className="flex flex-col items-center gap-2 flex-1 group cursor-pointer">
<div className="w-full bg-primary/20 rounded-t-lg relative h-32 group-hover:bg-primary/30 transition-colors">
<div className="absolute bottom-0 w-full bg-primary rounded-t-lg h-22"></div>
</div>
<span className="text-[10px] uppercase font-bold text-on-surface-variant">Dim</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm overflow-hidden flex flex-col">
<h3 className="text-lg font-bold mb-4">Modérateurs actifs</h3>
<div className="space-y-4 overflow-y-auto max-h-[300px] pr-2">

<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
<div className="relative">
<img className="w-10 h-10 rounded-full object-cover" src="/images/ecran-045.png" alt="A professional studio portrait of a young West African woman with a friendly expression, wearing academic attire and glasses. The background is a clean, softly lit office environment in Academic Blue and White tones. The visual style is high-end, corporate, and trustworthy." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary border-2 border-white rounded-full"></div>
</div>
<div className="flex-1">
<p className="text-sm font-bold text-on-surface">Amina K.</p>
<p className="text-[10px] text-on-surface-variant font-medium">Modérateur Senior</p>
</div>
<div className="text-right">
<span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded">84 actions</span>
</div>
</div>

<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
<div className="relative">
<img className="w-10 h-10 rounded-full object-cover" src="/images/ecran-046.png" alt="A professional studio portrait of a young Ivorian man with a focused and serious look, wearing a neat navy blue polo. The lighting is crisp and modern, reflecting a sense of reliability and technical expertise. The background is a minimalist studio setting with subtle orange accents." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary border-2 border-white rounded-full"></div>
</div>
<div className="flex-1">
<p className="text-sm font-bold text-on-surface">Koffi D.</p>
<p className="text-[10px] text-on-surface-variant font-medium">Modérateur Junior</p>
</div>
<div className="text-right">
<span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded">62 actions</span>
</div>
</div>

<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-container-low transition-colors">
<div className="relative">
<img className="w-10 h-10 rounded-full object-cover" src="/images/ecran-047.png" alt="A close-up professional headshot of a middle-aged woman with a confident smile, set against a soft blurred background of an university library. She is dressed in corporate clothing. The lighting emphasizes professional authority and warmth. Use a palette of deep blues and ivory." />
<div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary border-2 border-white rounded-full"></div>
</div>
<div className="flex-1">
<p className="text-sm font-bold text-on-surface">Sira B.</p>
<p className="text-[10px] text-on-surface-variant font-medium">Superviseur IA</p>
</div>
<div className="text-right">
<span className="text-[10px] font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded">41 actions</span>
</div>
</div>
</div>
<button className="w-full mt-auto pt-4 text-primary text-xs font-bold hover:underline">Voir toute l'équipe</button>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
<div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
<h3 className="text-lg font-bold">Dernières sanctions appliquées</h3>
<div className="flex gap-2">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
<input className="pl-9 pr-4 py-1.5 bg-surface text-sm border-outline-variant rounded-lg focus:ring-primary focus:border-primary w-64" placeholder="Rechercher utilisateur..." type="text" />
</div>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low/30 text-on-surface-variant text-[10px] uppercase font-bold tracking-widest">
<th className="px-6 py-4">Utilisateur</th>
<th className="px-6 py-4">Date &amp; Heure</th>
<th className="px-6 py-4">Motif du Ban</th>
<th className="px-6 py-4">Durée</th>
<th className="px-6 py-4">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center font-bold text-xs text-primary">JD</div>
<div>
<p className="text-sm font-bold text-on-surface">Jean-Donatien</p>
<p className="text-[10px] text-on-surface-variant">ID: 9821-XP</p>
</div>
</td>
<td className="px-6 py-4 text-xs font-medium text-on-surface-variant">Il y a 42 mins</td>
<td className="px-6 py-4">
<span className="text-xs px-2 py-1 rounded-md bg-error-container text-on-error-container font-medium">Contenu Inapproprié</span>
</td>
<td className="px-6 py-4 text-xs font-semibold">7 Jours</td>
<td className="px-6 py-4">
<button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center font-bold text-xs text-primary">MT</div>
<div>
<p className="text-sm font-bold text-on-surface">Mariam_Touré</p>
<p className="text-[10px] text-on-surface-variant">ID: 4501-BB</p>
</div>
</td>
<td className="px-6 py-4 text-xs font-medium text-on-surface-variant">Il y a 2 heures</td>
<td className="px-6 py-4">
<span className="text-xs px-2 py-1 rounded-md bg-secondary-container/20 text-on-secondary-container font-medium">Harcèlement</span>
</td>
<td className="px-6 py-4 text-xs font-semibold">Permanent</td>
<td className="px-6 py-4">
<button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors group">
<td className="px-6 py-4 flex items-center gap-3">
<div className="w-8 h-8 rounded bg-surface-variant flex items-center justify-center font-bold text-xs text-primary">AL</div>
<div>
<p className="text-sm font-bold text-on-surface">Alain_Loic</p>
<p className="text-[10px] text-on-surface-variant">ID: 1120-CC</p>
</div>
</td>
<td className="px-6 py-4 text-xs font-medium text-on-surface-variant">Aujourd'hui, 09:15</td>
<td className="px-6 py-4">
<span className="text-xs px-2 py-1 rounded-md bg-surface-container-high text-on-surface-variant font-medium">Tentative de triche</span>
</td>
<td className="px-6 py-4 text-xs font-semibold">24 Heures</td>
<td className="px-6 py-4">
<button className="p-1.5 hover:bg-surface-container-highest rounded-lg transition-colors">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="more_vert">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
<div className="p-4 border-t border-outline-variant bg-surface-container-low/20 text-center">
<button className="text-primary text-sm font-bold hover:underline">Voir l'historique complet des logs</button>
</div>
</section>
</div>
</main>

<nav className="md:hidden flex justify-around items-center h-16 px-2 fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-inverse-surface border-t border-outline-variant bg-surface-container-lowest shadow-lg">
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-all">
<span className="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span className="font-label text-label-xs">Tableau de bord</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest scale-95 active:scale-90 transition-all">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest scale-95 active:scale-90 transition-all">
<span className="material-symbols-outlined" data-icon="settings_suggest">settings_suggest</span>
<span className="font-label text-label-xs">Paramètres IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest scale-95 active:scale-90 transition-all">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            // Animate counts (basic version)
            const stats = document.querySelectorAll('h3.text-3xl');
            stats.forEach(stat =&gt; &#123;
                const finalValue = parseFloat(stat.innerText.replace(/[^0-9.]/g, ''));
                if(isNaN(finalValue)) return;
                
                let startValue = 0;
                const duration = 1000;
                const startTime = performance.now();

                const updateCount = (currentTime) =&gt; &#123;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const currentCount = (progress * finalValue).toFixed(stat.innerText.includes('.') ? 1 : 0);
                    
                    // Re-add units if needed
                    if(stat.innerText.includes('min')) &#123;
                        stat.innerHTML = `$&#123;currentCount&#125;&lt;span class="text-lg font-medium ml-1"&gt;min&lt;/span&gt;`;
                    &#125; else if(stat.innerText.includes('%')) &#123;
                        stat.innerHTML = `$&#123;currentCount&#125;&lt;span class="text-lg font-medium ml-1"&gt;%&lt;/span&gt;`;
                    &#125; else &#123;
                        stat.innerText = currentCount;
                    &#125;

                    if (progress &lt; 1) &#123;
                        requestAnimationFrame(updateCount);
                    &#125;
                &#125;;
                requestAnimationFrame(updateCount);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
