import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Catalogue des Récompenses" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-display-lg-mobile" data-icon="school">school</span>
<h1 className="font-headline text-headline-md font-semibold">Récompenses &amp; Paliers</h1>
</div>
<div className="flex items-center gap-4">
<button className="material-symbols-outlined p-2 hover:bg-primary-container/20 transition-colors active:scale-95 duration-150" data-icon="notifications">notifications</button>
</div>
</header>
<main className="pt-24 px-4 max-w-2xl mx-auto space-y-8">

<section className="text-center space-y-2">
<h2 className="text-3xl font-extrabold text-primary tracking-tight">Devenez un Ambassadeur</h2>
<p className="text-on-surface-variant font-medium">Invitez vos amis et débloquez des avantages académiques exclusifs.</p>
<div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-bold shadow-sm">
<span className="material-symbols-outlined" data-icon="group" style={{"fontVariationSettings":"'FILL' 1"}}>group</span>
<span>2 Amis parrainés</span>
</div>
</section>

<div className="space-y-6">

<div className="relative group">
<div className="absolute -inset-1 bg-gradient-to-r from-tertiary-fixed to-primary rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
<div className="relative bg-surface-container-lowest p-6 rounded-xl border border-tertiary shadow-sm flex flex-col md:flex-row gap-6 items-center">
<div className="w-20 h-20 rounded-full bg-tertiary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-on-tertiary-fixed" data-icon="workspace_premium" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<div className="flex-1 text-center md:text-left">
<div className="flex items-center justify-center md:justify-start gap-2 mb-1">
<h3 className="text-xl font-bold text-on-surface">Le Découvreur</h3>
<span className="bg-tertiary-container text-on-tertiary-container text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold">Débloqué</span>
</div>
<p className="text-on-surface-variant text-sm mb-4">Seuil : 1 ami</p>
<div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant inline-flex items-center gap-3">
<span className="material-symbols-outlined text-primary" data-icon="card_giftcard">card_giftcard</span>
<span className="font-semibold text-primary">7 jours Premium offerts</span>
</div>
</div>
<div className="shrink-0">
<button className="px-6 py-2 bg-tertiary text-on-tertiary font-bold rounded-lg shadow-md active:scale-95 transition-transform">Récupérer</button>
</div>
</div>
</div>

<div className="relative bg-surface-container-lowest p-6 rounded-xl border border-primary-container shadow-lg flex flex-col md:flex-row gap-6 items-center">
<div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-4xl text-primary" data-icon="military_tech">military_tech</span>
</div>
<div className="flex-1 w-full text-center md:text-left">
<div className="flex items-center justify-center md:justify-start gap-2 mb-1">
<h3 className="text-xl font-bold text-on-surface">Le Guide</h3>
<span className="bg-secondary-container text-on-secondary-container text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold">En cours</span>
</div>
<p className="text-on-surface-variant text-sm mb-3">Seuil : 5 amis</p>

<div className="w-full max-w-xs mx-auto md:mx-0 space-y-1.5 mb-4">
<div className="flex justify-between text-xs font-bold text-primary">
<span>Progression</span>
<span>2 / 5</span>
</div>
<div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant">
<div className="h-full bg-primary" style={{"width":"40%"}}></div>
</div>
</div>
<div className="flex flex-wrap justify-center md:justify-start gap-3">
<div className="bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="diamond">diamond</span>
<span className="font-semibold text-sm">1 mois Premium</span>
</div>
<div className="bg-surface-container-low px-3 py-2 rounded-lg border border-outline-variant flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-sm" data-icon="verified">verified</span>
<span className="font-semibold text-sm">Badge "Mentor"</span>
</div>
</div>
</div>
<div className="shrink-0 hidden md:block">
<button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant cursor-not-allowed">
<span className="material-symbols-outlined" data-icon="lock">lock</span>
</button>
</div>
</div>

<div className="relative bg-surface-container-low/50 p-6 rounded-xl border border-dashed border-outline-variant flex flex-col md:flex-row gap-6 items-center opacity-75 grayscale-[0.5]">
<div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center shrink-0 border-2 border-outline-variant">
<span className="material-symbols-outlined text-4xl text-outline" data-icon="stars">stars</span>
</div>
<div className="flex-1 text-center md:text-left">
<div className="flex items-center justify-center md:justify-start gap-2 mb-1">
<h3 className="text-xl font-bold text-on-surface-variant">L'Ambassadeur</h3>
<span className="bg-surface-dim text-on-surface-variant text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold">Verrouillé</span>
</div>
<p className="text-on-surface-variant text-sm mb-4">Seuil : 10 amis</p>
<div className="space-y-3">
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
<p className="text-sm">3 mois Premium illimités</p>
</div>
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined" data-icon="home_storage">home_storage</span>
<p className="text-sm">Certificat d'Honneur physique envoyé à domicile</p>
</div>
</div>
</div>
<div className="absolute top-4 right-4">
<span className="material-symbols-outlined text-outline" data-icon="lock_clock">lock_clock</span>
</div>
</div>
</div>

<section className="bg-primary-container text-on-primary-container p-6 rounded-2xl shadow-xl space-y-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-on-primary-container text-primary-container rounded-lg flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="share">share</span>
</div>
<div>
<h4 className="font-bold text-lg">Prêt à parrainer ?</h4>
<p className="text-sm opacity-90">Partagez votre code unique et gagnez des récompenses dès que votre ami s'inscrit.</p>
</div>
</div>
<div className="flex items-center gap-2 bg-on-primary-container/10 p-3 rounded-lg border border-on-primary-container/20">
<span className="font-mono font-bold text-xl flex-1 text-center tracking-widest">EDUKORA-2024</span>
<button className="bg-white text-primary px-4 py-2 rounded-md font-bold hover:bg-surface-bright transition-colors">Copier</button>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full rounded-t-xl z-50 bg-surface dark:bg-surface-container-low border-t border-outline-variant dark:border-outline shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe w-full">

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs font-medium">Cours</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs font-medium">tuteur IA</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="bookmark">bookmark</span>
<span className="font-label text-label-xs font-medium">Favoris</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-all active:scale-90 duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-medium">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for Copy button
        document.querySelector('button:contains("Copier")')?.addEventListener('click', function() &#123;
            const btn = this;
            const originalText = btn.innerText;
            btn.innerText = "Copié !";
            btn.classList.replace('text-primary', 'text-tertiary-container');
            setTimeout(() =&gt; &#123;
                btn.innerText = originalText;
                btn.classList.replace('text-tertiary-container', 'text-primary');
            &#125;, 2000);
        &#125;);

        // Add contains selector support for the script above
        if (!window.Element.prototype.contains) &#123;
            // Simplified logic for this specific demo
        &#125;
    </script>

    </div>
  );
}
