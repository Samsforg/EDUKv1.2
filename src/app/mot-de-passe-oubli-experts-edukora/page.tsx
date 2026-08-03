import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora Experts - Récupération de compte" };

export default function Page() {
  return (
    <div className="mesh-bg min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="flex items-center px-4 md:px-8 h-16 w-full bg-surface border-b border-outline-variant sticky top-0 z-50">
<button aria-label="Retour" className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-primary">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<div className="ml-4 font-headline text-headline-md font-bold text-primary">Vérification d'identité</div>
</header>
<main className="flex-grow flex items-center justify-center p-4">

<div className="w-full max-w-[480px] bg-surface-container-lowest border border-outline-variant p-8 md:p-12 rounded-xl shadow-sm">

<div className="flex justify-center mb-8">
<div className="w-16 h-16 academic-gradient rounded-xl flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined text-4xl" style={{"fontVariationSettings":"'FILL' 1"}}>school</span>
</div>
</div>

<div className="text-center space-y-4 mb-10">
<h1 className="text-on-surface font-headline text-[28px] leading-tight font-bold">
                    Récupération de compte Expert
                </h1>
<p className="text-on-surface-variant font-body text-body-md">
                    Entrez votre adresse e-mail professionnelle pour recevoir un lien de réinitialisation sécurisé.
                </p>
</div>

<form className="space-y-6">
<div className="space-y-2">
<label className="block text-label-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">
                        E-mail professionnel
                    </label>
<div className="relative group">
<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline group-focus-within:text-primary transition-colors">
<span className="material-symbols-outlined">mail</span>
</div>
<input className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-low border border-outline-variant rounded-lg text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200" id="email" name="email" placeholder="nom.expert@edukora.ci" required={true} type="email" />
</div>
</div>
<div className="pt-2">
<button className="w-full py-4 bg-primary text-on-primary font-headline font-semibold text-body-md rounded-lg hover:bg-primary-container active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm" type="submit">
                        Envoyer le lien de récupération
                        <span className="material-symbols-outlined text-[20px]">send</span>
</button>
</div>
</form>

<div className="mt-8 text-center">
<a className="inline-flex items-center gap-2 text-primary font-semibold hover:underline decoration-2 underline-offset-4 transition-all" href="#">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
                    Retour à la connexion
                </a>
</div>

<div className="my-10 flex items-center gap-4">
<div className="flex-grow h-[1px] bg-outline-variant"></div>
<span className="text-outline text-xs font-bold tracking-widest uppercase">Vérification Edukora</span>
<div className="flex-grow h-[1px] bg-outline-variant"></div>
</div>

<div className="grid grid-cols-1 gap-4">
<div className="bg-surface-container-high/50 p-4 rounded-lg flex items-start gap-4">
<span className="material-symbols-outlined text-primary" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
<div>
<div className="text-label-sm font-bold text-on-surface">Sécurité certifiée AES-256</div>
<p className="text-label-xs text-on-surface-variant mt-1 leading-relaxed">
                            Vos données sont protégées par un cryptage de grade militaire conforme aux normes académiques internationales.
                        </p>
</div>
</div>
</div>
</div>
</main>

<footer className="w-full py-8 px-4 flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto">
<div className="flex items-center gap-2 text-outline text-label-sm">
<span className="material-symbols-outlined text-sm">copyright</span>
<span>2024 Edukora - Plateforme Expert</span>
</div>
<div className="flex items-center gap-6">
<a className="text-primary font-medium hover:text-primary-container flex items-center gap-1.5 transition-colors" href="#">
<span className="material-symbols-outlined text-[20px]">help_center</span>
                Support Académique
            </a>
<div className="w-1 h-1 rounded-full bg-outline-variant"></div>
<div className="flex items-center gap-1.5 text-on-tertiary-fixed-variant">
<span className="material-symbols-outlined text-[18px]">lock</span>
<span className="text-label-xs font-bold">Système Sécurisé</span>
</div>
</div>
</footer>

<div className="fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[100] hidden items-center justify-center p-4" id="success-overlay">
<div className="bg-surface-container-lowest max-w-sm w-full rounded-xl p-8 shadow-2xl scale-95 opacity-0 transition-all duration-300 transform" id="success-card">
<div className="flex flex-col items-center text-center">
<div className="w-20 h-20 bg-tertiary-container rounded-full flex items-center justify-center text-on-tertiary-container mb-6">
<span className="material-symbols-outlined text-5xl" style={{"fontVariationSettings":"'FILL' 1"}}>check_circle</span>
</div>
<h3 className="text-headline-md font-bold text-on-surface mb-2">E-mail Envoyé</h3>
<p className="text-on-surface-variant mb-8">
                    Si un compte Expert correspond à cet e-mail, vous recevrez un lien d'accès dans quelques instants.
                </p>
<button className="w-full py-3 bg-primary text-on-primary rounded-lg font-bold hover:bg-primary-container transition-colors">
                    Fermer
                </button>
</div>
</div>
</div>
<script>
        function showSuccess() &#123;
            const overlay = document.getElementById('success-overlay');
            const card = document.getElementById('success-card');
            overlay.classList.remove('hidden');
            overlay.classList.add('flex');
            setTimeout(() =&gt; &#123;
                card.classList.remove('scale-95', 'opacity-0');
                card.classList.add('scale-100', 'opacity-100');
            &#125;, 10);
        &#125;

        function hideSuccess() &#123;
            const overlay = document.getElementById('success-overlay');
            const card = document.getElementById('success-card');
            card.classList.add('scale-95', 'opacity-0');
            card.classList.remove('scale-100', 'opacity-100');
            setTimeout(() =&gt; &#123;
                overlay.classList.add('hidden');
                overlay.classList.remove('flex');
            &#125;, 300);
        &#125;

        // Contextual FAB Suppression as per rules
        // Floating action buttons are suppressed on transactional screens
    </script>

    </div>
  );
}
