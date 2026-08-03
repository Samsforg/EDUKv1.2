import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, run } from "@/lib/db";
import { generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const db = getDb();
  const body = await req.json().catch(() => null);
  const email = body?.email?.trim().toLowerCase();
  if (!email) {
    return NextResponse.json({ error: "Adresse e-mail requise" }, { status: 400 });
  }

  const user = queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  if (!user) {
    // Ne pas révéler l'existence du compte
    return NextResponse.json({ ok: true, reset_link: null });
  }

  const token = generateToken();
  const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  run(
    "INSERT INTO password_resets (token, user_id, expires_at) VALUES (?, ?, ?)",
    token,
    user.id,
    expires,
  );

  const baseUrl = process.env.NODE_ENV === "production" ? "https://edukora.app" : `http://localhost:3001`;
  return NextResponse.json({
    ok: true,
    // En dev, on renvoie le lien directement (pas d'infrastructure e-mail).
    reset_link: `${baseUrl}/reinitialiser-mot-de-passe?token=${token}`,
  });
}
