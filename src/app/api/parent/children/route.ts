import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getParentChildren, isChildLinked, unlinkChild } from "@/lib/parents";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }
  return NextResponse.json({ children: getParentChildren(user.id) });
}

export async function DELETE(req: NextRequest) {
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
  unlinkChild(user.id, childId);
  return NextResponse.json({ ok: true });
}
