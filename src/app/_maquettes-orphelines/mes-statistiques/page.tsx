import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes Statistiques - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body antialiased" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface z-50 flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary">Mes Statistiques</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary">query_stats</span>
</button>
</header>
<main className="max-w-3xl mx-auto px-4 pt-4 pb-32 space-y-6">

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center gap-6 shadow-sm">
<div className="relative w-32 h-32 flex items-center justify-center rounded-full progress-circle">
<div className="text-center z-10">
<span className="block font-headline text-3xl font-bold text-primary">75%</span>
<span className="text-[10px] uppercase tracking-wider font-bold text-outline">Global</span>
</div>
</div>
<div className="flex-1 space-y-2">
<div className="inline-flex items-center px-3 py-1 bg-tertiary-container/10 text-tertiary-container rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-xs mr-1" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                    Prêt pour le BAC
                </div>
<h2 className="font-headline text-xl font-bold">Excellent travail !</h2>
<div className="flex items-center gap-2 mt-2">
<div className="flex items-center bg-secondary-container rounded-lg px-3 py-1.5 gap-2">
<span className="material-symbols-outlined text-white text-lg" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="text-white font-bold text-sm">2,450 XP</span>
</div>
<span className="text-on-surface-variant text-sm font-medium">Niveau 12</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline text-lg font-bold">Activité Hebdomadaire</h3>
<span className="text-outline text-sm">Temps d'étude (h)</span>
</div>
<div className="flex items-end justify-between h-32 gap-2">

<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary-container/20 rounded-t-lg relative" style={{"height":"40%"}}></div>
<span className="text-xs font-semibold text-outline">L</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary-container/20 rounded-t-lg relative" style={{"height":"60%"}}></div>
<span className="text-xs font-semibold text-outline">M</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-secondary-container rounded-t-lg relative" style={{"height":"90%"}}></div>
<span className="text-xs font-semibold text-primary">M</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary-container/20 rounded-t-lg relative" style={{"height":"50%"}}></div>
<span className="text-xs font-semibold text-outline">J</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary-container/20 rounded-t-lg relative" style={{"height":"75%"}}></div>
<span className="text-xs font-semibold text-outline">V</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary-container/20 rounded-t-lg relative" style={{"height":"30%"}}></div>
<span className="text-xs font-semibold text-outline">S</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary-container/20 rounded-t-lg relative" style={{"height":"20%"}}></div>
<span className="text-xs font-semibold text-outline">D</span>
</div>
</div>
</section>

<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm flex flex-col items-center text-center">
<span className="material-symbols-outlined text-secondary text-3xl mb-2">assignment_turned_in</span>
<span className="text-2xl font-bold text-primary">82%</span>
<p className="text-xs font-medium text-outline">Taux de réussite</p>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl shadow-sm flex flex-col items-center text-center">
<span className="material-symbols-outlined text-secondary text-3xl mb-2">quiz</span>
<span className="text-2xl font-bold text-primary">48</span>
<p className="text-xs font-medium text-outline">Quiz terminés</p>
</div>
</div>

<section className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<h3 className="font-headline text-lg font-bold mb-6">Maîtrise par Matière</h3>
<div className="space-y-6">

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-xl">functions</span>
</div>
<span className="font-semibold text-sm">Mathématiques</span>
</div>
<span className="text-sm font-bold text-primary">88%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-container" style={{"width":"88%"}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-xl">science</span>
</div>
<span className="font-semibold text-sm">Physique-Chimie</span>
</div>
<span className="text-sm font-bold text-primary">62%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-secondary-container" style={{"width":"62%"}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary-container text-xl">history_edu</span>
</div>
<span className="font-semibold text-sm">Français</span>
</div>
<span className="text-sm font-bold text-primary">75%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container" style={{"width":"75%"}}></div>
</div>
</div>

<div className="space-y-2">
<div className="flex justify-between items-center">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
<span className="material-symbols-outlined text-emerald-600 text-xl">eyeglasses_2</span>
</div>
<span className="font-semibold text-sm">SVT</span>
</div>
<span className="text-sm font-bold text-primary">45%</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-emerald-500" style={{"width":"45%"}}></div>
</div>
</div>
</div>
</section>

<section className="bg-primary border border-outline-variant p-6 rounded-xl shadow-md text-white relative overflow-hidden">

<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-8xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="flex items-center gap-3 mb-4">
<div className="w-10 h-10 rounded-full bg-on-primary-container flex items-center justify-center shadow-inner">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<h3 className="font-headline text-lg font-bold">Le conseil de Kora</h3>
</div>
<div className="space-y-4">
<div className="flex items-start gap-3 bg-white/10 p-3 rounded-lg border border-white/20">
<span className="material-symbols-outlined text-tertiary-fixed shrink-0">trending_up</span>
<div>
<p className="text-[10px] uppercase font-bold text-on-primary-container">Point fort</p>
<p className="text-sm font-medium">Tes performances en <span className="font-bold">Géométrie</span> sont excellentes. Tu es prêt pour les exercices de niveau BAC.</p>
</div>
</div>
<div className="flex items-start gap-3 bg-white/10 p-3 rounded-lg border border-white/20">
<span className="material-symbols-outlined text-secondary-fixed shrink-0">priority_high</span>
<div>
<p className="text-[10px] uppercase font-bold text-secondary-fixed">À travailler</p>
<p className="text-sm font-medium">L'analyse de l'<span className="font-bold">Optique</span> semble plus complexe pour toi. Je te suggère de réviser le cours n°4 demain.</p>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant shadow-md rounded-t-xl">
<div className="flex justify-around items-center h-20 px-2 w-full pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold mt-1">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold mt-1">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-95 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">bookmark</span>
<span className="font-label text-label-xs font-semibold mt-1">Favoris</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-95 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold mt-0.5">Profil</span>
</a>
</div>
</nav>
<script>
        // Micro-interactions for bars
        document.querySelectorAll('.rounded-t-lg').forEach(bar =&gt; &#123;
            bar.addEventListener('click', () =&gt; &#123;
                const h = bar.style.height;
                console.log('Value clicked:', h);
                // Potential scale animation
                bar.classList.add('opacity-80');
                setTimeout(() =&gt; bar.classList.remove('opacity-80'), 200);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
