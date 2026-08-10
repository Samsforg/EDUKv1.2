import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Profil Etudiant" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed overflow-hidden flex items-center justify-center">
<img className="w-full h-full object-cover" src="/images/ecran-288.png" alt="A professional studio portrait of a young Ivorian student with a confident and friendly expression. The lighting is bright and clean, typical of a modern corporate educational platform. The background is a soft, out-of-focus academic setting with neutral blue tones. High-quality digital photography with sharp focus on the student's face." />
</div>
<h1 className="font-headline-md text-headline-md text-primary tracking-tight">Edukora</h1>
</div>
<button className="material-symbols-outlined text-primary hover:bg-surface-container-low p-2 rounded-full transition-colors active:scale-95 duration-100">
            notifications
        </button>
</header>

<main className="mt-20 px-margin-mobile">

<section className="mb-stack-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
<div className="flex flex-col gap-1">
<span className="font-label-sm text-label-sm text-secondary font-semibold">Bienvenue, Koffi</span>
<h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Votre progression</h2>
</div>
</section>

<div className="bento-grid mb-stack-lg">

<div className="col-span-2 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm">
<div className="flex justify-between items-start mb-4">
<div>
<p className="font-label-sm text-label-sm text-on-surface-variant">Score Global</p>
<h3 className="font-headline-md text-headline-md text-primary">84%</h3>
</div>
<div className="bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded-lg flex items-center gap-1">
<span className="material-symbols-outlined text-[16px]" style={{"fontVariationSettings":"'FILL' 1"}}>trending_up</span>
<span className="font-label-xs text-label-xs">+5%</span>
</div>
</div>
<div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full rounded-full transition-all duration-1000 w-[84%]"></div>
</div>
<p className="mt-3 font-label-xs text-label-xs text-on-surface-variant italic">Top 5% des candidats BAC 2024</p>
</div>

<div className="bg-primary-container p-4 rounded-xl flex flex-col justify-between aspect-square">
<span className="material-symbols-outlined text-on-primary-container">schedule</span>
<div>
<h4 className="font-headline-md text-headline-md text-on-primary-container">42h</h4>
<p className="font-label-xs text-label-xs text-primary-fixed">Étudiées ce mois</p>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-xl flex flex-col justify-between aspect-square">
<span className="material-symbols-outlined text-secondary">assignment_turned_in</span>
<div>
<h4 className="font-headline-md text-headline-md text-on-surface">128</h4>
<p className="font-label-xs text-label-xs text-on-surface-variant">Quiz terminés</p>
</div>
</div>
</div>

<section className="mb-stack-lg">
<div className="flex justify-between items-center mb-stack-sm">
<h3 className="font-label-sm text-label-sm text-on-surface-variant font-bold uppercase tracking-wider">Badges mérités</h3>
<button className="text-primary font-label-xs text-label-xs">Voir tout</button>
</div>
<div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
<div className="flex-shrink-0 flex flex-col items-center gap-2">
<div className="w-16 h-16 rounded-full bg-secondary-fixed border-2 border-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-on-secondary-fixed text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
</div>
<span className="font-label-xs text-label-xs text-center">Majore</span>
</div>
<div className="flex-shrink-0 flex flex-col items-center gap-2">
<div className="w-16 h-16 rounded-full bg-tertiary-fixed-dim border-2 border-on-tertiary-fixed-variant flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-fixed text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>bolt</span>
</div>
<span className="font-label-xs text-label-xs text-center">Rapide</span>
</div>
<div className="flex-shrink-0 flex flex-col items-center gap-2 opacity-40 grayscale">
<div className="w-16 h-16 rounded-full bg-surface-container-high border-2 border-outline flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant text-3xl">military_tech</span>
</div>
<span className="font-label-xs text-label-xs text-center">Elite</span>
</div>
<div className="flex-shrink-0 flex flex-col items-center gap-2 opacity-40 grayscale">
<div className="w-16 h-16 rounded-full bg-surface-container-high border-2 border-outline flex items-center justify-center">
<span className="material-symbols-outlined text-on-surface-variant text-3xl">auto_awesome</span>
</div>
<span className="font-label-xs text-label-xs text-center">Polyglotte</span>
</div>
</div>
</section>

<section className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant mb-stack-lg">
<h3 className="font-label-sm text-label-sm text-on-surface font-bold mb-4">Objectif de l'examen</h3>
<div className="flex flex-col gap-3">

<label className="relative flex items-center p-4 bg-surface rounded-xl border border-outline-variant cursor-pointer active:scale-[0.98] transition-transform">
<input className="hidden peer" name="exam_target" type="radio" />
<div className="flex-grow">
<span className="font-body-md text-body-md text-on-surface font-semibold block">BEPC</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Brevet d'Études du Premier Cycle</span>
</div>
<div className="w-6 h-6 border-2 border-outline rounded-full peer-checked:border-primary peer-checked:bg-primary flex items-center justify-center">
<div className="w-2 h-2 bg-white rounded-full"></div>
</div>
</label>

<label className="relative flex items-center p-4 bg-surface rounded-xl border-2 border-primary cursor-pointer active:scale-[0.98] transition-transform">
<input checked={true} className="hidden peer" name="exam_target" type="radio" />
<div className="flex-grow">
<span className="font-body-md text-body-md text-on-surface font-semibold block">BAC (Séries A, C, D)</span>
<span className="font-label-xs text-label-xs text-on-surface-variant">Baccalauréat de l'Enseignement Secondaire</span>
</div>
<div className="w-6 h-6 border-2 border-primary bg-primary rounded-full flex items-center justify-center">
<div className="w-2 h-2 bg-white rounded-full"></div>
</div>
</label>
</div>
</section>

<section className="space-y-2">
<button className="w-full flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-surface-container-high transition-colors text-on-surface">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">person</span>
<span className="font-body-md text-body-md">Informations personnelles</span>
</div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</button>
<button className="w-full flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-surface-container-high transition-colors text-on-surface">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">security</span>
<span className="font-body-md text-body-md">Sécurité et Confidentialité</span>
</div>
<span className="material-symbols-outlined text-outline">chevron_right</span>
</button>
<button className="w-full flex items-center justify-between p-4 bg-surface rounded-xl hover:bg-surface-container-high transition-colors text-error">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined">logout</span>
<span className="font-body-md text-body-md">Se déconnecter</span>
</div>
</button>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-background shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe w-full px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>

<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200" href="#"><div className="relative">
<span className="material-symbols-outlined">bookmark</span>
<div className="absolute -top-1 -right-1 w-4 h-4 bg-error rounded-full border border-surface flex items-center justify-center"><span className="text-[10px] font-bold text-white leading-none">3</span></div>
</div>
<span className="font-label-xs text-label-xs">Favoris</span></a><a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple Micro-interactions
        document.querySelectorAll('label').forEach(label =&gt; &#123;
            label.addEventListener('click', () =&gt; &#123;
                // Visual feedback for selection
                document.querySelectorAll('label').forEach(l =&gt; &#123;
                    l.classList.remove('border-2', 'border-primary');
                    l.classList.add('border', 'border-outline-variant');
                    const indicator = l.querySelector('.w-6');
                    if(indicator) &#123;
                        indicator.classList.remove('border-primary', 'bg-primary');
                        indicator.classList.add('border-outline');
                    &#125;
                &#125;);
                label.classList.add('border-2', 'border-primary');
                label.classList.remove('border-outline-variant');
                const indicator = label.querySelector('.w-6');
                if(indicator) &#123;
                    indicator.classList.add('border-primary', 'bg-primary');
                    indicator.classList.remove('border-outline');
                &#125;
            &#125;);
        &#125;);

        // Pull-to-refresh simulation or profile update feel
        window.addEventListener('load', () =&gt; &#123;
            console.log('Edukora Profile Loaded');
        &#125;);
    </script>

    </div>
  );
}
