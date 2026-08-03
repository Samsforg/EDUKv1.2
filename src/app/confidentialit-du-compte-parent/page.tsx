import type { Metadata } from "next";

export const metadata: Metadata = { title: "Confidentialité - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary shadow-md flex justify-between items-center px-4 h-16">
<div className="flex items-center gap-4">
<button className="hover:opacity-80 transition-opacity duration-200">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-on-primary text-xl">Profil Parent</h1>
</div>
<button className="hover:opacity-80 transition-opacity duration-200">
<span className="material-symbols-outlined">settings</span>
</button>
</header>
<main className="pt-20 px-4 max-w-4xl mx-auto space-y-6">

<section className="relative overflow-hidden rounded-xl bg-primary-container p-6 text-white mb-8">
<div className="relative z-10">
<h2 className="font-headline text-2xl font-bold mb-2 text-on-primary-container">Confidentialité &amp; Données</h2>
<p className="text-on-primary-container opacity-90 max-w-md">Contrôlez comment vos informations et celles de vos enfants sont partagées et sécurisées au sein de l'écosystème Edukora.</p>
</div>

<div className="absolute -right-8 -top-8 w-48 h-48 bg-secondary-container opacity-20 rounded-full blur-3xl"></div>
</section>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="glass-card p-5 rounded-xl flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-primary/10 rounded-lg">
<span className="material-symbols-outlined text-primary">visibility</span>
</div>
<h3 className="font-headline font-semibold text-lg">Visibilité du Profil</h3>
</div>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Définissez qui peut voir vos informations de profil parent dans l'annuaire de l'école.</p>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<span className="text-sm font-medium">Profil Public</span>
<label className="switch">
<input checked={true} type="checkbox" />
<span className="slider"></span>
</label>
</div>
</div>

<div className="glass-card p-5 rounded-xl flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-tertiary-container/20 rounded-lg">
<span className="material-symbols-outlined text-tertiary">share</span>
</div>
<h3 className="font-headline font-semibold text-lg">Partage Enseignants</h3>
</div>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Permettre aux enseignants d'accéder aux rapports de performance détaillés de vos enfants.</p>
</div>
<div className="flex items-center justify-between pt-4 border-t border-outline-variant">
<span className="text-sm font-medium">Partage des Rapports</span>
<label className="switch">
<input checked={true} type="checkbox" />
<span className="slider"></span>
</label>
</div>
</div>

<div className="glass-card p-5 rounded-xl flex flex-col justify-between">
<div>
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-secondary-container/20 rounded-lg">
<span className="material-symbols-outlined text-secondary">cookie</span>
</div>
<h3 className="font-headline font-semibold text-lg">Gestion des Cookies</h3>
</div>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Cookies nécessaires au fonctionnement technique et analytique de l'application.</p>
</div>
<div className="space-y-3 pt-4 border-t border-outline-variant">
<div className="flex items-center justify-between">
<span className="text-xs font-medium text-on-surface-variant">Analyse de performance</span>
<label className="switch">
<input type="checkbox" />
<span className="slider"></span>
</label>
</div>
<div className="flex items-center justify-between">
<span className="text-xs font-medium text-on-surface-variant">Personnalisation IA</span>
<label className="switch">
<input checked={true} type="checkbox" />
<span className="slider"></span>
</label>
</div>
</div>
</div>

<div className="glass-card p-5 rounded-xl flex flex-col justify-between border-primary/20 bg-primary-fixed/30">
<div>
<div className="flex items-center gap-3 mb-4">
<div className="p-2 bg-primary-container rounded-lg">
<span className="material-symbols-outlined text-on-primary">download</span>
</div>
<h3 className="font-headline font-semibold text-lg text-primary">Mes Données</h3>
</div>
<p className="text-on-surface-variant text-sm mb-6 leading-relaxed">Téléchargez une copie complète de vos données personnelles et de l'historique de vos enfants au format JSON ou PDF.</p>
</div>
<button className="w-full py-3 bg-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primary-container transition-colors active:scale-[0.98]">
<span className="material-symbols-outlined text-sm">file_download</span>
                    Demander l'archive
                </button>
</div>
</div>

<div className="p-4 rounded-xl border border-outline-variant bg-surface-container-low flex gap-4 items-start">
<span className="material-symbols-outlined text-primary">verified_user</span>
<div>
<h4 className="font-semibold text-sm">Engagement de sécurité</h4>
<p className="text-xs text-on-surface-variant mt-1">Edukora utilise un cryptage de bout en bout pour toutes les communications concernant les mineurs. Vos données ne sont jamais vendues à des tiers.</p>
</div>
</div>

<section className="mt-8 border-t border-outline-variant pt-6 pb-12">
<h3 className="font-headline font-bold text-error mb-4">Zone de danger</h3>
<div className="bg-error-container/20 border border-error/20 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h4 className="font-bold text-on-error-container">Supprimer le compte</h4>
<p className="text-sm text-on-error-container opacity-80">Ceci effacera définitivement toutes vos données et celles liées à vos enfants.</p>
</div>
<button className="px-6 py-2 border-2 border-error text-error rounded-lg font-bold hover:bg-error hover:text-white transition-all whitespace-nowrap">
                    Supprimer
                </button>
</div>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-surface-container-high border-t border-outline-variant shadow-lg flex justify-around items-center h-16 px-2 pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-transform scale-95 active:scale-90 p-2" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-transform scale-95 active:scale-90 p-2" href="#">
<span className="material-symbols-outlined">family_restroom</span>
<span className="font-label text-label-xs">Enfants</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-transform scale-95 active:scale-90 p-2" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-bold">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for switches
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox =&gt; &#123;
            checkbox.addEventListener('change', function() &#123;
                const label = this.closest('div').querySelector('span').textContent;
                console.log(`$&#123;label&#125; mis à jour : $&#123;this.checked&#125;`);
                
                // Visual feedback
                if(this.checked) &#123;
                    this.parentElement.classList.add('scale-110');
                    setTimeout(() =&gt; this.parentElement.classList.remove('scale-110'), 200);
                &#125;
            &#125;);
        &#125;);

        // Toggle dark mode based on system preference (Edukora standard)
        if (window.matchMedia &amp;&amp; window.matchMedia('(prefers-color-scheme: dark)').matches) &#123;
            // document.documentElement.classList.add('dark'); // Optional if dark mode needed
        &#125;
    </script>

    </div>
  );
}
