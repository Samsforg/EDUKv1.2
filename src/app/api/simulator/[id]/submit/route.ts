import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser, applyActivity, addXp, notify } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";
import { endSession } from "@/lib/proctoring";
import { creditLigueChallenges } from "@/lib/ligue";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || !Array.isArray(body.answers)) {
    return NextResponse.json({ error: "Réponses invalides" }, { status: 400 });
  }

  const paper = queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM exam_papers WHERE id = ? AND status = 'approved'",
    Number(id),
  );
  if (!paper) return NextResponse.json({ error: "Sujet introuvable" }, { status: 404 });

  const questions = query<{ id: number; answer_index: number; points: number; explanation: string | null }>(
    "SELECT id, answer_index, points, explanation FROM questions WHERE paper_id = ? ORDER BY position",
    Number(id),
  );

  let score = 0;
  let max = 0;
  const details = questions.map((q) => {
    const selected = body.answers.find((a: { questionId: number }) => a.questionId === q.id);
    const correct = selected && selected.selected === q.answer_index;
    if (correct) score += q.points;
    max += q.points;
    return {
      questionId: q.id,
      correct: !!correct,
      answer_index: q.answer_index,
      explanation: q.explanation,
    };
  });
  const scoreOver20 = max > 0 ? Math.round((score * 20) / max * 10) / 10 : 0;
  const duration = Math.max(0, Math.round(body.duration_seconds ?? 0));

  run(
    "INSERT INTO exam_attempts (user_id, paper_id, score, score_over_20, duration_seconds) VALUES (?, ?, ?, ?, ?)",
    user.id,
    Number(id),
    score,
    scoreOver20,
    duration,
  );

  endSession(user.id, Number(id), body.flags);
  run(
    "INSERT INTO proctoring_events (session_id, event_type, detail) SELECT ps.id, 'submission', ? FROM proctoring_sessions ps WHERE ps.user_id = ? AND ps.paper_id = ? AND ps.status = 'ended' ORDER BY ps.id DESC LIMIT 1",
    `Épreuve soumise — ${scoreOver20}/20`,
    user.id,
    Number(id),
  );

  applyActivity(user.id);
  const xp = 20 + Math.max(0, Math.round(scoreOver20 * 3));
  addXp(user.id, xp);
  creditLigueChallenges(user.id, "xp_total", xp);

  refreshBadges(user.id);
  notify(
    user.id,
    "Examen simulé",
    `Tu as obtenu ${scoreOver20}/20 au sujet « ${paper.title} » (+${xp} XP).`,
    "school",
  );

  return NextResponse.json({ score, max, score_over_20: scoreOver20, xp, details });
}
