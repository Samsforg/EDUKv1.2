import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-guard";
import { query, queryOne, run } from "@/lib/db";
import { testUsersWhere } from "@/lib/test-users";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const count = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM users u WHERE ${testUsersWhere("u")}`,
  );

  return NextResponse.json({ count: count?.c ?? 0 });
}

async function DELETEHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const testEmails = await query<{ id: number; email: string }>(
    `SELECT id, email FROM users u WHERE ${testUsersWhere("u")}`,
  );

  if (testEmails.length === 0) {
    return NextResponse.json({ deleted: 0, message: "Aucun compte de test trouvé." });
  }

  const ids = testEmails.map((u) => u.id);

  const placeholders = ids.map(() => "?").join(",");

  const relatedTables = [
    "quiz_attempts",
    "exam_attempts",
    "forum_posts",
    "forum_replies",
    "forum_votes",
    "notifications",
    "analytics_events",
    "saved_lessons",
    "lesson_reads",
    "user_badges",
    "growth_strategies",
    "growth_contents",
    "growth_recommendations",
    "referrals",
  ];

  for (const table of relatedTables) {
    await run(`DELETE FROM ${table} WHERE user_id IN (${placeholders})`, ...ids).catch(() => {});
  }

  await run(`DELETE FROM revoked_sessions WHERE user_id IN (${placeholders})`, ...ids).catch(() => {});

  await run(`DELETE FROM users WHERE id IN (${placeholders})`, ...ids);

  return NextResponse.json({ deleted: testEmails.length, emails: testEmails.map((u) => u.email) });
}

export const GET = guardApi("GET /api/admin/test-accounts", GETHandler);
export const DELETE = guardApi("DELETE /api/admin/test-accounts", DELETEHandler);
