import { NextResponse } from "next/server";
import { getLiveSession, getLiveMessages } from "@/lib/live";
import { getCurrentUser } from "@/lib/session";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const { id } = await params;
  const detail = getLiveSession(Number(id), user.id);
  if (!detail) return NextResponse.json({ error: "Session introuvable" }, { status: 404 });
  const messages = detail.status === "live" ? getLiveMessages(detail.id, 30) : [];
  return NextResponse.json({ ...detail, messages, me: { name: `${user.first_name} ${user.last_name}` } });
}
