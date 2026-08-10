import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { requireAdmin } from "@/lib/admin-guard";
import { changeAdminPassword } from "@/lib/admin-profile";

async function POSTHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const actor = await getCurrentUser();
  const body = await req.json().catch(() => null);
  if (!body || typeof body.currentPassword !== "string" || typeof body.newPassword !== "string") {
    return NextResponse.json({ error: "Ancien et nouveau mot de passe requis" }, { status: 400 });
  }

  const res = await changeAdminPassword(actor!.id, body.currentPassword, body.newPassword);
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const POST = guardApi("POST /api/admin/profile/password", POSTHandler);
