import * as Sentry from "@sentry/nextjs";

if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,

    dataCollection: {
      // Allow sending user data and HTTP data
      // userInfo: true,
      // httpBodies: [],
    },
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    environment: process.env.NODE_ENV,
    release: process.env.SENTRY_RELEASE,

    enableLogs: true,
  });
}