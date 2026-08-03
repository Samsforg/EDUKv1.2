import type { Metadata } from "next";

export const metadata: Metadata = { title: "EduKora - Sélection de l'épreuve (BEPC & BAC)" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen pb-24" >

<header className="flex justify-between items-center px-margin-mobile h-16 w-full z-50 fixed top-0 bg-surface border-b border-outline-variant glass-header">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low transition-colors rounded-full active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary" data-icon="menu">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Simulateur BEPC - Options</h1>
</div>
<div className="flex items-center gap-3">
<div className="hidden md:flex flex-col text-right">
<span className="text-label-sm font-bold text-primary">Kouassi N.</span>
<span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Élève Terminale D</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-primary-fixed p-0.5 overflow-hidden active:scale-95 duration-100 cursor-pointer">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-319.png" alt="A professional close-up portrait of a young West African male student" />
</div>
</div>
</header>
<main className="pt-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">

<section className="mt-6 mb-8 flex justify-center">
<div className="bg-surface-container p-1 rounded-full flex gap-1 w-full max-w-md">
<button className="flex-1 py-2.5 rounded-full text-label-sm font-bold transition-all duration-200 segmented-control-active" id="btn-bepc">
                    BEPC
                </button>
<button className="flex-1 py-2.5 rounded-full text-label-sm font-bold transition-all duration-200" id="btn-bac">
                    BAC
                </button>
</div>
</section>

<section className="mb-10">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Prêt pour l'excellence ?</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-xl" id="hero-subtitle">Préparez votre brevet avec nos simulateurs d'examen BEPC conformes au programme national de Côte d'Ivoire.</p>
</div>

<div className="relative w-full md:w-96 group">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md" id="subject-search" placeholder="Rechercher une épreuve..." type="text" />
</div>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter" id="subjects-grid">


<div className="subject-card bac-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group hidden" data-exam="BAC" data-series="C, D">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">functions</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">BAC - Séries C, D</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Mathématiques BAC</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Épreuve Nationale • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>4 Heures</span></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>12 Questions</span></div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bac-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group hidden" data-exam="BAC" data-series="G2">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">BAC - Série G2</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Comptabilité BAC</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Gestion Financière • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>4 Heures</span></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>6 Dossiers</span></div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bac-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group hidden" data-exam="BAC" data-series="B">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">engineering</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">BAC - Série B</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Construction Méc. BAC</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Dessin &amp; Analyse • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>6 Heures</span></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>1 Projet</span></div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>


<div className="subject-card bepc-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group" data-exam="BEPC">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">calculate</span>
</div>
<span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Niveau BEPC</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Mathématiques BEPC</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Épreuve Nationale • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>2 Heures</span></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>4 Exercices</span></div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bepc-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group" data-exam="BEPC">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">auto_stories</span>
</div>
<span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Niveau BEPC</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Français BEPC</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Composition Française • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>2 Heures</span></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>1 Sujet</span></div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bepc-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group" data-exam="BEPC">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl">science</span>
</div>
<span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Niveau BEPC</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Physique-Chimie BEPC</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Épreuve Nationale • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>1.5 Heures</span></div>
<div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>3 Exercices</span></div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>
<div className="subject-card bepc-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group" data-exam="BEPC"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary"><span className="material-symbols-outlined text-3xl">translate</span></div><span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Niveau BEPC</span></div><h3 className="font-headline-md text-headline-md text-on-surface mb-1">Allemand BEPC</h3><p className="text-label-sm text-on-surface-variant mb-4">Langue Vivante 2 • 2023</p><div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant"><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>2 Heures</span></div><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>10 Questions</span></div></div><div className="mt-auto"><button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span></button></div></div><div className="subject-card bepc-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group" data-exam="BEPC"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary"><span className="material-symbols-outlined text-3xl">language</span></div><span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Niveau BEPC</span></div><h3 className="font-headline-md text-headline-md text-on-surface mb-1">Espagnol BEPC</h3><p className="text-label-sm text-on-surface-variant mb-4">Langue Vivante 2 • 2023</p><div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant"><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>2 Heures</span></div><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>10 Questions</span></div></div><div className="mt-auto"><button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span></button></div></div><div className="subject-card bepc-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group" data-exam="BEPC"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary"><span className="material-symbols-outlined text-3xl">palette</span></div><span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Niveau BEPC</span></div><h3 className="font-headline-md text-headline-md text-on-surface mb-1">Arts Plastiques BEPC</h3><p className="text-label-sm text-on-surface-variant mb-4">Éducation Artistique • 2023</p><div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant"><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">timer</span><span>1.5 Heures</span></div><div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">task</span><span>5 Exercices</span></div></div><div className="mt-auto"><button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">Commencer le test <span className="material-symbols-outlined text-lg">play_arrow</span></button></div></div></div>

<section className="mt-12 bg-primary-container rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-primary">
<div className="relative z-10 flex-1 text-center md:text-left">
<h3 className="font-display-lg text-white mb-4">Besoin d'aide avec un exercice ?</h3>
<p className="font-body-md text-on-primary-container mb-6 opacity-90">Posez vos questions à notre IA spécialisée sur le programme ivoirien. Disponible 24/7 pour des explications étape par étape.</p>
<button className="bg-surface text-primary font-bold px-6 py-3 rounded-xl flex items-center gap-2 mx-auto md:mx-0 active:scale-95 transition-transform">
<span className="material-symbols-outlined">smart_toy</span>
                    Discuter avec l'tuteur IA
                </button>
</div>
<div className="relative w-full md:w-64 h-64 z-10">
<img className="w-full h-full object-cover rounded-2xl shadow-xl" src="/images/ecran-320.png" alt="A high-tech digital illustration showcasing a glowing AI neural network" />
</div>
<div className="absolute top-0 right-0 w-64 h-64 bg-secondary opacity-20 blur-[100px] -mr-32 -mt-32"></div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-2 bg-surface shadow-[0_-2px_8px_rgba(0,0,0,0.05)] rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1" href="#">
<span className="material-symbols-outlined">library_books</span>
<span className="font-label-xs text-label-xs">Sujets</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined">timer</span>
<span className="font-label-xs text-label-xs">Simulateur</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary" href="#"><span className="material-symbols-outlined">bookmark</span><span className="font-label-xs text-label-xs">Favoris</span></a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        function switchExam(type) &#123;
            const btnBac = document.getElementById('btn-bac');
            const btnBepc = document.getElementById('btn-bepc');
            const heroSubtitle = document.getElementById('hero-subtitle');
            
            // UI Toggle
            if (type === 'BAC') &#123;
                btnBac.classList.add('segmented-control-active');
                btnBepc.classList.remove('segmented-control-active');
                heroSubtitle.innerHTML = 'Sélectionnez une matière pour commencer votre simulateur d\'examen BAC. Désormais disponible pour les séries &lt;strong&gt;A1, A2, C, D (Général)&lt;/strong&gt; et &lt;strong&gt;G2, B (Technique)&lt;/strong&gt;.';
                
                document.querySelectorAll('.bac-card').forEach(c =&gt; c.classList.remove('hidden'));
                document.querySelectorAll('.bepc-card').forEach(c =&gt; c.classList.add('hidden'));
            &#125; else &#123;
                btnBepc.classList.add('segmented-control-active');
                btnBac.classList.remove('segmented-control-active');
                heroSubtitle.innerHTML = 'Préparez votre brevet avec nos simulateurs d\'examen BEPC conformes au programme national de Côte d\'Ivoire.';
                
                document.querySelectorAll('.bac-card').forEach(c =&gt; c.classList.add('hidden'));
                document.querySelectorAll('.bepc-card').forEach(c =&gt; c.classList.remove('hidden'));
            &#125;
        &#125;

        // Search logic
        const searchInput = document.getElementById('subject-search');
        searchInput.addEventListener('input', (e) =&gt; &#123;
            const term = e.target.value.toLowerCase();
            const activeType = document.getElementById('btn-bac').classList.contains('segmented-control-active') ? 'BAC' : 'BEPC';
            
            document.querySelectorAll('.subject-card').forEach(card =&gt; &#123;
                const title = card.querySelector('h3').textContent.toLowerCase();
                const badge = card.querySelector('.rounded-full').textContent.toLowerCase();
                const cardType = card.getAttribute('data-exam');

                if (cardType === activeType) &#123;
                    if (title.includes(term) || badge.includes(term)) &#123;
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                    &#125; else &#123;
                        card.style.opacity = '0.3';
                    &#125;
                &#125;
            &#125;);
        &#125;);

        // Card Micro-interactions
        document.querySelectorAll('.subject-card').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                const icon = card.querySelector('.material-symbols-outlined');
                if(icon) &#123;
                    icon.classList.add('scale-110');
                    icon.style.transition = 'transform 0.3s ease';
                &#125;
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                const icon = card.querySelector('.material-symbols-outlined');
                if(icon) &#123;
                    icon.classList.remove('scale-110');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
