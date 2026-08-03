import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { isChildLinked, linkChild } from "@/lib/parents";
import { queryOne } from "@/lib/db";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const raw = (body?.code ?? "").toString().trim().toUpperCase();
  if (!/^[A-Z0-9]{6}$/.test(raw)) {
    return NextResponse.json({ error: "Code invalide : 6 caractères attendus" }, { status: 400 });
  }

  const pc = queryOne<{ user_id: number; expires_at: string | null }>(
    "SELECT user_id, expires_at FROM pairing_codes WHERE code = ?",
    raw,
  );
  if (!pc) {
    return NextResponse.json({ error: "Aucun élève ne correspond à ce code" }, { status: 404 });
  }
  if (pc.expires_at && new Date(pc.expires_at) < new Date()) {
    return NextResponse.json({ error: "Ce code a expiré" }, { status: 400 });
  }

  const child = queryOne<{ id: number; first_name: string; last_name: string; class_level: string | null }>(
    "SELECT id, first_name, last_name, class_level FROM users WHERE id = ? AND role = 'student'",
    pc.user_id,
  );
  if (!child) {
    return NextResponse.json({ error: "Ce code ne correspond pas à un élève" }, { status: 400 });
  }
  if (isChildLinked(user.id, child.id)) {
    return NextResponse.json({ error: "Cet élève est déjà lié à votre compte" }, { status: 400 });
  }

  linkChild(user.id, child.id);
  return NextResponse.json({ ok: true, child });
}
