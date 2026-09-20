import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, run } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { createSession, setSessionCookie } from "@/lib/session";
import { LoginSchema, validate } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_MINUTES = 15;

async function POSTHandler(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`login:${ip}`, "login");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const v = validate(LoginSchema, body);
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const { identifier, password } = v.data;
  const db = getDb();

  const user = await queryOne<{
    id: number;
    password_hash: string;
    role: string;
    first_name: string;
    last_name: string;
    email: string | null;
    failed_login_count: number | null;
    locked_until: string | null;
  }>(
    "SELECT id, password_hash, role, first_name, last_name, email, failed_login_count, locked_until FROM users WHERE email = ? OR phone = ?",
    identifier,
    identifier,
  );

  if (!user) {
    return NextResponse.json(
      { error: "Identifiant ou mot de passe incorrect" },
      { status: 401 },
    );
  }

  // Vérifier le lockout du compte
  if (user.locked_until) {
    const lockDate = new Date(user.locked_until);
    if (lockDate > new Date()) {
      const remaining = Math.ceil((lockDate.getTime() - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Compte temporairement bloqué. Réessayez dans ${remaining} minute(s).` },
        { status: 423 },
      );
    }
    // Lockout expiré, réinitialiser le compteur
    await run("UPDATE users SET failed_login_count = 0, locked_until = NULL WHERE id = ?", user.id);
  }

  if (!verifyPassword(password, user.password_hash)) {
    const newCount = (user.failed_login_count ?? 0) + 1;
    const updates: string[] = ["failed_login_count = ?"];
    const params: (string | number)[] = [newCount];

    if (newCount >= MAX_FAILED_ATTEMPTS) {
      const lockUntil = new Date(Date.now() + LOCKOUT_MINUTES * 60000).toISOString();
      updates.push("locked_until = ?");
      params.push(lockUntil);
    }
    params.push(user.id);

    await run(`UPDATE users SET ${updates.join(", ")} WHERE id = ?`, ...params);

    if (newCount >= MAX_FAILED_ATTEMPTS) {
      return NextResponse.json(
        { error: `Trop de tentatives. Compte bloqué pendant ${LOCKOUT_MINUTES} minutes.` },
        { status: 423 },
      );
    }

    return NextResponse.json(
      { error: "Identifiant ou mot de passe incorrect" },
      { status: 401 },
    );
  }

  // Connexion réussie : réinitialiser le compteur
  await run("UPDATE users SET failed_login_count = 0, locked_until = NULL WHERE id = ?", user.id);

  const blocked = await queryOne<{ blocked: number }>("SELECT blocked FROM users WHERE id = ?", user.id);
  if (blocked && blocked.blocked) {
    return NextResponse.json(
      { error: "Votre compte est bloqué. Contactez le support Edukora." },
      { status: 403 },
    );
  }

  let token: string;
  try {
    token = await createSession(user.id);
  } catch (err: unknown) {
    console.error("[login] création de session impossible:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Configuration serveur incomplète (SESSION_SECRET). Contactez l'administrateur." },
      { status: 503 },
    );
  }
  const res = NextResponse.json({
    ok: true,
    user: { id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role },
  });
  setSessionCookie(res, token);
  return res;
}

export const POST = guardApi("POST /api/auth/login", POSTHandler);
