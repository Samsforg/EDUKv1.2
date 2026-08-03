import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paiement Confirmé - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center" >

<header className="w-full top-0 sticky z-40 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline flex items-center justify-between px-4 h-16 w-full shadow-none transition-colors">
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors p-2 rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-headline text-[20px] font-bold text-primary dark:text-primary-fixed">Paiement Confirmé</h1>
</div>
<button className="hover:bg-surface-container dark:hover:bg-surface-container-highest transition-colors p-2 rounded-full active:scale-95 duration-150">
<span className="material-symbols-outlined text-on-surface-variant dark:text-surface-variant">help</span>
</button>
</header>

<main className="flex-1 w-full max-w-md px-4 pb-32 pt-8 flex flex-col gap-6 overflow-y-auto">

<section className="relative text-center flex flex-col items-center py-6 overflow-hidden">
<div className="absolute inset-0 bg-confetti -z-10"></div>
<div className="animate-success w-24 h-24 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center shadow-lg mb-4 ring-8 ring-tertiary-fixed/20">
<span className="material-symbols-outlined text-[48px] font-bold" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<h2 className="font-headline text-[24px] font-bold text-primary leading-tight px-4">
                Félicitations, vous êtes désormais Premium !
            </h2>
<p className="text-body-md text-on-surface-variant mt-2">Votre voyage vers l'excellence scolaire commence ici.</p>
</section>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 shadow-sm">
<div className="flex justify-between items-center mb-4">
<span className="text-label-xs bg-primary-container text-on-primary-container px-3 py-1 rounded-full font-bold uppercase tracking-wider">Abonnement Actif</span>
<span className="text-label-sm text-on-surface-variant">ID: #ED-82910</span>
</div>
<div className="flex items-center gap-4">
<div className="w-12 h-12 bg-secondary-container/10 rounded-lg flex items-center justify-center text-secondary-container">
<span className="material-symbols-outlined text-[32px]">workspace_premium</span>
</div>
<div className="flex flex-col">
<span className="font-headline font-bold text-[18px] text-on-surface">Pass Premium Mensuel</span>
<span className="text-primary font-bold text-[20px]">1,000 FCFA <span className="text-on-surface-variant font-normal text-sm">/ mois</span></span>
</div>
</div>
</div>

<div className="flex items-center justify-center gap-3 bg-surface-container-low py-3 px-4 rounded-lg">
<span className="text-[12px] font-medium text-on-surface-variant uppercase tracking-widest">Sécurisé par</span>
<img alt="Geniuspay" className="h-6 object-contain grayscale opacity-70" src="/images/ecran-269.png" />
</div>

<section className="flex flex-col gap-4">
<h3 className="font-headline text-label-sm font-bold text-on-surface-variant uppercase ml-1">Vos nouveaux pouvoirs</h3>
<div className="grid gap-3">

<div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:border-primary/30 transition-all cursor-default group">
<div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">smart_toy</span>
</div>
<div>
<p className="font-headline font-bold text-on-surface">Tuteur IA illimité</p>
<p className="text-[13px] text-on-surface-variant">Réponses instantanées 24h/7j pour vos devoirs.</p>
</div>
</div>

<div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:border-primary/30 transition-all cursor-default group">
<div className="w-10 h-10 rounded-full bg-secondary/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">verified</span>
</div>
<div>
<p className="font-headline font-bold text-on-surface">Fiches certifiées</p>
<p className="text-[13px] text-on-surface-variant">Contenu validé par des experts de l'éducation.</p>
</div>
</div>

<div className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/40 hover:border-primary/30 transition-all cursor-default group">
<div className="w-10 h-10 rounded-full bg-tertiary/5 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors">
<span className="material-symbols-outlined">download_done</span>
</div>
<div>
<p className="font-headline font-bold text-on-surface">Mode Hors-ligne</p>
<p className="text-[13px] text-on-surface-variant">Réviser partout, même sans connexion internet.</p>
</div>
</div>
</div>
</section>

<div className="mt-4">
<button className="w-full bg-secondary-container hover:bg-secondary text-white font-headline font-bold py-4 rounded-xl shadow-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                Commencer mes révisions
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
<p className="text-center text-[11px] text-outline mt-3 px-6 italic">Un reçu de paiement a été envoyé à votre adresse email associée.</p>
</div>
</main>

<nav className="fixed bottom-0 w-full z-50 bg-surface-container-lowest dark:bg-surface-container-high shadow-[0_-1px_3px_0_rgba(0,0,0,0.1)] flex justify-around items-center h-20 px-2 pb-safe">
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-inverse-surface transition-colors active:scale-90 duration-150">
<span className="material-symbols-outlined mb-1">home</span>
<span className="font-label text-label-xs">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-inverse-surface transition-colors active:scale-90 duration-150">
<span className="material-symbols-outlined mb-1">school</span>
<span className="font-label text-label-xs">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant px-4 py-1 hover:bg-surface-container-high dark:hover:bg-inverse-surface transition-colors active:scale-90 duration-150">
<span className="material-symbols-outlined mb-1">smart_toy</span>
<span className="font-label text-label-xs">tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center bg-primary-container dark:bg-on-primary-fixed-variant text-on-primary-container dark:text-primary-fixed rounded-xl px-4 py-1 transition-colors active:scale-90 duration-150">
<span className="material-symbols-outlined mb-1" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs">Profil</span>
</div>
</nav>
<script>
        // Micro-interaction for benefits cards
        document.querySelectorAll('section div[class*="cursor-default"]').forEach(card =&gt; &#123;
            card.addEventListener('click', () =&gt; &#123;
                card.classList.add('scale-95');
                setTimeout(() =&gt; card.classList.remove('scale-95'), 100);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
