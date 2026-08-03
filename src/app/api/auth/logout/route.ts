import { NextResponse } from "next/server";
import { destroySession, clearSessionCookie } from "@/lib/session";

export async function POST() {
  await destroySession();
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}
