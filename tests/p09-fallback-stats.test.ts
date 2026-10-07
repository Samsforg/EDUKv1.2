/**
 * P0.9 B — FALLBACK_STATS explicitement identifiable.
 *
 * Le retour de getPlatformStats() porte désormais `fallback` :
 *   - false = valeurs collectées en base,
 *   - true  = valeurs démonstratives (source indisponible).
 * Aucune règle de calcul ni design de la page réelle n'est modifiée.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const mockQueryOne = jest.fn();

jest.mock("@/lib/db", () => ({
  queryOne: (...args: unknown[]) => mockQueryOne(...args),
}));
// collectStats est appelé directement (unstable_cache = identité en test)
jest.mock("next/cache", () => ({
  unstable_cache: <T,>(fn: T) => fn,
}));

import { getPlatformStats } from "@/lib/stats";

const resultatsSrc = readFileSync(
  join(__dirname, "..", "src", "app", "resultats", "page.tsx"),
  "utf8",
);

describe("P0.9 B — provenance explicite des statistiques plateforme", () => {
  beforeEach(() => {
    mockQueryOne.mockReset();
  });

  it("B1 — source réelle disponible : fallback = false et valeurs de la base", async () => {
    mockQueryOne.mockImplementation(async (sql: string) => {
      if (sql.includes("quiz_attempts")) return { c: 7 };
      if (sql.includes("lesson_reads")) return { c: 8 };
      if (sql.includes("SUM(u.xp)")) return { s: 90 };
      return { c: 6 };
    });
    const stats = await getPlatformStats();
    expect(stats).toEqual({
      students: 6,
      quizzesCorrected: 7,
      lessonsRead: 8,
      xpEarned: 90,
      fallback: false,
    });
  });

  it("B2 — source indisponible : fallback = true avec exactement les valeurs démonstratives", async () => {
    mockQueryOne.mockRejectedValue(new Error("db down"));
    const stats = await getPlatformStats();
    expect(stats).toEqual({
      students: 150,
      quizzesCorrected: 1200,
      lessonsRead: 3500,
      xpEarned: 48000,
      fallback: true,
    });
  });

  it("B3 — les valeurs de repli sont signalées dans l'interface (/resultats)", () => {
    expect(resultatsSrc).toMatch(/\{stats\.fallback &&/);
    expect(resultatsSrc).toContain("Statistiques indicatives");
    // le contenu réel n'est pas modifié : la page affiche toujours les mêmes champs
    expect(resultatsSrc).toMatch(/stats\.students/);
    expect(resultatsSrc).toMatch(/stats\.quizzesCorrected/);
    expect(resultatsSrc).toMatch(/stats\.lessonsRead/);
    expect(resultatsSrc).toMatch(/stats\.xpEarned/);
  });

  it("B4 — chemin réel : aucun basculement silencieux, fallback toujours à false", async () => {
    mockQueryOne.mockResolvedValue({ c: 0 });
    const stats = await getPlatformStats();
    expect(stats.fallback).toBe(false);
    expect(stats.students).toBe(0);
  });
});
