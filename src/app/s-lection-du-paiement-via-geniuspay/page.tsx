import type { Metadata } from "next";

export const metadata: Metadata = { title: "Paiement Sécurisé - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full bg-surface dark:bg-on-background z-50 flex items-center justify-between px-4 h-16 border-b border-outline-variant dark:border-on-surface-variant">
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container-low dark:hover:bg-surface-variant p-2 rounded-full transition-colors duration-200 active:scale-95 text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-2xl font-semibold text-primary dark:text-primary-fixed">Paiement Sécurisé</h1>
</div>
<div className="flex items-center">
<span className="material-symbols-outlined text-on-surface-variant">lock</span>
</div>
</header>
<main className="flex-grow pt-24 pb-32 px-4 max-w-lg mx-auto w-full">

<section className="mb-8">
<div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant shadow-sm">
<div className="flex justify-between items-start mb-4">
<div>
<p className="text-on-surface-variant text-sm font-medium uppercase tracking-wider mb-1">Plan sélectionné</p>
<h2 className="font-headline text-xl font-bold text-primary">Pass Premium Mensuel</h2>
</div>
<span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold">ACTIF</span>
</div>
<div className="flex items-baseline gap-1">
<span className="text-3xl font-extrabold text-on-surface">1,000</span>
<span className="text-lg font-semibold text-on-surface-variant">FCFA</span>
<span className="text-on-surface-variant text-sm ml-1">/ mois</span>
</div>
<div className="mt-4 pt-4 border-t border-outline-variant flex items-center gap-2 text-on-surface-variant text-xs">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
                    Accès illimité aux cours et Tuteur AI
                </div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center gap-2 mb-4 p-3 bg-surface-container-low rounded-lg border border-outline-variant">
<span className="text-xs font-medium text-on-surface-variant uppercase tracking-widest">Sécurisé par</span>
<img alt="Geniuspay Logo" className="h-6 object-contain" src="/images/ecran-324.png" />
</div><h3 className="font-headline text-lg font-bold text-on-surface flex items-center gap-2">
                Choisir un mode de paiement
            </h3>
<div className="grid grid-cols-1 gap-4">

<div className="relative">
<input checked={true} className="peer hidden payment-option-radio" id="orange_money" name="payment_method" type="radio" />
<label className="flex items-center justify-between p-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl cursor-pointer transition-all hover:border-primary" htmlFor="orange_money">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-black flex items-center justify-center p-1 overflow-hidden">
<img className="w-full h-full object-contain" src="/images/ecran-321.png" alt="Official Orange Money logo with distinctive orange square and white lettering, high contrast, clean corporate branding on a professional white studio background." />
</div>
<div>
<p className="font-bold text-on-surface">Orange Money</p>
<p className="text-xs text-on-surface-variant italic">Cote d'Ivoire</p>
</div>
</div>
<div className="check-circle hidden w-6 h-6 rounded-full bg-primary items-center justify-center">
<span className="material-symbols-outlined text-white text-sm">check</span>
</div>
</label>
</div>

<div className="relative">
<input className="peer hidden payment-option-radio" id="mtn_momo" name="payment_method" type="radio" />
<label className="flex items-center justify-between p-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl cursor-pointer transition-all hover:border-primary" htmlFor="mtn_momo">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-[#FFCC00] flex items-center justify-center p-1 overflow-hidden">
<img className="w-full h-full object-contain" src="/images/ecran-322.png" alt="MTN Mobile Money logo featuring the iconic yellow background and blue MOMO text, vibrant and professional high-resolution branding asset." />
</div>
<div>
<p className="font-bold text-on-surface">MTN MoMo</p>
<p className="text-xs text-on-surface-variant italic">Cote d'Ivoire</p>
</div>
</div>
<div className="check-circle hidden w-6 h-6 rounded-full bg-primary items-center justify-center">
<span className="material-symbols-outlined text-white text-sm">check</span>
</div>
</label>
</div>

<div className="relative">
<input className="peer hidden payment-option-radio" id="wave" name="payment_method" type="radio" />
<label className="flex items-center justify-between p-4 bg-surface-container-lowest border-2 border-outline-variant rounded-xl cursor-pointer transition-all hover:border-primary" htmlFor="wave">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-[#1da1f2] flex items-center justify-center p-1 overflow-hidden">
<img className="w-full h-full object-contain" src="/images/ecran-323.png" alt="Wave Mobile Money logo with the distinctive blue penguin silhouette on a light blue background, clean minimalist fintech branding." />
</div>
<div>
<p className="font-bold text-on-surface">Wave</p>
<p className="text-xs text-on-surface-variant italic">Cote d'Ivoire</p>
</div>
</div>
<div className="check-circle hidden w-6 h-6 rounded-full bg-primary items-center justify-center">
<span className="material-symbols-outlined text-white text-sm">check</span>
</div>
</label>
</div>
</div>
</section>

<section className="mt-8">
<div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant">
<label className="block text-sm font-bold text-on-surface mb-3" htmlFor="phone">Numéro de téléphone mobile</label>
<div className="relative flex">
<div className="flex items-center px-4 bg-surface-container-highest border-y border-l border-outline rounded-l-lg text-on-surface font-semibold">
                        +225
                    </div>
<input className="flex-grow p-4 bg-surface-container-lowest border border-outline rounded-r-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all font-body text-lg tracking-widest" id="phone" placeholder="07 00 00 00 00" type="tel" />
</div>
<p className="mt-3 text-xs text-on-surface-variant flex items-start gap-2">
<span className="material-symbols-outlined text-sm pt-0.5">info</span>
                    Un code de confirmation sera envoyé via le service de paiement choisi pour valider la transaction.
                </p>
</div>
</section>

<div className="mt-10 flex flex-wrap justify-center gap-6 opacity-60"><div className="flex items-center gap-2 grayscale">
<span className="material-symbols-outlined text-xl">verified_user</span>
<span className="text-xs font-bold uppercase tracking-tighter">Paiement 100% Sécurisé</span>
</div>
<div className="flex items-center gap-2 grayscale">
<span className="material-symbols-outlined text-xl">shield</span>
<span className="text-xs font-bold uppercase tracking-tighter">Données Protégées</span>
</div>
<div className="flex items-center gap-2 grayscale border-l border-outline-variant pl-4">
<span className="text-[10px] font-bold uppercase tracking-tighter">Powered by</span>
<img alt="Geniuspay" className="h-4 object-contain" src="/images/ecran-324.png" />
</div></div>

<div className="fixed bottom-0 left-0 w-full p-4 bg-surface-container-lowest border-t border-outline-variant md:relative md:bg-transparent md:border-none md:p-0 md:mt-8 z-40">
<button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-headline font-bold py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-lg flex items-center justify-center gap-2">
                Confirmer le Paiement
                <span className="material-symbols-outlined">arrow_forward</span>
</button>
</div>
</main>


<script>
        // Simple micro-interaction for the phone input
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', (e) =&gt; &#123;
            let value = e.target.value.replace(/\D/g, '');
            if (value.length &gt; 10) value = value.slice(0, 10);
            
            // Basic formatting for IV numbers (XX XX XX XX XX)
            let formatted = '';
            for (let i = 0; i &lt; value.length; i++) &#123;
                if (i &gt; 0 &amp;&amp; i % 2 === 0) formatted += ' ';
                formatted += value[i];
            &#125;
            e.target.value = formatted;
        &#125;);

        // Add active state to payment options via JS for extra polish
        const radios = document.querySelectorAll('.payment-option-radio');
        radios.forEach(radio =&gt; &#123;
            radio.addEventListener('change', () =&gt; &#123;
                // Potential for adding subtle haptic or sound feedback here
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
