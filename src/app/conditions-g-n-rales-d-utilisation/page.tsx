import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora - Conditions Générales d'Utilisation" };

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface dark:bg-background z-50 flex items-center justify-between px-4 py-4 border-b border-outline-variant dark:border-outline">
<div className="flex items-center gap-4">
<button className="active:scale-95 duration-150 p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors flex items-center justify-center text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Informations Légales</h1>
</div>
<div className="hidden md:flex gap-6 items-center">
<span className="font-headline font-bold text-primary dark:text-primary-fixed text-xl">Edukora</span>
</div>
</header>

<main className="max-w-4xl mx-auto px-4 md:px-8 py-8">

<div className="mb-12 text-center md:text-left">
<p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-2">Conditions Générales d'Utilisation</p>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4 leading-tight">Nos Engagements Mutuels</h2>
<div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant">
<span className="material-symbols-outlined text-sm text-outline">calendar_today</span>
<span className="text-label-sm font-medium text-on-surface-variant">Dernière mise à jour : 24 Mai 2024</span>
</div>
</div>

<div className="relative w-full h-48 md:h-64 mb-12 rounded-xl overflow-hidden shadow-sm border border-outline-variant">
<div className="absolute inset-0 bg-primary-container opacity-10"></div>
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBv5H5ks9hN1y7yHD0Qfuo_0YbW1YQzOtEZPVPpV7EzvuZDhQtuCs3SfGQFMa65pHighBfRP8ir_QOvMmf5x35Wa2lmZNy4tM_TwfAOo78F2vZCaB118nHBAW6aqeVr7uXCrn_rjPrq6TOUvM0QUjJNxG_g6xYfHm-TRxIa6leB3sYU-XwT8h4XBW7ZB0s1skndxKq926xLGhJy5ef1TC9hYl99n12dWJ6AjlrhLvMYkLZecLyNBkij')"}}></div>
<div className="absolute inset-0 flex items-center justify-center">
<div className="bg-surface/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/50 shadow-lg text-center">
<p className="font-headline font-bold text-primary text-lg">Transparence &amp; Réussite</p>
<p className="text-on-surface-variant text-sm">Préparez votre BAC en toute sérénité</p>
</div>
</div>
</div>

<div className="space-y-12">

<section className="group">
<div className="flex items-start gap-4">
<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl font-headline text-xl font-bold shadow-md">1</div>
<div className="flex-grow">
<h3 className="font-headline text-2xl font-bold text-primary mb-4">Objet</h3>
<p className="text-body-lg text-on-surface-variant leading-relaxed">
                            Les présentes Conditions Générales d’Utilisation (CGU) ont pour but de fixer les modalités d’utilisation des services proposés par la plateforme <span className="font-semibold text-primary">Edukora</span>. En accédant à nos cours et simulateurs d'examens, vous acceptez pleinement et sans réserve ces conditions. Edukora s'engage à fournir un environnement d'apprentissage premium dédié à l'excellence académique des élèves ivoiriens.
                        </p>
</div>
</div>
</section>

<section className="group">
<div className="flex items-start gap-4">
<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl font-headline text-xl font-bold shadow-md">2</div>
<div className="flex-grow">
<h3 className="font-headline text-2xl font-bold text-primary mb-4">Accès au service</h3>
<p className="text-body-lg text-on-surface-variant leading-relaxed mb-4">
                            L'accès à Edukora est ouvert à tout élève régulièrement inscrit. Le service est normalement accessible 24h/24 et 7j/7, sous réserve des périodes de maintenance technique.
                        </p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
<div className="p-4 bg-surface-container rounded-lg border border-outline-variant border-dashed">
<p className="text-label-xs font-bold text-secondary uppercase mb-2">Comptes Utilisateurs</p>
<p className="text-body-md text-on-surface">Chaque compte est strictement personnel et ne peut être partagé entre plusieurs étudiants.</p>
</div>
<div className="p-4 bg-surface-container rounded-lg border border-outline-variant border-dashed">
<p className="text-label-xs font-bold text-secondary uppercase mb-2">Périmètre</p>
<p className="text-body-md text-on-surface">Les contenus sont optimisés pour les programmes nationaux du BEPC et du BAC.</p>
</div>
</div>
</div>
</div>
</section>

<section className="group">
<div className="flex items-start gap-4">
<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl font-headline text-xl font-bold shadow-md">3</div>
<div className="flex-grow">
<h3 className="font-headline text-2xl font-bold text-primary mb-4">Propriété intellectuelle</h3>
<p className="text-body-lg text-on-surface-variant leading-relaxed">
                            Tous les textes, graphismes, vidéos, et codes sources présents sur Edukora sont protégés par le droit d'auteur. <span className="text-error font-medium">Toute reproduction ou diffusion non autorisée des cours et des algorithmes de notre tuteur IA constitue une contrefaçon</span> et pourra faire l'objet de poursuites judiciaires conformément aux lois ivoiriennes.
                        </p>
</div>
</div>
</section>

<section className="group">
<div className="flex items-start gap-4">
<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl font-headline text-xl font-bold shadow-md">4</div>
<div className="flex-grow">
<h3 className="font-headline text-2xl font-bold text-primary mb-4">Responsabilité</h3>
<p className="text-body-lg text-on-surface-variant leading-relaxed mb-4">
                            Edukora met tout en œuvre pour diffuser des contenus pédagogiques de haute qualité. Cependant :
                        </p>
<ul className="space-y-3 list-none">
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container">check_circle</span>
<span>Les résultats aux examens restent sous la seule responsabilité de l'élève.</span>
</li>
<li className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container">check_circle</span>
<span>L'entreprise n'est pas responsable des pannes de réseau tiers (3G/4G).</span>
</li>
</ul>
</div>
</div>
</section>

<section className="group mb-20">
<div className="flex items-start gap-4">
<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl font-headline text-xl font-bold shadow-md">5</div>
<div className="flex-grow">
<h3 className="font-headline text-2xl font-bold text-primary mb-4">Protection des données</h3>
<div className="p-6 bg-surface-container-highest/30 border border-outline-variant rounded-xl backdrop-blur-sm">
<p className="text-body-lg text-on-surface-variant leading-relaxed mb-4">
                                Conformément aux régulations sur la protection des données, Edukora s'engage à ne jamais vendre vos informations personnelles. Vos données sont exclusivement utilisées pour :
                            </p>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-white border border-outline-variant rounded-full text-label-sm font-medium text-primary">Personnalisation de l'IA</span>
<span className="px-3 py-1 bg-white border border-outline-variant rounded-full text-label-sm font-medium text-primary">Suivi de progression</span>
<span className="px-3 py-1 bg-white border border-outline-variant rounded-full text-label-sm font-medium text-primary">Sécurité du compte</span>
</div>
</div>
</div>
</div>
</section>
</div>

<div className="mt-16 p-8 bg-on-surface text-white rounded-2xl flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl mb-4 text-tertiary-fixed">verified_user</span>
<h4 className="font-headline text-2xl font-bold mb-2">Vous avez des questions ?</h4>
<p className="text-on-surface-variant/70 mb-6 max-w-md">Notre équipe support est disponible pour clarifier tout point concernant ces conditions.</p>
<button className="px-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-xl active:scale-95 transition-all hover:bg-secondary-fixed duration-200">
                Contacter le support
            </button>
</div>
<footer className="mt-12 text-center text-on-surface-variant text-sm pb-12">
<p>© 2024 Edukora - Tous droits réservés.</p>
<div className="mt-4 flex justify-center gap-4 text-primary font-medium">
<a className="hover:underline" href="#">Confidentialité</a>
<span className="text-outline-variant">|</span>
<a className="hover:underline" href="#">Mentions légales</a>
</div>
</footer>
</main>

<button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50">
<span className="material-symbols-outlined">help_center</span>
</button>
<script>
        // Simple Interaction for section highlight on scroll
        window.addEventListener('scroll', () =&gt; &#123;
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 200;

            sections.forEach(section =&gt; &#123;
                if (scrollPos &gt; section.offsetTop &amp;&amp; scrollPos &lt; section.offsetTop + section.offsetHeight) &#123;
                    section.classList.add('opacity-100');
                    section.classList.remove('opacity-60');
                &#125; else &#123;
                    section.classList.add('opacity-60');
                    section.classList.remove('opacity-100');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
