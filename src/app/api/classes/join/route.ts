import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || !body.code) return NextResponse.json({ error: "Code d'invitation requis" }, { status: 400 });

  const code = String(body.code).trim().toUpperCase();
  const cls = await queryOne<{ id: number }>(
    "SELECT id FROM classes WHERE UPPER(invite_code) = ?",
    code,
  );
  if (!cls) return NextResponse.json({ error: "Code d'invitation invalide" }, { status: 404 });

  const existing = await queryOne<{ user_id: number }>(
    "SELECT user_id FROM class_students WHERE class_id = ? AND user_id = ?",
    cls.id,
    user.id,
  );
  if (existing) return NextResponse.json({ error: "Tu es déjà dans cette classe" }, { status: 400 });

  await run("INSERT INTO class_students (class_id, user_id) VALUES (?, ?)", cls.id, user.id);
  return NextResponse.json({ ok: true, class_id: cls.id }, { status: 201 });
}

export const POST = guardApi("POST /api/classes/join", POSTHandler);