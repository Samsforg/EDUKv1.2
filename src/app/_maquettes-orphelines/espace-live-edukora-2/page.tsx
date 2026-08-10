import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Espace Live" };

export default function Page() {
  return (
    <div className="bg-background font-body text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center w-full px-4 h-16 sticky top-0 z-50 bg-primary dark:bg-primary-container">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-on-primary dark:text-on-primary-container hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 transition-transform" data-icon="menu">menu</button>
<h1 className="font-headline text-display-lg-mobile font-bold text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<span className="font-headline text-headline-md font-semibold text-on-primary dark:text-on-primary-container hidden md:block">Espace Live</span>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-135.png" alt="A professional and friendly portrait of a young West African student, smiling warmly against a soft studio background. The lighting is bright and optimistic, reflecting a high-key academic atmosphere. The aesthetic is clean and corporate, featuring subtle blues and whites consistent with the Edukora brand." />
</div>
</div>
</header>
<main className="max-w-5xl mx-auto px-4 py-6 space-y-8">

<section className="relative overflow-hidden rounded-xl h-64 md:h-80 shadow-lg group">
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent z-10"></div>
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAGDHGNSXkUMiVSreuN8IjFLIdAPicYMU4T2E2cQ-f0aQxfd9x13nZB8FsUJdKGGVeLXaq8wZkHcd4k83CUSpGDiSI6VWTO4oeaZG13STFX3NsK0Ec54thxtuSknJZugwHgI53q-yCPBbExB-p6IHDL6TA9Oq8y3Vt-_HdQjqHS9DcMP4gJXaizpuNu1m8RvLqlxCixXwtf00sfDbX5Q-PUo-QCwjwBYSyQBqRkxKE1GuMtBK8OZwBV')"}}></div>
<div className="absolute inset-0 z-20 p-6 flex flex-col justify-end text-on-primary">
<div className="flex items-center gap-2 mb-2">
<span className="flex items-center gap-1 bg-error px-3 py-1 rounded-full text-label-xs font-bold animate-pulse">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>fiber_manual_record</span>
                        EN DIRECT
                    </span>
<span className="bg-primary-container/40 backdrop-blur-md px-3 py-1 rounded-full text-label-xs font-semibold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">group</span>
                        1.2k élèves
                    </span>
</div>
<h2 className="font-headline text-display-lg-mobile md:text-display-lg font-bold mb-1">Session Intensive : Fonctions &amp; Logarithmes</h2>
<p className="text-on-primary/80 text-body-md mb-4 max-w-lg">Avec M. Koné, Expert National en Mathématiques</p>
<button className="bg-secondary-container text-on-secondary-container hover:brightness-110 active:scale-95 transition-all w-fit px-6 py-2 rounded-xl font-bold flex items-center gap-2">
                    Rejoindre maintenant
                    <span className="material-symbols-outlined">play_arrow</span>
</button>
</div>
</section>

<section className="space-y-3">
<div className="flex justify-between items-center">
<h3 className="font-headline text-headline-md font-semibold text-primary">Explorer par matière</h3>
<button className="text-primary font-semibold text-label-sm hover:underline">Voir tout</button>
</div>
<div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">

<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
<span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors" data-icon="functions">functions</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">Maths</span>
</button>
<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center group-hover:bg-secondary transition-colors duration-300">
<span className="material-symbols-outlined text-secondary group-hover:text-on-secondary transition-colors" data-icon="bolt">bolt</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">Physique</span>
</button>
<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center group-hover:bg-tertiary transition-colors duration-300">
<span className="material-symbols-outlined text-tertiary group-hover:text-on-tertiary transition-colors" data-icon="biotech">biotech</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">SVT</span>
</button>
<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed-dim flex items-center justify-center group-hover:bg-primary-container transition-colors duration-300">
<span className="material-symbols-outlined text-primary group-hover:text-on-primary transition-colors" data-icon="history_edu">history_edu</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">Français</span>
</button>
<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary transition-colors" data-icon="language">language</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">Anglais</span>
</button>
<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary transition-colors" data-icon="public">public</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">Hist-Géo</span>
</button>
<button className="flex-shrink-0 flex flex-col items-center gap-2 group">
<div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-primary transition-colors" data-icon="psychology">psychology</span>
</div>
<span className="text-label-xs font-semibold text-on-surface-variant">Philo</span>
</button>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-headline-md font-semibold text-primary">Sessions à venir</h3>
<div className="grid gap-3">

<div className="flex items-center gap-4 bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-primary text-on-primary w-16 h-16 rounded-xl flex-shrink-0">
<span className="text-label-xs font-bold uppercase">Oct</span>
<span className="text-headline-md font-bold leading-tight">24</span>
</div>
<div className="flex-grow min-w-0">
<div className="flex items-center gap-2 text-tertiary font-semibold text-label-xs mb-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                            16:00 - 17:30
                        </div>
<h4 className="font-headline text-body-lg font-bold text-on-surface truncate">Méthodologie de la Dissertation Philosophique</h4>
<p className="text-on-surface-variant text-body-md">Mme. Touré, Inspectrice Générale</p>
</div>
<button className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform" data-icon="notifications">notifications</button>
</div>
<div className="flex items-center gap-4 bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-secondary text-on-secondary w-16 h-16 rounded-xl flex-shrink-0">
<span className="text-label-xs font-bold uppercase">Oct</span>
<span className="text-headline-md font-bold leading-tight">25</span>
</div>
<div className="flex-grow min-w-0">
<div className="flex items-center gap-2 text-tertiary font-semibold text-label-xs mb-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                            14:30 - 16:00
                        </div>
<h4 className="font-headline text-body-lg font-bold text-on-surface truncate">Physique : Électromagnétisme &amp; Circuits</h4>
<p className="text-on-surface-variant text-body-md">M. Yao, Docteur en Sciences</p>
</div>
<button className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform" data-icon="notifications">notifications</button>
</div>
<div className="flex items-center gap-4 bg-surface-container-low border border-outline-variant p-4 rounded-xl hover:bg-surface-container-high transition-colors cursor-pointer group">
<div className="flex flex-col items-center justify-center bg-primary text-on-primary w-16 h-16 rounded-xl flex-shrink-0">
<span className="text-label-xs font-bold uppercase">Oct</span>
<span className="text-headline-md font-bold leading-tight">26</span>
</div>
<div className="flex-grow min-w-0">
<div className="flex items-center gap-2 text-tertiary font-semibold text-label-xs mb-1">
<span className="material-symbols-outlined text-sm">schedule</span>
                            09:00 - 11:00
                        </div>
<h4 className="font-headline text-body-lg font-bold text-on-surface truncate">Français : Commentaire composé BAC 2024</h4>
<p className="text-on-surface-variant text-body-md">Mme. Bamba, Expert CAPES</p>
</div>
<button className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform" data-icon="notifications">notifications</button>
</div>
</div>
</section>

<section className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-primary-container/10 p-4 rounded-xl border border-primary-container/20">
<span className="text-primary text-label-xs font-bold uppercase tracking-wider">Total Lives</span>
<p className="text-display-lg-mobile font-bold text-primary">142</p>
</div>
<div className="bg-secondary-container/10 p-4 rounded-xl border border-secondary-container/20">
<span className="text-secondary text-label-xs font-bold uppercase tracking-wider">Ma Progression</span>
<p className="text-display-lg-mobile font-bold text-secondary">85%</p>
</div>
<div className="bg-tertiary-container/10 p-4 rounded-xl border border-tertiary-container/20">
<span className="text-tertiary text-label-xs font-bold uppercase tracking-wider">Badges Live</span>
<p className="text-display-lg-mobile font-bold text-tertiary">12</p>
</div>
<div className="bg-on-background/5 p-4 rounded-xl border border-outline-variant">
<span className="text-on-surface-variant text-label-xs font-bold uppercase tracking-wider">Rattrapage</span>
<p className="text-display-lg-mobile font-bold text-on-surface">Disponible</p>
</div>
</section>
</main>

<button className="fixed bottom-24 right-6 bg-secondary text-on-secondary shadow-xl h-14 px-6 rounded-full flex items-center gap-3 active:scale-90 transition-all duration-200 z-50 hover:bg-secondary-container">
<span className="material-symbols-outlined">add_comment</span>
<span className="font-bold text-label-sm">Proposer un sujet</span>
</button>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-inverse-surface shadow-md border-t border-outline-variant dark:border-outline rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-xl active:scale-90 transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-xl active:scale-90 transition-all" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-6 py-1 active:scale-90 transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>live_tv</span>
<span className="font-label text-label-xs font-semibold">Directs</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors p-2 rounded-xl active:scale-90 transition-all" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Smooth transition effect for FAB interaction
        const fab = document.querySelector('.fixed.bottom-24');
        fab.addEventListener('click', () =&gt; &#123;
            console.log('Open subject suggestion modal');
            // Mock interaction for visual feedback
            fab.style.transform = 'scale(1.1)';
            setTimeout(() =&gt; &#123;
                fab.style.transform = 'scale(1)';
            &#125;, 200);
        &#125;);

        // Horizontal scroll categories interactivity
        const scrollContainer = document.querySelector('.hide-scrollbar');
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.addEventListener('mousedown', (e) =&gt; &#123;
            isDown = true;
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        &#125;);
        scrollContainer.addEventListener('mouseleave', () =&gt; &#123;
            isDown = false;
        &#125;);
        scrollContainer.addEventListener('mouseup', () =&gt; &#123;
            isDown = false;
        &#125;);
        scrollContainer.addEventListener('mousemove', (e) =&gt; &#123;
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.scrollLeft = scrollLeft - walk;
        &#125;);
    </script>

    </div>
  );
}
