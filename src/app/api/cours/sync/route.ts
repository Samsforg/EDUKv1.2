import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { query } from "@/lib/db";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const lessons = query<{ id: number }>(
    "SELECT id FROM lessons ORDER BY id DESC LIMIT 50"
  );
  const chapters = query<{ id: number }>(
    "SELECT id FROM chapters ORDER BY id DESC LIMIT 50"
  );

  const items = [
    ...lessons.map((l) => ({ url: `/cours/lecon/${l.id}` })),
    ...chapters.map((c) => ({ url: `/cours` })),
  ];

  return NextResponse.json({ items });
}
