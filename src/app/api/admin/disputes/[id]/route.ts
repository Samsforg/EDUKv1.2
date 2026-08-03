import { NextRequest, NextResponse } from "next/server";
import { resolveDispute } from "@/lib/disputes";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body.resolution !== "string") {
    return NextResponse.json({ error: "Réponse requise" }, { status: 400 });
  }
  const actor = await getCurrentUser();
  const result = resolveDispute(Number(id), body.resolution, actor!.id);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json({ ok: true });
}
