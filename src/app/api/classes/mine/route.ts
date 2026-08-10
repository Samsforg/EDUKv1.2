import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const classes = await query<{
    name: string;
    invite_code: string;
    subject_name: string | null;
    icon: string | null;
    color: string | null;
    grade_name: string | null;
    teacher_first: string;
    teacher_last: string;
    joined_at: string;
  }>(
    `SELECT c.name, c.invite_code,
            s.name AS subject_name, s.icon, s.color, g.name AS grade_name,
            t.first_name AS teacher_first, t.last_name AS teacher_last,
            cs.joined_at
     FROM class_students cs
     JOIN classes c ON c.id = cs.class_id
     LEFT JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     JOIN users t ON t.id = c.teacher_id
     WHERE cs.user_id = ?
     ORDER BY cs.joined_at DESC`,
    user.id,
  );

  return NextResponse.json({ classes });
}

export const GET = guardApi("GET /api/classes/mine", GETHandler);