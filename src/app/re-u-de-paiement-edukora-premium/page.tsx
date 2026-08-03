import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Reçu de Paiement" };

export default function Page() {
  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col items-center" >

<header className="fixed top-0 w-full flex items-center justify-between px-4 md:px-8 h-16 w-full z-50 bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline">
<div className="flex items-center gap-4">
<button className="p-2 active:scale-95 duration-150 rounded-full hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-bold text-primary dark:text-primary-fixed">Reçu de Paiement</h1>
</div>
<button className="p-2 active:scale-95 duration-150 rounded-full hover:bg-surface-container-high transition-colors">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">share</span>
</button>
</header>

<main className="w-full max-w-2xl px-4 pt-24 pb-32 flex flex-col items-center">

<div className="mb-8 flex flex-col items-center animate-in fade-in slide-in-from-top duration-700">
<div className="w-16 h-16 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container mb-4">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<p className="font-headline font-bold text-lg text-primary">Paiement Réussi</p>
<p className="text-on-surface-variant text-sm">Merci pour votre confiance en Edukora</p>
</div>

<div className="w-full bg-white rounded-xl shadow-xl overflow-hidden flex flex-col relative zigzag-bottom border border-outline-variant/30">

<div className="px-6 py-8 border-b border-dashed border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="w-12 h-12 object-contain" src="/images/ecran-309.png" />
<div>
<h2 className="font-headline font-extrabold text-xl text-primary tracking-tight">Reçu Officiel</h2>
<p className="text-xs text-on-surface-variant font-medium tracking-wide">EDUKORA EDUCATION CI</p>
</div>
</div>
<div className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
                    PAYÉ
                </div>
</div>

<div className="px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
<div className="flex flex-col gap-1">
<span className="text-label-xs text-on-surface-variant uppercase tracking-widest">Service</span>
<span className="font-semibold text-on-surface">Pass Premium Mensuel</span>
</div>
<div className="flex flex-col gap-1">
<span className="text-label-xs text-on-surface-variant uppercase tracking-widest">Montant</span>
<span className="font-bold text-secondary text-lg">1 000 FCFA</span>
</div>
<div className="flex flex-col gap-1">
<span className="text-label-xs text-on-surface-variant uppercase tracking-widest">Date</span>
<span className="font-semibold text-on-surface">12 Mai 2024</span>
</div>
<div className="flex flex-col gap-1">
<span className="text-label-xs text-on-surface-variant uppercase tracking-widest">Réf. transaction</span>
<span className="font-mono text-sm text-on-surface">#ED-882910</span>
</div>
<div className="flex flex-col gap-1">
<span className="text-label-xs text-on-surface-variant uppercase tracking-widest">Client</span>
<span className="font-semibold text-on-surface">Koffi Konan</span>
</div>
<div className="flex flex-col gap-1">
<span className="text-label-xs text-on-surface-variant uppercase tracking-widest">Mode de paiement</span>
<div className="flex items-center gap-2">
<div className="w-5 h-5 bg-orange-500 rounded-sm flex items-center justify-center text-[10px] text-white font-bold">O</div>
<span className="font-semibold text-on-surface">Orange Money</span>
</div>
</div>
</div>

<div className="px-6">
<div className="border-t border-dashed border-outline-variant w-full h-px"></div>
</div>

<div className="px-6 py-8 flex flex-col items-center justify-center gap-3">
<div className="flex items-center gap-2 text-on-surface-variant opacity-70">
<span className="material-symbols-outlined text-sm">lock</span>
<span className="text-label-xs">Document certifié numériquement</span>
</div>
<div className="flex items-center gap-2">
<span className="text-[10px] text-on-surface-variant font-medium">Sécurisé par</span>
<img alt="Geniuspay Logo" className="h-6 object-contain" src="/images/ecran-269.png" />
</div>
</div>
</div>

<div className="w-full mt-10 flex flex-col gap-3">
<button className="w-full bg-secondary-container hover:bg-secondary text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95">
<span className="material-symbols-outlined">download</span>
                Télécharger le reçu PDF
            </button>
<button className="w-full bg-white border border-outline-variant text-primary font-semibold py-4 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-surface-container-low active:scale-95">
<span className="material-symbols-outlined">share</span>
                Partager le reçu
            </button>
</div>
<p className="mt-8 text-on-surface-variant text-xs text-center leading-relaxed">
            Un exemplaire de ce reçu a été envoyé à l'adresse email associée à votre compte Koffi Konan. Pour toute assistance, contactez le support@edukora.ci
        </p>
</main>

<script>
        // Simple click interaction for the share button
        document.querySelectorAll('button').forEach(btn =&gt; &#123;
            btn.addEventListener('click', function() &#123;
                const icon = this.querySelector('.material-symbols-outlined');
                if(icon) &#123;
                    this.classList.add('scale-95');
                    setTimeout(() =&gt; this.classList.remove('scale-95'), 150);
                &#125;
            &#125;);
        &#125;);

        // Trigger a subtle fade-in effect on load
        window.addEventListener('DOMContentLoaded', () =&gt; &#123;
            document.body.style.opacity = '0';
            setTimeout(() =&gt; &#123;
                document.body.style.transition = 'opacity 0.5s ease-in';
                document.body.style.opacity = '1';
            &#125;, 50);
        &#125;);
    </script>

    </div>
  );
}
