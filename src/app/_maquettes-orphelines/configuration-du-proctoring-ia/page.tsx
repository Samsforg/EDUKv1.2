import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Proctor - Configuration" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary shadow-md flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-4">
<button className="text-on-primary hover:bg-primary-container/20 transition-colors p-2 rounded-full active:opacity-80 transition-opacity">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-xl">Edukora Proctor</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<span className="text-on-primary font-semibold cursor-pointer">Tableau de bord</span>
<span className="text-on-primary-container/70 hover:text-on-primary transition-colors cursor-pointer">Sessions en direct</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary-container overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-077.png" alt="Professional portrait of a West African academic professor in a modern office, wearing a scholarly suit, soft warm studio lighting, highly detailed facial features, corporate photography style with a blurred background of a digital library." />
</div>
</div>
</header>

<aside className="fixed left-0 top-0 h-full w-80 bg-surface border-r border-outline-variant hidden md:flex flex-col gap-2 py-20 z-40">
<div className="px-6 mb-8">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<div>
<p className="font-headline font-bold text-primary">EduKora Admin</p>
<p className="text-xs text-on-surface-variant">Academic Faculty</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-2 px-2">
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-3 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Tableau de bord</span>
</a>
<a className="bg-primary-container text-on-primary-container rounded-full px-4 py-3 flex items-center gap-3 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">cloud_download</span>
<span>Paramètres d'examen</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-3 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">psychology</span>
<span>AI Configuration</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full px-4 py-3 flex items-center gap-3 transition-all active:scale-95 duration-150" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span>Sessions en direct</span>
</a>
</nav>
</aside>

<main className="md:pl-80 pt-16 pb-20 md:pb-8 min-h-screen">
<div className="max-w-5xl mx-auto p-4 md:p-8">

<div className="mb-8">
<h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-2">Configuration du Proctoring IA</h2>
<p className="text-on-surface-variant">Paramétrez les outils de surveillance intelligente pour garantir l'intégrité de vos examens.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-12 bg-white border border-outline-variant rounded-xl p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center shadow-sm">
<div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed/30 rounded-bl-full -mr-8 -mt-8"></div>
<div className="w-20 h-20 shrink-0 bg-primary-container/10 rounded-full flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>security</span>
</div>
<div className="flex-1">
<h3 className="font-headline font-semibold text-lg text-primary mb-2">Qu'est-ce que le Proctoring IA ?</h3>
<p className="text-body-md text-on-surface-variant leading-relaxed">
                            Le Proctoring IA utilise l'intelligence artificielle pour surveiller les étudiants via leurs webcams, micros et écrans. Il détecte automatiquement les comportements suspects tels que la présence d'une tierce personne, l'usage de documents interdits ou le changement d'onglet, assurant une équité totale durant les sessions BEPC/BAC.
                        </p>
</div>
</div>

<div className="lg:col-span-7 flex flex-col gap-4">
<div className="bg-white border border-outline-variant rounded-xl p-4 md:p-6 shadow-sm">
<h3 className="font-headline font-semibold text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">tune</span> 
                            Contrôles de Surveillance
                        </h3>
<div className="space-y-4">

<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">videocam</span>
</div>
<div>
<p className="font-semibold text-on-surface">Surveillance Vidéo</p>
<p className="text-xs text-on-surface-variant">Détection de visage, présence de tiers</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span className="material-symbols-outlined">mic</span>
</div>
<div>
<p className="font-semibold text-on-surface">Surveillance Audio</p>
<p className="text-xs text-on-surface-variant">Détection de voix, bruits suspects</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">lock</span>
</div>
<div>
<p className="font-semibold text-on-surface">Verrouillage du Navigateur</p>
<p className="text-xs text-on-surface-variant">Empêche de quitter l'onglet</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>

<div className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-lg hover:border-primary/50 transition-colors group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined">screenshot</span>
</div>
<div>
<p className="font-semibold text-on-surface">Capture d'Écran Aléatoire</p>
<p className="text-xs text-on-surface-variant">Photos à intervalles irréguliers</p>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-6">

<div className="bg-white border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col gap-6">
<h3 className="font-headline font-semibold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">psychology</span> 
                            Seuil de Tolérance IA
                        </h3>
<div className="relative pt-6">
<input className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-secondary" id="sensitivity-slider" max={3} min={1} step={1} type="range" value="2" />
<div className="flex justify-between text-xs font-medium text-on-surface-variant mt-4">
<span className="flex flex-col items-center">
<span className="w-1 h-2 bg-outline-variant mb-1"></span>
                                    Moderate
                                </span>
<span className="flex flex-col items-center">
<span className="w-1 h-2 bg-outline-variant mb-1"></span>
                                    Strict
                                </span>
<span className="flex flex-col items-center">
<span className="w-1 h-2 bg-outline-variant mb-1"></span>
                                    Extreme
                                </span>
</div>
</div>
<div className="p-4 bg-secondary-fixed/30 border-l-4 border-secondary rounded-r-lg" id="sensitivity-description">
<p className="text-sm text-on-secondary-fixed-variant font-medium">Mode Strict Activé</p>
<p className="text-xs text-on-secondary-fixed-variant mt-1">L'IA signalera immédiatement tout détournement de regard ou mouvement de tête suspect.</p>
</div>
</div>

<div className="bg-primary-container/10 border border-primary-container/20 rounded-xl p-6 flex-1 flex flex-col items-center justify-center text-center gap-4">
<div className="relative">
<div className="absolute -inset-4 bg-primary/5 rounded-full animate-pulse"></div>
<span className="material-symbols-outlined text-6xl text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>add_moderator</span>
</div>
<p className="text-primary font-semibold">Le système est prêt</p>
<p className="text-sm text-on-surface-variant px-4">Toutes les modifications seront appliquées instantanément aux sessions d'examen actives une fois enregistrées.</p>
</div>
</div>

<div className="lg:col-span-12 flex justify-end items-center gap-4 pt-4">
<button className="px-6 py-3 border border-outline text-on-surface rounded-lg font-medium hover:bg-surface-container-low transition-colors active:scale-95">
                        Annuler
                    </button>
<button className="px-8 py-3 bg-secondary text-on-secondary rounded-lg font-bold shadow-md hover:bg-secondary-container transition-all active:scale-95 flex items-center gap-2">
<span className="material-symbols-outlined">save</span>
                        Enregistrer les paramètres
                    </button>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-surface border-t border-outline-variant z-50 shadow-lg rounded-t-xl">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-[10px] font-semibold mt-0.5">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>tune</span>
<span className="font-label text-[10px] font-bold mt-0.5">Config</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">visibility</span>
<span className="font-label text-[10px] font-semibold mt-0.5">Monitor</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
<span className="material-symbols-outlined">warning</span>
<span className="font-label text-[10px] font-semibold mt-0.5">Alertes</span>
</a>
</nav>
<script>
        const slider = document.getElementById('sensitivity-slider');
        const desc = document.getElementById('sensitivity-description');

        const states = &#123;
            '1': &#123;
                title: 'Mode Modéré',
                text: 'L\'IA n\'alerte que sur des anomalies majeures (plusieurs visages, absence prolongée).',
                color: 'bg-on-tertiary-container/20',
                border: 'border-on-tertiary-container'
            &#125;,
            '2': &#123;
                title: 'Mode Strict',
                text: 'L\'IA signalera immédiatement tout détournement de regard ou mouvement de tête suspect.',
                color: 'bg-secondary-fixed/30',
                border: 'border-secondary'
            &#125;,
            '3': &#123;
                title: 'Mode Extreme',
                text: 'Tolérance zéro. La moindre déviation sonore ou visuelle entraîne un blocage immédiat de l\'examen.',
                color: 'bg-error-container/30',
                border: 'border-error'
            &#125;
        &#125;;

        slider.addEventListener('input', (e) =&gt; &#123;
            const val = e.target.value;
            const state = states[val];
            
            desc.className = `p-4 $&#123;state.color&#125; border-l-4 $&#123;state.border&#125; rounded-r-lg transition-all duration-300`;
            desc.innerHTML = `
                &lt;p class="text-sm font-bold text-on-surface"&gt;$&#123;state.title&#125;&lt;/p&gt;
                &lt;p class="text-xs text-on-surface-variant mt-1"&gt;$&#123;state.text&#125;&lt;/p&gt;
            `;
        &#125;);
    </script>

    </div>
  );
}
