import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser, createSession, setSessionCookie } from "@/lib/session";
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
  // P2.12.1 A3 — les sessions antérieures sont révoquées ; on réémet un token
  // frais pour que l'admin reste connecté sans qu'un ancien token subsiste.
  const out = NextResponse.json({ ok: true });
  const token = await createSession(actor!.id);
  setSessionCookie(out, token);
  return out;
}

export const POST = guardApi("POST /api/admin/profile/password", POSTHandler);
