import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Préparation aux Oraux" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-32" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="material-symbols-outlined hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 duration-200" data-icon="menu">menu</button>
<div className="flex items-center gap-2">
<img alt="Edukora Logo" className="h-8 w-8 rounded-lg" src="/images/ecran-284.png" />
<h1 className="font-headline font-bold text-on-primary tracking-tight text-xl">Edukora</h1>
</div>
</div>
<div className="flex items-center gap-2">
<button className="material-symbols-outlined p-2 hover:bg-primary-container/20 transition-colors rounded-full" data-icon="notifications">notifications</button>
<div className="h-8 w-8 rounded-full overflow-hidden border-2 border-on-primary-container/30">
<img className="h-full w-full object-cover" src="/images/ecran-285.png" alt="Close-up professional studio portrait of a young West African student with a friendly and determined expression, set against a clean, corporate blue background. The lighting is soft and professional, reflecting the Edukora brand's academic authority and modern aesthetic." />
</div>
</div>
</header>
<main className="mt-20 px-4 md:px-8 max-w-5xl mx-auto">

<section className="mb-8">
<div className="bg-primary-container/10 p-6 rounded-xl border border-primary-container/20 relative overflow-hidden">
<div className="relative z-10">
<h2 className="font-headline text-headline-md font-semibold text-primary mb-2">Préparation aux Oraux</h2>
<p className="text-on-surface-variant body-md max-w-md">Préparez-vous sereinement pour vos épreuves orales avec notre simulateur IA intelligent.</p>
</div>
<span className="material-symbols-outlined absolute -right-4 -bottom-4 text-primary/5 text-9xl pointer-events-none" style={{"fontVariationSettings":"'opsz' 48"}}>record_voice_over</span>
</div>
</section>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-all group active:scale-95 duration-200 cursor-pointer">
<div className="flex justify-between items-start mb-4">
<div className="bg-primary/10 text-primary p-3 rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined" data-icon="translate">translate</span>
</div>
<span className="bg-secondary-container text-on-secondary-container text-label-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider">BAC</span>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1">Anglais</h3>
<p className="text-on-surface-variant text-sm mb-4">Épreuve de communication</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex items-center gap-1 text-tertiary font-bold">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
<span className="text-sm">16.5 / 20</span>
</div>
<span className="text-outline text-xs italic">Dernier score</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-all group active:scale-95 duration-200 cursor-pointer">
<div className="flex justify-between items-start mb-4">
<div className="bg-primary/10 text-primary p-3 rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined" data-icon="auto_stories">auto_stories</span>
</div>
<span className="bg-secondary-container text-on-secondary-container text-label-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider">BAC</span>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1">Français</h3>
<p className="text-on-surface-variant text-sm mb-4">Commentaire &amp; Oral</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex items-center gap-1 text-tertiary font-bold">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
<span className="text-sm">14.0 / 20</span>
</div>
<span className="text-outline text-xs italic">Dernier score</span>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm hover:shadow-md transition-all group active:scale-95 duration-200 cursor-pointer">
<div className="flex justify-between items-start mb-4">
<div className="bg-primary/10 text-primary p-3 rounded-xl group-hover:bg-primary group-hover:text-on-primary transition-colors">
<span className="material-symbols-outlined" data-icon="language">language</span>
</div>
<span className="bg-tertiary-container text-on-tertiary-container text-label-xs px-2 py-1 rounded-md font-bold uppercase tracking-wider">BEPC</span>
</div>
<h3 className="font-headline text-lg font-bold text-on-surface mb-1">Espagnol</h3>
<p className="text-on-surface-variant text-sm mb-4">Expression orale</p>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<div className="flex items-center gap-1 text-outline-variant font-bold italic">
<span className="text-sm">N/A</span>
</div>
<span className="text-outline text-xs">Aucun essai</span>
</div>
</div>
</div>

<div className="flex flex-col items-center justify-center py-8 space-y-6">
<button className="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-headline font-bold text-lg shadow-xl hover:bg-secondary-container transition-all active:scale-90 flex items-center gap-3">
<span className="material-symbols-outlined" data-icon="play_circle" data-weight="fill">play_circle</span>
                Lancer un entraînement
            </button>
<p className="text-on-surface-variant text-sm font-medium flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary text-lg" data-icon="verified">verified</span>
                Simulation basée sur les critères officiels 2024
            </p>
</div>

<section className="mt-8">
<h4 className="font-headline text-on-surface font-bold mb-4">Votre Progression</h4>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div className="bg-surface-container-high p-4 rounded-xl flex flex-col justify-center items-center text-center">
<span className="text-2xl font-bold text-primary">12</span>
<span className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Sessions</span>
</div>
<div className="bg-surface-container-high p-4 rounded-xl flex flex-col justify-center items-center text-center">
<span className="text-2xl font-bold text-tertiary">85%</span>
<span className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Confiance</span>
</div>
<div className="bg-surface-container-high p-4 rounded-xl flex flex-col justify-center items-center text-center">
<span className="text-2xl font-bold text-secondary">04h</span>
<span className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Temps total</span>
</div>
<div className="bg-surface-container-high p-4 rounded-xl flex flex-col justify-center items-center text-center">
<span className="text-2xl font-bold text-primary">A-</span>
<span className="text-xs text-on-surface-variant uppercase font-bold tracking-tighter">Niveau Global</span>
</div>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline flex justify-around items-center h-20 px-2 pb-2 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-3 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-xl px-3 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-3 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="mic">mic</span>
<span className="font-label text-label-xs font-medium">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-3 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>

<script>
        document.querySelectorAll('a, button').forEach(el =&gt; &#123;
            el.addEventListener('touchstart', function() &#123;
                this.style.opacity = '0.7';
            &#125;);
            el.addEventListener('touchend', function() &#123;
                this.style.opacity = '1';
            &#125;);
        &#125;);

        // Dynamic Greeting (Academic Authority)
        const greeting = document.querySelector('h2');
        const hour = new Date().getHours();
        let introText = "Préparation aux Oraux";
        if (hour &lt; 12) introText = "Bonjour, prêt pour vos oraux ?";
        else if (hour &lt; 18) introText = "Bon après-midi, révisons vos oraux.";
        else introText = "Bonsoir, une séance d'oral rapide ?";
        greeting.textContent = introText;
    </script>

    </div>
  );
}
