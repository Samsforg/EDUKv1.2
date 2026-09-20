import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { destroySession, clearSessionCookie } from "@/lib/session";

const SAFE_REDIRECTS = ["/connexion-edukora", "/connexion-administrateur-edukora", "/"];

function getRedirectTarget(params: URLSearchParams): string {
  const raw = params.get("redirect");
  if (raw && SAFE_REDIRECTS.includes(raw)) return raw;
  return "/connexion-edukora";
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const target = getRedirectTarget(url.searchParams);
    const jar = await cookies();
    const token = jar.get("edukora_session")?.value;
    if (token) await destroySession(token);
    const res = NextResponse.redirect(new URL(target, url.origin), { status: 302 });
    clearSessionCookie(res);
    return res;
  } catch (err) {
    console.error("[auth/logout] GET:", err);
    const res = NextResponse.redirect(new URL("/connexion-edukora", process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"), { status: 302 });
    clearSessionCookie(res);
    return res;
  }
}

export async function POST() {
  try {
    const jar = await cookies();
    const token = jar.get("edukora_session")?.value;
    if (token) await destroySession(token);
    const res = NextResponse.json({ ok: true });
    clearSessionCookie(res);
    return res;
  } catch (err) {
    console.error("[auth/logout] POST:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
