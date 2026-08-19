import * as Sentry from "@sentry/nextjs";

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    dataCollection: {
      // To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
      // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#dataCollection
      // userInfo: false,
      // httpBodies: [],
    },

    // 100% in dev, 10% in production
    tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

    // Session Replay: disabled for normal sessions (rrweb snapshotting
    // forces layout reads and hurts FCP/LCP), kept only on errors
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,

    environment: process.env.NODE_ENV,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,

    enableLogs: true,

    integrations: [Sentry.replayIntegration()],
  });
}

// Hook into App Router navigation transitions (App Router only)
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;