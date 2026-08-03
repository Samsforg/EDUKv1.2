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
<div className="flex items-center gap-2 mb-2 cursor-pointer text-primary hover:underline group">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
<span className="font-label-md text-label-md">Retour à la gestion de l'abonnement</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-background">Mes Factures</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">Consultez et téléchargez l'historique complet de vos paiements.</p>
</div>
</header>

<div className="grid grid-cols-1 gap-gutter">
<div className="bento-card overflow-hidden">
<div className="overflow-x-auto">
<table className="w-full text-left">
<thead>
<tr className="bg-surface-container-low">
<th className="px-6 py-4 font-label-md text-label-md text-secondary">DATE</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary">NUMÉRO DE FACTURE</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary">MONTANT</th>
<th className="px-6 py-4 font-label-md text-label-md text-secondary text-right">ACTION</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-border">
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4 font-body-md text-body-md">15 Oct 2023</td>
<td className="px-6 py-4 font-title-md text-title-md">INV-2023-002</td>
<td className="px-6 py-4 font-body-lg text-body-lg font-bold">9.900 FCFA</td>
<td className="px-6 py-4 text-right">
<button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container/10 text-primary font-bold text-label-md rounded-lg hover:bg-primary-container/20 transition-colors">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>Télécharger</span>
</button>
</td>
</tr>
<tr className="hover:bg-surface-container-lowest transition-colors group">
<td className="px-6 py-4 font-body-md text-body-md">15 Sep 2023</td>
<td className="px-6 py-4 font-title-md text-title-md">INV-2023-001</td>
<td className="px-6 py-4 font-body-lg text-body-lg font-bold">9.900 FCFA</td>
<td className="px-6 py-4 text-right">
<button className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container/10 text-primary font-bold text-label-md rounded-lg hover:bg-primary-container/20 transition-colors">
<span className="material-symbols-outlined text-[18px]">download</span>
<span>Télécharger</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="bento-card p-6 flex items-center gap-6 bg-surface-container-low border-none">
<div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[28px]">help_outline</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-background">Besoin d'aide avec une facture ?</h4>
<p className="font-body-md text-body-md text-secondary">Contactez notre support pour toute question relative à votre facturation ou pour demander un remboursement.</p>
</div>
<button className="ml-auto px-6 py-2 border border-primary text-primary font-bold text-label-md rounded-lg hover:bg-surface-container-lowest transition-colors">
      Contacter le support
    </button>
</div>
</div></main>

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
