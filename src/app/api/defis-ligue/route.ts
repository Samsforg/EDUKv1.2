import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getLigueChallengesFor } from "@/lib/ligue";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const data = await getLigueChallengesFor(user.id);
  if (!data) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

  return NextResponse.json(data);
}

export const GET = guardApi("GET /api/defis-ligue", GETHandler);
