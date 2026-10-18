/**
 * P2.13 — Idempotence des soumissions du simulateur (`POST
 * /api/simulator/[id]/submit`).
 *
 * Contexte : `exam_attempts` n'a aucune contrainte d'unicité et le quota
 * Découverte compte les tentatives, donc plusieurs tentatives legitimes par
 * examen existent. L'idempotence porte sur l'identité de la tentative
 * (UUID v4 `attempt_id` fourni par le client), via la table maison
 * `idempotency_keys` (PRIMARY KEY sur `key`, même mécanisme que le checkout
 * premium).
 *
 * Périmètre : bases SQLite éphémères `:memory:`, aucun résidu, aucun accès à
 * la base de développement. Couvre la validation des identifiants, la
 * réservation atomique (premier INSERT gagne, le second obtient changes = 0),
 * le rejeu (réponse rejouée sans nouvel INSERT), les tentatives distinctes
 * légitimes et la colonne de traçabilité `timed_out`.
 *
 * Limites documentées (non couvertes ici) :
 * - la concurrence réelle PostgreSQL sous charge (le verrou repose sur la
 *   PRIMARY KEY, garantie par PG, mais sans test de montée en charge) ;
 * - le flux HTTP complet de la route (auth session, quota, XP, badges,
 *   notifications) : effets couverts par la relecture et par les gardes de la
 *   route, pas par un test bout en bout.
 */
import { DatabaseSync } from "node:sqlite";
import {
  ATTEMPT_ID_RE,
  idempotencyKey,
  isValidAttemptId,
  normalizeAttemptId,
  pendingResponse,
} from "@/lib/idempotency";

const ATTEMPT_A = "123e4567-e89b-42d3-a456-426614174000";
const ATTEMPT_B = "123e4567-e89b-42d3-a456-426614174001";

function makeDb(): DatabaseSync {
  const d = new DatabaseSync(":memory:");
  try {
    d.exec("PRAGMA foreign_keys = ON");
    d.exec(
      "CREATE TABLE idempotency_keys (key TEXT PRIMARY KEY, user_id INTEGER, response TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT (datetime('now')))",
    );
    d.exec(
      "CREATE TABLE exam_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, paper_id INTEGER NOT NULL, score INTEGER NOT NULL DEFAULT 0, score_over_20 REAL NOT NULL DEFAULT 0, duration_seconds INTEGER NOT NULL DEFAULT 0, timed_out INTEGER NOT NULL DEFAULT 0, completed_at TEXT NOT NULL DEFAULT (datetime('now')))",
    );
    return d;
  } catch (e) {
    d.close();
    throw e;
  }
}

/** Réplique exacte de la réservation atomique utilisée par la route. */
function claim(d: DatabaseSync, key: string, userId: number): number {
  const r = d
    .prepare(
      "INSERT INTO idempotency_keys (key, user_id, response) VALUES (?, ?, ?) ON CONFLICT(key) DO NOTHING",
    )
    .run(key, userId, pendingResponse());
  return Number(r.changes);
}

function cached(d: DatabaseSync, key: string, userId: number): string | null {
  const row = d
    .prepare("SELECT response FROM idempotency_keys WHERE key = ? AND user_id = ?")
    .get(key, userId) as { response: string } | undefined;
  return row?.response ?? null;
}

describe("P2.13 — identifiants de tentative", () => {
  test("T1 : UUID v4 valides acceptés, autres valeurs rejetées", () => {
    expect(isValidAttemptId(ATTEMPT_A)).toBe(true);
    expect(isValidAttemptId(ATTEMPT_A.toUpperCase())).toBe(true);
    expect(isValidAttemptId(`  ${ATTEMPT_A} `)).toBe(true);
    expect(isValidAttemptId("")).toBe(false);
    expect(isValidAttemptId(null)).toBe(false);
    expect(isValidAttemptId(undefined)).toBe(false);
    expect(isValidAttemptId(12345)).toBe(false);
    expect(isValidAttemptId("not-a-uuid")).toBe(false);
    // UUID v1 (version 1 au lieu de 4) : rejeté.
    expect(isValidAttemptId("123e4567-e89b-12d3-a456-426614174000")).toBe(false);
    // Variante invalide (caractère 'c' au lieu de 8/9/a/b).
    expect(isValidAttemptId("123e4567-e89b-42d3-c456-426614174000")).toBe(false);
    expect(ATTEMPT_ID_RE.test(ATTEMPT_A)).toBe(true);
  });

  test("T2 : clé déterministe portée par utilisateur", () => {
    expect(idempotencyKey("simsubmit", 7, ATTEMPT_A)).toBe(`simsubmit:7:${ATTEMPT_A}`);
    expect(idempotencyKey("simsubmit", 7, ATTEMPT_B)).not.toBe(
      idempotencyKey("simsubmit", 7, ATTEMPT_A),
    );
    expect(idempotencyKey("simsubmit", 8, ATTEMPT_A)).not.toBe(
      idempotencyKey("simsubmit", 7, ATTEMPT_A),
    );
    expect(normalizeAttemptId(` ${ATTEMPT_A.toUpperCase()} `)).toBe(ATTEMPT_A);
  });
});

describe("P2.13 — réservation atomique de la clé", () => {
  test("T3 : premier INSERT gagne, second INSERT concurrent = 0 modification", () => {
    const d = makeDb();
    try {
      const key = idempotencyKey("simsubmit", 7, ATTEMPT_A);
      expect(claim(d, key, 7)).toBe(1);
      expect(claim(d, key, 7)).toBe(0);
      // Même un autre utilisateur ne peut pas réclamer la même clé.
      expect(claim(d, key, 999)).toBe(0);
    } finally {
      d.close();
    }
  });

  test("T4 : rejeu = réponse rejouée depuis le cache, sans nouvel INSERT", () => {
    const d = makeDb();
    try {
      const key = idempotencyKey("simsubmit", 7, ATTEMPT_A);
      expect(claim(d, key, 7)).toBe(1);
      expect(JSON.parse(cached(d, key, 7) as string)).toEqual({ status: "pending" });

      // La route écrit la tentative puis positionne le résultat de succès.
      const ok = { status: "ok", score: 14, max: 20 };
      d.prepare("INSERT INTO exam_attempts (user_id, paper_id, score) VALUES (7, 3, 14)").run();
      d.prepare("UPDATE idempotency_keys SET response = ? WHERE key = ?").run(
        JSON.stringify(ok),
        key,
      );

      // Rejeu : la réservation échoue et le cache renvoie le résultat.
      expect(claim(d, key, 7)).toBe(0);
      expect(JSON.parse(cached(d, key, 7) as string)).toEqual(ok);
      const attempts = d
        .prepare("SELECT COUNT(*) AS c FROM exam_attempts WHERE user_id = 7 AND paper_id = 3")
        .get() as { c: number };
      expect(attempts.c).toBe(1);
    } finally {
      d.close();
    }
  });

  test("T5 : tentative distincte légitime (autre attempt_id) toujours autorisée", () => {
    const d = makeDb();
    try {
      const keyA = idempotencyKey("simsubmit", 7, ATTEMPT_A);
      const keyB = idempotencyKey("simsubmit", 7, ATTEMPT_B);
      expect(claim(d, keyA, 7)).toBe(1);
      expect(claim(d, keyB, 7)).toBe(1);
      d.prepare("INSERT INTO exam_attempts (user_id, paper_id) VALUES (7, 3)").run();
      d.prepare("INSERT INTO exam_attempts (user_id, paper_id) VALUES (7, 3)").run();
      const attempts = d
        .prepare("SELECT COUNT(*) AS c FROM exam_attempts WHERE user_id = 7 AND paper_id = 3")
        .get() as { c: number };
      expect(attempts.c).toBe(2);
    } finally {
      d.close();
    }
  });

  test("T6 : traitement en vol = pas de résultat partiel (statut pending)", () => {
    const d = makeDb();
    try {
      const key = idempotencyKey("simsubmit", 7, ATTEMPT_A);
      expect(claim(d, key, 7)).toBe(1);
      // Second appel pendant le traitement : réservation impossible + statut pending.
      expect(claim(d, key, 7)).toBe(0);
      const parsed = JSON.parse(cached(d, key, 7) as string) as { status: string };
      expect(parsed.status).toBe("pending");
    } finally {
      d.close();
    }
  });
});

describe("P2.13 — colonne timed_out", () => {
  test("T7 : traçabilité manuel vs expiration disponible et valorisée en booléen", () => {
    const d = makeDb();
    try {
      const cols = d.prepare("PRAGMA table_info(exam_attempts)").all() as { name: string }[];
      expect(cols.map((c) => c.name)).toContain("timed_out");
      d.prepare("INSERT INTO exam_attempts (user_id, paper_id, timed_out) VALUES (7, 3, 1)").run();
      d.prepare("INSERT INTO exam_attempts (user_id, paper_id) VALUES (7, 3)").run();
      const rows = d
        .prepare("SELECT timed_out FROM exam_attempts WHERE user_id = 7 ORDER BY id")
        .all() as { timed_out: number }[];
      expect(rows.map((r) => r.timed_out)).toEqual([1, 0]);
    } finally {
      d.close();
    }
  });
});
