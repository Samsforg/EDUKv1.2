import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  const papers = query<{
    id: number;
    category: string;
    year: number;
    title: string;
    duration_minutes: number;
    subject_name: string;
    icon: string;
    color: string;
    question_count: number;
    best_score: number | null;
  }>(
    `SELECT p.id, p.category, p.year, p.title, p.duration_minutes,
            s.name AS subject_name, s.icon, s.color,
            (SELECT COUNT(*) FROM questions x WHERE x.paper_id = p.id) AS question_count,
            (SELECT MAX(a.score_over_20) FROM exam_attempts a WHERE a.paper_id = p.id AND a.user_id = ?) AS best_score
     FROM exam_papers p JOIN subjects s ON s.id = p.subject_id
     WHERE p.status = 'approved'
     ORDER BY p.category, p.year DESC`,
    user?.id ?? 0,
  );
  return NextResponse.json({ papers });
}
