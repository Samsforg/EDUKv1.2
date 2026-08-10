import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Parent - Réglages Notifications" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-on-surface-variant flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="p-2 hover:bg-surface-container-high transition-colors rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-primary dark:text-primary-fixed-dim text-headline-md">Réglages Notifications</h1>
</div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>notifications_active</span>
</div>
</header>
<main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">

<div className="relative w-full h-40 rounded-xl overflow-hidden mb-8 shadow-sm">
<div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-container/80 z-10 flex items-center px-6">
<div className="text-on-primary max-w-[200px]">
<h2 className="text-xl font-headline font-bold leading-tight">Gardez le fil de la réussite</h2>
<p className="text-sm opacity-90 mt-1">Personnalisez vos alertes pour un suivi optimal.</p>
</div>
</div>
<div className="w-full h-full" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuAlslbkaG4vZASgOmWS1dOua21hOwybJ3eMqWpZMxSUs0qF_WxD4voxOLyAg1hDTAQsFYdj2IA3vTz6lGya6Q-jr_XbITyJlp5bx2jM9_cnAsiidel6DhxcOu1WjR7OxLbG9MG2GJClsvznnV5wRfDQg0vYvo8vopIJI_aPXenY9nuelA3SZxSC25YHIJWxV0gbf2X3yS1Y0yQEphAGi-xJ_wlQCLU3LaStlHZSGPLc2L6WPSZ_gbl6')"}}></div>
</div>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined">notifications</span>
</div>
<div>
<h3 className="font-semibold text-on-surface">Activer les notifications push</h3>
<p className="text-sm text-on-surface-variant">Autoriser Edukora à vous envoyer des alertes</p>
</div>
</div>
<label className="switch">
<input checked={true} type="checkbox" />
<span className="slider"></span>
</label> section
        </section>

<section className="space-y-3" id="academic-section">
<h2 className="px-2 text-label-xs font-semibold uppercase tracking-wider text-outline">Alertes Académiques</h2>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-start">
<span className="material-symbols-outlined text-secondary mt-1">description</span>
<div>
<p className="font-medium text-on-surface">Nouveaux résultats d'examens</p>
<p className="text-xs text-on-surface-variant">Soyez notifié dès qu'une note est publiée</p>
</div>
</div>
<label className="switch">
<input checked={true} className="sub-toggle" type="checkbox" />
<span className="slider"></span>
</label>
</div>

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-start">
<span className="material-symbols-outlined text-tertiary mt-1">event_available</span>
<div>
<p className="font-medium text-on-surface">Rapports d'assiduité hebdomadaires</p>
<p className="text-xs text-on-surface-variant">Résumé de la semaine chaque dimanche soir</p>
</div>
</div>
<label className="switch">
<input checked={true} className="sub-toggle" type="checkbox" />
<span className="slider"></span>
</label>
</div>

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-start">
<span className="material-symbols-outlined text-error mt-1">trending_down</span>
<div>
<p className="font-medium text-on-surface">Alertes de baisse de rythme</p>
<p className="text-xs text-on-surface-variant">Alerte après 2 jours sans connexion</p>
</div>
</div>
<label className="switch">
<input checked={true} className="sub-toggle" type="checkbox" />
<span className="slider"></span>
</label>
</div>
</div>
</section>

<section className="space-y-3" id="communication-section">
<h2 className="px-2 text-label-xs font-semibold uppercase tracking-wider text-outline">Communication</h2>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl divide-y divide-outline-variant overflow-hidden">

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-start">
<span className="material-symbols-outlined text-primary mt-1">smart_toy</span>
<div>
<p className="font-medium text-on-surface">Messages du Tuteur IA</p>
<p className="text-xs text-on-surface-variant">Conseils personnalisés pour votre enfant</p>
</div>
</div>
<label className="switch">
<input checked={true} className="sub-toggle" type="checkbox" />
<span className="slider"></span>
</label>
</div>

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors">
<div className="flex gap-4 items-start">
<span className="material-symbols-outlined text-on-surface-variant mt-1">info</span>
<div>
<p className="font-medium text-on-surface">Informations administratives</p>
<p className="text-xs text-on-surface-variant">Mises à jour plateforme et paiements</p>
</div>
</div>
<label className="switch">
<input className="sub-toggle" type="checkbox" />
<span className="slider"></span>
</label>
</div>
</div>
</section>

<div className="pt-8 pb-12">
<button className="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all hover:bg-secondary transition-colors group" id="save-btn">
<span className="material-symbols-outlined group-hover:rotate-12 transition-transform">save</span>
                Sauvegarder les préférences
            </button>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 flex justify-around items-center h-16 pb-safe bg-surface-container-lowest dark:bg-inverse-surface shadow-md border-t border-outline-variant">

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs mt-0.5">Tableau</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined">description</span>
<span className="font-label text-label-xs mt-0.5">Examens</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant px-4 py-1 hover:text-primary transition-all active:scale-90" href="#">
<span className="material-symbols-outlined">event_available</span>
<span className="font-label text-label-xs mt-0.5">Assiduité</span>
</a>

<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs mt-0.5">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction: Toggle All Logic
        function toggleAll(masterToggle) &#123;
            const checkboxes = document.querySelectorAll('.sub-toggle');
            checkboxes.forEach(cb =&gt; &#123;
                cb.checked = masterToggle.checked;
                updateVisualState(cb);
            &#125;);
        &#125;

        function updateVisualState(cb) &#123;
            const row = cb.closest('.p-4');
            if (!cb.checked) &#123;
                row.classList.add('opacity-50');
            &#125; else &#123;
                row.classList.remove('opacity-50');
            &#125;
        &#125;

        // Initialize visual states
        document.querySelectorAll('.sub-toggle').forEach(cb =&gt; &#123;
            updateVisualState(cb);
            cb.addEventListener('change', () =&gt; updateVisualState(cb));
        &#125;);

        // Save Button Interaction
        const saveBtn = document.getElementById('save-btn');
        saveBtn.addEventListener('click', function() &#123;
            const originalContent = this.innerHTML;
            this.innerHTML = `
                &lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt;
                Enregistrement...
            `;
            this.classList.add('pointer-events-none', 'opacity-80');
            
            setTimeout(() =&gt; &#123;
                this.innerHTML = `
                    &lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt;
                    Préférences sauvegardées !
                `;
                this.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                this.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
                
                setTimeout(() =&gt; &#123;
                    this.innerHTML = originalContent;
                    this.classList.replace('bg-tertiary-container', 'bg-secondary-container');
                    this.classList.replace('text-on-tertiary-container', 'text-on-secondary-container');
                    this.classList.remove('pointer-events-none', 'opacity-80');
                &#125;, 2000);
            &#125;, 1000);
        &#125;);
    </script>

    </div>
  );
}
