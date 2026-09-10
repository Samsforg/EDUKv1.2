import { query, queryOne } from "@/lib/db";
import { notify } from "@/lib/session";
import { parseDbDate } from "@/lib/date-parse";
import { sendPushToUser } from "@/lib/push";

const COOLDOWN_MS: Record<string, number> = {
  welcome: 365 * 24 * 3600 * 1000,
  inactive_7d: 30 * 24 * 3600 * 1000,
  streak_milestone: 7 * 24 * 3600 * 1000,
  streak_daily: 24 * 3600 * 1000,
  quiz_recap: 24 * 3600 * 1000,
  exam_countdown: 24 * 3600 * 1000,
};

async function lastNotifiedAt(userId: number, type: string): Promise<Date | null> {
  const row = await queryOne<{ created_at: string }>(
    "SELECT created_at FROM notifications WHERE user_id = ? AND type = ? ORDER BY id DESC LIMIT 1",
    userId,
    type,
  );
  return row ? parseDbDate(row.created_at) : null;
}

export async function maybeNotify(
  userId: number,
  type: string,
  title: string,
  body: string,
  icon?: string,
): Promise<boolean> {
  const last = await lastNotifiedAt(userId, type);
  const cooldown = COOLDOWN_MS[type] ?? 7 * 24 * 3600 * 1000;
  if (last && Date.now() - last.getTime() < cooldown) return false;
  await notify(userId, title, body, icon ?? type, type);
  return true;
}

const STREAK_TARGETS: Record<number, string> = {
  5: "Enchaînes 5 jours de suite, c'est le bon rythme !",
  10: "10 jours d'affilée. Ta série devient redoutable !",
  20: "20 jours consécutifs. Personne ne t'arrête !",
};

async function notifyStreakMilestone(userId: number, streak: number): Promise<void> {
  const msg = STREAK_TARGETS[streak];
  if (!msg) return;
  await maybeNotify(
    userId,
    "streak_milestone",
    `Série de ${streak} jours ! 🔥`,
    msg,
    "local_fire_department",
  );
  await sendPushToUser(userId, {
    title: `Série de ${streak} jours ! 🔥`,
    body: msg,
    url: "/accueil-edukora",
    tag: `streak-${streak}`,
  });
}

export async function notifyOnLogin(userId: number): Promise<void> {
  const user = await queryOne<{ last_active: string | null }>(
    "SELECT last_active FROM users WHERE id = ?",
    userId,
  );
  if (!user) return;

  if (user.last_active) {
    const last = parseDbDate(user.last_active) ?? new Date(0);
    const daysInactive = Math.floor((Date.now() - last.getTime()) / (24 * 3600 * 1000));
    if (daysInactive >= 7) {
      await maybeNotify(
        userId,
        "inactive_7d",
        "On t'attendait ! 👋",
        `Après ${daysInactive} jours d'absence, ton parcours t'attend. Reprends sur la dernière fiche que tu as lue !`,
        "waving_hand",
      );
    }
  }

  const xp = await queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (xp && xp.xp > 0 && xp.xp % 100 === 0) {
    await maybeNotify(
      userId,
      "xp_milestone",
      `${xp.xp} XP ! 🎉`,
      "Tu franchis un palier d'expérience, continue sur cette lancée.",
      "emoji_events",
    );
  }
}

export async function notifyOnActivity(userId: number): Promise<void> {
  const user = await queryOne<{ streak: number }>("SELECT streak FROM users WHERE id = ?", userId);
  if (!user) return;
  await notifyStreakMilestone(userId, user.streak);
  if (user.streak >= 1) {
    const sent = await maybeNotify(
      userId,
      "streak_daily",
      `Série de ${user.streak} jour${user.streak > 1 ? "s" : ""} ! 🔥`,
      `Continue comme ça ! ${user.streak} jour${user.streak > 1 ? "s" : ""} consécutif${user.streak > 1 ? "s" : ""}.`,
      "local_fire_department",
    );
    if (sent) {
      await sendPushToUser(userId, {
        title: `Série de ${user.streak} jour${user.streak > 1 ? "s" : ""} ! 🔥`,
        body: `Continue comme ça ! ${user.streak} jour${user.streak > 1 ? "s" : ""} consécutif${user.streak > 1 ? "s" : ""}.`,
        url: "/accueil-edukora",
        tag: "streak-daily",
      });
    }
  }
}