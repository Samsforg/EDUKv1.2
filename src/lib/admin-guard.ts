import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

export async function requireAdmin(): Promise<NextResponse | null> {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Réservé aux administrateurs" }, { status: 403 });
  }
  return null;
}

export function unauthorizedAdmin(): NextResponse {
  return NextResponse.json({ error: "Réservé aux administrateurs" }, { status: 403 });
}
