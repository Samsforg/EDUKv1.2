import type { Metadata } from "next";

export const metadata: Metadata = { title: "Edukora | Réussis ton BAC & BEPC en Côte d'Ivoire" };

export default function Page() {
  return (
    <div className="bg-background text-on-background selection:bg-secondary-container selection:text-on-secondary-container" >

<header className="bg-surface sticky top-0 z-50 w-full flex justify-between items-center px-4 md:px-8 py-3 max-w-7xl mx-auto">
<div className="flex items-center gap-3">
<img alt="Edukora Logo" className="w-10 h-10 object-contain" src="/images/ecran-202.png" />
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<nav className="hidden md:flex items-center gap-8 font-label text-label-sm font-semibold text-on-surface-variant">
<a className="hover:text-primary transition-colors" href="#features">Fonctionnalités</a>
<a className="hover:text-primary transition-colors" href="#stats">Résultats</a>
<a className="hover:text-primary transition-colors" href="#pricing">Tarifs</a>
</nav>
<div className="flex items-center gap-4">
<button className="text-primary font-semibold text-label-sm px-4 py-2 hover:opacity-80 transition-opacity">Connexion</button>
<button className="bg-secondary-container text-on-secondary-fixed font-bold px-5 py-2 rounded-xl active:scale-95 transition-transform shadow-md text-label-sm">S'inscrire</button>
</div>
</header>
<main>

<section className="relative overflow-hidden pt-12 pb-20 px-4 md:px-8 lg:px-16">
<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
<div className="z-10">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-xs font-bold mb-6">
<span className="material-symbols-outlined text-[16px]">verified</span>
                        N°1 EN CÔTE D'IVOIRE
                    </div>
<h1 className="text-[40px] md:text-[56px] leading-[1.1] font-extrabold text-primary mb-6">
                        Réussis ton BAC &amp; BEPC avec l'excellence.
                    </h1>
<p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
                        Accédez à des fiches de révision certifiées par les meilleurs professeurs et progressez plus vite grâce à <strong>Kora</strong>, votre tuteur IA disponible 24h/24.
                    </p>
<div className="flex flex-col sm:flex-row gap-4">
<button className="bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                            Commencer gratuitement
                            <span className="material-symbols-outlined">arrow_forward</span>
</button>
<button className="bg-surface-container-high text-primary text-body-md font-semibold px-8 py-4 rounded-xl hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-outline-variant">
                            Découvrir Kora IA
                        </button>
</div>
<div className="mt-8 flex items-center gap-4 text-label-sm text-on-surface-variant">
<div className="flex -space-x-2">
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-203.png" alt="A portrait of a cheerful Ivorian high school student in a blue uniform, smiling at the camera in a bright outdoor school hallway. The lighting is warm and natural, following a professional corporate photography style with a shallow depth of field." />
</div>
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-204.png" alt="A young West African student studying focusedly with a laptop in a modern library. Soft, clean sunlight filters through large windows, highlighting a bright academic environment. Professional photography, high-key lighting, corporate aesthetic." />
</div>
<div className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-205.png" alt="Close-up of a happy student celebrating an exam success, wearing a graduation cap. The image is bright, professional, and optimistic, capturing the energy of youth in Abidjan. High quality, vibrant primary blue accents in the background." />
</div>
</div>
<span>Rejoins +50,000 étudiants ivoiriens</span>
</div>
</div>
<div className="relative">
<div className="absolute -top-20 -right-20 w-80 h-80 bg-primary opacity-5 rounded-full blur-3xl"></div>
<div className="relative glass-card rounded-[2rem] p-4 shadow-2xl border border-outline-variant/30 transform lg:rotate-2">
<img className="w-full h-full rounded-2xl object-cover aspect-[4/5]" src="/images/ecran-206.png" alt="A high-tech dashboard of an educational mobile app shown on a modern smartphone screen. The interface displays course progress charts in forest green, academic blue headers, and a friendly AI avatar named Kora. The scene is set on a clean white desk with a notebook and a pen nearby. Modern, sleek, professional tech-focused photography." />
<div className="absolute -left-6 bottom-12 bg-white p-4 rounded-2xl shadow-xl border border-outline-variant flex items-center gap-3 max-w-[200px]">
<div className="w-10 h-10 bg-tertiary-container rounded-full flex items-center justify-center">
<span className="material-symbols-outlined text-on-tertiary-container">trending_up</span>
</div>
<div>
<p className="text-label-xs text-on-surface-variant">Progression</p>
<p className="text-label-sm font-bold text-on-surface">+24% ce mois</p>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="bg-primary py-16 px-4 md:px-8" id="stats">
<div className="max-w-7xl mx-auto flex flex-wrap justify-center md:justify-between gap-12">
<div className="text-center md:text-left flex flex-col items-center md:items-start">
<span className="text-[40px] font-extrabold text-primary-fixed mb-1">95%</span>
<span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest">Taux de réussite</span>
</div>
<div className="text-center md:text-left flex flex-col items-center md:items-start border-white/10">
<span className="text-[40px] font-extrabold text-primary-fixed mb-1">50,000+</span>
<span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest">Étudiants actifs</span>
</div>
<div className="text-center md:text-left flex flex-col items-center md:items-start border-white/10">
<span className="text-[40px] font-extrabold text-primary-fixed mb-1">500+</span>
<span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest">Épreuves types</span>
</div>
<div className="text-center md:text-left flex flex-col items-center md:items-start border-white/10">
<span className="text-[40px] font-extrabold text-primary-fixed mb-1">2,000+</span>
<span className="text-on-primary-container font-label text-label-sm uppercase tracking-widest">Fiches de cours</span>
</div>
</div>
</section>

<section className="py-24 px-4 md:px-8 bg-surface-container-low" id="features">
<div className="max-w-7xl mx-auto">
<div className="text-center mb-16">
<h2 className="text-display-lg-mobile md:text-display-lg text-primary mb-4">Tout pour ton succès</h2>
<p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">Une plateforme complète conçue pour répondre aux défis spécifiques du programme scolaire ivoirien.</p>
</div>
<div className="grid md:grid-cols-3 gap-6">

<div className="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden hover:shadow-lg transition-shadow">
<div className="flex-1 order-2 md:order-1">
<div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-white">smart_toy</span>
</div>
<h3 className="text-headline-md text-primary mb-4">Kora, ton Tuteur IA 24h/24</h3>
<p className="text-body-md text-on-surface-variant mb-6">Un doute sur un théorème ? Besoin d'une explication en philo ? Kora répond instantanément et t'aide à comprendre étape par étape.</p>
<ul className="space-y-3">
<li className="flex items-center gap-3 text-label-sm font-medium">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
                                    Réponses basées sur le programme national
                                </li>
<li className="flex items-center gap-3 text-label-sm font-medium">
<span className="material-symbols-outlined text-tertiary">check_circle</span>
                                    Disponible même hors connexion (SMS/Lite)
                                </li>
</ul>
</div>
<div className="flex-1 order-1 md:order-2 w-full">
<div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
<div className="flex gap-3 mb-4">
<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[12px] text-white font-bold">K</div>
<div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-label-sm">Bonjour ! Comment puis-je t'aider à réviser tes Maths aujourd'hui ?</div>
</div>
<div className="flex flex-row-reverse gap-3">
<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[12px] text-white font-bold">Moi</div>
<div className="bg-primary text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-label-sm">Explique-moi Thalès simplement.</div>
</div>
</div>
</div>
</div>

<div className="glass-card rounded-3xl p-8 hover:shadow-lg transition-shadow">
<div className="w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-secondary-container">timer</span>
</div>
<h3 className="text-headline-md text-primary mb-4">Simulateur d'Examen</h3>
<p className="text-body-md text-on-surface-variant mb-6">Mets-toi en conditions réelles avec des chronos et des épreuves des 10 dernières années.</p>
<div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
<div className="h-full bg-secondary-container w-3/4"></div>
</div>
<p className="text-[10px] text-outline mt-2 uppercase font-bold tracking-widest">Simulation en cours : BAC D - Mathématiques</p>
</div>

<div className="glass-card rounded-3xl p-8 hover:shadow-lg transition-shadow">
<div className="w-12 h-12 bg-tertiary-container rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-on-tertiary-container">menu_book</span>
</div>
<h3 className="text-headline-md text-primary mb-4">Fiches Certifiées</h3>
<p className="text-body-md text-on-surface-variant">Contenu rédigé et validé par des inspecteurs et professeurs agrégés de l'Éducation Nationale.</p>
</div>

<div className="md:col-span-2 glass-card rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-lg transition-shadow">
<div className="flex-1">
<div className="w-12 h-12 bg-on-surface-variant rounded-xl flex items-center justify-center mb-6">
<span className="material-symbols-outlined text-white">groups</span>
</div>
<h3 className="text-headline-md text-primary mb-4">Apprentissage Collaboratif</h3>
<p className="text-body-md text-on-surface-variant">Pose tes questions à la communauté et participe à des sessions de révision en groupe chaque weekend.</p>
</div>
<div className="flex-1 w-full flex justify-center">
<img className="w-full h-48 object-cover rounded-2xl shadow-md" src="/images/ecran-207.png" alt="A diverse group of Ivorian students sitting in a circle under a large tree in a vibrant, sun-drenched school courtyard, using tablets and sharing study materials. The mood is collaborative, joyful, and academic. Clean, high-resolution photography with focus on the community interaction and bright, warm sunlight." />
</div>
</div>
</div>
</div>
</section>

<section className="py-24 px-4 md:px-8">
<div className="max-w-7xl mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
<div className="max-w-xl">
<h2 className="text-display-lg-mobile md:text-display-lg text-primary mb-4">Ils ont réussi avec Edukora</h2>
<p className="text-body-md text-on-surface-variant">Parce que leur succès est notre plus grande fierté.</p>
</div>
<div className="flex gap-2">
<button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_left</span></button>
<button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-surface-container transition-colors"><span className="material-symbols-outlined">chevron_right</span></button>
</div>
</div>
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

<div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
<div className="flex items-center gap-4 mb-6">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-208.png" alt="Portrait of a young Ivorian woman, smiling brightly, dressed in a neat high school uniform. She has an aura of confidence and success. High-quality portrait photography, bright background, light-mode design consistency." />
</div>
<div>
<h4 className="text-label-sm font-bold text-on-surface">Mariam K.</h4>
<p className="text-label-xs text-on-surface-variant">Admise au BAC D (Mention Bien)</p>
</div>
</div>
<p className="text-body-md italic text-on-surface-variant leading-relaxed">
                            "Kora m'a aidé à comprendre les intégrales en une soirée alors que je luttais depuis des semaines. Sans Edukora, je n'aurais jamais eu cette mention !"
                        </p>
<div className="flex gap-1 mt-6 text-secondary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
</div>

<div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm">
<div className="flex items-center gap-4 mb-6">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-209.png" alt="Portrait of a young Ivorian student, looking focused and proud, holding a digital tablet. Professional lighting, outdoor campus setting, corporate educational style. Focus on the success and empowerment of Ivorian youth." />
</div>
<div>
<h4 className="text-label-sm font-bold text-on-surface">Jean-Philippe A.</h4>
<p className="text-label-xs text-on-surface-variant">Admis au BEPC</p>
</div>
</div>
<p className="text-body-md italic text-on-surface-variant leading-relaxed">
                            "Les simulateurs d'examen sont incroyables. Le jour J, j'avais l'impression de faire un simple exercice sur l'appli. Je n'avais aucun stress."
                        </p>
<div className="flex gap-1 mt-6 text-secondary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
</div>

<div className="bg-white p-8 rounded-3xl border border-outline-variant/30 shadow-sm hidden lg:block">
<div className="flex items-center gap-4 mb-6">
<div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover" src="/images/ecran-210.png" alt="Close up of an Ivorian female student laughing with joy, wearing her school uniform. Background shows a bright classroom setting. Professional photography, vibrant colors, celebrating youth and academic success." />
</div>
<div>
<h4 className="text-label-sm font-bold text-on-surface">Awa D.</h4>
<p className="text-label-xs text-on-surface-variant">Parent d'élève (Abidjan)</p>
</div>
</div>
<p className="text-body-md italic text-on-surface-variant leading-relaxed">
                            "En tant que parent, je peux suivre les progrès de mon fils sur mon téléphone. C'est l'investissement le plus rentable pour son avenir."
                        </p>
<div className="flex gap-1 mt-6 text-secondary-container">
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
<span className="material-symbols-outlined" style={{"fontVariationSettings":"'FILL' 1"}}>star</span>
</div>
</div>
</div>
</div>
</section>

<section className="py-24 px-4 md:px-8 bg-surface" id="pricing">
<div className="max-w-5xl mx-auto">
<div className="text-center mb-16">
<h2 className="text-display-lg-mobile md:text-display-lg text-primary mb-4">Un investissement pour ton futur</h2>
<p className="text-body-md text-on-surface-variant">Choisis le plan qui te convient le mieux pour tes révisions.</p>
</div>
<div className="grid md:grid-cols-2 gap-8">

<div className="glass-card rounded-[2rem] p-8 border border-outline-variant relative overflow-hidden group hover:border-primary/30 transition-all">
<div className="mb-8">
<h3 className="text-headline-md text-on-surface mb-2">Plan Découverte</h3>
<div className="flex items-baseline gap-1">
<span className="text-[32px] font-bold text-primary">0 FCFA</span>
<span className="text-on-surface-variant">/mois</span>
</div>
<p className="text-label-sm text-on-surface-variant mt-2">Idéal pour tester la plateforme</p>
</div>
<ul className="space-y-4 mb-10">
<li className="flex items-center gap-3 text-label-sm">
<span className="material-symbols-outlined text-primary text-[20px]">check</span>
                                Accès à 10 fiches de révision / mois
                            </li>
<li className="flex items-center gap-3 text-label-sm">
<span className="material-symbols-outlined text-primary text-[20px]">check</span>
                                5 questions quotidiennes à Kora IA
                            </li>
<li className="flex items-center gap-3 text-label-sm text-outline">
<span className="material-symbols-outlined text-[20px]">block</span>
                                Simulateur d'examen (Accès limité)
                            </li>
</ul>
<button className="w-full py-4 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors">Commencer maintenant</button>
</div>

<div className="bg-primary rounded-[2rem] p-8 relative overflow-hidden shadow-2xl group transform hover:-translate-y-1 transition-all">
<div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-fixed px-6 py-2 rounded-bl-2xl text-label-xs font-bold uppercase tracking-tighter">Populaire</div>
<div className="mb-8">
<h3 className="text-headline-md text-white mb-2">Premium Réussite</h3>
<div className="flex items-baseline gap-1">
<span className="text-[32px] font-bold text-primary-fixed">4,900 FCFA</span>
<span className="text-primary-container">/mois</span>
</div>
<p className="text-on-primary-container text-label-sm mt-2">L'outil ultime pour le BAC &amp; BEPC</p>
</div>
<ul className="space-y-4 mb-10">
<li className="flex items-center gap-3 text-label-sm text-white">
<span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                                Accès illimité à toutes les fiches
                            </li>
<li className="flex items-center gap-3 text-label-sm text-white">
<span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                                Kora IA illimité 24h/24
                            </li>
<li className="flex items-center gap-3 text-label-sm text-white">
<span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                                Simulateur complet + Correction détaillée
                            </li>
<li className="flex items-center gap-3 text-label-sm text-white">
<span className="material-symbols-outlined text-tertiary-fixed text-[20px]">verified</span>
                                Support prioritaire par nos professeurs
                            </li>
</ul>
<button className="w-full py-4 rounded-xl bg-secondary-container text-on-secondary-fixed font-bold hover:shadow-lg transition-all active:scale-95">S'abonner maintenant</button>
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
<button className="bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl">
<span className="material-symbols-outlined">rocket_launch</span>
                                Créer mon compte gratuit
                            </button>
<button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-body-md font-bold px-10 py-5 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-3">
<span className="material-symbols-outlined">download</span>
                                Télécharger l'App
                            </button>
</div>
</div>
</div>
<div className="grid md:grid-cols-4 gap-12 mb-16">
<div className="col-span-1 md:col-span-1">
<div className="flex items-center gap-3 mb-6">
<img alt="Edukora Logo" className="w-8 h-8 object-contain" src="/images/ecran-211.png" />
<span className="font-headline text-headline-md font-bold text-primary">Edukora</span>
</div>
<p className="text-label-sm text-on-surface-variant leading-relaxed">
                            Plateforme de révision n°1 en Côte d'Ivoire. Nous transformons l'éducation par la technologie pour chaque étudiant ivoirien.
                        </p>
</div>
<div>
<h4 className="font-bold text-primary mb-6">Plateforme</h4>
<ul className="space-y-4 text-label-sm text-on-surface-variant">
<li><a className="hover:text-primary" href="#">Cours BAC</a></li>
<li><a className="hover:text-primary" href="#">Cours BEPC</a></li>
<li><a className="hover:text-primary" href="#">Tuteur IA Kora</a></li>
<li><a className="hover:text-primary" href="#">Annales d'examens</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-primary mb-6">Société</h4>
<ul className="space-y-4 text-label-sm text-on-surface-variant">
<li><a className="hover:text-primary" href="#">À propos</a></li>
<li><a className="hover:text-primary" href="#">Équipe</a></li>
<li><a className="hover:text-primary" href="#">Devenir Professeur</a></li>
<li><a className="hover:text-primary" href="#">Contact</a></li>
</ul>
</div>
<div>
<h4 className="font-bold text-primary mb-6">Suivez-nous</h4>
<div className="flex gap-4">
<a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="#">
<span className="material-symbols-outlined">qr_code_2</span>
</a>
<a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="#">
<span className="material-symbols-outlined text-[20px]">alternate_email</span>
</a>
</div>
<p className="mt-6 text-label-xs text-on-surface-variant">📍 Abidjan, Plateau, Immeuble CCIA</p>
</div>
</div>
<div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-label-xs text-outline">
<p>© 2024 Edukora. Tous droits réservés. Fait avec passion en Côte d'Ivoire 🇨🇮</p>
<div className="flex gap-6">
<a className="hover:text-primary" href="#">Mentions légales</a>
<a className="hover:text-primary" href="#">Confidentialité</a>
<a className="hover:text-primary" href="#">CGU</a>
</div>
</div>
</div>
</footer>
</main>

<nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container-lowest shadow-sm rounded-t-xl border-t border-outline-variant">
<div className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-4 py-1 active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">home</span>
<span className="font-label text-label-xs font-semibold">Accueil</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">menu_book</span>
<span className="font-label text-label-xs font-semibold">Cours</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">smart_toy</span>
<span className="font-label text-label-xs font-semibold">Tuteur IA</span>
</div>
<div className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high active:scale-90 transition-all duration-200">
<span className="material-symbols-outlined">person</span>
<span className="font-label text-label-xs font-semibold">Profil</span>
</div>
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
