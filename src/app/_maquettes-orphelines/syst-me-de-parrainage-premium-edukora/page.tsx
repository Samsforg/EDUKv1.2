import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Système de Parrainage Premium" };

export default function Page() {
  return (
    <div className="text-on-surface bg-surface min-h-screen pb-24 md:pb-0 md:pl-[280px]" style={{ minHeight: "max(884px, 100dvh)" }}>

<nav className="hidden md:flex flex-col h-screen p-stack-md bg-surface-container-lowest border-r border-surface-border fixed left-0 top-0 w-[280px] z-50">
<div className="mb-10 px-4">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Edukora</h1>
</div>
<div className="flex items-center gap-4 mb-10 p-4 rounded-xl bg-surface-container-low">
<div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
<img className="w-full h-full object-cover" src="/images/ecran-342.png" alt="A professional headshot of a confident university student with a bright smile, wearing business-casual academic attire. The background is a soft-focus modern campus library with cool blue lighting and clean architectural lines. The image follows a high-end corporate aesthetic with professional studio lighting and sharp focus on the subject." />
</div>
<div>
<p className="font-title-md text-title-md font-bold text-primary">Edukora Étudiant</p>
<p className="font-body-md text-body-md text-secondary">Plan Découverte</p>
</div>
</div>
<div className="space-y-2 flex-grow">
<a className="flex items-center gap-4 p-4 rounded-lg text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Tableau de bord</span>
</a>
<a className="flex items-center gap-4 p-4 rounded-lg text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-body-md text-body-md">Mes Cours</span>
</a>
<a className="flex items-center gap-4 p-4 rounded-lg text-primary font-bold border-r-4 border-primary bg-surface-container-low transition-all duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-body-md text-body-md">Abonnement</span>
</a>
<a className="flex items-center gap-4 p-4 rounded-lg text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined">settings</span>
<span className="font-body-md text-body-md">Paramètres</span>
</a>
<a className="flex items-center gap-4 p-4 rounded-lg text-secondary hover:bg-surface-container-low transition-all duration-150 ease-in-out" href="#">
<span className="material-symbols-outlined">help</span>
<span className="font-body-md text-body-md">Aide</span>
</a>
</div>
</nav>

<header className="md:hidden flex justify-between items-center px-gutter py-base w-full sticky top-0 z-50 bg-surface-bright border-b border-surface-border">
<h1 className="font-headline-md text-headline-md font-bold text-primary">Edukora</h1>
<div className="flex items-center gap-4">
<span className="material-symbols-outlined text-primary">notifications</span>
<div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center font-bold text-xs">ÉP</div>
</div>
</header>

<main className="max-w-7xl mx-auto p-gutter space-y-gutter">

<section className="premium-gradient rounded-xl p-8 text-white relative overflow-hidden shadow-sm">
<div className="absolute top-0 right-0 w-64 h-64 opacity-10 transform translate-x-20 -translate-y-20">
<span className="material-symbols-outlined text-[200px]" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
</div>
<div className="relative z-10 max-w-2xl">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-6">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="font-label-md text-label-md uppercase tracking-wider">Ambassadeur Élite</span>
</div>
<h2 className="font-headline-lg text-headline-lg font-bold mb-4">Étendez votre réseau académique</h2>
<p className="font-body-lg text-body-lg opacity-90 mb-8">
                    En tant qu'étudiant majeur, votre recommandation a de la valeur. Partagez l'excellence Edukora et débloquez des avantages exclusifs.
                </p>
<div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
<p className="font-title-md text-title-md font-bold mb-2">Offre de parrainage</p>
<p className="font-body-md text-body-md opacity-90">Invitez un ami : vous recevez tous les deux <span className="font-bold underline decoration-expert-purple decoration-2">15 jours de Premium</span> offerts dès son inscription validée.</p>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

<div className="lg:col-span-5 bg-surface-container-lowest border border-surface-border rounded-xl p-6 flex flex-col justify-between">
<div>
<h3 className="font-title-md text-title-md font-bold text-primary mb-2">Votre Code Unique</h3>
<p className="font-body-md text-body-md text-secondary mb-6">Partagez ce code personnel pour identifier vos parrainages.</p>
</div>
<div className="space-y-4">
<div className="flex items-center justify-between p-4 bg-surface-container-low border border-dashed border-primary rounded-lg group">
<span className="font-metric-num text-metric-num text-primary tracking-widest uppercase" id="referralCode">KOFFI-2024</span>
<button className="flex items-center gap-2 text-primary hover:text-primary-container transition-colors">
<span className="material-symbols-outlined" id="copyIcon">content_copy</span>
<span className="font-label-md text-label-md" id="copyText">COPIER</span>
</button>
</div>
<div className="grid grid-cols-3 gap-3">
<button className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 transition-colors">
<span className="material-symbols-outlined text-2xl mb-1">chat</span>
<span className="font-label-md text-label-md">WhatsApp</span>
</button>
<button className="flex flex-col items-center justify-center p-4 rounded-lg bg-[#0084FF]/10 text-[#0084FF] hover:bg-[#0084FF]/20 transition-colors">
<span className="material-symbols-outlined text-2xl mb-1">send</span>
<span className="font-label-md text-label-md">Messenger</span>
</button>
<button className="flex flex-col items-center justify-center p-4 rounded-lg bg-secondary-container text-primary hover:bg-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-2xl mb-1">sms</span>
<span className="font-label-md text-label-md">SMS</span>
</button>
</div>
</div>
</div>

<div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-gutter">
<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6 relative overflow-hidden">
<div className="flex justify-between items-start mb-4">
<span className="material-symbols-outlined text-expert-purple bg-expert-purple/10 p-2 rounded-lg">group</span>
<div className="flex items-center gap-1 text-impact-emerald">
<span className="material-symbols-outlined text-sm">trending_up</span>
<span className="font-label-md text-label-md">+2 ce mois</span>
</div>
</div>
<p className="font-metric-num text-metric-num text-on-surface">12</p>
<p className="font-label-md text-label-md text-secondary uppercase">Amis inscrits</p>
<div className="mt-4 h-1 w-full bg-surface-container-high rounded-full overflow-hidden">
<div className="h-full bg-expert-purple w-3/4"></div>
</div>
</div>
<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-6">
<div className="flex justify-between items-start mb-4">
<span className="material-symbols-outlined text-validation-amber bg-validation-amber/10 p-2 rounded-lg">workspace_premium</span>
<span className="text-secondary font-label-md text-label-md">Valeur: 180€</span>
</div>
<p className="font-metric-num text-metric-num text-on-surface">180 Jours</p>
<p className="font-label-md text-label-md text-secondary uppercase">Premium Cumulés</p>
<div className="mt-4 flex items-center gap-2">
<div className="flex -space-x-2">
<div className="w-6 h-6 rounded-full border-2 border-white bg-primary"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-expert-purple"></div>
<div className="w-6 h-6 rounded-full border-2 border-white bg-validation-amber"></div>
</div>
<span className="text-[10px] font-label-md text-secondary">+9 autres</span>
</div>
</div>

<div className="md:col-span-2 h-48 rounded-xl overflow-hidden relative group border border-surface-border">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="/images/ecran-343.png" alt="A minimalist and high-end 3D digital illustration of two interconnected golden rings floating in a clean, professional space with soft blue gradients. The lighting is ethereal and sophisticated, representing a premium partnership or connection. The aesthetic is modern-corporate with high-gloss finishes and deep intellectual clarity." />
<div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-6">
<p className="text-white font-title-md text-title-md font-bold">Le succès se partage</p>
<p className="text-white/80 font-body-md text-body-md">Devenez le mentor de votre cercle d'études.</p>
</div>
</div>
</div>
</div>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl overflow-hidden">
<div className="p-6 border-b border-surface-border flex justify-between items-center">
<h3 className="font-title-md text-title-md font-bold text-primary">Suivi de vos invitations</h3>
<div className="flex gap-2">
<span className="px-3 py-1 rounded-full bg-surface-container-low text-secondary font-label-md text-label-md cursor-pointer hover:bg-surface-container-high transition-colors">Tous</span>
<span className="px-3 py-1 rounded-full bg-surface-container-low text-secondary font-label-md text-label-md cursor-pointer hover:bg-surface-container-high transition-colors">En attente</span>
</div>
</div>
<div className="divide-y divide-surface-border">

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                            JD
                        </div>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Jean Dupont</p>
<p className="font-label-md text-label-md text-secondary">Invité le 12 Oct. 2024</p>
</div>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:block">
<span className="font-label-md text-label-md text-impact-emerald bg-impact-emerald/10 px-3 py-1 rounded-full">Validé</span>
</div>
<div className="text-right">
<p className="font-body-md text-body-md font-bold text-primary">+15 Jours</p>
<p className="text-[10px] font-label-md text-secondary uppercase">Activé</p>
</div>
<span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">more_vert</span>
</div>
</div>

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group border-l-4 border-validation-amber">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-secondary font-bold">
                            SK
                        </div>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Sarah Koné</p>
<p className="font-label-md text-label-md text-secondary">Invité le 24 Oct. 2024</p>
</div>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:block">
<span className="font-label-md text-label-md text-validation-amber bg-validation-amber/10 px-3 py-1 rounded-full">En attente</span>
</div>
<div className="text-right">
<p className="font-body-md text-body-md font-bold text-secondary">-- Jours</p>
<p className="text-[10px] font-label-md text-secondary uppercase">Inscription</p>
</div>
<span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">more_vert</span>
</div>
</div>

<div className="p-4 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary font-bold">
                            ML
                        </div>
<div>
<p className="font-body-md text-body-md font-bold text-on-surface">Marc Lavoine</p>
<p className="font-label-md text-label-md text-secondary">Invité le 05 Oct. 2024</p>
</div>
</div>
<div className="flex items-center gap-6">
<div className="hidden md:block">
<span className="font-label-md text-label-md text-impact-emerald bg-impact-emerald/10 px-3 py-1 rounded-full">Validé</span>
</div>
<div className="text-right">
<p className="font-body-md text-body-md font-bold text-primary">+15 Jours</p>
<p className="text-[10px] font-label-md text-secondary uppercase">Activé</p>
</div>
<span className="material-symbols-outlined text-secondary opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">more_vert</span>
</div>
</div>
</div>
<div className="p-4 bg-surface-container-low text-center">
<button className="text-primary font-label-md text-label-md hover:underline">Voir tout l'historique</button>
</div>
</section>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-secondary" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        function copyCode() &#123;
            const code = document.getElementById('referralCode').innerText;
            const copyIcon = document.getElementById('copyIcon');
            const copyText = document.getElementById('copyText');
            
            navigator.clipboard.writeText(code).then(() =&gt; &#123;
                copyIcon.innerText = 'check';
                copyText.innerText = 'COPIÉ !';
                copyIcon.classList.add('text-impact-emerald');
                copyText.classList.add('text-impact-emerald');
                
                setTimeout(() =&gt; &#123;
                    copyIcon.innerText = 'content_copy';
                    copyText.innerText = 'COPIER';
                    copyIcon.classList.remove('text-impact-emerald');
                    copyText.classList.remove('text-impact-emerald');
                &#125;, 2000);
            &#125;);
        &#125;

        // Simple animation on scroll for bento grid items
        const observerOptions = &#123;
            threshold: 0.1
        &#125;;

        const observer = new IntersectionObserver((entries) =&gt; &#123;
            entries.forEach(entry =&gt; &#123;
                if (entry.isIntersecting) &#123;
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-4');
                &#125;
            &#125;);
        &#125;, observerOptions);

        document.querySelectorAll('.grid &gt; div').forEach(el =&gt; &#123;
            el.classList.add('transition-all', 'duration-500', 'opacity-0', 'translate-y-4');
            observer.observe(el);
        &#125;);
    </script>

    </div>
  );
}
