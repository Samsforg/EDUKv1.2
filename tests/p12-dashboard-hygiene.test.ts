/**
 * P1.2 — Dashboard Hygiene & Production Data Sync (tests A-H).
 *
 * Verrouille les corrections de la phase P1.2 :
 *   A. un compte réel entre dans les KPI dashboard (entonnoir, conversion,
 *      rapport UTM) ;
 *   B. un compte test n'y entre pas (ni segment, ni mrr, ni signups) ;
 *   C. un compte admin EST compté (STATUT DECISION_REQUIRED — comportement
 *      actuel verrouillé, aucun document métier ne tranche) ;
 *   D. clés UTM en forme courte stockée (`source`, `medium`, `campaign`,
 *      `content`, `term`, `gclid`, `fbclid`) → sortie alias `utm_*`,
 *      un compte = 1 signups même si plusieurs `signup_completed` ;
 *   E. chaîne attribution → signup → activated/purchase → abonnement actif
 *      joignable par `user_id` (mrr_active_cents du segment) ;
 *   F. événement anonyme : compté `*_anon` (« non attribué »), conservé dans
 *      l'entonnoir, **jamais** transformé en inscrit authentifié ni attribué
 *      à un segment ;
 *   G. parrainage admin : comptes test exclus des deux côtés de la relation ;
 *   H. rétention : `retention: null` + `retentionStatus` exact préservés
 *      (aucun faux 0).
 *
 * Mêmes règles que data-trust : deltas capturés AVANT/APRÈS chaque fixture
 * dans une transaction `BEGIN IMMEDIATE` (snapshot figé sous concurrence
 * jest), fixtures isolées par STAMP, nettoyage afterAll restreint à ce STAMP.
 */
import fs from "node:fs";
import path from "node:path";
import { run, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { getCanonicalMRR } from "@/lib/business-metrics";
import { getAnalyticsDashboard7d } from "@/lib/analytics-db";
import { getUtmAcquisitionReport, type UtmAcquisitionReport } from "@/lib/utm-report";
import { getReferralStats } from "@/lib/admin";

const STAMP = `${process.pid}.${Date.now()}${Math.floor(Math.random() * 1000)}`;
const EVENT_URL = `p12-fixture-${STAMP}`;
const created: number[] = [];
const createdSubs: number[] = [];
const createdEvents: number[] = [];
const HASHED = hashPassword("test1234");

const rand = () => Math.random().toString(36).slice(2, 8);

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

async function makeUser(isTest: 0 | 1, role: "student" | "admin" = "student"): Promise<number> {
  const prefix = isTest ? "p12.fixture" : "p12.reel";
  const email = `${prefix}.${STAMP}.${rand()}@edukora.net`;
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test) VALUES (?, ?, ?, 'P12', 'Fixture', ?)`,
    role,
    email,
    HASHED,
    isTest,
  );
  const u = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  created.push(u!.id);
  return u!.id;
}

async function planId(): Promise<number> {
  const p = await queryOne<{ id: number }>("SELECT id FROM subscription_plans ORDER BY id LIMIT 1");
  return p!.id;
}

async function addSub(userId: number, priceCents = 7900): Promise<number> {
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, 'active', ?, ?)`,
    userId,
    await planId(),
    priceCents,
    new Date(Date.now() - 20 * 864e5).toISOString(),
    new Date(Date.now() + 30 * 864e5).toISOString(),
  );
  const s = await queryOne<{ id: number }>("SELECT id FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1", userId);
  createdSubs.push(s!.id);
  return s!.id;
}

async function addEvent(userId: number | null, event: string, props: Record<string, unknown> = {}): Promise<number> {
  await run(
    `INSERT INTO analytics_events (user_id, session_id, event, props, url) VALUES (?, NULL, ?, ?, ?)`,
    userId,
    event,
    JSON.stringify(props),
    EVENT_URL,
  );
  const r = await queryOne<{ id: number }>(
    "SELECT id FROM analytics_events WHERE event = ? AND url = ? ORDER BY id DESC LIMIT 1",
    event,
    EVENT_URL,
  );
  createdEvents.push(r!.id);
  return r!.id;
}

function utmTotals(report: UtmAcquisitionReport): { signups: number; mrr: number; activated: number; purchases: number } {
  if (report.status !== "ok") return { signups: 0, mrr: 0, activated: 0, purchases: 0 };
  return report.rows.reduce(
    (acc, r) => ({
      signups: acc.signups + r.signups,
      mrr: acc.mrr + r.mrr_active_cents,
      activated: acc.activated + r.activated,
      purchases: acc.purchases + r.purchases,
    }),
    { signups: 0, mrr: 0, activated: 0, purchases: 0 },
  );
}

afterAll(async () => {
  for (const id of createdEvents) await run("DELETE FROM analytics_events WHERE id = ?", id);
  for (const id of createdSubs) await run("DELETE FROM subscriptions WHERE id = ?", id);
  // On casse d'abord les références `referred_by` (FK auto-référente) avant
  // de supprimer les comptes, puis on supprime dans l'ordre inverse de
  // création (filleuls avant parrains).
  for (const id of created) await run("UPDATE users SET referred_by = NULL WHERE id = ?", id);
  for (const id of [...created].reverse()) await run("DELETE FROM users WHERE id = ?", id);
  await run(`DELETE FROM analytics_events WHERE url = ?`, EVENT_URL);
  await run(
    `DELETE FROM users WHERE email LIKE 'p12.reel.${STAMP}.%' OR email LIKE 'p12.fixture.${STAMP}.%'`,
  );
});

describe("A — un compte réel entre dans les KPI dashboard", () => {
  it("entonnoir + conversion authentifiée + segment UTM + mrr du segment", () =>
    withDbTxn(async () => {
      const before = await getAnalyticsDashboard7d();
      const beforeUtm = await getUtmAcquisitionReport();

      const real = await makeUser(0);
      await addEvent(real, "signup_completed", { source: "google", medium: "cpc" });
      await addSub(real, 7900);

      const after = await getAnalyticsDashboard7d();
      const afterUtm = await getUtmAcquisitionReport();

      expect(after.funnel.signup).toBe(before.funnel.signup + 1);
      expect(after.conversion.signups_auth).toBe(before.conversion.signups_auth + 1);
      expect(after.conversion.signups_anon).toBe(before.conversion.signups_anon);

      const b = utmTotals(beforeUtm);
      const a = utmTotals(afterUtm);
      expect(a.signups).toBe(b.signups + 1);
      expect(a.mrr).toBe(b.mrr + 7900);
    }));

  it("câblage : espace-admin/analytics utilise le helper partagé, sans citer le prédicat", async () => {
    const root = process.cwd();
    const src = fs.readFileSync(path.join(root, "src/app/espace-admin/analytics/page.tsx"), "utf8");
    expect(src).toContain("getAnalyticsDashboard7d()");
    expect(src).not.toContain("testUsersWhere");
    expect(src).toContain("getBusinessRevenue()");
  });
});

describe("B — un compte test n'entre dans aucun KPI P1.2", () => {
  it("ni dans l'entonnoir, ni dans la conversion, ni dans un segment UTM, ni dans le mrr", () =>
    withDbTxn(async () => {
      const before = await getAnalyticsDashboard7d();
      const beforeUtm = await getUtmAcquisitionReport();

      const testUser = await makeUser(1);
      await addEvent(testUser, "signup_completed", { source: "testsauce", medium: "email" });
      await addSub(testUser, 4900);

      const after = await getAnalyticsDashboard7d();
      const afterUtm = await getUtmAcquisitionReport();

      expect(after.funnel.signup).toBe(before.funnel.signup);
      expect(after.conversion.signups_auth).toBe(before.conversion.signups_auth);
      expect(after.conversion.signups_anon).toBe(before.conversion.signups_anon);

      const b = utmTotals(beforeUtm);
      const a = utmTotals(afterUtm);
      expect(a.signups).toBe(b.signups);
      expect(a.mrr).toBe(b.mrr);
      if (afterUtm.status === "ok") {
        expect(afterUtm.rows.some((r) => r.utm_source === "testsauce")).toBe(false);
      }
    }));
});

describe("C — statut admin : DECISION_REQUIRED, comportement actuel verrouillé", () => {
  it("un compte admin réel EST compté dans le MRR canonique (aucune décision métier trouvée)", () =>
    withDbTxn(async () => {
      const before = await getCanonicalMRR();
      const admin = await makeUser(0, "admin");
      await addSub(admin, 7900);
      const after = await getCanonicalMRR();
      // Verrou : si un jour `role='admin'` entre dans testUsersWhere, ce test
      // échouera — c'est voulu (décision explicite requise, contrat §7).
      expect(after).toBe(before + 7900);
    }));
});

describe("D — clés UTM en forme courte → sortie alias utm_* , dédup par compte", () => {
  it("deux signup_completed du même compte = 1 signups dans son segment", () =>
    withDbTxn(async () => {
      const before = await getUtmAcquisitionReport();
      const beforeTotals = utmTotals(before);

      const real = await makeUser(0);
      const props = {
        source: "utmdemo",
        medium: "cpc",
        campaign: "bac2026",
        content: "banniere",
        term: "revision",
        gclid: "G-TEST-1",
        fbclid: "F-TEST-1",
      };
      await addEvent(real, "signup_completed", props);
      await addEvent(real, "signup_completed", props);

      const after = await getUtmAcquisitionReport();
      expect(after.status).toBe("ok");
      if (after.status !== "ok") return;
      expect(utmTotals(after).signups).toBe(beforeTotals.signups + 1);
      const row = after.rows.find((r) => r.utm_source === "utmdemo");
      expect(row).toBeDefined();
      expect(row!.signups).toBeGreaterThanOrEqual(1);
      expect(row!.utm_medium).toBe("cpc");
      expect(row!.utm_campaign).toBe("bac2026");
      expect(row!.utm_content).toBe("banniere");
      expect(row!.utm_term).toBe("revision");
      expect(row!.gclid).toBe("G-TEST-1");
      expect(row!.fbclid).toBe("F-TEST-1");
    }));
});

describe("E — chaîne attribution → signup → activated/purchase → abonnement actif", () => {
  it("le segment UTM porte signups, activated, purchases et mrr_active_cents", () =>
    withDbTxn(async () => {
      const before = await getUtmAcquisitionReport();
      const beforeTotals = utmTotals(before);

      const real = await makeUser(0);
      await addEvent(real, "signup_completed", { source: "utmachat", medium: "organic" });
      await addEvent(real, "activated", { trigger: "lesson_started" });
      await addEvent(real, "purchase", { transaction_id: `P12-${STAMP}-${rand()}`, value_cents: 7900 });
      await addSub(real, 7900);

      const after = await getUtmAcquisitionReport();
      expect(after.status).toBe("ok");
      expect(before.status).toBe("ok");
      if (after.status !== "ok" || before.status !== "ok") return;
      const afterTotals = utmTotals(after);
      expect(afterTotals.signups).toBe(beforeTotals.signups + 1);
      expect(afterTotals.activated).toBe(beforeTotals.activated + 1);
      expect(afterTotals.purchases).toBe(beforeTotals.purchases + 1);
      expect(afterTotals.mrr).toBe(beforeTotals.mrr + 7900);

      const row = after.rows.find((r) => r.utm_source === "utmachat");
      expect(row).toBeDefined();
      expect(row!.signups).toBeGreaterThanOrEqual(1);
      expect(row!.activated).toBeGreaterThanOrEqual(1);
      expect(row!.purchasers).toBeGreaterThanOrEqual(1);
      expect(row!.mrr_active_cents).toBeGreaterThanOrEqual(7900);
      // identité résolue : la signup n'est pas tombée dans les non attribués
      expect(after.unattributed_signups).toBe(before.unattributed_signups);
    }));
});

describe("F — événement anonyme : non attribué, jamais transformé", () => {
  it("signup sans user_id → *_anon +1, auth inchangé, conservé dans l'entonnoir", () =>
    withDbTxn(async () => {
      const before = await getAnalyticsDashboard7d();
      const beforeUtm = await getUtmAcquisitionReport();

      await addEvent(null, "signup_completed", {});

      const after = await getAnalyticsDashboard7d();
      const afterUtm = await getUtmAcquisitionReport();

      expect(after.conversion.signups_anon).toBe(before.conversion.signups_anon + 1);
      expect(after.conversion.signups_auth).toBe(before.conversion.signups_auth);
      expect(after.funnel.signup).toBe(before.funnel.signup + 1);
      const expectedRate = after.conversion.signups_auth
        ? Math.round((after.conversion.subs_auth / after.conversion.signups_auth) * 100)
        : null;
      expect(after.conversion.rate).toBe(expectedRate);

      if (beforeUtm.status === "ok" && afterUtm.status === "ok") {
        expect(afterUtm.unattributed_signups).toBe(beforeUtm.unattributed_signups + 1);
        expect(utmTotals(afterUtm).signups).toBe(utmTotals(beforeUtm).signups);
      }
    }));
});

describe("G — parrainage admin : comptes test exclus (parrain ET filleul)", () => {
  it("deux filleuls créés (1 réel, 1 test) → totals.referred n'augmente que de 1", () =>
    withDbTxn(async () => {
      const before = await getReferralStats();

      const referrer = await makeUser(0);
      const code = `P12${process.pid}${Date.now()}`;
      await run("UPDATE users SET referral_code = ? WHERE id = ?", code, referrer);

      const realFilleul = await makeUser(0);
      await run("UPDATE users SET referred_by = ? WHERE id = ?", referrer, realFilleul);
      const testFilleul = await makeUser(1);
      await run("UPDATE users SET referred_by = ? WHERE id = ?", referrer, testFilleul);

      const after = await getReferralStats();

      expect(after.totals.referred).toBe(before.totals.referred + 1);
      expect(after.totals.referrers).toBe(before.totals.referrers + 1);
      expect(after.list.some((r) => r.user_id === realFilleul)).toBe(true);
      expect(after.list.some((r) => r.user_id === testFilleul)).toBe(false);
      const topRow = after.top.find((r) => r.user_id === referrer);
      const beforeTop = before.top.find((r) => r.user_id === referrer);
      expect(topRow?.count).toBe((beforeTop?.count ?? 0) + 1);
    }));
});

describe("H — rétention D7 : null + statut exact, aucun faux 0", () => {
  it("growth/metrics conserve retention: null et retentionStatus non_disponible", () => {
    const root = process.cwd();
    const src = fs.readFileSync(path.join(root, "src/app/api/growth/metrics/route.ts"), "utf8");
    expect(src).toMatch(/retention:\s*null/);
    expect(src).toContain('"non_disponible:_retention_d7_historique_insuffisant"');
    expect(src).not.toMatch(/retention:\s*0\b/);
  });
});
