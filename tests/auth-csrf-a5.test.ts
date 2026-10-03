import { NextRequest } from "next/server";
import { createHmac, randomBytes } from "node:crypto";
import { run, queryOne } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { GET as logoutGET, POST as logoutPOST } from "@/app/api/auth/logout/route";
import { POST as forgotPOST } from "@/app/api/auth/forgot/route";
import { POST as resetPOST } from "@/app/api/auth/reset/route";
import { proxy } from "@/proxy";

const SECRET = "a5-unit-test-session-secret-0123456789abcdef";
process.env.SESSION_SECRET = SECRET;

const mockCookies = new Map<string, string>();
jest.mock("next/headers", () => ({
  cookies: async () => ({
    get: (n: string) => (mockCookies.has(n) ? { name: n, value: mockCookies.get(n) } : undefined),
  }),
}));

const mockDestroySession = jest.fn(async (..._a: unknown[]) => {});
const mockClearSessionCookie = jest.fn((..._a: unknown[]) => undefined);
jest.mock("@/lib/session", () => ({
  destroySession: (...a: unknown[]) => mockDestroySession(...a),
  clearSessionCookie: (...a: unknown[]) => mockClearSessionCookie(...a),
}));

const mockSendMail = jest.fn(async (..._a: unknown[]) => true);
jest.mock("@/lib/mailer", () => ({
  sendMail: (...a: unknown[]) => mockSendMail(...a),
  resetPasswordHtml: () => "<html></html>",
  sendWelcomeEmail: jest.fn(async () => true),
}));

jest.mock("@/lib/rate-limit", () => ({
  rateLimit: async () => ({ allowed: true, remaining: 100, resetAt: Date.now() + 900000 }),
  rateLimitResponse: () => new Response(null, { status: 429 }),
  getClientIp: () => "203.0.113.77",
}));

function sessionToken(uid: number): string {
  const payload = Buffer.from(JSON.stringify({ uid, exp: Date.now() + 86400000 })).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(payload).digest("base64url");
  return `v1.${payload}.${signature}`;
}
function csrfToken(uid: number): string {
  return createHmac("sha256", SECRET).update(`csrf:${uid}`).digest("base64url");
}

function proxyReq(
  path: string,
  opts: { method?: string; token?: string; csrf?: string; origin?: string; host?: string | null } = {},
): NextRequest {
  const headers = new Headers();
  if (opts.token) headers.set("cookie", `edukora_session=${opts.token}`);
  if (opts.csrf) headers.set("x-csrf-token", opts.csrf);
  if (opts.origin) headers.set("origin", opts.origin);
  // Un navigateur envoie toujours Host ; null permet de tester le cas fail-closed.
  if (opts.host === null) headers.delete("host");
  else headers.set("host", opts.host ?? "edukora.net");
  return new NextRequest(`https://edukora.net${path}`, {
    method: opts.method ?? "GET",
    headers,
  });
}

function jsonReq(path: string, body: unknown): NextRequest {
  return new NextRequest(`http://localhost${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

let userId = 0;
let userEmail = "";

beforeAll(async () => {
  userEmail = `a5-${Date.now()}@test.ci`;
  await run(
    "INSERT INTO users (role, email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?, ?)",
    "student",
    userEmail,
    hashPassword("MotDePasseInitial123"),
    "A5",
    "Test",
  );
  const row = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", userEmail);
  userId = row!.id;
});

afterAll(async () => {
  await run("DELETE FROM password_resets WHERE user_id = ?", userId);
  await run("DELETE FROM users WHERE id = ?", userId);
});

beforeEach(() => {
  mockDestroySession.mockClear();
  mockClearSessionCookie.mockClear();
  mockSendMail.mockClear();
  mockCookies.clear();
});

describe("A5 / proxy : le logout n'est plus dans PUBLIC_ROUTES", () => {
  it("rejette /api/auth/logout sans session (avant : route publique)", async () => {
    const res = await proxy(proxyReq("/api/auth/logout", { method: "POST" }));
    expect(res.status).toBe(401);
    expect(res.headers.get("x-middleware-next")).toBeNull();
  });

  it("laisse passer les endpoints de pre-authentification sans session", async () => {
    for (const path of [
      "/api/auth/login",
      "/api/auth/register",
      "/api/auth/forgot",
      "/api/auth/reset",
      "/api/auth/me",
    ]) {
      const res = await proxy(proxyReq(path, { method: path === "/api/auth/me" ? "GET" : "POST" }));
      expect(res.headers.get("x-middleware-next")).toBe("1");
    }
  });
});

describe("A5 / proxy : POST logout exige un CSRF valide", () => {
  it("Test 2 - refuse POST sans en-tete x-csrf-token", async () => {
    const res = await proxy(proxyReq("/api/auth/logout", { method: "POST", token: sessionToken(userId) }));
    expect(res.status).toBe(403);
    expect((await res.json()).error).toMatch(/CSRF/i);
  });

  it("Test 6 - refuse POST avec un token CSRF invalide", async () => {
    const res = await proxy(
      proxyReq("/api/auth/logout", {
        method: "POST",
        token: sessionToken(userId),
        csrf: "token-bidon",
      }),
    );
    expect(res.status).toBe(403);
  });

  it("Test 6 - refuse POST avec le token CSRF d'un autre utilisateur", async () => {
    const res = await proxy(
      proxyReq("/api/auth/logout", {
        method: "POST",
        token: sessionToken(userId),
        csrf: csrfToken(userId + 9999),
      }),
    );
    expect(res.status).toBe(403);
  });

  it("Test 3 - accepte POST avec session et CSRF valides", async () => {
    const res = await proxy(
      proxyReq("/api/auth/logout", {
        method: "POST",
        token: sessionToken(userId),
        csrf: csrfToken(userId),
      }),
    );
    expect(res.status).not.toBe(403);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });
});

describe("A5 / Test 7 : requete cross-site ne peut pas muter", () => {
  it("refuse une origine etrangere meme avec un CSRF par ailleurs valide", async () => {
    const res = await proxy(
      proxyReq("/api/auth/logout", {
        method: "POST",
        token: sessionToken(userId),
        csrf: csrfToken(userId),
        origin: "https://attaquant.example",
      }),
    );
    expect(res.status).toBe(403);
  });

  it("accepte une origine same-site legitime", async () => {
    const res = await proxy(
      proxyReq("/api/auth/logout", {
        method: "POST",
        token: sessionToken(userId),
        csrf: csrfToken(userId),
        origin: "https://edukora.net",
      }),
    );
    expect(res.status).not.toBe(403);
  });

  it("fail-closed : une origine presente sans hote est rejetee", async () => {
    const res = await proxy(
      proxyReq("/api/auth/logout", {
        method: "POST",
        token: sessionToken(userId),
        csrf: csrfToken(userId),
        origin: "https://attaquant.example",
        host: null,
      }),
    );
    expect(res.status).toBe(403);
  });

  it("refuse une navigation cross-site classique (ni origine ni CSRF)", async () => {
    const res = await proxy(proxyReq("/api/auth/logout", { method: "POST", token: sessionToken(userId) }));
    expect(res.status).toBe(403);
  });

  it("le logout pre-authentification reste inutilisable hors session", async () => {
    const res = await proxy(proxyReq("/api/auth/logout", { method: "POST" }));
    expect(res.status).toBe(401);
    expect(mockDestroySession).not.toHaveBeenCalled();
  });
});

describe("A5 / route logout : GET non mutatif", () => {
  it("Test 1 - GET renvoie 405 et ne detruit pas la session", async () => {
    mockCookies.set("edukora_session", "session-valide");
    const res = await logoutGET();
    expect(res.status).toBe(405);
    expect(res.headers.get("Allow")).toBe("POST");
    expect(mockDestroySession).not.toHaveBeenCalled();
    expect(mockClearSessionCookie).not.toHaveBeenCalled();
  });

  it("Test 3 - POST detruit la session et efface le cookie", async () => {
    mockCookies.set("edukora_session", "session-valide");
    const res = await logoutPOST();
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(mockDestroySession).toHaveBeenCalledWith("session-valide");
    expect(mockClearSessionCookie).toHaveBeenCalled();
  });

  it("reste idempotent sans cookie de session", async () => {
    const res = await logoutPOST();
    expect(res.status).toBe(200);
    expect(mockDestroySession).not.toHaveBeenCalled();
  });
});

describe("A5 / Test 4 : forgot reste utilisable sans session", () => {
  it("repond ok sans reveler si le compte existe (adresse inconnue)", async () => {
    const res = await (forgotPOST as any)(jsonReq("/api/auth/forgot", { email: "inconnu@test.ci" }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(mockSendMail).not.toHaveBeenCalled();
  });

  it("repond ok et envoie l'email pour une adresse connue, sans jamais renvoyer le token", async () => {
    const res = await (forgotPOST as any)(jsonReq("/api/auth/forgot", { email: userEmail }));
    const body = await res.json();
    expect(res.status).toBe(200);
    expect(body).toEqual({ ok: true });
    expect(JSON.stringify(body)).not.toMatch(/reset_link|token/i);
    expect(mockSendMail).toHaveBeenCalledTimes(1);
  });

  it("valide l'entree", async () => {
    const res = await (forgotPOST as any)(jsonReq("/api/auth/forgot", {}));
    expect(res.status).toBe(400);
  });
});

describe("A5 / Test 5 : reset reste fonctionnel avec un token valide", () => {
  it("refuse un token inconnu", async () => {
    const res = await (resetPOST as any)(
      jsonReq("/api/auth/reset", { token: randomBytes(32).toString("hex"), password: "NouveauMotDePasse1" }),
    );
    expect(res.status).toBe(400);
  });

  it("change reellement le mot de passe avec un token valide", async () => {
    const token = randomBytes(32).toString("hex");
    await run(
      "INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)",
      token,
      userId,
      new Date(Date.now() + 3600_000).toISOString(),
    );

    const newPassword = "MotDePasseNouveau123";
    const res = await (resetPOST as any)(jsonReq("/api/auth/reset", { token, password: newPassword }));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });

    const row = await queryOne<{ password_hash: string }>(
      "SELECT password_hash FROM users WHERE id = ?",
      userId,
    );
    expect(verifyPassword(newPassword, row!.password_hash)).toBe(true);
  });

  it("consomme le token : une seconde utilisation est refusee", async () => {
    const token = randomBytes(32).toString("hex");
    await run(
      "INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)",
      token,
      userId,
      new Date(Date.now() + 3600_000).toISOString(),
    );

    const first = await (resetPOST as any)(
      jsonReq("/api/auth/reset", { token, password: "EncoreUnMotDePasse1" }),
    );
    expect(first.status).toBe(200);

    const second = await (resetPOST as any)(
      jsonReq("/api/auth/reset", { token, password: "TentativeDeReutilisation1" }),
    );
    expect(second.status).toBe(400);
  });

  it("refuse un mot de passe trop court", async () => {
    const res = await (resetPOST as any)(jsonReq("/api/auth/reset", { token: "peu-importe", password: "court" }));
    expect(res.status).toBe(400);
  });
});

describe("A5 / session : invariants de securite conserves", () => {
  it("la source du cookie reste HttpOnly + SameSite=Lax", async () => {
    const src = await import("node:fs").then((fs) =>
      fs.promises.readFile("src/lib/session.ts", "utf8"),
    );
    expect(src).toMatch(/httpOnly:\s*true/);
    expect(src).toMatch(/sameSite:\s*"lax"/);
  });
});