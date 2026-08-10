import type { Metadata } from "next";

export const metadata: Metadata = { title: "analyse_d_taill_e_de_fiche_professeur" };

export default function Page() {
  return (
    <div className="bg-surface font-body-md text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-surface-border h-16 flex justify-between items-center px-container-padding-mobile">
<div className="flex items-center gap-4">
<button className="p-2 active:scale-95 transition-transform">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary font-bold">Validation de Fiche</h1>
</div>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md text-label-md active:scale-95 transition-transform shadow-sm">
            Valider
        </button>
</header>

<aside className="fixed right-4 top-24 z-40 flex flex-col gap-2" id="tool-panel">
<button className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-md border border-surface-border flex items-center justify-center text-primary active:scale-90 transition-all hover:bg-surface-container-low">
<span className="material-symbols-outlined">edit_note</span>
</button>
<button className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-md border border-surface-border flex items-center justify-center text-validation-amber active:scale-90 transition-all hover:bg-surface-container-low">
<span className="material-symbols-outlined">warning</span>
</button>
<button className="w-12 h-12 rounded-full bg-surface-container-lowest shadow-md border border-surface-border flex items-center justify-center text-impact-emerald active:scale-90 transition-all hover:bg-surface-container-low">
<span className="material-symbols-outlined">verified</span>
</button>
</aside>
<main className="pt-20 pb-32 px-container-padding-mobile max-w-2xl mx-auto">

<div className="mb-6 space-y-2">
<div className="flex items-center gap-2">
<span className="bg-expert-purple/10 text-expert-purple text-label-md px-2 py-0.5 rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                    Mathématiques Expert
                </span>
<span className="text-on-surface-variant font-label-md text-label-md">• Terminale S</span>
</div>
<h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Les Intégrales : Fondamentaux</h2>
<p className="text-on-surface-variant font-body-md">Soumis par : Lucas M. • Il y a 2 heures</p>
</div>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-4 mb-6 flex items-center justify-between">
<div>
<p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">Score de Rigueur Scientifique</p>
<div className="flex items-baseline gap-1 mt-1">
<span className="font-metric-num text-metric-num text-impact-emerald">84%</span>
<span className="text-on-surface-variant font-body-md">/ 100</span>
</div>
</div>
<div className="relative w-16 h-16">
<svg className="w-full h-full transform -rotate-90">
<circle className="text-surface-container-highest" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4" />
<circle className="text-impact-emerald" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="28" strokeWidth="4" />
</svg>
<div className="absolute inset-0 flex items-center justify-center">
<span className="material-symbols-outlined text-impact-emerald" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
</div>
</div>
</section>

<article className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 shadow-sm relative min-h-[600px] leading-relaxed">
<section className="mb-8">
<h3 className="font-title-md text-title-md text-primary mb-3">1. Définition</h3>
<p className="mb-4">
                    Soit f une fonction continue sur un intervalle [a, b]. L'intégrale de f de a à b est notée :
                </p>
<div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-center my-4 select-none">
<span className="math-formula text-xl text-primary">∫<sub>a</sub><sup>b</sup> f(x) dx = [F(x)]<sub>a</sub><sup>b</sup> = F(b) - F(a)</span>
</div>
<div className="annotation-highlight group relative cursor-pointer py-1">
                    Où F est une primitive de f sur [a, b]. 
                    <span className="absolute -right-2 -top-4 bg-validation-amber text-white p-1 rounded-full text-[10px] shadow-sm">!</span>
</div>

<div className="hidden mt-3 p-3 bg-validation-amber/5 border-l-4 border-validation-amber rounded-r-lg" id="comment-1">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-validation-amber text-lg">info</span>
<div>
<p className="font-label-md text-label-md text-on-surface-variant">COMMENTAIRE EXPERT</p>
<p className="text-on-surface font-body-md mt-1 italic">"Clarifier la définition d'une primitive ici pour éviter toute confusion."</p>
</div>
</div>
</div>
</section>
<section className="mb-8">
<h3 className="font-title-md text-title-md text-primary mb-3">2. Propriétés de linéarité</h3>
<ul className="space-y-4">
<li className="flex items-start gap-3">
<span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
<span className="math-formula">∫(f+g) = ∫f + ∫g</span>
</li>
<li className="flex items-start gap-3 group">
<span className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></span>
<div className="annotation-highlight py-0.5">
<span className="math-formula">∫(k·f) = k·∫f</span> (pour tout réel k)
                        </div>
</li>
</ul>
<div className="hidden mt-3 p-3 bg-secondary-container/30 border-l-4 border-primary rounded-r-lg" id="comment-2">
<div className="flex items-start gap-2">
<span className="material-symbols-outlined text-primary text-lg">chat_bubble</span>
<div>
<p className="font-label-md text-label-md text-primary">DR. SOPHIE MARTIN</p>
<p className="text-on-surface font-body-md mt-1">Excellent point, très clair.</p>
</div>
</div>
</div>
</section>
<section className="mb-8">
<h3 className="font-title-md text-title-md text-primary mb-3">3. Intégration par parties</h3>
<p className="mb-3">La formule d'intégration par parties est :</p>
<div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-center my-4 overflow-x-auto">
<span className="math-formula text-lg whitespace-nowrap">∫ u(x)v'(x) dx = [u(x)v(x)] - ∫ u'(x)v(x) dx</span>
</div>
<div className="bg-error-container/20 border border-error/20 p-3 rounded-lg flex items-center gap-3">
<span className="material-symbols-outlined text-error" style={{"fontVariationSettings":"'FILL' 1"}}>error</span>
<p className="text-on-error-container font-body-md text-sm">IA Detect: Erreur potentielle de bornes sur le crochet.</p>
</div>
</section>

<div className="w-full h-48 rounded-lg overflow-hidden border border-surface-border mb-8 relative">
<img className="w-full h-full object-cover" src="/images/ecran-013.png" alt="A clean, academic-style mathematical graph showing the area under a curve, representing an integral. The illustration uses a deep blue line for the curve, with a light blue shaded region between two points 'a' and 'b' on the x-axis. The overall style is minimalist and professional, set against a pristine white-off background that conveys academic clarity and scientific precision." />
<div className="absolute bottom-2 right-2 glass-effect px-2 py-1 rounded text-xs font-label-md">Visualisation de l'aire</div>
</div>
</article>
</main>

<footer className="fixed bottom-0 left-0 right-0 p-4 glass-effect border-t border-surface-border flex gap-3 z-50">
<button className="flex-1 border border-primary text-primary font-label-md text-label-md py-3 rounded-lg active:scale-95 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">history_edu</span>
            Demander modif.
        </button>
<button className="flex-1 bg-primary text-on-primary font-label-md text-label-md py-3 rounded-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[18px]">fact_check</span>
            Approuver la fiche
        </button>
</footer>

<script>
        function showComment(id) &#123;
            const comment = document.getElementById(id);
            if (comment.classList.contains('hidden')) &#123;
                // Close others
                document.querySelectorAll('[id^="comment-"]').forEach(el =&gt; el.classList.add('hidden'));
                comment.classList.remove('hidden');
                comment.classList.add('animate-in', 'fade-in', 'duration-300');
            &#125; else &#123;
                comment.classList.add('hidden');
            &#125;
        &#125;

        // Simple scroll reveal for the tool panel
        let lastScrollTop = 0;
        const toolPanel = document.getElementById('tool-panel');
        window.addEventListener('scroll', function() &#123;
            let st = window.pageYOffset || document.documentElement.scrollTop;
            if (st &gt; lastScrollTop) &#123;
                toolPanel.style.transform = 'translateX(20px)';
                toolPanel.style.opacity = '0.5';
            &#125; else &#123;
                toolPanel.style.transform = 'translateX(0)';
                toolPanel.style.opacity = '1';
            &#125;
            lastScrollTop = st &lt;= 0 ? 0 : st;
        &#125;, false);
    </script>

    </div>
  );
}
