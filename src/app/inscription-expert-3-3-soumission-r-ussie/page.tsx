import Link from "next/link";

export default function Page() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col" style={{ minHeight: "max(884px, 100dvh)" }}>
      <header className="flex items-center px-4 md:px-8 h-16 w-full top-0 bg-surface border-b border-outline-variant z-50">
        <div className="flex items-center gap-4">
          <Link href="/inscription-expert-1-3-infos-personnelles" className="p-2 hover:bg-surface-container-low transition-colors rounded-full text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
          </Link>
          <h1 className="font-headline font-bold text-2xl text-primary tracking-tight">Inscription Enseignant</h1>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-outline">Progression</span>
              <span className="text-sm font-bold text-primary">Étape 2 sur 3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 flex-grow rounded-full bg-primary"></div>
              <div className="h-2 flex-grow rounded-full bg-primary"></div>
              <div className="h-2 flex-grow rounded-full bg-surface-container-highest relative overflow-hidden">
                <div className="absolute inset-0 bg-primary w-full transition-all duration-1000"></div>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-8 md:p-12 shadow-sm border border-outline-variant flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-primary rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                <span className="material-symbols-outlined text-primary text-6xl">school</span>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-tertiary text-on-tertiary w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-md border-4 border-surface">
                <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Candidature Soumise</h2>
            <p className="text-on-surface-variant mb-8 max-w-lg">
              Félicitations ! Vos informations personnelles ont été enregistrées. Votre compte enseignant sera activé après vérification par notre équipe académique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-10 text-left">
              <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-primary">
                  <span className="material-symbols-outlined">schedule</span>
                  <span className="font-bold text-sm uppercase tracking-wider">Fenêtre de vérification</span>
                </div>
                <p className="text-on-surface">Notre comité académique effectue la vérification manuelle sous <span className="font-bold">24-48 heures</span>.</p>
              </div>
              <div className="p-6 bg-surface-container rounded-xl border border-outline-variant/30 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-secondary">
                  <span className="material-symbols-outlined">notifications_active</span>
                  <span className="font-bold text-sm uppercase tracking-wider">Restez informé</span>
                </div>
                <p className="text-on-surface">Vous recevrez un e-mail de confirmation une fois votre statut mis à jour en &apos;Certifié&apos;.</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full sm:w-auto min-w-[280px]">
              <Link href="/bienvenue-enseignant" className="bg-secondary-container hover:bg-secondary-container/90 text-on-secondary-container font-bold py-4 px-8 rounded-lg shadow-sm transition-all transform active:scale-95 flex items-center justify-center gap-2">
                <span>Configurer mon espace</span>
                <span className="material-symbols-outlined">rocket_launch</span>
              </Link>
              <Link href="/connexion-expert-edukora" className="text-primary font-semibold py-2 px-4 hover:underline flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">login</span>
                Retour à la connexion
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-outline text-sm">
            Questions sur votre candidature ?{" "}
            <a className="text-primary-container font-medium hover:underline" href="mailto:contact@edukora.net">Contacter le support académique</a>
          </div>
        </div>
      </main>
    </div>
  );
}
