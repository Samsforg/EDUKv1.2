import type { Metadata } from "next";

export const metadata: Metadata = { title: "syst_me_de_parrainage_edukora" };

export default function Page() {
  return (
    <div className="bg-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-bright dark:bg-on-background w-full top-0 sticky border-b border-surface-border dark:border-outline-variant z-50">
<div className="flex justify-between items-center px-gutter py-base w-full max-w-full">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-white font-bold">É</div>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora</h1>
</div>
<div className="flex items-center gap-base">
<button className="p-2 rounded-full hover:bg-surface-container-low transition-colors duration-200">
<span className="material-symbols-outlined text-primary">notifications</span>
</button>
</div>
</div>
</header>
<div className="flex min-h-screen">

<aside className="hidden md:flex flex-col h-screen p-stack-md bg-surface-container-lowest dark:bg-on-background w-[280px] fixed left-0 top-0 border-r border-surface-border dark:border-outline-variant mt-16">
<nav className="flex flex-col gap-2 mt-4">
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low rounded transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low rounded transition-all" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body-md text-body-md">Mes Cours</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-primary dark:text-primary-fixed font-bold border-r-4 border-primary bg-surface-container-low rounded transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-body-md text-body-md">Abonnement</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low rounded transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
<a className="flex items-center gap-4 px-4 py-3 text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low rounded transition-all" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body-md text-body-md">Aide</span>
</a>
</nav>
</aside>

<main className="flex-1 md:ml-[280px] pb-24 md:pb-8">
<div className="max-w-5xl mx-auto px-4 md:px-gutter py-stack-md">

<section className="relative overflow-hidden rounded-xl bg-primary mb-gutter p-gutter text-white shadow-lg">
<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
<div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-gutter">
<div className="max-w-lg text-center md:text-left">
<span className="inline-block px-3 py-1 bg-white/20 rounded-full text-label-md font-label-md mb-4 uppercase tracking-wider">Programme Ambassadeur</span>
<h2 className="font-headline-lg text-headline-lg mb-4">Offrez 7 jours Premium,<br />gagnez 7 jours !</h2>
<p className="font-body-lg text-body-lg opacity-90">Partagez votre passion pour l'apprentissage avec vos amis et profitez ensemble de l'expérience Edukora sans limites.</p>
</div>
<div className="flex-shrink-0">
<div className="w-48 h-48 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
<span className="material-symbols-outlined text-7xl text-white" style={{"fontVariationSettings":"'FILL' 1"}}>card_giftcard</span>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<div className="md:col-span-7 space-y-gutter">
<div className="bg-white border border-surface-border rounded-xl p-gutter">
<h3 className="font-title-md text-title-md text-on-surface mb-stack-sm">Votre code unique</h3>
<div className="flex flex-col sm:flex-row gap-4">
<div className="flex-1 bg-surface-container-low border-2 border-dashed border-primary/30 rounded-lg p-4 flex items-center justify-between group" id="referral-box">
<span className="font-display-lg text-display-lg text-primary tracking-widest uppercase">KOFFI2024</span>
<button className="p-2 text-primary hover:bg-primary-container/10 rounded-lg transition-colors" title="Copier le code">
<span className="material-symbols-outlined" id="copy-icon">content_copy</span>
</button>
</div>
</div>
<div className="mt-gutter">
<p className="font-label-md text-label-md text-secondary mb-4 uppercase">Partager via</p>
<div className="flex flex-wrap gap-4">
<button className="flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg hover:brightness-110 transition-all font-bold shadow-sm">
<span className="material-symbols-outlined">chat</span> WhatsApp
                                    </button>
<button className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-lg hover:brightness-110 transition-all font-bold shadow-sm">
<span className="material-symbols-outlined">qr_code_2</span> Facebook
                                    </button>
<button className="flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-lg hover:bg-on-secondary-fixed-variant transition-all font-bold shadow-sm">
<span className="material-symbols-outlined">mail</span> Message
                                    </button>
</div>
</div>
</div>

<div className="bg-white border border-surface-border rounded-xl p-gutter">
<h3 className="font-title-md text-title-md text-on-surface mb-8">Comment ça marche ?</h3>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
<div className="flex flex-col items-center text-center gap-4 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary relative z-10 step-line">
<span className="material-symbols-outlined text-3xl">share</span>
</div>
<div>
<p className="font-title-md text-title-md text-primary mb-1">1. Partagez</p>
<p className="font-body-md text-body-md text-secondary">Envoyez votre code à vos amis.</p>
</div>
</div>
<div className="flex flex-col items-center text-center gap-4 group">
<div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary relative z-10 step-line">
<span className="material-symbols-outlined text-3xl">person_add</span>
</div>
<div>
<p className="font-title-md text-title-md text-primary mb-1">2. Inscription</p>
<p className="font-body-md text-body-md text-secondary">Ils s'inscrivent avec votre code.</p>
</div>
</div>
<div className="flex flex-col items-center text-center gap-4 group">
<div className="w-16 h-16 rounded-full bg-validation-amber/20 flex items-center justify-center text-validation-amber relative z-10">
<span className="material-symbols-outlined text-3xl">card_giftcard</span>
</div>
<div>
<p className="font-title-md text-title-md text-validation-amber mb-1">3. Profitez</p>
<p className="font-body-md text-body-md text-secondary">Chacun gagne 7 jours Premium.</p>
</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-5 space-y-gutter">

<div className="bg-white border border-surface-border rounded-xl p-gutter">
<div className="flex justify-between items-end mb-4">
<h3 className="font-title-md text-title-md text-on-surface">Parrainages réussis</h3>
<span className="font-metric-num text-metric-num text-primary">3/5</span>
</div>
<div className="w-full h-3 bg-surface-container-low rounded-full overflow-hidden mb-4">
<div className="h-full bg-impact-emerald rounded-full transition-all duration-1000 ease-out" style={{"width":"60%"}}></div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-2">
<span className="material-symbols-outlined text-impact-emerald" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                                Encore 2 amis pour débloquer le prochain bonus !
                            </p>
</div>

<div className="bg-white border border-surface-border rounded-xl p-gutter">
<h3 className="font-title-md text-title-md text-on-surface mb-stack-sm">Récompenses débloquées</h3>
<div className="space-y-4">

<div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border-l-4 border-impact-emerald">
<div className="flex items-center gap-4">
<div className="p-2 bg-impact-emerald/10 text-impact-emerald rounded">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<div>
<p className="font-title-md text-title-md text-on-surface">1 mois gratuit</p>
<p className="font-label-md text-label-md text-secondary">Utilisé le 12/05/2024</p>
</div>
</div>
<span className="font-label-md text-label-md text-impact-emerald bg-impact-emerald/10 px-2 py-1 rounded">Actif</span>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border-l-4 border-impact-emerald">
<div className="flex items-center gap-4">
<div className="p-2 bg-impact-emerald/10 text-impact-emerald rounded">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<div>
<p className="font-title-md text-title-md text-on-surface">Pack d'exercices Expert</p>
<p className="font-label-md text-label-md text-secondary">Débloqué</p>
</div>
</div>
<span className="material-symbols-outlined text-impact-emerald">check</span>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-dashed border-outline-variant rounded-lg opacity-60">
<div className="flex items-center gap-4">
<div className="p-2 bg-surface-container-low text-secondary rounded">
<span className="material-symbols-outlined">lock</span>
</div>
<div>
<p className="font-title-md text-title-md text-secondary">Accès Webinar Exclusif</p>
<p className="font-label-md text-label-md text-outline">Objectif : 5 parrainages</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim py-1" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim py-1" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold py-1" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim py-1" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        function copyCode() &#123;
            const code = "KOFFI2024";
            navigator.clipboard.writeText(code).then(() =&gt; &#123;
                const icon = document.getElementById('copy-icon');
                const originalIcon = icon.innerText;
                icon.innerText = 'check';
                icon.classList.add('text-impact-emerald');
                
                setTimeout(() =&gt; &#123;
                    icon.innerText = originalIcon;
                    icon.classList.remove('text-impact-emerald');
                &#125;, 2000);
            &#125;);
        &#125;
        
        // Micro-interaction: random subtle pulses for the gift icon
        setInterval(() =&gt; &#123;
            const gift = document.querySelector('.material-symbols-outlined.text-7xl');
            if (gift) &#123;
                gift.classList.add('scale-110');
                setTimeout(() =&gt; gift.classList.remove('scale-110'), 300);
            &#125;
        &#125;, 5000);
    </script>

    </div>
  );
}
