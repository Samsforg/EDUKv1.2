import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getUserDetail, changeUserRole, setUserBlocked, deleteUser, updateUser } from "@/lib/admin";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

const VALID_ROLES = ["student", "teacher", "admin", "parent"];
const ALLOWED_UPDATE_FIELDS = ["first_name", "last_name", "email", "phone", "serie_id", "class_level"];

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
    if (!VALID_ROLES.includes(body.role)) {
      return NextResponse.json({ error: `Rôle invalide. Valeurs autorisées : ${VALID_ROLES.join(", ")}` }, { status: 400 });
    }
    const res = await changeUserRole(userId, body.role as string, actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }
  if (body.blocked !== undefined) {
    const res = await setUserBlocked(userId, Boolean(body.blocked), actor!.id);
    if ("error" in res) return NextResponse.json(res, { status: 400 });
  }

  // Champs additionnels modifiables par l'admin — avec validation basique
  const updateFields: Record<string, unknown> = {};
  for (const field of ALLOWED_UPDATE_FIELDS) {
    if (body[field] !== undefined) {
      const val = body[field];
      if (typeof val !== "string" && typeof val !== "number" && val !== null) continue;
      if (typeof val === "string" && val.length > 200) continue;
      updateFields[field] = val;
    }
  }
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
