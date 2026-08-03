import type { Metadata } from "next";

export const metadata: Metadata = { title: "Politique de Confidentialité - Edukora" };

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col scroll-smooth" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface dark:bg-background z-50 border-b border-outline-variant dark:border-outline glass-header">
<div className="flex items-center justify-between px-4 py-2 w-full max-w-5xl mx-auto">
<div className="flex items-center gap-4">
<button aria-label="Retour" className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-95 duration-150 flex items-center justify-center">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" data-icon="arrow_back">arrow_back</span>
</button>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Informations Légales</h1>
</div>
<div className="hidden md:block">
<span className="font-headline font-bold text-primary dark:text-primary-fixed">Edukora</span>
</div>
</div>
</header>
<main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 md:py-12">

<div className="mb-12 text-center md:text-left">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-semibold mb-4">
<span className="material-symbols-outlined text-[16px]" data-icon="verified_user">verified_user</span>
                Confidentialité &amp; Sécurité
            </div>
<h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Politique de Confidentialité</h2>
<p className="text-on-surface-variant flex items-center justify-center md:justify-start gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
                Dernière mise à jour : 24 Mai 2024
            </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-8">

<aside className="hidden md:block md:col-span-3 sticky top-24 h-fit">
<nav className="flex flex-col gap-2">
<a className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary border-l-2 border-transparent hover:border-primary transition-all" href="#collecte">Collecte des données</a>
<a className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary border-l-2 border-transparent hover:border-primary transition-all" href="#utilisation">Utilisation (IA)</a>
<a className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary border-l-2 border-transparent hover:border-primary transition-all" href="#partage">Partage tiers</a>
<a className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary border-l-2 border-transparent hover:border-primary transition-all" href="#droits">Vos droits</a>
<a className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary border-l-2 border-transparent hover:border-primary transition-all" href="#securite">Sécurité</a>
</nav>
</aside>

<div className="md:col-span-9 space-y-12">

<section className="scroll-mt-24" id="collecte">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
</div>
<h3 className="text-xl font-bold text-on-surface">1. Collecte des données</h3>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
<p className="text-body-md text-on-surface-variant leading-relaxed mb-4">
                            Edukora collecte les informations nécessaires pour assurer un suivi pédagogique de qualité. Cette collecte s'effectue lors de votre inscription et tout au long de votre parcours d'apprentissage.
                        </p>
<ul className="space-y-3">
<li className="flex items-start gap-3 text-sm text-on-surface">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5" data-icon="check_circle">check_circle</span>
<span><strong>Identité :</strong> Nom, prénom, établissement scolaire et classe.</span>
</li>
<li className="flex items-start gap-3 text-sm text-on-surface">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5" data-icon="check_circle">check_circle</span>
<span><strong>Contact :</strong> Adresse e-mail valide pour la communication officielle.</span>
</li>
<li className="flex items-start gap-3 text-sm text-on-surface">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5" data-icon="check_circle">check_circle</span>
<span><strong>Académique :</strong> Résultats aux examens blancs, temps passé sur les cours et progression.</span>
</li>
</ul>
</div>
</section>

<section className="scroll-mt-24" id="utilisation">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
<span className="material-symbols-outlined" data-icon="psychology">psychology</span>
</div>
<h3 className="text-xl font-bold text-on-surface">2. Utilisation des données &amp; Personnalisation IA</h3>
</div>
<div className="bg-primary text-on-primary p-6 rounded-xl relative overflow-hidden">
<div className="relative z-10">
<p className="text-body-md leading-relaxed opacity-90 mb-6">
                                Notre technologie d'intelligence artificielle analyse vos points forts et vos lacunes pour créer un parcours d'étude unique.
                            </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="bg-on-primary/10 p-4 rounded-lg backdrop-blur-sm border border-on-primary/20">
<h4 className="font-bold mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="auto_awesome">auto_awesome</span>
                                        Adaptabilité
                                    </h4>
<p className="text-xs opacity-80">Ajustement du niveau de difficulté des exercices en temps réel.</p>
</div>
<div className="bg-on-primary/10 p-4 rounded-lg backdrop-blur-sm border border-on-primary/20">
<h4 className="font-bold mb-2 flex items-center gap-2">
<span className="material-symbols-outlined text-sm" data-icon="trending_up">trending_up</span>
                                        Prédiction
                                    </h4>
<p className="text-xs opacity-80">Anticipation des sujets probables au BAC/BEPC selon vos performances.</p>
</div>
</div>
</div>

<div className="absolute right-0 top-0 opacity-10 pointer-events-none">
<svg fill="none" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
<circle cx="150" cy="50" r="80" stroke="white" strokeWidth="2" />
<circle cx="180" cy="80" r="60" stroke="white" strokeWidth="2" />
</svg>
</div>
</div>
</section>

<section className="scroll-mt-24" id="partage">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined" data-icon="groups">groups</span>
</div>
<h3 className="text-xl font-bold text-on-surface">3. Partage avec des tiers</h3>
</div>
<div className="bg-surface-container-low border-l-4 border-secondary p-6 rounded-r-xl">
<div className="flex gap-4">
<span className="material-symbols-outlined text-secondary" data-icon="info">info</span>
<div>
<p className="text-body-md text-on-surface-variant leading-relaxed">
<strong>Principe de restriction :</strong> Vos données ne sont jamais vendues à des fins publicitaires. 
                                    Le seul partage autorisé s'effectue avec les <span className="text-secondary font-bold">professeurs certificateurs</span> du Ministère de l'Éducation Nationale.
                                </p>
<p className="mt-4 text-sm text-on-surface-variant italic">
                                    Ce partage permet uniquement la validation de vos acquis et l'obtention de vos certificats de réussite Edukora.
                                </p>
</div>
</div>
</div>
</section>

<section className="scroll-mt-24" id="droits">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="gavel">gavel</span>
</div>
<h3 className="text-xl font-bold text-on-surface">4. Vos droits</h3>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="p-5 bg-white border border-outline-variant rounded-xl hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-primary mb-3" data-icon="visibility">visibility</span>
<h4 className="font-bold text-on-surface mb-1">Accès</h4>
<p className="text-xs text-on-surface-variant">Consultez toutes les données vous concernant stockées par Edukora.</p>
</div>
<div className="p-5 bg-white border border-outline-variant rounded-xl hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-primary mb-3" data-icon="edit">edit</span>
<h4 className="font-bold text-on-surface mb-1">Rectification</h4>
<p className="text-xs text-on-surface-variant">Modifiez vos informations personnelles à tout moment via votre profil.</p>
</div>
<div className="p-5 bg-white border border-outline-variant rounded-xl hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-primary mb-3" data-icon="delete_forever">delete_forever</span>
<h4 className="font-bold text-on-surface mb-1">Suppression</h4>
<p className="text-xs text-on-surface-variant">Demandez l'effacement définitif de votre compte et de vos données.</p>
</div>
<div className="p-5 bg-white border border-outline-variant rounded-xl hover:shadow-md transition-shadow">
<span className="material-symbols-outlined text-primary mb-3" data-icon="download">download</span>
<h4 className="font-bold text-on-surface mb-1">Portabilité</h4>
<p className="text-xs text-on-surface-variant">Récupérez vos données dans un format structuré et lisible.</p>
</div>
</div>
</section>

<section className="scroll-mt-24" id="securite">
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
<span className="material-symbols-outlined" data-icon="security">security</span>
</div>
<h3 className="text-xl font-bold text-on-surface">5. Sécurité des données</h3>
</div>
<div className="bg-surface-container p-6 rounded-xl">
<div className="flex flex-col md:flex-row gap-6 items-center">
<div className="flex-1">
<p className="text-body-md text-on-surface-variant leading-relaxed">
                                    Nous utilisons des protocoles de chiffrement de pointe (SSL/TLS) pour protéger vos données lors de leur transfert et de leur stockage. Nos serveurs sont situés dans des datacenters certifiés ISO 27001.
                                </p>
</div>
<div className="w-full md:w-48 h-32 rounded-lg bg-white p-4 flex items-center justify-center border border-outline-variant shadow-inner">
<div className="text-center">
<span className="material-symbols-outlined text-4xl text-on-tertiary-container mb-2" data-icon="lock" style={{"fontVariationSettings":"'FILL' 1"}}>lock</span>
<p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Chiffrement AES-256</p>
</div>
</div>
</div>
</div>
</section>

<div className="mt-16 pt-12 border-t border-outline-variant text-center">
<p className="text-on-surface-variant mb-6">Des questions sur la gestion de vos données ?</p>
<button className="bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-md">
                        Contacter le Délégué à la Protection (DPO)
                    </button>
<p className="mt-8 text-xs text-on-surface-variant flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="copyright">copyright</span>
                        2024 Edukora - Tous droits réservés.
                    </p>
</div>
</div>
</div>
</main>

<div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
<div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
<div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]"></div>
</div>
<script>
        // Simple Interaction for navigation highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('aside nav a');

        window.addEventListener('scroll', () =&gt; &#123;
            let current = '';
            sections.forEach(section =&gt; &#123;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset &gt;= sectionTop - 120) &#123;
                    current = section.getAttribute('id');
                &#125;
            &#125;);

            navLinks.forEach(link =&gt; &#123;
                link.classList.remove('text-primary', 'border-primary');
                link.classList.add('text-on-surface-variant', 'border-transparent');
                if (link.getAttribute('href').includes(current)) &#123;
                    link.classList.add('text-primary', 'border-primary');
                    link.classList.remove('text-on-surface-variant', 'border-transparent');
                &#125;
            &#125;);
        &#125;);

        // Mock back button functionality
        document.querySelector('header button').addEventListener('click', () =&gt; &#123;
            window.history.back();
        &#125;);
    </script>

    </div>
  );
}
