import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Professeur - Détails Bulletin" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container shadow-sm flex items-center justify-between px-4 md:px-8 h-16 w-full">
<div className="flex items-center gap-4">
<button className="text-on-primary cursor-pointer active:scale-95 transition-transform">
<span className="material-symbols-outlined">menu</span>
</button>
<h1 className="font-headline text-2xl font-bold text-on-primary">Edukora Professeur</h1>
</div>
<div className="flex items-center gap-4">
<div className="hidden md:flex gap-6 mr-6">
<span className="text-on-primary font-bold cursor-pointer">Tableau de bord</span>
<span className="text-on-primary/80 hover:bg-primary-container/50 transition-colors cursor-pointer px-2 rounded">Bulletins</span>
</div>
<div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden border-2 border-on-primary/20">
<img className="w-full h-full object-cover" src="/images/ecran-042.png" alt="A professional portrait of an Ivorian male teacher in his late 40s, wearing a clean white shirt and glasses, smiling warmly. The background is a slightly blurred academic office with books and a wooden desk, illuminated by soft natural light. High-quality corporate photography style, trustworthy and institutional mood." />
</div>
</div>
</header>

<aside className="hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 h-full w-72 rounded-r-xl bg-surface dark:bg-surface-dim border-r border-outline-variant dark:border-outline pt-20 shadow-md">
<div className="px-6 py-4 mb-6">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined">person</span>
</div>
<div>
<p className="font-headline font-semibold text-primary">M. Kouassi</p>
<p className="text-xs text-on-surface-variant">Professeur Principal</p>
</div>
</div>
<p className="mt-2 text-[10px] uppercase tracking-wider text-outline font-bold">Année 2023-2024</p>
</div>
<nav className="flex flex-col gap-1">
<div className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-colors">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body text-body-md">Tableau de bord</span>
</div>
<div className="flex items-center gap-3 py-3 px-4 mx-2 bg-primary-container text-on-primary-container font-semibold rounded-full cursor-pointer">
<span className="material-symbols-outlined">description</span>
<span className="font-body text-body-md">Génération Bulletins</span>
</div>
<div className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-colors">
<span className="material-symbols-outlined">settings</span>
<span className="font-body text-body-md">Configuration</span>
</div>
<div className="flex items-center gap-3 py-3 px-4 mx-2 text-on-surface-variant hover:bg-surface-container-high rounded-full cursor-pointer transition-colors">
<span className="material-symbols-outlined">history</span>
<span className="font-body text-body-md">Archives</span>
</div>
</nav>
</aside>

<main className="pt-24 pb-24 md:pb-8 px-4 md:ml-80 md:mr-8 max-w-6xl">

<div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
<div>
<nav className="flex text-xs text-outline mb-2">
<span className="hover:underline cursor-pointer">Classes</span>
<span className="mx-2">/</span>
<span className="hover:underline cursor-pointer">3ème A</span>
<span className="mx-2">/</span>
<span className="text-primary font-bold">Koffi Konan</span>
</nav>
<h2 className="font-headline text-3xl font-bold text-on-surface">Détail du Bulletin</h2>
<p className="text-on-surface-variant italic">Premier Trimestre - Session 2023</p>
</div>
<div className="flex gap-3">
<button className="flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors active:scale-95">
<span className="material-symbols-outlined">edit</span>
                    Éditer les appréciations
                </button>
<button className="flex items-center gap-2 px-4 py-2 bg-secondary text-on-secondary rounded-lg font-semibold shadow-sm hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined">picture_as_pdf</span>
                    Télécharger en PDF
                </button>
</div>
</div>

<div className="bento-grid mb-8">
<div className="col-span-1 md:col-span-2 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl flex items-center gap-6">
<div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-043.png" alt="A portrait of a teenage West African male student with a bright, focused expression. He is wearing a standard light blue school uniform polo shirt. The lighting is crisp and academic, set against a simple neutral classroom background. The style is professional, modern, and high-definition." />
</div>
<div>
<h3 className="text-2xl font-bold text-on-surface">Koffi Konan</h3>
<p className="text-on-surface-variant">Matricule: CI-2023-008942</p>
<div className="flex items-center gap-2 mt-2">
<span className="px-2 py-0.5 bg-tertiary-container text-on-tertiary-container text-[10px] font-bold rounded uppercase">Excellent</span>
<span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded uppercase">3ème A</span>
</div>
</div>
</div>
<div className="col-span-1 bg-primary text-on-primary p-6 rounded-xl flex flex-col justify-between">
<p className="text-sm opacity-80 uppercase font-bold tracking-widest">Moyenne Générale</p>
<div>
<span className="text-4xl font-bold">16.42</span>
<span className="text-lg opacity-80">/ 20</span>
</div>
</div>
<div className="col-span-1 bg-surface-container-highest p-6 rounded-xl flex flex-col justify-between">
<p className="text-sm text-on-surface-variant uppercase font-bold tracking-widest">Rang Global</p>
<div>
<span className="text-4xl font-bold text-primary">02<sup className="text-sm">ème</sup></span>
<span className="text-sm text-on-surface-variant ml-1">sur 45 élèves</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="px-6 py-4 border-b border-outline-variant bg-surface-container-low flex justify-between items-center">
<h4 className="font-headline font-bold text-on-surface">Relevé de Notes par Matière</h4>
<span className="text-xs text-outline italic">Mis à jour le 12 Octobre 2023</span>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead className="bg-surface-container text-on-surface-variant text-xs uppercase font-bold tracking-wider">
<tr>
<th className="px-6 py-4">Matière</th>
<th className="px-6 py-4 text-center">Coeff</th>
<th className="px-6 py-4 text-center">Élève</th>
<th className="px-6 py-4 text-center">Classe</th>
<th className="px-6 py-4 text-center">Rang</th>
<th className="px-6 py-4">Appréciation du Professeur</th>
</tr>
</thead>
<tbody className="divide-y divide-outline-variant text-sm">
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-primary">Mathématiques</td>
<td className="px-6 py-4 text-center">4</td>
<td className="px-6 py-4 text-center font-bold">17.5</td>
<td className="px-6 py-4 text-center text-on-surface-variant">11.2</td>
<td className="px-6 py-4 text-center">01<sup className="text-[10px]">er</sup></td>
<td className="px-6 py-4 text-on-surface-variant">Excellent travail. Très rigoureux dans les raisonnements.</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-primary">Français</td>
<td className="px-6 py-4 text-center">4</td>
<td className="px-6 py-4 text-center font-bold">14.0</td>
<td className="px-6 py-4 text-center text-on-surface-variant">10.5</td>
<td className="px-6 py-4 text-center">05<sup className="text-[10px]">ème</sup></td>
<td className="px-6 py-4 text-on-surface-variant">Bonne expression écrite. Doit participer davantage à l'oral.</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-primary">Physique-Chimie</td>
<td className="px-6 py-4 text-center">3</td>
<td className="px-6 py-4 text-center font-bold">18.0</td>
<td className="px-6 py-4 text-center text-on-surface-variant">09.8</td>
<td className="px-6 py-4 text-center">01<sup className="text-[10px]">er</sup></td>
<td className="px-6 py-4 text-on-surface-variant">Résultats brillants. Maîtrise parfaite du programme.</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-primary">Anglais</td>
<td className="px-6 py-4 text-center">3</td>
<td className="px-6 py-4 text-center font-bold">15.5</td>
<td className="px-6 py-4 text-center text-on-surface-variant">12.1</td>
<td className="px-6 py-4 text-center">03<sup className="text-[10px]">ème</sup></td>
<td className="px-6 py-4 text-on-surface-variant">De réels progrès. Continuez ainsi.</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-primary">Histoire-Géo</td>
<td className="px-6 py-4 text-center">2</td>
<td className="px-6 py-4 text-center font-bold">16.0</td>
<td className="px-6 py-4 text-center text-on-surface-variant">10.0</td>
<td className="px-6 py-4 text-center">02<sup className="text-[10px]">ème</sup></td>
<td className="px-6 py-4 text-on-surface-variant">Très satisfaisant. Curiosité intellectuelle marquée.</td>
</tr>
<tr className="hover:bg-surface-container/50 transition-colors">
<td className="px-6 py-4 font-semibold text-primary">SVT</td>
<td className="px-6 py-4 text-center">2</td>
<td className="px-6 py-4 text-center font-bold">15.0</td>
<td className="px-6 py-4 text-center text-on-surface-variant">10.3</td>
<td className="px-6 py-4 text-center">04<sup className="text-[10px]">ème</sup></td>
<td className="px-6 py-4 text-on-surface-variant">Travail sérieux et régulier.</td>
</tr>
</tbody>
</table>
</div>
</div>

<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-tertiary/5 border border-tertiary-container p-6 rounded-xl">
<div className="flex items-center gap-3 mb-4">
<span className="material-symbols-outlined text-tertiary" style={{"fontVariationSettings":"'FILL' 1"}}>workspace_premium</span>
<h4 className="font-headline font-bold text-tertiary text-lg">Mentions &amp; Distinctions</h4>
</div>
<div className="space-y-3">
<div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-tertiary-container/20">
<span className="text-sm font-medium">Tableau d'Honneur</span>
<span className="material-symbols-outlined text-tertiary">check_circle</span>
</div>
<div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-tertiary-container/20">
<span className="text-sm font-medium">Félicitations du Conseil</span>
<span className="material-symbols-outlined text-tertiary">stars</span>
</div>
<div className="flex items-center justify-between p-3 opacity-30">
<span className="text-sm font-medium">Blâme / Avertissement</span>
<span className="material-symbols-outlined">block</span>
</div>
</div>
</div>
<div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant">
<h4 className="font-headline font-bold text-on-surface text-lg mb-4">Avis Global du Conseil</h4>
<div className="relative bg-surface-container-lowest p-4 rounded-lg border-l-4 border-primary italic text-on-surface-variant text-sm mb-4">
                    "Koffi est un élève exemplaire dont l'assiduité et la rigueur font la fierté de la 3ème A. Il domine les matières scientifiques tout en maintenant un excellent niveau en langues. Le conseil de classe lui adresse ses félicitations les plus vives."
                </div>
<div className="flex items-center justify-between mt-auto">
<div>
<p className="text-[10px] uppercase font-bold text-outline">Visa du Principal</p>
<p className="text-sm font-bold text-primary">M. TOURE Ahmed</p>
</div>
<div className="w-16 h-16 bg-white border border-outline-variant flex items-center justify-center rounded-full opacity-50 select-none rotate-12">
<span className="text-[8px] font-bold text-primary text-center">SCEAU<br />OFFICIEL</span>
</div>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-lowest dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-lg flex justify-around items-center h-16 w-full px-4">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 duration-150">
<span className="material-symbols-outlined">assignment</span>
<span className="font-label text-label-xs font-semibold">Bulletins</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined">tune</span>
<span className="font-label text-label-xs font-semibold">Config</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined">account_circle</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</div>
</nav>
<script>
        // Simple interactive effect for rows
        document.querySelectorAll('tr').forEach(row =&gt; &#123;
            row.addEventListener('click', () =&gt; &#123;
                if(row.querySelector('td')) &#123;
                    // This could open a mini-modal for specific subject editing
                &#125;
            &#125;);
        &#125;);

        // Simulating PDF generation
        const pdfBtn = document.querySelector('button:has(.material-symbols-outlined:contains("picture_as_pdf"))');
        if(pdfBtn) &#123;
            pdfBtn.addEventListener('click', () =&gt; &#123;
                pdfBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;refresh&lt;/span&gt; Génération...';
                setTimeout(() =&gt; &#123;
                    pdfBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check&lt;/span&gt; Terminé';
                    setTimeout(() =&gt; &#123;
                        pdfBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;picture_as_pdf&lt;/span&gt; Télécharger en PDF';
                    &#125;, 2000);
                &#125;, 1500);
            &#125;);
        &#125;
    </script>

    </div>
  );
}
