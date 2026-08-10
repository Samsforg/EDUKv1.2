import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { requireAdmin } from "@/lib/admin-guard";
import { getAdminProfile, updateAdminProfile } from "@/lib/admin-profile";

async function GETHandler() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const actor = await getCurrentUser();
  const profile = await getAdminProfile(actor!.id);
  if (!profile) return NextResponse.json({ error: "Profil introuvable" }, { status: 404 });
  return NextResponse.json({ profile });
}

export const GET = guardApi("GET /api/admin/profile", GETHandler);

async function PATCHHandler(req: Request) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const actor = await getCurrentUser();
  const body = await req.json().catch(() => ({}));
  const res = await updateAdminProfile(actor!.id, body);
  if ("error" in res) return NextResponse.json({ error: res.error }, { status: 400 });
  return NextResponse.json({ ok: true, profile: res.profile });
}

export const PATCH = guardApi("PATCH /api/admin/profile", PATCHHandler);
