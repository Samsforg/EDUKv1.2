import type { Metadata } from "next";

export const metadata: Metadata = { title: "Détail du Replay - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body antialiased" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-inverse-surface flex justify-between items-center px-4 h-16 w-full sticky top-0 z-40 border-b border-outline-variant dark:border-outline">
<div className="flex items-center gap-4">
<button className="active:scale-95 duration-100 hover:bg-surface-container-high transition-colors p-2 rounded-full">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-primary dark:text-primary-fixed">Replay de session</h1>
</div>
<div className="flex items-center gap-2">
<button className="material-symbols-outlined text-on-surface-variant p-2">share</button>
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs border border-outline-variant">JD</div>
</div>
</header>
<main className="max-w-[1200px] mx-auto pb-24 lg:grid lg:grid-cols-12 lg:gap-8 lg:p-6">

<section className="lg:col-span-8">
<div className="relative w-full aspect-video bg-black shadow-lg overflow-hidden lg:rounded-xl">

<div className="absolute inset-0 flex items-center justify-center">
<div className="w-full h-full opacity-40 bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDP2pUNED5FYZfxf4lY18aZev7SiJuZCsvq6SzHLMN1OsM5WFOS-OmTKXBQDU22gruCrsCv89RbCqf632qP5eAx5uh2W7mSgNJLDWp6FLNWYjI7E2dXaffeQ0LtzTJCiW3elYF6GgPoew66eThwySD7vnPvVsxHhBt8YH71kndrJfI3pBe8rNfqd5JwKeXjFYEPlgahIAo8L8qwlmkIcjlbw2O0TsGDa5OQA1W4JGw-TqyXEm_TN9Rk')"}}></div>
<button className="z-10 group flex items-center justify-center w-20 h-20 bg-secondary-container text-on-secondary-container rounded-full active:scale-90 transition-all shadow-xl">
<span className="material-symbols-outlined text-5xl" style={{"fontVariationSettings":"'FILL' 1"}}>play_arrow</span>
</button>
</div>

<div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
<div className="w-full h-1 bg-surface-variant/30 rounded-full mb-4 relative cursor-pointer">
<div className="absolute top-0 left-0 w-1/3 h-full bg-secondary-container"></div>
<div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-3 h-3 bg-secondary-fixed rounded-full shadow-md"></div>
</div>
<div className="flex items-center justify-between text-white">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer">play_arrow</span>
<span className="material-symbols-outlined cursor-pointer">skip_next</span>
<span className="material-symbols-outlined cursor-pointer">volume_up</span>
<span className="text-sm font-label">15:30 / 45:00</span>
</div>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer">closed_caption</span>
<span className="material-symbols-outlined cursor-pointer">settings</span>
<span className="material-symbols-outlined cursor-pointer">fullscreen</span>
</div>
</div>
</div>
</div>

<div className="p-4 lg:px-0">
<h2 className="font-headline text-display-lg-mobile md:text-headline-md font-bold text-primary mb-2">Révision Intensive : Fonctions Logarithmes &amp; Exponentielles</h2>
<div className="flex flex-wrap items-center gap-3 text-on-surface-variant mb-6">
<span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">Mathématiques</span>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">calendar_today</span>
<span className="text-xs">Diffusé le 12 Oct. 2023</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-sm">group</span>
<span className="text-xs">1,240 Etudiants</span>
</div>
</div>

<div className="border-b border-outline-variant mb-6 flex overflow-x-auto hide-scrollbar">
<button className="px-6 py-3 font-label text-sm font-semibold border-b-2 border-primary text-primary transition-all whitespace-nowrap" id="btn-description">Description</button>
<button className="px-6 py-3 font-label text-sm font-semibold border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-all whitespace-nowrap" id="btn-moments">Moments Clés</button>
<button className="px-6 py-3 font-label text-sm font-semibold border-b-2 border-transparent text-on-surface-variant hover:text-primary transition-all whitespace-nowrap" id="btn-ressources">Ressources</button>
</div>

<div className="space-y-4" id="tab-description">
<p className="text-body-md text-on-surface leading-relaxed">
                        Cette session de révision intensive couvre l'intégralité du programme sur les fonctions logarithmes et exponentielles pour le BAC. Nous abordons les propriétés fondamentales, les limites usuelles, et nous résolvons ensemble trois exercices types des sessions précédentes.
                    </p>
<div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
<h4 className="font-bold text-primary mb-2">Objectifs d'apprentissage :</h4>
<ul className="list-disc list-inside text-sm space-y-1 text-on-surface-variant">
<li>Maîtriser le calcul de dérivées complexes.</li>
<li>Comprendre le comportement aux bornes (limites).</li>
<li>Savoir dresser un tableau de variations complet.</li>
</ul>
</div>
</div>
<div className="hidden space-y-2" id="tab-moments">
<div className="group flex items-center justify-between p-3 bg-surface-container hover:bg-surface-container-high rounded-xl cursor-pointer transition-all border border-transparent hover:border-outline-variant">
<div className="flex items-center gap-4">
<span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label text-xs font-bold">02:00</span>
<span className="text-on-surface font-medium">Introduction et rappel du plan de session</span>
</div>
<span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">play_circle</span>
</div>
<div className="group flex items-center justify-between p-3 bg-surface-container hover:bg-surface-container-high rounded-xl cursor-pointer transition-all border border-transparent hover:border-outline-variant">
<div className="flex items-center gap-4">
<span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label text-xs font-bold">15:30</span>
<span className="text-on-surface font-medium">Résolution Problème 1 : Étude de fonction ln(x)</span>
</div>
<span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">play_circle</span>
</div>
<div className="group flex items-center justify-between p-3 bg-surface-container hover:bg-surface-container-high rounded-xl cursor-pointer transition-all border border-transparent hover:border-outline-variant">
<div className="flex items-center gap-4">
<span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label text-xs font-bold">28:45</span>
<span className="text-on-surface font-medium">Astuces pour les limites de l'exponentielle</span>
</div>
<span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">play_circle</span>
</div>
<div className="group flex items-center justify-between p-3 bg-surface-container hover:bg-surface-container-high rounded-xl cursor-pointer transition-all border border-transparent hover:border-outline-variant">
<div className="flex items-center gap-4">
<span className="bg-secondary-container text-on-secondary-container px-2 py-1 rounded font-label text-xs font-bold">40:10</span>
<span className="text-on-surface font-medium">Q&amp;A en direct : Réponses aux questions complexes</span>
</div>
<span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">play_circle</span>
</div>
</div>
<div className="hidden space-y-3" id="tab-ressources">
<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl">
<div className="flex items-center gap-4">
<div className="w-10 h-10 bg-error-container text-error rounded flex items-center justify-center">
<span className="material-symbols-outlined">picture_as_pdf</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Support_Cours_Maths_S12.pdf</p>
<p className="text-xs text-on-surface-variant">2.4 MB • PDF Document</p>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary">download</span>
</button>
</div>
<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl">
<div className="flex items-center gap-4">
<div className="w-10 h-10 bg-error-container text-error rounded flex items-center justify-center">
<span className="material-symbols-outlined">picture_as_pdf</span>
</div>
<div>
<p className="text-sm font-bold text-on-surface">Exercices_Correction_Session.pdf</p>
<p className="text-xs text-on-surface-variant">1.1 MB • PDF Document</p>
</div>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary">download</span>
</button>
</div>
</div>
</div>
</section>

<aside className="p-4 lg:p-0 lg:col-span-4 space-y-6">

<div className="bg-primary-container p-6 rounded-2xl shadow-lg relative overflow-hidden group">
<div className="absolute -right-4 -top-4 w-24 h-24 bg-on-primary-container opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
<div className="relative z-10">
<div className="flex items-center gap-3 mb-3">
<div className="bg-white p-2 rounded-lg">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<h3 className="text-on-primary-container font-headline font-bold text-lg">Assistant IA Edukora</h3>
</div>
<p className="text-primary-fixed text-sm mb-4">Posez une question sur le contenu de ce replay. L'IA a analysé la vidéo pour vous répondre instantanément.</p>
<button className="w-full bg-secondary-container text-on-secondary-container font-bold py-3 rounded-xl hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2">
<span>Lancer l'IA</span>
<span className="material-symbols-outlined">bolt</span>
</button>
</div>
</div>

<div className="bg-surface-container-low border border-outline-variant rounded-2xl p-6 h-[400px] flex flex-col">
<div className="flex items-center justify-between mb-4">
<h3 className="font-headline font-bold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">forum</span>
                        Questions archivées
                    </h3>
<span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Chat en direct</span>
</div>
<div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">

<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="text-[10px] font-bold text-primary">Kouassi M. • 12:45</span>
<span className="material-symbols-outlined text-xs text-secondary">favorite</span>
</div>
<div className="bg-surface-container-highest p-3 rounded-xl rounded-tl-none border-l-2 border-primary">
<p className="text-xs text-on-surface">Comment savoir si on doit utiliser ln ou exp pour lever une indétermination de type 0/0 ?</p>
</div>
<div className="ml-4 mt-1 bg-tertiary-container/10 p-2 rounded-lg border-l-2 border-tertiary">
<p className="text-[10px] font-semibold text-tertiary">Réponse Expert :</p>
<p className="text-[10px] text-on-surface-variant italic">Utilisez les croissances comparées à l'infini, c'est souvent la clé.</p>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="text-[10px] font-bold text-primary">Sery A. • 22:10</span>
</div>
<div className="bg-surface-container-highest p-3 rounded-xl rounded-tl-none border-l-2 border-primary">
<p className="text-xs text-on-surface">Est-ce que cet exercice est susceptible de tomber au BAC cette année ?</p>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="text-[10px] font-bold text-primary">Aminata D. • 35:20</span>
</div>
<div className="bg-surface-container-highest p-3 rounded-xl rounded-tl-none border-l-2 border-primary">
<p className="text-xs text-on-surface">Merci pour l'astuce sur le tableau de variations, c'est beaucoup plus clair !</p>
</div>
</div>

<div className="flex flex-col gap-1">
<div className="flex items-center justify-between">
<span className="text-[10px] font-bold text-primary">Jean-Luc • 42:05</span>
</div>
<div className="bg-surface-container-highest p-3 rounded-xl rounded-tl-none border-l-2 border-primary">
<p className="text-xs text-on-surface">Peut-on revoir l'étape de simplification de la fraction à 28:45 ?</p>
</div>
</div>
</div>
<div className="mt-4 pt-4 border-t border-outline-variant">
<div className="relative">
<input className="w-full bg-surface text-xs border border-outline-variant rounded-lg py-2 px-3 focus:ring-1 focus:ring-primary focus:border-primary outline-none" placeholder="Ajouter une note perso..." type="text" />
<button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary">
<span className="material-symbols-outlined text-lg">sticky_note_2</span>
</button>
</div>
</div>
</div>
</aside>
</main>

<nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-3 bg-surface dark:bg-inverse-surface shadow-md rounded-t-lg z-50 md:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">book_5</span>
<span className="font-label text-label-xs font-semibold">Biblio</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-label text-label-xs font-semibold">Communauté</span>
</a>
</nav>
<script>
        function switchTab(tabId) &#123;
            // Hide all tabs
            document.getElementById('tab-description').classList.add('hidden');
            document.getElementById('tab-moments').classList.add('hidden');
            document.getElementById('tab-ressources').classList.add('hidden');
            
            // Remove active styles from buttons
            const buttons = ['btn-description', 'btn-moments', 'btn-ressources'];
            buttons.forEach(id =&gt; &#123;
                const btn = document.getElementById(id);
                btn.classList.remove('border-primary', 'text-primary');
                btn.classList.add('border-transparent', 'text-on-surface-variant');
            &#125;);

            // Show current tab
            document.getElementById(tabId).classList.remove('hidden');
            
            // Add active styles to clicked button
            const activeBtn = document.getElementById('btn-' + tabId.split('-')[1]);
            activeBtn.classList.add('border-primary', 'text-primary');
            activeBtn.classList.remove('border-transparent', 'text-on-surface-variant');
        &#125;

        // Micro-interaction for video play button
        const playBtn = document.querySelector('.bg-secondary-container');
        if (playBtn) &#123;
            playBtn.addEventListener('click', () =&gt; &#123;
                const icon = playBtn.querySelector('.material-symbols-outlined');
                icon.textContent = icon.textContent === 'play_arrow' ? 'pause' : 'play_arrow';
            &#125;);
        &#125;
    </script>

    </div>
  );
}
