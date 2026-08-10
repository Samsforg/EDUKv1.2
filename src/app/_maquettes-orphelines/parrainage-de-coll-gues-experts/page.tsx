import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Refer Colleagues" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface pb-24 md:pb-0" >

<header className="bg-surface-container-lowest dark:bg-surface-dim border-b border-surface-border sticky top-0 z-50 flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop w-full h-16">
<div className="flex items-center gap-4">
<button className="cursor-pointer active:opacity-80 transition-colors p-2 hover:bg-surface-container-low rounded-full">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-title-md text-title-md text-primary dark:text-primary-fixed">Parrainer des collègues</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6 mr-6">
<span className="text-on-surface-variant dark:text-on-surface-variant font-label-md text-label-md cursor-pointer hover:bg-surface-container-low p-2 rounded">Tableau de bord expert</span>
<span className="text-primary dark:text-primary-fixed font-bold font-label-md text-label-md cursor-pointer hover:bg-surface-container-low p-2 rounded">Programme de parrainage</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-278.png" alt="A professional headshot of a mature female professor with grey hair and glasses, wearing a navy blue academic blazer. She has a warm, confident expression, set against a blurred ivory library background with soft, natural lighting. The overall aesthetic is academic, trustworthy, and high-end." />
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-8">
<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<section className="col-span-12 md:col-span-8 bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden flex flex-col md:flex-row shadow-sm">
<div className="flex-1 p-8 flex flex-col justify-center">
<span className="text-expert-purple font-label-md text-label-md tracking-wider mb-2">COMMUNAUTÉ D'EXPERTS</span>
<h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-primary mb-4 leading-tight">Agrandissez le réseau d'experts</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                        Partagez l'excellence académique. Invitez vos pairs qualifiés à rejoindre Edukora pour valider les connaissances de demain et renforcer notre impact pédagogique mondial.
                    </p>
<div className="mt-8 flex gap-4">
<button className="bg-primary hover:bg-primary-container text-on-primary px-6 py-3 rounded font-bold transition-all shadow-md active:scale-95">Inviter maintenant</button>
<button className="text-primary border border-primary px-6 py-3 rounded font-bold hover:bg-surface-container-low transition-all">Voir les avantages</button>
</div>
</div>
<div className="flex-1 bg-primary-fixed/20 relative min-h-[300px]">
<img className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply" src="/images/ecran-279.png" />
</div>
</section>

<section className="col-span-12 md:col-span-4 flex flex-col gap-gutter">
<div className="bg-white border border-surface-border p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-primary">group</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface-variant">Collègues invités</p>
<p className="font-metric-num text-metric-num text-primary">12</p>
</div>
</div>
<div className="bg-white border border-surface-border p-6 rounded-xl flex items-center gap-4">
<div className="w-12 h-12 bg-impact-emerald/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-impact-emerald">verified</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface-variant">Experts certifiés</p>
<p className="font-metric-num text-metric-num text-impact-emerald">5</p>
</div>
</div>
<div className="bg-white border border-surface-border p-6 rounded-xl flex items-center gap-4 relative overflow-hidden">
<div className="w-12 h-12 bg-expert-purple/10 rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-expert-purple">military_tech</span>
</div>
<div>
<p className="font-label-md text-label-md text-on-surface-variant">Points de Prestige</p>
<p className="font-metric-num text-metric-num text-expert-purple">250 XP</p>
</div>
<div className="absolute right-0 bottom-0 opacity-10">
<span className="material-symbols-outlined text-9xl">auto_awesome</span>
</div>
</div>
</section>

<section className="col-span-12">
<h3 className="font-headline-md text-headline-md text-on-surface mb-6">Inviter par...</h3>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
<button className="flex items-center justify-between p-6 bg-white border border-surface-border rounded-xl hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">mail</span>
<span className="font-title-md text-title-md">Email</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
</button>
<button className="flex items-center justify-between p-6 bg-white border border-surface-border rounded-xl hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-[#25D366] group-hover:scale-110 transition-transform">chat</span>
<span className="font-title-md text-title-md">WhatsApp</span>
</div>
<span className="material-symbols-outlined text-on-surface-variant">chevron_right</span>
</button>
<div className="flex items-center gap-2 p-4 bg-white border border-surface-border rounded-xl focus-within:ring-2 focus-within:ring-primary/20">
<div className="flex-1 truncate text-on-surface-variant font-body-md text-body-md pl-2">edukora.com/ref/dr-rossi-942</div>
<button className="bg-surface-container text-primary px-4 py-2 rounded font-bold font-label-md text-label-md active:scale-95 transition-all flex items-center gap-2"><span className="material-symbols-outlined text-sm">content_copy</span> Copier le lien</button>
</div>
</div>
</section>

<section className="col-span-12 mb-12">
<div className="flex items-center justify-between mb-6">
<h3 className="font-headline-md text-headline-md text-on-surface">Historique des invitations</h3>
<button className="text-primary font-label-md text-label-md flex items-center gap-1 hover:underline">
                        Voir tout <span className="material-symbols-outlined text-[16px]">history</span>
</button>
</div>
<div className="bg-white border border-surface-border rounded-xl divide-y divide-surface-border overflow-hidden">

<div className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-surface-container-lowest transition-colors border-l-4 border-validation-amber">
<div className="flex items-center gap-4 mb-4 md:mb-0">
<div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary font-bold">JD</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface">Dr. Jean Dupont</h4>
<p className="text-on-surface-variant font-body-md text-body-md">Chercheur en Intelligence Artificielle</p>
</div>
</div>
<div className="flex items-center justify-between md:gap-12">
<span className="px-3 py-1 bg-validation-amber/10 text-validation-amber rounded-full text-label-md font-label-md">En attente</span>
<span className="text-on-surface-variant font-body-md text-body-md">Invité le 12 Oct.</span>
</div>
</div>

<div className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-surface-container-lowest transition-colors border-l-4 border-primary">
<div className="flex items-center gap-4 mb-4 md:mb-0">
<div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary font-bold">AK</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface">Pr. Amadou Koné</h4>
<p className="text-on-surface-variant font-body-md text-body-md">Doyen de la Faculté de Médecine</p>
</div>
</div>
<div className="flex items-center justify-between md:gap-12">
<span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-label-md font-label-md">Inscrit</span>
<span className="text-on-surface-variant font-body-md text-body-md">Invité le 05 Oct.</span>
</div>
</div>

<div className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-surface-container-lowest transition-colors border-l-4 border-impact-emerald">
<div className="flex items-center gap-4 mb-4 md:mb-0">
<div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center text-primary font-bold">SS</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface">Dr. Sarah Smith</h4>
<p className="text-on-surface-variant font-body-md text-body-md">Experte en Biologie Moléculaire</p>
</div>
</div>
<div className="flex items-center justify-between md:gap-12">
<span className="px-3 py-1 bg-impact-emerald/10 text-impact-emerald rounded-full text-label-md font-label-md">Certifiée</span>
<span className="text-on-surface-variant font-body-md text-body-md">Invité le 28 Sept.</span>
</div>
</div>
</div>
</section>
</div>
</main>

<nav className="md:hidden bg-surface-container-lowest dark:bg-inverse-surface border-t border-surface-border fixed bottom-0 w-full z-50 rounded-t-xl shadow-sm flex justify-around items-center h-16 px-container-padding-mobile">
<div className="flex flex-col items-center justify-center text-on-secondary-container dark:text-on-surface-variant opacity-70 active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-secondary-container dark:text-on-surface-variant opacity-70 active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined">hub</span>
<span className="font-label-md text-label-md">Réseau</span>
</div>
<div className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined fill">person_add</span>
<span className="font-label-md text-label-md">Inviter</span>
</div>
<div className="flex flex-col items-center justify-center text-on-secondary-container dark:text-on-surface-variant opacity-70 active:scale-95 transition-transform cursor-pointer">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md">Profil</span>
</div>
</nav>

<script>
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                // Micro-interaction simulation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() =&gt; btn.style.transform = '', 100);
            &#125;);
        &#125;);

        // Copy button simulation
        const copyBtn = document.querySelector('button:has(.material-symbols-outlined:contains("content_copy"))');
        if (copyBtn) &#123;
            copyBtn.addEventListener('click', function() &#123;
                const icon = this.querySelector('.material-symbols-outlined');
                const originalText = icon.textContent;
                icon.textContent = 'check';
                this.classList.add('bg-impact-emerald', 'text-white');
                setTimeout(() =&gt; &#123;
                    icon.textContent = originalText;
                    this.classList.remove('bg-impact-emerald', 'text-white');
                &#125;, 2000);
            &#125;);
        &#125;
    </script>



    </div>
  );
}
