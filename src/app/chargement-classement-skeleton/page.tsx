import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Classement (Chargement)" };

export default function Page() {
  return (
    <div className="font-body text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-primary dark:bg-primary-container shadow-sm">
<div className="flex items-center gap-4">
<button className="text-on-primary dark:text-on-primary-container active:scale-95 duration-150">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Edukora</h1>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-051.png" alt="A professional studio portrait of a young Ivoirian student smiling warmly, wearing a neat navy blue uniform. The lighting is soft and natural, emphasizing the student's optimistic expression. The background is a blurred academic setting with warm wooden textures and soft highlights. This high-fidelity image reflects the brand's commitment to academic authority and national pride." />
</div>
</header>
<main className="pt-20 pb-24 px-4 max-w-2xl mx-auto">

<div className="flex gap-2 mb-8 overflow-x-hidden">
<div className="h-10 w-24 rounded-full skeleton-shimmer shrink-0"></div>
<div className="h-10 w-28 rounded-full skeleton-shimmer shrink-0"></div>
<div className="h-10 w-20 rounded-full skeleton-shimmer shrink-0"></div>
</div>

<div className="podium-container grid grid-cols-3 gap-2 items-end mb-12 h-64 px-2">

<div className="flex flex-col items-center">
<div className="w-20 h-20 md:w-24 md:h-24 rounded-full skeleton-shimmer border-4 border-surface-container-highest mb-3"></div>
<div className="w-16 h-4 rounded-full skeleton-shimmer mb-2"></div>
<div className="w-12 h-3 rounded-full skeleton-shimmer mb-4"></div>
<div className="w-full h-24 bg-surface-container-high rounded-t-xl opacity-60"></div>
</div>

<div className="flex flex-col items-center">
<div className="relative">
<div className="absolute -top-6 left-1/2 -translate-x-1/2">
<span className="material-symbols-outlined text-secondary-container text-3xl animate-bounce">emoji_events</span>
</div>
<div className="w-24 h-24 md:w-28 md:h-28 rounded-full skeleton-shimmer border-4 border-secondary-container mb-3 shadow-lg"></div>
</div>
<div className="w-20 h-5 rounded-full skeleton-shimmer mb-2"></div>
<div className="w-14 h-4 rounded-full skeleton-shimmer mb-4"></div>
<div className="w-full h-36 bg-primary-container rounded-t-xl opacity-40"></div>
</div>

<div className="flex flex-col items-center">
<div className="w-16 h-16 md:w-20 md:h-20 rounded-full skeleton-shimmer border-4 border-surface-container-highest mb-3"></div>
<div className="w-14 h-4 rounded-full skeleton-shimmer mb-2"></div>
<div className="w-10 h-3 rounded-full skeleton-shimmer mb-4"></div>
<div className="w-full h-16 bg-surface-container-highest rounded-t-xl opacity-60"></div>
</div>
</div>

<div className="flex justify-between items-center mb-6">
<div className="h-6 w-32 rounded-full skeleton-shimmer"></div>
<div className="h-4 w-20 rounded-full skeleton-shimmer"></div>
</div>

<div className="space-y-4">

<div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
<div className="w-6 h-6 rounded-full skeleton-shimmer text-xs flex items-center justify-center font-bold"></div>
<div className="w-12 h-12 rounded-full skeleton-shimmer"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-3/4 rounded-full skeleton-shimmer"></div>
<div className="h-3 w-1/2 rounded-full skeleton-shimmer"></div>
</div>
<div className="h-6 w-16 rounded-full skeleton-shimmer"></div>
</div>

<div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
<div className="w-6 h-6 rounded-full skeleton-shimmer"></div>
<div className="w-12 h-12 rounded-full skeleton-shimmer"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-2/3 rounded-full skeleton-shimmer"></div>
<div className="h-3 w-1/3 rounded-full skeleton-shimmer"></div>
</div>
<div className="h-6 w-16 rounded-full skeleton-shimmer"></div>
</div>

<div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
<div className="w-6 h-6 rounded-full skeleton-shimmer"></div>
<div className="w-12 h-12 rounded-full skeleton-shimmer"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-1/2 rounded-full skeleton-shimmer"></div>
<div className="h-3 w-1/4 rounded-full skeleton-shimmer"></div>
</div>
<div className="h-6 w-16 rounded-full skeleton-shimmer"></div>
</div>

<div className="flex items-center gap-4 p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
<div className="w-6 h-6 rounded-full skeleton-shimmer"></div>
<div className="w-12 h-12 rounded-full skeleton-shimmer"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-3/5 rounded-full skeleton-shimmer"></div>
<div className="h-3 w-2/5 rounded-full skeleton-shimmer"></div>
</div>
<div className="h-6 w-16 rounded-full skeleton-shimmer"></div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface dark:bg-surface-container border-t border-outline-variant dark:border-outline shadow-lg">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>leaderboard</span>
<span className="font-label text-label-xs font-medium">Classement</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs font-medium">Stats</span>
</a>
</nav>
<script>
        // Micro-interaction: Randomize skeleton widths slightly for a more natural feel
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const skeletons = document.querySelectorAll('.skeleton-shimmer');
            skeletons.forEach(s =&gt; &#123;
                if(s.classList.contains('w-3/4') || s.classList.contains('w-2/3') || s.classList.contains('w-1/2')) &#123;
                    const currentWidth = parseInt(s.classList.value.match(/w-(\d+)\/(\d+)/)[1]);
                    // Optional: adjust specific skeletons randomly if needed
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
