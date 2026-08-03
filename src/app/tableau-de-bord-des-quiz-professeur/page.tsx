import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Gestion des Quiz" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col md:flex-row" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex h-full w-72 left-0 fixed bg-surface-container-low flex-col gap-8 p-4 border-r border-outline-variant transition-all duration-200 ease-in-out z-40">
<div className="px-4 py-6">
<h1 className="font-headline text-headline-md font-bold text-primary">Edukora Pro</h1>
</div>
<div className="flex items-center gap-3 px-4 mb-6">
<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-360.png" alt="A professional portrait of a West African male professor in his 40s, wearing a modern academic blazer and glasses, set against a blurred university library background. The lighting is soft and professional, emphasizing expertise and approachability. The image uses the Edukora blue and white color palette for a cohesive institutional feel." />
</div>
<div>
<p className="font-headline font-semibold text-primary">Prof. Kouassi</p>
<p className="text-on-surface-variant text-xs">Faculté des Sciences</p>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full transition-all" href="#">
<span className="material-symbols-outlined">quiz</span>
<span className="font-body text-body-md">Mes Quiz</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all" href="#">
<span className="material-symbols-outlined">database</span>
<span className="font-body text-body-md">Banque de questions</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant rounded-full transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 md:ml-72 pb-24 md:pb-8">

<header className="w-full top-0 sticky bg-primary flex justify-between items-center px-4 md:px-8 h-16 w-full z-30">
<div className="flex items-center gap-4">
<button className="md:hidden text-on-primary">
<span className="material-symbols-outlined">menu</span>
</button>
<span className="font-headline text-headline-md font-semibold text-on-primary">Edukora Pro</span>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 items-center mr-4">
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors" href="#">Aide</a>
<a className="text-primary-fixed-dim hover:text-on-primary transition-colors" href="#">Documentation</a>
</div>
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">PK</div>
</div>
</header>

<div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<h2 className="font-headline text-display-lg-mobile md:text-display-lg font-bold text-on-surface">Gestion des Quiz</h2>
<p className="text-on-surface-variant mt-1">Créez, éditez et analysez les performances de vos évaluations.</p>
</div>
<div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
<button className="px-4 py-2 bg-surface-container-high rounded-full text-sm font-medium hover:bg-surface-variant transition-all whitespace-nowrap">Tous (12)</button>
<button className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm font-medium hover:bg-surface-variant transition-all whitespace-nowrap">Publiés (5)</button>
<button className="px-4 py-2 bg-surface-container-low border border-outline-variant rounded-full text-sm font-medium hover:bg-surface-variant transition-all whitespace-nowrap">Brouillons (4)</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="quiz-card bg-surface-container-lowest border border-outline-variant rounded-xl p-5 transition-all flex flex-col justify-between h-full group">
<div>
<div className="flex justify-between items-start mb-4">
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">PUBLIÉ</span>
<button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<h3 className="font-headline text-xl font-bold text-primary mb-2">Maths - Intégrales Complexes</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
<span className="material-symbols-outlined text-sm">list_alt</span>
<span>25 Questions</span>
</div>
</div>
<div className="mt-4 pt-4 border-t border-surface-variant flex items-center justify-between">
<div className="flex flex-col">
<span className="text-[10px] text-on-surface-variant uppercase font-semibold">Taux de réussite</span>
<span className="font-bold text-tertiary">78%</span>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined text-base">analytics</span>
                            Voir Stats
                        </button>
</div>
</div>

<div className="quiz-card bg-surface-container-lowest border border-outline-variant rounded-xl p-5 transition-all flex flex-col justify-between h-full group">
<div>
<div className="flex justify-between items-start mb-4">
<span className="bg-surface-variant text-on-surface-variant text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">BROUILLON</span>
<button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<h3 className="font-headline text-xl font-bold text-primary mb-2">Physique - Mécanique Quantique</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
<span className="material-symbols-outlined text-sm">list_alt</span>
<span>12 Questions</span>
</div>
</div>
<div className="mt-4 pt-4 border-t border-surface-variant flex items-center justify-between">
<div className="flex flex-col opacity-40">
<span className="text-[10px] text-on-surface-variant uppercase font-semibold">Taux de réussite</span>
<span className="font-bold">--%</span>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high text-on-surface rounded-lg text-sm font-semibold hover:bg-surface-variant active:scale-95 transition-all">
<span className="material-symbols-outlined text-base">edit</span>
                            Modifier
                        </button>
</div>
</div>

<div className="quiz-card bg-surface-container-lowest border border-outline-variant rounded-xl p-5 transition-all flex flex-col justify-between h-full group">
<div>
<div className="flex justify-between items-start mb-4">
<span className="bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">PROGRAMMÉ</span>
<button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<h3 className="font-headline text-xl font-bold text-primary mb-2">SVT - Génétique Mendelienne</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>Prévu pour le 15 Octobre</span>
</div>
</div>
<div className="mt-4 pt-4 border-t border-surface-variant flex items-center justify-between">
<div className="flex flex-col">
<span className="text-[10px] text-on-surface-variant uppercase font-semibold">Questions</span>
<span className="font-bold text-on-surface">30</span>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined text-base">visibility</span>
                            Aperçu
                        </button>
</div>
</div>

<div className="quiz-card bg-surface-container-lowest border border-outline-variant rounded-xl p-5 transition-all flex flex-col justify-between h-full group">
<div>
<div className="flex justify-between items-start mb-4">
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded">PUBLIÉ</span>
<button className="text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
</div>
<h3 className="font-headline text-xl font-bold text-primary mb-2">Chimie - Équilibres Acido-basiques</h3>
<div className="flex items-center gap-2 text-on-surface-variant text-sm mb-4">
<span className="material-symbols-outlined text-sm">list_alt</span>
<span>18 Questions</span>
</div>
</div>
<div className="mt-4 pt-4 border-t border-surface-variant flex items-center justify-between">
<div className="flex flex-col">
<span className="text-[10px] text-on-surface-variant uppercase font-semibold">Taux de réussite</span>
<span className="font-bold text-tertiary">64%</span>
</div>
<button className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg text-sm font-semibold hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined text-base">analytics</span>
                            Voir Stats
                        </button>
</div>
</div>

<div className="quiz-card bg-primary-container/10 border-2 border-dashed border-primary-container rounded-xl p-5 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer lg:col-span-1">
<div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined text-3xl">auto_awesome</span>
</div>
<div>
<h3 className="font-headline text-lg font-bold text-primary">Générer par IA</h3>
<p className="text-xs text-on-surface-variant mt-1 px-4">Créez un quiz complet à partir de vos supports de cours en quelques secondes.</p>
</div>
<button className="px-6 py-2 bg-primary-container text-on-primary-container rounded-full text-sm font-bold hover:bg-primary-container/80 transition-all">Démarrer l'IA</button>
</div>
</div>
</div>
</main>

<button className="fixed bottom-24 md:bottom-8 right-8 w-14 h-14 md:w-16 md:h-16 bg-secondary-container text-on-secondary-container rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50 group">
<span className="material-symbols-outlined text-3xl">add</span>
<span className="absolute right-full mr-4 bg-inverse-surface text-inverse-on-surface px-3 py-1 rounded text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">Créer un nouveau quiz</span>
</button>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest border-t border-outline-variant shadow-md flex justify-around items-center h-16 px-4">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1" href="#">
<span className="material-symbols-outlined">add_circle</span>
<span className="font-label text-label-xs font-medium">Quiz</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-label text-label-xs font-medium">Aide</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for the cards
        document.querySelectorAll('.quiz-card').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-4px)';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
