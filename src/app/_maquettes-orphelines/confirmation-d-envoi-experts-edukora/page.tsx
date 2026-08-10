import type { Metadata } from "next";

export const metadata: Metadata = { title: "Récupération de compte - Edukora Expert" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface border-b border-outline-variant sticky top-0 z-50 flex items-center justify-between px-4 md:px-8 w-full h-16">
<div className="flex items-center gap-4">
<button aria-label="Retour" className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95 duration-150">
<span className="material-symbols-outlined text-primary">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary">Récupération de compte</h1>
</div>
<div className="hidden md:block">
<span className="font-headline text-headline-md font-extrabold text-primary">Edukora Expert</span>
</div>
</header>
<main className="flex-grow flex flex-col items-center justify-center px-6 py-12 max-w-2xl mx-auto w-full">

<div className="relative mb-10 group">
<div className="absolute inset-0 bg-tertiary-fixed rounded-full opacity-20 success-pulse"></div>
<div className="relative w-32 h-32 bg-surface-container-lowest rounded-full border border-outline-variant flex items-center justify-center shadow-sm">
<span className="material-symbols-outlined text-tertiary text-6xl" style={{"fontVariationSettings":"'FILL' 1"}}>mark_email_read</span>
<div className="absolute -bottom-1 -right-1 bg-secondary-container text-on-secondary-container rounded-full p-1 border-2 border-surface">
<span className="material-symbols-outlined text-xl font-bold">check_circle</span>
</div>
</div>
</div>

<div className="text-center mb-8">
<h2 className="font-headline text-3xl font-bold text-primary mb-3">Lien de récupération envoyé !</h2>
<p className="text-body-md text-on-surface-variant max-w-md mx-auto">
                Un e-mail de réinitialisation sécurisé a été envoyé à l'adresse renseignée. Veuillez suivre les instructions pour accéder à nouveau à votre espace expert.
            </p>
</div>

<div className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl p-6 mb-8 shadow-sm">
<h3 className="font-headline text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
<span className="material-symbols-outlined text-primary">assignment_turned_in</span>
                Prochaines étapes
            </h3>
<div className="space-y-6">

<div className="flex gap-4">
<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-sm">1</div>
<div>
<p className="font-semibold text-on-surface">Consultez votre boîte mail</p>
<p className="text-sm text-on-surface-variant mt-1">N'oubliez pas de vérifier vos courriers indésirables (Spams) si vous ne voyez rien d'ici 2 minutes.</p>
</div>
</div>

<div className="flex gap-4">
<div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-sm">2</div>
<div>
<p className="font-semibold text-on-surface">Cliquez sur le bouton "Réinitialiser mon mot de passe"</p>
<p className="text-sm text-on-surface-variant mt-1">Ce lien vous redirigera vers une interface sécurisée pour choisir un nouveau code d'accès.</p>
</div>
</div>

<div className="flex gap-4">
<div className="flex-shrink-0 w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center font-bold text-sm">3</div>
<div>
<p className="font-semibold text-on-surface">Validité limitée</p>
<p className="text-sm text-on-surface-variant mt-1">Par mesure de haute sécurité académique, ce lien expirera automatiquement dans <span className="font-bold text-error">30 minutes</span>.</p>
</div>
</div>
</div>
</div>

<div className="text-center w-full mb-12">
<p className="text-on-surface-variant text-sm mb-2">Vous n'avez rien reçu ?</p>
<button className="group relative overflow-hidden inline-flex items-center gap-2 text-primary font-bold py-2 px-4 rounded-lg opacity-50 cursor-not-allowed transition-all" disabled={true} id="resendBtn">
<span className="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-500">replay</span>
<span>Renvoyer le lien (<span id="timer">59</span>s)</span>
</button>
</div>

<div className="w-full mt-auto">
<button className="w-full bg-secondary-container text-on-secondary-container font-headline font-bold py-4 rounded-lg shadow-md hover:bg-secondary hover:text-on-secondary transition-all active:scale-[0.98] duration-150 flex items-center justify-center gap-2">
                Retour à la connexion
                <span className="material-symbols-outlined">login</span>
</button>
</div>
</main>

<footer className="mt-auto py-8 px-6 border-t border-outline-variant bg-surface-container-low w-full text-center">
<div className="flex flex-col items-center gap-3">
<div className="flex items-center gap-2 text-primary opacity-80">
<span className="material-symbols-outlined text-sm" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
<span className="text-xs font-bold uppercase tracking-widest font-label">Sécurité académique Edukora</span>
</div>
<p className="text-xs text-on-surface-variant max-w-xs">
                Système de protection des données conforme aux standards académiques nationaux. Votre sécurité est notre priorité.
            </p>
</div>
</footer>
<script>
        // Simple countdown logic for the resend button
        let timeLeft = 59;
        const timerElement = document.getElementById('timer');
        const resendBtn = document.getElementById('resendBtn');

        const countdown = setInterval(() =&gt; &#123;
            if (timeLeft &lt;= 0) &#123;
                clearInterval(countdown);
                resendBtn.disabled = false;
                resendBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                resendBtn.classList.add('hover:bg-primary-container', 'hover:text-on-primary-container');
                resendBtn.innerHTML = `
                    &lt;span class="material-symbols-outlined text-xl group-hover:rotate-180 transition-transform duration-500"&gt;replay&lt;/span&gt;
                    &lt;span&gt;Renvoyer le lien&lt;/span&gt;
                `;
            &#125; else &#123;
                timeLeft--;
                timerElement.innerText = timeLeft;
            &#125;
        &#125;, 1000);

        // Click interaction for main button
        document.querySelector('button.bg-secondary-container').addEventListener('click', function() &#123;
            this.innerHTML = '&lt;span class="material-symbols-outlined animate-spin"&gt;progress_activity&lt;/span&gt; Chargement...';
            setTimeout(() =&gt; &#123;
                window.location.reload(); // Placeholder action
            &#125;, 800);
        &#125;);
    </script>

    </div>
  );
}
