import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Paramètres du Profil" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex items-center px-container-padding-mobile h-16 bg-surface border-b border-surface-border">
<button className="mr-4 p-2 active:scale-95 duration-100 rounded-full hover:bg-surface-container-low transition-colors">
<span className="material-symbols-outlined text-primary" data-icon="arrow_back">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Paramètres</h1>
</header>
<main className="pt-24 pb-32 px-container-padding-mobile max-w-2xl mx-auto space-y-8">

<section className="bg-surface-container-lowest p-6 rounded-xl border border-surface-border flex items-center gap-gutter">
<div className="relative group">
<img className="w-20 h-20 rounded-full object-cover border-2 border-primary-fixed ring-4 ring-primary/5" src="/images/ecran-273.png" alt="A professional studio portrait of a young West African male academic named Koffi, wearing a clean white shirt against a soft blue professional background. The lighting is bright and even, reflecting a clean light-mode aesthetic with high intellectual clarity and confidence. The style is modern, sharp, and corporate." />
<div className="absolute bottom-0 right-0 bg-primary p-1 rounded-full border-2 border-surface">
<span className="material-symbols-outlined text-[14px] text-white" data-icon="edit">edit</span>
</div>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Koffi</h2>
<div className="inline-flex items-center gap-2 mt-1 px-3 py-1 bg-expert-purple/10 rounded-full">
<span className="material-symbols-outlined text-[16px] text-expert-purple" data-icon="school">school</span>
<span className="font-label-md text-label-md text-expert-purple uppercase">Série C</span>
</div>
</div>
</section>

<section>
<h3 className="font-title-md text-title-md text-on-surface-variant mb-4 px-1">Notifications</h3>
<div className="bg-surface-container-lowest rounded-xl border border-surface-border divide-y divide-surface-border overflow-hidden">
<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="event_repeat">event_repeat</span>
<span className="font-body-lg text-body-lg">Rappels de révision</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer toggle-switch" type="checkbox" />
<div className="w-11 h-6 bg-surface-dim rounded-full peer-focus:ring-2 peer-focus:ring-primary/20 transition-all toggle-slider before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bg-white before:border-gray-300 before:border before:rounded-full before:h-5 before:w-5 before:transition-all"></div>
</label>
</div>
<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="verified">verified</span>
<span className="font-body-lg text-body-lg">Certifications de fiches</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer toggle-switch" type="checkbox" />
<div className="w-11 h-6 bg-surface-dim rounded-full peer-focus:ring-2 peer-focus:ring-primary/20 transition-all toggle-slider before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bg-white before:border-gray-300 before:border before:rounded-full before:h-5 before:w-5 before:transition-all"></div>
</label>
</div>
<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="groups">groups</span>
<span className="font-body-lg text-body-lg">Défis de commune</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer toggle-switch" type="checkbox" />
<div className="w-11 h-6 bg-surface-dim rounded-full peer-focus:ring-2 peer-focus:ring-primary/20 transition-all toggle-slider before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bg-white before:border-gray-300 before:border before:rounded-full before:h-5 before:w-5 before:transition-all"></div>
</label>
</div>
</div>
</section>

<section>
<h3 className="font-title-md text-title-md text-on-surface-variant mb-4 px-1">Apparence</h3>
<div className="bg-surface-container-lowest rounded-xl border border-surface-border divide-y divide-surface-border overflow-hidden">
<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="dark_mode">dark_mode</span>
<span className="font-body-lg text-body-lg">Mode Sombre</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer toggle-switch" type="checkbox" />
<div className="w-11 h-6 bg-surface-dim rounded-full peer-focus:ring-2 peer-focus:ring-primary/20 transition-all toggle-slider before:content-[''] before:absolute before:top-[2px] before:left-[2px] before:bg-white before:border-gray-300 before:border before:rounded-full before:h-5 before:w-5 before:transition-all"></div>
</label>
</div>
<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="text_fields">text_fields</span>
<span className="font-body-lg text-body-lg">Taille de la police</span>
</div>
<select className="bg-transparent font-label-md text-label-md border-none focus:ring-0 text-primary cursor-pointer text-right">
<option value="small">Petite</option>
<option selected={true} value="medium">Moyenne</option>
<option value="large">Grande</option>
</select>
</div>
</div>
</section>

<section>
<h3 className="font-title-md text-title-md text-on-surface-variant mb-4 px-1">Sécurité</h3>
<div className="bg-surface-container-lowest rounded-xl border border-surface-border divide-y divide-surface-border overflow-hidden">
<button className="w-full p-4 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="lock_reset">lock_reset</span>
<span className="font-body-lg text-body-lg">Changer le mot de passe</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</button>
<button className="w-full p-4 flex items-center justify-between hover:bg-surface-container-low active:bg-surface-container transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="fingerprint">fingerprint</span>
<span className="font-body-lg text-body-lg">Authentification biométrique</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</button>
</div>
</section>

<section>
<h3 className="font-title-md text-title-md text-on-surface-variant mb-4 px-1">Aide &amp; Support</h3>
<div className="bg-surface-container-lowest rounded-xl border border-surface-border divide-y divide-surface-border overflow-hidden">
<a className="w-full p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group" href="#">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="help">help</span>
<span className="font-body-lg text-body-lg">Centre d'aide</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform" data-icon="open_in_new">open_in_new</span>
</a>
<a className="w-full p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group" href="#">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-surface-variant" data-icon="policy">policy</span>
<span className="font-body-lg text-body-lg">Conditions d'utilisation</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform" data-icon="chevron_right">chevron_right</span>
</a>
</div>
</section>

<section className="pt-4">
<button className="w-full py-4 px-6 bg-error/10 hover:bg-error/15 text-error rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 transition-colors active:scale-[0.98] duration-150">
<span className="material-symbols-outlined" data-icon="logout">logout</span>
<span>Déconnexion</span>
</button>
<p className="text-center mt-8 font-label-md text-label-md text-outline">Tableau de bord Edukora v2.4.0</p>
</section>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface border-t border-surface-border px-container-padding-mobile">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label-md text-label-md">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="leaderboard">leaderboard</span>
<span className="font-label-md text-label-md">Stats</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-95 duration-150">
<span className="material-symbols-outlined" data-icon="person" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label-md text-label-md">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for toggles
        document.querySelectorAll('.toggle-switch').forEach(toggle =&gt; &#123;
            toggle.addEventListener('change', function() &#123;
                const row = this.closest('div.flex');
                if (this.checked) &#123;
                    row.style.backgroundColor = 'var(--tw-bg-opacity)';
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
