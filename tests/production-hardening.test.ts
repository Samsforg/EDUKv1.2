import { NextRequest, NextResponse } from "next/server";
import { setSessionCookie } from "@/lib/session";
import { GET as healthGET } from "@/app/api/health/route";
import sitemap from "@/app/sitemap";

const PROTECTED_ROUTES = [
  "/cours",
  "/matieres",
  "/fiches",
  "/quiz",
  "/forum",
  "/simulateur",
  "/correction-dissertation",
  "/espace-live",
  "/replays",
  "/ligues",
  "/classement",
];

const PUBLIC_ROUTES = ["/", "/blog", "/tarifs", "/resultats", "/annales", "/tuteur-ia-edukora"];

describe("A2 - sitemap : uniquement des routes publiques", () => {
  it("ne soumet aucune route exigeant une session", async () => {
    const entries = await sitemap();
    const paths = entries.map((e) => new URL(e.url).pathname.replace(/\/$/, "") || "/");

    for (const route of PROTECTED_ROUTES) {
      expect(paths).not.toContain(route);
    }
  });

  it("conserve les pages publiques legitimes", async () => {
    const entries = await sitemap();
    const paths = entries.map((e) => new URL(e.url).pathname.replace(/\/$/, "") || "/");

    for (const route of PUBLIC_ROUTES) {
      expect(paths).toContain(route);
    }
  });

  it("ne soumet aucune page de connexion", async () => {
    const entries = await sitemap();
    const paths = entries.map((e) => new URL(e.url).pathname);

    expect(paths).not.toContain("/connexion-edukora");
    expect(paths).not.toContain("/inscription-1-2-edukora");
    expect(paths).not.toContain("/connexion-administrateur-edukora");
  });
});

describe("A3 - /api/health : pas de fuite de donnees internes", () => {
  it("repond ok sans exposer le nombre d'utilisateurs", async () => {
    const res = await (healthGET as any)(new NextRequest("http://localhost/api/health"), {});
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.ok).toBe(true);
    expect(body.service).toBe("edukora-api");
    expect(body).not.toHaveProperty("users");
  });

  it("garde le tableau de diagnostics interne", async () => {
    const res = await (healthGET as any)(new NextRequest("http://localhost/api/health"), {});
    const body = await res.json();
    expect(Array.isArray(body.warnings)).toBe(true);
  });
});

describe("A5 - cookie de session : protection contre la deconnexion forcee", () => {
  it("est HttpOnly", () => {
    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, "jeton-de-test");
    expect(res.headers.get("set-cookie")).toContain("HttpOnly");
  });

  it("est SameSite=Lax, ce qui empeche un logout CSRF silencieux via sous-ressource", () => {
    const res = NextResponse.json({ ok: true });
    setSessionCookie(res, "jeton-de-test");
    expect(res.headers.get("set-cookie")).toMatch(/SameSite=Lax/i);
  });
});