import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profil Parent - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 h-16">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer hover:opacity-80 transition-opacity" data-icon="arrow_back">arrow_back</span>
<h1 className="font-headline text-headline-md font-bold text-on-primary">Profil Parent</h1>
</div>
<span className="material-symbols-outlined cursor-pointer hover:opacity-80 transition-opacity" data-icon="settings">settings</span>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
<div className="relative mb-4">
<div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-fixed shadow-lg">
<img className="w-full h-full object-cover" src="/images/ecran-295.png" alt="A professional and friendly portrait of an Ivorian father in his 40s, Mr. Konan, smiling warmly. He is wearing a modern business-casual shirt. The background is a clean, bright, and modern educational office setting with soft academic lighting and hints of blue accents reflecting the Edukora brand identity. High-quality photography style." />
</div>
<div className="absolute bottom-0 right-0 bg-secondary rounded-full p-1 border-2 border-surface">
<span className="material-symbols-outlined text-white text-sm" data-icon="verified" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
</div>
<h2 className="font-headline text-2xl font-extrabold text-primary">M. Konan</h2>
<p className="text-on-surface-variant font-body text-sm mb-2">parent@edukora.ci</p>
<span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
                Compte Parent
            </span>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between">
<h3 className="font-headline text-lg font-bold text-on-surface">Gestion des Enfants</h3>
<button className="flex items-center gap-1 text-primary font-bold text-sm hover:underline">
<span className="material-symbols-outlined text-sm" data-icon="add_circle">add_circle</span>
                    Ajouter un enfant
                </button>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex items-center gap-4 hover:border-primary transition-colors cursor-pointer group">
<div className="w-12 h-12 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined" data-icon="person">person</span>
</div>
<div>
<p className="font-bold text-on-surface">Koffi Konan</p>
<p className="text-xs text-on-surface-variant">Terminale C • Lycée Technique</p>
</div>
<span className="material-symbols-outlined ml-auto text-outline" data-icon="chevron_right">chevron_right</span>
</div>

<div className="border-2 border-dashed border-outline-variant rounded-xl p-4 flex items-center justify-center gap-3 text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer group">
<span className="material-symbols-outlined text-outline group-hover:text-primary" data-icon="group_add">group_add</span>
<span className="text-sm font-medium">Jumeler un autre enfant</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-4 border-b border-outline-variant bg-surface-container-low">
<h3 className="font-headline text-sm font-bold uppercase text-outline tracking-widest">Paramètres</h3>
</div>
<div className="divide-y divide-outline-variant">

<div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="person_edit">person_edit</span>
<span className="font-body text-on-surface">Informations personnelles</span>
</div>
<span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
</div>

<div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="notifications_active">notifications_active</span>
<span className="font-body text-on-surface">Préférences de notification</span>
</div>
<span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
</div>

<div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary" data-icon="security">security</span>
<span className="font-body text-on-surface">Paramètres de sécurité</span>
</div>
<span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-4 border-b border-outline-variant bg-surface-container-low">
<h3 className="font-headline text-sm font-bold uppercase text-outline tracking-widest">Assistance</h3>
</div>
<div className="divide-y divide-outline-variant">
<div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-tertiary" data-icon="help">help</span>
<span className="font-body text-on-surface">Centre d'aide</span>
</div>
<span className="material-symbols-outlined text-outline" data-icon="launch">launch</span>
</div>
<div className="flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant group-hover:text-tertiary" data-icon="contact_support">contact_support</span>
<span className="font-body text-on-surface">Nous contacter</span>
</div>
<span className="material-symbols-outlined text-outline" data-icon="chevron_right">chevron_right</span>
</div>
</div>
</section>

<button className="w-full bg-error-container text-on-error-container font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-red-200 transition-colors active:scale-[0.98] transition-transform">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
            Déconnexion
        </button>
<p className="text-center text-outline text-xs pb-8">
            Edukora v2.4.0 • Côte d'Ivoire
        </p>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-surface-container-high border-t border-outline-variant dark:border-outline shadow-lg flex justify-around items-center h-16 px-2 pb-safe">

<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low px-4 py-1 cursor-pointer transition-all">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>

<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low px-4 py-1 cursor-pointer transition-all">
<span className="material-symbols-outlined" data-icon="family_restroom">family_restroom</span>
<span className="font-label text-label-xs">Enfants</span>
</div>

<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-low px-4 py-1 cursor-pointer transition-all">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs">Tuteur AI</span>
</div>

<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 scale-95 active:scale-90 transition-transform cursor-pointer shadow-sm">
<span className="material-symbols-outlined fill-icon" data-icon="person">person</span>
<span className="font-label text-label-xs font-bold">Profil</span>
</div>
</nav>
<script>
        // Micro-interactions and ripple effects could be added here
        document.querySelectorAll('button, .cursor-pointer').forEach(el =&gt; &#123;
            el.addEventListener('click', function(e) &#123;
                // Future interaction logic
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
