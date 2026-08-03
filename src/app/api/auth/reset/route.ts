import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, run } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const db = getDb();
  const body = await req.json().catch(() => null);
  const { token, password } = body ?? {};

  if (!token || !password || password.length < 6) {
    return NextResponse.json(
      { error: "Jeton invalide ou mot de passe trop court (6 caractères minimum)" },
      { status: 400 },
    );
  }

  const reset = queryOne<{ user_id: number; expires_at: string }>(
    "SELECT user_id, expires_at FROM password_resets WHERE token = ?",
    token,
  );
  if (!reset) {
    return NextResponse.json({ error: "Lien de réinitialisation invalide" }, { status: 400 });
  }
  if (new Date(reset.expires_at) < new Date()) {
    run("DELETE FROM password_resets WHERE token = ?", token);
    return NextResponse.json({ error: "Ce lien a expiré. Demandez-en un nouveau." }, { status: 410 });
  }

  run("UPDATE users SET password_hash = ? WHERE id = ?", hashPassword(password), reset.user_id);
  run("DELETE FROM password_resets WHERE token = ?", token);
  // Invalide toutes les sessions existantes pour sécurité
  run("DELETE FROM sessions WHERE user_id = ?", reset.user_id);

  return NextResponse.json({ ok: true });
}
