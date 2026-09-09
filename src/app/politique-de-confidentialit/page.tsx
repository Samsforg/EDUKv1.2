import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité d'Edukora : quelles données nous collectons, pourquoi et comment nous protégeons votre vie privée.",
  alternates: { canonical: "/politique-de-confidentialit" },
};

type Section = { title: string; body?: string[]; list?: string[]; extra?: string[]; subsections?: { title: string; body?: string[]; list?: string[]; extra?: string[] }[] };

const sections: Section[] = [
  {
    title: "Introduction",
    body: [
      "La protection des données personnelles des utilisateurs constitue une priorité pour Edukora.",
      "La présente Politique de confidentialité explique comment Edukora collecte, utilise, conserve et protège les données personnelles des utilisateurs de sa plateforme.",
      "Elle s'applique au site https://edukora.net, à ses fonctionnalités et aux services numériques associés.",
      "Edukora applique notamment les principes prévus par la loi n°2013-450 du 19 juin 2013 relative à la protection des données à caractère personnel en Côte d'Ivoire.",
    ],
  },
  {
    title: "Responsable du traitement",
    body: [
      "Le responsable du traitement des données personnelles collectées par Edukora est :",
      "Soma Samaké FORGO",
      "Adresse : 09 BP 989 Abidjan 09, Côte d'Ivoire — Téléphone : +225 07 09 14 15 45 — E-mail : somasamakeforgo@edukora.net",
    ],
  },
  {
    title: "Données collectées",
    body: ["Selon les fonctionnalités utilisées, Edukora peut collecter les catégories suivantes."],
    subsections: [
      {
        title: "Données d'identification",
        list: ["nom ;", "prénom ;", "adresse e-mail ;", "numéro de téléphone ;", "date de naissance lorsque nécessaire ;", "photo de profil lorsqu'elle est fournie volontairement."],
      },
      {
        title: "Données pédagogiques",
        body: ["Selon le profil de l'utilisateur :"],
        list: [
          "classe ou niveau scolaire ;",
          "matières étudiées ou enseignées ;",
          "progression ;",
          "résultats aux exercices ;",
          "résultats aux évaluations ;",
          "activités pédagogiques ;",
          "préférences d'apprentissage ;",
          "informations nécessaires au suivi pédagogique.",
        ],
      },
      {
        title: "Données de compte",
        body: ["Edukora peut traiter :"],
        list: [
          "identifiant utilisateur ;",
          "adresse e-mail ;",
          "informations nécessaires à l'authentification ;",
          "paramètres du compte ;",
          "préférences ;",
          "informations relatives à l'utilisation des fonctionnalités.",
        ],
        extra: ["Les mots de passe sont destinés à être protégés par des mécanismes de sécurité appropriés et ne doivent pas être conservés en clair."],
      },
      {
        title: "Données techniques",
        body: ["La plateforme peut automatiquement traiter certaines informations techniques, notamment :"],
        list: [
          "adresse IP ;",
          "type d'appareil ;",
          "système d'exploitation ;",
          "navigateur ;",
          "date et heure de connexion ;",
          "journaux techniques ;",
          "données relatives aux erreurs ;",
          "informations de sécurité.",
        ],
        extra: ["Ces données sont notamment utilisées pour assurer la sécurité, diagnostiquer les problèmes et améliorer les performances."],
      },
      {
        title: "Contenus fournis par l'utilisateur",
        body: ["Lorsque l'utilisateur utilise les fonctionnalités correspondantes, il peut fournir :"],
        list: [
          "questions ;",
          "réponses ;",
          "messages ;",
          "commentaires ;",
          "documents ;",
          "fichiers ;",
          "contenus pédagogiques ;",
          "informations saisies dans le Tuteur IA.",
        ],
      },
    ],
  },
  {
    title: "Utilisateurs mineurs",
    body: [
      "Edukora pouvant être utilisé par des élèves mineurs, une attention particulière est accordée à la protection de leurs données personnelles.",
      "Edukora cherche à limiter la collecte aux données nécessaires au fonctionnement du service.",
      "Lorsque la réglementation applicable exige l'autorisation ou l'intervention d'un parent ou représentant légal, Edukora met en œuvre les mécanismes appropriés.",
      "Les données personnelles des élèves ne sont pas vendues à des tiers.",
      "Elles ne sont pas destinées à être utilisées pour proposer de la publicité comportementale ciblée aux élèves.",
    ],
  },
  {
    title: "Finalités",
    body: ["Les données peuvent être utilisées pour :"],
    list: [
      "créer et gérer les comptes ;",
      "authentifier les utilisateurs ;",
      "fournir les services pédagogiques ;",
      "personnaliser l'expérience d'apprentissage ;",
      "suivre la progression ;",
      "proposer des exercices adaptés ;",
      "permettre l'utilisation du Tuteur IA ;",
      "assurer le support ;",
      "communiquer avec les utilisateurs ;",
      "sécuriser la plateforme ;",
      "prévenir les fraudes et abus ;",
      "améliorer les fonctionnalités ;",
      "analyser les performances techniques ;",
      "respecter les obligations légales.",
    ],
    extra: ["Edukora ne doit utiliser les données personnelles que pour des finalités compatibles avec celles pour lesquelles elles ont été collectées."],
  },
  {
    title: "Tuteur IA",
    body: [
      "Lorsqu'un utilisateur utilise le Tuteur IA, les informations saisies dans la conversation peuvent être transmises aux services techniques nécessaires à la génération de la réponse. Ces informations peuvent notamment comprendre :",
    ],
    list: [
      "la question posée ;",
      "le contexte pédagogique nécessaire ;",
      "les réponses précédentes de la conversation ;",
      "certaines informations liées au profil pédagogique lorsque cela est nécessaire à la personnalisation.",
    ],
    extra: [
      "Edukora recommande aux utilisateurs de ne pas communiquer dans leurs conversations avec l'IA des informations personnelles sensibles qui ne sont pas nécessaires à leur demande.",
      "Le Tuteur IA est un outil d'assistance et ne constitue pas un enseignant humain.",
    ],
  },
  {
    title: "Prestataires techniques",
    body: ["Edukora utilise des prestataires techniques pour assurer le fonctionnement de sa plateforme."],
    list: [
      "Vercel : intervient notamment dans l'hébergement et le déploiement de l'application web. Vercel dispose de documents spécifiques relatifs à la protection des données et au traitement des données pour ses services.",
      "Néon : utilisé pour l'infrastructure de base de données d'Edukora. Les données nécessaires au fonctionnement de la plateforme peuvent donc être stockées dans cette infrastructure.",
      "LWS : intervient dans l'enregistrement et la gestion du nom de domaine edukora.net.",
      "GeniusPay : solution de paiement unifiée conçue spécifiquement pour simplifier l'encaissement des transactions pour les startups et les entreprises, particulièrement en Afrique. La plateforme sert de couche d'infrastructure technique (API) entre nos produits numériques et les différents fournisseurs de services financiers.",
    ],
    extra: ["D'autres prestataires pourront être ajoutés ultérieurement lorsque cela sera nécessaire au fonctionnement des services."],
  },
  {
    title: "Transfert de données",
    body: [
      "Certains prestataires techniques utilisés par Edukora peuvent traiter ou héberger des données en dehors de la Côte d'Ivoire.",
      "Lorsque cela est nécessaire, Edukora prend les mesures raisonnables afin d'assurer un niveau de protection approprié conformément à la réglementation applicable.",
    ],
  },
  {
    title: "Partage des données",
    body: ["Edukora peut communiquer certaines données à ses prestataires techniques lorsqu'elles sont nécessaires :"],
    list: [
      "à l'hébergement ;",
      "au stockage ;",
      "à l'authentification ;",
      "à la sécurité ;",
      "au support ;",
      "à l'envoi de communications ;",
      "au fonctionnement du Tuteur IA ;",
      "au traitement des paiements lorsque cette fonctionnalité sera disponible.",
    ],
    extra: ["Edukora ne vend pas les données personnelles de ses utilisateurs."],
  },
  {
    title: "Conservation des données",
    body: [
      "Les données sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles sont traitées.",
      "Les données liées à un compte peuvent être conservées pendant la durée d'utilisation du service.",
      "Après suppression du compte, certaines données peuvent être temporairement conservées lorsqu'elles sont nécessaires :",
    ],
    list: [
      "au respect d'une obligation légale ;",
      "à la résolution d'un litige ;",
      "à la sécurité ;",
      "à la prévention de la fraude ;",
      "à la conservation de preuves.",
    ],
    extra: ["Lorsque leur conservation n'est plus nécessaire, les données sont supprimées ou anonymisées lorsque cela est techniquement et légalement approprié."],
  },
  {
    title: "Sécurité",
    body: ["Edukora met en œuvre des mesures raisonnables de sécurité afin de protéger les données personnelles. Ces mesures peuvent notamment comprendre :"],
    list: [
      "chiffrement HTTPS des communications ;",
      "contrôle des accès ;",
      "authentification ;",
      "gestion des permissions ;",
      "protection des bases de données ;",
      "sauvegardes ;",
      "surveillance des erreurs et incidents ;",
      "limitation des accès aux données.",
    ],
  },
  {
    title: "Droits des personnes",
    body: ["Conformément à la réglementation ivoirienne applicable, les personnes concernées peuvent disposer notamment de droits :"],
    list: [
      "d'information ;",
      "d'accès ;",
      "de rectification ;",
      "d'opposition dans les conditions prévues par la réglementation ;",
      "de suppression ou d'effacement lorsque les conditions légales sont réunies ;",
      "de retrait du consentement lorsque le traitement repose sur celui-ci.",
    ],
  },
  {
    title: "Exercice des droits",
    body: [
      "Pour toute demande relative aux données personnelles, l'utilisateur peut contacter :",
      "Soma Samaké FORGO",
      "E-mail : somasamakeforgo@edukora.net — E-mail général : contact@edukora.net — Support : support@edukora.net — Téléphone : +225 07 09 14 15 45",
      "Afin d'éviter toute divulgation à une personne non autorisée, Edukora peut demander des informations permettant de vérifier l'identité du demandeur lorsque cela est nécessaire.",
    ],
  },
  {
    title: "Cookies",
    body: ["Edukora peut utiliser des cookies ou technologies similaires pour :"],
    list: [
      "maintenir la connexion ;",
      "sécuriser les comptes ;",
      "mémoriser certaines préférences ;",
      "assurer le fonctionnement de la plateforme ;",
      "mesurer les performances techniques.",
    ],
    extra: ["Les cookies non nécessaires sont utilisés conformément aux règles applicables."],
  },
  {
    title: "Sécurité des comptes",
    body: [
      "L'utilisateur est responsable de la confidentialité de ses identifiants.",
      "Il doit choisir un mot de passe suffisamment robuste et ne pas le communiquer à une autre personne.",
      "Toute suspicion d'accès non autorisé doit être signalée rapidement à : support@edukora.net",
    ],
  },
  {
    title: "Modifications de la politique",
    body: ["Edukora peut modifier la présente politique afin de tenir compte :"],
    list: [
      "de l'évolution de la plateforme ;",
      "de l'ajout de nouveaux services ;",
      "de l'évolution des prestataires techniques ;",
      "de l'évolution de la réglementation.",
    ],
    extra: ["La date de dernière mise à jour figure en haut de cette page."],
  },
  {
    title: "Contact",
    body: [
      "Pour toute question concernant cette Politique de confidentialité :",
      "Soma Samaké FORGO",
      "09 BP 989 Abidjan 09, Côte d'Ivoire — Téléphone : +225 07 09 14 15 45",
      "E-mail : somasamakeforgo@edukora.net — Contact général : contact@edukora.net — Support : support@edukora.net",
    ],
  },
];

const navLabels = [
  "Responsable du traitement",
  "Données collectées",
  "Utilisateurs mineurs",
  "Finalités",
  "Tuteur IA",
  "Prestataires techniques",
  "Conservation",
  "Droits des personnes",
  "Exercice des droits",
  "Sécurité",
];

export default function Page() {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col scroll-smooth" style={{ minHeight: "max(884px, 100dvh)" }}>

<header className="w-full sticky top-0 bg-surface dark:bg-background z-50 border-b border-outline-variant dark:border-outline glass-header">
<div className="flex items-center justify-between px-4 py-2 w-full max-w-5xl mx-auto">
<div className="flex items-center gap-4">
<Link href="/" aria-label="Retour à l'accueil" className="p-2 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors active:scale-95 duration-150 flex items-center justify-center">
<span className="material-symbols-outlined text-primary dark:text-primary-fixed" data-icon="arrow_back">arrow_back</span>
</Link>
<h1 className="font-headline text-headline-md font-semibold text-primary dark:text-primary-fixed">Informations Légales</h1>
</div>
<div className="hidden md:block">
<span className="font-headline font-bold text-primary dark:text-primary-fixed">Edukora</span>
</div>
</div>
</header>
<main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8 md:py-12">

<div className="mb-12 text-center md:text-left">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-semibold mb-4">
<span className="material-symbols-outlined text-[16px]" data-icon="verified_user">verified_user</span>
                Confidentialité &amp; Sécurité
            </div>
<h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">Politique de Confidentialité</h2>
<p className="text-on-surface-variant flex items-center justify-center md:justify-start gap-2">
<span className="material-symbols-outlined text-[18px]" data-icon="calendar_today">calendar_today</span>
                Dernière mise à jour : 8 août 2026
            </p>
</div>

<div className="grid grid-cols-1 md:grid-cols-12 gap-8">

<aside className="hidden md:block md:col-span-3 sticky top-24 h-fit">
<nav className="flex flex-col gap-2">
{sections.slice(1, 11).map((s) => (
<a key={s.title} className="px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-primary border-l-2 border-transparent hover:border-primary transition-all" href={`#s-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>{s.title}</a>
))}
</nav>
</aside>

<div className="md:col-span-9 space-y-12">

{sections.map((s, i) => (
<section key={s.title} className="scroll-mt-24" id={`s-${s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
<div className="flex items-center gap-3 mb-6">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined" data-icon="inventory_2">inventory_2</span>
</div>
<h3 className="text-xl font-bold text-on-surface">{i + 1}. {s.title}</h3>
</div>
<div className="bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
{s.body?.map((p) => (
<p key={p} className="text-body-md text-on-surface-variant leading-relaxed mb-4">{p}</p>
))}
{s.list && (
<ul className="space-y-3">
{s.list.map((li) => (
<li key={li} className="flex items-start gap-3 text-sm text-on-surface">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5" data-icon="check_circle">check_circle</span>
<span>{li}</span>
</li>
))}
</ul>
)}
{s.subsections && (
<div className="space-y-6 mt-2">
{s.subsections.map((sub) => (
<div key={sub.title}>
<h4 className="font-bold text-on-surface mb-3">{sub.title}</h4>
{sub.body?.map((p) => (
<p key={p} className="text-body-md text-on-surface-variant leading-relaxed mb-3">{p}</p>
))}
{sub.list && (
<ul className="space-y-2">
{sub.list.map((li) => (
<li key={li} className="flex items-start gap-3 text-sm text-on-surface">
<span className="material-symbols-outlined text-primary text-[20px] mt-0.5" data-icon="check_circle">check_circle</span>
<span>{li}</span>
</li>
))}
</ul>
)}
{sub.extra?.map((p) => (
<p key={p} className="text-body-md text-on-surface-variant leading-relaxed mt-3">{p}</p>
))}
</div>
))}
</div>
)}
{s.extra?.map((p) => (
<p key={p} className="text-body-md text-on-surface-variant leading-relaxed mt-4">{p}</p>
))}
</div>
</section>
))}

<div className="mt-16 pt-12 border-t border-outline-variant text-center">
<p className="text-on-surface-variant mb-6">Des questions sur la gestion de vos données ?</p>
<button className="bg-secondary text-on-secondary px-8 py-3 rounded-xl font-bold hover:opacity-90 active:scale-95 transition-all shadow-md">
                        Contacter le Délégué à la Protection (DPO)
                    </button>
<p className="mt-8 text-xs text-on-surface-variant flex items-center justify-center gap-1">
<span className="material-symbols-outlined text-[14px]" data-icon="copyright">copyright</span>
                        2026 Edukora - Tous droits réservés.
                    </p>
</div>
</div>
</div>
</main>

<div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
<div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]"></div>
<div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-secondary/5 rounded-full blur-[100px]"></div>
</div>
<script>
        // Simple Interaction for navigation highlighting
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('aside nav a');

        window.addEventListener('scroll', () =&gt; &#123;
            let current = '';
            sections.forEach(section =&gt; &#123;
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset &gt;= sectionTop - 120) &#123;
                    current = section.getAttribute('id');
                &#125;
            &#125;);

            navLinks.forEach(link =&gt; &#123;
                link.classList.remove('text-primary', 'border-primary');
                link.classList.add('text-on-surface-variant', 'border-transparent');
                if (link.getAttribute('href').includes(current)) &#123;
                    link.classList.add('text-primary', 'border-primary');
                    link.classList.remove('text-on-surface-variant', 'border-transparent');
                &#125;
            &#125;);
        &#125;);
    </script>

    </div>
  );
}
