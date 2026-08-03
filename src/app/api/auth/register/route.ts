import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, run } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { createSession, setSessionCookie, notify } from "@/lib/session";
import { logAudit } from "@/lib/audit";
import { RegisterSchema, validate } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`register:${ip}`, "register");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const v = validate(RegisterSchema, body);
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const { email, phone, password, first_name, last_name, referral_code } = v.data;
  const db = getDb();

  if (!password || password.length < 6) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 6 caractères" },
      { status: 400 },
    );
  }
  if (!first_name || !last_name) {
    return NextResponse.json({ error: "Le prénom et le nom sont requis" }, { status: 400 });
  }
  if (!email && !phone) {
    return NextResponse.json(
      { error: "Un email ou un numéro de téléphone est requis" },
      { status: 400 },
    );
  }

  const existing = queryOne<{ id: number }>(
    "SELECT id FROM users WHERE (email = ? AND ? IS NOT NULL) OR (phone = ? AND ? IS NOT NULL)",
    email ?? null,
    email ?? null,
    phone ?? null,
    phone ?? null,
  );
  if (existing) {
    return NextResponse.json(
      { error: "Un compte existe déjà avec cet email ou ce numéro" },
      { status: 409 },
    );
  }

  const referralCode = `EDK-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  const finalRole = "student";

  let referredBy: number | null = null;
  if (referral_code) {
    const referrer = queryOne<{ id: number }>(
      "SELECT id FROM users WHERE referral_code = ?",
      referral_code.trim().toUpperCase(),
    );
    if (referrer) referredBy = referrer.id;
  }

  const result = run(
    `INSERT INTO users (role, email, phone, password_hash, first_name, last_name, class_level, referral_code, referred_by)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    finalRole,
    email ?? null,
    phone ?? null,
    hashPassword(password),
    first_name,
    last_name,
    "Terminale",
    referralCode,
    referredBy,
  );
  const userId = Number(result.lastInsertRowid);

  if (referredBy) {
    notify(
      referredBy,
      "Nouveau filleul !",
      `${first_name} ${last_name} s'est inscrit(e) avec ton code de parrainage.`,
      "redeem",
    );
    logAudit(referredBy, "inscription", `${first_name} ${last_name} (#${userId}) inscrit via le code ${(referral_code ?? "").trim().toUpperCase()}`);
  }

  const token = await createSession(userId);
  const res = NextResponse.json(
    { ok: true, user: { id: userId, first_name, last_name, email, role: finalRole } },
    { status: 201 },
  );
  setSessionCookie(res, token);
  return res;
}
