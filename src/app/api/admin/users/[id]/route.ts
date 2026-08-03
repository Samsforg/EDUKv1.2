import { NextResponse } from "next/server";
import { getUserDetail, changeUserRole, setUserBlocked, deleteUser } from "@/lib/admin";
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
