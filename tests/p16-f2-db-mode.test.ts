/**
 * P1.6 F2 — FAIL FAST : jamais de fallback SQLite silencieux sur Vercel.
 *
 * Avant : IS_PG = !!DATABASE_URL → si l'URL manquait sur Vercel,
 * l'application ouvrait /tmp/edukora-data/edukora.db (éphémère) et
 * « fonctionnait » silencieusement sur une base jetable.
 *
 * Après : resolveDbMode() distingue explicitement
 *   PRODUCTION/Vercel + DB absente → throw (fail-closed)
 *   Vercel + URL PostgreSQL        → postgres
 *   dev/test sans URL              → sqlite (autorisé)
 */
import { resolveDbMode, DB_MODE, IS_PG, isBuildPhase } from "@/lib/db";

describe("resolveDbMode — scénarios P1.6 F2", () => {
  test("PRODUCTION (Vercel) + DATABASE_URL absente → erreur explicite, pas de SQLite", () => {
    expect(() => resolveDbMode({ VERCEL: "1" })).toThrow(/DATABASE_URL/);
    expect(() => resolveDbMode({ VERCEL: "1" })).toThrow(/fail-fast/);
  });

  test("PRODUCTION (Vercel) + DATABASE_URL vide/blanche → erreur explicite", () => {
    expect(() => resolveDbMode({ VERCEL: "1", DATABASE_URL: "" })).toThrow(/DATABASE_URL/);
    expect(() => resolveDbMode({ VERCEL: "1", DATABASE_URL: "   " })).toThrow(/fail-fast/);
  });

  test("PRODUCTION (Vercel) + DATABASE_URL PostgreSQL valide → postgres", () => {
    expect(
      resolveDbMode({ VERCEL: "1", DATABASE_URL: "postgresql://user:pass@pooler.example/db?sslmode=require" }),
    ).toBe("postgres");
  });

  test("DEVELOPMENT sans DATABASE_URL → sqlite autorisé", () => {
    expect(resolveDbMode({ NODE_ENV: "development" })).toBe("sqlite");
    expect(resolveDbMode({})).toBe("sqlite");
    expect(resolveDbMode({ NODE_ENV: "development", DATABASE_URL: "" })).toBe("sqlite");
  });

  test("TEST (jest) sans DATABASE_URL → sqlite autorisé", () => {
    expect(resolveDbMode({ NODE_ENV: "test" })).toBe("sqlite");
  });

  test("hors Vercel + URL PostgreSQL → postgres (dev pointant sur une PG)", () => {
    expect(resolveDbMode({ DATABASE_URL: "postgresql://user:pass@localhost/edukora" })).toBe("postgres");
  });

  test("process réel du test : mode déterminé par resolveDbMode(process.env)", () => {
    expect(DB_MODE).toBe(resolveDbMode(process.env));
    // IS_PG n'est vrai que si le mode est postgres HORS phase de build
    expect(IS_PG).toBe(DB_MODE === "postgres" && !isBuildPhase);
    // Sans URL dans l'environnement de test, le process tourne en SQLite
    if (!process.env.DATABASE_URL) {
      expect(DB_MODE).toBe("sqlite");
      expect(IS_PG).toBe(false);
    }
  });
});
