import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Centre d'Aide" };

export default function Page() {
  return (
    <div className="bg-background text-on-background font-body min-h-screen pb-24" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background border-b border-outline-variant dark:border-outline flex justify-between items-center px-4 h-16">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center">
<span className="material-symbols-outlined text-on-primary-container text-[20px]">help</span>
</div>
<h1 className="font-display-lg-mobile text-display-lg-mobile text-primary dark:text-primary-fixed tracking-tight font-bold">Aide Edukora</h1>
</div>
<button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low transition-colors active:scale-95 duration-100">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed">notifications</span>
</button>
</header>
<main className="pt-20 px-4 max-w-5xl mx-auto space-y-8">

<section className="relative py-8 rounded-xl overflow-hidden bg-primary-container text-on-primary-container">
<div className="absolute inset-0 opacity-10">

</div>
<div className="relative z-10 px-6 space-y-6">
<div className="space-y-2">
<h2 className="font-headline text-2xl font-bold">Comment pouvons-nous vous aider ?</h2>
<p className="text-sm opacity-90">Cherchez parmi nos articles ou contactez un conseiller.</p>
</div>
<div className="relative">
<span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary">search</span>
<input className="w-full h-14 pl-12 pr-4 rounded-xl border-none bg-surface text-on-surface focus:ring-2 focus:ring-secondary text-base" placeholder="Rechercher une solution..." type="text" />
</div>
</div>
</section>

<section className="space-y-4">
<h3 className="font-headline text-lg font-semibold px-1">Catégories d'assistance</h3>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer group active:scale-95">
<div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>payments</span>
</div>
<span className="font-label-sm text-sm font-semibold text-on-surface">Abonnement &amp; Paiement</span>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer group active:scale-95">
<div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>smart_toy</span>
</div>
<span className="font-label-sm text-sm font-semibold text-on-surface">Utilisation du Tuteur IA</span>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer group active:scale-95">
<div className="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>verified</span>
</div>
<span className="font-label-sm text-sm font-semibold text-on-surface">Examens &amp; Certifications</span>
</div>

<div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 flex flex-col items-center text-center gap-3 hover:shadow-md transition-all cursor-pointer group active:scale-95">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-outline group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-2xl" style={{"fontVariationSettings":"'FILL' 1"}}>engineering</span>
</div>
<span className="font-label-sm text-sm font-semibold text-on-surface">Support Technique</span>
</div>
</div>
</section>

<section className="space-y-6">
<div className="flex items-center justify-between px-1">
<h3 className="font-headline text-lg font-semibold">Questions Fréquentes (FAQ)</h3>
<button className="text-primary font-semibold text-sm hover:underline">Voir tout</button>
</div>
<div className="space-y-3">

<details className="faq-item group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none">
<span className="font-body font-medium text-on-surface">Comment réinitialiser mon mot de passe ?</span>
<span className="faq-icon material-symbols-outlined text-outline transition-transform duration-300">expand_more</span>
</summary>
<div className="px-5 pb-5 pt-0 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/30">
                        Pour réinitialiser votre mot de passe, allez sur la page de connexion et cliquez sur "Mot de passe oublié". Suivez les instructions envoyées à votre adresse e-mail pour créer un nouveau mot de passe sécurisé.
                    </div>
</details>

<details className="faq-item group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none">
<span className="font-body font-medium text-on-surface">Le Tuteur IA est-il disponible 24h/24 ?</span>
<span className="faq-icon material-symbols-outlined text-outline transition-transform duration-300">expand_more</span>
</summary>
<div className="px-5 pb-5 pt-0 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/30">
                        Oui, notre Tuteur IA basé sur le programme national de Côte d'Ivoire est disponible 24 heures sur 24, 7 jours sur 7, pour répondre à toutes vos questions académiques et vous aider dans vos révisions de BAC et BEPC.
                    </div>
</details>

<details className="faq-item group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none">
<span className="font-body font-medium text-on-surface">Quels sont les modes de paiement acceptés ?</span>
<span className="faq-icon material-symbols-outlined text-outline transition-transform duration-300">expand_more</span>
</summary>
<div className="px-5 pb-5 pt-0 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/30">
                        Nous acceptons les paiements par Mobile Money (Orange, MTN, Moov), ainsi que les cartes bancaires Visa et Mastercard pour faciliter l'accès à nos contenus éducatifs partout en Côte d'Ivoire.
                    </div>
</details>

<details className="faq-item group bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden transition-all duration-300">
<summary className="flex items-center justify-between p-5 cursor-pointer list-none">
<span className="font-body font-medium text-on-surface">Comment obtenir mon certificat de réussite ?</span>
<span className="faq-icon material-symbols-outlined text-outline transition-transform duration-300">expand_more</span>
</summary>
<div className="px-5 pb-5 pt-0 text-on-surface-variant text-sm leading-relaxed border-t border-outline-variant/30">
                        Les certificats sont générés automatiquement une fois que vous avez complété tous les modules d'un cours et réussi l'examen final avec un score minimum de 80%. Vous pourrez les télécharger en format PDF depuis votre profil.
                    </div>
</details>
</div>
</section>

<section className="bg-surface-container border border-outline-variant rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
<div className="w-16 h-16 rounded-2xl bg-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-3xl text-on-secondary-container">support_agent</span>
</div>
<div className="flex-1 text-center md:text-left space-y-1">
<h4 className="font-headline font-bold text-lg">Toujours besoin d'aide ?</h4>
<p className="text-on-surface-variant text-sm">Nos conseillers sont disponibles pour vous accompagner dans votre réussite académique.</p>
</div>
<button className="w-full md:w-auto px-8 h-12 bg-secondary text-on-secondary font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-sm">
                Contacter le Support
            </button>
</section>
</main>

<nav className="fixed bottom-0 w-full z-50 rounded-t-xl bg-surface dark:bg-on-background shadow-[0_-1px_4px_rgba(0,0,0,0.1)] flex justify-around items-center h-20 pb-safe px-2">
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200 p-2 rounded-lg" href="#">
<span className="material-symbols-outlined">home</span>
<span className="font-label-xs text-label-xs">Accueil</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200 p-2 rounded-lg" href="#">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label-xs text-label-xs">Cours</span>
</a>
<a className="flex flex-col items-center justify-center text-on-surface-variant dark:text-surface-variant hover:bg-surface-container-high dark:hover:bg-inverse-surface active:scale-90 transition-transform duration-200 p-2 rounded-lg" href="#">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label-xs text-label-xs">Tuteur AI</span>
</a>
<a className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container dark:bg-primary dark:text-on-primary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200" href="#">
<span className="material-symbols-outlined">person</span>
<span className="font-label-xs text-label-xs">Profil</span>
</a>
</nav>
<script>
        // Simple Interaction logic for FAQs
        document.querySelectorAll('.faq-item').forEach(item =&gt; &#123;
            item.addEventListener('toggle', (e) =&gt; &#123;
                if (item.open) &#123;
                    document.querySelectorAll('.faq-item').forEach(other =&gt; &#123;
                        if (other !== item) other.open = false;
                    &#125;);
                &#125;
            &#125;);
        &#125;);

        // Search bar interaction
        const searchInput = document.querySelector('input[type="text"]');
        searchInput.addEventListener('focus', () =&gt; &#123;
            searchInput.parentElement.classList.add('scale-[1.02]');
            searchInput.parentElement.classList.add('transition-transform');
        &#125;);
        searchInput.addEventListener('blur', () =&gt; &#123;
            searchInput.parentElement.classList.remove('scale-[1.02]');
        &#125;);
    </script>

    </div>
  );
}
