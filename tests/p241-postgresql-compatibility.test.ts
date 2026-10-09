/**
 * P2.4.1 — PostgreSQL Compatibility & Release Readiness (audit ciblé P2.4).
 *
 * Blocs :
 *  1. inventaire SQL statique de la couche mesure (portabilité prouvée par
 *     construction : aucun opérateur SQLite-only, placeholders `?` seuls) ;
 *  2. traduction réelle `toPgPlaceholders` sur les requêtes capturées à
 *     l'exécution (nombre de `$N` = nombre de paramètres, aucun `?` résiduel) ;
 *  3. idempotence de la déclaration : séquentielle (route) + concurrence
 *     (double INSERT simulé → dédoublonnage « la plus ancienne gagne ») ;
 *  4. chemins d'écriture PG : `toPgReturningId` sur l'INSERT trackDb ;
 *  5. environment : pas de PostgreSQL de test local →
 *     POSTGRESQL_INTEGRATION_NOT_EXECUTED (documenté, jamais contourné).
 *
 * Aucune dépendance lourde ajoutée, aucun appel réseau, aucune écriture
 * hors fixtures isolées nettoyées en afterAll.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { DECLARATION_EVENT, parseDeclarationPayload } from "@/lib/growth/measure/declaration";
import { hasDeclaration, loadCoverage, loadDeclarations, loadWindowAggregates } from "@/lib/growth/measure/data";
import { dedupeDeclarations } from "@/lib/growth/measure/actions";
import { dayStart } from "@/lib/growth/measure/dates";
import type { ActionDeclaration } from "@/lib/growth/measure";
import * as db from "@/lib/db";
import { toPgPlaceholders, toPgReturningId } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { queryOne, run } from "@/lib/db";

process.env.SESSION_SECRET = "p241-unit-test-session-secret-0123456789";

const DATA_TS = readFileSync(join(process.cwd(), "src/lib/growth/measure/data.ts"), "utf8");
const DECLARE_TS = readFileSync(
  join(process.cwd(), "src/app/api/growth/actions/declare/route.ts"),
  "utf8",
);

const STAMP = `${process.pid}${Date.now()}`;
const FIXTURE_URL = "p241-fixture";
const FIXTURE_SUFFIX = `p241${STAMP}`.slice(0, 40);
const RACE_ACTION = `action_OPTIMIZE_LANDING#2099-04-01/2099-04-07#${FIXTURE_SUFFIX}`;
const OLDER_TS = "2099-04-01 08:00:00";
const NEWER_TS = "2099-04-01 09:00:00";

const createdUserIds: number[] = [];
const createdEventIds: number[] = [];

async function insertRealAdmin(email: string): Promise<number> {
  const row = await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name, is_test, created_at)
     VALUES ('admin', ?, ?, 'P241', 'Admin', 0, ?)`,
    email,
    hashPassword(`P241-ok-${STAMP}`),
    NEWER_TS,
  );
  const found = await queryOne<{ id: number }>(
    "SELECT id FROM users WHERE email = ? ORDER BY id DESC LIMIT 1",
    email,
  );
  const id = found?.id ?? Number(row.lastInsertRowid);
  createdUserIds.push(id);
  return id;
}

function placeholdersOf(sql: string): number {
  let inStr = false;
  let count = 0;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'") inStr = !inStr;
    else if (ch === "?" && !inStr) count++;
  }
  return count;
}

function bareQuestionMarksOutsideDollar(sql: string): boolean {
  // Après toPgPlaceholders, aucun `?` ne doit subsister hors littéral texte.
  let inStr = false;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (ch === "'") inStr = !inStr;
    else if (ch === "?" && !inStr) return true;
  }
  return false;
}

beforeAll(async () => {
  await insertRealAdmin(`admin.race@${FIXTURE_SUFFIX}.ci`);
});

afterAll(async () => {
  for (const id of createdEventIds) {
    await run("DELETE FROM analytics_events WHERE id = ?", id).catch(() => {});
  }
  await run("DELETE FROM analytics_events WHERE url LIKE ?", `${FIXTURE_URL}%`).catch(() => {});
  await run("DELETE FROM analytics_events WHERE event = ? AND props LIKE ?", DECLARATION_EVENT, `%${FIXTURE_SUFFIX}%`).catch(() => {});
  for (const id of createdUserIds) {
    await run("DELETE FROM analytics_events WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM sessions WHERE user_id = ?", id).catch(() => {});
    await run("DELETE FROM users WHERE id = ?", id).catch(() => {});
  }
});

describe("P2.4.1 — 1 · inventaire SQL statique (portabilité)", () => {
  it("aucun opérateur SQLite-only dans la couche mesure", () => {
    const forbidden: Array<[RegExp, string]> = [
      [/\bAUTOINCREMENT\b/i, "AUTOINCREMENT"],
      [/\bRETURNING\b/i, "RETURNING dans SELECT mesure"],
      [/\bON CONFLICT\b/i, "ON CONFLICT dans la couche mesure"],
      [/datetime\(\s*'now'/i, "datetime('now')"],
      [/date\(\s*'now'/i, "date('now')"],
      [/::[a-z]/i, "cast PostgreSQL `::`"],
      [/\bOVER\s*\(/i, "fenêtre SQL"],
      [/\bjson_extract\b/i, "json_extract SQLite"],
      [/\brandom\(\)/i, "random()"],
      [/\blimit\s+-\d/i, "LIMIT négatif"],
    ];
    for (const [re, label] of forbidden) {
      expect(`${label}: ${re.test(DATA_TS)}`).toBe(`${label}: false`);
    }
  });

  it("requêtes SELECT du module : aucun $N en dur, placeholders `?` présents", () => {
    // Les requêtes complètes (avec params) portent `?` ; les fragments
    // (`AUTHOR_NOT_TEST`) n'en portent pas — ils sont injectés dans un
    // SELECT qui, lui, a des `?`.
    const sqlLiterals = DATA_TS.match(/`[^`]*SELECT[^`]*`/g) ?? [];
    expect(sqlLiterals.length).toBeGreaterThanOrEqual(3);
    const withParams = sqlLiterals.filter((lit) => /FROM analytics_events/.test(lit) && /WHERE/.test(lit));
    expect(withParams.length).toBeGreaterThanOrEqual(3);
    for (const lit of sqlLiterals) {
      expect(lit).not.toMatch(/\$\d/);
    }
    for (const lit of withParams) {
      expect(lit).toMatch(/\?/);
    }
  });

  it("LIMIT interpolé = constante entière bornée (pas d'entrée utilisateur)", () => {
    const m = DATA_TS.match(/const DECLARATION_READ_LIMIT = (\d+);/);
    expect(m).not.toBeNull();
    const limit = Number(m![1]);
    expect(Number.isInteger(limit)).toBe(true);
    expect(limit).toBeGreaterThan(0);
    expect(limit).toBeLessThanOrEqual(1000);
    expect(DATA_TS).toContain("LIMIT ${DECLARATION_READ_LIMIT}");
    // La route de déclaration ne lit aucune limite depuis le corps (whitelist
    // stricte action_id + window_days uniquement — déjà couverte P2.4).
    expect(DECLARE_TS).not.toMatch(/body\s*\.\s*\w*[Ll]imit|window_days.*LIMIT/i);
  });

  it("funnel events : 8 entrées, IN (?, ...) calibré", () => {
    const m = DATA_TS.match(/const FUNNEL_EVENTS = \[([^\]]+)\]/);
    expect(m).not.toBeNull();
    const events = m![1].split(",").map((s) => s.trim().replace(/"/g, "")).filter(Boolean);
    expect(events).toHaveLength(8);
    expect(DATA_TS).toContain("event IN (${FUNNEL_EVENTS.map(() => \"?\").join(\", \")})");
  });

  it("prédicat test users : LOWER+COALESCE+LIKE (portable SQLite/PG)", () => {
    expect(DATA_TS).toContain("AUTHOR_NOT_TEST");
    expect(DATA_TS).toContain("testUsersWhere");
    // Aucune comparaison case-sensitive sur email dans la couche mesure.
    expect(DATA_TS).not.toMatch(/email\s*=\s*'/);
  });
});

describe("P2.4.1 — 2 · toPgPlaceholders sur requêtes capturées à l'exécution", () => {
  it("loadDeclarations + loadCoverage + loadWindowAggregates : $N cohérents", async () => {
    const captured: Array<{ sql: string; params: unknown[] }> = [];
    const origQ = db.query;
    const origQO = db.queryOne;
    const spyQ = jest
      .spyOn(db, "query")
      .mockImplementation((async (sql: string, ...args: unknown[]) => {
        captured.push({ sql, params: args });
        return (origQ as unknown as (s: string, ...a: unknown[]) => Promise<unknown[]>)(sql, ...args);
      }) as never);
    const spyQO = jest
      .spyOn(db, "queryOne")
      .mockImplementation((async (sql: string, ...args: unknown[]) => {
        captured.push({ sql, params: args });
        return (origQO as unknown as (s: string, ...a: unknown[]) => Promise<unknown>)(sql, ...args);
      }) as never);
    try {
      await loadDeclarations();
      await loadCoverage(dayStart("2099-04-01"), dayStart("2099-04-08"), dayStart("2099-03-25"), dayStart("2099-04-01"));
      await loadWindowAggregates(
        dayStart("2099-03-18"),
        dayStart("2099-04-01"),
        dayStart("2099-04-01"),
        dayStart("2099-04-15"),
      );
    } finally {
      spyQ.mockRestore();
      spyQO.mockRestore();
    }
    expect(captured.length).toBeGreaterThanOrEqual(3);
    for (const { sql, params } of captured) {
      expect(sql).toContain("SELECT");
      expect(sql).not.toMatch(/INSERT|UPDATE|DELETE/i);
      const ph = placeholdersOf(sql);
      expect(ph).toBe(params.length);
      const pgSql = toPgPlaceholders(sql);
      expect(bareQuestionMarksOutsideDollar(pgSql)).toBe(false);
      const dollars = pgSql.match(/\$\d+/g) ?? [];
      expect(dollars).toHaveLength(ph);
      if (ph > 0) {
        expect(dollars).toContain("$1");
        expect(dollars).toContain(`$${ph}`);
      }
    }
  }, 30000);

  it("substr(created_at, 1, 10) : extraction jour identique à countFunnelForDay", async () => {
    // Même motif que la couche P1.0 (countFunnelForDay) validée en production :
    // comparaison textuelle de bornes ISO sur created_at TEXT (deux moteurs).
    const admin = createdUserIds[0];
    const ev = await run(
      `INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at)
       VALUES (?, NULL, 'pageview', '{}', ?, ?)`,
      admin,
      `${FIXTURE_URL}-substr`,
      "2099-04-02 10:30:00",
    );
    const last = await queryOne<{ id: number }>(
      "SELECT id FROM analytics_events WHERE url = ? ORDER BY id DESC LIMIT 1",
      `${FIXTURE_URL}-substr`,
    );
    if (last) createdEventIds.push(last.id);
    expect(Number(ev.changes)).toBe(1);
    const day = await queryOne<{ d: string }>(
      "SELECT substr(created_at, 1, 10) AS d FROM analytics_events WHERE url = ?",
      `${FIXTURE_URL}-substr`,
    );
    expect(day?.d).toBe("2099-04-02");
  }, 30000);
});

describe("P2.4.1 — 3 · idempotence déclaration : séquentielle + concurrence", () => {
  it("double INSERT concurrent simulé : dédoublonnage « la plus ancienne gagne »", async () => {
    const admin = createdUserIds[0];
    // Simulation du TOCTOU : deux INSERT passent la garde applicative
    // (hasDeclaration=false) avant d'écrire — aucun empêchement SQL.
    // Horodatages explicites pour rendre le plus-ancien déterministe.
    await run(
      `INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at)
       VALUES (?, NULL, ?, ?, ?, ?)`,
      admin,
      DECLARATION_EVENT,
      JSON.stringify({ action_id: RACE_ACTION, window_days: 14 }),
      `${FIXTURE_URL}-race-1`,
      OLDER_TS,
    );
    await run(
      `INSERT INTO analytics_events (user_id, session_id, event, props, url, created_at)
       VALUES (?, NULL, ?, ?, ?, ?)`,
      admin,
      DECLARATION_EVENT,
      JSON.stringify({ action_id: RACE_ACTION, window_days: 21 }),
      `${FIXTURE_URL}-race-2`,
      NEWER_TS,
    );
    const count = await queryOne<{ c: number | string }>(
      "SELECT COUNT(*) AS c FROM analytics_events WHERE event = ? AND props LIKE ?",
      DECLARATION_EVENT,
      `%${RACE_ACTION}%`,
    );
    expect(Number(count?.c ?? 0)).toBe(2);

    // hasDeclaration voit la course (au moins une des deux).
    expect(await hasDeclaration(RACE_ACTION)).toBe(true);

    // La couche mesure reste correcte : la plus ancienne gagne, indépendamment
    // de l'ordre d'arrivée (correctif P2.4 conservé).
    const load = await loadDeclarations();
    expect(load.source).toBe("ok");
    const raceRows = load.rows.filter((r) => r.action_id === RACE_ACTION);
    expect(raceRows.length).toBe(2);
    expect(raceRows[0].declared_at).toBe(OLDER_TS);
    const deduped = dedupeDeclarations([...raceRows].reverse() as ActionDeclaration[]);
    expect(deduped.distinct.filter((r) => r.action_id === RACE_ACTION)).toHaveLength(1);
    expect(deduped.distinct.find((r) => r.action_id === RACE_ACTION)!.declared_at).toBe(OLDER_TS);
    expect(deduped.distinct.find((r) => r.action_id === RACE_ACTION)!.window_days).toBe(14);
    expect(deduped.duplicates).toBe(1);
  }, 30000);

  it("whitelist déclaration : parse stricte inchangée (aucun champ libre)", () => {
    expect(parseDeclarationPayload({ action_id: RACE_ACTION, window_days: 14, note: "x" })).toEqual({
      ok: false,
      error: "champ_inconnu",
    });
    expect(parseDeclarationPayload({ action_id: RACE_ACTION, window_days: 14 })).toEqual({
      ok: true,
      value: { action_id: RACE_ACTION, window_days: 14 },
    });
  });
});

describe("P2.4.1 — 4 · chemins d'écriture PG (toPgReturningId / placeholders)", () => {
  it("trackDb INSERT : toPgReturningId ajoute RETURNING id (table à colonne id)", () => {
    const insertSql =
      "INSERT INTO analytics_events (user_id, session_id, event, props, url) VALUES (?, ?, ?, ?, ?)";
    const pgSql = toPgReturningId(insertSql);
    expect(pgSql).toMatch(/RETURNING id$/);
    expect(bareQuestionMarksOutsideDollar(toPgPlaceholders(pgSql))).toBe(false);
    const dollars = toPgPlaceholders(pgSql).match(/\$\d+/g) ?? [];
    expect(dollars).toHaveLength(5);
  });

  it("tables NO_ID_TABLES : aucun RETURNING id ajouté", () => {
    expect(toPgReturningId("INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)")).not.toMatch(
      /RETURNING/,
    );
    expect(toPgReturningId("INSERT INTO growth_metrics (day, mrr_cents) VALUES (?, ?)")).not.toMatch(/RETURNING/);
  });

  it("requireAdmin déclaré dans la route (garde inchangée)", () => {
    expect(DECLARE_TS).toContain("requireAdmin()");
    expect(DECLARE_TS).toContain("hasDeclaration");
    expect(DECLARE_TS).toContain("trackDb");
  });
});

describe("P2.4.1 — 5 · environnement PostgreSQL de test", () => {
  it("aucune DATABASE_URL locale → POSTGRESQL_INTEGRATION_NOT_EXECUTED", () => {
    const url = process.env.DATABASE_URL;
    const hasUrl = typeof url === "string" && url.trim() !== "";
    // En CI/jest, pas de URL → SQLite-only. Documenté, jamais contourné.
    expect(hasUrl).toBe(false);
    expect(db.IS_PG).toBe(false);
  });

  it("resolveDbMode : scénarios P1.6 F2 inchangés (fail-fast Vercel)", () => {
    expect(db.resolveDbMode({})).toBe("sqlite");
    expect(db.resolveDbMode({ DATABASE_URL: "" })).toBe("sqlite");
    expect(db.resolveDbMode({ DATABASE_URL: "postgresql://x" })).toBe("postgres");
    expect(() => db.resolveDbMode({ VERCEL: "1" })).toThrow();
  });
});
