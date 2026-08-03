import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Gestion des Tarifs" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24 lg:pb-0 lg:pl-64" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low dark:bg-surface-container-lowest hidden lg:flex flex-col border-r border-outline-variant z-50">
<div className="p-6 flex flex-col items-start gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white">
<span className="material-symbols-outlined">school</span>
</div>
<span className="font-headline font-bold text-primary text-xl">Administration</span>
</div>
<div className="flex items-center gap-3 mt-4 px-2">
<img className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="/images/ecran-169.png" alt="A professional headshot of a West African administrator in a modern office, soft high-key lighting, focused look, corporate portrait style, academic blue accents." />
<div>
<p className="font-bold text-sm text-on-surface">Portail Edukora</p>
<p className="text-xs text-on-surface-variant">Profil admin</p>
</div>
</div>
</div>
<nav className="flex-1 mt-4 px-2">
<div className="text-on-surface-variant dark:text-outline-variant mx-2 my-1 px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-all duration-200 cursor-pointer">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-label-sm">Tableau de bord</span>
</div>

<div className="bg-primary-container text-on-primary-container rounded-full mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-200 cursor-pointer">
<span className="material-symbols-outlined">payments</span>
<span className="font-body text-label-sm font-bold">Tarification</span>
</div>
<div className="text-on-surface-variant dark:text-outline-variant mx-2 my-1 px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-all duration-200 cursor-pointer">
<span className="material-symbols-outlined">receipt_long</span>
<span className="font-body text-label-sm">Transactions</span>
</div>
<div className="text-on-surface-variant dark:text-outline-variant mx-2 my-1 px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-all duration-200 cursor-pointer">
<span className="material-symbols-outlined">group</span>
<span className="font-body text-label-sm">Utilisateurs</span>
</div>
<div className="text-on-surface-variant dark:text-outline-variant mx-2 my-1 px-4 py-3 flex items-center gap-3 hover:bg-surface-container-highest dark:hover:bg-surface-variant rounded-full transition-all duration-200 cursor-pointer">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-label-sm">Paramètres</span>
</div>
</nav>
</aside>

<header className="fixed top-0 w-full z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 md:px-8 h-16">
<div className="flex items-center gap-3">
<button className="lg:hidden p-2 text-primary">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Gestion des Tarifs</h1>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-outline cursor-pointer hover:text-primary transition-colors">notifications</span>
<div className="w-8 h-8 rounded-full bg-surface-container-highest border border-outline-variant overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-170.png" alt="Close up of a modern digital user avatar icon, simple and clean flat illustration, primary blue background." />
</div>
</div>
</header>

<main className="pt-24 px-4 md:px-8 max-w-7xl mx-auto space-y-8 pb-32">

<section className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary rounded-xl p-6 text-white overflow-hidden relative">
<div className="z-10 relative">
<h2 className="text-2xl font-bold font-headline mb-2">Ajustement Stratégique des Prix</h2>
<p className="text-on-primary-container max-w-xl">Modifiez les tarifs des abonnements et les commissions experts pour l'ensemble de la plateforme Edukora.</p>
</div>
<div className="absolute right-0 top-0 h-full w-1/3 opacity-20 hidden md:block">

</div>
</section>

<div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

<section className="xl:col-span-8 space-y-6">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary">workspace_premium</span>
<h3 className="font-headline text-xl font-bold text-on-surface">Abonnements Élèves</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-6">
<div className="p-3 bg-primary-fixed rounded-lg text-primary">
<span className="material-symbols-outlined">calendar_month</span>
</div>
<span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container text-xs font-bold rounded-full">POPULAIRE</span>
</div>
<h4 className="font-bold text-lg mb-1">Pass Mensuel</h4>
<p className="text-sm text-outline mb-4">Accès illimité à tous les cours BEPC/BAC pendant 30 jours.</p>
<div className="flex items-baseline gap-2 mb-6">
<span className="text-3xl font-extrabold text-primary">5,000</span>
<span className="text-sm font-bold text-outline">FCFA / mois</span>
</div>
<div className="space-y-4">
<div className="relative">
<label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-primary uppercase tracking-wider">Nouveau Montant</label>
<input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="Entrez le prix" type="number" />
</div>
<button className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-on-primary-fixed-variant active:scale-95 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">update</span>
                                Mettre à jour
                            </button>
</div>
</div>

<div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-primary/10">
<div className="flex justify-between items-start mb-6">
<div className="p-3 bg-secondary-fixed rounded-lg text-secondary">
<span className="material-symbols-outlined">event_available</span>
</div>
<span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">MEILLEURE VALEUR</span>
</div>
<h4 className="font-bold text-lg mb-1">Pass Annuel</h4>
<p className="text-sm text-outline mb-4">Préparation complète pour l'année scolaire avec bonus exclusifs.</p>
<div className="flex items-baseline gap-2 mb-6">
<span className="text-3xl font-extrabold text-primary">45,000</span>
<span className="text-sm font-bold text-outline">FCFA / an</span>
</div>
<div className="space-y-4">
<div className="relative">
<label className="absolute -top-2 left-3 bg-white px-1 text-[10px] font-bold text-primary uppercase tracking-wider">Nouveau Montant</label>
<input className="w-full border-outline-variant rounded-lg focus:ring-primary focus:border-primary px-4 py-3 text-sm" placeholder="Entrez le prix" type="number" />
</div>
<button className="w-full py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-on-primary-fixed-variant active:scale-95 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-sm">update</span>
                                Mettre à jour
                            </button>
</div>
</div>
</div>

<div className="mt-12">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-tertiary">engineering</span>
<h3 className="font-headline text-xl font-bold text-on-surface">Frais de Formation Experts</h3>
</div>
<div className="bg-surface-container rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
<div>
<h4 className="font-bold text-on-surface mb-2">Commission Plateforme (%)</h4>
<p className="text-xs text-on-surface-variant mb-4">Pourcentage prélevé sur chaque session vendue par un professeur.</p>
<div className="flex items-center gap-4">
<input className="flex-1 accent-primary" max={30} min={5} type="range" value="15" />
<span className="text-lg font-bold text-primary w-12 text-center">15%</span>
</div>
</div>
<div>
<h4 className="font-bold text-on-surface mb-2">Frais Fixes / Certification</h4>
<p className="text-xs text-on-surface-variant mb-4">Frais administratifs pour la délivrance d'un certificat Edukora.</p>
<div className="relative flex items-center">
<input className="w-full border-outline-variant rounded-lg pr-16 font-bold" type="number" value="2500" />
<span className="absolute right-4 text-xs font-bold text-outline">FCFA</span>
</div>
</div>
</div>
</div>
</section>

<section className="xl:col-span-4 space-y-6">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">history</span>
<h3 className="font-headline text-xl font-bold text-on-surface">Historique des changements</h3>
</div>
<div className="bg-white rounded-xl border border-outline-variant p-2 flex flex-col gap-2 max-h-[600px] overflow-y-auto no-scrollbar">

<div className="p-4 bg-surface-container-low rounded-lg border-l-4 border-primary">
<div className="flex justify-between items-start mb-2">
<span className="text-[10px] font-bold text-outline">AUJOURD'HUI, 14:32</span>
<span className="material-symbols-outlined text-sm text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<p className="text-sm font-semibold text-on-surface mb-1">Pass Mensuel: 4,500 → 5,000 FCFA</p>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded-full bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-primary">AD</div>
<span className="text-xs text-on-surface-variant">Admin: Koffi Alain</span>
</div>
</div>
<div className="p-4 bg-surface rounded-lg border-l-4 border-outline-variant">
<div className="flex justify-between items-start mb-2">
<span className="text-[10px] font-bold text-outline">12 OCT 2023</span>
</div>
<p className="text-sm font-semibold text-on-surface mb-1">Commission: 20% → 15%</p>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded-full bg-secondary-fixed flex items-center justify-center text-[10px] font-bold text-secondary">SD</div>
<span className="text-xs text-on-surface-variant">Admin: Sarah Diabaté</span>
</div>
</div>
<div className="p-4 bg-surface rounded-lg border-l-4 border-outline-variant">
<div className="flex justify-between items-start mb-2">
<span className="text-[10px] font-bold text-outline">05 SEP 2023</span>
</div>
<p className="text-sm font-semibold text-on-surface mb-1">Pass Annuel: 50,000 → 45,000 FCFA</p>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded-full bg-primary-fixed flex items-center justify-center text-[10px] font-bold text-primary">AD</div>
<span className="text-xs text-on-surface-variant">Admin: Koffi Alain</span>
</div>
</div>
<div className="p-4 bg-surface rounded-lg border-l-4 border-outline-variant">
<div className="flex justify-between items-start mb-2">
<span className="text-[10px] font-bold text-outline">15 AOÛT 2023</span>
</div>
<p className="text-sm font-semibold text-on-surface mb-1">Frais Certification: 2,000 → 2,500 FCFA</p>
<div className="flex items-center gap-2">
<div className="w-5 h-5 rounded-full bg-tertiary-fixed flex items-center justify-center text-[10px] font-bold text-tertiary">BK</div>
<span className="text-xs text-on-surface-variant">Admin: Bakary Kone</span>
</div>
</div>
<button className="w-full py-2 text-xs font-bold text-primary hover:bg-primary-fixed rounded-lg transition-colors">Voir tout l'historique</button>
</div>

<div className="bg-secondary-container/10 p-4 rounded-xl border border-secondary/20 flex gap-4">
<span className="material-symbols-outlined text-secondary">security</span>
<div>
<h4 className="text-sm font-bold text-on-secondary-container">Conseil de sécurité</h4>
<p className="text-xs text-on-secondary-container opacity-80">Tous les changements de prix sont enregistrés et audités. Assurez-vous d'avoir l'approbation du conseil d'administration.</p>
</div>
</div>
</section>
</div>
</main>

<footer className="fixed bottom-0 lg:left-64 right-0 bg-white/80 backdrop-blur-md border-t border-outline-variant p-4 z-50 flex items-center justify-between shadow-2xl">
<div className="hidden md:flex items-center gap-4 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span className="text-sm font-medium">3 modifications non enregistrées</span>
</div>
<div className="flex gap-4 w-full md:w-auto">
<button className="flex-1 md:flex-none px-6 py-3 border border-outline text-on-surface font-bold rounded-lg hover:bg-surface transition-colors active:scale-95">
                Annuler
            </button>
<button className="flex-1 md:flex-none px-10 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-on-secondary-container shadow-lg shadow-secondary/30 transition-all active:scale-95 flex items-center justify-center gap-2">
<span className="material-symbols-outlined">save</span>
                Enregistrer toutes les modifications
            </button>
</div>
</footer>

<nav className="fixed bottom-0 w-full z-50 lg:hidden bg-surface dark:bg-surface-dim border-t border-outline-variant dark:border-outline bg-surface/90 backdrop-blur-md shadow-lg flex justify-around items-center h-16 px-4">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed-dim font-bold">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>euro_symbol</span>
<span className="font-label text-label-xs">Tarifs</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs">Rapports</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for range input
        const range = document.querySelector('input[type="range"]');
        const rangeVal = range.nextElementSibling;
        range.addEventListener('input', (e) =&gt; &#123;
            rangeVal.textContent = e.target.value + '%';
        &#125;);

        // Simple notification toggle simulation
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                if(this.innerText.includes('Enregistrer')) &#123;
                    const originalText = this.innerHTML;
                    this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Enregistrement...';
                    setTimeout(() =&gt; &#123;
                        this.innerHTML = '&lt;span class="material-symbols-outlined"&gt;done_all&lt;/span&gt; Enregistré !';
                        this.classList.replace('bg-secondary', 'bg-tertiary');
                        setTimeout(() =&gt; &#123;
                            this.innerHTML = originalText;
                            this.classList.replace('bg-tertiary', 'bg-secondary');
                        &#125;, 2000);
                    &#125;, 1000);
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
