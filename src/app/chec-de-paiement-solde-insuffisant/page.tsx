import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Paiement échoué" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center p-4" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 z-50 bg-surface flex justify-between items-center px-4 h-16 max-w-lg mx-auto">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">arrow_back</span>
<span className="font-headline text-[24px] font-bold text-primary">Edukora</span>
</div>
<div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-053.png" alt="A professional portrait of a young West African student looking confident, wearing a neat school uniform, set against a soft blurred academic library background. The lighting is warm and academic, following a premium light-mode aesthetic with soft blues and oranges. High-quality digital photography with a sharp focus on the face." />
</div>
</header>

<main className="flex-grow flex flex-col items-center justify-center w-full max-w-lg mx-auto py-12 px-6 text-center">

<div className="relative w-48 h-48 mb-8 flex items-center justify-center">

<div className="absolute inset-0 bg-error-container rounded-full opacity-30 animate-ping"></div>
<div className="absolute inset-4 bg-error-container rounded-full opacity-50 animate-pulse"></div>

<div className="relative bg-surface-container-lowest p-8 rounded-full shadow-lg border border-error-container error-shake">
<span className="material-symbols-outlined text-error text-7xl select-none" style={{"fontVariationSettings":"'FILL' 1"}}>
                    warning
                </span>
</div>
</div>

<h1 className="font-headline text-[32px] font-bold text-on-surface mb-4 leading-tight">Paiement échoué</h1>
<div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 mb-10 w-full">
<div className="flex flex-col gap-2">
<p className="text-on-surface-variant font-body text-[16px]">
                    Désolé, votre transaction a été refusée car votre <span className="font-bold text-error">solde est insuffisant</span>.
                </p>
<div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
<span className="text-label-sm text-outline font-medium">Montant requis</span>
<span className="text-headline-md font-bold text-primary">2 000 FCFA</span>
</div>
</div>
</div>

<div className="flex flex-col gap-4 w-full">
<button className="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-4 px-6 rounded-xl shadow-sm hover:shadow-md active:scale-95 transition-all flex items-center justify-center gap-2 group">
<span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">replay</span>
                Réessayer
            </button>

<button className="w-full bg-surface-container-highest text-on-surface font-headline font-semibold py-4 px-6 rounded-xl hover:bg-surface-dim active:scale-95 transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">account_balance_wallet</span>
                Changer de mode de paiement
            </button>
</div>

<p className="mt-12 text-label-sm text-outline">
            Besoin d'aide ? <a className="text-primary font-bold hover:underline" href="#">Contacter le support Edukora</a>
</p>
</main>

<footer className="w-full py-8 text-center opacity-50">
<div className="flex items-center justify-center gap-2 grayscale brightness-150">
<span className="font-headline text-label-xs font-bold tracking-widest uppercase">Edukora Securing Academic Success</span>
</div>
</footer>

<script>
        document.querySelectorAll('button').forEach(button =&gt; &#123;
            button.addEventListener('click', function(e) &#123;
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                setTimeout(() =&gt; ripple.remove(), 600);
            &#125;);
        &#125;);
    </script>
<style>
        .ripple &#123;
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        &#125;
        @keyframes ripple-effect &#123;
            to &#123;
                transform: scale(4);
                opacity: 0;
            &#125;
        &#125;
    </style>

    </div>
  );
}
