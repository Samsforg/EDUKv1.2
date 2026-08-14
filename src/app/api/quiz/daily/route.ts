import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getDailyQuiz } from "@/lib/daily";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const daily = await getDailyQuiz(user.id);
  if (!daily) return NextResponse.json({ error: "Aucun quiz disponible" }, { status: 404 });
  return NextResponse.json(daily);
}

export const GET = guardApi("GET /api/quiz/daily", GETHandler);