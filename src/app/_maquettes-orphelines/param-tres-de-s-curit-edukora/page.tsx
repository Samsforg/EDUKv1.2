import type { Metadata } from "next";

export const metadata: Metadata = { title: "Sécurité - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface mb-20" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex items-center px-4 h-16 bg-surface border-b border-surface-border dark:border-outline-variant">
<button className="mr-4 p-2 rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-primary">Sécurité</h1>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<div className="relative overflow-hidden rounded-xl bg-primary-container p-6 flex items-center justify-between shadow-sm">
<div className="relative z-10 space-y-2">
<h2 className="text-on-primary-container font-headline text-lg font-bold">Votre protection est notre priorité</h2>
<p className="text-on-primary-container/80 text-sm max-w-[200px]">Gérez vos paramètres de sécurité pour protéger vos données académiques.</p>
</div>
<div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
<span className="material-symbols-outlined text-[120px] translate-x-1/4 translate-y-1/4" style={{"fontVariationSettings":"'FILL' 1"}}>security</span>
</div>
</div>

<section className="space-y-3">
<h3 className="px-1 text-sm font-semibold uppercase tracking-wider text-outline">Authentification</h3>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant/30">

<button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary p-2 bg-primary-fixed rounded-lg">lock_reset</span>
<span className="font-medium">Changer le mot de passe</span>
</div>
<span className="material-symbols-outlined text-outline group-hover:translate-x-1 transition-transform">chevron_right</span>
</button>

<div className="p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary p-2 bg-primary-fixed rounded-lg">verified_user</span>
<div>
<p className="font-medium">Authentification à deux facteurs</p>
<p className="text-xs text-on-surface-variant">Sécurité renforcée par SMS ou Email</p>
</div>
</div>
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-all duration-300" id="toggle2fa" name="toggle2fa" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors duration-300" htmlFor="toggle2fa"></label>
</div>
</div>

<div className="p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary p-2 bg-primary-fixed rounded-lg">fingerprint</span>
<div>
<p className="font-medium">Utiliser la biométrie</p>
<p className="text-xs text-on-surface-variant">FaceID / TouchID activé</p>
</div>
</div>
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-all duration-300 right-0 border-primary bg-primary" id="toggleBio" name="toggleBio" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-fixed cursor-pointer transition-colors duration-300" htmlFor="toggleBio"></label>
</div>
</div>
</div>
</section>

<section className="space-y-3">
<div className="flex justify-between items-center px-1">
<h3 className="text-sm font-semibold uppercase tracking-wider text-outline">Sessions Actives</h3>
<span className="text-xs text-primary font-medium cursor-pointer hover:underline">Voir tout</span>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant/30">

<div className="p-4 flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-on-surface-variant">smartphone</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2">
<p className="font-medium">Cet iPhone 13</p>
<span className="text-[10px] bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5 rounded-full font-bold uppercase">Actuel</span>
</div>
<p className="text-xs text-on-surface-variant italic">Abidjan, Côte d'Ivoire</p>
</div>
</div>

<div className="p-4 flex items-center gap-4">
<div className="w-12 h-12 bg-surface-container flex items-center justify-center rounded-lg">
<span className="material-symbols-outlined text-on-surface-variant">laptop</span>
</div>
<div className="flex-1">
<p className="font-medium">Navigateur Web - Chrome</p>
<p className="text-xs text-on-surface-variant italic">Abidjan • Il y a 2 heures</p>
</div>
<button className="text-error text-sm font-medium hover:bg-error-container px-3 py-1 rounded transition-colors">Déconnecter</button>
</div>
</div>
</section>

<section className="space-y-3">
<h3 className="px-1 text-sm font-semibold uppercase tracking-wider text-outline">Sécurité du compte</h3>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl">
<div className="p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary p-2 bg-secondary-fixed rounded-lg">notifications_active</span>
<div>
<p className="font-medium">Alertes de connexion suspecte</p>
<p className="text-xs text-on-surface-variant">Prévenez-moi en cas de nouvelle connexion</p>
</div>
</div>
<div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer focus:outline-none transition-all duration-300 right-0 border-primary bg-primary" id="toggleAlert" name="toggleAlert" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-fixed cursor-pointer transition-colors duration-300" htmlFor="toggleAlert"></label>
</div>
</div>
</div>
</section>

<div className="pt-4 pb-12">
<button className="w-full flex items-center justify-center gap-2 py-4 bg-surface-container-high border border-outline-variant text-on-surface-variant rounded-xl font-semibold active:scale-[0.98] transition-transform shadow-sm hover:bg-surface-variant">
<span className="material-symbols-outlined">logout</span>
                Déconnexion de toutes les autres sessions
            </button>
<p className="text-center text-[11px] text-outline mt-4 px-8 leading-relaxed">
                Edukora utilise des protocoles de sécurité de niveau académique pour garantir que vos résultats de BAC et BEPC restent confidentiels.
            </p>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 bg-surface border-t border-surface-border dark:border-outline-variant">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">home</span>
<span className="text-[10px] mt-1">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="text-[10px] mt-1">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">leaderboard</span>
<span className="text-[10px] mt-1">Stats</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="text-[10px] mt-1 font-bold">Profil</span>
</a>
</nav>
<script>
        // Simple ripple-like effect for list items
        document.querySelectorAll('button, .bg-surface-container-lowest &gt; div').forEach(item =&gt; &#123;
            item.addEventListener('click', (e) =&gt; &#123;
                // Potential interaction logic
            &#125;);
        &#125;);

        // Auto-animate switch toggles (visual only)
        document.querySelectorAll('.toggle-checkbox').forEach(cb =&gt; &#123;
            cb.addEventListener('change', function() &#123;
                const label = this.nextElementSibling;
                if(this.checked) &#123;
                    this.style.right = '0';
                    this.style.left = 'auto';
                    this.classList.add('border-primary', 'bg-primary');
                    label.classList.add('bg-primary-fixed');
                    label.classList.remove('bg-outline-variant');
                &#125; else &#123;
                    this.style.right = 'auto';
                    this.style.left = '0';
                    this.classList.remove('border-primary', 'bg-primary');
                    label.classList.remove('bg-primary-fixed');
                    label.classList.add('bg-outline-variant');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
