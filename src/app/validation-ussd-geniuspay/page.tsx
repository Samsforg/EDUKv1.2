import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Validation de Paiement" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full flex items-center justify-between px-4 h-16 w-full z-50 bg-surface border-b border-outline-variant">
<div className="flex items-center gap-4">
<button className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200 active:scale-95 hover:bg-surface-container-low">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-xl font-semibold text-primary">Paiement Sécurisé</h1>
</div>
<div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-sm overflow-hidden">
<img alt="Geniuspay Logo" className="w-full h-full object-contain" src="/images/ecran-324.png" />
</div>
<div className="font-headline font-bold text-primary">Edukora</div>
</div>
</header>
<main className="pt-24 pb-12 px-4 max-w-md mx-auto min-h-screen flex flex-col items-center">

<div className="flex flex-col items-center mb-10 text-center">
<div className="loading-ring mb-8 flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary z-10 text-3xl" style={{"fontVariationSettings":"'FILL' 1"}}>tap_and_play</span>
</div>
<h2 className="font-headline text-2xl font-bold text-on-surface mb-2">Validation en cours</h2>
<p className="text-on-surface-variant text-md">Geniuspay établit une connexion sécurisée avec votre opérateur. Veuillez autoriser la transaction sur votre téléphone mobile.</p>
<div className="mt-4 px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-sm font-semibold tracking-wide" id="countdown">
                Expire dans <span id="timer">03:00</span>
</div>
</div>

<div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm mb-8">
<h3 className="font-headline font-semibold text-lg text-primary mb-6 flex items-center gap-2">
<span className="material-symbols-outlined">checklist</span>
                Instructions USSD
            </h3>
<ul className="space-y-6">
<li className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold flex-shrink-0">1</div>
<div className="text-on-surface font-medium leading-tight pt-1">Regardez votre téléphone</div>
</li>
<li className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold flex-shrink-0">2</div>
<div className="text-on-surface font-medium leading-tight pt-1">Saisissez votre code PIN secret</div>
</li>
<li className="flex gap-4">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold flex-shrink-0">3</div>
<div className="text-on-surface font-medium leading-tight pt-1">Validez la transaction</div>
</li>
</ul>
</div>

<div className="w-full px-4 mb-10">
<div className="flex justify-between items-center py-2 border-b border-dashed border-outline-variant">
<span className="text-on-surface-variant text-sm">Montant à payer</span>
<span className="font-bold text-on-surface">15 000 FCFA</span>
</div>
<div className="flex justify-between items-center py-2">
<span className="text-on-surface-variant text-sm">Référence</span>
<span className="text-on-surface-variant text-sm font-mono uppercase">EDU-9283-XK</span>
</div>
</div>

<div className="w-full space-y-4">
<button className="w-full h-14 bg-secondary-container text-on-secondary-container font-bold rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
<span className="material-symbols-outlined">check_circle</span>
                J'ai validé le paiement
            </button>
<a className="w-full py-3 flex items-center justify-center text-primary font-semibold hover:underline gap-2" href="#">
<span className="material-symbols-outlined text-sm">help</span>
                Besoin d'aide ?
            </a>
</div>

<div className="mt-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
<div className="flex items-center gap-2">
<div className="w-6 h-6 rounded-sm bg-[#FF8200]"></div>
<div className="w-6 h-6 rounded-sm bg-[#FFFFFF] border border-outline-variant"></div>
<div className="w-6 h-6 rounded-sm bg-[#009E60]"></div>
</div>
</div>
</main>
<script>
        // Simple Countdown Timer
        let time = 180; // 3 minutes
        const timerElement = document.getElementById('timer');
        
        const countdown = setInterval(() =&gt; &#123;
            const minutes = Math.floor(time / 60);
            let seconds = time % 60;
            seconds = seconds &lt; 10 ? '0' + seconds : seconds;
            timerElement.textContent = `0$&#123;minutes&#125;:$&#123;seconds&#125;`;
            time--;
            
            if (time &lt; 0) &#123;
                clearInterval(countdown);
                timerElement.textContent = "00:00";
            &#125;
        &#125;, 1000);

        // Interaction for "J'ai validé"
        const mainBtn = document.querySelector('button.bg-secondary-container');
        mainBtn.addEventListener('click', () =&gt; &#123;
            mainBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Vérification...';
            setTimeout(() =&gt; &#123;
                // In a real app, this would check backend status
                alert('Vérification du paiement en cours. Un message de confirmation vous sera envoyé.');
                mainBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; J\'ai validé le paiement';
            &#125;, 2000);
        &#125;);
    </script>

    </div>
  );
}
