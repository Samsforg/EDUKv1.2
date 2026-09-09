import { queryOne } from "./db";

export const KORA_DAILY_LIMIT = 5;
export const KORA_MONTHLY_LIMIT = 30;
export const KORA_QUARTERLY_LIMIT = 100;
export const KORA_DECOUVERTE_LIMIT = 5;
export const FICHE_MONTHLY_LIMIT = 10;
export const SIMULATEUR_DECOUVERTE_LIMIT = 1;
export const DISSERTATION_DECOUVERTE_LIMIT = 1;
export const DISSERTATION_MONTHLY_LIMIT = 5;
export const DISSERTATION_QUARTERLY_LIMIT = 15;

export interface QuotaInfo {
  used: number;
  limit: number | null;
  isPremium: boolean;
  planName: string | null;
  windowLabel?: string | null;
}

interface ActiveSubscription {
  name: string;
  interval: string;
  startedAt: string | null;
}

const PLAN_QUOTA_INTERVALS: Record<string, { limit: number; label: string }> = {
  month: { limit: KORA_MONTHLY_LIMIT, label: "ce mois-ci" },
  quarter: { limit: KORA_QUARTERLY_LIMIT, label: "ce trimestre" },
};

async function getActiveSubscription(userId: number): Promise<ActiveSubscription | null> {
  const row = await queryOne<{ name: string; interval: string; started_at: string | null }>(
    `SELECT p.name, p.interval, s.started_at
     FROM subscriptions s JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.user_id = ? AND s.status IN ('active','trial') AND (s.end_at IS NULL OR s.end_at > ?)
     ORDER BY s.id DESC LIMIT 1`,
    userId,
    new Date().toISOString(),
  );
  if (!row) return null;
  return { name: row.name, interval: row.interval, startedAt: row.started_at };
}

/** True si l'utilisateur a un abonnement premium actif OU un essai gratuit en cours. */
export async function isPremiumUser(userId: number): Promise<boolean> {
  return !!(await getActiveSubscription(userId));
}

async function countUserMessagesSince(userId: number, sinceIso: string): Promise<number> {
  return Number(
    (await queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM tutor_messages WHERE user_id = ? AND role = 'user' AND created_at >= ?",
      userId,
      sinceIso,
    ))?.c ?? 0,
  );
}

function billingPeriodStart(startedAtIso: string, interval: string): string {
  const start = new Date(startedAtIso);
  const now = new Date();
  if (isNaN(start.getTime()) || start > now) return start.toISOString();
  const step = interval === "quarter" ? 3 : 1;
  const monthsElapsed =
    (now.getUTCFullYear() - start.getUTCFullYear()) * 12 + (now.getUTCMonth() - start.getUTCMonth());
  const periodIndex = Math.floor(monthsElapsed / step);
  start.setUTCMonth(start.getUTCMonth() + periodIndex * step);
  return start.toISOString();
}

export async function getSubscriptionStatus(userId: number): Promise<QuotaInfo> {
  const sub = await getActiveSubscription(userId);
  return {
    used: 0,
    limit: null,
    isPremium: !!sub,
    planName: sub?.name ?? null,
  };
}

export async function getKoraQuota(userId: number): Promise<QuotaInfo> {
  const sub = await getActiveSubscription(userId);
  if (!sub) {
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
    return {
      used: await countUserMessagesSince(userId, monthStart),
      limit: KORA_DECOUVERTE_LIMIT,
      isPremium: false,
      planName: null,
      windowLabel: "ce mois-ci",
    };
  }
  const quota = PLAN_QUOTA_INTERVALS[sub.interval];
  if (!quota) {
    return { used: 0, limit: null, isPremium: true, planName: sub.name, windowLabel: null };
  }
  const startedAt = sub.startedAt ?? new Date().toISOString();
  const used = await countUserMessagesSince(userId, billingPeriodStart(startedAt, sub.interval));
  return {
    used,
    limit: quota.limit,
    isPremium: true,
    planName: sub.name,
    windowLabel: quota.label,
  };
}

export async function getFicheQuota(userId: number): Promise<QuotaInfo> {
  const sub = await getActiveSubscription(userId);
  if (sub) {
    return { used: 0, limit: null, isPremium: true, planName: sub.name };
  }
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const used =
    Number(
      (await queryOne<{ c: number }>(
        "SELECT COUNT(*) AS c FROM lesson_reads WHERE user_id = ? AND read_at >= ?",
        userId,
        monthStart,
      ))?.c ?? 0,
    );
  return { used, limit: FICHE_MONTHLY_LIMIT, isPremium: false, planName: null, windowLabel: "ce mois-ci" };
}

export async function getSimulateurQuota(userId: number): Promise<QuotaInfo> {
  const sub = await getActiveSubscription(userId);
  if (sub) {
    return { used: 0, limit: null, isPremium: true, planName: sub.name };
  }
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
  const used =
    Number(
      (await queryOne<{ c: number }>(
        "SELECT COUNT(*) AS c FROM exam_attempts WHERE user_id = ? AND created_at >= ?",
        userId,
        monthStart,
      ))?.c ?? 0,
    );
  return { used, limit: SIMULATEUR_DECOUVERTE_LIMIT, isPremium: false, planName: null, windowLabel: "ce mois-ci" };
}

async function countDissertationsSince(userId: number, sinceIso: string): Promise<number> {
  return Number(
    (await queryOne<{ c: number }>(
      "SELECT COUNT(*) AS c FROM dissertation_corrections WHERE user_id = ? AND created_at >= ?",
      userId,
      sinceIso,
    ))?.c ?? 0,
  );
}

const DISSERTATION_PLAN_LIMITS: Record<string, { limit: number; label: string }> = {
  month: { limit: DISSERTATION_MONTHLY_LIMIT, label: "ce mois-ci" },
  quarter: { limit: DISSERTATION_QUARTERLY_LIMIT, label: "ce trimestre" },
};

export async function getDissertationQuota(userId: number): Promise<QuotaInfo> {
  const sub = await getActiveSubscription(userId);
  if (!sub) {
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
    return {
      used: await countDissertationsSince(userId, monthStart),
      limit: DISSERTATION_DECOUVERTE_LIMIT,
      isPremium: false,
      planName: null,
      windowLabel: "ce mois-ci",
    };
  }
  const quota = DISSERTATION_PLAN_LIMITS[sub.interval];
  if (!quota) {
    return { used: 0, limit: null, isPremium: true, planName: sub.name, windowLabel: null };
  }
  const startedAt = sub.startedAt ?? new Date().toISOString();
  const used = await countDissertationsSince(userId, billingPeriodStart(startedAt, sub.interval));
  return {
    used,
    limit: quota.limit,
    isPremium: true,
    planName: sub.name,
    windowLabel: quota.label,
  };
}