import type { Metadata } from "next";

export const metadata: Metadata = { title: "Analyse de Signalement - Edukora Admin" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm border-b border-outline-variant flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-2xl" data-icon="admin_panel_settings">admin_panel_settings</span>
<h1 className="font-headline font-bold text-xl md:text-2xl">Modération Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 text-sm font-label">
<span className="text-on-primary font-bold cursor-pointer">Signalements</span>
<span className="text-on-primary-container opacity-80 hover:bg-primary-fixed-variant/20 transition-colors px-2 py-1 rounded cursor-pointer">Tableau de bord</span>
</div>
<div className="h-10 w-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold border-2 border-on-primary">
                AU
            </div>
</div>
</header>

<nav className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 h-full w-64 border-r border-outline-variant bg-surface-container-low dark:bg-inverse-surface py-6 px-4">
<div className="mb-8">
<h2 className="font-headline font-semibold text-primary px-4 mb-2">Menu Admin</h2>
</div>
<div className="space-y-2">
<div className="text-on-surface-variant hover:bg-surface-container-highest flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg font-body text-body-md">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span>Tableau de bord</span>
</div>
<div className="bg-primary-container text-on-primary-container rounded-lg font-semibold flex items-center gap-3 px-4 py-3 cursor-pointer transition-all font-body text-body-md">
<span className="material-symbols-outlined" data-icon="report">report</span>
<span>Signalements</span>
</div>
<div className="text-on-surface-variant hover:bg-surface-container-highest flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg font-body text-body-md">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
<span>Config IA</span>
</div>
<div className="text-on-surface-variant hover:bg-surface-container-highest flex items-center gap-3 px-4 py-3 cursor-pointer transition-all rounded-lg font-body text-body-md">
<span className="material-symbols-outlined" data-icon="history">history</span>
<span>Logs Système</span>
</div>
</div>
</nav>

<main className="pt-20 pb-24 md:pl-64 min-h-screen">
<div className="max-w-6xl mx-auto px-4 md:px-8 py-6">

<div className="flex items-center gap-2 text-on-surface-variant text-sm mb-6">
<span>Signalements</span>
<span className="material-symbols-outlined text-sm" data-icon="chevron_right">chevron_right</span>
<span className="font-semibold text-primary">Détails du Cas #8842</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-4 space-y-6">

<section className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant">
<div className="flex items-center justify-between mb-4">
<h3 className="font-headline font-bold text-on-surface">Dénonciateur</h3>
<span className="px-2 py-1 bg-surface-container text-on-surface-variant text-[10px] uppercase tracking-wider font-bold rounded">Étudiant</span>
</div>
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-lg bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDGN91LIXjGmD1gqW2Vn4qzoKq0m5_5xHFo5bXj1khC-ecwVvMBJePtUlPlwRXXZM3kumh5waB-91I_EUp2EnseehRweAnlYfefX6RMb2jv69e05KUYDjt52Tzk_MEan3AkRRem28sZjdFOdWXhUX8XP6aLXBuuWdk5PYnO0JEj4aWe-_DMFdik8sZLs0pka9CMSIUkcZs9LfdX0HxO7um4iUorsKgKS1jLQ8ZAw35FqjkpMgrKbMIs')"}}></div>
<div>
<p className="font-bold text-on-surface">Kouassi Amenan</p>
<p className="text-xs text-on-surface-variant mb-2">Inscrit depuis fév. 2023</p>
<div className="flex items-center gap-1 text-tertiary font-semibold text-xs">
<span className="material-symbols-outlined text-xs" data-icon="verified_user">verified_user</span>
<span>Fiabilité : Haute (98%)</span>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant ring-2 ring-error/10">
<div className="flex items-center justify-between mb-4">
<h3 className="font-headline font-bold text-on-surface">Auteur du message</h3>
<span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] uppercase tracking-wider font-bold rounded">Signalé</span>
</div>
<div className="flex items-center gap-4">
<div className="w-16 h-16 rounded-lg bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuCAIol48TDIEk3QSpl37UkObsfqF6oethXD3sBiZYC5zjZmY2x7po3X7WtyTeaSzd6QEGTnRAhrgjQtwUjXEhk8TOv_hll2jtyTluKNBz4zTAak2ejZn_7gscb9rgOUfmZeqLkHiNO7IHpBtF-JM9ZMEFH22cUkNnvXoron0BdU-9QrXhddw8xr1UGXhe1I8CzuuN8V5oR0zD_h3y6PIa8qtgjNsvDPrdtoSP86mrHqVM278Rlb5dWL')"}}></div>
<div>
<p className="font-bold text-on-surface">Bakary Sylla</p>
<p className="text-xs text-on-surface-variant mb-2">Inscrit depuis oct. 2023</p>
<div className="flex flex-col gap-1">
<span className="text-error font-semibold text-xs">3 signalements récents</span>
<span className="text-on-surface-variant text-xs">0 avertissements actifs</span>
</div>
</div>
</div>
<div className="mt-4 pt-4 border-t border-outline-variant grid grid-cols-2 gap-2 text-center">
<div className="bg-surface-container-low p-2 rounded">
<p className="text-[10px] uppercase text-on-surface-variant">Leçons</p>
<p className="font-bold text-primary">124</p>
</div>
<div className="bg-surface-container-low p-2 rounded">
<p className="text-[10px] uppercase text-on-surface-variant">Rang</p>
<p className="font-bold text-primary">#452</p>
</div>
</div>
</section>

<section className="bg-primary-container/10 p-5 rounded-xl border border-primary/20">
<div className="flex items-center gap-2 mb-3">
<span className="material-symbols-outlined text-primary" data-icon="psychology">psychology</span>
<h3 className="font-headline font-bold text-primary">Analyse IA Edukora</h3>
</div>
<p className="text-sm text-on-surface leading-relaxed">
                            Probabilité de harcèlement : <span className="font-bold text-error">89%</span>. L'IA a détecté des termes agressifs récurrents visant la personne. Contexte : Forum Mathématiques BEPC.
                        </p>
</section>
</div>

<div className="lg:col-span-8">
<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col h-full">
<div className="p-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<h3 className="font-headline font-bold flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="forum">forum</span>
                                Historique de la conversation
                            </h3>
<span className="text-xs text-on-surface-variant">Fil de discussion : Groupe d'étude BAC 2024</span>
</div>
<div className="p-6 space-y-4 flex-grow overflow-y-auto max-h-[600px]">

<div className="flex gap-4 opacity-60">
<div className="w-8 h-8 rounded bg-surface-container-highest flex-shrink-0"></div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface-variant">Jean-Marc • 14:22</p>
<div className="p-3 bg-surface-container rounded-r-lg rounded-bl-lg text-sm">
                                        Quelqu'un a compris l'exercice 4 sur les fonctions ? C'est super dur.
                                    </div>
</div>
</div>

<div className="flex gap-4 opacity-60">
<div className="w-8 h-8 rounded bg-surface-container-highest flex-shrink-0"></div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface-variant">Kouassi Amenan • 14:23</p>
<div className="p-3 bg-surface-container rounded-r-lg rounded-bl-lg text-sm">
                                        Oui, j'ai fini. Tu veux qu'on fasse un appel vocal ce soir ?
                                    </div>
</div>
</div>

<div className="flex gap-4 opacity-60">
<div className="w-8 h-8 rounded bg-surface-container-highest flex-shrink-0"></div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface-variant">Jean-Marc • 14:23</p>
<div className="p-3 bg-surface-container rounded-r-lg rounded-bl-lg text-sm">
                                        Oh oui ça m'aiderait tellement ! Merci Amenan.
                                    </div>
</div>
</div>

<div className="flex gap-4 message-highlight p-4 -mx-4">
<div className="w-10 h-10 rounded bg-primary-fixed flex-shrink-0 flex items-center justify-center text-primary font-bold">BS</div>
<div className="space-y-2 flex-grow">
<div className="flex justify-between items-center">
<p className="text-sm font-bold text-error">Bakary Sylla • 14:25</p>
<span className="bg-error text-on-error text-[10px] px-2 py-0.5 rounded-full font-bold">SIGNALÉ</span>
</div>
<div className="p-4 bg-error-container/20 border border-error/20 rounded-xl text-on-surface font-semibold shadow-sm">
                                        Amenan tu sers à rien laisse le tomber. Tu comprends rien aux maths de toute façon t'es juste une incapable qui veut se rendre intéressante. Arrête de polluer le groupe.
                                    </div>
</div>
</div>

<div className="flex gap-4">
<div className="w-8 h-8 rounded bg-surface-container-highest flex-shrink-0"></div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface-variant">Kouassi Amenan • 14:26</p>
<div className="p-3 bg-surface-container rounded-r-lg rounded-bl-lg text-sm">
                                        Pourquoi tu es aussi méchant ? On essaye juste d'étudier...
                                    </div>
</div>
</div>

<div className="flex gap-4">
<div className="w-8 h-8 rounded bg-surface-container-highest flex-shrink-0"></div>
<div className="space-y-1">
<p className="text-xs font-bold text-on-surface-variant">Jean-Marc • 14:26</p>
<div className="p-3 bg-surface-container rounded-r-lg rounded-bl-lg text-sm">
                                        Calme-toi Bakary, c'est quoi ton problème ?
                                    </div>
</div>
</div>
</div>

<div className="p-6 border-t border-outline-variant bg-surface-container-lowest">
<label className="block text-sm font-bold text-on-surface mb-2" htmlFor="mod-notes">Notes du modérateur</label>
<textarea className="w-full bg-surface border border-outline-variant rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" id="mod-notes" placeholder="Ajoutez vos observations ici avant de prendre une décision..." rows={3}></textarea>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="fixed bottom-0 left-0 md:left-64 right-0 z-50 bg-surface-container-lowest border-t border-outline-variant shadow-[0_-4px_20px_rgba(0,0,0,0.05)] p-4">
<div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center lg:justify-between gap-3">
<div className="flex items-center gap-2">
<button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-outline text-on-surface font-semibold hover:bg-surface-container-high transition-all active:scale-95">
<span className="material-symbols-outlined" data-icon="close">close</span>
                    Ignorer
                </button>
<button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-surface-container-highest text-on-surface font-semibold hover:bg-surface-container-high transition-all active:scale-95">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
                    Avertir l'utilisateur
                </button>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-error text-error font-semibold hover:bg-error-container/10 transition-all active:scale-95">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
                    Supprimer le message
                </button>
<button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-error text-on-error font-semibold hover:opacity-90 shadow-lg shadow-error/20 transition-all active:scale-95">
<span className="material-symbols-outlined" data-icon="block">block</span>
                    Bannir temporairement
                </button>
<button className="flex items-center justify-center w-12 h-12 rounded-lg bg-inverse-surface text-on-error hover:bg-black transition-all active:scale-95 group relative" title="Bannir définitivement">
<span className="material-symbols-outlined" data-icon="gavel">gavel</span>
<div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Bannir définitivement</div>
</button>
</div>
</div>
</footer>

<nav className="md:hidden flex justify-around items-center h-16 px-2 fixed bottom-0 w-full z-50 rounded-t-xl bg-surface border-t border-outline-variant shadow-lg">
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest cursor-pointer">
<span className="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span className="font-label text-label-xs">Tableau de bord</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:bg-surface-container-highest cursor-pointer">
<span className="material-symbols-outlined" data-icon="warning">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest cursor-pointer">
<span className="material-symbols-outlined" data-icon="settings_suggest">settings_suggest</span>
<span className="font-label text-label-xs">Paramètres IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest cursor-pointer">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Simple micro-interaction for action buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                const action = btn.innerText.trim();
                if(action &amp;&amp; action !== 'close' &amp;&amp; action !== 'warning' &amp;&amp; action !== 'delete' &amp;&amp; action !== 'block') &#123;
                    console.log(`Action moderation: $&#123;action&#125;`);
                    // Feedback visual logic could go here
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
