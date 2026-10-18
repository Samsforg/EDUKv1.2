import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    // P2.12.1 F3 — même minimisation que le config serveur : pas d'infos
    // utilisateur, pas de corps de requête envoyés à Sentry.
    dataCollection: {
      userInfo: false,
      httpBodies: [],
    },
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    environment: process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE,

    enableLogs: true,
  });
}