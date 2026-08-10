import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Programme de Parrainage" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-bright dark:bg-on-background border-b border-surface-border dark:border-outline-variant w-full top-0 sticky z-50">
<div className="flex justify-between items-center px-gutter py-base w-full max-w-full">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">
                    ÉP
                </div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora</h1>
</div>
<div className="text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">notifications</span>
</div>
</div>
</header>
<div className="flex min-h-screen">

<aside className="hidden md:flex flex-col h-screen p-stack-md bg-surface-container-lowest dark:bg-on-background border-r border-surface-border dark:border-outline-variant w-[280px] fixed left-0 top-0 pt-24">
<div className="flex flex-col gap-2">
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-all duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-all duration-150" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body-md text-body-md">Mes Cours</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-primary dark:text-primary-fixed font-bold border-r-4 border-primary bg-surface-container-low transition-all duration-150" href="#">
<span className="material-symbols-outlined">stars</span>
<span className="font-body-md text-body-md">Abonnement</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-all duration-150" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-all duration-150" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body-md text-body-md">Aide</span>
</a>
</nav>
</div>
</aside>

<main className="flex-1 md:ml-[280px] p-container-padding-mobile md:p-container-padding-desktop pb-24 md:pb-8">

<section className="mb-12 max-w-5xl mx-auto">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<span className="text-expert-purple font-label-md text-label-md uppercase tracking-wider mb-2 block">Programme Ambassadeur</span>
<h2 className="font-headline-lg text-headline-lg text-primary mb-2">Partagez l'excellence académique</h2>
<p className="font-body-lg text-body-lg text-outline max-w-2xl">Invitez vos collègues et étudiants à rejoindre Edukora. Chaque parrainage réussi débloque des avantages premium exclusifs pour booster votre productivité.</p>
</div>
<button className="bg-primary-container text-on-primary px-8 py-3 rounded-lg font-bold text-body-lg shadow-sm hover:opacity-90 transition-opacity">
                        Inviter des amis
                    </button>
</div>
</section>

<section className="mb-12 max-w-5xl mx-auto">
<div className="bg-surface-container-lowest border border-surface-border p-8 rounded-xl shadow-sm overflow-hidden relative">
<h3 className="font-title-md text-title-md mb-8 text-primary">Votre progression</h3>
<div className="relative pt-12 pb-8">

<div className="absolute top-[60px] left-8 right-8 h-1 bg-surface-container-high rounded-full">
<div className="h-full progression-line rounded-full" style={{"width":"45%"}}></div>
</div>

<div className="relative z-10 flex justify-between">

<div className="flex flex-col items-center text-center group">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 step-active transition-transform group-hover:scale-110">
<span className="material-symbols-outlined">person</span>
</div>
<span className="font-label-md text-label-md text-primary">1 AMI</span>
<span className="font-body-md text-body-md font-bold mt-1">15 Jours Premium</span>
</div>

<div className="flex flex-col items-center text-center group">
<div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center mb-4 step-active transition-transform group-hover:scale-110">
<span className="material-symbols-outlined">group</span>
</div>
<span className="font-label-md text-label-md text-primary">5 AMIS</span>
<span className="font-body-md text-body-md font-bold mt-1">3 Mois Premium</span>
</div>

<div className="flex flex-col items-center text-center group">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-outline flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
<span className="material-symbols-outlined">workspace_premium</span>
</div>
<span className="font-label-md text-label-md text-outline">10 AMIS</span>
<span className="font-body-md text-body-md font-bold mt-1 text-outline">1 An + Badge Ambassadeur</span>
</div>
</div>
</div>

<div className="mt-8 flex items-center gap-4 bg-surface-container-low p-4 rounded-lg">
<span className="material-symbols-outlined text-validation-amber">info</span>
<p className="font-body-md text-body-md text-on-surface-variant">Vous avez actuellement <strong>4 amis</strong> inscrits. Plus qu'une invitation pour débloquer le palier <strong>3 Mois Premium</strong> !</p>
</div>
</div>
</section>

<section className="max-w-5xl mx-auto">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-xl flex flex-col gap-4 group hover:border-primary transition-colors">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[32px]">psychology</span>
</div>
<h4 className="font-title-md text-title-md text-primary">tuteur IAat Illimité</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Bénéficiez d'une assistance pédagogique 24/7 par notre IA avancée. Pas de limites de requêtes quotidiennes.</p>
<div className="mt-auto flex items-center gap-2 text-expert-purple font-label-md text-label-md">
<span>DÉBLOQUÉ</span>
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-xl flex flex-col gap-4 group hover:border-primary transition-colors">
<div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[32px]">verified_user</span>
</div>
<h4 className="font-title-md text-title-md text-primary">Fiches Certifiées</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Accès exclusif à la bibliothèque de ressources validées par notre comité d'experts académiques.</p>
<div className="mt-auto flex items-center gap-2 text-expert-purple font-label-md text-label-md">
<span>DÉBLOQUÉ</span>
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-xl flex flex-col gap-4 group hover:border-primary transition-colors opacity-75">
<div className="w-12 h-12 bg-surface-container-low rounded-lg flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-[32px]">block</span>
</div>
<h4 className="font-title-md text-title-md text-outline">Expérience sans Pub</h4>
<p className="font-body-md text-body-md text-outline">Naviguez sur toute la plateforme sans aucune interruption publicitaire pour une concentration totale.</p>
<div className="mt-auto flex items-center gap-2 text-outline font-label-md text-label-md">
<span className="material-symbols-outlined text-sm">lock</span>
<span>PALIER 10 AMIS</span>
</div>
</div>
</div>
</section>

<section className="mt-12 max-w-5xl mx-auto">
<div className="rounded-2xl overflow-hidden relative h-64 bg-primary flex items-center justify-center p-8">
<div className="absolute inset-0 opacity-20">

</div>
<div className="relative z-10 text-center text-on-primary">
<h3 className="font-headline-md text-headline-md mb-4">Rejoignez le Cercle des Experts</h3>
<p className="font-body-lg text-body-lg mb-6 opacity-90">Les ambassadeurs Edukora influencent le futur de l'éducation numérique.</p>
<button className="bg-surface-container-lowest text-primary px-8 py-3 rounded-lg font-bold text-body-lg hover:bg-surface-container-low transition-colors">
                            Partager mon lien unique
                        </button>
</div>
</div>
</section>
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for reward milestones
        document.querySelectorAll('.group').forEach(item =&gt; &#123;
            item.addEventListener('mouseenter', () =&gt; &#123;
                const icon = item.querySelector('.material-symbols-outlined');
                if(icon) &#123;
                    icon.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
