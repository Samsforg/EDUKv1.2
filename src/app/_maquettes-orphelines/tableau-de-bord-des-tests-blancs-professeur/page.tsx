import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Pro - Gestion des Tests Blancs" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container shadow-sm flex items-center justify-between px-8 h-16 w-full">
<div className="flex items-center gap-4">
<button className="p-2 hover:bg-primary-container/20 transition-colors active:scale-95 duration-150 rounded-full">
<span className="material-symbols-outlined" data-icon="menu">menu</span>
</button>
<h1 className="font-headline font-bold text-headline-md leading-none">Edukora Pro - Tests Blancs</h1>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:flex gap-4">
<span className="text-on-primary font-bold transition-colors">Tests Blancs</span>
<span className="text-on-primary-fixed-variant hover:text-on-primary transition-colors cursor-pointer">Banque de Questions</span>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border-2 border-on-primary-container/30">
<img className="w-full h-full object-cover" src="/images/ecran-361.png" alt="A professional portrait of an Ivorian male professor in a scholarly setting. He is wearing a crisp white shirt and a blue blazer, looking confidently at the camera. The background is a blurred academic office with books and a certificate on the wall. The lighting is bright and natural, conveying expertise and trust." />
</div>
</div>
</header>
<div className="flex flex-1 pt-16 h-full overflow-hidden">

<aside className="hidden md:flex flex-col h-[calc(100vh-64px)] w-72 bg-surface dark:bg-surface-container-low border-r border-outline-variant py-4 sticky top-16">
<div className="px-6 mb-8 flex items-center gap-3">
<div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-3xl" data-icon="school">school</span>
</div>
<div>
<p className="font-headline font-bold text-primary">Prof. Koffi</p>
<p className="text-xs text-on-surface-variant">Lycée Classique d'Abidjan</p>
</div>
</div>
<nav className="flex-1 space-y-1">
<div className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="dashboard">dashboard</span>
<span className="font-body text-body-md">Tableau de Bord</span>
</div>
<div className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
<span className="font-body text-body-md">Mes Classes</span>
</div>
<div className="flex items-center gap-3 py-3 px-6 bg-secondary-container text-on-secondary-container font-semibold rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="quiz" style={{"fontVariationSettings":"'FILL' 1"}}>quiz</span>
<span className="font-body text-body-md">Tests Blancs</span>
</div>
<div className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="history_edu">history_edu</span>
<span className="font-body text-body-md">Banque de Questions</span>
</div>
<div className="flex items-center gap-3 py-3 px-6 text-on-surface-variant hover:bg-surface-container-high rounded-full mx-2 transition-all cursor-pointer">
<span className="material-symbols-outlined" data-icon="settings">settings</span>
<span className="font-body text-body-md">Paramètres</span>
</div>
</nav>
<div className="mt-auto px-6 py-4">
<div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
<p className="text-xs font-bold text-primary uppercase tracking-tighter mb-1">Aide AI</p>
<p className="text-xs text-on-surface-variant mb-2">Générez un test en 2 min</p>
<button className="w-full py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:opacity-90 active:scale-95 transition-all">Lancer l'Assistant</button>
</div>
</div>
</aside>

<main className="flex-1 overflow-y-auto custom-scrollbar bg-background px-4 md:px-8 py-8">

<div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
<div>
<h2 className="font-headline font-bold text-3xl md:text-4xl text-primary tracking-tight">Gestion des Évaluations</h2>
<p className="text-on-surface-variant mt-2 max-w-xl">Préparez vos élèves aux examens nationaux BEPC et BAC avec des tests blancs conformes aux standards officiels.</p>
</div>
<button className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary-container text-on-secondary-container font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all w-full md:w-auto">
<span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
<span>Nouveau Test Blanc</span>
</button>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
<div className="md:col-span-2 p-6 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between h-48">
<div className="flex justify-between items-start">
<span className="p-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-lg">
<span className="material-symbols-outlined" data-icon="fact_check">fact_check</span>
</span>
<span className="text-xs font-bold text-tertiary bg-tertiary-container/20 px-2 py-1 rounded-full">+12% ce mois</span>
</div>
<div>
<p className="text-4xl font-headline font-extrabold text-on-surface">24</p>
<p className="text-on-surface-variant font-medium">Tests Publiés</p>
</div>
</div>
<div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between h-48">
<div className="p-2 bg-secondary-fixed text-on-secondary-fixed rounded-lg w-fit">
<span className="material-symbols-outlined" data-icon="edit_document">edit_document</span>
</div>
<div>
<p className="text-4xl font-headline font-extrabold text-on-surface">05</p>
<p className="text-on-surface-variant font-medium">Brouillons</p>
</div>
</div>
<div className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl flex flex-col justify-between h-48">
<div className="p-2 bg-primary-fixed text-on-primary-fixed rounded-lg w-fit">
<span className="material-symbols-outlined" data-icon="group_add">group_add</span>
</div>
<div>
<p className="text-4xl font-headline font-extrabold text-on-surface">1.2k</p>
<p className="text-on-surface-variant font-medium">Participations</p>
</div>
</div>
</div>

<div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2 no-scrollbar">
<button className="px-5 py-2 rounded-full bg-primary text-on-primary font-bold text-sm whitespace-nowrap">Tout Voir</button>
<button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors font-medium text-sm whitespace-nowrap">Session BAC 2024</button>
<button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors font-medium text-sm whitespace-nowrap">Session BEPC 2024</button>
<button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors font-medium text-sm whitespace-nowrap">Mathématiques</button>
<button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:bg-surface-variant transition-colors font-medium text-sm whitespace-nowrap">Français</button>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">

<div className="lg:col-span-2 space-y-6">
<div className="flex items-center justify-between">
<h3 className="font-headline font-bold text-xl flex items-center gap-2">
<span className="material-symbols-outlined text-secondary" data-icon="pending_actions">pending_actions</span>
                            Brouillons &amp; Récents
                        </h3>
</div>

<div className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-secondary transition-all">
<div className="p-6 flex flex-col md:flex-row gap-6">
<div className="w-full md:w-32 h-24 rounded-lg bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
<span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40" data-icon="architecture">architecture</span>
<div className="absolute bottom-2 left-2 bg-secondary text-on-secondary text-[10px] font-bold px-2 py-0.5 rounded">BAC</div>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">Test Blanc Régional - Mathématiques</h4>
<span className="text-xs font-bold text-secondary-container bg-secondary-container/10 px-2 py-1 rounded">BROUILLON</span>
</div>
<p className="text-sm text-on-surface-variant mb-4">Série C &amp; D • Dernière modification il y a 2 heures</p>
<div className="flex items-center gap-4">
<div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[65%] rounded-full"></div>
</div>
<span className="text-xs font-bold text-on-surface-variant whitespace-nowrap">65% complété</span>
</div>
</div>
<div className="flex md:flex-col justify-end gap-2">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-error transition-colors">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>

<div className="group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:border-secondary transition-all">
<div className="p-6 flex flex-col md:flex-row gap-6">
<div className="w-full md:w-32 h-24 rounded-lg bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
<span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-40" data-icon="description">description</span>
<div className="absolute bottom-2 left-2 bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded">BEPC</div>
</div>
<div className="flex-1">
<div className="flex justify-between items-start mb-1">
<h4 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">Composition de Fin d'Année - Français</h4>
<span className="text-xs font-bold text-secondary-container bg-secondary-container/10 px-2 py-1 rounded">BROUILLON</span>
</div>
<p className="text-sm text-on-surface-variant mb-4">Niveau 3ème • Créé hier à 14:30</p>
<div className="flex items-center gap-4">
<div className="flex-1 bg-surface-container-high h-2 rounded-full overflow-hidden">
<div className="bg-secondary-container h-full w-[30%] rounded-full"></div>
</div>
<span className="text-xs font-bold text-on-surface-variant whitespace-nowrap">30% complété</span>
</div>
</div>
<div className="flex md:flex-col justify-end gap-2">
<button className="p-2 hover:bg-surface-container-high rounded-lg text-primary transition-colors">
<span className="material-symbols-outlined" data-icon="edit">edit</span>
</button>
<button className="p-2 hover:bg-surface-container-high rounded-lg text-error transition-colors">
<span className="material-symbols-outlined" data-icon="delete">delete</span>
</button>
</div>
</div>
</div>
</div>

<div className="space-y-6">
<h3 className="font-headline font-bold text-xl flex items-center gap-2">
<span className="material-symbols-outlined text-tertiary" data-icon="cloud_done">cloud_done</span>
                        Dernières Publications
                    </h3>
<div className="space-y-3">
<div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:shadow-md transition-shadow cursor-pointer">
<div className="flex items-start justify-between mb-2">
<p className="font-bold text-on-surface line-clamp-1">Physique-Chimie BAC D</p>
<span className="material-symbols-outlined text-tertiary text-sm" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
<span className="material-symbols-outlined text-sm" data-icon="groups">groups</span>
<span>142 Élèves</span>
<span className="mx-1">•</span>
<span>Moy: 12.4/20</span>
</div>
<button className="w-full py-2 bg-surface-container text-primary font-bold text-xs rounded-lg hover:bg-primary/10 transition-colors">Résultats</button>
</div>
<div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:shadow-md transition-shadow cursor-pointer">
<div className="flex items-start justify-between mb-2">
<p className="font-bold text-on-surface line-clamp-1">SVT - Épreuve de Type BEPC</p>
<span className="material-symbols-outlined text-tertiary text-sm" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
<span className="material-symbols-outlined text-sm" data-icon="groups">groups</span>
<span>89 Élèves</span>
<span className="mx-1">•</span>
<span>Moy: 14.1/20</span>
</div>
<button className="w-full py-2 bg-surface-container text-primary font-bold text-xs rounded-lg hover:bg-primary/10 transition-colors">Résultats</button>
</div>
<div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:shadow-md transition-shadow cursor-pointer">
<div className="flex items-start justify-between mb-2">
<p className="font-bold text-on-surface line-clamp-1">Philosophie - Sujet 1 BAC</p>
<span className="material-symbols-outlined text-tertiary text-sm" data-icon="check_circle" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<div className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
<span className="material-symbols-outlined text-sm" data-icon="groups">groups</span>
<span>56 Élèves</span>
<span className="mx-1">•</span>
<span>Moy: 10.8/20</span>
</div>
<button className="w-full py-2 bg-surface-container text-primary font-bold text-xs rounded-lg hover:bg-primary/10 transition-colors">Résultats</button>
</div>
</div>
<button className="w-full py-3 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 rounded-xl transition-all">
                        Voir tout l'historique
                        <span className="material-symbols-outlined text-sm" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
</div>
</main>
</div>

<nav className="md:hidden fixed bottom-0 w-full z-50 rounded-t-xl bg-surface-container-highest dark:bg-surface-container-low border-t border-outline-variant shadow-lg flex justify-around items-center px-4 py-2 w-full">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90 duration-150">
<span className="material-symbols-outlined" data-icon="visibility">visibility</span>
<span className="font-label text-label-xs uppercase tracking-wider">Aperçu</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full p-2 h-12 w-16 active:scale-90 transition-transform">
<span className="material-symbols-outlined" data-icon="edit_note">edit_note</span>
<span className="font-label text-label-xs uppercase tracking-wider">Éditeur</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90 duration-150">
<span className="material-symbols-outlined" data-icon="tune">tune</span>
<span className="font-label text-label-xs uppercase tracking-wider">Paramètres</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-transform active:scale-90 duration-150">
<span className="material-symbols-outlined" data-icon="send">send</span>
<span className="font-label text-label-xs uppercase tracking-wider">Publier</span>
</div>
</nav>

<div className="fixed bottom-8 right-8 hidden md:block group">
<div className="absolute bottom-full right-0 mb-4 bg-primary text-on-primary text-xs py-2 px-4 rounded-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all shadow-xl pointer-events-none w-48">
            Besoin d'aide pour formuler une question complexe ?
        </div>
<button className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
<span className="material-symbols-outlined text-3xl" data-icon="auto_awesome">auto_awesome</span>
</button>
</div>
<script>
        // Simple Interaction Logic
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const buttons = document.querySelectorAll('button');
            buttons.forEach(btn =&gt; &#123;
                btn.addEventListener('click', function(e) &#123;
                    let ripple = document.createElement('span');
                    ripple.classList.add('ripple');
                    this.appendChild(ripple);
                    setTimeout(() =&gt; &#123; ripple.remove(); &#125;, 600);
                &#125;);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
