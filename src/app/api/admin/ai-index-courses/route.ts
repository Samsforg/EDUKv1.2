import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, run, IS_PG } from "@/lib/db";
import { requireAdmin } from "@/lib/admin-guard";
import { logAudit } from "@/lib/audit";
import { chunkText } from "@/lib/ai/chunker";
import { embedTexts } from "@/lib/ai/embeddings";

const MAX_LIMIT = 100;

async function indexOne(lessonId: number, force: boolean): Promise<{ changed: number; total: number }> {
  const lesson = await query<{
    lesson_id: number;
    chapter_id: number;
    subject_id: number | null;
    grade_id: number | null;
    chapter_title: string;
    title: string;
    content_md: string;
    content: string;
    summary: string;
  }>(
    `SELECT l.id AS lesson_id, l.title, l.summary, l.content_md, l.content,
            c.id AS chapter_id, c.title AS chapter_title, c.subject_id, c.grade_id
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     WHERE l.id = ? AND l.status = 'approved'`,
    lessonId,
  );
  const row = lesson[0];
  if (!row) return { changed: -1, total: 0 };

  const source = (row.content_md || "").trim() || (row.content || "").trim();
  const text = source.length ? source : `${row.title}\n\n${row.summary || ""}`;
  const chunks = chunkText(text);
  if (!chunks.length) return { changed: 0, total: 0 };

  const title = row.chapter_title ? `${row.chapter_title} — ${row.title}` : row.title;

  // Détection incrémentale (sauf force) : on ne ré-embede que les chunks changés.
  const prev = await query<{ content: string; position: number }>(
    `SELECT content, position FROM document_chunks WHERE source_type = 'lesson' AND source_id = ?`,
    lessonId,
  );
  const prevHashes = new Set(prev.map((p) => `${p.position}:${hashString(p.content)}`));
  const changedChunks: { position: number; content: string }[] = [];
  chunks.forEach((content, i) => {
    if (force || !prevHashes.has(`${i}:${hashString(content)}`)) {
      changedChunks.push({ position: i, content });
    }
  });

  if (!force && changedChunks.length === 0) {
    return { changed: 0, total: chunks.length };
  }

  const toEmbed = (force ? chunks.map((c, i) => ({ position: i, content: c })) : changedChunks).map(
    (c) => c.content,
  );
  const embedding = await embedTexts(toEmbed);
  if (!embedding) throw new Error("Embeddings indisponibles (clés API manquantes ou en échec)");
  const vectors = embedding.vectors;

  await run(`DELETE FROM document_chunks WHERE source_type = 'lesson' AND source_id = ?`, lessonId);
  const list = force ? chunks.map((c, i) => ({ position: i, content: c })) : changedChunks;
  for (let k = 0; k < vectors.length; k++) {
    const value = JSON.stringify(vectors[k]);
    if (IS_PG) {
      await run(
        `INSERT INTO document_chunks
           (source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position, embedding)
         VALUES ('lesson', ?, ?, ?, ?, ?, ?, ?, ?, ?::vector)`,
        lessonId, lessonId, row.chapter_id, row.subject_id, row.grade_id,
        title, list[k].content, list[k].position, value,
      );
    } else {
      await run(
        `INSERT INTO document_chunks
           (source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position, embedding)
         VALUES ('lesson', ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        lessonId, lessonId, row.chapter_id, row.subject_id, row.grade_id,
        title, list[k].content, list[k].position, value,
      );
    }
  }
  return { changed: vectors.length, total: chunks.length };
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h >>> 0;
}

async function POSTHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => ({}));
  const lessonId = Number(body.lessonId) || 0;
  const all = body.all === true;
  const force = body.force === true;
  const limit = Math.max(1, Math.min(MAX_LIMIT, Number(body.limit) || 20));

  if (lessonId > 0) {
    try {
      const { changed, total } = await indexOne(lessonId, force);
      if (changed < 0) {
        return NextResponse.json({ ok: false, error: "Leçon introuvable ou non approuvée" }, { status: 404 });
      }
      await logAudit(null, "content_ai", `Indexation RAG leçon #${lessonId} → ${changed}/${total} chunks`);
      return NextResponse.json({ ok: true, changed, total });
    } catch (err) {
      return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : "Erreur" }, { status: 500 });
    }
  }

  if (all) {
    const rows = await query<{ id: number }>(
      `SELECT l.id
       FROM lessons l
       JOIN chapters c ON c.id = l.chapter_id
       WHERE l.status = 'approved'
         AND (l.content_md <> '' OR l.content <> '')
       ORDER BY l.id
       LIMIT ?`,
      limit,
    );
    const ids = rows.map((r) => r.id);
    let indexed = 0;
    let upToDate = 0;
    const errors: { lessonId: number; error: string }[] = [];
    for (const id of ids) {
      try {
        const { changed, total } = await indexOne(id, force);
        if (changed < 0) {
          errors.push({ lessonId: id, error: "introuvable" });
        } else if (changed === 0) {
          upToDate++;
        } else {
          indexed += changed;
        }
      } catch (err) {
        errors.push({ lessonId: id, error: err instanceof Error ? err.message : "erreur" });
      }
    }
    await logAudit(null, "content_ai", `Indexation RAG batch : ${ids.length} leçon(s), ${indexed} chunks, ${upToDate} à jour, ${errors.length} erreur(s)`);
    return NextResponse.json({ ok: true, lessons: ids.length, indexed, upToDate, errors });
  }

  return NextResponse.json({ error: "Précisez lessonId ou all=true" }, { status: 400 });
}

export const POST = guardApi("POST /api/admin/ai-index-courses", POSTHandler);
