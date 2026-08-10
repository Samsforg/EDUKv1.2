import { NextResponse } from "next/server";

export function GET(req: Request) {
  const u = new URL(req.url);
  u.pathname = "/paiement-r-ussi-edukora-premium-geniuspay";
  return NextResponse.redirect(u.toString(), { status: 308 });
}
