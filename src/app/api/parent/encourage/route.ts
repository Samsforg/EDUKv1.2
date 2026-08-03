import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, notify } from "@/lib/session";
import { isChildLinked } from "@/lib/parents";

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const childId = Number(body?.child_id);
  if (!childId || !isChildLinked(user.id, childId)) {
    return NextResponse.json({ error: "Enfant introuvable" }, { status: 404 });
  }

  notify(
    childId,
    "Encouragement 💪",
    `${user.first_name} ${user.last_name} vous adresse un message d'encouragement. Continuez comme ça !`,
    "favorite",
  );
  return NextResponse.json({ ok: true });
}
