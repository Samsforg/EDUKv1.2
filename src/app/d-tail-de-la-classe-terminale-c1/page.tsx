import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Terminale C1" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex fixed left-0 top-0 h-full w-80 bg-surface border-r border-outline-variant flex-col p-4 z-50">
<div className="flex items-center gap-3 mb-8 px-2">
<div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">school</span>
</div>
<span className="text-primary font-headline font-bold text-2xl tracking-tight">Edukora</span>
</div>
<nav className="flex-1 space-y-1">
<div className="text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 flex items-center gap-4 px-4 py-3 rounded-xl">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</div>
<div className="bg-secondary-container text-on-secondary-container font-semibold rounded-full flex items-center gap-4 px-4 py-3">
<span className="material-symbols-outlined">groups</span>
<span className="font-body text-body-md">My Classes</span>
</div>
<div className="text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 flex items-center gap-4 px-4 py-3 rounded-xl">
<span className="material-symbols-outlined">person_search</span>
<span className="font-body text-body-md">Student Records</span>
</div>
<div className="text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 flex items-center gap-4 px-4 py-3 rounded-xl">
<span className="material-symbols-outlined">quiz</span>
<span className="font-body text-body-md">Quiz Builder</span>
</div>
<div className="text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 flex items-center gap-4 px-4 py-3 rounded-xl">
<span className="material-symbols-outlined">folder_open</span>
<span className="font-body text-body-md">Resources</span>
</div>
</nav>
<div className="mt-auto border-t border-outline-variant pt-4 px-2">
<div className="flex items-center gap-3">
<img className="w-12 h-12 rounded-full object-cover" src="/images/ecran-102.png" alt="A professional portrait of a West African male professor in a scholarly setting, wearing a modern suit, with a clean and bright academic background of a library. The lighting is soft and focused, projecting authority and kindness, following a corporate educational aesthetic with primary blues and whites." />
<div>
<p className="font-bold text-on-surface">Dr. Koffi</p>
<p className="text-sm text-on-surface-variant">Edukora Faculty</p>
</div>
</div>
</div>
</aside>

<main className="flex-1 md:ml-80 pb-24 md:pb-0">

<header className="bg-primary shadow-md w-full top-0 sticky z-40 flex items-center justify-between px-6 md:px-8 h-16 text-on-primary">
<div className="flex items-center gap-4">
<button className="md:hidden">
<span className="material-symbols-outlined">menu</span>
</button>
<div className="flex flex-col">
<h1 className="font-headline font-bold text-xl tracking-tight leading-none">Terminale C1</h1>
<span className="text-xs text-on-primary/80">Sciences Physiques &amp; Mathématiques</span>
</div>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-primary-container rounded-full transition-colors">
<span className="material-symbols-outlined">search</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-103.png" alt="A close-up profile avatar of a senior academic, featuring warm lighting and a professional white background. The image is clean, sharp, and fits perfectly into a modern educational dashboard interface." />
</div>
</div>
</header>

<div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col gap-2">
<span className="text-on-surface-variant text-sm font-medium">Students</span>
<div className="flex justify-between items-end">
<span className="text-3xl font-bold text-primary">34</span>
<span className="text-tertiary font-bold text-xs flex items-center gap-1 bg-tertiary-fixed-dim/20 px-2 py-1 rounded-full">
<span className="material-symbols-outlined text-xs">trending_up</span> +2
                        </span>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col gap-2">
<span className="text-on-surface-variant text-sm font-medium">Présences (aujourd'hui)</span>
<div className="flex justify-between items-end">
<span className="text-3xl font-bold text-primary">94%</span>
<div className="w-16 h-1.5 bg-surface-container-high rounded-full overflow-hidden">
<div className="bg-tertiary w-[94%] h-full"></div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex flex-col gap-2">
<span className="text-on-surface-variant text-sm font-medium">Avg. Performance</span>
<div className="flex justify-between items-end">
<span className="text-3xl font-bold text-primary">14.2</span>
<span className="text-xs text-on-surface-variant">/ 20</span>
</div>
</div>
<div className="bg-secondary text-on-secondary p-6 rounded-xl flex flex-col gap-2 relative overflow-hidden group cursor-pointer">
<span className="text-on-secondary/80 text-sm font-medium">Examen à venir</span>
<span className="text-xl font-bold">BAC Blanc Maths</span>
<span className="text-xs font-semibold">Dec 15, 08:00 AM</span>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl opacity-10 group-hover:rotate-12 transition-transform">event_upcoming</span>
</div>
</section>

<div className="flex border-b border-outline-variant overflow-x-auto no-scrollbar">
<button className="px-6 py-3 font-semibold active-tab whitespace-nowrap">Students</button>
<button className="px-6 py-3 font-semibold text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">Devoirs</button>
<button className="px-6 py-3 font-semibold text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">Resources</button>
<button className="px-6 py-3 font-semibold text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap">Rapports d'examens</button>
</div>

<div className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-xl font-bold">Student Directory</h2>
<div className="flex gap-2">
<button className="flex items-center gap-2 px-4 py-2 border border-outline rounded-lg text-sm font-semibold hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span> Filtre
                        </button>
<button className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-sm">add</span> New Student
                        </button>
</div>
</div>

<div className="overflow-hidden border border-outline-variant rounded-xl bg-surface-container-lowest">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low text-on-surface-variant text-sm uppercase tracking-wider">
<tr>
<th className="px-6 py-4 font-semibold">Student Name</th>
<th className="px-6 py-4 font-semibold">Performance</th>
<th className="px-6 py-4 font-semibold">Statut</th>
<th className="px-6 py-4 font-semibold">Présences</th>
<th className="px-6 py-4 font-semibold text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold">AK</div>
<div>
<p className="font-semibold text-on-surface">Amara KONÉ</p>
<p className="text-xs text-on-surface-variant">Student ID: #23456</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className="flex flex-wrap gap-1">
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Math Ace</span>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Top 10%</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Present
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm font-medium">98%</p>
<p className="text-[10px] text-on-surface-variant">2 sessions missed</p>
</td>
<td className="px-6 py-4 text-right">
<div className="relative inline-block text-left">
<button className="p-1 hover:bg-surface-container-high rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>

<div className="hidden absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg z-10 py-2" id="menu1">
<button className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container flex items-center gap-2">
<span className="material-symbols-outlined text-sm">visibility</span> Voir le profil
                                            </button>
<button className="w-full text-left px-4 py-2 text-sm hover:bg-surface-container flex items-center gap-2 text-error">
<span className="material-symbols-outlined text-sm">report_problem</span> Signaler un problème
                                            </button>
</div>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold">BS</div>
<div>
<p className="font-semibold text-on-surface">Berthe SORO</p>
<p className="text-xs text-on-surface-variant">Student ID: #23457</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className="flex flex-wrap gap-1">
<span className="bg-primary-fixed text-on-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Consistent</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-semibold bg-error-container text-on-error-container">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span> Late
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm font-medium">85%</p>
<p className="text-[10px] text-on-surface-variant">12 sessions missed</p>
</td>
<td className="px-6 py-4 text-right">
<button className="p-1 hover:bg-surface-container-high rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold">YT</div>
<div>
<p className="font-semibold text-on-surface">Yasmine TOURÉ</p>
<p className="text-xs text-on-surface-variant">Student ID: #23458</p>
</div>
</div>
</td>
<td className="px-6 py-4">
<div className="flex flex-wrap gap-1">
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Excellent</span>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Lab Expert</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 py-0.5 px-2 rounded-full text-xs font-semibold bg-tertiary-fixed text-on-tertiary-fixed">
<span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Present
                                    </span>
</td>
<td className="px-6 py-4">
<p className="text-sm font-medium">100%</p>
<p className="text-[10px] text-on-surface-variant">Perfect record</p>
</td>
<td className="px-6 py-4 text-right">
<button className="p-1 hover:bg-surface-container-high rounded-full transition-colors">
<span className="material-symbols-outlined">more_vert</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="text-xl font-bold">Devoirs en cours</h2>
<a className="text-primary text-sm font-semibold hover:underline" href="#">Voir tout</a>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="p-4 bg-surface-container border border-outline-variant rounded-xl flex gap-4 items-center">
<div className="bg-primary p-3 rounded-lg text-on-primary">
<span className="material-symbols-outlined">description</span>
</div>
<div className="flex-1">
<h3 className="font-semibold">Devoir de Maison n°4</h3>
<p className="text-xs text-on-surface-variant">Probabilités et Statistiques</p>
</div>
<div className="text-right">
<p className="text-xs font-bold text-secondary">In Progress</p>
<p className="text-[10px] text-on-surface-variant">28/34 submitted</p>
</div>
</div>
<div className="p-4 bg-surface-container border border-outline-variant rounded-xl flex gap-4 items-center">
<div className="bg-secondary p-3 rounded-lg text-on-secondary">
<span className="material-symbols-outlined">science</span>
</div>
<div className="flex-1">
<h3 className="font-semibold">Rapport de TP</h3>
<p className="text-xs text-on-surface-variant">Électromagnétisme</p>
</div>
<div className="text-right">
<p className="text-xs font-bold text-error">Deadline Soon</p>
<p className="text-[10px] text-on-surface-variant">Due in 2h</p>
</div>
</div>
</div>
</section>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface-container shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform active:scale-110">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label-xs">Classes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
<span className="material-symbols-outlined">assignment</span>
<span className="font-label text-label-xs">Quizzes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</div>
</nav>

<button className="fixed bottom-20 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40">
<span className="material-symbols-outlined">chat</span>
</button>
<script>
        function toggleMenu(id) &#123;
            const menu = document.getElementById(id);
            menu.classList.toggle('hidden');
            
            // Close other menus
            document.addEventListener('click', function(e) &#123;
                if (!e.target.closest('.relative')) &#123;
                    menu.classList.add('hidden');
                &#125;
            &#125;, &#123; once: true &#125;);
        &#125;
    </script>

    </div>
  );
}
