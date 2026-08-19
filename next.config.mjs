/** @type {import('next').NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";
import { fileURLToPath } from "node:url";

const polyfillLoaderPath = fileURLToPath(
  new URL("./scripts/polyfill-module-loader.cjs", import.meta.url)
);

const nextConfig = {
  experimental: {
    inlineCss: true,
  },
  turbopack: {
    rules: {
      // Next.js bundles its own polyfill-module (trimStart/trimEnd, Symbol.description,
      // flat/flatMap, Promise.finally, fromEntries, Array.prototype.at, Object.hasOwn,
      // URL.canParse) into every client entry via next/dist/client/app-globals.js.
      // All of them are Baseline and supported since Chrome/Edge 111, Firefox 111 and
      // Safari 16.4 (our browserslist targets), except URL.canParse (Safari 17+),
      // which this loader keeps. This drops ~1.4 kB of legacy polyfills per page.
      "**/polyfills/polyfill-module.js": {
        loaders: [polyfillLoaderPath],
        as: "*.js",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  async headers() {
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "worker-src 'self' blob:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join("; "),
      },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), payment=()",
      },
    ];
    return [
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  silent: !process.env.CI,
  telemetry: false,
});