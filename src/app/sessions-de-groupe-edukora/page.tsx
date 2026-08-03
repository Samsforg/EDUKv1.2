import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sessions de Groupe - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-sm flex items-center justify-between px-4 h-16">
<div className="flex items-center gap-4">
<button className="text-on-primary hover:bg-primary-container/20 p-2 rounded-full transition-colors">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-on-primary">Sessions de Groupe</h1>
</div>
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-329.png" alt="A professional studio portrait of a young Ivorian student wearing a clean white shirt, smiling confidently against a soft academic blue background. High-quality lighting highlights the texture of the skin and fabric, conveying a sense of academic ambition and national pride. The style is modern, sharp, and corporate, consistent with a high-end educational app." />
</div>
</div>
</header>
<main className="pt-20 px-4 max-w-5xl mx-auto">

<section className="mt-4 mb-8">
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-4 text-outline">search</span>
<input className="w-full pl-12 pr-4 py-4 rounded-xl border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-primary bg-surface-container-lowest transition-all text-body-md shadow-sm" placeholder="Rechercher par matière (Maths, Physique...)" type="text" />
<button className="absolute right-3 bg-primary text-on-primary p-2 rounded-lg">
<span className="material-symbols-outlined">tune</span>
</button>
</div>
<div className="flex gap-2 mt-4 overflow-x-auto pb-2 custom-scrollbar">
<button className="whitespace-nowrap px-4 py-2 rounded-full bg-primary text-on-primary text-label-sm">Tout</button>
<button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-primary-container/10 transition-colors">Mathématiques</button>
<button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-primary-container/10 transition-colors">Physique-Chimie</button>
<button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-primary-container/10 transition-colors">SVT</button>
<button className="whitespace-nowrap px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-label-sm hover:bg-primary-container/10 transition-colors">Philosophie</button>
</div>
</section>

<section className="mb-10">
<div className="flex justify-between items-center mb-6">
<h2 className="font-headline text-headline-md text-primary flex items-center gap-2">
<span className="relative flex h-3 w-3">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
</span>
                    Sessions en direct
                </h2>
<a className="text-primary font-semibold text-label-sm hover:underline" href="#">Voir tout</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="glass-card rounded-xl p-5 hover:shadow-md transition-all border-l-4 border-l-secondary flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<div className="flex gap-4">
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontSize":"32px"}}>functions</span>
</div>
<div>
<h3 className="font-semibold text-body-lg text-on-surface">Révision Intégrales</h3>
<p className="text-on-surface-variant text-label-sm">Par Koffi Konan • Terminale D</p>
</div>
</div>
<div className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-wider">
                            Direct
                        </div>
</div>
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">groups</span>
<span className="text-label-sm font-medium text-on-surface-variant">12/15 participants</span>
</div>
<button className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold text-label-sm shadow-sm hover:opacity-90 active:scale-95 transition-all">Rejoindre</button>
</div>
</div>

<div className="glass-card rounded-xl p-5 hover:shadow-md transition-all border-l-4 border-l-primary flex flex-col justify-between">
<div className="flex justify-between items-start mb-4">
<div className="flex gap-4">
<div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontSize":"32px"}}>biotech</span>
</div>
<div>
<h3 className="font-semibold text-body-lg text-on-surface">Physique: Optique</h3>
<p className="text-on-surface-variant text-label-sm">Par Aminata Traoré • Terminale C</p>
</div>
</div>
<div className="bg-secondary-container/20 text-on-secondary-container px-3 py-1 rounded-full text-label-xs font-bold uppercase tracking-wider">
                            Direct
                        </div>
</div>
<div className="flex items-center justify-between mt-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-outline text-sm">groups</span>
<span className="text-label-sm font-medium text-on-surface-variant">08/20 participants</span>
</div>
<button className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold text-label-sm shadow-sm hover:opacity-90 active:scale-95 transition-all">Rejoindre</button>
</div>
</div>
</div>
</section>

<section>
<div className="flex justify-between items-center mb-6">
<h2 className="font-headline text-headline-md text-primary">Mes Prochaines Sessions</h2>
</div>
<div className="space-y-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-primary-fixed text-on-primary-fixed w-16 h-16 rounded-lg">
<span className="text-label-xs font-bold uppercase">JEU</span>
<span className="text-headline-md font-bold leading-none">24</span>
</div>
<div className="flex-grow">
<h4 className="font-semibold text-body-md text-on-surface group-hover:text-primary transition-colors">Anglais: Preparation Oral BAC</h4>
<div className="flex items-center gap-4 mt-1">
<span className="text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">schedule</span> 15:30 - 17:00
                            </span>
<span className="text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">person</span> Mr. Coulibaly
                            </span>
</div>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-surface-container-highest text-on-surface-variant w-16 h-16 rounded-lg">
<span className="text-label-xs font-bold uppercase">VEN</span>
<span className="text-headline-md font-bold leading-none">25</span>
</div>
<div className="flex-grow">
<h4 className="font-semibold text-body-md text-on-surface group-hover:text-primary transition-colors">SVT: Génétique Humaine</h4>
<div className="flex items-center gap-4 mt-1">
<span className="text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">schedule</span> 10:00 - 12:00
                            </span>
<span className="text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">person</span> Groupe d'étude A
                            </span>
</div>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">chevron_right</span>
</div>
</div>
</section>

<section className="mt-12 mb-8">
<div className="relative overflow-hidden bg-primary-container text-on-primary-container rounded-2xl p-6 shadow-lg">
<div className="relative z-10 md:w-2/3">
<h3 className="font-headline text-headline-md mb-2">Étudiez mieux ensemble</h3>
<p className="text-body-md opacity-90 mb-4">Créez votre propre session de révision et invitez vos camarades pour progresser plus vite sur les sujets difficiles.</p>
<button className="bg-on-primary text-primary px-6 py-3 rounded-lg font-bold text-label-sm flex items-center gap-2 hover:bg-on-primary-container hover:text-on-primary transition-all">
<span className="material-symbols-outlined">add_circle</span>
                        Lancer une session maintenant
                    </button>
</div>
<div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-20 pointer-events-none">
<span className="material-symbols-outlined" style={{"fontSize":"200px"}}>diversity_3</span>
</div>
</div>
</section>
</main>

<button className="fixed bottom-20 right-6 z-50 bg-secondary text-on-secondary h-16 w-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform group">
<span className="material-symbols-outlined" style={{"fontSize":"32px"}}>add</span>
<span className="absolute right-20 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-lg text-label-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">Créer une session</span>
</button>

<nav className="fixed bottom-0 w-full z-50 bg-surface border-t border-outline-variant shadow-md flex justify-around items-center h-16 px-2 pb-safe">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90">
<span className="material-symbols-outlined">groups</span>
<span className="font-label text-label-xs">Groupe</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-label text-label-xs">Examens</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined">timer</span>
<span className="font-label text-label-xs">Pomodoro</span>
</div>
</nav>
<script>
        // Micro-interaction for hover states
        document.querySelectorAll('.glass-card, .bg-surface-container-lowest').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-2px)';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);

        // Simple search feedback logic
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) =&gt; &#123;
            if(e.target.value.length &gt; 2) &#123;
                // Future implementation: fetch sessions
                console.log('Recherche pour:', e.target.value);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
