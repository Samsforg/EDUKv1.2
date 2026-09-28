import { query } from "@/lib/db";

const COLLEGE_GRADES: Record<string, string> = {
  "6ème": "6eme",
  "5ème": "5eme",
  "4ème": "4eme",
  "3ème": "3eme",
};

const SERIE_GRADES: Record<string, { "1ère": string; "Terminale": string }> = {
  C: { "1ère": "1ere_s", "Terminale": "term_s" },
  D: { "1ère": "1ere_s", "Terminale": "term_s" },
  A: { "1ère": "1ere_l", "Terminale": "term_l" },
  B: { "1ère": "1ere_es", "Terminale": "term_es" },
};

const LYCEE_BY_CLASS: Record<string, string[]> = {
  "2nde": ["2nde"],
  "1ère": ["1ere_s", "1ere_l", "1ere_es"],
  "Terminale": ["term_s", "term_l", "term_es"],
};

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['`]/g, "")
    .trim();
}

const BASE_CLASS: Record<string, string> = {
  "6eme": "6ème",
  "5eme": "5ème",
  "4eme": "4ème",
  "3eme": "3ème",
  "6me": "6ème",
  "5me": "5ème",
  "4me": "4ème",
  "3me": "3ème",
  "2nde": "2nde",
  "seconde": "2nde",
  "1ere": "1ère",
  "premiere": "1ère",
  "1re": "1ère",
  "terminale": "Terminale",
  "term": "Terminale",
  "tle": "Terminale",
  "terminal": "Terminale",
};

export interface GradeRef {
  id: number;
  name: string;
  code: string;
}

function normalizeGradeCode(s: string): string {
  return norm(s)
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/**
 * Match direct d'un libellé de classe contre la table `grades` (nom exact,
 * puis code normalisé). Permet à toute classe présente en base — y compris
 * les futures classes créées depuis l'administration — de se résoudre sans
 * modification du code. Retourne null si aucun match (repli heuristique).
 */
export async function findGradeDirect(classLevel: string | null): Promise<GradeRef | null> {
  const trimmed = classLevel?.trim();
  if (!trimmed) return null;
  const byName = await query<GradeRef>("SELECT id, name, code FROM grades WHERE name = ?", trimmed);
  if (byName[0]) return byName[0];
  const code = normalizeGradeCode(trimmed);
  if (!code) return null;
  const byCode = await query<GradeRef>("SELECT id, name, code FROM grades WHERE code = ?", code);
  return byCode[0] ?? null;
}

/**
 * Une classe nécessite le choix d'une série uniquement si elle appartient à
 * la filière générale du lycée (cible du mapping séries C/D/A/B, plus 2nde).
 * Les classes techniques (ex. 2nde-G2, Tle-B) n'ont pas de série.
 */
export function gradeNeedsSerie(code: string | null | undefined): boolean {
  if (!code) return false;
  if (code === "2nde") return true;
  for (const tracks of Object.values(SERIE_GRADES)) {
    if (tracks["1ère"] === code || tracks["Terminale"] === code) return true;
  }
  return false;
}

export function gradeCandidates(classLevel: string | null, serieCode: string | null): string[] | null {
  if (!classLevel) return null;
  const normalized = norm(classLevel).replace(/\s+([a-f])$/i, "");
  const base = BASE_CLASS[normalized] ?? null;
  if (!base) return null;

  const college = COLLEGE_GRADES[base];
  if (college) return [college];
  if (base === "2nde") return ["2nde"];

  const suffixSerie = (serieCode ?? (norm(classLevel).match(/\s+([a-f])$/)?.[1] ?? null)) as string | null;
  const letter = suffixSerie?.toUpperCase() ?? null;

  if (letter && SERIE_GRADES[letter]) {
    const bySerie = SERIE_GRADES[letter][base as "1ère" | "Terminale"];
    if (bySerie) return [bySerie];
  }
  const byClass = LYCEE_BY_CLASS[base];
  return byClass ?? null;
}

export async function resolveUserGradeIds(serieId: number | null, classLevel: string | null): Promise<number[] | null> {
  const direct = await findGradeDirect(classLevel);
  if (direct) return [direct.id];
  const serieCode = serieId
    ? ((await query<{ code: string }>("SELECT code FROM series WHERE id = ?", serieId))[0]?.code ?? null)
    : null;
  const candidates = gradeCandidates(classLevel, serieCode);
  if (!candidates || candidates.length === 0) return null;

  const rows = await query<{ id: number }>(
    `SELECT id FROM grades WHERE code IN (${candidates.map(() => "?").join(",")})`,
    ...candidates,
  );
  return rows.length > 0 ? rows.map((r) => r.id) : null;
}

export function gradeInClause(ids: number[]): { clause: string; params: number[] } {
  return { clause: `grade_id IN (${ids.map(() => "?").join(",")})`, params: ids };
}
