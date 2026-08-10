import type { Metadata } from "next";

export const metadata: Metadata = { title: "EduKora BAC - Suivi des Corrections" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center px-4 h-16 w-full z-50 bg-surface border-b border-outline-variant sticky top-0">
<div className="flex items-center gap-3">
<button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-low transition-colors active:scale-95 duration-100">menu</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">EduKora BAC</h1>
</div>
<div className="flex items-center">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-336.png" alt="A professional studio portrait of a serious yet approachable university student with short dark hair, wearing a clean navy blue polo shirt. The lighting is soft and directional, typical of a corporate headshot, with a neutral light-grey background that emphasizes clarity and professionalism in an academic context." />
</div>
</div>
</header>
<main className="max-w-5xl mx-auto px-4 pt-6 space-y-8">

<section>
<h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-2">Suivi des Corrections</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Suivez l'avancement de vos soumissions et gérez vos certifications.</p>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-gutter">

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col gap-2">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-impact-emerald" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="font-label-md text-label-md text-impact-emerald bg-impact-emerald/10 px-2 py-1 rounded-full">Objectif atteint</span>
</div>
<div className="font-metric-num text-metric-num text-on-surface">8</div>
<div className="font-label-md text-label-md text-on-surface-variant">Fiches Certifiées</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col gap-2">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-validation-amber">pending_actions</span>
</div>
<div className="font-metric-num text-metric-num text-on-surface">3</div>
<div className="font-label-md text-label-md text-on-surface-variant">En attente</div>
</div>

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col gap-2 border-l-4 border-l-error">
<div className="flex justify-between items-start">
<span className="material-symbols-outlined text-error">assignment_late</span>
<span className="bg-error-container text-on-error-container px-2 py-0.5 rounded font-label-md text-label-md">Urgent</span>
</div>
<div className="font-metric-num text-metric-num text-on-surface">2</div>
<div className="font-label-md text-label-md text-on-surface-variant">À corriger</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined">feedback</span>
                Actions Requises
            </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">

<div className="group bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
<div className="p-5 space-y-4">
<div className="flex justify-between">
<div>
<span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-sm font-label-md text-label-md">Maths</span>
<h4 className="font-title-md text-title-md mt-1">Dérivées et Primitives</h4>
</div>
<div className="text-right">
<p className="font-label-md text-label-md text-on-surface-variant">Revu par</p>
<p className="font-body-md text-body-md font-bold text-primary">Dr. Aris Thorne</p>
</div>
</div>
<div className="bg-surface-container-low p-3 rounded text-on-surface-variant font-body-md text-body-md italic border-l-2 border-error">
                            "Attention à la rigueur sur le calcul des limites aux bornes de l'ensemble de définition."
                        </div>
<div className="flex justify-end gap-3">
<button className="px-4 py-2 text-primary font-bold font-body-md hover:bg-surface-container transition-colors rounded">Détails</button>
<button className="bg-primary px-6 py-2 text-on-primary rounded font-bold font-body-md active:scale-95 transition-transform">Modifier</button>
</div>
</div>
</div>

<div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl flex items-center justify-center p-8 opacity-60">
<div className="text-center">
<span className="material-symbols-outlined text-4xl mb-2">add_task</span>
<p className="font-body-md text-body-md">Aucune autre action urgente pour le moment</p>
</div>
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-title-md text-title-md text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined">history</span>
                Toutes mes soumissions
            </h3>
<div className="bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container-low border-b border-surface-border">
<tr>
<th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Fiche</th>
<th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Date</th>
<th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-center">Statut</th>
<th className="px-6 py-3 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-right">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-border">

<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4">
<p className="font-body-md text-body-md font-bold">Logarithmes</p>
<p className="text-[11px] text-on-surface-variant">Mathématiques</p>
</td>
<td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">12 Mai 2024</td>
<td className="px-6 py-4 text-center">
<span className="bg-impact-emerald/15 text-impact-emerald px-3 py-1 rounded-full font-label-md text-label-md inline-flex items-center gap-1">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                                    Certifiée
                                </span>
</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary">visibility</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4">
<p className="font-body-md text-body-md font-bold">Thermodynamique</p>
<p className="text-[11px] text-on-surface-variant">Physique-Chimie</p>
</td>
<td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">18 Mai 2024</td>
<td className="px-6 py-4 text-center">
<span className="bg-validation-amber/15 text-validation-amber px-3 py-1 rounded-full font-label-md text-label-md inline-flex items-center gap-1">
<span className="material-symbols-outlined text-xs">sync</span>
                                    En cours
                                </span>
</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary">visibility</button>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4">
<p className="font-body-md text-body-md font-bold">Probabilités</p>
<p className="text-[11px] text-on-surface-variant">Mathématiques</p>
</td>
<td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">20 Mai 2024</td>
<td className="px-6 py-4 text-center">
<span className="bg-error/15 text-error px-3 py-1 rounded-full font-label-md text-label-md inline-flex items-center gap-1">
<span className="material-symbols-outlined text-xs">error</span>
                                    À corriger
                                </span>
</td>
<td className="px-6 py-4 text-right">
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary">edit_square</button>
</td>
</tr>
</tbody>
</table>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface shadow-[0_-2px_8px_rgba(0,0,0,0.05)] rounded-t-xl border-t border-surface-border">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-[10px]">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>library_books</span>
<span className="font-label-xs text-[10px]">Sujets</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">timer</span>
<span className="font-label-xs text-[10px]">Simulateur</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-[10px]">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for buttons
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
