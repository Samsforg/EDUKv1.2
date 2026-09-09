import { unstable_cache } from "next/cache";
import { queryOne } from "./db";
import { realUsersWhere } from "./test-users";

export interface PlatformStats {
  students: number;
  quizzesCorrected: number;
  lessonsRead: number;
  xpEarned: number;
}

const FALLBACK_STATS: PlatformStats = {
  students: 150,
  quizzesCorrected: 1200,
  lessonsRead: 3500,
  xpEarned: 48000,
};

async function collectStats(): Promise<PlatformStats> {
  const students = await queryOne<{ c: number }>(`SELECT COUNT(*) AS c FROM users u WHERE u.role = 'student' AND ${realUsersWhere()}`);
  const quizzes = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts");
  const lessons = await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM lesson_reads");
  const xp = await queryOne<{ s: number | null }>(
    `SELECT COALESCE(SUM(u.xp), 0) AS s FROM users u WHERE u.role = 'student' AND ${realUsersWhere()}`,
  );
  return {
    students: students?.c ?? 0,
    quizzesCorrected: quizzes?.c ?? 0,
    lessonsRead: lessons?.c ?? 0,
    xpEarned: Math.round(xp?.s ?? 0),
  };
}

const cachedStats = unstable_cache(collectStats, ["platform-stats"], { revalidate: 3600 });

export async function getPlatformStats(): Promise<PlatformStats> {
  try {
    return await cachedStats();
  } catch (err) {
    console.error("[stats] collecte impossible, repli sur valeurs par défaut :", err);
    return FALLBACK_STATS;
  }
}
