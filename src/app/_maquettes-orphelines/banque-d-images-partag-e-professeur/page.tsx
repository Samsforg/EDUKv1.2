import type { Metadata } from "next";

export const metadata: Metadata = { title: "Banque d'Images Partagée - Edukora Pro" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" >

<header className="fixed top-0 w-full bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container z-50 flex justify-between items-center px-4 md:px-8 h-16 shadow-none">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined cursor-pointer">menu</span>
<div className="flex items-center gap-2">
<img alt="Edukora Pro Logo" className="w-8 h-8 rounded-lg" src="/images/ecran-027.png" />
<span className="font-headline text-headline-md font-bold text-on-primary">Edukora Pro</span>
</div>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 items-center mr-4">
<span className="text-on-primary font-bold cursor-pointer">Explorer</span>
<span className="text-on-primary-container opacity-80 hover:opacity-100 cursor-pointer transition-opacity">Bibliothèque</span>
<span className="text-on-primary-container opacity-80 hover:opacity-100 cursor-pointer transition-opacity">Collab</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-028.png" alt="Close-up portrait of an African professor wearing professional academic attire, smiling warmly against a soft-focus office background. The lighting is bright and clean, consistent with a high-end corporate educational platform. The color palette emphasizes deep blues and crisp whites, reflecting a professional and authoritative academic environment." />
</div>
</div>
</header>

<aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-4rem)] w-72 bg-surface-container-lowest dark:bg-inverse-surface border-r border-outline-variant z-40 flex-col p-4 shadow-sm">
<div className="flex items-center gap-3 p-4 mb-6 bg-surface-container-low rounded-xl">
<div className="w-12 h-12 rounded-full overflow-hidden border border-primary/10">
<img className="w-full h-full object-cover" src="/images/ecran-029.png" alt="Professional headshot of Professor Kouassi, an Ivorian mathematics educator, showing a focused yet friendly expression. He is wearing a dark suit with a subtle tie. The background is a clean, minimalist university office. The image reflects trust, academic authority, and the Edukora Pro light-mode aesthetic with academic blue tones." />
</div>
<div>
<p className="font-headline font-bold text-primary">Prof. Kouassi</p>
<p className="text-xs text-on-surface-variant">Mathematics Dept.</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold transition-all" href="#">
<span className="material-symbols-outlined">photo_library</span>
<span>Bibliothèque</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">upload_file</span>
<span>My Uploads</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">auto_awesome</span>
<span>AI Generator</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">group</span>
<span>Collaborations</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">folder_special</span>
<span>Collections</span>
</a>
</nav>
</aside>

<main className="flex-1 mt-16 pb-20 md:pb-8 md:ml-72 bg-surface">

<section className="p-4 md:p-8 space-y-6">
<div className="max-w-4xl">
<h2 className="text-display-lg-mobile md:text-display-lg font-bold text-primary mb-2">Banque d'Images Partagée</h2>
<p className="text-on-surface-variant font-body">Accédez à des milliers d'illustrations pédagogiques créées par vos pairs pour enrichir vos supports de cours.</p>
</div>

<div className="relative group max-w-2xl">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all shadow-sm" placeholder="Rechercher une figure, un schéma, un symbole..." type="text" />
<div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
<button className="p-2 hover:bg-surface-container rounded-lg text-outline transition-colors">
<span className="material-symbols-outlined">tune</span>
</button>
</div>
</div>

<div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
<button className="px-5 py-2 rounded-full bg-primary text-on-primary text-label-sm font-semibold whitespace-nowrap shadow-md">Tous</button>
<button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm font-semibold hover:bg-surface-variant transition-colors whitespace-nowrap border border-outline-variant/30">Mathématiques</button>
<button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm font-semibold hover:bg-surface-variant transition-colors whitespace-nowrap border border-outline-variant/30">Physique-Chimie</button>
<button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm font-semibold hover:bg-surface-variant transition-colors whitespace-nowrap border border-outline-variant/30">SVT</button>
<button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm font-semibold hover:bg-surface-variant transition-colors whitespace-nowrap border border-outline-variant/30">Histoire-Géo</button>
<button className="px-5 py-2 rounded-full bg-surface-container-highest text-on-surface-variant text-label-sm font-semibold hover:bg-surface-variant transition-colors whitespace-nowrap border border-outline-variant/30">Anglais</button>
</div>
</section>

<section className="px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all duration-300">
<div className="aspect-video relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-030.png" alt="A precise, clean educational illustration of a Pythagorean theorem geometric diagram. It shows a right-angled triangle with squares constructed on each side, labeled with 'a', 'b', and 'c'. The drawing is professional, using academic blue and charcoal grey lines on a slightly off-white grid background. High contrast for classroom clarity, digital flat vector style." />
<div className="absolute top-2 right-2 bg-primary/90 text-on-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Mathématiques</div>
</div>
<div className="p-4 space-y-3">
<div>
<h3 className="font-headline font-bold text-on-surface line-clamp-1">Théorème de Pythagore</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm">person</span>
                            Par Prof. Yao Amadou
                        </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
<span className="text-[10px] font-semibold text-outline">PNG • 1.2 MB</span>
<button className="flex items-center gap-1 bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-label-sm font-bold active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm">add_circle</span>
                            Utiliser
                        </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all duration-300">
<div className="aspect-video relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-031.png" alt="A detailed scientific diagram of an animal cell structure for biology students. Labels point to the nucleus, mitochondria, and cytoplasm. The style is clean and academic, using vibrant forest green and soft orange accents for cellular components against a pristine white background. It has a modern, professional, high-resolution pedagogical look with clear, readable typography." />
<div className="absolute top-2 right-2 bg-tertiary text-on-tertiary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">SVT</div>
</div>
<div className="p-4 space-y-3">
<div>
<h3 className="font-headline font-bold text-on-surface line-clamp-1">Structure Cellule Animale</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm">person</span>
                            Par Prof. Koffi Marie
                        </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
<span className="text-[10px] font-semibold text-outline">SVG • 450 KB</span>
<button className="flex items-center gap-1 bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-label-sm font-bold active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm">add_circle</span>
                            Utiliser
                        </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all duration-300">
<div className="aspect-video relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-032.png" alt="An educational map illustration of West Africa highlighting major geographical regions and rivers like the Niger and Comoé. The map is rendered in a minimalist flat style with Ivory Coast highlighted in academic blue. Borders are clean, and the overall design is high-contrast and professional, suitable for history and geography lessons in a digital classroom environment." />
<div className="absolute top-2 right-2 bg-primary/90 text-on-primary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Histoire-Géo</div>
</div>
<div className="p-4 space-y-3">
<div>
<h3 className="font-headline font-bold text-on-surface line-clamp-1">Relief de l'Afrique de l'Ouest</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm">person</span>
                            Par Prof. Coulibaly I.
                        </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
<span className="text-[10px] font-semibold text-outline">JPG • 2.5 MB</span>
<button className="flex items-center gap-1 bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-label-sm font-bold active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm">add_circle</span>
                            Utiliser
                        </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all duration-300">
<div className="aspect-video relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-033.png" alt="A clean, digital chemistry diagram illustrating the water molecule (H2O) with atomic spheres and bond angles. Hydrogen atoms are small and white, oxygen is larger and academic blue. The background is a very light grey with a faint hex pattern. The aesthetic is modern, scientific, and corporate, fitting the Edukora Pro professional educator bank style." />
<div className="absolute top-2 right-2 bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Physique</div>
</div>
<div className="p-4 space-y-3">
<div>
<h3 className="font-headline font-bold text-on-surface line-clamp-1">Molécule d'Eau H2O</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm">person</span>
                            Par Prof. Bakayoko S.
                        </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
<span className="text-[10px] font-semibold text-outline">PNG • 800 KB</span>
<button className="flex items-center gap-1 bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-label-sm font-bold active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm">add_circle</span>
                            Utiliser
                        </button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all duration-300 lg:col-span-2">
<div className="flex flex-col md:flex-row h-full">
<div className="md:w-1/2 relative bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="/images/ecran-034.png" alt="A high-quality educational infographic illustrating the water cycle (cycle de l'eau). It features evaporation, condensation, and precipitation with clean illustrative icons and professional labeling in French. The color palette uses various shades of academic blue and forest green. It is designed for maximum pedagogical impact in a classroom setting, very professional and crisp." />
<div className="absolute top-4 left-4 bg-tertiary text-on-tertiary text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">SVT • Premium</div>
</div>
<div className="md:w-1/2 p-6 flex flex-col justify-between">
<div>
<span className="inline-block px-2 py-0.5 rounded bg-secondary-container/20 text-on-secondary-container text-[10px] font-bold mb-2">Tendance</span>
<h3 className="font-headline text-xl font-bold text-primary">Cycle de l'Eau Complet</h3>
<p className="text-sm text-on-surface-variant mt-2 leading-relaxed">Infographie détaillée incluant les phases d'évaporation, condensation et ruissellement. Optimisée pour vidéoprotection.</p>
</div>
<div className="mt-4 flex items-center justify-between gap-4">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-surface-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-035.png" alt="Professional avatar of a science educator, a woman with a confident smile, wearing glasses and professional lab attire in a bright, modern school environment. The lighting is optimistic and warm, reflecting progress and growth in Ivorian education." />
</div>
<span className="text-xs font-semibold">Prof. Diarra L.</span>
</div>
<button className="flex items-center gap-2 bg-primary text-on-primary px-6 py-2 rounded-lg text-label-sm font-bold shadow-md hover:bg-primary-container transition-all">
<span className="material-symbols-outlined text-sm">download</span>
                                Utiliser
                            </button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden group hover:shadow-lg transition-all duration-300">
<div className="aspect-video relative overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="/images/ecran-036.png" alt="A high-contrast physics diagram of an electrical circuit featuring a battery, a switch, and a light bulb, all connected by clean lines. Symbols follow international standard electrical conventions. The aesthetic is technical and precise, using deep blue for components and bright orange for the light bulb glow, set on a professional off-white background." />
<div className="absolute top-2 right-2 bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Physique</div>
</div>
<div className="p-4 space-y-3">
<div>
<h3 className="font-headline font-bold text-on-surface line-clamp-1">Circuit Électrique Simple</h3>
<p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm">person</span>
                            Par Prof. N'Guessan
                        </p>
</div>
<div className="flex items-center justify-between pt-2 border-t border-outline-variant/50">
<span className="text-[10px] font-semibold text-outline">EPS • 600 KB</span>
<button className="flex items-center gap-1 bg-secondary text-on-secondary px-4 py-1.5 rounded-lg text-label-sm font-bold active:scale-95 transition-all">
<span className="material-symbols-outlined text-sm">add_circle</span>
                            Utiliser
                        </button>
</div>
</div>
</div>
</section>
</main>

<button className="fixed bottom-24 right-6 md:bottom-10 md:right-10 bg-secondary-container text-on-secondary-container w-14 h-14 rounded-full shadow-xl flex items-center justify-center group active:scale-90 transition-all z-40 border-2 border-on-secondary-container/10">
<span className="material-symbols-outlined text-2xl group-hover:rotate-90 transition-transform duration-300">add</span>
<div className="absolute right-16 bg-on-surface text-surface px-3 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ajouter une illustration
        </div>
</button>

<nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface dark:bg-inverse-surface border-t border-outline-variant/30 backdrop-blur-md z-50 flex justify-around items-center h-16 px-4 pb-safe shadow-md">
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1" href="#">
<span className="material-symbols-outlined">explore</span>
<span className="font-label text-label-xs font-semibold">Explorer</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">search</span>
<span className="font-label text-label-xs font-semibold">Rechercher</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">add_box</span>
<span className="font-label text-label-xs font-semibold">Upload</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for active filters
        const filters = document.querySelectorAll('button.rounded-full');
        filters.forEach(filter =&gt; &#123;
            filter.addEventListener('click', () =&gt; &#123;
                filters.forEach(f =&gt; &#123;
                    f.classList.remove('bg-primary', 'text-on-primary', 'shadow-md');
                    f.classList.add('bg-surface-container-highest', 'text-on-surface-variant');
                &#125;);
                filter.classList.add('bg-primary', 'text-on-primary', 'shadow-md');
                filter.classList.remove('bg-surface-container-highest', 'text-on-surface-variant');
            &#125;);
        &#125;);

        // Search bar interaction
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () =&gt; &#123;
            searchInput.parentElement.classList.add('scale-[1.01]');
        &#125;);
        searchInput.addEventListener('blur', () =&gt; &#123;
            searchInput.parentElement.classList.remove('scale-[1.01]');
        &#125;);
    </script>

    </div>
  );
}
