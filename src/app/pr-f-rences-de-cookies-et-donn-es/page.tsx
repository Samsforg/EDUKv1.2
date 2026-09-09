import type { Metadata } from "next";
import CookiePreferencesClient from "@/components/CookiePreferencesClient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Préférences de cookies",
  description: "Gérez vos préférences de cookies et de données personnelles sur Edukora : cookies essentiels, analytiques et personnalisation IA.",
  alternates: { canonical: "/pr-f-rences-de-cookies-et-donn-es" },
};

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen" style={{ minHeight: "max(884px, 100dvh)" }}>
      <header className="bg-surface dark:bg-background shadow-sm w-full top-0 sticky z-50 flex items-center justify-between px-4 h-16 border-b border-outline-variant">
        <div className="flex items-center gap-4">
          <Link href="/" aria-label="Retour à l'accueil" className="transition-colors duration-200 active:scale-95 hover:bg-surface-container-high p-2 rounded-full">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed">arrow_back</span>
          </Link>
          <h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Préférences de Cookies</h1>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <span className="font-headline font-bold text-primary dark:text-primary-fixed text-xl">Edukora</span>
        </div>
      </header>

      <main className="flex-grow p-4 md:p-8 max-w-2xl mx-auto w-full">
        <section className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center justify-center p-3 bg-primary-container rounded-xl mb-4">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-3 tracking-tight">Votre réussite, vos données</h2>
          <p className="text-on-surface-variant leading-relaxed font-body">
            Chez <span className="font-bold text-primary">Edukora</span>, nous croyons que la transparence est la clé de l'apprentissage. Nous utilisons vos données uniquement pour sécuriser votre compte, améliorer nos cours et permettre au Tuteur IA Kora de personnaliser votre parcours vers le succès au BEPC/BAC.
          </p>
        </section>

        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-on-surface text-lg">Essentiels</h3>
                  <span className="px-2 py-0.5 bg-surface-container-highest text-on-surface-variant text-[10px] font-bold rounded uppercase tracking-wider">Obligatoire</span>
                </div>
                <p className="text-sm text-on-surface-variant">Indispensables pour la connexion, la sécurité et la sauvegarde de votre progression en temps réel.</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input checked={true} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-outline-variant appearance-none cursor-pointer translate-x-0.5 mt-0.5" disabled={true} id="toggle_essential" name="toggle_essential" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-container cursor-pointer" htmlFor="toggle_essential">
                  <span className="toggle-dot absolute block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out translate-x-4 mt-0.5"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-on-surface text-lg">Analytiques</h3>
                </div>
                <p className="text-sm text-on-surface-variant">Nous permettent de comprendre quelles leçons sont les plus consultées pour améliorer l'expérience globale.</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-outline appearance-none cursor-pointer translate-x-0.5 mt-0.5 peer" id="toggle_analytics" name="toggle_analytics" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-outline-variant cursor-pointer transition-colors duration-200 peer-checked:bg-primary-container" htmlFor="toggle_analytics">
                  <span className="toggle-dot absolute block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out translate-x-0.5 mt-0.5 peer-checked:translate-x-4"></span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-primary-container/30 border border-primary/20 p-5 rounded-xl shadow-sm transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-primary text-lg flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">smart_toy</span>
                    Personnalisation IA
                  </h3>
                </div>
                <p className="text-sm text-on-primary-container">Autorise le Tuteur IA Kora à analyser vos points faibles pour vous proposer des exercices de remédiation ciblés.</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                <input checked={false} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-2 border-primary appearance-none cursor-pointer translate-x-0.5 mt-0.5 peer" id="toggle_ia" name="toggle_ia" type="checkbox" />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-primary-container cursor-pointer transition-colors duration-200 peer-checked:bg-primary" htmlFor="toggle_ia">
                  <span className="toggle-dot absolute block w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform duration-200 ease-in-out translate-x-4 mt-0.5"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 relative h-32 rounded-xl overflow-hidden border border-outline-variant">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container via-primary to-secondary"></div>
          <div className="absolute inset-0 opacity-20 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCte9Kkah8vt7GGorohOjXT1SBrE3kKMwfGbzayMA427IGtPh5lpq7MMNXw5ngAYp8o-gU58pRwObSdtiynFHFv2iQrzC6uZmtFKggZGHfX69eFg_qe_cUGMCt3DwuT1fCEnQs-bArnRuk2RrT8xM-XxJ5tPRpSNZ1cB62w_kDvAj7IovCwS79N7-8pSe8jqGJxHIIF26z72b9msouHEyzkJLWNDediFOQ3Yi3qI-lEnGeLhME5HDWY')" }}></div>
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <p className="text-white text-center text-sm font-medium italic">"L'éducation est l'arme la plus puissante pour changer le monde."</p>
          </div>
        </div>

        <div className="flex justify-center gap-6 flex-wrap pt-6 text-label-sm text-primary font-medium">
          <a className="hover:underline" href="/mentions-l-gales">Mentions légales</a>
          <span className="text-outline-variant">|</span>
          <a className="hover:underline" href="/politique-de-confidentialit">Politique de confidentialité</a>
          <span className="text-outline-variant">|</span>
          <a className="hover:underline" href="/conditions-g-n-rales-d-utilisation">CGU</a>
        </div>
      </main>

      <footer className="bg-surface border-t border-outline-variant p-4 md:px-8 z-50 flex flex-col gap-3 max-w-2xl mx-auto w-full sticky bottom-0">
        <button className="w-full bg-secondary-container hover:bg-secondary text-on-secondary-container font-bold py-3.5 rounded-xl transition-all duration-300 active:scale-95 shadow-md" id="acceptAllBtn">
          Tout accepter
        </button>
        <button className="w-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-semibold py-3.5 rounded-xl border border-outline-variant transition-all duration-300 active:scale-95" id="saveSelectionBtn">
          Enregistrer mes choix
        </button>
      </footer>
      <CookiePreferencesClient />
    </div>
  );
}