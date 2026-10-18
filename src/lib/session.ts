import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cache } from "react";
import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import {  queryOne, run, IS_PG } from "@/lib/db";
import { creditChallengeContribution } from "@/lib/defis";
import { updateStreakDaily } from "@/lib/streak";
import type { User } from "@/lib/types";

const COOKIE_NAME = "edukora_session";
const SESSION_DAYS = 30;
const TOKEN_VERSION = "v1";

// Sessions sans état : token signé HMAC vérifiable sur TOUTES les instances
// (Vercel : chaque fonction a sa propre base SQLite /tmp — une session stockée
// en base ne serait pas lisible par les pages rendues par d'autres instances).
// SESSION_SECRET est OBLIGATOIRE dans TOUS les environnements : sans lui, les
// sessions sont refusées (fail-closed). Plus aucun secret de démonstration
// codé en dur (P2.12.1 A2) — un secret connu partagé permettrait à quiconque
// de fabriquer un token valide pour n'importe quel compte.
function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  console.error(
    "[session] SESSION_SECRET non défini — toutes les sessions sont refusées par sécurité. Définissez SESSION_SECRET (longue chaîne aléatoire).",
  );
  return null;
}

function signSessionToken(payload: string): string {
  const secret = sessionSecret();
  if (!secret) throw new Error("SESSION_SECRET manquant");
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function signPayload(userId: number, exp: number, epoch: number): string {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp, epoch })).toString("base64url");
  return `${TOKEN_VERSION}.${payload}.${signSessionToken(payload)}`;
}

function verifySessionToken(token: string): { uid: number; exp: number; epoch: number } | null {
  const secret = sessionSecret();
  if (!secret) return null;
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== TOKEN_VERSION) return null;
  const [, payload, sig] = parts;
  const expected = signSessionToken(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      uid: number;
      exp: number;
      epoch?: number;
    };
    if (typeof data.uid !== "number" || typeof data.exp !== "number") return null;
    if (data.exp < Date.now()) return null;
    // P2.12.1 A3 — rétro-compat : un token sans `epoch` vaut 0 (avant A3).
    return { uid: data.uid, exp: data.exp, epoch: typeof data.epoch === "number" ? data.epoch : 0 };
  } catch {
    return null;
  }
}

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = verifySessionToken(token);
  if (!session) return null;

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const revoked = await queryOne<{ token_hash: string }>(
    "SELECT token_hash FROM revoked_sessions WHERE token_hash = ?",
    tokenHash,
  );
  if (revoked) return null;

  const user = await queryOne<User & { session_epoch: number | null }>(
    `SELECT id, role, email, phone, first_name, last_name, serie_id, class_level,
            xp, streak, referral_code, commune, gender, avatar_url, blocked, goal, session_epoch
     FROM users WHERE id = ?`,
    session.uid,
  );
  if (!user) return null;
  if (user.blocked) return null;
  // P2.12.1 A3 — un changement / reset de mot de passe incrémente l'epoch :
  // tout token émis avant est rejeté, même s'il n'est pas encore expiré.
  if ((user.session_epoch ?? 0) !== session.epoch) return null;
  return user;
});

export async function createSession(userId: number): Promise<string> {
  const row = await queryOne<{ session_epoch: number | null }>(
    "SELECT session_epoch FROM users WHERE id = ?",
    userId,
  );
  return signPayload(userId, Date.now() + SESSION_DAYS * 24 * 3600 * 1000, row?.session_epoch ?? 0);
}

/**
 * P2.12.1 A3 — invalide TOUTES les sessions d'un utilisateur en incrémentant
 * son epoch de session. À appeler uniquement APRÈS la réussite d'un
 * changement / réinitialisation de mot de passe. Les tokens HMAC encore
 * valides (30 j) portent l'ancien epoch et sont rejetés par getCurrentUser.
 */
export async function revokeUserSessions(userId: number): Promise<void> {
  await run("UPDATE users SET session_epoch = COALESCE(session_epoch, 0) + 1 WHERE id = ?", userId);
}

export async function destroySession(token?: string): Promise<void> {
  if (!token) return;
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const session = verifySessionToken(token);
  const userId = session?.uid ?? 0;
  const sql = IS_PG
    ? "INSERT INTO revoked_sessions (token_hash, user_id) VALUES ($1, $2) ON CONFLICT DO NOTHING"
    : "INSERT OR IGNORE INTO revoked_sessions (token_hash, user_id) VALUES (?, ?)";
  await run(sql, tokenHash, userId);
}

export async function cleanupRevokedSessions(): Promise<void> {
  await run(
    "DELETE FROM revoked_sessions WHERE revoked_at < datetime('now', '-30 days')",
  );
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 3600,
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function applyActivity(userId: number) {
  // P2.12.1 D2 — délègue à la source unique `updateStreakDaily` pour que le
  // bonus de milestone (3/7/14/30/60/100 jours) soit réellement accordé le
  // jour où le streak atteint le palier. Avant, cette fonction dupliquait la
  // logique de streak SANS jamais verser le bonus, alors que la table de
  // `BONUS_BY_MILESTONE` était présentée côté UI comme un gain garanti.
  const { streak } = await updateStreakDaily(userId);
  const xp = await queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (xp) await checkProgressionBadges(userId, streak, xp.xp);
}

export async function addXp(userId: number, amount: number) {
  await run("UPDATE users SET xp = xp + ? WHERE id = ?", amount, userId);
  const xp = await queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (xp) await checkProgressionBadges(userId, 0, xp.xp);
  await creditChallengeContribution(userId, amount);
}

export async function notify(userId: number, title: string, body: string, icon = "notifications", type?: string) {
  await run(
    "INSERT INTO notifications (user_id, title, body, icon, type) VALUES (?, ?, ?, ?, ?)",
    userId,
    title,
    body,
    icon,
    type ?? null,
  );
}

export async function awardBadge(userId: number, code: string): Promise<boolean >{
  const badge = await queryOne<{ id: number; name: string; icon: string; description: string }>(
    "SELECT id, name, icon, description FROM badges WHERE code = ?",
    code,
  );
  if (!badge) return false;
  const existing = await queryOne<{ user_id: number }>(
    "SELECT user_id FROM user_badges WHERE user_id = ? AND badge_id = ?",
    userId,
    badge.id,
  );
  if (existing) return false;
  await run("INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)", userId, badge.id);
  await notify(userId, "Badge gagné !", `Tu as débloqué « ${badge.name} » : ${badge.description}`, badge.icon);
  return true;
}

export async function checkProgressionBadges(userId: number, streak: number, xp: number) {
  if (streak >= 3) await awardBadge(userId, "streak_3");
  if (streak >= 7) await awardBadge(userId, "streak_7");
  if (xp >= 100) await awardBadge(userId, "xp_100");
  if (xp >= 500) await awardBadge(userId, "xp_500");
}
