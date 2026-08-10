import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description:
    "Conditions générales d'utilisation du service Edukora : compte, abonnement, contenu pédagogique et responsabilités.",
  alternates: { canonical: "/conditions-g-n-rales-d-utilisation" },
};

const sections: { title: string; body: string[]; list?: string[]; extra?: string[] }[] = [
  {
    title: "Objet",
    body: [
      "Les présentes Conditions Générales d'Utilisation (« CGU ») définissent les conditions d'accès et d'utilisation de la plateforme numérique Edukora.",
      "Edukora est une plateforme éducative destinée notamment aux apprenants, enseignants, parents et responsables légaux.",
      "L'utilisation de la plateforme implique l'acceptation des présentes CGU.",
    ],
  },
  {
    title: "Éditeur",
    body: [
      "Edukora est édité par : Soma Samaké FORGO",
      "Statut juridique : Immatriculation en cours — RCCM : En cours — IDU : En cours",
      "Adresse : 09 BP 989 Abidjan 09, Côte d'Ivoire",
      "Téléphone : +225 07 09 14 15 45 — E-mail : contact@edukora.net",
      "Les informations d'immatriculation seront actualisées dès leur obtention.",
    ],
  },
  {
    title: "Services proposés",
    body: ["Edukora peut proposer notamment :"],
    list: [
      "des cours numériques ;",
      "des ressources pédagogiques ;",
      "des exercices ;",
      "des évaluations ;",
      "des outils de suivi de progression ;",
      "un espace apprenant ;",
      "un espace enseignant ;",
      "un espace parent ;",
      "un Tuteur IA ;",
      "des services complémentaires.",
    ],
    extra: [
      "Certaines fonctionnalités peuvent être gratuites tandis que d'autres peuvent être payantes.",
      "Les conditions tarifaires applicables sont présentées séparément lorsqu'un service payant est proposé.",
    ],
  },
  {
    title: "Création d'un compte",
    body: [
      "Certaines fonctionnalités nécessitent la création d'un compte.",
      "L'utilisateur s'engage à fournir des informations exactes et à jour.",
      "Il est responsable de la confidentialité de ses identifiants.",
      "Un compte ne doit pas être utilisé pour usurper l'identité d'une autre personne.",
    ],
  },
  {
    title: "Utilisateurs mineurs",
    body: [
      "Lorsque l'utilisateur est mineur, l'utilisation de certaines fonctionnalités peut nécessiter l'intervention ou l'autorisation d'un parent ou représentant légal, conformément à la réglementation applicable.",
      "Les parents ou représentants légaux sont invités à accompagner les mineurs dans leur utilisation de la plateforme.",
    ],
  },
  {
    title: "Règles d'utilisation",
    body: ["L'utilisateur s'engage à utiliser Edukora conformément aux lois ivoiriennes et aux présentes CGU. Il est notamment interdit :"],
    list: [
      "de tenter d'accéder à des comptes qui ne lui appartiennent pas ;",
      "de contourner les mécanismes de sécurité ;",
      "de diffuser des logiciels malveillants ;",
      "de perturber le fonctionnement du service ;",
      "d'utiliser la plateforme à des fins frauduleuses ;",
      "de publier des contenus illégaux ou portant atteinte aux droits d'autrui ;",
      "d'usurper l'identité d'une autre personne ;",
      "de copier ou redistribuer les contenus Edukora sans autorisation ;",
      "d'utiliser le service pour harceler, menacer ou intimider d'autres utilisateurs.",
    ],
    extra: [
      "Tout comportement susceptible de compromettre la sécurité ou l'intégrité de la plateforme peut entraîner une suspension ou une suppression du compte.",
    ],
  },
  {
    title: "Contenus pédagogiques",
    body: [
      "Les contenus proposés par Edukora sont destinés à accompagner l'apprentissage.",
      "Ils ne constituent pas nécessairement des documents officiels de l'État ou d'un établissement scolaire.",
      "Edukora s'efforce de proposer des contenus pertinents et actualisés mais ne garantit pas l'absence totale d'erreurs.",
    ],
  },
  {
    title: "Tuteur IA",
    body: [
      "Le Tuteur IA est un outil d'assistance pédagogique automatisé.",
      "Il peut générer des réponses incorrectes, incomplètes ou inadaptées.",
      "L'utilisateur doit conserver un esprit critique et vérifier les informations importantes.",
      "Les réponses du Tuteur IA ne constituent pas :",
    ],
    list: [
      "une note officielle ;",
      "une décision pédagogique officielle ;",
      "un avis professionnel ;",
      "une garantie de réussite scolaire.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    body: [
      "Les contenus, logiciels, interfaces, logos, marques, éléments graphiques et autres composants d'Edukora sont protégés par les règles applicables en matière de propriété intellectuelle.",
      "Toute reproduction ou exploitation non autorisée est interdite.",
    ],
  },
  {
    title: "Disponibilité du service",
    body: ["Edukora s'efforce de maintenir la plateforme accessible. Toutefois, l'accès peut être temporairement interrompu pour :"],
    list: [
      "maintenance ;",
      "mise à jour ;",
      "amélioration ;",
      "incident technique ;",
      "problème de réseau ;",
      "événement indépendant de la volonté de l'éditeur.",
    ],
  },
  {
    title: "Services tiers",
    body: [
      "Edukora repose sur plusieurs prestataires techniques, notamment pour l'hébergement, le stockage et les services liés à l'infrastructure.",
      "Ces prestataires peuvent être modifiés ou remplacés afin d'améliorer le service.",
      "Les utilisateurs sont invités à consulter également les conditions applicables à ces services tiers lorsqu'elles les concernent.",
    ],
  },
  {
    title: "Responsabilité de l'utilisateur",
    body: ["L'utilisateur est responsable :"],
    list: [
      "de son utilisation du service ;",
      "des informations qu'il communique ;",
      "des contenus qu'il publie ;",
      "de la protection de ses identifiants ;",
      "du respect des droits des autres utilisateurs.",
    ],
  },
  {
    title: "Suspension du compte",
    body: ["Edukora peut suspendre ou supprimer un compte notamment en cas :"],
    list: [
      "de violation des CGU ;",
      "d'utilisation frauduleuse ;",
      "de tentative de piratage ;",
      "d'atteinte à la sécurité ;",
      "d'utilisation abusive ;",
      "de comportement portant atteinte aux autres utilisateurs.",
    ],
    extra: ["Lorsque cela est possible, l'utilisateur peut être informé du motif de la suspension."],
  },
  {
    title: "Suppression du compte",
    body: [
      "L'utilisateur peut demander la suppression de son compte en contactant : support@edukora.net",
      "La suppression peut être soumise aux obligations légales de conservation applicables.",
    ],
  },
  {
    title: "Protection des données",
    body: [
      "Les données personnelles sont traitées conformément à la Politique de confidentialité d'Edukora.",
      "La Politique de confidentialité fait partie intégrante du cadre contractuel applicable à l'utilisation de la plateforme.",
    ],
  },
  {
    title: "Modification des CGU",
    body: [
      "Edukora peut modifier les présentes CGU pour tenir compte de l'évolution de la plateforme, des services ou de la réglementation.",
      "La version publiée sur le site est la version applicable.",
    ],
  },
  {
    title: "Droit applicable et règlement des différends",
    body: [
      "Les présentes CGU sont soumises au droit ivoirien.",
      "En cas de différend, les parties s'efforceront de rechercher une solution amiable avant toute procédure judiciaire.",
      "À défaut de résolution amiable, le différend pourra être soumis aux juridictions ivoiriennes compétentes, sous réserve des règles impératives applicables.",
    ],
  },
  {
    title: "Contact",
    body: [
      "Pour toute question concernant les présentes CGU :",
      "Edukora - Soma Samaké FORGO — E-mail : contact@edukora.net — Support : support@edukora.net",
      "Téléphone : +225 07 09 14 15 45 — Adresse : 09 BP 989 Abidjan 09, Côte d'Ivoire",
    ],
  },
];

export default function Page() {
  return (
    <div className="text-on-surface" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface dark:bg-background z-50 flex items-center justify-between px-4 py-4 border-b border-outline-variant dark:border-outline">
<div className="flex items-center gap-4">
<a href="/" aria-label="Retour à l'accueil" className="active:scale-95 duration-150 p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors flex items-center justify-center text-primary dark:text-primary-fixed">
<span className="material-symbols-outlined">arrow_back</span>
</a>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Informations Légales</h1>
</div>
<div className="hidden md:flex gap-6 items-center">
<span className="font-headline font-bold text-primary dark:text-primary-fixed text-xl">Edukora</span>
</div>
</header>

<main className="max-w-4xl mx-auto px-4 md:px-8 py-8">

<div className="mb-12 text-center md:text-left">
<p className="text-secondary font-semibold uppercase tracking-wider text-sm mb-2">Conditions Générales d'Utilisation</p>
<h2 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4 leading-tight">Nos Engagements Mutuels</h2>
<div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-full border border-outline-variant">
<span className="material-symbols-outlined text-sm text-outline">calendar_today</span>
<span className="text-label-sm font-medium text-on-surface-variant">Dernière mise à jour : 7 août 2026</span>
</div>
</div>

<div className="relative w-full h-48 md:h-64 mb-12 rounded-xl overflow-hidden shadow-sm border border-outline-variant">
<div className="absolute inset-0 bg-primary-container opacity-10"></div>
<div className="w-full h-full bg-cover bg-center" style={{"backgroundImage":"url('https://lh3.googleusercontent.com/aida-public/AB6AXuBv5H5ks9hN1y7yHD0Qfuo_0YbW1YQzOtEZPVPpV7EzvuZDhQtuCs3SfGQFMa65pHighBfRP8ir_QOvMmf5x35Wa2lmZNy4tM_TwfAOo78F2vZCaB118nHBAW6aqeVr7uXCrn_rjPrq6TOUvM0QUjJNxG_g6xYfHm-TRxIa6leB3sYU-XwT8h4XBW7ZB0s1skndxKq926xLGhJy5ef1TC9hYl99n12dWJ6AjlrhLvMYkLZecLyNBkij')"}}></div>
<div className="absolute inset-0 flex items-center justify-center">
<div className="bg-surface/80 backdrop-blur-md px-6 py-4 rounded-xl border border-white/50 shadow-lg text-center">
<p className="font-headline font-bold text-primary text-lg">Transparence &amp; Réussite</p>
<p className="text-on-surface-variant text-sm">Préparez votre BAC en toute sérénité</p>
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
<p className="text-on-surface-variant/70 mb-6 max-w-md">Notre équipe support est disponible pour clarifier tout point concernant ces conditions.</p>
<button className="px-8 py-3 bg-secondary-container text-on-secondary-container font-bold rounded-xl active:scale-95 transition-all hover:bg-secondary-fixed duration-200">
                Contacter le support
            </button>
</div>
<footer className="mt-12 text-center text-on-surface-variant text-sm pb-12">
<p>© 2026 Edukora - Tous droits réservés.</p>
<div className="mt-4 flex justify-center gap-4 text-primary font-medium">
<a className="hover:underline" href="/politique-de-confidentialit">Confidentialité</a>
<span className="text-outline-variant">|</span>
<a className="hover:underline" href="/mentions-l-gales">Mentions légales</a>
</div>
</footer>
</main>

<button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50">
<span className="material-symbols-outlined">help_center</span>
</button>

    </div>
  );
}
