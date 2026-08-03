import type { Metadata } from "next";

export const metadata: Metadata = { title: "Statistiques - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-sm h-16 flex justify-between items-center px-4">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary cursor-pointer">menu</span>
<span className="font-headline text-headline-md font-semibold text-on-primary">Edukora</span>
</div>
<div className="w-10 h-10 rounded-full skeleton border-2 border-on-primary/20"></div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-8">

<section className="flex flex-col items-center justify-center pt-4">
<div className="text-center mb-6">
<div className="h-6 w-48 skeleton rounded-lg mx-auto mb-2"></div>
<div className="h-4 w-32 skeleton rounded-lg mx-auto"></div>
</div>
<div className="relative w-64 h-64 flex items-center justify-center">

<div className="w-full h-full rounded-full border-8 border-surface-container skeleton opacity-50"></div>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<div className="h-12 w-24 skeleton rounded-lg mb-2"></div>
<div className="h-4 w-20 skeleton rounded-lg"></div>
</div>
</div>
</section>

<section className="space-y-4">
<div className="flex justify-between items-end mb-2">
<div className="h-6 w-40 skeleton rounded-lg"></div>
</div>
<div className="bg-surface-container-lowest rounded-xl p-4 border border-outline-variant space-y-6">

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="h-4 w-24 skeleton rounded-lg"></div>
<div className="h-4 w-12 skeleton rounded-lg"></div>
</div>
<div className="h-3 w-full skeleton rounded-full overflow-hidden"></div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="h-4 w-32 skeleton rounded-lg"></div>
<div className="h-4 w-12 skeleton rounded-lg"></div>
</div>
<div className="h-3 w-full skeleton rounded-full overflow-hidden"></div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="h-4 w-28 skeleton rounded-lg"></div>
<div className="h-4 w-12 skeleton rounded-lg"></div>
</div>
<div className="h-3 w-full skeleton rounded-full overflow-hidden"></div>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex flex-col gap-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg skeleton"></div>
<div className="h-5 w-24 skeleton rounded-lg"></div>
</div>
<div className="h-4 w-full skeleton rounded-lg mt-2"></div>
<div className="h-4 w-3/4 skeleton rounded-lg"></div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant flex flex-col gap-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg skeleton"></div>
<div className="h-5 w-24 skeleton rounded-lg"></div>
</div>
<div className="h-4 w-full skeleton rounded-lg mt-2"></div>
<div className="h-4 w-2/3 skeleton rounded-lg"></div>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 bg-surface border-t border-outline-variant flex justify-around items-center px-4 py-2 pb-safe shadow-lg rounded-t-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant gap-1">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant gap-1">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant gap-1">
<span className="material-symbols-outlined">leaderboard</span>
<span className="font-label text-label-xs font-medium">Classement</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 gap-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<span className="font-label text-label-xs font-medium">Stats</span>
</div>
</nav>
<script>
        // Optional: Interactive feedback or simulated load
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            console.log('Edukora Statistics Skeleton Loaded');
        &#125;);
    </script>

    </div>
  );
}
