import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Catalogue des Cours" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24" >

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden">
<img alt="Student profile" className="w-full h-full object-cover" src="/images/ecran-150.png" />
</div>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Edukora</h1>
</div>
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</header>
<main className="pt-20 px-margin-mobile">

<section className="mt-4 mb-stack-lg">
<div className="relative group mb-stack-md">
<div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
<span className="material-symbols-outlined text-outline">search</span>
</div>
<input className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md outline-none" placeholder="Rechercher un cours..." type="text" />
</div>

<div className="mb-stack-md">
<p className="text-label-xs text-on-surface-variant font-semibold mb-2 ml-1">TYPE D'EXAMEN</p>
<div className="toggle-switch exam-bac" id="exam-toggle">
<div className="active-indicator"></div>
<button data-exam-btn="BEPC">BEPC</button>
<button data-exam-btn="BAC">BAC</button>
</div>
</div>

<div className="mb-stack-sm transition-opacity duration-300" id="series-filter-container">
<p className="text-label-xs text-on-surface-variant font-semibold mb-2 ml-1">CHOISIR TA SÉRIE</p>
<div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
<button className="serie-btn px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all shadow-sm" data-serie="all">Toutes</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="A">Série A</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="C">Série C</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="D">Série D</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="G2">Série G2</button>
<button className="serie-btn px-4 py-2 bg-surface-container-high text-on-surface-variant rounded-full font-label-sm whitespace-nowrap active:scale-95 transition-all" data-serie="B">Série B</button>
</div>
</div>
</section>

<h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md" id="section-title">Programme BAC</h2>
<div className="grid grid-cols-1 gap-4" id="course-container">

</div>

<div className="mt-stack-lg bg-primary-container rounded-2xl p-6 relative overflow-hidden">
<div className="relative z-10 flex flex-col gap-2">
<span className="font-label-xs text-on-primary-container uppercase tracking-wider">Nouveau</span>
<h3 className="font-headline-md text-white">Besoin d'aide pour réviser ?</h3>
<p className="font-body-md text-on-primary-container mb-4">Ton tuteur IA est disponible 24h/7 pour répondre à toutes tes questions sur le programme.</p>
<button className="bg-white text-primary px-6 py-3 rounded-full font-label-sm self-start active:scale-95 transition-transform shadow-lg">Discuter avec l'IA</button>
</div>
<div className="absolute -right-4 -bottom-4 opacity-20">
<span className="material-symbols-outlined text-[120px] text-white" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-background shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<div className="relative">
<span className="material-symbols-outlined">bookmark</span>
<div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border border-surface dark:border-on-background flex items-center justify-center"><span className="text-white text-[10px] font-bold leading-none">3</span></div>
</div>
<span className="font-label-xs text-label-xs">Favoris</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
    const subjects = [
        // BAC Subjects
        &#123; name: 'Mathématiques', type: 'BAC', series: ['A', 'C', 'D', 'G2', 'B'], lessons: 24, progress: 65, icon: 'calculate', color: 'bg-primary-container', iconColor: 'text-on-primary-container', desc: 'Tronc commun / Spécifique' &#125;,
        &#123; name: 'Français', type: 'BAC', series: ['A', 'C', 'D', 'G2', 'B'], lessons: 18, progress: 30, icon: 'auto_stories', color: 'bg-secondary-fixed', iconColor: 'text-on-secondary-fixed', desc: 'Dissertation &amp; Résumé' &#125;,
        &#123; name: 'Philosophie', type: 'BAC', series: ['A'], lessons: 20, progress: 50, icon: 'psychology', color: 'bg-on-tertiary-fixed-variant', iconColor: 'text-tertiary-fixed', desc: 'Spécialité Série A' &#125;,
        &#123; name: 'Physique-Chimie', type: 'BAC', series: ['C', 'D', 'B'], lessons: 22, progress: 45, icon: 'science', color: 'bg-on-primary-fixed-variant', iconColor: 'text-primary-fixed', desc: 'Mécanique &amp; Chimie' &#125;,
        &#123; name: 'SVT', type: 'BAC', series: ['D', 'C'], lessons: 15, progress: 85, icon: 'biotech', color: 'bg-tertiary-container', iconColor: 'text-on-tertiary-container', desc: 'Génétique &amp; Écologie' &#125;,
        &#123; name: 'Comptabilité &amp; Gestion', type: 'BAC', series: ['G2'], lessons: 16, progress: 15, icon: 'account_balance_wallet', color: 'bg-on-secondary-fixed-variant', iconColor: 'text-secondary-fixed', desc: 'Spécialité G2' &#125;,
        &#123; name: 'Économie Générale', type: 'BAC', series: ['G2', 'B'], lessons: 12, progress: 0, icon: 'payments', color: 'bg-secondary-container', iconColor: 'text-white', desc: 'Séries Techniques' &#125;,
        &#123; name: 'Construction Mécanique', type: 'BAC', series: ['B'], lessons: 14, progress: 10, icon: 'engineering', color: 'bg-primary', iconColor: 'text-white', desc: 'Spécialité Série B' &#125;,
        &#123; name: 'Électronique', type: 'BAC', series: ['B'], lessons: 12, progress: 5, icon: 'memory', color: 'bg-secondary', iconColor: 'text-white', desc: 'Spécialité Série B' &#125;,
        &#123; name: 'Anglais', type: 'BAC', series: ['A', 'C', 'D', 'G2', 'B'], lessons: 10, progress: 20, icon: 'translate', color: 'bg-surface-variant', iconColor: 'text-on-surface-variant', desc: 'Langue Vivante 1' &#125;,
        
        // BEPC Subjects
        &#123; name: 'Français', type: 'BEPC', series: ['all'], lessons: 16, progress: 0, icon: 'edit_note', color: 'bg-secondary-fixed', iconColor: 'text-on-secondary-fixed', desc: 'Dictée &amp; Rédaction' &#125;,
        &#123; name: 'Mathématiques', type: 'BEPC', series: ['all'], lessons: 14, progress: 0, icon: 'calculate', color: 'bg-primary-container', iconColor: 'text-on-primary-container', desc: 'Arithmétique &amp; Géométrie' &#125;,
        &#123; name: 'Physique-Chimie', type: 'BEPC', series: ['all'], lessons: 10, progress: 0, icon: 'science', color: 'bg-on-primary-fixed-variant', iconColor: 'text-primary-fixed', desc: 'Sciences Physiques' &#125;,
        &#123; name: 'SVT', type: 'BEPC', series: ['all'], lessons: 12, progress: 0, icon: 'biotech', color: 'bg-tertiary-container', iconColor: 'text-on-tertiary-container', desc: 'Sciences de la Vie' &#125;,
        &#123; name: 'Histoire-Géo', type: 'BEPC', series: ['all'], lessons: 18, progress: 0, icon: 'public', color: 'bg-on-tertiary-fixed-variant', iconColor: 'text-tertiary-fixed', desc: 'Histoire et Géographie' &#125;,
        &#123; name: 'Anglais', type: 'BEPC', series: ['all'], lessons: 15, progress: 0, icon: 'translate', color: 'bg-surface-variant', iconColor: 'text-on-surface-variant', desc: 'Langue Vivante' &#125;,
        &#123; name: 'Allemand / Espagnol', type: 'BEPC', series: ['all'], lessons: 12, progress: 0, icon: 'language', color: 'bg-secondary-container', iconColor: 'text-white', desc: 'Langue Vivante 2' &#125;,
        &#123; name: 'EDHC', type: 'BEPC', series: ['all'], lessons: 8, progress: 0, icon: 'groups', color: 'bg-secondary-fixed-dim', iconColor: 'text-on-secondary-fixed-variant', desc: 'Éducation Civique' &#125;,
        &#123; name: 'EPS', type: 'BEPC', series: ['all'], lessons: 5, progress: 0, icon: 'fitness_center', color: 'bg-outline', iconColor: 'text-white', desc: 'Éducation Physique' &#125;
    ];

    let currentExam = 'BAC';
    let currentSerie = 'all';

    function setExam(exam) &#123;
        currentExam = exam;
        const toggle = document.getElementById('exam-toggle');
        const seriesFilter = document.getElementById('series-filter-container');
        const sectionTitle = document.getElementById('section-title');
        
        toggle.classList.remove('exam-bepc', 'exam-bac');
        toggle.classList.add(`exam-$&#123;exam.toLowerCase()&#125;`);
        
        if (exam === 'BEPC') &#123;
            seriesFilter.classList.add('opacity-30', 'pointer-events-none');
            sectionTitle.textContent = 'Programme BEPC';
        &#125; else &#123;
            seriesFilter.classList.remove('opacity-30', 'pointer-events-none');
            sectionTitle.textContent = 'Programme BAC';
        &#125;
        
        renderCourses();
    &#125;

    function renderCourses() &#123;
        const container = document.getElementById('course-container');
        container.innerHTML = '';
        
        const filtered = subjects.filter(s =&gt; &#123;
            if (s.type !== currentExam) return false;
            if (currentExam === 'BAC' &amp;&amp; currentSerie !== 'all') &#123;
                return s.series.includes(currentSerie);
            &#125;
            return true;
        &#125;);

        filtered.forEach(subject =&gt; &#123;
            const card = document.createElement('div');
            card.className = "course-card bg-surface border border-outline-variant rounded-xl p-4 flex flex-col gap-3 active:scale-[0.98] transition-transform duration-200 animate-in fade-in slide-in-from-bottom-2";
            card.innerHTML = `
                &lt;div class="flex justify-between items-start"&gt;
                    &lt;div class="flex items-center gap-3"&gt;
                        &lt;div class="w-12 h-12 rounded-lg $&#123;subject.color&#125; flex items-center justify-center"&gt;
                            &lt;span class="material-symbols-outlined $&#123;subject.iconColor&#125;" style="font-variation-settings: 'FILL' 1;"&gt;$&#123;subject.icon&#125;&lt;/span&gt;
                        &lt;/div&gt;
                        &lt;div&gt;
                            &lt;h3 class="font-headline-md text-[18px] text-on-surface"&gt;$&#123;subject.name&#125;&lt;/h3&gt;
                            &lt;p class="text-on-surface-variant font-label-xs"&gt;$&#123;subject.lessons&#125; Leçons • $&#123;subject.desc&#125;&lt;/p&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;div class="bg-tertiary-fixed text-on-tertiary-fixed px-2 py-1 rounded font-label-xs"&gt;$&#123;subject.type&#125;&lt;/div&gt;
                &lt;/div&gt;
                &lt;div class="mt-2"&gt;
                    &lt;div class="flex justify-between items-center mb-1"&gt;
                        &lt;span class="font-label-xs text-on-surface-variant"&gt;Progression&lt;/span&gt;
                        &lt;span class="font-label-xs text-primary"&gt;$&#123;subject.progress&#125;%&lt;/span&gt;
                    &lt;/div&gt;
                    &lt;div class="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden"&gt;
                        &lt;div class="bg-secondary-container h-full rounded-full" style="width: $&#123;subject.progress&#125;%"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            `;
            container.appendChild(card);
        &#125;);
    &#125;

    // Series filtering logic
    const serieButtons = document.querySelectorAll('.serie-btn');
    serieButtons.forEach(btn =&gt; &#123;
        btn.addEventListener('click', () =&gt; &#123;
            currentSerie = btn.getAttribute('data-serie');
            
            serieButtons.forEach(b =&gt; &#123;
                b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
                b.classList.add('bg-surface-container-high', 'text-on-surface-variant');
            &#125;);
            btn.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
            btn.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');

            renderCourses();
        &#125;);
    &#125;);

    // Initial render
    renderCourses();

    // Micro-interaction for search focus
    const searchInput = document.querySelector('input[type="text"]');
    const searchContainer = searchInput.parentElement;
    searchInput.addEventListener('focus', () =&gt; searchContainer.classList.add('scale-[1.01]'));
    searchInput.addEventListener('blur', () =&gt; searchContainer.classList.remove('scale-[1.01]'));
</script>

    </div>
  );
}
