import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { resetUserPassword } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

async function POSTHandler(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => null);
  if (!body || typeof body.password !== "string") {
    return NextResponse.json({ error: "Mot de passe requis" }, { status: 400 });
  }

  const actor = await getCurrentUser();
  const result = await resetUserPassword(Number(id), body.password, actor!.id);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const POST = guardApi("POST /api/admin/users/[id]/password", POSTHandler);
