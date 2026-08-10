import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, run } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

function requireTeacher(user: { role: string } | null): NextResponse | null {
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "teacher") return NextResponse.json({ error: "Réservé aux professeurs" }, { status: 403 });
  return null;
}

function makeInviteCode(): string {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

interface ClsRow {
  id: number;
  teacher_id: number;
  name: string;
  invite_code: string;
  year: string | null;
  subject_id: number | null;
  grade_id: number | null;
  subject_name: string | null;
  icon: string | null;
  color: string | null;
  grade_name: string | null;
}

interface MemberRow {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  class_level: string | null;
  joined_at: string;
}

interface StudentStats {
  user_id: number;
  attempts: number;
  avg_pct: number | null;
  best_pct: number | null;
  lessons_read: number;
}

async function GETHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const cls = await queryOne<ClsRow>(
    `SELECT c.id, c.teacher_id, c.name, c.invite_code, c.year, c.subject_id, c.grade_id,
            s.name AS subject_name, s.icon, s.color, g.name AS grade_name
     FROM classes c
     LEFT JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.id = ?`,
    Number(id),
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  const members = await query<MemberRow>(
    `SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.class_level, cs.joined_at
     FROM class_students cs JOIN users u ON u.id = cs.user_id
     WHERE cs.class_id = ?
     ORDER BY cs.joined_at DESC`,
    Number(id),
  );

  const memberIds = members.map((m) => m.user_id);
  let stats: StudentStats[] = [];
  if (memberIds.length > 0) {
    const placeholders = memberIds.map(() => "?").join(",");
    stats = await query<StudentStats>(
      `SELECT a.user_id,
              COUNT(*) AS attempts,
              ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct,
              MAX(ROUND(a.score * 100.0 / a.max_score)) AS best_pct,
              0 AS lessons_read
       FROM quiz_attempts a
       WHERE a.user_id IN (${placeholders})
       GROUP BY a.user_id`,
      ...memberIds,
    );
  }

  const byUser = new Map(stats.map((s) => [s.user_id, s]));

  return NextResponse.json({
    cls: {
      id: cls.id,
      name: cls.name,
      invite_code: cls.invite_code,
      year: cls.year,
      subject_name: cls.subject_name,
      icon: cls.icon,
      color: cls.color,
      grade_name: cls.grade_name,
    },
    students: members.map((m) => {
      const s = byUser.get(m.user_id);
      return { ...m, attempts: s?.attempts ?? 0, avg_pct: s?.avg_pct ?? null, best_pct: s?.best_pct ?? null };
    }),
  });
}

export const GET = guardApi("GET /api/prof/classes/[id]", GETHandler);

async function PATCHHandler(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Corps de requête invalide" }, { status: 400 });

  const cls = await queryOne<{ id: number; teacher_id: number }>(
    "SELECT id, teacher_id FROM classes WHERE id = ?",
    Number(id),
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  if (body.name !== undefined) {
    if (!body.name || !String(body.name).trim()) {
      return NextResponse.json({ error: "Le nom de la classe est requis" }, { status: 400 });
    }
    await run("UPDATE classes SET name = ? WHERE id = ?", String(body.name).trim(), cls.id);
  }
  if (body.year !== undefined) {
    await run("UPDATE classes SET year = ? WHERE id = ?", body.year?.toString().trim() || null, cls.id);
  }
  if (body.new_invite === true) {
    let code = makeInviteCode();
    let attempts = 0;
    while (attempts < 5) {
      const existing = await queryOne<{ id: number }>("SELECT id FROM classes WHERE invite_code = ?", code);
      if (!existing) break;
      code = makeInviteCode();
      attempts++;
    }
    await run("UPDATE classes SET invite_code = ? WHERE id = ?", code, cls.id);
    return NextResponse.json({ ok: true, invite_code: code });
  }

  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/prof/classes/[id]", PATCHHandler);

async function DELETEHandler(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  const forbidden = requireTeacher(user);
  if (forbidden) return forbidden;

  const { id } = await params;
  const cls = await queryOne<{ id: number; teacher_id: number }>(
    "SELECT id, teacher_id FROM classes WHERE id = ?",
    Number(id),
  );
  if (!cls) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  if (cls.teacher_id !== user!.id) return NextResponse.json({ error: "Pas ta classe" }, { status: 403 });

  await run("DELETE FROM classes WHERE id = ?", cls.id);
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/prof/classes/[id]", DELETEHandler);