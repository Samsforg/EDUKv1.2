import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bibliothèque - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-surface-border flex justify-between items-center px-container-padding-mobile h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary-container" style={{"fontSize":"28px"}}>school</span>
<h1 className="font-headline-md text-headline-md-mobile font-bold text-primary">Edukora</h1>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-on-surface-variant">settings</span>
</button>
</header>
<main className="pt-20 px-container-padding-mobile max-w-5xl mx-auto">

<div className="flex items-center justify-between mb-stack-md">
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">Ma Bibliothèque</h2>
<div className="flex items-center gap-2 text-impact-emerald bg-impact-emerald/10 px-3 py-1 rounded-full">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-label-md text-label-md">Mode Hors-ligne Actif</span>
</div>
</div>

<section className="space-y-4 mb-stack-md">
<div className="relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-surface-border rounded-xl focus:ring-2 focus:ring-primary-container/20 focus:border-primary-container outline-none transition-all font-body-md text-body-md" placeholder="Rechercher une fiche..." type="text" />
</div>
<div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
<button className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap">Tout</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors">Mathématiques</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors">Physique-Chimie</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors">SVT</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors">Histoire-Géo</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-1.5 rounded-full font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-highest transition-colors">Français</button>
</div>
</section>

<section className="mb-stack-md">
<div className="flex items-center justify-between mb-stack-sm px-1">
<h3 className="font-title-md text-title-md text-on-surface">Téléchargements récents</h3>
<button className="text-primary-container font-label-md text-label-md">Voir tout</button>
</div>
<div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">

<div className="flex-shrink-0 w-64 bg-surface-container-lowest p-4 rounded-xl border border-surface-border hover:shadow-sm transition-shadow">
<div className="flex justify-between items-start mb-3">
<div className="w-10 h-10 rounded-lg bg-primary-container/10 flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container">description</span>
</div>
<span className="bg-expert-purple/10 text-expert-purple font-label-md text-[10px] px-2 py-0.5 rounded-full">Expert</span>
</div>
<h4 className="font-title-md text-on-surface line-clamp-1 mb-1">Algèbre Linéaire</h4>
<p className="font-body-md text-on-surface-variant text-xs mb-3">Maths • Il y a 2h</p>
<div className="flex items-center justify-between">
<span className="text-xs font-label-md text-on-surface-variant">1.4 Mo</span>
<span className="material-symbols-outlined text-impact-emerald text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>offline_pin</span>
</div>
</div>

<div className="flex-shrink-0 w-64 bg-surface-container-lowest p-4 rounded-xl border border-surface-border hover:shadow-sm transition-shadow">
<div className="flex justify-between items-start mb-3">
<div className="w-10 h-10 rounded-lg bg-validation-amber/10 flex items-center justify-center">
<span className="material-symbols-outlined text-validation-amber">science</span>
</div>
</div>
<h4 className="font-title-md text-on-surface line-clamp-1 mb-1">Thermodynamique</h4>
<p className="font-body-md text-on-surface-variant text-xs mb-3">Physique • Hier</p>
<div className="flex items-center justify-between">
<span className="text-xs font-label-md text-on-surface-variant">2.1 Mo</span>
<span className="material-symbols-outlined text-impact-emerald text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>offline_pin</span>
</div>
</div>

<div className="flex-shrink-0 w-64 bg-surface-container-lowest p-4 rounded-xl border border-surface-border hover:shadow-sm transition-shadow">
<div className="flex justify-between items-start mb-3">
<div className="w-10 h-10 rounded-lg bg-expert-purple/10 flex items-center justify-center">
<span className="material-symbols-outlined text-expert-purple">psychology</span>
</div>
</div>
<h4 className="font-title-md text-on-surface line-clamp-1 mb-1">Neurosciences</h4>
<p className="font-body-md text-on-surface-variant text-xs mb-3">SVT • 3 jours</p>
<div className="flex items-center justify-between">
<span className="text-xs font-label-md text-on-surface-variant">850 Ko</span>
<span className="material-symbols-outlined text-impact-emerald text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>offline_pin</span>
</div>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center justify-between px-1">
<h3 className="font-title-md text-title-md text-on-surface">Toutes mes fiches</h3>
<button className="flex items-center gap-1 text-on-secondary-container hover:text-primary transition-colors">
<span className="material-symbols-outlined text-lg">filter_list</span>
<span className="font-label-md text-label-md">Trier par date</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="group relative flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-surface-border hover:border-primary-container/30 transition-all cursor-pointer">
<div className="w-12 h-16 bg-surface-container-low rounded flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container/60" style={{"fontSize":"32px"}}>picture_as_pdf</span>
</div>
<div className="flex-1 min-w-0">
<h4 className="font-title-md text-on-surface line-clamp-1">Les Lois de Newton</h4>
<div className="flex items-center gap-2 mt-1">
<span className="text-[10px] uppercase font-bold text-on-secondary-container">Physique</span>
<span className="text-on-surface-variant opacity-20">•</span>
<span className="font-label-md text-label-md text-on-surface-variant">12 Oct. 2023</span>
</div>
<div className="flex items-center gap-2 mt-2">
<span className="material-symbols-outlined text-impact-emerald text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>download_done</span>
<span className="text-[10px] font-label-md text-on-surface-variant">1.2 Mo • Hors-ligne prêt</span>
</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-error/10 hover:text-error transition-colors" title="Supprimer">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
<button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-primary-container hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</div>

<div className="group relative flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-surface-border hover:border-primary-container/30 transition-all cursor-pointer">
<div className="w-12 h-16 bg-surface-container-low rounded flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container/60" style={{"fontSize":"32px"}}>description</span>
</div>
<div className="flex-1 min-w-0">
<h4 className="font-title-md text-on-surface line-clamp-1">Structure de l'ADN</h4>
<div className="flex items-center gap-2 mt-1">
<span className="text-[10px] uppercase font-bold text-on-secondary-container">SVT</span>
<span className="text-on-surface-variant opacity-20">•</span>
<span className="font-label-md text-label-md text-on-surface-variant">08 Oct. 2023</span>
</div>
<div className="flex items-center gap-2 mt-2">
<span className="material-symbols-outlined text-impact-emerald text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>download_done</span>
<span className="text-[10px] font-label-md text-on-surface-variant">3.4 Mo • Hors-ligne prêt</span>
</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-error/10 hover:text-error transition-colors">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
<button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-primary-container hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</div>

<div className="group relative flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-surface-border hover:border-primary-container/30 transition-all cursor-pointer">
<div className="w-12 h-16 bg-surface-container-low rounded flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container/60" style={{"fontSize":"32px"}}>edit_document</span>
</div>
<div className="flex-1 min-w-0">
<h4 className="font-title-md text-on-surface line-clamp-1">Probabilités Discrètes</h4>
<div className="flex items-center gap-2 mt-1">
<span className="text-[10px] uppercase font-bold text-on-secondary-container">Maths</span>
<span className="text-on-surface-variant opacity-20">•</span>
<span className="font-label-md text-label-md text-on-surface-variant">05 Oct. 2023</span>
</div>
<div className="flex items-center gap-2 mt-2">
<span className="material-symbols-outlined text-impact-emerald text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>download_done</span>
<span className="text-[10px] font-label-md text-on-surface-variant">0.9 Mo • Hors-ligne prêt</span>
</div>
</div>
<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
<button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-error/10 hover:text-error transition-colors">
<span className="material-symbols-outlined text-lg">delete</span>
</button>
<button className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high hover:bg-primary-container hover:text-on-primary transition-colors">
<span className="material-symbols-outlined text-lg">more_vert</span>
</button>
</div>
</div>
</div>

<div className="hidden flex-col items-center justify-center py-20 px-6 text-center" id="empty-state">
<div className="w-24 h-24 bg-surface-container-low rounded-full flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-surface-variant opacity-30" style={{"fontSize":"48px"}}>folder_open</span>
</div>
<h3 className="font-headline-md text-on-surface mb-2">Votre bibliothèque est vide</h3>
<p className="font-body-md text-on-surface-variant mb-8 max-w-xs">Enregistrez des fiches pour pouvoir les consulter même sans connexion internet.</p>
<button className="bg-primary-container text-on-primary px-8 py-3 rounded-full font-label-md text-label-md shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-transform">
                    Explorer les ressources
                </button>
</div>
</section>

<section className="mt-12 p-6 bg-surface-container rounded-2xl border border-surface-border">
<div className="flex justify-between items-end mb-4">
<div>
<h4 className="font-title-md text-on-surface">Espace utilisé</h4>
<p className="font-body-md text-on-surface-variant text-xs">8.5 Mo sur 500 Mo alloués</p>
</div>
<span className="font-label-md text-label-md text-primary-container">1.7%</span>
</div>
<div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-primary-container rounded-full" style={{"width":"1.7%"}}></div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-20 bg-surface border-t border-surface-border px-4 pb-safe">
<a className="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1 hover:bg-secondary-container/50 transition-transform duration-150 active:scale-90" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1 hover:bg-secondary-container/50 transition-transform duration-150 active:scale-90" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-md text-label-md">Sujets</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary rounded-full px-4 py-1 scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>local_library</span>
<span className="font-label-md text-label-md">Bibliothèque</span>
</a>
<a className="flex flex-col items-center justify-center text-on-secondary-container px-4 py-1 hover:bg-secondary-container/50 transition-transform duration-150 active:scale-90" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction logic
        document.querySelectorAll('.group').forEach(item =&gt; &#123;
            item.addEventListener('click', (e) =&gt; &#123;
                if (!e.target.closest('button')) &#123;
                    // Logic to open file could go here
                    console.log('Opening file...');
                &#125;
            &#125;);
        &#125;);

        // Search filtering simulation
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) =&gt; &#123;
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.group');
            let found = 0;
            
            items.forEach(item =&gt; &#123;
                const title = item.querySelector('h4').textContent.toLowerCase();
                if (title.includes(query)) &#123;
                    item.style.display = 'flex';
                    found++;
                &#125; else &#123;
                    item.style.display = 'none';
                &#125;
            &#125;);

            const emptyState = document.getElementById('empty-state');
            if (found === 0) &#123;
                emptyState.classList.remove('hidden');
                emptyState.classList.add('flex');
            &#125; else &#123;
                emptyState.classList.add('hidden');
                emptyState.classList.remove('flex');
            &#125;
        &#125;);
    </script>

    </div>
  );
}
