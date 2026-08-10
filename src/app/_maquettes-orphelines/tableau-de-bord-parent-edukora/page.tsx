import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Parent - Dashboard" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary flex items-center justify-between px-4 h-16 shadow-sm">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-362.png" alt="A professional headshot of a middle-aged Ivorian father smiling warmly, wearing a neat navy blue polo shirt. The background is a soft-focus living room with warm sunlight. The image has a clean, high-fidelity corporate feel with rich colors and sharp details, perfectly matching the Edukora light mode aesthetic." />
</div>
<span className="text-on-primary font-headline text-lg font-semibold">Edukora Parent</span>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full text-on-primary hover:bg-primary-container/20 transition-colors duration-200">
<span className="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant flex items-center gap-4">
<div className="w-16 h-16 rounded-xl overflow-hidden shadow-inner">
<img className="w-full h-full object-cover" src="/images/ecran-363.png" alt="A portrait of a teenage boy, Koffi, wearing a crisp white school uniform shirt against a vibrant Forest Green background. He looks focused and optimistic. The lighting is professional studio quality, emphasizing clarity and academic seriousness, in line with the Edukora brand's national pride theme." />
</div>
<div className="flex-1">
<h2 className="font-headline text-xl font-bold text-primary">Koffi Konan</h2>
<p className="text-on-surface-variant text-sm font-medium">Terminale C • Lycée Technique d'Abidjan</p>
<div className="mt-1 flex items-center gap-2">
<span className="flex h-2 w-2 rounded-full bg-tertiary"></span>
<span className="text-xs font-semibold text-tertiary uppercase tracking-wider">Actuellement en ligne</span>
</div>
</div>
<div className="hidden sm:block">
<span className="material-symbols-outlined text-outline-variant">chevron_right</span>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-secondary">analytics</span>
                Vue d'ensemble de la semaine
            </h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant flex flex-col items-center justify-center text-center shadow-sm">
<div className="relative w-32 h-32 mb-4">
<svg className="w-full h-full" viewBox="0 0 100 100">
<circle className="text-surface-container-high stroke-current" cx="50" cy="50" fill="transparent" r="40" strokeWidth="10" />
<circle className="text-tertiary stroke-current progress-ring__circle" cx="50" cy="50" fill="transparent" r="40" strokeDasharray="251.2" strokeDashoffset="62.8" strokeLinecap="round" strokeWidth="10" />
</svg>
<div className="absolute inset-0 flex flex-col items-center justify-center">
<span className="text-2xl font-bold text-on-surface">75%</span>
</div>
</div>
<p className="text-sm font-semibold text-on-surface">Objectifs atteints</p>
<p className="text-xs text-on-surface-variant mt-1">+12% par rapport à la semaine dernière</p>
</div>

<div className="grid grid-cols-2 gap-3">
<div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20 flex flex-col justify-between">
<span className="material-symbols-outlined text-primary mb-2">schedule</span>
<div>
<p className="text-xs font-medium text-primary">Temps d'étude</p>
<p className="text-xl font-bold text-primary">12h</p>
</div>
</div>
<div className="bg-secondary-container/10 p-4 rounded-xl border border-secondary-container/20 flex flex-col justify-between">
<span className="material-symbols-outlined text-secondary mb-2" style={{"fontVariationSettings":"'FILL' 1"}}>local_fire_department</span>
<div>
<p className="text-xs font-medium text-secondary">Série actuelle</p>
<p className="text-xl font-bold text-secondary">5 jours</p>
</div>
</div>
<div className="bg-surface-container-high p-4 rounded-xl border border-outline-variant col-span-2 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="bg-white p-2 rounded-lg">
<span className="material-symbols-outlined text-on-surface">workspace_premium</span>
</div>
<div>
<p className="text-xs font-medium text-on-surface-variant">Moyenne BAC Estimée</p>
<p className="text-lg font-bold text-on-surface">14.5 / 20</p>
</div>
</div>
<span className="text-tertiary font-bold text-sm">↑ 0.4</span>
</div>
</div>
</div>
</section>

<section className="bg-primary rounded-xl p-5 shadow-lg relative overflow-hidden">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-on-primary/10 rounded-full blur-2xl"></div>
<div className="relative z-10 flex gap-4">
<div className="flex-shrink-0">
<div className="bg-on-primary p-2 rounded-full shadow-sm">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
</div>
<div className="space-y-2">
<h4 className="text-on-primary font-headline font-bold text-md flex items-center gap-2">
                        Avis du Tuteur IA
                    </h4>
<p className="text-on-primary/90 text-sm leading-relaxed">
                        Koffi progresse bien en <span className="font-bold">Mathématiques</span>, particulièrement sur les intégrales. Encouragez-le à continuer ses efforts en <span className="font-bold">Physique-Chimie</span> pour stabiliser ses résultats.
                    </p>
</div>
</div>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-headline text-lg font-bold text-on-surface">Derniers résultats</h3>
<button className="text-primary text-sm font-semibold hover:underline">Voir tout</button>
</div>
<div className="space-y-3">

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:border-primary transition-colors">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary">functions</span>
</div>
<div>
<p className="font-bold text-on-surface">Mathématiques</p>
<p className="text-xs text-on-surface-variant">Examen Blanc N°2 • Hier</p>
</div>
</div>
<div className="text-right">
<p className="text-lg font-bold text-primary">16/20</p>
<span className="text-tertiary flex items-center justify-end text-xs font-bold">
<span className="material-symbols-outlined text-xs">trending_up</span> 15%
                        </span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex items-center justify-between hover:border-primary transition-colors">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container-high rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined text-primary">biotech</span>
</div>
<div>
<p className="font-bold text-on-surface">Sciences Physiques</p>
<p className="text-xs text-on-surface-variant">Quiz de révision • 2 j.</p>
</div>
</div>
<div className="text-right">
<p className="text-lg font-bold text-on-surface">13/20</p>
<span className="text-error flex items-center justify-end text-xs font-bold">
<span className="material-symbols-outlined text-xs">trending_down</span> 5%
                        </span>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant px-2 h-20 flex justify-around items-center shadow-lg rounded-t-xl">

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="dashboard" style={{"fontVariationSettings":"'FILL' 1"}}>dashboard</span>
<span className="font-label text-label-xs font-semibold">Tableau de bord</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="assignment">assignment</span>
<span className="font-label text-label-xs font-semibold">Examens</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-label text-label-xs font-semibold">Assiduité</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-95 transition-transform duration-150" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for cards
        document.querySelectorAll('.bg-surface-container-lowest').forEach(card =&gt; &#123;
            card.addEventListener('touchstart', () =&gt; &#123;
                card.style.transform = 'scale(0.98)';
                card.style.transition = 'transform 0.1s ease';
            &#125;);
            card.addEventListener('touchend', () =&gt; &#123;
                card.style.transform = 'scale(1)';
            &#125;);
        &#125;);

        // Simple animation for progress ring on load
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const circle = document.querySelector('.progress-ring__circle');
            if (circle) &#123;
                const radius = circle.r.baseVal.value;
                const circumference = radius * 2 * Math.PI;
                circle.style.strokeDasharray = `$&#123;circumference&#125; $&#123;circumference&#125;`;
                
                // Target: 75% coverage
                const offset = circumference - (0.75 * circumference);
                setTimeout(() =&gt; &#123;
                    circle.style.strokeDashoffset = offset;
                &#125;, 300);
            &#125;
        &#125;);
    </script>

    </div>
  );
}
