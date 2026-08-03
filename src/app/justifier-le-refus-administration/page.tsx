import type { Metadata } from "next";

export const metadata: Metadata = { title: "Justifier le refus - Edukora Admin" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface flex flex-col min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-primary dark:bg-inverse-surface text-on-primary dark:text-inverse-on-surface shadow-sm docked full-width top-0 flex items-center w-full px-4 py-3 sticky z-50">
<button aria-label="Retour" className="mr-4 hover:bg-primary-container/20 transition-colors p-2 rounded-full active:scale-95 duration-150 flex items-center justify-center">
<span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-2xl">Justifier le refus</h1>
</header>

<main className="flex-1 px-4 py-6 max-w-2xl mx-auto w-full space-y-6">

<section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 shadow-sm">
<div className="flex items-center gap-2 mb-4">
<span className="material-symbols-outlined text-primary" data-icon="info">info</span>
<h2 className="text-label-sm font-bold uppercase tracking-wider text-outline">Détails du litige</h2>
</div>
<div className="grid grid-cols-2 gap-y-4 gap-x-2">
<div>
<p className="text-label-xs text-on-surface-variant font-medium">Étudiant</p>
<p className="text-body-md font-semibold">Koffi Konan</p>
</div>
<div>
<p className="text-label-xs text-on-surface-variant font-medium">Montant</p>
<p className="text-body-md font-semibold text-primary">5,000 FCFA</p>
</div>
<div>
<p className="text-label-xs text-on-surface-variant font-medium">Date de demande</p>
<p className="text-body-md font-semibold">12 Oct 2023</p>
</div>
<div>
<p className="text-label-xs text-on-surface-variant font-medium">Motif initial</p>
<p className="text-body-md font-semibold">Double débit</p>
</div>
</div>
</section>

<section className="space-y-6">
<h2 className="font-headline text-xl font-bold text-on-surface border-l-4 border-secondary pl-3">Détails du rejet</h2>

<div className="space-y-3">
<label className="text-label-sm font-bold text-on-surface-variant">Motif principal
<div className="flex flex-wrap gap-2" id="reason-chips">
<button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant text-label-sm font-medium transition-all hover:bg-surface-container duration-200" type="button">Usage abusif</button>
<button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant text-label-sm font-medium transition-all hover:bg-surface-container duration-200" type="button">Délai dépassé</button>
<button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant text-label-sm font-medium transition-all hover:bg-surface-container duration-200" type="button">Preuve manquante</button>
<button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant text-label-sm font-medium transition-all hover:bg-surface-container duration-200" type="button">Non éligible</button>
<button className="px-4 py-2 rounded-full border border-outline-variant bg-surface text-on-surface-variant text-label-sm font-medium transition-all hover:bg-surface-container duration-200" type="button">Autre</button>
</div>
</label></div>

<div className="space-y-2">
<div className="flex justify-between items-end">
<label className="text-label-sm font-bold text-on-surface-variant" htmlFor="justification">Commentaire de justification</label>
<span className="text-label-xs text-outline">Visible par l'étudiant</span>
</div>
<div className="relative">
<textarea className="w-full bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg p-4 text-body-md transition-all resize-none" id="justification" placeholder="Veuillez expliquer en détail les raisons du rejet de cette demande de remboursement..." rows={6}></textarea>
<div className="absolute bottom-3 right-3 text-label-xs text-outline" id="char-count">0 / 1000</div>
</div>
</div>

<div className="flex items-start gap-3 bg-primary-fixed/30 p-3 rounded-lg">
<span className="material-symbols-outlined text-primary text-sm mt-0.5" data-icon="auto_awesome">auto_awesome</span>
<p className="text-label-sm text-on-primary-fixed-variant leading-tight">
                    L'étudiant recevra une notification automatique contenant cette justification.
                </p>
</div>
</section>

<div className="py-4 opacity-80">
<div className="bg-cover bg-center w-full h-32 rounded-xl" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuB51dEGFOujbH2_f5T0BfnWmOBehGRp0JFZ4Hvm0uM-I12A0l1MFP1aO2-_P-d6uFdT8MZBCfuwbXFzBNxr9TnN_-O2W5naaK-LyB_bPoHwyznJ0kbrSwcLbsCpmtzhOgcezO8LCpbnpkdIheHsmVk4rMgDcRvY7pJ2XwfT-3hAO14ds9pwRkSifGnj31cS9fP7gaoj1XIbRRFZZyMivVISCZeATg7rLaBCMpsj4pse1HHWucitnHGS')"}}></div>
</div>
</main>

<footer className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant px-4 py-6 space-y-3 z-40">
<button className="w-full bg-error text-on-error py-4 rounded-xl font-headline font-bold text-lg shadow-lg active:scale-[0.98] transition-transform flex items-center justify-center gap-2 hover:bg-error/90">
<span className="material-symbols-outlined" data-icon="block">block</span>
            Confirmer le rejet
        </button>
<button className="w-full text-on-surface-variant py-2 font-label font-semibold text-body-md hover:bg-surface-container-high rounded-lg transition-colors active:scale-95">
            Annuler
        </button>
</footer>
<script>
        function selectChip(element) &#123;
            const container = document.getElementById('reason-chips');
            const chips = container.querySelectorAll('button');
            
            chips.forEach(chip =&gt; &#123;
                chip.classList.remove('chip-active');
                chip.classList.remove('bg-primary');
                chip.classList.remove('text-on-primary');
                chip.classList.add('bg-surface');
                chip.classList.add('text-on-surface-variant');
            &#125;);
            
            element.classList.add('chip-active');
            element.classList.remove('bg-surface');
            element.classList.remove('text-on-surface-variant');
            element.classList.add('bg-primary');
            element.classList.add('text-on-primary');
        &#125;

        const textarea = document.getElementById('justification');
        const countDisplay = document.getElementById('char-count');
        
        textarea.addEventListener('input', () =&gt; &#123;
            const count = textarea.value.length;
            countDisplay.innerText = `$&#123;count&#125; / 1000`;
            if (count &gt; 900) &#123;
                countDisplay.classList.add('text-error');
            &#125; else &#123;
                countDisplay.classList.remove('text-error');
            &#125;
        &#125;);

        // Simple animation on load
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const main = document.querySelector('main');
            main.style.opacity = '0';
            main.style.transform = 'translateY(20px)';
            main.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() =&gt; &#123;
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
            &#125;, 100);
        &#125;);
    </script>

    </div>
  );
}
