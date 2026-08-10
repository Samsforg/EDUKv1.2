import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Ligues Académiques" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface-container-low border-b border-surface-border dark:border-outline-variant">
<div className="flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full max-w-7xl mx-auto">
<div className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform">
<div className="w-10 h-10 rounded-full overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-212.png" alt="A professional studio portrait of a distinguished university professor in their late 40s with a warm smile. They are wearing a navy blue blazer over a crisp white shirt. The background is a blurred academic library with soft, warm lighting that emphasizes a modern, light-mode corporate aesthetic. High resolution, professional photography." />
</div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-4">
<div className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-variant transition-colors cursor-pointer active:scale-95 transition-transform text-on-surface-variant dark:text-outline">
<span className="material-symbols-outlined">notifications</span>
</div>
</div>
</div>
</header>

<main className="pt-24 pb-32 px-container-padding-mobile md:px-container-padding-desktop max-w-7xl mx-auto">

<section className="mb-stack-md flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<div className="flex items-center gap-2 mb-2">
<span className="px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full font-label-md text-label-md flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                        Ligue des Communes
                    </span>
</div>
<h2 className="font-headline-lg text-headline-lg text-primary mb-1">Ligues Académiques</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">Rejoignez l'élite intellectuelle de votre commune. Progressez à travers les paliers en validant vos cours et en tutorant vos pairs.</p>
</div>
<button className="bg-primary text-white px-6 py-3 rounded-[4px] font-bold text-body-md hover:bg-primary-container transition-all flex items-center gap-2 shadow-sm">
<span className="material-symbols-outlined text-[18px]">gavel</span>
                Règlement des ligues
            </button>
</section>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<div className="md:col-span-4 flex flex-col gap-6">

<div className="bg-white border border-surface-border rounded-lg p-6 flex flex-col items-center text-center relative overflow-hidden group">
<div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
<span className="material-symbols-outlined text-[120px]">military_tech</span>
</div>
<div className="w-32 h-32 mb-4 relative">
<div className="absolute inset-0 bg-secondary-fixed opacity-20 rounded-full animate-pulse"></div>
<div className="relative z-10 w-full h-full flex items-center justify-center">
<span className="material-symbols-outlined text-[80px] text-on-secondary-fixed-variant" style={{"fontVariationSettings":"'FILL' 1"}}>shield</span>
</div>
</div>
<h3 className="font-title-md text-title-md text-on-surface-variant mb-1">Votre Ligue Actuelle</h3>
<div className="font-metric-num text-metric-num text-primary mb-2">Argent</div>
<div className="font-label-md text-label-md text-impact-emerald bg-impact-emerald/10 px-3 py-1 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">trending_up</span>
                        Top 5% à Cocody
                    </div>
<div className="w-full mt-8 text-left">
<div className="flex justify-between font-label-md text-label-md mb-2 text-on-surface-variant">
<span>Progression vers Or</span>
<span>1,240 / 2,000 XP</span>
</div>
<div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
<div className="h-full bg-primary-container" style={{"width":"62%"}}></div>
</div>
</div>
</div>

<div className="bg-white border border-surface-border rounded-lg p-6">
<h3 className="font-title-md text-title-md mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">location_on</span>
                        Focus: Cocody
                    </h3>
<div className="space-y-4">
<div className="flex justify-between items-center py-2 border-b border-surface-border">
<span className="font-body-md text-body-md text-on-surface-variant">Position Locale</span>
<span className="font-title-md text-title-md text-primary">#42</span>
</div>
<div className="flex justify-between items-center py-2 border-b border-surface-border">
<span className="font-body-md text-body-md text-on-surface-variant">Membres Actifs</span>
<span className="font-title-md text-title-md text-primary">2,840</span>
</div>
<div className="flex justify-between items-center py-2">
<span className="font-body-md text-body-md text-on-surface-variant">Points de Commune</span>
<span className="font-title-md text-title-md text-primary">124k</span>
</div>
</div>
</div>
</div>

<div className="md:col-span-8 flex flex-col gap-4">
<div className="bg-white border border-surface-border rounded-lg overflow-hidden">
<div className="p-6 border-b border-surface-border flex justify-between items-center">
<h3 className="font-title-md text-title-md">Parcours des Échelons</h3>
<span className="font-label-md text-label-md text-on-surface-variant uppercase">Hiérarchie Académique</span>
</div>

<div className="divide-y divide-surface-border">

<div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors group">
<div className="w-16 h-16 rounded-full bg-on-tertiary-fixed flex items-center justify-center text-tertiary-fixed shadow-sm">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div className="flex-grow">
<h4 className="font-title-md text-title-md text-on-surface">Ligue Maître</h4>
<p className="font-body-md text-body-md text-on-surface-variant">L'apogée de l'excellence académique. Accès exclusif aux conseils d'administration.</p>
</div>
<div className="hidden md:block">
<span className="font-label-md text-label-md text-outline">5,000+ XP</span>
</div>
</div>

<div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors group">
<div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>diamond</span>
</div>
<div className="flex-grow">
<h4 className="font-title-md text-title-md text-on-surface">Ligue Diamant</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Experts confirmés et mentors de haut niveau. Influence régionale.</p>
</div>
<div className="hidden md:block">
<span className="font-label-md text-label-md text-outline">3,500 XP</span>
</div>
</div>

<div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors group">
<div className="w-16 h-16 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 shadow-sm border border-yellow-200">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
</div>
<div className="flex-grow">
<h4 className="font-title-md text-title-md text-on-surface">Ligue Or</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Contributeurs majeurs. Badge de certification expert débloqué.</p>
</div>
<div className="hidden md:block">
<span className="font-label-md text-label-md text-outline">2,000 XP</span>
</div>
</div>

<div className="p-6 flex items-center gap-6 league-card-active relative overflow-hidden">
<div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm border border-slate-300">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>shield</span>
</div>
<div className="flex-grow">
<div className="flex items-center gap-2">
<h4 className="font-title-md text-title-md text-on-surface">Ligue Argent</h4>
<span className="px-2 py-0.5 bg-validation-amber text-white text-[10px] rounded uppercase font-bold">Votre Échelon</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">Praticiens actifs. Participation autorisée aux ligues communales.</p>
</div>
<div className="hidden md:block">
<span className="font-label-md text-label-md text-primary font-bold">ACTUEL</span>
</div>
</div>

<div className="p-6 flex items-center gap-6 hover:bg-surface-container-low transition-colors group opacity-60">
<div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center text-orange-700 shadow-sm">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div className="flex-grow">
<h4 className="font-title-md text-title-md text-on-surface">Ligue Bronze</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Premiers pas dans l'écosystème Edukora. Validation des bases.</p>
</div>
<div className="hidden md:block">
<span className="font-label-md text-label-md text-outline">Complété</span>
</div>
</div>
</div>
</div>

<div className="bg-primary-container text-on-primary-container p-6 rounded-lg flex gap-6 items-center">
<span className="material-symbols-outlined text-[40px]">info</span>
<div>
<h4 className="font-title-md text-title-md mb-1">Comment monter de ligue ?</h4>
<p className="font-body-md text-body-md opacity-80">Accumulez de l'XP en validant des ressources pédagogiques, en répondant aux questions des étudiants et en restant actif hebdomadairement. Les paliers sont mis à jour chaque lundi à 00h00.</p>
</div>
</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-2 pb-safe bg-surface-container-lowest dark:bg-inverse-surface border-t border-surface-border dark:border-outline-variant z-50 rounded-t-xl shadow-md dark:shadow-none">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed cursor-pointer transition-all duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed cursor-pointer transition-all duration-200">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed cursor-pointer transition-all duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-md text-label-md">IA Tuteur</span>
</div>

<div className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-fixed-dim text-on-secondary-container dark:text-on-secondary-fixed rounded-full px-4 py-1 tap-highlight-transparent active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>emoji_events</span>
<span className="font-label-md text-label-md">Ligues</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed cursor-pointer transition-all duration-200">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md">Profil</span>
</div>
</nav>
<script>
        // Micro-interactions and effects
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                button.classList.add('scale-95');
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
            button.addEventListener('mouseleave', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
        &#125;);

        // Hover animation for cards
        const cards = document.querySelectorAll('.bg-white');
        cards.forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.classList.add('bg-surface-container-low');
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.classList.remove('bg-surface-container-low');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
