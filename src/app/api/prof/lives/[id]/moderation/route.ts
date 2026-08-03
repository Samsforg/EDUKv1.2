import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getModerationData } from "@/lib/live-prof";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user || (user.role !== "teacher" && user.role !== "admin"))
    return NextResponse.json({ error: "Accès réservé aux professeurs" }, { status: 403 });

  const { id } = await params;
  const data = getModerationData(Number(id), user.id);
  if (!data) return NextResponse.json({ error: "Session introuvable ou non autorisée" }, { status: 404 });

  return NextResponse.json(data);
}
