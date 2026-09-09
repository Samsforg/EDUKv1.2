import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";
import { createHash } from "node:crypto";
import {
  AB_PRICING_COOKIE,
  AB_PRICING_MAX_AGE,
  assignPricingVariant,
  isPricingAbEnabled,
  isValidPricingVariant,
} from "@/lib/ab-test";

function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Buffer.from(array).toString("base64");
}

function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "edukora-session-secret-v1-demo";
  return null;
}

function signToken(payload: string): string {
  const secret = sessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function verifySession(token: string): { uid: number; exp: number } | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "v1") return null;
  const [, payload, sig] = parts;
  const expected = signToken(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (typeof data.uid !== "number" || typeof data.exp !== "number") return null;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

function verifyCsrf(req: NextRequest, session: { uid: number } | null): boolean {
  if (!session) return false;
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) return false;
    } catch {
      return false;
    }
  }
  const csrfToken = req.headers.get("x-csrf-token");
  if (!csrfToken) return false;
  const secret = sessionSecret();
  if (!secret) return false;
  const expected = createHmac("sha256", secret)
    .update(`csrf:${session.uid}`)
    .digest("base64url");
  const a = Buffer.from(csrfToken);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

const CSP_BASE = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https: https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://www.googleadservices.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://region1.analytics.google.com https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://pagead2.googlesyndication.com https://adservice.google.com https://adservice.google.de",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
].join("; ");

function withCspHeaders(res: NextResponse, nonce: string): NextResponse {
  const csp = `${CSP_BASE}; script-src 'self' 'unsafe-inline' 'nonce-${nonce}' https://www.googletagmanager.com https://www.clarity.ms https://*.clarity.ms https://pagead2.googlesyndication.com https://adservice.google.com`;
  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Content-Security-Policy", csp);
  res.headers.set("X-Nonce", nonce);
  return res;
}

function withSecurityHeaders(res: NextResponse, nonce?: string): NextResponse {
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  if (nonce) return withCspHeaders(res, nonce);
  return res;
}

const PUBLIC_ROUTES = [
  "/",
  "/blog",
  "/fonctionnalites",
  "/resultats",
  "/parrainage",
  "/tarifs",
  "/landing-page-edukora-marketing",
  "/tuteur-ia-edukora",
  "/simulateur-d-examen-bac-bepc",
  "/plans-d-abonnement-edukora-1",
  "/inscription-2-2-toutes-les-s-ries",
  "/inscription-2-2-d-tails-acad-miques",
  "/connexion-edukora",
  "/connexion-administrateur-edukora",
  "/connexion-parent-edukora",
  "/connexion-expert-edukora",
  "/inscription-1-2-edukora",
  "/inscription-expert-1-3-infos-personnelles",
  "/inscription-expert-2-3-titres-acad-miques",
  "/inscription-expert-3-3-soumission-r-ussie",
  "/inscription-parent-edukora",
  "/mot-de-passe-oubli-edukora",
  "/mot-de-passe-oubli-experts-edukora",
  "/reinitialiser-mot-de-passe",
  "/offline",
  "/icons",
  "/_next",
  "/mentions-l-gales",
  "/conditions-g-n-rales-d-utilisation",
  "/conditions-g-n-rales-de-vente-paiements",
  "/politique-de-confidentialit",
  "/pr-f-rences-de-cookies-et-donn-es",
  "/api/auth",
  "/api/health",
  "/api/series",
  "/api/newsletter",
  "/api/tutor/demo",
  "/api/premium/webhook",
  "/api/premium/plans",
  "/api/warmup",
  "/api/cron/reminders",
  "/api/cron/streak",
  "/api/cron/targeted-push",
  "/api/cron/reactivation",
  "/api/cron/sms-reminders",
  "/api/cron/report",
  "/api/cron/abandoned",
  "/api/cron/backup",
  "/api/cron/parent-report",
  "/api/cron/bourse",
  "/api/ads",
  "/api/analytics/track",
  "/api/promo/check",
  "/annales",
  "/statut",
];

const TEACHER_ROUTES = ["/prof", "/api/prof"];
const ADMIN_ROUTES = ["/admin", "/api/admin"];

const LEGACY_REDIRECTS: Array<[string, string]> = [
  ["/auth/register", "/inscription-1-2-edukora"],
  ["/auth/login", "/connexion-edukora"],
  ["/auth/logout", "/"],
  ["/auth", "/connexion-edukora"],
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const nonce = generateNonce();

  // Skip static files, _next, icons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".") && !pathname.endsWith(".json")
  ) {
    return withSecurityHeaders(NextResponse.next(), nonce);
  }

  // Legacy /auth/* URLs (anciennes pages indexées par Google) -> bonnes routes
  for (const [from, to] of LEGACY_REDIRECTS) {
    if (pathname === from || pathname.startsWith(from + "/")) {
      return withSecurityHeaders(NextResponse.redirect(new URL(to, req.url), { status: 308 }), nonce);
    }
  }

  // Public routes — always allowed
  if (PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    if (pathname === "/tarifs" && isPricingAbEnabled()) {
      const forced = req.nextUrl.searchParams.get("ab_variant");
      let variant = forced ?? req.cookies.get(AB_PRICING_COOKIE)?.value ?? null;
      if (!isValidPricingVariant(variant)) variant = assignPricingVariant();
      const res = withSecurityHeaders(NextResponse.next(), nonce);
      res.cookies.set(AB_PRICING_COOKIE, variant, {
        path: "/",
        maxAge: AB_PRICING_MAX_AGE,
        sameSite: "lax",
      });
      return res;
    }
    return withSecurityHeaders(NextResponse.next(), nonce);
  }

  // Check session cookie
  const sessionToken = req.cookies.get("edukora_session")?.value;
  if (!sessionToken) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }
    const loginUrl = new URL("/connexion-edukora", req.url);
    loginUrl.searchParams.set("from", pathname);
    return withSecurityHeaders(NextResponse.redirect(loginUrl), nonce);
  }

  const session = verifySession(sessionToken);
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Session invalide" }, { status: 401 });
    }
    const loginUrl = new URL("/connexion-edukora", req.url);
    return withSecurityHeaders(NextResponse.redirect(loginUrl), nonce);
  }

  if (pathname.startsWith("/api/") && (req.method === "POST" || req.method === "PUT" || req.method === "PATCH" || req.method === "DELETE")) {
    if (!verifyCsrf(req, session)) {
      const csrfToken = req.headers.get("x-csrf-token");
      if (!csrfToken) {
        return NextResponse.json(
          { error: "Token CSRF manquant. Ajoutez x-csrf-token dans les en-têtes." },
          { status: 403 },
        );
      }
      return NextResponse.json({ error: "Token CSRF invalide" }, { status: 403 });
    }
  }

  return withSecurityHeaders(NextResponse.next(), nonce);
}

export const config = {
  matcher: [
    "/((?!monitoring|_next/static|_next/image|favicon.ico|icons/).*)",
  ],
};