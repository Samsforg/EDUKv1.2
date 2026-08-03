import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Tableau de Bord" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface flex min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col h-screen border-r border-outline-variant bg-surface-container w-64 fixed left-0 top-0 z-50">
<div className="px-6 py-8">
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<div className="px-4 mb-8">
<div className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg shadow-sm border border-outline-variant/20">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-365.png" alt="Close up portrait of a professional African professor, Dr. Koffi, wearing a stylish suit and glasses, smiling warmly in a bright academic office background with books. Professional corporate photography with soft, warm lighting and shallow depth of field, 8k resolution, light mode aesthetic." />
</div>
<div>
<p className="font-bold text-on-surface text-sm">Dr. Koffi</p>
<p className="text-xs text-on-surface-variant">Session BAC 2024</p>
</div>
</div>
</div>
<nav className="flex-1 px-2 space-y-1">
<a className="flex items-center gap-3 px-4 py-3 cursor-pointer bg-primary-container text-on-primary-container rounded-lg font-semibold" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-body text-body-md">Sessions Live</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-body text-body-md">Modération Chat</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body text-body-md">Ressources</span>
</a>
</nav>
<div className="p-4 border-t border-outline-variant">
<button className="flex items-center gap-3 px-4 py-3 w-full text-error hover:bg-error-container/10 transition-all rounded-lg">
<span className="material-symbols-outlined">logout</span>
<span className="font-body text-body-md">Déconnexion</span>
</button>
</div>
</aside>

<main className="flex-1 md:ml-64 pb-24 md:pb-8">

<header className="flex items-center justify-between px-6 md:px-margin-desktop h-16 w-full sticky top-0 bg-surface/80 backdrop-blur-md z-40 border-b border-outline-variant">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-on-surface">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-primary text-xl">Tableau de bord</h1>
</div>
<div className="flex items-center gap-4">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="w-8 h-8 rounded-full overflow-hidden md:hidden">
<img className="w-full h-full object-cover" src="/images/ecran-366.png" alt="Small round profile avatar of an African teacher, professional and trustworthy, in a bright lighting setting, clean corporate style." />
</div>
</div>
</header>
<div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">

<section className="relative overflow-hidden rounded-xl bg-primary text-on-primary p-6 md:p-10 shadow-lg group">
<div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
<span className="material-symbols-outlined text-[200px]" style={{"fontVariationSettings":"'FILL' 1"}}>functions</span>
</div>
<div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
<div className="space-y-4">
<div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>timer</span>
                            Prochain Direct
                        </div>
<h2 className="text-3xl md:text-4xl font-headline font-extrabold leading-tight">Maths - Primitives &amp; Intégrales</h2>
<div className="flex flex-wrap gap-4 text-primary-fixed">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-lg">calendar_today</span>
<span className="font-medium">Aujourd'hui, 14h00</span>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-lg">group</span>
<span className="font-medium">1,240 inscrits</span>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row gap-4 justify-end">
<button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-md">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>play_circle</span>
                            Lancer le direct
                        </button>
<button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
<span className="material-symbols-outlined">edit_calendar</span>
                            Modifier
                        </button>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="p-3 bg-primary-container/10 rounded-lg text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>group</span>
</div>
<span className="text-tertiary font-bold text-sm flex items-center gap-1">
                            +12% <span className="material-symbols-outlined text-xs">trending_up</span>
</span>
</div>
<div className="mt-4">
<h3 className="text-on-surface-variant text-sm font-medium">Élèves Inscrits (Total)</h3>
<p className="text-3xl font-headline font-bold text-on-surface mt-1">45,892</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
<div className="flex justify-between items-start">
<div className="p-3 bg-tertiary-container/10 rounded-lg text-tertiary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>task_alt</span>
</div>
<span className="text-on-surface-variant font-bold text-sm">Ce mois</span>
</div>
<div className="mt-4">
<h3 className="text-on-surface-variant text-sm font-medium">Fiches Validées</h3>
<p className="text-3xl font-headline font-bold text-on-surface mt-1">312</p>
</div>
</div>

<div className="bg-surface-container-highest border border-outline-variant p-6 rounded-xl shadow-sm flex flex-col justify-center items-center text-center group cursor-pointer hover:bg-primary hover:text-white transition-all duration-300">
<div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center mb-3 group-hover:bg-white group-hover:text-primary transition-colors">
<span className="material-symbols-outlined">add</span>
</div>
<h3 className="font-bold text-lg">Programmer un live</h3>
<p className="text-sm opacity-70">Ajoutez une nouvelle session à votre agenda</p>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

<section className="lg:col-span-2 space-y-4">
<div className="flex justify-between items-center">
<h2 className="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">pending_actions</span>
                            Fiches en attente
                        </h2>
<button className="text-primary font-semibold text-sm hover:underline">Voir tout</button>
</div>
<div className="space-y-3">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between group hover:border-primary/40 transition-colors">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">description</span>
</div>
<div>
<h4 className="font-bold text-on-surface">Physique: Lois de Newton</h4>
<p className="text-xs text-on-surface-variant">Soumis par Assistant Aminata • Il y a 2h</p>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors" title="Aperçu">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="bg-tertiary-container/10 text-tertiary px-4 py-2 rounded-lg text-sm font-bold hover:bg-tertiary-container hover:text-on-tertiary transition-all">
                                    Valider
                                </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between group hover:border-primary/40 transition-colors">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">description</span>
</div>
<div>
<h4 className="font-bold text-on-surface">SVT: Cycle de l'Eau</h4>
<p className="text-xs text-on-surface-variant">Soumis par Prof. Bakayoko • Hier</p>
</div>
</div>
<div className="flex gap-2">
<button className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-colors">
<span className="material-symbols-outlined">visibility</span>
</button>
<button className="bg-tertiary-container/10 text-tertiary px-4 py-2 rounded-lg text-sm font-bold hover:bg-tertiary-container hover:text-on-tertiary transition-all">
                                    Valider
                                </button>
</div>
</div>

<div className="border-2 border-dashed border-outline-variant p-8 rounded-xl flex flex-col items-center justify-center text-on-surface-variant/40">
<span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
<p className="text-sm">4 autres fiches en attente de relecture</p>
</div>
</div>
</section>

<section className="space-y-6">

<div className="bg-primary-container text-on-primary-container p-6 rounded-xl relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-7xl">smart_toy</span>
</div>
<h3 className="font-bold mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-lg">auto_awesome</span>
                            Conseil IA
                        </h3>
<p className="text-sm leading-relaxed opacity-90">
                            Vos élèves demandent souvent des clarifications sur le théorème de Thalès. Envisagez de préparer un mini-quiz pour le prochain live.
                        </p>
<button className="mt-4 text-xs font-bold underline">Générer un quiz</button>
</div>

<div className="bg-surface-container p-6 rounded-xl border border-outline-variant">
<h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">forum</span>
                            Activité Chat
                        </h3>
<div className="space-y-4">
<div className="flex gap-3">
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-on-primary-fixed">JD</div>
<div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm flex-1">
<p className="text-xs text-on-surface-variant">Jean D. • 12:45</p>
<p className="text-sm">Monsieur, le PDF de primitives n'est pas accessible.</p>
</div>
</div>
<button className="w-full py-2 bg-white border border-outline-variant rounded-lg text-sm font-bold text-primary hover:bg-primary-container/5 transition-colors">
                                Ouvrir la modération
                            </button>
</div>
</div>
</section>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-safe bg-surface border-t border-outline-variant shadow-lg z-50 h-16">
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 flex-1 py-2 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>dashboard</span>
<span className="font-label text-label-xs">Bord</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant flex-1 py-2 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-label text-label-xs">En direct</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant flex-1 py-2 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">forum</span>
<span className="font-label text-label-xs">Discussion</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant flex-1 py-2 transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">folder_open</span>
<span className="font-label text-label-xs">Docs</span>
</a>
</nav>

<button className="fixed bottom-20 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40">
<span className="material-symbols-outlined text-3xl">add</span>
</button>

    </div>
  );
}
