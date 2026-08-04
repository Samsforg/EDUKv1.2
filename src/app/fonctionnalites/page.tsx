import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const features = [
  {
    icon: "timer",
    iconBg: "bg-secondary-container",
    title: "Simulateur d'Examen",
    text: "Mets-toi en conditions réelles avec des chronos et des épreuves des 10 dernières années. BAC et BEPC, toutes séries.",
  },
  {
    icon: "menu_book",
    iconBg: "bg-tertiary-container",
    title: "Fiches Certifiées",
    text: "Contenu rédigé et validé par des inspecteurs et professeurs agrégés de l'Éducation Nationale.",
  },
  {
    icon: "emoji_events",
    iconBg: "bg-secondary-container",
    title: "Classement & Ligues",
    text: "Compare ta progression aux autres élèves, grimpe les échelons et défends ta commune dans les ligues académiques.",
  },
  {
    icon: "calendar_month",
    iconBg: "bg-primary",
    title: "Planning de révision",
    text: "Un plan de révision généré automatiquement selon ta progression et tes objectifs, semaine après semaine.",
  },
  {
    icon: "live_tv",
    iconBg: "bg-on-surface-variant",
    title: "Edukora Live",
    text: "Des sessions de révision en direct avec des professeurs, et tous les replays pour réviser à ton rythme.",
  },
  {
    icon: "swords",
    iconBg: "bg-secondary-container",
    title: "Défis Inter-Communes",
    text: "Affronte les autres communes de Côte d'Ivoire et ramène la victoire à la tienne.",
  },
  {
    icon: "military_tech",
    iconBg: "bg-primary",
    title: "Badges & Récompenses",
    text: "Gagne de l'XP, enchaîne les jours de révision et débloque des badges et récompenses motivantes.",
  },
];

export default function Page() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden pt-16 pb-20 px-4 md:px-8">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary opacity-[0.06] rounded-[999px] blur-3xl" />
          <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-secondary-container opacity-[0.08] rounded-[999px] blur-3xl" />
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-[999px] text-label-xs font-bold mb-6">
              <span className="material-symbols-outlined text-[16px]">apps</span>
              NOS FONCTIONNALITÉS
            </div>
            <h1 className="text-[40px] md:text-[56px] leading-[1.08] font-extrabold text-primary mb-6">
              Tout pour ton succès
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Une plateforme complète conçue pour répondre aux défis spécifiques du programme scolaire ivoirien, du
              BAC au BEPC.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/inscription-1-2-edukora"
                className="bg-primary text-on-primary text-body-md font-bold px-8 py-4 rounded-[16px] shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Commencer gratuitement
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/tarifs"
                className="bg-surface-container-high text-primary text-body-md font-semibold px-8 py-4 rounded-[16px] hover:bg-surface-container-highest transition-colors flex items-center justify-center gap-2 border border-outline-variant"
              >
                Voir les tarifs
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <li className="flex items-center gap-3 text-label-sm font-medium">
                    <span className="material-symbols-outlined text-tertiary">check_circle</span>
                    Plan de révision personnalisé selon ta progression
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

            {features.slice(0, 2).map((f) => (
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
                <img className="w-full h-48 object-cover rounded-[16px] shadow-md" src="/images/landing-6-hd.webp" alt="Étudiants ivoiriens en session de révision collaborative" loading="lazy" />
              </div>
            </div>

            {features.slice(2, 5).map((f) => (
              <div
                key={f.title}
                className="bg-white/80 backdrop-blur-md rounded-[24px] p-8 hover:shadow-lg transition-shadow border border-outline-variant/40"
              >
                <div className={`w-12 h-12 ${f.iconBg} rounded-[12px] flex items-center justify-center mb-6`}>
                  <span className="material-symbols-outlined text-on-primary">{f.icon}</span>
                </div>
                <h3 className="text-headline-md font-bold text-primary mb-4">{f.title}</h3>
                <p className="text-body-md text-on-surface-variant">{f.text}</p>
              </div>
            ))}

            <div className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-[24px] p-8 hover:shadow-lg transition-shadow border border-outline-variant/40 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary rounded-[12px] flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-primary">assignment_turned_in</span>
                </div>
                <h3 className="text-headline-md font-bold text-primary mb-4">Suivi des parents &amp; professeurs</h3>
                <p className="text-body-md text-on-surface-variant">
                  Les parents suivent la progression de leur enfant en temps réel, et les professeurs disposent d'un
                  tableau de bord complet pour accompagner leurs élèves.
                </p>
              </div>
              <Link
                href="/connexion-parent-edukora"
                className="shrink-0 bg-primary text-on-primary text-body-md font-bold px-8 py-4 rounded-[16px] shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Espace parent
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 md:px-8 mt-8">
          <div className="max-w-7xl mx-auto bg-primary rounded-[32px] md:rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-6">Prêt à découvrir toutes ces fonctionnalités ?</h2>
              <p className="text-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto">
                Rejoins la communauté Edukora dès aujourd'hui et mets toutes les chances de ton côté.
              </p>
              <Link
                href="/inscription-1-2-edukora"
                className="inline-flex bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-[20px] items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl"
              >
                <span className="material-symbols-outlined">rocket_launch</span>
                Créer mon compte gratuit
              </Link>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
