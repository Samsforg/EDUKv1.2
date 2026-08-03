import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Bibliothèque Hors-ligne" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-white" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-4 h-16">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary" style={{"fontSize":"28px"}}>school</span>
<h1 className="font-headline text-headline-md font-bold text-primary">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:opacity-80">
<span className="material-symbols-outlined text-on-surface-variant">notifications</span>
</button>
</div>
</header>
<main className="pt-16 pb-24 min-h-screen">

<div className="bg-primary-fixed text-on-primary-fixed px-4 py-2 flex items-center justify-center gap-2 offline-pulse">
<span className="material-symbols-outlined text-[18px]">cloud_off</span>
<span className="font-label text-label-sm font-semibold">Mode Hors-ligne activé</span>
</div>
<section className="max-w-4xl mx-auto px-4 mt-6">

<div className="bg-surface-container-low rounded-xl p-6 mb-8 border border-outline-variant/30">
<div className="flex items-start gap-4">
<div className="bg-tertiary-container/20 p-3 rounded-full">
<span className="material-symbols-outlined text-tertiary">info</span>
</div>
<div>
<h2 className="font-headline text-xl font-bold text-primary mb-2">Prêt pour l'examen</h2>
<p className="text-on-surface-variant text-body-md leading-relaxed">
                            Vous pouvez réviser ces fiches même sans connexion. Vos progrès seront synchronisés automatiquement dès que vous retrouverez internet.
                        </p>
</div>
</div>
</div>
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline text-2xl font-bold tracking-tight">Fiches téléchargées</h3>
<span className="bg-surface-container-highest px-3 py-1 rounded-full font-label text-label-xs text-on-surface-variant">3 ITEMS</span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

<div className="bento-card group bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between h-48 relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
<div className="flex justify-between items-start">
<div className="bg-primary/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-primary">functions</span>
</div>
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="text-label-xs font-semibold text-primary/70 uppercase tracking-widest mb-1">Mathématiques</p>
<h4 className="font-headline text-lg font-bold leading-tight">Fonctions Intégrales</h4>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-3/4 rounded-full"></div>
</div>
<span className="text-label-xs font-bold text-tertiary">75%</span>
</div>
</div>

<div className="bento-card group bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between h-48 relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full blur-2xl group-hover:bg-secondary/10 transition-colors"></div>
<div className="flex justify-between items-start">
<div className="bg-secondary/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-secondary">history_edu</span>
</div>
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="text-label-xs font-semibold text-secondary/70 uppercase tracking-widest mb-1">Philosophie</p>
<h4 className="font-headline text-lg font-bold leading-tight">Dissertation Philo</h4>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-1/2 rounded-full"></div>
</div>
<span className="text-label-xs font-bold text-tertiary">50%</span>
</div>
</div>

<div className="bento-card group bg-surface-container-lowest border border-outline-variant p-5 rounded-xl flex flex-col justify-between h-48 relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-colors"></div>
<div className="flex justify-between items-start">
<div className="bg-tertiary/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-tertiary">strikethrough_s</span>
</div>
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div>
<p className="text-label-xs font-semibold text-tertiary/70 uppercase tracking-widest mb-1">SVT</p>
<h4 className="font-headline text-lg font-bold leading-tight">Génétique SVT</h4>
</div>
<div className="mt-4 flex items-center gap-2">
<div className="h-1.5 flex-1 bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-tertiary w-full rounded-full"></div>
</div>
<span className="text-label-xs font-bold text-tertiary">100%</span>
</div>
</div>

<div className="border-2 border-dashed border-outline-variant p-5 rounded-xl flex flex-col items-center justify-center h-48 opacity-50 grayscale cursor-not-allowed">
<span className="material-symbols-outlined text-4xl mb-2">download_for_offline</span>
<p className="text-label-sm font-medium text-center">Plus de fiches disponibles <br /> avec internet</p>
</div>
</div>

<div className="mt-12 p-6 bg-surface-container rounded-xl">
<div className="flex justify-between items-center mb-4">
<h4 className="font-headline font-bold">Espace Utilisé</h4>
<span className="text-label-xs font-bold text-on-surface-variant">142 MB / 2 GB</span>
</div>
<div className="h-4 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary/40 w-[7%]" title="Edukora Core Data"></div>
</div>
<p className="mt-2 text-label-xs text-on-surface-variant">Votre application est optimisée pour fonctionner avec une faible consommation de données.</p>
</div>
</section>
</main>

<aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-outline-variant bg-surface-container-lowest flex-col py-6">
<div className="px-6 mb-8 flex items-center gap-4">
<div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-213.png" alt="A professional portrait of a young West African student with a warm, ambitious expression, wearing a simple white polo shirt, in a brightly lit modern study environment with soft blue and orange accents." />
</div>
<div>
<p className="font-headline font-bold text-primary">Etudiant Edukora</p>
<p className="text-label-xs text-on-surface-variant">BAC Prep 2024</p>
</div>
</div>
<nav className="space-y-1 px-4">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors" href="#">
<span className="material-symbols-outlined">offline_pin</span>
<span className="font-body text-body-md font-medium">Mode hors ligne</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-full" href="#">
<span className="material-symbols-outlined">local_library</span>
<span className="font-body text-body-md">Bibliothèque</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres d'étude</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body text-body-md">Help Center</span>
</a>
</nav>
</aside>

<nav className="fixed bottom-0 w-full z-50 bg-surface rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center px-2 py-3 lg:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform duration-150 active:scale-95" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform duration-150 active:scale-95" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform duration-150 active:scale-95" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary bg-secondary-container/10 rounded-xl p-2 transition-transform duration-150 active:scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>local_library</span>
<span className="font-label text-label-xs font-semibold">Bibliothèque</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant p-2 transition-transform duration-150 active:scale-95" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction: Toggling status locally (visual only)
        document.querySelectorAll('.bento-card').forEach(card =&gt; &#123;
            card.addEventListener('click', () =&gt; &#123;
                const title = card.querySelector('h4').textContent;
                console.log(`Ouverture de la fiche : $&#123;title&#125;`);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
