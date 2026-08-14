// Défi du jour : un quiz mis en avant chaque jour, avec bonus XP.
import { query, queryOne, run } from "./db";

export const DAILY_BONUS_XP = 15;

export interface DailyQuiz {
  id: number;
  title: string;
  done_today: boolean;
  bonus_xp: number;
}

export function dailyKey(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

/**
 * Quiz du jour : tirage déterministe parmi les quiz approuvés,
 * basé sur le jour (UTC). Le même quiz reste affiché toute la journée
 * pour tous les utilisateurs.
 */
export async function pickDailyQuiz(): Promise<{ id: number; title: string } | null> {
  const rows = await query<{ id: number; title: string }>(
    "SELECT id, title FROM quizzes WHERE status = 'approved' ORDER BY id",
  );
  if (rows.length === 0) return null;
  const dayIndex = Math.floor(Date.now() / 86400000);
  return rows[dayIndex % rows.length];
}

export async function getDailyQuiz(userId: number): Promise<DailyQuiz | null> {
  const quiz = await pickDailyQuiz();
  if (!quiz) return null;
  const done = await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM daily_challenges WHERE user_id = ? AND day = ?",
    userId,
    dailyKey(),
  );
  return { ...quiz, done_today: (done?.c ?? 0) > 0, bonus_xp: DAILY_BONUS_XP };
}

/** Marque le défi du jour comme relevé (une seule fois par jour). */
export async function creditDailyChallenge(userId: number, quizId: number): Promise<boolean> {
  const res = await run(
    "INSERT INTO daily_challenges (user_id, day, quiz_id) VALUES (?, ?, ?) ON CONFLICT (user_id, day) DO NOTHING",
    userId,
    dailyKey(),
    quizId,
  );
  return res.changes > 0;
}

/** Nombre de défis du jour relevés (pour le badge « Série d'acier »). */
export async function countDailyChallenges(userId: number): Promise<number> {
  const row = await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM daily_challenges WHERE user_id = ?",
    userId,
  );
  return row?.c ?? 0;
}