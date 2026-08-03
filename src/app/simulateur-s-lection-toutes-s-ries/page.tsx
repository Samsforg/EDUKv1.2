import type { Metadata } from "next";

export const metadata: Metadata = { title: "EduKora BAC - Sélection de l'épreuve" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex justify-between items-center px-margin-mobile h-16 w-full z-50 fixed top-0 bg-surface border-b border-outline-variant glass-header">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-surface-container-low transition-colors rounded-full active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary" data-icon="menu">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">EduKora BAC</h1>
</div>
<div className="flex items-center gap-3">
<div className="hidden md:flex flex-col text-right">
<span className="text-label-sm font-bold text-primary">Kouassi N.</span>
<span className="text-[10px] text-on-surface-variant uppercase tracking-wider">Multi-Séries (A, C, D, G2, B)</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-primary-fixed p-0.5 overflow-hidden active:scale-95 duration-100 cursor-pointer">
<img className="w-full h-full object-cover rounded-full" src="/images/ecran-319.png" alt="A professional close-up portrait of a young West African male student" />
</div>
</div>
</header>
<main className="pt-20 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">

<section className="mt-8 mb-10">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
<div>
<h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Prêt pour l'excellence ?</h2>
<p className="font-body-md text-body-md text-on-surface-variant max-w-xl">Sélectionnez une matière pour commencer votre simulateur d'examen. Désormais disponible pour les séries <strong>A1, A2, C, D (Général)</strong> et <strong>G2, B (Technique)</strong>.</p>
</div>

<div className="relative w-full md:w-96 group">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
<input className="w-full pl-12 pr-4 py-3 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all text-body-md" placeholder="Rechercher une épreuve ou une série..." type="text" />
</div>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<div className="subject-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">functions</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Séries A, C, D, G2</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Mathématiques</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Épreuve Nationale • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">timer</span>
<span className="">4 Heures</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">task</span>
<span className="">12 Questions</span>
</div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Série G2</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Comptabilité</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Gestion Financière • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">timer</span>
<span className="">4 Heures</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">task</span>
<span className="">6 Dossiers</span>
</div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">engineering</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Série B</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Construction Méc.</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Dessin &amp; Analyse • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">timer</span>
<span className="">6 Heures</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">task</span>
<span className="">1 Projet</span>
</div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-tertiary-fixed flex items-center justify-center text-tertiary-container">
<span className="material-symbols-outlined text-3xl">biotech</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Séries C, D</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">SVT</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Sciences de la Vie et de la Terre • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">timer</span>
<span className="">3.5 Heures</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">task</span>
<span className="">8 Questions</span>
</div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">psychology</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Séries A, C, D</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Philosophie</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Dissertation &amp; Commentaire • 2023</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">timer</span>
<span className="">4 Heures</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">task</span>
<span className="">3 Sujets</span>
</div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>

<div className="subject-card bg-surface border border-outline-variant rounded-xl p-5 transition-all duration-200 flex flex-col group">
<div className="flex justify-between items-start mb-4">
<div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl">bolt</span>
</div>
<span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold px-2 py-1 rounded-full uppercase">Séries C, D, B</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface mb-1">Physique-Chimie</h3>
<p className="text-label-sm text-on-surface-variant mb-4">Épreuve Nationale • 2022</p>
<div className="flex items-center gap-4 mb-6 text-label-xs text-on-surface-variant">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">timer</span>
<span className="">3.5 Heures</span>
</div>
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-base">task</span>
<span className="">10 Questions</span>
</div>
</div>
<div className="mt-auto">
<button className="w-full bg-primary hover:bg-primary-container text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-95 duration-100">
                        Commencer le test
                        <span className="material-symbols-outlined text-lg">play_arrow</span>
</button>
</div>
</div>
</div>

<section className="mt-12 bg-primary-container rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 border border-primary">
<div className="relative z-10 flex-1 text-center md:text-left">
<h3 className="font-display-lg text-white mb-4">Besoin d'aide avec un exercice ?</h3>
<p className="font-body-md text-on-primary-container mb-6 opacity-90">Posez vos questions à notre IA spécialisée sur le programme ivoirien (Général &amp; Technique). Disponible 24/7 pour des explications étape par étape.</p>
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
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary" href="#"><span className="material-symbols-outlined">bookmark</span><span className="font-label-xs text-label-xs">Favoris</span></a><a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions
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

        // Search highlight simulation
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('input', (e) =&gt; &#123;
            const term = e.target.value.toLowerCase();
            document.querySelectorAll('.subject-card').forEach(card =&gt; &#123;
                const title = card.querySelector('h3').textContent.toLowerCase();
                const series = card.querySelector('.bg-secondary-fixed').textContent.toLowerCase();
                if (title.includes(term) || series.includes(term)) &#123;
                    card.style.display = 'flex';
                    card.style.opacity = '1';
                &#125; else &#123;
                    card.style.opacity = '0.3';
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
