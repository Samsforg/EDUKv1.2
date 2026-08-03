import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Analyse Pédagogique" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky z-50 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-container-desktop h-16">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary text-2xl">analytics</span>
<h1 className="font-display-lg text-headline-md font-bold text-primary">Tableau de bord Edukora</h1>
</div>
<div className="flex items-center gap-base">
<button className="flex items-center gap-2 px-4 py-2 text-on-surface-variant hover:bg-surface-container-low transition-colors rounded-lg">
<span className="material-symbols-outlined">notifications</span>
</button>
<div className="h-8 w-px bg-outline-variant mx-2"></div>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:opacity-90 active:scale-95 duration-150">
                File de validation
            </button>
</div>
</header>
<div className="flex min-h-[calc(100vh-64px)]">

<aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-[280px] bg-surface-container-lowest border-r border-outline-variant flex flex-col gap-base p-stack-md overflow-y-auto">
<div className="flex items-center gap-4 mb-6 px-2">
<div className="w-12 h-12 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-014.png" alt="A professional headshot of a middle-aged academic professor with short hair and glasses, wearing a sharp navy blue blazer over a crisp white shirt. The background is a blurred university library with warm wooden tones and rows of books, creating an atmosphere of intellectual authority and professional reliability. Soft, natural light illuminates the subject's face, highlighting a calm and competent expression." />
</div>
<div>
<p className="font-bold text-on-surface">Dr. Aris Thorne</p>
<p className="text-label-md text-on-surface-variant uppercase tracking-wider">Senior Faculty</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">monitoring</span>
<span className="font-body-md">Impact Metrics</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg transition-all" href="#">
<span className="material-symbols-outlined">verified_user</span>
<span className="font-body-md">Validation Lab</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-body-md">Course Insights</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-body-md">Communauté d'experts</span>
</a>
<div className="mt-auto pt-10">
<a className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container transition-all rounded-lg" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md">Paramètres</span>
</a>
</div>
</nav>
</aside>

<main className="ml-[280px] flex-1 p-container-desktop pb-32">

<div className="mb-8 flex justify-between items-end">
<div>
<div className="flex items-center gap-3 mb-2">
<span className="px-3 py-1 bg-validation-amber/10 text-validation-amber text-label-md rounded-full font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]">sync</span> EN COURS D'EXAMEN
                        </span>
<span className="text-on-surface-variant text-label-md">• ID: #44092-MAT</span>
</div>
<h2 className="font-display-lg text-headline-lg text-primary">Analyse Pédagogique</h2>
<p className="text-body-lg text-on-surface-variant mt-1">
                        Auteur : <span className="font-bold text-on-surface">Lucas Vaneuil</span> • Licence Mathématiques L3
                    </p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
<span className="material-symbols-outlined">download</span> Télécharger
                    </button>
<button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors">
<span className="material-symbols-outlined">history</span> Historique
                    </button>
</div>
</div>

<div className="grid grid-cols-12 gap-gutter">

<div className="col-span-8 space-y-gutter">
<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-8 relative overflow-hidden">

<div className="prose max-w-none text-on-surface">
<h3 className="font-headline-md text-primary mb-4">Théorème de Green-Riemann : Application aux Flux de Fluides</h3>
<p className="text-body-lg mb-6 leading-relaxed">
                                Le théorème de Green-Riemann permet d'établir une relation fondamentale entre une intégrale curviligne le long d'une courbe fermée simple \(C\) et une intégrale double sur la région \(D\) délimitée par \(C\). Dans le cadre de la dynamique des fluides, ce théorème est utilisé pour calculer la circulation d'un champ de vecteurs.
                            </p>

<div className="bg-surface-container-low p-6 rounded-lg my-6 text-center border-l-4 border-primary">
<p className="text-title-md font-serif italic mb-2">Formule Fondamentale :</p>
<div className="text-display-lg text-primary-container font-light">
                                    ∮<sub>C</sub> (P dx + Q dy) = ∬<sub>D</sub> (∂Q/∂x - ∂P/∂y) dA
                                </div>
<p className="text-label-md text-on-surface-variant mt-4">Equation (1.1) - Relation de circulation-divergence</p>
</div>
<p className="text-body-lg mb-4">
<span className="text-highlight" title="Cliquez pour commenter">Pour que le théorème soit applicable</span>, il est impératif que les fonctions \(P\) et \(Q\) possèdent des dérivées partielles continues sur un ouvert contenant \(D\). 
                            </p>

<div className="my-6 border border-surface-border p-6 rounded-lg bg-surface-bright">
<h4 className="font-bold mb-3 flex items-center gap-2">
<span className="material-symbols-outlined text-expert-purple">function</span> Démonstration de la composante rotationnelle
                                </h4>
<p className="text-body-md text-on-surface-variant mb-4">
                                    Si nous considérons un champ de vitesse \(\mathbf&#123;v&#125; = (u, v)\), alors la circulation \(\Gamma\) est donnée par :
                                </p>
<div className="bg-white p-4 rounded shadow-sm border border-outline-variant font-mono text-center">
                                    Γ = ∮ (u dx + v dy) = ∬ (rot v)_z dA
                                </div>
</div>
</div>

<div className="hidden absolute bg-primary text-on-primary px-3 py-2 rounded-lg shadow-xl text-label-md flex items-center gap-2 animate-bounce" id="selection-popover">
<span className="material-symbols-outlined text-sm">add_comment</span> AJOUTER UN COMMENTAIRE
                        </div>
</div>

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-8">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">edit_note</span>
<h3 className="font-headline-md text-primary">Correction de l'Expert</h3>
</div>
<textarea className="w-full h-32 p-4 rounded-lg border-surface-border focus:ring-primary focus:border-primary bg-surface-bright text-body-lg placeholder-on-surface-variant/50 resize-none" placeholder="Saisissez vos observations globales sur la structure pédagogique et la rigueur scientifique..."></textarea>
<div className="flex justify-end mt-4">
<button className="text-primary font-bold text-body-md flex items-center gap-1 hover:underline">
<span className="material-symbols-outlined text-sm">attachment</span> Joindre une ressource de référence
                            </button>
</div>
</div>
</div>

<div className="col-span-4 space-y-gutter">

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<h3 className="font-title-md text-primary mb-6">Évaluation par Critères</h3>
<div className="space-y-6">

<div>
<div className="flex justify-between mb-2">
<span className="text-body-md font-bold">Clarté Pédagogique</span>
<span className="text-expert-purple font-bold">8/10</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-expert-purple" max={10} min={0} type="range" value="8" />
</div>

<div>
<div className="flex justify-between mb-2">
<span className="text-body-md font-bold">Précision Scientifique</span>
<span className="text-expert-purple font-bold">6/10</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-expert-purple" max={10} min={0} type="range" value="6" />
</div>

<div>
<div className="flex justify-between mb-2">
<span className="text-body-md font-bold">Complétude (LaTeX)</span>
<span className="text-expert-purple font-bold">9/10</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-expert-purple" max={10} min={0} type="range" value="9" />
</div>
</div>
<div className="mt-8 pt-6 border-t border-surface-border">
<div className="flex items-center justify-between">
<span className="text-body-lg font-bold text-on-surface">Score Global</span>
<div className="text-metric-num text-primary font-bold bg-primary/5 px-4 py-1 rounded-lg">7.7<span className="text-label-md">/10</span></div>
</div>
</div>
</div>

<div className="bg-expert-purple/5 border border-expert-purple/20 rounded-xl p-6">
<div className="flex items-center gap-2 mb-3">
<span className="px-3 py-1 bg-expert-purple/10 text-expert-purple text-label-md rounded-full font-bold flex items-center gap-1 uppercase">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span> Statut d'expert : Responsable
                            </span>
</div>
<p className="text-body-md text-on-surface-variant leading-tight">
                            Votre validation certifie cette fiche pour la bibliothèque partagée d'Edukora.
                        </p>
</div>

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<h3 className="font-title-md text-on-surface mb-4">Annotations (2)</h3>
<div className="space-y-4">
<div className="p-3 bg-validation-amber/5 border-l-2 border-validation-amber rounded-r">
<p className="text-label-md font-bold text-validation-amber mb-1 italic">"Pour que le théorème..."</p>
<p className="text-body-md">Préciser la continuité sur le bord ∂D également.</p>
</div>
<div className="p-3 bg-primary/5 border-l-2 border-primary rounded-r">
<p className="text-label-md font-bold text-primary mb-1 italic">"Equation (1.1)"</p>
<p className="text-body-md">Utilisation parfaite de l'environnement align.</p>
</div>
</div>
</div>
</div>
</div>
</main>

<footer className="fixed bottom-0 right-0 left-0 h-20 glass-panel border-t border-outline-variant z-50 flex items-center px-container-desktop">
<div className="flex-1">
<p className="text-label-md text-on-surface-variant font-bold uppercase tracking-widest">Action Immédiate Requise</p>
</div>
<div className="flex gap-4">
<button className="px-6 py-2.5 rounded-lg border border-on-surface-variant text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors flex items-center gap-2">
<span className="material-symbols-outlined">feedback</span> Demander des corrections
                </button>
<button className="px-6 py-2.5 rounded-lg border border-error text-error font-bold hover:bg-error/5 transition-colors flex items-center gap-2">
<span className="material-symbols-outlined">close</span> Rejeter
                </button>
<button className="px-8 py-2.5 rounded-lg bg-primary text-on-primary font-bold hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all flex items-center gap-2">
<span className="material-symbols-outlined">verified</span> Certifier la fiche
                </button>
</div>
</footer>
</div>

<script>
        document.addEventListener('mouseup', function(e) &#123;
            const selection = window.getSelection();
            const popover = document.getElementById('selection-popover');
            
            if (selection &amp;&amp; selection.toString().length &gt; 0) &#123;
                const range = selection.getRangeAt(0);
                const rect = range.getBoundingClientRect();
                
                popover.style.left = `$&#123;rect.left + (rect.width / 2) - 80&#125;px`;
                popover.style.top = `$&#123;rect.top + window.scrollY - 45&#125;px`;
                popover.classList.remove('hidden');
            &#125; else &#123;
                popover.classList.add('hidden');
            &#125;
        &#125;);

        // Toggle hover effect on the certification button
        const certifyBtn = document.querySelector('button.bg-primary');
        certifyBtn.addEventListener('mouseenter', () =&gt; &#123;
            certifyBtn.classList.add('translate-y-[-2px]');
        &#125;);
        certifyBtn.addEventListener('mouseleave', () =&gt; &#123;
            certifyBtn.classList.remove('translate-y-[-2px]');
        &#125;);
    </script>

    </div>
  );
}
