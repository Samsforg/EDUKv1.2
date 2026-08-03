import type { Metadata } from "next";

export const metadata: Metadata = { title: "Configuration des Bulletins - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen pb-20 md:pb-0 md:pl-72 pt-16" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 flex items-center justify-between px-4 md:px-8 h-16 bg-primary dark:bg-primary-container shadow-sm">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-on-primary cursor-pointer active:scale-95 transition-transform" data-icon="menu">menu</span>
<h1 className="font-headline text-2xl font-bold text-on-primary tracking-tight">Edukora Professeur</h1>
</div>
<div className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform">
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-076.png" alt="Close-up portrait of a professional African man with a friendly expression, wearing a crisp white shirt and a blue blazer. High-key natural lighting, academic setting background, clean corporate photography style consistent with an educational platform's primary blue and white theme." />
</div>
</div>
</header>

<aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 h-full w-72 rounded-r-xl bg-surface dark:bg-surface-dim border-r border-outline-variant dark:border-outline shadow-md">
<div className="p-6 mb-4">
<div className="flex items-center gap-4 mb-6">
<div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-primary" data-icon="school">school</span>
</div>
<div>
<p className="font-headline text-lg font-semibold text-primary">M. Kouassi</p>
<p className="text-xs text-on-surface-variant">Professeur Principal</p>
</div>
</div>
<div className="px-3 py-1 bg-surface-container-high rounded-lg inline-block mb-8">
<span className="text-xs font-semibold text-on-surface-variant">Année 2023-2024</span>
</div>
</div>
<nav className="flex-1 space-y-1">
<a className="flex items-center gap-3 py-3 px-4 mx-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="description">description</span>
<span className="font-body text-body-md">Génération Bulletins</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 bg-primary-container text-on-primary-container font-semibold rounded-full" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body text-body-md">Configuration</span>
</a>
<a className="flex items-center gap-3 py-3 px-4 mx-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="history">history</span>
<span className="font-body text-body-md">Archives</span>
</a>
</nav>
</aside>

<main className="p-4 md:p-8 max-w-6xl mx-auto">

<header className="mb-8">
<h2 className="font-headline text-3xl font-semibold text-primary mb-2">Paramètres des Bulletins</h2>
<p className="text-on-surface-variant">Configurez les coefficients et les seuils de performance pour la série <strong>BAC Série C</strong>.</p>
</header>
<form className="space-y-8">

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<label className="block text-label-sm font-semibold text-primary mb-3">Période d'évaluation</label>
<div className="flex gap-2">
<button className="flex-1 py-2 rounded-lg border-2 border-primary bg-primary/5 text-primary font-semibold" type="button">T1</button>
<button className="flex-1 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors" type="button">T2</button>
<button className="flex-1 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors" type="button">T3</button>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<label className="block text-label-sm font-semibold text-primary mb-3">Série Académique</label>
<div className="relative">
<select className="w-full h-12 pl-4 pr-10 rounded-lg border border-outline-variant focus:ring-2 focus:ring-primary focus:border-primary appearance-none bg-transparent">
<option>BAC Série C</option>
<option>BAC Série D</option>
<option>BAC Série A1</option>
<option>BAC Série A2</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant" data-icon="expand_more">expand_more</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm overflow-hidden">
<div className="bg-primary/5 px-6 py-4 border-b border-outline-variant flex items-center justify-between">
<h3 className="font-headline text-xl font-semibold text-primary flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="calculate">calculate</span>
                        Coefficients par Matière
                    </h3>
<span className="text-xs font-bold bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full uppercase">Série Scientifique</span>
</div>
<div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="p-4 rounded-lg bg-primary-fixed/30 border border-primary-fixed shadow-sm">
<div className="flex justify-between items-center mb-4">
<label className="font-semibold text-on-primary-fixed">Mathématiques</label>
<span className="material-symbols-outlined text-primary" data-icon="functions">functions</span>
</div>
<input className="w-full h-12 text-center text-xl font-bold bg-white rounded-lg border-2 border-primary focus:ring-0" type="number" value="5" />
</div>

<div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
<div className="flex justify-between items-center mb-4">
<label className="font-semibold text-on-surface">Physique-Chimie</label>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="science">science</span>
</div>
<input className="w-full h-12 text-center text-xl font-bold bg-white rounded-lg border border-outline focus:border-primary focus:ring-0" type="number" value="5" />
</div>

<div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
<div className="flex justify-between items-center mb-4">
<label className="font-semibold text-on-surface">SVT</label>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="biotech">biotech</span>
</div>
<input className="w-full h-12 text-center text-xl font-bold bg-white rounded-lg border border-outline focus:border-primary focus:ring-0" type="number" value="2" />
</div>

<div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
<div className="flex justify-between items-center mb-4">
<label className="font-semibold text-on-surface">Français</label>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="menu_book">menu_book</span>
</div>
<input className="w-full h-12 text-center text-xl font-bold bg-white rounded-lg border border-outline focus:border-primary focus:ring-0" type="number" value="3" />
</div>

<div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
<div className="flex justify-between items-center mb-4">
<label className="font-semibold text-on-surface">Anglais</label>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="language">language</span>
</div>
<input className="w-full h-12 text-center text-xl font-bold bg-white rounded-lg border border-outline focus:border-primary focus:ring-0" type="number" value="2" />
</div>

<div className="p-4 rounded-lg bg-surface-container-low border border-outline-variant">
<div className="flex justify-between items-center mb-4">
<label className="font-semibold text-on-surface">Philosophie</label>
<span className="material-symbols-outlined text-on-surface-variant" data-icon="psychology">psychology</span>
</div>
<input className="w-full h-12 text-center text-xl font-bold bg-white rounded-lg border border-outline focus:border-primary focus:ring-0" type="number" value="2" />
</div>
</div>
</div>

<div className="flex flex-col lg:flex-row gap-8">
<div className="flex-1 bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<h3 className="font-headline text-xl font-semibold text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined" data-icon="military_tech">military_tech</span>
                        Seuils de Mentions
                    </h3>
<div className="space-y-4">
<div className="flex items-center gap-4">
<span className="w-32 text-body-md font-medium">Très Bien</span>
<div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container w-[90%]"></div>
</div>
<input className="w-20 text-center rounded border-outline-variant text-sm font-bold" step={0.5} type="number" value="16.0" />
</div>
<div className="flex items-center gap-4">
<span className="w-32 text-body-md font-medium">Bien</span>
<div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container w-[70%]"></div>
</div>
<input className="w-20 text-center rounded border-outline-variant text-sm font-bold" step={0.5} type="number" value="14.0" />
</div>
<div className="flex items-center gap-4">
<span className="w-32 text-body-md font-medium">Assez Bien</span>
<div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-tertiary-container w-[60%]"></div>
</div>
<input className="w-20 text-center rounded border-outline-variant text-sm font-bold" step={0.5} type="number" value="12.0" />
</div>
<div className="flex items-center gap-4">
<span className="w-32 text-body-md font-medium">Passable</span>
<div className="flex-1 h-2 bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary-container w-[50%]"></div>
</div>
<input className="w-20 text-center rounded border-outline-variant text-sm font-bold" step={0.5} type="number" value="10.0" />
</div>
</div>
</div>
<div className="w-full lg:w-80 space-y-6">
<div className="bg-primary p-6 rounded-xl text-on-primary shadow-lg relative overflow-hidden">
<div className="relative z-10">
<h4 className="font-headline font-bold text-lg mb-2">Résumé des réglages</h4>
<ul className="text-sm space-y-2 opacity-90">
<li className="flex justify-between"><span>Coeff. Total:</span> <span className="font-bold">25</span></li>
<li className="flex justify-between"><span>Matières config:</span> <span className="font-bold">12</span></li>
<li className="flex justify-between"><span>Période:</span> <span className="font-bold">Trimestre 1</span></li>
</ul>
</div>
<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-9xl" data-icon="settings_suggest">settings_suggest</span>
</div>
</div>
<button className="w-full py-4 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-on-secondary font-bold rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined" data-icon="save">save</span>
                        Enregistrer la config
                    </button>
<button className="w-full py-4 border-2 border-error text-error font-bold rounded-xl hover:bg-error-container transition-colors active:scale-95" type="button">
                        Réinitialiser
                    </button>
</div>
</div>
</form>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 h-16 bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg flex justify-around items-center px-4">
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-[10px] font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="assignment">assignment</span>
<span className="font-label text-[10px] font-semibold">Bulletins</span>
</a>
<div className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1">
<span className="material-symbols-outlined" data-icon="tune">tune</span>
<span className="font-label text-[10px] font-semibold">Config</span>
</div>
<a className="flex flex-col items-center justify-center text-on-surface-variant" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-[10px] font-semibold">Profil</span>
</a>
</nav>
<script>
        // Micro-interaction for numerical inputs
        document.querySelectorAll('input[type="number"]').forEach(input =&gt; &#123;
            input.addEventListener('focus', () =&gt; &#123;
                input.parentElement.classList.add('ring-2', 'ring-primary/20');
            &#125;);
            input.addEventListener('blur', () =&gt; &#123;
                input.parentElement.classList.remove('ring-2', 'ring-primary/20');
            &#125;);
        &#125;);

        // Tab selection for Trimestres
        const periodButtons = document.querySelectorAll('button[type="button"].flex-1');
        periodButtons.forEach(btn =&gt; &#123;
            btn.addEventListener('click', () =&gt; &#123;
                periodButtons.forEach(b =&gt; &#123;
                    b.classList.remove('border-primary', 'bg-primary/5', 'text-primary', 'font-semibold');
                    b.classList.add('border-outline-variant', 'text-on-surface-variant');
                &#125;);
                btn.classList.add('border-primary', 'bg-primary/5', 'text-primary', 'font-semibold');
                btn.classList.remove('border-outline-variant', 'text-on-surface-variant');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
