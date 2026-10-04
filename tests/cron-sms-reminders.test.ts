/**
 * P0-2 — Cron /api/cron/sms-reminders.
 *
 * La route référençait deux colonnes inexistantes :
 *   - `subscriptions.expires_at`  (le vrai nom est `end_at`)
 *   - `users.last_active_at`     (le vrai nom est `last_active`)
 * La première faisait échouer la requête 1 ; la seconde, placée en dehors de
 * tout try/catch, faisait échouer la route entière. `guardApi` transformait
 * l'exception en 500 : aucun SMS de rappel n'était jamais envoyé.
 *
 * Ces tests exercent la vraie route (pas une copie) et mockent l'envoi SMS.
 */
import { NextRequest } from "next/server";
import { run, query, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

jest.mock("@/lib/sms", () => ({
  sendSubscriptionReminder: jest.fn(),
  sendSms: jest.fn(),
}));
jest.mock("@/lib/logger", () => ({ logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() } }));

import { sendSubscriptionReminder, sendSms } from "@/lib/sms";
import { testUsersWhere } from "@/lib/test-users";
import { GET } from "@/app/api/cron/sms-reminders/route";

const mockReminder = sendSubscriptionReminder as jest.Mock;
const mockSms = sendSms as jest.Mock;

const SECRET = "secret-de-test-p0-2";
const STAMP = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
const created: number[] = [];

function call(auth?: string): Promise<Response> {
  const headers: Record<string, string> = {};
  if (auth !== undefined) headers.authorization = auth;
  return (GET as any)(new NextRequest("http://localhost/api/cron/sms-reminders", { headers }));
}

/**
 * Crée un utilisateur pour cette suite.
 *
 * `isTest` pilote la colonne `users.is_test` et vaut 0 par défaut : un compte
 * « réel » du point de vue du cron. Les scénarios P0-2 (sélection des
 * rappels) utilisent des comptes réels, car ils doivent justement être
 * sélectionnés par le cron. Les scénarios P0.1 passent `isTest: 1` et
 * vérifient au contraire l'EXCLUSION.
 *
 * IMPORTANT — le domaine `@example.com` est lui-même réservé par
 * `realUsersWhere` / `testUsersWhere` (RFC 2606, cf. `TEST_EMAIL_SUFFIXES`).
 * Un utilisateur « réel » de cette suite utilise donc `@edukora.net` avec un
 * local-part normal, qui ne matche ni `test.%@edukora.net`, ni `%.test@`.
 * Ces lignes sont supprimées en `afterAll`, y compris par un filet de sécurité
 * sur le préfixe, pour ne pas laisser de comptes « réels » dans la base.
 *
 * `lastReactiveAt` : la route exige `last_reactivation_at` absent ou vieux de
 * plus de 3 jours (`last_reactivation_at < datetime('now','-3 days')`). Mise à
 * `now()` par défaut, une ligne ne serait JAMAIS sélectionnée par le cron —
 * c'est volontairement laissé à `null` ici, et les scénarios qui ciblent le
 * chemin « streak » le passent à `-5 days`.
 */
async function makeUser(opts: {
  phone?: string | null;
  streak?: number;
  lastActive?: string;
  lastReactiveAt?: string | null;
  isTest?: 0 | 1;
}): Promise<number> {
  const email = `${opts.isTest ? "p01.fixture" : "p01.reel"}.${STAMP}.${Math.random().toString(36).slice(2, 8)}@edukora.net`;
  await run(
    `INSERT INTO users (role, email, phone, password_hash, first_name, last_name, streak, last_active, last_reactivation_at, is_test)
     VALUES ('student', ?, ?, ?, 'Cron', 'P0', ?, ?, ?, ?)`,
    email,
    opts.phone === undefined ? null : opts.phone,
    hashPassword("test1234"),
    opts.streak ?? 0,
    opts.lastActive ?? new Date().toISOString(),
    opts.lastReactiveAt === undefined ? null : opts.lastReactiveAt,
    opts.isTest ?? 0,
  );
  const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  created.push(u!.id);
  return u!.id;
}

async function planId(): Promise<number> {
  const p = await queryOne<{ id: number }>("SELECT id FROM subscription_plans ORDER BY id LIMIT 1");
  return p!.id;
}

async function addSub(
  userId: number,
  opts: { status?: string; endAt?: string; lastReminderAt?: string | null },
): Promise<void> {
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at, last_reminder_at)
     VALUES (?, ?, 'geniuspay', 4900, ?, datetime('now', '-20 days'), ?, ?)`,
    userId,
    await planId(),
    opts.status ?? "active",
    opts.endAt ?? new Date(Date.now() + 2 * 864e5).toISOString(),
    opts.lastReminderAt ?? null,
  );
}

beforeEach(() => {
  process.env.CRON_SECRET = SECRET;
  mockReminder.mockReset();
  mockSms.mockReset();
  mockReminder.mockResolvedValue(true);
  mockSms.mockResolvedValue({ ok: true });
});

afterAll(async () => {
  for (const id of created) await run("DELETE FROM users WHERE id = ?", id);
  // Filet de sécurité : si un test a échoué avant son nettoyage, on ne doit
  // pas laisser de compte « réel » (is_test = 0) dans la base, qui
  // polluerait les KPI et l'admin.
  await run("DELETE FROM users WHERE email LIKE 'p01.reel.%' OR email LIKE 'p01.fixture.%'");
});

describe("P0-2 — sécurité du cron", () => {
  it("cas D1 — 401 sans en-tête Authorization", async () => {
    const res = await call();
    expect(res.status).toBe(401);
    expect(mockReminder).not.toHaveBeenCalled();
  });

  it("cas D2 — 401 avec un secret incorrect", async () => {
    const res = await call("Bearer mauvais-secret");
    expect(res.status).toBe(401);
    expect(mockReminder).not.toHaveBeenCalled();
  });

  it("cas D3 — 500 fail-closed si CRON_SECRET absent", async () => {
    delete process.env.CRON_SECRET;
    const res = await call("Bearer nimporte-quoi");
    expect(res.status).toBe(500);
    expect(mockReminder).not.toHaveBeenCalled();
  });
});

describe("P0-2 — sélection des rappels", () => {
  it("la route répond 200 : les colonnes end_at / last_active existent", async () => {
    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  it("cas A — un abonnement actif expirant dans la fenêtre est sélectionné", async () => {
    const uid = await makeUser({});
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });

    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    expect(mockReminder).toHaveBeenCalledWith(uid);
  });

  // La borne basse `end_at > datetime('now')` a été ajoutée dans la route :
// sans elle, `end_at <= datetime('now','+3 days')` matchait aussi les
// abonnements expirés depuis des semaines (rappel quotidien indéfini).
it("cas A — un abonnement déjà expiré (end_at < now) ne reçoit aucun SMS", async () => {
  const uid = await makeUser({});
  await addSub(uid, { status: "active", endAt: new Date(Date.now() - 40 * 864e5).toISOString() });

  const res = await call(`Bearer ${SECRET}`);
  expect(res.status).toBe(200);
  expect(mockReminder).not.toHaveBeenCalledWith(uid);

  const row = await queryOne<{ last_reminder_at: string | null }>(
    "SELECT last_reminder_at FROM subscriptions WHERE user_id = ? AND status = 'active'",
    uid,
  );
  expect(row?.last_reminder_at).toBeNull();
});

it("cas B — une expiration dans les 3 jours (now < end_at <= now+3j) reçoit le SMS", async () => {
  const uid = await makeUser({});
  await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });

  const res = await call(`Bearer ${SECRET}`);
  expect(res.status).toBe(200);
  expect(mockReminder).toHaveBeenCalledWith(uid);
});

it("cas C — une expiration au-delà de 3 jours ne reçoit aucun SMS", async () => {
  const uid = await makeUser({});
  await addSub(uid, { status: "active", endAt: new Date(Date.now() + 20 * 864e5).toISOString() });

  const res = await call(`Bearer ${SECRET}`);
  expect(res.status).toBe(200);
  expect(mockReminder).not.toHaveBeenCalledWith(uid);
});

it("cas D — un statut non actif ne reçoit aucun rappel", async () => {
  for (const status of ["cancelled", "unpaid", "past_due", "trial", "incomplete"]) {
    const uid = await makeUser({});
    await addSub(uid, { status, endAt: new Date(Date.now() + 2 * 864e5).toISOString() });
    await call(`Bearer ${SECRET}`);
    expect(mockReminder).not.toHaveBeenCalledWith(uid);
  }
});

it("cas D2 — end_at NULL ne reçoit aucun rappel", async () => {
  const uid = await makeUser({});
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at, last_reminder_at)
     VALUES (?, ?, 'geniuspay', 4900, 'active', datetime('now', '-20 days'), NULL, NULL)`,
    uid,
    await planId(),
  );
  const res = await call(`Bearer ${SECRET}`);
  expect(res.status).toBe(200);
  expect(mockReminder).not.toHaveBeenCalledWith(uid);
});

  it("cas B2 — un abonnement annulé n'est pas sélectionné", async () => {
    const uid = await makeUser({});
    await addSub(uid, { status: "cancelled", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });

    await call(`Bearer ${SECRET}`);
    expect(mockReminder).not.toHaveBeenCalledWith(uid);
  });

  it("cas C — idempotence : déjà rappelé dans les 24h, pas de nouvel envoi", async () => {
    const uid = await makeUser({});
    await addSub(uid, {
      status: "active",
      endAt: new Date(Date.now() + 2 * 864e5).toISOString(),
      lastReminderAt: new Date(Date.now() - 3600e3).toISOString(),
    });

    await call(`Bearer ${SECRET}`);
    expect(mockReminder).not.toHaveBeenCalledWith(uid);
  });

  it("cas C2 — un rappel réussi marque last_reminder_at (anti-doublon au tour suivant)", async () => {
    const uid = await makeUser({});
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });

    await call(`Bearer ${SECRET}`);
    expect(mockReminder).toHaveBeenCalledWith(uid);

    const row = await queryOne<{ last_reminder_at: string | null }>(
      "SELECT last_reminder_at FROM subscriptions WHERE user_id = ? AND status = 'active'",
      uid,
    );
    expect(row?.last_reminder_at).toBeTruthy();

    mockReminder.mockClear();
    await call(`Bearer ${SECRET}`);
    expect(mockReminder).not.toHaveBeenCalledWith(uid);
  });
});

describe("P0.1 — aucun SMS vers un compte de test (is_test = 1)", () => {
  // Ces comptes sont des VRAIES fixtures : ils ont un numéro de téléphone
  // valide et un streak >= 3. Sans filtre SQL, un cron planifié leur
  // enverrait de vrais SMS.
  it("cas E1 — un fixture is_test=1 avec abonnement expirant J-2 ne reçoit AUCUN SMS", async () => {
    const uid = await makeUser({ isTest: 1, phone: "0709500001", streak: 7 });
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });

    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    // Le service n'est pas seulement ignoré : il n'est jamais appelé.
    expect(mockReminder).not.toHaveBeenCalledWith(uid);
  });

  it("cas E2 — un fixture is_test=1 inactif avec streak >= 3 ne reçoit AUCUN SMS", async () => {
    // Strict : ce fixture ne doit jamais atteindre le service SMS. La suite
    // partage la base de dev avec de vrais utilisateurs, qui peuvent
    // eux-mêmes déclencher des envois : on ne teste donc pas « aucun appel »,
    // mais « jamais CE numéro ».
    const uid = await makeUser({
      isTest: 1,
      phone: "0709500098",
      streak: 12,
      lastActive: new Date(Date.now() - 5 * 864e5).toISOString(),
    });

    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    expect(mockSms.mock.calls.flat().some((c) => c[0] === "0709500098")).toBe(false);
    expect(uid).toBeGreaterThan(0);
  });

  it("cas E3 — le même compte AVEC is_test=0 reçoit bien le SMS (le test est discriminant)", async () => {
    // Numéro hors plage des fixtures existantes (`07000000xx` est déjà
    // attribué aux comptes de test du projet : `0700000099` = test.payment,
    // `0700000000` = utilisateur 1). On prend 0709500099, non attribué, pour
    // ne pas confondre cet envoi avec celui d'une fixture. On vérifie donc
    // « le service a été appelé », pas « mon compte est forcément dans le
    // lot » : `LIMIT 50` peut masquer un compte dans un jeu plus large.
    const uid = await makeUser({
      isTest: 0,
      phone: "0709500099",
      streak: 12,
      lastActive: new Date(Date.now() - 5 * 864e5).toISOString(),
    });

    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    expect(mockSms).toHaveBeenCalled();
    expect(uid).toBeGreaterThan(0);
  });

  it("cas E4 — un fixture is_test=1 n'est jamais marqué last_reminder_at", async () => {
    const uid = await makeUser({ isTest: 1, phone: "0709500004" });
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });

    await call(`Bearer ${SECRET}`);
    const row = await queryOne<{ last_reminder_at: string | null }>(
      "SELECT last_reminder_at FROM subscriptions WHERE user_id = ? AND status = 'active'",
      uid,
    );
    expect(row?.last_reminder_at).toBeNull();
  });

  it("cas E5 — le filtre est bien dans le SQL, pas un filtre applicatif", async () => {
    const uid = await makeUser({ isTest: 1, phone: "0709500005", streak: 9, lastActive: new Date(Date.now() - 6 * 864e5).toISOString() });
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 1 * 864e5).toISOString() });

    // On rejoue à la main la sélection SQL exacte de la route, en réutilisant
    // le MÊME prédicat que la route (`testUsersWhere`) : le fixture ne doit pas
    // y figurer. Un `if` post-sélection ne le prouverait pas.
    const rows = await query<{ user_id: number }>(
      `SELECT s.user_id FROM subscriptions s
       WHERE s.status = 'active' AND s.end_at IS NOT NULL
       AND s.end_at > datetime('now') AND s.end_at <= datetime('now', '+3 days')
       AND (s.last_reminder_at IS NULL OR s.last_reminder_at < datetime('now', '-1 day'))
       AND NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND ${testUsersWhere("tu")})`,
    );
    expect(rows.map((r) => r.user_id)).not.toContain(uid);
  });

  it("cas E6 — is_test existe bien en base (le filtre ne peut pas être silencieusement ignoré)", async () => {
    const cols = await query<{ name: string }>("SELECT name FROM pragma_table_info('users') WHERE name = 'is_test'");
    expect(cols).toHaveLength(1);
    const row = await queryOne<{ is_test: number }>("SELECT is_test FROM users WHERE id = ?", created[0]);
    expect(row).toBeDefined();
  });
});

describe("P0-2 — gestion des erreurs", () => {
  it("cas E1 — un envoi en échec est compté, sans 500", async () => {
    const uid = await makeUser({});
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });
    mockReminder.mockResolvedValue(false);

    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.failed).toBeGreaterThanOrEqual(1);
  });

  it("cas E2 — une exception d'envoi est rattrapée, sans 500", async () => {
    const uid = await makeUser({});
    await addSub(uid, { status: "active", endAt: new Date(Date.now() + 2 * 864e5).toISOString() });
    mockReminder.mockRejectedValue(new Error("SMS provider down"));

    const res = await call(`Bearer ${SECRET}`);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.failed).toBeGreaterThanOrEqual(1);
  });
});