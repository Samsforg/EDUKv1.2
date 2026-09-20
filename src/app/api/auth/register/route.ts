import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getDb, queryOne, run } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { createSession, setSessionCookie, notify, addXp } from "@/lib/session";
import { logAudit } from "@/lib/audit";
import { RegisterSchema, validate } from "@/lib/validation";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { resolveUserGradeIds } from "@/lib/level";
import { sendWelcomeEmail } from "@/lib/mailer";
import crypto from "crypto";

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("225")) return digits.slice(-10);
  return digits.slice(-10);
}

function sanitizeName(v: string): string {
  return v.replace(/<[^>]*>/g, "").trim();
}

async function POSTHandler(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = await rateLimit(`register:${ip}`, "register");
  if (!rl.allowed) return rateLimitResponse(rl.resetAt);

  const body = await req.json().catch(() => null);
  const v = validate(RegisterSchema, body);
  if (!v.ok) return NextResponse.json({ error: v.errors[0] }, { status: 400 });

  const { email, phone, password, first_name, last_name, referral_code, role, serie_id, gender, commune, class_level, grade, accept_privacy } = v.data;

  if (role === "parent") {
    return NextResponse.json({ error: "Veuillez utiliser la page d'inscription parent" }, { status: 400 });
  }
  if (role === "teacher") {
    return NextResponse.json({ error: "L'inscription enseignant nécessite une validation admin. Contactez le support." }, { status: 403 });
  }
  const db = getDb();

  const cleanFirstName = sanitizeName(first_name);
  const cleanLastName = sanitizeName(last_name);
  const phoneNorm = normalizePhone(phone);

  if (!accept_privacy) {
    return NextResponse.json(
      { error: "Vous devez accepter la politique de confidentialité pour créer un compte" },
      { status: 400 },
    );
  }

  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Le mot de passe doit contenir au moins 8 caractères" },
      { status: 400 },
    );
  }
  if (!cleanFirstName || !cleanLastName) {
    return NextResponse.json({ error: "Le prénom et le nom sont requis" }, { status: 400 });
  }
  if (!phoneNorm) {
    return NextResponse.json(
      { error: "Le numéro de téléphone est requis" },
      { status: 400 },
    );
  }

  let existing: { id: number } | undefined;
  if (email) existing = await queryOne<{ id: number }>("SELECT id FROM users WHERE email = ?", email);
  if (!existing) existing = await queryOne<{ id: number }>("SELECT id FROM users WHERE phone = ? OR phone_canonical = ?", phone, phoneNorm);
  if (existing) {
    return NextResponse.json(
      { error: "Un compte existe déjà avec cet email ou ce numéro" },
      { status: 409 },
    );
  }

  let referredBy: number | null = null;
  if (referral_code) {
    const referrer = await queryOne<{ id: number }>(
      "SELECT id FROM users WHERE referral_code = ?",
      referral_code.trim().toUpperCase(),
    );
    if (referrer) referredBy = referrer.id;
  }

  let storedClassLevel: string | null = class_level?.trim() || null;
  let storedSerieId: number | null = serie_id ?? null;

  if (!storedClassLevel && grade) {
    const g = grade.trim().toLowerCase().replace("ème", "eme").replace("è", "e");
    const collegeMap: Record<string, string> = { "6eme": "6eme", "5eme": "5eme", "4eme": "4eme", "3eme": "3eme" };
    const lyceeMap: Record<string, { class: string; serie: string | null }> = {
      "2nde": { class: "2nde", serie: null },
      "1ere_s": { class: "1ère", serie: "S" },
      "1ere_l": { class: "1ère", serie: "L" },
      "1ere_es": { class: "1ère", serie: "ES" },
      "term_s": { class: "Terminale", serie: "S" },
      "term_l": { class: "Terminale", serie: "L" },
      "term_es": { class: "Terminale", serie: "ES" },
    };
    if (collegeMap[g]) {
      storedClassLevel = collegeMap[g];
      storedSerieId = null;
    } else if (lyceeMap[g]) {
      storedClassLevel = lyceeMap[g].class;
      if (lyceeMap[g].serie) {
        const s = await queryOne<{ id: number }>("SELECT id FROM series WHERE code = ?", lyceeMap[g].serie);
        storedSerieId = s?.id ?? null;
      }
    }
  }

  const normalized = (storedClassLevel ?? "").toLowerCase();
  const isLycee = storedClassLevel !== null && ["terminale", "1ère", "2nde"].some((l) => normalized.includes(l));

  if (storedSerieId) {
    const serie = await queryOne<{ code: string; name: string }>(
      "SELECT code, name FROM series WHERE id = ?",
      storedSerieId,
    );
    if (!serie) {
      return NextResponse.json({ error: "Série inconnue" }, { status: 400 });
    }
    if (isLycee) {
      storedClassLevel = `${storedClassLevel} ${serie.code}`;
    } else if (!storedClassLevel) {
      storedClassLevel = `Terminale ${serie.code}`;
    } else {
      storedSerieId = null;
    }
  } else if (!storedClassLevel) {
    if (role === "student") {
      return NextResponse.json(
        { error: "Veuillez choisir votre classe ou votre niveau" },
        { status: 400 },
      );
    }
    storedClassLevel = null;
  }

  let insertResult: Awaited<ReturnType<typeof run>> | undefined;
  let lastErr: unknown;
  for (let attempt = 0; attempt < 5; attempt++) {
    const currentReferralCode = `EDK-${crypto.randomBytes(4).toString("hex").toUpperCase()}`;
    try {
      insertResult = await run(
        `INSERT INTO users (role, email, phone, phone_canonical, password_hash, first_name, last_name, class_level, serie_id, gender, commune, referral_code, referred_by, grade_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        role,
        email ?? null,
        phone ?? null,
        phoneNorm,
        hashPassword(password),
        cleanFirstName,
        cleanLastName,
        storedClassLevel,
        storedSerieId,
        gender ?? null,
        commune?.trim() || null,
        currentReferralCode,
        referredBy,
        (await resolveUserGradeIds(storedSerieId, storedClassLevel))?.[0] ?? null,
      );
      break;
    } catch (err: unknown) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("UNIQUE") && msg.includes("referral_code")) {
        continue;
      }
      throw err;
    }
  }
  if (!insertResult) {
    console.error("[register] referral code collision après 5 tentatives:", lastErr);
    return NextResponse.json({ error: "Erreur lors de la création du compte, réessayez." }, { status: 500 });
  }
  const userId = Number(insertResult.lastInsertRowid);

  await run(
    "INSERT INTO user_consents (user_id, type, ip, user_agent, created_at) VALUES (?, 'privacy_policy', ?, ?, datetime('now'))",
    userId,
    ip,
    req.headers.get("user-agent") ?? null,
  );

  if (referredBy) {
    await notify(
      referredBy,
      "Nouveau filleul !",
      `${cleanFirstName} ${cleanLastName} s'est inscrit(e) avec ton code de parrainage.`,
      "redeem",
    );
    await logAudit(referredBy, "inscription", `${cleanFirstName} ${cleanLastName} (#${userId}) inscrit via le code ${(referral_code ?? "").trim().toUpperCase()}`);

    // Récompense immédiate des deux côtés : pas besoin d'attendre un paiement.
    await addXp(referredBy, 150);
    await notify(
      referredBy,
      "+150 XP de parrainage !",
      `${cleanFirstName} ${cleanLastName} vient de s'inscrire avec ton code : +150 XP bonus.`,
      "redeem",
    );
    await addXp(userId, 50);
    await notify(
      userId,
      "+50 XP de bienvenue !",
      "Inscrit·e grâce à un code de parrainage : +50 XP bonus pour bien démarrer.",
      "redeem",
    );
  }

  // Email de bienvenue non bloquant
  if (email) void sendWelcomeEmail(userId).then((ok) => console.log(`[register] welcome ${ok ? "envoyé" : "échoué"} -> ${email}`)).catch(() => {});

  let token: string;
  try {
    token = await createSession(userId);
  } catch (err: unknown) {
    console.error("[register] création de session impossible:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Compte créé. Configuration serveur incomplète (SESSION_SECRET), connectez-vous plus tard." },
      { status: 503 },
    );
  }
  const res = NextResponse.json(
    { ok: true, user: { id: userId, first_name: cleanFirstName, last_name: cleanLastName, email, role } },
    { status: 201 },
  );
  setSessionCookie(res, token);
  return res;
}

export const POST = guardApi("POST /api/auth/register", POSTHandler);
