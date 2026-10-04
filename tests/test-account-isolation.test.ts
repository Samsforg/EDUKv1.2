/**
 * P0-1 — Isolation des comptes de test.
 *
 * Vérifie que les KPIs business (utilisateurs, MRR) ne comptent jamais un
 * compte de test, et que le marqueur structurel `users.is_test` fonctionne
 * même quand l'email d'une fixture ressemble à un email réel.
 *
 * Les prédicats testés sont ceux réellement importés par le reporting
 * (src/lib/admin.ts, src/lib/conversion-report.ts, src/lib/stats.ts).
 */
import { run, query, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { isTestEmail, isTestUser, realUsersWhere, testUsersWhere } from "@/lib/test-users";

const STAMP = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
/** Domaines que la heuristique doit continuer à traiter comme « test ». */
const RESERVED = ["@test.ci", "@test.dev", "@e2e.test", "@mailtest.fr", "@example.com", "@edu.test", "@local.test"];

const created: number[] = [];

/** Email d'un vrai inscrit : domaine de prod, local-part anodin. */
function realEmail(tag: string): string {
  return `${tag}.${STAMP}@edukora.net`;
}

async function makeUser(email: string, isTest: 0 | 1): Promise<number> {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, class_level, referral_code, is_test)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    "student",
    email,
    hashPassword("test1234"),
    "P0",
    "Un",
    "Terminale",
    `EDK-P0-${Math.random().toString(36).slice(2, 9).toUpperCase()}`,
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

async function addActiveSub(userId: number, priceCents: number): Promise<void> {
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at)
     VALUES (?, ?, 'geniuspay', ?, 'active', datetime('now', '-10 days'), datetime('now', '+20 days'))`,
    userId,
    await planId(),
    priceCents,
  );
}

/** MRR tel que le dashboard le calcule (miroir de admin.ts `realOnly`). */
async function realMrrFor(userId: number): Promise<{ c: number; mrr: number }> {
  const realOnly = `NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")}))`;
  const r = await queryOne<{ c: number; mrr: number }>(
    `SELECT COUNT(*) AS c, COALESCE(SUM(s.price_cents), 0) AS mrr
     FROM subscriptions s WHERE s.status = 'active' AND s.user_id = ? AND ${realOnly}`,
    userId,
  );
  return { c: Number(r?.c ?? 0), mrr: Number(r?.mrr ?? 0) };
}

async function isCountedReal(userId: number): Promise<boolean> {
  const r = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM users u WHERE u.id = ? AND ${realUsersWhere()}`,
    userId,
  );
  return Number(r?.c ?? 0) > 0;
}

afterAll(async () => {
  for (const id of created) await run("DELETE FROM users WHERE id = ?", id);
});

describe("P0-1 — isTestEmail / isTestUser", () => {
  it.each(RESERVED)("classe %s comme email de test", (suffix) => {
    expect(isTestEmail(`fixture${suffix}`)).toBe(true);
  });

  it("classe la convention de test sur edukora.net", () => {
    expect(isTestEmail("prof.test@edukora.net")).toBe(true);
    expect(isTestEmail("eleve1.test@edukora.net")).toBe(true);
    expect(isTestEmail("test.payment@edukora.net")).toBe(true);
  });

  it("ne classe pas un vrai compte comme test", () => {
    expect(isTestEmail("support@edukora.net")).toBe(false);
    expect(isTestEmail(`parent.${STAMP}@edukora.net`)).toBe(false);
  });

  it("isTestUser honore le marqueur même avec un email réaliste", () => {
    expect(isTestUser(`real-looking.${STAMP}@edukora.net`, 1)).toBe(true);
    expect(isTestUser(`real-looking.${STAMP}@edukora.net`, 0)).toBe(false);
    expect(isTestUser(null, 1)).toBe(true);
    expect(isTestUser(null, 0)).toBe(false);
  });
});

describe("P0-1 — reporting des comptes réels", () => {
  it("cas 1 — un compte réel (is_test=0, email normal) est compté comme réel", async () => {
    const id = await makeUser(realEmail("utilisateur.reel"), 0);
    expect(await isCountedReal(id)).toBe(true);
  });

  it("cas 2 — un compte is_test=1 est exclu même avec un email normal", async () => {
    const id = await makeUser(realEmail("piège.flag"), 1);
    expect(await isCountedReal(id)).toBe(false);
  });

  it("cas 3 — un compte de test avec un abonnement actif n'entre pas dans le MRR", async () => {
    const id = await makeUser(`fixture.${STAMP}@example.com`, 0);
    await addActiveSub(id, 14700);
    expect(await realMrrFor(id)).toEqual({ c: 0, mrr: 0 });
  });

  it("cas 4 — un compte réel avec un abonnement actif entre dans le MRR", async () => {
    const id = await makeUser(realEmail("payant.reel"), 0);
    await addActiveSub(id, 14700);
    expect(await realMrrFor(id)).toEqual({ c: 1, mrr: 14700 });
  });

  it("cas 5 — une nouvelle fixture est exclue même sans is_test (filet email réservé)", async () => {
    // Simule une fixture créée après le passage des migrations : is_test=0,
    // mais l'email est un domaine réservé → le filet de sécurité l'exclut.
    for (const suffix of RESERVED) {
      const id = await makeUser(`nouvelle.fixture${suffix}`, 0);
      expect(await isCountedReal(id)).toBe(false);
      await addActiveSub(id, 4900);
      expect(await realMrrFor(id)).toEqual({ c: 0, mrr: 0 });
    }
  });
});

describe("P0-1 — migration du marqueur", () => {
  it("la colonne is_test existe et vaut 0/1", async () => {
    const cols = await query<{ name: string }>("SELECT name FROM pragma_table_info(?) WHERE name = 'is_test'", "users");
    expect(cols.length).toBe(1);
  });

  it("un compte créé avant la migration avec un email réservé porte is_test=1", async () => {
    // Les fixtures historiques (ex. flow-test-*@example.com) ont été marquées
    // par le backfill `UPDATE users SET is_test = 1 …`.
    const r = await queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM users WHERE is_test = 1 AND LOWER(COALESCE(email,'')) LIKE '%@example.com'",
    );
    expect(Number(r?.c ?? 0)).toBeGreaterThan(0);
  });

  it("aucun compte réel n'a été marqué par erreur", async () => {
    // `support@edukora.net` est le vrai compte admin : il ne matche aucun
    // motif réservé et doit rester is_test = 0.
    const r = await queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM users WHERE LOWER(COALESCE(email,'')) = 'support@edukora.net' AND is_test = 1",
    );
    expect(Number(r?.c ?? 0)).toBe(0);
  });

  it("le prédicat testUsersWhere sélectionne les fixtures marquées ET les emails réservés", async () => {
    const flagged = await queryOne<{ c: number }>(
      `SELECT COUNT(*) AS c FROM users u WHERE ${testUsersWhere()}`,
    );
    const total = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM users");
    expect(Number(flagged?.c ?? 0)).toBeGreaterThan(0);
    expect(Number(flagged?.c ?? 0)).toBeLessThan(Number(total?.c ?? 0));
  });
});