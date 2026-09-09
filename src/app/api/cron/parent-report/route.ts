import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query, queryOne, run } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { requireCronSecret } from "@/lib/cron-auth";

// Rapport hebdo parent : envoyé chaque dimanche (cron) à tous les parents liés.
// Contenu : score moyen 7j, streak, quiz faits, temps estimé, conseil pédagogique.

interface ChildReport {
  child_id: number;
  child_name: string;
  email: string | null;
  quizzes_7d: number;
  avg_pct: number | null;
  streak: number;
  xp: number;
  premium: boolean;
}

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  const links = await query<{ parent_id: number; parent_email: string | null; child_id: number; child_first: string; child_last: string }>(
    `SELECT pc.parent_id, u.email AS parent_email, pc.child_id,
            c.first_name AS child_first, c.last_name AS child_last
     FROM parent_child pc
     JOIN users u ON u.id = pc.parent_id
     JOIN users c ON c.id = pc.child_id
     WHERE u.email IS NOT NULL AND u.email != ''`
  );
  if (links.length === 0) return NextResponse.json({ ok: true, sent: 0 });

  // Grouper par parent
  const byParent = new Map<number, { email: string; children: { id: number; name: string; quizzes: number; avg: number | null; streak: number; xp: number; premium: boolean }[] }>();
  for (const l of links) {
    if (!byParent.has(l.parent_id)) byParent.set(l.parent_id, { email: l.parent_email!, children: [] });
    const stats = await queryOne<{ q: number; avg: number | null; streak: number; xp: number; premium: number }>(
      `SELECT
         (SELECT COUNT(*) FROM quiz_attempts WHERE user_id = ? AND completed_at >= datetime('now','-7 days')) AS q,
         (SELECT MAX(x) FROM (SELECT AVG(score * 100.0 / NULLIF(max_score,0)) AS x FROM quiz_attempts WHERE user_id = ? AND completed_at >= datetime('now','-7 days') GROUP BY quiz_id)) AS avg,
         (SELECT streak FROM users WHERE id = ?) AS streak,
         (SELECT xp FROM users WHERE id = ?) AS xp,
         (SELECT COUNT(*) FROM subscriptions WHERE user_id = ? AND status IN ('active','trial') AND (end_at IS NULL OR end_at > datetime('now'))) AS premium`,
      l.child_id, l.child_id, l.child_id, l.child_id, l.child_id
    );
    byParent.get(l.parent_id)!.children.push({
      id: l.child_id,
      name: `${l.child_first} ${l.child_last.charAt(0)}.`,
      quizzes: stats?.q ?? 0,
      avg: stats?.avg != null ? Math.round(Number(stats.avg)) : null,
      streak: stats?.streak ?? 0,
      xp: stats?.xp ?? 0,
      premium: Number(stats?.premium ?? 0) > 0,
    });
  }

  let sent = 0;
  let failed = 0;
  for (const [parentId, data] of byParent) {
    const rowsHtml = data.children.map((c) => {
      const activity = c.quizzes > 0 ? `${c.quizzes} quiz cette semaine` : "aucun quiz cette semaine";
      const score = c.avg != null ? `${c.avg}% de moyenne` : "pas encore de score";
      const advice =
        c.quizzes === 0
          ? "Encouragez-le/la à faire au moins un quiz du jour pour garder le rythme."
          : c.avg != null && c.avg < 50
            ? "Des révisions ciblées sur les matières en dessous de 50% sont recommandées."
            : c.avg != null && c.avg < 75
              ? "Bon rythme ! Continuez à encourager la régularité."
              : "Excellents résultats, félicitations !";
      return `<tr>
        <td style="padding:10px;border-bottom:1px solid #eee;font-weight:bold">${c.name}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center">${activity}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center">${score}</td>
        <td style="padding:10px;border-bottom:1px solid #eee;text-align:center">🔥 ${c.streak} j</td>
        <td style="padding:10px;border-bottom:1px solid #eee">${advice}</td>
      </tr>`;
    }).join("");

    const upsell = data.children.some((c) => !c.premium);

    const html = `
    <div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;padding:24px">
      <h2 style="color:#0047ab;margin-bottom:8px">Rapport hebdomadaire Edukora 📊</h2>
      <p>Bonjour,</p>
      <p>Voici le bilan de révision de la semaine de votre/vos enfant(s) :</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:13px">
        <thead>
          <tr style="background:#f0f6ff">
            <th style="padding:10px;text-align:left">Enfant</th>
            <th style="padding:10px">Activité</th>
            <th style="padding:10px">Score</th>
            <th style="padding:10px">Série</th>
            <th style="padding:10px;text-align:left">Conseil</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <p><a href="https://edukora.net/espace-parent" style="background:#0047ab;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold;display:inline-block">Voir le tableau de bord complet</a></p>
      ${upsell ? `
      <div style="margin:24px 0;padding:20px;border:2px solid #0047ab;border-radius:12px;background:#f0f6ff">
        <p style="font-size:15px;font-weight:bold;color:#0047ab;margin:0 0 6px">Débloquez tout le programme 📚</p>
        <p style="font-size:13px;color:#333;margin:0 0 12px">Avec l'abonnement Premium, votre enfant accède à tous les cours détaillés, les exercices corrigés et le tuteur IA Kora pour réussir confortablement son BAC ou BEPC.</p>
        <a href="https://edukora.net/plans-d-abonnement-edukora-1" style="background:#0047ab;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;display:inline-block">Découvrir l'offre Premium</a>
      </div>` : ""}
      <p style="color:#666;font-size:12px;margin-top:32px">&copy; Edukora — Vous recevez ce rapport car un compte enfant est lié au vôtre.</p>
    </div>`;

    try {
      const ok = await sendMail({
        to: data.email,
        subject: "Rapport hebdo Edukora — bilan de vos enfants",
        html,
      });
      if (ok) sent++;
      else failed++;
    } catch {
      failed++;
    }
    // Marquer l'envoi pour audit
    await run("UPDATE users SET last_active = last_active WHERE id = ?", parentId).catch(() => {});
  }

  return NextResponse.json({ ok: true, parents: byParent.size, sent, failed });
}

export const GET = guardApi("GET /api/cron/parent-report", GETHandler);
