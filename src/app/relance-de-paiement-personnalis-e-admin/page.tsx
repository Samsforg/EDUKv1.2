import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Admin - Relancer le paiement" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface flex justify-center min-h-screen" >

<main className="w-full max-w-md bg-surface min-h-screen relative flex flex-col pb-24">

<header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-primary shadow-md">
<div className="flex items-center gap-3">
<button className="cursor-pointer active:scale-95 transition-transform text-on-primary">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline font-bold text-on-primary tracking-tight text-[20px]">Relancer le paiement</h1>
</div>
<div className="flex items-center gap-2">
<img alt="Edukora Logo" className="h-8 w-8 rounded-lg border border-on-primary/20" src="/images/ecran-310.png" />
</div>
</header>

<div className="mt-20 px-4 space-y-6">

<section className="bg-surface-container-lowest rounded-xl p-5 border border-outline-variant shadow-sm transition-all duration-200">
<div className="flex items-start justify-between mb-4">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold text-lg">
                            KM
                        </div>
<div>
<h2 className="font-headline font-semibold text-lg text-on-surface">Koffi Moussa</h2>
<p className="text-sm text-outline font-medium">ID #ED-82910</p>
</div>
</div>
<span className="bg-error-container text-on-error-container text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Échec</span>
</div>
<div className="bg-surface-container-low rounded-lg p-3 border-l-4 border-error">
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-error text-sm">info</span>
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-tighter">Motif de l'échec</p>
</div>
<p className="text-sm text-on-surface font-medium">Solde insuffisant</p>
</div>
</section>

<section className="space-y-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary">event_repeat</span>
<h3 className="font-headline font-bold text-primary text-md">Programmation</h3>
</div>
<div className="grid grid-cols-2 gap-4">
<div className="space-y-1.5">
<label className="text-xs font-bold text-on-surface-variant px-1">Nouvelle date</label>
<div className="relative">
<input className="w-full h-12 bg-surface-container-lowest border border-outline-variant rounded-lg px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="date" value="2023-11-25" />
<span className="material-symbols-outlined absolute right-3 top-3.5 text-outline text-sm pointer-events-none">calendar_today</span>
</div>
</div>
<div className="space-y-1.5">
<label className="text-xs font-bold text-on-surface-variant px-1">Heure souhaitée</label>
<div className="relative">
<input className="w-full h-12 bg-surface-container-lowest border border-outline-variant rounded-lg px-4 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" type="time" value="09:00" />
<span className="material-symbols-outlined absolute right-3 top-3.5 text-outline text-sm pointer-events-none">schedule</span>
</div>
</div>
</div>
</section>

<section className="bg-surface-container rounded-xl p-5 border border-outline-variant/50">
<div className="flex items-center justify-between mb-6">
<div className="flex flex-col">
<span className="font-headline font-bold text-on-surface">Remise exceptionnelle</span>
<span className="text-xs text-on-surface-variant">Appliquer une réduction unique</span>
</div>
<div className="relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in">
<input checked={true} className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" id="toggle" name="toggle" type="checkbox" />
<label className="toggle-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors" htmlFor="toggle"></label>
</div>
</div>
<div className="space-y-4 transition-all duration-300 opacity-100" id="discount-inputs">
<div className="space-y-1.5">
<label className="text-xs font-bold text-on-surface-variant px-1">Montant de la remise (FCFA)</label>
<div className="relative">
<input className="w-full h-12 bg-surface-container-lowest border border-primary rounded-lg px-4 font-bold text-primary focus:ring-0 outline-none" type="number" value="5000" />
<span className="absolute right-4 top-3.5 text-xs font-bold text-primary">FCFA</span>
</div>
</div>
<div className="flex justify-between items-center pt-2 border-t border-outline-variant/30">
<span className="text-sm font-medium text-on-surface-variant">Nouveau montant total</span>
<span className="text-lg font-bold text-secondary">45 000 FCFA</span>
</div>
</div>
</section>

<section className="flex items-center gap-3 px-1">
<input checked={true} className="w-5 h-5 rounded border-outline text-primary focus:ring-primary cursor-pointer" id="notify" type="checkbox" />
<label className="text-sm font-medium text-on-surface-variant cursor-pointer" htmlFor="notify">
                    Envoyer une notification explicative à l'étudiant
                </label>
</section>
</div>

<footer className="fixed bottom-0 w-full max-w-md bg-surface-container-lowest border-t border-outline-variant px-4 py-4 flex flex-col gap-3 shadow-[0_-4px_12px_-4px_rgba(0,0,0,0.1)]">
<button className="w-full h-14 bg-secondary-container text-on-secondary-container font-bold rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-secondary/10">
<span className="material-symbols-outlined">schedule_send</span>
                Programmer la relance
            </button>
<button className="w-full h-12 bg-transparent text-outline font-bold rounded-xl active:bg-surface-container-high transition-colors text-sm">
                Annuler
            </button>
</footer>
</main>
<script>
        // Micro-interaction for toggle
        const toggle = document.getElementById('toggle');
        const discountSection = document.getElementById('discount-inputs');
        
        toggle.addEventListener('change', function() &#123;
            if(this.checked) &#123;
                discountSection.style.opacity = '1';
                discountSection.style.pointerEvents = 'auto';
                discountSection.classList.remove('grayscale');
            &#125; else &#123;
                discountSection.style.opacity = '0.4';
                discountSection.style.pointerEvents = 'none';
                discountSection.classList.add('grayscale');
            &#125;
        &#125;);

        // Simple button interaction
        const primaryBtn = document.querySelector('button.bg-secondary-container');
        primaryBtn.addEventListener('click', () =&gt; &#123;
            primaryBtn.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;refresh&lt;/span&gt; Programmation...';
            setTimeout(() =&gt; &#123;
                primaryBtn.innerHTML = '&lt;span class="material-symbols-outlined"&gt;check_circle&lt;/span&gt; Terminé';
                primaryBtn.classList.replace('bg-secondary-container', 'bg-tertiary-container');
                primaryBtn.classList.replace('text-on-secondary-container', 'text-on-tertiary-container');
            &#125;, 1500);
        &#125;);
    </script>

    </div>
  );
}
