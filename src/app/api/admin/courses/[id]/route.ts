import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { setCourseStatus } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

async function PATCHHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body.kind !== "string" || typeof body.status !== "string") {
    return NextResponse.json({ error: "kind et status requis" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  const result = await setCourseStatus(body.kind, Number(id), body.status, actor!.id);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/courses/[id]", PATCHHandler);
