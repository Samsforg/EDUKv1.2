import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Signalement de Fiche" };

export default function Page() {
  return (
    <div className="text-on-background min-h-screen pb-20 md:pb-0" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background text-primary dark:text-primary-fixed border-b border-surface-border dark:border-outline-variant w-full top-0 z-50 sticky">
<div className="flex items-center px-container-padding-mobile md:px-container-padding-desktop h-16 w-full max-w-7xl mx-auto justify-between">
<div className="flex items-center gap-4">
<button className="hover:bg-surface-container-low transition-colors p-2 rounded-full">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md font-bold tracking-tight">Signalement de Fiche</h1>
</div>
<div className="flex items-center gap-2 px-3 py-1 bg-error-container text-on-error-container rounded-full">
<span className="material-symbols-outlined text-[18px]">warning</span>
<span className="font-label-md text-label-md">Action Requise</span>
</div>
</div>
</header>
<main className="max-w-7xl mx-auto px-container-padding-mobile md:px-container-padding-desktop py-base md:py-stack-md flex flex-col md:flex-row gap-gutter">

<div className="flex-1 space-y-gutter">

<section className="bg-white border border-surface-border rounded-xl p-stack-md overflow-hidden relative">
<div className="absolute left-0 top-0 bottom-0 w-1 bg-validation-amber"></div>
<div className="flex items-start gap-4 mb-stack-sm">
<div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-container-low">
<span className="material-symbols-outlined text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<div>
<h2 className="font-title-md text-title-md text-on-surface">Commentaire de l'Expert</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Signalé par Dr. Aris Thorne • Subject Matter Expert</p>
</div>
</div>
<div className="bg-surface-container-low rounded-lg p-4 border border-outline-variant">
<p className="font-body-lg text-body-lg italic text-on-surface">
                        "Erreur conceptuelle majeure dans le chapitre 2 : La définition de l'entropie est confondue avec celle de l'enthalpie. Cette imprécision peut induire les autres étudiants en erreur lors de la préparation de l'examen final."
                    </p>
</div>
</section>

<section className="space-y-stack-sm">
<h3 className="font-title-md text-title-md px-1">Aperçu de la fiche concernée</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-white border border-surface-border rounded-xl p-stack-md flex flex-col gap-3">
<div className="h-40 w-full rounded-lg bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuDQmmcuy2dO5Dwy6Bckb5VYD-zBDcqmUNS0opUaLClIzFID_Egp4AMYUPifJfarcbGrU5LTUor4GDzZaTnwxZT73knHjjrX_p7yaJy0Ww11gSOVaItsZzT5CRL9suqlpPeKzKLShEAlGOuoefFnspVlOXcPlX-KpNowv4VSBt4i9tnvOknuMzDvQqcJKlUIwAO_AbKXQdHfeQfkCZooXCsWe8HzUIr-2DJgqhtveirdSlhl1fXGcWlA')"}}></div>
<div className="flex justify-between items-center">
<span className="font-label-md text-label-md text-primary bg-primary-fixed px-2 py-0.5 rounded">Physique-Chimie</span>
<span className="font-label-md text-label-md text-outline">Mis à jour il y a 2 jours</span>
</div>
<h4 className="font-title-md text-title-md">Thermodynamique : Les Fondamentaux</h4>
</div>
<div className="bg-white border border-surface-border rounded-xl p-stack-md flex flex-col justify-between">
<div className="space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-validation-amber">error_outline</span>
<span className="font-body-md text-body-md font-bold">Section problématique : Chapitre 2</span>
</div>
<div className="p-3 bg-error-container/20 rounded-lg border border-error/10">
<p className="font-body-md text-body-md text-on-surface line-through opacity-50">L'entropie (H) mesure l'énergie totale d'un système thermodynamique...</p>
<p className="font-body-md text-body-md text-error mt-2 font-bold">Correction suggérée : L'enthalpie (H) vs L'entropie (S).</p>
</div>
</div>
<div className="pt-4 flex gap-2">
<button className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
<span className="material-symbols-outlined text-[20px]">edit</span>
                                Modifier la fiche
                            </button>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest border border-surface-border rounded-xl p-stack-md text-center">
<p className="font-body-md text-body-md text-on-surface-variant mb-3">Vous pensez qu'il s'agit d'une erreur de l'expert ?</p>
<button className="text-primary font-title-md text-title-md border border-primary px-6 py-2 rounded-lg hover:bg-primary-fixed transition-colors">
                    Contester le signalement
                </button>
</section>
</div>

<aside className="w-full md:w-[320px] space-y-gutter">

<div className="bg-white border border-surface-border rounded-xl p-stack-md">
<h3 className="font-title-md text-title-md mb-stack-sm">Standards Académiques</h3>
<ul className="space-y-4">
<li className="flex gap-3">
<span className="material-symbols-outlined text-impact-emerald">check_circle</span>
<div>
<p className="font-body-md text-body-md font-bold">Exactitude Factuelle</p>
<p className="font-label-md text-label-md text-on-surface-variant">Toutes les définitions doivent être sourcées et vérifiées.</p>
</div>
</li>
<li className="flex gap-3">
<span className="material-symbols-outlined text-impact-emerald">check_circle</span>
<div>
<p className="font-body-md text-body-md font-bold">Clarté Visuelle</p>
<p className="font-label-md text-label-md text-on-surface-variant">Utilisez des diagrammes lisibles et de haute qualité.</p>
</div>
</li>
<li className="flex gap-3">
<span className="material-symbols-outlined text-impact-emerald">check_circle</span>
<div>
<p className="font-body-md text-body-md font-bold">Intégrité</p>
<p className="font-label-md text-label-md text-on-surface-variant">Pas de plagiat. Utilisez vos propres mots pour synthétiser.</p>
</div>
</li>
</ul>
<a className="block mt-6 text-primary font-body-md text-body-md underline flex items-center gap-1" href="#">
                    Lire le guide complet
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
</a>
</div>

<div className="bg-secondary-container/30 border border-secondary-fixed-dim rounded-xl p-stack-md relative overflow-hidden">
<div className="absolute top-0 right-0 opacity-10">
<span className="material-symbols-outlined text-[80px]">lightbulb</span>
</div>
<h4 className="font-title-md text-title-md text-on-secondary-fixed mb-2">Besoin d'aide ?</h4>
<p className="font-body-md text-body-md text-on-secondary-fixed-variant mb-4">
                    Nos tuteurs IA peuvent vous aider à reformuler cette section pour qu'elle respecte les standards.
                </p>
<button className="w-full bg-on-secondary-fixed-variant text-white py-2 rounded font-bold hover:bg-on-secondary-fixed transition-colors">
                    Assistance IA
                </button>
</div>
</aside>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface border-t border-surface-border px-4 pb-safe z-50">
<a className="flex flex-col items-center justify-center text-outline" href="#">
<span className="material-symbols-outlined">doorbell</span>
<span className="font-label-md text-label-md">Bienvenue</span>
</a>
<a className="flex flex-col items-center justify-center text-outline" href="#">
<span className="material-symbols-outlined">id_card</span>
<span className="font-label-md text-label-md">Documents</span>
</a>
<a className="flex flex-col items-center justify-center text-primary font-bold" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
<span className="font-label-md text-label-md">Statut</span>
</a>
<a className="flex flex-col items-center justify-center text-outline" href="#">
<span className="material-symbols-outlined">face</span>
<span className="font-label-md text-label-md">Biometrics</span>
</a>
</nav>
<script>
        // Simple interaction for the dispute button
        const disputeBtn = document.querySelector('button:contains("Contester")');
        if (disputeBtn) &#123;
            disputeBtn.addEventListener('click', () =&gt; &#123;
                alert('Une demande de révision a été envoyée à l\'équipe de médiation Edukora.');
            &#125;);
        &#125;

        // Add "active" class to current navigation logic manually for mobile
        // In a real app, this would be reactive.
    </script>

    </div>
  );
}
