import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getDashboardData, resolveLinkedChild } from "@/lib/parents";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }

  const requested = req.nextUrl.searchParams.get("child");
  const child = resolveLinkedChild(user.id, requested ? Number(requested) : null);
  if (!child) {
    return NextResponse.json({ error: "Aucun enfant lié" }, { status: 404 });
  }

  const data = getDashboardData(user.id, child.child_id);
  return NextResponse.json(data);
}
