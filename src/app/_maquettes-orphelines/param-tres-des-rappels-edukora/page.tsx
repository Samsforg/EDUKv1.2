import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Rappels de Révision" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background border-b border-outline-variant flex justify-between items-center px-margin-mobile h-16 w-full">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-272.png" alt="A portrait of a confident West African student smiling, wearing a clean school uniform. The lighting is soft and professional, set against a blurred academic library background with books. The style is modern, corporate, and trustworthy, using a light color palette consistent with the Edukora design system." />
</div>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tight">Edukora</h1>
</div>
<button className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container-low transition-colors p-2 rounded-full active:scale-95 duration-100" data-icon="notifications">
            notifications
        </button>
</header>

<main className="flex-grow pt-20 pb-28 px-margin-mobile">

<section className="mb-stack-lg">
<div className="flex items-center gap-2 text-primary mb-2">
<button className="material-symbols-outlined" data-icon="arrow_back">arrow_back</button>
<span className="font-label-sm text-label-sm">Retour au profil</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface mb-2">Rappels de Révision</h2>
<p className="text-on-surface-variant text-label-sm">Gérez vos notifications pour rester régulier dans vos révisions du BAC/BEPC.</p>
</section>

<div className="bg-surface border border-outline-variant rounded-xl p-stack-md mb-stack-md flex justify-between items-center shadow-sm">
<div>
<h3 className="font-label-sm text-label-sm font-bold text-on-surface">Activer les rappels</h3>
<p className="text-xs text-on-surface-variant">Recevoir des notifications sur cet appareil</p>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked={true} className="sr-only peer" type="checkbox" />
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
</label>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">

<div className="bg-surface border border-outline-variant rounded-xl p-stack-md">
<h3 className="font-label-sm text-label-sm font-bold text-on-surface mb-4">Fréquence &amp; Heure</h3>
<div className="space-y-4">
<div>
<label className="block text-xs font-semibold text-on-surface-variant mb-2">Fréquence</label>
<div className="flex gap-2">
<button className="flex-1 py-2 px-3 rounded-lg border border-primary bg-primary-container text-primary font-label-xs text-label-xs">Quotidien</button>
<button className="flex-1 py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant font-label-xs text-label-xs hover:bg-surface-container-low transition-colors">Hebdo</button>
<button className="flex-1 py-2 px-3 rounded-lg border border-outline-variant text-on-surface-variant font-label-xs text-label-xs hover:bg-surface-container-low transition-colors">Perso</button>
</div>
</div>
<div>
<label className="block text-xs font-semibold text-on-surface-variant mb-2">Heure du rappel</label>
<div className="relative">
<input className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all" type="time" value="18:30" />
</div>
</div>
</div>
</div>

<div className="bg-surface border border-outline-variant rounded-xl p-stack-md">
<h3 className="font-label-sm text-label-sm font-bold text-on-surface mb-4">Sujets à privilégier</h3>
<div className="space-y-3">
<label className="flex items-center p-3 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input checked={true} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<div className="ml-3 flex items-center gap-2">
<span className="material-symbols-outlined text-primary" data-icon="functions">functions</span>
<span className="text-body-md font-medium">Mathématiques</span>
</div>
</label>
<label className="flex items-center p-3 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input checked={true} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<div className="ml-3 flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="biotech">biotech</span>
<span className="text-body-md font-medium">Physique-Chimie</span>
</div>
</label>
<label className="flex items-center p-3 rounded-lg border border-outline-variant cursor-pointer hover:bg-surface-container-low transition-colors">
<input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
<div className="ml-3 flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary" data-icon="eco">eco</span>
<span className="text-body-md font-medium">SVT</span>
</div>
</label>
</div>
</div>
</div>

<section className="mt-stack-lg">
<h3 className="font-label-sm text-label-sm font-bold text-on-surface-variant mb-4 uppercase tracking-wider">Aperçu de la notification</h3>
<div className="bg-surface-container border border-outline-variant rounded-2xl p-4 shadow-sm relative overflow-hidden">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
<span className="material-symbols-outlined" data-icon="school">school</span>
</div>
<div className="flex-grow">
<div className="flex justify-between items-center mb-1">
<span className="text-xs font-bold text-primary">EDUKORA</span>
<span className="text-[10px] text-on-surface-variant">Maintenant</span>
</div>
<p className="text-sm font-semibold text-on-surface leading-tight">C'est l'heure de votre session de Maths !</p>
<p className="text-xs text-on-surface-variant mt-1">3 questions vous attendent pour valider vos acquis du jour.</p>
</div>
</div>
<div className="mt-3 flex gap-2">
<div className="h-1 flex-grow bg-outline-variant rounded-full overflow-hidden">
<div className="h-full bg-primary w-2/3"></div>
</div>
</div>
</div>
</section>

<div className="mt-stack-lg">
<button className="w-full bg-primary text-on-primary py-4 rounded-xl font-bold text-body-lg shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
<span className="material-symbols-outlined" data-icon="save">save</span>
                Sauvegarder les réglages
            </button>
<p className="text-center text-xs text-on-surface-variant mt-4">Vous recevrez votre prochain rappel demain à 18:30.</p>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-background shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe w-full px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant group hover:bg-surface-container-high transition-colors p-2 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant group hover:bg-surface-container-high transition-colors p-2 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant group relative hover:bg-surface-container-high transition-colors p-2 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="favorite">favorite</span>
<span className="font-label-xs text-label-xs">Favoris</span>
<span className="absolute top-1 -right-1 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-surface">3</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant group hover:bg-surface-container-high transition-colors p-2 rounded-lg" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined active-nav-pill" data-icon="person">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Micro-interactions for frequency buttons
        const freqButtons = document.querySelectorAll('.flex-1.py-2.px-3');
        freqButtons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                freqButtons.forEach(b =&gt; &#123;
                    b.classList.remove('bg-primary-container', 'text-primary', 'border-primary');
                    b.classList.add('border-outline-variant', 'text-on-surface-variant');
                &#125;);
                btn.classList.add('bg-primary-container', 'text-primary', 'border-primary');
                btn.classList.remove('border-outline-variant', 'text-on-surface-variant');
            &#125;);
        &#125;);

        // Simple save feedback
        document.querySelector('button.bg-primary').addEventListener('click', function() &#123;
            const originalText = this.innerHTML;
            this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin" data-icon="sync"&gt;sync&lt;/span&gt; Enregistrement...';
            this.classList.add('opacity-80');
            
            setTimeout(() =&gt; &#123;
                this.innerHTML = '&lt;span class="material-symbols-outlined" data-icon="check_circle"&gt;check_circle&lt;/span&gt; Enregistré !';
                this.classList.replace('bg-primary', 'bg-on-tertiary-container');
                this.classList.replace('text-on-primary', 'text-tertiary');
                
                setTimeout(() =&gt; &#123;
                    this.innerHTML = originalText;
                    this.classList.replace('bg-on-tertiary-container', 'bg-primary');
                    this.classList.replace('text-tertiary', 'text-on-primary');
                    this.classList.remove('opacity-80');
                &#125;, 2000);
            &#125;, 1000);
        &#125;);
    </script>

    </div>
  );
}
