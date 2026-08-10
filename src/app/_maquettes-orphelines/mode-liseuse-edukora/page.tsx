import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Lecteur Immersif" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface font-body-lg overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<div className="fixed top-0 left-0 w-full h-1 z-[100] bg-surface-container">
<div className="h-full bg-primary-container w-0" id="progress-bar"></div>
</div>

<header className="sticky top-0 z-50 controls-bar bg-surface/95 backdrop-blur-md border-b border-surface-border transition-colors duration-300">
<div className="max-w-5xl mx-auto px-container-padding-mobile md:px-container-padding-desktop h-16 flex items-center justify-between">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors flex items-center justify-center" title="Retour">
<span className="material-symbols-outlined text-primary" data-icon="arrow_back">arrow_back</span>
</button>
<h1 className="font-title-md text-title-md hidden sm:block truncate max-w-[200px] md:max-w-md">Les Lois de Newton</h1>
</div>
<div className="flex items-center gap-2 md:gap-4">

<div className="flex items-center bg-surface-container-low rounded-xl p-1">
<button className="p-2 hover:bg-surface-container-high rounded-lg transition-all" title="Réduire la taille">
<span className="material-symbols-outlined text-[18px]" data-icon="text_fields">text_fields</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg transition-all" title="Agrandir la taille">
<span className="material-symbols-outlined text-[24px]" data-icon="text_fields">text_fields</span>
</button>
</div>

<div className="flex items-center bg-surface-container-low rounded-xl p-1 gap-1">
<button className="w-8 h-8 rounded-full border-2 border-transparent focus:border-primary bg-white shadow-sm transition-all" title="Mode Clair"></button>
<button className="w-8 h-8 rounded-full border-2 border-transparent focus:border-primary bg-[#f4ecd8] shadow-sm transition-all" title="Mode Sépia"></button>
<button className="w-8 h-8 rounded-full border-2 border-transparent focus:border-primary bg-[#1a1c1e] shadow-sm transition-all" title="Mode Sombre"></button>
</div>
</div>
</div>
</header>
<main className="py-12 px-container-padding-mobile">
<div className="content-area">

<div className="mb-12">
<div className="flex items-center gap-2 mb-4">
<span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-label-md text-label-md">Physique-Chimie</span>
<span className="text-on-surface-variant font-label-md text-label-md flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="schedule">schedule</span> 12 min de lecture
                    </span>
</div>
<h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg mb-6 leading-tight">Les Lois de Newton : Fondements de la Dynamique</h2>
<div className="h-1 w-24 bg-primary rounded-full mb-8"></div>
<p className="font-body-lg text-body-lg italic opacity-80 leading-relaxed mb-8">
                    "Si j'ai vu plus loin, c'est en montant sur les épaules de géants." — Isaac Newton. Comprendre les trois principes fondamentaux qui régissent le mouvement des corps.
                </p>
<img className="w-full aspect-video object-cover rounded-xl border border-surface-border mb-12 shadow-sm" src="/images/ecran-246.png" alt="A high-quality educational illustration of Isaac Newton's prism experiment or a minimalist diagram of a falling apple, styled with a professional corporate aesthetic. The lighting is soft, studio-quality, featuring a clean white background with subtle blue and emerald green accents. The overall mood is intellectual, serene, and authoritative, consistent with an advanced academic platform." />
</div>

<article className="space-y-12 transition-all duration-300" id="main-content">
<section className="space-y-6">
<h3 className="font-headline-md text-headline-md border-l-4 border-primary pl-4">1. La Première Loi : Le Principe d'Inertie</h3>
<div className="content-card p-6 md:p-8 rounded-xl border border-surface-border bg-surface-container-lowest transition-colors duration-300">
<p className="leading-relaxed mb-4">
                            Tout corps persévère dans l'état de repos ou de mouvement uniforme en ligne droite dans lequel il se trouve, à moins que quelque force n'agisse sur lui, et ne le contraigne à changer d'état.
                        </p>
<div className="bg-primary/5 p-4 rounded-lg border-l-2 border-primary">
<span className="font-bold block mb-2">Exemple concret :</span>
                            Un palet de hockey sur une glace sans frottement continuerait indéfiniment sa trajectoire s'il ne heurtait pas la bande ou un autre joueur.
                        </div>
</div>
</section>
<section className="space-y-6">
<h3 className="font-headline-md text-headline-md border-l-4 border-primary pl-4">2. La Deuxième Loi : Principe Fondamental de la Dynamique</h3>
<div className="content-card p-6 md:p-8 rounded-xl border border-surface-border bg-surface-container-lowest transition-colors duration-300">
<p className="leading-relaxed mb-6">
                            L'accélération d'un corps est proportionnelle à la force résultante qui lui est appliquée et inversement proportionnelle à sa masse. Elle s'exprime par la célèbre relation vectorielle :
                        </p>
<div className="flex justify-center my-8">
<div className="text-center p-8 bg-surface-container rounded-2xl border border-outline-variant inline-block">
<span className="font-metric-num text-[42px] text-primary">ΣF = m · a</span>
</div>
</div>
<ul className="space-y-3 list-disc pl-5 opacity-90">
<li><strong>F</strong> est la somme des forces (en Newtons)</li>
<li><strong>m</strong> est la masse (en kilogrammes)</li>
<li><strong>a</strong> est l'accélération (en m/s²)</li>
</ul>
</div>
</section>
<section className="space-y-6">
<h3 className="font-headline-md text-headline-md border-l-4 border-primary pl-4">3. La Troisième Loi : Principe des Actions Réciproques</h3>
<div className="content-card p-6 md:p-8 rounded-xl border border-surface-border bg-surface-container-lowest transition-colors duration-300">
<p className="leading-relaxed mb-4">
                            Lorsqu'un corps A exerce une force sur un corps B, le corps B exerce simultanément sur le corps A une force de même intensité, de même direction, mais de sens opposé.
                        </p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
<div className="bg-impact-emerald/5 p-4 rounded-lg border border-impact-emerald/20">
<p className="text-sm font-bold text-impact-emerald mb-2">Action</p>
<p className="text-sm">Le moteur d'une fusée expulse des gaz vers le bas.</p>
</div>
<div className="bg-validation-amber/5 p-4 rounded-lg border border-validation-amber/20">
<p className="text-sm font-bold text-validation-amber mb-2">Réaction</p>
<p className="text-sm">Les gaz poussent la fusée vers le haut avec la même force.</p>
</div>
</div>
</div>
</section>
<section className="pb-24">
<div className="bg-primary p-8 rounded-2xl text-on-primary">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined" data-icon="lightbulb">lightbulb</span>
<h4 className="font-title-md text-title-md">À retenir pour l'examen</h4>
</div>
<p className="opacity-90 mb-6">L'accélération ne dépend pas seulement de la force, mais aussi de l'inertie (la masse) de l'objet. Un objet lourd est plus difficile à accélérer qu'un objet léger pour une même force appliquée.</p>
<button className="w-full py-4 bg-white text-primary font-bold rounded-xl hover:bg-opacity-90 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-icon="quiz">quiz</span>
                            Lancer le quiz de validation
                        </button>
</div>
</section>
</article>
</div>
</main>

<footer className="fixed bottom-0 left-0 w-full p-4 pointer-events-none">
<div className="max-w-5xl mx-auto flex justify-end">
<button className="pointer-events-auto p-4 bg-primary text-on-primary rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center" title="Marquer comme lu">
<span className="material-symbols-outlined" data-icon="check" style={{"fontVariationSettings":"'FILL' 1"}}>check</span>
</button>
</div>
</footer>
<script>
        // Progress Bar Logic
        window.onscroll = function() &#123;
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            document.getElementById("progress-bar").style.width = scrolled + "%";
        &#125;;

        // Font Size Adjustment
        let currentFontSize = 16;
        function adjustFontSize(delta) &#123;
            currentFontSize += delta;
            if (currentFontSize &lt; 12) currentFontSize = 12;
            if (currentFontSize &gt; 32) currentFontSize = 32;
            
            const content = document.getElementById('main-content');
            content.style.fontSize = currentFontSize + 'px';
            content.style.lineHeight = (currentFontSize * 1.6) + 'px';
        &#125;

        // Theme Switching
        function setTheme(mode) &#123;
            const body = document.getElementById('reader-body');
            body.classList.remove('sepia-mode', 'dark-mode-bg');
            
            if (mode === 'sepia') &#123;
                body.classList.add('sepia-mode');
            &#125; else if (mode === 'dark') &#123;
                body.classList.add('dark-mode-bg');
            &#125;
            
            // Save preference
            localStorage.setItem('edukora-theme', mode);
        &#125;

        // Load saved theme
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const savedTheme = localStorage.getItem('edukora-theme');
            if (savedTheme) setTheme(savedTheme);
        &#125;);

        // Simple haptic-like interaction
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                if ('vibrate' in navigator) &#123;
                    navigator.vibrate(10);
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
