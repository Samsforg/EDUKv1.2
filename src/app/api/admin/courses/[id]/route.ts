import { NextRequest, NextResponse } from "next/server";
import { setCourseStatus } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body.kind !== "string" || typeof body.status !== "string") {
    return NextResponse.json({ error: "kind et status requis" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  const result = setCourseStatus(body.kind, Number(id), body.status, actor!.id);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
