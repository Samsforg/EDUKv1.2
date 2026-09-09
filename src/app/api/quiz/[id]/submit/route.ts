import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser, applyActivity, addXp, notify } from "@/lib/session";
import { notifyOnActivity } from "@/lib/proactive";
import { refreshBadges } from "@/lib/badges";
import { creditLigueChallenges } from "@/lib/ligue";
import { getDailyQuiz, creditDailyChallenge, DAILY_BONUS_XP } from "@/lib/daily";
import { validate, QuizSubmitSchema } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { scheduleReview } from "@/lib/spaced-repetition";

async function POSTHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const ip = getClientIp(req);
  const rl = await rateLimit(`quiz:${user.id}:${ip}`, "quiz_submit");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const { id } = await params;
  const body = await req.json().catch(() => null);
  const v = validate(QuizSubmitSchema, { ...body, quiz_id: Number(id) });
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const quiz = await queryOne<{ id: number; title: string }>(
    "SELECT id, title FROM quizzes WHERE id = ? AND status = 'approved'",
    Number(id),
  );
  if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });

  const questions = await query<{ id: number; answer_index: number; points: number; explanation: string | null }>(
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

  await run(
    "INSERT INTO quiz_attempts (user_id, quiz_id, score, max_score, answers) VALUES (?, ?, ?, ?, ?)",
    user.id,
    Number(id),
    score,
    max,
    JSON.stringify(details),
  );

  await applyActivity(user.id);
  await notifyOnActivity(user.id);
  const pct = max > 0 ? Math.round((score * 100) / max) : 0;
  let xp = Math.max(1, Math.round(pct / 10));

  // Défi du jour : bonus XP une fois par jour sur le quiz mis en avant.
  let dailyBonus = 0;
  const daily = await getDailyQuiz(user.id);
  if (daily && daily.id === Number(id) && !daily.done_today && (await creditDailyChallenge(user.id, Number(id)))) {
    dailyBonus = DAILY_BONUS_XP;
    xp += dailyBonus;
  }

  await addXp(user.id, xp);
  // Révision espacée SM-2 : planifie la prochaine révision de ce quiz
  void scheduleReview(user.id, Number(id), pct).catch(() => {});
  await creditLigueChallenges(user.id, "quiz_done", 1);
  await creditLigueChallenges(user.id, "xp_total", xp);
  if (pct === 100) await creditLigueChallenges(user.id, "quiz_perfect", 1);

  // Upsell contextuel 1-clic essai 3j après 3 perfect
  if (pct === 100) {
    const perfectTotal = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ? AND score = max_score AND max_score > 0", user.id))!.c;
    if (perfectTotal === 3) {
      await notify(user.id, "Offre spéciale débloquée 🎉", "3 sans-faute ! Ton essai gratuit 3 jours t'attend en 1-clic sur /tarifs.", "verified");
    }
  }

  const badges = await refreshBadges(user.id);

  await notify(
    user.id,
    "Quiz terminé",
    `Tu as obtenu ${score}/${max} (${pct}%) au quiz « ${quiz.title} » (+${xp} XP).`,
    "quiz",
  );
  if (dailyBonus > 0) {
    await notify(
      user.id,
      "Défi du jour relevé !",
      `Bonus +${dailyBonus} XP pour ton quiz du jour. Reviens demain pour un nouveau défi !`,
      "flag",
    );
  }

  return NextResponse.json({ score, max, pct, xp, details, badges });
}

export const POST = guardApi("POST /api/quiz/[id]/submit", POSTHandler);
