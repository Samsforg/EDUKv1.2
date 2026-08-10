import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Replays & Archives" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface sticky top-0 flex justify-between items-center px-4 h-16 w-full z-40 border-b border-outline-variant">
<div className="flex items-center gap-3">
<button className="material-symbols-outlined text-primary active:scale-95 duration-100">menu</button>
<h1 className="font-headline text-headline-md font-bold text-primary">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-311.png" alt="A professional close-up portrait of a West African student smiling, wearing a clean white polo shirt, against a soft blurred academic library background. The lighting is natural and bright, conveying a sense of focus and optimism. High-quality digital photography style with a professional light-mode aesthetic." />
</div>
</div>
</header>
<main className="max-w-5xl mx-auto px-4 py-6">

<div className="mb-8">
<h2 className="font-headline text-3xl font-extrabold text-primary mb-2">Replays &amp; Archives</h2>
<p className="text-on-surface-variant text-body-md">Revivez les sessions passées et accédez aux ressources à tout moment.</p>
</div>

<div className="space-y-6 mb-10">

<div className="relative group">
<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline">search</span>
</div>
<input className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-outline" placeholder="Rechercher une session (ex: Dérivées, Molière...)" type="text" />
</div>

<div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
<button className="px-6 py-2 bg-secondary-container text-on-secondary-container font-semibold rounded-full whitespace-nowrap active:scale-95 duration-150 transition-all">Tous</button>
<button className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-full whitespace-nowrap hover:bg-surface-container-highest active:scale-95 duration-150 transition-all border border-outline-variant">Maths</button>
<button className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-full whitespace-nowrap hover:bg-surface-container-highest active:scale-95 duration-150 transition-all border border-outline-variant">Physique</button>
<button className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-full whitespace-nowrap hover:bg-surface-container-highest active:scale-95 duration-150 transition-all border border-outline-variant">SVT</button>
<button className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-full whitespace-nowrap hover:bg-surface-container-highest active:scale-95 duration-150 transition-all border border-outline-variant">Français</button>
<button className="px-6 py-2 bg-surface-container-high text-on-surface-variant font-medium rounded-full whitespace-nowrap hover:bg-surface-container-highest active:scale-95 duration-150 transition-all border border-outline-variant">Anglais</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-8">

<article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">

<div className="relative aspect-video w-full overflow-hidden cursor-pointer">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-312.png" alt="A cinematic classroom scene where a math professor is writing complex calculus equations on a wide green chalkboard. The shot is captured from a student's perspective, emphasizing the scale of the lesson. The lighting is crisp and academic, using the deep blue and orange palette of Edukora. High resolution, professional educational content photography." />
<div className="absolute inset-0 flex items-center justify-center play-button-overlay opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-white text-6xl" style={{"fontVariationSettings":"'FILL' 1"}}>play_circle</span>
</div>
<div className="absolute bottom-3 right-3 bg-black/70 text-white text-label-xs px-2 py-1 rounded">
                        45:12
                    </div>
<div className="absolute top-3 left-3 bg-primary text-on-primary text-label-xs px-3 py-1 rounded-full font-bold">
                        MATHS
                    </div>
</div>

<div className="p-5">
<div className="flex justify-between items-start mb-3">
<h3 className="font-headline text-lg font-bold text-on-surface leading-tight">Révision : Intégrales &amp; Primitives</h3>
<span className="material-symbols-outlined text-secondary-container" title="Ressources PDF disponibles">description</span>
</div>

<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-313.png" alt="Close up professional portrait of a male professor in his 40s, wearing glasses and a smart casual blazer. He has a friendly and authoritative demeanor, typical of a master teacher in Côte d'Ivoire. The lighting is soft studio quality with a warm, encouraging atmosphere. Minimalist white background." />
</div>
<div className="flex flex-col">
<span className="text-label-sm font-semibold text-on-surface">M. Koffi Kouadio</span>
<span className="text-label-xs text-on-surface-variant">Expert BAC C/D</span>
</div>
</div>
<div className="flex items-center gap-4 text-on-surface-variant text-label-xs mb-6">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>12 Oct 2023</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">group</span>
<span>1,240 vues</span>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-3">
<h4 className="text-label-xs font-bold text-primary uppercase tracking-wider mb-2">Moments Clés</h4>
<ul className="space-y-1">
<li className="flex items-center gap-2 group/moment cursor-pointer">
<span className="text-primary text-label-xs font-bold w-12">05:12</span>
<span className="text-label-sm text-on-surface-variant group-hover/moment:text-primary transition-colors">Formule de base</span>
</li>
<li className="flex items-center gap-2 group/moment cursor-pointer">
<span className="text-primary text-label-xs font-bold w-12">12:45</span>
<span className="text-label-sm text-on-surface-variant group-hover/moment:text-primary transition-colors">Exercice d'application 1</span>
</li>
<li className="flex items-center gap-2 group/moment cursor-pointer">
<span className="text-primary text-label-xs font-bold w-12">32:10</span>
<span className="text-label-sm text-on-surface-variant group-hover/moment:text-primary transition-colors">Astuces calcul rapide</span>
</li>
</ul>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden border border-outline-variant shadow-sm hover:shadow-md transition-shadow group">

<div className="relative aspect-video w-full overflow-hidden cursor-pointer">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-314.png" alt="A physics lab setup with prisms and laser beams demonstrating light refraction. The environment is dark with vibrant neon laser lines, giving a scientific and modern edge. The image is clean, sharp, and educational. High contrast between the dark lab and the bright beams. Professional educational documentary style." />
<div className="absolute inset-0 flex items-center justify-center play-button-overlay opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-white text-6xl" style={{"fontVariationSettings":"'FILL' 1"}}>play_circle</span>
</div>
<div className="absolute bottom-3 right-3 bg-black/70 text-white text-label-xs px-2 py-1 rounded">
                        52:30
                    </div>
<div className="absolute top-3 left-3 bg-tertiary text-on-tertiary text-label-xs px-3 py-1 rounded-full font-bold">
                        PHYSIQUE
                    </div>
</div>

<div className="p-5">
<div className="flex justify-between items-start mb-3">
<h3 className="font-headline text-lg font-bold text-on-surface leading-tight">Optique : Lentilles &amp; Réfraction</h3>
<span className="material-symbols-outlined text-secondary-container" title="Ressources PDF disponibles">description</span>
</div>

<div className="flex items-center gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-315.png" alt="Professional portrait of a female teacher in her 30s, wearing a modern African print top. She has a confident and engaging look, with a bright smile. The lighting is professional, high-key, and friendly. Background is a clean, modern white office space. Digital photography for a high-end educational platform." />
</div>
<div className="flex flex-col">
<span className="text-label-sm font-semibold text-on-surface">Mme Aminata Traoré</span>
<span className="text-label-xs text-on-surface-variant">Expert Sciences</span>
</div>
</div>
<div className="flex items-center gap-4 text-on-surface-variant text-label-xs mb-6">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_month</span>
<span>10 Oct 2023</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">group</span>
<span>856 vues</span>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-3">
<h4 className="text-label-xs font-bold text-primary uppercase tracking-wider mb-2">Moments Clés</h4>
<ul className="space-y-1">
<li className="flex items-center gap-2 group/moment cursor-pointer">
<span className="text-primary text-label-xs font-bold w-12">02:40</span>
<span className="text-label-sm text-on-surface-variant group-hover/moment:text-primary transition-colors">Loi de Snell-Descartes</span>
</li>
<li className="flex items-center gap-2 group/moment cursor-pointer">
<span className="text-primary text-label-xs font-bold w-12">15:20</span>
<span className="text-label-sm text-on-surface-variant group-hover/moment:text-primary transition-colors">Lentilles convergentes</span>
</li>
<li className="flex items-center gap-2 group/moment cursor-pointer">
<span className="text-primary text-label-xs font-bold w-12">40:05</span>
<span className="text-label-sm text-on-surface-variant group-hover/moment:text-primary transition-colors">Construction d'images</span>
</li>
</ul>
</div>
</div>
</article>
</div>

<div className="mt-12 flex justify-center">
<button className="flex items-center gap-2 px-8 py-3 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary-fixed transition-colors active:scale-95">
<span>Charger plus de replays</span>
<span className="material-symbols-outlined">expand_more</span>
</button>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-3 bg-surface border-t border-outline-variant z-50 rounded-t-lg shadow-md">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200 cursor-pointer">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200 cursor-pointer">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200 cursor-pointer">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200 cursor-pointer">
<span className="material-symbols-outlined">book_5</span>
<span className="font-label text-label-xs font-semibold">Biblio</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200 cursor-pointer">
<span className="material-symbols-outlined">groups</span>
<span className="font-label text-label-xs font-semibold">Communauté</span>
</div>
</nav>
<script>
        // Simple Interaction logic for filters
        const filters = document.querySelectorAll('.filter-chip');
        filters.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                filters.forEach(b =&gt; &#123;
                    b.classList.remove('bg-secondary-container', 'text-on-secondary-container');
                    b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
                &#125;);
                btn.classList.add('bg-secondary-container', 'text-on-secondary-container');
                btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            &#125;);
        &#125;);

        // Search highlight effect
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
