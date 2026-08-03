import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ma Bibliothèque - Edukora" };

export default function Page() {
  return (
    <div className="bg-mesh text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container flex items-center justify-center">
<img className="w-full h-full object-cover" src="/images/ecran-214.png" alt="A focused young Ivorian student profile photo, high-quality professional portrait, warm lighting, wearing a modern school uniform, set against a clean academic background with soft blue and orange accents to match the Edukora brand identity." />
</div>
<span className="font-display-lg-mobile text-display-lg-mobile text-primary dark:text-primary-fixed tracking-tight font-bold">Edukora</span>
</div>
<button className="p-2 rounded-full hover:bg-surface-container-low dark:hover:bg-inverse-surface transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">notifications</span>
</button>
</header>

<main className="flex-grow flex flex-center items-center justify-center px-4 pt-16 pb-20 overflow-hidden">
<div className="max-w-md w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

<div className="relative group">

<div className="absolute -inset-4 bg-primary-container/10 rounded-[2rem] blur-2xl group-hover:bg-secondary-container/10 transition-colors duration-500"></div>

<div className="relative aspect-square w-64 mx-auto mb-6 bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden flex items-center justify-center p-8">
<img className="w-full h-full object-contain" src="/images/ecran-215.png" alt="A minimalist and friendly 3D digital illustration of a clean, modern white bookshelf that is completely empty, except for a small orange bookmark sitting on one shelf. The background is a soft Academic Blue gradient. The lighting is bright and optimistic, reflecting a high-end educational app aesthetic with Ivory Coast inspired color accents." />

<div className="absolute top-4 right-4 animate-bounce duration-[3000ms]">
<span className="material-symbols-outlined text-secondary text-4xl opacity-20">search</span>
</div>
<div className="absolute bottom-6 left-6 animate-pulse">
<span className="material-symbols-outlined text-primary text-3xl opacity-20">import_contacts</span>
</div>
</div>
</div>

<div className="space-y-3">
<h2 className="text-2xl font-bold text-on-surface tracking-tight">Votre bibliothèque est vide</h2>
<p className="text-on-surface-variant leading-relaxed px-4">
                    Commencez par explorer nos fiches de révision certifiées pour les ajouter ici.
                </p>
</div>

<div className="pt-4">
<button className="w-full sm:w-auto px-8 py-4 bg-secondary-container text-on-secondary-container font-semibold rounded-lg shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 mx-auto">
<span className="material-symbols-outlined">explore</span>
<span>Explorer les fiches</span>
</button>
<button className="mt-4 text-primary font-medium hover:underline flex items-center justify-center gap-1 mx-auto text-sm">
<span className="material-symbols-outlined text-sm">help</span>
                    Comment ça marche ?
                </button>
</div>

<div className="pt-8 opacity-60">
<p className="text-label-xs uppercase tracking-widest text-outline mb-4">Sujets populaires</p>
<div className="flex flex-wrap justify-center gap-2">
<span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium border border-outline-variant">Mathématiques</span>
<span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium border border-outline-variant">Français</span>
<span className="px-3 py-1 bg-surface-container rounded-full text-xs font-medium border border-outline-variant">Physique-Chimie</span>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-background shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe w-full px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200 p-2 rounded-lg" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200 p-2 rounded-lg" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200 p-2 rounded-lg" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple script to handle active states or light micro-interactions
        document.querySelectorAll('nav a').forEach(link =&gt; &#123;
            link.addEventListener('click', function() &#123;
                document.querySelectorAll('nav a').forEach(l =&gt; &#123;
                    l.classList.remove('bg-primary-container', 'text-on-primary-container', 'rounded-full', 'px-4', 'py-1');
                    l.classList.add('text-on-surface-variant');
                    const icon = l.querySelector('.material-symbols-outlined');
                    if(icon) icon.style.fontVariationSettings = "'FILL' 0";
                &#125;);
                this.classList.remove('text-on-surface-variant');
                this.classList.add('bg-primary-container', 'text-on-primary-container', 'rounded-full', 'px-4', 'py-1');
                const icon = this.querySelector('.material-symbols-outlined');
                if(icon) icon.style.fontVariationSettings = "'FILL' 1";
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
