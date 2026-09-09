import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { hashPassword, verifyPassword } from "@/lib/auth";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const serie = await queryOne<{ code: string; name: string }>(
    "SELECT code, name FROM series WHERE id = ?",
    user.serie_id ?? 0,
  );

  const quizStats = await query<{ best_percent: number | null; total_attempts: number }>(
    `SELECT MAX(a.score * 100.0 / a.max_score) AS best_percent, COUNT(a.id) AS total_attempts
     FROM quiz_attempts a WHERE a.user_id = ?`,
    user.id,
  );
  const quizzesDone = quizStats.reduce((acc, s) => acc + s.total_attempts, 0);

  const examStats = await queryOne<{ best: number | null; count: number }>(
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

  const allBadges = await query<{
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

  const quizHistory = await query<{
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

  const examHistory = await query<{
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

  const referral = await queryOne<{ filleuls: number }>(
    "SELECT COUNT(*) AS filleuls FROM users WHERE referred_by = ?",
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
      referral_code: user.referral_code,
      filleuls: referral?.filleuls ?? 0,
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

export const GET = guardApi("GET /api/me/profile", GETHandler);

async function PATCHHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const { first_name, last_name, email, phone, serie_id, class_level, current_password, new_password } = body;

  if (new_password) {
    if (!current_password) return NextResponse.json({ error: "Mot de passe actuel requis" }, { status: 400 });
    const stored = await queryOne<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = ?", user.id);
    if (!stored || !verifyPassword(current_password, stored.password_hash)) return NextResponse.json({ error: "Mot de passe actuel incorrect" }, { status: 400 });
    if (new_password.length < 6) return NextResponse.json({ error: "Le nouveau mot de passe doit contenir au moins 6 caractères" }, { status: 400 });
    await run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(new_password), user.id);
  }

  if (email !== undefined && email !== user.email) {
    const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ? AND id != ?", email, user.id);
    if (exists) return NextResponse.json({ error: "Cet email est déjà utilisé" }, { status: 409 });
    await run("UPDATE users SET email = ? WHERE id = ?", email, user.id);
  }

  if (phone !== undefined && phone !== user.phone) {
    const exists = await queryOne<{ id: number }>("SELECT id FROM users WHERE phone = ? AND id != ?", phone, user.id);
    if (exists) return NextResponse.json({ error: "Ce numéro est déjà utilisé" }, { status: 409 });
    await run("UPDATE users SET phone = ? WHERE id = ?", phone ?? null, user.id);
  }

  if (first_name !== undefined) await run("UPDATE users SET first_name = ? WHERE id = ?", first_name, user.id);
  if (last_name !== undefined) await run("UPDATE users SET last_name = ? WHERE id = ?", last_name, user.id);

  // Changer de classe/série est réservé aux élèves avec un abonnement actif
  const wantsClassChange =
    (serie_id !== undefined && String(serie_id ?? "") !== String(user.serie_id ?? "")) ||
    (class_level !== undefined && String(class_level ?? "").trim() !== String(user.class_level ?? ""));
  if (wantsClassChange) {
    const activeSub = await queryOne<{ id: number }>(
      "SELECT id FROM subscriptions WHERE user_id = ? AND status IN ('active','trial') AND (end_at IS NULL OR end_at > datetime('now')) ORDER BY id DESC LIMIT 1",
      user.id,
    );
    if (!activeSub) {
      return NextResponse.json(
        {
          code: "SUBSCRIPTION_REQUIRED",
          error: "Changer de classe nécessite un abonnement Premium actif.",
        },
        { status: 402 },
      );
    }
    // Vérifier que la nouvelle série existe si fournie
    if (serie_id !== undefined && serie_id !== null) {
      const serieExists = await queryOne<{ id: number }>("SELECT id FROM series WHERE id = ?", serie_id);
      if (!serieExists) return NextResponse.json({ error: "Série inconnue" }, { status: 400 });
    }
    const normalizedClassLevel = typeof class_level === "string" ? class_level.trim().slice(0, 60) : class_level;
    if (serie_id !== undefined) await run("UPDATE users SET serie_id = ? WHERE id = ?", serie_id ?? null, user.id);
    if (class_level !== undefined) await run("UPDATE users SET class_level = ? WHERE id = ?", normalizedClassLevel || null, user.id);
    // Invalider le cache des plans premium après changement de classe (nouveau contenu)
    await queryOne("SELECT 1");
  }

  const updated = await queryOne<{ id: number; first_name: string; last_name: string; email: string | null; phone: string | null; serie_id: number | null; class_level: string | null }>(
    "SELECT id, first_name, last_name, email, phone, serie_id, class_level FROM users WHERE id = ?",
    user.id,
  );

  return NextResponse.json({ ok: true, user: updated });
}

export const PATCH = guardApi("PATCH /api/me/profile", PATCHHandler);
