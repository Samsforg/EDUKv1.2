import { NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/auth";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const serie = queryOne<{ code: string; name: string }>(
    "SELECT code, name FROM series WHERE id = ?",
    user.serie_id ?? 0,
  );

  const quizStats = query<{ best_percent: number | null; total_attempts: number }>(
    `SELECT MAX(a.score * 100.0 / a.max_score) AS best_percent, COUNT(a.id) AS total_attempts
     FROM quiz_attempts a WHERE a.user_id = ?`,
    user.id,
  );
  const quizzesDone = quizStats.reduce((acc, s) => acc + s.total_attempts, 0);

  const examStats = queryOne<{ best: number | null; count: number }>(
    "SELECT MAX(score_over_20) AS best, COUNT(*) AS count FROM exam_attempts WHERE user_id = ?",
    user.id,
  );

  const globalScore =
    quizStats.length === 0
      ? null
      : (() => {
          const withScore = quizStats.filter((s) => s.best_percent !== null);
          if (withScore.length === 0) return null;
          return Math.round((withScore.reduce((acc, s) => acc + (s.best_percent ?? 0), 0) / withScore.length) * 100) / 100;
        })();

  const allBadges = query<{
    code: string;
    name: string;
    icon: string;
    description: string;
    earned_at: string | null;
  }>(
    `SELECT b.code, b.name, b.icon, b.description, ub.earned_at
     FROM badges b
     LEFT JOIN user_badges ub ON ub.badge_id = b.id AND ub.user_id = ?
     ORDER BY ub.earned_at IS NULL, ub.earned_at DESC, b.id`,
    user.id,
  );

  const quizHistory = query<{
    id: number;
    title: string;
    score: number;
    max_score: number;
    completed_at: string;
  }>(
    `SELECT q.id, q.title, a.score, a.max_score, a.completed_at
     FROM quiz_attempts a JOIN quizzes q ON q.id = a.quiz_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 10`,
    user.id,
  );

  const examHistory = query<{
    id: number;
    title: string;
    score_over_20: number;
    duration_seconds: number;
    completed_at: string;
  }>(
    `SELECT p.id, p.title, a.score_over_20, a.duration_seconds, a.completed_at
     FROM exam_attempts a JOIN exam_papers p ON p.id = a.paper_id
     WHERE a.user_id = ? ORDER BY a.completed_at DESC LIMIT 10`,
    user.id,
  );

  return NextResponse.json({
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      serie: serie ?? null,
      serie_id: user.serie_id,
      class_level: user.class_level,
      xp: user.xp,
      streak: user.streak,
    },
    stats: {
      global_score: globalScore,
      quizzes_done: quizzesDone,
      exams: examStats?.count ?? 0,
      best_exam: examStats?.best ?? null,
      badges_earned: allBadges.filter((b) => b.earned_at !== null).length,
    },
    badges: allBadges,
    quiz_history: quizHistory,
    exam_history: examHistory,
  });
}

export async function PATCH(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { first_name, last_name, email, phone, serie_id, class_level, current_password, new_password } = body;

  if (new_password) {
    if (!current_password) return NextResponse.json({ error: "Mot de passe actuel requis" }, { status: 400 });
    const stored = queryOne<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = ?", user.id);
    if (!stored || !verifyPassword(current_password, stored.password_hash)) return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 400 });
    if (new_password.length < 6) return NextResponse.json({ error: "Le nouveau mot de passe doit contenir au moins 6 caractères" }, { status: 400 });
    run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(new_password), user.id);
  }

  if (email !== undefined && email !== user.email) {
    const exists = queryOne<{ id: number }>("SELECT id FROM users WHERE email = ? AND id != ?", email, user.id);
    if (exists) return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
    run("UPDATE users SET email = ? WHERE id = ?", email, user.id);
  }

  if (phone !== undefined && phone !== user.phone) {
    const exists = queryOne<{ id: number }>("SELECT id FROM users WHERE phone = ? AND id != ?", phone, user.id);
    if (exists) return NextResponse.json({ error: "Ce numéro est déjà utilisé" }, { status: 409 });
    run("UPDATE users SET phone = ? WHERE id = ?", phone ?? null, user.id);
  }

  if (first_name !== undefined) run("UPDATE users SET first_name = ? WHERE id = ?", first_name, user.id);
  if (last_name !== undefined) run("UPDATE users SET last_name = ? WHERE id = ?", last_name, user.id);
  if (serie_id !== undefined) run("UPDATE users SET serie_id = ? WHERE id = ?", serie_id ?? null, user.id);
  if (class_level !== undefined) run("UPDATE users SET class_level = ? WHERE id = ?", class_level, user.id);

  const updated = queryOne<{ id: number; first_name: string; last_name: string; email: string | null; phone: string | null; serie_id: number | null; class_level: string | null }>(
    "SELECT id, first_name, last_name, email, phone, serie_id, class_level FROM users WHERE id = ?",
    user.id,
  );

  return NextResponse.json({ ok: true, user: updated });
}
