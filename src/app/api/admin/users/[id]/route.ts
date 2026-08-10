import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getUserDetail, changeUserRole, setUserBlocked, deleteUser, updateUser } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

async function GETHandler(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const detail = await getUserDetail(Number(id));
  if (!detail.user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }
  return NextResponse.json(detail);
}

export const GET = guardApi("GET /api/admin/users/[id]", GETHandler);

async function PATCHHandler(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const userId = Number(id);
  const actor = await getCurrentUser();

  if (body.role !== undefined) {
    const res = await changeUserRole(userId, body.role as string, actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }
  if (body.blocked !== undefined) {
    const res = await setUserBlocked(userId, Boolean(body.blocked), actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }

  // Champs additionnels modifiables par l'admin
  const updateFields: Record<string, unknown> = {};
  if (body.first_name !== undefined) updateFields.first_name = body.first_name;
  if (body.last_name !== undefined) updateFields.last_name = body.last_name;
  if (body.email !== undefined) updateFields.email = body.email;
  if (body.phone !== undefined) updateFields.phone = body.phone;
  if (body.serie_id !== undefined) updateFields.serie_id = body.serie_id;
  if (body.class_level !== undefined) updateFields.class_level = body.class_level;
  if (Object.keys(updateFields).length > 0) {
    const res = await updateUser(userId, updateFields, actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/users/[id]", PATCHHandler);

async function DELETEHandler(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const actor = await getCurrentUser();
  const res = await deleteUser(Number(id), actor!.id);
  if ("error" in res) return NextResponse.json(res, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/admin/users/[id]", DELETEHandler);
