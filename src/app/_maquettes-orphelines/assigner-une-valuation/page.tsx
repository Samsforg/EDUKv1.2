import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Assignation de Ressources" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-20 md:pb-0" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary shadow-md w-full top-0 sticky flex items-center justify-between px-8 h-16 w-full z-40">
<div className="flex items-center gap-4">
<button className="text-on-primary active:opacity-90">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-2xl">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<a className="text-on-primary font-bold transition-colors" href="#">Tableau de bord</a>
<a className="text-on-primary/80 hover:bg-primary-container transition-colors px-2 py-1 rounded" href="#">My Classes</a>
<a className="text-on-primary/80 hover:bg-primary-container transition-colors px-2 py-1 rounded" href="#">Quizzes</a>
</div>
<img className="w-10 h-10 rounded-full border-2 border-on-primary/20 object-cover" src="/images/ecran-024.png" alt="A professional headshot of a middle-aged academic professor with a kind expression, wearing a navy blue suit and glasses. The background is a blurred office with bookshelves, maintaining a high-contrast corporate yet accessible aesthetic with professional lighting. Edukora brand colors are subtly integrated through the clothing and environment tones." />
</div>
</header>
<div className="flex">

<aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-80 bg-surface border-r border-outline-variant flex-col p-4 z-30">
<div className="flex items-center gap-4 mb-8 p-2">
<img className="w-12 h-12 rounded-full object-cover" src="/images/ecran-025.png" alt="Close-up of a circular profile avatar showing a professor in a modern academic setting. The lighting is soft and natural, emphasizing trust and authority. The colors align with the Academic Blue and Forest Green palette of the Edukora platform." />
<div>
<p className="font-headline font-bold text-primary">Dr. Koffi</p>
<p className="text-on-surface-variant text-sm">Edukora Faculty</p>
</div>
</div>
<nav className="space-y-2">
<div className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 rounded-xl">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</div>
<div className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 rounded-xl">
<span className="material-symbols-outlined">groups</span>
<span className="font-body text-body-md">My Classes</span>
</div>
<div className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 rounded-xl">
<span className="material-symbols-outlined">person_search</span>
<span className="font-body text-body-md">Student Records</span>
</div>
<div className="flex items-center gap-4 p-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full cursor-pointer active:scale-95">
<span className="material-symbols-outlined">quiz</span>
<span className="font-body text-body-md">Quiz Builder</span>
</div>
<div className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-low transition-all cursor-pointer active:scale-95 rounded-xl">
<span className="material-symbols-outlined">folder_open</span>
<span className="font-body text-body-md">Resources</span>
</div>
</nav>
</aside>

<main className="flex-1 md:ml-80 p-4 md:p-8">
<div className="max-w-6xl mx-auto">

<div className="mb-8">
<h2 className="font-headline text-3xl font-bold text-primary mb-2">Assigner une Ressource</h2>
<p className="text-on-surface-variant">Sélectionnez un quiz ou un support de cours et définissez les paramètres de diffusion pour vos classes.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 space-y-6">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center">
<div className="relative flex-1 w-full">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Rechercher un quiz ou document..." type="text" />
</div>
<div className="flex gap-2 w-full md:w-auto">
<button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-sm">filter_list</span>
<span className="text-sm font-medium">Filtres</span>
</button>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg hover:bg-primary-container transition-colors">
<span className="material-symbols-outlined text-sm">add</span>
<span className="text-sm font-medium">Nouveau</span>
</button>
</div>
</div>

<div className="space-y-4">
<h3 className="font-headline font-semibold text-lg flex items-center gap-2">
<span className="material-symbols-outlined text-primary">description</span>
                                Ressources Disponibles
                            </h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="group relative bg-white border-2 border-primary rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer ring-2 ring-primary ring-opacity-10">
<div className="absolute top-2 right-2">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-primary-fixed rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">psychology</span>
</div>
<div className="flex-1">
<h4 className="font-bold text-on-surface">Physique-Chimie: Électricité</h4>
<p className="text-xs text-on-surface-variant mb-3">Quiz • 20 Questions • 45 min</p>
<div className="flex gap-2">
<span className="text-[10px] px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">BAC</span>
<span className="text-[10px] px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-full">Série C/D</span>
</div>
</div>
</div>
</div>

<div className="group bg-white border border-outline-variant rounded-xl p-4 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-3xl">menu_book</span>
</div>
<div className="flex-1">
<h4 className="font-bold text-on-surface">Français: Dissertation</h4>
<p className="text-xs text-on-surface-variant mb-3">PDF • 12 Pages • Support de cours</p>
<div className="flex gap-2">
<span className="text-[10px] px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">BEPC</span>
<span className="text-[10px] px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-full">Toutes Séries</span>
</div>
</div>
</div>
</div>

<div className="group bg-white border border-outline-variant rounded-xl p-4 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-3xl">calculate</span>
</div>
<div className="flex-1">
<h4 className="font-bold text-on-surface">Maths: Probabilités</h4>
<p className="text-xs text-on-surface-variant mb-3">Quiz • 15 Questions • 30 min</p>
<div className="flex gap-2">
<span className="text-[10px] px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">BAC</span>
<span className="text-[10px] px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-full">Série A/C/D</span>
</div>
</div>
</div>
</div>

<div className="group bg-white border border-outline-variant rounded-xl p-4 shadow-sm hover:border-primary hover:shadow-md transition-all cursor-pointer">
<div className="flex items-start gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined text-3xl">history_edu</span>
</div>
<div className="flex-1">
<h4 className="font-bold text-on-surface">Histoire-Géo: Décolonisation</h4>
<p className="text-xs text-on-surface-variant mb-3">Quiz • 25 Questions • 50 min</p>
<div className="flex gap-2">
<span className="text-[10px] px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">BAC</span>
<span className="text-[10px] px-2 py-0.5 bg-surface-container-high text-on-surface-variant rounded-full">Série A</span>
</div>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-6">

<div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline font-bold text-lg text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined">group_add</span>
                                Destinataires
                            </h3>
<div className="space-y-4">
<label className="block text-sm font-semibold text-on-surface">Choisir les classes</label>
<div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
<label className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-xs font-bold">check</span>
</div>
<span className="text-sm font-medium">Terminale C1</span>
</div>
<span className="text-xs text-on-surface-variant">32 élèves</span>
</label>
<label className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-4 h-4 rounded border-2 border-outline-variant"></div>
<span className="text-sm font-medium">Terminale D2</span>
</div>
<span className="text-xs text-on-surface-variant">45 élèves</span>
</label>
<label className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-4 h-4 rounded border-2 border-primary bg-primary flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary text-xs font-bold">check</span>
</div>
<span className="text-sm font-medium">1ère C (Elite)</span>
</div>
<span className="text-xs text-on-surface-variant">20 élèves</span>
</label>
</div>
</div>
</div>

<div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline font-bold text-lg text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined">schedule</span>
                                Programmation
                            </h3>
<div className="space-y-4">
<div>
<label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Date d'ouverture</label>
<input className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-primary focus:border-primary text-sm" type="datetime-local" value="2023-11-20T08:00" />
</div>
<div>
<label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1">Date d'échéance</label>
<input className="w-full px-3 py-2 border border-outline-variant rounded-lg focus:ring-primary focus:border-primary text-sm" type="datetime-local" value="2023-11-27T18:00" />
</div>
<div className="pt-2">
<label className="flex items-center gap-3 cursor-pointer">
<input checked={true} className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
<span className="text-sm text-on-surface">Mode Examen (Timer actif)</span>
</label>
</div>
<div className="pt-2 border-t border-outline-variant">
<label className="flex items-center gap-3 cursor-pointer">
<input className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary" type="checkbox" />
<span className="text-sm text-on-surface">Mélanger les questions</span>
</label>
</div>
</div>
</div>

<button className="w-full py-4 bg-secondary text-on-secondary font-headline font-bold rounded-xl shadow-lg hover:bg-secondary-container transition-all active:scale-95 flex items-center justify-center gap-3">
<span className="material-symbols-outlined">rocket_launch</span>
                            PUBLIER LA RESSOURCE
                        </button>
</div>
</div>

<div className="mt-8 p-4 bg-primary-fixed rounded-xl border border-primary/10 flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">info</span>
</div>
<div className="text-sm text-on-primary-fixed">
<strong>Résumé :</strong> Vous allez assigner <span className="font-bold">"Physique-Chimie: Électricité"</span> à <span className="font-bold">2 classes</span> (52 élèves). Les élèves recevront une notification à l'ouverture le 20 nov.
                    </div>
</div>
</div>
</main>
</div>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 md:hidden bg-surface shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-110">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-110">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label-xs">Classes</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform active:scale-110">
<span className="material-symbols-outlined">assignment</span>
<span className="font-label text-label-xs">Quizzes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-110">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs">Paramètres</span>
</div>
</nav>
<script>
        // Simple micro-interactions for card selection
        document.querySelectorAll('.group').forEach(card =&gt; &#123;
            card.addEventListener('click', function() &#123;
                // Remove visual selection from others (mockup behavior)
                document.querySelectorAll('.group').forEach(c =&gt; &#123;
                    c.classList.remove('border-2', 'border-primary', 'ring-2', 'ring-primary', 'ring-opacity-10');
                    c.classList.add('border');
                    const indicator = c.querySelector('.absolute.top-2.right-2');
                    if (indicator) indicator.remove();
                &#125;);

                // Add to this one
                this.classList.remove('border');
                this.classList.add('border-2', 'border-primary', 'ring-2', 'ring-primary', 'ring-opacity-10');
                
                const check = document.createElement('div');
                check.className = 'absolute top-2 right-2';
                check.innerHTML = '&lt;span class="material-symbols-outlined text-secondary" style="font-variation-settings: \'FILL\' 1;"&gt;check_circle&lt;/span&gt;';
                this.appendChild(check);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
