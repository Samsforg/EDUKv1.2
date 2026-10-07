/**
 * P1.0 — Funnel d'acquisition end-to-end (cahier Partie 16).
 *
 * 21 cas : attribution (3-8), activation (9-11), purchase (12-15),
 * exclusion test users des KPI (16-18), frontière Business Metrics (19-21),
 * growth POST end-to-end + rétention explicite (E2E, 23).
 *
 * Détails de robustesse :
 * - scénarios KPI enveloppés dans BEGIN IMMEDIATE : les writers des autres
 *   workers sont bloqués pendant la séquence lecture→écriture→lecture,
 *   donc le delta funnel est exactement celui du scénario (cf. Partie 0) ;
 * - identité track : cookie de session réel (createSession) + mock
 *   next/headers (pattern auth-csrf-a5) — jamais l'identité du corps ;
 * - webhook signé HMAC-SHA256(ts.payload) avec ts croissants → eventId
 *   unique par envoi (rejouable malgré la table webhook_events) ;
 * - fixtures sans email : sendSubscriptionReceipt sort immédiatement.
 */
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { NextRequest } from "next/server";
import { POST as trackPOST } from "@/app/api/analytics/track/route";
import { POST as registerPOST } from "@/app/api/auth/register/route";
import { POST as webhookPOST } from "@/app/api/premium/webhook/route";
import { POST as growthPOST } from "@/app/api/growth/metrics/route";
import {
  ATTRIBUTION_KEYS,
  captureLandingAttribution,
  getStoredAttribution,
  parseAttribution,
  signupAttributionProps,
} from "@/lib/attribution";
import {
  countFunnelForDay,
  maybeRecordActivation,
  recordPurchase,
  trackDb,
} from "@/lib/analytics-db";
import { getBusinessRevenue, getCanonicalMRR } from "@/lib/business-metrics";
import { hashPassword } from "@/lib/auth";
import { createSession } from "@/lib/session";
import { query, queryOne, run } from "@/lib/db";

const SESSION_SECRET = "p10-unit-test-session-secret-0123456789";
process.env.SESSION_SECRET = SESSION_SECRET;
const WH_SECRET = "p10-whsec-unit-test";
process.env.GENIUSPAY_WEBHOOK_SECRET = WH_SECRET;

const mockCookies = new Map<string, string>();
jest.mock("next/headers", () => ({
  cookies: async () => ({
    get: (n: string) => (mockCookies.has(n) ? { name: n, value: mockCookies.get(n) } : undefined),
  }),
}));

const STAMP = `${process.pid}.${Date.now()}${Math.floor(Math.random() * 900 + 100)}`;
const HASHED = hashPassword("secret123");

const dUsers: number[] = [];
const dSubs: number[] = [];
let seq = 0;
let ipSeq = 0;
let whSeq = 0;

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function phoneOf(n: number): string {
  return `07${STAMP.slice(-7)}${n}`;
}

async function makeUser(
  opts: { test?: boolean; role?: string; email?: boolean } = {},
): Promise<number> {
  seq += 1;
  const tag = opts.test ? "t" : "r";
  const email =
    opts.email === false ? null : `p10${tag}.${STAMP}.${seq}@edukora.net`;
  const phone = `p10${STAMP}.${seq}`;
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, phone, is_test)
     VALUES (?, ?, ?, 'P10', 'Funnel', 'Terminale', ?, ?)`,
    opts.role ?? "student",
    email,
    HASHED,
    phone,
    opts.test ? 1 : 0,
  );
  const row = await queryOne<{ id: number }>(
    "SELECT id FROM users WHERE phone = ?",
    phone,
  );
  const id = row!.id;
  dUsers.push(id);
  return id;
}

type Plan = { id: number; currency: string; name: string };

async function planInfo(): Promise<Plan> {
  const p = await queryOne<Plan>(
    "SELECT id, currency, name FROM subscription_plans ORDER BY id LIMIT 1",
  );
  if (!p) throw new Error("aucun subscription_plans dans la base de test");
  return p;
}

async function makePaidSub(
  userId: number,
  ref: string,
  priceCents = 4900,
): Promise<number> {
  const plan = await planInfo();
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, provider_subscription_id, price_cents, status, started_at, end_at)
     VALUES (?, ?, 'geniuspay', ?, ?, 'trial', ?, ?)`,
    userId,
    plan.id,
    ref,
    priceCents,
    new Date(Date.now() - 864e5).toISOString(),
    new Date(Date.now() + 30 * 864e5).toISOString(),
  );
  const row = await queryOne<{ id: number }>(
    "SELECT id FROM subscriptions WHERE provider_subscription_id = ?",
    ref,
  );
  dSubs.push(row!.id);
  return row!.id;
}

function trackReq(
  event: string,
  headers: Record<string, string>,
  extra: Record<string, unknown>,
): Promise<Response> {
  ipSeq += 1;
  const req = new NextRequest("http://localhost/api/analytics/track", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": `p10-${STAMP}-${ipSeq}.0.0.1`,
      ...headers,
    },
    body: JSON.stringify({ event, props: {}, url: "/p10-test", ...extra }),
  });
  return (trackPOST as unknown as (r: NextRequest) => Promise<Response>)(req);
}

/** Track authentifié : identité serveur via session réelle (cookie + mock). */
async function authTrack(
  userId: number,
  event: string,
  extra: Record<string, unknown> = {},
): Promise<Response> {
  const token = await createSession(userId);
  mockCookies.set("edukora_session", token);
  return trackReq(event, { cookie: `edukora_session=${token}` }, extra);
}

/** Track anonyme : aucun cookie → userId null. */
function anonTrack(
  event: string,
  extra: Record<string, unknown> = {},
): Promise<Response> {
  mockCookies.delete("edukora_session");
  return trackReq(event, {}, extra);
}

function signWh(raw: string, ts: string): string {
  return crypto.createHmac("sha256", WH_SECRET).update(`${ts}.${raw}`).digest("hex");
}

function webhookReq(payload: Record<string, unknown>): Request {
  whSeq += 1;
  const raw = JSON.stringify(payload);
  // ts croissant → eventId (event:ref:ts) unique par envoi, dans la
  // tolérance ±300s : le rejeu contourne webhook_events sans fausser l'HMAC.
  const ts = String(Math.floor(Date.now() / 1000) + whSeq);
  return new Request("http://localhost/api/premium/webhook", {
    method: "POST",
    body: raw,
    headers: {
      "content-type": "application/json",
      "x-webhook-signature": signWh(raw, ts),
      "x-webhook-timestamp": ts,
      "x-webhook-event": String(payload.event ?? ""),
    },
  });
}

async function sendWh(payload: Record<string, unknown>): Promise<Record<string, unknown>> {
  const res = await (webhookPOST as unknown as (r: Request) => Promise<Response>)(
    webhookReq(payload),
  );
  expect(res.status).toBe(200);
  return (await res.json()) as Record<string, unknown>;
}

async function purchaseCount(ref: string): Promise<number> {
  const r = await queryOne<{ n: number }>(
    "SELECT COUNT(*) AS n FROM analytics_events WHERE event = 'purchase' AND props LIKE ?",
    `%${ref}%`,
  );
  return Number(r?.n ?? 0);
}

function mockWindow(search: string): Map<string, string> {
  const store = new Map<string, string>();
  (globalThis as unknown as { window?: unknown }).window = {
    location: { search },
    sessionStorage: {
      getItem: (k: string) => (store.has(k) ? (store.get(k) as string) : null),
      setItem: (k: string, v: string) => {
        store.set(k, String(v));
      },
      removeItem: (k: string) => {
        store.delete(k);
      },
      clear: () => {
        store.clear();
      },
      key: (i: number) => Array.from(store.keys())[i] ?? null,
      get length() {
        return store.size;
      },
    },
  };
  return store;
}

function setSearch(q: string): void {
  const w = (
    globalThis as unknown as { window?: { location: { search: string } } }
  ).window;
  if (w) w.location.search = q;
}

async function withDbTxn<T>(fn: () => Promise<T>): Promise<T> {
  await run("BEGIN IMMEDIATE");
  try {
    const out = await fn();
    await run("COMMIT");
    return out;
  } catch (e) {
    await run("ROLLBACK").catch(() => {});
    throw e;
  }
}

async function waitFor<T>(
  fn: () => Promise<T | null | undefined>,
  timeoutMs = 3000,
): Promise<T | undefined> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const v = await fn();
    if (v) return v;
    if (Date.now() > deadline) return undefined;
    await new Promise((r) => setTimeout(r, 25));
  }
}

afterEach(() => {
  delete (globalThis as unknown as { window?: unknown }).window;
  mockCookies.clear();
});

afterAll(async () => {
  for (const id of dUsers) {
    await run("DELETE FROM user_consents WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM notifications WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM analytics_events WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM audit_logs WHERE actor_id = ?", id).catch(() => {});
    await run("DELETE FROM audit_logs WHERE detail LIKE ?", `%#${id}%`).catch(() => {});
  }
  await run(
    "DELETE FROM subscriptions WHERE provider_subscription_id LIKE ?",
    `P10${STAMP}%`,
  ).catch(() => {});
  await run(
    "DELETE FROM analytics_events WHERE url = ? OR props LIKE ?",
    "/p10-test",
    `%${STAMP}%`,
  ).catch(() => {});
  await run(
    "DELETE FROM webhook_events WHERE event_id LIKE ?",
    `%${STAMP}%`,
  ).catch(() => {});
  await run(
    "DELETE FROM users WHERE email LIKE ? OR phone LIKE ?",
    `p10%.${STAMP}.%@edukora.net`,
    `p10${STAMP}.%`,
  ).catch(() => {});
  for (const id of dSubs) {
    await run("DELETE FROM subscriptions WHERE id = ?", id).catch(() => {});
  }
});

// ------------------------------------------------------------------
// Attribution (cahier 3-8)
// ------------------------------------------------------------------
describe("P1.0 — attribution first-party (?utm_* + clics)", () => {
  it("3 — capture UTM : 5 paramètres du contrat, ref et PII exclus, troncature", () => {
    const a = parseAttribution(
      "?utm_source=google&utm_medium=cpc&utm_campaign=bac2026&utm_content=banniere&utm_term=revision&ref=KEEPME&email=a%40b.ci&phone=%2B225070102",
    );
    expect(a).toEqual({
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "bac2026",
      utm_content: "banniere",
      utm_term: "revision",
    });
    expect(ATTRIBUTION_KEYS).toHaveLength(7);
    expect(parseAttribution(`?utm_source=${"x".repeat(300)}`).utm_source).toHaveLength(120);
    expect(parseAttribution("?gclid=GA1.1.123&fbclid=IjAbc").gclid).toBe("GA1.1.123");
    expect(parseAttribution("")).toEqual({});
  });

  it("4 — first-touch : la deuxième source ne remplace jamais la première", () => {
    mockWindow("?utm_source=facebook&utm_medium=social");
    const first = captureLandingAttribution();
    expect(first.utm_source).toBe("facebook");
    // navigation sur la même session : nouvelle landing avec d'autres params
    setSearch("?utm_source=google&utm_medium=cpc&utm_campaign=retarget");
    const second = captureLandingAttribution();
    expect(second.utm_source).toBe("facebook"); // first-touch gagne
    expect(second.utm_medium).toBe("social");
    expect(second.utm_campaign).toBe("retarget"); // clé absente complétée
    const stored = getStoredAttribution();
    expect(stored.utm_source).toBe("facebook");
    expect(stored.utm_campaign).toBe("retarget");
    expect(Object.keys(stored)).not.toContain("utm_term"); // jamais vu
  });

  it("5 — UTM survive landing → inscription : props, câblage page, jointure user", async () => {
    mockWindow("?utm_source=google&utm_campaign=bac2026&utm_content=display");
    captureLandingAttribution();
    setSearch(""); // navigation vers /inscription sans params
    expect(signupAttributionProps()).toEqual({
      source: "google",
      campaign: "bac2026",
      content: "display",
    });
    const pageSrc = readFileSync(
      join(__dirname, "..", "src", "app", "inscription-1-2-edukora", "page.tsx"),
      "utf8",
    );
    expect(pageSrc).toMatch(
      /trackEvent\(EVENTS\.signupCompleted,[\s\S]{0,1200}\.\.\.signupAttributionProps\(\)/,
    );
    // joinable : signup_completed transporte l'attribution jusqu'au compte
    const u = await makeUser({ test: true });
    await trackDb(
      "signup_completed",
      { ...signupAttributionProps(), role: "student" },
      u,
      `sess-${STAMP}`,
      "/inscription-1-2-edukora",
    );
    const row = await queryOne<{ props: string }>(
      `SELECT e.props FROM analytics_events e JOIN users usr ON usr.id = e.user_id
       WHERE e.event = 'signup_completed' AND e.user_id = ? AND e.props LIKE ?`,
      u,
      '%source":"google%',
    );
    expect(row).toBeTruthy();
    const props = JSON.parse(row!.props) as Record<string, unknown>;
    expect(props.campaign).toBe("bac2026");
    expect(props.gclid).toBeUndefined(); // non capturé → absent (pas de 0 factice)
  });

  it("6 — gclid : capturé au landing, persisté, injecté au signup", () => {
    mockWindow("?gclid=AbC123XyZ");
    captureLandingAttribution();
    expect(getStoredAttribution().gclid).toBe("AbC123XyZ");
    expect(signupAttributionProps().gclid).toBe("AbC123XyZ");
  });

  it("7 — fbclid : capturé au landing, persisté, injecté au signup", () => {
    mockWindow("?fbclid=Ij3xyz");
    captureLandingAttribution();
    expect(getStoredAttribution().fbclid).toBe("Ij3xyz");
    expect(signupAttributionProps().fbclid).toBe("Ij3xyz");
  });

  it("8 — referral ?ref= → referred_by → abonnement joignable (chaîne complète)", async () => {
    const code = `P10${STAMP.slice(-8)}`;
    await run(
      `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code, is_test)
       VALUES ('student', ?, ?, 'P10', 'Parrain', 'Terminale', ?, 1)`,
      `p10ref.${STAMP}@edukora.net`,
      HASHED,
      code,
    );
    const refRow = await queryOne<{ id: number }>(
      "SELECT id FROM users WHERE referral_code = ?",
      code,
    );
    const referrerId = refRow!.id;
    dUsers.push(referrerId);

    ipSeq += 1;
    const res = await (registerPOST as unknown as (r: NextRequest) => Promise<Response>)(
      new NextRequest("http://localhost/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-forwarded-for": `p10-${STAMP}-${ipSeq}.0.0.1`,
        },
        body: JSON.stringify({
          first_name: "Filleul",
          last_name: "Eleve",
          phone: phoneOf(1),
          password: "secret123",
          accept_privacy: true,
          class_level: "Terminale",
          referral_code: code,
        }),
      }),
    );
    expect(res.status).toBe(201);
    await run("UPDATE users SET is_test = 1 WHERE phone = ?", phoneOf(1));
    const filleul = await queryOne<{ id: number; referred_by: number | null }>(
      "SELECT id, referred_by FROM users WHERE phone = ?",
      phoneOf(1),
    );
    dUsers.push(filleul!.id);
    expect(filleul!.referred_by).toBe(referrerId);

    // la conversion du filleul reste joignable : chaîne parrain → abonnement
    const subId = await makePaidSub(filleul!.id, `P10REF${STAMP}`);
    const chain = await queryOne<{ filleul: number; sub: number }>(
      `SELECT u.id AS filleul, s.id AS sub FROM users u
       JOIN subscriptions s ON s.user_id = u.id
       WHERE u.referred_by = ? AND s.id = ?`,
      referrerId,
      subId,
    );
    expect(chain).toBeTruthy();
  });
});

// ------------------------------------------------------------------
// Activation (cahier 9-11)
// ------------------------------------------------------------------
describe("P1.0 — activation dérivée (lesson_started → activated)", () => {
  it("9 — lesson_started authentifié → activated (identité serveur, session hachée)", async () => {
    const u = await makeUser();
    const res = await authTrack(u, "lesson_started");
    expect(res.status).toBe(200);
    const row = await queryOne<{
      user_id: number;
      session_id: string | null;
      props: string | null;
    }>(
      "SELECT user_id, session_id, props FROM analytics_events WHERE event = 'activated' AND user_id = ?",
      u,
    );
    expect(row).toBeTruthy();
    expect(row!.user_id).toBe(u);
    expect(JSON.parse(row!.props ?? "{}").trigger).toBe("lesson_started");
    expect(row!.session_id).toMatch(/^[0-9a-f]{64}$/); // haché, jamais le jeton
    expect(row!.session_id).not.toContain("v1.");
  });

  it("10 — deuxième lesson_started → toujours 1 seul activated", async () => {
    const u = await makeUser();
    await authTrack(u, "lesson_started");
    await authTrack(u, "lesson_started");
    const c = await queryOne<{ n: number }>(
      "SELECT COUNT(*) AS n FROM analytics_events WHERE event = 'activated' AND user_id = ?",
      u,
    );
    expect(Number(c!.n)).toBe(1);
  });

  it("11 — anti-spoof : user_id du corps jamais utilisé pour activated", async () => {
    const u = await makeUser();
    const before = await queryOne<{ n: number }>(
      "SELECT COUNT(*) AS n FROM analytics_events WHERE event = 'activated' AND user_id = 999999999",
    );
    const res = await authTrack(u, "lesson_started", { user_id: 999999999 });
    expect(res.status).toBe(200);
    const mine = await queryOne<{ user_id: number }>(
      "SELECT user_id FROM analytics_events WHERE event = 'activated' AND user_id = ?",
      u,
    );
    expect(mine).toBeTruthy();
    const after = await queryOne<{ n: number }>(
      "SELECT COUNT(*) AS n FROM analytics_events WHERE event = 'activated' AND user_id = 999999999",
    );
    expect(Number(after!.n)).toBe(Number(before!.n)); // aucun nouvel activated spoofé
  });
});

// ------------------------------------------------------------------
// Purchase first-party (cahier 12-15)
// ------------------------------------------------------------------
describe("P1.0 — purchase first-party (webhook GeniusPay)", () => {
  it("12 — purchase uniquement après paiement confirmé", async () => {
    const u = await makeUser({ email: false });
    const ref = `P10${STAMP}A`;
    await makePaidSub(u, ref, 4900);

    await sendWh({ event: "payment.initiated", data: { reference: ref, amount: 4900 } });
    expect(await purchaseCount(ref)).toBe(0);

    await sendWh({ event: "payment.failed", data: { reference: ref, amount: 4900 } });
    expect(await purchaseCount(ref)).toBe(0);
    const failed = await queryOne<{ status: string }>(
      "SELECT status FROM subscriptions WHERE provider_subscription_id = ?",
      ref,
    );
    expect(failed!.status).toBe("past_due");

    await sendWh({ event: "payment.success", data: { reference: ref, amount: 4900 } });
    expect(await purchaseCount(ref)).toBe(1);
    const ok = await queryOne<{ status: string }>(
      "SELECT status FROM subscriptions WHERE provider_subscription_id = ?",
      ref,
    );
    expect(ok!.status).toBe("active");
  });

  it("13 — purchase porte l'identité de transaction (provider id, valeur, devise)", async () => {
    const ref = `P10${STAMP}B`;
    const u = await makeUser({ email: false });
    const plan = await planInfo();
    const subId = await makePaidSub(u, ref, 7900);
    await sendWh({ event: "payment.success", data: { reference: ref, amount: 7900 } });

    const row = await queryOne<{ user_id: number; props: string }>(
      "SELECT user_id, props FROM analytics_events WHERE event = 'purchase' AND props LIKE ?",
      `%${ref}%`,
    );
    expect(row).toBeTruthy();
    expect(row!.user_id).toBe(u);
    const props = JSON.parse(row!.props) as Record<string, unknown>;
    const sub = await queryOne<{ provider_subscription_id: string }>(
      "SELECT provider_subscription_id FROM subscriptions WHERE id = ?",
      subId,
    );
    expect(props.transaction_id).toBe(sub!.provider_subscription_id); // id first-party
    expect(props.subscription_id).toBe(subId);
    expect(props.value_cents).toBe(7900); // valeur = price_cents
    expect(props.currency).toBe(plan.currency);
    expect(props.plan).toBe(plan.name);
  });

  it("14 — rejeu webhook (eventId différent) → 1 seul purchase", async () => {
    const ref = `P10${STAMP}C`;
    const u = await makeUser({ email: false });
    await makePaidSub(u, ref, 4900);
    const first = await sendWh({
      event: "payment.success",
      data: { reference: ref, amount: 4900 },
    });
    expect(first.duplicate).toBeFalsy();
    expect(await purchaseCount(ref)).toBe(1);
    // même payload, ts différent → eventId différent → rejoué au handler
    await sendWh({ event: "payment.success", data: { reference: ref, amount: 4900 } });
    expect(await purchaseCount(ref)).toBe(1); // idempotent (WHERE NOT EXISTS)
  });

  it("15 — paiements différents → events distincts", async () => {
    const refX = `P10${STAMP}X`;
    const u = await makeUser({ email: false });
    await makePaidSub(u, refX, 4900);
    await sendWh({ event: "payment.success", data: { reference: refX, amount: 4900 } });
    expect(await purchaseCount(refX)).toBe(1);
    let total = 0;
    for (const r of [`P10${STAMP}A`, `P10${STAMP}B`, `P10${STAMP}C`, refX]) {
      total += await purchaseCount(r);
    }
    expect(total).toBe(4); // aucune fusion entre transactions
  });
});

// ------------------------------------------------------------------
// Exclusion test users des KPI (cahier 16-18)
// ------------------------------------------------------------------
describe("P1.0 — funnel KPI : comptes réels vs test vs anonymes", () => {
  it("16 — compte réel inclus dans le funnel KPI du jour", async () => {
    const u = await makeUser(); // is_test = 0
    const ref = `P10${STAMP}K16`;
    // BEGIN IMMEDIATE : aucun writer externe entre les deux lectures
    await withDbTxn(async () => {
      const before = await countFunnelForDay(today());
      const created = await recordPurchase({
        userId: u,
        transactionId: ref,
        valueCents: 4900,
        currency: "XOF",
        plan: "Premium",
      });
      expect(created).toBe(true);
      const after = await countFunnelForDay(today());
      expect(after.purchase ?? 0).toBe((before.purchase ?? 0) + 1);
    });
  });

  it("17 — compte test exclu du funnel KPI (purchase + activated, événements présents)", async () => {
    const tu = await makeUser({ test: true });
    const ref = `P10${STAMP}K17`;
    await withDbTxn(async () => {
      const before = await countFunnelForDay(today());
      expect(
        await recordPurchase({
          userId: tu,
          transactionId: ref,
          valueCents: 4900,
          currency: "XOF",
          plan: "Premium",
        }),
      ).toBe(true);
      expect(await maybeRecordActivation(tu, `sess-${STAMP}-17`, "/p10-test")).toBe(
        true,
      );
      const after = await countFunnelForDay(today());
      expect(after.purchase ?? 0).toBe(before.purchase ?? 0); // exclu
      expect(after.activated ?? 0).toBe(before.activated ?? 0); // exclu
    });
    // exclu par règle (testUsersWhere), pas par absence : les lignes existent
    const row = await queryOne<{ user_id: number }>(
      "SELECT user_id FROM analytics_events WHERE event = 'purchase' AND props LIKE ?",
      `%${ref}%`,
    );
    expect(row!.user_id).toBe(tu);
    const act = await queryOne<{ user_id: number }>(
      "SELECT user_id FROM analytics_events WHERE event = 'activated' AND user_id = ?",
      tu,
    );
    expect(act).toBeTruthy();
  });

  it("18 — anonymes : aucun activated attribuable, pageview anonyme préservé", async () => {
    const beforeNull = await queryOne<{ n: number }>(
      "SELECT COUNT(*) AS n FROM analytics_events WHERE event = 'activated' AND user_id IS NULL",
    );
    const res = await anonTrack("lesson_started");
    expect(res.status).toBe(200);
    const afterNull = await queryOne<{ n: number }>(
      "SELECT COUNT(*) AS n FROM analytics_events WHERE event = 'activated' AND user_id IS NULL",
    );
    expect(Number(afterNull!.n)).toBe(Number(beforeNull!.n)); // jamais d'activated anonyme
    // le reste du funnel anonyme continue d'être compté (user_id NULL)
    await anonTrack("pageview");
    const row = await waitFor(() =>
      queryOne<{ user_id: number | null }>(
        `SELECT user_id FROM analytics_events
         WHERE event = 'pageview' AND url = '/p10-test' AND user_id IS NULL
         ORDER BY id DESC LIMIT 1`,
      ),
    );
    expect(row).toBeTruthy();
    expect(row!.user_id).toBeNull();
  });
});

// ------------------------------------------------------------------
// Frontière Business Metrics (cahier 19-21)
// ------------------------------------------------------------------
describe("P1.0 — frontière : analytics ≠ MRR / revenue", () => {
  it("19 — MRR inchangé par un purchase analytics", async () => {
    const u = await makeUser();
    await withDbTxn(async () => {
      const before = await getCanonicalMRR();
      await recordPurchase({
        userId: u,
        transactionId: `P10${STAMP}M19`,
        valueCents: 99900,
        currency: "XOF",
        plan: "Premium",
      });
      expect(await getCanonicalMRR()).toBe(before);
    });
  });

  it("20 — revenue business inchangé par un purchase analytics", async () => {
    const u = await makeUser();
    await withDbTxn(async () => {
      const before = await getBusinessRevenue();
      await recordPurchase({
        userId: u,
        transactionId: `P10${STAMP}M20`,
        valueCents: 99900,
        currency: "XOF",
        plan: "Premium",
      });
      expect(await getBusinessRevenue()).toEqual(before);
    });
  });

  it("21 — business-metrics et conversion-report ne lisent jamais analytics_events", () => {
    const bm = readFileSync(
      join(__dirname, "..", "src", "lib", "business-metrics.ts"),
      "utf8",
    );
    expect(bm).not.toContain("analytics_events");
    expect(bm).not.toContain("analytics-db");
    const cr = readFileSync(
      join(__dirname, "..", "src", "lib", "conversion-report.ts"),
      "utf8",
    );
    expect(cr).not.toContain("analytics_events");
    expect(cr).not.toContain("analytics-db");
  });
});

// ------------------------------------------------------------------
// Growth POST end-to-end + rétention (cahier E2E, 23)
// ------------------------------------------------------------------
describe("P1.0 — growth/metrics end-to-end (SQLite) + rétention explicite", () => {
  it("E2E — POST admin : funnel SQLite vivant, activation, rétention non disponible", async () => {
    // purchase réel posé juste avant le POST : le funnel doit le compter
    const buyer = await makeUser({ email: false });
    const ref = `P10${STAMP}E2E`;
    await makePaidSub(buyer, ref, 4900);
    await sendWh({ event: "payment.success", data: { reference: ref, amount: 4900 } });
    expect(await purchaseCount(ref)).toBe(1);

    const admin = await makeUser({ role: "admin" });
    const token = await createSession(admin);
    mockCookies.set("edukora_session", token);
    const post = async () => {
      const req = new Request("http://localhost/api/growth/metrics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      });
      return (growthPOST as unknown as (r: Request) => Promise<Response>)(req);
    };
    const res = await post();
    expect(res.status).toBe(200);
    const body = (await res.json()) as {
      ok: boolean;
      metrics: Record<string, unknown>;
    };
    expect(body.ok).toBe(true);
    // funnel réellement compté sur SQLite (l'ancien SQL ::text échouait en silence)
    expect(typeof body.metrics.premiumConversions).toBe("number");
    expect(typeof body.metrics.signups).toBe("number");
    expect(typeof body.metrics.pageViews).toBe("number");
    expect(typeof body.metrics.activation).toBe("number");
    expect(Number(body.metrics.premiumConversions)).toBeGreaterThanOrEqual(1);
    // rétention : état explicite, jamais un faux 0
    expect(body.metrics.retention).toBeNull();
    expect(body.metrics.retentionStatus).toBe(
      "non_disponible:_retention_d7_historique_insuffisant",
    );
    // gate admin
    mockCookies.delete("edukora_session");
    const stu = await makeUser();
    mockCookies.set("edukora_session", await createSession(stu));
    expect((await post()).status).toBe(403);
  });

  it("23 — rétention D7 : état non disponible explicite (route + doc)", () => {
    const growthSrc = readFileSync(
      join(__dirname, "..", "src", "app", "api", "growth", "metrics", "route.ts"),
      "utf8",
    );
    expect(growthSrc).toMatch(/retention:\s*null/);
    expect(growthSrc).toMatch(/retentionStatus:\s*"non_disponible/);
    expect(growthSrc).not.toMatch(/retention:\s*0\b/); // jamais de faux 0
    const doc = readFileSync(
      join(__dirname, "..", "docs", "analytics-data-contract.md"),
      "utf8",
    );
    expect(doc).toContain("non_disponible:_retention_d7_historique_insuffisant");
    expect(doc).toMatch(/rétention/i);
  });
});
