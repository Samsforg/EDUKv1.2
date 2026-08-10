import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin | Fraud Moteur de règles" };

export default function Page() {
  return (
    <div className="text-on-surface overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-md flex justify-between items-center px-4 md:px-8 py-3 w-full">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl">security</span>
<h1 className="font-headline text-display-lg-mobile font-bold">Edukora Admin</h1>
</div>
<div className="hidden md:flex gap-6 items-center">
<nav className="flex gap-4">
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-3 py-1 rounded" href="#">Alertes de fraude</a>
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-3 py-1 rounded" href="#">Investigations</a>
<a className="text-on-primary font-bold underline decoration-secondary decoration-2 px-3 py-1 rounded" href="#">Moteur de règles</a>
<a className="text-on-primary/80 font-medium hover:bg-primary-container/20 transition-colors px-3 py-1 rounded" href="#">Journal d'audit</a>
</nav>
<div className="h-10 w-10 rounded-full border-2 border-on-primary/20 overflow-hidden cursor-pointer active:scale-95 transition-transform">
<img className="w-full h-full object-cover" src="/images/ecran-075.png" alt="A professional headshot of a female system administrator in a modern office, wearing professional attire. The lighting is bright and clean, typical of a high-end corporate tech environment. The color palette is composed of soft blues and clean whites, reflecting the Edukora brand's academic authority and modern technological focus." />
</div>
</div>
</header>

<aside className="fixed left-0 top-0 h-full w-64 hidden lg:flex flex-col gap-2 p-4 pt-24 bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant dark:border-outline z-40">
<div className="flex items-center gap-4 mb-6 px-2">
<div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined">admin_panel_settings</span>
</div>
<div>
<p className="font-headline text-headline-md text-primary font-semibold">Panneau Admin</p>
<p className="font-body text-label-xs text-on-surface-variant">Surveillance de la fraude</p>
</div>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">notifications_active</span>
<span className="font-body text-body-md">Alertes de fraude</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">search_check</span>
<span className="font-body text-body-md">Investigations</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 bg-secondary-container text-on-secondary-container rounded-lg font-semibold transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">rule</span>
<span className="font-body text-body-md">Moteur de règles</span>
</a>
<a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all duration-200 ease-in-out" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-body text-body-md">Journal d'audit</span>
</a>
</nav>
<div className="mt-auto p-4 bg-primary-container/10 rounded-xl border border-primary/10">
<p className="text-label-xs font-bold text-primary uppercase tracking-wider mb-2">État du système</p>
<div className="flex items-center gap-2 text-label-sm text-tertiary">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
</span>
                Surveillance active
            </div>
</div>
</aside>

<main className="lg:ml-64 pt-24 pb-24 px-4 md:px-8 max-w-7xl">
<header className="mb-8">
<h2 className="font-headline text-headline-md font-bold text-primary mb-2">Configuration des règles de fraude</h2>
<p className="text-on-surface-variant max-w-2xl">Manage automated security thresholds and AI-driven detection parameters to safeguard the academic integrity of the Edukora platform.</p>
</header>
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

<section className="col-span-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl rule-card">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-primary-fixed rounded-lg">
<span className="material-symbols-outlined text-on-primary-fixed">devices</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<h3 className="font-headline text-lg font-bold mb-1">Max devices per account</h3>
<p className="text-label-sm text-on-surface-variant mb-6">Restricts the number of distinct hardware IDs that can access a single student profile within a 24-hour window.</p>
<div className="space-y-4">
<div className="flex justify-between items-center p-3 bg-surface-container rounded-lg">
<span className="text-label-sm font-medium">Device Limit</span>
<input className="w-16 bg-white border border-outline-variant rounded px-2 py-1 text-center font-bold text-primary focus:ring-primary focus:border-primary" type="number" value="3" />
</div>
<div className="flex items-center gap-2 text-label-xs text-error">
<span className="material-symbols-outlined text-sm">warning</span>
                        Signaler comme à risque si dépassé
                    </div>
</div>
</section>

<section className="col-span-1 md:col-span-1 xl:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl rule-card">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-tertiary-fixed rounded-lg">
<span className="material-symbols-outlined text-on-tertiary-fixed">psychology</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<div>
<h3 className="font-headline text-lg font-bold mb-1">AI confidence threshold</h3>
<p className="text-label-sm text-on-surface-variant mb-6">The minimum probability required for the AI Proctor to flag an answer as potentially plagiarized or AI-generated.</p>
<div className="relative pt-1">
<div className="flex mb-2 items-center justify-between">
<div>
<span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-on-tertiary-container bg-tertiary-container">
                                  Current Sensitivity
                                </span>
</div>
<div className="text-right">
<span className="text-xs font-semibold inline-block text-tertiary">
                                  85%
                                </span>
</div>
</div>
<div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-tertiary-fixed">
<div className="shadow-none flex flex-col text-center white-space-nowrap text-white justify-center bg-tertiary" style={{"width":"85%"}}></div>
</div>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-xl space-y-4">
<div>
<label className="block text-label-xs font-bold uppercase mb-2">Niveau de confiance (%)</label>
<input className="w-full h-2 bg-outline-variant rounded-lg appearance-none cursor-pointer accent-primary" max={99} min={50} type="range" value="85" />
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>info</span>
<p className="text-label-xs leading-tight">Setting this above 90% reduces false positives but may miss sophisticated plagiarism.</p>
</div>
</div>
</div>
</section>

<section className="col-span-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl rule-card">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-secondary-fixed rounded-lg">
<span className="material-symbols-outlined text-on-secondary-fixed">payments</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<h3 className="font-headline text-lg font-bold mb-1">Suspicious payment frequency</h3>
<p className="text-label-sm text-on-surface-variant mb-6">Triggers an automatic hold on accounts attempting multiple high-value subscription purchases within a short timeframe.</p>
<div className="space-y-3">
<div className="flex flex-col gap-1">
<label className="text-label-xs font-semibold">Seuil de tentatives</label>
<div className="flex items-center gap-2">
<input className="flex-1 bg-white border border-outline-variant rounded px-3 py-2 text-body-md focus:ring-primary focus:border-primary" type="number" value="3" />
<span className="text-label-sm">tx / hour</span>
</div>
</div>
<div className="flex items-center gap-2 p-2 bg-error-container/30 rounded text-error text-label-xs font-medium">
<span className="material-symbols-outlined text-sm">block</span>
                        Immediate lock on failure
                    </div>
</div>
</section>

<section className="col-span-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl rule-card">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-primary-fixed-dim rounded-lg">
<span className="material-symbols-outlined text-on-primary-fixed">public</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<h3 className="font-headline text-lg font-bold mb-1">Vitesse des adresses IP</h3>
<p className="text-label-sm text-on-surface-variant mb-6">Detects impossible travel or account sharing by monitoring geographical shifts in IP address origins.</p>
<select className="w-full bg-white border border-outline-variant rounded-lg px-3 py-2 text-body-md font-medium text-on-surface focus:ring-primary focus:border-primary">
<option>Block Different Country</option>
<option selected={true}>Signaler une autre ville (&gt;50km)</option>
<option>Ignore (Logging Only)</option>
</select>
</section>

<section className="col-span-1 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl rule-card">
<div className="flex justify-between items-start mb-4">
<div className="p-3 bg-tertiary-fixed-dim rounded-lg">
<span className="material-symbols-outlined text-on-tertiary-fixed-variant">speed</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<h3 className="font-headline text-lg font-bold mb-1">Abnormal completion speed</h3>
<p className="text-label-sm text-on-surface-variant mb-6">Identifies users who finish mock exams at speeds statistically unlikely for human reading and processing.</p>
<div className="flex items-center gap-3">
<div className="flex-1">
<span className="text-label-xs font-bold text-on-surface-variant">Min. Time %</span>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-on-surface-variant">keyboard_double_arrow_down</span>
<span className="text-body-md font-bold">20%</span>
</div>
</div>
<button className="bg-primary text-on-primary px-4 py-2 rounded-lg text-label-sm font-bold shadow-sm hover:bg-primary-container transition-colors">Adjust Benchmark</button>
</div>
</section>
</div>

<div className="mt-12 p-6 bg-primary dark:bg-primary-container rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">

<div className="relative z-10 text-center md:text-left">
<h4 className="font-headline text-headline-md font-bold text-white">Enregistrer les changements du moteur en direct ?</h4>
<p className="text-on-primary-container font-medium">Modified rules will take effect globally across all active sessions immediately.</p>
</div>
<div className="relative z-10 flex gap-4">
<button className="px-8 py-3 bg-white text-primary font-bold rounded-xl hover:bg-surface-bright active:scale-95 transition-all">Discard</button>
<button className="px-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-xl shadow-lg hover:shadow-secondary/20 active:scale-95 transition-all">Mettre à jour le moteur de règles</button>
</div>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-2 pb-safe px-4 bg-surface dark:bg-surface-container-highest border-t border-outline-variant dark:border-outline shadow-lg lg:hidden">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high py-2 px-4 rounded-lg" href="#">
<span className="material-symbols-outlined">warning</span>
<span className="font-label text-label-xs">Alertes</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high py-2 px-4 rounded-lg" href="#">
<span className="material-symbols-outlined">manage_search</span>
<span className="font-label text-label-xs">Investigate</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>settings_suggest</span>
<span className="font-label text-label-xs">Rules</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high py-2 px-4 rounded-lg" href="#">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Toggle interactivity demo
        document.querySelectorAll('input[type="checkbox"]').forEach(toggle =&gt; &#123;
            toggle.addEventListener('change', function() &#123;
                const card = this.closest('.rule-card');
                if (!this.checked) &#123;
                    card.classList.add('opacity-60', 'grayscale-[0.5]');
                &#125; else &#123;
                    card.classList.remove('opacity-60', 'grayscale-[0.5]');
                &#125;
            &#125;);
        &#125;);

        // Numerical input micro-interactions
        document.querySelectorAll('input[type="number"]').forEach(input =&gt; &#123;
            input.addEventListener('focus', () =&gt; &#123;
                input.parentElement.classList.add('ring-2', 'ring-primary');
            &#125;);
            input.addEventListener('blur', () =&gt; &#123;
                input.parentElement.classList.remove('ring-2', 'ring-primary');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
