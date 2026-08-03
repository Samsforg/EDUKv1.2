import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Parent - Suivi des Examens" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-sm flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-337.png" alt="A portrait of a professional Ivorian parent, smiling warmly, captured in a bright, modern indoor setting with soft daylight. The image has a clean, high-end corporate aesthetic with a shallow depth of field, highlighting the person's friendly and supportive expression." />
</div>
<span className="font-headline text-headline-md font-semibold text-on-primary">Suivi des Examens</span>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-on-primary p-2 hover:bg-primary-container/20 transition-colors rounded-full" data-icon="notifications">notifications</button>
</div>
</header>
<main className="mt-20 px-4 md:px-8 max-w-7xl mx-auto">

<section className="mb-8">
<div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-4 flex items-center justify-between">
<div>
<h2 className="text-body-md font-bold text-primary flex items-center gap-2">
<span className="material-symbols-outlined text-[20px]" data-icon="stars">stars</span>
                        Objectif National
                    </h2>
<p className="text-label-sm text-on-surface-variant">Performances de l'élève par rapport à la moyenne nationale.</p>
</div>
<div className="bg-primary text-on-primary px-4 py-2 rounded-full font-headline font-bold text-headline-md">
                    +1.5 <span className="text-label-sm font-normal">pts</span>
</div>
</div>
</section>

<nav className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
<button className="bg-primary text-on-primary px-6 py-2 rounded-full font-label text-label-sm transition-all shadow-md">Tous</button>
<button className="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label text-label-sm hover:bg-surface-container-highest transition-all">Maths</button>
<button className="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label text-label-sm hover:bg-surface-container-highest transition-all">Sciences</button>
<button className="bg-surface-container-high text-on-surface-variant px-6 py-2 rounded-full font-label text-label-sm hover:bg-surface-container-highest transition-all">Littérature</button>
</nav>

<section className="bento-grid mb-8">
<div className="col-span-full bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex justify-between items-start mb-6">
<div>
<h3 className="text-headline-md font-bold text-on-surface">Évolution des notes</h3>
<p className="text-label-sm text-on-surface-variant">Moyenne trimestrielle glissante</p>
</div>
<div className="text-right">
<span className="text-display-lg text-tertiary font-bold">15.8/20</span>
<div className="flex items-center text-tertiary gap-1 justify-end">
<span className="material-symbols-outlined text-[16px]" data-icon="trending_up">trending_up</span>
<span className="text-label-xs font-bold">+8% vs mois dernier</span>
</div>
</div>
</div>

<div className="w-full h-48 relative mt-4">
<svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
<path d="M0,80 Q100,70 200,75 T400,50 T600,60 T800,30 T1000,25" fill="none" stroke="#0047AB" strokeLinecap="round" strokeWidth="3" />
<path d="M0,80 Q100,70 200,75 T400,50 T600,60 T800,30 T1000,25 L1000,100 L0,100 Z" fill="url(#gradient)" opacity="0.1" />
<defs>
<linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
<stop offset="0%" style={{"stopColor":"#0047AB","stopOpacity":"1"}} />
<stop offset="100%" style={{"stopColor":"#0047AB","stopOpacity":"0"}} />
</linearGradient>
</defs>

<circle cx="0" cy="80" fill="#0047AB" r="4" />
<circle cx="200" cy="75" fill="#0047AB" r="4" />
<circle cx="400" cy="50" fill="#0047AB" r="4" />
<circle cx="600" cy="60" fill="#0047AB" r="4" />
<circle cx="800" cy="30" fill="#0047AB" r="4" />
<circle cx="1000" cy="25" fill="#0047AB" r="4" />
</svg>
<div className="absolute bottom-[-20px] left-0 right-0 flex justify-between text-label-xs text-on-surface-variant font-medium">
<span>Sept</span>
<span>Oct</span>
<span>nov.</span>
<span>Déc</span>
</div>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="text-headline-md font-bold px-1 mb-4">Examens Récents</h3>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all group">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-fixed" data-icon="calculate">calculate</span>
</div>
<div>
<h4 className="font-headline font-bold text-on-surface">Mathématiques</h4>
<p className="text-label-xs text-on-surface-variant">15 Décembre 2023</p>
</div>
</div>
<div className="text-right">
<span className="block text-headline-md font-bold text-tertiary">17.5/20</span>
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-container/20 text-tertiary uppercase tracking-wider">Admis</span>
</div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-[18px]" data-icon="trending_up" style={{"fontVariationSettings":"'FILL' 1"}}>trending_up</span>
<span className="text-label-sm text-tertiary-container font-semibold">Excellente progression</span>
</div>
<button className="text-primary font-label text-label-sm font-bold flex items-center gap-1 group-hover:underline">
                        Voir les points à travailler
                        <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all group">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-fixed" data-icon="science">science</span>
</div>
<div>
<h4 className="font-headline font-bold text-on-surface">Sciences Physiques</h4>
<p className="text-label-xs text-on-surface-variant">12 Décembre 2023</p>
</div>
</div>
<div className="text-right">
<span className="block text-headline-md font-bold text-on-surface-variant">09/20</span>
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-on-error-container uppercase tracking-wider">À renforcer</span>
</div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-[18px]" data-icon="error" style={{"fontVariationSettings":"'FILL' 1"}}>error</span>
<span className="text-label-sm text-error font-semibold">Focus : Optique &amp; Lentilles</span>
</div>
<button className="text-primary font-label text-label-sm font-bold flex items-center gap-1 group-hover:underline">
                        Voir les points à travailler
                        <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm hover:border-primary/30 transition-all group">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary-fixed" data-icon="history_edu">history_edu</span>
</div>
<div>
<h4 className="font-headline font-bold text-on-surface">Français - Dissertation</h4>
<p className="text-label-xs text-on-surface-variant">08 Décembre 2023</p>
</div>
</div>
<div className="text-right">
<span className="block text-headline-md font-bold text-tertiary">14/20</span>
<span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-tertiary-container/20 text-tertiary uppercase tracking-wider">Admis</span>
</div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant/50">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary-container text-[18px]" data-icon="tips_and_updates" style={{"fontVariationSettings":"'FILL' 1"}}>tips_and_updates</span>
<span className="text-label-sm text-secondary font-semibold">Conseil AI : Relire l'intro</span>
</div>
<button className="text-primary font-label text-label-sm font-bold flex items-center gap-1 group-hover:underline">
                        Voir les points à travailler
                        <span className="material-symbols-outlined text-[16px]" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</div>
</section>

<section className="mt-8 mb-6">
<div className="relative bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl p-6 overflow-hidden">
<div className="absolute right-[-20px] top-[-20px] opacity-10">
<span className="material-symbols-outlined text-[120px]" data-icon="smart_toy">smart_toy</span>
</div>
<div className="relative z-10">
<h3 className="font-headline font-bold text-headline-md mb-2 flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                        Recommandation IA
                    </h3>
<p className="text-body-md opacity-90 mb-4 max-w-md">
                        Basé sur les derniers résultats, nous recommandons une session intensive de 30 mins sur les **équations du second degré** ce weekend.
                    </p>
<button className="bg-secondary-container text-on-secondary-container px-6 py-2 rounded-full font-label text-label-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg">
                        Inscrire l'élève
                    </button>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg flex justify-around items-center h-20 px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-label text-label-xs font-semibold">Tableau de bord</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container dark:bg-secondary-container text-on-primary-container dark:text-on-secondary-container rounded-full px-4 py-1 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="assignment">assignment</span>
<span className="font-label text-label-xs font-semibold">Examens</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-label text-label-xs font-semibold">Assiduité</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Optional micro-interaction for active button states
        document.querySelectorAll('nav button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                document.querySelectorAll('nav button').forEach(b =&gt; &#123;
                    b.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
                    b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                &#125;);
                btn.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
                btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
