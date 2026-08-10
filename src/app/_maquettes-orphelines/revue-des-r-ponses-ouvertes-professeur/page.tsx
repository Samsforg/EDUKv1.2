import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Revue des Réponses" };

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary shadow-md flex justify-between items-center px-8 py-4 w-full sticky top-0 z-50">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-on-primary text-3xl">school</span>
<h1 className="font-headline text-2xl font-bold text-on-primary">Edukora Pro</h1>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-6">
<a className="text-on-primary border-b-2 border-secondary font-medium" href="#">Correction</a>
<a className="text-on-primary/80 hover:text-on-primary transition-colors" href="#">Analyses</a>
</nav>
<div className="flex items-center gap-3">
<div className="text-right hidden sm:block">
<p className="text-on-primary text-sm font-semibold leading-none">Dr. Koffi</p>
<p className="text-on-primary/70 text-xs">Professeur Principal</p>
</div>
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-316.png" alt="A professional headshot of an African male professor in his 50s with glasses, wearing a white shirt and a blue blazer. The background is a blurred academic library with soft lighting, reflecting authority and wisdom. Professional photography style with high clarity and balanced contrast." />
</div>
</div>
</div>
</header>
<main className="flex-grow max-w-6xl mx-auto w-full p-4 md:p-8 flex flex-col md:flex-row gap-8">

<div className="flex-grow space-y-6">

<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
<div>
<h2 className="font-headline text-2xl font-bold text-primary">Koffi Konan</h2>
<p className="text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-sm">groups</span> Terminale C1
                    </p>
</div>
<div className="bg-surface-container text-on-surface p-3 rounded-lg border border-outline-variant">
<p className="text-xs font-bold uppercase tracking-wider text-outline mb-1">Évaluation</p>
<p className="font-semibold text-sm italic">Impacts Écologiques et Climatiques</p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
<div className="bg-surface-container-low p-6 border-b border-outline-variant">
<div className="flex items-center gap-2 text-primary-container mb-2">
<span className="material-symbols-outlined">help_center</span>
<span className="font-bold text-sm uppercase tracking-widest">Énoncé de la question</span>
</div>
<p className="text-lg font-medium text-on-surface leading-relaxed">
                        Expliquez l'impact du cycle de l'eau sur le climat local.
                    </p>
</div>
<div className="p-8">
<div className="flex items-center gap-2 text-outline mb-4">
<span className="material-symbols-outlined">edit_note</span>
<span className="font-bold text-sm uppercase tracking-widest">Réponse de l'élève</span>
</div>
<div className="bg-surface p-6 rounded-lg border border-outline-variant text-on-surface-variant leading-loose italic">
                        "Le cycle de l'eau influence le climat local principalement à travers l'évapotranspiration et la condensation. En Côte d'Ivoire, la proximité de l'océan et les grandes forêts favorisent une forte humidité. Lorsque l'eau s'évapore, elle refroidit l'air environnant. Puis, en se condensant en nuages, elle libère de la chaleur, ce qui régule les températures diurnes et nocturnes. Sans un cycle régulier, on observerait des sécheresses plus fréquentes comme dans le nord du pays."
                    </div>
</div>
</div>

<div className="hidden md:flex justify-between items-center pt-4">
<button className="flex items-center gap-2 px-6 py-2 rounded-lg text-outline font-semibold hover:bg-surface-container transition-all">
<span className="material-symbols-outlined">arrow_back</span>
                    Précédent
                </button>
<div className="flex gap-4">
<button className="flex items-center gap-2 px-6 py-3 rounded-lg text-secondary border border-secondary font-bold hover:bg-secondary-fixed transition-all">
                        Passer à l'élève suivant
                        <span className="material-symbols-outlined">arrow_forward</span>
</button>
<button className="flex items-center gap-2 px-8 py-3 rounded-lg bg-primary text-on-primary font-bold shadow-md hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined">save</span>
                        Enregistrer la correction
                    </button>
</div>
</div>
</div>

<aside className="w-full md:w-96 space-y-6">

<section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-6">
<div className="flex items-center justify-between border-b border-outline-variant pb-4">
<h3 className="font-headline font-bold text-lg text-primary">Notation</h3>
<div className="flex items-center gap-2">
<input className="w-16 text-center border-2 border-primary rounded-lg font-bold text-xl p-2 text-primary focus:ring-0 focus:border-primary-container" type="number" value="4" />
<span className="text-outline font-bold text-lg">/ 5</span>
</div>
</div>
<div className="space-y-4">
<p className="text-xs font-bold text-outline uppercase">Critères d'évaluation</p>
<div className="flex flex-col gap-3">
<button className="flex items-center justify-between w-full p-3 rounded-lg border border-tertiary bg-tertiary-fixed/30 text-tertiary font-medium">
<span className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm">check_circle</span>
                                Compréhension
                            </span>
<span className="text-xs font-bold">Excellent</span>
</button>
<button className="flex items-center justify-between w-full p-3 rounded-lg border border-outline-variant hover:border-primary transition-colors text-on-surface-variant">
<span className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm">visibility</span>
                                Clarté
                            </span>
<span className="material-symbols-outlined text-outline">add</span>
</button>
<button className="flex items-center justify-between w-full p-3 rounded-lg border border-outline-variant hover:border-primary transition-colors text-on-surface-variant">
<span className="flex items-center gap-2">
<span className="material-symbols-outlined text-sm">fact_check</span>
                                Pertinence
                            </span>
<span className="material-symbols-outlined text-outline">add</span>
</button>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-headline font-bold text-lg text-primary">Feedback</h3>
<button className="ai-glow flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold transition-all" id="ai-generate">
<span className="material-symbols-outlined text-xs" style={{"fontVariationSettings":"'FILL' 1"}}>auto_awesome</span>
                        GÉNÉRER PAR IA
                    </button>
</div>
<textarea className="w-full h-32 p-4 border border-outline-variant rounded-lg text-sm text-on-surface-variant focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-outline-variant" placeholder="Saisissez votre commentaire ici..."></textarea>
<div className="hidden animate-in fade-in slide-in-from-top-4 duration-500 bg-primary-fixed/30 p-4 rounded-lg border border-primary-container border-dashed" id="ai-suggestion">
<p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
<span className="material-symbols-outlined text-xs">info</span> Suggestion IA
                    </p>
<p className="text-sm text-on-primary-fixed italic leading-relaxed">
                        "Très bonne analyse des mécanismes thermiques. Vous avez bien fait le lien avec la géographie locale. Pensez à mentionner l'impact sur le cycle agricole la prochaine fois."
                    </p>
<div className="mt-3 flex gap-2">
<button className="text-xs font-bold text-primary hover:underline">Utiliser ce feedback</button>
<button className="text-xs font-bold text-outline hover:underline">Ignorer</button>
</div>
</div>
</section>

<div className="md:hidden flex flex-col gap-3 pt-4">
<button className="w-full py-4 rounded-lg bg-primary text-on-primary font-bold shadow-lg">Enregistrer la correction</button>
<button className="w-full py-3 rounded-lg text-secondary border border-secondary font-bold">Élève suivant</button>
</div>
</aside>
</main>

<div className="h-20"></div>

<nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-outline-variant px-6 py-2 flex justify-between items-center z-50">
<div className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">library_books</span>
<span className="text-[10px] font-medium">Bibliothèque</span>
</div>
<div className="flex flex-col items-center gap-1 text-primary font-bold">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>groups</span>
<span className="text-[10px]">Classes</span>
</div>
<div className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">quiz</span>
<span className="text-[10px] font-medium">Quiz</span>
</div>
<div className="flex flex-col items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined">settings</span>
<span className="text-[10px] font-medium">Paramètres</span>
</div>
</nav>

<footer className="hidden md:flex w-full py-6 px-8 bg-surface-container-highest border-t border-outline-variant flex-row justify-between items-center gap-4 mt-auto">
<p className="font-label text-label-sm text-on-surface-variant">© 2024 Edukora Pro - Plateforme Académique de Côte d'Ivoire</p>
<div className="flex gap-6">
<a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Assistance</a>
<a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Conditions d'utilisation</a>
<a className="text-label-sm text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="#">Confidentialité</a>
</div>
</footer>
<script>
        document.getElementById('ai-generate').addEventListener('click', function() &#123;
            const btn = this;
            const suggestion = document.getElementById('ai-suggestion');
            
            btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin text-xs"&gt;sync&lt;/span&gt; GÉNÉRATION...';
            btn.disabled = true;
            
            setTimeout(() =&gt; &#123;
                suggestion.classList.remove('hidden');
                btn.innerHTML = '&lt;span class="material-symbols-outlined text-xs" style="font-variation-settings: \'FILL\' 1;"&gt;auto_awesome&lt;/span&gt; RÉGÉNÉRER';
                btn.disabled = false;
            &#125;, 1200);
        &#125;);

        // Simple tab switching logic simulation
        const navItems = document.querySelectorAll('nav a, nav div');
        navItems.forEach(item =&gt; &#123;
            item.addEventListener('click', () =&gt; &#123;
                // Mock interaction
                item.style.transform = "scale(0.95)";
                setTimeout(() =&gt; item.style.transform = "scale(1)", 100);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
