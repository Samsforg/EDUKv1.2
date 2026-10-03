import { NextRequest } from "next/server";
import { createHmac } from "node:crypto";
import { proxy } from "@/proxy";

// Fixture de test uniquement (meme convention que tests/auth-csrf-a5.test.ts).
// Ce n'est pas un secret de production.
const SECRET = "proxy-role-unit-test-secret-0123456789abcdef";
process.env.SESSION_SECRET = SECRET;

// Reproduit fidelement la production PostgreSQL constatee en Phase 3b.16 :
//   - la table `users` est servie par PostgreSQL, accessible via `queryOne()` ;
//   - `getDb()` renvoie une base SQLite VIDE, car aucun data/edukora.db n'est
//     deploye en production (la base de production est PostgreSQL).
// L'ancien `getUserRole()` lisait via `getDb()` : il obtenait toujours undefined
// puis renvoyait null, et le proxy rejetait toute requete authentifiee.
const pgUsers = new Map<number, string>();
const sqlitePrepare = jest.fn(() => ({ get: () => undefined }));

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
  getDb: () => ({
    prepare: (...a: unknown[]) =>
      (sqlitePrepare as (...x: unknown[]) => unknown)(...a),
  }),
}));

function sessionToken(uid: number): string {
  const payload = Buffer.from(
    JSON.stringify({ uid, exp: Date.now() + 86400000 }),
  ).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `v1.${payload}.${signature}`;
}

function csrfToken(uid: number): string {
  return createHmac("sha256", SECRET).update(`csrf:${uid}`).digest("base64url");
}

function req(
  path: string,
  opts: { method?: string; token?: string; csrf?: string } = {},
): NextRequest {
  const headers = new Headers();
  headers.set("host", "edukora.net");
  if (opts.token) headers.set("cookie", `edukora_session=${opts.token}`);
  if (opts.csrf) headers.set("x-csrf-token", opts.csrf);
  return new NextRequest(`https://edukora.net${path}`, {
    method: opts.method ?? "GET",
    headers,
  });
}

const isAllowed = (res: { headers: Headers }): boolean =>
  res.headers.get("x-middleware-next") === "1";

beforeEach(() => {
  pgUsers.clear();
  queryOneMock.mockClear();
  sqlitePrepare.mockClear();
});

describe("3b.17 / resolution du role : PostgreSQL en production", () => {
  it("Test 1 - utilisateur PostgreSQL valide : role correctement recupere", async () => {
    pgUsers.set(4242, "admin");
    const res = await proxy(req("/admin", { token: sessionToken(4242) }));

    expect(queryOneMock).toHaveBeenCalledWith(
      "SELECT role FROM users WHERE id = ?",
      4242,
    );
    expect(isAllowed(res)).toBe(true);
  });

  it("Test 1b - la base SQLite locale n'est plus interrogee", async () => {
    pgUsers.set(4243, "admin");
    await proxy(req("/admin", { token: sessionToken(4243) }));

    expect(sqlitePrepare).not.toHaveBeenCalled();
  });

  it("Test 2 - utilisateur inexistant : acces refuse (fail-closed)", async () => {
    const res = await proxy(req("/admin", { token: sessionToken(999999) }));

    expect(isAllowed(res)).toBe(false);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/connexion-edukora");
  });

  it("Test 2b - utilisateur inexistant sur /api/* : 401", async () => {
    const res = await proxy(req("/api/notifications", { token: sessionToken(999999) }));

    expect(res.status).toBe(401);
    expect((await res.json()).error).toMatch(/Utilisateur introuvable/);
  });

  it("Test 3 - utilisateur authentifie : le role autorise ou refuse (RBAC)", async () => {
    pgUsers.set(5001, "student");
    expect(isAllowed(await proxy(req("/profil", { token: sessionToken(5001) })))).toBe(true);

    pgUsers.set(5002, "teacher");
    expect(isAllowed(await proxy(req("/prof", { token: sessionToken(5002) })))).toBe(true);

    pgUsers.set(5003, "student");
    const admin = await proxy(req("/admin", { token: sessionToken(5003) }));
    expect(admin.headers.get("location")).toContain("/accueil-edukora");
  });

  it("Test 4 - sans session : acces refuse", async () => {
    const page = await proxy(req("/profil"));
    expect(page.status).toBe(307);
    expect(page.headers.get("location")).toContain("/connexion-edukora");

    const api = await proxy(req("/api/notifications"));
    expect(api.status).toBe(401);
    expect((await api.json()).error).toMatch(/Non connect/);
  });

  it("Test 5 - /api/csrf : atteignable si authentifie, refuse sinon", async () => {
    pgUsers.set(6001, "student");

    const authed = await proxy(req("/api/csrf", { token: sessionToken(6001) }));
    expect(isAllowed(authed)).toBe(true);

    const anon = await proxy(req("/api/csrf"));
    expect(anon.status).toBe(401);
  });

  it("Test 6 - POST /api/auth/logout avec CSRF valide atteint la route", async () => {
    pgUsers.set(7001, "student");

    const res = await proxy(
      req("/api/auth/logout", {
        method: "POST",
        token: sessionToken(7001),
        csrf: csrfToken(7001),
      }),
    );
    expect(isAllowed(res)).toBe(true);
  });

  it("Test 6b - POST logout sans CSRF : 403, la session reste constatee", async () => {
    pgUsers.set(7002, "student");

    const res = await proxy(
      req("/api/auth/logout", { method: "POST", token: sessionToken(7002) }),
    );
    expect(res.status).toBe(403);
  });

  it("Test 6c - POST logout anonyme : 401", async () => {
    const res = await proxy(req("/api/auth/logout", { method: "POST" }));
    expect(res.status).toBe(401);
  });

  it("Test 5b - une erreur de base de donnees ne doit jamais ouvrir l'acces", async () => {
    queryOneMock.mockImplementationOnce(async () => {
      throw new Error("base indisponible");
    });

    const res = await proxy(req("/admin", { token: sessionToken(8001) }));
    expect(isAllowed(res)).toBe(false);
    expect(res.headers.get("location")).toContain("/connexion-edukora");
  });
});