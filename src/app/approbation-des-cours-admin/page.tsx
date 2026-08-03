import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Validation des Contenus" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface-container-high dark:bg-surface-container-highest shadow-sm">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-headline-md">school</span>
<span className="text-headline-md font-headline font-bold text-primary dark:text-primary-fixed-dim">Edukora</span>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
<img className="w-full h-full object-cover" src="/images/ecran-023.png" alt="A professional portrait of a West African academic administrator in a modern office. The lighting is soft and bright, emphasizing a light-mode corporate aesthetic. The individual wears a sharp navy blue blazer, reflecting the Academic Blue primary color, and looks into the camera with a confident, welcoming expression suitable for an educational portal leader." />
</div>
</header>

<main className="pt-20 px-4 max-w-lg mx-auto">

<div className="mb-6">
<h1 className="text-2xl font-bold text-primary mb-1">Approbation</h1>
<p className="text-on-surface-variant text-sm">Gestion des contenus pédagogiques en attente.</p>
</div>

<div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar mb-4">
<button className="bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shadow-sm">Tout (12)</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap hover:bg-surface-variant transition-colors">Cours (5)</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap hover:bg-surface-variant transition-colors">Fiches (7)</button>
<button className="bg-surface-container-high text-on-surface-variant px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap hover:bg-surface-variant transition-colors">Examens (0)</button>
</div>

<div className="flex flex-col gap-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined text-2xl">calculate</span>
</div>
<div>
<h3 className="font-bold text-lg leading-tight text-on-surface">Algèbre Linéaire</h3>
<p className="text-primary font-semibold text-xs uppercase tracking-wider">Mathématiques - BAC S</p>
</div>
</div>
<div className="status-badge bg-tertiary-container text-on-tertiary-container">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        Vérifié
                    </div>
</div>
<div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-4 bg-surface-container-low p-3 rounded-lg">
<div>
<p className="text-[10px] text-outline font-bold uppercase">Auteur</p>
<p className="text-on-surface font-medium">Prof. Kouassi</p>
</div>
<div>
<p className="text-[10px] text-outline font-bold uppercase">Expert Validateur</p>
<p className="text-on-surface font-medium">Dr. Bakayoko</p>
</div>
<div className="col-span-2 border-t border-outline-variant pt-2 mt-1 flex justify-between items-center">
<p className="text-[10px] text-outline font-bold uppercase">Date de soumission</p>
<p className="text-on-surface text-xs font-medium">12 Oct 2023, 14:30</p>
</div>
</div>
<div className="flex items-center gap-2">
<button className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 rounded-lg text-xs font-bold active:scale-95 transition-transform">
                        APPROUVER
                    </button>
<button className="bg-surface-container-high p-2.5 rounded-lg text-on-surface-variant active:scale-90 transition-transform">
<span className="material-symbols-outlined block">visibility</span>
</button>
<button className="bg-error-container text-on-error-container p-2.5 rounded-lg active:scale-90 transition-transform">
<span className="material-symbols-outlined block">chat_bubble</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm relative overflow-hidden">
<div className="absolute top-0 right-0 h-1 w-full bg-secondary-container"></div>
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-secondary-container/20 rounded-lg flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-2xl">science</span>
</div>
<div>
<h3 className="font-bold text-lg leading-tight text-on-surface">Électricité &amp; Circuits</h3>
<p className="text-primary font-semibold text-xs uppercase tracking-wider">Physique - BEPC</p>
</div>
</div>
<div className="status-badge bg-surface-container-highest text-on-surface-variant border border-outline-variant">
<span className="material-symbols-outlined text-[14px]">pending_actions</span>
                        En attente
                    </div>
</div>
<div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-4 bg-surface-container-low p-3 rounded-lg">
<div>
<p className="text-[10px] text-outline font-bold uppercase">Auteur</p>
<p className="text-on-surface font-medium">Mme. Touré</p>
</div>
<div>
<p className="text-[10px] text-outline font-bold uppercase">Expert Validateur</p>
<p className="text-on-surface-variant italic text-xs">Non assigné</p>
</div>
<div className="col-span-2 border-t border-outline-variant pt-2 mt-1 flex justify-between items-center">
<p className="text-[10px] text-outline font-bold uppercase">Date de soumission</p>
<p className="text-on-surface text-xs font-medium">Hier, 18:15</p>
</div>
</div>
<div className="flex items-center gap-2">
<button className="flex-1 bg-primary text-on-primary py-2.5 rounded-lg text-xs font-bold active:scale-95 transition-transform opacity-50 cursor-not-allowed">
                        EXPERT REQUIS
                    </button>
<button className="bg-surface-container-high p-2.5 rounded-lg text-on-surface-variant active:scale-90 transition-transform">
<span className="material-symbols-outlined block">visibility</span>
</button>
<button className="bg-surface-container-high p-2.5 rounded-lg text-on-surface-variant active:scale-90 transition-transform">
<span className="material-symbols-outlined block">assignment_ind</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
<div className="flex justify-between items-start mb-3">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-tertiary-container rounded-lg flex items-center justify-center text-on-tertiary-container">
<span className="material-symbols-outlined text-2xl">history_edu</span>
</div>
<div>
<h3 className="font-bold text-lg leading-tight text-on-surface">Dissertation: Méthode</h3>
<p className="text-primary font-semibold text-xs uppercase tracking-wider">Français - BAC</p>
</div>
</div>
<div className="status-badge bg-tertiary-container text-on-tertiary-container">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                        Vérifié
                    </div>
</div>
<div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm mb-4 bg-surface-container-low p-3 rounded-lg">
<div>
<p className="text-[10px] text-outline font-bold uppercase">Auteur</p>
<p className="text-on-surface font-medium">Prof. Yao</p>
</div>
<div>
<p className="text-[10px] text-outline font-bold uppercase">Expert Validateur</p>
<p className="text-on-surface font-medium">M. Koffi</p>
</div>
<div className="col-span-2 border-t border-outline-variant pt-2 mt-1 flex justify-between items-center">
<p className="text-[10px] text-outline font-bold uppercase">Date de soumission</p>
<p className="text-on-surface text-xs font-medium">09 Oct 2023, 09:00</p>
</div>
</div>
<div className="flex items-center gap-2">
<button className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 rounded-lg text-xs font-bold active:scale-95 transition-transform">
                        APPROUVER
                    </button>
<button className="bg-surface-container-high p-2.5 rounded-lg text-on-surface-variant active:scale-90 transition-transform">
<span className="material-symbols-outlined block">visibility</span>
</button>
<button className="bg-error-container text-on-error-container p-2.5 rounded-lg active:scale-90 transition-transform">
<span className="material-symbols-outlined block">chat_bubble</span>
</button>
</div>
</div>
</div>

<div className="mt-8 flex justify-center">
<button className="text-primary font-bold text-sm flex items-center gap-2 hover:underline">
                Charger plus de demandes
                <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
</button>
</div>
</main>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-surface dark:bg-surface-dim border-t border-outline-variant dark:border-outline shadow-lg rounded-t-xl">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:bg-surface-container-high dark:hover:bg-on-surface-variant rounded-full transition-colors">
<span className="material-symbols-outlined">dashboard</span>
<span className="text-label-xs font-label">Overview</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:bg-surface-container-high dark:hover:bg-on-surface-variant rounded-full transition-colors">
<span className="material-symbols-outlined">group</span>
<span className="text-label-xs font-label">Users</span>
</div>

<div className="flex flex-col items-center justify-center bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary rounded-full px-4 py-1 scale-90 transition-transform duration-200">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>book</span>
<span className="text-label-xs font-label">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline p-2 hover:bg-surface-container-high dark:hover:bg-on-surface-variant rounded-full transition-colors">
<span className="material-symbols-outlined">analytics</span>
<span className="text-label-xs font-label">Analytics</span>
</div>
</nav>

<script>
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('mousedown', () =&gt; &#123;
                if (!button.classList.contains('cursor-not-allowed')) &#123;
                    button.classList.add('scale-95');
                &#125;
            &#125;);
            button.addEventListener('mouseup', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
            button.addEventListener('mouseleave', () =&gt; &#123;
                button.classList.remove('scale-95');
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
