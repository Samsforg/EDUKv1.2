import { NextResponse } from "next/server";
import { getChallenges } from "@/lib/defis";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const all = getChallenges();
  const week = all.find((c) => c.category === "Défi de la Semaine") ?? all.find((c) => c.status === "active") ?? null;
  const actifs = all.filter((c) => c.status === "active" && c.id !== week?.id);
  const upcoming = all.filter((c) => c.status === "upcoming");
  const ended = all.filter((c) => c.status === "ended");

  const me = await getCurrentUser();
  const commune = me?.commune ?? null;

  return NextResponse.json({ week, actifs, upcoming, ended, me: { commune } });
}
