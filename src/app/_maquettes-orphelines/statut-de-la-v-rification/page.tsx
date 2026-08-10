import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Vérification" };

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full top-0 border-b border-surface-border dark:border-outline-variant bg-surface dark:bg-on-background flex items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full z-40">
<div className="flex items-center gap-4">
<button className="text-primary dark:text-primary-fixed hover:bg-surface-container-low dark:hover:bg-tertiary-container transition-colors p-2 rounded-full active:opacity-80 transition-opacity">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Vérification d'identité</h1>
</div>
</header>
<main className="flex-grow flex items-center justify-center relative overflow-hidden px-4">

<div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary opacity-[0.03] rounded-full blur-3xl"></div>
<div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-expert-purple opacity-[0.03] rounded-full blur-3xl"></div>

<div className="max-w-2xl w-full flex flex-col items-center text-center space-y-8 z-10">

<div className="relative group">
<div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
<div className="relative bg-surface-container-lowest border border-surface-border rounded-full w-40 h-40 flex items-center justify-center animate-float shadow-sm">
<span className="material-symbols-outlined text-[80px] text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>

<div className="absolute -top-2 -right-2 bg-validation-amber text-white p-2 rounded-full shadow-lg">
<span className="material-symbols-outlined text-[24px]">pending</span>
</div>
</div>
</div>

<div className="space-y-4">
<h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface">Vérification en cours</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto leading-relaxed">
                    Vos documents ont été transmis à notre comité académique. Vous recevrez une notification sous <span className="font-bold text-primary">24h-48h</span> pour l'activation de votre droit de signature.
                </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mt-4">
<div className="glass-effect p-6 rounded-xl flex flex-col items-start text-left space-y-2">
<div className="flex items-center gap-2 text-impact-emerald">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
<span className="font-label-md text-label-md uppercase tracking-wider">Transmission</span>
</div>
<span className="font-title-md text-title-md text-on-surface">Succès</span>
<span className="font-body-md text-body-md text-on-surface-variant">Documents sécurisés et archivés.</span>
</div>
<div className="glass-effect p-6 rounded-xl flex flex-col items-start text-left space-y-2">
<div className="flex items-center gap-2 text-validation-amber">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>sync</span>
<span className="font-label-md text-label-md uppercase tracking-wider">Analyse Académique</span>
</div>
<span className="font-title-md text-title-md text-on-surface">En attente</span>
<span className="font-body-md text-body-md text-on-surface-variant">Examen de vos titres universitaires.</span>
</div>
</div>

<div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
<button className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-container transition-all active:scale-95 shadow-md">
                    Actualiser le statut
                </button>
<button className="px-8 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-surface-container-low transition-all active:scale-95">
                    Retour au tableau de bord
                </button>
</div>

<div className="pt-8 flex items-center justify-center gap-6 opacity-60">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-lg">verified</span>
<span className="font-label-md text-label-md">Certifié ISO 27001</span>
</div>
<div className="w-1 h-1 bg-outline rounded-full"></div>
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-lg">gavel</span>
<span className="font-label-md text-label-md">Conforme RGPD</span>
</div>
</div>
</div>
</main>


<footer className="mt-auto py-8 text-center border-t border-surface-border bg-surface-container-lowest">
<p className="font-label-md text-label-md text-outline">Besoin d'aide ? <a className="text-primary underline hover:text-primary-container" href="#">Contactez le support académique</a></p>
</footer>
<script>
        // Micro-interaction for the status pulse
        document.addEventListener('DOMContentLoaded', () =&gt; &#123;
            const syncIcon = document.querySelector('.material-symbols-outlined.text-validation-amber');
            if (syncIcon) &#123;
                syncIcon.classList.add('animate-spin');
                syncIcon.style.animationDuration = '3s';
            &#125;
        &#125;);
    </script>

    </div>
  );
}
