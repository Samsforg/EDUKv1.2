import { queryOne, run } from "@/lib/db";

export interface StreakInfo {
  current: number;
  longest: number;
  lastActive: string | null;
  isTodayDone: boolean;
  nextMilestone: number | null;
  bonusXp: number;
}

const MILESTONES = [3, 7, 14, 30, 60, 100];
const BONUS_BY_MILESTONE: Record<number, number> = { 3: 5, 7: 15, 14: 25, 30: 50, 60: 100, 100: 200 };

export function nextMilestone(current: number): number | null {
  return MILESTONES.find((m) => m > current) ?? null;
}

export async function getStreakInfo(userId: number): Promise<StreakInfo> {
  const u = await queryOne<{ streak: number; last_active: string | null; xp: number }>(
    "SELECT streak, last_active, xp FROM users WHERE id = ?",
    userId
  );
  const current = u?.streak ?? 0;
  const lastActive = u?.last_active ?? null;
  const today = new Date().toISOString().slice(0, 10);
  const isTodayDone = lastActive ? lastActive.slice(0, 10) === today : false;
  const nm = nextMilestone(current);
  return {
    current,
    longest: current,
    lastActive,
    isTodayDone,
    nextMilestone: nm,
    bonusXp: nm ? (BONUS_BY_MILESTONE[nm] ?? 0) : 0,
  };
}

export async function updateStreakDaily(userId: number): Promise<{ streak: number; isNewDay: boolean; bonus: number }> {
  const today = new Date().toISOString().slice(0, 10);
  const u = await queryOne<{ last_active: string | null; streak: number }>(
    "SELECT last_active, streak FROM users WHERE id = ?",
    userId
  );
  if (!u) return { streak: 0, isNewDay: false, bonus: 0 };
  const last = u.last_active ? u.last_active.slice(0, 10) : null;
  if (last === today) return { streak: u.streak, isNewDay: false, bonus: 0 };
  const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 10);
  const newStreak = last === yesterday ? u.streak + 1 : 1;
  await run("UPDATE users SET last_active = ?, streak = ? WHERE id = ?", today, newStreak, userId);
  const isMilestone = MILESTONES.includes(newStreak);
  const bonus = isMilestone ? (BONUS_BY_MILESTONE[newStreak] ?? 0) : 0;
  if (bonus > 0) await run("UPDATE users SET xp = xp + ? WHERE id = ?", bonus, userId);
  return { streak: newStreak, isNewDay: true, bonus };
}
