import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Validation Lab" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 z-40 bg-surface dark:bg-surface-container border-b border-surface-border dark:border-outline-variant flex justify-between items-center px-container-padding-desktop h-16">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" style={{"fontSize":"24px"}}>school</span>
<h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">Edukora Professor</h1>
</div>
<div className="flex items-center gap-base">
<div className="flex flex-col items-end mr-3 hidden md:flex">
<span className="font-title-md text-on-surface">Dr. Elena Vance</span>
<span className="text-label-md text-on-surface-variant uppercase tracking-wider">Statut d'expert</span>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-153.png" alt="A professional portrait of a senior academic professor in a modern, bright university office. The lighting is soft and high-key, using the brand's blue and white color palette. The professor has a warm, confident expression, wearing professional attire. The background is slightly blurred, showing books and a clean desk, reinforcing reliability and intellectual clarity." />
</div>
</div>
</header>
<div className="flex h-[calc(100vh-64px)] overflow-hidden">

<nav className="fixed left-0 top-16 h-full w-[280px] bg-surface dark:bg-surface-container border-r border-surface-border dark:border-outline-variant flex flex-col py-stack-md gap-base hidden md:flex">

<a className="flex items-center px-6 py-3 mx-4 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mr-4">dashboard</span>
<span className="font-body-md">Tableau de bord</span>
</a>
<a className="flex items-center px-6 py-3 mx-4 rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-fixed-dim/10 transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mr-4">fact_check</span>
<span className="font-body-md">Validation Lab</span>
</a>
<a className="flex items-center px-6 py-3 mx-4 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mr-4">insights</span>
<span className="font-body-md">Impact Analytics</span>
</a>
<a className="flex items-center px-6 py-3 mx-4 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined mr-4">settings</span>
<span className="font-body-md">Paramètres</span>
</a>

<div className="mt-auto mx-4 p-4 bg-surface-container-low rounded-xl border border-surface-border">
<p className="text-label-md text-on-surface-variant mb-1">REMAINING TODAY</p>
<div className="flex items-baseline gap-2">
<span className="font-metric-num text-metric-num text-primary">12</span>
<span className="text-body-md text-on-surface-variant">Sheets</span>
</div>
</div>
</nav>

<main className="flex-1 md:ml-[280px] overflow-hidden flex flex-col">

<div className="p-container-padding-desktop bg-white border-b border-surface-border">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface">Validation Lab</h2>
<p className="text-body-lg text-on-surface-variant">Review and certify student-generated study sheets.</p>
</div>
<div className="flex gap-3">
<button className="bg-primary-container text-white px-6 py-2 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
<span className="material-symbols-outlined" style={{"fontSize":"20px"}}>task_alt</span>
                            Bulk Approval
                        </button>
</div>
</div>

<div className="flex flex-wrap items-center gap-gutter">
<div className="flex flex-col gap-1">
<label className="text-label-md text-on-surface-variant uppercase">Subject</label>
<select className="bg-surface-container-low border border-surface-border rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary/20 outline-none min-w-[180px]">
<option>All Subjects</option>
<option>SVT</option>
<option>Français</option>
<option>Physique-Chimie</option>
<option>Histoire-Géo</option>
</select>
</div>
<div className="flex flex-col gap-1">
<label className="text-label-md text-on-surface-variant uppercase">Urgency</label>
<select className="bg-surface-container-low border border-surface-border rounded-lg px-4 py-2 text-body-md focus:ring-2 focus:ring-primary/20 outline-none min-w-[150px]">
<option>All Priorities</option>
<option>High (Final Exams)</option>
<option>Medium</option>
<option>Low</option>
</select>
</div>
<div className="flex flex-col gap-1">
<label className="text-label-md text-on-surface-variant uppercase">Statut</label>
<div className="flex gap-2">
<button className="px-4 py-2 rounded-full text-label-md font-bold bg-primary text-white border border-primary">All (42)</button>
<button className="px-4 py-2 rounded-full text-label-md font-bold bg-white text-on-surface-variant border border-surface-border hover:bg-surface-container-low transition-colors">Nouveau (12)</button>
<button className="px-4 py-2 rounded-full text-label-md font-bold bg-white text-on-surface-variant border border-surface-border hover:bg-surface-container-low transition-colors">En cours (30)</button>
</div>
</div>
</div>
</div>

<div className="flex-1 overflow-y-auto custom-scrollbar bg-background">
<div className="p-container-padding-desktop">
<div className="bg-white border border-surface-border rounded-xl overflow-hidden shadow-none">

<div className="grid grid-cols-12 gap-4 px-6 py-4 bg-surface-container-low border-b border-surface-border text-label-md text-on-surface-variant uppercase font-bold">
<div className="col-span-4">Student &amp; Sheet Title</div>
<div className="col-span-2">Subject</div>
<div className="col-span-2">Statut</div>
<div className="col-span-2">Soumis</div>
<div className="col-span-2 text-right">Actions</div>
</div>

<div className="validation-row grid grid-cols-12 gap-4 px-6 py-5 border-b border-surface-border items-center hover:bg-surface-container-low transition-colors border-l-4 border-l-validation-amber">
<div className="col-span-4 flex items-center gap-4">
<div className="w-10 h-10 rounded bg-secondary-container flex items-center justify-center text-primary font-bold">JB</div>
<div>
<h4 className="font-title-md text-on-surface">La méiose et diversité génétique</h4>
<p className="text-body-md text-on-surface-variant">Julien Bernard • Terminale S</p>
</div>
</div>
<div className="col-span-2">
<span className="px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full text-label-md font-bold">SVT</span>
</div>
<div className="col-span-2">
<span className="flex items-center gap-2 text-validation-amber font-bold text-label-md uppercase">
<span className="w-2 h-2 rounded-full bg-validation-amber"></span> Nouveau
                                </span>
</div>
<div className="col-span-2 text-body-md text-on-surface-variant">2 hours ago</div>
<div className="col-span-2 flex justify-end gap-2 action-buttons opacity-0 transition-opacity">
<button className="p-2 text-primary hover:bg-primary-fixed-dim/20 rounded-lg transition-colors" title="Preview">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="p-2 text-impact-emerald hover:bg-impact-emerald/10 rounded-lg transition-colors" title="Approve">
<span className="material-symbols-outlined">check_circle</span>
</button>
<button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors" title="Reject">
<span className="material-symbols-outlined">cancel</span>
</button>
</div>
</div>

<div className="validation-row grid grid-cols-12 gap-4 px-6 py-5 border-b border-surface-border items-center hover:bg-surface-container-low transition-colors border-l-4 border-l-transparent">
<div className="col-span-4 flex items-center gap-4">
<div className="w-10 h-10 rounded bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold">ML</div>
<div>
<h4 className="font-title-md text-on-surface">Figures de style en poésie</h4>
<p className="text-body-md text-on-surface-variant">Marie Laurent • 1ère Générale</p>
</div>
</div>
<div className="col-span-2">
<span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-md font-bold">FRANÇAIS</span>
</div>
<div className="col-span-2">
<span className="flex items-center gap-2 text-on-secondary-container font-bold text-label-md uppercase">
<span className="w-2 h-2 rounded-full bg-on-secondary-container"></span> En cours
                                </span>
</div>
<div className="col-span-2 text-body-md text-on-surface-variant">5 hours ago</div>
<div className="col-span-2 flex justify-end gap-2 action-buttons opacity-0 transition-opacity">
<button className="p-2 text-primary hover:bg-primary-fixed-dim/20 rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="p-2 text-impact-emerald hover:bg-impact-emerald/10 rounded-lg transition-colors">
<span className="material-symbols-outlined">check_circle</span>
</button>
<button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
<span className="material-symbols-outlined">cancel</span>
</button>
</div>
</div>

<div className="validation-row grid grid-cols-12 gap-4 px-6 py-5 border-b border-surface-border items-center hover:bg-surface-container-low transition-colors border-l-4 border-l-transparent">
<div className="col-span-4 flex items-center gap-4">
<div className="w-10 h-10 rounded bg-outline-variant flex items-center justify-center text-on-surface font-bold">TH</div>
<div>
<h4 className="font-title-md text-on-surface">Les lois de Newton (Dynamique)</h4>
<p className="text-body-md text-on-surface-variant">Thomas Hoffmann • Terminale S</p>
</div>
</div>
<div className="col-span-2">
<span className="px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full text-label-md font-bold">PHYSIQUE</span>
</div>
<div className="col-span-2">
<span className="flex items-center gap-2 text-validation-amber font-bold text-label-md uppercase">
<span className="w-2 h-2 rounded-full bg-validation-amber"></span> Nouveau
                                </span>
</div>
<div className="col-span-2 text-body-md text-on-surface-variant">Hier</div>
<div className="col-span-2 flex justify-end gap-2 action-buttons opacity-0 transition-opacity">
<button className="p-2 text-primary hover:bg-primary-fixed-dim/20 rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="p-2 text-impact-emerald hover:bg-impact-emerald/10 rounded-lg transition-colors">
<span className="material-symbols-outlined">check_circle</span>
</button>
<button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
<span className="material-symbols-outlined">cancel</span>
</button>
</div>
</div>

<div className="validation-row grid grid-cols-12 gap-4 px-6 py-5 border-b border-surface-border items-center hover:bg-surface-container-low transition-colors border-l-4 border-l-transparent">
<div className="col-span-4 flex items-center gap-4">
<div className="w-10 h-10 rounded bg-secondary-fixed-dim flex items-center justify-center text-primary font-bold">SP</div>
<div>
<h4 className="font-title-md text-on-surface">Guerre Froide : Un monde bipolaire</h4>
<p className="text-body-md text-on-surface-variant">Sophie Petit • 3ème</p>
</div>
</div>
<div className="col-span-2">
<span className="px-3 py-1 bg-primary-container/10 text-primary-container rounded-full text-label-md font-bold uppercase">Histoire</span>
</div>
<div className="col-span-2">
<span className="flex items-center gap-2 text-on-secondary-container font-bold text-label-md uppercase">
<span className="w-2 h-2 rounded-full bg-on-secondary-container"></span> En cours
                                </span>
</div>
<div className="col-span-2 text-body-md text-on-surface-variant">2 days ago</div>
<div className="col-span-2 flex justify-end gap-2 action-buttons opacity-0 transition-opacity">
<button className="p-2 text-primary hover:bg-primary-fixed-dim/20 rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="p-2 text-impact-emerald hover:bg-impact-emerald/10 rounded-lg transition-colors">
<span className="material-symbols-outlined">check_circle</span>
</button>
<button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors">
<span className="material-symbols-outlined">cancel</span>
</button>
</div>
</div>
</div>

<div className="mt-stack-md flex justify-center">
<button className="bg-white border border-surface-border px-8 py-3 rounded-lg text-primary font-bold hover:bg-surface-container-low transition-colors">
                            Charger 20 fiches de plus
                        </button>
</div>
</div>
</div>
</main>
</div>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-16 pb-safe bg-surface dark:bg-surface-container-highest border-t border-surface-border shadow-sm z-50 md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold" href="#">
<span className="material-symbols-outlined">approval</span>
<span className="font-label-md text-label-md">Vérifier</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined">monitoring</span>
<span className="font-label-md text-label-md">Metrics</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>


<script>
        // Simple Interaction logic
        document.querySelectorAll('.validation-row').forEach(row =&gt; &#123;
            row.addEventListener('click', (e) =&gt; &#123;
                if (!e.target.closest('button')) &#123;
                    // Navigate to details or open modal
                    console.log('Opening validation details...');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
