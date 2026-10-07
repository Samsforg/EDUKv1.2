/**
 * P0.5 — Data Trust / Business Metrics Gate.
 *
 * Prouve que les métriques business (utilisateurs, clients payants, MRR,
 * abonnements actifs, revenu) sont insensibles aux comptes de test, en
 * exerçant la fonction canonique `getConversionStats()` et le prédicat
 * `testUsersWhere` — les mêmes que la production.
 *
 * Approche : mesures relatives (delta autour d'un état de référence capturé
 * juste avant chaque fixture). Aucun test ne dépend d'une donnée historique
 * de la base de développement : seule la variation provoquée par la fixture
 * est assertée.
 *
 * P1.0 — déterminisme sous jest parallèle (Partie 0) :
 * chaque scénario à deltas globaux tourne dans une transaction
 * `BEGIN IMMEDIATE` / `COMMIT`. SQLite n'autorise qu'un seul writer à la
 * fois (WAL + busy_timeout=10000 côté db.ts) : les écritures des autres
 * workers sont serialisées et le couple avant/après observe un snapshot
 * figé. Le delta de la fixture devient exact, sans supprimer d'assertion,
 * sans retry ni timeout. Les fixtures sont isolées par STAMP unique
 * (pid + timestamp + aléa) et nettoyées uniquement pour ce STAMP.
 */
import { run, queryOne } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { getConversionStats } from "@/lib/conversion-report";
import { getCanonicalMRR, getBusinessRevenue } from "@/lib/business-metrics";
import { realUsersWhere, testUsersWhere } from "@/lib/test-users";

const STAMP = `${process.pid}.${Date.now()}${Math.floor(Math.random() * 1000)}`;
const created: number[] = [];
const createdSubs: number[] = [];
/** Pré-calculé hors transactions : bcrypt est CPU-only, pas besoin de le retenir sous le lock d'écriture. */
const HASHED = hashPassword("test1234");

const rand = () => Math.random().toString(36).slice(2, 8);

/**
 * Exécute `fn` dans une transaction d'écriture immédiate : la connexion
 * devient le seul writer SQLite le temps du scénario, ce qui rend les
 * mesures avant/après insensibles aux écritures concurrentes des autres
 * processes jest. En cas d'échec d'assertion, ROLLBACK annule les fixtures
 * (le nettoyage afterAll reste sans effet sur des ids inexistants).
 */
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

async function makeUser(isTest: 0 | 1): Promise<number> {
  const email = `${isTest ? "dt.fixture" : "dt.reel"}.${STAMP}.${rand()}@edukora.net`;
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test) VALUES ('student', ?, ?, 'Data', 'Trust', ?)`,
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

async function addSub(
  userId: number,
  opts: { status?: string; priceCents?: number; endAt?: string; startedAt?: string } = {},
): Promise<number> {
  await run(
    `INSERT INTO subscriptions (user_id, plan_id, provider, price_cents, status, started_at, end_at) VALUES (?, ?, 'geniuspay', ?, ?, ?, ?)`,
    userId,
    await planId(),
    opts.priceCents ?? 4900,
    opts.status ?? "active",
    opts.startedAt ?? new Date(Date.now() - 20 * 864e5).toISOString(),
    opts.endAt ?? new Date(Date.now() + 30 * 864e5).toISOString(),
  );
  const s = await queryOne<{ id: number }>("SELECT id FROM subscriptions WHERE user_id = ? ORDER BY id DESC LIMIT 1", userId);
  createdSubs.push(s!.id);
  return s!.id;
}

/** Clients payants réels : utilisateurs réels avec au moins un abonnement actif. */
async function realCustomers(): Promise<number> {
  const r = await queryOne<{ c: number }>(
    `SELECT COUNT(DISTINCT u.id) AS c FROM users u JOIN subscriptions s ON s.user_id = u.id WHERE s.status = 'active' AND ${realUsersWhere("u")}`,
  );
  return Number(r?.c ?? 0);
}

afterAll(async () => {
  for (const id of createdSubs) await run("DELETE FROM subscriptions WHERE id = ?", id);
  for (const id of created) await run("DELETE FROM users WHERE id = ?", id);
  // Nettoyage restreint au STAMP de cette exécution : ne jamais toucher aux
  // fixtures d'une autre exécution éventuellement parallèle.
  await run(
    `DELETE FROM users WHERE email LIKE 'dt.reel.${STAMP}.%' OR email LIKE 'dt.fixture.${STAMP}.%'`,
  );
});

describe("P0.5 — Data Trust : les comptes de test ne polluent pas les KPI business", () => {
  it("scénario 1 — un compte test avec abonnement actif n'augmente ni MRR, ni customers, ni revenu", () =>
    withDbTxn(async () => {
    const before = await getConversionStats();
    const beforeCustomers = await realCustomers();

    const testUser = await makeUser(1);
    await addSub(testUser, { status: "active", priceCents: 4900, startedAt: new Date().toISOString() });

    const after = await getConversionStats();
    const afterCustomers = await realCustomers();

    expect(after.mrr_cents).toBe(before.mrr_cents);
    expect(after.subscriptions_active).toBe(before.subscriptions_active);
    expect(after.revenue_today_cents).toBe(before.revenue_today_cents);
    expect(afterCustomers).toBe(beforeCustomers);
    expect(after.total_users).toBe(before.total_users);
  }));

  it("scénario 2 — un compte réel avec abonnement actif augmente MRR, customers et revenu", () =>
    withDbTxn(async () => {
    const before = await getConversionStats();
    const beforeCustomers = await realCustomers();

    const realUser = await makeUser(0);
    await addSub(realUser, { status: "active", priceCents: 4900, startedAt: new Date().toISOString() });

    const after = await getConversionStats();
    const afterCustomers = await realCustomers();

    expect(after.mrr_cents).toBe(before.mrr_cents + 4900);
    expect(after.subscriptions_active).toBe(before.subscriptions_active + 1);
    expect(after.revenue_today_cents).toBe(before.revenue_today_cents + 4900);
    expect(afterCustomers).toBe(beforeCustomers + 1);
    expect(after.total_users).toBe(before.total_users + 1);
  }));

  it("scénario 3 — un compte réel sans abonnement n'est pas un client payant", () =>
    withDbTxn(async () => {
    const before = await getConversionStats();
    const beforeCustomers = await realCustomers();

    await makeUser(0);

    const after = await getConversionStats();
    const afterCustomers = await realCustomers();

    expect(after.mrr_cents).toBe(before.mrr_cents);
    expect(after.subscriptions_active).toBe(before.subscriptions_active);
    expect(afterCustomers).toBe(beforeCustomers);
    expect(after.total_users).toBe(before.total_users + 1);
  }));

  it("scénario 4 — un abonnement annulé ne compte pas dans le MRR", () =>
    withDbTxn(async () => {
    const before = await getConversionStats();

    const realUser = await makeUser(0);
    await addSub(realUser, { status: "cancelled", priceCents: 4900 });

    const after = await getConversionStats();

    expect(after.mrr_cents).toBe(before.mrr_cents);
    expect(after.subscriptions_active).toBe(before.subscriptions_active);
  }));

  it("scénario 5 — un abonnement actif dont end_at est passé reste compté (règle métier existante)", () =>
    withDbTxn(async () => {
    const before = await getConversionStats();

    const realUser = await makeUser(0);
    await addSub(realUser, {
      status: "active",
      priceCents: 4900,
      endAt: new Date(Date.now() - 864e5).toISOString(),
    });

    const after = await getConversionStats();

    expect(after.mrr_cents).toBe(before.mrr_cents + 4900);
  }));

  it("scénario 6 — le prédicat testUsersWhere exclut un compte test d'une requête business", async () => {
    const testUser = await makeUser(1);
    await addSub(testUser, { status: "active", priceCents: 4900 });

    const r = await queryOne<{ c: number }>(
      `SELECT COUNT(*) AS c FROM subscriptions s WHERE s.status = 'active' AND NOT EXISTS (SELECT 1 FROM users tu WHERE tu.id = s.user_id AND (${testUsersWhere("tu")})) AND s.user_id = ?`,
      testUser,
    );
    expect(Number(r?.c ?? 0)).toBe(0);
  });
});

describe("P0.7 — Consolidation Business Metrics (cohérence cross-page)", () => {
  it("MRR_A == MRR_B : getCanonicalMRR() et getConversionStats().mrr_cents donnent la même valeur", () =>
    withDbTxn(async () => {
      const mrrA = await getCanonicalMRR();
      const stats = await getConversionStats();
      expect(mrrA).toBe(stats.mrr_cents);
    }));

  it("abonnements actifs cohérents : getBusinessRevenue().count == getConversionStats().subscriptions_active", () =>
    withDbTxn(async () => {
      const rev = await getBusinessRevenue();
      const stats = await getConversionStats();
      expect(rev.count).toBe(stats.subscriptions_active);
    }));

  it("cohérence sur fixture : un abonnement réel se répercute identiquement des deux côtés", () =>
    withDbTxn(async () => {
    const beforeMrr = await getCanonicalMRR();
    const beforeStats = await getConversionStats();
    const beforeRev = await getBusinessRevenue();

    const realUser = await makeUser(0);
    await addSub(realUser, { status: "active", priceCents: 14700, startedAt: new Date().toISOString() });

    const afterMrr = await getCanonicalMRR();
    const afterStats = await getConversionStats();
    const afterRev = await getBusinessRevenue();

    expect(afterMrr).toBe(beforeMrr + 14700);
    expect(afterStats.mrr_cents).toBe(beforeStats.mrr_cents + 14700);
    expect(afterMrr).toBe(afterStats.mrr_cents);
    expect(afterRev.count).toBe(beforeRev.count + 1);
    expect(afterRev.count).toBe(afterStats.subscriptions_active);
    expect(afterRev.total_cents).toBe(beforeRev.total_cents + 14700);
  }));

  it("S1 — un compte test avec abonnement actif n'augmente ni getCanonicalMRR, ni getBusinessRevenue", () =>
    withDbTxn(async () => {
    const beforeMrr = await getCanonicalMRR();
    const beforeRev = await getBusinessRevenue();

    const testUser = await makeUser(1);
    await addSub(testUser, { status: "active", priceCents: 4900, startedAt: new Date().toISOString() });

    const afterMrr = await getCanonicalMRR();
    const afterRev = await getBusinessRevenue();

    expect(afterMrr).toBe(beforeMrr);
    expect(afterRev.total_cents).toBe(beforeRev.total_cents);
    expect(afterRev.count).toBe(beforeRev.count);
  }));

  it("S3 — un trial actif (non facturé) n'entre pas dans le MRR : MRR ≠ trial", () =>
    withDbTxn(async () => {
    const beforeMrr = await getCanonicalMRR();
    const beforeRev = await getBusinessRevenue();
    const beforeStats = await getConversionStats();

    const realUser = await makeUser(0);
    await addSub(realUser, { status: "trial", priceCents: 4900, startedAt: new Date().toISOString() });

    const afterMrr = await getCanonicalMRR();
    const afterRev = await getBusinessRevenue();
    const afterStats = await getConversionStats();

    expect(afterMrr).toBe(beforeMrr);
    expect(afterStats.mrr_cents).toBe(beforeStats.mrr_cents);
    expect(afterRev.total_cents).toBe(beforeRev.total_cents);
    expect(afterRev.count).toBe(beforeRev.count);
    expect(afterMrr).toBe(afterStats.mrr_cents);
  }));

  it("S4 — dataset mixte (1 test actif + 1 réel actif) : seuls les réels comptent", () =>
    withDbTxn(async () => {
    const beforeMrr = await getCanonicalMRR();
    const beforeStats = await getConversionStats();

    const testUser = await makeUser(1);
    await addSub(testUser, { status: "active", priceCents: 9999, startedAt: new Date().toISOString() });
    const realUser = await makeUser(0);
    await addSub(realUser, { status: "active", priceCents: 4900, startedAt: new Date().toISOString() });

    const afterMrr = await getCanonicalMRR();
    const afterStats = await getConversionStats();

    expect(afterMrr).toBe(beforeMrr + 4900);
    expect(afterStats.mrr_cents).toBe(beforeStats.mrr_cents + 4900);
    expect(afterMrr).toBe(afterStats.mrr_cents);
    expect(afterStats.subscriptions_active).toBe(beforeStats.subscriptions_active + 1);
  }));

  it("câblage : revenus/page.tsx utilise getCanonicalMRR et analytics/page.tsx utilise getBusinessRevenue", async () => {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const root = process.cwd();

    const revenus = await fs.readFile(path.join(root, "src/app/espace-admin/revenus/page.tsx"), "utf8");
    expect(revenus).toContain("getCanonicalMRR()");

    const analytics = await fs.readFile(path.join(root, "src/app/espace-admin/analytics/page.tsx"), "utf8");
    expect(analytics).toContain("getBusinessRevenue()");
    expect(analytics).not.toContain("testUsersWhere");
  });
});
