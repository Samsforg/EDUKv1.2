import { NextRequest, NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const limit = Math.min(50, Math.max(1, Number(new URL(req.url).searchParams.get("limit")) || 20));

  const rows = query<{
    id: number;
    first_name: string;
    last_name: string;
    xp: number;
    streak: number;
    class_level: string | null;
    serie: string | null;
  }>(
    `SELECT u.id, u.first_name, u.last_name, u.xp, u.streak, u.class_level, s.name AS serie
     FROM users u LEFT JOIN series s ON s.id = u.serie_id
     WHERE u.role = 'student'
     ORDER BY u.xp DESC, u.last_active DESC, u.id ASC
     LIMIT ?`,
    limit,
  );

  const ranking = rows.map((r, i) => ({
    rank: i + 1,
    id: r.id,
    first_name: r.first_name,
    last_name: r.last_name,
    xp: r.xp,
    streak: r.streak,
    class_level: r.class_level,
    serie: r.serie,
    is_me: r.id === user.id,
  }));

  const myRank = queryOne<{ rank: number; xp: number }>(
    `SELECT rk.rank, rk.xp FROM (
       SELECT u.id, u.xp,
              ROW_NUMBER() OVER (ORDER BY u.xp DESC, u.last_active DESC, u.id ASC) AS rank
       FROM users u WHERE u.role = 'student'
     ) rk WHERE rk.id = ?`,
    user.id,
  );

  const total = queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM users WHERE role = 'student'",
  )!.c;

  const top = rows[0]?.xp ?? 0;
  const me = rows.find((r) => r.id === user.id) ?? {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    xp: myRank?.xp ?? 0,
    streak: 0,
    class_level: user.class_level,
    serie: null,
  };

  return NextResponse.json({
    ranking,
    me: {
      ...me,
      rank: myRank?.rank ?? null,
      is_me: true,
    },
    total,
    top_xp: top,
  });
}
