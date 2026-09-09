import { NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import { getCurrentUser } from "@/lib/session";

function sessionSecret(): string | null {
  const secret = process.env.SESSION_SECRET;
  if (secret) return secret;
  if (process.env.NODE_ENV !== "production") return "edukora-session-secret-v1-demo";
  return null;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const secret = sessionSecret();
  if (!secret) return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });

  const token = createHmac("sha256", secret)
    .update(`csrf:${user.id}`)
    .digest("base64url");

  return NextResponse.json({ csrfToken: token });
}
