import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { getCurrentUser } from "@/lib/session";
import { query, queryOne, run } from "@/lib/db";
import { notify } from "@/lib/session";

// Défi 1v1 : un élève défie un autre via son code de parrainage ou email.
// Le gagnant est celui qui a le meilleur score au même quiz.

async function POSTHandler(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const action = String(body.action ?? "");

  if (action === "create") {
    const quizId = Number(body.quiz_id);
    const opponentEmail = String(body.opponent_email ?? "").trim().toLowerCase();
    if (!quizId || !opponentEmail) return NextResponse.json({ error: "quiz_id et opponent_email requis" }, { status: 400 });
    const opponent = await queryOne<{ id: number; first_name: string }>("SELECT id, first_name FROM users WHERE LOWER(email) = ? AND id != ?", opponentEmail, user.id);
    if (!opponent) return NextResponse.json({ error: "Aucun utilisateur avec cet email" }, { status: 404 });

    const quiz = await queryOne<{ id: number; title: string }>("SELECT id, title FROM quizzes WHERE id = ? AND status='approved'", quizId);
    if (!quiz) return NextResponse.json({ error: "Quiz introuvable" }, { status: 404 });

    const r = await run(
      `INSERT INTO duels (challenger_id, opponent_id, quiz_id, status) VALUES (?, ?, ?, 'pending')`,
      user.id,
      opponent.id,
      quizId
    );
    await notify(opponent.id, `⚔️ Défi de ${user.first_name} !`, `${user.first_name} te défie sur « ${quiz.title} ». Ouvre /defis-1v1 pour relever le défi.`, "swords", "duel");
    return NextResponse.json({ ok: true, duel_id: r.lastInsertRowid });
  }

  if (action === "answer") {
    const duelId = Number(body.duel_id);
    const scorePct = Math.max(0, Math.min(100, Number(body.score_pct) || 0));
    const duel = await queryOne<{ id: number; challenger_id: number; opponent_id: number; challenger_pct: number | null; opponent_pct: number | null; status: string; quiz_id: number }>(
      "SELECT id, challenger_id, opponent_id, challenger_pct, opponent_pct, status, quiz_id FROM duels WHERE id = ?",
      duelId
    );
    if (!duel || (duel.challenger_id !== user.id && duel.opponent_id !== user.id)) {
      return NextResponse.json({ error: "Défi introuvable" }, { status: 404 });
    }
    const isChallenger = duel.challenger_id === user.id;
    await run(
      isChallenger ? "UPDATE duels SET challenger_pct = ? WHERE id = ?" : "UPDATE duels SET opponent_pct = ? WHERE id = ?",
      scorePct,
      duelId
    );
    const updated = await queryOne<{ challenger_pct: number | null; opponent_pct: number | null }>(
      "SELECT challenger_pct, opponent_pct FROM duels WHERE id = ?", duelId
    );
    // Les deux ont joué → désigner le gagnant
    if (updated?.challenger_pct != null && updated?.opponent_pct != null && duel.status !== 'done') {
      let winnerId: number | null = null;
      if ((updated.challenger_pct ?? 0) > (updated.opponent_pct ?? 0)) winnerId = duel.challenger_id;
      else if ((updated.opponent_pct ?? 0) > (updated.challenger_pct ?? 0)) winnerId = duel.opponent_id;
      await run("UPDATE duels SET winner_id = ?, status = 'done' WHERE id = ?", winnerId, duelId);
      for (const uid of [duel.challenger_id, duel.opponent_id]) {
        const won = winnerId === uid;
        const tie = winnerId === null;
        await notify(uid, tie ? "⚔️ Match nul !" : won ? "🏆 Tu as gagné ton défi !" : "💪 Défi perdu",
          tie ? "Vous êtes à égalité. Revanche ?" : won ? "Bravo ! +50 XP de bonus." : "Retente ta chance avec un autre quiz.",
          won ? "emoji_events" : "swords", "duel");
        if (won) await run("UPDATE users SET xp = xp + 50 WHERE id = ?", uid);
      }
    }
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}

export async function GETHandler() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });
  const rows = await query(
    `SELECT d.id, d.status, d.challenger_pct, d.opponent_pct, d.winner_id,
            q.title AS quiz_title,
            cu.first_name AS challenger_name, ou.first_name AS opponent_name
     FROM duels d
     JOIN quizzes q ON q.id = d.quiz_id
     JOIN users cu ON cu.id = d.challenger_id
     JOIN users ou ON ou.id = d.opponent_id
     WHERE d.challenger_id = ? OR d.opponent_id = ?
     ORDER BY d.id DESC LIMIT 20`,
    user.id,
    user.id
  );
  return NextResponse.json({ duels: rows, me: user.id });
}

export const GET = guardApi("GET /api/duels", GETHandler);
export const POST = guardApi("POST /api/duels", POSTHandler);
