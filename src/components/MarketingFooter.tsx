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
            <h3 className="font-bold text-primary mb-6">Plateforme</h3>
            <ul className="space-y-4 text-label-sm text-on-surface-variant">
              <li><Link href="/fonctionnalites" className="hover:text-primary">Fonctionnalités</Link></li>
              <li><Link href="/tarifs" className="hover:text-primary">Tarifs &amp; Abonnements</Link></li>
              <li><Link href="/simulateur-d-examen-bac-bepc" className="hover:text-primary">Simulateur d'examen</Link></li>
              <li><Link href="/tuteur-ia-edukora" className="hover:text-primary">Tuteur IA Kora</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog &amp; conseils</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-6">Accès rapide</h3>
            <ul className="space-y-4 text-label-sm text-on-surface-variant">
              <li><Link href="/resultats" className="hover:text-primary">Nos résultats</Link></li>
              <li><Link href="/connexion-edukora" className="hover:text-primary">Connexion</Link></li>
              <li><Link href="/inscription-1-2-edukora" className="hover:text-primary">Créer mon compte</Link></li>
              <li><Link href="/connexion-parent-edukora" className="hover:text-primary">Espace parent</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-primary mb-6">Suivez-nous</h3>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="https://wa.me/2250709141545" target="_blank" rel="noopener noreferrer" aria-label="Nous contacter sur WhatsApp">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-sm" href="https://web.facebook.com/profile.php?id=61591805488598" target="_blank" rel="noopener noreferrer" aria-label="Nous suivre sur Facebook">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.88h2.76l-.44 2.9h-2.32V22c4.78-.76 8.44-4.92 8.44-9.94z"/>
                </svg>
              </a>
            </div>
            <p className="mt-6 text-label-xs text-on-surface-variant">📍 09 BP 989 Abidjan 09, Côte d'Ivoire</p>
          </div>
        </div>
        <div className="pt-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4 text-label-xs text-on-surface-variant">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/mentions-l-gales" className="hover:text-primary">Mentions légales</Link>
            <Link href="/politique-de-confidentialit" className="hover:text-primary">Confidentialité</Link>
            <Link href="/conditions-g-n-rales-d-utilisation" className="hover:text-primary">CGU</Link>
            <Link href="/pr-f-rences-de-cookies-et-donn-es" className="hover:text-primary">Cookies</Link>
          </div>
          <p>© 2026 Edukora. Tous droits réservés. Fait avec passion en Côte d'Ivoire 🇨🇮</p>
        </div>
      </div>
    </footer>
  );
}
