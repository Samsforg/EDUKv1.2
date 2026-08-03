import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paramètres de Confidentialité - Edukora" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex justify-between items-center px-4 h-16 w-full">
<div className="flex items-center gap-4">
<button className="hover:bg-primary-container/20 p-2 rounded-full transition-colors duration-200">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold">Confidentialité</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full overflow-hidden border border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-270.png" alt="A professional close-up studio portrait of a young Ivorian student with a warm, confident expression. The lighting is bright and even, reflecting a clean academic environment. The style is modern corporate photography, using the Edukora primary blue as a subtle background accent. High contrast and sharp focus represent academic excellence." />
</div>
</div>
</header>
<main className="pt-24 pb-32 max-w-2xl mx-auto px-4">

<section className="mb-8">
<h2 className="font-headline text-display-lg-mobile text-primary font-bold mb-2">Vos données, votre contrôle</h2>
<p className="text-on-surface-variant leading-relaxed">
                Gérez comment vos informations sont partagées sur Edukora. Nous nous engageons à protéger votre vie privée tout en optimisant votre réussite scolaire.
            </p>
</section>

<div className="grid grid-cols-1 gap-6">

<div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>visibility</span>
<h3 className="font-headline text-xl font-semibold text-primary">Visibilité</h3>
</div>
<div className="space-y-6">
<div className="flex items-center justify-between group">
<div className="pr-4">
<p className="font-medium text-on-surface">Classement de la commune</p>
<p className="text-label-sm text-on-surface-variant">Afficher votre profil dans le classement local.</p>
</div>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
<input checked={true} className="opacity-0 w-0 h-0 toggle-checkbox" id="commune_rank" type="checkbox" />
<label className="toggle-label absolute top-0 left-0 right-0 bottom-0 bg-surface-container-highest cursor-pointer rounded-full transition-all duration-300" htmlFor="commune_rank">
<span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 transform"></span>
</label>
</div>
</div>
<div className="flex items-center justify-between group border-t border-outline-variant pt-6">
<div className="pr-4">
<p className="font-medium text-on-surface">Classement Global</p>
<p className="text-label-sm text-on-surface-variant">Être visible sur le tableau d'excellence national.</p>
</div>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
<input checked={true} className="opacity-0 w-0 h-0 toggle-checkbox" id="global_rank" type="checkbox" />
<label className="toggle-label absolute top-0 left-0 right-0 bottom-0 bg-surface-container-highest cursor-pointer rounded-full transition-all duration-300" htmlFor="global_rank">
<span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 transform"></span>
</label>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>share</span>
<h3 className="font-headline text-xl font-semibold text-primary">Partage de progression</h3>
</div>
<div className="flex items-center justify-between group">
<div className="pr-4">
<p className="font-medium text-on-surface">Badges et Séries</p>
<p className="text-label-sm text-on-surface-variant">Permettre à vos camarades de classe de voir vos accomplissements.</p>
</div>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
<input className="opacity-0 w-0 h-0 toggle-checkbox" id="badge_share" type="checkbox" />
<label className="toggle-label absolute top-0 left-0 right-0 bottom-0 bg-surface-container-highest cursor-pointer rounded-full transition-all duration-300" htmlFor="badge_share">
<span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 transform"></span>
</label>
</div>
</div>
</div>

<div className="bg-primary-container/5 rounded-xl p-6 border border-primary/20 shadow-sm relative overflow-hidden">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
<h3 className="font-headline text-xl font-semibold text-primary">IA Kora Personnalisée</h3>
</div>
<p className="text-on-surface-variant text-body-md mb-6">
                    Autorisez Kora à analyser votre historique d'étude pour vous proposer des exercices sur mesure adaptés à vos points faibles.
                </p>
<div className="flex items-center justify-between bg-white/50 p-4 rounded-lg border border-outline-variant/30">
<span className="font-medium text-primary">Activer l'apprentissage adaptatif</span>
<div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
<input checked={true} className="opacity-0 w-0 h-0 toggle-checkbox" id="ai_history" type="checkbox" />
<label className="toggle-label absolute top-0 left-0 right-0 bottom-0 bg-surface-container-highest cursor-pointer rounded-full transition-all duration-300" htmlFor="ai_history">
<span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all duration-300 transform"></span>
</label>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant shadow-sm">
<div className="flex items-center gap-3 mb-6">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>database</span>
<h3 className="font-headline text-xl font-semibold text-primary">Contrôle des données</h3>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<button className="flex items-center justify-center gap-3 border border-primary text-primary px-4 py-3 rounded-xl font-semibold hover:bg-primary-fixed/50 transition-all active:scale-95">
<span className="material-symbols-outlined">download</span>
                        Télécharger mes données
                    </button>
<button className="flex items-center justify-center gap-3 border border-error text-error px-4 py-3 rounded-xl font-semibold hover:bg-error-container/20 transition-all active:scale-95">
<span className="material-symbols-outlined">delete_forever</span>
                        Supprimer mon compte
                    </button>
</div>
<p className="text-label-sm text-on-surface-variant mt-4 text-center">
                    Note: La suppression du compte est irréversible et effacera tout votre historique d'examen.
                </p>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-none shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95" href="#">
<span className="material-symbols-outlined" data-icon="library_books">library_books</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Kora IA</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-all active:scale-95" href="#">
<span className="material-symbols-outlined" data-icon="quiz">quiz</span>
<span className="font-label text-label-xs font-semibold">Examens</span>
</a>

<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 transition-all active:scale-95" href="#">
<span className="material-symbols-outlined" data-icon="person">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>
<script>
        // Simple ripple effect for buttons
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('click', function(e) &#123;
                let ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                let d = Math.max(this.clientWidth, this.clientHeight);
                ripple.style.width = ripple.style.height = d + 'px';
                let rect = this.getBoundingClientRect();
                ripple.style.left = e.clientX - rect.left - d/2 + 'px';
                ripple.style.top = e.clientY - rect.top - d/2 + 'px';
                ripple.classList.add('animate-ripple');
                setTimeout(() =&gt; ripple.remove(), 600);
            &#125;);
        &#125;);
    </script>
<style>
        @keyframes ripple &#123;
            to &#123;
                transform: scale(4);
                opacity: 0;
            &#125;
        &#125;
        .animate-ripple &#123;
            animation: ripple 0.6s linear;
        &#125;
        .ripple &#123;
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            background: rgba(255, 255, 255, 0.3);
            pointer-events: none;
        &#125;
    </style>

    </div>
  );
}
