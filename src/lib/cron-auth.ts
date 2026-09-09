import { NextRequest, NextResponse } from "next/server";

export function requireCronSecret(req: NextRequest): NextResponse | null {
  const auth = req.headers.get("authorization");
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "CRON_SECRET non configuré — route désactivée" },
      { status: 500 },
    );
  }

  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  return null;
}
