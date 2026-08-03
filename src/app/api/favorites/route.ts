import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const favorites = query<{
    item_type: string;
    item_id: number;
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    level: string;
  }>(
    `SELECT f.item_type, f.item_id,
            CASE WHEN f.item_type = 'quiz' THEN q.title ELSE p.title END AS title,
            CASE WHEN f.item_type = 'quiz' THEN s.name ELSE s.name END AS subtitle,
            s.icon, s.color, q.level
     FROM favorites f
     LEFT JOIN quizzes q ON f.item_type = 'quiz' AND q.id = f.item_id
     LEFT JOIN exam_papers p ON f.item_type = 'paper' AND p.id = f.item_id
     LEFT JOIN subjects s ON s.id = COALESCE(q.subject_id, p.subject_id)
     WHERE f.user_id = ?
     ORDER BY f.created_at DESC`,
    user.id,
  );

  return NextResponse.json({ favorites });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || (body.item_type !== "quiz" && body.item_type !== "paper") || !Number.isInteger(body.item_id)) {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const exists = queryOne<{ id: number }>(
    "SELECT id FROM favorites WHERE user_id = ? AND item_type = ? AND item_id = ?",
    user.id,
    body.item_type,
    body.item_id,
  );

  if (exists) {
    run("DELETE FROM favorites WHERE id = ?", exists.id);
    return NextResponse.json({ favorite: false });
  }

  run("INSERT INTO favorites (user_id, item_type, item_id) VALUES (?, ?, ?)", user.id, body.item_type, body.item_id);
  refreshBadges(user.id);
  return NextResponse.json({ favorite: true });
}
