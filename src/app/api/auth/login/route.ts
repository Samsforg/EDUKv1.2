import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { createSession, setSessionCookie } from "@/lib/session";
import { LoginSchema, validate } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`login:${ip}`, "login");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const v = validate(LoginSchema, body);
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const { identifier, password } = v.data;
  const db = getDb();

  const user = queryOne<{
    id: number;
    password_hash: string;
    role: string;
    first_name: string;
    last_name: string;
    email: string | null;
  }>(
    "SELECT id, password_hash, role, first_name, last_name, email FROM users WHERE email = ? OR phone = ?",
    identifier,
    identifier,
  );
  if (!user || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json(
      { error: "Identifiant ou mot de passe incorrect" },
      { status: 401 },
    );
  }
  const blocked = queryOne<{ blocked: number }>("SELECT blocked FROM users WHERE id = ?", user.id);
  if (blocked && blocked.blocked) {
    return NextResponse.json(
      { error: "Votre compte est bloqué. Contactez le support Edukora." },
      { status: 403 },
    );
  }

  let token: string;
  try {
    token = await createSession(user.id);
  } catch (err: any) {
    console.error("[login] création de session impossible:", err.message);
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
