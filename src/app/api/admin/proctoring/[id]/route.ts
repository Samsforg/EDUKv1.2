import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { terminateSession } from "@/lib/proctoring";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

async function PATCHHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const actor = await getCurrentUser();
  const result = await terminateSession(Number(id), actor!.id);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/proctoring/[id]", PATCHHandler);
