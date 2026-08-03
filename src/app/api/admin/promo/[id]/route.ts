import { NextRequest, NextResponse } from "next/server";
import { setPromoActive, deletePromoCode } from "@/lib/promo";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const actor = await getCurrentUser();
  if (body.active !== undefined) {
    const result = setPromoActive(Number(id), Boolean(body.active), actor!.id);
    if ("error" in result) return NextResponse.json(result, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const { id } = await params;
  const actor = await getCurrentUser();
  const result = deletePromoCode(Number(id), actor!.id);
  if ("error" in result) return NextResponse.json(result, { status: 400 });
  return NextResponse.json({ ok: true });
}
