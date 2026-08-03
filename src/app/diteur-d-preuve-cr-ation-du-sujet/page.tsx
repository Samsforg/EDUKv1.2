import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Éditeur de Tests Blancs" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-sm flex items-center justify-between px-margin-desktop h-16 w-full">
<div className="flex items-center gap-4">
<button className="text-on-primary dark:text-on-primary-container p-2 hover:bg-primary-container/20 transition-colors active:scale-95 duration-150 rounded-full">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-on-primary dark:text-on-primary-container">Edukora Pro - Tests Blancs</h1>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-8">
<span className="text-on-primary font-bold transition-colors cursor-pointer">Éditeur</span>
<span className="text-on-primary-fixed-variant hover:bg-primary-container/20 px-3 py-1 rounded transition-colors cursor-pointer">Aperçu</span>
<span className="text-on-primary-fixed-variant hover:bg-primary-container/20 px-3 py-1 rounded transition-colors cursor-pointer">Banque</span>
</nav>
<div className="h-10 w-10 rounded-full bg-surface-container-high border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-123.png" alt="A professional headshot of a teacher for an academic profile avatar. The person is smiling warmly, wearing a formal suit. The background is a clean, minimalist university office with soft natural lighting and a blur of bookshelves. The visual style is high-definition photography with a focus on trustworthy and approachable professional branding." />
</div>
</div>
</header>
<div className="flex pt-16 h-screen">

<aside className="hidden md:flex flex-col h-full w-72 bg-surface dark:bg-surface-container-low border-r border-outline-variant py-4 shrink-0 overflow-y-auto">
<div className="px-6 mb-8 flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary font-bold text-xl">E</div>
<div>
<p className="font-headline font-bold text-primary text-lg">Prof. Koffi</p>
<p className="text-xs text-on-surface-variant">Lycée Classique d'Abidjan</p>
</div>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-full mx-2 active:opacity-80" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de Bord</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-full mx-2 active:opacity-80" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-body text-body-md">Mes Classes</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 active:opacity-80" href="#">
<span className="material-symbols-outlined">quiz</span>
<span className="font-body text-body-md">Tests Blancs</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-full mx-2 active:opacity-80" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-body text-body-md">Banque de Questions</span>
</a>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-full mx-2 active:opacity-80 mt-auto" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 overflow-y-auto bg-surface-container-lowest p-margin-mobile md:p-margin-desktop">
<div className="max-w-5xl mx-auto">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
<div>
<div className="flex items-center gap-2 text-primary mb-2">
<span className="material-symbols-outlined text-base">edit_note</span>
<span className="text-label-sm font-bold uppercase tracking-widest">Session: BAC Blanc 2024</span>
</div>
<h2 className="font-display text-display-lg-mobile md:text-display-lg text-on-surface">Édition des Exercices</h2>
<p className="text-on-surface-variant mt-1">Mathématiques - Série C</p>
</div>

<div className="bg-surface-container p-4 rounded-xl border border-outline-variant flex items-center gap-6 shadow-sm">
<div className="flex flex-col">
<span className="text-label-xs uppercase text-on-surface-variant">Total Points</span>
<div className="flex items-baseline gap-1">
<span className="text-3xl font-bold text-primary" id="total-points">12.5</span>
<span className="text-xl font-bold text-outline">/ 20</span>
</div>
</div>
<div className="h-10 w-px bg-outline-variant"></div>
<button className="flex items-center gap-2 bg-on-primary-container text-primary-container px-4 py-2 rounded-lg font-bold text-label-sm hover:brightness-95 transition-all">
<span className="material-symbols-outlined text-lg">visibility</span>
                            Aperçu Élève
                        </button>
</div>
</div>

<div className="space-y-8">

<section className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm hover:shadow-md transition-shadow">
<div className="bg-surface-container-high px-6 py-4 flex items-center justify-between border-b border-outline-variant">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center font-bold">1</div>
<h3 className="font-headline font-semibold text-lg">Exercice 1: Analyse Numérique</h3>
</div>
<div className="flex items-center gap-3">
<div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded px-3 py-1">
<input className="w-12 bg-transparent border-none p-0 focus:ring-0 font-bold text-primary" type="number" value="4.5" />
<span className="text-sm font-medium text-on-surface-variant">pts</span>
</div>
<button className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<div className="p-6 space-y-6">

<div className="relative pl-8 border-l-2 border-primary-container/30 py-2">
<div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-primary-container"></div>
<div className="flex justify-between mb-2">
<span className="font-bold text-on-surface">1.a) Énoncé de la question</span>
<span className="text-label-xs text-on-surface-variant">1.5 pts</span>
</div>
<textarea className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary transition-all mb-3" rows={2}>Démontrer que pour tout n appartenant à N, la suite (Un) est convergente.</textarea>

<div className="bg-white border border-outline-variant rounded p-3 mb-3 font-mono text-sm flex items-center justify-between">
<code className="text-secondary">f(x) = \lim_&#123;n \to \infty&#125; \sum_&#123;k=0&#125;^&#123;n&#125; \frac&#123;1&#125;&#123;k!&#125;</code>
<button className="text-primary hover:underline text-xs flex items-center gap-1">
<span className="material-symbols-outlined text-sm">functions</span> Éditer Formule
                                    </button>
</div>
</div>

<div className="relative pl-8 border-l-2 border-primary-container/30 py-2">
<div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-primary-container"></div>
<div className="flex justify-between mb-2">
<span className="font-bold text-on-surface">1.b) Lecture graphique</span>
<span className="text-label-xs text-on-surface-variant">3.0 pts</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div className="md:col-span-2">
<textarea className="w-full bg-surface-container-low border-outline-variant rounded-lg p-3 text-body-md focus:border-primary focus:ring-1 focus:ring-primary h-32 mb-2" placeholder="Saisissez la question ici..."></textarea>
<div className="flex gap-2">
<button className="bg-surface-container-highest text-on-surface-variant px-3 py-1.5 rounded-lg text-label-sm border border-outline-variant flex items-center gap-2 hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">add_photo_alternate</span> Joindre un schéma
                                            </button>
<button className="bg-surface-container-highest text-on-surface-variant px-3 py-1.5 rounded-lg text-label-sm border border-outline-variant flex items-center gap-2 hover:bg-surface-container-high transition-all">
<span className="material-symbols-outlined text-sm">attachment</span> Fichier ressources
                                            </button>
</div>
</div>
<div className="bg-surface-container-highest rounded-lg border-2 border-dashed border-outline-variant flex items-center justify-center p-2 group relative cursor-pointer">
<img className="w-full h-full object-contain rounded opacity-80 group-hover:opacity-100 transition-opacity" src="/images/ecran-124.png" alt="A clean, mathematical Cartesian coordinate system plot showing a parabolic curve in professional academic style. The graph uses a white background with sharp black axes and a bright blue line for the function. The style is that of a modern educational textbook illustration with clear, high-contrast labels and grid lines, lit evenly with high-key lighting for maximum legibility." />
<button className="absolute top-2 right-2 p-1 bg-error/90 text-on-error rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
<span className="material-symbols-outlined text-sm">close</span>
</button>
</div>
</div>
</div>
<button className="w-full py-3 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2 font-semibold">
<span className="material-symbols-outlined">add_circle</span> Ajouter une sous-question
                            </button>
</div>
</section>

<section className="bg-surface rounded-xl border border-outline-variant overflow-hidden shadow-sm">
<div className="bg-surface-container-high px-6 py-4 flex items-center justify-between border-b border-outline-variant">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded bg-primary text-on-primary flex items-center justify-center font-bold">2</div>
<h3 className="font-headline font-semibold text-lg">Problème: Géométrie dans l'espace</h3>
</div>
<div className="flex items-center gap-3">
<div className="flex items-center bg-surface-container-lowest border border-outline-variant rounded px-3 py-1">
<input className="w-12 bg-transparent border-none p-0 focus:ring-0 font-bold text-primary" type="number" value="8.0" />
<span className="text-sm font-medium text-on-surface-variant">pts</span>
</div>
<button className="p-2 text-error hover:bg-error-container/20 rounded-lg transition-colors">
<span className="material-symbols-outlined">delete</span>
</button>
</div>
</div>
<div className="p-8 flex flex-col items-center justify-center text-center">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center mb-4">
<span className="material-symbols-outlined text-3xl text-outline">description</span>
</div>
<h4 className="font-headline font-semibold text-on-surface">Détails du Problème</h4>
<p className="text-on-surface-variant text-body-md max-w-sm mb-6">Ce bloc contient les questions structurantes. Les points sont répartis sur 4 parties.</p>
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:shadow-lg active:scale-95 transition-all">
                                Configurer les parties
                            </button>
</div>
</section>

<div className="flex justify-center py-4">
<button className="group flex items-center gap-3 bg-secondary-container text-on-secondary-container px-8 py-4 rounded-full font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all">
<span className="material-symbols-outlined bg-on-secondary-container text-secondary-container rounded-full p-1 group-hover:rotate-90 transition-transform">add</span>
                            Nouvel Exercice
                        </button>
</div>
</div>
</div>

<div className="h-20 md:hidden"></div>
</main>
</div>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-highest dark:bg-surface-container-low shadow-lg border-t border-outline-variant flex justify-around items-center px-4 py-2 w-full md:hidden">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined">visibility</span>
<span className="font-label text-label-xs uppercase tracking-wider">Aperçu</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2 h-12 w-16 active:scale-90 transition-transform cursor-pointer">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>edit_note</span>
<span className="font-label text-label-xs uppercase tracking-wider">Éditeur</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined">tune</span>
<span className="font-label text-label-xs uppercase tracking-wider">Paramètres</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer">
<span className="material-symbols-outlined">send</span>
<span className="font-label text-label-xs uppercase tracking-wider">Publier</span>
</div>
</nav>

<div className="fixed bottom-24 right-8 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-lg shadow-2xl flex items-center gap-3 translate-y-20 opacity-0 transition-all duration-300 z-[60]" id="save-toast">
<span className="material-symbols-outlined text-tertiary-fixed">check_circle</span>
<span className="font-medium">Modifications enregistrées</span>
</div>
<script>
        // Simple micro-interaction for auto-saving simulation
        let saveTimeout;
        const textareas = document.querySelectorAll('textarea, input');
        const toast = document.getElementById('save-toast');

        textareas.forEach(el =&gt; &#123;
            el.addEventListener('input', () =&gt; &#123;
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() =&gt; &#123;
                    toast.classList.remove('translate-y-20', 'opacity-0');
                    setTimeout(() =&gt; &#123;
                        toast.classList.add('translate-y-20', 'opacity-0');
                    &#125;, 2000);
                &#125;, 1500);
            &#125;);
        &#125;);

        // Dynamic points tallying (demo logic)
        function updateTotal() &#123;
            const pointInputs = document.querySelectorAll('input[type="number"]');
            let total = 0;
            pointInputs.forEach(input =&gt; &#123;
                total += parseFloat(input.value) || 0;
            &#125;);
            document.getElementById('total-points').innerText = total.toFixed(1);
            
            // Color feedback
            const tallyText = document.getElementById('total-points');
            if (total === 20) &#123;
                tallyText.classList.replace('text-primary', 'text-tertiary');
            &#125; else if (total &gt; 20) &#123;
                tallyText.classList.replace('text-primary', 'text-error');
            &#125; else &#123;
                tallyText.className = 'text-3xl font-bold text-primary';
            &#125;
        &#125;

        document.querySelectorAll('input[type="number"]').forEach(input =&gt; &#123;
            input.addEventListener('change', updateTotal);
        &#125;);
    </script>

    </div>
  );
}
