import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mur des Trophées - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-md flex justify-between items-center px-4 py-3">
<div className="flex items-center gap-3">
<button className="text-on-primary active:scale-95 duration-150 p-1 rounded-full hover:bg-primary-container/20 transition-colors">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<span className="font-headline text-headline-md font-bold text-on-primary tracking-tight">Mur des Trophées</span>
</div>
<button className="text-on-primary active:scale-95 duration-150 p-1 rounded-full hover:bg-primary-container/20 transition-colors">
<span className="material-symbols-outlined">share</span>
</button>
</header>
<main className="pt-20 px-4 max-w-5xl mx-auto space-y-8">

<section className="relative overflow-hidden bg-primary-container rounded-xl p-6 text-on-primary shadow-lg border border-outline-variant/20">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-[120px]" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-4">
<div className="w-24 h-24 rounded-full border-4 border-secondary-container p-1 bg-surface shadow-xl">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-261.png" alt="A professional portrait of a confident West African student, late teens, smiling warmly with academic pride. The lighting is soft and studio-quality, emphasizing a modern light-mode aesthetic. The background is a clean, academic blue gradient. High detail, photorealistic style for a professional educational profile." />
</div>
<div>
<h1 className="text-3xl font-extrabold text-white leading-tight">Mamadou Kouassi</h1>
<div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary-container text-on-secondary-container rounded-full mt-2 font-semibold text-sm">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        Ambassadeur de l'Excellence
                    </div>
<p className="mt-4 text-on-primary-container font-medium max-w-md">
                        Porte-étendard de la réussite académique à Cocody. En route vers un BAC d'excellence avec Edukora.
                    </p>
</div>
<button className="mt-2 flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-on-secondary px-6 py-2 rounded-xl transition-all font-bold active:scale-95">
<span className="material-symbols-outlined">ios_share</span>
                    Partager mon Mur
                </button>
</div>
</section>

<section>
<div className="flex items-center justify-between mb-4">
<h2 className="text-xl font-bold text-primary flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
                    Vitrine des Succès
                </h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
<div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-4 relative">
<span className="material-symbols-outlined text-6xl text-primary medal-shimmer" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
<div className="absolute -bottom-1 -right-1 bg-secondary text-white rounded-full p-1 border-2 border-white">
<span className="material-symbols-outlined text-sm">check</span>
</div>
</div>
<h3 className="font-bold text-lg text-primary">Major de Cocody</h3>
<p className="text-sm text-on-surface-variant mt-1">Meilleur score de la commune (Série C)</p>
<div className="mt-4 text-xs font-bold text-secondary-container uppercase tracking-wider">Rang National: #42</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
<div className="w-24 h-24 bg-secondary/5 rounded-full flex items-center justify-center mb-4 relative">
<span className="material-symbols-outlined text-6xl text-secondary medal-shimmer" style={{"fontVariationSettings":"'FILL' 1"}}>social_leaderboard</span>
<div className="absolute -bottom-1 -right-1 bg-secondary text-white rounded-full p-1 border-2 border-white">
<span className="material-symbols-outlined text-sm">check</span>
</div>
</div>
<h3 className="font-bold text-lg text-primary">Ligue d'Or</h3>
<p className="text-sm text-on-surface-variant mt-1">Top 1% des utilisateurs Edukora</p>
<div className="mt-4 text-xs font-bold text-secondary-container uppercase tracking-wider">Saison Académique 2024</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
<div className="w-24 h-24 bg-tertiary/5 rounded-full flex items-center justify-center mb-4 relative">
<span className="material-symbols-outlined text-6xl text-tertiary medal-shimmer" style={{"fontVariationSettings":"'FILL' 1"}}>calendar_month</span>
<div className="absolute -bottom-1 -right-1 bg-secondary text-white rounded-full p-1 border-2 border-white">
<span className="material-symbols-outlined text-sm">check</span>
</div>
</div>
<h3 className="font-bold text-lg text-primary">Discipline d'Acier</h3>
<p className="text-sm text-on-surface-variant mt-1">365 Jours de révision consécutifs</p>
<div className="mt-4 text-xs font-bold text-secondary-container uppercase tracking-wider">Objectif BAC Atteint</div>
</div>
</div>
</section>

<section>
<h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>card_membership</span>
                Diplômes et Certificats
            </h2>
<div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x">
<div className="snap-start min-w-[280px] bg-white border border-outline-variant p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
<div className="aspect-[1.414/1] bg-surface-container-low rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
<img className="w-full h-full object-cover" src="/images/ecran-262.png" alt="A highly detailed honor diploma mockup with golden seals, elegant typography, and a Côte d'Ivoire national crest watermark. The diploma is for academic excellence in Mathematics. Professional, authoritative feel with soft light-mode studio lighting and vibrant orange and blue accents." />
</div>
<div className="flex justify-between items-start">
<div>
<h4 className="font-bold text-on-surface">Certificat d'Excellence Mathématiques</h4>
<p className="text-xs text-on-surface-variant">Délivré le 12 Mars 2024</p>
</div>
<button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20">
<span className="material-symbols-outlined">visibility</span>
</button>
</div>
</div>
<div className="snap-start min-w-[280px] bg-white border border-outline-variant p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
<div className="aspect-[1.414/1] bg-surface-container-low rounded-lg mb-4 flex items-center justify-center overflow-hidden border border-outline-variant/30">
<img className="w-full h-full object-cover" src="/images/ecran-263.png" alt="A professional digital certificate of achievement for French Literature. Features elegant academic borders, a signature line, and a QR code for verification. The style is modern, corporate, and clean, using the Edukora primary blue as the main decorative color. High contrast, sharp text, academic authority." />
</div>
<div className="flex justify-between items-start">
<div>
<h4 className="font-bold text-on-surface">Maîtrise Littéraire (BAC)</h4>
<p className="text-xs text-on-surface-variant">Délivré le 05 Fév. 2024</p>
</div>
<button className="bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20">
<span className="material-symbols-outlined">visibility</span>
</button>
</div>
</div>
</div>
</section>

<section>
<h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-outline" style={{"fontVariationSettings":"'FILL' 0"}}>grid_view</span>
                Collection Complète
            </h2>
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">

<div className="flex flex-col items-center gap-2">
<div className="w-16 h-16 bg-surface-container rounded-full border-2 border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-3xl">school</span>
</div>
<span className="text-[10px] font-bold text-center uppercase text-on-surface-variant">Boursier</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="w-16 h-16 bg-surface-container rounded-full border-2 border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-3xl">local_fire_department</span>
</div>
<span className="text-[10px] font-bold text-center uppercase text-on-surface-variant">En Feu</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="w-16 h-16 bg-surface-container rounded-full border-2 border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-tertiary text-3xl">psychology</span>
</div>
<span className="text-[10px] font-bold text-center uppercase text-on-surface-variant">Génie</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="w-16 h-16 bg-surface-container rounded-full border-2 border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-primary text-3xl">groups</span>
</div>
<span className="text-[10px] font-bold text-center uppercase text-on-surface-variant">Mentor</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="w-16 h-16 bg-surface-container rounded-full border-2 border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-outline text-3xl" style={{"opacity":"0.3"}}>lock</span>
</div>
<span className="text-[10px] font-bold text-center uppercase text-on-surface-variant opacity-30">Caché</span>
</div>
<div className="flex flex-col items-center gap-2">
<div className="w-16 h-16 bg-surface-container rounded-full border-2 border-outline-variant flex items-center justify-center">
<span className="material-symbols-outlined text-outline text-3xl" style={{"opacity":"0.3"}}>lock</span>
</div>
<span className="text-[10px] font-bold text-center uppercase text-on-surface-variant opacity-30">Caché</span>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant shadow-[0_-2px_10px_rgba(0,50,125,0.08)] flex justify-around items-center px-2 py-2 pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 active:scale-90 duration-200 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 active:scale-90 duration-200 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 active:scale-90 duration-200 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-medium">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant px-2 py-1 active:scale-90 duration-200 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">emoji_events</span>
<span className="font-label text-label-xs font-medium">Défis</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 duration-200 hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for sharing
        document.querySelector('button.bg-secondary').addEventListener('click', function() &#123;
            const btn = this;
            const originalText = btn.innerHTML;
            btn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check&lt;/span&gt; Copié !';
            setTimeout(() =&gt; &#123;
                btn.innerHTML = originalText;
            &#125;, 2000);
        &#125;);
    </script>

    </div>
  );
}
