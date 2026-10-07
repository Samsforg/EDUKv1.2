/**
 * P1.6 F3 — analytics_events PostgreSQL-compatible.
 *
 * Avant : ensureAnalyticsTable exécutait le DDL SQLite brut
 * (INTEGER PRIMARY KEY AUTOINCREMENT + DEFAULT (datetime('now'))) — sur
 * PostgreSQL, AUTOINCREMENT est invalide → catch totalement silencieux →
 * table jamais créée → UTM/funnel/analytics = UNAVAILABLE en prod (P1.5 F3).
 *
 * Après : `IS_PG ? toPgSchema(ANALYTICS_CREATE_SQL) : ANALYTICS_CREATE_SQL`,
 * échec journalisé (plus de catch muet), aucun nouvel événement ajouté.
 */
import { DatabaseSync } from "node:sqlite";
import { toPgSchema } from "@/lib/db";
import { ANALYTICS_CREATE_SQL } from "@/lib/analytics-db";
import { EVENTS } from "@/lib/analytics";

const REQUIRED_EVENTS = [
  "pageview",
  "signup_started",
  "signup_step_2_completed",
  "signup_completed",
  "activated",
  "begin_checkout",
  "add_payment_info",
  "subscription_started",
  "purchase",
];

describe("F3 — traduction PostgreSQL du DDL analytics_events", () => {
  const pg = toPgSchema(ANALYTICS_CREATE_SQL);

  test("PRIMARY KEY auto-incrémenté traduit en SERIAL", () => {
    expect(pg).toContain("SERIAL PRIMARY KEY");
    expect(pg).not.toContain("AUTOINCREMENT");
    expect(pg).not.toContain("INTEGER PRIMARY KEY");
  });

  test("défaut de timestamp TEXT traduit en to_char (pas de DEFAULT (now()) sur TEXT)", () => {
    expect(pg).toContain("DEFAULT (to_char(now(), 'YYYY-MM-DD HH24:MI:SS'))");
    expect(pg).not.toContain("datetime('now')");
    expect(pg).not.toMatch(/DEFAULT\s*\(\s*now\(\)\s*\)/);
  });

  test("colonnes TEXT conservées + FK inline PostgreSQL valide", () => {
    expect(pg).toContain("session_id TEXT");
    expect(pg).toContain("props TEXT");
    expect(pg).toContain("event TEXT NOT NULL");
    expect(pg).toContain("REFERENCES users(id) ON DELETE SET NULL");
  });
});

describe("F3 — DDL SQLite exécutable (dev/tests) : création, insert, query, index", () => {
  test("create + insert + select + index uniques sur base SQLite en mémoire", () => {
    const db = new DatabaseSync(":memory:");
    try {
      // cible de la FK users(id) — même contrat que la table réelle
      db.exec("CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT)");
      db.exec("INSERT INTO users (id, email) VALUES (1, 'u1@test.local'), (7, 'u7@test.local')");
      db.exec(ANALYTICS_CREATE_SQL);
      db.exec("CREATE INDEX IF NOT EXISTS idx_analytics_event ON analytics_events(event, created_at)");
      db.exec("CREATE INDEX IF NOT EXISTS idx_analytics_user ON analytics_events(user_id, created_at)");
      db.exec(
        "CREATE UNIQUE INDEX IF NOT EXISTS idx_analytics_activated ON analytics_events(user_id) WHERE event = 'activated'",
      );

      const ins = db.prepare(
        "INSERT INTO analytics_events (user_id, session_id, event, props, url) VALUES (?, ?, ?, ?, ?)",
      );
      ins.run(1, "session-1", "pageview", "{}", "/tarifs");
      ins.run(1, "session-1", "signup_completed", "{}", "/inscription");
      // created_at alimenté par le défaut datetime('now') — preuve du DEFAULT
      const rows = db
        .prepare("SELECT event, created_at FROM analytics_events ORDER BY id")
        .all() as { event: string; created_at: string }[];
      expect(rows).toHaveLength(2);
      expect(rows[0].event).toBe("pageview");
      expect(rows[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2} /);

      // dédup `activated` : une seule ligne par compte (index unique partiel)
      db.prepare("INSERT INTO analytics_events (user_id, event) VALUES (?, 'activated')").run(7);
      expect(() =>
        db.prepare("INSERT INTO analytics_events (user_id, event) VALUES (?, 'activated')").run(7),
      ).toThrow();

      // requête funnel type (bornes textuelles) opérationnelle
      const cnt = db
        .prepare("SELECT COUNT(*) AS c FROM analytics_events WHERE event IN ('pageview','signup_completed')")
        .get() as { c: number };
      expect(Number(cnt.c)).toBe(2);
    } finally {
      db.close();
    }
  });
});

describe("F3 — événements requis disponibles (aucun événement nouveau en P1.6)", () => {
  test("EVENTS + littéraux trackDb couvrent la liste exigée", () => {
    const known = new Set<string>([...Object.values(EVENTS), "activated", "purchase", "pageview"]);
    for (const e of REQUIRED_EVENTS) {
      expect(known.has(e)).toBe(true);
    }
  });

  test("la table accepte tout événement TEXT (aucune contrainte d'énumération)", () => {
    expect(ANALYTICS_CREATE_SQL).toContain("event TEXT NOT NULL");
    expect(ANALYTICS_CREATE_SQL).not.toMatch(/CHECK\s*\(/i);
  });
});
