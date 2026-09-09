import { NextResponse } from "next/server";
import { queryOne, run } from "@/lib/db";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";

// Crée (une seule fois) les packs par matière : Maths, PC, SVT, Français, Anglais à 2000 FCFA/mois.
async function POSTHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  if (user.role !== "admin") return NextResponse.json({ error: "Admin requis" }, { status: 403 });

  const subjects = await queryOne<{ c: number }>(
    `SELECT COUNT(*) AS c FROM subscription_plans WHERE name LIKE 'Pack %'`
  );
  if ((subjects?.c ?? 0) > 0) {
    return NextResponse.json({ ok: true, message: "Packs déjà créés" });
  }

  const packs: [string, string, number, string][] = [
    ["Pack Maths", "Accès illimité aux fiches de Mathématiques\nQuiz et annales de Maths\n10 questions/mois à Kora IA", 2000, "month"],
    ["Pack Physique-Chimie", "Accès illimité aux fiches de Physique-Chimie\nQuiz et annales de PC\n10 questions/mois à Kora IA", 2000, "month"],
    ["Pack SVT", "Accès illimité aux fiches de SVT\nQuiz et annales de SVT\n10 questions/mois à Kora IA", 2000, "month"],
    ["Pack Français", "Accès illimité aux fiches de Français\nDissertations corrigées par IA\n10 questions/mois à Kora IA", 2000, "month"],
    ["Pack Anglais", "Accès illimité aux fiches d'Anglais\nQuiz et exercices d'Anglais\n10 questions/mois à Kora IA", 2000, "month"],
    ["Pass Annales", "Tous les sujets BAC & BEPC des années passées\nCorrections détaillées incluses\nSimulateur chronométré illimité", 3000, "year"],
  ];

  let created = 0;
  for (const [i, [name, features, price, interval]] of packs.entries()) {
    const exists = await queryOne<{ id: number }>("SELECT id FROM subscription_plans WHERE name = ?", name);
    if (exists) continue;
    await run(
      "INSERT INTO subscription_plans (name, interval, price_cents, currency, features, sort_order) VALUES (?, ?, ?, 'XOF', ?, ?)",
      name,
      interval,
      price,
      features,
      10 + i
    );
    created++;
  }
  return NextResponse.json({ ok: true, created });
}
export const POST = guardApi("POST /api/admin/plans/seed-packs", POSTHandler);
