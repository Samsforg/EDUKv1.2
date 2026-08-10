import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Programmer le Test Blanc" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 shadow-sm flex items-center justify-between px-8 h-16 w-full bg-primary text-on-primary">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-primary-container/20 transition-colors active:scale-95 duration-150 rounded-full">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline font-bold text-on-primary text-headline-md">Edukora Pro - Tests Blancs</h1>
</div>
<div className="flex items-center gap-6">
<nav className="hidden md:flex gap-6">
<a className="text-on-primary font-bold" href="#">Tableau de Bord</a>
<a className="text-on-primary-fixed-variant hover:text-on-primary transition-colors" href="#">Mes Classes</a>
<a className="text-on-primary-fixed-variant hover:text-on-primary transition-colors" href="#">Banque de Questions</a>
</nav>
<div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-on-primary/20">
<img className="object-cover w-full h-full" src="/images/ecran-281.png" alt="Close-up portrait of a professional African professor with glasses, smiling confidently. He is wearing a sharp navy blue blazer over a white shirt. The background is a softly blurred modern office interior with warm, natural lighting. The overall style is academic and authoritative, reflecting the reliability of the Edukora educational brand." />
</div>
</div>
</header>
<div className="flex pt-16 h-screen overflow-hidden">

<aside className="hidden lg:flex flex-col h-screen py-4 h-full w-72 rounded-r-xl bg-surface border-r border-outline-variant shadow-md">
<div className="px-6 pb-6 pt-2">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<div>
<p className="font-headline font-bold text-primary">Prof. Koffi</p>
<p className="text-body-md opacity-70">Lycée Classique</p>
</div>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de Bord</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-body text-body-md">Mes Classes</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 bg-secondary-container text-on-secondary-container font-semibold rounded-full" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>quiz</span>
<span className="font-body text-body-md">Tests Blancs</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-body text-body-md">Banque de Questions</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-all" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 hide-scrollbar">

<div className="max-w-4xl mx-auto mb-10">
<div className="relative flex justify-between items-center mb-2">
<div className="step-progress-line"></div>
<div className="step-progress-fill"></div>
<div className="relative z-10 flex flex-col items-center">
<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<span className="text-[10px] mt-1 font-bold text-primary">Structure</span>
</div>
<div className="relative z-10 flex flex-col items-center">
<div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-on-primary text-xs">
<span className="material-symbols-outlined text-[14px]">check</span>
</div>
<span className="text-[10px] mt-1 font-bold text-primary">Questions</span>
</div>
<div className="relative z-10 flex flex-col items-center">
<div className="w-6 h-6 rounded-full bg-primary ring-4 ring-primary-container ring-offset-2 flex items-center justify-center text-on-primary text-xs">3</div>
<span className="text-[10px] mt-1 font-bold text-primary">Programmation</span>
</div>
</div>
</div>

<div className="max-w-4xl mx-auto mb-8">
<h2 className="text-display-lg font-bold text-on-background mb-2">Configuration Finale &amp; Envoi</h2>
<p className="text-on-surface-variant body-lg">Revoyez les détails et planifiez le lancement officiel du Test Blanc national.</p>
</div>

<div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">

<div className="md:col-span-2 space-y-6">

<section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-primary">event_available</span>
<h3 className="font-headline font-bold text-headline-md">Date et Heure</h3>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div>
<label className="block text-label-xs font-bold text-outline uppercase mb-2">Date de l'examen</label>
<div className="relative">
<input className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary p-3 pl-10 text-body-md font-semibold" type="date" value="2024-05-15" />
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">calendar_today</span>
</div>
</div>
<div>
<label className="block text-label-xs font-bold text-outline uppercase mb-2">Heure de début</label>
<div className="relative">
<input className="w-full bg-surface-container rounded-lg border-none focus:ring-2 focus:ring-primary p-3 pl-10 text-body-md font-semibold" type="time" value="08:00" />
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">schedule</span>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl border border-outline-variant p-6 shadow-sm">
<div className="flex items-center gap-2 mb-6">
<span className="material-symbols-outlined text-primary">school</span>
<h3 className="font-headline font-bold text-headline-md">Sélection des Classes</h3>
</div>
<div className="flex flex-wrap gap-3">

<label className="relative flex items-center gap-2 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl cursor-pointer border-2 border-primary transition-all">
<input checked={true} className="hidden peer" type="checkbox" />
<span className="material-symbols-outlined text-sm">check_circle</span>
<span className="font-bold text-body-md">Terminale C1</span>
</label>
<label className="relative flex items-center gap-2 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl cursor-pointer border-2 border-primary transition-all">
<input checked={true} className="hidden peer" type="checkbox" />
<span className="material-symbols-outlined text-sm">check_circle</span>
<span className="font-bold text-body-md">Terminale D2</span>
</label>
<label className="relative flex items-center gap-2 px-4 py-3 bg-surface-container-high text-on-surface-variant rounded-xl cursor-pointer border-2 border-transparent hover:border-outline-variant transition-all">
<input className="hidden peer" type="checkbox" />
<span className="material-symbols-outlined text-sm">add</span>
<span className="font-bold text-body-md">Terminale D1</span>
</label>
<label className="relative flex items-center gap-2 px-4 py-3 bg-surface-container-high text-on-surface-variant rounded-xl cursor-pointer border-2 border-transparent hover:border-outline-variant transition-all">
<input className="hidden peer" type="checkbox" />
<span className="material-symbols-outlined text-sm">add</span>
<span className="font-bold text-body-md">1ère C2</span>
</label>
</div>
<p className="mt-4 text-label-sm text-outline">Le test sera automatiquement partagé sur les tablettes des élèves de ces classes le jour J.</p>
</section>

<section className="bg-surface-container rounded-xl p-6 border border-outline-variant/50">
<h4 className="font-headline font-bold text-body-lg mb-4">Aperçu du Test : Mathématiques (BAC)</h4>
<div className="flex items-center justify-between text-body-md border-b border-outline-variant/30 py-2">
<span className="text-on-surface-variant">Nombre de questions</span>
<span className="font-bold">45 QCM + 2 Exercices</span>
</div>
<div className="flex items-center justify-between text-body-md border-b border-outline-variant/30 py-2">
<span className="text-on-surface-variant">Durée totale</span>
<span className="font-bold">4 Heures</span>
</div>
<div className="flex items-center justify-between text-body-md py-2">
<span className="text-on-surface-variant">Coefficient</span>
<span className="font-bold">5</span>
</div>
</section>
</div>

<div className="space-y-6">

<section className="bg-primary text-on-primary rounded-xl p-6 shadow-lg relative overflow-hidden">
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-[120px]" style={{"fontVariationSettings":"'FILL' 1"}}>security</span>
</div>
<div className="relative z-10">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-on-primary-container">shield_with_heart</span>
<h3 className="font-headline font-bold text-body-lg">Supervision IA</h3>
</div>
<p className="text-label-sm text-on-primary/80 mb-6">Activez la surveillance intelligente pour détecter les comportements suspects et les tentatives de triche.</p>
<div className="flex items-center justify-between p-4 bg-on-primary/10 rounded-lg">
<span className="font-bold">Proctoring IA</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-primary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
</label>
</div>
<div className="mt-4 flex flex-col gap-2">
<div className="flex items-center gap-2 text-[10px]">
<span className="material-symbols-outlined text-[14px]">videocam</span>
<span>Analyse faciale continue</span>
</div>
<div className="flex items-center gap-2 text-[10px]">
<span className="material-symbols-outlined text-[14px]">screen_lock_landscape</span>
<span>Verrouillage du navigateur</span>
</div>
</div>
</div>
</section>

<div className="bg-surface-container-highest rounded-xl p-6">
<h4 className="font-bold text-label-xs uppercase text-outline mb-3">Statut actuel</h4>
<div className="flex items-center gap-3">
<div className="w-3 h-3 rounded-full bg-secondary-container animate-pulse"></div>
<span className="font-bold text-body-md text-secondary">Prêt pour Publication</span>
</div>
</div>

<div className="rounded-xl overflow-hidden h-48 relative border border-outline-variant shadow-sm">
<img className="object-cover w-full h-full" src="/images/ecran-282.png" alt="A futuristic classroom setting with African students sitting at clean, minimalist desks using glowing tablets for an exam. The lighting is crisp and blue-toned, symbolizing academic focus and technology. In the background, a large digital screen shows abstract data visualizations of student progress. The atmosphere is quiet, high-stakes, and professional." />
<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
<span className="text-white text-label-sm font-semibold italic">Propulsé par Edukora AI</span>
</div>
</div>
</div>
</div>
</main>
</div>

<footer className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-highest shadow-lg border-t border-outline-variant">
<div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
<div className="hidden sm:flex flex-col">
<span className="text-label-xs text-outline font-bold">MODE :</span>
<span className="text-body-md font-bold text-primary">SESSION NATIONALE</span>
</div>
<div className="flex gap-4 w-full sm:w-auto">
<button className="flex-1 sm:flex-none px-6 py-3 rounded-lg border border-outline font-bold text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95">
                    Enregistrer Brouillon
                </button>
<button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-secondary text-on-secondary font-bold shadow-md hover:brightness-110 active:scale-95 transition-all">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>send</span>
                    Publier et Programmer
                </button>
</div>
</div>

<nav className="md:hidden flex justify-around items-center px-4 py-2 w-full border-t border-outline-variant/30">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">visibility</span>
<span className="text-[10px] uppercase font-bold">Aperçu</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">edit_note</span>
<span className="text-[10px] uppercase font-bold">Éditeur</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">tune</span>
<span className="text-[10px] uppercase font-bold">Paramètres</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2 h-12 w-16">
<span className="material-symbols-outlined">send</span>
<span className="text-[10px] uppercase font-bold">Publier</span>
</div>
</nav>
</footer>

<div className="fixed inset-0 z-[100] bg-primary/90 flex items-center justify-center p-6 opacity-0 pointer-events-none transition-all duration-500" id="successOverlay">
<div className="text-center text-on-primary max-w-sm">
<div className="w-24 h-24 bg-tertiary-fixed text-on-tertiary-fixed rounded-full flex items-center justify-center mx-auto mb-6 scale-0 transition-transform duration-500 delay-300" id="successBadge">
<span className="material-symbols-outlined text-[60px]">check_circle</span>
</div>
<h2 className="text-display-lg font-bold mb-2">Examen Programmé !</h2>
<p className="body-md opacity-90 mb-8">Le Test Blanc a été publié avec succès. Il sera disponible pour Terminale C1 et D2 le 15 Mai à 08h00.</p>
<button className="w-full py-4 rounded-xl bg-white text-primary font-bold shadow-xl">Retour au tableau de bord</button>
</div>
</div>
<script>
        function publishExam() &#123;
            const overlay = document.getElementById('successOverlay');
            const badge = document.getElementById('successBadge');
            
            overlay.classList.remove('opacity-0', 'pointer-events-none');
            overlay.classList.add('opacity-100');
            
            setTimeout(() =&gt; &#123;
                badge.classList.remove('scale-0');
                badge.classList.add('scale-100');
            &#125;, 100);
        &#125;

        // Interactivity for class chips
        document.querySelectorAll('label input[type="checkbox"]').forEach(checkbox =&gt; &#123;
            checkbox.addEventListener('change', function() &#123;
                const parent = this.closest('label');
                const icon = parent.querySelector('.material-symbols-outlined');
                if (this.checked) &#123;
                    parent.classList.add('bg-primary-container', 'text-on-primary-container', 'border-primary');
                    parent.classList.remove('bg-surface-container-high', 'text-on-surface-variant', 'border-transparent');
                    icon.textContent = 'check_circle';
                &#125; else &#123;
                    parent.classList.remove('bg-primary-container', 'text-on-primary-container', 'border-primary');
                    parent.classList.add('bg-surface-container-high', 'text-on-surface-variant', 'border-transparent');
                    icon.textContent = 'add';
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
