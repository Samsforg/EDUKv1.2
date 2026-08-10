import type { Metadata } from "next";

export const metadata: Metadata = { title: "Détails du Live - Edukora" };

export default function Page() {
  return (
    <div className="pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center w-full px-4 h-16 sticky top-0 z-50 bg-primary dark:bg-primary-container">
<div className="flex items-center gap-4">
<button className="p-2 text-on-primary dark:text-on-primary-container hover:bg-primary-container/20 transition-colors active:scale-95 transition-transform">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-display-lg-mobile font-bold text-on-primary dark:text-on-primary-container">Edukora</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-117.png" alt="A portrait of a young Ivorian student smiling, looking confident with a bright academic background. The lighting is warm and natural, evoking a sense of optimistic future and readiness for exams. High-quality corporate photography style in a bright light-mode environment." />
</div>
</div>
</header>
<main className="max-w-6xl mx-auto px-4 mt-6">

<section className="mb-8">
<div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden shadow-lg border border-outline-variant bg-inverse-surface">
<div className="absolute inset-0 flex items-center justify-center">

<div className="relative z-10 text-center px-6">
<div className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-on-secondary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-on-secondary"></span>
</span>
                            Live Prévu : 14 Mai à 16:00
                        </div>
<h2 className="font-headline text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">Masterclass : Fonctions Logarithmes &amp; Exponentielles</h2>
<p className="text-white/80 text-lg mb-6 max-w-2xl mx-auto">Préparez votre épreuve de Mathématiques du BAC 2024 avec une session intensive de résolution de problèmes.</p>
<button className="bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-3 mx-auto active:scale-95 shadow-lg">
<span className="material-symbols-outlined">notifications</span>
<span id="btn-text">M'inscrire à la session</span>
</button>
</div>
</div>
<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent"></div>
</div>
</section>

<div className="bento-grid">

<div className="col-span-1 md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline text-headline-md font-semibold text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined">target</span> Objectifs d'apprentissage
                </h3>
<ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
<li className="flex gap-3 items-start p-3 bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span className="text-body-md text-on-surface-variant">Maîtriser les propriétés fondamentales des fonctions ln et exp.</span>
</li>
<li className="flex gap-3 items-start p-3 bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span className="text-body-md text-on-surface-variant">Apprendre à dresser un tableau de variations complet sans erreurs.</span>
</li>
<li className="flex gap-3 items-start p-3 bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span className="text-body-md text-on-surface-variant">Résoudre les équations et inéquations complexes du BAC.</span>
</li>
<li className="flex gap-3 items-start p-3 bg-surface-container rounded-lg">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span className="text-body-md text-on-surface-variant">Savoir tracer les courbes représentatives avec précision.</span>
</li>
</ul>
</div>

<div className="col-span-1 md:col-span-4 bg-primary text-on-primary rounded-xl p-6 shadow-md flex flex-col justify-between">
<div>
<div className="flex items-center gap-4 mb-4">
<div className="w-16 h-16 rounded-full border-2 border-on-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-118.png" alt="Close-up professional headshot of a distinguished professor in Côte d'Ivoire. He is wearing a neat suit, looking knowledgeable and friendly. The background is a blurred library of textbooks, symbolizing academic authority and expertise. High-contrast studio lighting, academic blue tones." />
</div>
<div>
<h4 className="font-headline text-lg font-bold">Dr. Kouassi Koffi</h4>
<p className="text-on-primary-container text-sm">Expert Mathématiques BAC</p>
</div>
</div>
<p className="text-body-md text-on-primary/90 leading-relaxed italic">
                        "Enseignant certifié avec plus de 15 ans d'expérience dans la préparation aux examens nationaux. Ma méthode se concentre sur la simplification des concepts complexes."
                    </p>
</div>
<div className="mt-4 pt-4 border-t border-on-primary/20 flex gap-4 text-xs">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">verified</span> Certifié MEN</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">group</span> 12k+ Élèves</span>
</div>
</div>

<div className="col-span-1 md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline text-headline-md font-semibold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">folder_open</span> Documents à télécharger
                    </h3>
<span className="text-label-sm text-on-surface-variant italic">Préparez-les avant le live !</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<a className="group flex items-center justify-between p-4 bg-white border border-outline-variant rounded-lg hover:border-primary transition-all" href="#">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-error-container rounded-lg flex items-center justify-center text-error">
<span className="material-symbols-outlined">picture_as_pdf</span>
</div>
<div>
<p className="font-semibold text-on-surface">Fiche de cours - ln/exp</p>
<p className="text-xs text-on-surface-variant">2.4 MB • PDF</p>
</div>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</a>
<a className="group flex items-center justify-between p-4 bg-white border border-outline-variant rounded-lg hover:border-primary transition-all" href="#">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-error-container rounded-lg flex items-center justify-center text-error">
<span className="material-symbols-outlined">picture_as_pdf</span>
</div>
<div>
<p className="font-semibold text-on-surface">Exercices de préparation</p>
<p className="text-xs text-on-surface-variant">1.8 MB • PDF</p>
</div>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</a>
<a className="group flex items-center justify-between p-4 bg-white border border-outline-variant rounded-lg hover:border-primary transition-all" href="#">
<div className="flex items-center gap-3">
<div className="w-10 h-10 bg-tertiary-container/20 rounded-lg flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">lightbulb</span>
</div>
<div>
<p className="font-semibold text-on-surface">Checklist de révision</p>
<p className="text-xs text-on-surface-variant">0.5 MB • PDF</p>
</div>
</div>
<span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">download</span>
</a>
</div>
</div>
</div>

<section className="mt-12">
<h3 className="font-headline text-headline-md font-semibold text-primary mb-6">Replays de Dr. Kouassi</h3>
<div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar">

<div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant group cursor-pointer hover:-translate-y-1 transition-all">
<div className="relative h-44 bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-119.png" alt="A video thumbnail showing a whiteboard filled with complex mathematical formulas and geometric shapes. A teacher is visible on the side pointing at a graph. The lighting is clear and professional, with an overlay of the Edukora play icon in academic blue and national orange. Clean modern educational aesthetic." />
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">1h 45m</div>
<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<div className="w-12 h-12 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined fill-icon">play_arrow</span>
</div>
</div>
</div>
<div className="p-4">
<h5 className="font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Probabilités : Loi Binomiale</h5>
<p className="text-sm text-on-surface-variant">Diffusé le 12 Avr 2024</p>
<div className="mt-3 flex items-center gap-4 text-xs font-medium text-tertiary">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 4.2k vues</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">thumb_up</span> 98% avis</span>
</div>
</div>
</div>

<div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant group cursor-pointer hover:-translate-y-1 transition-all">
<div className="relative h-44 bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-120.png" alt="Close-up of a digital tablet screen showing a 3D animated geometric construction, a compass, and a ruler. The screen is bright and sharp, with mathematical symbols floating in the background. The aesthetic is clean, academic, and highly technical. Academic blue and forest green color accents." />
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">58m</div>
<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<div className="w-12 h-12 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined fill-icon">play_arrow</span>
</div>
</div>
</div>
<div className="p-4">
<h5 className="font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Géométrie dans l'espace : Méthodes</h5>
<p className="text-sm text-on-surface-variant">Diffusé le 28 Mars 2024</p>
<div className="mt-3 flex items-center gap-4 text-xs font-medium text-tertiary">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 2.8k vues</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">thumb_up</span> 95% avis</span>
</div>
</div>
</div>

<div className="min-w-[280px] md:min-w-[320px] bg-white rounded-xl overflow-hidden shadow-sm border border-outline-variant group cursor-pointer hover:-translate-y-1 transition-all">
<div className="relative h-44 bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-121.png" alt="Educational studio setup with multiple monitors showing calculus graphs, a microphone, and professional lighting. The environment feels high-tech and modern, focused on delivering premium online education to students. Bright, airy light-mode feel with academic blue structural elements." />
<div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
<div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold">1h 12m</div>
<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
<div className="w-12 h-12 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined fill-icon">play_arrow</span>
</div>
</div>
</div>
<div className="p-4">
<h5 className="font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">Nombres Complexes : Partie 1</h5>
<p className="text-sm text-on-surface-variant">Diffusé le 15 Mars 2024</p>
<div className="mt-3 flex items-center gap-4 text-xs font-medium text-tertiary">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">visibility</span> 6.1k vues</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">thumb_up</span> 99% avis</span>
</div>
</div>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-md">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined fill-icon">live_tv</span>
<span className="font-label text-label-xs font-semibold">Directs</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high transition-colors active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        function toggleReminder(btn) &#123;
            const text = btn.querySelector('#btn-text');
            const icon = btn.querySelector('.material-symbols-outlined');
            
            if (btn.classList.contains('bg-secondary-container')) &#123;
                // Registered state
                btn.classList.remove('bg-secondary-container', 'text-on-secondary-container');
                btn.classList.add('bg-tertiary-container', 'text-on-tertiary-container');
                text.textContent = 'Rappel activé';
                icon.textContent = 'check_circle';
                icon.classList.add('fill-icon');
                
                // Visual feedback
                const notification = document.createElement('div');
                notification.className = 'fixed top-20 right-4 bg-tertiary text-on-tertiary px-6 py-3 rounded-lg shadow-xl z-[100] animate-bounce flex items-center gap-2';
                notification.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Inscription confirmée !';
                document.body.appendChild(notification);
                setTimeout(() =&gt; notification.remove(), 3000);
            &#125; else &#123;
                // Cancel state
                btn.classList.add('bg-secondary-container', 'text-on-secondary-container');
                btn.classList.remove('bg-tertiary-container', 'text-on-tertiary-container');
                text.textContent = "M'inscrire à la session";
                icon.textContent = 'notifications';
                icon.classList.remove('fill-icon');
            &#125;
        &#125;

        // Lightweight atmospheric effect: subtle scroll shadows for the replay list
        const replayContainer = document.querySelector('.no-scrollbar');
        replayContainer.addEventListener('scroll', () =&gt; &#123;
            const maxScroll = replayContainer.scrollWidth - replayContainer.clientWidth;
            const scrollPos = replayContainer.scrollLeft;
            // Interaction logic could go here for custom scrollbars
        &#125;);
    </script>

    </div>
  );
}
