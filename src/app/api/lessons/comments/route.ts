import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { query, run } from "@/lib/db";

async function GETHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const lessonId = Number(req.nextUrl.searchParams.get("lesson_id"));
  if (!lessonId) return NextResponse.json({ error: "lesson_id requis" }, { status: 400 });

  const comments = await query<{
    id: number;
    user_id: number;
    lesson_id: number;
    content: string;
    parent_id: number | null;
    is_resolved: number;
    created_at: string;
    author_name: string;
    author_role: string;
  }>(
    `SELECT c.*, u.first_name || ' ' || u.last_name AS author_name, u.role AS author_role
     FROM lesson_comments c
     JOIN users u ON u.id = c.user_id
     WHERE c.lesson_id = ?
     ORDER BY c.parent_id NULLS FIRST, c.created_at ASC`,
    lessonId,
  );

  return NextResponse.json({ comments });
}

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body?.lesson_id || !body?.content?.trim()) {
    return NextResponse.json({ error: "lesson_id et content requis" }, { status: 400 });
  }

  const content = body.content.trim().slice(0, 2000);
  const parentId = body.parent_id ? Number(body.parent_id) : null;

  const result = await run(
    "INSERT INTO lesson_comments (user_id, lesson_id, content, parent_id) VALUES (?, ?, ?, ?)",
    user.id,
    Number(body.lesson_id),
    content,
    parentId,
  );

  return NextResponse.json({ ok: true, id: Number(result.lastInsertRowid) });
}

export const GET = guardApi("GET /api/lessons/comments", GETHandler);
export const POST = guardApi("POST /api/lessons/comments", POSTHandler);
