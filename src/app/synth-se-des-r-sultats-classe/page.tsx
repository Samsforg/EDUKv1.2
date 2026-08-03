import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Résultats Terminale C1" };

export default function Page() {
  return (
    <div className="bg-surface font-body text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 sticky bg-surface border-b border-outline-variant z-50 flex justify-between items-center px-6 py-4">
<div className="flex items-center gap-4">
<button className="material-symbols-outlined text-primary hover:bg-surface-container-high p-2 rounded-full transition-colors">menu</button>
<h1 className="font-headline text-headline-md font-bold text-primary">Résultats - Terminale C1</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6">
<span className="text-primary font-bold cursor-pointer">Tableau de bord</span>
<span className="text-on-surface-variant hover:bg-surface-container-high px-2 rounded transition-colors cursor-pointer">Correction Hub</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold overflow-hidden border border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-341.png" alt="A professional portrait of an Ivorian academic professor, Dr. Koffi, smiling warmly. He is wearing a formal dark suit with a crisp white shirt. The background is a blurred academic office with books and a soft, high-key light coming from a window, creating a trustworthy and authoritative atmosphere consistent with the Edukora brand." />
</div>
</div>
</header>
<div className="flex min-h-screen">

<aside className="hidden md:flex h-screen w-72 sticky top-0 bg-surface-container-low flex-col gap-2 py-6 border-r border-outline-variant">
<div className="px-6 mb-8">
<div className="flex items-center gap-3">
<div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
<div>
<p className="font-headline font-bold text-primary">Edukora</p>
<p className="text-label-xs text-on-surface-variant">Admin de la faculté</p>
</div>
</div>
</div>
<nav className="flex flex-col gap-1">
<a className="text-on-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span>Tableau de bord</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all" href="#">
<span className="material-symbols-outlined">edit_note</span>
<span>Correction Hub</span>
</a>
<a className="bg-primary-container text-on-primary-container rounded-full mx-2 px-4 py-3 flex items-center gap-3 font-medium" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>analytics</span>
<span>Results Analysis</span>
</a>
<a className="text-on-surface-variant hover:bg-surface-variant mx-2 px-4 py-3 rounded-full flex items-center gap-3 transition-all" href="#">
<span className="material-symbols-outlined">group</span>
<span>Class Management</span>
</a>
</nav>
</aside>

<main className="flex-1 px-4 md:px-8 py-8 mb-24 md:mb-0">

<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex items-center gap-6 shadow-sm">
<div className="w-14 h-14 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-3xl">high_res</span>
</div>
<div>
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Moyenne de Classe</p>
<h2 className="text-display-lg font-bold text-primary">11.5<span className="text-headline-md font-normal text-on-surface-variant">/20</span></h2>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex items-center gap-6 shadow-sm">
<div className="w-14 h-14 bg-tertiary-fixed rounded-full flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined text-3xl">verified</span>
</div>
<div>
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Taux de Réussite</p>
<h2 className="text-display-lg font-bold text-tertiary">68%</h2>
</div>
</div>
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant flex items-center gap-6 shadow-sm">
<div className="w-14 h-14 bg-secondary-fixed rounded-full flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-3xl">trending_up</span>
</div>
<div>
<p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Progression</p>
<h2 className="text-display-lg font-bold text-secondary">+1.2</h2>
</div>
</div>
</div>

<section className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant mb-8 shadow-sm">
<div className="flex justify-between items-end mb-8">
<div>
<h3 className="font-headline text-headline-md font-semibold text-on-surface">Distribution des notes</h3>
<p className="text-body-md text-on-surface-variant">Répartition des 34 étudiants par tranche de score</p>
</div>
<div className="flex gap-2 text-label-xs">
<span className="flex items-center gap-1"><span className="w-3 h-3 bg-error rounded-full"></span> Échec</span>
<span className="flex items-center gap-1"><span className="w-3 h-3 bg-secondary rounded-full"></span> Moyen</span>
<span className="flex items-center gap-1"><span className="w-3 h-3 bg-tertiary rounded-full"></span> Excellent</span>
</div>
</div>
<div className="relative h-64 flex items-end justify-between gap-2 px-4">

<div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
<div className="border-t border-outline-variant border-dashed w-full h-0"></div>
<div className="border-t border-outline-variant border-dashed w-full h-0"></div>
<div className="border-t border-outline-variant border-dashed w-full h-0"></div>
<div className="border-t border-outline-variant border-dashed w-full h-0"></div>
</div>

<div className="flex-1 flex flex-col items-center group">
<div className="w-full max-w-[40px] bg-error/30 hover:bg-error/50 rounded-t-sm histogram-bar relative group" style={{"height":"15%"}}>
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-xs opacity-0 group-hover:opacity-100 transition-opacity">2</span>
</div>
<p className="mt-2 text-label-xs text-on-surface-variant">0-5</p>
</div>
<div className="flex-1 flex flex-col items-center group">
<div className="w-full max-w-[40px] bg-error rounded-t-sm histogram-bar relative group" style={{"height":"40%"}}>
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-xs opacity-0 group-hover:opacity-100 transition-opacity">6</span>
</div>
<p className="mt-2 text-label-xs text-on-surface-variant">5-10</p>
</div>
<div className="flex-1 flex flex-col items-center group">
<div className="w-full max-w-[40px] bg-secondary rounded-t-sm histogram-bar relative group" style={{"height":"85%"}}>
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-xs opacity-0 group-hover:opacity-100 transition-opacity">14</span>
</div>
<p className="mt-2 text-label-xs text-on-surface-variant font-bold">10-14</p>
</div>
<div className="flex-1 flex flex-col items-center group">
<div className="w-full max-w-[40px] bg-tertiary rounded-t-sm histogram-bar relative group" style={{"height":"60%"}}>
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-xs opacity-0 group-hover:opacity-100 transition-opacity">9</span>
</div>
<p className="mt-2 text-label-xs text-on-surface-variant">14-17</p>
</div>
<div className="flex-1 flex flex-col items-center group">
<div className="w-full max-w-[40px] bg-tertiary-fixed-dim rounded-t-sm histogram-bar relative group" style={{"height":"20%"}}>
<span className="absolute -top-6 left-1/2 -translate-x-1/2 text-label-xs opacity-0 group-hover:opacity-100 transition-opacity">3</span>
</div>
<p className="mt-2 text-label-xs text-on-surface-variant">17-20</p>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden shadow-sm">
<div className="p-6 border-b border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
<h3 className="font-headline text-headline-md font-semibold text-on-surface">Liste des Étudiants</h3>
<div className="flex gap-2 w-full md:w-auto">
<div className="relative flex-1 md:w-64">
<span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
<input className="w-full pl-10 pr-4 py-2 bg-surface border border-outline-variant rounded-lg text-body-md focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Rechercher un élève..." type="text" />
</div>
<button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined">filter_list</span>
<span className="hidden md:inline">Filtrer</span>
</button>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container text-on-surface-variant uppercase text-label-xs tracking-widest">
<tr>
<th className="px-6 py-4 font-semibold">Étudiant</th>
<th className="px-6 py-4 font-semibold">Automatisé</th>
<th className="px-6 py-4 font-semibold">Manuel</th>
<th className="px-6 py-4 font-semibold">Total Final</th>
<th className="px-6 py-4 font-semibold text-center">Action</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant">
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold">AK</div>
<div>
<p className="font-semibold text-on-surface">Alain Kouadio</p>
<p className="text-label-xs text-on-surface-variant">ID: 2024-C1-001</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-on-surface">12.0 <span className="text-outline">/14</span></td>
<td className="px-6 py-4 text-on-surface">4.5 <span className="text-outline">/6</span></td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-bold">16.5/20</span>
</td>
<td className="px-6 py-4 text-center">
<button className="material-symbols-outlined text-primary hover:bg-primary-fixed p-2 rounded-full transition-colors">visibility</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold">SD</div>
<div>
<p className="font-semibold text-on-surface">Sarra Diabaté</p>
<p className="text-label-xs text-on-surface-variant">ID: 2024-C1-012</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-on-surface">8.5 <span className="text-outline">/14</span></td>
<td className="px-6 py-4 text-on-surface">2.0 <span className="text-outline">/6</span></td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full font-bold text-secondary-container">10.5/20</span>
</td>
<td className="px-6 py-4 text-center">
<button className="material-symbols-outlined text-primary hover:bg-primary-fixed p-2 rounded-full transition-colors">visibility</button>
</td>
</tr>
<tr className="hover:bg-surface-container-low transition-colors">
<td className="px-6 py-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error font-bold">IB</div>
<div>
<p className="font-semibold text-on-surface">Issouf Bakayoko</p>
<p className="text-label-xs text-on-surface-variant">ID: 2024-C1-025</p>
</div>
</div>
</td>
<td className="px-6 py-4 text-on-surface">5.0 <span className="text-outline">/14</span></td>
<td className="px-6 py-4 text-on-surface">1.5 <span className="text-outline">/6</span></td>
<td className="px-6 py-4">
<span className="px-3 py-1 bg-error-container text-on-error-container rounded-full font-bold">06.5/20</span>
</td>
<td className="px-6 py-4 text-center">
<button className="material-symbols-outlined text-primary hover:bg-primary-fixed p-2 rounded-full transition-colors">visibility</button>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-8 bg-surface-container flex flex-col md:flex-row justify-between items-center gap-6">
<div className="flex items-center gap-4 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary">info</span>
<p className="text-body-md italic">Les notes marquées en orange sont proches du seuil de validation.</p>
</div>
<div className="flex gap-4 w-full md:w-auto">
<button className="flex-1 md:flex-none px-6 py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary-fixed transition-colors">
                            Exporter CSV
                        </button>
<button className="flex-1 md:flex-none px-10 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2" id="validateBtn">
<span className="material-symbols-outlined">publish</span>
                            Validate All
                        </button>
</div>
</div>
</section>
</main>
</div>

<nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-2 pt-2 md:hidden bg-surface border-t border-outline-variant shadow-lg">
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-medium">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-5 py-1">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>grading</span>
<span className="font-label text-label-xs font-medium">Note</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">assessment</span>
<span className="font-label text-label-xs font-medium">Rapports</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant">
<span className="material-symbols-outlined">settings</span>
<span className="font-label text-label-xs font-medium">Paramètres</span>
</div>
</nav>

<div className="fixed top-24 right-8 bg-tertiary text-white px-6 py-4 rounded-xl shadow-2xl translate-x-[150%] transition-transform duration-500 z-[100] flex items-center gap-3" id="toast">
<span className="material-symbols-outlined">check_circle</span>
<div>
<p className="font-bold">Validation réussie</p>
<p className="text-sm opacity-90">Les notes ont été publiées sur le portail parent.</p>
</div>
</div>
<script>
        // Simple Interaction logic
        const validateBtn = document.getElementById('validateBtn');
        const toast = document.getElementById('toast');

        validateBtn.addEventListener('click', () =&gt; &#123;
            validateBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;refresh&lt;/span&gt; Validation...';
            validateBtn.classList.add('opacity-70', 'pointer-events-none');
            
            setTimeout(() =&gt; &#123;
                toast.classList.remove('translate-x-[150%]');
                validateBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;done_all&lt;/span&gt; Validated';
                validateBtn.classList.replace('bg-secondary-container', 'bg-tertiary');
                validateBtn.classList.replace('text-on-secondary-container', 'text-white');
                
                setTimeout(() =&gt; &#123;
                    toast.classList.add('translate-x-[150%]');
                &#125;, 4000);
            &#125;, 1500);
        &#125;);

        // Trigger Histogram animation on load
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const bars = document.querySelectorAll('.histogram-bar');
            bars.forEach(bar =&gt; &#123;
                const finalHeight = bar.style.height;
                bar.style.height = '0%';
                setTimeout(() =&gt; &#123;
                    bar.style.height = finalHeight;
                &#125;, 300);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
