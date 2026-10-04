import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { query, queryOne } from "@/lib/db";
import { sendSubscriptionReminder, sendSms } from "@/lib/sms";
import { logger } from "@/lib/logger";
import { requireCronSecret } from "@/lib/cron-auth";

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  let sent = 0;
  let failed = 0;

  // 1. SMS pour abonnements expirant dans les 3 jours
  // Colonne `end_at` (et non `expires_at`) : c'est le nom réel dans le schéma
  // `subscriptions`. `expires_at` existe sur d'autres tables (sessions,
  // password_resets, pairing_codes) mais pas ici — la requête échouait
  // en `no such column` et renvoyait un 500.
  //
  // La borne basse `end_at > datetime('now')` est indispensable : sans elle,
  // `end_at <= now + 3 days` est aussi vrai pour un abonnement dont
  // `end_at` est passé depuis des semaines. Un abonnement `active` non mis à
  // jour (webhook jamais passé) recevait alors « votre abonnement expire
  // bientôt » tous les 24h, indéfiniment. La fenêtre J-3 doit être bornée
  // des deux côtés.
  const expiring = await query<{ user_id: number }>(
    `SELECT user_id FROM subscriptions
     WHERE status = 'active'
     AND end_at IS NOT NULL
     AND end_at > datetime('now')
     AND end_at <= datetime('now', '+3 days')
     AND (last_reminder_at IS NULL OR last_reminder_at < datetime('now', '-1 day'))`
  );

  for (const s of expiring) {
    try {
      const ok = await sendSubscriptionReminder(s.user_id);
      if (ok) {
        sent++;
        await queryOne<{ c: number }>(
          "UPDATE subscriptions SET last_reminder_at = datetime('now') WHERE user_id = ? AND status = 'active'",
          s.user_id,
        );
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  // 2. SMS pour streak en danger (pas de connexion depuis 2 jours)
  // Colonne `last_active` (et non `last_active_at`) : nom réel dans le schéma
  // `users`. Cette requête n'est pas dans un try/catch, donc l'ancienne
  // colonne faisait échouer toute la route en 500 même après avoir corrigé
  // la requête 1.
  const inactive = await query<{ id: number; phone: string | null; first_name: string; streak: number }>(
    `SELECT id, phone, first_name, streak FROM users
     WHERE role = 'student' AND phone IS NOT NULL AND streak >= 3
     AND last_active < datetime('now', '-2 days')
     AND (last_reactivation_at IS NULL OR last_reactivation_at < datetime('now', '-3 days'))
     LIMIT 50`
  );

  for (const u of inactive) {
    if (!u.phone) continue;
    try {
      const msg = `Edukora: ${u.first_name}, tu as une série de ${u.streak} jours ! Ne la brise pas — fais au moins 1 quiz aujourd'hui.`;
      const result = await sendSms(u.phone, msg);
      if (result.ok) sent++;
      else failed++;
    } catch {
      failed++;
    }
  }

  logger.info("cron:sms-reminders", { sent, failed, expiring: expiring.length, inactive: inactive.length });
  return NextResponse.json({ ok: true, sent, failed });
}

export const GET = guardApi("GET /api/cron/sms-reminders", GETHandler);
