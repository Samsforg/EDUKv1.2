"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "#fonctionnalites", label: "Fonctionnalités" },
    { href: "#resultats", label: "Résultats" },
    { href: "#tarifs", label: "Tarifs" },
  ];

  const features = [
    {
      icon: "smart_toy",
      iconBg: "bg-primary",
      title: "Kora, ton Tuteur IA 24h/24",
      text: "Un doute sur un théorème ? Besoin d'une explication en philo ? Kora répond instantanément et t'aide à comprendre étape par étape.",
    },
    {
      icon: "timer",
      iconBg: "bg-secondary-container",
      title: "Simulateur d'Examen",
      text: "Mets-toi en conditions réelles avec des chronos et des épreuves des 10 dernières années.",
    },
    {
      icon: "menu_book",
      iconBg: "bg-tertiary-container",
      title: "Fiches Certifiées",
      text: "Contenu rédigé et validé par des inspecteurs et professeurs agrégés de l'Éducation Nationale.",
    },
    {
      icon: "groups",
      iconBg: "bg-on-surface-variant",
      title: "Apprentissage Collaboratif",
      text: "Pose tes questions à la communauté et participe à des sessions de révision en groupe chaque weekend.",
    },
  ];

  const testimonials = [
    {
      img: "/images/landing-7.png",
      name: "Mariam K.",
      role: "Admise au BAC D (Mention Bien)",
      quote:
        "Kora m'a aidé à comprendre les intégrales en une soirée alors que je luttais depuis des semaines. Sans Edukora, je n'aurais jamais eu cette mention !",
    },
    {
      img: "/images/landing-8.png",
      name: "Jean-Philippe A.",
      role: "Admis au BEPC",
      quote:
        "Les simulateurs d'examen sont incroyables. Le jour J, j'avais l'impression de faire un simple exercice sur l'appli. Je n'avais aucun stress.",
    },
    {
      img: "/images/landing-9.png",
      name: "Awa D.",
      role: "Parent d'élève (Abidjan)",
      quote:
        "En tant que parent, je peux suivre les progrès de mon fils sur mon téléphone. C'est l'investissement le plus rentable pour son avenir.",
    },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-outline-variant/60">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 h-16">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo-edukora.png" alt="Edukora Logo" className="w-10 h-10 object-contain" />
            <span className="font-headline-md text-headline-md font-bold text-primary">Edukora</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 font-label-sm font-semibold text-on-surface-variant">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <Link href="/connexion-edukora" className="text-primary font-semibold text-label-sm px-4 py-2 hover:opacity-80 transition-opacity">
              Connexion
            </Link>
            <Link
              href="/inscription-1-2-edukora"
              className="bg-secondary-container text-on-secondary-fixed font-bold px-5 py-2 rounded-[12px] active:scale-95 transition-transform shadow-md text-label-sm"
            >
              S'inscrire
            </Link>
          </div>
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-[12px] border border-outline-variant text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? "close" : "menu"}</span>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3 border-t border-outline-variant/60 pt-4 bg-background">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block font-label-sm font-semibold text-on-surface-variant hover:text-primary">
                {l.label}
              </a>
            ))}
            <div className="flex gap-3 pt-2">
              <Link
                href="/connexion-edukora"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center border border-outline-variant text-primary font-bold px-4 py-2.5 rounded-[12px] text-label-sm"
              >
                Connexion
              </Link>
              <Link
                href="/inscription-1-2-edukora"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center bg-secondary-container text-on-secondary-fixed font-bold px-4 py-2.5 rounded-[12px] text-label-sm"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden pt-12 pb-20 px-4 md:px-8">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary opacity-[0.06] rounded-[999px] blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-secondary-container opacity-[0.08] rounded-[999px] blur-3xl" />
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-[999px] text-label-xs font-bold mb-6">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                N°1 EN CÔTE D'IVOIRE
              </div>
              <h1 className="text-[40px] md:text-[56px] leading-[1.08] font-extrabold text-primary mb-6">
                Réussis ton BAC &amp; BEPC avec l'excellence.
              </h1>
              <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl">
                Accédez à des fiches de révision certifiées par les meilleurs professeurs et progressez plus vite grâce à{" "}
                <strong className="text-primary">Kora</strong>, votre tuteur IA disponible 24h/24.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/inscription-1-2-edukora"
                  className="bg-primary text-on-primary text-body-md font-bold px-8 py-4 rounded-[16px] shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  Commencer gratuitement
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <Link
                  href="/tuteur-ia-edukora"
                  className="bg-surface-container-high text-primary text-body-md font-semibold px-8 py-4 rounded-[16px] hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-outline-variant"
                >
                  Découvrir Kora IA
                </Link>
              </div>
              <div className="mt-8 flex items-center gap-4 text-label-sm text-on-surface-variant">
                <div className="flex -space-x-2">
                  {["/images/landing-2.png", "/images/landing-3.png", "/images/landing-4.png"].map((img) => (
                    <div key={img} className="w-8 h-8 rounded-[999px] border-2 border-background overflow-hidden bg-surface-container">
                      <img className="w-full h-full object-cover" src={img} alt="" />
                    </div>
                  ))}
                </div>
                <span>Rejoins +50,000 étudiants ivoiriens</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary opacity-5 rounded-[999px] blur-3xl" />
              <div className="relative bg-white/80 backdrop-blur-md rounded-[32px] p-4 shadow-2xl border border-outline-variant/40 lg:rotate-2 transition-transform">
                <img
                  className="w-full h-full rounded-[24px] object-cover aspect-[4/5]"
                  src="/images/landing-5.png"
                  alt="Application Edukora sur smartphone avec le tuteur IA Kora"
                />
                <div className="absolute -left-4 md:-left-6 bottom-12 bg-white p-4 rounded-[20px] shadow-xl border border-outline-variant flex items-center gap-3 max-w-[200px]">
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

        <section className="bg-primary py-16 px-4 md:px-8" id="resultats">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { value: "95%", label: "Taux de réussite" },
              { value: "50,000+", label: "Étudiants actifs" },
              { value: "500+", label: "Épreuves types" },
              { value: "2,000+", label: "Fiches de cours" },
            ].map((s) => (
              <div key={s.label} className="text-center lg:text-left flex flex-col items-center lg:items-start">
                <span className="text-[40px] font-extrabold text-primary-fixed mb-1">{s.value}</span>
                <span className="text-on-primary-container font-label-sm uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-4 md:px-8 bg-surface-container-low" id="fonctionnalites">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4">Tout pour ton succès</h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Une plateforme complète conçue pour répondre aux défis spécifiques du programme scolaire ivoirien.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[24px] p-8 flex flex-col md:flex-row gap-8 items-center overflow-hidden hover:shadow-lg transition-shadow border border-outline-variant/40">
                <div className="flex-1 order-2 md:order-1">
                  <div className="w-12 h-12 bg-primary rounded-[12px] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-on-primary">smart_toy</span>
                  </div>
                  <h3 className="text-headline-md font-bold text-primary mb-4">Kora, ton Tuteur IA 24h/24</h3>
                  <p className="text-body-md text-on-surface-variant mb-6">
                    Un doute sur un théorème ? Besoin d'une explication en philo ? Kora répond instantanément et t'aide à
                    comprendre étape par étape.
                  </p>
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
                  <div className="bg-primary/5 rounded-[16px] p-4 border border-primary/10">
                    <div className="flex gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-[12px] text-on-primary font-bold">K</div>
                      <div className="bg-white p-3 rounded-[16px] rounded-tl-none shadow-sm text-label-sm">
                        Bonjour ! Comment puis-je t'aider à réviser tes Maths aujourd'hui ?
                      </div>
                    </div>
                    <div className="flex flex-row-reverse gap-3">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-[12px] text-on-secondary font-bold">Moi</div>
                      <div className="bg-primary text-on-primary p-3 rounded-[16px] rounded-tr-none shadow-sm text-label-sm">
                        Explique-moi Thalès simplement.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {features.slice(1, 3).map((f) => (
                <div
                  key={f.title}
                  className="bg-white/80 backdrop-blur-md rounded-[24px] p-8 hover:shadow-lg transition-shadow border border-outline-variant/40"
                >
                  <div className={`w-12 h-12 ${f.iconBg} rounded-[12px] flex items-center justify-center mb-6`}>
                    <span className="material-symbols-outlined text-on-primary">{f.icon}</span>
                  </div>
                  <h3 className="text-headline-md font-bold text-primary mb-4">{f.title}</h3>
                  <p className="text-body-md text-on-surface-variant">{f.text}</p>
                  {f.title === "Simulateur d'Examen" && (
                    <div className="mt-6">
                      <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                        <div className="h-full bg-secondary-container w-3/4 rounded-full" />
                      </div>
                      <p className="text-[10px] text-outline mt-2 uppercase font-bold tracking-widest">
                        Simulation en cours : BAC D - Mathématiques
                      </p>
                    </div>
                  )}
                </div>
              ))}

              <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[24px] p-8 flex flex-col md:flex-row gap-8 items-center hover:shadow-lg transition-shadow border border-outline-variant/40">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-on-surface-variant rounded-[12px] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-white">groups</span>
                  </div>
                  <h3 className="text-headline-md font-bold text-primary mb-4">Apprentissage Collaboratif</h3>
                  <p className="text-body-md text-on-surface-variant">
                    Pose tes questions à la communauté et participe à des sessions de révision en groupe chaque weekend.
                  </p>
                </div>
                <div className="flex-1 w-full flex justify-center">
                  <img className="w-full h-48 object-cover rounded-[16px] shadow-md" src="/images/landing-6.png" alt="Étudiants ivoiriens en session de révision collaborative" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-8 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4">Comment ça marche ?</h2>
              <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                Trois étapes simples pour transformer tes révisions en réussite.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: "01", icon: "person_add", title: "Crée ton compte", text: "Inscris-toi gratuitement en 2 minutes et choisis ta filière (BAC ou BEPC)." },
                { num: "02", icon: "auto_awesome", title: "Révise avec Kora", text: "Suis ton plan de révision personnalisé, pose tes questions à Kora et simule des examens." },
                { num: "03", icon: "emoji_events", title: "Réussis ton examen", text: "Arrive confiant le jour J et décroche ton diplôme avec mention." },
              ].map((s) => (
                <div key={s.num} className="relative bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/40 hover:shadow-lg transition-shadow">
                  <span className="absolute top-6 right-8 text-[48px] font-extrabold text-primary/10">{s.num}</span>
                  <div className="w-12 h-12 bg-primary rounded-[12px] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  </div>
                  <h3 className="text-headline-md font-bold text-primary mb-3">{s.title}</h3>
                  <p className="text-body-md text-on-surface-variant">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4">Ils ont réussi avec Edukora</h2>
              <p className="text-body-md text-on-surface-variant">Parce que leur succès est notre plus grande fierté.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-[24px] p-8 border border-outline-variant/40 shadow-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-[999px] overflow-hidden bg-surface-container">
                      <img className="w-full h-full object-cover" src={t.img} alt={t.name} />
                    </div>
                    <div>
                      <h4 className="text-label-sm font-bold text-on-surface">{t.name}</h4>
                      <p className="text-label-xs text-on-surface-variant">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-body-md italic text-on-surface-variant leading-relaxed">"{t.quote}"</p>
                  <div className="flex gap-1 mt-6 text-secondary-container">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-8 bg-background" id="tarifs">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4">Un investissement pour ton futur</h2>
              <p className="text-body-md text-on-surface-variant">Choisis le plan qui te convient le mieux pour tes révisions.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 border border-outline-variant relative overflow-hidden hover:border-primary/30 transition-all">
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
                <Link
                  href="/inscription-1-2-edukora"
                  className="w-full block text-center py-4 rounded-[16px] border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-colors"
                >
                  Commencer maintenant
                </Link>
              </div>
              <div className="bg-primary rounded-[32px] p-8 relative overflow-hidden shadow-2xl transform hover:-translate-y-1 transition-all">
                <div className="absolute top-0 right-0 bg-secondary-container text-on-secondary-fixed px-6 py-2 rounded-bl-[24px] text-label-xs font-bold uppercase tracking-tighter">
                  Populaire
                </div>
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
                <Link
                  href="/plans-d-abonnement-edukora-1"
                  className="w-full block text-center py-4 rounded-[16px] bg-secondary-container text-on-secondary-fixed font-bold hover:shadow-lg transition-all active:scale-95"
                >
                  S'abonner maintenant
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto bg-primary rounded-[32px] md:rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-6">Prêt à décrocher ton diplôme ?</h2>
              <p className="text-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto">
                Rejoins la communauté Edukora dès aujourd'hui et mets toutes les chances de ton côté.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/inscription-1-2-edukora"
                  className="bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-[20px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl"
                >
                  <span className="material-symbols-outlined">rocket_launch</span>
                  Créer mon compte gratuit
                </Link>
                <Link
                  href="/connexion-edukora"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-body-md font-bold px-10 py-5 rounded-[20px] border border-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <span className="material-symbols-outlined">login</span>
                  J'ai déjà un compte
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-surface-container-highest pt-20 pb-10 px-4 md:px-8 border-t border-outline-variant">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <img src="/images/logo-edukora.png" alt="Edukora Logo" className="w-8 h-8 object-contain" />
                <span className="font-headline-md font-bold text-primary">Edukora</span>
              </div>
              <p className="text-label-sm text-on-surface-variant leading-relaxed">
                Plateforme de révision n°1 en Côte d'Ivoire. Nous transformons l'éducation par la technologie pour chaque
                étudiant ivoirien.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6">Plateforme</h4>
              <ul className="space-y-4 text-label-sm text-on-surface-variant">
                <li><Link href="/explorateur-de-fiches-edukora" className="hover:text-primary">Explorateur de fiches</Link></li>
                <li><Link href="/simulateur-d-examen-bac-bepc" className="hover:text-primary">Simulateur d'examen</Link></li>
                <li><Link href="/tuteur-ia-edukora" className="hover:text-primary">Tuteur IA Kora</Link></li>
                <li><Link href="/mon-plan-de-r-vision-personnalis" className="hover:text-primary">Plan de révision</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-6">Accès rapide</h4>
              <ul className="space-y-4 text-label-sm text-on-surface-variant">
                <li><Link href="/connexion-edukora" className="hover:text-primary">Connexion</Link></li>
                <li><Link href="/inscription-1-2-edukora" className="hover:text-primary">Créer un compte</Link></li>
                <li><Link href="/connexion-parent-edukora" className="hover:text-primary">Espace parent</Link></li>
                <li><Link href="/connexion-expert-edukora" className="hover:text-primary">Espace professeur</Link></li>
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
            <p>© 2026 Edukora. Tous droits réservés. Fait avec passion en Côte d'Ivoire 🇨🇮</p>
            <p>PWA · BAC &amp; BEPC · Tuteur IA</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
