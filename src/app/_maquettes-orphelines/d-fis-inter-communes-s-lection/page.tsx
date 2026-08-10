import type { Metadata } from "next";

export const metadata: Metadata = { title: "Défis Inter-Communes - Sélection" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background w-full sticky top-0 z-50 border-b border-outline-variant dark:border-outline flex items-center justify-between px-margin-mobile md:px-margin-desktop h-16 w-full">
<div className="flex items-center gap-4">
<button className="text-primary dark:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-surface-container-highest transition-colors p-2 rounded-full active:scale-95 transition-transform">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-inverse-primary">Défis Inter-Communes</h1>
</div>
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-094.png" alt="A professional portrait of a young Ivorian student with a friendly expression, set against a blurred academic background with soft blue tones and clean minimalist lighting. The style is modern, professional, and corporate, emphasizing academic authority and pride." />
</div>
</div>
</header>
<main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg">

<div className="mb-stack-lg">
<h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Prêt pour le combat intellectuel ?</h2>
<p className="text-on-surface-variant font-body-lg">Gagnez des points pour votre commune et progressez vers votre réussite scolaire.</p>
</div>

<section className="mb-stack-lg">
<div className="flex items-center justify-between mb-stack-md">
<h3 className="font-headline-md text-headline-md text-on-surface">Le Défi de la Semaine</h3>
<span className="bg-error-container text-on-error-container px-3 py-1 rounded-full font-label-xs flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">timer</span>
                    2j 14h restants
                </span>
</div>
<div className="relative overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm group">
<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none"></div>
<div className="p-gutter md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

<div className="flex flex-col items-center gap-4 text-center flex-1">
<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-md p-4 border border-outline-variant flex items-center justify-center">
<img className="w-full h-full object-contain" src="/images/ecran-095.png" alt="A stylized, modern heraldic emblem representing the commune of Cocody, featuring academic symbols like a graduation cap and an open book, integrated with Ivorian cultural motifs in vibrant Academic Blue and Ivory White. Professional, clean vector style." />
</div>
<div>
<h4 className="font-headline-md text-headline-md text-on-surface">Cocody</h4>
<p className="text-primary font-bold text-xl">45,000 XP</p>
</div>
</div>

<div className="flex flex-col items-center">
<div className="text-display-lg text-secondary font-black opacity-20 italic">VS</div>
<div className="h-12 w-[2px] bg-outline-variant hidden md:block my-4"></div>
<button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
                            Rejoindre
                        </button>
</div>

<div className="flex flex-col items-center gap-4 text-center flex-1">
<div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white shadow-md p-4 border border-outline-variant flex items-center justify-center">
<img className="w-full h-full object-contain" src="/images/ecran-096.png" alt="A stylized, modern heraldic emblem representing the commune of Abobo, featuring symbols of dynamic energy, community, and upward growth, integrated with traditional Ivorian patterns in shades of National Orange and deep Academic Blue. Professional, high-end vector art." />
</div>
<div>
<h4 className="font-headline-md text-headline-md text-on-surface">Abobo</h4>
<p className="text-secondary font-bold text-xl">42,300 XP</p>
</div>
</div>
</div>

<div className="w-full h-2 bg-surface-container-highest flex">
<div className="h-full bg-primary" style={{"width":"52%"}}></div>
<div className="h-full bg-secondary" style={{"width":"48%"}}></div>
</div>
</div>
</section>

<section>
<div className="flex items-center justify-between mb-stack-md">
<h3 className="font-headline-md text-headline-md text-on-surface">Défis Actifs</h3>
<button className="text-primary font-label-sm flex items-center gap-1 hover:underline">
                    Voir tout <span className="material-symbols-outlined text-[18px]">chevron_right</span>
</button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-surface border border-outline-variant rounded-xl p-gutter hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<span className="bg-surface-container-high text-on-surface-variant text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Série Scientifique</span>
<span className="text-label-xs text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">groups</span> 1.2k participants
                        </span>
</div>
<div className="flex items-center justify-between mb-6">
<div className="flex flex-col items-center gap-2">
<div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">location_city</span>
</div>
<span className="font-label-sm">Plateau</span>
</div>
<span className="text-outline font-bold">vs</span>
<div className="flex flex-col items-center gap-2">
<div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">location_city</span>
</div>
<span className="font-label-sm">Treichville</span>
</div>
</div>
<button className="w-full py-2.5 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors active:scale-95">
                        Rejoindre
                    </button>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-gutter hover:shadow-md transition-shadow">
<div className="flex justify-between items-start mb-4">
<span className="bg-tertiary-container text-on-tertiary px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold">National</span>
<span className="text-label-xs text-outline flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">groups</span> 850 participants
                        </span>
</div>
<div className="flex items-center justify-between mb-6">
<div className="flex flex-col items-center gap-2">
<div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-primary">apartment</span>
</div>
<span className="font-label-sm">Bouaké</span>
</div>
<span className="text-outline font-bold">vs</span>
<div className="flex flex-col items-center gap-2">
<div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary">apartment</span>
</div>
<span className="font-label-sm">Yamoussoukro</span>
</div>
</div>
<button className="w-full py-2.5 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-colors active:scale-95">
                        Rejoindre
                    </button>
</div>

<div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-gutter flex flex-col items-center justify-center text-center opacity-70">
<span className="material-symbols-outlined text-4xl text-outline-variant mb-2">lock</span>
<h4 className="font-label-sm text-on-surface-variant">Défi Académique Spécial BAC</h4>
<p className="text-label-xs text-outline-variant">Déverrouillage dans 12h</p>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-on-background shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe w-full">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200 active:scale-90 p-2" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-sm text-label-sm">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>swords</span>
<span className="font-label-sm text-label-sm">Défis</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200 active:scale-90 p-2" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-sm text-label-sm">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all duration-200 active:scale-90 p-2" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-sm text-label-sm">Profil</span>
</a>
</nav>

<script>
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
    </script>

    </div>
  );
}
