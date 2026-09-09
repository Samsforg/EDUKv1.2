import { query, run } from "@/lib/db";
import { notify } from "@/lib/session";
import { sendPushToUser } from "@/lib/push";
import { sendMail } from "@/lib/mailer";
import { sendWhatsappText } from "@/lib/whatsapp";

interface AbandonedSub {
  id: number;
  user_id: number;
  price_cents: number | null;
  plan_name: string;
  started_at: string | null;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  reminder_step: number | null;
}

const CHECKOUT_URL = `${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}/plans-d-abonnement-edukora-1`;

// Relance 1re (step 0): abandon depuis >= 24h
const FIRST_HOURS = 24;
// Relance 2e (step 1): 48h après la 1re (≈ J+3)
const SECOND_LAPSE_HOURS = 48;
// Relance finale (step 2): 96h après la 2e (≈ J+7)
const FINAL_LAPSE_HOURS = 96;
// Au-delà de 3 relances, on arrête (pas de harcèlement)
export const MAX_REMINDER_STEP = 3;

export async function findAbandonedCheckouts(hoursOld = FIRST_HOURS): Promise<AbandonedSub[]> {
  const firstHours = Math.max(1, Math.min(72, Math.round(hoursOld)));
  return query<AbandonedSub>(
    `SELECT s.id, s.user_id, s.price_cents, s.started_at, s.reminder_step,
            COALESCE(p.name, 'Premium') AS plan_name,
            u.first_name, u.last_name, u.email, u.phone
     FROM subscriptions s
     JOIN users u ON u.id = s.user_id
     LEFT JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.status = 'incomplete'
       AND COALESCE(s.reminder_step, 0) < ${MAX_REMINDER_STEP}
       AND (
         (COALESCE(s.reminder_step, 0) = 0
           AND s.reminder_sent_at IS NULL
           AND s.started_at >= datetime('now', '-${firstHours} hours'))
         OR
         (s.reminder_step = 1
           AND s.last_reminder_at IS NOT NULL
           AND s.last_reminder_at <= datetime('now', '-${SECOND_LAPSE_HOURS} hours'))
         OR
         (s.reminder_step = 2
           AND s.last_reminder_at IS NOT NULL
           AND s.last_reminder_at <= datetime('now', '-${FINAL_LAPSE_HOURS} hours'))
       )`,
  );
}

function stepCopy(step: number, price: number | null): { title: string; body: string; cta: string } {
  const priceText = price != null ? `${new Intl.NumberFormat("fr-FR").format(price)} FCFA` : "";
  if (step >= 2) {
    // Relance finale — coup de pouce
    return {
      title: "Tes révisions n'attendent plus 🎯",
      body: `Ton abonnement ${priceText ? `${priceText} ` : ""}est toujours en attente de paiement. Ne laisse pas passer la réussite : débloque tous les cours pour le BAC/BEPC dès maintenant !`,
      cta: "Débloquer tout le programme",
    };
  }
  return {
    title: "Ton abonnement t'attend !",
    body: `Tu as commencé ton abonnement${priceText ? ` (${priceText})` : ""} mais le paiement n'a pas été confirmé. Finalise-le pour accéder à tous les cours !`,
    cta: "Finaliser mon abonnement",
  };
}

export async function sendAbandonedReminder(sub: AbandonedSub): Promise<{ ok: boolean; channel: string }> {
  const prenom = sub.first_name?.trim() || "cher élève";
  const planName = sub.plan_name;
  const step = sub.reminder_step ?? 0;
  const { title, body, cta } = stepCopy(step, sub.price_cents);

  await notify(sub.user_id, title, body, "rocket_launch", "checkout");

  const pushOk = (await sendPushToUser(sub.user_id, {
    title,
    body,
    tag: `relance-checkout-${step}`,
  }).catch(() => 0)) > 0;

  const emailOk = sub.email
    ? await sendMail({
        to: sub.email,
        subject: title,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:8px">
            <h2>${title}</h2>
            <p>Bonjour ${prenom},</p>
            <p>${body}</p>
            <p>Connecte-toi à ton compte Edukora pour finaliser ton paiement Mobile Money et commencer à réviser dès maintenant.</p>
            <a href="${CHECKOUT_URL}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">${cta}</a>
            <p style="color:#888;font-size:12px">Si tu as déjà payé, ignore ce message.</p>
          </div>`,
      })
    : false;

  const waOk = sub.phone ? await sendWhatsappText(`📚 *${title}*\n\n${body}\n\n${cta} ici : ${CHECKOUT_URL}`, sub.phone) : false;

  const nextStep = step + 1;
  await run(
    "UPDATE subscriptions SET reminder_sent_at = datetime('now'), reminder_step = ?, last_reminder_at = datetime('now') WHERE id = ?",
    nextStep,
    sub.id,
  );
  const channel = waOk ? "whatsapp" : emailOk ? "email" : "push";
  return { ok: waOk || emailOk || pushOk, channel };
}

interface TrialSub {
  id: number;
  user_id: number;
  plan_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

// Essais gratuits expirés (end_at passé) qui n'ont jamais été convertis en paiement actif.
export async function findExpiredTrials(hoursWindow = 24): Promise<TrialSub[]> {
  const window = Math.max(1, Math.min(168, Math.round(hoursWindow)));
  return query<TrialSub>(
    `SELECT s.id, s.user_id, COALESCE(p.name, 'Réussite') AS plan_name,
            u.first_name, u.last_name, u.email, u.phone
     FROM subscriptions s
     JOIN users u ON u.id = s.user_id
     LEFT JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.status = 'trial'
       AND s.end_at IS NOT NULL
       AND s.end_at <= datetime('now')
       AND s.end_at >= datetime('now', '-${window} hours')
       AND u.has_used_trial = 1`,
  );
}

export async function sendTrialEndReminder(sub: TrialSub): Promise<{ ok: boolean; channel: string }> {
  const prenom = sub.first_name?.trim() || "cher élève";
  const title = "Ton essai gratuit est terminé 🎓";
  const body = `Ton essai de 3 jours vient de se terminer. Maintiens ta progression avec l'abonnement ${sub.plan_name} et accède à tout le programme du BAC/BEPC !`;

  await notify(sub.user_id, title, body, "school", "trial-ended");

  const pushOk = (await sendPushToUser(sub.user_id, {
    title,
    body,
    tag: "trial-ended",
  }).catch(() => 0)) > 0;

  const emailOk = sub.email
    ? await sendMail({
        to: sub.email,
        subject: title,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:8px">
            <h2>${title}</h2>
            <p>Bonjour ${prenom},</p>
            <p>${body}</p>
            <p>Continue tes révisions sans interruption et ne perds pas ta lancée.</p>
            <a href="${CHECKOUT_URL}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">Profiter de l'offre Premium</a>
            <p style="color:#888;font-size:12px">Ton rappel d'étude et ton historique sont conservés sur ton compte.</p>
          </div>`,
      })
    : false;

  const waOk = sub.phone ? await sendWhatsappText(`📚 *${title}*\n\n${body}\n\nReprends ton abonnement ici : ${CHECKOUT_URL}`, sub.phone) : false;

  await run("UPDATE subscriptions SET reminder_sent_at = datetime('now'), reminder_step = 1, last_reminder_at = datetime('now') WHERE id = ?", sub.id);
  const channel = waOk ? "whatsapp" : emailOk ? "email" : "push";
  return { ok: waOk || emailOk || pushOk, channel };
}
