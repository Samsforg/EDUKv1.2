import type { Metadata } from "next";

export const metadata: Metadata = { title: "Chargement en cours... | Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body selection:bg-primary-fixed selection:text-on-primary-fixed" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-primary dark:bg-primary-container shadow-sm">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-on-primary opacity-20"></div>
<span className="font-headline text-headline-md font-semibold text-on-primary">Edukora</span>
</div>
<div className="w-10 h-10 rounded-full bg-on-primary opacity-20"></div>
</header>

<main className="pt-20 pb-24 px-4 max-w-2xl mx-auto space-y-6">

<section className="space-y-2">
<div className="h-8 w-48 rounded-lg animate-skeleton"></div>
<div className="h-4 w-64 rounded-lg animate-skeleton opacity-60"></div>
</section>

<section className="w-full h-28 rounded-xl animate-skeleton flex flex-col justify-end p-4 gap-2">
<div className="h-4 w-1/3 rounded bg-surface-container-highest opacity-50"></div>
<div className="h-2 w-full rounded-full bg-surface-container-highest opacity-30"></div>
</section>

<section className="space-y-4">
<div className="flex justify-between items-center">
<div className="h-6 w-32 rounded-lg animate-skeleton"></div>
<div className="h-4 w-16 rounded-lg animate-skeleton opacity-50"></div>
</div>
<div className="w-full h-48 rounded-xl animate-skeleton relative overflow-hidden flex flex-col justify-between p-6">
<div className="flex gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest opacity-40"></div>
<div className="space-y-2 flex-1">
<div className="h-5 w-3/4 rounded bg-surface-container-highest opacity-50"></div>
<div className="h-3 w-1/2 rounded bg-surface-container-highest opacity-30"></div>
</div>
</div>
<div className="h-10 w-full rounded-lg bg-surface-container-highest opacity-40"></div>
</div>
</section>

<section className="space-y-4">
<div className="h-6 w-40 rounded-lg animate-skeleton"></div>
<div className="grid grid-cols-1 gap-3">

<div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
<div className="w-12 h-12 rounded-lg animate-skeleton"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-1/3 rounded animate-skeleton"></div>
<div className="h-3 w-1/4 rounded animate-skeleton opacity-60"></div>
</div>
<div className="w-6 h-6 rounded-full animate-skeleton"></div>
</div>

<div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
<div className="w-12 h-12 rounded-lg animate-skeleton"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-1/2 rounded animate-skeleton"></div>
<div className="h-3 w-1/5 rounded animate-skeleton opacity-60"></div>
</div>
<div className="w-6 h-6 rounded-full animate-skeleton"></div>
</div>

<div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
<div className="w-12 h-12 rounded-lg animate-skeleton"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-1/4 rounded animate-skeleton"></div>
<div className="h-3 w-1/3 rounded animate-skeleton opacity-60"></div>
</div>
<div className="w-6 h-6 rounded-full animate-skeleton"></div>
</div>

<div className="flex items-center gap-4 p-4 rounded-xl border border-outline-variant bg-surface-container-lowest">
<div className="w-12 h-12 rounded-lg animate-skeleton"></div>
<div className="flex-1 space-y-2">
<div className="h-4 w-2/5 rounded animate-skeleton"></div>
<div className="h-3 w-1/4 rounded animate-skeleton opacity-60"></div>
</div>
<div className="w-6 h-6 rounded-full animate-skeleton"></div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 pb-safe bg-surface dark:bg-surface-container shadow-lg border-t border-outline-variant dark:border-outline">
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-all">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant opacity-40">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant opacity-40">
<span className="material-symbols-outlined">leaderboard</span>
<span className="font-label text-label-xs font-medium">Classement</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant opacity-40">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label text-label-xs font-medium">Stats</span>
</div>
</nav>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            // Simulated subtle atmospheric effect - slowly moving gradient on skeletons
            const skeletons = document.querySelectorAll('.animate-skeleton');
            skeletons.forEach((s, index) =&gt; &#123;
                s.style.animationDelay = `$&#123;index * 0.15&#125;s`;
            &#125;);
            
            // Console notice for visual debugging
            console.log("Edukora Skeleton Screen Loaded.");
        &#125;);
    </script>

    </div>
  );
}
