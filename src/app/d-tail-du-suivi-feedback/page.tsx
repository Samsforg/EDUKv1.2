import type { Metadata } from "next";

export const metadata: Metadata = { title: "Détails de la Contribution - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body min-h-screen pb-24" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="material-symbols-outlined active:scale-95 transition-transform hover:bg-primary-container/20 p-2 rounded-full">arrow_back</button>
<h1 className="font-headline font-bold text-on-primary text-headline-md">Suivi de Contribution</h1>
</div>
<div className="flex items-center gap-2">
<img alt="Edukora Logo" className="w-8 h-8 rounded-lg" src="/images/ecran-113.png" />
<button className="material-symbols-outlined active:scale-95 transition-transform hover:bg-primary-container/20 p-2 rounded-full">account_circle</button>
</div>
</header>
<main className="pt-20 px-4 max-w-4xl mx-auto space-y-6">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
<div className="flex justify-between items-start mb-4">
<div>
<span className="inline-block px-3 py-1 rounded-full text-label-xs font-semibold bg-secondary-container text-on-secondary-container mb-2 uppercase tracking-wider">
                        En cours d'examen
                    </span>
<h2 className="font-headline text-2xl font-bold text-primary">Ajout de modules de Mathématiques BAC D</h2>
<p className="text-on-surface-variant text-body-md mt-1 italic">Soumis le 14 Octobre 2023</p>
</div>
<div className="bg-primary-fixed p-3 rounded-xl">
<span className="material-symbols-outlined text-primary scale-125">auto_stories</span>
</div>
</div>
<p className="text-on-surface text-body-md leading-relaxed border-t border-outline-variant pt-4">
                "Je suggère d'ajouter plus d'exercices corrigés sur les fonctions logarithmes et exponentielles pour le programme Ivoirien du BAC D. C'est une partie complexe du programme."
            </p>
</section>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<section className="md:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
<h3 className="font-headline text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">timeline</span>
                    Évolution de votre demande
                </h3>
<div className="space-y-0 relative">

<div className="flex gap-4 min-h-[80px]">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center text-on-tertiary">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check</span>
</div>
<div className="step-line step-line-completed"></div>
</div>
<div className="pb-6">
<p className="font-bold text-tertiary">Demande Envoyée</p>
<p className="text-label-sm text-on-surface-variant">14 Oct. 2023 à 10:45</p>
<p className="text-body-md text-on-surface mt-1">Votre contribution a bien été enregistrée par nos systèmes.</p>
</div>
</div>

<div className="flex gap-4 min-h-[80px]">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary ring-4 ring-primary-fixed">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>sync</span>
</div>
<div className="step-line step-line-active"></div>
</div>
<div className="pb-6">
<p className="font-bold text-primary">Analyse par l'équipe Edukora</p>
<p className="text-label-sm text-on-surface-variant">15 Oct. 2023 à 09:12</p>
<p className="text-body-md text-on-surface mt-1 font-medium">Un administrateur pédagogique examine la pertinence du contenu proposé.</p>
</div>
</div>

<div className="flex gap-4 min-h-[80px]">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-outline-variant flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-sm">schedule</span>
</div>
<div className="step-line"></div>
</div>
<div className="pb-6">
<p className="font-bold text-outline">Planification du Développement</p>
<p className="text-label-sm text-on-surface-variant italic">En attente...</p>
</div>
</div>

<div className="flex gap-4 min-h-[80px]">
<div className="flex flex-col items-center">
<div className="w-8 h-8 rounded-full bg-surface-container-high border-2 border-outline-variant flex items-center justify-center text-outline">
<span className="material-symbols-outlined text-sm">rocket_launch</span>
</div>
</div>
<div className="pb-6">
<p className="font-bold text-outline">Mise en ligne &amp; Récompense</p>
<p className="text-label-sm text-on-surface-variant italic">Bientôt disponible</p>
</div>
</div>
</div>
</section>

<section className="space-y-6">
<div className="bg-primary-container text-on-primary-container p-6 rounded-xl">
<h4 className="text-label-sm font-semibold uppercase opacity-80 mb-2">Impact Estimé</h4>
<p className="text-4xl font-bold font-headline mb-1">12k+</p>
<p className="text-body-md">Élèves de BAC D concernés en Côte d'Ivoire.</p>
</div>
<div className="bg-tertiary-container text-on-tertiary-container p-6 rounded-xl">
<h4 className="text-label-sm font-semibold uppercase opacity-80 mb-2">Récompense Prévue</h4>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-3xl">military_tech</span>
<div>
<p className="font-bold">Badge "Contributeur Expert"</p>
<p className="text-label-sm">+150 points d'honneur</p>
</div>
</div>
</div>
</section>
</div>

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col h-[500px]">
<div className="bg-surface-container-high px-6 py-4 border-b border-outline-variant flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">E</div>
<div>
<h3 className="font-bold text-on-surface">Équipe Support Edukora</h3>
<p className="text-label-xs text-on-surface-variant flex items-center gap-1">
<span className="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span> Réponse habituelle en 2h
                        </p>
</div>
</div>
<button className="material-symbols-outlined text-on-surface-variant hover:text-primary p-2">more_vert</button>
</div>

<div className="chat-area flex-grow overflow-y-auto p-6 space-y-4 bg-surface-container-low/30">

<div className="flex justify-center">
<span className="bg-outline-variant/30 text-on-surface-variant text-[10px] uppercase font-bold px-3 py-1 rounded-full">Aujourd'hui</span>
</div>

<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-sm">support_agent</span>
</div>
<div className="bg-surface-container-lowest border border-primary/20 rounded-xl rounded-tl-none p-4 shadow-sm">
<p className="text-body-md text-on-surface">Bonjour Kouassi ! Merci pour votre suggestion. Nous avons transmis votre demande au département Mathématiques. Ils vérifient actuellement si les ressources sont déjà en production pour la session BAC 2024.</p>
<p className="text-[10px] text-on-surface-variant mt-2 text-right">09:15</p>
</div>
</div>

<div className="flex items-start gap-3 flex-row-reverse max-w-[85%] ml-auto">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0 font-bold text-xs">
                        K
                    </div>
<div className="bg-primary text-on-primary rounded-xl rounded-tr-none p-4 shadow-md">
<p className="text-body-md">Super, merci ! N'hésitez pas si vous avez besoin de scans de mes anciennes fiches de révisions, elles sont très bien notées par mes profs.</p>
<p className="text-[10px] text-on-primary/70 mt-2 text-right">09:30</p>
</div>
</div>

<div className="flex items-start gap-3 max-w-[85%]">
<div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-sm">support_agent</span>
</div>
<div className="bg-surface-container-lowest border border-primary/20 rounded-xl rounded-tl-none p-4 shadow-sm">
<p className="text-body-md text-on-surface">C'est noté ! Nous revenons vers vous dès que le statut passe à "Planifié". Merci pour votre engagement envers la communauté Edukora !</p>
<div className="mt-2 flex gap-2">
<span className="px-2 py-1 bg-tertiary-container/20 text-on-tertiary-container text-[10px] rounded border border-tertiary/20">#MathsBACD</span>
<span className="px-2 py-1 bg-tertiary-container/20 text-on-tertiary-container text-[10px] rounded border border-tertiary/20">#Session2024</span>
</div>
<p className="text-[10px] text-on-surface-variant mt-2 text-right">Il y a 5 min</p>
</div>
</div>
</div>

<div className="p-4 bg-surface-container-lowest border-t border-outline-variant">
<div className="flex items-end gap-3">
<button className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container-high rounded-full">add_circle</button>
<div className="flex-grow relative">
<textarea className="w-full bg-surface-container-low border-none focus:ring-2 focus:ring-primary rounded-xl py-3 px-4 text-body-md resize-none transition-all" placeholder="Écrire un message à l'équipe..." rows={1}></textarea>
</div>
<button className="bg-secondary text-on-secondary w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all opacity-50">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>send</span>
</button>
</div>
<div className="mt-3 flex gap-2 overflow-x-auto pb-1">
<button className="whitespace-nowrap px-3 py-1.5 rounded-full border border-outline-variant text-label-xs text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">Merci pour l'info !</button>
<button className="whitespace-nowrap px-3 py-1.5 rounded-full border border-outline-variant text-label-xs text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">C'est urgent</button>
<button className="whitespace-nowrap px-3 py-1.5 rounded-full border border-outline-variant text-label-xs text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors">Ajouter un document</button>
</div>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-md flex justify-around items-center h-20 px-2 pb-2">
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-all">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-all">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high p-2 rounded-lg transition-all">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs">Tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for the send button
        const textarea = document.querySelector('textarea');
        const sendBtn = textarea.parentElement.nextElementSibling;
        
        textarea.addEventListener('input', function() &#123;
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            if (this.value.trim() !== "") &#123;
                sendBtn.classList.remove('opacity-50');
            &#125; else &#123;
                sendBtn.classList.add('opacity-50');
            &#125;
        &#125;);

        // Initialize state
        sendBtn.classList.add('opacity-50');

        // Scroll to bottom of chat on load
        const chatArea = document.querySelector('.chat-area');
        chatArea.scrollTop = chatArea.scrollHeight;
    </script>



    </div>
  );
}
