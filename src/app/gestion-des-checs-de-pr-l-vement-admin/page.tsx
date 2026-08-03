import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Échecs de Prélèvement" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-20 lg:pb-0 lg:pl-64 pt-16" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 lg:px-8 h-16 bg-primary shadow-md">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary">admin_panel_settings</span>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-xl">Échecs de Prélèvement</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6 mr-6">
<span className="text-primary-fixed-dim hover:text-on-primary cursor-pointer transition-colors text-sm font-medium">Tableau de bord</span>
<span className="text-on-primary font-bold border-b-2 border-secondary pb-1 cursor-pointer text-sm">Paiements</span>
</div>
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs border border-on-primary/20">
                AP
            </div>
</div>
</header>

<aside className="hidden lg:flex flex-col fixed left-0 top-16 bottom-0 z-40 h-full w-64 border-r border-outline-variant bg-surface">
<div className="p-6">
<p className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Management</p>
<nav className="space-y-1">
<div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all rounded-r-lg">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-sm">Tableau de bord</span>
</div>
<div className="flex items-center gap-4 px-4 py-3 cursor-pointer bg-secondary-container text-on-secondary-container rounded-r-full font-bold">
<span className="material-symbols-outlined active-icon">payments</span>
<span className="font-label text-sm">Paiements</span>
</div>
<div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all rounded-r-lg">
<span className="material-symbols-outlined">group</span>
<span className="font-label text-sm">Students</span>
</div>
<div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all rounded-r-lg">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-sm">Curriculum</span>
</div>
<div className="flex items-center gap-4 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all rounded-r-lg">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-sm">Paramètres</span>
</div>
</nav>
</div>
<div className="mt-auto p-6 border-t border-outline-variant">
<div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20">
<p className="text-xs font-semibold text-primary mb-1">Support IA</p>
<p className="text-[10px] text-on-surface-variant leading-tight">Besoin d'aide pour analyser les rejets techniques ?</p>
<button className="mt-2 w-full bg-primary text-on-primary py-2 rounded-lg text-xs font-bold hover:bg-primary-container transition-colors">Consulter l'IA</button>
</div>
</div>
</aside>
<main className="p-4 lg:p-8 max-w-7xl mx-auto">

<section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="material-symbols-outlined text-error bg-error-container p-2 rounded-lg">trending_down</span>
<span className="text-[10px] font-bold text-error bg-error-container px-2 py-0.5 rounded-full">+12% vs mois dernier</span>
</div>
<div>
<p className="text-sm font-medium text-on-surface-variant mb-1">Montant Perdu</p>
<p className="text-2xl font-bold font-headline text-on-surface">842,500 <span className="text-xs">FCFA</span></p>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="material-symbols-outlined text-tertiary bg-tertiary-fixed p-2 rounded-lg">account_balance_wallet</span>
<span className="text-[10px] font-bold text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-full">Objectif 75%</span>
</div>
<div>
<p className="text-sm font-medium text-on-surface-variant mb-1">Taux de Recouvrement</p>
<p className="text-2xl font-bold font-headline text-on-surface">64%</p>
<div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
<div className="bg-tertiary h-full rounded-full" style={{"width":"64%"}}></div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg">notifications_active</span>
<span className="flex h-2 w-2 rounded-full bg-error relative"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75"></span></span>
</div>
<div>
<p className="text-sm font-medium text-on-surface-variant mb-1">Alertes critiques</p>
<p className="text-2xl font-bold font-headline text-on-surface">12</p>
<p className="text-[10px] text-error mt-1 font-semibold">Actions requises immédiates</p>
</div>
</div>
</section>

<section className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
<div className="relative w-full md:w-96">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-sm" placeholder="Rechercher un étudiant ou une transaction..." type="text" />
</div>
<div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
<button className="px-4 py-2 bg-primary text-on-primary rounded-full text-xs font-bold whitespace-nowrap shadow-sm">Tous</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-medium whitespace-nowrap hover:bg-outline-variant transition-colors">Solde insuffisant</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-medium whitespace-nowrap hover:bg-outline-variant transition-colors">Carte expirée</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-xs font-medium whitespace-nowrap hover:bg-outline-variant transition-colors">Rejet technique</button>
</div>
</section>

<section className="grid grid-cols-1 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-lg">
                        KM
                    </div>
<div>
<h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">Koffi Moussa</h3>
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>12 Oct 2023, 09:42</span>
</div>
</div>
</div>
<div className="flex flex-col md:items-center">
<p className="text-lg font-bold text-on-surface font-headline">45,000 FCFA</p>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        Solde insuffisant
                    </span>
</div>
<div className="flex gap-2">
<button className="flex-1 md:flex-none px-5 py-2 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm">Relancer</button>
<button className="flex-1 md:flex-none px-5 py-2 border border-outline text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface-container-low transition-all">Détails</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-lg">
                        YD
                    </div>
<div>
<h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">Yao Deborah</h3>
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>11 Oct 2023, 14:15</span>
</div>
</div>
</div>
<div className="flex flex-col md:items-center">
<p className="text-lg font-bold text-on-surface font-headline">32,500 FCFA</p>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-surface-container-highest text-on-surface-variant">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                        Carte expirée
                    </span>
</div>
<div className="flex gap-2">
<button className="flex-1 md:flex-none px-5 py-2 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm">Relancer</button>
<button className="flex-1 md:flex-none px-5 py-2 border border-outline text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface-container-low transition-all">Détails</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-lg">
                        AK
                    </div>
<div>
<h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">Awa Koné</h3>
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>10 Oct 2023, 18:30</span>
</div>
</div>
</div>
<div className="flex flex-col md:items-center">
<p className="text-lg font-bold text-on-surface font-headline">60,000 FCFA</p>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary-container/10 text-primary">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        Rejet technique
                    </span>
</div>
<div className="flex gap-2">
<button className="flex-1 md:flex-none px-5 py-2 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm">Relancer</button>
<button className="flex-1 md:flex-none px-5 py-2 border border-outline text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface-container-low transition-all">Détails</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-lg">
                        TB
                    </div>
<div>
<h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">Traoré Bakary</h3>
<div className="flex items-center gap-2 text-xs text-on-surface-variant">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>10 Oct 2023, 11:20</span>
</div>
</div>
</div>
<div className="flex flex-col md:items-center">
<p className="text-lg font-bold text-on-surface font-headline">12,500 FCFA</p>
<span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-error-container text-on-error-container">
<span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                        Solde insuffisant
                    </span>
</div>
<div className="flex gap-2">
<button className="flex-1 md:flex-none px-5 py-2 bg-secondary text-on-secondary text-xs font-bold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm">Relancer</button>
<button className="flex-1 md:flex-none px-5 py-2 border border-outline text-on-surface-variant text-xs font-bold rounded-lg hover:bg-surface-container-low transition-all">Détails</button>
</div>
</div>
</section>

<div className="hidden md:flex justify-between items-center mt-8 text-sm">
<p className="text-on-surface-variant">Affichage de 1-4 sur 112 échecs</p>
<div className="flex gap-2">
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors disabled:opacity-50" disabled={true}>
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-10 h-10 bg-primary text-on-primary rounded-lg font-bold">1</button>
<button className="w-10 h-10 border border-outline-variant rounded-lg font-bold hover:bg-surface-container-low">2</button>
<button className="w-10 h-10 border border-outline-variant rounded-lg font-bold hover:bg-surface-container-low">3</button>
<button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</div>
</div>
</main>

<nav className="lg:hidden fixed bottom-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface-container-lowest border-t border-outline-variant shadow-lg rounded-t-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant scale-95 transition-transform duration-150 active:bg-surface-container-high cursor-pointer">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs">Overview</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95 transition-transform duration-150 cursor-pointer">
<span className="material-symbols-outlined active-icon">error</span>
<span className="font-label text-label-xs">Échecs</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant scale-95 transition-transform duration-150 active:bg-surface-container-high cursor-pointer">
<span className="material-symbols-outlined">send</span>
<span className="font-label text-label-xs">Actions</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant scale-95 transition-transform duration-150 active:bg-surface-container-high cursor-pointer">
<span className="material-symbols-outlined">assessment</span>
<span className="font-label text-label-xs">Rapports</span>
</div>
</nav>

<button className="fixed bottom-20 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-secondary text-on-secondary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
</button>
<script>
        // Simple Interaction logic for filtering
        const chips = document.querySelectorAll('.flex.gap-2.overflow-x-auto button');
        chips.forEach(chip =&gt; &#123;
            chip.addEventListener('click', () =&gt; &#123;
                chips.forEach(c =&gt; &#123;
                    c.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
                    c.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'font-medium');
                &#125;);
                chip.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'font-medium');
                chip.classList.add('bg-primary', 'text-on-primary', 'shadow-sm', 'font-bold');
            &#125;);
        &#125;);

        // Relancer Interaction
        document.querySelectorAll('button:contains("Relancer")').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin text-sm"&gt;refresh&lt;/span&gt; En cours...';
                this.disabled = true;
                setTimeout(() =&gt; &#123;
                    this.innerHTML = 'Relancé !';
                    this.classList.remove('bg-secondary');
                    this.classList.add('bg-tertiary');
                &#125;, 1500);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
