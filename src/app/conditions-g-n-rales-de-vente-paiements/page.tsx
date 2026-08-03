import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Conditions Générales de Vente" };

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col" >

<header className="bg-surface dark:bg-surface-dim border-b border-outline-variant dark:border-outline docked full-width top-0 sticky z-50">
<div className="flex items-center px-4 h-16 w-full max-w-screen-xl mx-auto">
<button aria-label="Retour" className="mr-4 text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 duration-100">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed truncate">
                Conditions Générales
            </h1>
</div>
</header>

<main className="flex-grow w-full max-w-screen-md mx-auto px-4 py-8">

<div className="flex flex-col items-center mb-10 text-center">
<img alt="Edukora Logo" className="w-16 h-16 mb-4 opacity-90" src="/images/ecran-073.png" />
<h2 className="text-display-lg-mobile md:text-display-lg font-bold text-on-surface mb-2">Conditions Générales de Vente</h2>
<p className="text-label-sm text-outline font-medium">Dernière mise à jour : 24 Octobre 2023</p>
<div className="w-16 h-1 bg-secondary-container rounded-full mt-4"></div>
</div>
<div className="space-y-12 pb-24">

<section className="scroll-mt-20" id="objet">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-lg flex items-center justify-center font-bold">1</span>
<h3 className="text-headline-md font-semibold text-primary">Objet</h3>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<p className="text-body-md text-on-surface-variant leading-relaxed">
                        Les présentes Conditions Générales de Vente (CGV) régissent l'accès et l'utilisation des services <strong>Edukora Premium</strong>. Ces services incluent l'accès illimité aux fiches de révision, aux simulateurs d'examens BEPC et BAC, ainsi qu'à l'assistance personnalisée par notre Tuteur IA.
                    </p>
<p className="mt-4 text-body-md text-on-surface-variant leading-relaxed">
                        En souscrivant à un abonnement, l'élève ou son tuteur légal accepte sans réserve les présentes conditions, destinées à garantir une expérience d'apprentissage optimale et sécurisée.
                    </p>
</div>
</section>

<section className="scroll-mt-20" id="modalites">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-lg flex items-center justify-center font-bold">2</span>
<h3 className="text-headline-md font-semibold text-primary">Modalités de Souscription</h3>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<p className="text-body-md text-on-surface-variant mb-4">
                        La souscription s'effectue directement depuis l'application mobile Edukora via les solutions de paiement mobile locales :
                    </p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
<div className="flex items-center gap-2 p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-secondary">payments</span>
<span className="text-label-sm font-semibold">Orange Money</span>
</div>
<div className="flex items-center gap-2 p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-secondary">payments</span>
<span className="text-label-sm font-semibold">MTN Mobile Money</span>
</div>
<div className="flex items-center gap-2 p-3 bg-surface-container rounded-lg border border-outline-variant/30">
<span className="material-symbols-outlined text-secondary">payments</span>
<span className="text-label-sm font-semibold">Wave</span>
</div>
</div>
<p className="text-body-md text-on-surface-variant">
                        Le processus est instantané : dès la validation du code secret sur le terminal de paiement mobile, les fonctionnalités Premium sont débloquées sur le compte de l'utilisateur.
                    </p>
</div>
</section>

<section className="scroll-mt-20" id="tarifs">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-lg flex items-center justify-center font-bold">3</span>
<h3 className="text-headline-md font-semibold text-primary">Tarifs et Paiement</h3>
</div>
<div className="space-y-4">
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
<div className="bg-surface-container px-6 py-3 border-b border-outline-variant">
<h4 className="text-label-sm font-bold uppercase tracking-wider text-outline">Comparatif des Plans</h4>
</div>
<div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="space-y-2">
<h5 className="font-bold text-primary">Plan Découverte</h5>
<p className="text-body-md text-on-surface-variant">Gratuit. Accès limité aux premières leçons de chaque module et 3 questions par jour au tuteur IA.</p>
</div>
<div className="space-y-2">
<h5 className="font-bold text-secondary">Plan Premium</h5>
<p className="text-body-md text-on-surface-variant">Payant. Accès total et illimité. Les tarifs sont affichés en Francs CFA (XOF) toutes taxes comprises.</p>
</div>
</div>
</div>
<div className="bg-surface-container-low border border-outline-variant p-4 rounded-xl flex items-start gap-3">
<span className="material-symbols-outlined text-primary-container mt-1">info</span>
<p className="text-body-md italic text-on-surface-variant">
                            Note : Edukora privilégie des paiements ponctuels sans engagement pour les révisions courtes, ou des forfaits mensuels/annuels. La nature récurrente ou unique est explicitement indiquée lors de la validation.
                        </p>
</div>
</div>
</section>

<section className="scroll-mt-20" id="retractation">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-lg flex items-center justify-center font-bold">4</span>
<h3 className="text-headline-md font-semibold text-primary">Droit de Rétractation et Remboursement</h3>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<p className="text-body-md text-on-surface-variant leading-relaxed">
                        Conformément à la législation sur les contenus numériques, le droit de rétractation ne peut être exercé dès lors que l'accès au contenu numérique a commencé (première consultation d'une fiche Premium).
                    </p>
<p className="mt-4 text-body-md text-on-surface-variant leading-relaxed">
                        Toutefois, Edukora s'engage à étudier toute demande de remboursement motivée par un problème technique persistant empêchant l'accès au service, formulée sous 48h après la transaction.
                    </p>
</div>
</section>

<section className="scroll-mt-20" id="gestion">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-lg flex items-center justify-center font-bold">5</span>
<h3 className="text-headline-md font-semibold text-primary">Gestion de l'Abonnement</h3>
</div>
<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
<ul className="space-y-4 text-body-md text-on-surface-variant">
<li className="flex gap-3">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span><strong>Annulation :</strong> Les abonnements sans engagement peuvent être annulés à tout moment via l'onglet "Profil &gt; Paramètres".</span>
</li>
<li className="flex gap-3">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
<span><strong>Mise à jour :</strong> Passer d'un forfait mensuel à un forfait annuel s'effectue par simple validation du nouveau tarif, le reliquat du mois en cours est automatiquement déduit.</span>
</li>
</ul>
</div>
</section>

<section className="scroll-mt-20" id="securite">
<div className="flex items-center gap-3 mb-4">
<span className="bg-primary-container text-on-primary-container w-8 h-8 rounded-lg flex items-center justify-center font-bold">6</span>
<h3 className="text-headline-md font-semibold text-primary">Sécurité des Transactions</h3>
</div>
<div className="bg-primary-container text-on-primary-container rounded-xl p-6 shadow-md flex items-center gap-6">
<div className="hidden md:block">
<span className="material-symbols-outlined text-[48px]" style={{"fontVariationSettings":"'FILL' 1"}}>shield_lock</span>
</div>
<div>
<h4 className="font-bold text-lg mb-1">Sécurité Garantie</h4>
<p className="text-sm opacity-90 leading-relaxed">
                            Toutes les transactions sont sécurisées et cryptées par nos partenaires de paiement agréés par la BCEAO. Edukora ne stocke aucune coordonnée bancaire ou code PIN sur ses serveurs.
                        </p>
</div>
</div>
</section>

<div className="pt-8 border-t border-outline-variant text-center">
<p className="text-body-md text-on-surface-variant">
                    Une question sur nos conditions ? Contactez notre support :
                </p>
<a className="inline-block mt-4 text-primary font-bold hover:underline" href="mailto:support@edukora.ci">support@edukora.ci</a>
</div>
</div>
</main>

<nav className="bg-surface-container-lowest dark:bg-surface-container-lowest fixed bottom-0 left-0 w-full flex justify-around items-center px-2 py-3 z-50 rounded-t-xl shadow-[0_-4px_6px_-1px_rgba(0,41,158,0.1)]">
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-100">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-100">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</button>
<button className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline-variant py-1 hover:bg-surface-container-high transition-all active:scale-90 duration-100">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</button>
<button className="flex flex-col items-center justify-center bg-primary-container dark:bg-primary-container text-on-primary-container dark:text-on-primary-container rounded-full px-5 py-1 transition-all active:scale-90 duration-100">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</button>
</nav>
<script>
        // Simple back button interaction
        document.querySelector('button[aria-label="Retour"]').addEventListener('click', () =&gt; &#123;
            console.log('Navigating back...');
            // In a real PWA this would be window.history.back();
        &#125;);

        // Smooth scroll implementation for navigation (if any internal links were added)
        document.querySelectorAll('a[href^="#"]').forEach(anchor =&gt; &#123;
            anchor.addEventListener('click', function (e) &#123;
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView(&#123;
                    behavior: 'smooth'
                &#125;);
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
