import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = [
  "/",
  "/fonctionnalites",
  "/resultats",
  "/tarifs",
  "/landing-page-edukora-marketing",
  "/connexion-edukora",
  "/connexion-administrateur-edukora",
  "/inscription-1-2-edukora",
  "/mot-de-passe-oubli-edukora",
  "/reinitialiser-mot-de-passe",
  "/offline",
  "/icons",
  "/_next",
  "/api/auth",
  "/api/health",
  "/api/series",
  "/api/premium/webhook",
  "/manifest.webmanifest",
];

const TEACHER_ROUTES = ["/prof", "/api/prof"];
const ADMIN_ROUTES = ["/admin", "/api/admin"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip static files, _next, icons
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/icons") ||
    pathname.includes(".") && !pathname.endsWith(".json")
  ) {
    return NextResponse.next();
  }

  // Public routes — always allowed
  if (PUBLIC_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"))) {
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
    "/((?!_next/static|_next/image|favicon.ico|icons/).*)",
  ],
};