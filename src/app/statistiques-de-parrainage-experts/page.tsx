import type { Metadata } from "next";

export const metadata: Metadata = { title: "Statistiques de Parrainage - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary" style={{ minHeight: "max(884px, 100dvh)" }}>

<aside className="hidden md:flex flex-col py-stack-md px-4 w-[280px] h-screen fixed left-0 top-0 bg-surface border-r border-surface-border z-50">
<div className="mb-10 px-2">
<span className="font-headline-md text-headline-md font-black text-primary">Edukora</span>
</div>
<div className="flex items-center gap-3 px-2 mb-8">
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<p className="font-title-md text-title-md text-on-surface leading-tight">Dr. Aris Thorne</p>
<p className="font-label-md text-label-md text-on-surface-variant">Senior Fellow</p>
</div>
</div>
<nav className="space-y-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out rounded-lg" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Performance Overview</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out rounded-lg" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-label-md text-label-md">File de validation</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 ease-in-out rounded-lg" href="#">
<span className="material-symbols-outlined">group_add</span>
<span className="font-label-md text-label-md">Expert Network</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container font-semibold rounded-lg" href="#">
<span className="material-symbols-outlined">history</span>
<span className="font-label-md text-label-md">Referral History</span>
</a>
</nav>
<div className="mt-auto px-4 py-4 bg-surface-container-low rounded-xl border border-surface-border">
<p className="font-label-md text-label-md text-expert-purple mb-1 uppercase tracking-wider">Statut d'expert</p>
<div className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[18px]" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-body-md text-body-md font-bold">Premium Fellow</span>
</div>
</div>
</aside>

<header className="fixed top-0 right-0 left-0 md:left-[280px] h-16 bg-surface-container-lowest flex justify-between items-center px-container-padding-mobile md:px-container-padding-desktop z-40 border-b border-surface-border">
<div className="flex items-center gap-4">
<button className="md:hidden p-2 text-primary active:opacity-80 transition-colors">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary">Tableau de bord Edukora</h1>
</div>
<div className="flex items-center gap-3">
<span className="hidden md:block font-label-md text-label-md text-on-surface-variant">Statistiques de Parrainage</span>
<div className="w-8 h-8 rounded-full overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-334.png" alt="A professional studio portrait of a senior male academic professor with a kind expression, wearing a tailored navy blazer and spectacles. The lighting is soft and directional, typical of a high-end educational institution's directory photograph. The background is a muted, professional grey-blue gradient, aligning with the Edukora brand's corporate and minimalist aesthetic." />
</div>
</div>
</header>

<main className="pt-20 pb-24 md:pl-[280px] min-h-screen">
<div className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-stack-md">

<div className="mb-gutter">
<h2 className="font-headline-lg text-headline-lg text-primary mb-1">Statistiques de Parrainage</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Analysez l'impact de votre réseau et suivez vos récompenses de prestige.</p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter mb-gutter">
<div className="bg-white border border-surface-border p-stack-md rounded-lg flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-primary bg-primary-container/20 p-2 rounded">forward_to_inbox</span>
<span className="text-impact-emerald font-label-md text-label-md flex items-center">+5% <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Invitations envoyées</p>
<p className="font-metric-num text-metric-num text-on-surface">45</p>
</div>
<div className="bg-white border border-surface-border p-stack-md rounded-lg flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-expert-purple bg-expert-purple/10 p-2 rounded">person_add_alt</span>
<span className="text-impact-emerald font-label-md text-label-md flex items-center">+12% <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Inscriptions</p>
<p className="font-metric-num text-metric-num text-on-surface">12</p>
</div>
<div className="bg-white border border-surface-border p-stack-md rounded-lg flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-validation-amber bg-validation-amber/10 p-2 rounded">analytics</span>
<span className="text-error font-label-md text-label-md flex items-center">-2% <span className="material-symbols-outlined text-[14px]">trending_down</span></span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Taux de conversion</p>
<p className="font-metric-num text-metric-num text-on-surface">26.7%</p>
</div>
<div className="bg-white border border-surface-border p-stack-md rounded-lg flex flex-col gap-2 relative overflow-hidden">
<div className="flex items-center justify-between">
<span className="material-symbols-outlined text-primary bg-secondary-container p-2 rounded" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Points de Prestige</p>
<div className="flex items-baseline gap-1">
<p className="font-metric-num text-metric-num text-primary">250</p>
<span className="font-label-md text-label-md text-primary font-bold">XP</span>
</div>

<div className="absolute bottom-0 left-0 w-full h-1 bg-primary-container/20">
<div className="h-full bg-primary" style={{"width":"65%"}}></div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter mb-gutter">

<div className="lg:col-span-2 bg-white border border-surface-border rounded-lg p-stack-md flex flex-col">
<div className="flex items-center justify-between mb-8">
<h3 className="font-title-md text-title-md text-on-surface">Inscriptions par mois</h3>
<div className="flex gap-2">
<button className="px-3 py-1 rounded border border-surface-border text-on-surface-variant font-label-md text-label-md hover:bg-surface-container-low">6 Mois</button>
<button className="px-3 py-1 rounded bg-primary text-white font-label-md text-label-md">Annuel</button>
</div>
</div>
<div className="h-64 flex items-end justify-between gap-2 px-2">

<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-surface-container-high rounded-t-sm h-[30%] hover:bg-primary transition-colors group relative cursor-help">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-white text-[10px] py-1 px-2 rounded">2 registrations</span>
</div>
<span className="font-label-md text-[10px] text-on-surface-variant uppercase">Jan</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-surface-container-high rounded-t-sm h-[45%] hover:bg-primary transition-colors group relative cursor-help">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-on-surface text-white text-[10px] py-1 px-2 rounded">3 registrations</span>
</div>
<span className="font-label-md text-[10px] text-on-surface-variant uppercase">Fev</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-primary rounded-t-sm h-[80%] relative">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] py-1 px-2 rounded">8 registrations</span>
</div>
<span className="font-label-md text-[10px] text-on-surface font-bold uppercase">Mar</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-surface-container-high rounded-t-sm h-[40%] hover:bg-primary transition-colors"></div>
<span className="font-label-md text-[10px] text-on-surface-variant uppercase">Avr</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-surface-container-high rounded-t-sm h-[60%] hover:bg-primary transition-colors"></div>
<span className="font-label-md text-[10px] text-on-surface-variant uppercase">Mai</span>
</div>
<div className="flex flex-col items-center flex-1 gap-2">
<div className="w-full bg-surface-container-high rounded-t-sm h-[55%] hover:bg-primary transition-colors"></div>
<span className="font-label-md text-[10px] text-on-surface-variant uppercase">Jun</span>
</div>
</div>
</div>

<div className="bg-white border border-surface-border rounded-lg p-stack-md">
<h3 className="font-title-md text-title-md text-on-surface mb-6">Répartition par statut</h3>
<div className="space-y-6">
<div className="flex flex-col gap-2">
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-validation-amber"></span>
                                    En attente
                                </span>
<span className="font-body-md text-body-md font-bold text-on-surface">22</span>
</div>
<div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
<div className="bg-validation-amber h-full" style={{"width":"48%"}}></div>
</div>
</div>
<div className="flex flex-col gap-2">
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary"></span>
                                    Inscrit
                                </span>
<span className="font-body-md text-body-md font-bold text-on-surface">12</span>
</div>
<div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
<div className="bg-primary h-full" style={{"width":"26%"}}></div>
</div>
</div>
<div className="flex flex-col gap-2">
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md text-on-surface-variant flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-impact-emerald"></span>
                                    Certifié
                                </span>
<span className="font-body-md text-body-md font-bold text-on-surface">11</span>
</div>
<div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
<div className="bg-impact-emerald h-full" style={{"width":"24%"}}></div>
</div>
</div>
</div>
<div className="mt-8 pt-6 border-t border-surface-border text-center">
<p className="font-label-md text-label-md text-on-surface-variant italic leading-relaxed">
                            "Le parrainage de nouveaux experts renforce l'intégrité académique de notre réseau."
                        </p>
</div>
</div>
</div>

<div className="bg-white border border-surface-border rounded-lg p-stack-md mb-gutter">
<div className="flex items-center gap-2 mb-8">
<span className="material-symbols-outlined text-primary">filter_alt</span>
<h3 className="font-title-md text-title-md text-on-surface">Analyse du Tunnel de Conversion</h3>
</div>
<div className="flex flex-col md:flex-row items-center gap-4 py-8">

<div className="flex-1 w-full bg-primary-container/10 p-6 flex flex-col items-center justify-center relative funnel-step group hover:bg-primary-container/20 transition-colors">
<p className="font-metric-num text-metric-num text-primary">45</p>
<p className="font-label-md text-label-md text-on-primary-fixed-variant uppercase text-center">Invitations</p>
<div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-primary-fixed-dim">
<span className="material-symbols-outlined text-4xl">chevron_right</span>
</div>
</div>

<div className="flex-[0.7] w-[90%] md:w-auto bg-primary/10 p-6 flex flex-col items-center justify-center relative funnel-step group hover:bg-primary/20 transition-colors">
<p className="font-metric-num text-metric-num text-primary">12</p>
<p className="font-label-md text-label-md text-on-primary-fixed-variant uppercase text-center">Inscriptions</p>
<div className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 text-primary font-bold font-label-md text-label-md">26.7% Drop</div>
<div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-primary-fixed-dim">
<span className="material-symbols-outlined text-4xl">chevron_right</span>
</div>
</div>

<div className="flex-[0.4] w-[80%] md:w-auto bg-primary p-6 flex flex-col items-center justify-center funnel-step shadow-lg">
<p className="font-metric-num text-metric-num text-white">5</p>
<p className="font-label-md text-label-md text-white/80 uppercase text-center">Experts Certifiés</p>
<div className="absolute -top-6 md:-top-10 left-1/2 -translate-x-1/2 text-primary font-bold font-label-md text-label-md">41.6% Conversion</div>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter mt-8">
<div className="bg-surface p-4 rounded border border-surface-border">
<p className="font-body-md text-body-md text-on-surface mb-2">Conseil d'expert</p>
<p className="font-label-md text-label-md text-on-surface-variant">Personnalisez vos messages d'invitation pour augmenter le taux d'inscription de 15% en moyenne.</p>
</div>
<div className="bg-surface p-4 rounded border border-surface-border">
<p className="font-body-md text-body-md text-on-surface mb-2">Prochaine récompense</p>
<p className="font-label-md text-label-md text-on-surface-variant">Plus que <span className="font-bold text-primary">3 certifications</span> pour débloquer le badge "Maître Recruteur".</p>
</div>
</div>
</div>
</div>
</main>

<div className="fixed bottom-0 right-0 left-0 md:left-[280px] bg-white border-t border-surface-border p-4 flex justify-center items-center z-50">
<button className="flex items-center gap-3 bg-primary text-white px-8 py-3 rounded shadow-md hover:bg-primary-container transition-all active:scale-95 group">
<span className="material-symbols-outlined group-hover:rotate-12 transition-transform">send</span>
<span className="font-title-md text-title-md">Nouvelle Invitation</span>
</button>
</div>

<script>
        const menuBtn = document.querySelector('header button');
        const sidebar = document.querySelector('aside');
        
        menuBtn.addEventListener('click', () =&gt; &#123;
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('fixed');
            sidebar.classList.toggle('w-full');
            sidebar.classList.toggle('z-[60]');
        &#125;);
    </script>

    </div>
  );
}
