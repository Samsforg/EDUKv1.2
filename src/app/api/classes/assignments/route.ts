import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GETHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const classIds = await query<{ class_id: number }>(
    "SELECT class_id FROM class_students WHERE user_id = ?",
    user.id,
  );
  const ids = classIds.map((r) => r.class_id);
  if (ids.length === 0) return NextResponse.json({ assignments: [] });

  const placeholders = ids.map(() => "?").join(",");
  const assignments = await query<
    {
      id: number;
      class_id: number;
      class_name: string;
      title: string;
      description: string | null;
      subject_id: number | null;
      subject_name: string | null;
      deadline: string | null;
      max_score: number;
      created_at: string;
      submitted_at: string | null;
      content: string | null;
      score: number | null;
      feedback: string | null;
    }
  >(
    `SELECT a.id, a.class_id, c.name AS class_name, a.title, a.description, a.subject_id,
            s.name AS subject_name, a.deadline, a.max_score, a.created_at,
            sub.submitted_at, sub.content, sub.score, sub.feedback
     FROM class_assignments a
     JOIN classes c ON c.id = a.class_id
     LEFT JOIN subjects s ON s.id = a.subject_id
     LEFT JOIN assignment_submissions sub ON sub.assignment_id = a.id AND sub.student_id = ?
     WHERE a.class_id IN (${placeholders})
     ORDER BY a.created_at DESC`,
    user.id,
    ...ids,
  );
  return NextResponse.json({ assignments });
}

export const GET = guardApi("GET /api/classes/assignments", GETHandler);