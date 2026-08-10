import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Tableau de Bord" };

export default function Page() {
  return (
    <div className="text-on-background" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-sm flex items-center justify-between px-4 md:px-8 h-16 w-full text-on-primary">
<div className="flex items-center gap-4">
<span className="material-symbols-outlined cursor-pointer active:scale-95 transition-transform" data-icon="menu">menu</span>
<h1 className="font-headline text-headline-md font-semibold">Edukora Professeur</h1>
</div>
<div className="flex items-center gap-3 cursor-pointer active:scale-95 transition-transform">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-164.png" alt="Close-up portrait of an African professor with glasses, wearing a professional navy blue suit, set against a blurred academic background of a library. The lighting is soft and natural, emphasizing trust and wisdom. The image style is professional corporate photography with a clean, high-contrast aesthetic." />
</div>
<span className="hidden md:block font-medium">M. Kouassi</span>
</div>
</header>

<aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 bg-surface dark:bg-surface-dim h-full w-72 rounded-r-xl border-r border-outline-variant dark:border-outline shadow-md pt-20">
<div className="px-6 mb-8 flex items-center gap-4">
<div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined fill-icon" data-icon="school" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<div>
<p className="font-headline text-primary font-bold text-lg">M. Kouassi</p>
<p className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">Professeur Principal</p>
</div>
</div>
<nav className="flex flex-col gap-1 px-2">

<a className="flex items-center gap-4 py-3 px-4 bg-primary-container text-on-primary-container font-semibold rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="description">description</span>
<span className="font-body text-body-md">Génération Bulletins</span>
</a>
<a className="flex items-center gap-4 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body text-body-md">Configuration</span>
</a>
<a className="flex items-center gap-4 py-3 px-4 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-colors" href="#">
<span className="material-symbols-outlined" data-icon="history">history</span>
<span className="font-body text-body-md">Archives</span>
</a>
</nav>
<div className="mt-auto p-6">
<div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant">
<p className="text-xs font-bold text-primary uppercase mb-1">Année Scolaire</p>
<p className="text-sm font-semibold text-on-surface">2023-2024</p>
</div>
</div>
</aside>

<main className="md:ml-72 pt-20 pb-24 px-4 md:px-8 max-w-7xl mx-auto">

<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
<div>
<h2 className="text-display-lg-mobile md:text-display-lg font-bold text-primary mb-2">Suivi des Bulletins</h2>
<p className="text-on-surface-variant">Gérez et validez les performances académiques de vos classes.</p>
</div>
<div className="flex flex-wrap items-center gap-3">
<span className="text-label-sm text-on-surface-variant font-semibold">Trimestre :</span>
<button className="px-4 py-1.5 rounded-full border border-primary bg-primary text-on-primary text-sm font-medium">1er Trimestre</button>
<button className="px-4 py-1.5 rounded-full border border-outline text-on-surface-variant hover:bg-surface-container-high text-sm font-medium transition-colors">2ème Trimestre</button>
<button className="px-4 py-1.5 rounded-full border border-outline text-on-surface-variant hover:bg-surface-container-high text-sm font-medium transition-colors">3ème Trimestre</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

<div className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
<div className="relative z-10 w-full md:w-auto">
<p className="text-sm font-bold text-primary uppercase mb-4">Progression Globale</p>
<div className="flex items-baseline gap-2 mb-2">
<span className="text-5xl font-black text-secondary">85%</span>
<span className="text-on-surface-variant text-sm font-medium">terminés</span>
</div>
<div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden mb-4">
<div className="h-full bg-secondary w-[85%] rounded-full shadow-[0_0_8px_rgba(149,74,0,0.4)]"></div>
</div>
<p className="text-xs text-on-surface-variant leading-relaxed">
<span className="font-bold text-tertiary">340/400</span> bulletins générés. <br />
                        Dernière mise à jour : il y a 12 minutes.
                    </p>
</div>
<div className="hidden md:flex flex-1 items-center justify-end h-full">
<div className="w-full h-full max-w-[200px] bg-secondary-fixed rounded-xl flex flex-col items-center justify-center p-4 border border-secondary-fixed-dim relative overflow-hidden group">

<div className="absolute inset-0 opacity-10 pointer-events-none" style={{"backgroundImage":"radial-gradient(#954a00 1px, transparent 0)","backgroundSize":"12px 12px"}}></div>
<span className="material-symbols-outlined text-secondary text-5xl mb-2 transition-transform group-hover:scale-110" data-icon="auto_awesome">auto_awesome</span>
<p className="text-center text-on-secondary-fixed text-xs font-bold px-2">L'IA finalise l'analyse des tendances...</p>
</div>
</div>
</div>

<div className="bg-primary p-6 rounded-xl shadow-lg flex flex-col justify-between text-on-primary group cursor-pointer active:scale-[0.98] transition-all">
<div>
<span className="material-symbols-outlined text-4xl mb-4 text-on-primary-container" data-icon="bolt">bolt</span>
<h3 className="text-xl font-bold mb-2 leading-tight">Action Rapide</h3>
<p className="text-on-primary-container text-sm leading-snug">Lancer la génération automatique pour tous les bulletins restants (60).</p>
</div>
<button className="mt-6 w-full bg-secondary text-on-secondary py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-on-secondary-fixed-variant transition-colors">
<span className="material-symbols-outlined text-xl" data-icon="play_circle">play_circle</span>
                    Générer tous les bulletins
                </button>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="p-6 border-b border-outline-variant flex items-center justify-between">
<h3 className="font-headline text-xl font-bold text-primary">Liste des Classes</h3>
<div className="flex items-center gap-2 text-on-surface-variant">
<span className="material-symbols-outlined text-lg" data-icon="filter_list">filter_list</span>
<span className="text-sm font-medium">Trier par statut</span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant text-xs font-bold uppercase tracking-wider">
<th className="px-6 py-4">Classe</th>
<th className="px-6 py-4">Effectif</th>
<th className="px-6 py-4">Progression</th>
<th className="px-6 py-4">Statut de validation</th>
<th className="px-6 py-4">Dernière Action</th>
<th className="px-6 py-4 text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant/30">

<tr className="hover:bg-surface-container transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">C1</div>
<span className="font-semibold text-on-surface">Terminale C1</span>
</div>
</td>
<td className="px-6 py-4 text-sm">42 élèves</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden max-w-[80px]">
<div className="h-full bg-tertiary-fixed-dim w-full"></div>
</div>
<span className="text-xs font-bold text-on-tertiary-fixed-variant">100%</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-[10px] font-bold uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-on-tertiary-container"></span>
                                    Validé
                                </span>
</td>
<td className="px-6 py-4 text-xs text-outline italic">Finalisé hier</td>
<td className="px-6 py-4 text-right">
<button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-primary-fixed transition-all">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
</button>
</td>
</tr>

<tr className="hover:bg-surface-container transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">C2</div>
<span className="font-semibold text-on-surface">Terminale C2</span>
</div>
</td>
<td className="px-6 py-4 text-sm">38 élèves</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden max-w-[80px]">
<div className="h-full bg-secondary w-[70%]"></div>
</div>
<span className="text-xs font-bold text-secondary">70%</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold uppercase">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                                    En cours
                                </span>
</td>
<td className="px-6 py-4 text-xs text-outline italic">Il y a 5 min</td>
<td className="px-6 py-4 text-right">
<button className="bg-primary-container text-on-primary-container px-3 py-1 rounded text-xs font-bold hover:bg-primary transition-all">
                                    Finaliser
                                </button>
</td>
</tr>

<tr className="hover:bg-surface-container transition-colors group">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-primary-fixed flex items-center justify-center font-bold text-primary text-xs">D1</div>
<span className="font-semibold text-on-surface">Terminale D1</span>
</div>
</td>
<td className="px-6 py-4 text-sm">45 élèves</td>
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="flex-1 h-1.5 bg-surface-container-high rounded-full overflow-hidden max-w-[80px]">
<div className="h-full bg-error-container w-[0%]"></div>
</div>
<span className="text-xs font-bold text-on-surface-variant">0%</span>
</div>
</td>
<td className="px-6 py-4">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold uppercase">
                                    En attente
                                </span>
</td>
<td className="px-6 py-4 text-xs text-outline italic">--</td>
<td className="px-6 py-4 text-right">
<button className="text-primary hover:text-primary-container p-2 rounded-full hover:bg-primary-fixed transition-all">
<span className="material-symbols-outlined" data-icon="sync">sync</span>
</button>
</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
<span className="material-symbols-outlined" data-icon="lightbulb">lightbulb</span>
</div>
<div>
<h4 className="font-bold text-primary mb-1">Conseil Académique</h4>
<p className="text-sm text-on-surface-variant leading-relaxed">Les bulletins de la Terminale C2 affichent une baisse générale en Mathématiques. L'IA a généré une suggestion de commentaire pédagogique pour le conseil de classe.</p>
</div>
</div>
<div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant flex items-start gap-4">
<div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-tertiary">
<span className="material-symbols-outlined" data-icon="task_alt">task_alt</span>
</div>
<div>
<h4 className="font-bold text-tertiary mb-1">Validation requise</h4>
<p className="text-sm text-on-surface-variant leading-relaxed">La validation finale par le proviseur est prévue pour le vendredi 15 Mars. Veuillez finaliser toutes les classes avant jeudi soir.</p>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg flex justify-around items-center h-16 px-4 rounded-t-xl">
<a className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined fill-icon" data-icon="home">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="assignment">assignment</span>
<span className="font-label text-label-xs font-semibold">Bulletins</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="tune">tune</span>
<span className="font-label text-label-xs font-semibold">Config</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant active:scale-90 duration-150" href="#">
<span className="material-symbols-outlined" data-icon="account_circle">account_circle</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</a>
</nav>

<script>
        document.querySelectorAll('button, a').forEach(el =&gt; &#123;
            el.addEventListener('click', function(e) &#123;
                // Example: simple feedback log
                console.log('Interaction with: ' + (this.innerText || 'Icon Button'));
            &#125;);
        &#125;);

        // Simple mock for "Generating" progress
        function simulateGeneration() &#123;
            const generateBtn = document.querySelector('button:contains("Générer")');
            if (generateBtn) &#123;
                generateBtn.addEventListener('click', () =&gt; &#123;
                    const originalText = generateBtn.innerHTML;
                    generateBtn.disabled = true;
                    generateBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin" data-icon="sync"&gt;sync&lt;/span&gt; Génération...';
                    setTimeout(() =&gt; &#123;
                        generateBtn.disabled = false;
                        generateBtn.innerHTML = originalText;
                        alert('Simulation: Processus de génération lancé avec succès.');
                    &#125;, 2000);
                &#125;);
            &#125;
        &#125;
        
        // Helper to find text in buttons for simulation
        window.onload = () =&gt; &#123;
            const btns = document.querySelectorAll('button');
            btns.forEach(b =&gt; &#123;
                if(b.textContent.includes('Générer tous')) &#123;
                    b.onclick = () =&gt; &#123;
                        b.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; En cours...';
                        setTimeout(() =&gt; &#123;
                            b.innerHTML = '&lt;span class="material-symbols-outlined"&gt;done&lt;/span&gt; Terminé';
                            b.classList.replace('bg-secondary', 'bg-tertiary');
                        &#125;, 3000);
                    &#125;;
                &#125;
            &#125;);
        &#125;
    </script>

    </div>
  );
}
