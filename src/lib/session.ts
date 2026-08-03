import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { getDb, queryOne, run } from "@/lib/db";
import { creditChallengeContribution } from "@/lib/defis";
import type { User } from "@/lib/types";

const COOKIE_NAME = "edukora_session";
const SESSION_DAYS = 30;
const TOKEN_VERSION = "v1";

// Sessions sans état : token signé HMAC vérifiable sur TOUTES les instances
// (Vercel : chaque fonction a sa propre base SQLite /tmp — une session stockée
// en base ne serait pas lisible par les pages rendues par d'autres instances).
// Définir SESSION_SECRET en variable d'environnement en production.
function sessionSecret(): string {
  return process.env.SESSION_SECRET || "edukora-session-secret-v1-demo";
}

function signSessionToken(payload: string): string {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function signPayload(userId: number, exp: number): string {
  const payload = Buffer.from(JSON.stringify({ uid: userId, exp })).toString("base64url");
  return `${TOKEN_VERSION}.${payload}.${signSessionToken(payload)}`;
}

function verifySessionToken(token: string): { uid: number; exp: number } | null {
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
    };
    if (typeof data.uid !== "number" || typeof data.exp !== "number") return null;
    if (data.exp < Date.now()) return null;
    return data;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return null;
  const session = verifySessionToken(token);
  if (!session) return null;
  const user = queryOne<User>(
    `SELECT id, role, email, phone, first_name, last_name, serie_id, class_level,
            xp, streak, referral_code, commune, blocked
     FROM users WHERE id = ?`,
    session.uid,
  );
  if (!user) return null;
  if (user.blocked) return null;
  return user;
}

export async function createSession(userId: number): Promise<string> {
  return signPayload(userId, Date.now() + SESSION_DAYS * 24 * 3600 * 1000);
}

export async function destroySession(): Promise<void> {
  // Token sans état : aucune révocation en base nécessaire.
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
  });
}

export function applyActivity(userId: number) {
  const today = new Date().toISOString().slice(0, 10);
  const user = queryOne<{ last_active: string | null; streak: number }>(
    "SELECT last_active, streak FROM users WHERE id = ?",
    userId,
  );
  if (!user) return;
  const last = user.last_active ? user.last_active.slice(0, 10) : null;
  let streak = user.streak;
  if (last === today) {
    // déjà actif aujourd'hui
  } else if (last) {
    const yesterday = new Date(Date.now() - 24 * 3600 * 1000).toISOString().slice(0, 10);
    streak = last === yesterday ? streak + 1 : 1;
  } else {
    streak = 1;
  }
  run("UPDATE users SET last_active = ?, streak = ? WHERE id = ?", today, streak, userId);
  const xp = queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (xp) checkProgressionBadges(userId, streak, xp.xp);
}

export function addXp(userId: number, amount: number) {
  run("UPDATE users SET xp = xp + ? WHERE id = ?", amount, userId);
  const xp = queryOne<{ xp: number }>("SELECT xp FROM users WHERE id = ?", userId);
  if (xp) checkProgressionBadges(userId, 0, xp.xp);
  creditChallengeContribution(userId, amount);
}

export function notify(userId: number, title: string, body: string, icon = "notifications") {
  run("INSERT INTO notifications (user_id, title, body, icon) VALUES (?, ?, ?, ?)", userId, title, body, icon);
}

export function awardBadge(userId: number, code: string): boolean {
  const badge = queryOne<{ id: number; name: string; icon: string; description: string }>(
    "SELECT id, name, icon, description FROM badges WHERE code = ?",
    code,
  );
  if (!badge) return false;
  const existing = queryOne<{ user_id: number }>(
    "SELECT user_id FROM user_badges WHERE user_id = ? AND badge_id = ?",
    userId,
    badge.id,
  );
  if (existing) return false;
  run("INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)", userId, badge.id);
  notify(userId, "Badge gagné !", `Tu as débloqué « ${badge.name} » : ${badge.description}`, badge.icon);
  return true;
}

export function checkProgressionBadges(userId: number, streak: number, xp: number) {
  if (streak >= 3) awardBadge(userId, "streak_3");
  if (streak >= 7) awardBadge(userId, "streak_7");
  if (xp >= 100) awardBadge(userId, "xp_100");
  if (xp >= 500) awardBadge(userId, "xp_500");
}
