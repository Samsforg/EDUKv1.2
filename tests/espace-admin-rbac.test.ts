import { NextRequest } from "next/server";
import { createHmac } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { proxy } from "@/proxy";

// Fixture de test uniquement (meme convention que tests/proxy-role-resolution.test.ts).
// Ce n'est pas un secret de production.
const SECRET = "espace-admin-rbac-unit-test-secret-0123456789";
process.env.SESSION_SECRET = SECRET;

// Reproduit la production PostgreSQL : le role provient de `queryOne()`.
// table `users` en base, pas de SQLite deployee.
const pgUsers = new Map<number, string>();

const queryOneMock = jest.fn(async (sql: string, ...params: unknown[]) => {
  if (/select\s+role\s+from\s+users\s+where\s+id/i.test(sql)) {
    const uid = Number(params[0]);
    const role = pgUsers.get(uid);
    return role ? { role } : undefined;
  }
  return undefined;
});

jest.mock("@/lib/db", () => ({
  queryOne: (...a: unknown[]) =>
    (queryOneMock as (...x: unknown[]) => Promise<unknown>)(...a),
  getDb: () => ({ prepare: () => ({ get: () => undefined }) }),
}));

function sessionToken(uid: number): string {
  const payload = Buffer.from(
    JSON.stringify({ uid, exp: Date.now() + 86400000 }),
  ).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `v1.${payload}.${signature}`;
}

function req(path: string, token?: string): NextRequest {
  const headers = new Headers();
  headers.set("host", "edukora.net");
  if (token) headers.set("cookie", `edukora_session=${token}`);
  return new NextRequest(`https://edukora.net${path}`, { method: "GET", headers });
}

const isAllowed = (res: { headers: Headers }): boolean =>
  res.headers.get("x-middleware-next") === "1";

beforeEach(() => {
  pgUsers.clear();
  queryOneMock.mockClear();
});

// ---------------------------------------------------------------------------
// 1. Comportement du proxy (edge) : /espace-admin vs /admin vs /api/admin
// ---------------------------------------------------------------------------

describe("3b.19 / RBAC espace-admin : comportement du proxy", () => {
  it("Test 1 - anonyme sur /espace-admin : 307 vers la connexion ADMIN", async () => {
    const res = await proxy(req("/espace-admin"));

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain(
      "/connexion-administrateur-edukora",
    );
  });

  it("Test 1b - sous-page /espace-admin/* : 307 vers la connexion ADMIN", async () => {
    const res = await proxy(req("/espace-admin/utilisateurs"));

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain(
      "/connexion-administrateur-edukora",
    );
  });

  it("Test 2 - session invalide sur /espace-admin : 307 (fail-closed)", async () => {
    const forged = `v1.${Buffer.from(
      JSON.stringify({ uid: 1, exp: Date.now() + 86400000 }),
    ).toString("base64url")}.signature-bidon`;

    const res = await proxy(req("/espace-admin", forged));

    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain(
      "/connexion-administrateur-edukora",
    );
  });

  it("Test 3 - /espace-admin n'est PAS dans ADMIN_ROUTES : le proxy laisse passer", async () => {
    // Le proxy selectionne uniquement la page de connexion pour les anonymes
    // (isAdminPath). L'autorisation admin de /espace-admin est portee par le
    // garde serveur de chaque page, verifie plus bas (Tests 7 a 9).
    pgUsers.set(3001, "student");
    const src = readFileSync(
      join(__dirname, "..", "src", "proxy.ts"),
      "utf8",
    );

    expect(src).toMatch(/ADMIN_ROUTES\s*=\s*\["\/admin",\s*"\/api\/admin"\]/);
    expect(src).not.toMatch(/ADMIN_ROUTES\s*=\s*\[[^\]]*espace-admin/);

    // Consequence : un student traverse le proxy (x-middleware-next=1) et c'est
    // la page qui doit le rediriger. Aucune donnee n'est lue a ce stade.
    const res = await proxy(req("/espace-admin", sessionToken(3001)));
    expect(isAllowed(res)).toBe(true);
  });

  it("Test 4 - student sur /admin : 307 vers /accueil-edukora (protege par le proxy)", async () => {
    pgUsers.set(3002, "student");

    const res = await proxy(req("/admin", sessionToken(3002)));

    expect(isAllowed(res)).toBe(false);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/accueil-edukora");
  });

  it("Test 5 - student sur /api/admin/* : 403, jamais de fuite de donnees", async () => {
    pgUsers.set(3003, "student");

    for (const path of ["/api/admin/users", "/api/admin/test-accounts"]) {
      const res = await proxy(req(path, sessionToken(3003)));
      expect(res.status).toBe(403);
      expect((await res.json()).error).toMatch(/administrateurs/);
    }
  });

  it("Test 6 - anonyme sur /api/admin/* : 401", async () => {
    for (const path of ["/api/admin/users", "/api/admin/test-accounts"]) {
      expect((await proxy(req(path))).status).toBe(401);
    }
  });

  it("Test 6b - admin : /admin, /espace-admin et /api/admin/* sont accessibles", async () => {
    pgUsers.set(3004, "admin");
    const token = sessionToken(3004);

    for (const path of ["/admin", "/espace-admin", "/api/admin/users"]) {
      expect(isAllowed(await proxy(req(path, token)))).toBe(true);
    }
  });

  it("Test 6c - teacher : ni /admin ni /api/admin/* (equite de roles inchangee)", async () => {
    pgUsers.set(3005, "teacher");
    const token = sessionToken(3005);

    expect((await proxy(req("/admin", token))).status).toBe(307);
    expect((await proxy(req("/api/admin/users", token))).status).toBe(403);
  });

  it("Test 6d - pages normales : un student reste autorise", async () => {
    pgUsers.set(3006, "student");
    const token = sessionToken(3006);

    for (const path of ["/profil", "/accueil-edukora", "/api/notifications"]) {
      expect(isAllowed(await proxy(req(path, token)))).toBe(true);
    }
  });
});

// ---------------------------------------------------------------------------
// 2. Invariants sources : chaque page /espace-admin/** est reellement protegee
// ---------------------------------------------------------------------------

const ROOT = join(__dirname, "..");
const ADMIN_DIR = join(ROOT, "src", "app", "espace-admin");

function listAdminPages(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return listAdminPages(full);
    return entry === "page.tsx" ? [full] : [];
  });
}

const ADMIN_PAGES = listAdminPages(ADMIN_DIR);

/** Noms des fonctions de donnees importees depuis `@/lib/admin`. */
function adminDataFns(source: string): string[] {
  const names: string[] = [];
  for (const line of source.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("import")) continue;
    const from = trimmed.match(/from\s+"@\/lib\/admin"/);
    if (!from) continue;
    const clause = trimmed.slice(trimmed.indexOf("{") + 1, trimmed.indexOf("}"));
    for (const raw of clause.split(",")) {
      const name = raw.trim();
      if (name) names.push(name);
    }
  }
  return names;
}

/** Corps de la page sans les lignes d'import (les imports n'executent rien). */
function body(source: string): string {
  return source
    .split("\n")
    .filter((line) => !line.trim().startsWith("import"))
    .join("\n");
}

describe("3b.19 / RBAC espace-admin : invariants de chaque page", () => {
  it("Test 7 - l'inventaire des pages /espace-admin n'est pas vide", () => {
    expect(ADMIN_PAGES.length).toBeGreaterThanOrEqual(20);
  });

  it.each(ADMIN_PAGES.map((p) => [p.replace(ROOT, "").replace(/\\/g, "/"), p]))(
    "Test 8 - %s : impose le role admin",
    (_label, file) => {
      const source = readFileSync(file, "utf8");
      const code = body(source);

      expect(code).toMatch(/role\s*!==\s*"admin"/);
      expect(code).toMatch(/redirect\(/);
    },
  );

  it.each(ADMIN_PAGES.map((p) => [p.replace(ROOT, "").replace(/\\/g, "/"), p]))(
    "Test 9 - %s : le garde precede toute lecture de donnees admin",
    (_label, file) => {
      const source = readFileSync(file, "utf8");
      const code = body(source);

      const guardAt = code.search(/role\s*!==\s*"admin"/);
      expect(guardAt).toBeGreaterThanOrEqual(0);

      for (const fn of adminDataFns(source)) {
        const callAt = code.search(new RegExp(`\\b${fn}\\s*\\(`));
        if (callAt >= 0) {
          // Aucune requete de donnees admin ne doit preceder le garde :
          // sinon un non-admin declencherait une lecture avant d'etre rejete.
          expect({
            fn,
            ok: callAt > guardAt,
          }).toEqual({ fn, ok: true });
        }
      }
    },
  );

  it("Test 10 - aucune page n'interroge la base avant le garde de session", () => {
    for (const file of ADMIN_PAGES) {
      const code = body(readFileSync(file, "utf8"));
      const sessionAt = code.search(/getCurrentUser\s*\(/);
      expect(sessionAt).toBeGreaterThanOrEqual(0);

      const adminFn = adminDataFns(readFileSync(file, "utf8")).find((fn) =>
        new RegExp(`\\b${fn}\\s*\\(`).test(code),
      );
      if (adminFn) {
        const callAt = code.search(new RegExp(`\\b${adminFn}\\s*\\(`));
        expect(callAt).toBeGreaterThan(sessionAt);
      }
    }
  });
});