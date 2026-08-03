import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Configuration Test Blanc" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col md:flex-row" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 h-16 w-full bg-primary shadow-sm">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary cursor-pointer hover:bg-primary-container/20 p-2 rounded-full transition-colors active:scale-95 duration-150">menu</span>
<h1 className="font-headline font-bold text-headline-md text-on-primary">Edukora Pro - Tests Blancs</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-4">
<span className="text-on-primary font-bold cursor-pointer transition-colors">Configuration</span>
<span className="text-on-primary-fixed-variant cursor-pointer hover:bg-primary-container/20 px-2 rounded transition-colors">Aperçu</span>
</div>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-079.png" alt="A professional portrait of an Ivorian professor in a clean, modern educational setting. The lighting is bright and high-key, emphasizing Academic Blue and National Orange accents in the background. The style is sharp, corporate, and trustworthy, reflecting the Edukora brand's academic authority and modern tech-integrated edge." />
</div>
</div>
</header>

<aside className="hidden md:flex flex-col h-screen py-4 bg-surface w-72 rounded-r-xl border-r border-outline-variant sticky top-0 pt-20">
<div className="px-6 mb-8 flex items-center gap-3">
<div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined">school</span>
</div>
<div>
<p className="font-headline font-bold text-primary">Prof. Koffi</p>
<p className="text-xs text-on-surface-variant">Lycée Classique d'Abidjan</p>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-highest rounded-full mx-2 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de Bord</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-highest rounded-full mx-2 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">groups</span>
<span className="font-body text-body-md">Mes Classes</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">quiz</span>
<span className="font-body text-body-md">Tests Blancs</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-highest rounded-full mx-2 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">history_edu</span>
<span className="font-body text-body-md">Banque de Questions</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-highest rounded-full mx-2 transition-all active:opacity-80" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
</aside>

<main className="flex-1 mt-16 pb-24 md:pb-8 px-4 md:px-8 py-8 overflow-y-auto">
<div className="max-w-4xl mx-auto">

<div className="mb-8 flex items-center justify-between">
<div>
<h2 className="text-2xl font-bold text-primary font-headline">Nouveau Test Blanc</h2>
<p className="text-on-surface-variant">Étape 1 : Paramètres Généraux</p>
</div>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">1</div>
<div className="w-12 h-1 bg-surface-container-highest rounded"></div>
<div className="w-8 h-8 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm">2</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-6">

<section className="md:col-span-8 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm space-y-6">
<div className="flex items-center gap-2 border-b border-outline-variant pb-4">
<span className="material-symbols-outlined text-primary">assignment</span>
<h3 className="font-semibold text-lg">Identification de l'épreuve</h3>
</div>
<div className="grid grid-cols-1 gap-6">
<div className="relative">
<label className="block text-sm font-medium text-on-surface-variant mb-1">Nom du Test Blanc</label>
<input className="w-full bg-surface border border-outline rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" placeholder="Ex: Test Blanc Régional #1" type="text" />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="relative">
<label className="block text-sm font-medium text-on-surface-variant mb-1">Année Officielle</label>
<select className="w-full bg-surface border border-outline rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none">
<option>2023 - 2024</option>
<option>2024 - 2025</option>
</select>
</div>
<div className="relative">
<label className="block text-sm font-medium text-on-surface-variant mb-1">Session</label>
<input className="w-full bg-surface border border-outline rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none" placeholder="Ex: Session Juin" type="text" />
</div>
</div>
</div>
</section>

<aside className="md:col-span-4 bg-primary-container/10 p-6 rounded-xl border border-primary/20 flex flex-col justify-between">
<div>
<h3 className="font-bold text-primary mb-4 flex items-center gap-2">
<span className="material-symbols-outlined">info</span> Recapitulatif
                        </h3>
<ul className="space-y-4 text-sm">
<li className="flex justify-between border-b border-primary/10 pb-2">
<span className="text-on-surface-variant">Niveau :</span>
<span className="font-semibold" id="recap-level">--</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-2">
<span className="text-on-surface-variant">Série :</span>
<span className="font-semibold" id="recap-series">--</span>
</li>
<li className="flex justify-between border-b border-primary/10 pb-2">
<span className="text-on-surface-variant">Durée :</span>
<span className="font-semibold" id="recap-duration">--</span>
</li>
</ul>
</div>
<div className="mt-8">
<div className="p-4 bg-white rounded-lg shadow-sm border border-outline-variant">
<p className="text-xs text-on-surface-variant italic leading-relaxed">
                                "Les paramètres définis ici détermineront la structure automatique du sujet généré par l'IA."
                            </p>
</div>
</div>
</aside>

<section className="md:col-span-12 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<div className="flex items-center gap-2 border-b border-outline-variant pb-4 mb-6">
<span className="material-symbols-outlined text-secondary">school</span>
<h3 className="font-semibold text-lg">Paramètres Académiques</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

<div className="space-y-2">
<span className="block text-sm font-medium text-on-surface-variant">Examen</span>
<div className="flex gap-2">
<button className="flex-1 py-3 px-4 rounded-lg border-2 border-primary bg-primary/5 text-primary font-bold transition-all">BAC</button>
<button className="flex-1 py-3 px-4 rounded-lg border-2 border-outline hover:border-primary transition-all font-bold text-on-surface-variant">BEPC</button>
</div>
</div>

<div className="space-y-2">
<label className="block text-sm font-medium text-on-surface-variant">Série / Filière</label>
<select className="w-full bg-surface border border-outline rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none">
<option>Série A1</option>
<option>Série A2</option>
<option>Série C</option>
<option selected={true}>Série D</option>
<option>Série E</option>
</select>
</div>

<div className="space-y-2">
<label className="block text-sm font-medium text-on-surface-variant">Matière</label>
<select className="w-full bg-surface border border-outline rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none">
<option>Mathématiques</option>
<option>Français</option>
<option>Philosophie</option>
<option>SVT</option>
<option>Physique-Chimie</option>
</select>
</div>

<div className="space-y-2">
<label className="block text-sm font-medium text-on-surface-variant">Coefficient</label>
<div className="flex items-center gap-3">
<input className="w-full bg-surface border border-outline rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary outline-none text-center font-bold" type="number" value="4" />
</div>
</div>
</div>
</section>

<section className="md:col-span-12 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary">schedule</span>
<h3 className="font-semibold text-lg">Durée de l'épreuve</h3>
</div>
<div className="flex flex-wrap gap-4">
<label className="flex items-center gap-3 px-6 py-4 border-2 border-outline rounded-xl cursor-pointer hover:bg-surface-container transition-all has-[:checked]:border-secondary-container has-[:checked]:bg-secondary-fixed/20 group">
<input className="hidden" name="duration" type="radio" value="2h" />
<span className="text-xl font-bold group-checked:text-secondary">2h 00</span>
</label>
<label className="flex items-center gap-3 px-6 py-4 border-2 border-outline rounded-xl cursor-pointer hover:bg-surface-container transition-all has-[:checked]:border-secondary-container has-[:checked]:bg-secondary-fixed/20 group">
<input className="hidden" name="duration" type="radio" value="3h" />
<span className="text-xl font-bold">3h 00</span>
</label>
<label className="flex items-center gap-3 px-6 py-4 border-2 border-secondary-container bg-secondary-fixed/20 rounded-xl cursor-pointer transition-all group">
<input checked={true} className="hidden" name="duration" type="radio" value="4h" />
<span className="text-xl font-bold text-secondary">4h 00</span>
</label>
<div className="flex items-center gap-3 px-6 py-4 border-2 border-dashed border-outline rounded-xl cursor-pointer hover:border-primary transition-all group">
<span className="material-symbols-outlined text-outline">add_circle</span>
<span className="text-sm font-medium text-outline">Personnalisé</span>
</div>
</div>
</section>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-highest shadow-lg border-t border-outline-variant flex justify-around items-center px-4 py-2 w-full md:hidden">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">visibility</span>
<span className="font-label text-label-xs uppercase tracking-wider">Aperçu</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2 h-12 w-16">
<span className="material-symbols-outlined">edit_note</span>
<span className="font-label text-label-xs uppercase tracking-wider">Éditeur</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">tune</span>
<span className="font-label text-label-xs uppercase tracking-wider">Paramètres</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">send</span>
<span className="font-label text-label-xs uppercase tracking-wider">Publier</span>
</div>
</nav>

<div className="fixed bottom-0 left-0 md:left-72 right-0 bg-white border-t border-outline-variant p-4 flex items-center justify-between md:px-8 z-40">
<div className="hidden md:block">
<p className="text-sm text-on-surface-variant">Enregistrement automatique...</p>
</div>
<div className="flex items-center gap-4 w-full md:w-auto">
<button className="flex-1 md:flex-none px-6 py-3 border border-outline rounded-lg font-semibold hover:bg-surface-container transition-all active:scale-95">
                Annuler
            </button>
<button className="flex-1 md:flex-none px-12 py-3 bg-secondary text-on-secondary rounded-lg font-bold shadow-md hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2">
                Suivant
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</div>
<script>
        // Micro-interactions for form updates
        document.querySelectorAll('select, input').forEach(el =&gt; &#123;
            el.addEventListener('change', function() &#123;
                // Here we could update the recap sidebar dynamically
                console.log('Parameter updated:', this.value);
            &#125;);
        &#125;);

        // Simple button active states toggle (simulation)
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function(e) &#123;
                if (this.textContent.includes('BAC') || this.textContent.includes('BEPC')) &#123;
                    e.preventDefault();
                    this.parentElement.querySelectorAll('button').forEach(b =&gt; &#123;
                        b.classList.remove('bg-primary/5', 'border-primary', 'text-primary');
                        b.classList.add('border-outline', 'text-on-surface-variant');
                    &#125;);
                    this.classList.add('bg-primary/5', 'border-primary', 'text-primary');
                    this.classList.remove('border-outline', 'text-on-surface-variant');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
