import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { query, queryOne } from "@/lib/db";

/**
 * Chapitres disponibles pour une classe teacher's.
 * Liste les chapitres du niveau de la classe (et de sa matière lorsqu'elle est
 * renseignée), en excluant ceux déjà planifiés dans `class_chapters`.
 */
async function GETHandler(_req: NextRequest, { params }: { params: Promise<{ classId: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { classId } = await params;
  const id = Number(classId);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Identifiant de classe invalide" }, { status: 400 });
  }

  const klass = await queryOne<{ id: number; name: string; subject_id: number | null; grade_id: number | null }>(
    `SELECT id, name, subject_id, grade_id FROM classes WHERE id = ?`,
    id,
  );
  if (!klass) {
    return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  }

  if (klass.grade_id == null) {
    return NextResponse.json({
      chapters: [],
      message: "Cette classe n'est rattachée à aucun niveau : renseignez son niveau pour planifier des chapitres.",
    });
  }

  const chapters = await query<{
    id: number;
    title: string;
    code: string;
    subject_name: string;
    grade_name: string;
  }>(
    `SELECT ch.id, ch.title, ch.code, s.name AS subject_name, g.name AS grade_name
     FROM chapters ch
     JOIN subjects s ON s.id = ch.subject_id
     JOIN grades g ON g.id = ch.grade_id
     LEFT JOIN class_chapters cc ON cc.class_id = ? AND cc.chapter_id = ch.id
     WHERE ch.grade_id = ?
       AND (? IS NULL OR ch.subject_id = ?)
       AND cc.chapter_id IS NULL
     ORDER BY s.name ASC, ch.order_index ASC, ch.id ASC`,
    id,
    klass.grade_id,
    klass.subject_id,
    klass.subject_id,
  );

  return NextResponse.json({ chapters });
}

export const GET = guardApi("GET /api/admin/classes/[classId]/chapters", GETHandler);
