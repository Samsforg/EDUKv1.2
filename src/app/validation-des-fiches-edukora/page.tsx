import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - File de Validation" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24 md:pb-0 md:pl-[280px]" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col h-full w-[280px] fixed left-0 top-0 bg-surface-container-low border-r border-surface-border py-stack-md z-40">
<div className="px-6 mb-8">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Edukora</h1>
</div>
<div className="px-4 mb-stack-md">
<div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl border border-surface-border">
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">
                    DM
                </div>
<div>
<p className="font-title-md text-title-md text-on-surface">Dr. Martin</p>
<p className="font-label-md text-label-md text-on-surface-variant">Expert Pédagogique</p>
</div>
</div>
</div>
<nav className="flex-1 px-2 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-lg text-body-lg">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container font-bold rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-lg text-body-lg">Validation</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body-lg text-body-lg">Statistiques</span>
</a>
<div className="my-4 border-t border-surface-border"></div>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">star</span>
<span className="font-body-lg text-body-lg">Paramètres Experts</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">description</span>
<span className="font-body-lg text-body-lg">Ressources Admin</span>
</a>
</nav>
<div className="px-2 mt-auto">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-all" href="#">
<span className="material-symbols-outlined">logout</span>
<span className="font-body-lg text-body-lg">Déconnexion</span>
</a>
</div>
</aside>

<header className="w-full top-0 sticky z-30 bg-surface-container-lowest flex justify-between items-center px-container-padding-desktop h-16 border-b border-surface-border">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 hover:bg-surface-container-low rounded-full transition-colors">
<span className="material-symbols-outlined">menu</span>
</button>
<h2 className="font-headline-md text-headline-md font-bold text-primary">File de Validation</h2>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low rounded-full transition-colors relative">
<span className="material-symbols-outlined">notifications</span>
<span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
</button>
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center cursor-pointer overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-376.png" alt="A professional headshot of a mature university professor with graying hair and glasses, smiling warmly. The background is a blurred academic library with soft, warm lighting. The overall style is clean, high-resolution, and professional, reflecting corporate excellence and intellectual authority." />
</div>
</div>
</header>

<main className="p-4 md:p-container-padding-desktop max-w-7xl mx-auto">

<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-md">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border flex flex-col justify-between">
<div>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Taux de précision</span>
<h3 className="font-metric-num text-metric-num text-primary mt-1">98.4%</h3>
</div>
<div className="flex items-center gap-2 mt-4">
<span className="material-symbols-outlined text-impact-emerald text-sm">trending_up</span>
<span className="font-label-md text-label-md text-impact-emerald">+2.1% ce mois</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border flex flex-col justify-between">
<div>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Temps moyen de réponse</span>
<h3 className="font-metric-num text-metric-num text-primary mt-1">4h 12m</h3>
</div>
<div className="flex items-center gap-2 mt-4">
<span className="material-symbols-outlined text-impact-emerald text-sm">bolt</span>
<span className="font-label-md text-label-md text-impact-emerald">Top 5% Experts</span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border flex flex-col justify-between">
<div>
<span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Impact Étudiant</span>
<h3 className="font-metric-num text-metric-num text-primary mt-1">12,450</h3>
</div>
<div className="flex items-center gap-2 mt-4">
<span className="material-symbols-outlined text-expert-purple text-sm">school</span>
<span className="font-label-md text-label-md text-expert-purple">Validations actives</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-surface-border mb-stack-md overflow-hidden">
<div className="flex border-b border-surface-border">
<button className="flex-1 px-4 py-4 text-primary border-b-2 border-primary font-bold transition-colors">
                    En attente (12)
                </button>
<button className="flex-1 px-4 py-4 text-on-surface-variant hover:text-on-surface transition-colors font-body-lg">
                    Validées (145)
                </button>
<button className="flex-1 px-4 py-4 text-on-surface-variant hover:text-on-surface transition-colors font-body-lg">
                    Refusées (8)
                </button>
</div>
<div className="p-4 flex flex-wrap gap-3 items-center">
<span className="font-label-md text-label-md text-on-surface-variant mr-2">Filtrer par :</span>
<button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant hover:border-primary transition-all">
<span className="font-body-md text-body-md">Matières</span>
<span className="material-symbols-outlined text-sm">expand_more</span>
</button>
<button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant hover:border-primary transition-all">
<span className="font-body-md text-body-md">Urgence</span>
<span className="material-symbols-outlined text-sm">expand_more</span>
</button>
<button className="flex items-center gap-2 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant hover:border-primary transition-all">
<span className="font-body-md text-body-md">Série</span>
<span className="material-symbols-outlined text-sm">expand_more</span>
</button>
<div className="ml-auto relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-sm">search</span>
<input className="pl-9 pr-4 py-1.5 bg-surface-container-low border border-surface-border rounded-lg text-body-md w-64 focus:outline-none focus:border-primary" placeholder="Rechercher un dossier..." type="text" />
</div>
</div>
</div>

<div className="space-y-4">

<div className="validation-card-accent bg-surface-container-lowest rounded-lg border border-surface-border p-5 hover:shadow-sm transition-all group flex flex-col md:flex-row items-start md:items-center gap-6">
<div className="flex-shrink-0">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>functions</span>
</div>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<h4 className="font-title-md text-title-md text-on-surface">Mathématiques - Logarithmes</h4>
<span className="px-2 py-0.5 bg-error-container text-on-error-container font-label-md text-[10px] rounded uppercase font-bold tracking-tighter">Urgent</span>
</div>
<div className="flex flex-wrap gap-x-6 gap-y-2 text-on-surface-variant">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">person</span>
<span className="font-body-md text-body-md">Kouassi Marc</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">schedule</span>
<span className="font-body-md text-body-md">Il y a 2h</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">school</span>
<span className="font-body-md text-body-md">Terminale C</span>
</div>
</div>
</div>
<div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
<button className="flex-1 md:flex-none px-6 py-2 border border-primary text-primary font-bold rounded transition-colors hover:bg-primary hover:text-white">
                        Détails
                    </button>
<button className="flex-1 md:flex-none px-6 py-2 bg-primary text-white font-bold rounded transition-all hover:bg-primary-container shadow-md active:scale-95 flex items-center justify-center gap-2">
<span>Analyser</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>

<div className="validation-card-accent bg-surface-container-lowest rounded-lg border border-surface-border p-5 hover:shadow-sm transition-all group flex flex-col md:flex-row items-start md:items-center gap-6">
<div className="flex-shrink-0">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
</div>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<h4 className="font-title-md text-title-md text-on-surface">Physique - Électricité</h4>
<span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-md text-[10px] rounded uppercase font-bold tracking-tighter">Normal</span>
</div>
<div className="flex flex-wrap gap-x-6 gap-y-2 text-on-surface-variant">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">person</span>
<span className="font-body-md text-body-md">Aminata O.</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">schedule</span>
<span className="font-body-md text-body-md">Il y a 5h</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">school</span>
<span className="font-body-md text-body-md">Première D</span>
</div>
</div>
</div>
<div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
<button className="flex-1 md:flex-none px-6 py-2 border border-primary text-primary font-bold rounded transition-colors hover:bg-primary hover:text-white">
                        Détails
                    </button>
<button className="flex-1 md:flex-none px-6 py-2 bg-primary text-white font-bold rounded transition-all hover:bg-primary-container shadow-md active:scale-95 flex items-center justify-center gap-2">
<span>Analyser</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>

<div className="validation-card-accent bg-surface-container-lowest rounded-lg border border-surface-border p-5 hover:shadow-sm transition-all group flex flex-col md:flex-row items-start md:items-center gap-6">
<div className="flex-shrink-0">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>biotech</span>
</div>
</div>
<div className="flex-1">
<div className="flex items-center gap-3 mb-1">
<h4 className="font-title-md text-title-md text-on-surface">SVT - Génétique</h4>
<span className="px-2 py-0.5 bg-surface-container text-on-surface-variant font-label-md text-[10px] rounded uppercase font-bold tracking-tighter">Normal</span>
</div>
<div className="flex flex-wrap gap-x-6 gap-y-2 text-on-surface-variant">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">person</span>
<span className="font-body-md text-body-md">Jean-Pierre K.</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">schedule</span>
<span className="font-body-md text-body-md">Hier, 18:30</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[18px]">school</span>
<span className="font-body-md text-body-md">Terminale D</span>
</div>
</div>
</div>
<div className="flex items-center gap-3 w-full md:w-auto mt-4 md:mt-0">
<button className="flex-1 md:flex-none px-6 py-2 border border-primary text-primary font-bold rounded transition-colors hover:bg-primary hover:text-white">
                        Détails
                    </button>
<button className="flex-1 md:flex-none px-6 py-2 bg-primary text-white font-bold rounded transition-all hover:bg-primary-container shadow-md active:scale-95 flex items-center justify-center gap-2">
<span>Analyser</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</div>
</div>

<div className="mt-stack-md p-12 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center justify-center text-center opacity-60">
<span className="material-symbols-outlined text-6xl text-outline mb-4">task_alt</span>
<p className="font-title-md text-title-md text-on-surface-variant">Tous les dossiers urgents ont été traités.</p>
<p className="font-body-md text-body-md text-outline">Félicitations pour votre efficacité aujourd'hui.</p>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full bg-surface-container-lowest flex justify-around items-center py-2 px-4 border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Tableau</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>fact_check</span>
<span className="font-label-md text-label-md">Validation</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-md text-label-md">Stats</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>

<script>
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('click', function() &#123;
                this.classList.add('scale-95');
                setTimeout(() =&gt; this.classList.remove('scale-95'), 150);
            &#125;);
        &#125;);

        // Simple Tab Toggle Logic
        const tabs = document.querySelectorAll('.flex.border-b button');
        tabs.forEach(tab =&gt; &#123;
            tab.addEventListener('click', () =&gt; &#123;
                tabs.forEach(t =&gt; &#123;
                    t.classList.remove('text-primary', 'border-b-2', 'border-primary', 'font-bold');
                    t.classList.add('text-on-surface-variant', 'font-body-lg');
                &#125;);
                tab.classList.add('text-primary', 'border-b-2', 'border-primary', 'font-bold');
                tab.classList.remove('text-on-surface-variant', 'font-body-lg');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
