import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getStreakInfo } from "@/lib/streak";
import { guardApi } from "@/lib/api-guard";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const info = await getStreakInfo(user.id);
  return NextResponse.json(info);
}
export const GET = guardApi("GET /api/gamification/streak", GETHandler);
