import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Grading - Correction Hub" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-surface dark:bg-inverse-surface border-b border-outline-variant dark:border-outline flex justify-between items-center px-6 py-4 z-50">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary dark:text-primary-fixed p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150">menu</button>
<h1 className="font-headline text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora Grading</h1>
</div>
<div className="flex items-center gap-3">
<span className="font-label text-label-sm font-medium text-on-surface-variant hidden md:block">Dr. Koffi</span>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-088.png" alt="A professional headshot of an academic professor in a modern office environment. The professor is a middle-aged West African man with a warm, intelligent expression, wearing professional attire. The lighting is soft and natural, emphasizing a high-end corporate academic aesthetic with the Edukora blue and white color palette." />
</div>
</div>
</header>
<div className="flex h-[calc(100vh-72px)]">

<nav className="h-screen w-72 fixed left-0 top-0 bg-surface-container-low dark:bg-surface-container-lowest hidden lg:flex flex-col gap-2 py-6 z-40 border-r border-outline-variant pt-[88px]">
<div className="px-6 mb-4">
<p className="text-on-surface-variant font-label text-label-xs uppercase tracking-widest">Main Navigation</p>
</div>

<a className="text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>

<a className="bg-primary-container text-on-primary-container dark:bg-primary-fixed dark:text-on-primary-fixed rounded-full mx-2 px-4 py-3 flex items-center gap-3 font-bold transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">edit_note</span>
<span className="font-body text-body-md">Correction Hub</span>
</a>

<a className="text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body text-body-md">Results Analysis</span>
</a>

<a className="text-on-surface-variant dark:text-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">group</span>
<span className="font-body text-body-md">Class Management</span>
</a>
</nav>

<main className="flex-1 lg:ml-72 flex flex-col h-full bg-background relative overflow-hidden">

<div className="bg-surface-container-lowest px-6 py-4 flex justify-between items-center border-b border-outline-variant">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95">
<span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
</button>
<div>
<h2 className="font-headline text-lg font-bold text-on-surface">Jean-Baptiste Kouassi</h2>
<p className="text-label-sm text-on-surface-variant">Question 4 / 12 • Science de la Vie et de la Terre (SVT)</p>
</div>
</div>
<div className="flex items-center gap-2">
<span className="px-3 py-1 bg-tertiary-container text-on-tertiary-container rounded-full text-label-xs font-bold uppercase tracking-wider">In Progress</span>
<span className="px-3 py-1 bg-surface-container text-on-surface-variant rounded-full text-label-xs font-medium">Timer: 02:45</span>
</div>
</div>

<div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">

<section className="max-w-4xl mx-auto">
<div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex items-center gap-2 mb-4 text-primary font-semibold">
<span className="material-symbols-outlined">help</span>
<span className="font-label text-label-sm uppercase">The Question</span>
</div>
<p className="font-headline text-xl leading-relaxed text-on-surface">
                            Expliquez le processus de la photosynthèse et son importance pour le maintien de l'équilibre des gaz atmosphériques. Citez deux facteurs environnementaux qui influencent ce processus.
                        </p>
</div>
</section>

<section className="max-w-4xl mx-auto">
<div className="relative">
<div className="absolute -top-3 left-4 px-2 bg-background z-10 text-label-xs font-bold text-outline uppercase tracking-widest">Student Response</div>
<div className="bg-surface-container-lowest border-2 border-primary-container rounded-xl p-8 min-h-[300px] shadow-lg relative overflow-hidden">

<div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full pointer-events-none"></div>

<div className="handwritten text-lg text-on-surface-variant italic select-none">
                                La photosynthèse est un processus chimique où les plantes vertes captent la lumière du soleil pour transformer l'eau et le dioxyde de carbone en glucose et en oxygène. C'est essentiel car l'oxygène produit est nécessaire pour la respiration des êtres vivants et cela régule le taux de CO2 dans l'air. 
                                <br /><br />
                                Les deux facteurs sont : 1. L'intensité de la lumière et 2. La température ambiante. Plus il y a de lumière, plus la réaction est rapide, sauf si la chaleur devient trop élevée.
                            </div>

<div className="absolute inset-0 pointer-events-none p-8">
<div className="absolute top-[8rem] left-[20rem] px-2 py-1 bg-secondary-container/20 border border-secondary text-secondary rounded text-xs font-bold rotate-2">
                                    Excellent link to gas balance
                                </div>
</div>
</div>
</div>
</section>
</div>

<footer className="bg-surface-container-lowest border-t border-outline-variant p-6 lg:pb-8">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-end">

<div className="flex-1 w-full space-y-4">
<div className="flex flex-wrap gap-4">

<div className="flex items-center gap-3 bg-surface-container p-2 px-4 rounded-xl border border-outline-variant">
<label className="flex items-center gap-2 cursor-pointer group">
<input checked={true} className="w-5 h-5 rounded border-outline text-secondary focus:ring-secondary" type="checkbox" />
<span className="text-label-sm font-medium group-hover:text-primary transition-colors">Method</span>
</label>
<div className="w-px h-4 bg-outline-variant"></div>
<label className="flex items-center gap-2 cursor-pointer group">
<input checked={true} className="w-5 h-5 rounded border-outline text-secondary focus:ring-secondary" type="checkbox" />
<span className="text-label-sm font-medium group-hover:text-primary transition-colors">Result</span>
</label>
<div className="w-px h-4 bg-outline-variant"></div>
<label className="flex items-center gap-2 cursor-pointer group">
<input className="w-5 h-5 rounded border-outline text-secondary focus:ring-secondary" type="checkbox" />
<span className="text-label-sm font-medium group-hover:text-primary transition-colors">Logic</span>
</label>
</div>

<button className="flex items-center gap-2 bg-primary-container text-white px-5 py-2 rounded-xl font-semibold hover:shadow-md active:scale-95 transition-all" id="ai-feedback-btn">
<span className="material-symbols-outlined text-lg">auto_fix_high</span>
<span className="text-label-sm">Suggest AI Feedback</span>
</button>
</div>

<div className="relative group">
<textarea className="w-full h-24 bg-surface border border-outline-variant rounded-xl p-4 text-body-md focus:border-secondary focus:ring-1 focus:ring-secondary transition-all resize-none" placeholder="Write a comment for the student..."></textarea>
<div className="hidden absolute bottom-full left-0 mb-3 w-80 bg-white shadow-2xl rounded-xl border border-primary-container p-4 animate-in fade-in slide-in-from-bottom-2 duration-300" id="ai-suggestion-popover">
<div className="flex items-center gap-2 text-primary font-bold mb-2">
<span className="material-symbols-outlined text-sm">stars</span>
<span className="text-[10px] uppercase tracking-wider">AI Suggestion</span>
</div>
<p className="text-label-sm italic text-on-surface-variant mb-3">"Bonne compréhension du cycle. L'explication sur la régulation du CO2 est précise. Mentionnez également la chlorophylle la prochaine fois."</p>
<button className="w-full py-2 bg-surface-container-high rounded-lg text-primary text-label-xs font-bold hover:bg-primary-container hover:text-white transition-colors">Apply Suggestion</button>
</div>
</div>
</div>

<div className="w-full md:w-auto flex flex-col items-center gap-4">
<div className="flex flex-col items-center">
<span className="text-label-xs font-bold text-outline uppercase mb-2">Attribuer une note</span>
<div className="flex gap-2 p-1 bg-surface-container rounded-full border border-outline-variant shadow-inner">
<button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-surface-variant hover:bg-white transition-colors">0</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-surface-variant hover:bg-white transition-colors">1</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-surface-variant hover:bg-white transition-colors">2</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-surface-variant hover:bg-white transition-colors">3</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-surface-variant bg-white shadow-sm ring-2 ring-primary ring-offset-1">4</button>
<button className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-on-surface-variant hover:bg-white transition-colors">5</button>
</div>
</div>
<button className="w-full md:w-48 py-4 bg-secondary text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 hover:bg-secondary-container transition-all active:scale-95">
<span>Enregistrer et suivant</span>
<span className="material-symbols-outlined">navigate_next</span>
</button>
</div>
</div>
</footer>
</main>
</div>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-2 pt-2 md:hidden bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg rounded-t-xl">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant p-2 rounded-xl transition-transform active:scale-90">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container dark:bg-secondary-fixed-dim dark:text-on-secondary-fixed rounded-full px-5 py-1 scale-95 transition-transform active:scale-90">
<span className="material-symbols-outlined">grading</span>
<span className="font-label text-label-xs font-medium">Note</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant p-2 rounded-xl transition-transform active:scale-90">
<span className="material-symbols-outlined">assessment</span>
<span className="font-label text-label-xs font-medium">Rapports</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-highest dark:hover:bg-surface-variant p-2 rounded-xl transition-transform active:scale-90">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs font-medium">Paramètres</span>
</button>
</nav>
<script>
        // Simple micro-interaction for AI Feedback Popover
        const aiBtn = document.getElementById('ai-feedback-btn');
        const aiPopover = document.getElementById('ai-suggestion-popover');
        
        aiBtn.addEventListener('click', () =&gt; &#123;
            aiPopover.classList.toggle('hidden');
        &#125;);

        // Close popover when clicking elsewhere
        document.addEventListener('click', (e) =&gt; &#123;
            if (!aiBtn.contains(e.target) &amp;&amp; !aiPopover.contains(e.target)) &#123;
                aiPopover.classList.add('hidden');
            &#125;
        &#125;);

        // Toggle Grading Buttons Active State
        const scoreBtns = document.querySelectorAll('.bg-surface-container button');
        scoreBtns.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                scoreBtns.forEach(b =&gt; &#123;
                    b.classList.remove('bg-white', 'shadow-sm', 'ring-2', 'ring-primary', 'ring-offset-1');
                &#125;);
                btn.classList.add('bg-white', 'shadow-sm', 'ring-2', 'ring-primary', 'ring-offset-1');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
