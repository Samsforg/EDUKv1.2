import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professor - Configuration de Certification" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-container-lowest dark:bg-surface-container-lowest text-primary dark:text-primary-fixed border-b border-surface-border dark:border-outline-variant w-full top-0 sticky z-50">
<div className="flex justify-between items-center px-container-padding-desktop w-full mx-auto py-4">
<div className="flex items-center gap-4">
<button className="active:scale-95 transition-transform">
<span className="material-symbols-outlined text-headline-md">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary font-bold">Configuration de Certification</h1>
</div>
<div className="flex items-center gap-base">
<button className="bg-primary text-on-primary px-6 py-2 rounded-lg font-bold hover:bg-primary-container transition-colors active:scale-95">
                    Sauvegarder les Paramètres
                </button>
</div>
</div>
</header>
<div className="flex min-h-screen">

<aside className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-low dark:bg-surface-dim border-r border-surface-border flex flex-col p-4 gap-base z-40 hidden md:flex pt-24">
<div className="flex items-center gap-4 mb-8 px-4">
<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-078.png" alt="Professional headshot of a female expert educator in her late 40s, wearing a charcoal grey blazer and glasses. She has a confident yet warm expression, looking directly into the camera. The background is a soft-focus university library with rows of academic books, lit with cool, bright window light to create a clean, professional light-mode aesthetic." />
</div>
<div>
<h2 className="font-title-md text-title-md text-primary font-bold">Dr. Sophie Martin</h2>
<p className="text-label-md font-label-md text-on-surface-variant uppercase">Expert Pédagogique</p>
</div>
</div>
<nav className="flex flex-col gap-2">
<a className="text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-3" href="#">
<span className="material-symbols-outlined">queue_play_next</span>
<span className="font-body-md text-body-md">File d'attente</span>
</a>
<a className="text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-3" href="#">
<span className="material-symbols-outlined">fact_check</span>
<span className="font-body-md text-body-md">Mes validations</span>
</a>
<a className="text-primary font-bold bg-secondary-container rounded-lg px-4 py-2 transition-all cursor-pointer flex items-center gap-3" href="#">
<span className="material-symbols-outlined">verified_user</span>
<span className="font-body-md text-body-md">Certification</span>
</a>
<a className="text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-3" href="#">
<span className="material-symbols-outlined">analytics</span>
<span className="font-body-md text-body-md">Statistiques</span>
</a>
<a className="text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all cursor-pointer flex items-center gap-3" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 md:ml-[280px] p-container-padding-desktop">
<div className="max-w-6xl mx-auto">

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-8 flex flex-col gap-gutter">

<section className="bg-surface-container-lowest border border-surface-border p-8 rounded-lg">
<h3 className="font-headline-md text-headline-md mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">tune</span>
                                Seuils de Rigueur Scientifique
                            </h3>
<div className="space-y-10">

<div className="space-y-4">
<div className="flex justify-between items-center">
<label className="font-title-md text-title-md font-bold">Rigueur Scientifique</label>
<span className="bg-primary-container/10 text-primary px-3 py-1 rounded font-metric-num text-body-lg">85%</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer slider-thumb" max={100} min={0} type="range" value="85" />
<p className="text-label-md font-label-md text-on-surface-variant">Validation stricte des sources primaires et peer-reviewed.</p>
</div>

<div className="space-y-4">
<div className="flex justify-between items-center">
<label className="font-title-md text-title-md font-bold">Clarté Pédagogique</label>
<span className="bg-primary-container/10 text-primary px-3 py-1 rounded font-metric-num text-body-lg">70%</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer slider-thumb" max={100} min={0} type="range" value="70" />
<p className="text-label-md font-label-md text-on-surface-variant">Niveau de vulgarisation adapté sans perte de précision technique.</p>
</div>

<div className="space-y-4">
<div className="flex justify-between items-center">
<label className="font-title-md text-title-md font-bold">Vérification des Sources</label>
<span className="bg-primary-container/10 text-primary px-3 py-1 rounded font-metric-num text-body-lg">95%</span>
</div>
<input className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer slider-thumb" max={100} min={0} type="range" value="95" />
<p className="text-label-md font-label-md text-on-surface-variant">Tolérance zéro pour les sources non académiques ou orphelines.</p>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-surface-border p-8 rounded-lg">
<h3 className="font-headline-md text-headline-md mb-6">Critères Obligatoires</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<label className="flex items-start gap-4 p-4 border border-surface-border rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input checked={true} className="mt-1 w-5 h-5 text-primary border-outline rounded focus:ring-primary" type="checkbox" />
<div>
<span className="font-body-lg font-bold block">Bibliographie Normée (APA/MLA)</span>
<span className="text-label-md text-on-surface-variant">Vérification automatique de l'indexation.</span>
</div>
</label>
<label className="flex items-start gap-4 p-4 border border-surface-border rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input checked={true} className="mt-1 w-5 h-5 text-primary border-outline rounded focus:ring-primary" type="checkbox" />
<div>
<span className="font-body-lg font-bold block">Contrôle Anti-Plagiat &lt; 5%</span>
<span className="text-label-md text-on-surface-variant">Score Turnitin intégré à la validation.</span>
</div>
</label>
<label className="flex items-start gap-4 p-4 border border-surface-border rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input checked={true} className="mt-1 w-5 h-5 text-primary border-outline rounded focus:ring-primary" type="checkbox" />
<div>
<span className="font-body-lg font-bold block">Validation par Pair (Double-Blind)</span>
<span className="text-label-md text-on-surface-variant">Minimum 2 experts assignés.</span>
</div>
</label>
<label className="flex items-start gap-4 p-4 border border-surface-border rounded-lg cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="mt-1 w-5 h-5 text-primary border-outline rounded focus:ring-primary" type="checkbox" />
<div>
<span className="font-body-lg font-bold block">Accessibilité (WCAG 2.1)</span>
<span className="text-label-md text-on-surface-variant">Optimisation pour lecteurs d'écran.</span>
</div>
</label>
</div>
</section>
</div>

<div className="lg:col-span-4 flex flex-col gap-gutter">

<section className="bg-primary text-on-primary p-8 rounded-lg flex flex-col items-center text-center relative overflow-hidden">
<div className="absolute inset-0 opacity-10 pointer-events-none">

</div>
<h3 className="font-label-md text-label-md uppercase tracking-widest mb-8 opacity-80">Aperçu du Sceau de Certification</h3>
<div className="w-48 h-48 rounded-full bg-white flex items-center justify-center p-2 shadow-xl ring-8 ring-white/20 mb-6">
<div className="w-full h-full rounded-full border-4 border-primary border-dashed flex flex-col items-center justify-center">
<span className="material-symbols-outlined text-primary text-[64px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<p className="font-headline-md text-primary font-extrabold leading-tight -mt-2">EDUKORA</p>
<p className="text-label-md text-primary font-bold tracking-tighter uppercase">Certified Sheet</p>
</div>
</div>
<p className="font-title-md text-title-md mb-2">Badge "Certifié Edukora"</p>
<p className="text-body-md opacity-80 max-w-[200px]">Délivré uniquement aux contenus atteignant les seuils configurés.</p>
</section>

<section className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg flex-1">
<h3 className="font-title-md text-title-md mb-4 flex items-center justify-between">
                                Certifications Récentes
                                <span className="material-symbols-outlined text-impact-emerald">history</span>
</h3>
<div className="space-y-4 custom-scrollbar overflow-y-auto max-h-[400px]">

<div className="p-4 rounded border-l-4 border-validation-amber hover:bg-surface-container-low transition-all">
<p className="text-label-md font-label-md text-expert-purple mb-1">PHYSIQUE QUANTIQUE</p>
<h4 className="font-bold text-body-lg truncate">Dualité Onde-Corpuscule v2</h4>
<div className="flex justify-between items-center mt-2">
<span className="text-label-md text-on-surface-variant italic">Il y a 2h</span>
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
</div>
</div>
</div>

<div className="p-4 rounded border-l-4 border-validation-amber hover:bg-surface-container-low transition-all">
<p className="text-label-md font-label-md text-expert-purple mb-1">MACROÉCONOMIE</p>
<h4 className="font-bold text-body-lg truncate">Théorie des Jeux &amp; Marchés</h4>
<div className="flex justify-between items-center mt-2">
<span className="text-label-md text-on-surface-variant italic">Il y a 5h</span>
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-surface-dim"></div>
</div>
</div>
</div>

<div className="p-4 rounded border-l-4 border-validation-amber hover:bg-surface-container-low transition-all">
<p className="text-label-md font-label-md text-expert-purple mb-1">NEUROSCIENCES</p>
<h4 className="font-bold text-body-lg truncate">Mécanismes de la Mémoire</h4>
<div className="flex justify-between items-center mt-2">
<span className="text-label-md text-on-surface-variant italic">Hier</span>
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
</div>
</div>
</div>

<div className="p-4 rounded border-l-4 border-validation-amber hover:bg-surface-container-low transition-all">
<p className="text-label-md font-label-md text-expert-purple mb-1">HISTOIRE DE L'ART</p>
<h4 className="font-bold text-body-lg truncate">Le Symbolisme Européen</h4>
<div className="flex justify-between items-center mt-2">
<span className="text-label-md text-on-surface-variant italic">23 oct.</span>
<div className="flex gap-1">
<div className="w-2 h-2 rounded-full bg-impact-emerald"></div>
<div className="w-2 h-2 rounded-full bg-surface-dim"></div>
<div className="w-2 h-2 rounded-full bg-surface-dim"></div>
</div>
</div>
</div>
</div>
</section>
</div>
</div>

<div className="mt-gutter grid grid-cols-1 md:grid-cols-4 gap-6">
<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg">
<p className="text-label-md font-label-md text-on-surface-variant uppercase mb-2">Taux de Certification</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-metric-num text-primary">12.4%</span>
<span className="text-impact-emerald text-label-md mb-1 flex items-center">
<span className="material-symbols-outlined text-[14px]">trending_up</span> +0.8%
                            </span>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg">
<p className="text-label-md font-label-md text-on-surface-variant uppercase mb-2">Temps de Revue Moyen</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-metric-num text-primary">4.2j</span>
<span className="text-error text-label-md mb-1 flex items-center">
<span className="material-symbols-outlined text-[14px]">trending_down</span> -0.5j
                            </span>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg">
<p className="text-label-md font-label-md text-on-surface-variant uppercase mb-2">Fiches Validées (Mois)</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-metric-num text-primary">842</span>
<div className="w-16 h-6 bg-surface-container rounded overflow-hidden">
<div className="w-full h-full bg-primary/10 flex items-center px-1">
<div className="h-1 bg-impact-emerald w-full rounded-full"></div>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border p-6 rounded-lg">
<p className="text-label-md font-label-md text-on-surface-variant uppercase mb-2">Score de Confiance Experts</p>
<div className="flex items-end gap-2">
<span className="font-metric-num text-metric-num text-primary">9.8</span>
<span className="text-on-surface-variant text-label-md mb-1">/ 10</span>
</div>
</div>
</div>
</div>
</main>
</div>

<div className="fixed bottom-8 right-8 bg-inverse-surface text-inverse-on-surface px-6 py-3 rounded-full flex items-center gap-3 transform translate-y-24 transition-transform duration-300 shadow-2xl z-[60]" id="save-toast">
<span className="material-symbols-outlined text-impact-emerald">check_circle</span>
<span className="font-body-md">Configuration enregistrée avec succès.</span>
</div>
<script>
        // Micro-interaction logic
        const saveBtn = document.querySelector('button:contains("Sauvegarder")') || document.querySelector('.bg-primary.text-on-primary');
        const toast = document.getElementById('save-toast');

        saveBtn.addEventListener('click', () =&gt; &#123;
            saveBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt;';
            setTimeout(() =&gt; &#123;
                saveBtn.innerHTML = 'Sauvegarder les Paramètres';
                toast.classList.remove('translate-y-24');
                setTimeout(() =&gt; &#123;
                    toast.classList.add('translate-y-24');
                &#125;, 3000);
            &#125;, 800);
        &#125;);

        // Add contain: "text" helper for vanilla JS if needed (or just use classes)
        // Custom interactive behavior for sliders
        const sliders = document.querySelectorAll('input[type="range"]');
        sliders.forEach(slider =&gt; &#123;
            slider.addEventListener('input', (e) =&gt; &#123;
                const valDisplay = e.target.parentElement.querySelector('.font-metric-num');
                if (valDisplay) valDisplay.textContent = e.target.value + '%';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
