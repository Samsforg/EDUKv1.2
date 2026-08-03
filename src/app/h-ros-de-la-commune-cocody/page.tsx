import type { Metadata } from "next";

export const metadata: Metadata = { title: "Héros de la Commune - Edukora" };

export default function Page() {
  return (
    <div className="bg-mesh text-on-surface font-body selection:bg-secondary-container/30" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-md flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full border-2 border-on-primary overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-177.png" alt="A professional studio portrait of a young Ivorian student with a confident smile, wearing a clean school uniform. The lighting is bright and optimistic, set against a soft-focus academic library background. The image has high clarity and a modern, institutional feel that aligns with the Edukora corporate blue and white branding." />
</div>
<span className="font-headline text-headline-md font-semibold text-on-primary">Edukora</span>
</div>
<div className="flex items-center gap-4">
<button className="text-on-primary hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined">notifications</span>
</button>
</div>
</header>
<main className="pt-20 pb-28 px-4 max-w-5xl mx-auto space-y-6">

<div className="py-4">
<h1 className="font-headline text-display-lg-mobile font-bold text-primary">Héros de la Commune</h1>
<p className="text-on-surface-variant text-body-md">Votre impact social et académique à Cocody.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-4">

<section className="md:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-4">
<div className="bg-tertiary-container/10 text-tertiary px-3 py-1 rounded-full flex items-center gap-2">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
<span className="font-label text-label-sm font-bold">Rang #12 à Cocody</span>
</div>
<span className="text-on-surface-variant text-label-xs font-medium uppercase tracking-wider">Impact Hebdo</span>
</div>
<h2 className="font-headline text-headline-md font-bold text-on-surface">Camarades aidés: 24 cette semaine</h2>
</div>
<div className="grid grid-cols-3 gap-2 mt-8">
<div className="bg-surface-container p-3 rounded-lg text-center">
<span className="block font-headline text-lg font-bold text-primary">1,240</span>
<span className="block text-[10px] uppercase font-bold text-outline">Entraide XP</span>
</div>
<div className="bg-surface-container p-3 rounded-lg text-center">
<span className="block font-headline text-lg font-bold text-secondary">42</span>
<span className="block text-[10px] uppercase font-bold text-outline">Questions</span>
</div>
<div className="bg-surface-container p-3 rounded-lg text-center">
<span className="block font-headline text-lg font-bold text-tertiary">15</span>
<span className="block text-[10px] uppercase font-bold text-outline">Fiches</span>
</div>
</div>
</section>

<section className="md:col-span-5 bg-primary rounded-xl p-6 text-on-primary flex flex-col items-center justify-center text-center relative overflow-hidden">
<div className="absolute top-0 right-0 p-4 opacity-10">
<span className="material-symbols-outlined text-8xl" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div className="relative z-10">
<div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 mx-auto border-2 border-on-primary-container/30">
<span className="material-symbols-outlined text-5xl text-secondary-container" style={{"fontVariationSettings":"'FILL' 1"}}>diamond</span>
</div>
<h3 className="font-headline text-body-lg font-bold">Futur Mentor National</h3>
<p className="text-on-primary-container text-label-sm mb-6">Prochain palier : 1,500 XP</p>
<div className="w-full bg-on-primary/20 h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[82%] rounded-full"></div>
</div>
<span className="text-[10px] mt-2 block opacity-80">Progression 82%</span>
</div>
</section>

<section className="md:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<div className="flex justify-between items-center mb-6">
<h3 className="font-headline text-headline-md font-bold text-primary">Influence Sociale</h3>
<span className="material-symbols-outlined text-outline">trending_up</span>
</div>
<div className="space-y-4">

<div className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-primary-fixed flex items-center justify-center rounded-lg text-primary">
<span className="material-symbols-outlined">description</span>
</div>
<div>
<h4 className="font-bold text-on-surface">SVT: Génétique</h4>
<p className="text-label-sm text-on-surface-variant">Fiche de révision certifiée</p>
</div>
</div>
<div className="text-right">
<span className="block font-bold text-primary">152</span>
<span className="text-label-xs text-outline uppercase">Vues</span>
</div>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-low border border-outline-variant/30 rounded-lg hover:bg-surface-container transition-colors cursor-pointer">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-secondary-fixed flex items-center justify-center rounded-lg text-secondary">
<span className="material-symbols-outlined">calculate</span>
</div>
<div>
<h4 className="font-bold text-on-surface">Maths: Intégrales</h4>
<p className="text-label-sm text-on-surface-variant">Méthodologie BAC</p>
</div>
</div>
<div className="text-right">
<span className="block font-bold text-secondary">89</span>
<span className="text-label-xs text-outline uppercase">Téléchargements</span>
</div>
</div>
</div>
</section>

<section className="md:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<h3 className="font-headline text-body-lg font-bold text-primary mb-6">Cocody Leaderboard</h3>
<div className="space-y-6">

<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="relative">
<img className="w-10 h-10 rounded-full border-2 border-secondary-container object-cover" src="/images/ecran-178.png" alt="A profile avatar of a studious male student with glasses, smiling warmly. He is in an educational setting with natural lighting and soft shadows. The overall aesthetic is professional, academic, and modern, fitting the Ivory Coast national pride and corporate education style of Edukora." />
<div className="absolute -top-1 -left-1 bg-secondary-container text-[8px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">1</div>
</div>
<div>
<p className="text-label-sm font-bold">Jean M.</p>
<p className="text-[10px] text-outline">Lycée Garçons</p>
</div>
</div>
<span className="font-headline font-bold text-tertiary">3,140 pt</span>
</div>

<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="relative">
<img className="w-10 h-10 rounded-full border-2 border-outline-variant object-cover" src="/images/ecran-179.png" alt="A profile picture of a determined female student wearing a school uniform. The lighting is clear and professional, with a background featuring a clean, modern classroom. The image reflects academic excellence and Ivory Coast national colors, part of the Edukora ecosystem." />
<div className="absolute -top-1 -left-1 bg-outline text-[8px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">2</div>
</div>
<div>
<p className="text-label-sm font-bold">Sarah K.</p>
<p className="text-[10px] text-outline">Sainte Marie</p>
</div>
</div>
<span className="font-headline font-bold text-tertiary">2,890 pt</span>
</div>

<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="relative">
<img className="w-10 h-10 rounded-full border-2 border-outline-variant object-cover" src="/images/ecran-180.png" alt="Close-up portrait of a cheerful young scholar with a bright, energetic look. The styling is academic and modern, featuring clean lighting and a soft-focus urban education environment. The color palette incorporates Navy and National Orange accents to match the Edukora brand guidelines." />
<div className="absolute -top-1 -left-1 bg-outline-variant text-[8px] text-white w-4 h-4 rounded-full flex items-center justify-center font-bold">3</div>
</div>
<div>
<p className="text-label-sm font-bold">Moussa T.</p>
<p className="text-[10px] text-outline">Classique</p>
</div>
</div>
<span className="font-headline font-bold text-tertiary">2,550 pt</span>
</div>
</div>
<button className="w-full mt-6 text-primary font-bold text-label-sm hover:underline">Voir tout le classement</button>
</section>
</div>

<div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between bg-secondary-container/5 p-8 rounded-2xl border border-secondary-container/20">
<div className="text-center md:text-left">
<h3 className="font-headline text-headline-md font-bold text-on-secondary-container">Prêt à faire briller votre commune ?</h3>
<p className="text-on-secondary-container/80">Rejoignez le forum local et aidez vos camarades sur les sujets difficiles.</p>
</div>
<button className="bg-secondary-container text-on-secondary px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-lg hover:shadow-secondary-container/30 active:scale-95 transition-all w-full md:w-auto justify-center">
<span className="material-symbols-outlined">handshake</span>
                Aider un camarade
            </button>
</div>
</main>

<aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-80 bg-surface-container-low border-r border-outline-variant flex-col py-6 z-40">
<div className="px-6 mb-8 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xl">I</div>
<div>
<h4 className="font-headline font-bold text-primary">Influenceur Edukora</h4>
<p className="text-label-xs text-outline">Commune d'Abidjan • Niveau BAC</p>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-4 px-4 py-3 mx-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">leaderboard</span>
<span className="font-body">Classement Local</span>
</a>
<a className="flex items-center gap-4 bg-tertiary-container text-on-tertiary-container rounded-full mx-2 px-4 py-3" href="#">
<span className="material-symbols-outlined">diversity_3</span>
<span className="font-body">Impact Social</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 mx-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">insights</span>
<span className="font-body">Statistiques de la Commune</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 mx-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">military_tech</span>
<span className="font-body">Récompenses</span>
</a>
<div className="pt-4 border-t border-outline-variant/30 mt-4">
<a className="flex items-center gap-4 px-4 py-3 mx-2 text-on-surface-variant hover:bg-surface-container-high transition-colors rounded-lg" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body">Paramètres</span>
</a>
</div>
</nav>
</aside>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface rounded-t-xl shadow-[0_-2px_10px_rgba(0,0,0,0.05)] border-t border-outline-variant flex justify-around items-center h-20 pb-safe px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">location_city</span>
<span className="font-label text-label-xs font-medium">Commune</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary font-bold bg-secondary-container/10 rounded-full px-3 py-1" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>handshake</span>
<span className="font-label text-label-xs font-medium">Entraide</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-all" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction: Update progress bar animation on load
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const progressBar = document.querySelector('.w-\\[82\\%\\]');
            progressBar.style.width = '0%';
            setTimeout(() =&gt; &#123;
                progressBar.style.transition = 'width 1.5s cubic-bezier(0.65, 0, 0.35, 1)';
                progressBar.style.width = '82%';
            &#125;, 300);
        &#125;);

        // Hover animations for cards
        const cards = document.querySelectorAll('section');
        cards.forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-2px)';
                card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                card.classList.add('shadow-md');
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
                card.classList.remove('shadow-md');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
