import { NextRequest, NextResponse } from "next/server";
import {
  AB_PRICING_COOKIE,
  AB_PRICING_MAX_AGE,
  assignPricingVariant,
  isPricingAbEnabled,
  isValidPricingVariant,
} from "@/lib/ab-test";

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
  "/api/cron/report",
  "/api/cron/abandoned",
  "/api/ads",
  "/api/promo/check",
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

  // Skip static files, _next, icons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".") && !pathname.endsWith(".json")
  ) {
    return NextResponse.next();
  }

  // Legacy /auth/* URLs (anciennes pages indexées par Google) -> bonnes routes
  for (const [from, to] of LEGACY_REDIRECTS) {
    if (pathname === from || pathname.startsWith(from + "/")) {
      return NextResponse.redirect(new URL(to, req.url), { status: 308 });
    }
  }

  // Public routes — always allowed
  if (PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
    if (pathname === "/tarifs" && isPricingAbEnabled()) {
      const forced = req.nextUrl.searchParams.get("ab_variant");
      let variant = forced ?? req.cookies.get(AB_PRICING_COOKIE)?.value ?? null;
      if (!isValidPricingVariant(variant)) variant = assignPricingVariant();
      const res = NextResponse.next();
      res.cookies.set(AB_PRICING_COOKIE, variant, {
        path: "/",
        maxAge: AB_PRICING_MAX_AGE,
        sameSite: "lax",
      });
      return res;
    }
    return NextResponse.next();
  }

  // Check session cookie
  const session = req.cookies.get("edukora_session")?.value;
  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Non connecté" }, { status: 401 });
    }
    const loginUrl = new URL("/connexion-edukora", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For now, we trust the cookie exists.
  // Role checks are done at the API/page level via getCurrentUser().
  // This middleware only ensures unauthenticated users can't access protected routes.

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!monitoring|_next/static|_next/image|favicon.ico|icons/).*)",
  ],
};