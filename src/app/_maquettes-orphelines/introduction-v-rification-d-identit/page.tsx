import type { Metadata } from "next";

export const metadata: Metadata = { title: "Vérification d'Identité - Edukora" };

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="bg-surface dark:bg-on-background w-full top-0 border-b border-surface-border dark:border-outline-variant flex items-center px-container-padding-mobile md:px-container-padding-desktop h-16 z-50">
<button className="mr-4 p-2 rounded-full hover:bg-surface-container-low transition-colors active:opacity-80">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
</button>
<h1 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed">Vérification d'identité</h1>
</header>
<main className="flex-grow flex items-center justify-center p-container-padding-mobile md:p-container-padding-desktop">
<div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">

<div className="lg:col-span-5 hidden lg:block relative">
<div className="aspect-square rounded-xl overflow-hidden shadow-sm border border-surface-border bg-surface-container-lowest flex items-center justify-center relative">
<img className="w-full h-full object-cover" src="/images/ecran-194.png" alt="A sophisticated digital artwork showing a secure verification process. It features a translucent blue biometric scan interface floating over a clean, minimalist desk with a professional academic environment in the background. The lighting is soft and high-key, using the brand's primary blue and white colors to convey trust and intellectual clarity." />

<div className="absolute bottom-6 left-6 bg-surface-container-lowest/90 backdrop-blur-md border border-surface-border p-4 rounded-lg flex items-center gap-3">
<div className="w-10 h-10 rounded-full bg-expert-purple/10 flex items-center justify-center">
<span className="material-symbols-outlined text-expert-purple" style={{"fontVariationSettings":"'FILL' 1"}}>verified_user</span>
</div>
<div>
<p className="font-label-md text-label-md text-expert-purple">SÉCURISÉ</p>
<p className="font-body-md text-body-md font-bold">Chiffrement AES-256</p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-7 flex flex-col gap-stack-md">
<section className="space-y-4">
<div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                        ÉTAPE DE CERTIFICATION
                    </div>
<h2 className="font-headline-lg text-headline-lg text-primary tracking-tight">Vérification d'Identité</h2>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                        Pour certifier vos premières fiches, nous devons confirmer votre identité d'expert. Ce processus rapide garantit l'intégrité pédagogique de la plateforme Edukora.
                    </p>
</section>
<div className="flex flex-col gap-4 mt-4">

<div className="step-card group flex items-start gap-4 p-4 bg-surface-container-lowest border border-surface-border rounded-lg transition-all duration-300 hover:border-primary-container">
<div className="step-number w-10 h-10 shrink-0 rounded-full border-2 border-primary-container text-primary-container flex items-center justify-center font-bold font-title-md transition-colors">1</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md text-on-surface">Pièce d'identité</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Téléchargez une copie lisible de votre CNI ou de votre Passeport en cours de validité.</p>
<div className="flex gap-2 mt-2">
<span className="material-symbols-outlined text-outline text-sm">id_card</span>
<span className="material-symbols-outlined text-outline text-sm">public</span>
</div>
</div>
</div>

<div className="step-card group flex items-start gap-4 p-4 bg-surface-container-lowest border border-surface-border rounded-lg transition-all duration-300 hover:border-primary-container">
<div className="step-number w-10 h-10 shrink-0 rounded-full border-2 border-primary-container text-primary-container flex items-center justify-center font-bold font-title-md transition-colors">2</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md text-on-surface">Selfie de sécurité</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Une capture faciale en temps réel pour confirmer que vous êtes bien le titulaire du document.</p>
</div>
</div>

<div className="step-card group flex items-start gap-4 p-4 bg-surface-container-lowest border border-surface-border rounded-lg transition-all duration-300 hover:border-primary-container">
<div className="step-number w-10 h-10 shrink-0 rounded-full border-2 border-primary-container text-primary-container flex items-center justify-center font-bold font-title-md transition-colors">3</div>
<div className="flex flex-col">
<h3 className="font-title-md text-title-md text-on-surface">Validation académique</h3>
<p className="font-body-md text-body-md text-on-surface-variant">Vérification de vos titres universitaires ou de vos références académiques de Master/Doctorat.</p>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
<button className="w-full sm:w-auto px-8 py-4 bg-primary-container text-white font-bold rounded-lg hover:bg-primary transition-all active:scale-[0.98] shadow-sm">
                        Commencer la vérification
                    </button>
<p className="font-label-md text-label-md text-outline flex items-center gap-2">
<span className="material-symbols-outlined text-sm">lock</span>
                        Temps estimé : 3 minutes
                    </p>
</div>
</div>
</div>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 bg-surface dark:bg-on-background px-4 pb-safe border-t border-surface-border dark:border-outline-variant z-50">
<a className="flex flex-col items-center justify-center text-primary dark:text-primary-fixed font-bold" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>doorbell</span>
<span className="font-label-md text-label-md">Bienvenue</span>
</a>
<a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant" href="#">
<span className="material-symbols-outlined">id_card</span>
<span className="font-label-md text-label-md">Documents</span>
</a>
<a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant" href="#">
<span className="material-symbols-outlined">face</span>
<span className="font-label-md text-label-md">Biometrics</span>
</a>
<a className="flex flex-col items-center justify-center text-outline dark:text-outline-variant" href="#">
<span className="material-symbols-outlined">verified</span>
<span className="font-label-md text-label-md">Statut</span>
</a>
</nav>

<aside className="hidden lg:flex flex-col h-full border-r border-surface-border fixed left-0 top-0 w-[280px] bg-surface dark:bg-on-background z-40 pt-20">
<div className="px-6 mb-8 flex flex-col items-start">
<div className="w-16 h-16 rounded-full bg-surface-container-high mb-3 flex items-center justify-center overflow-hidden border border-surface-border">
<img className="w-full h-full object-cover" src="/images/ecran-195.png" alt="Professional portrait of a university professor, Dr. Aris Thorne, wearing a smart charcoal blazer and glasses. The background is a blurred academic library with rich wooden shelves. The lighting is warm and intellectual, highlighting a confident yet approachable expression suitable for an expert dashboard." />
</div>
<h4 className="font-title-md text-title-md text-on-surface">Dr. Aris Thorne</h4>
<p className="font-body-md text-body-md text-on-surface-variant">Subject Matter Expert</p>
<span className="mt-2 inline-block px-2 py-0.5 rounded bg-validation-amber/10 text-validation-amber font-label-md text-[10px] tracking-wider uppercase">Vérification en cours</span>
</div>
<nav className="flex flex-col gap-1">
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">dashboard</span>
<span className="font-body-md text-body-md">Overview</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 bg-secondary-container dark:bg-secondary-fixed text-on-secondary-container dark:text-on-secondary-fixed rounded-full mx-2" href="#">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>badge</span>
<span className="font-body-md text-body-md font-bold">Vérification d'identité</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">school</span>
<span className="font-body-md text-body-md">Academic Credentials</span>
</a>
<a className="flex items-center gap-3 py-3 px-6 text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-tertiary-container rounded-full mx-2 transition-all" href="#">
<span className="material-symbols-outlined">lock</span>
<span className="font-body-md text-body-md">Paramètres de sécurité</span>
</a>
</nav>
<div className="mt-auto p-6 border-t border-surface-border">
<div className="flex items-center gap-2 text-outline">
<span className="material-symbols-outlined text-sm">verified</span>
<span className="font-label-md text-label-md">Edukora Protocol v4.2</span>
</div>
</div>
</aside>
<script>
        // Simple micro-interaction for button press
        document.querySelector('button.bg-primary-container').addEventListener('click', function() &#123;
            this.innerHTML = '&lt;span class="inline-block animate-spin mr-2"&gt;◌&lt;/span&gt; Chargement...';
            setTimeout(() =&gt; &#123;
                this.innerHTML = 'Commencer la vérification';
            &#125;, 1500);
        &#125;);

        // Responsive Sidebar Adjustment
        const adjustMainPadding = () =&gt; &#123;
            const main = document.querySelector('main');
            if (window.innerWidth &gt;= 1024) &#123;
                main.style.paddingLeft = '280px';
            &#125; else &#123;
                main.style.paddingLeft = '16px';
            &#125;
        &#125;;
        window.addEventListener('resize', adjustMainPadding);
        adjustMainPadding();
    </script>

    </div>
  );
}
