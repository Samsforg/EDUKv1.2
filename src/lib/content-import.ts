import { query } from "./db";
import { createChapter, createLesson } from "./admin-content";
import { findGradeDirect } from "./level";
import { logAudit } from "./audit";

export const MAX_IMPORT_ROWS = 500;
export const MAX_IMPORT_PAYLOAD = 2_000_000;

export interface ImportRow {
  row: number;
  classe: string;
  matiere: string;
  chapitre: string;
  titre: string;
  resume: string;
  contenu: string;
  ordre?: number;
  duree_min?: number;
  difficulte?: number;
}

export interface ImportError {
  row: number;
  message: string;
}

export interface ImportReport {
  createdLessons: number;
  createdChapters: number;
  errors: ImportError[];
}

function normalizeLabel(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

/** Parseur CSV minimal (guillemets + "" échappés + CRLF), sans dépendance. */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  const src = text.replace(/^\uFEFF/, "");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\r") {
      // ignoré (géré avec \n)
    } else if (ch === "\n") {
      row.push(field);
      field = "";
      if (row.length > 1 || row[0].trim() !== "") rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.length > 1 || row[0].trim() !== "") rows.push(row);
  return rows;
}

const HEADER_ALIASES: Record<string, keyof Omit<ImportRow, "row" | "ordre" | "duree_min" | "difficulte"> | "ordre" | "duree_min" | "difficulte"> = {
  classe: "classe",
  class: "classe",
  niveau: "classe",
  grade: "classe",
  matiere: "matiere",
  matière: "matiere",
  subject: "matiere",
  chapitre: "chapitre",
  chapter: "chapitre",
  titre: "titre",
  title: "titre",
  resume: "resume",
  résumé: "resume",
  summary: "resume",
  contenu: "contenu",
  content: "contenu",
  markdown: "contenu",
  ordre: "ordre",
  order: "ordre",
  position: "ordre",
  duree_min: "duree_min",
  duree: "duree_min",
  duration: "duree_min",
  difficulte: "difficulte",
  difficulté: "difficulte",
  difficulty: "difficulte",
};

function toNumberOrUndefined(v: unknown): number | undefined {
  if (v === null || v === undefined || v === "") return undefined;
  const n = Number(String(v).trim().replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Normalise un payload CSV (avec ligne d'en-tête) ou JSON (tableau d'objets)
 * vers des lignes d'import canoniques. Ne touche jamais à la base.
 */
export function normalizeImportRows(
  format: string,
  payload: string,
): { rows: ImportRow[] } | { error: string } {
  if (format !== "csv" && format !== "json") return { error: "Format invalide (csv ou json attendu)" };
  if (!payload || !payload.trim()) return { error: "Fichier vide" };

  let records: Record<string, unknown>[] = [];
  let startRow = 1;
  if (format === "json") {
    try {
      const parsed: unknown = JSON.parse(payload);
      if (!Array.isArray(parsed)) return { error: "Le JSON doit être un tableau d'objets" };
      records = parsed.filter((r): r is Record<string, unknown> => typeof r === "object" && r !== null);
      startRow = 1;
    } catch {
      return { error: "JSON invalide" };
    }
  } else {
    const table = parseCsv(payload);
    if (table.length < 2) return { error: "CSV vide ou sans données (en-tête + au moins une ligne requis)" };
    const header = table[0].map((h) => normalizeLabel(h));
    const unknown = header.filter((h) => h !== "" && !(h in HEADER_ALIASES));
    if (unknown.length > 0) return { error: `Colonnes inconnues : ${unknown.join(", ")}` };
    records = table.slice(1).map((cells) => {
      const rec: Record<string, unknown> = {};
      header.forEach((h, i) => {
        if (h !== "") rec[h] = cells[i] ?? "";
      });
      return rec;
    });
    startRow = 2;
  }

  if (records.length > MAX_IMPORT_ROWS) {
    return { error: `Trop de lignes (max ${MAX_IMPORT_ROWS})` };
  }

  const rows: ImportRow[] = [];
  const errors: string[] = [];
  records.forEach((rec, i) => {
    const rowNum = startRow + i;
    const picked: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(rec)) {
      const canonical = HEADER_ALIASES[normalizeLabel(key)];
      if (canonical) picked[canonical] = value;
    }
    const str = (v: unknown) => String(v ?? "").trim();
    const row: ImportRow = {
      row: rowNum,
      classe: str(picked.classe),
      matiere: str(picked.matiere),
      chapitre: str(picked.chapitre),
      titre: str(picked.titre),
      resume: str(picked.resume),
      contenu: String(picked.contenu ?? ""),
      ordre: toNumberOrUndefined(picked.ordre),
      duree_min: toNumberOrUndefined(picked.duree_min),
      difficulte: toNumberOrUndefined(picked.difficulte),
    };
    const missing: string[] = [];
    if (!row.classe) missing.push("classe");
    if (!row.matiere) missing.push("matiere");
    if (!row.chapitre) missing.push("chapitre");
    if (!row.titre) missing.push("titre");
    if (!row.contenu.trim()) missing.push("contenu");
    if (missing.length > 0) {
      errors.push(`Ligne ${rowNum} : champs requis manquants (${missing.join(", ")})`);
      return;
    }
    rows.push(row);
  });
  if (rows.length === 0) {
    return { error: errors[0] ?? "Aucune ligne valide" };
  }
  return { rows };
}

async function findSubjectId(label: string): Promise<number | null> {
  const subjects = await query<{ id: number; code: string; name: string }>(
    "SELECT id, code, name FROM subjects",
  );
  const n = normalizeLabel(label);
  return subjects.find((s) => normalizeLabel(s.name) === n || normalizeLabel(s.code) === n)?.id ?? null;
}

function chapterCodeFromTitle(title: string): string {
  const slug = normalizeLabel(title)
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 30);
  return slug || "CH";
}

/**
 * Importe des leçons (chapitres auto-créés si absents, statut approved comme
 * toute création admin). Rapport complet, une ligne en erreur ne bloque pas
 * les autres. Réutilise createChapter/createLesson/findGradeDirect.
 */
export async function importLessons(rows: ImportRow[], actorId: number): Promise<ImportReport> {
  const report: ImportReport = { createdLessons: 0, createdChapters: 0, errors: [] };
  const chapterCache = new Map<string, number>();
  const positionCache = new Map<number, number>();

  const nextPosition = async (chapterId: number): Promise<number> => {
    const cached = positionCache.get(chapterId);
    if (cached !== undefined) {
      positionCache.set(chapterId, cached + 1);
      return cached;
    }
    const row = await query<{ m: number | null }>(
      "SELECT MAX(position) AS m FROM lessons WHERE chapter_id = ?",
      chapterId,
    ).catch(() => [{ m: null }]);
    const next = (row[0]?.m ?? 0) + 1;
    positionCache.set(chapterId, next + 1);
    return next;
  };

  for (const r of rows) {
    try {
      const grade = await findGradeDirect(r.classe);
      if (!grade) throw new Error(`Classe inconnue « ${r.classe} »`);
      const subjectId = await findSubjectId(r.matiere);
      if (!subjectId) throw new Error(`Matière inconnue « ${r.matiere} »`);

      const cacheKey = `${subjectId}|${grade.id}|${normalizeLabel(r.chapitre)}`;
      let chapterId = chapterCache.get(cacheKey);
      if (!chapterId) {
        const existing = await query<{ id: number; title: string }>(
          "SELECT id, title FROM chapters WHERE subject_id = ? AND grade_id = ?",
          subjectId,
          grade.id,
        );
        const match = existing.find((c) => normalizeLabel(c.title) === normalizeLabel(r.chapitre));
        if (match) {
          chapterId = match.id;
        } else {
          const maxOrder = await query<{ m: number | null }>(
            "SELECT MAX(order_index) AS m FROM chapters WHERE subject_id = ? AND grade_id = ?",
            subjectId,
            grade.id,
          ).catch(() => [{ m: null }]);
          const order = (maxOrder[0]?.m ?? 0) + 1;
          const created = await createChapter(
            subjectId,
            {
              grade_id: grade.id,
              code: chapterCodeFromTitle(r.chapitre),
              title: r.chapitre,
              description: "",
              order_index: order,
              position: order,
            },
            actorId,
          );
          if ("error" in created) throw new Error(created.error);
          chapterId = created.id;
          report.createdChapters++;
        }
        chapterCache.set(cacheKey, chapterId);
      }

      const lesson = await createLesson(
        chapterId,
        {
          title: r.titre,
          summary: r.resume,
          content_md: r.contenu,
          duration_min: r.duree_min ?? 15,
          difficulty: r.difficulte ?? 1,
          is_premium: 0,
          position: r.ordre ?? (await nextPosition(chapterId)),
        },
        actorId,
      );
      if ("error" in lesson) throw new Error(lesson.error);
      report.createdLessons++;
    } catch (err) {
      report.errors.push({ row: r.row, message: err instanceof Error ? err.message : String(err) });
    }
  }

  await logAudit(
    actorId,
    "content",
    `Import CSV/JSON : ${report.createdLessons} leçon(s), ${report.createdChapters} chapitre(s), ${report.errors.length} erreur(s)`,
  );
  return report;
}
