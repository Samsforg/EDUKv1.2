/**
 * P1.0 — correction du bug préexistant `saveMetrics` (growth/data/store.ts).
 *
 * L'ancien SQL répétait les placeholders $2..$9 dans ON CONFLICT : better-
 * sqlite3 compte chaque occurrence (17 > 9 params) → "column index out of
 * range" sur le chemin SQLite (db.ts run), ce qui cassait le recompute
 * admin de /api/growth/metrics. Corrigé en forme portable `excluded.*`
 * (aucun paramètre supplémentaire, SQLite + PostgreSQL).
 *
 * Couverture explicite demandée en P1.0 :
 *   1. insertion d'une date inexistante ;
 *   2. update (upsert) d'une date existante ;
 *   3. valeurs identiques après recompute ;
 *   (+ 4. chemin E2E : tests/p10-funnel.test.ts « E2E — POST admin »).
 */
import { getStore } from "@/lib/growth/data/store";
import { queryOne, run } from "@/lib/db";

// Date figée dans le passé : jamais "latest" pour getLatestMetrics(),
// isolée des écritures des autres suites (aujourd'hui).
const DATE = "1999-01-01";

function metrics(signups: number, pageViews: number) {
  return {
    date: DATE,
    signups,
    activeUsers: 3,
    premiumConversions: 1,
    referralCount: 2,
    quizCompletions: 4,
    koraInteractions: 5,
    pageViews,
    utm: { source: "test" },
  };
}

async function readRow() {
  return queryOne<{
    signups: number;
    active_users: number;
    premium_conversions: number;
    referral_count: number;
    quiz_completions: number;
    kora_interactions: number;
    page_views: number;
    utm: string;
  }>("SELECT signups, active_users, premium_conversions, referral_count, quiz_completions, kora_interactions, page_views, utm FROM growth_metrics WHERE date = ?", DATE);
}

afterAll(async () => {
  await run("DELETE FROM growth_metrics WHERE date = ?", DATE).catch(() => {});
});

describe("P1.0 — saveMetrics (UPSERT portable excluded.*)", () => {
  it("1 — insertion d'une date inexistante", async () => {
    const store = await getStore();
    await run("DELETE FROM growth_metrics WHERE date = ?", DATE).catch(() => {});
    await store.saveMetrics(metrics(11, 100));
    const row = await readRow();
    expect(row).toBeTruthy();
    expect(Number(row!.signups)).toBe(11);
    expect(Number(row!.page_views)).toBe(100);
    expect(JSON.parse(row!.utm)).toEqual({ source: "test" });
  });

  it("2 — update (upsert) d'une date existante : la ligne est remplacée, pas dupliquée", async () => {
    const store = await getStore();
    await store.saveMetrics(metrics(11, 100));
    await store.saveMetrics(metrics(22, 200));
    const row = await readRow();
    expect(Number(row!.signups)).toBe(22);
    expect(Number(row!.page_views)).toBe(200);
    const count = await queryOne<{ n: number }>(
      "SELECT COUNT(*) AS n FROM growth_metrics WHERE date = ?",
      DATE,
    );
    expect(Number(count!.n)).toBe(1); // pas de duplication
  });

  it("3 — recompute avec valeurs identiques : état inchangé (idempotent)", async () => {
    const store = await getStore();
    await store.saveMetrics(metrics(22, 200));
    const before = await readRow();
    await store.saveMetrics(metrics(22, 200)); // recompute du même jour
    const after = await readRow();
    expect(after).toEqual(before);
    expect(Number(after!.signups)).toBe(22);
    expect(Number(after!.premium_conversions)).toBe(1);
    expect(Number(after!.kora_interactions)).toBe(5);
  });
});
