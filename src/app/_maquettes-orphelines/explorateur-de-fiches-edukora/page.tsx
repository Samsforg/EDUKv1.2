import type { Metadata } from "next";

export const metadata: Metadata = { title: "Explorateur de fiches - Edukora" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-surface-dim text-primary dark:text-primary-fixed font-headline-md text-headline-md w-full sticky top-0 z-50 border-b border-outline-variant dark:border-outline flex items-center justify-between px-gutter h-16 transition-colors duration-200 ease-in-out">
<div className="flex items-center gap-4">
<span className="font-bold text-primary dark:text-primary-fixed">Edukora</span>
</div>
<div className="hidden md:flex items-center gap-8 text-on-surface-variant font-label-md text-label-md">
<a className="hover:text-primary transition-colors" href="#">Tableau de bord</a>
<a className="text-primary font-bold border-b-2 border-primary pt-1" href="#">Explorateur</a>
<a className="hover:text-primary transition-colors" href="#">Validation</a>
<a className="hover:text-primary transition-colors" href="#">Bibliothèque</a>
</div>
<div className="flex items-center gap-4">
<div className="w-8 h-8 rounded-full bg-primary-fixed-dim overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-140.png" alt="Close-up portrait of a distinguished academic professor with short graying hair, wearing professional spectacles and a charcoal blazer. The background is a blurred office with bookshelves, maintaining a high-key, professional, and trustworthy light-mode aesthetic for a corporate dashboard." />
</div>
</div>
</header>
<div className="flex min-h-screen">

<aside className="hidden md:flex flex-col border-r border-outline-variant h-[calc(100vh-64px)] w-[280px] sticky top-16 bg-surface dark:bg-surface-dim">
<div className="p-6 flex items-center gap-4 border-b border-surface-container-low">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-141.png" alt="Professional circular profile avatar of Dr. Aris Thorne, a senior faculty member. He has a warm, intelligent expression, set against a minimalist clean white background. The lighting is soft and even, highlighting professional competence and academic reliability." />
</div>
<div>
<p className="font-title-md text-title-md text-on-surface">Dr. Aris Thorne</p>
<p className="font-label-md text-label-md text-on-surface-variant">Expert Senior</p>
</div>
</div>
<nav className="flex-1 py-4 space-y-1">
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-full" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 bg-secondary-container text-on-secondary-container rounded-full mx-2 font-bold" href="#">
<span className="material-symbols-outlined">explore</span>
<span className="font-label-md text-label-md">Explorateur</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-full" href="#">
<span className="material-symbols-outlined">verified</span>
<span className="font-label-md text-label-md">Validation</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-full" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-md text-label-md">Bibliothèque</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all mx-2 rounded-full mt-auto" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-label-md text-label-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 pb-24 md:pb-8">

<section className="p-gutter md:px-container-desktop md:pt-10 space-y-6">
<div className="max-w-4xl space-y-2">
<h1 className="font-headline-lg text-headline-lg text-primary">Explorateur de fiches</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Accédez à l'excellence pédagogique. Recherchez des fiches de révision certifiées par nos experts académiques.</p>
</div>
<div className="flex flex-col md:flex-row gap-4 max-w-5xl">
<div className="relative flex-1 group">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
<input className="w-full pl-12 pr-4 py-4 rounded-xl border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary/10 bg-white transition-all font-body-md text-body-md outline-none" placeholder="Rechercher un sujet, un concept ou un auteur..." type="text" />
</div>
<button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-outline-variant rounded-xl text-primary font-bold hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined">tune</span>
<span className="font-label-md text-label-md">Filtres</span>
</button>
<button className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all">
                        Rechercher
                    </button>
</div>

<div className="flex items-center gap-3 overflow-x-auto hide-scrollbar pb-2 pt-2">
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-primary text-white font-label-md text-label-md">Tout</button>
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md text-label-md">Mathématiques</button>
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md text-label-md">Physique-Chimie</button>
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md text-label-md">Français</button>
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md text-label-md">SVT</button>
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md text-label-md">Histoire-Géo</button>
<button className="whitespace-nowrap px-6 py-2 rounded-full bg-white border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors font-label-md text-label-md">Philosophie</button>
</div>
</section>

<section className="py-8 space-y-6">
<div className="px-gutter md:px-container-desktop flex items-center justify-between">
<h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-validation-amber" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                        Fiches à la Une
                    </h2>
<a className="text-primary font-bold font-label-md text-label-md hover:underline" href="#">Voir tout</a>
</div>
<div className="flex gap-6 overflow-x-auto hide-scrollbar px-gutter md:px-container-desktop mask-carousel pb-6">

<div className="min-w-[320px] md:min-w-[400px] group bg-white border border-surface-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div className="h-48 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-142.png" alt="A complex chalkboard drawing of mathematical probability trees and Venn diagrams, styled with clean white chalk on a professional deep blue slate background. High intellectual clarity, minimalist academic aesthetic, soft studio lighting emphasizing mathematical precision." />
<div className="absolute top-4 left-4 flex gap-2">
<span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-expert-purple font-label-md text-label-md flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span> Expert Approved
                                </span>
</div>
</div>
<div className="p-6 space-y-4">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-primary uppercase tracking-wider">Mathématiques</p>
<h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">Les Probabilités Conditionnelles</h3>
</div>
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">4.9</span>
</div>
</div>
<div className="flex items-center gap-3 pt-2">
<div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-143.png" alt="Close-up professional portrait of a senior mathematics professor with a kind smile and sharp eyes, wearing a light blue dress shirt. Clean, bright, academic environment with natural sunlight filtering through, creating a sense of reliability and expert pedagogical authority." />
</div>
<span className="font-body-md text-body-md text-on-surface-variant">Pr. Lucas Moreau</span>
</div>
</div>
</div>

<div className="min-w-[320px] md:min-w-[400px] group bg-white border border-surface-border rounded-xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
<div className="h-48 relative overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-144.png" alt="Highly detailed architectural concept of a molecular structure, glowing with soft neon-emerald light in a dark, clean scientific laboratory setting. Professional photography style, shallow depth of field, sharp focus on atomic bonds, minimalist and modern scientific aesthetic." />
<div className="absolute top-4 left-4 flex gap-2">
<span className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-expert-purple font-label-md text-label-md flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span> Expert Approved
                                </span>
</div>
</div>
<div className="p-6 space-y-4">
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-impact-emerald uppercase tracking-wider">Physique-Chimie</p>
<h3 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors">La Structure de l'Atome</h3>
</div>
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">4.8</span>
</div>
</div>
<div className="flex items-center gap-3 pt-2">
<div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-145.png" alt="Portrait of a female physicist researcher in a modern lab environment, wearing professional attire and looking focused yet approachable. High-quality lighting, professional academic setting with blurred glass equipment in the background, cool-toned color palette of blues and whites." />
</div>
<span className="font-body-md text-body-md text-on-surface-variant">Dr. Clara Vallet</span>
</div>
</div>
</div>
</div>
</section>

<section className="p-gutter md:px-container-desktop space-y-8">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<h2 className="font-headline-md text-headline-md text-on-surface">Toutes les Fiches</h2>
<div className="flex flex-wrap items-center gap-3">
<span className="font-label-md text-label-md text-on-surface-variant">Trier par:</span>
<select className="bg-white border-outline-variant rounded-lg font-label-md text-label-md px-4 py-2 focus:border-primary outline-none text-on-surface">
<option>Plus récentes</option>
<option>Mieux notées</option>
<option>Plus populaires</option>
</select>
<div className="h-6 w-[1px] bg-outline-variant mx-2 hidden md:block"></div>
<div className="flex items-center gap-1">
<button className="p-2 text-primary bg-secondary-container rounded-lg">
<span className="material-symbols-outlined">grid_view</span>
</button>
<button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors">
<span className="material-symbols-outlined">view_list</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-white border border-surface-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all group cursor-pointer relative">
<div className="flex justify-between items-start mb-4">
<span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-full">Terminale C</span>
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">4.7</span>
</div>
</div>
<div className="space-y-1 mb-6">
<h4 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">Synthèse Organique</h4>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Comprendre les mécanismes réactionnels de base et les protocoles expérimentaux en chimie organique.</p>
</div>
<div className="flex items-center justify-between mt-auto border-t border-surface-container-low pt-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-146.png" alt="Small circular avatar of an academic tutor, smiling with professional confidence. Neutral background, clean lighting, focus on a friendly and knowledgeable appearance for a digital education platform." />
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Jean Dupont</span>
</div>
<span className="flex items-center gap-1 text-expert-purple font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                                Certifié
                            </span>
</div>
</div>

<div className="bg-white border border-surface-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all group cursor-pointer relative">
<div className="flex justify-between items-start mb-4">
<span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-full">Seconde</span>
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">4.5</span>
</div>
</div>
<div className="space-y-1 mb-6">
<h4 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">Les Figures de Style</h4>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Récapitulatif complet des métaphores, oxymores et autres procédés littéraires essentiels.</p>
</div>
<div className="flex items-center justify-between mt-auto border-t border-surface-container-low pt-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-147.png" alt="Small circular avatar of a female literature professor, wearing elegant glasses and a warm smile. Studio lighting, bright light-mode aesthetic, focus on wisdom and approachability for academic guidance." />
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Sophie Martin</span>
</div>
<span className="flex items-center gap-1 text-expert-purple font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                                Certifié
                            </span>
</div>
</div>

<div className="bg-white border border-surface-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all group cursor-pointer relative">
<div className="flex justify-between items-start mb-4">
<span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-full">Terminale D</span>
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">4.9</span>
</div>
</div>
<div className="space-y-1 mb-6">
<h4 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">Génétique et Évolution</h4>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">L'essentiel sur la méiose, la fécondation et la diversification génétique du vivant.</p>
</div>
<div className="flex items-center justify-between mt-auto border-t border-surface-container-low pt-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-148.png" alt="Portrait of a young academic researcher in biology. He wears a neutral polo shirt and has a focused, intelligent gaze. Clean white studio background, high key lighting, conveying professional scientific expertise." />
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Marc Lefebvre</span>
</div>
<span className="flex items-center gap-1 text-expert-purple font-label-md text-label-md">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                                Certifié
                            </span>
</div>
</div>

<div className="bg-white border border-surface-border rounded-xl p-5 hover:border-primary hover:shadow-md transition-all group cursor-pointer relative">
<div className="flex justify-between items-start mb-4">
<span className="px-3 py-1 bg-surface-container-low text-on-surface-variant font-label-md text-label-md rounded-full">Première</span>
<div className="flex items-center gap-1 text-validation-amber">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="font-label-md text-label-md">4.6</span>
</div>
</div>
<div className="space-y-1 mb-6">
<h4 className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-1">Géopolitique du Monde</h4>
<p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">Analyse des rapports de force mondiaux et des zones de tensions actuelles.</p>
</div>
<div className="flex items-center justify-between mt-auto border-t border-surface-container-low pt-4">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-surface-container-high overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-149.png" alt="Professional profile of a geography academic, featuring a calm demeanor and professional attire. Bright, light-mode aesthetic background with a soft blurred map, emphasizing global academic expertise and authority." />
</div>
<span className="font-label-md text-label-md text-on-surface-variant">Dr. Amélie Roche</span>
</div>
<div className="w-2 h-2 rounded-full bg-outline-variant"></div>
<span className="font-label-md text-label-md text-on-surface-variant">Top Auteur</span>
</div>
</div>

</div>

<div className="flex justify-center pt-8">
<button className="px-8 py-3 border border-outline text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all">
                        Charger plus de fiches
                    </button>
</div>
</section>
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 pb-safe bg-surface dark:bg-surface-dim border-t border-outline-variant z-50">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">search</span>
<span className="font-label-md text-label-md">Rechercher</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">auto_stories</span>
<span className="font-label-md text-label-md">Bibliothèque</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant scale-95 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>

<button className="fixed right-6 bottom-24 md:bottom-10 bg-primary text-white w-14 h-14 rounded-full shadow-lg hover:shadow-primary/40 flex items-center justify-center transition-all group active:scale-90">
<span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
</button>
<script>
        // Simple logic for category switching
        const chips = document.querySelectorAll('.overflow-x-auto button');
        chips.forEach(chip =&gt; &#123;
            chip.addEventListener('click', () =&gt; &#123;
                chips.forEach(c =&gt; &#123;
                    c.classList.remove('bg-primary', 'text-white');
                    c.classList.add('bg-white', 'border', 'border-outline-variant', 'text-on-surface-variant');
                &#125;);
                chip.classList.add('bg-primary', 'text-white');
                chip.classList.remove('bg-white', 'border', 'border-outline-variant', 'text-on-surface-variant');
            &#125;);
        &#125;);

        // Search Bar Focus Effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () =&gt; &#123;
            searchInput.parentElement.classList.add('scale-[1.01]');
        &#125;);
        searchInput.addEventListener('blur', () =&gt; &#123;
            searchInput.parentElement.classList.remove('scale-[1.01]');
        &#125;);
    </script>

    </div>
  );
}
