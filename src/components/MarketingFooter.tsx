import Link from "next/link";

export default function MarketingFooter() {
  return (
    <footer className="bg-surface-container-highest pt-20 pb-10 px-4 md:px-8 border-t border-outline-variant">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
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
              <li><Link href="/fonctionnalites" className="hover:text-primary">Fonctionnalités</Link></li>
              <li><Link href="/tarifs" className="hover:text-primary">Tarifs &amp; Abonnements</Link></li>
              <li><Link href="/simulateur-d-examen-bac-bepc" className="hover:text-primary">Simulateur d'examen</Link></li>
              <li><Link href="/tuteur-ia-edukora" className="hover:text-primary">Tuteur IA Kora</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6">Accès rapide</h4>
            <ul className="space-y-4 text-label-sm text-on-surface-variant">
              <li><Link href="/resultats" className="hover:text-primary">Nos résultats</Link></li>
              <li><Link href="/connexion-edukora" className="hover:text-primary">Connexion</Link></li>
              <li><Link href="/inscription-1-2-edukora" className="hover:text-primary">Créer un compte</Link></li>
              <li><Link href="/connexion-parent-edukora" className="hover:text-primary">Espace parent</Link></li>
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
  );
}
