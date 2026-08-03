import type { Metadata } from "next";

export const metadata: Metadata = { title: "Promo Management - Edukora Admin" };

export default function Page() {
  return (
    <div className="text-on-background" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 z-50 bg-primary dark:bg-surface-container-highest shadow-sm">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary cursor-pointer hover:bg-primary-container p-2 rounded-full transition-colors">menu</span>
<h1 className="font-headline font-bold text-on-primary text-xl">Promo Management</h1>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary hidden md:block">search</span>
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-xs border border-on-primary/20">
                AP
            </div>
</div>
</header>

<aside className="hidden md:flex fixed left-0 top-0 h-screen w-72 flex-col py-6 bg-surface dark:bg-surface-dim border-r border-outline-variant z-40 mt-16">
<div className="px-6 mb-8">
<span className="font-headline font-bold text-primary text-2xl">Edukora Admin</span>
</div>
<nav className="flex-1 space-y-1">
<a className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-4 hover:bg-surface-container-high transition-colors rounded-xl" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="bg-secondary-container text-on-secondary-container rounded-xl font-bold px-4 py-3 mx-2 flex items-center gap-4 active:opacity-80 transition-opacity" href="#">
<span className="material-symbols-outlined fill-icon" style={{"fontVariationSettings":"'FILL' 1"}}>sell</span>
<span className="font-body text-body-md">Promo Codes</span>
</a>
<a className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-4 hover:bg-surface-container-high transition-colors rounded-xl" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body text-body-md">Usage Stats</span>
</a>
<a className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-4 hover:bg-surface-container-high transition-colors rounded-xl" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
<a className="text-on-surface-variant px-4 py-3 mx-2 flex items-center gap-4 hover:bg-surface-container-high transition-colors rounded-xl" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body text-body-md">Assistance</span>
</a>
</nav>
</aside>

<main className="md:ml-72 pt-20 pb-24 px-margin-mobile md:px-margin-desktop min-h-screen">

<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<h2 className="font-display font-bold text-2xl text-primary">Gestion des Codes Promo</h2>
<p className="text-on-surface-variant text-sm mt-1">Gérez vos campagnes marketing et remises pour les étudiants.</p>
</div>
<button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined">add</span>
<span>Créer un code</span>
</button>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-primary font-bold">verified</span>
</div>
<div>
<p className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Codes Actifs</p>
<p className="text-2xl font-display font-bold text-on-surface">8</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-secondary-fixed flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-secondary font-bold">group</span>
</div>
<div>
<p className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Utilisations</p>
<p className="text-2xl font-display font-bold text-on-surface">1,245</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-tertiary-fixed flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-tertiary font-bold">payments</span>
</div>
<div>
<p className="text-on-surface-variant text-xs font-semibold tracking-wider uppercase">Total Remises</p>
<p className="text-2xl font-display font-bold text-on-surface">622,500 <span className="text-sm font-medium">FCFA</span></p>
</div>
</div>
</div>

<div className="bg-surface-container-low rounded-xl p-2 mb-6">
<div className="flex flex-col lg:flex-row gap-4">

<div className="relative flex-1">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Rechercher un code..." type="text" />
</div>

<div className="flex bg-surface-container rounded-lg p-1">
<button className="flex-1 lg:flex-none px-6 py-2 bg-surface-container-lowest text-primary font-bold rounded-md shadow-sm text-sm">Actifs</button>
<button className="flex-1 lg:flex-none px-6 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-md text-sm">Programmés</button>
<button className="flex-1 lg:flex-none px-6 py-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-md text-sm">Expirés</button>
</div>
</div>
</div>

<div className="space-y-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-md transition-shadow group">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="p-3 bg-primary-fixed-dim rounded-lg text-primary font-bold font-headline">
                            -20%
                        </div>
<div>
<h3 className="font-display font-bold text-lg text-on-surface">BAC2024</h3>
<p className="text-on-surface-variant text-sm">Réduction sur le Pass Annuel</p>
</div>
</div>
<div className="flex items-center gap-3">
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
</label>
<button className="text-outline hover:text-on-surface transition-colors p-1">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
<div>
<div className="flex justify-between text-xs text-on-surface-variant mb-1">
<span>Utilisations: 340 / 500</span>
<span>68%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-tertiary h-2 rounded-full" style={{"width":"68%"}}></div>
</div>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">event</span>
<span className="text-sm text-on-surface-variant">Expire le 15 Juin 2024</span>
</div>
<div className="flex justify-end">
<span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider">Actif</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-md transition-shadow">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="p-3 bg-secondary-fixed rounded-lg text-secondary font-bold font-headline">
                            -1k
                        </div>
<div>
<h3 className="font-display font-bold text-lg text-on-surface">BIENVENUE</h3>
<p className="text-on-surface-variant text-sm">Remise fixe sur tous les articles</p>
</div>
</div>
<div className="flex items-center gap-3">
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
</label>
<button className="text-outline hover:text-on-surface transition-colors p-1">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
<div>
<div className="flex justify-between text-xs text-on-surface-variant mb-1">
<span>Utilisations: 852</span>
<span>Illimité</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-tertiary h-2 rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">all_inclusive</span>
<span className="text-sm text-on-surface-variant">Validité illimitée</span>
</div>
<div className="flex justify-end">
<span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-full text-xs font-bold uppercase tracking-wider">Actif</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant opacity-60 rounded-xl p-5 group transition-all">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-4">
<div className="p-3 bg-surface-variant rounded-lg text-on-surface-variant font-bold font-headline">
                            -10%
                        </div>
<div>
<h3 className="font-display font-bold text-lg text-on-surface">PROMO_MAI</h3>
<p className="text-on-surface-variant text-sm">Réduction sur le Pass Mensuel</p>
</div>
</div>
<div className="flex items-center gap-3">
<label className="relative inline-flex items-center cursor-not-allowed">
<input className="sr-only peer" disabled={true} type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5"></div>
</label>
<button className="text-outline hover:text-on-surface transition-colors p-1">
<span className="material-symbols-outlined">more_vert</span>
</button>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
<div>
<div className="flex justify-between text-xs text-on-surface-variant mb-1">
<span>Utilisations: 150 / 150</span>
<span>100%</span>
</div>
<div className="w-full bg-surface-container rounded-full h-2">
<div className="bg-error h-2 rounded-full" style={{"width":"100%"}}></div>
</div>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">event_busy</span>
<span className="text-sm text-on-surface-variant">Expiré le 31 Mai 2024</span>
</div>
<div className="flex justify-end">
<span className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-wider">Expiré</span>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface-container dark:bg-surface-container-lowest rounded-t-xl shadow-lg">
<button className="flex flex-col items-center justify-center text-on-surface-variant group">
<span className="material-symbols-outlined group-active:scale-90 duration-200">sell</span>
<span className="font-label text-label-xs">Codes</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant group">
<span className="material-symbols-outlined group-active:scale-90 duration-200">query_stats</span>
<span className="font-label text-label-xs">Stats</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary font-bold group">
<span className="material-symbols-outlined fill-icon text-3xl group-active:scale-90 duration-200" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label text-label-xs">New Code</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant group">
<span className="material-symbols-outlined group-active:scale-90 duration-200">person</span>
<span className="font-label text-label-xs">Profil</span>
</button>
</nav>

<div className="fixed inset-0 -z-10 opacity-20 pointer-events-none overflow-hidden">
<div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary-container blur-[120px]"></div>
<div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary-container blur-[120px]"></div>
</div>
<script>
        // Simple micro-interactions for the cards
        document.querySelectorAll('.bg-surface-container-lowest').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.classList.add('border-primary/30');
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.classList.remove('border-primary/30');
            &#125;);
        &#125;);

        // Tab switching logic (Visual only for prototype)
        const tabs = document.querySelectorAll('.lg\\:flex-none');
        tabs.forEach(tab =&gt; &#123;
            tab.addEventListener('click', () =&gt; &#123;
                tabs.forEach(t =&gt; &#123;
                    t.classList.remove('bg-surface-container-lowest', 'text-primary', 'font-bold', 'shadow-sm');
                    t.classList.add('text-on-surface-variant');
                &#125;);
                tab.classList.add('bg-surface-container-lowest', 'text-primary', 'font-bold', 'shadow-sm');
                tab.classList.remove('text-on-surface-variant');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
