import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Choisissez votre Plan" };

export default function Page() {
  return (
    <div className="bg-surface-bright text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface-bright dark:bg-on-background text-primary dark:text-primary-fixed w-full top-0 sticky z-50 border-b border-surface-border dark:border-outline-variant">
<div className="flex justify-between items-center px-gutter py-base w-full max-w-full mx-auto">
<div className="flex items-center gap-base">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
<h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">Edukora</h1>
</div>
<button className="p-2 hover:bg-surface-container-low rounded-full transition-colors duration-200">
<span className="material-symbols-outlined">close</span>
</button>
</div>
</header>
<main className="flex-grow container mx-auto px-container-padding-mobile md:px-container-padding-desktop py-stack-md flex flex-col items-center">

<div className="text-center mb-10 max-w-2xl">
<h2 className="font-headline-lg text-headline-lg mb-4 text-primary">Choisissez votre Plan</h2>
<p className="font-body-lg text-body-lg text-secondary">Investissez dans votre avenir académique. Débloquez des outils de pointe conçus par des experts pour maximiser votre réussite.</p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter w-full max-w-4xl mb-12">

<div className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-md flex flex-col transition-all duration-300 hover:shadow-lg group">
<div className="mb-6">
<span className="font-label-md text-label-md px-3 py-1 bg-surface-container-high rounded-full text-secondary inline-block mb-4">BASIQUE</span>
<h3 className="font-headline-md text-headline-md font-bold text-on-background mb-1">Découverte</h3>
<div className="flex items-baseline gap-1">
<span className="font-metric-num text-metric-num text-on-background">Gratuit</span>
</div>
</div>
<div className="space-y-4 mb-8 flex-grow">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
<p className="font-body-md text-body-md text-on-surface-variant">5 fiches/mois</p>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
<p className="font-body-md text-body-md text-on-surface-variant">Accès au forum</p>
</div>
<div className="flex items-center gap-3 opacity-60">
<span className="material-symbols-outlined text-outline text-[20px]">info</span>
<p className="font-body-md text-body-md text-on-surface-variant">Publicité présente</p>
</div>
</div>
<button className="w-full py-3 rounded-lg border-2 border-primary text-primary font-bold transition-all hover:bg-primary-fixed group-active:scale-95">
                    Sélectionner
                </button>
</div>

<div className="bg-surface-container-lowest border-2 border-primary-container rounded-xl p-stack-md flex flex-col transition-all duration-300 shadow-xl relative overflow-hidden group premium-border">

<div className="absolute top-0 right-0">
<div className="bg-primary-container text-white px-8 py-1 rotate-45 translate-x-[25px] translate-y-[10px] text-[10px] font-bold tracking-widest uppercase">
                        Recommandé
                    </div>
</div>
<div className="mb-6">
<div className="flex items-center gap-2 mb-4">
<span className="font-label-md text-label-md px-3 py-1 bg-expert-purple/10 text-expert-purple rounded-full flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
                            PREMIUM
                        </span>
</div>
<h3 className="font-headline-md text-headline-md font-bold text-on-background mb-1">Premium</h3>
<div className="flex items-baseline gap-1">
<span className="font-metric-num text-metric-num text-primary-container">2000 FCFA</span>
<span className="font-label-md text-label-md text-secondary">/mois</span>
</div>
</div>
<div className="space-y-4 mb-8 flex-grow">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-impact-emerald text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<p className="font-body-md text-body-md text-on-background font-semibold">Accès illimité</p>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-impact-emerald text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<p className="font-body-md text-body-md text-on-background font-semibold">Tuteur IA 24h/7</p>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-impact-emerald text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<p className="font-body-md text-body-md text-on-background font-semibold">Mode hors-ligne</p>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-impact-emerald text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<p className="font-body-md text-body-md text-on-background font-semibold">Zéro publicité</p>
</div>
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-impact-emerald text-[20px]" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<p className="font-body-md text-body-md text-on-background font-semibold">Certifications prioritaires</p>
</div>
</div>
<button className="w-full py-4 rounded-lg bg-primary-container text-white font-bold transition-all hover:bg-primary shadow-md active:scale-95">
                    Choisir Premium
                </button>
</div>
</div>

<div className="w-full max-w-4xl bg-surface-container-low p-gutter rounded-xl border border-surface-border flex flex-col md:flex-row items-center justify-between gap-gutter">
<div className="flex items-center gap-4">
<div className="h-12 w-12 rounded-full bg-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-primary-container">security</span>
</div>
<div>
<p className="font-title-md text-title-md text-on-background">Paiement sécurisé</p>
<p className="font-body-md text-body-md text-secondary">Annulez à tout moment sans frais cachés.</p>
</div>
</div>
<button className="w-full md:w-auto px-12 py-4 bg-primary text-white font-bold rounded-lg shadow-lg hover:bg-on-primary-fixed-variant transition-all active:scale-95">
                Continuer
            </button>
</div>

<div className="mt-16 w-full max-w-5xl rounded-2xl overflow-hidden relative h-64 shadow-2xl border border-surface-border hidden md:block">
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuARBkQq9g2V4X2sQt_Bqv0-9MBAs-A_KrxNKYp89gQpjrhHAyAIjLzIHO1s2-u1AQa0bOk8YBmddIy3N7nserY3Cl4TadHPcU_M6XSga7f5bqt6spkvsXTKKTFiHYzJKHWJsPSKVID-wuusCrwUqKb2kw5yktG-PlBHh2lLwdbZ7Xbk58zzUDaCZK69uRMPSDPtTxFeO2khxO60vW-bOVp6YnQ7SdGCmx4DcPN-54nFtjVKA44jcT-u')"}}></div>
<div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-transparent flex items-center px-12">
<div className="max-w-md">
<p className="text-white font-headline-md text-headline-md font-bold mb-2">Rejoignez l'élite Edukora</p>
<p className="text-white/80 font-body-md text-body-md">Plus de 50 000 étudiants ont déjà boosté leurs résultats de 40% grâce aux outils premium.</p>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-base bg-surface-container-lowest border-t border-surface-border z-50">
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-md text-label-md">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-label-md text-label-md">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold hover:bg-surface-container-low transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>stars</span>
<span className="font-label-md text-label-md">Abonnement</span>
</a>
<a className="flex flex-col items-center justify-center text-secondary dark:text-secondary-fixed-dim hover:bg-surface-container-low transition-transform active:scale-95" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-md text-label-md">Profil</span>
</a>
</nav>
<script>
        function selectPlan(btn) &#123;
            // Remove selection from all buttons
            document.querySelectorAll('button').forEach(b =&gt; &#123;
                if (b.innerText.includes('Sélectionner') || b.innerText.includes('Choisi')) &#123;
                    b.classList.remove('bg-primary-container', 'text-white');
                    b.classList.add('border-primary', 'text-primary');
                    if (b.innerText === 'Choisi') b.innerText = 'Sélectionner';
                &#125;
            &#125;);

            // Update clicked button
            if (btn.innerText === 'Sélectionner') &#123;
                btn.innerText = 'Choisi';
                btn.classList.add('bg-primary-container', 'text-white');
                btn.classList.remove('border-primary', 'text-primary');
            &#125;
        &#125;

        // Micro-interaction for cards
        document.querySelectorAll('.group').forEach(card =&gt; &#123;
            card.addEventListener('mouseenter', () =&gt; &#123;
                card.style.transform = 'translateY(-4px)';
            &#125;);
            card.addEventListener('mouseleave', () =&gt; &#123;
                card.style.transform = 'translateY(0)';
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
