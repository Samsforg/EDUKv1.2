import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser, applyActivity, addXp, notify } from "@/lib/session";
import { refreshBadges } from "@/lib/badges";
import { creditLigueChallenges } from "@/lib/ligue";
import { validate, QuizSubmitSchema } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ip = getClientIp(req);
  const rl = rateLimit(`quiz:${user.id}:${ip}`, "quiz_submit");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const v = validate(QuizSubmitSchema, { ...body, quiz_id: Number(id) });
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const quiz = queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM quizzes WHERE id = ? AND status = 'approved'",
    Number(id),
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });

  const questions = query<{ id: number; answer_index: number; points: number; explanation: string | null }>(
    "SELECT id, answer_index, points, explanation FROM questions WHERE quiz_id = ? ORDER BY position",
    Number(id),
  );

  let score = 0;
  let max = 0;
  const details = questions.map((q, idx) => {
    const selectedIdx = v.data.answers[idx];
    const correct = selectedIdx === q.answer_index;
    if (correct) score += q.points;
    max += q.points;
    return {
      questionId: q.id,
      correct,
      answer_index: q.answer_index,
      explanation: q.explanation,
    };
  });

  run(
    "INSERT INTO quiz_attempts (user_id, quiz_id, score, max_score, answers) VALUES (?, ?, ?, ?, ?)",
    user.id,
    Number(id),
    score,
    max,
    JSON.stringify(details),
  );

  applyActivity(user.id);
  const pct = max > 0 ? Math.round((score * 100) / max) : 0;
  const xp = Math.max(1, Math.round(pct / 10));
  addXp(user.id, xp);
  creditLigueChallenges(user.id, "quiz_done", 1);
  creditLigueChallenges(user.id, "xp_total", xp);
  if (pct === 100) creditLigueChallenges(user.id, "quiz_perfect", 1);

  const badges = refreshBadges(user.id);

  notify(
    user.id,
    "Quiz terminé",
    `Tu as obtenu ${score}/${max} (${pct}%) au quiz « ${quiz.title} » (+${xp} XP).`,
    "quiz",
  );

  return NextResponse.json({ score, max, pct, xp, details, badges });
}
