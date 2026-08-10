import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Dashboard" };

export default function Page() {
  return (
    <div className="bg-background overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-container-lowest dark:bg-surface-container-low text-primary dark:text-primary-fixed w-full top-0 sticky border-b border-surface-border dark:border-outline-variant transition-colors duration-200 z-40">
<div className="flex justify-between items-center px-container-padding-desktop h-16 w-full max-w-[1440px] mx-auto">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined p-2 hover:bg-surface-container-low rounded-full">menu</button>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora Professeur</h1>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex items-center gap-2 px-3 py-1 bg-secondary-container/30 rounded-full border border-outline-variant">
<span className="material-symbols-outlined text-primary scale-75" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md text-on-secondary-container">Expert Certifié</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container-high border border-surface-border overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-364.png" alt="A professional studio portrait of a distinguished academic professor with graying hair and glasses, wearing a sharp navy blue suit. The background is a soft, blurred library setting with warm wood tones. The lighting is sophisticated, using a classic three-point setup to create a clean, modern Light Mode aesthetic with professional clarity and reliability." />
</div>
</div>
</div>
</header>
<div className="flex min-h-screen">

<aside className="hidden lg:flex flex-col h-full w-[280px] fixed left-0 top-16 bg-surface-container-low border-r border-surface-border dark:border-outline-variant py-stack-md z-30 transition-all duration-300 ease-in-out">
<div className="px-6 mb-8">
<p className="font-body-md text-outline uppercase tracking-widest text-[10px]">Menu Principal</p>
</div>
<nav className="flex-1">
<ul className="space-y-1">
<li>
<a className="flex items-center gap-4 px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-r-full" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-lg text-body-lg">Tableau de bord</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-colors" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-lg text-body-lg">Validation</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-colors" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body-lg text-body-lg">Statistiques</span>
</a>
</li>
<li>
<a className="flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-surface-variant rounded-r-full transition-colors" href="#">
<span className="material-symbols-outlined">star</span>
<span className="font-body-lg text-body-lg">Paramètres Experts</span>
</a>
</li>
</ul>
</nav>
<div className="px-6 mt-auto border-t border-surface-border pt-6">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">M</div>
<div>
<p className="font-title-md text-title-md leading-none">Dr. Martin</p>
<p className="font-label-md text-label-md text-outline">ID: 99283</p>
</div>
</div>
<button className="flex items-center gap-4 w-full text-error font-bold hover:bg-error-container/20 p-2 rounded-lg transition-colors">
<span className="material-symbols-outlined">logout</span>
<span className="font-body-md text-body-md">Déconnexion</span>
</button>
</div>
</aside>

<main className="flex-1 lg:ml-[280px] p-container-padding-mobile md:p-container-padding-desktop pb-24 lg:pb-8 max-w-[1200px] mx-auto w-full">

<section className="mb-stack-md">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h2 className="font-display-lg text-display-lg text-primary">Bonjour, Dr. Martin</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Prêt pour les validations pédagogiques du jour ?</p>
</div>
<div className="flex items-center gap-2 px-4 py-2 bg-white border border-surface-border rounded-xl shadow-sm">
<span className="material-symbols-outlined text-impact-emerald" style={{"fontVariationSettings":"'FILL' 1"}}>calendar_today</span>
<span className="font-label-md text-label-md">Lundi, 24 Mai 2024</span>
</div>
</div>
</section>

<section className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-md">

<div className="bg-white border border-surface-border p-6 rounded-xl relative overflow-hidden group hover:border-validation-amber transition-colors">
<div className="absolute top-0 left-0 w-1 h-full bg-validation-amber"></div>
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-outline uppercase">Actions requises</p>
<h3 className="font-metric-num text-metric-num text-on-surface mt-1">12 fiches</h3>
<p className="font-body-md text-body-md text-validation-amber font-bold mt-1">en attente de validation</p>
</div>
<div className="bg-validation-amber/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-validation-amber">priority_high</span>
</div>
</div>
</div>

<div className="bg-white border border-surface-border p-6 rounded-xl relative overflow-hidden hover:border-impact-emerald transition-colors">
<div className="absolute top-0 left-0 w-1 h-full bg-impact-emerald"></div>
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-outline uppercase">Précision Moyenne</p>
<h3 className="font-metric-num text-metric-num text-on-surface mt-1">98%</h3>
<div className="flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-impact-emerald text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>trending_up</span>
<p className="font-body-md text-body-md text-impact-emerald">+2.4% ce mois</p>
</div>
</div>
<div className="bg-impact-emerald/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-impact-emerald">verified</span>
</div>
</div>
</div>

<div className="bg-white border border-surface-border p-6 rounded-xl relative overflow-hidden hover:border-expert-purple transition-colors">
<div className="absolute top-0 left-0 w-1 h-full bg-expert-purple"></div>
<div className="flex justify-between items-start">
<div>
<p className="font-label-md text-label-md text-outline uppercase">Statut actuel</p>
<h3 className="font-metric-num text-metric-num text-on-surface mt-1">Niveau Expert</h3>
<p className="font-body-md text-body-md text-expert-purple font-bold mt-1">Expert Certifié Edukora</p>
</div>
<div className="bg-expert-purple/10 p-2 rounded-lg">
<span className="material-symbols-outlined text-expert-purple">military_tech</span>
</div>
</div>
</div>
</section>
<div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">

<section className="xl:col-span-2 space-y-4">
<div className="flex justify-between items-center mb-2">
<h3 className="font-headline-md text-headline-md text-on-surface">Fiches à Valider</h3>
<button className="text-primary font-bold text-sm hover:underline">Voir tout</button>
</div>

<div className="bg-white border border-surface-border p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined">calculate</span>
</div>
<div>
<h4 className="font-title-md text-title-md">Trigonométrie Appliquée</h4>
<p className="font-body-md text-body-md text-outline">Mathématiques • <span className="text-on-surface">Thomas Bernard</span></p>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<p className="font-label-md text-label-md text-outline">Soumis le 22 Mai</p>
<button className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-colors flex items-center gap-2">
                                Consulter
                                <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
</button>
</div>
</div>

<div className="bg-white border border-surface-border p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-expert-purple">
<span className="material-symbols-outlined">science</span>
</div>
<div>
<h4 className="font-title-md text-title-md">Mécanique des Fluides</h4>
<p className="font-body-md text-body-md text-outline">Physique • <span className="text-on-surface">Léa Morel</span></p>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<p className="font-label-md text-label-md text-outline">Soumis le 23 Mai</p>
<button className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-colors flex items-center gap-2">
                                Consulter
                                <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
</button>
</div>
</div>

<div className="bg-white border border-surface-border p-5 rounded-xl flex items-center justify-between hover:shadow-md transition-shadow group">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined">functions</span>
</div>
<div>
<h4 className="font-title-md text-title-md">Analyse de Fonctions</h4>
<p className="font-body-md text-body-md text-outline">Mathématiques • <span className="text-on-surface">Marc Dupont</span></p>
</div>
</div>
<div className="flex flex-col items-end gap-2">
<p className="font-label-md text-label-md text-outline">Soumis aujourd'hui</p>
<button className="bg-primary text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-primary-container transition-colors flex items-center gap-2">
                                Consulter
                                <span className="material-symbols-outlined text-xs">arrow_forward_ios</span>
</button>
</div>
</div>
</section>

<section className="space-y-gutter">
<h3 className="font-headline-md text-headline-md text-on-surface">Statistiques d'Impact</h3>
<div className="bg-white border border-surface-border p-6 rounded-xl flex flex-col gap-6">

<div className="text-center p-4 bg-surface-container-low rounded-xl">
<p className="font-metric-num text-metric-num text-primary">2.5k</p>
<p className="font-label-md text-label-md text-on-surface-variant uppercase mt-1">élèves aidés</p>
<div className="w-full bg-surface-variant h-1.5 rounded-full mt-4 overflow-hidden">
<div className="bg-primary h-full w-[85%] rounded-full"></div>
</div>
</div>

<div className="text-center p-4 bg-surface-container-low rounded-xl">
<div className="flex items-center justify-center gap-2">
<p className="font-metric-num text-metric-num text-impact-emerald">4.2/5</p>
<span className="material-symbols-outlined text-validation-amber" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
<p className="font-label-md text-label-md text-on-surface-variant uppercase mt-1">notation moyenne</p>
<p className="font-body-md text-body-md text-outline mt-2 italic">"Excellent support et clarté"</p>
</div>

<div className="h-32 w-full relative">
<div className="absolute bottom-0 left-0 w-full h-full flex items-end gap-1 px-2">
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"40%"}}></div>
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"60%"}}></div>
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"45%"}}></div>
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"80%"}}></div>
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"70%"}}></div>
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"90%"}}></div>
<div className="bg-primary/20 hover:bg-primary w-full transition-colors rounded-t" style={{"height":"75%"}}></div>
</div>
</div>
<p className="text-center font-label-md text-label-md text-outline">Tendance d'engagement (7 derniers jours)</p>
</div>

<div className="bg-primary-container text-on-primary-container p-6 rounded-xl shadow-lg relative overflow-hidden group">
<div className="relative z-10">
<h4 className="font-title-md text-title-md mb-2">Centre de Formation</h4>
<p className="font-body-md text-body-md opacity-90 mb-4">Accédez à nos nouvelles ressources pédagogiques pour optimiser vos validations.</p>
<button className="w-full bg-white text-primary py-3 rounded-lg font-bold hover:bg-primary-fixed transition-colors">Consulter les ressources</button>
</div>

<div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
</div>
</section>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest dark:bg-surface-container-low border-t border-surface-border dark:border-outline-variant flex justify-around items-center py-2 px-4 shadow-2xl">
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label-md text-label-md">Tableau</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-label-md text-label-md">Validation</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-label-md text-label-md">Stats</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:text-primary transition-transform scale-95 active:scale-90" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>

<script>
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                button.style.transform = 'scale(0.98)';
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.style.transform = 'scale(1)';
            &#125;);
        &#125;);

        // Simple notification toast simulation for a more "live" feel
        window.addEventListener('load', () =&gt; &#123;
            setTimeout(() =&gt; &#123;
                const toast = document.createElement('div');
                toast.className = 'fixed top-20 right-4 bg-white border border-primary p-4 rounded-lg shadow-xl z-50 transform translate-x-full transition-transform duration-500 ease-out flex items-center gap-3';
                toast.innerHTML = `
                    &lt;span class="material-symbols-outlined text-primary"&gt;info&lt;/span&gt;
                    &lt;div&gt;
                        &lt;p class="font-bold text-sm"&gt;Nouveau message&lt;/p&gt;
                        &lt;p class="text-xs text-outline"&gt;Un élève a commenté votre validation.&lt;/p&gt;
                    &lt;/div&gt;
                `;
                document.body.appendChild(toast);
                setTimeout(() =&gt; toast.style.transform = 'translateX(0)', 100);
                setTimeout(() =&gt; toast.style.transform = 'translateX(120%)', 5000);
            &#125;, 2000);
        &#125;);
    </script>

    </div>
  );
}
