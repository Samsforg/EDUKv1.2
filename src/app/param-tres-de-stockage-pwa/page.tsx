import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Paramètres & Stockage" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="p-2 active:opacity-80 transition-opacity rounded-full hover:bg-surface-container-high">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<span className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Paramètres d'étude</span>
</div>
<div className="flex items-center gap-2">
<button className="p-2 material-symbols-outlined text-primary dark:text-primary-fixed active:opacity-80 transition-opacity">notifications</button>
</div>
</header>
<main className="pt-20 pb-24 px-4 max-w-2xl mx-auto space-y-6">

<section className="bg-primary-container text-on-primary rounded-xl p-6 relative overflow-hidden">
<div className="relative z-10">
<h2 className="text-2xl font-bold font-headline mb-2 text-white">L'expérience Edukora PWA</h2>
<p className="text-sm text-on-primary-container leading-relaxed mb-4">
                    Profitez d'une vitesse fulgurante et d'un accès hors-ligne total. Pas besoin d'App Store : installez Edukora directement depuis votre navigateur pour économiser de la batterie et des données.
                </p>
<div className="flex flex-wrap gap-3">
<div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]">bolt</span> Rapidité
                    </div>
<div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]">cloud_off</span> Hors ligne
                    </div>
<div className="flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full text-xs font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span> Sans Stores
                    </div>
</div>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-9xl">install_mobile</span>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5">
<div className="flex items-center gap-3 mb-6">
<div className="p-2 bg-secondary-container/10 rounded-lg">
<span className="material-symbols-outlined text-secondary">inventory_2</span>
</div>
<h3 className="text-lg font-bold font-headline">Stockage Hors-ligne</h3>
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between text-sm mb-2">
<span className="text-on-surface-variant font-medium">Espace utilisé</span>
<span className="font-bold text-primary">420 MB sur 1 GB</span>
</div>
<div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
<div className="bg-primary h-full rounded-full" style={{"width":"42%"}}></div>
</div>
</div>
<div className="grid grid-cols-2 gap-3 pt-4">
<button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-surface-container-high text-on-surface-variant text-sm font-semibold hover:bg-surface-container-highest transition-colors active:scale-[0.98]">
<span className="material-symbols-outlined text-[20px]">delete_sweep</span>
                        Vider le cache
                    </button>
<button className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors active:scale-[0.98]">
<span className="material-symbols-outlined text-[20px]">download_for_offline</span>
                        Gérer les téléchargements
                    </button>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant/50">
<div className="p-5 flex items-center justify-between">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant">sync</span>
<div>
<p className="font-semibold text-on-surface">Téléchargement automatique</p>
<p className="text-xs text-on-surface-variant">Nouvelles fiches de cours</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
</label>
</div>
<div className="p-5 flex items-center justify-between">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant">wifi</span>
<div>
<p className="font-semibold text-on-surface">Utiliser données mobiles</p>
<p className="text-xs text-on-surface-variant">Pour les téléchargements automatiques</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary-container"></div>
</label>
</div>
</section>

<div className="space-y-3">
<h4 className="text-xs font-bold text-outline uppercase tracking-widest px-1">Support et informations</h4>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
<button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors text-left group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant">help_center</span>
<span className="font-medium">Centre d'aide PWA</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
</button>
<div className="h-px bg-outline-variant/30 mx-4"></div>
<button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-high transition-colors text-left group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant">info</span>
<span className="font-medium">À propos de la version 2.4.0</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
</button>
</div>
</div>
</main>

<div className="fixed inset-0 bg-black/40 z-[60] hidden" id="drawer">
<aside className="h-full w-80 bg-surface-container-lowest dark:bg-surface-dim rounded-r-xl flex flex-col py-6 shadow-xl transform -translate-x-full transition-transform duration-300">
<div className="px-6 mb-8 flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-271.png" alt="A focused high-school student from Côte d'Ivoire wearing a clean polo shirt, looking at a digital tablet in a bright, modern learning environment. The lighting is soft and professional, capturing a sense of academic ambition and technological empowerment. The background is a clean, minimalist ivory and blue aesthetic." />
</div>
<div>
<h2 className="font-headline text-primary font-bold text-lg">Etudiant Edukora</h2>
<p className="text-xs text-on-surface-variant">BAC Prep 2024 • Prêt hors ligne</p>
</div>
</div>
<nav className="flex-1 px-2 space-y-1">
<a className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined">offline_pin</span>
<span className="font-body text-body-md">Mode hors ligne</span>
</a>
<a className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined">install_mobile</span>
<span className="font-body text-body-md">Install App</span>
</a>
<a className="flex items-center gap-4 p-4 bg-secondary-container text-on-secondary-container font-bold rounded-full mx-2" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres d'étude</span>
</a>
<a className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body text-body-md">Help Center</span>
</a>
</nav>
</aside>
</div>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl shadow-md bg-surface dark:bg-surface-dim flex justify-around items-center px-2 py-3">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary transition-colors active:scale-95">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary transition-colors active:scale-95">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary transition-colors active:scale-95">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant p-2 hover:text-primary transition-colors active:scale-95">
<span className="material-symbols-outlined">local_library</span>
<span className="font-label text-label-xs font-semibold">Bibliothèque</span>
</button>
<button className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim bg-secondary-container/10 rounded-xl p-2 active:scale-95 transition-transform duration-150">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</button>
</nav>
<script>
        // Simple micro-interaction for buttons
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                this.classList.add('opacity-70');
                setTimeout(() =&gt; this.classList.remove('opacity-70'), 100);
            &#125;);
        &#125;);

        // Toggle state simulation
        document.querySelectorAll('input[type="checkbox"]').forEach(toggle =&gt; &#123;
            toggle.addEventListener('change', function() &#123;
                console.log('Setting updated:', this.checked);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
