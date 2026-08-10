import { guardApi } from "@/lib/api-guard";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getOrCreatePairingCode } from "@/lib/parents";

async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json({ error: "Réservé aux élèves" }, { status: 403 });
  }
  const code = await getOrCreatePairingCode(user.id);
  return NextResponse.json({ code });
}

export const GET = guardApi("GET /api/me/pairing-code", GETHandler);
