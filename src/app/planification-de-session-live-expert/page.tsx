import type { Metadata } from "next";

export const metadata: Metadata = { title: "Programmer un Live | Edukora Pro" };

export default function Page() {
  return (
    <div className="text-on-background min-h-screen pb-20 md:pb-0" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container flex justify-between items-center px-4 h-16 w-full max-w-full">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 transition-transform">menu</button>
<h1 className="font-headline text-display-lg-mobile font-bold text-on-primary">Edukora Pro</h1>
</div>
<div className="flex items-center gap-3">
<span className="hidden md:block font-label text-label-sm">M. Kouassi</span>
<div className="w-10 h-10 rounded-full border-2 border-on-primary/20 overflow-hidden">
<img className="w-full h-full object-cover" src="/images/ecran-280.png" alt="A professional headshot of a middle-aged Ivorian teacher wearing a smart navy blue suit and glasses, smiling confidently against a soft blurred classroom background. The lighting is bright and academic, reflecting the professional and authoritative Edukora brand identity." />
</div>
</div>
</header>
<div className="flex pt-16 min-h-screen">

<aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-72 bg-surface dark:bg-surface-dim border-r border-outline-variant py-4 sticky top-16">
<nav className="flex flex-col gap-1">
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-colors" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 flex items-center px-4 py-3 gap-3" href="#">
<span className="material-symbols-outlined">calendar_add_on</span>
<span className="font-body text-body-md">Planifier la session</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-colors" href="#">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-body text-body-md">Sessions en direct</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-colors" href="#">
<span className="material-symbols-outlined">attachment</span>
<span className="font-body text-body-md">Resources</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 flex items-center px-4 py-3 gap-3 transition-colors mt-auto" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</a>
</nav>
<div className="px-6 py-4 mt-4 border-t border-outline-variant">
<p className="text-xs font-bold uppercase tracking-widest text-outline">Statut Expert</p>
<div className="mt-2 flex items-center gap-2 text-tertiary">
<span className="w-2 h-2 rounded-full bg-tertiary"></span>
<span className="text-sm font-medium">En ligne</span>
</div>
</div>
</aside>

<main className="flex-1 p-4 md:p-8 lg:p-12 max-w-5xl mx-auto w-full">
<header className="mb-8">
<nav className="flex items-center gap-2 text-outline text-sm mb-2">
<span>Tableau de bord Expert</span>
<span className="material-symbols-outlined text-sm">chevron_right</span>
<span className="text-primary font-medium">Programmer un Live</span>
</nav>
<h2 className="font-headline text-headline-md md:text-display-lg text-primary font-bold">Programmer un Live</h2>
<p className="text-on-surface-variant mt-1">Créez une session interactive pour vos élèves du BAC.</p>
</header>

<form className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 space-y-6">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">info</span>
                            Détails de la Session
                        </h3>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="title">Titre de la session</label>
<input className="w-full bg-surface-container-low border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 text-body-md transition-all" id="title" placeholder="ex: Révision : Probabilités et Statistiques" type="text" />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium text-on-surface-variant mb-2">Matière</label>
<div className="flex flex-wrap gap-2">
<button className="px-4 py-2 rounded-full border border-primary text-primary bg-primary-fixed font-medium text-sm transition-all" type="button">Maths</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all font-medium text-sm" type="button">Physique</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all font-medium text-sm" type="button">SVT</button>
<button className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all font-medium text-sm" type="button">Chimie</button>
</div>
</div>
<div>
<label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="level">Niveau Cible</label>
<select className="w-full bg-surface-container-low border-outline-variant rounded-lg focus:ring-2 focus:ring-primary focus:border-primary px-4 py-3 text-body-md transition-all" id="level">
<option>BAC Série C</option>
<option>BAC Série D</option>
<option>BAC Série E</option>
<option>BEPC</option>
</select>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">attachment</span>
                            Ressources Pédagogiques
                        </h3>
<div className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center bg-surface-container-low/50 group hover:border-primary hover:bg-primary-fixed/20 transition-all cursor-pointer">
<span className="material-symbols-outlined text-4xl text-outline group-hover:text-primary mb-2 transition-colors">cloud_upload</span>
<p className="text-body-md font-medium text-on-surface">Glissez-déposez vos fichiers ici</p>
<p className="text-label-xs text-on-surface-variant mt-1">PDF, DOCX, ou PNG (Max 10MB)</p>
<button className="mt-4 px-6 py-2 bg-primary text-on-primary rounded-lg font-label text-label-sm font-semibold active:scale-95 transition-transform" type="button">Parcourir les fichiers</button>
</div>
<div className="mt-4 space-y-2">
<div className="flex items-center justify-between p-3 bg-surface-container-high rounded-lg border border-outline-variant">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-error">picture_as_pdf</span>
<span className="text-sm font-medium">Exercices_Probabilites_V1.pdf</span>
</div>
<button className="material-symbols-outlined text-on-surface-variant hover:text-error transition-colors" type="button">delete</button>
</div>
</div>
</div>
</div>

<div className="lg:col-span-4 space-y-6">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">schedule</span>
                            Planification
                        </h3>
<div className="space-y-4">
<div>
<label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="date">Date de la session</label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">calendar_today</span>
<input className="w-full pl-11 bg-surface-container-low border-outline-variant rounded-lg focus:ring-2 focus:ring-primary px-4 py-3 text-body-md" id="date" type="date" />
</div>
</div>
<div className="grid grid-cols-2 gap-4">
<div>
<label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="time">Heure</label>
<input className="w-full bg-surface-container-low border-outline-variant rounded-lg focus:ring-2 focus:ring-primary px-4 py-3 text-body-md" id="time" type="time" value="16:00" />
</div>
<div>
<label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="duration">Durée (min)</label>
<input className="w-full bg-surface-container-low border-outline-variant rounded-lg focus:ring-2 focus:ring-primary px-4 py-3 text-body-md" id="duration" step={15} type="number" value="60" />
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<h3 className="font-headline text-lg font-semibold text-on-surface mb-4 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">visibility</span>
                            Visibilité
                        </h3>
<div className="space-y-3">
<label className="flex items-center gap-3 p-3 border border-primary bg-primary-fixed/30 rounded-xl cursor-pointer">
<input checked={true} className="text-primary focus:ring-primary w-5 h-5" name="visibility" type="radio" />
<div>
<span className="block font-semibold text-primary text-sm">Public</span>
<span className="text-xs text-on-surface-variant">Visible par tous les élèves Edukora.</span>
</div>
</label>
<label className="flex items-center gap-3 p-3 border border-outline-variant rounded-xl cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="text-primary focus:ring-primary w-5 h-5" name="visibility" type="radio" />
<div>
<span className="block font-semibold text-on-surface text-sm">Commune-only</span>
<span className="text-xs text-on-surface-variant">Seulement pour votre établissement.</span>
</div>
</label>
</div>
</div>
<div className="space-y-3">
<button className="w-full py-4 bg-secondary-container text-on-secondary-container font-headline text-lg font-bold rounded-xl shadow-lg shadow-secondary-container/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>send</span>
                            Publier la Session
                        </button>
<button className="w-full py-3 text-primary font-semibold hover:bg-primary-fixed/20 rounded-xl transition-all" type="button">Enregistrer en brouillon</button>
</div>
</div>
</form>
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-2 pb-safe bg-surface-container-lowest dark:bg-surface-dim border-t border-outline-variant shadow-md z-50">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>add_circle</span>
<span className="font-label text-label-xs">Planifier</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">videocam</span>
<span className="font-label text-label-xs">En direct</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-90 transition-transform" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple micro-interaction for subject chips
        const subjectChips = document.querySelectorAll('button[type="button"].rounded-full');
        subjectChips.forEach(chip =&gt; &#123;
            if (chip.textContent === 'Maths') return; // Skip the already active one
            chip.addEventListener('click', () =&gt; &#123;
                subjectChips.forEach(c =&gt; &#123;
                    c.classList.remove('bg-primary-fixed', 'text-primary', 'border-primary');
                    c.classList.add('text-on-surface-variant', 'border-outline-variant');
                &#125;);
                chip.classList.add('bg-primary-fixed', 'text-primary', 'border-primary');
                chip.classList.remove('text-on-surface-variant', 'border-outline-variant');
            &#125;);
        &#125;);

        // Form submission handling
        const form = document.querySelector('form');
        form.addEventListener('submit', (e) =&gt; &#123;
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            btn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;progress_activity&lt;/span&gt; Publication...';
            btn.disabled = true;
            
            setTimeout(() =&gt; &#123;
                btn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Publié avec succès !';
                btn.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                btn.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
                
                setTimeout(() =&gt; &#123;
                    btn.innerHTML = originalContent;
                    btn.classList.replace('bg-tertiary-container', 'bg-secondary-container');
                    btn.classList.replace('text-on-tertiary-container', 'text-on-secondary-container');
                    btn.disabled = false;
                &#125;, 3000);
            &#125;, 1500);
        &#125;);
    </script>

    </div>
  );
}
