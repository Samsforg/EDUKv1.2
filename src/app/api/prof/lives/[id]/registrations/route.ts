import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { query, queryOne, run } from "@/lib/db";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const sessionId = Number(id);

  // Verify ownership
  const owned = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_sessions WHERE id = ? AND created_by = ?",
    sessionId,
    user.id
  );
  if (!owned || owned.c === 0)
    return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });

  const registrations = query<{ 
    user_id: number; 
    first_name: string; 
    last_name: string; 
    email: string;
    created_at: string;
  }>(
    `SELECT r.user_id, u.first_name, u.last_name, u.email, r.created_at
     FROM live_registrations r
     JOIN users u ON u.id = r.user_id
     WHERE r.session_id = ?
     ORDER BY r.created_at ASC`,
    sessionId
  );

  return NextResponse.json({ registrations });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const sessionId = Number(id);
  const body = await req.json().catch(() => null);
  const targetUserId = Number(body?.user_id);
  if (!Number.isInteger(targetUserId) || targetUserId <= 0)
    return NextResponse.json({ error: "Utilisateur invalide" }, { status: 400 });

  // Verify ownership
  const owned = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_sessions WHERE id = ? AND created_by = ?",
    sessionId,
    user.id
  );
  if (!owned || owned.c === 0)
    return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });

  // Check if already registered
  const exists = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_registrations WHERE session_id = ? AND user_id = ?",
    sessionId,
    targetUserId
  );
  if (exists && exists.c > 0)
    return NextResponse.json({ error: "Déjà inscrit" }, { status: 400 });

  run(
    "INSERT INTO live_registrations (session_id, user_id) VALUES (?, ?)",
    sessionId,
    targetUserId
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const sessionId = Number(id);
  const body = await req.json().catch(() => null);
  const targetUserId = Number(body?.user_id);
  if (!Number.isInteger(targetUserId) || targetUserId <= 0)
    return NextResponse.json({ error: "Utilisateur invalide" }, { status: 400 });

  // Verify ownership
  const owned = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM live_sessions WHERE id = ? AND created_by = ?",
    sessionId,
    user.id
  );
  if (!owned || owned.c === 0)
    return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });

  run(
    "DELETE FROM live_registrations WHERE session_id = ? AND user_id = ?",
    sessionId,
    targetUserId
  );

  return NextResponse.json({ ok: true });
}