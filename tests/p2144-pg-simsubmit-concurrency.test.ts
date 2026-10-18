/**
 * P2.14.4 — Concurrence PostgreSQL de l'idempotence simulateur (LOT 4).
 *
 * NE TOURNE QUE sur base PostgreSQL isolée explicitement autorisée :
 *   P2144_ALLOW_PG_TESTS=1 + TEST_DATABASE_URL=<url-test-dediee>
 * Sinon : suite SKIPPÉE (jamais d'échec artificiel, jamais de connexion par
 * défaut). Refus actif si la cible ne ressemble pas à une base de test.
 *
 * Couvre le niveau DB (le primitif réellement concurrent) : réservation
 * atomique, effets uniques, clés distinctes, isolation utilisateurs,
 * transition pending→ok, idempotence des migrations. Le niveau HTTP complet
 * (route Next + XP/ligue/badges/notify) requiert l'app démarrée sur cette
 * même base : voir `P2144_SIMULATOR_CONCURRENCY_FINAL.md` (extension opérateur).
 *
 * Ne jamais pointer ceci vers la production. Fixtures horodatées STAMP +
 * purge systématique.
 */
import { Pool } from "pg";

const TEST_URL = process.env.TEST_DATABASE_URL ?? "";
const ALLOW = process.env.P2144_ALLOW_PG_TESTS === "1";
// Garde anti-prod : n'accepte qu'une cible explicitement locale ou de test.
const LOOKS_LIKE_TEST = /localhost|127\.0\.0\.1|test/i.test(TEST_URL);
const CAN_RUN = ALLOW && TEST_URL.length > 0 && LOOKS_LIKE_TEST;

const STAMP = `p2144.${process.pid}.${Date.now()}`;
const attemptKey = (userId: number, attempt: string) => `simsubmit:${userId}:${attempt}`;
const ATTEMPT_A = "123e4567-e89b-42d3-a456-426614174000";
const ATTEMPT_B = "123e4567-e89b-42d3-a456-426614174001";

let pool: Pool | null = null;

async function setup(): Promise<Pool> {
  const p = new Pool({ connectionString: TEST_URL, max: 12 });
  // Refus actif : la base connectée doit être identifiable comme test.
  const id = await p.query("SELECT current_database() AS db");
  const dbName: string = id.rows[0]?.db ?? "";
  if (!/test/i.test(dbName) && !/localhost|127\.0\.0\.1/.test(TEST_URL)) {
    await p.end();
    throw new Error(`Refus : base connectée non identifiable comme test (voir journal opérateur).`);
  }
  await p.query(`CREATE TABLE IF NOT EXISTS idempotency_keys (key TEXT PRIMARY KEY, user_id INTEGER, response TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
  await p.query(`CREATE TABLE IF NOT EXISTS exam_attempts (id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL, paper_id INTEGER NOT NULL, score INTEGER NOT NULL DEFAULT 0, score_over_20 REAL NOT NULL DEFAULT 0, duration_seconds INTEGER NOT NULL DEFAULT 0, timed_out INTEGER NOT NULL DEFAULT 0, completed_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
  await p.query(`ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS timed_out INTEGER NOT NULL DEFAULT 0`);
  return p;
}

async function teardown(): Promise<void> {
  if (!pool) return;
  await pool.query(`DELETE FROM idempotency_keys WHERE key LIKE 'simsubmit:%' AND key LIKE '%' || $1 || '%'`, [STAMP]).catch(() => {});
  await pool.end();
  pool = null;
}

function claim(pool: Pool, key: string, userId: number) {
  return pool.query(
    `INSERT INTO idempotency_keys (key, user_id, response) VALUES ($1, $2, $3) ON CONFLICT(key) DO NOTHING`,
    [key, userId, JSON.stringify({ status: "pending", stamp: STAMP })],
  );
}

(CAN_RUN ? describe : describe.skip)("P2.14.4 — concurrence PG idempotence simulateur", () => {
  jest.setTimeout(60000);

  beforeAll(async () => {
    pool = await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  test("T1 : 10 claims concurrents même clé → 1 seul gagnant", async () => {
    const db = pool!;
    const key = attemptKey(7, `${ATTEMPT_A}-${STAMP}`);
    const results = await Promise.all(Array.from({ length: 10 }, () => claim(db, key, 7)));
    const wins = results.filter((r) => (r.rowCount ?? 0) === 1).length;
    expect(wins).toBe(1);
    const count = await db.query(`SELECT COUNT(*) AS c FROM idempotency_keys WHERE key = $1`, [key]);
    expect(Number(count.rows[0].c)).toBe(1);
  });

  test("T2 : un seul INSERT exam_attempts + timed_out 0/1 acceptés", async () => {
    const db = pool!;
    await db.query(
      `INSERT INTO exam_attempts (user_id, paper_id, score, score_over_20, duration_seconds, timed_out) VALUES (7, 3, 14, 14.0, 1200, $1)`,
      [1],
    );
    await db.query(`INSERT INTO exam_attempts (user_id, paper_id) VALUES (7, 3)`);
    const rows = await db.query(`SELECT timed_out FROM exam_attempts WHERE user_id = 7 AND paper_id = 3 ORDER BY id DESC LIMIT 2`);
    expect(rows.rows.map((r) => r.timed_out)).toEqual([0, 1]);
    const cols = await db.query(
      `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'exam_attempts' AND column_name = 'timed_out'`,
    );
    expect(cols.rows.length).toBe(1);
    expect(cols.rows[0].data_type).toBe("integer");
    await db.query(`DELETE FROM exam_attempts WHERE user_id = 7 AND paper_id = 3`);
  });

  test("T3 : attempt_id distincts → tous autorisés (tentatives légitimes)", async () => {
    const db = pool!;
    const keys = [ATTEMPT_A, ATTEMPT_B].map((a) => attemptKey(7, `${a}-${STAMP}`));
    const results = await Promise.all(keys.map((k) => claim(db, k, 7)));
    expect(results.map((r) => r.rowCount ?? 0)).toEqual([1, 1]);
  });

  test("T4 : même attempt_id, 2 utilisateurs → 2 clés distinctes", async () => {
    const db = pool!;
    const k1 = attemptKey(7, `${ATTEMPT_A}-${STAMP}-u`);
    const k2 = attemptKey(8, `${ATTEMPT_A}-${STAMP}-u`);
    const [r1, r2] = await Promise.all([claim(db, k1, 7), claim(db, k2, 8)]);
    expect(r1.rowCount ?? 0).toBe(1);
    expect(r2.rowCount ?? 0).toBe(1);
  });

  test("T5 : transition pending → ok lisible par les concurrents", async () => {
    const db = pool!;
    const key = attemptKey(7, `pend-${STAMP}`);
    expect((await claim(db, key, 7)).rowCount ?? 0).toBe(1);
    expect((await claim(db, key, 7)).rowCount ?? 0).toBe(0);
    await db.query(`UPDATE idempotency_keys SET response = $1 WHERE key = $2`, [JSON.stringify({ status: "ok" }), key]);
    const cached = await db.query(`SELECT response FROM idempotency_keys WHERE key = $1`, [key]);
    expect(JSON.parse(cached.rows[0].response)).toEqual({ status: "ok" });
  });

  test("T6 : migrations idempotentes (double passage sans erreur)", async () => {
    const db = pool!;
    await db.query(`CREATE TABLE IF NOT EXISTS idempotency_keys (key TEXT PRIMARY KEY, user_id INTEGER, response TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`);
    await db.query(`ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS timed_out INTEGER NOT NULL DEFAULT 0`);
    await db.query(`ALTER TABLE exam_attempts ADD COLUMN IF NOT EXISTS timed_out INTEGER NOT NULL DEFAULT 0`);
  });
});
