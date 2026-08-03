import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getLigueChallengesFor } from "@/lib/ligue";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const data = getLigueChallengesFor(user.id);
  if (!data) return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });

  return NextResponse.json(data);
}
