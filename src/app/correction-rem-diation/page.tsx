import type { Metadata } from "next";

export const metadata: Metadata = { title: "Correction & Remédiation - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex items-center px-4 h-16 w-full sticky top-0 z-50 bg-surface border-b border-outline-variant transition-colors duration-150">
<button aria-label="Retour" className="p-2 mr-2 active:scale-95 duration-150 rounded-full hover:bg-surface-container">
<span className="material-symbols-outlined text-primary text-2xl">arrow_back</span>
</button>
<h1 className="font-headline text-2xl font-semibold text-primary truncate">Correction &amp; Remédiation</h1>
</header>
<main className="flex-grow p-4 md:p-8 max-w-4xl mx-auto w-full pb-24">

<section className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
<div className="bg-primary-container rounded-xl p-6 text-white overflow-hidden relative shadow-lg">

<div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
<div>
<p className="font-label text-on-primary-container/80 uppercase tracking-wider text-xs font-bold mb-1">Résultat Final</p>
<h2 className="font-headline text-4xl font-extrabold mb-2">Note : 14/20</h2>
<div className="inline-flex items-center px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full text-sm font-bold">
<span className="material-symbols-outlined text-sm mr-1" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
                            Mention Bien
                        </div>
</div>
<div className="w-24 h-24 relative">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<path className="text-white/20" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeWidth="3" />
<path className="text-secondary" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="70, 100" strokeLinecap="round" strokeWidth="3" />
</svg>
<div className="absolute inset-0 flex items-center justify-center font-headline font-bold text-xl">
                            70%
                        </div>
</div>
</div>
</div>
</section>

<section className="mb-10">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<h3 className="font-headline text-xl font-bold text-on-surface">Analyse de tes erreurs</h3>
</div>
<div className="space-y-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
<div className="flex justify-between items-start mb-3">
<span className="text-xs font-bold px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase">Question 4 • Algèbre</span>
<span className="flex items-center text-error font-semibold text-sm">
<span className="material-symbols-outlined text-sm mr-1">cancel</span> Incorrect
                        </span>
</div>
<p className="text-on-surface font-medium mb-4">Quelle est la primitive de la fonction f(x) = e^(2x) ?</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
<div className="p-3 bg-error-container/20 border border-error/20 rounded-lg">
<p className="text-xs text-error font-bold uppercase mb-1">Ta réponse</p>
<p className="text-on-surface line-through decoration-error/50">F(x) = 2e^(2x) + C</p>
</div>
<div className="p-3 bg-tertiary-fixed/20 border border-tertiary/20 rounded-lg">
<p className="text-xs text-tertiary font-bold uppercase mb-1">Bonne réponse</p>
<p className="text-on-surface">F(x) = ½ e^(2x) + C</p>
</div>
</div>
<button className="w-full py-2 flex items-center justify-center gap-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors text-sm active:scale-[0.98]">
<span className="material-symbols-outlined text-lg">lightbulb</span>
                        Comprendre mon erreur
                    </button>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
<div className="flex justify-between items-start mb-3">
<span className="text-xs font-bold px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase">Question 7 • Intégration</span>
<span className="flex items-center text-secondary font-semibold text-sm">
<span className="material-symbols-outlined text-sm mr-1">error</span> Partiel
                        </span>
</div>
<p className="text-on-surface font-medium mb-4">Calculez l'intégrale de 0 à 1 de (3x² + 1) dx.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
<div className="p-3 bg-error-container/20 border border-error/20 rounded-lg">
<p className="text-xs text-error font-bold uppercase mb-1">Ta réponse</p>
<p className="text-on-surface">1</p>
</div>
<div className="p-3 bg-tertiary-fixed/20 border border-tertiary/20 rounded-lg">
<p className="text-xs text-tertiary font-bold uppercase mb-1">Bonne réponse</p>
<p className="text-on-surface">2</p>
</div>
</div>
<button className="w-full py-2 flex items-center justify-center gap-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors text-sm active:scale-[0.98]">
<span className="material-symbols-outlined text-lg">lightbulb</span>
                        Comprendre mon erreur
                    </button>
</div>
</div>
</section>

<section className="mb-10">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>auto_stories</span>
<h3 className="font-headline text-xl font-bold text-on-surface">Ressources suggérées</h3>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-outline-variant hover:shadow-md transition-all">
<div className="h-32 bg-surface-container relative">
<img className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" src="/images/ecran-089.png" alt="A clean academic illustration representing mathematical integration and calculus, featuring abstract blue and orange geometric curves on a bright white background, professional and educational style." />
<div className="absolute top-2 right-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded">PRÉREQUIS</div>
</div>
<div className="p-4">
<h4 className="font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Fiche : Calcul d'intégrales</h4>
<p className="text-sm text-on-surface-variant line-clamp-2">Maîtrisez les méthodes fondamentales du calcul intégral pour le BAC.</p>
<div className="mt-3 flex items-center justify-between text-xs text-outline font-medium">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> 12 min</span>
<span className="flex items-center gap-1 text-tertiary"><span className="material-symbols-outlined text-sm">check_circle</span> 450 élèves</span>
</div>
</div>
</div>

<div className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-outline-variant hover:shadow-md transition-all">
<div className="h-32 bg-surface-container relative">
<img className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" src="/images/ecran-090.png" alt="Educational visual for mathematical primitives, showing clear notation and formulas in a corporate blue and orange academic color scheme, minimalist and easy to read, soft lighting." />
</div>
<div className="p-4">
<h4 className="font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Fiche : Primitives usuelles</h4>
<p className="text-sm text-on-surface-variant line-clamp-2">Tableau complet des primitives à connaître par cœur pour réussir tes examens.</p>
<div className="mt-3 flex items-center justify-between text-xs text-outline font-medium">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">timer</span> 8 min</span>
<span className="flex items-center gap-1 text-tertiary"><span className="material-symbols-outlined text-sm">check_circle</span> 890 élèves</span>
</div>
</div>
</div>
</div>
</section>

<section>
<div className="bg-secondary-container text-on-secondary-container rounded-xl p-5 flex flex-col md:flex-row items-center gap-5 shadow-sm border-l-4 border-secondary">
<div className="p-3 bg-white/20 rounded-full">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<div className="text-center md:text-left flex-grow">
<h4 className="font-headline font-bold text-lg">Besoin d'explications personnalisées ?</h4>
<p className="text-sm opacity-90">Ton Tuteur IA a analysé tes erreurs et peut t'expliquer pourquoi tu t'es trompé.</p>
</div>
<button className="whitespace-nowrap px-6 py-2.5 bg-on-secondary-container text-white rounded-full font-bold shadow-md hover:scale-105 transition-transform active:scale-95 flex items-center gap-2">
                    Discuter avec l'IA
                    <span className="material-symbols-outlined text-sm">send</span>
</button>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface-container-lowest shadow-md rounded-t-xl md:hidden">
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 transition-transform duration-200 active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label text-label-sm font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-sm font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-sm font-medium">tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-sm font-medium">Profil</span>
</a>
</nav>

<div className="hidden md:block fixed bottom-8 right-8 z-50">
<button className="flex items-center gap-3 px-6 py-4 bg-primary text-white rounded-full shadow-2xl hover:bg-primary-container transition-all active:scale-95 group">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<span className="font-bold">Parler au Tuteur IA</span>
<span className="bg-secondary text-white text-[10px] px-1.5 py-0.5 rounded-full group-hover:animate-bounce">NOUVEAU</span>
</button>
</div>
<script>
        // Simple micro-interaction for the "Comprendre mon erreur" buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            if(btn.innerText.includes('Comprendre mon erreur')) &#123;
                btn.addEventListener('click', () =&gt; &#123;
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Analyse en cours...';
                    setTimeout(() =&gt; &#123;
                        btn.innerHTML = originalText;
                        alert("Le Tuteur IA prépare une explication personnalisée sur cette notion.");
                    &#125;, 1000);
                &#125;);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
