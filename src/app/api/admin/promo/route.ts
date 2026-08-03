import { NextRequest, NextResponse } from "next/server";
import { getPromoCodes, createPromoCode } from "@/lib/promo";
import { requireAdmin } from "@/lib/admin-guard";
import { getCurrentUser } from "@/lib/session";

export async function GET() {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;
  return NextResponse.json({ codes: getPromoCodes() });
}

export async function POST(req: NextRequest) {
  const forbidden = await requireAdmin();
  if (forbidden) return forbidden;

  const body = await req.json().catch(() => null);
  if (!body || typeof body.code !== "string") {
    return NextResponse.json({ error: "code requis" }, { status: 400 });
  }
  const actor = await getCurrentUser();
  const result = createPromoCode(
    {
      code: body.code,
      discount_type: body.discount_type === "fixed" ? "fixed" : "percent",
      discount_value: Number(body.discount_value),
      max_uses: Number(body.max_uses ?? 1),
      starts_at: body.starts_at || null,
      expires_at: body.expires_at || null,
    },
    actor!.id,
  );
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true, id: result.id }, { status: 201 });
}
