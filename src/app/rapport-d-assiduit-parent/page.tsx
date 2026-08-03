import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Parent - Rapport d'Assiduité" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-container selection:text-on-primary-container" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex items-center justify-between px-margin-mobile h-16 w-full bg-primary dark:bg-primary-container shadow-sm transition-colors duration-200">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-306.png" alt="A professional studio portrait of an Ivorian father in business casual attire, smiling warmly. The lighting is soft and flattering, emphasizing a mood of support and pride. The background is a clean, academic-themed office with books, maintaining the professional blue and white color palette of the brand." />
</div>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Rapport d'Assiduité</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-primary hover:bg-primary-container/20 transition-colors">
<span className="material-symbols-outlined">notifications</span>
</button>
</header>
<main className="pt-20 pb-28 px-margin-mobile max-w-xl mx-auto space-y-stack-lg">

<section className="space-y-4">
<div className="flex items-center justify-between">
<h2 className="font-headline font-semibold text-body-lg">Calendrier de Travail</h2>
<span className="text-label-sm text-outline">Cette semaine</span>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
<div className="flex justify-between items-center text-center">
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline">LUN</span>
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold active-dot transition-transform active:scale-95 cursor-default">05</div>
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline">MAR</span>
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold active-dot transition-transform active:scale-95 cursor-default">06</div>
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline">MER</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-medium transition-transform active:scale-95 cursor-default">07</div>
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline">JEU</span>
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold active-dot transition-transform active:scale-95 cursor-default">08</div>
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline">VEN</span>
<div className="w-10 h-10 rounded-lg bg-tertiary-fixed-dim text-on-tertiary-fixed flex items-center justify-center font-bold active-dot transition-transform active:scale-95 cursor-default">09</div>
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline text-secondary">SAM</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-medium transition-transform active:scale-95 cursor-default">10</div>
</div>
<div className="flex flex-col items-center gap-2">
<span className="text-label-xs font-bold text-outline text-secondary">DIM</span>
<div className="w-10 h-10 rounded-lg bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-medium transition-transform active:scale-95 cursor-default">11</div>
</div>
</div>
</div>
</section>

<section className="space-y-4">
<h2 className="font-headline font-semibold text-body-lg">Analyse de la régularité</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm space-y-6">
<div className="flex items-end justify-between h-32 gap-2">
<div className="flex-1 bg-primary/10 rounded-t-sm relative group cursor-pointer" style={{"height":"60%"}}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">2.5h</div>
</div>
<div className="flex-1 bg-primary/20 rounded-t-sm relative group cursor-pointer" style={{"height":"80%"}}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">3h</div>
</div>
<div className="flex-1 bg-surface-container-highest rounded-t-sm relative" style={{"height":"10%"}}></div>
<div className="flex-1 bg-primary/40 rounded-t-sm relative group cursor-pointer" style={{"height":"100%"}}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">4h</div>
</div>
<div className="flex-1 bg-primary/30 rounded-t-sm relative group cursor-pointer" style={{"height":"70%"}}>
<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-on-primary text-[10px] px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">2.8h</div>
</div>
<div className="flex-1 bg-surface-container-highest rounded-t-sm relative" style={{"height":"15%"}}></div>
<div className="flex-1 bg-surface-container-highest rounded-t-sm relative" style={{"height":"10%"}}></div>
</div>
<p className="text-label-sm text-center text-on-surface-variant font-medium">Heures d'étude par jour</p>
</div>

<div className="bg-secondary-container/10 border border-secondary-container/20 rounded-xl p-5 shadow-sm flex flex-col items-center justify-center gap-3 relative overflow-hidden">
<div className="absolute -right-4 -top-4 opacity-10">
<span className="material-symbols-outlined text-[100px]" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
</div>
<div className="w-14 h-14 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container shadow-md">
<span className="material-symbols-outlined text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
</div>
<div className="text-center">
<p className="text-label-sm uppercase tracking-widest text-secondary font-bold">Plus longue série</p>
<p className="text-4xl font-headline font-extrabold text-on-secondary-container">15 jours</p>
</div>
</div>
</div>
</section>

<section className="bg-primary border border-outline/10 rounded-xl p-6 shadow-lg text-on-primary relative overflow-hidden">
<div className="absolute right-0 top-0 w-32 h-32 bg-on-primary/5 rounded-full -mr-16 -mt-16"></div>
<div className="flex items-start gap-4">
<div className="bg-on-primary/20 p-3 rounded-lg">
<span className="material-symbols-outlined text-3xl">schedule</span>
</div>
<div>
<h3 className="font-headline font-bold text-body-lg">Heures de pointe</h3>
<p className="mt-1 text-on-primary/80 font-medium leading-relaxed">
                        Votre enfant étudie principalement entre <span className="text-secondary-fixed font-bold underline decoration-2 underline-offset-4">18h et 20h</span>.
                    </p>
<p className="text-label-xs mt-3 text-on-primary/60 italic">Rythme optimal détecté pour la mémorisation.</p>
</div>
</div>
</section>

<section className="bg-surface-container-low border-l-4 border-primary-container rounded-r-xl p-5 space-y-3">
<div className="flex items-center gap-2 text-primary-container font-bold">
<span className="material-symbols-outlined text-2xl">smart_toy</span>
<h3 className="font-headline">Recommandation Edukora</h3>
</div>
<p className="text-body-md text-on-surface-variant leading-relaxed">
                "Une session de <strong className="text-primary">30 min le samedi matin</strong> pourrait booster ses résultats en Français. Le calme matinal favorise la concentration sur la grammaire."
            </p>
<div className="pt-2">
<button className="text-primary font-semibold text-label-sm flex items-center gap-1 hover:underline">
                    Planifier un rappel <span className="material-symbols-outlined text-sm">arrow_forward</span>
</button>
</div>
</section>

<div className="pt-4">
<button className="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-md hover:brightness-110 active:scale-[0.98] transition-all">
<span className="material-symbols-outlined">favorite</span>
                Partager un message d'encouragement
            </button>
</div>
</main>

<div className="fixed inset-0 bg-on-background/40 z-[60] hidden transition-opacity duration-300" id="drawer-overlay"></div>
<aside className="fixed left-0 top-0 h-full w-80 bg-surface dark:bg-inverse-surface shadow-xl z-[70] -translate-x-full transition-transform duration-300 rounded-r-xl flex flex-col py-6 px-4" id="side-drawer">
<div className="flex items-center gap-4 mb-8 px-2">
<div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-3xl">school</span>
</div>
<div>
<h2 className="font-headline text-headline-md text-primary font-bold">Espace Parent</h2>
<p className="text-label-xs text-on-surface-variant">Suivi de réussite</p>
</div>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all font-body text-body-md" href="#">
<span className="material-symbols-outlined">family_restroom</span>
                Mes Enfants
            </a>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all font-body text-body-md" href="#">
<span className="material-symbols-outlined">phonelink_setup</span>
                Paramètres de Jumelage
            </a>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all font-body text-body-md" href="#">
<span className="material-symbols-outlined">support_agent</span>
                Aide &amp; Support
            </a>
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-variant/50 transition-all font-body text-body-md" href="#">
<span className="material-symbols-outlined">description</span>
                Documents Officiels
            </a>
</nav>
<div className="border-t border-outline-variant pt-4">
<a className="flex items-center gap-4 px-4 py-3 rounded-lg text-error hover:bg-error-container/20 transition-all font-body text-body-md" href="#">
<span className="material-symbols-outlined">logout</span>
                Déconnexion
            </a>
</div>
</aside>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl shadow-lg flex justify-around items-center w-full h-20 bg-surface dark:bg-inverse-surface px-2 border-t border-outline-variant dark:border-outline">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-transform active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs font-semibold">Tableau de bord</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-transform active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">assignment</span>
<span className="font-label text-label-xs font-semibold">Examens</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container dark:bg-secondary-container text-on-primary-container dark:text-on-secondary-container rounded-full px-4 py-1 transition-transform active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>history_edu</span>
<span className="font-label text-label-xs font-semibold">Assiduité</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-transform active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for the chart
        document.querySelectorAll('.group').forEach(bar =&gt; &#123;
            bar.addEventListener('mouseenter', () =&gt; &#123;
                bar.classList.add('scale-x-105');
            &#125;);
            bar.addEventListener('mouseleave', () =&gt; &#123;
                bar.classList.remove('scale-x-105');
            &#125;);
        &#125;);

        // Trigger for side drawer (linked to profile image as per TopAppBar leading_type)
        const profileTrigger = document.querySelector('header img');
        const drawer = document.getElementById('side-drawer');
        const overlay = document.getElementById('drawer-overlay');

        profileTrigger.addEventListener('click', () =&gt; &#123;
            drawer.classList.remove('-translate-x-full');
            overlay.classList.remove('hidden');
        &#125;);

        overlay.addEventListener('click', () =&gt; &#123;
            drawer.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        &#125;);
    </script>

    </div>
  );
}
