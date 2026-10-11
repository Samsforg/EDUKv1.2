/**
 * P2.5.4 — Résolution des risques résiduels P2.5.3.
 *
 * A. Idempotence de signup_completed (maybeRecordSignup, WHERE NOT EXISTS).
 * B. Backfill historique idempotent (users.created_at → signup_completed).
 * C. Consentement marketing pour gclid/fbclid (cookie edukora_consent).
 */
import { NextRequest } from "next/server";
import { POST as registerPOST } from "@/app/api/auth/register/route";
import {
  maybeRecordSignup,
  backfillSignupCompleted,
  ensureAnalyticsTable,
} from "@/lib/analytics-db";
import {
  ATTRIBUTION_KEYS,
  parseAttribution,
  getStoredAttribution,
  captureLandingAttribution,
} from "@/lib/attribution";
import { hashPassword } from "@/lib/auth";
import { query, queryOne, run } from "@/lib/db";

const SESSION_SECRET = "p254-unit-test-session-secret-0123456789";
process.env.SESSION_SECRET = SESSION_SECRET;

const mockCookies = new Map<string, string>();
jest.mock("next/headers", () => ({
  cookies: async () => ({
    get: (n: string) => (mockCookies.has(n) ? { name: n, value: mockCookies.get(n) } : undefined),
  }),
}));

// Désactiver le rate limit pour les tests de register
jest.mock("@/lib/rate-limit", () => ({
  rateLimit: async () => ({ allowed: true, remaining: 100, resetAt: Date.now() + 900000 }),
  rateLimitResponse: () => new Response(null, { status: 429 }),
  getClientIp: () => "203.0.113.77",
}));

const STAMP = `${process.pid}${Date.now()}${Math.floor(Math.random() * 900 + 100)}`.replace(/\D/g, "");
const HASHED = hashPassword("secret123");

let seq = 0;
const createdUserIds: number[] = [];

function phoneOf(n: number): string {
  // Format ivoirien : 10 chiffres, commence par 0X (X = 1-9)
  return `07${String(n % 100).padStart(2, "0")}${STAMP.slice(-6)}`;
}

async function makeUser(opts: { test?: boolean } = {}): Promise<number> {
  seq += 1;
  const tag = opts.test ? "t" : "r";
  const email = `p254${tag}.${STAMP}.${seq}@edukora.net`;
  const phone = phoneOf(seq);
  const res = await run(
    `INSERT INTO users (role, email, phone, phone_canonical, password_hash, first_name, last_name, referral_code, class_level)
     VALUES ('student', ?, ?, ?, ?, 'Test', 'P254', ?, 'Terminale')`,
    email,
    phone,
    phone,
    HASHED,
    `EDK-P254-${STAMP}-${seq}`,
  );
  const id = Number(res.lastInsertRowid);
  createdUserIds.push(id);
  return id;
}

function registerReq(body: Record<string, unknown>, cookie?: string): NextRequest {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (cookie) headers.set("cookie", cookie);
  return new NextRequest("http://localhost/api/auth/register", {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
}

function consentCookie(prefs: { analytics?: boolean; marketing?: boolean }): string {
  return `edukora_consent=${encodeURIComponent(JSON.stringify({ essential: true, ...prefs }))}`;
}

async function countSignup(userId: number): Promise<number> {
  const r = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
    userId,
  );
  return Number(r?.c ?? 0);
}

afterAll(async () => {
  for (const id of createdUserIds) {
    await run("DELETE FROM analytics_events WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM user_consents WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM users WHERE id = ?", id).catch(() => {});
  }
});

// ==================================================================
// A. Idempotence de signup_completed
// ==================================================================
describe("P2.5.4 A — signup_completed idempotent", () => {
  it("A1 — maybeRecordSignup crée un événement et retourne true", async () => {
    const u = await makeUser();
    const created = await maybeRecordSignup(u, "sess-a1", { role: "student", method: "email" }, null);
    expect(created).toBe(true);
    expect(await countSignup(u)).toBe(1);
  });

  it("A2 — un deuxième appel retourne false (aucun doublon)", async () => {
    const u = await makeUser();
    await maybeRecordSignup(u, "sess-a2", { role: "student" }, null);
    const second = await maybeRecordSignup(u, "sess-a2-retry", { role: "student" }, null);
    expect(second).toBe(false);
    expect(await countSignup(u)).toBe(1);
  });

  it("A3 — cinq appels consécutifs ne créent qu'un seul événement", async () => {
    const u = await makeUser();
    const results: boolean[] = [];
    for (let i = 0; i < 5; i++) {
      results.push(await maybeRecordSignup(u, `sess-a3-${i}`, { role: "student", attempt: i }, null));
    }
    expect(results.filter(Boolean)).toHaveLength(1);
    expect(await countSignup(u)).toBe(1);
  });

  it("A4 — la route register n'émet qu'un signup_completed par compte", async () => {
    seq += 1;
    const phone = phoneOf(900 + seq);
    const body = {
      first_name: "Test",
      last_name: "Testeur",
      email: null,
      phone,
      password: "secret123",
      role: "student",
      accept_privacy: true,
      class_level: "Terminale",
    };
    const res = await registerPOST(registerReq(body));
    expect(res.status).toBe(201);
    const data = (await res.json()) as { user: { id: number } };
    const userId = data.user.id;
    createdUserIds.push(userId);
    expect(await countSignup(userId)).toBe(1);
  });

  it("A5 — une inscription échouée ne produit pas de signup_completed", async () => {
    const body = {
      first_name: "Test",
      last_name: "Testeur",
      email: null,
      phone: phoneOf(800),
      password: "secret123",
      role: "student",
      accept_privacy: false, // échec : pas de consentement privacy
      class_level: "Terminale",
    };
    const res = await registerPOST(registerReq(body));
    expect(res.status).toBe(400);
    // Aucun signup_completed ne doit exister pour ce numéro
    const r = await queryOne<{ c: number }>(
      `SELECT COUNT(*) AS c FROM analytics_events e
       WHERE e.event = 'signup_completed' AND e.props LIKE ?`,
      `%${phoneOf(800)}%`,
    );
    // Soit 0 (pas de compte créé), soit le compte n'existe pas
    expect(Number(r?.c ?? 0)).toBe(0);
  });

  it("A6 — les props ne contiennent aucune PII", async () => {
    const u = await makeUser();
    await maybeRecordSignup(u, "sess-a6", { role: "student", method: "phone" }, null);
    const row = await queryOne<{ props: string }>(
      `SELECT props FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      u,
    );
    expect(row).toBeTruthy();
    const props = JSON.parse(row!.props) as Record<string, unknown>;
    expect(Object.keys(props).sort()).toEqual(["method", "role"]);
    // Pas de champs PII (email, prénom, nom, mot de passe, téléphone en clair)
    expect(props).not.toHaveProperty("email");
    expect(props).not.toHaveProperty("first_name");
    expect(props).not.toHaveProperty("last_name");
    expect(props).not.toHaveProperty("password");
    expect(props).not.toHaveProperty("phone");
  });
});

// ==================================================================
// B. Backfill historique
// ==================================================================
describe("P2.5.4 B — backfill signup_completed", () => {
  it("B1 — crée un événement pour un compte sans signup_completed", async () => {
    const u = await makeUser();
    // S'assurer qu'aucun événement n'existe
    expect(await countSignup(u)).toBe(0);
    const n = await backfillSignupCompleted();
    expect(n).toBeGreaterThanOrEqual(1);
    expect(await countSignup(u)).toBe(1);
  });

  it("B2 — un deuxième run ne crée pas de doublon (idempotent)", async () => {
    const u = await makeUser();
    await backfillSignupCompleted();
    expect(await countSignup(u)).toBe(1);
    const n2 = await backfillSignupCompleted();
    // Le second run peut créer des événements pour d'autres comptes,
    // mais jamais pour celui-ci
    expect(await countSignup(u)).toBe(1);
    expect(n2).toBeGreaterThanOrEqual(0);
  });

  it("B3 — les événements déjà présents restent inchangés", async () => {
    const u = await makeUser();
    await maybeRecordSignup(u, "sess-b3", { role: "student", method: "email", source: "google" }, null);
    const before = await queryOne<{ props: string; created_at: string }>(
      `SELECT props, created_at FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      u,
    );
    await backfillSignupCompleted();
    const after = await queryOne<{ props: string; created_at: string }>(
      `SELECT props, created_at FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      u,
    );
    expect(after!.props).toBe(before!.props);
    expect(after!.created_at).toBe(before!.created_at);
    expect(await countSignup(u)).toBe(1);
  });

  it("B4 — les événements reconstruits portent backfilled: true", async () => {
    const u = await makeUser();
    await backfillSignupCompleted();
    const row = await queryOne<{ props: string }>(
      `SELECT props FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      u,
    );
    const props = JSON.parse(row!.props) as Record<string, unknown>;
    expect(props.backfilled).toBe(true);
    expect(props.role).toBe("student");
    expect(props.method).toBe("email");
    // Aucune UTM inventée
    expect(props.source).toBeUndefined();
    expect(props.medium).toBeUndefined();
    expect(props.campaign).toBeUndefined();
    expect(props.gclid).toBeUndefined();
    expect(props.fbclid).toBeUndefined();
  });

  it("B5 — created_at copié depuis users.created_at", async () => {
    const u = await makeUser();
    await backfillSignupCompleted();
    const user = await queryOne<{ created_at: string }>(
      `SELECT created_at FROM users WHERE id = ?`,
      u,
    );
    const evt = await queryOne<{ created_at: string }>(
      `SELECT created_at FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      u,
    );
    expect(evt!.created_at).toBe(user!.created_at);
  });

  it("B6 — les comptes de test sont aussi backfillés (conventions existantes)", async () => {
    const u = await makeUser({ test: true });
    await backfillSignupCompleted();
    expect(await countSignup(u)).toBe(1);
  });
});

// ==================================================================
// C. Consentement marketing pour gclid/fbclid
// ==================================================================
describe("P2.5.4 C — consentement marketing gclid/fbclid", () => {
  let cookieValue = "";
  const sessionStorageStore = new Map<string, string>();

  function mockBrowser(consent: Record<string, boolean> | null) {
    cookieValue = consent
      ? `edukora_consent=${encodeURIComponent(JSON.stringify(consent))}`
      : "";
    (globalThis as unknown as { document?: unknown }).document = {
      get cookie() {
        return cookieValue;
      },
      set cookie(v: string) {
        const m = v.match(/^edukora_consent=([^;]*)/);
        if (m) {
          cookieValue = m[1] ? `edukora_consent=${m[1]}` : "";
        }
      },
    };
    (globalThis as unknown as { window?: unknown }).window = {
      location: { search: "" },
      sessionStorage: {
        getItem: (k: string) => (sessionStorageStore.has(k) ? sessionStorageStore.get(k)! : null),
        setItem: (k: string, v: string) => sessionStorageStore.set(k, String(v)),
        removeItem: (k: string) => sessionStorageStore.delete(k),
        clear: () => sessionStorageStore.clear(),
      },
    };
  }

  afterAll(() => {
    delete (globalThis as unknown as { document?: unknown }).document;
    delete (globalThis as unknown as { window?: unknown }).window;
  });

  it("C1 — gclid/fbclid capturés avec consentement marketing", () => {
    mockBrowser({ essential: true, analytics: true, marketing: true, ia: true });
    const out = parseAttribution("?gclid=AbC123&fbclid=XyZ789&utm_source=google");
    expect(out.gclid).toBe("AbC123");
    expect(out.fbclid).toBe("XyZ789");
    expect(out.utm_source).toBe("google");
  });

  it("C2 — gclid/fbclid NON capturés sans consentement marketing", () => {
    mockBrowser({ essential: true, analytics: true, marketing: false, ia: true });
    const out = parseAttribution("?gclid=AbC123&fbclid=XyZ789&utm_source=google");
    expect(out.gclid).toBeUndefined();
    expect(out.fbclid).toBeUndefined();
    expect(out.utm_source).toBe("google"); // UTM toujours capturé
  });

  it("C3 — gclid/fbclid NON capturés si consentement absent", () => {
    mockBrowser(null);
    const out = parseAttribution("?gclid=AbC123&fbclid=XyZ789&utm_source=google");
    expect(out.gclid).toBeUndefined();
    expect(out.fbclid).toBeUndefined();
    expect(out.utm_source).toBe("google");
  });

  it("C4 — retrait de consentement : relecture filtrée", () => {
    // Capturer avec consentement marketing
    mockBrowser({ essential: true, analytics: true, marketing: true, ia: true });
    sessionStorageStore.set(
      "edukora_attr",
      JSON.stringify({ utm_source: "google", gclid: "AbC123", fbclid: "XyZ789" }),
    );
    // Retirer le consentement marketing
    mockBrowser({ essential: true, analytics: true, marketing: false, ia: true });
    const out = getStoredAttribution();
    expect(out.gclid).toBeUndefined();
    expect(out.fbclid).toBeUndefined();
    expect(out.utm_source).toBe("google");
  });

  it("C5 — la route register rejette gclid/fbclid sans consentement marketing", async () => {
    seq += 1;
    const phone = phoneOf(700 + (seq % 100));
    const body = {
      first_name: "Test",
      last_name: "Testeur",
      email: null,
      phone,
      password: "secret123",
      role: "student",
      accept_privacy: true,
      class_level: "Terminale",
      attribution: { utm_source: "google", gclid: "SECRET123", fbclid: "FB456" },
    };
    // Cookie consent SANS marketing
    const cookie = consentCookie({ analytics: true, marketing: false });
    const res = await registerPOST(registerReq(body, cookie));
    expect(res.status).toBe(201);
    const data = (await res.json()) as { user: { id: number } };
    const userId = data.user.id;
    createdUserIds.push(userId);
    const row = await queryOne<{ props: string }>(
      `SELECT props FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      userId,
    );
    const props = JSON.parse(row!.props) as Record<string, unknown>;
    expect(props.source).toBe("google");
    expect(props.gclid).toBeUndefined();
    expect(props.fbclid).toBeUndefined();
  });

  it("C6 — la route register accepte gclid/fbclid avec consentement marketing", async () => {
    seq += 1;
    const phone = phoneOf(600 + (seq % 100));
    const body = {
      first_name: "Test",
      last_name: "Testeur",
      email: null,
      phone,
      password: "secret123",
      role: "student",
      accept_privacy: true,
      class_level: "Terminale",
      attribution: { utm_source: "google", gclid: "SECRET123" },
    };
    const cookie = consentCookie({ analytics: true, marketing: true });
    const res = await registerPOST(registerReq(body, cookie));
    expect(res.status).toBe(201);
    const data = (await res.json()) as { user: { id: number } };
    const userId = data.user.id;
    createdUserIds.push(userId);
    const row = await queryOne<{ props: string }>(
      `SELECT props FROM analytics_events WHERE event = 'signup_completed' AND user_id = ?`,
      userId,
    );
    const props = JSON.parse(row!.props) as Record<string, unknown>;
    expect(props.source).toBe("google");
    expect(props.gclid).toBe("SECRET123");
  });

  it("C7 — l'inscription continue malgré l'absence de consentement marketing", async () => {
    seq += 1;
    const phone = phoneOf(500 + (seq % 100));
    const body = {
      first_name: "Test",
      last_name: "Testeur",
      email: null,
      phone,
      password: "secret123",
      role: "student",
      accept_privacy: true,
      class_level: "Terminale",
      attribution: { utm_source: "google", gclid: "BLOCKED" },
    };
    // Aucun cookie consent
    const res = await registerPOST(registerReq(body));
    if (res.status !== 201) {
      const errBody = await res.clone().json().catch(() => ({}));
      console.log("REGISTER_ERROR:", res.status, JSON.stringify(errBody), "phone:", phone);
    }
    expect(res.status).toBe(201);
  });

  it("C8 — la whitelist reste à 7 clés", () => {
    expect(ATTRIBUTION_KEYS).toHaveLength(7);
    expect([...ATTRIBUTION_KEYS].sort()).toEqual([
      "fbclid",
      "gclid",
      "utm_campaign",
      "utm_content",
      "utm_medium",
      "utm_source",
      "utm_term",
    ]);
  });
});

