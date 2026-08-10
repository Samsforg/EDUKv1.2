import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { destroySession, clearSessionCookie } from "@/lib/session";

async function POSTHandler() {
  await destroySession();
  const res = NextResponse.json({ ok: true });
  clearSessionCookie(res);
  return res;
}

export const POST = guardApi("POST /api/auth/logout", POSTHandler);
