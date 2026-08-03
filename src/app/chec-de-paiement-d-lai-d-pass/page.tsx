import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Paiement Expiré" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface w-full sticky top-0 z-50 flex justify-between items-center px-4 h-16 shadow-none">
<div className="flex items-center gap-2">
<button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95 duration-200">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
<img className="w-full h-full object-cover" src="/images/ecran-052.png" alt="A professional close-up portrait of a West African student with a friendly expression, set against a blurred academic library background with soft natural lighting. The style is clean and corporate, featuring a high-quality light-mode aesthetic with academic blue accents." />
</div>
</header>

<main className="flex-grow flex items-center justify-center px-6 py-12">
<div className="max-w-md w-full flex flex-col items-center text-center">

<div className="relative w-32 h-32 mb-8 flex items-center justify-center">
<div className="pulse-effect absolute inset-0 rounded-full bg-error-container opacity-20"></div>
<div className="relative z-10 w-24 h-24 bg-error-container rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-error text-6xl" style={{"fontVariationSettings":"'opsz' 48"}}>hourglass_disabled</span>
</div>
</div>

<h1 className="font-headline text-3xl font-extrabold text-on-surface mb-4 tracking-tight">
                Délai d'attente dépassé
            </h1>
<p className="text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                Nous n'avons pas reçu la validation de votre paiement à temps. La session de transaction a expiré pour des raisons de sécurité.
            </p>

<div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-10 text-left">
<h2 className="text-label-sm font-bold text-primary uppercase tracking-widest mb-4">Conseils de vérification</h2>
<div className="space-y-4">
<div className="flex gap-4">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-fixed text-sm">signal_cellular_alt</span>
</div>
<div>
<p className="font-semibold text-on-surface text-body-md">Signal réseau</p>
<p className="text-on-surface-variant text-label-sm">Assurez-vous que votre téléphone capte suffisamment pour recevoir le SMS de validation.</p>
</div>
</div>
<div className="flex gap-4">
<div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-on-primary-fixed text-sm">smartphone</span>
</div>
<div>
<p className="font-semibold text-on-surface text-body-md">Téléphone actif</p>
<p className="text-on-surface-variant text-label-sm">Vérifiez que votre téléphone n'est pas en mode "Ne pas déranger" ou hors tension.</p>
</div>
</div>
</div>
</div>

<div className="w-full space-y-4">
<button className="w-full h-14 bg-secondary-container text-on-secondary-container font-bold rounded-xl flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm">
<span className="material-symbols-outlined">refresh</span>
                    Relancer la demande
                </button>
<a className="inline-flex items-center gap-1 text-primary font-semibold hover:underline transition-all py-2" href="#">
                    Contacter le support
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
</a>
</div>
</div>
</main>

<footer className="p-8 text-center text-on-surface-variant text-label-sm border-t border-surface-container">
<p>© 2024 Edukora. Identifiant de transaction : <span className="font-mono bg-surface-container px-1 rounded">ERR_TIMEOUT_772</span></p>
</footer>

<script>
        // Micro-interaction: Hover animation for the error icon
        const iconContainer = document.querySelector('.relative.z-10');
        iconContainer.addEventListener('mouseenter', () =&gt; &#123;
            iconContainer.classList.add('rotate-12', 'transition-transform');
        &#125;);
        iconContainer.addEventListener('mouseleave', () =&gt; &#123;
            iconContainer.classList.remove('rotate-12');
        &#125;);

        // Feedback on Button Click
        const mainButton = document.querySelector('button.bg-secondary-container');
        mainButton.addEventListener('click', function() &#123;
            this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;sync&lt;/span&gt; Initialisation...';
            setTimeout(() =&gt; &#123;
                // Mock redirect or refresh
                console.log('Relaunching payment process...');
                window.location.reload();
            &#125;, 1500);
        &#125;);
    </script>

    </div>
  );
}
