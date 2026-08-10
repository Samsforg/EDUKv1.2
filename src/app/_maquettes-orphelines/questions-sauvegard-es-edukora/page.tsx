import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Questions Sauvegardées" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body-md text-body-md selection:bg-primary-fixed selection:text-on-primary-fixed" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16 w-full">
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
<span className="material-symbols-outlined text-on-surface">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary tracking-tight">Questions Sauvegardées</h1>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-297.png" alt="A portrait of a focused West African male student in a bright classroom, representing academic success and professional determination. The lighting is natural and high-key, emphasizing a clean corporate educational environment with soft blue and white background tones. The student wears a simple professional shirt, looking directly into the camera with confidence." />
</div>
</header>
<main className="pt-20 pb-32 px-margin-mobile max-w-2xl mx-auto space-y-6">

<section className="space-y-4">

<div className="relative group">
<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline">search</span>
</div>
<input className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" placeholder="Rechercher une question..." type="text" />
</div>

<div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
<button className="bg-primary text-on-primary px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap active:scale-95 transition-transform">Tous</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Mathématiques</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Physique-Chimie</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">SVT</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap hover:bg-surface-container-highest transition-colors">Anglais</button>
</div>
</section>

<section className="space-y-4" id="questions-list">

<div className="bg-surface border border-outline-variant rounded-xl p-4 academic-shadow hover:border-primary/30 transition-colors">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-primary-fixed flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-on-primary-fixed">functions</span>
</div>
<div>
<span className="font-label-xs text-label-xs text-primary uppercase tracking-wider">Mathématiques</span>
<p className="font-label-xs text-label-xs text-outline italic">Sauvegardé le 12 Oct. 2023</p>
</div>
</div>
<button className="text-primary active:scale-125 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bookmark</span>
</button>
</div>
<p className="text-on-surface-variant font-body-md text-body-md line-clamp-3 mb-4">
                    Expliquez le théorème de Thalès dans un triangle et donnez les conditions nécessaires pour son application dans un exercice de géométrie plane.
                </p>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
<button className="flex items-center gap-2 text-primary font-label-sm text-label-sm px-2 py-1 rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px]">share</span>
                        Partager
                    </button>
<button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-label-sm text-label-sm active:scale-95 transition-transform">
                        Réviser
                    </button>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-4 academic-shadow hover:border-primary/30 transition-colors">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-tertiary-fixed-dim flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-tertiary">science</span>
</div>
<div>
<span className="font-label-xs text-label-xs text-tertiary uppercase tracking-wider">Physique-Chimie</span>
<p className="font-label-xs text-label-xs text-outline italic">Sauvegardé le 10 Oct. 2023</p>
</div>
</div>
<button className="text-primary active:scale-125 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bookmark</span>
</button>
</div>
<p className="text-on-surface-variant font-body-md text-body-md line-clamp-3 mb-4">
                    Quelles sont les étapes pour équilibrer une équation d'oxydoréduction en milieu acide ? Prenez l'exemple du couple MnO4-/Mn2+.
                </p>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
<button className="flex items-center gap-2 text-primary font-label-sm text-label-sm px-2 py-1 rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px]">share</span>
                        Partager
                    </button>
<button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-label-sm text-label-sm active:scale-95 transition-transform">
                        Réviser
                    </button>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-4 academic-shadow hover:border-primary/30 transition-colors">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-secondary-fixed flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-secondary">eco</span>
</div>
<div>
<span className="font-label-xs text-label-xs text-secondary uppercase tracking-wider">SVT</span>
<p className="font-label-xs text-label-xs text-outline italic">Sauvegardé le 05 Oct. 2023</p>
</div>
</div>
<button className="text-primary active:scale-125 transition-transform">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>bookmark</span>
</button>
</div>
<p className="text-on-surface-variant font-body-md text-body-md line-clamp-3 mb-4">
                    Décrivez le processus de la méiose et son rôle fondamental dans la diversité génétique des espèces au sein d'une population.
                </p>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/30">
<button className="flex items-center gap-2 text-primary font-label-sm text-label-sm px-2 py-1 rounded hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-[20px]">share</span>
                        Partager
                    </button>
<button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-label-sm text-label-sm active:scale-95 transition-transform">
                        Réviser
                    </button>
</div>
</div>
</section>

<section className="hidden flex flex-col items-center justify-center py-20 text-center px-6" id="empty-state">
<div className="w-48 h-48 mb-8 bg-surface-container-low rounded-full flex items-center justify-center relative overflow-hidden">
<div className="absolute inset-0 opacity-10 bg-gradient-to-br from-primary to-secondary"></div>
<span className="material-symbols-outlined text-primary text-[80px] opacity-40">inventory_2</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-2">Aucune question sauvegardée</h2>
<p className="text-on-surface-variant max-w-xs mb-8">Les questions que vous sauvegardez durant vos sessions d'étude avec l'IA apparaîtront ici.</p>
<button className="bg-primary text-on-primary px-8 py-3 rounded-xl font-label-sm text-label-sm active:scale-95 transition-transform academic-shadow">
                Explorer les cours
            </button>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#"><div className="relative flex flex-col items-center justify-center"><div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border-2 border-surface-container-lowest flex items-center justify-center text-on-primary text-[10px] font-bold">3</div><span className="material-symbols-outlined" style={{"fontVariationSettings":"\"FILL\" 1"}}>bookmark</span><span className="font-label-xs text-label-xs">Favoris</span></div></a><a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 duration-200" href="#"><span className="material-symbols-outlined">person</span><span className="font-label-xs text-label-xs">Profil</span></a>
</nav>
<script>
        // Micro-interactions for bookmark toggling
        document.querySelectorAll('button span:contains("bookmark")').forEach(btn =&gt; &#123;
            btn.parentElement.addEventListener('click', function(e) &#123;
                const icon = this.querySelector('.material-symbols-outlined');
                const isFilled = icon.style.fontVariationSettings.includes("'FILL' 1");
                
                if(isFilled) &#123;
                    icon.style.fontVariationSettings = "'FILL' 0";
                    // Animation for removal
                    this.closest('.bg-surface').style.opacity = '0.5';
                    setTimeout(() =&gt; &#123;
                        this.closest('.bg-surface').classList.add('scale-95', 'opacity-0', 'transition-all', 'duration-300');
                        setTimeout(() =&gt; &#123;
                            this.closest('.bg-surface').remove();
                            checkEmptyState();
                        &#125;, 300);
                    &#125;, 500);
                &#125; else &#123;
                    icon.style.fontVariationSettings = "'FILL' 1";
                &#125;
            &#125;);
        &#125;);

        // Search highlight effect
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) =&gt; &#123;
            const query = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('#questions-list &gt; div');
            
            cards.forEach(card =&gt; &#123;
                const text = card.textContent.toLowerCase();
                if(text.includes(query)) &#123;
                    card.classList.remove('hidden');
                &#125; else &#123;
                    card.classList.add('hidden');
                &#125;
            &#125;);
            checkEmptyState();
        &#125;);

        function checkEmptyState() &#123;
            const list = document.getElementById('questions-list');
            const empty = document.getElementById('empty-state');
            const visibleCards = list.querySelectorAll('div:not(.hidden)');
            
            if (visibleCards.length === 0) &#123;
                list.classList.add('hidden');
                empty.classList.remove('hidden');
            &#125; else &#123;
                list.classList.remove('hidden');
                empty.classList.add('hidden');
            &#125;
        &#125;

        // Custom selector for containing text in JS
        document.querySelectorAll('.material-symbols-outlined').forEach(span =&gt; &#123;
            if(span.textContent.trim() === 'bookmark') &#123;
                // Initial state logic handled by style attribute in HTML
            &#125;
        &#125;);
    </script>

    </div>
  );
}
