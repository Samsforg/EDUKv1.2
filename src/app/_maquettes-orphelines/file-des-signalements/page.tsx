import type { Metadata } from "next";

export const metadata: Metadata = { title: "Modération Edukora - Signalements" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container fixed top-0 w-full z-50 border-b border-outline-variant shadow-sm flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
<h1 className="font-headline font-bold text-lg md:text-xl tracking-tight">Modération Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6 mr-6">
<span className="text-on-primary font-bold cursor-pointer">Signalements</span>
<span className="text-on-primary-container opacity-80 hover:bg-primary-fixed-variant/20 transition-colors px-2 py-1 rounded cursor-pointer">Tableau de bord</span>
</div>
<div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
<div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold text-xs">AU</div>
<span className="text-sm font-medium hidden sm:inline">Utilisateur admin</span>
</div>
</div>
</header>

<aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 h-full w-64 border-r border-outline-variant bg-surface-container-low dark:bg-inverse-surface">
<div className="p-6">
<p className="font-headline font-semibold text-primary mb-6 uppercase tracking-widest text-xs">Menu Admin</p>
<nav className="space-y-2">
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg cursor-pointer" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 p-3 bg-primary-container text-on-primary-container rounded-lg font-semibold cursor-pointer" href="#">
<span className="material-symbols-outlined">report</span>
<span className="font-body text-body-md">Signalements</span>
</a>
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg cursor-pointer" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="font-body text-body-md">Config IA</span>
</a>
<a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg cursor-pointer" href="#">
<span className="material-symbols-outlined">history</span>
<span className="font-body text-body-md">Logs Système</span>
</a>
</nav>
</div>
</aside>

<main className="pt-24 pb-20 md:pb-8 md:pl-72 px-4 md:pr-8">
<div className="max-w-7xl mx-auto">

<div className="mb-8 space-y-6">
<div>
<h2 className="text-display-lg-mobile md:text-3xl font-extrabold text-primary flex items-center gap-2">
                        File d'attente des signalements
                        <span className="bg-error text-on-error text-xs px-2.5 py-0.5 rounded-full font-bold">12 nouveaux</span>
</h2>
<p className="text-on-surface-variant mt-1">Gérez les interactions de la communauté pour maintenir un environnement sûr.</p>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
<div className="flex flex-wrap gap-3 w-full md:w-auto">
<div className="relative w-full md:w-48">
<label className="absolute -top-2 left-3 bg-surface-container-lowest px-1 text-[10px] font-bold text-outline uppercase">Commune</label>
<select className="w-full bg-transparent border border-outline rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
<option>Toutes les communes</option>
<option>Cocody</option>
<option>Abobo</option>
<option>Yopougon</option>
<option>Marcory</option>
<option>Treichville</option>
</select>
</div>
<div className="relative w-full md:w-48">
<label className="absolute -top-2 left-3 bg-surface-container-lowest px-1 text-[10px] font-bold text-outline uppercase">Motif</label>
<select className="w-full bg-transparent border border-outline rounded-lg px-3 py-2 text-sm focus:ring-primary focus:border-primary">
<option>Tous les motifs</option>
<option>Harcèlement</option>
<option>Contenu inapproprié</option>
<option>Spam</option>
<option>Discours de haine</option>
</select>
</div>
</div>
<div className="flex items-center gap-2 w-full md:w-auto">
<button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all active:scale-95">
<span className="material-symbols-outlined text-sm">filter_list</span>
                            Appliquer les filtres
                        </button>
<button className="p-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container">
<span className="material-symbols-outlined">refresh</span>
</button>
</div>
</div>
</div>

<div className="bento-grid">

<div className="bg-white rounded-xl border-l-4 border-l-error shadow-sm hover:shadow-md transition-all group overflow-hidden border border-outline-variant/30 flex flex-col">
<div className="p-5 flex-1">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">JD</div>
<div>
<h3 className="font-bold text-on-surface">Jean-Marc D.</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs">location_on</span> Cocody
                                    </p>
</div>
</div>
<span className="bg-error-container text-on-error-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Priorité Haute</span>
</div>
<div className="mb-4">
<span className="inline-block bg-surface-container-highest px-2 py-0.5 rounded text-xs font-medium text-on-surface-variant mb-2">Harcèlement</span>
<p className="text-sm text-on-surface leading-relaxed line-clamp-3 italic bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                                "Tu n'as rien à faire ici si tu ne comprends pas les bases de la physique. Retourne au CP sale nul."
                            </p>
</div>
<div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/10">
<span>Signalé par 3 utilisateurs</span>
<span>Il y a 12 min</span>
</div>
</div>
<div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-2">
<button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95">Examiner</button>
<button className="px-3 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">more_vert</span>
</button>
</div>
</div>

<div className="bg-white rounded-xl border-l-4 border-l-secondary-container shadow-sm hover:shadow-md transition-all group overflow-hidden border border-outline-variant/30 flex flex-col">
<div className="p-5 flex-1">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">AK</div>
<div>
<h3 className="font-bold text-on-surface">Awa Koné</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs">location_on</span> Abobo
                                    </p>
</div>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Priorité Moyenne</span>
</div>
<div className="mb-4">
<span className="inline-block bg-surface-container-highest px-2 py-0.5 rounded text-xs font-medium text-on-surface-variant mb-2">Contenu inapproprié</span>
<p className="text-sm text-on-surface leading-relaxed line-clamp-3 italic bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                                [Image signalée] Lien externe vers un groupe de discussion non vérifié.
                            </p>
</div>
<div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/10">
<span>Signalé par 1 utilisateur</span>
<span>Il y a 45 min</span>
</div>
</div>
<div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-2">
<button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95">Examiner</button>
<button className="px-3 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">more_vert</span>
</button>
</div>
</div>

<div className="bg-white rounded-xl border-l-4 border-l-outline shadow-sm hover:shadow-md transition-all group overflow-hidden border border-outline-variant/30 flex flex-col">
<div className="p-5 flex-1">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">SS</div>
<div>
<h3 className="font-bold text-on-surface">Sidiki S.</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs">location_on</span> Yopougon
                                    </p>
</div>
</div>
<span className="bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Priorité Faible</span>
</div>
<div className="mb-4">
<span className="inline-block bg-surface-container-highest px-2 py-0.5 rounded text-xs font-medium text-on-surface-variant mb-2">Spam</span>
<p className="text-sm text-on-surface leading-relaxed line-clamp-3 italic bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                                "Gagne de l'argent facilement en faisant tes devoirs ! Clique ici pour voir la méthode secrète..."
                            </p>
</div>
<div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/10">
<span>Signalé par 8 utilisateurs</span>
<span>Il y a 1h 20min</span>
</div>
</div>
<div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-2">
<button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95">Examiner</button>
<button className="px-3 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">more_vert</span>
</button>
</div>
</div>

<div className="bg-white rounded-xl border-l-4 border-l-error shadow-sm hover:shadow-md transition-all group overflow-hidden border border-outline-variant/30 flex flex-col">
<div className="p-5 flex-1">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">MB</div>
<div>
<h3 className="font-bold text-on-surface">Marie-B.</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs">location_on</span> Marcory
                                    </p>
</div>
</div>
<span className="bg-error-container text-on-error-container px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Priorité Haute</span>
</div>
<div className="mb-4">
<span className="inline-block bg-surface-container-highest px-2 py-0.5 rounded text-xs font-medium text-on-surface-variant mb-2">Harcèlement</span>
<p className="text-sm text-on-surface leading-relaxed line-clamp-3 italic bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                                Signalement multiple de comportements insistants en messagerie privée.
                            </p>
</div>
<div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/10">
<span>Signalé par 2 utilisateurs</span>
<span>Il y a 2h</span>
</div>
</div>
<div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-2">
<button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95">Examiner</button>
<button className="px-3 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">more_vert</span>
</button>
</div>
</div>

<div className="bg-white rounded-xl border-l-4 border-l-secondary-container shadow-sm hover:shadow-md transition-all group overflow-hidden border border-outline-variant/30 flex flex-col">
<div className="p-5 flex-1">
<div className="flex justify-between items-start mb-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold">PL</div>
<div>
<h3 className="font-bold text-on-surface">Pascal L.</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-xs">location_on</span> Cocody
                                    </p>
</div>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">Priorité Moyenne</span>
</div>
<div className="mb-4">
<span className="inline-block bg-surface-container-highest px-2 py-0.5 rounded text-xs font-medium text-on-surface-variant mb-2">Spam</span>
<p className="text-sm text-on-surface leading-relaxed line-clamp-3 italic bg-surface-container-low p-3 rounded-lg border border-outline-variant/20">
                                Répétition du même message dans plusieurs salons de révision.
                            </p>
</div>
<div className="flex items-center justify-between text-xs text-outline pt-2 border-t border-outline-variant/10">
<span>Signalé par 5 utilisateurs</span>
<span>Il y a 3h 15min</span>
</div>
</div>
<div className="p-4 bg-surface-container-lowest border-t border-outline-variant/30 flex gap-2">
<button className="flex-1 bg-primary text-on-primary py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-all active:scale-95">Examiner</button>
<button className="px-3 py-2 border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-container transition-all">
<span className="material-symbols-outlined text-sm">more_vert</span>
</button>
</div>
</div>
</div>

<div className="hidden flex-col items-center justify-center py-20 text-center" id="empty-state">
<div className="w-24 h-24 bg-surface-container rounded-full flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-5xl text-outline-variant">check_circle</span>
</div>
<h3 className="text-xl font-bold text-on-surface">Tout est en ordre !</h3>
<p className="text-on-surface-variant max-w-sm mx-auto mt-2">Aucun signalement en attente pour les critères sélectionnés. Beau travail de modération.</p>
</div>
</div>
</main>

<nav className="md:hidden flex justify-around items-center h-16 px-2 fixed bottom-0 w-full z-50 rounded-t-xl border-t border-outline-variant bg-surface-container-lowest shadow-lg">
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest transition-all scale-95 active:scale-90 p-2">
<span className="material-symbols-outlined">grid_view</span>
<span className="font-label text-[10px] font-semibold mt-1">Tableau de bord</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:bg-surface-container-highest transition-all scale-95 active:scale-90">
<span className="material-symbols-outlined">warning</span>
<span className="font-label text-[10px] font-semibold">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest transition-all scale-95 active:scale-90 p-2">
<span className="material-symbols-outlined">settings_suggest</span>
<span className="font-label text-[10px] font-semibold mt-1">Paramètres IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest transition-all scale-95 active:scale-90 p-2">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-[10px] font-semibold mt-1">Profil</span>
</div>
</nav>
<script>
        // Simple micro-interaction for the 'Examine' buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            if (btn.textContent === 'Examiner') &#123;
                btn.addEventListener('click', function() &#123;
                    const card = this.closest('.group');
                    card.style.transform = 'scale(0.98)';
                    card.style.opacity = '0.5';
                    setTimeout(() =&gt; &#123;
                        card.classList.add('hidden');
                        // Logic to check if grid is empty
                        const visibleCards = document.querySelectorAll('.bento-grid &gt; div:not(.hidden)');
                        if (visibleCards.length === 0) &#123;
                            document.querySelector('.bento-grid').classList.add('hidden');
                            document.getElementById('empty-state').classList.remove('hidden');
                        &#125;
                    &#125;, 300);
                &#125;);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
