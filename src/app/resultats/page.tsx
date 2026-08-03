import Link from "next/link";
import MarketingHeader from "@/components/MarketingHeader";
import MarketingFooter from "@/components/MarketingFooter";

const stats = [
  { value: "95%", label: "Taux de réussite" },
  { value: "50,000+", label: "Étudiants actifs" },
  { value: "500+", label: "Épreuves types" },
  { value: "2,000+", label: "Fiches de cours" },
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

export default function Page() {
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
            {stats.map((s) => (
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
            <div className="text-center mt-14">
              <Link
                href="/inscription-1-2-edukora"
                className="inline-flex bg-secondary-container text-on-secondary-fixed text-body-md font-bold px-10 py-5 rounded-[20px] items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl"
              >
                <span className="material-symbols-outlined">emoji_events</span>
                Devenir le prochain lauréat
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
                Rejoins les 50,000+ étudiants qui révisent déjà avec Edukora.
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
