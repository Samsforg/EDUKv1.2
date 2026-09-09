import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getClassLeaderboard } from "@/lib/rank";
import { guardApi } from "@/lib/api-guard";

async function GETHandler(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const url = new URL(req.url);
  const classId = Number(url.searchParams.get("classId"));
  if (!classId) return NextResponse.json({ error: "classId requis" }, { status: 400 });
  const data = await getClassLeaderboard(classId, user.id, 20);
  if (!data) return NextResponse.json({ error: "Classe introuvable" }, { status: 404 });
  return NextResponse.json(data);
}
export const GET = guardApi("GET /api/gamification/class-leaderboard", GETHandler);
