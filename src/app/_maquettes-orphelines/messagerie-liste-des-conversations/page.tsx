import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Messages Parents" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface sticky top-0 z-40 border-b border-outline-variant flex justify-between items-center w-full px-4 md:px-8 h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-239.png" alt="A professional headshot of a smiling West African father in a modern office setting. He is wearing a crisp white shirt and stylish glasses. The background is softly blurred with clean, bright white and academic blue accents, reflecting a high-end educational platform aesthetic. The lighting is natural and flattering, emphasizing trust and accessibility." />
</div>
<h1 className="font-headline text-headline-md font-semibold text-primary">Messages</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="settings">settings</span>
</button>
</header>
<main className="max-w-3xl mx-auto px-4 pb-32 pt-6">

<div className="mb-8">
<div className="relative group">
<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors" data-icon="search">search</span>
</div>
<input className="w-full h-12 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-body-md placeholder:text-outline" placeholder="Rechercher un enseignant..." type="text" />
</div>
</div>

<div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 pb-2">
<button className="px-4 py-2 bg-primary text-on-primary rounded-full text-label-sm font-medium whitespace-nowrap">Tous</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-medium whitespace-nowrap hover:bg-outline-variant transition-colors">Non lus</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-medium whitespace-nowrap hover:bg-outline-variant transition-colors">Mathématiques</button>
<button className="px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full text-label-sm font-medium whitespace-nowrap hover:bg-outline-variant transition-colors">Physique-Chimie</button>
</div>

<div className="space-y-1">

<div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group active:scale-[0.98] duration-150">
<div className="relative flex-shrink-0">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-240.png" alt="A portrait of a male teacher in his late 40s with a warm, encouraging smile. He is wearing a formal blazer over a polo shirt. The setting is a brightly lit, modern classroom with mathematical formulas faintly visible on a clean glass board in the background. The color palette uses Academic Blue and soft greys to convey authority and wisdom." />
</div>
<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-container rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
<span className="material-symbols-outlined text-[14px] text-on-secondary-container" data-icon="functions">functions</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="text-body-md font-semibold text-on-surface truncate">M. Koffi - Mathématiques</h3>
<span className="text-label-xs font-semibold text-secondary">14:20</span>
</div>
<div className="flex justify-between items-center">
<p className="text-body-md text-on-surface font-semibold truncate pr-4">Le rapport de performance pour Jean-Marc est prêt.</p>
<div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
<span className="text-[10px] text-on-secondary font-bold">2</span>
</div>
</div>
</div>
</div>

<div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group active:scale-[0.98] duration-150">
<div className="relative flex-shrink-0">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-241.png" alt="A professional headshot of a female educator with a friendly and intelligent expression. She has neatly styled hair and wears a professional dark green blouse. The background is a minimalist library with organized books, using Forest Green accents to symbolize growth and education. The lighting is soft and consistent with a high-end corporate mobile application." />
</div>
<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-tertiary-container rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
<span className="material-symbols-outlined text-[14px] text-on-tertiary-container" data-icon="science">science</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="text-body-md font-medium text-on-surface truncate">Mme. Touré - SVT</h3>
<span className="text-label-xs text-outline">Hier</span>
</div>
<div className="flex justify-between items-center">
<p className="text-body-md text-on-surface-variant truncate">Merci pour votre retour sur le projet de botanique.</p>
</div>
</div>
</div>

<div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group active:scale-[0.98] duration-150">
<div className="relative flex-shrink-0">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-242.png" alt="A portrait of an elderly distinguished male teacher with silver hair and a kind, focused gaze. He wears a classic vest and tie. The background is a blurred study area with architectural blueprints, using deep Academic Blue tones. The image captures a sense of veteran expertise and educational excellence in a modern digital context." />
</div>
<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary-container rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
<span className="material-symbols-outlined text-[14px] text-on-primary-container" data-icon="translate">translate</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="text-body-md font-medium text-on-surface truncate">M. Diallo - Français</h3>
<span className="text-label-xs text-outline">Mar.</span>
</div>
<div className="flex justify-between items-center">
<p className="text-body-md text-on-surface-variant truncate">N'oubliez pas le manuel pour le cours de demain.</p>
</div>
</div>
</div>

<div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group active:scale-[0.98] duration-150">
<div className="relative flex-shrink-0">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-highest border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-243.png" alt="A professional young woman teacher with a bright smile and energetic posture. She is wearing a modern yellow top. The background is a sleek, brightly lit computer lab with blurred monitors. The aesthetic is clean, technological, and welcoming, fitting the Edukora design system's focus on national pride and academic success." />
</div>
<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary-container rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
<span className="material-symbols-outlined text-[14px] text-on-secondary-container" data-icon="history_edu">history_edu</span>
</div>
</div>
<div className="flex-1 min-w-0">
<div className="flex justify-between items-baseline mb-1">
<h3 className="text-body-md font-medium text-on-surface truncate">Mme. Kouassi - Histoire-Géo</h3>
<span className="text-label-xs text-outline">28 Oct.</span>
</div>
<div className="flex justify-between items-center">
<p className="text-body-md text-on-surface-variant truncate">La sortie pédagogique est confirmée pour vendredi.</p>
</div>
</div>
</div>
</div>

<div className="mt-10 p-5 rounded-2xl bg-primary text-on-primary relative overflow-hidden group border border-primary-container shadow-lg">
<div className="relative z-10">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-tertiary-fixed" data-icon="smart_toy">smart_toy</span>
<span className="text-label-xs font-bold uppercase tracking-widest text-tertiary-fixed">Edukora AI</span>
</div>
<h4 className="font-headline text-headline-md mb-2">Besoin d'aide rapide ?</h4>
<p className="text-body-md opacity-90 mb-4 max-w-[80%]">Notre assistant IA peut répondre aux questions administratives fréquentes.</p>
<button className="px-6 py-2 bg-on-primary text-primary rounded-xl font-semibold text-label-sm hover:bg-primary-fixed transition-colors">
                    Démarrer l'assistant
                </button>
</div>

<div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-container rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
</div>
</main>

<button className="fixed bottom-24 right-6 w-16 h-16 bg-secondary text-on-secondary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-90 transition-transform hover:bg-secondary-container">
<span className="material-symbols-outlined text-3xl" data-icon="chat">chat</span>
</button>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-20 pb-safe px-4 bg-surface-container-lowest dark:bg-inverse-surface shadow-[0_-1px_4px_0_rgba(0,0,0,0.05)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-sm font-medium mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-sm font-medium mt-1">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-sm font-medium mt-1">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" data-icon="chat" style={{"fontVariationSettings":"'FILL' 1"}}>chat</span>
<span className="font-label text-label-sm font-medium mt-1">Messages</span>
</a>
</nav>
<script>
        // Simple micro-interaction for list items
        document.querySelectorAll('.cursor-pointer').forEach(item =&gt; &#123;
            item.addEventListener('click', function() &#123;
                // In a real app, this would navigate to the chat detail
                this.classList.add('bg-surface-container-high');
                setTimeout(() =&gt; &#123;
                    this.classList.remove('bg-surface-container-high');
                &#125;, 200);
            &#125;);
        &#125;);

        // Search bar interaction
        const searchInput = document.querySelector('input');
        searchInput.addEventListener('focus', () =&gt; &#123;
            searchInput.parentElement.classList.add('ring-2', 'ring-primary');
        &#125;);
        searchInput.addEventListener('blur', () =&gt; &#123;
            searchInput.parentElement.classList.remove('ring-2', 'ring-primary');
        &#125;);
    </script>

    </div>
  );
}
