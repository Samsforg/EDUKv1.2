import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Premium - Home" };

export default function Page() {
  return (
    <div className="text-on-surface antialiased pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center px-4 h-16 w-full sticky top-0 z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline flat no shadows">
<div className="flex items-center gap-3">
<div className="relative">
<img className="w-10 h-10 rounded-full object-cover gold-border" src="/images/ecran-008.png" alt="A professional studio portrait of a confident young Ivorian male student named Koffi, wearing a modern polo shirt. He is smiling warmly against a soft-focus academic library background. The lighting is bright and clear, highlighting a gold-tinted circular border around his profile image to signify his premium membership status in the Edukora app." />
<div className="absolute -bottom-1 -right-1 bg-gold-premium text-on-primary-fixed rounded-full w-4 h-4 flex items-center justify-center border-2 border-surface">
<span className="material-symbols-outlined !text-[10px] font-bold" data-icon="star" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-headline text-headline-md font-bold text-primary dark:text-primary-fixed-dim">Edukora</span>
<span className="text-xs text-on-surface-variant font-medium">Salut, Koffi</span>
</div>
</div>
<div className="flex items-center gap-2">
<button className="p-2 text-primary dark:text-primary-fixed-dim hover:bg-surface-container transition-colors rounded-full active:scale-95 transition-transform">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</div>
</header>
<main className="max-w-md mx-auto px-4 pt-6 space-y-6">

<section className="relative overflow-hidden rounded-xl bg-white border border-outline-variant p-4 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-gold-premium/10 rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-secondary-fixed-dim" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<div>
<h3 className="font-bold text-on-surface text-sm">Pass Premium Mensuel - Actif</h3>
<p className="text-xs text-on-surface-variant">Expire le 12 Octobre 2024</p>
</div>
</div>
<span className="material-symbols-outlined text-tertiary" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</section>

<section className="bg-primary text-on-primary p-6 rounded-xl shadow-lg relative overflow-hidden">
<div className="relative z-10 flex items-center justify-between">
<div>
<span className="text-xs font-semibold tracking-wider uppercase opacity-80">Objectif Réussite</span>
<h2 className="text-2xl font-headline font-extrabold mt-1">BAC 2024 - Série C</h2>
<button className="mt-4 bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95">
<span className="material-symbols-outlined !text-sm" data-icon="play_arrow" style={{"fontVariationSettings":"'FILL' 1"}}>play_arrow</span>
                        Continuer Mathématiques
                    </button>
</div>
<div className="relative flex items-center justify-center w-24 h-24">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-primary-container" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeWidth="8" />
<circle className="text-gold-premium transition-all duration-1000 ease-out" cx="48" cy="48" fill="transparent" r="40" stroke="currentColor" strokeDasharray="251.2" strokeDashoffset="80.38" strokeWidth="8" />
</svg>
<div className="absolute flex flex-col items-center">
<span className="text-xl font-bold">68%</span>
</div>
</div>
</div>

<div className="absolute inset-0 opacity-10 pointer-events-none" style={{"backgroundImage":"radial-gradient(#ffffff 1px, transparent 1px)","backgroundSize":"16px 16px"}}></div>
</section>

<section className="grid grid-cols-2 gap-4">

<button className="col-span-2 relative group overflow-hidden bg-primary-container text-white p-5 rounded-xl border-2 border-gold-premium/30 hover:border-gold-premium transition-all">
<div className="flex justify-between items-start">
<div className="space-y-1">
<div className="inline-flex items-center px-2 py-0.5 rounded bg-gold-premium text-on-primary-fixed font-bold text-[10px] uppercase mb-2">Exclusive Premium</div>
<h3 className="text-xl font-headline font-bold">Tuteur IA Kora</h3>
<p className="text-sm opacity-80 leading-snug">Disponible 24h/7 pour toutes tes questions complexes en Série C.</p>
</div>
<div className="bg-white/20 p-3 rounded-xl backdrop-blur-md">
<span className="material-symbols-outlined !text-3xl" data-icon="smart_toy" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
</div>
<div className="mt-4 flex items-center gap-2 text-sm font-semibold">
<span>Poser une question</span>
<span className="material-symbols-outlined !text-sm group-hover:translate-x-1 transition-transform" data-icon="arrow_forward">arrow_forward</span>
</div>

<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined !text-9xl" data-icon="bolt">bolt</span>
</div>
</button>

<button className="bg-white border border-outline-variant p-4 rounded-xl flex flex-col gap-3 text-left hover:bg-surface-container-low transition-colors active:scale-95">
<div className="w-10 h-10 bg-tertiary/10 text-tertiary rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="download_done">download_done</span>
</div>
<div>
<h4 className="font-bold text-sm">Mode Hors-ligne</h4>
<p className="text-[11px] text-on-surface-variant">Révise sans connexion</p>
</div>
</button>

<button className="bg-white border border-outline-variant p-4 rounded-xl flex flex-col gap-3 text-left hover:bg-surface-container-low transition-colors active:scale-95">
<div className="w-10 h-10 bg-secondary-container/10 text-secondary-container rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="assignment_turned_in">assignment_turned_in</span>
</div>
<div>
<h4 className="font-bold text-sm">Examens Blancs</h4>
<p className="text-[11px] text-on-surface-variant">Simulateur BEPC/BAC</p>
</div>
</button>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-headline text-lg font-bold">Sélectionné pour toi</h3>
<a className="text-primary text-xs font-bold hover:underline" href="#">Voir tout</a>
</div>
<div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4">

<div className="min-w-[200px] bg-white rounded-xl border border-outline-variant overflow-hidden flex-shrink-0 shadow-sm">
<div className="h-28 relative">
<img className="w-full h-full object-cover" src="/images/ecran-009.png" alt="A clean, minimalist 3D rendering of complex mathematical formulas and geometric shapes (cubes, spheres, and calculus symbols) floating in a serene, bright blue space. The style is academic and modern, featuring soft directional lighting that suggests high-end educational content for a premium app interface." />
<div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-primary">Maths</div>
</div>
<div className="p-3">
<h4 className="font-bold text-sm line-clamp-1">Nombres Complexes</h4>
<p className="text-xs text-on-surface-variant mt-1">Fiche de révision certifiée</p>
<div className="mt-3 flex items-center justify-between">
<span className="text-[10px] font-medium text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined !text-[12px]" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                                Officiel
                            </span>
<span className="material-symbols-outlined text-outline" data-icon="bookmark">bookmark</span>
</div>
</div>
</div>

<div className="min-w-[200px] bg-white rounded-xl border border-outline-variant overflow-hidden flex-shrink-0 shadow-sm">
<div className="h-28 relative">
<img className="w-full h-full object-cover" src="/images/ecran-010.png" alt="A high-quality macro photograph of laboratory equipment including glass beakers with colorful translucent chemicals and a molecular model in the foreground. The lighting is crisp and professional with a clinical, scientific feel, using a color palette of deep blues and clinical whites suited for advanced high school physics and chemistry students." />
<div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-secondary">Physique</div>
</div>
<div className="p-3">
<h4 className="font-bold text-sm line-clamp-1">Électromagnétisme</h4>
<p className="text-xs text-on-surface-variant mt-1">Méthodologie BAC C</p>
<div className="mt-3 flex items-center justify-between">
<span className="text-[10px] font-medium text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined !text-[12px]" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                                Officiel
                            </span>
<span className="material-symbols-outlined text-outline" data-icon="bookmark">bookmark</span>
</div>
</div>
</div>

<div className="min-w-[200px] bg-white rounded-xl border border-outline-variant overflow-hidden flex-shrink-0 shadow-sm">
<div className="h-28 relative">
<img className="w-full h-full object-cover" src="/images/ecran-011.png" alt="A digital illustration of a DNA double helix combined with anatomical sketches of a human brain in a modern, illustrative style. The color palette is composed of academic blues and emerald greens with a soft glow effect, symbolizing deep biological understanding for the premium Edukora education platform." />
<div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-[10px] font-bold text-tertiary">SVT</div>
</div>
<div className="p-3">
<h4 className="font-bold text-sm line-clamp-1">Génétique Humaine</h4>
<p className="text-xs text-on-surface-variant mt-1">Série C : L'essentiel</p>
<div className="mt-3 flex items-center justify-between">
<span className="text-[10px] font-medium text-tertiary flex items-center gap-1">
<span className="material-symbols-outlined !text-[12px]" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                                Officiel
                            </span>
<span className="material-symbols-outlined text-outline" data-icon="bookmark">bookmark</span>
</div>
</div>
</div>
</div>
</section>

<section className="bg-surface-container rounded-xl p-4 border border-outline-variant/50 flex items-center gap-4">
<div className="flex-shrink-0">
<span className="material-symbols-outlined text-primary !text-3xl" data-icon="cloud_off">cloud_off</span>
</div>
<div>
<h4 className="font-bold text-sm">Prêt pour le trajet ?</h4>
<p className="text-xs text-on-surface-variant">Tes 5 dernières fiches sont téléchargées et disponibles sans internet.</p>
</div>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-4 pt-2 bg-surface-container-lowest dark:bg-inverse-surface shadow-[0_-4px_10px_rgba(0,50,171,0.1)] rounded-t-xl">
<a className="flex flex-col items-center justify-center bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-on-primary-fixed rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" data-icon="home" style={{"fontVariationSettings":"'FILL' 1"}}>home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-on-surface-variant transition-colors active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-on-surface-variant transition-colors active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-on-surface-variant transition-colors active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" data-icon="favorite">favorite</span>
<span className="font-label text-label-xs font-semibold">Favorites</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-on-surface-variant transition-colors active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions and subtle effects
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                // Haptic feedback simulation or ripple would go here
            &#125;);
        &#125;);

        // Simple visibility observer for progress bar animation
        const observer = new IntersectionObserver((entries) =&gt; &#123;
            entries.forEach(entry =&gt; &#123;
                if (entry.isIntersecting) &#123;
                    const circle = entry.target.querySelector('circle:last-child');
                    if (circle) &#123;
                        circle.style.strokeDashoffset = '80.38'; // Matches the 68% calculation
                    &#125;
                &#125;
            &#125;);
        &#125;, &#123; threshold: 0.5 &#125;);

        document.querySelectorAll('section').forEach(section =&gt; observer.observe(section));
    </script>

    </div>
  );
}
