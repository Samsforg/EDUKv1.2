import { queryOne, run } from "../db";

const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

export function getAIMaxPerMinute(): number {
  const v = Number(process.env.AI_MAX_REQUESTS_PER_MINUTE);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 10;
}

export function getAIMaxDaily(): number {
  const v = Number(process.env.AI_MAX_DAILY_REQUESTS);
  return Number.isFinite(v) && v > 0 ? Math.floor(v) : 100;
}

export interface AIRateLimitResult {
  allowed: boolean;
  remainingMinute: number;
  remainingDaily: number;
  resetAtMinute: number;
  resetAtDaily: number;
}

async function bumpWindow(key: string, max: number, windowMs: number, now: number) {
  const row = await queryOne<{ count: number; reset_at: number }>(
    "SELECT count, reset_at FROM rate_limits WHERE key = ?",
    key,
  );
  if (!row || now > row.reset_at) {
    await run(
      "INSERT INTO rate_limits (key, count, reset_at) VALUES (?, 1, ?) ON CONFLICT(key) DO UPDATE SET count = 1, reset_at = ?",
      key,
      now + windowMs,
      now + windowMs,
    );
    return { count: 1, resetAt: now + windowMs, remaining: max - 1 };
  }
  const nextCount = row.count + 1;
  await run("UPDATE rate_limits SET count = ? WHERE key = ?", nextCount, key);
  return { count: nextCount, resetAt: row.reset_at, remaining: Math.max(0, max - nextCount) };
}

export async function checkAIRateLimit(subject: string): Promise<AIRateLimitResult> {
  const maxMin = getAIMaxPerMinute();
  const maxDay = getAIMaxDaily();
  const now = Date.now();
  try {
    const [minute, daily] = await Promise.all([
      bumpWindow(`ai:min:${subject}`, maxMin, MINUTE_MS, now),
      bumpWindow(`ai:day:${subject}`, maxDay, DAY_MS, now),
    ]);
    return {
      allowed: minute.count <= maxMin && daily.count <= maxDay,
      remainingMinute: minute.remaining,
      remainingDaily: daily.remaining,
      resetAtMinute: minute.resetAt,
      resetAtDaily: daily.resetAt,
    };
  } catch (err) {
    console.error("[ai-rate-limit] erreur (requête autorisée):", err);
    return {
      allowed: true,
      remainingMinute: maxMin,
      remainingDaily: maxDay,
      resetAtMinute: now + MINUTE_MS,
      resetAtDaily: now + DAY_MS,
    };
  }
}
