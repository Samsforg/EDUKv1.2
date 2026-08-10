import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Modération Chat" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-fixed selection:text-on-primary-fixed" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background w-full top-0 sticky border-b border-outline-variant dark:border-outline z-40 flex items-center justify-between px-8 h-16">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary cursor-pointer active:opacity-80">menu</span>
<h1 className="font-headline font-bold text-primary text-[24px] leading-8">Edukora Professeur</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex items-center gap-6 mr-6">
<span className="text-on-surface-variant hover:bg-surface-container-low transition-colors cursor-pointer px-3 py-1 rounded-lg font-medium">Aide</span>
<span className="text-primary dark:text-primary-fixed font-bold px-3 py-1 bg-primary-container/10 rounded-lg">Modération Chat</span>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 cursor-pointer active:opacity-80">
<img className="w-full h-full object-cover" src="/images/ecran-245.png" alt="A professional headshot of an African professor in his late 40s, wearing a clean white shirt and glasses. The lighting is bright and soft, creating a warm, academic atmosphere. The background is a slightly blurred modern classroom with a chalkboard. Professional photography style with high clarity and balanced contrast." />
</div>
</div>
</header>
<div className="flex h-[calc(100vh-64px)]">

<aside className="hidden md:flex flex-col h-full w-64 fixed left-0 top-16 bg-surface-container dark:bg-surface-dim border-r border-outline-variant shadow-sm z-30">
<div className="p-6 flex flex-col gap-1">
<div className="flex items-center gap-3 mb-6">
<div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold text-xl">K</div>
<div className="flex flex-col">
<span className="font-headline font-bold text-primary">Dr. Koffi</span>
<span className="text-xs text-on-surface-variant">Session BAC 2024</span>
</div>
</div>
<nav className="flex flex-col gap-1">
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-body text-body-md">Sessions Live</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer bg-primary-container text-on-primary-container rounded-lg font-semibold transition-all">
<span className="material-symbols-outlined">forum</span>
<span className="font-body text-body-md">Modération Chat</span>
</div>
<div className="flex items-center gap-3 px-4 py-3 cursor-pointer text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body text-body-md">Ressources</span>
</div>
</nav>
</div>
<div className="mt-auto p-6">
<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30">
<p className="text-xs font-bold text-primary mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-sm">bolt</span>
                        IA ANALYSE ACTIVE
                    </p>
<p className="text-[11px] leading-relaxed text-on-surface-variant">Le filtre intelligent trie actuellement 142 messages par minute.</p>
</div>
</div>
</aside>

<main className="flex-1 md:ml-64 p-4 md:p-8 bg-surface overflow-hidden flex flex-col gap-6">

<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h2 className="font-headline font-bold text-on-surface text-2xl md:text-3xl">Live : Révision Mathématiques</h2>
<p className="text-on-surface-variant text-sm flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                        En direct • 1,240 étudiants connectés
                    </p>
</div>
<div className="flex gap-2">
<button className="bg-surface-container-highest text-on-surface-variant px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-outline-variant transition-colors">
<span className="material-symbols-outlined text-lg">pause_circle</span>
                        Mettre en pause
                    </button>
<button className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:opacity-90 transition-opacity">
<span className="material-symbols-outlined text-lg">campaign</span>
                        Faire une annonce
                    </button>
</div>
</div>

<div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">

<section className="lg:col-span-5 flex flex-col gap-4 overflow-hidden">
<div className="flex items-center justify-between">
<h3 className="font-headline font-semibold text-primary flex items-center gap-2">
<span className="material-symbols-outlined">auto_awesome</span>
                            Questions Prioritaires (IA)
                        </h3>
<span className="bg-primary-container/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full">4 NOUVELLES</span>
</div>
<div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-3 pr-2">

<div className="bg-surface-container-lowest border border-primary/20 rounded-xl p-4 shadow-sm relative group">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold text-xs">AM</div>
<span className="text-xs font-bold text-on-surface">Aminata M.</span>
</div>
<span className="text-[10px] text-on-surface-variant">Il y a 2m</span>
</div>
<p className="text-sm text-on-surface leading-relaxed">Monsieur, est-ce que la règle de L'Hôpital est autorisée lors de l'examen du BAC cette année ?</p>
<div className="mt-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
<button className="flex-1 bg-primary text-on-primary text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                                    Mettre en avant
                                </button>
<button className="bg-surface-container-high text-on-surface-variant p-2 rounded-lg hover:bg-error-container hover:text-error transition-colors">
<span className="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest border border-primary/20 rounded-xl p-4 shadow-sm relative group">
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-xs">JK</div>
<span className="text-xs font-bold text-on-surface">Jean-Kouadio</span>
</div>
<span className="text-[10px] text-on-surface-variant">Il y a 5m</span>
</div>
<p className="text-sm text-on-surface leading-relaxed">Pouvez-vous réexpliquer l'intégration par parties ? J'ai du mal avec le choix de 'u' et 'v'.</p>
<div className="mt-4 flex gap-2 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity">
<button className="flex-1 bg-primary text-on-primary text-xs py-2 rounded-lg font-semibold flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-sm">star</span>
                                    Mettre en avant
                                </button>
<button className="bg-surface-container-high text-on-surface-variant p-2 rounded-lg hover:bg-error-container hover:text-error transition-colors">
<span className="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</div>

<div className="bg-secondary-fixed/30 border-2 border-secondary-container rounded-xl p-4 shadow-md relative highlight-question">
<div className="absolute -top-3 -right-2 bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">À L'ÉCRAN</div>
<div className="flex justify-between items-start mb-2">
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-xs">SD</div>
<span className="text-xs font-bold text-on-surface">Sarah Diabaté</span>
</div>
</div>
<p className="text-sm text-on-surface font-semibold leading-relaxed italic">"Quelle est la différence fondamentale entre une suite arithmétique et géométrique ?"</p>
<button className="mt-3 w-full bg-white border border-secondary-container text-secondary-container text-xs py-2 rounded-lg font-bold">Retirer de l'écran</button>
</div>
</div>
</section>

<section className="lg:col-span-7 flex flex-col bg-surface-container-lowest rounded-2xl border border-outline-variant overflow-hidden shadow-sm">
<div className="p-4 border-b border-outline-variant flex items-center justify-between bg-white">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-primary">chat_bubble</span>
<h3 className="font-headline font-semibold">Flux Intégral</h3>
</div>
<div className="flex items-center gap-2">
<div className="flex items-center px-2 py-1 bg-surface-container rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-sm mr-1">filter_list</span>
<select className="bg-transparent border-none p-0 text-[11px] font-bold focus:ring-0 cursor-pointer">
<option>TOUS LES MESSAGES</option>
<option>SIGNALÉS UNIQUEMENT</option>
</select>
</div>
</div>
</div>
<div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">

<div className="flex items-start gap-3 group">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-xs font-bold">BK</div>
<div className="flex-1">
<div className="flex items-baseline gap-2">
<span className="text-xs font-bold">Bakary</span>
<span className="text-[10px] text-on-surface-variant">14:22</span>
</div>
<p className="text-sm text-on-surface-variant">Merci Monsieur, c'est plus clair maintenant !</p>
</div>
<div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
<button className="p-1 hover:text-primary"><span className="material-symbols-outlined text-lg">star</span></button>
<button className="p-1 hover:text-error"><span className="material-symbols-outlined text-lg">block</span></button>
</div>
</div>

<div className="flex items-start gap-3 group bg-error-container/20 p-2 rounded-lg border border-error/10">
<div className="w-8 h-8 rounded-full bg-error text-on-error flex-shrink-0 flex items-center justify-center text-xs font-bold">X</div>
<div className="flex-1">
<div className="flex items-baseline gap-2">
<span className="text-xs font-bold text-error">Anonyme_99</span>
<span className="text-[10px] text-error/60">14:23</span>
<span className="bg-error text-on-error text-[8px] font-bold px-1 rounded">SIGNALÉ</span>
</div>
<p className="text-sm text-error font-medium">Message inapproprié détecté par le système.</p>
</div>
<div className="flex gap-1">
<button className="bg-error text-on-error px-2 py-1 rounded text-[10px] font-bold">SUPPRIMER</button>
<button className="bg-inverse-surface text-inverse-on-surface px-2 py-1 rounded text-[10px] font-bold">BLOQUER</button>
</div>
</div>

<div className="flex items-start gap-3 group">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-xs font-bold">LC</div>
<div className="flex-1">
<div className="flex items-baseline gap-2">
<span className="text-xs font-bold">Leila C.</span>
<span className="text-[10px] text-on-surface-variant">14:24</span>
</div>
<p className="text-sm text-on-surface-variant">On peut avoir le PDF après la séance ?</p>
</div>
<div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
<button className="p-1 hover:text-primary"><span className="material-symbols-outlined text-lg">star</span></button>
<button className="p-1 hover:text-error"><span className="material-symbols-outlined text-lg">block</span></button>
</div>
</div>

<div className="flex items-start gap-3 group">
<div className="w-8 h-8 rounded-full bg-surface-container-highest flex-shrink-0 flex items-center justify-center text-xs font-bold">DM</div>
<div className="flex-1">
<div className="flex items-baseline gap-2">
<span className="text-xs font-bold">Drissa M.</span>
<span className="text-[10px] text-on-surface-variant">14:25</span>
</div>
<p className="text-sm text-on-surface-variant">La connexion coupe un peu chez moi.</p>
</div>
<div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
<button className="p-1 hover:text-primary"><span className="material-symbols-outlined text-lg">star</span></button>
<button className="p-1 hover:text-error"><span className="material-symbols-outlined text-lg">block</span></button>
</div>
</div>
</div>
<div className="p-4 border-t border-outline-variant bg-surface-container-low flex items-center gap-3">
<div className="flex-1 relative">
<input className="w-full bg-white border border-outline-variant rounded-full py-2 px-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary" placeholder="Répondre publiquement en tant que Modérateur..." type="text" />
</div>
<button className="bg-primary text-on-primary w-10 h-10 rounded-full flex items-center justify-center shadow-md active:scale-95 transition-transform">
<span className="material-symbols-outlined">send</span>
</button>
</div>
</section>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-2 pb-safe bg-surface border-t border-outline-variant shadow-lg z-50 h-16">
<div className="flex-1 py-2 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-label text-label-xs">Bord</span>
</div>
<div className="flex-1 py-2 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95">
<span className="material-symbols-outlined">live_tv</span>
<span className="font-label text-label-xs">En direct</span>
</div>
<div className="flex-1 py-2 transition-transform active:scale-95">
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 mx-auto w-fit">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>forum</span>
<span className="font-label text-label-xs">Discussion</span>
</div>
</div>
<div className="flex-1 py-2 flex flex-col items-center justify-center text-on-surface-variant transition-transform active:scale-95">
<span className="material-symbols-outlined">folder_open</span>
<span className="font-label text-label-xs">Docs</span>
</div>
</nav>

<script>
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            // Simulate real-time interaction: highlighting a message
            const starButtons = document.querySelectorAll('.material-symbols-outlined:contains("star")');
            starButtons.forEach(btn =&gt; &#123;
                btn.parentElement.addEventListener('click', () =&gt; &#123;
                    const icon = btn;
                    const isFilled = icon.style.fontVariationSettings.includes("'FILL' 1");
                    icon.style.fontVariationSettings = isFilled ? "'FILL' 0" : "'FILL' 1";
                &#125;);
            &#125;);

            // Smooth scroll for chat
            const chatContainer = document.querySelector('.custom-scrollbar');
            chatContainer.scrollTop = chatContainer.scrollHeight;
        &#125;);

        // Add contains selector for icons polyfill (simple version)
        if (!Element.prototype.matches) &#123;
            Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                        Element.prototype.webkitMatchesSelector;
        &#125;
    </script>

    </div>
  );
}
