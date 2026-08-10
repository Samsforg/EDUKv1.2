import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getDashboardData, resolveLinkedChild } from "@/lib/parents";

async function GETHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "parent") {
    return NextResponse.json({ error: "Réservé aux parents" }, { status: 403 });
  }

  const requested = req.nextUrl.searchParams.get("child");
  const child = await resolveLinkedChild(user.id, requested ? Number(requested) : null);
  if (!child) {
    return NextResponse.json({ error: "Aucun enfant lié" }, { status: 404 });
  }

  const data = await getDashboardData(user.id, child.child_id);
  return NextResponse.json(data);
}

export const GET = guardApi("GET /api/parent/dashboard", GETHandler);
