import { NextResponse } from "next/server";
import { getUserDetail, changeUserRole, setUserBlocked, deleteUser, updateUser } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const detail = getUserDetail(Number(id));
  if (!detail.user) {
    return NextResponse.json({ error: "Utilisateur introuvable" }, { status: 404 });
  }
  return NextResponse.json(detail);
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const userId = Number(id);
  const actor = await getCurrentUser();

  if (body.role !== undefined) {
    const res = changeUserRole(userId, body.role as string, actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }
  if (body.blocked !== undefined) {
    const res = setUserBlocked(userId, Boolean(body.blocked), actor!.id);
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
    const res = updateUser(userId, updateFields, actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const actor = await getCurrentUser();
  const res = deleteUser(Number(id), actor!.id);
  if ("error" in res) return NextResponse.json(res, { status: 400 });
  return NextResponse.json({ ok: true });
}
