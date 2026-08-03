import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { getOrCreatePairingCode } from "@/lib/parents";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "student") {
    return NextResponse.json({ error: "Réservé aux élèves" }, { status: 403 });
  }
  const code = getOrCreatePairingCode(user.id);
  return NextResponse.json({ code });
}
