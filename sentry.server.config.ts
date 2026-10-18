import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // P2.12.1 F3 — minimisation des données envoyées à Sentry :
    //  - userInfo: false       → pas d'email / id utilisateur en clair ;
    //  - httpBodies: []        → pas de corps de requête (peut contenir mots
    //    de passe, tokens, données personnelles).
    // Les en-têtes restent couverts par le nettoyage par défaut de Sentry.
    dataCollection: {
      userInfo: false,
      httpBodies: [],
    },
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    // Ne pas joindre les valeurs des variables locales aux frames de stack :
    // elles peuvent contenir des secrets (SESSION_SECRET, clés API) ou des
    // PII lues dans la requête. Désactivé par défaut côté sécurité.
    includeLocalVariables: false,

    environment: process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE,

    enableLogs: true,
  });
}