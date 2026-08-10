import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import NewsletterSection from "@/components/NewsletterSection";
import { HomeAds } from "@/components/HomeAds";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const testimonials: { img?: string; initials?: string; name: string; role: string; quote: string }[] = [
  {
    img: "/images/landing-t-7.webp",
    name: "Mariam K.",
    role: "Admise au BAC D (Mention Bien)",
    quote:
      "Kora m'a aidé à comprendre les intégrales en une soirée alors que je luttais depuis des semaines. Sans Edukora, je n'aurais jamais eu cette mention !",
  },
  {
    img: "/images/landing-t-8.webp",
    name: "Jean-Philippe A.",
    role: "Admis au BEPC",
    quote:
      "Les simulateurs d'examen sont incroyables. Le jour J, j'avais l'impression de faire un simple exercice sur l'appli. Je n'avais aucun stress.",
  },
  {
    img: "/images/landing-t-9.webp",
    name: "Awa D.",
    role: "Parent d'élève (Abidjan)",
    quote:
      "En tant que parent, je peux suivre les progrès de mon fils sur mon téléphone. C'est l'investissement le plus rentable pour son avenir.",
  },
  {
    name: "Koffi N.",
    role: "Admis au BAC C",
    quote:
      "Les fiches sont claires et les quiz m'ont permis de me tester en conditions réelles. Je recommande Edukora à tous mes camarades de Terminale.",
    initials: "KN",
  },
  {
    name: "Fatou C.",
    role: "Admise au BEPC (Mention Très Bien)",
    quote:
      "Grâce au plan de révision personnalisé, j'ai suivi un programme jour par jour sans me perdre. Résultat : Très Bien au BEPC !",
    initials: "FC",
  },
  {
    name: "Yao E.",
    role: "Admis au BAC A",
    quote:
      "Le support des professeurs est réactif et les sessions en direct m'ont énormément aidé en philosophie. Une plateforme vraiment complète.",
    initials: "YE",
  },
];

const ratingBreakdown = [
  { stars: 5, pct: 87 },
  { stars: 4, pct: 10 },
  { stars: 3, pct: 2 },
  { stars: 2, pct: 1 },
  { stars: 1, pct: 0 },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://edukora.net/#organization",
        name: "Edukora",
        url: "https://edukora.net",
        logo: "https://edukora.net/favicon.png",
        description:
          "Plateforme éducative n°1 en Côte d'Ivoire pour réussir le BAC et le BEPC : fiches certifiées, tuteur IA et simulateur d'examen.",
        sameAs: [
          "https://web.facebook.com/profile.php?id=61591805488598",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Abidjan",
          addressCountry: "CI",
        },
        email: "contact@edukora.net",
        telephone: "+2250709141545",
      },
      {
        "@type": "WebSite",
        "@id": "https://edukora.net/#website",
        url: "https://edukora.net",
        name: "Edukora",
        inLanguage: "fr-CI",
        publisher: { "@id": "https://edukora.net/#organization" },
      },
    ],
  };
  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MarketingHeader />

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
                  {["/images/landing-avatar-2.webp", "/images/landing-avatar-3.webp", "/images/landing-avatar-4.webp"].map((img) => (
                    <div key={img} className="w-8 h-8 rounded-[999px] border-2 border-background overflow-hidden bg-surface-container">
                      <img className="w-full h-full object-cover" src={img} alt="" fetchPriority="low" />
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
                  src="/images/landing-5-hero.webp"
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

        <HomeAds />

        <section className="py-24 px-4 md:px-8 bg-surface-container-low">
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
                <div key={s.num} className="relative bg-white/80 backdrop-blur-md rounded-[24px] p-8 border border-outline-variant/40 hover:shadow-lg transition-shadow">
                  <span className="absolute top-6 right-8 text-[48px] font-extrabold text-primary/10">{s.num}</span>
                  <div className="w-12 h-12 bg-primary rounded-[12px] flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                  </div>
                  <h3 className="text-headline-md font-bold text-primary mb-3">{s.title}</h3>
                  <p className="text-body-md text-on-surface-variant">{s.text}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/fonctionnalites"
                className="inline-flex bg-surface-container-high text-primary text-body-md font-semibold px-10 py-4 rounded-[16px] hover:bg-surface-container-highest transition-colors items-center justify-center gap-2 border border-outline-variant"
              >
                Découvrir toutes les fonctionnalités
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4">Ils ont réussi avec Edukora</h2>
              <p className="text-body-md text-on-surface-variant">Parce que leur succès est notre plus grande fierté.</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-16 items-start">
              <div className="bg-surface-container-low rounded-[24px] p-8 border border-outline-variant/40">
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-[56px] font-extrabold leading-none text-primary">4,9</span>
                  <span className="text-body-lg font-semibold text-on-surface-variant pb-1.5">/ 5</span>
                </div>
                <div className="flex gap-1 text-secondary-container mb-4">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-label-sm text-on-surface-variant">
                  Basé sur les retours de nos élèves et de leurs parents après obtention du BAC et du BEPC.
                </p>
              </div>
              <div className="md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {ratingBreakdown.map((r) => (
                  <div key={r.stars} className="flex items-center gap-3">
                    <div className="flex gap-0.5 shrink-0">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined text-[18px] ${i < r.stars ? "text-secondary-container" : "text-outline-variant"}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full bg-secondary-container rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-label-xs text-on-surface-variant w-9 text-right">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white rounded-[24px] p-8 border border-outline-variant/40 shadow-sm">
                  <div className="flex gap-1 mb-6 text-secondary-container">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <span key={i} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-body-md italic text-on-surface-variant leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[999px] overflow-hidden bg-surface-container shrink-0">
                      {t.img ? (
                        <img className="w-full h-full object-cover" src={t.img} alt={t.name} fetchPriority="low" loading="lazy" />
                      ) : (
                        <div className="w-full h-full bg-secondary-container/60 text-primary flex items-center justify-center text-label-sm font-extrabold">
                          {t.initials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-label-sm font-bold text-on-surface">{t.name}</h4>
                      <p className="text-label-xs text-on-surface-variant">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/resultats"
                className="inline-flex bg-surface-container-high text-primary text-body-md font-semibold px-10 py-4 rounded-[16px] hover:bg-surface-container-highest transition-colors items-center justify-center gap-2 border border-outline-variant"
              >
                Voir nos résultats
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <NewsletterSection source="home" />

        <section className="py-24 px-4 md:px-8">
          <div className="max-w-7xl mx-auto bg-surface-container-low rounded-[32px] md:rounded-[40px] p-8 md:p-16 border border-outline-variant/40">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-label-sm font-bold uppercase tracking-wider text-secondary-container mb-3">Parrainage</p>
                <h2 className="text-[28px] md:text-[36px] font-extrabold text-primary mb-4">Réviser ensemble, réussir ensemble</h2>
                <p className="text-body-md text-on-surface-variant leading-relaxed mb-8">
                  Invite tes amis et camarades de classe à rejoindre Edukora avec ton code personnel.
                  Chaque filleul inscrit fait grimper ta place dans le classement Ambassadeurs,
                  et tu es notifié à chaque nouvelle inscription.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/parrainage"
                    className="inline-flex bg-primary text-on-primary text-body-md font-bold px-8 py-4 rounded-[16px] items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <span className="material-symbols-outlined">diversity_3</span>
                    Découvrir le parrainage
                  </Link>
                  <Link
                    href="/classement?view=ambassadeurs"
                    className="inline-flex bg-surface-container-high text-primary text-body-md font-semibold px-8 py-4 rounded-[16px] items-center justify-center gap-2 border border-outline-variant hover:bg-surface-container-highest transition-colors"
                  >
                    <span className="material-symbols-outlined">leaderboard</span>
                    Classement Ambassadeurs
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: "badge", value: "EDK-XXXXXX", label: "Ton code unique" },
                  { icon: "group_add", value: "Filleuls", label: "Chaque inscription compte" },
                  { icon: "leaderboard", value: "Novice → Élite", label: "3 paliers d'Ambassadeur" },
                ].map((c) => (
                  <div key={c.label} className="bg-white/80 backdrop-blur-md rounded-[20px] p-5 border border-outline-variant/40 text-center hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 mx-auto bg-primary rounded-[12px] flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>{c.icon}</span>
                    </div>
                    <p className="text-label-sm font-bold text-on-surface mb-1">{c.value}</p>
                    <p className="text-label-xs text-on-surface-variant leading-tight">{c.label}</p>
                  </div>
                ))}
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

      <MarketingFooter />
    </div>
  );
}
