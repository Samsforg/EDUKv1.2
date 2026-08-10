import { guardApi } from "@/lib/api-guard";
import { NextRequest, NextResponse } from "next/server";
import { setPromoActive, deletePromoCode } from "@/lib/promo";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

async function PATCHHandler(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const actor = await getCurrentUser();
  if (body.active !== undefined) {
    const result = await setPromoActive(Number(id), Boolean(body.active), actor!.id);
    if ("error" in result) return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

export const PATCH = guardApi("PATCH /api/admin/promo/[id]", PATCHHandler);

async function DELETEHandler(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const actor = await getCurrentUser();
  const result = await deletePromoCode(Number(id), actor!.id);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json({ ok: true });
}

export const DELETE = guardApi("DELETE /api/admin/promo/[id]", DELETEHandler);
