import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mes Diplômes - Edukora" };

export default function Page() {
  return (
    <div className="min-h-screen pb-24 text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface border-b border-outline-variant flex items-center justify-between px-4 h-16 z-50">
<div className="flex items-center gap-4">
<button aria-label="Retour" className="active:scale-95 transition-transform p-2 rounded-full hover:bg-surface-container-low transition-colors text-primary">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-2xl font-semibold text-primary">Mes Diplômes</h1>
</div>
<button className="active:scale-95 transition-transform p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface-variant">
<span className="material-symbols-outlined">more_vert</span>
</button>
</header>
<main className="max-w-4xl mx-auto px-4 py-6">

<div className="mb-8 space-y-4">
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-10 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Rechercher un diplôme ou une matière..." type="text" />
</div>
<div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
<button className="px-4 py-2 bg-primary text-on-primary rounded-full text-sm font-medium whitespace-nowrap">Tous</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest">Mathématiques</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest">Français</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest">Physique-Chimie</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-sm font-medium whitespace-nowrap hover:bg-surface-container-highest">SVT</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="certificate-list">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
<div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-surface-container-low">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-227.png" alt="A formal academic certificate with a gold seal and elegant border. The document features the Edukora logo, prominent typography for Mathematics, and is set against a clean, light-mode background with soft shadows. The overall aesthetic is professional, institutional, and high-quality, reflecting academic excellence and verified achievement." />
<div className="absolute top-2 right-2 flex items-center gap-1 bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        Vérifié
                    </div>
</div>
<div className="flex-1 space-y-1">
<h3 className="font-headline text-lg font-bold text-on-surface leading-tight">Mathématiques - Analyse de Fonctions</h3>
<p className="text-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                        Obtenu le 15 Janvier 2024
                    </p>
</div>
<div className="flex gap-2 pt-2">
<button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-all hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-lg">visibility</span>
                        Voir
                    </button>
<button className="flex-1 flex items-center justify-center gap-2 bg-primary-container text-on-primary-container py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-all hover:bg-primary">
<span className="material-symbols-outlined text-lg">download</span>
                        Télécharger
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
<div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-surface-container-low">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-228.png" alt="A prestigious digital certificate for French Literature, showcasing sophisticated serif typography and a deep green forest accent representing growth. The layout is clean and minimalist, presented in a high-key studio lighting setting. The background is a soft off-white, emphasizing the official and academic nature of the Edukora certification." />
<div className="absolute top-2 right-2 flex items-center gap-1 bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        Vérifié
                    </div>
</div>
<div className="flex-1 space-y-1">
<h3 className="font-headline text-lg font-bold text-on-surface leading-tight">Français - Grammaire et Conjugaison</h3>
<p className="text-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                        Obtenu le 02 Décembre 2023
                    </p>
</div>
<div className="flex gap-2 pt-2">
<button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-all hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-lg">visibility</span>
                        Voir
                    </button>
<button className="flex-1 flex items-center justify-center gap-2 bg-primary-container text-on-primary-container py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-all hover:bg-primary">
<span className="material-symbols-outlined text-lg">download</span>
                        Télécharger
                    </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow group">
<div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-outline-variant bg-surface-container-low">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-229.png" alt="A modern academic achievement award for Physics and Chemistry, featuring a clean blue corporate design. The Edukora branding is prominent with a subtle 3D glass effect on the certificate's seal. Soft natural lighting creates a calm, studious atmosphere, with high contrast between the white paper texture and deep academic blue elements." />
<div className="absolute top-2 right-2 flex items-center gap-1 bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        Vérifié
                    </div>
</div>
<div className="flex-1 space-y-1">
<h3 className="font-headline text-lg font-bold text-on-surface leading-tight">Physique - Mécanique et Dynamique</h3>
<p className="text-sm text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
                        Obtenu le 12 Novembre 2023
                    </p>
</div>
<div className="flex gap-2 pt-2">
<button className="flex-1 flex items-center justify-center gap-2 bg-surface-container-high text-on-surface-variant py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-all hover:bg-surface-container-highest">
<span className="material-symbols-outlined text-lg">visibility</span>
                        Voir
                    </button>
<button className="flex-1 flex items-center justify-center gap-2 bg-primary-container text-on-primary-container py-2.5 rounded-lg text-sm font-semibold active:scale-95 transition-all hover:bg-primary">
<span className="material-symbols-outlined text-lg">download</span>
                        Télécharger
                    </button>
</div>
</div>
</div>

<div className="hidden flex flex-col items-center justify-center text-center py-20 px-6 animate-fade-in" id="empty-state">
<div className="w-48 h-48 mb-6 relative">
<img className="w-full h-full object-contain" src="/images/ecran-230.png" alt="A motivational 3D illustration of a student reaching for a bright golden star against a soft blue and orange cloud background. The character has an optimistic expression, symbolizing progress and academic ambition. The visual style is friendly, clean, and modern, using the Edukora brand colors to maintain consistency." />
</div>
<h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Pas encore de diplômes ?</h2>
<p className="text-on-surface-variant max-w-sm mb-8 leading-relaxed">
                Continuez vos cours et réussissez vos évaluations pour obtenir vos certifications officielles Edukora.
            </p>
<button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-xl font-bold active:scale-95 transition-all flex items-center gap-2">
<span className="material-symbols-outlined">menu_book</span>
                Commencer un cours
            </button>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface shadow-[0_-2px_8px_rgba(0,0,0,0.05)] flex justify-around items-center px-2 py-3">

<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined text-2xl">home</span>
<span className="font-label text-label-xs font-semibold mt-1">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined text-2xl">menu_book</span>
<span className="font-label text-label-xs font-semibold mt-1">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined text-2xl">smart_toy</span>
<span className="font-label text-label-xs font-semibold mt-1">tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold mt-1">Profil</span>
</a>
</nav>
<script>
        // Simple search interaction for demo
        const searchInput = document.querySelector('input[type="text"]');
        const cards = document.querySelectorAll('#certificate-list &gt; div');
        const emptyState = document.getElementById('empty-state');
        const listContainer = document.getElementById('certificate-list');

        searchInput.addEventListener('input', (e) =&gt; &#123;
            const term = e.target.value.toLowerCase();
            let visibleCount = 0;

            cards.forEach(card =&gt; &#123;
                const title = card.querySelector('h3').textContent.toLowerCase();
                if(title.includes(term)) &#123;
                    card.classList.remove('hidden');
                    visibleCount++;
                &#125; else &#123;
                    card.classList.add('hidden');
                &#125;
            &#125;);

            if (visibleCount === 0) &#123;
                listContainer.classList.add('hidden');
                emptyState.classList.remove('hidden');
            &#125; else &#123;
                listContainer.classList.remove('hidden');
                emptyState.classList.add('hidden');
            &#125;
        &#125;);
    </script>

    </div>
  );
}
