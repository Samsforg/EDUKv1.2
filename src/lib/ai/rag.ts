import { IS_PG, query } from "../db";
import { embedTexts } from "./embeddings";
import type { SqlParam } from "../db";

export interface RAGContext {
  subjectId?: number | null;
  subjectIds?: number[] | null;
  gradeId?: number | null;
  lessonId?: number | null;
}

export interface RAGSource {
  title: string;
  content: string;
  sourceType: string;
  sourceId: number;
  lessonId: number | null;
  chapterId: number | null;
  distance: number | null;
}

interface ChunkRow {
  id: number;
  title: string;
  content: string;
  source_type: string;
  source_id: number;
  lesson_id: number | null;
  chapter_id: number | null;
  distance?: number | null;
}

function toVectorString(vector: number[]): string {
  return `[${vector.join(",")}]`;
}

export async function searchChunks(
  question: string,
  options: RAGContext = {},
  limit = 6,
): Promise<RAGSource[]> {
  const subjectIds = options.subjectIds?.filter((s): s is number => Number.isFinite(s)) ?? [];
  const effectiveSubjectIds =
    options.subjectId != null
      ? [options.subjectId]
      : subjectIds.length > 0
        ? subjectIds
        : null;
  const filters = {
    gradeId: options.gradeId ?? null,
    lessonId: options.lessonId ?? null,
  };

  if (IS_PG) {
    const embedding = await embedTexts([question]);
    if (!embedding) return [];
    const vector = toVectorString(embedding.vectors[0]);
    const params: SqlParam[] = [
      vector,
      effectiveSubjectIds,
      filters.gradeId,
      filters.lessonId,
    ];
    const rows = await query<ChunkRow>(
      `SELECT id, title, content, source_type, source_id, lesson_id, chapter_id,
              (embedding <=> ?::vector) AS distance
       FROM document_chunks
       WHERE embedding IS NOT NULL
         AND (?::int[] IS NULL OR subject_id = ANY(?))
         AND (?::int IS NULL OR grade_id = ?)
         AND (?::int IS NULL OR lesson_id = ?)
       ORDER BY embedding <=> ?::vector
       LIMIT ?`,
      params[0],
      params[1],
      params[1],
      params[2],
      params[2],
      params[3],
      params[3],
      params[0],
      limit,
    );
    return rows.map((r) => ({
      title: r.title,
      content: r.content,
      sourceType: r.source_type,
      sourceId: r.source_id,
      lessonId: r.lesson_id,
      chapterId: r.chapter_id,
      distance: r.distance ?? null,
    }));
  }

  const keywords = question
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 3)
    .slice(0, 6)
    .map((w) => `%${w}%`);
  if (keywords.length === 0) return [];

  const matchClauses = keywords.map(() => "(content LIKE ? OR title LIKE ?)").join(" OR ");
  const scoreExpr = keywords
    .map(
      () =>
        "(CASE WHEN content LIKE ? THEN 1 ELSE 0 END + CASE WHEN title LIKE ? THEN 1 ELSE 0 END)",
    )
    .join(" + ");
  const subjectClause =
    effectiveSubjectIds && effectiveSubjectIds.length > 0
      ? `AND subject_id IN (${effectiveSubjectIds.map(() => "?").join(", ")})`
      : "";
  const params: SqlParam[] = [
    filters.gradeId,
    filters.lessonId,
    ...(effectiveSubjectIds ?? []),
    ...keywords.flatMap((k) => [k, k]),
    ...keywords.flatMap((k) => [k, k]),
    limit,
  ];
  const rows = await query<ChunkRow>(
    `SELECT id, title, content, source_type, source_id, lesson_id, chapter_id, NULL AS distance
     FROM document_chunks
     WHERE (? IS NULL OR grade_id = ?)
       AND (? IS NULL OR lesson_id = ?)
       ${subjectClause}
       AND (${matchClauses})
     ORDER BY (${scoreExpr}) DESC, id
     LIMIT ?`,
    params[0],
    params[0],
    params[1],
    params[1],
    ...(effectiveSubjectIds ?? []),
    ...keywords.flatMap((k) => [k, k]),
    ...keywords.flatMap((k) => [k, k]),
    limit,
  );
  return rows.map((r) => ({
    title: r.title,
    content: r.content,
    sourceType: r.source_type,
    sourceId: r.source_id,
    lessonId: r.lesson_id,
    chapterId: r.chapter_id,
    distance: null,
  }));
}

export function buildRAGContextBlock(sources: RAGSource[]): string {
  if (sources.length === 0) return "";
  const body = sources
    .map(
      (s, i) =>
        `[Extrait ${i + 1}] Titre : ${s.title}\n${s.content}`,
    )
    .join("\n\n");
  return `Contexte pédagogique Edukora (extraits du programme ivoirien) :
${body}

Règles d'utilisation du contexte :
- Utilise ces extraits en priorité quand ils correspondent à la question de l'élève.
- Base ta réponse sur ces contenus, sans les recopier mot à mot.
- Si aucun extrait n'est pertinent pour la question, réponds avec tes connaissances sans le mentionner.
- Ne cite pas « extrait 1 », « contexte » ni « RAG » dans ta réponse.`;
}

export async function buildTutorRAGContext(
  question: string,
  subjectIds: number[] = [],
  lessonId: number | null = null,
): Promise<string> {
  try {
    const sources = await searchChunks(
      question,
      { subjectIds, lessonId },
      5,
    );
    return buildRAGContextBlock(sources);
  } catch {
    return "";
  }
}
