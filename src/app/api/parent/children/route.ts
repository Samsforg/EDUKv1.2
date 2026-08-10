import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getParentChildren, isChildLinked, unlinkChild } from "@/lib/parents";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }
  return NextResponse.json({ children: await getParentChildren(user.id) });
}

export const GET = guardApi("GET /api/parent/children", GETHandler);

async function DELETEHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }
  const body = await req.json().catch(() => null);
  const childId = Number(body?.child_id);
  if (!childId || !await isChildLinked(user.id, childId)) {
    return NextResponse.json({ error: "Enfant introuvable" }, { status: 404 });
  }
  await unlinkChild(user.id, childId);
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/parent/children", DELETEHandler);
