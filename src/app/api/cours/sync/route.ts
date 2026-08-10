import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { query } from "@/lib/db";

async function GETHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const lessons = await query<{ id: number }>(
    "SELECT id FROM lessons ORDER BY id DESC LIMIT 50"
  );
  const chapters = await query<{ id: number }>(
    "SELECT id FROM chapters ORDER BY id DESC LIMIT 50"
  );

  const items = [
    ...lessons.map((l) => ({ url: `/cours/lecon/${l.id}` })),
    ...chapters.map((c) => ({ url: `/cours` })),
  ];

  return NextResponse.json({ items });
}

export const GET = guardApi("GET /api/cours/sync", GETHandler);
