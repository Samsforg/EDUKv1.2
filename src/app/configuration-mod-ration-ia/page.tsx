import type { Metadata } from "next";

export const metadata: Metadata = { title: "Config IA - Modération Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container font-headline text-display-lg-mobile md:text-headline-md shadow-sm border-b border-outline-variant flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined" style={{"fontSize":"28px"}}>admin_panel_settings</span>
<span className="font-headline font-bold text-on-primary dark:text-on-primary-container">Modération Edukora</span>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 text-label-sm">
<span className="text-on-primary-container opacity-80 hover:bg-primary-fixed-variant/20 transition-colors px-2 py-1 rounded cursor-pointer">Aide</span>
<span className="text-on-primary-container opacity-80 hover:bg-primary-fixed-variant/20 transition-colors px-2 py-1 rounded cursor-pointer">Assistance</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container border-2 border-on-primary flex items-center justify-center font-bold text-on-primary cursor-pointer active:scale-95 duration-150">
                AU
            </div>
</div>
</header>

<aside className="hidden md:flex flex-col fixed left-0 top-16 bottom-0 z-40 h-full w-64 border-r border-outline-variant bg-surface dark:bg-inverse-surface">
<div className="p-6">
<h2 className="font-headline font-semibold text-primary mb-6">Menu Admin</h2>
<nav className="space-y-2">
<a className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg cursor-pointer" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg cursor-pointer" href="#">
<span className="material-symbols-outlined">report</span>
<span className="font-body text-body-md">Signalements</span>
</a>
<a className="flex items-center gap-4 p-3 bg-primary-container text-on-primary-container rounded-lg font-semibold cursor-pointer" href="#">
<span className="material-symbols-outlined">psychology</span>
<span className="font-body text-body-md">Config IA</span>
</a>
<a className="flex items-center gap-4 p-3 text-on-surface-variant hover:bg-surface-container-highest transition-all rounded-lg cursor-pointer" href="#">
<span className="material-symbols-outlined">history</span>
<span className="font-body text-body-md">Logs Système</span>
</a>
</nav>
</div>
<div className="mt-auto p-6 border-t border-outline-variant">
<div className="flex items-center gap-3 p-2 text-on-surface-variant cursor-pointer hover:text-error transition-colors">
<span className="material-symbols-outlined">logout</span>
<span className="text-label-sm font-semibold">Déconnexion</span>
</div>
</div>
</aside>

<main className="pt-20 pb-24 md:pb-8 md:pl-72 px-4 md:pr-8 max-w-7xl mx-auto">

<div className="mb-8">
<h1 className="font-headline font-bold text-display-lg text-primary mb-2">Configuration Kora AI</h1>
<p className="text-on-surface-variant body-md max-w-2xl">Ajustez les paramètres de modération proactive pour garantir un environnement d'apprentissage sain et sécurisé pour les étudiants ivoiriens.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<section className="lg:col-span-8 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
<div className="flex items-center gap-3 mb-6">
<div className="p-2 bg-primary-container rounded-lg">
<span className="material-symbols-outlined text-on-primary-container">tune</span>
</div>
<h3 className="font-headline font-bold text-headline-md">Sensibilité de l'IA</h3>
</div>
<div className="space-y-8">
<div>
<div className="flex justify-between mb-4">
<span className="text-label-sm font-bold text-primary">TOLÉRANCE FAIBLE</span>
<span className="text-label-sm font-bold text-secondary" id="tolerance-val">75%</span>
<span className="text-label-sm font-bold text-primary">TOLÉRANCE ÉLEVÉE</span>
</div>
<input className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary" id="sensitivity-range" max={100} min={0} type="range" value="75" />
<div className="flex justify-between mt-2 text-label-xs text-on-surface-variant">
<span>Maximum Sécurité</span>
<span>Standard Académique</span>
<span>Liberté Totale</span>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-lg border-l-4 border-secondary">
<p className="text-label-sm font-semibold text-secondary-container mb-1">Impact actuel :</p>
<p className="text-body-md text-on-surface">Kora AI filtrera les messages contenant des propos déplacés, du harcèlement et des tentatives de fraude aux examens avec une précision de détection haute.</p>
</div>
</div>
</section>

<section className="lg:col-span-4 bg-primary text-on-primary rounded-xl p-6 shadow-lg relative overflow-hidden">
<div className="relative z-10">
<h3 className="font-headline font-semibold text-label-sm uppercase tracking-wider mb-2 opacity-80">Messages filtrés ce mois</h3>
<div className="text-5xl font-bold font-headline mb-4">12 482</div>
<div className="flex items-center gap-2 text-tertiary-fixed font-semibold text-label-sm mb-6">
<span className="material-symbols-outlined">trending_up</span>
<span>+14% vs mois dernier</span>
</div>
<div className="space-y-3">
<div className="flex justify-between text-label-xs border-b border-on-primary/20 pb-2">
<span>Insultes/Haine</span>
<span className="font-bold">4 210</span>
</div>
<div className="flex justify-between text-label-xs border-b border-on-primary/20 pb-2">
<span>Spam/Liens</span>
<span className="font-bold">6 122</span>
</div>
<div className="flex justify-between text-label-xs">
<span>Fraude Scolaire</span>
<span className="font-bold">2 150</span>
</div>
</div>
</div>

<div className="absolute -right-12 -bottom-12 w-48 h-48 bg-on-primary/10 rounded-full blur-3xl"></div>
</section>

<section className="lg:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
<div className="flex justify-between items-center mb-6">
<div className="flex items-center gap-3">
<div className="p-2 bg-error-container rounded-lg text-on-error-container">
<span className="material-symbols-outlined">block</span>
</div>
<h3 className="font-headline font-bold text-headline-md">Mots-clés interdits</h3>
</div>
<button className="bg-primary hover:bg-primary-container text-on-primary px-4 py-2 rounded-lg text-label-sm font-semibold transition-colors flex items-center gap-2">
<span className="material-symbols-outlined text-sm">add</span> Ajouter
                    </button>
</div>
<div className="flex flex-wrap gap-2 mb-6">
<span className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-2 text-label-sm text-on-surface">
                        Corrigé BAC <button className="hover:text-error"><span className="material-symbols-outlined text-xs">close</span></button>
</span>
<span className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-2 text-label-sm text-on-surface">
                        Vente épreuve <button className="hover:text-error"><span className="material-symbols-outlined text-xs">close</span></button>
</span>
<span className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-2 text-label-sm text-on-surface">
                        Cheat <button className="hover:text-error"><span className="material-symbols-outlined text-xs">close</span></button>
</span>
<span className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-2 text-label-sm text-on-surface">
                        Phishing <button className="hover:text-error"><span className="material-symbols-outlined text-xs">close</span></button>
</span>
<span className="bg-surface-container-high px-3 py-1.5 rounded-full flex items-center gap-2 text-label-sm text-on-surface">
                        Crypto <button className="hover:text-error"><span className="material-symbols-outlined text-xs">close</span></button>
</span>
</div>
<div className="relative">
<input className="w-full bg-surface p-3 pl-10 border border-outline-variant rounded-lg focus:outline-none focus:border-primary" placeholder="Entrez un mot ou une expression..." type="text" />
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
</div>
</section>

<section className="lg:col-span-6 bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
<div className="flex items-center gap-3 mb-6">
<div className="p-2 bg-tertiary-container rounded-lg text-on-tertiary-container">
<span className="material-symbols-outlined">bolt</span>
</div>
<h3 className="font-headline font-bold text-headline-md">Actions Automatiques</h3>
</div>
<div className="space-y-4">
<label className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors group">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Suppression de liens suspects</span>
<span className="text-label-xs text-on-surface-variant">Supprime instantanément tout lien externe non approuvé.</span>
</div>
<input checked={true} className="w-6 h-6 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors group">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Avertissement automatique</span>
<span className="text-label-xs text-on-surface-variant">Envoie un message privé à l'utilisateur lors du 1er dérapage.</span>
</div>
<input checked={true} className="w-6 h-6 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
</label>
<label className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-colors group">
<div className="flex flex-col">
<span className="font-semibold text-on-surface">Shadow-ban intelligent</span>
<span className="text-label-xs text-on-surface-variant">Rend invisible les messages des comptes récidivistes.</span>
</div>
<input className="w-6 h-6 rounded border-outline text-primary focus:ring-primary" type="checkbox" />
</label>
</div>
</section>
</div>

<div className="mt-8 flex justify-end gap-4">
<button className="px-6 py-3 border border-outline-variant rounded-lg font-semibold text-on-surface-variant hover:bg-surface-container transition-all">Réinitialiser</button>
<button className="px-8 py-3 bg-secondary hover:bg-on-secondary-container text-on-secondary rounded-lg font-bold shadow-md transform active:scale-95 transition-all">Sauvegarder les modifications</button>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest border-t border-outline-variant shadow-lg flex justify-around items-center h-16 px-2">
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest p-2 rounded-lg">
<span className="material-symbols-outlined">grid_view</span>
<span className="font-label text-label-xs">Tableau de bord</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest p-2 rounded-lg">
<span className="material-symbols-outlined">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1">
<span className="material-symbols-outlined">settings_suggest</span>
<span className="font-label text-label-xs">Paramètres IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant active:bg-surface-container-highest p-2 rounded-lg">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Micro-interactions for Slider
        const slider = document.getElementById('sensitivity-range');
        const valDisplay = document.getElementById('tolerance-val');
        
        slider.addEventListener('input', (e) =&gt; &#123;
            valDisplay.textContent = e.target.value + '%';
            if(e.target.value &lt; 30) &#123;
                valDisplay.style.color = '#ba1a1a'; // Error red
            &#125; else if (e.target.value &gt; 70) &#123;
                valDisplay.style.color = '#954a00'; // National orange
            &#125; else &#123;
                valDisplay.style.color = '#00327d'; // Academic Blue
            &#125;
        &#125;);
    </script>

    </div>
  );
}
