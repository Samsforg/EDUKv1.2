import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Gestion de l'Abonnement" };

export default function Page() {
  return (
    <div className="bg-background min-h-screen flex flex-col md:flex-row" >

<aside className="hidden md:flex flex-col h-screen p-stack-md bg-surface-container-lowest border-r border-surface-border w-[280px] fixed left-0 top-0 z-40">
<div className="mb-10">
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
</div>
<div className="flex items-center gap-4 p-4 mb-8 bg-surface-container-low rounded-xl">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold">
                É
            </div>
<div className="overflow-hidden">
<p className="font-title-md text-title-md text-primary truncate">Edukora Étudiant</p>
<p className="font-label-md text-label-md text-secondary">Plan Découverte</p>
</div>
</div>
<nav className="flex-1 space-y-2">
<a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">menu_book</span>
<span className="font-body-md text-body-md">Mes Cours</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-all duration-150 ease-in-out group" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>payments</span>
<span className="font-body-md text-body-md">Abonnement</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out group" href="#">
<span className="material-symbols-outlined group-hover:text-primary">help</span>
<span className="font-body-md text-body-md">Aide</span>
</a>
</nav>
</aside>

<header className="md:hidden flex justify-between items-center px-gutter py-base w-full max-w-full sticky top-0 z-50 bg-surface-bright border-b border-surface-border">
<div className="flex items-center gap-2">
<span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary">notifications</span>
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold">É</div>
</div>
</header>

<main className="flex-1 md:ml-[280px] p-container-padding-mobile md:p-container-padding-desktop pb-24 md:pb-8">

<header className="mb-stack-md flex flex-col md:flex-row md:items-end md:justify-between gap-4">
<div>
<h1 className="font-headline-lg text-headline-lg text-on-background">Gestion de l'abonnement</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Contrôlez vos accès et préférences de facturation.</p>
</div>
<div className="flex gap-stack-sm">
<button className="px-6 py-2 border border-primary text-primary font-bold text-label-md rounded-lg hover:bg-surface-container-low transition-colors">
                    Télécharger l'historique
                </button>
</div>
</header>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-8 bento-card p-stack-md flex flex-col md:flex-row gap-8 relative overflow-hidden">

<div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/30 rounded-bl-full -mr-8 -mt-8 -z-0"></div>
<div className="flex-1 z-10">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container/10 text-primary-container rounded-full mb-4">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">STATUT ACTIF</span>
</div>
<h2 className="font-headline-md text-headline-md text-primary mb-2">Plan Actuel : Premium</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mb-6">
                        Vous bénéficiez d'un accès illimité à tous les cours, aux certifications exclusives et au support prioritaire 24/7.
                    </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="p-4 bg-surface-container-low rounded-xl">
<p className="font-label-md text-label-md text-secondary mb-1">Prochaine facturation</p>
<p className="font-title-md text-title-md text-on-background">15 Nov 2023</p>
</div>
<div className="p-4 bg-surface-container-low rounded-xl"><p className="font-label-md text-label-md text-secondary mb-2">Modes de paiement</p><div className="space-y-2"><div className="flex items-center justify-between p-2 bg-surface-container-lowest rounded-lg border border-primary"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-validation-amber">account_balance_wallet</span><p className="font-body-md text-body-md font-bold text-on-background">Orange Money</p></div><span className="material-symbols-outlined text-primary text-[18px]">check_circle</span></div><div className="flex items-center justify-between p-2 hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary">payments</span><p className="font-body-md text-body-md text-secondary">Wave</p></div></div><div className="flex items-center justify-between p-2 hover:bg-surface-container-high rounded-lg cursor-pointer transition-colors"><div className="flex items-center gap-2"><span className="material-symbols-outlined text-secondary">account_balance</span><p className="font-body-md text-body-md text-secondary">MTN MoMo</p></div></div></div></div>
</div>
</div>
<div className="md:w-64 flex flex-col justify-center gap-4 z-10">
<button className="w-full py-3 bg-primary-container text-white font-bold text-label-md rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Changer de plan
                    </button>
<button className="w-full py-3 border border-error text-error font-bold text-label-md rounded-xl hover:bg-error-container/20 transition-all">
                        Résilier l'abonnement
                    </button>
</div>
</div>

<div className="md:col-span-4 bento-card p-stack-md flex flex-col justify-between">
<div>
<h3 className="font-title-md text-title-md text-on-background mb-4">Utilisation du plan</h3>
<div className="space-y-6">
<div>
<div className="flex justify-between items-end mb-2">
<span className="font-label-md text-label-md text-secondary uppercase">Cours Complétés</span>
<span className="font-metric-num text-metric-num text-primary">12/15</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full w-[80%] rounded-full"></div>
</div>
</div>
<div>
<div className="flex justify-between items-end mb-2">
<span className="font-label-md text-label-md text-secondary uppercase">Certifications</span>
<span className="font-metric-num text-metric-num text-impact-emerald">04</span>
</div>
<div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-impact-emerald h-full w-[100%] rounded-full"></div>
</div>
</div>
</div>
</div>
<div className="mt-6 pt-6 border-t border-surface-border">
<p className="font-body-md text-body-md text-on-surface-variant italic">
                        "Votre abonnement Premium vous a permis d'économiser 45€ ce mois-ci par rapport au tarif à l'unité."
                    </p>
</div>
</div>

<div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
<div className="bento-card p-6 border-l-4 border-l-expert-purple">
<span className="material-symbols-outlined text-expert-purple mb-4 text-[32px]">school</span>
<h4 className="font-title-md text-title-md mb-2">Accès Illimité</h4>
<p className="font-body-md text-body-md text-secondary">Plus de 500 formations disponibles sans aucune restriction.</p>
</div>
<div className="bento-card p-6 border-l-4 border-l-impact-emerald">
<span className="material-symbols-outlined text-impact-emerald mb-4 text-[32px]">verified</span>
<h4 className="font-title-md text-title-md mb-2">Certifications</h4>
<p className="font-body-md text-body-md text-secondary">Diplômes reconnus par les leaders du secteur technologique.</p>
</div>
<div className="bento-card p-6 border-l-4 border-l-primary">
<span className="material-symbols-outlined text-primary mb-4 text-[32px]">psychology</span>
<h4 className="font-title-md text-title-md mb-2">Mentor IA</h4>
<p className="font-body-md text-body-md text-secondary">Accompagnement personnalisé par notre intelligence pédagogique.</p>
</div>
<div className="bento-card p-6 border-l-4 border-l-validation-amber">
<span className="material-symbols-outlined text-validation-amber mb-4 text-[32px]">download</span>
<h4 className="font-title-md text-title-md mb-2">Mode Hors-ligne</h4>
<p className="font-body-md text-body-md text-secondary">Téléchargez vos leçons pour étudier partout, même sans connexion.</p>
</div>
</div>

<div className="md:col-span-12 bento-card">
<div className="p-stack-md border-b border-surface-border flex justify-between items-center">
<h3 className="font-headline-md text-headline-md text-on-background">Historique des transactions</h3>
<div className="flex items-center gap-2 text-primary font-bold text-label-md cursor-pointer hover:underline">
<span className="">Tout voir</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low">
<th className="px-6 py-4 font-label-md text-label-md text-secondary">DATE</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary">DESCRIPTION</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary">MONTANT</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary">STATUT</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary">ACTION</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-border">
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4 font-body-md text-body-md">15 Oct 2023</td>
<td className="px-6 py-4 font-title-md text-title-md">Abonnement Premium - Mensuel</td>
<td className="px-6 py-4 font-body-lg text-body-lg font-bold">9.900 FCFA</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-impact-emerald/10 text-impact-emerald text-[10px] font-bold rounded-full">PAYÉ</span>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-primary transition-all">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
<span className="font-label-md text-label-md">Facture</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4 font-body-md text-body-md">15 Sep 2023</td>
<td className="px-6 py-4 font-title-md text-title-md">Abonnement Premium - Mensuel</td>
<td className="px-6 py-4 font-body-lg text-body-lg font-bold">9.900 FCFA</td>
<td className="px-6 py-4">
<span className="px-2 py-1 bg-impact-emerald/10 text-impact-emerald text-[10px] font-bold rounded-full">PAYÉ</span>
</td>
<td className="px-6 py-4">
<button className="opacity-0 group-hover:opacity-100 flex items-center gap-1 text-primary transition-all">
<span className="material-symbols-outlined text-[18px]">receipt_long</span>
<span className="font-label-md text-label-md">Facture</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="md:col-span-12 rounded-xl overflow-hidden relative h-48 group">
<div className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-105" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDuY-iNz6GAWfbiXciRWm3nDOnLBkppeMbzB6Yy88FHGnPaz0vw91VCYxB6LBpOyX-5Hh64OSe9xK80J_W7-oB9-lm7JGVy5XjGOeHihR_YCEz-AYwKJYdgcX3hhRV8dGOmRvSKy_2af9Uo74dhj8N7b_Y1llcI-usknZsM1m_LUt-Hly9xP7TwSMU6m-_FlnFykunq-wBlp0wzdgHoeph7pEqI9e0FiZYuZVTC_xgdZf7DMv3Qai43')"}}>
</div>
<div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent z-10 opacity-80"></div>
<div className="relative z-20 h-full flex flex-col justify-center px-10 text-white">
<h2 className="font-headline-md text-headline-md mb-2">Prêt pour le niveau supérieur ?</h2>
<p className="font-body-lg text-body-lg opacity-90 max-w-lg">Passez au plan annuel et économisez 2 mois d'abonnement sur votre formation.</p>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-secondary" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for buttons
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', function() &#123;
                this.style.transform = 'scale(0.98)';
            &#125;);
            button.addEventListener('mouseup', function() &#123;
                this.style.transform = 'scale(1)';
            &#125;);
            button.addEventListener('mouseleave', function() &#123;
                this.style.transform = 'scale(1)';
            &#125;);
        &#125;);

        // Simple notification toggle simulation
        const bell = document.querySelector('.material-symbols-outlined[data-icon="notifications"]');
        if(bell) &#123;
            bell.addEventListener('click', () =&gt; &#123;
                alert('Notifications: Vous n\'avez pas de nouveaux messages.');
            &#125;);
        &#125;
    </script>



    </div>
  );
}
