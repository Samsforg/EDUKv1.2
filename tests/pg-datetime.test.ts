import { toPgDatetime, toPgSchema } from "../src/lib/db";

// P1.3 — contrat de traduction SQLite → PostgreSQL, vérifié contre un vrai
// serveur PostgreSQL 18.6 (probes prod, phase P1.3) :
//  - comparaison  : now() ± interval + cast ::timestamptz du membre gauche
//                   (PG refuse text >= timestamp with time zone) ;
//  - valeur       : to_char(...) texte (PG refuse DEFAULT/SET = now()
//                   sur colonne TEXT — erreur 42804) ;
//  - date('now')  : toujours texte (bornes préfixées, lexicales).
const FMT = "'YYYY-MM-DD HH24:MI:SS'";

describe("toPgDatetime — position de comparaison (timestamptz + cast)", () => {
  it("bornes datetime('now', …) -> now() ± interval avec cast du membre gauche", () => {
    expect(toPgDatetime("SELECT * FROM t WHERE created_at >= datetime('now','-7 days')")).toBe(
      "SELECT * FROM t WHERE created_at::timestamptz >= now() - interval '7 days'",
    );
  });

  it("datetime('now') nu en comparaison", () => {
    expect(toPgDatetime("SELECT * FROM t WHERE end_at > datetime('now')")).toBe(
      "SELECT * FROM t WHERE end_at::timestamptz > now()",
    );
  });

  it("membre gauche fonctionnel COALESCE(...) casté (reactivation.ts:41)", () => {
    expect(
      toPgDatetime(
        "SELECT * FROM u WHERE COALESCE(last_active, created_at, '2000-01-01') <= datetime('now','-14 days')",
      ),
    ).toBe(
      "SELECT * FROM u WHERE COALESCE(last_active, created_at, '2000-01-01')::timestamptz <= now() - interval '14 days'",
    );
  });

  it("'start of month' -> date_trunc + cast (fenêtre revenus mensuelle)", () => {
    expect(
      toPgDatetime("SELECT * FROM s WHERE started_at >= datetime('now','-3 months','start of month')"),
    ).toBe(
      "SELECT * FROM s WHERE started_at::timestamptz >= date_trunc('month', now() - interval '3 months')",
    );
  });

  it("'start of month' + '+1 month' (borne haute de la fenêtre)", () => {
    expect(
      toPgDatetime(
        "SELECT * FROM s WHERE started_at < datetime('now','-3 months','start of month','+1 month')",
      ),
    ).toBe(
      "SELECT * FROM s WHERE started_at::timestamptz < date_trunc('month', now() - interval '3 months' + interval '1 months')",
    );
  });

  it("concaténation dynamique comparée -> make_interval avec cast", () => {
    expect(
      toPgDatetime("SELECT * FROM t WHERE due_at <= datetime('now','-' || $1 || ' hours')"),
    ).toBe("SELECT * FROM t WHERE due_at::timestamptz <= now() - make_interval(hours => $1)");
  });
});

describe("toPgDatetime — position de valeur (to_char TEXT)", () => {
  it("SET datetime('now') -> to_char (colonne TEXT, cf. erreur 42804)", () => {
    expect(toPgDatetime("UPDATE users SET last_active = datetime('now')")).toBe(
      `UPDATE users SET last_active = to_char(now(), ${FMT})`,
    );
  });

  it("INSERT ... VALUES datetime('now','-3 days')", () => {
    expect(toPgDatetime("INSERT INTO t (created_at) VALUES (datetime('now','-3 days'))")).toBe(
      `INSERT INTO t (created_at) VALUES (to_char(now() - interval '3 days', ${FMT}))`,
    );
  });

  it("literal positif conservé en valeur ('+1 month')", () => {
    expect(toPgDatetime("UPDATE t SET end_at = datetime('now','+1 month')")).toBe(
      `UPDATE t SET end_at = to_char(now() + interval '1 months', ${FMT})`,
    );
  });

  it("concaténation : signe '+' conservé (régression : était perdu -> '- ')", () => {
    expect(toPgDatetime("INSERT INTO t (due_at) VALUES (datetime('now','+' || $1 || ' days'))")).toBe(
      `INSERT INTO t (due_at) VALUES (to_char(now() + make_interval(days => $1), ${FMT}))`,
    );
  });

  it("mixte : SET en valeur et WHERE en comparaison dans la même requête", () => {
    expect(
      toPgDatetime(
        "UPDATE t SET updated_at = datetime('now') WHERE created_at < datetime('now','-2 days')",
      ),
    ).toBe(
      `UPDATE t SET updated_at = to_char(now(), ${FMT}) WHERE created_at::timestamptz < now() - interval '2 days'`,
    );
  });

  it("argument de fonction (COALESCE) = position de valeur", () => {
    expect(toPgDatetime("UPDATE s SET end_at = datetime(COALESCE(end_at, datetime('now')), '+1 month')")).toBe(
      `UPDATE s SET end_at = datetime(COALESCE(end_at, to_char(now(), ${FMT})), '+1 month')`,
    );
  });
});

describe("toPgDatetime — date('now' …) toujours texte", () => {
  it("date('now') inchangé (audit.ts, proctoring.ts)", () => {
    expect(toPgDatetime("SELECT * FROM a WHERE created_at >= date('now')")).toBe(
      "SELECT * FROM a WHERE created_at >= to_char(now(), 'YYYY-MM-DD')",
    );
  });

  it("date('now','start of month') (business-metrics.ts:56, preuve d'erreur PG 18.6)", () => {
    expect(toPgDatetime("SELECT * FROM s WHERE created_at >= date('now','start of month')")).toBe(
      "SELECT * FROM s WHERE created_at >= to_char(date_trunc('month', now()), 'YYYY-MM-DD')",
    );
  });

  it("date('now','-5 months','start of month')", () => {
    expect(toPgDatetime("SELECT * FROM s WHERE created_at >= date('now','-5 months','start of month')")).toBe(
      "SELECT * FROM s WHERE created_at >= to_char(date_trunc('month', now() - interval '5 months'), 'YYYY-MM-DD')",
    );
  });
});

describe("toPgDatetime — neutralité", () => {
  it("SQL sans datetime('now'/date('now' est renvoyé tel quel", () => {
    const sql = "SELECT props::json->>'source' FROM e WHERE event = $1";
    expect(toPgDatetime(sql)).toBe(sql);
  });

  it("opérateur jsonb '->>' non confondu avec une comparaison", () => {
    const sql = "SELECT props::json->>'utm_source' FROM e WHERE event = $1 AND created_at >= $2";
    expect(toPgDatetime(sql)).toBe(sql);
  });
});

describe("toPgSchema — défauts de colonnes TEXT (P1.3, erreur 42804)", () => {
  it("DEFAULT (datetime('now')) -> to_char TEXT + SERIAL", () => {
    const pg = toPgSchema(
      "CREATE TABLE IF NOT EXISTS x (id INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT NOT NULL DEFAULT (datetime('now')));",
    );
    expect(pg).toContain(`DEFAULT (to_char(now(), ${FMT}))`);
    expect(pg).not.toContain("DEFAULT (now())");
    expect(pg).toContain("SERIAL PRIMARY KEY");
    expect(pg).not.toContain("datetime('now')");
    expect(pg).not.toContain("AUTOINCREMENT");
  });
});
