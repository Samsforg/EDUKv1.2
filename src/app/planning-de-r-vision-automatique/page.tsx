import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Mon Planning de Révision" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-background border-b border-outline-variant dark:border-outline z-50 flex items-center justify-between px-4 h-16">
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-headline-md text-primary">Mon Planning</h1>
</div>
<div className="flex items-center gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="overflow-x-auto no-scrollbar py-2">
<div className="flex gap-3">

<div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl border border-outline-variant text-on-surface-variant bg-surface">
<span className="text-label-xs font-semibold uppercase">Lun</span>
<span className="text-body-lg font-bold">12</span>
</div>
<div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl border border-outline-variant text-on-surface-variant bg-surface">
<span className="text-label-xs font-semibold uppercase">Mar</span>
<span className="text-body-lg font-bold">13</span>
</div>
<div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl bg-primary text-on-primary shadow-lg ring-2 ring-primary-container">
<span className="text-label-xs font-semibold uppercase">Mer</span>
<span className="text-body-lg font-bold">14</span>
</div>
<div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl border border-outline-variant text-on-surface-variant bg-surface">
<span className="text-label-xs font-semibold uppercase">Jeu</span>
<span className="text-body-lg font-bold">15</span>
</div>
<div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl border border-outline-variant text-on-surface-variant bg-surface">
<span className="text-label-xs font-semibold uppercase">Ven</span>
<span className="text-body-lg font-bold">16</span>
</div>
<div className="flex flex-col items-center justify-center min-w-[56px] py-3 rounded-xl border border-outline-variant text-on-surface-variant bg-surface">
<span className="text-label-xs font-semibold uppercase">Sam</span>
<span className="text-body-lg font-bold">17</span>
</div>
</div>
</section>

<section className="bg-primary-container p-5 rounded-xl text-on-primary-container shadow-sm border border-primary/10">
<div className="flex justify-between items-end mb-3">
<div>
<h2 className="text-label-sm font-bold uppercase tracking-wider mb-1">Objectif du jour</h2>
<p className="text-display-lg-mobile font-bold leading-tight">2 sessions sur 3</p>
</div>
<div className="text-right">
<span className="text-body-md font-semibold">66% terminé</span>
</div>
</div>
<div className="w-full bg-on-primary-container/20 h-3 rounded-full overflow-hidden">
<div className="bg-tertiary-fixed w-2/3 h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(126,250,179,0.5)]"></div>
</div>
<p className="mt-4 text-label-sm flex items-center gap-2">
<span className="material-symbols-outlined text-sm">stars</span>
                Presque là ! Encore une session pour valider ton programme du jour.
            </p>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="font-headline font-bold text-headline-md">Sessions d'aujourd'hui</h2>
<span className="text-label-xs text-outline font-bold uppercase">14 MARS</span>
</div>
<div className="grid grid-cols-1 gap-4">

<div className="group relative bg-surface border border-outline-variant rounded-xl p-4 flex gap-4 transition-all hover:border-primary/50 overflow-hidden">
<div className="absolute top-0 right-0 p-2">
<span className="material-symbols-outlined text-tertiary-container" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-3xl">calculate</span>
</div>
<div className="flex-1">
<span className="text-label-xs text-outline font-bold">08:30 - 10:00</span>
<h3 className="font-headline font-bold text-body-lg text-primary">Mathématiques</h3>
<p className="text-body-md text-on-surface-variant">Intégrales et Primitives</p>
<button className="mt-3 text-label-sm font-bold text-tertiary flex items-center gap-1 opacity-80 cursor-default">
                            Complété
                        </button>
</div>
</div>

<div className="group relative bg-surface border-2 border-primary rounded-xl p-4 flex gap-4 shadow-md transition-all hover:shadow-lg overflow-hidden">
<div className="absolute top-3 right-3">
<span className="flex h-2 w-2 relative">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
</div>
<div className="w-16 h-16 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-container text-3xl">science</span>
</div>
<div className="flex-1">
<span className="text-label-xs text-secondary font-bold">EN COURS · 10:30 - 12:00</span>
<h3 className="font-headline font-bold text-body-lg text-primary">Physique-Chimie</h3>
<p className="text-body-md text-on-surface-variant">Lois de Newton &amp; Mécanique</p>
<button className="mt-3 bg-secondary text-on-secondary px-6 py-2 rounded-xl text-label-sm font-bold shadow-sm hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2">
                            Continuer la révision
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
</button>
</div>
</div>

<div className="group bg-surface border border-outline-variant rounded-xl p-4 flex gap-4 transition-all hover:border-primary/50 opacity-80 hover:opacity-100">
<div className="w-16 h-16 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-primary text-3xl">language</span>
</div>
<div className="flex-1">
<span className="text-label-xs text-outline font-bold">14:00 - 15:30</span>
<h3 className="font-headline font-bold text-body-lg text-primary">Français</h3>
<p className="text-body-md text-on-surface-variant">Commentaire composé : La poésie</p>
<button className="mt-3 border border-outline text-on-surface-variant px-6 py-2 rounded-xl text-label-sm font-bold hover:bg-surface-container-high transition-colors">
                            Réviser plus tard
                        </button>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 border-dashed">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<h2 className="font-headline font-bold text-body-lg">Recommandé par l'IA</h2>
</div>
<div className="space-y-3">
<div className="p-4 bg-surface rounded-xl border border-outline-variant/30 flex items-center justify-between">
<div className="flex gap-3 items-center">
<div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-error text-xl">trending_down</span>
</div>
<div>
<h4 className="text-label-sm font-bold text-on-surface">Physique : Optique</h4>
<p className="text-label-xs text-outline">Point faible identifié hier (BAC)</p>
</div>
</div>
<button className="text-primary font-bold text-label-xs uppercase tracking-tight">Ajouter</button>
</div>
</div>
</section>

<div className="bg-primary/5 p-4 rounded-xl flex items-start gap-3">
<span className="material-symbols-outlined text-primary">info</span>
<p className="text-label-sm text-on-surface-variant">Ton planning s'adapte automatiquement à tes résultats. Les sujets non maîtrisés sont replanifiés en priorité.</p>
</div>
</main>

<button className="fixed bottom-24 right-6 bg-secondary text-on-secondary w-14 h-14 rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'wght' 600"}}>auto_awesome</span>
</button>

<div className="px-4 mb-10 max-w-2xl mx-auto">
<button className="w-full py-4 bg-surface-container-high border border-outline-variant text-primary font-headline font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined">edit_calendar</span>
            Générer un nouveau planning
        </button>
</div>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface dark:bg-surface-container-lowest shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] rounded-t-xl">
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary-fixed-dim dark:text-on-primary-fixed-variant rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline hover:bg-surface-container-high transition-colors rounded-xl px-4 py-1" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline hover:bg-surface-container-high transition-colors rounded-xl px-4 py-1" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline hover:bg-surface-container-high transition-colors rounded-xl px-4 py-1" href="#">
<span className="material-symbols-outlined">bookmark</span>
<span className="font-label text-label-xs">Favoris</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline hover:bg-surface-container-high transition-colors rounded-xl px-4 py-1" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for calendar selection
        const calendarDays = document.querySelectorAll('section.overflow-x-auto .flex &gt; div');
        calendarDays.forEach(day =&gt; &#123;
            day.addEventListener('click', () =&gt; &#123;
                calendarDays.forEach(d =&gt; &#123;
                    d.classList.remove('bg-primary', 'text-on-primary', 'shadow-lg', 'ring-2', 'ring-primary-container');
                    d.classList.add('border', 'border-outline-variant', 'text-on-surface-variant', 'bg-surface');
                &#125;);
                day.classList.remove('border', 'border-outline-variant', 'text-on-surface-variant', 'bg-surface');
                day.classList.add('bg-primary', 'text-on-primary', 'shadow-lg', 'ring-2', 'ring-primary-container');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
