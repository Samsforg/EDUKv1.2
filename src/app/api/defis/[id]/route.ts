import { NextResponse } from "next/server";
import { getChallengeDetail } from "@/lib/defis";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const detail = getChallengeDetail(Number(id), user.id);
  if (!detail) return NextResponse.json({ error: "Défi introuvable" }, { status: 404 });
  return NextResponse.json(detail);
}
