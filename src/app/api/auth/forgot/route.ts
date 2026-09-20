import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, run } from "@/lib/db";
import { generateToken } from "@/lib/auth";
import { sendMail, resetPasswordHtml } from "@/lib/mailer";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

async function POSTHandler(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`forgot:${ip}`, "login");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const db = getDb();
  const body = await req.json().catch(() => null);
  const email = body?.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Adresse e-mail requise" }, { status: 400 });
  }

  const user = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  if (!user) {
    // Ne pas révéler l'existence du compte
    return NextResponse.json({ ok: true });
  }

  const token = generateToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  await run(
    "INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)",
    token,
    user.id,
    expires,
  );

  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"
      : `http://localhost:${process.env.PORT || 3001}`;
  const resetUrl = `${baseUrl}/reinitialiser-mot-de-passe?token=${token}`;
  const sent = await sendMail({
    to: email,
    subject: "Réinitialisation de votre mot de passe EduKora",
    html: resetPasswordHtml(resetUrl),
  });
  // Ne jamais renvoyer reset_link en réponse (fuite de token)
  return NextResponse.json({ ok: true });
}

export const POST = guardApi("POST /api/auth/forgot", POSTHandler);
