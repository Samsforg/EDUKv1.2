import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales d'Edukora : éditeur, hébergement, propriété intellectuelle et informations de contact.",
  alternates: { canonical: "/mentions-l-gales" },
};

const sections: { title: string; body: string[]; list?: string[]; extra?: string[] }[] = [
  {
    title: "Éditeur du site",
    body: [
      "Le site et la plateforme numérique Edukora, accessibles à l'adresse https://edukora.net, sont édités par :",
      "Soma Samaké FORGO",
      "Statut juridique : Immatriculation en cours — RCCM : En cours — IDU : En cours",
      "Adresse postale : 09 BP 989 Abidjan 09, Côte d'Ivoire",
      "Téléphone : +225 07 09 14 15 45",
      "E-mail général : contact@edukora.net — E-mail support : support@edukora.net — E-mail du responsable : somasamakeforgo@edukora.net",
      "Les informations relatives au RCCM et à l'IDU seront mises à jour dès leur attribution officielle.",
    ],
  },
  {
    title: "Directeur de publication",
    body: ["Le directeur de publication du site est : Soma Samaké FORGO", "E-mail : somasamakeforgo@edukora.net"],
  },
  {
    title: "Hébergement et infrastructure technique",
    body: ["La plateforme Edukora utilise plusieurs prestataires techniques :"],
    list: [
      "Application et infrastructure web : Vercel — Site : https://vercel.com",
      "Base de données : Néon — Site : https://neon.tech",
      "Nom de domaine : LWS — Le nom de domaine edukora.net est enregistré auprès de LWS.",
    ],
    extra: [
      "Ces prestataires peuvent traiter certaines données techniques nécessaires au fonctionnement, à la sécurité, à l'hébergement ou à la maintenance de la plateforme.",
    ],
  },
  {
    title: "Objet du site",
    body: [
      "Edukora est une plateforme numérique éducative destinée notamment à faciliter l'accès à des ressources pédagogiques et à des outils d'apprentissage. La plateforme peut notamment proposer :",
    ],
    list: [
      "des cours et ressources pédagogiques ;",
      "des exercices ;",
      "des évaluations ;",
      "des espaces personnels pour les apprenants ;",
      "des espaces destinés aux enseignants ;",
      "des fonctionnalités destinées aux parents ou responsables légaux ;",
      "des outils de suivi pédagogique ;",
      "un assistant pédagogique basé sur l'intelligence artificielle (« Tuteur IA ») ;",
      "des services numériques complémentaires.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      "La dénomination Edukora, son identité visuelle, son logo, ses interfaces, sa structure, ses textes, contenus pédagogiques, illustrations, logiciels, bases de données et autres éléments composant la plateforme sont protégés par les dispositions applicables en matière de propriété intellectuelle.",
      "Toute reproduction, représentation, adaptation, modification, distribution ou exploitation non autorisée de tout ou partie de ces éléments est interdite, sauf autorisation préalable de l'éditeur ou du titulaire des droits concernés.",
      "Les contenus appartenant à des tiers restent la propriété de leurs titulaires respectifs.",
    ],
  },
  {
    title: "Données personnelles",
    body: [
      "Edukora collecte et traite certaines données personnelles nécessaires à la création des comptes, au fonctionnement des services, à la personnalisation de l'expérience pédagogique, à la sécurité et à l'amélioration de la plateforme.",
      "Ces traitements sont réalisés conformément à la réglementation ivoirienne applicable, notamment à la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel.",
      "Les modalités détaillées sont présentées dans la Politique de confidentialité d'Edukora.",
    ],
  },
  {
    title: "Cookies",
    body: ["Edukora peut utiliser des cookies ou technologies similaires nécessaires :"],
    list: [
      "à l'authentification ;",
      "au maintien des sessions ;",
      "à la sécurité ;",
      "au fonctionnement de certaines fonctionnalités ;",
      "à l'amélioration des performances.",
    ],
    extra: [
      "Lorsque cela est requis par la réglementation applicable, le consentement de l'utilisateur est demandé avant l'utilisation de cookies non nécessaires.",
    ],
  },
  {
    title: "Tuteur IA",
    body: [
      "Le Tuteur IA d'Edukora constitue un outil d'assistance pédagogique.",
      "Les réponses générées automatiquement peuvent comporter des erreurs ou des informations incomplètes et ne doivent pas être considérées comme des décisions ou évaluations scolaires officielles.",
      "Les utilisateurs sont invités à vérifier les informations importantes auprès de sources pédagogiques appropriées ou de leurs enseignants.",
    ],
  },
  {
    title: "Responsabilité",
    body: [
      "Edukora met en œuvre des moyens raisonnables afin d'assurer la disponibilité, la sécurité et le bon fonctionnement de la plateforme.",
      "Toutefois, l'éditeur ne peut garantir une disponibilité permanente ou l'absence totale d'erreurs, de bugs, d'interruptions ou de dysfonctionnements.",
      "Edukora ne saurait notamment être tenue responsable des interruptions résultant :",
    ],
    list: [
      "d'opérations de maintenance ;",
      "de problèmes de connexion Internet ;",
      "de défaillances d'un prestataire tiers ;",
      "d'un problème affectant l'équipement de l'utilisateur ;",
      "d'une utilisation frauduleuse ou abusive du compte ;",
      "d'un événement indépendant de la volonté de l'éditeur.",
    ],
  },
  {
    title: "Liens vers des sites tiers",
    body: [
      "Edukora peut contenir des liens vers des services ou sites externes.",
      "L'éditeur n'est pas responsable du contenu, de la disponibilité ou des pratiques de confidentialité de ces services tiers.",
    ],
  },
  {
    title: "Sécurité",
    body: [
      "Edukora met en œuvre des mesures techniques et organisationnelles raisonnables destinées à protéger les informations traitées contre les accès non autorisés, la perte, l'altération ou la divulgation illicite.",
      "Aucune infrastructure connectée à Internet ne pouvant garantir une sécurité absolue, l'utilisateur reconnaît l'existence de risques résiduels.",
    ],
  },
  {
    title: "Droit applicable",
    body: ["Les présentes mentions légales sont soumises au droit ivoirien. La plateforme est notamment susceptible d'être concernée par :"],
    list: [
      "la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel ;",
      "la loi n°2013-546 du 30 juillet 2013 relative aux transactions électroniques ;",
      "la loi n°2013-451 du 19 juin 2013 relative à la lutte contre la cybercriminalité.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Pour toute question concernant les présentes mentions légales :",
      "Edukora - Soma Samaké FORGO",
      "E-mail : contact@edukora.net — Support : support@edukora.net — Téléphone : +225 07 09 14 15 45",
    ],
  },
];

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface dark:bg-background z-50 flex items-center justify-between px-4 py-4 border-b border-outline-variant dark:border-outline">
<div className="flex items-center gap-4">
<Link href="/" aria-label="Retour à l'accueil" className="active:scale-95 duration-150 p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors flex items-center justify-center text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</Link>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Informations Légales</h1>
</div>
<div className="hidden md:flex gap-6 items-center">
<span className="font-headline font-bold text-primary dark:text-primary-fixed text-xl">Edukora</span>
</div>
</header>

<main className="max-w-4xl mx-auto px-4 md:px-8 py-8">

<div className="mb-12 text-center md:text-left">
<p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-2">Mentions Légales</p>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4 leading-tight">Éditeur de la Plateforme</h2>
<div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant">
<span className="material-symbols-outlined text-sm text-outline">calendar_today</span>
<span className="text-label-sm font-medium text-on-surface-variant">Dernière mise à jour : 8 août 2026</span>
</div>
</div>

<div className="relative w-full h-48 md:h-64 mb-12 rounded-xl overflow-hidden shadow-sm border border-outline-variant">
<div className="absolute inset-0 bg-primary-container opacity-10"></div>
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBv5H5ks9hN1y7yHD0Qfuo_0YbW1YQzOtEZPVPpV7EzvuZDhQtuCs3SfGQFMa65pHighBfRP8ir_QOvMmf5x35Wa2lmZNy4tM_TwfAOo78F2vZCaB118nHBAW6aqeVr7uXCrn_rjPrq6TOUvM0QUjJNxG_g6xYfHm-TRxIa6leB3sYU-XwT8h4XBW7ZB0s1skndxKq926xLGhJy5ef1TC9hYl99n12dWJ6AjlrhLvMYkLZecLyNBkij')"}}></div>
<div className="absolute inset-0 flex items-center justify-center">
<div className="bg-surface/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/50 shadow-lg text-center">
<p className="font-headline font-bold text-primary text-lg">Éditeur : Edukora</p>
<p className="text-on-surface-variant text-sm">Plateforme d'apprentissage premium en Côte d'Ivoire</p>
</div>
</div>
</div>

<div className="space-y-12">

{sections.map((s, i) => (
<section key={s.title} className="group">
<div className="flex items-start gap-4">
<div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-primary text-on-primary rounded-xl font-headline text-xl font-bold shadow-md">{i + 1}</div>
<div className="flex-grow">
<h3 className="font-headline text-2xl font-bold text-primary mb-4">{s.title}</h3>
{s.body.map((p) => (
<p key={p} className="text-body-lg text-on-surface-variant leading-relaxed mb-4">{p}</p>
))}
{s.list && (
<ul className="space-y-3 list-none mb-4">
{s.list.map((li) => (
<li key={li} className="flex items-start gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-tertiary-container mt-1">check_circle</span>
<span className="text-body-lg leading-relaxed">{li}</span>
</li>
))}
</ul>
)}
{s.extra?.map((p) => (
<p key={p} className="text-body-lg text-on-surface-variant leading-relaxed mb-4">{p}</p>
))}
</div>
</div>
</section>
))}
</div>

<div className="mt-16 p-8 bg-on-surface text-white rounded-2xl flex flex-col items-center text-center">
<span className="material-symbols-outlined text-4xl mb-4 text-tertiary-fixed">verified_user</span>
<h4 className="font-headline text-2xl font-bold mb-2">Vous avez des questions ?</h4>
<p className="text-on-surface-variant/70 mb-6 max-w-md">Notre équipe support est disponible pour toute question relative à ces mentions légales.</p>
<button className="px-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-xl active:scale-95 transition-all hover:bg-secondary-fixed duration-200">
                Contacter le support
            </button>
</div>
<footer className="mt-12 text-center text-on-surface-variant text-sm pb-12">
<p>© 2026 Edukora - Tous droits réservés.</p>
<div className="mt-4 flex justify-center gap-4 text-primary font-medium">
<a className="hover:underline" href="/politique-de-confidentialit">Confidentialité</a>
<span className="text-outline-variant">|</span>
<a className="hover:underline" href="/conditions-g-n-rales-d-utilisation">CGU</a>
</div>
</footer>
</main>

<button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50">
<span className="material-symbols-outlined">help_center</span>
</button>

    </div>
  );
}
