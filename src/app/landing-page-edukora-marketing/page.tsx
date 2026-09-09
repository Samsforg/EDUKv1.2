import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = { title: "Edukora | Réussis ton BAC & BEPC en Côte d'Ivoire" };

export default function Page() {
  return (
    <div className="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container" >

<header className="bg-surface sticky top-0 z-50 w-full flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
<div className="flex items-center gap-3">
<Image alt="Edukora Logo" className="w-10 h-10 object-contain" src="/images/ecran-202.png" width={40} height={40} loading="lazy" />
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<nav className="hidden md:flex items-center gap-8 font-label text-label-sm font-semibold text-on-surface-variant">
<Link className="hover:text-primary transition-colors" href="/fonctionnalites">Fonctionnalités</Link>
<Link className="hover:text-primary transition-colors" href="/resultats">Résultats</Link>
<Link className="hover:text-primary transition-colors" href="/tarifs">Tarifs</Link>
</nav>
<div className="flex items-center gap-4">
<Link href="/connexion-edukora" className="text-primary font-semibold text-label-sm px-4 py-2 hover:opacity-80 transition-opacity">Connexion</Link>
<Link href="/inscription-1-2-edukora" className="bg-secondary-container text-on-secondary-fixed font-bold px-5 py-2 rounded-xl active:scale-95 transition-transform shadow-md text-label-sm">S'inscrire</Link>
</div>
</header>
<main>

<section className="relative overflow-hidden pt-12 pb-20 px-4 md:px-8 lg:px-16">
<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
<div className="z-10">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-xs font-bold mb-6">
<span className="material-symbols-outlined text-[16px]">verified</span>
                        PLATEFORME ÉDUCATIVE
                    </div>
<h1 className="text-[40px] md:text-[56px] leading-[1.1] font-extrabold text-primary mb-6">
                        Réussis ton BAC &amp; BEPC avec l'excellence.
                    </h1>
<p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
                        Accédez à des fiches de révision et progressez plus vite grâce à <strong>Kora</strong>, votre tuteur IA disponible 24h/24.
                    </p>
<div className="flex flex-col sm:flex-row gap-4">
<Link href="/inscription-1-2-edukora" className="bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                            Commencer gratuitement
                            <span className="material-symbols-outlined">arrow_forward</span>
</Link>
<Link href="/tuteur-ia-edukora" className="bg-surface-container-high text-primary text-body-md font-semibold px-8 py-4 rounded-xl hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-outline-variant">
                            Découvrir Kora IA
                        </Link>
</div>
<div className="mt-8 flex items-center gap-4 text-label-sm text-on-surface-variant">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
<Image className="w-full h-full object-cover" src="/images/ecran-203.webp" alt="Étudiant ivoirien" width={32} height={32} loading="lazy" />
</div>
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
<Image className="w-full h-full object-cover" src="/images/ecran-204.webp" alt="Étudiant en bibliothèque" width={32} height={32} loading="lazy" />
</div>
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
<Image className="w-full h-full object-cover" src="/images/ecran-205.webp" alt="Étudiant en célébration" width={32} height={32} loading="lazy" />
</div>
</div>
<span>Rejoins la communauté Edukora</span>
</div>
</div>
<div className="relative">
<div className="absolute -top-20 -right-20 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
<div className="relative glass-card rounded-[2rem] p-4 shadow-2xl border border-outline-variant/30 transform lg:rotate-2">
<Image className="w-full h-full rounded-2xl object-cover aspect-[4/5]" src="/images/ecran-206.webp" alt="Dashboard Edukora" width={400} height={500} loading="lazy" />
<div className="absolute -left-6 bottom-12 bg-white p-4 rounded-2xl shadow-xl border border-outline-variant flex items-center gap-3 max-w-[200px]">
<div className="w-10 h-10 bg-tertiary-container rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container">auto_awesome</span>
</div>
<div>
<p className="text-label-xs text-on-surface-variant">Tuteur IA</p>
<p className="text-label-sm font-bold text-on-surface">Disponible 24h/24</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="py-24 px-4 md:px-8 bg-surface-container-low">
<div className="max-w-7xl mx-auto">
<div className="text-center mb-16">
<h2 className="text-display-lg-mobile md:text-display-lg text-primary mb-4">Comment ça marche ?</h2>
<p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">Trois étapes simples pour transformer tes révisions en réussite.</p>
</div>
<div className="grid md:grid-cols-3 gap-6">
{[
{ num: "01", icon: "person_add", title: "Crée ton compte", text: "Inscris-toi gratuitement en 2 minutes et choisis ta filière (BAC ou BEPC)." },
{ num: "02", icon: "auto_awesome", title: "Révise avec Kora", text: "Suis ton plan de révision personnalisé, pose tes questions à Kora et simule des examens." },
{ num: "03", icon: "emoji_events", title: "Réussis ton examen", text: "Arrive confiant le jour J et décroche ton diplôme avec mention." },
].map((s) => (
<div key={s.num} className="relative glass-card rounded-3xl p-8 border border-outline-variant/40 hover:shadow-lg transition-shadow">
<span className="absolute top-6 right-8 text-[48px] font-extrabold text-primary/40">{s.num}</span>
<div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
</div>
<h3 className="text-headline-md font-bold text-primary mb-3">{s.title}</h3>
<p className="text-body-md text-on-surface-variant">{s.text}</p>
</div>
))}
</div>
<div className="text-center mt-14">
<Link href="/fonctionnalites" className="inline-flex bg-surface-container-high text-primary text-body-md font-semibold px-10 py-4 rounded-xl hover:bg-surface-container-highest transition-colors items-center justify-center gap-2 border border-outline-variant">
Découvrir toutes les fonctionnalités
<span className="material-symbols-outlined">arrow_forward</span>
</Link>
</div>
</div>
</section>

<section className="py-24 px-4 md:px-8">
<div className="max-w-7xl mx-auto">
<div className="text-center mb-16">
<h2 className="text-display-lg-mobile md:text-display-lg text-primary mb-4">Ce que propose Edukora</h2>
<p className="text-body-md text-on-surface-variant">Des outils conçus pour accompagner les élèves du BAC et du BEPC.</p>
</div>
<div className="grid md:grid-cols-3 gap-8">
<div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
<div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-primary text-2xl">menu_book</span>
</div>
<h3 className="text-label-sm font-bold text-on-surface mb-2">Fiches de révision</h3>
<p className="text-body-md italic text-on-surface-variant leading-relaxed">
                            Des fiches structurées couvrant les programmes du BAC et du BEPC, accessibles sur mobile et ordinateur.
                        </p>
</div>
<div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
<div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-secondary-fixed text-2xl">smart_toy</span>
</div>
<h3 className="text-label-sm font-bold text-on-surface mb-2">Tuteur IA Kora</h3>
<p className="text-body-md italic text-on-surface-variant leading-relaxed">
                            Posez vos questions et obtenez des explications détaillées, disponibles à tout moment.
                        </p>
</div>
<div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm hidden lg:block">
<div className="w-14 h-14 rounded-full bg-tertiary-container flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-tertiary-container text-2xl">timer</span>
</div>
<h3 className="text-label-sm font-bold text-on-surface mb-2">Simulateur d&apos;examen</h3>
<p className="text-body-md italic text-on-surface-variant leading-relaxed">
                            Entraînez-vous en conditions réelles avec des épreuves chronométrées et des corrections détaillées.
                        </p>
</div>
</div>
</div>
</section>

<footer className="bg-surface-container-highest pt-20 pb-10 px-4 md:px-8 border-t border-outline-variant">
<div className="max-w-7xl mx-auto">
<div className="bg-primary rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden mb-20">
<div className="absolute inset-0 opacity-10">

<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
</div>
<div className="relative z-10">
<h2 className="text-display-lg-mobile md:text-display-lg mb-6">Prêt à décrocher ton diplôme ?</h2>
<p className="text-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto">Rejoins la communauté Edukora dès aujourd'hui et mets toutes les chances de ton côté.</p>
<div className="flex flex-col sm:flex-row justify-center gap-4">
<Link href="/inscription-1-2-edukora" className="bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl">
<span className="material-symbols-outlined">rocket_launch</span>
                                Créer mon compte gratuit
                            </Link>
<Link href="/connexion-edukora" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-body-md font-bold px-10 py-5 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-3">
<span className="material-symbols-outlined">login</span>
                                J'ai déjà un compte
                            </Link>
</div>
</div>
</div>
<div className="grid md:grid-cols-4 gap-12 mb-16">
<div className="col-span-1 md:col-span-1">
<div className="flex items-center gap-3 mb-6">
<Image alt="Edukora Logo" className="w-8 h-8 object-contain" src="/images/ecran-211.png" width={32} height={32} loading="lazy" />
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<p className="text-label-sm text-on-surface-variant leading-relaxed">
                            Plateforme de révision pour le BAC et le BEPC en Côte d'Ivoire. Nous transformons l&apos;éducation par la technologie pour chaque étudiant ivoirien.
                        </p>
</div>
<div>
<h4 className="font-bold text-primary mb-6">Plateforme</h4>
<ul className="space-y-4 text-label-sm text-on-surface-variant">
<li><Link className="hover:text-primary" href="/fonctionnalites">Fonctionnalités</Link></li>
<li><Link className="hover:text-primary" href="/tarifs">Tarifs &amp; Abonnements</Link></li>
<li><Link className="hover:text-primary" href="/tuteur-ia-edukora">Tuteur IA Kora</Link></li>
<li><Link className="hover:text-primary" href="/simulateur-d-examen-bac-bepc">Annales d'examens</Link></li>
</ul>
</div>
<div>
<h4 className="font-bold text-primary mb-6">Société</h4>
<ul className="space-y-4 text-label-sm text-on-surface-variant">
<li><Link className="hover:text-primary" href="/resultats">Nos résultats</Link></li>
<li><Link className="hover:text-primary" href="/connexion-edukora">Connexion</Link></li>
<li><Link className="hover:text-primary" href="/inscription-1-2-edukora">Créer mon compte</Link></li>
<li><Link className="hover:text-primary" href="/connexion-parent-edukora">Espace parent</Link></li>
</ul>
</div>
<div>
<h4 className="font-bold text-primary mb-6">Suivez-nous</h4>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="https://wa.me/2250709141545" target="_blank" rel="noopener noreferrer" aria-label="Nous contacter sur WhatsApp">
<span className="material-symbols-outlined">qr_code_2</span>
</a>
<a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="mailto:contact@edukora.net" aria-label="Nous écrire par email">
<span className="material-symbols-outlined text-[20px]">alternate_email</span>
</a>
</div>
<p className="mt-6 text-label-xs text-on-surface-variant">📍 09 BP 989 Abidjan 09, Côte d'Ivoire</p>
</div>
</div>
<div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-label-xs text-on-surface-variant">
<p>© {new Date().getFullYear()} Edukora. Tous droits réservés. Fait avec passion en Côte d'Ivoire 🇨🇮</p>
<div className="flex gap-6">
<Link className="hover:text-primary" href="/mentions-l-gales">Mentions légales</Link>
<Link className="hover:text-primary" href="/politique-de-confidentialit">Confidentialité</Link>
<Link className="hover:text-primary" href="/conditions-g-n-rales-d-utilisation">CGU</Link>
</div>
</div>
</div>
</footer>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container-lowest shadow-sm rounded-t-xl border-t border-outline-variant">
<Link href="/" className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</Link>
<Link href="/cours" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</Link>
<Link href="/tuteur-ia-edukora" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</Link>
<Link href="/connexion-edukora" className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</Link>
</nav>
<script>
        // Smooth reveal on scroll interaction
        const observerOptions = &#123;
            threshold: 0.1
        &#125;;

        const observer = new IntersectionObserver((entries) =&gt; &#123;
            entries.forEach(entry =&gt; &#123;
                if (entry.isIntersecting) &#123;
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-10');
                &#125;
            &#125;);
        &#125;, observerOptions);

        document.querySelectorAll('section').forEach(section =&gt; &#123;
            section.classList.add('transition-all', 'duration-700', 'ease-out', 'opacity-0', 'translate-y-10');
            observer.observe(section);
        &#125;);
    </script>

    </div>
  );
}
