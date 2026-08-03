import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paramètres Standards Académiques - Edukora Professor" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-40 bg-surface dark:bg-surface-container border-b border-surface-border dark:border-outline-variant h-16 flex justify-between items-center px-container-padding-desktop">
<div className="flex items-center gap-base cursor-pointer active:opacity-80">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" data-icon="school">school</span>
<h1 className="text-headline-md font-headline-md font-bold text-primary dark:text-primary-fixed">Edukora Professor</h1>
</div>
<div className="flex items-center gap-stack-sm">
<div className="text-right mr-3 hidden md:block">
<p className="font-bold text-body-md text-primary">Dr. Elena Vance</p>
<p className="text-label-md text-on-surface-variant">Statut d'expert</p>
</div>
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center border border-surface-border overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-274.png" alt="A professional headshot of a female professor in her late 40s, looking confident and approachable. She is wearing a modern blazer in a minimalist grey, set against a blurred academic library background with soft, high-key lighting that emphasizes a clean and trustworthy corporate aesthetic. The lighting is balanced and natural, reinforcing her status as a senior faculty member." />
</div>
</div>
</header>

<aside className="fixed left-0 top-16 h-[calc(100vh-64px)] w-[280px] hidden md:flex flex-col py-stack-md gap-base bg-surface dark:bg-surface-container border-r border-surface-border dark:border-outline-variant transition-all duration-200 ease-in-out">
<nav className="flex-1 space-y-1 px-4">
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="fact_check">fact_check</span>
<span className="font-body-md text-body-md">Validation Lab</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-secondary-container hover:bg-surface-container-high transition-all" href="#">
<span className="material-symbols-outlined" data-icon="insights">insights</span>
<span className="font-body-md text-body-md">Impact Analytics</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 rounded-lg text-primary font-bold border-r-4 border-primary bg-primary-fixed-dim/10 transition-all" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
</nav>
<div className="px-6 py-4">
<div className="p-4 rounded-xl bg-expert-purple/10 border border-expert-purple/20">
<div className="flex items-center gap-2 mb-2">
<span className="material-symbols-outlined text-expert-purple text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="text-label-md font-bold text-expert-purple uppercase tracking-wider">Statut d'expert</span>
</div>
<p className="text-xs text-on-surface-variant leading-relaxed">Your validation impact score is in the top 5% of the faculty.</p>
</div>
</div>
</aside>

<main className="pt-24 pb-20 md:pb-8 md:pl-[312px] pr-container-padding-desktop px-container-padding-mobile">
<div className="max-w-5xl mx-auto">
<header className="mb-stack-md">
<h2 className="font-headline-lg text-headline-lg text-primary mb-1">Paramètres Académiques</h2>
<p className="text-body-lg text-on-surface-variant">Configurez vos standards d'excellence pédagogique et gérez votre empreinte institutionnelle.</p>
</header>

<div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">

<section className="md:col-span-8 settings-card rounded-xl p-stack-md flex flex-col gap-4">
<div className="flex justify-between items-start">
<div>
<div className="flex items-center gap-2 text-primary mb-1">
<span className="material-symbols-outlined" data-icon="verified_user">verified_user</span>
<h3 className="font-title-md text-title-md">Critères de certification</h3>
</div>
<p className="text-body-md text-on-surface-variant">Définissez les seuils de rigueur pour la validation des fiches académiques.</p>
</div>
<button className="text-primary hover:bg-primary/5 px-3 py-1 rounded text-label-md font-bold transition-colors">MODIFIER</button>
</div>
<div className="space-y-3 mt-2">
<div className="flex items-center justify-between p-3 bg-background rounded border border-surface-border">
<span className="text-body-md font-bold">Rigueur Scientifique</span>
<div className="flex items-center gap-2">
<div className="w-32 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="w-[90%] h-full bg-primary-container"></div>
</div>
<span className="text-label-md font-bold">9.0/10</span>
</div>
</div>
<div className="flex items-center justify-between p-3 bg-background rounded border border-surface-border">
<span className="text-body-md font-bold">Clarté Pédagogique</span>
<div className="flex items-center gap-2">
<div className="w-32 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="w-[75%] h-full bg-primary-container"></div>
</div>
<span className="text-label-md font-bold">7.5/10</span>
</div>
</div>
<div className="flex items-center justify-between p-3 bg-background rounded border border-surface-border">
<span className="text-body-md font-bold">Vérification des Sources</span>
<div className="flex items-center gap-2">
<div className="w-32 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="w-full h-full bg-impact-emerald"></div>
</div>
<span className="text-label-md font-bold">OBLIGATOIRE</span>
</div>
</div>
</div>
</section>

<section className="md:col-span-4 settings-card rounded-xl p-stack-md flex flex-col justify-between">
<div>
<div className="flex items-center gap-2 text-primary mb-1">
<span className="material-symbols-outlined" data-icon="draw">draw</span>
<h3 className="font-title-md text-title-md">Signature numérique</h3>
</div>
<p className="text-body-md text-on-surface-variant mb-4">Votre sceau d'expert apposé sur les documents validés.</p>
<div className="aspect-video w-full border-2 border-dashed border-outline-variant rounded-lg flex items-center justify-center bg-surface-container-low group cursor-pointer hover:border-primary transition-colors">
<div className="text-center">
<span className="material-symbols-outlined text-4xl text-outline-variant group-hover:text-primary mb-2" data-icon="contactless">contactless</span>
<p className="text-label-md font-bold text-on-surface-variant group-hover:text-primary">ACTIVER L'AUTHENTIFICATION</p>
</div>
</div>
</div>
<button className="w-full mt-4 bg-primary-container text-white py-3 rounded font-bold text-body-md hover:opacity-90 transition-opacity">GÉRER LE CERTIFICAT</button>
</section>

<section className="md:col-span-6 settings-card rounded-xl p-stack-md">
<div className="flex items-center gap-2 text-primary mb-4">
<span className="material-symbols-outlined" data-icon="notifications_active">notifications_active</span>
<h3 className="font-title-md text-title-md">Notifications de nouvelles fiches</h3>
</div>
<div className="space-y-4">
<label className="flex items-center justify-between cursor-pointer group">
<div>
<p className="text-body-md font-bold">Alerte Prioritaire</p>
<p className="text-xs text-on-surface-variant">Sujets correspondant à votre expertise principale.</p>
</div>
<div className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</div>
</label>
<div className="h-px bg-surface-border"></div>
<label className="flex items-center justify-between cursor-pointer group">
<div>
<p className="text-body-md font-bold">Résumé Hebdomadaire</p>
<p className="text-xs text-on-surface-variant">Compilation des fiches en attente de second regard.</p>
</div>
<div className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</div>
</label>
<div className="h-px bg-surface-border"></div>
<label className="flex items-center justify-between cursor-pointer group">
<div>
<p className="text-body-md font-bold">Notifications Push</p>
<p className="text-xs text-on-surface-variant">Sur l'application mobile lors de nouvelles publications.</p>
</div>
<div className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
</div>
</label>
</div>
</section>

<section className="md:col-span-6 settings-card rounded-xl p-stack-md flex flex-col">
<div className="flex items-center gap-2 text-primary mb-4">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
<h3 className="font-title-md text-title-md">Communauté d'experts</h3>
</div>
<div className="flex-1">
<div className="flex -space-x-3 mb-4">
<div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-275.png" alt="A close-up portrait of a male professor in a professional setting, wearing glasses and a crisp white shirt, exuding intellectual authority and friendliness. Minimalist office background with natural light." />
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-276.png" alt="A professional portrait of a female researcher with a focused expression, wearing a smart navy blazer. The lighting is soft and corporate, emphasizing a clean, light-mode aesthetic and professional trust." />
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-slate-400 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-277.png" alt="A portrait of an elderly distinguished professor with a warm smile, wearing a tweed jacket. Set in a bright, modern academic environment with a minimalist, high-contrast style." />
</div>
<div className="w-10 h-10 rounded-full border-2 border-white bg-primary-fixed flex items-center justify-center text-primary text-xs font-bold">+12</div>
</div>
<p className="text-body-md text-on-surface-variant mb-4">Vous collaborez actuellement avec 15 experts pour la validation croisée des contenus en Sciences Humaines.</p>
</div>
<div className="grid grid-cols-2 gap-3">
<button className="border border-primary text-primary py-2 rounded font-bold text-label-md hover:bg-primary/5 transition-colors">INVITER UN PAIR</button>
<button className="bg-primary text-white py-2 rounded font-bold text-label-md hover:opacity-90 transition-opacity">VOIR LE RÉSEAU</button>
</div>
</section>

<section className="md:col-span-12 p-6 rounded-xl border border-validation-amber/30 bg-validation-amber/5 flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-validation-amber/20 flex items-center justify-center text-validation-amber">
<span className="material-symbols-outlined text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>warning</span>
</div>
<div>
<h4 className="font-bold text-body-lg text-primary">Révision annuelle des standards</h4>
<p className="text-body-md text-on-surface-variant">Votre profil nécessite une mise à jour de vos accréditations avant le 15 Octobre.</p>
</div>
</div>
<button className="bg-primary text-white px-8 py-3 rounded font-bold text-body-md shadow-sm">METTRE À JOUR MAINTENANT</button>
</section>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full md:hidden flex justify-around items-center h-16 pb-safe bg-surface dark:bg-surface-container-highest border-t border-surface-border shadow-sm z-50">
<div className="flex flex-col items-center justify-center text-on-surface-variant cursor-pointer active:bg-surface-container-high transition-transform scale-95">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant cursor-pointer active:bg-surface-container-high transition-transform scale-95">
<span className="material-symbols-outlined" data-icon="approval">approval</span>
<span className="font-label-md text-label-md">Vérifier</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant cursor-pointer active:bg-surface-container-high transition-transform scale-95">
<span className="material-symbols-outlined" data-icon="monitoring">monitoring</span>
<span className="font-label-md text-label-md">Metrics</span>
</div>
<div className="flex flex-col items-center justify-center text-primary font-bold cursor-pointer active:bg-surface-container-high transition-transform scale-95">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label-md text-label-md">Profil</span>
</div>
</nav>

<script>
        document.querySelectorAll('.settings-card').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.classList.add('shadow-md');
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.classList.remove('shadow-md');
            &#125;);
        &#125;);

        // Simple Toggle interaction simulation
        document.querySelectorAll('input[type="checkbox"]').forEach(toggle =&gt; &#123;
            toggle.addEventListener('change', function() &#123;
                const parent = this.closest('label');
                if(this.checked) &#123;
                    console.log("Setting activated");
                &#125; else &#123;
                    console.log("Setting deactivated");
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
