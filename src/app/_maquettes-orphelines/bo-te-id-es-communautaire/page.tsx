import type { Metadata } from "next";

export const metadata: Metadata = { title: "Support Edukora - Boîte à Idées" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen pb-24" >

<header className="fixed top-0 w-full z-50 bg-primary dark:bg-primary-container text-on-primary flex items-center justify-between px-4 h-16 w-full">
<div className="flex items-center gap-3">
<button className="active:scale-95 transition-transform hover:bg-primary-container/20 p-2 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<img alt="Edukora Logo" className="h-8 w-8 rounded-lg border border-white/20" src="/images/ecran-040.png" />
<h1 className="font-headline font-bold text-headline-md tracking-tight">Boîte à Idées</h1>
</div>
<div className="flex items-center gap-2">
<button className="active:scale-95 transition-transform hover:bg-primary-container/20 p-2 rounded-full">
<span className="material-symbols-outlined">search</span>
</button>
<button className="active:scale-95 transition-transform hover:bg-primary-container/20 p-2 rounded-full">
<span className="material-symbols-outlined">account_circle</span>
</button>
</div>
</header>
<main className="pt-20 px-4 max-w-4xl mx-auto">

<section className="py-6 mb-4">
<h2 className="text-3xl font-bold text-primary mb-2">Contribuez au futur d'Edukora</h2>
<p className="text-on-surface-variant text-lg">Proposez des fonctionnalités pour améliorer votre expérience d'apprentissage.</p>
</section>

<div className="sticky top-16 bg-background/95 backdrop-blur-sm z-40 py-4 flex flex-wrap gap-2 items-center justify-between border-b border-outline-variant/30 mb-6">
<div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
<button className="px-4 py-2 rounded-full bg-secondary text-on-secondary text-sm font-semibold whitespace-nowrap">
                    Plus populaires
                </button>
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant text-sm font-medium whitespace-nowrap hover:bg-surface-container-high transition-colors">
                    Récents
                </button>
<button className="px-4 py-2 rounded-full bg-surface-container text-on-surface-variant text-sm font-medium whitespace-nowrap hover:bg-surface-container-high transition-colors">
                    En planification
                </button>
</div>
<button className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-sm hover:opacity-90 active:scale-95 transition-all">
<span className="material-symbols-outlined text-[20px]">add</span>
                Suggérer une idée
            </button>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-4">

<div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl idea-card-shadow flex flex-col md:flex-row gap-6 items-start">
<div className="flex flex-col items-center justify-center bg-primary-fixed text-on-primary-fixed p-4 rounded-xl min-w-[80px] group cursor-pointer active:scale-90 transition-transform">
<span className="material-symbols-outlined text-[32px]" style={{"fontVariationSettings":"'FILL' 1"}}>arrow_drop_up</span>
<span className="text-xl font-bold">482</span>
<span className="text-[10px] font-bold uppercase tracking-wider">Votes</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-2">
<span className="bg-tertiary-fixed text-on-tertiary-fixed-variant text-[10px] font-bold uppercase px-2 py-0.5 rounded">Prévu</span>
<span className="text-xs text-outline font-medium">• Il y a 2 jours</span>
</div>
<h3 className="text-xl font-bold text-on-surface mb-2">Mode Hors-Ligne pour les Cours Vidéo</h3>
<p className="text-on-surface-variant leading-relaxed mb-4">Permettre aux étudiants de télécharger les leçons lorsqu'ils ont une connexion Wi-Fi pour les visionner sans consommer de data mobile, particulièrement utile pour les zones reculées.</p>
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container text-xs font-bold">MK</div>
<span className="text-sm font-semibold text-on-surface">Moussa Koné</span>
<div className="flex -space-x-2 ml-auto">
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-300"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-slate-400"></div>
<div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-surface-container text-[8px] font-bold">+12</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl idea-card-shadow flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-4">
<div className="flex flex-col items-center bg-surface-container-high text-on-surface-variant px-3 py-2 rounded-lg cursor-pointer active:bg-primary-container active:text-on-primary-container transition-all">
<span className="material-symbols-outlined">expand_less</span>
<span className="font-bold">124</span>
</div>
<span className="text-xs text-outline">Il y a 5h</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-2">Simulateur de BAC Blanc par SMS</h3>
<p className="text-sm text-on-surface-variant line-clamp-3 mb-4">Une version ultra-allégée accessible via USSD ou SMS pour réviser sans smartphone.</p>
</div>
<div className="flex items-center gap-2">
<img className="w-6 h-6 rounded-full object-cover" src="/images/ecran-041.png" alt="A portrait photograph of a young Ivorian female student smiling warmly, wearing a professional yet casual university polo shirt. The lighting is soft and natural, emphasizing a bright and optimistic educational atmosphere. The background is a clean, modern library setting with blurred bookshelves, maintaining a high-key light mode aesthetic." />
<span className="text-xs font-medium">Awa Coulibaly</span>
</div>
</div>

<div className="md:col-span-6 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl idea-card-shadow flex flex-col justify-between">
<div>
<div className="flex justify-between items-start mb-4">
<div className="flex flex-col items-center bg-surface-container-high text-on-surface-variant px-3 py-2 rounded-lg cursor-pointer hover:bg-primary-container hover:text-on-primary-container transition-all">
<span className="material-symbols-outlined">expand_less</span>
<span className="font-bold">89</span>
</div>
<span className="text-xs text-outline">Hier</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-2">Forum de discussion par matière</h3>
<p className="text-sm text-on-surface-variant line-clamp-3 mb-4">Espaces dédiés pour poser des questions spécifiques en Mathématiques, Physique ou Philosophie.</p>
</div>
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed text-[10px] font-bold">JD</div>
<span className="text-xs font-medium">Jean-Dominique</span>
</div>
</div>

<div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl idea-card-shadow">
<div className="flex gap-4">
<div className="flex flex-col items-center bg-surface-container-high text-on-surface-variant px-3 py-2 h-fit rounded-lg cursor-pointer">
<span className="material-symbols-outlined">expand_less</span>
<span className="font-bold">215</span>
</div>
<div className="flex-1">
<div className="flex items-center gap-2 mb-1">
<span className="text-xs text-outline">Posté il y a 3 jours</span>
</div>
<h3 className="text-lg font-bold text-on-surface mb-1">Corrections vocales par l'IA</h3>
<p className="text-sm text-on-surface-variant mb-4">L'tuteur IA pourrait expliquer les erreurs à l'oral pour les élèves ayant des difficultés de lecture.</p>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container text-[10px] font-bold">SM</div>
<span className="text-xs font-medium">Saliou M.</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-sm">chat_bubble</span>
<span className="text-xs font-bold">14 commentaires</span>
</div>
</div>
</div>
</div>
</div>

<div className="md:col-span-4 bg-primary text-on-primary p-5 rounded-xl flex flex-col justify-center items-center text-center">
<span className="material-symbols-outlined text-4xl mb-2" style={{"fontVariationSettings":"'FILL' 1"}}>military_tech</span>
<h4 className="font-bold text-lg leading-tight mb-2">Devenez Ambassadeur</h4>
<p className="text-xs opacity-80 mb-4">Les 5 meilleures suggestions de ce mois recevront un abonnement Premium d'un an.</p>
<button className="w-full py-2 bg-on-primary text-primary rounded-lg text-xs font-bold uppercase tracking-wider">En savoir plus</button>
</div>

<div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant p-5 rounded-xl idea-card-shadow flex items-center gap-4">
<div className="flex flex-col items-center bg-surface-container-high text-on-surface-variant px-3 py-2 rounded-lg cursor-pointer">
<span className="material-symbols-outlined">expand_less</span>
<span className="font-bold">56</span>
</div>
<div className="flex-1">
<h3 className="font-bold text-on-surface">Badges de motivation pour les séries d'examens</h3>
<p className="text-sm text-on-surface-variant">Un système de gamification plus poussé pour encourager la régularité.</p>
</div>
<div className="text-xs text-outline whitespace-nowrap">Il y a 6 jours</div>
</div>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface dark:bg-inverse-surface border-t border-outline-variant dark:border-outline shadow-md flex justify-around items-center h-20 px-2 pb-2 w-full">
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high px-4 py-1 rounded-full transition-all" href="#">
<span className="material-symbols-outlined" data-icon="home">home</span>
<span className="font-label text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high px-4 py-1 rounded-full transition-all" href="#">
<span className="material-symbols-outlined" data-icon="menu_book">menu_book</span>
<span className="font-label text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant hover:bg-surface-container-high px-4 py-1 rounded-full transition-all" href="#">
<span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
<span className="font-label text-label-xs">Tuteur IA</span>
</a>
<a className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200" href="#">
<span className="material-symbols-outlined" data-icon="person" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs">Profil</span>
</a>
</nav>

<script>
        document.querySelectorAll('[data-icon]').forEach(el =&gt; &#123;
            const iconName = el.getAttribute('data-icon');
            el.classList.add('material-symbols-outlined');
            el.textContent = iconName;
        &#125;);

        // Simple interaction for upvotes
        document.querySelectorAll('.cursor-pointer').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                const counter = this.querySelector('.font-bold');
                if (counter &amp;&amp; !this.dataset.voted) &#123;
                    let val = parseInt(counter.textContent);
                    counter.textContent = val + 1;
                    this.dataset.voted = 'true';
                    this.classList.add('bg-primary', 'text-on-primary');
                    this.classList.remove('bg-surface-container-high', 'text-on-surface-variant');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
