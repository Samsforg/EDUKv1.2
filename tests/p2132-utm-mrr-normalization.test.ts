/**
 * P2.13.2 LOT 3 — Non-régression : `utm-report.mrr_active_cents` normalisé.
 *
 * Contexte : la colonne s'appelle "mrr" et le contrat documenté exige la
 * compatibilité avec `getCanonicalMRR()` (normalisation mensuelle /
 * trimestrielle / annuelle + prix snapshot + repli prix du plan). Avant
 * correction, la requête faisait `SUM(s.price_cents)` brut : un plan
 * trimestriel à 14700 comptait 14700 au lieu de 4900.
 *
 * Protocole : identique à data-trust (fixtures horodatées STAMP, transaction
 * BEGIN IMMEDIATE + COMMIT/ROLLBACK, nettoyage afterAll restreint au STAMP).
 * Base de développement, aucun élargissement de périmètre (mêmes tables,
 * mêmes helpers `run`/`queryOne`).
 */
import { run, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { getUtmAcquisitionReport } from "@/lib/utm-report";

const STAMP = `p2132.${process.pid}.${Date.now()}${Math.floor(Math.random() * 1000)}`;
const HASHED = hashPassword("test1234");
const rand = () => Math.random().toString(36).slice(2, 8);

const createdUsers: number[] = [];
const createdSubs: number[] = [];
const createdPlans: number[] = [];
const createdEvents: number[] = [];

async function withDbTxn<T>(fn: () => Promise<T>): Promise<T> {
  await run("BEGIN IMMEDIATE");
  try {
    const out = await fn();
    await run("COMMIT");
    return out;
  } catch (e) {
    try {
      await run("ROLLBACK");
    } catch {
      // transaction déjà close
    }
    throw e;
  }
}

async function makeUser(): Promise<number> {
  const email = `p2132.reel.${STAMP}.${rand()}@edukora.net`;
  await run(
    "INSERT INTO users (role, email, password_hash, first_name, last_name, is_test) VALUES ('student', ?, ?, 'Mrr', 'Check', 0)",
    email,
    HASHED,
  );
  const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  createdUsers.push(u!.id);
  return u!.id;
}

async function makePlan(name: string, interval: "month" | "quarter", priceCents: number): Promise<number> {
  await run("INSERT INTO subscription_plans (name, interval, price_cents) VALUES (?, ?, ?)", `${name} ${STAMP}`, interval, priceCents);
  const p = await queryOne<{ id: number }>("SELECT id FROM subscription_plans WHERE name = ?", `${name} ${STAMP}`);
  createdPlans.push(p!.id);
  return p!.id;
}

async function addSub(userId: number, planId: number, priceCents: number | null): Promise<void> {
  await run(
    "INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, 'active', ?, ?)",
    userId,
    planId,
    priceCents,
    new Date(Date.now() - 20 * 864e5).toISOString(),
    new Date(Date.now() + 30 * 864e5).toISOString(),
  );
  const s = await queryOne<{ id: number }>("SELECT id FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1", userId);
  createdSubs.push(s!.id);
}

async function signupEvent(userId: number, source: string): Promise<void> {
  await run("INSERT INTO analytics_events (user_id, event, props) VALUES (?, 'signup_completed', ?)", userId, JSON.stringify({ source }));
  const e = await queryOne<{ id: number }>("SELECT id FROM analytics_events WHERE user_id = ? AND event = 'signup_completed' ORDER BY id DESC LIMIT 1", userId);
  createdEvents.push(e!.id);
}

afterAll(async () => {
  for (const id of createdEvents) await run("DELETE FROM analytics_events WHERE id = ?", id);
  for (const id of createdSubs) await run("DELETE FROM subscriptions WHERE id = ?", id);
  for (const id of createdPlans) await run("DELETE FROM subscription_plans WHERE id = ?", id);
  for (const id of createdUsers) await run("DELETE FROM users WHERE id = ?", id);
});

describe("P2.13.2 — utm-report.mrr_active_cents normalisé comme le MRR canonique", () => {
  it("trimestriel 14700 compte 4900 (et non 14700)", () =>
    withDbTxn(async () => {
      const source = `p2132-quarter-${STAMP}`;
      const uid = await makeUser();
      const plan = await makePlan("P2132 Quarter", "quarter", 14700);
      await addSub(uid, plan, 14700);
      await signupEvent(uid, source);
      const rep = await getUtmAcquisitionReport();
      if (rep.status !== "ok") throw new Error(`rapport indisponible: ${rep.reason}`);
      const row = rep.rows.find((r) => r.utm_source === source);
      expect(row).toBeDefined();
      expect(row!.mrr_active_cents).toBe(4900);
    }));

  it("mensuel 4900 compte 4900 (témoin, inchangé)", () =>
    withDbTxn(async () => {
      const source = `p2132-month-${STAMP}`;
      const uid = await makeUser();
      const plan = await makePlan("P2132 Month", "month", 4900);
      await addSub(uid, plan, 4900);
      await signupEvent(uid, source);
      const rep = await getUtmAcquisitionReport();
      if (rep.status !== "ok") throw new Error(`rapport indisponible: ${rep.reason}`);
      const row = rep.rows.find((r) => r.utm_source === source);
      expect(row).toBeDefined();
      expect(row!.mrr_active_cents).toBe(4900);
    }));

  it("prix snapshot NULL → repli sur le prix du plan normalisé", () =>
    withDbTxn(async () => {
      const source = `p2132-fallback-${STAMP}`;
      const uid = await makeUser();
      const plan = await makePlan("P2132 Fallback", "quarter", 14700);
      await addSub(uid, plan, null);
      await signupEvent(uid, source);
      const rep = await getUtmAcquisitionReport();
      if (rep.status !== "ok") throw new Error(`rapport indisponible: ${rep.reason}`);
      const row = rep.rows.find((r) => r.utm_source === source);
      expect(row).toBeDefined();
      expect(row!.mrr_active_cents).toBe(4900);
    }));
});
