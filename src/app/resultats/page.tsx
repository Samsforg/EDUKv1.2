import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";
import { getPlatformStats } from "@/lib/stats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Résultats et réussites",
  description:
    "Découvrez les résultats de la communauté Edukora en Côte d'Ivoire : fiches de révision, quiz corrigés et progression des élèves.",
  alternates: { canonical: "/resultats" },
  openGraph: {
    title: "Résultats et réussites Edukora",
    description: "Fiches de révision, quiz corrigés et progression des élèves en Côte d'Ivoire.",
    url: "https://edukora.net/resultats",
    siteName: "Edukora",
    type: "website",
  },
};

// Chiffres réels de la plateforme (base PostgreSQL) : pas de pré-rendu figé au build.
export const dynamic = "force-dynamic";

function formatStat(n: number, plus = true): string {
  const formatted =
    n >= 1_000_000
      ? new Intl.NumberFormat("fr-FR", { notation: "compact", maximumFractionDigits: 1 }).format(n)
      : n.toLocaleString("fr-FR");
  return plus ? `${formatted}+` : formatted;
}

export default async function Page() {
  const stats = await getPlatformStats();
  const statCells = [
    { value: formatStat(stats.students), label: "Élèves inscrits" },
    { value: formatStat(stats.quizzesCorrected, false), label: "Quiz corrigés" },
    { value: formatStat(stats.lessonsRead, false), label: "Fiches lues" },
    { value: formatStat(stats.xpEarned), label: "XP gagnés" },
  ];

  return (
    <div className="bg-background text-on-background min-h-screen font-body">
      <MarketingHeader />

      <main>
        <section className="relative overflow-hidden pt-16 pb-20 px-4 md:px-8">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary opacity-[0.06] rounded-[999px] blur-3xl" />
          <div className="max-w-7xl mx-auto text-center relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-[999px] text-label-xs font-bold mb-6">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
              NOS RÉSULTATS
            </div>
            <h1 className="text-[40px] md:text-[56px] leading-[1.08] font-extrabold text-primary mb-6">
              Des résultats qui parlent
            </h1>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              Chaque année, des milliers d'élèves ivoiriens réussissent leur BAC et leur BEPC grâce à Edukora.
            </p>
            <Link
              href="/inscription-1-2-edukora"
              className="inline-flex bg-primary text-on-primary text-body-md font-bold px-8 py-4 rounded-[16px] shadow-lg hover:shadow-xl transition-all active:scale-95 items-center justify-center gap-2"
            >
              Rejoindre les lauréats
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </section>

        <section className="bg-primary py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
            {statCells.map((s) => (
              <div key={s.label} className="text-center lg:text-left flex flex-col items-center lg:items-start">
                <span className="text-[40px] font-extrabold text-primary-fixed mb-1">{s.value}</span>
                <span className="text-on-primary-container font-label-sm uppercase tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-4 md:px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[32px] md:text-[40px] font-extrabold text-primary mb-4">Ce que propose Edukora</h2>
              <p className="text-body-md text-on-surface-variant">Des outils conçus pour accompagner les élèves du BAC et du BEPC.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[24px] p-8 border border-outline-variant/40 shadow-sm">
                <div className="w-14 h-14 rounded-[999px] bg-primary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-primary text-2xl">school</span>
                </div>
                <h4 className="text-label-sm font-bold text-on-surface mb-2">Programme officiel</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Les fiches Edukora sont alignées sur les programmes officiels du BAC et du BEPC en Côte d&apos;Ivoire.
                </p>
              </div>
              <div className="bg-white rounded-[24px] p-8 border border-outline-variant/40 shadow-sm">
                <div className="w-14 h-14 rounded-[999px] bg-secondary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-secondary-fixed text-2xl">smart_toy</span>
                </div>
                <h4 className="text-label-sm font-bold text-on-surface mb-2">Tuteur IA Kora</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Un assistant intelligent disponible pour répondre à vos questions et vous accompagner dans vos révisions.
                </p>
              </div>
              <div className="bg-white rounded-[24px] p-8 border border-outline-variant/40 shadow-sm">
                <div className="w-14 h-14 rounded-[999px] bg-tertiary-container flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-on-tertiary-container text-2xl">timer</span>
                </div>
                <h4 className="text-label-sm font-bold text-on-surface mb-2">Simulateur d&apos;examen</h4>
                <p className="text-body-md text-on-surface-variant leading-relaxed">
                  Entraînez-vous en conditions réelles avec des épreuves chronométrées et des corrections détaillées.
                </p>
              </div>
            </div>
            <div className="text-center mt-14">
              <Link
                href="/inscription-1-2-edukora"
                className="inline-flex bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-[20px] items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl"
              >
                <span className="material-symbols-outlined">emoji_events</span>
                Découvrir Edukora
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-24 px-4 md:px-8 pt-8">
          <div className="max-w-7xl mx-auto bg-primary rounded-[32px] md:rounded-[40px] p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.3)_0%,_transparent_70%)]" />
            <div className="relative z-10">
              <h2 className="text-[28px] md:text-[40px] font-extrabold mb-6">Ton succès commence aujourd'hui</h2>
              <p className="text-body-lg text-on-primary-container mb-10 max-w-2xl mx-auto">
                Rejoins la communauté Edukora et commence à réviser gratuitement dès maintenant.
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
