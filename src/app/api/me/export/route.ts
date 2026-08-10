import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { query } from "@/lib/db";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const uid = user.id;

  const profile = await query<Record<string, unknown>>(
    `SELECT id, role, email, phone, first_name, last_name, serie_id, class_level,
            xp, streak, referral_code, commune, gender, goal, created_at
     FROM users WHERE id = ?`,
    uid,
  );

  const attempts = await query(
    `SELECT id, quiz_id, score, max_score, answers, completed_at FROM quiz_attempts WHERE user_id = ? ORDER BY id`,
    uid,
  );

  const examAttempts = await query(
    `SELECT id, paper_id, score, score_over_20, duration_seconds, completed_at FROM exam_attempts WHERE user_id = ? ORDER BY id`,
    uid,
  );

  const savedLessons = await query(
    `SELECT lesson_id, created_at FROM saved_lessons WHERE user_id = ? ORDER BY lesson_id`,
    uid,
  );

  const lessonReads = await query(
    `SELECT lesson_id, read_at FROM lesson_reads WHERE user_id = ? ORDER BY read_at`,
    uid,
  );

  const progress = await query(
    `SELECT lesson_id, completed, score, time_spent_min, completed_at FROM user_progress WHERE user_id = ? ORDER BY lesson_id`,
    uid,
  );

  const badges = await query<{ name: string; earned_at: string | null }>(
    `SELECT b.name, ub.earned_at FROM user_badges ub JOIN badges b ON ub.badge_id = b.id WHERE ub.user_id = ? ORDER BY ub.badge_id`,
    uid,
  );

  const consents = await query(
    `SELECT type, ip, user_agent, created_at FROM user_consents WHERE user_id = ? ORDER BY id`,
    uid,
  );

  const subs = await query(
    `SELECT s.id, s.plan_id, p.name AS plan_name, s.price_cents, p.currency, s.status, s.started_at, s.end_at, s.cancel_at_period_end, s.created_at
     FROM subscriptions s LEFT JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.user_id = ? ORDER BY s.id`,
    uid,
  );

  const forumPosts = await query(
    `SELECT id, category_id, title, content, created_at FROM forum_posts WHERE user_id = ? ORDER BY id`,
    uid,
  );

  const forumReplies = await query(
    `SELECT id, post_id, content, created_at FROM forum_replies WHERE user_id = ? ORDER BY id`,
    uid,
  );

  const payload = {
    exported_at: new Date().toISOString(),
    user_id: user.id,
    profile: profile[0],
    data: {
      attempts,
      exam_attempts: examAttempts,
      saved_lessons: savedLessons,
      lesson_reads: lessonReads,
      progress,
      badges,
      consents,
      subscriptions: subs,
      forum_posts: forumPosts,
      forum_replies: forumReplies,
    },
  };

  const json = JSON.stringify(payload, null, 2);

  return new NextResponse(json, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="edukora-donnees-${user.id}-${Date.now()}.json"`,
      "Cache-Control": "no-store",
    },
  });
}

export const GET = guardApi("GET /api/me/export", GETHandler);
