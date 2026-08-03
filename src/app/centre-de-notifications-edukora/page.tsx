import type { Metadata } from "next";

export const metadata: Metadata = { title: "Centre de Notifications - Edukora BAC" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center px-4 md:px-8 h-16 w-full z-50 bg-surface dark:bg-surface-container-high border-b border-outline-variant dark:border-outline fixed top-0 left-0">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-100">menu</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-container">EduKora BAC</h1>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full">search</button>
<div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-048.png" alt="A professional studio portrait of a West African university professor with a warm, encouraging smile. He is wearing a sharp charcoal blazer over a crisp light blue shirt. The background is a blurred high-end academic library with soft, warm golden hour lighting, conveying expertise, trust, and pedagogical authority in a clean, modern aesthetic." />
</div>
</div>
</header>

<aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-72 z-[60] bg-surface dark:bg-surface-dim shadow-lg border-r border-outline-variant">
<div className="p-8 flex flex-col gap-2">
<div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center text-on-primary mb-2 overflow-hidden shadow-sm">
<img className="w-full h-full object-cover" src="/images/ecran-049.png" alt="A close-up headshot of a focused student, a young woman with a determined expression, wearing modern glasses and a simple navy sweater. The environment is a brightly lit, minimalist study space with organized books in the background. The lighting is natural and high-key, reflecting a clean and professional academic atmosphere." />
</div>
<h2 className="font-title-md text-title-md text-primary">Candidat BAC 2024</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Série C - Côte d'Ivoire</p>
</div>
<nav className="flex-1 px-4 space-y-1">
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-r-full" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-r-full" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-body-md text-body-md">Mes Examens</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 bg-primary-container text-on-primary-container rounded-r-full font-bold" href="#">
<span className="material-symbols-outlined">notifications</span>
<span className="font-body-md text-body-md">Notifications</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-r-full" href="#">
<span className="material-symbols-outlined">leaderboard</span>
<span className="font-body-md text-body-md">Statistiques</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-r-full" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body-md text-body-md">Ressources</span>
</a>
</nav>
<div className="p-4 border-t border-outline-variant">
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-r-full" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
</div>
</aside>

<main className="main-canvas pt-20 pb-24 md:pb-8 px-4 md:px-8 max-w-5xl mx-auto">

<div className="mb-8 flex justify-between items-end">
<div>
<h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-1">Centre de Notifications</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Restez informé de vos progrès et de la communauté.</p>
</div>
<button className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline">
<span className="material-symbols-outlined text-[20px]">done_all</span>
<span className="font-label-md text-label-md">Tout marquer comme lu</span>
</button>
</div>

<div className="space-y-4">

<div className="flex items-center gap-4 mb-4">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Aujourd'hui</span>
<div className="h-[1px] flex-1 bg-outline-variant"></div>
</div>

<div className="notification-card bg-white border border-surface-border rounded-xl p-4 md:p-6 flex gap-4 md:gap-6 items-start relative overflow-hidden group hover:bg-surface-container-low cursor-pointer">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-validation-amber"></div>
<div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFFBEB] flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-validation-amber text-[32px]">verified</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-md text-title-md text-on-surface font-bold">Certification validée</h3>
<span className="font-label-md text-label-md text-outline">14:30</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-3 leading-relaxed">
                        Votre fiche de révision sur les <span className="font-bold text-primary">Suites Numériques</span> a été officiellement certifiée par le <span className="font-bold text-expert-purple">Dr. Thorne</span>. Elle est désormais visible par toute la communauté.
                    </p>
<div className="flex items-center gap-3">
<span className="px-3 py-1 rounded-full bg-expert-purple/10 text-expert-purple font-label-md text-label-md flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span> Expert-Approved
                        </span>
<button className="text-primary font-bold font-label-md text-label-md hover:underline">Voir la fiche</button>
</div>
</div>
<div className="opacity-0 group-hover:opacity-100 transition-opacity">
<button className="material-symbols-outlined text-outline hover:text-primary">more_vert</button>
</div>
</div>

<div className="notification-card bg-white border border-surface-border rounded-xl p-4 md:p-6 flex gap-4 md:gap-6 items-start group hover:bg-surface-container-low cursor-pointer">
<div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-primary text-[32px]">forum</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-md text-title-md text-on-surface font-bold">Nouveau commentaire</h3>
<span className="font-label-md text-label-md text-outline">10:15</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-3 leading-relaxed">
<span className="font-bold text-on-surface">Amara K.</span> a commenté votre fiche de <span className="text-primary font-bold italic">Maths - Logarithmes</span> : "Merci pour l'astuce sur le changement de base, c'est super clair !"
                    </p>
<div className="flex items-center gap-4">
<button className="bg-primary text-white px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm">Répondre</button>
<button className="text-on-surface-variant font-bold font-label-md text-label-md hover:text-primary">Ignorer</button>
</div>
</div>
<div className="opacity-0 group-hover:opacity-100 transition-opacity">
<button className="material-symbols-outlined text-outline hover:text-primary">more_vert</button>
</div>
</div>

<div className="flex items-center gap-4 mt-8 mb-4">
<span className="font-label-md text-label-md text-outline uppercase tracking-wider">Hier</span>
<div className="h-[1px] flex-1 bg-outline-variant"></div>
</div>

<div className="notification-card bg-white border border-surface-border rounded-xl p-4 md:p-6 flex gap-4 md:gap-6 items-start group hover:bg-surface-container-low cursor-pointer">
<div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#ECFDF5] flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-impact-emerald text-[32px]">emoji_events</span>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h3 className="font-title-md text-title-md text-on-surface font-bold">Rappel de Défi</h3>
<span className="font-label-md text-label-md text-outline">Hier, 18:00</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-3 leading-relaxed">
                        Le <span className="font-bold text-impact-emerald">Grand Défi Inter-Commune</span> commence dans 12 heures ! Préparez votre arsenal de connaissances pour hisser votre commune au sommet du classement.
                    </p>
<div className="bg-surface-container-low rounded-lg p-3 border border-outline-variant/30 flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">timer</span>
<span className="font-label-md text-label-md text-on-surface">Début : Demain, 06:00 AM</span>
</div>
<span className="font-label-md text-label-md text-primary font-bold">Inscrit</span>
</div>
</div>
<div className="opacity-0 group-hover:opacity-100 transition-opacity">
<button className="material-symbols-outlined text-outline hover:text-primary">more_vert</button>
</div>
</div>
</div>

<div className="hidden md:flex justify-center mt-12">
<button className="px-8 py-3 border border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors">Charger les notifications plus anciennes</button>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-surface-container-highest shadow-[0_-2px_8px_rgba(0,0,0,0.05)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-[10px] mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">library_books</span>
<span className="font-label-xs text-[10px] mt-1">Sujets</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>notifications</span>
<span className="font-label-xs text-[10px] mt-1">Alertes</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-[10px] mt-1">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for marking as read
        document.querySelectorAll('.notification-card').forEach(card =&gt; &#123;
            card.addEventListener('click', function() &#123;
                this.classList.remove('bg-white');
                this.classList.add('bg-surface-container-low', 'opacity-80');
                const amberBar = this.querySelector('.bg-validation-amber');
                if(amberBar) amberBar.style.display = 'none';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
