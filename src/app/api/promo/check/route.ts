import { NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { ensureRentreePromo, getRedeemablePromo, RENTREE_PROMO_CODE } from "@/lib/promo";

async function GETHandler(req: Request) {
  const code = new URL(req.url).searchParams.get("code") ?? "";
  if (code.trim().toUpperCase() === RENTREE_PROMO_CODE) await ensureRentreePromo();
  const promo = await getRedeemablePromo(code);
  if (!promo) {
    return NextResponse.json({ valid: false, code: code.toUpperCase(), message: "Code promo invalide ou expiré" });
  }
  return NextResponse.json({
    valid: true,
    code: promo.code,
    discount_type: promo.discount_type,
    discount_value: promo.discount_value,
    message:
      promo.discount_type === "percent"
        ? `Code valide : -${Math.round(promo.discount_value)} % sur votre abonnement`
        : `Code valide : -${Math.round(promo.discount_value)} F sur votre abonnement`,
  });
}

export const GET = guardApi("GET /api/promo/check", GETHandler);