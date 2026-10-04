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
import { run, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

jest.mock("@/lib/sms", () => ({
  sendSubscriptionReminder: jest.fn(),
  sendSms: jest.fn(),
}));
jest.mock("@/lib/logger", () => ({ logger: { info: jest.fn(), warn: jest.fn(), error: jest.fn() } }));

import { sendSubscriptionReminder, sendSms } from "@/lib/sms";
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

async function makeUser(opts: { phone?: string | null; streak?: number; lastActive?: string }): Promise<number> {
  const email = `cron.p0-2.${STAMP}.${Math.random().toString(36).slice(2, 8)}@example.com`;
  await run(
    `INSERT INTO users (role, email, phone, password_hash, first_name, last_name, streak, last_active, last_reactivation_at, is_test)
     VALUES ('student', ?, ?, ?, 'Cron', 'P0', ?, ?, ?, 1)`,
    email,
    opts.phone === undefined ? null : opts.phone,
    hashPassword("test1234"),
    opts.streak ?? 0,
    opts.lastActive ?? new Date().toISOString(),
    new Date().toISOString(),
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