import { query, queryOne, run } from "@/lib/db";
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
}

export async function findAbandonedCheckouts(hoursOld = 24): Promise<AbandonedSub[]> {
  const hours = Math.max(1, Math.min(72, Math.round(hoursOld)));
  return query<AbandonedSub>(
    `SELECT s.id, s.user_id, s.price_cents, s.started_at,
            COALESCE(p.name, 'Premium') AS plan_name,
            u.first_name, u.last_name, u.email, u.phone
     FROM subscriptions s
     JOIN users u ON u.id = s.user_id
     LEFT JOIN subscription_plans p ON p.id = s.plan_id
     WHERE s.status = 'incomplete'
       AND s.reminder_sent_at IS NULL
       AND s.started_at >= datetime('now', '-${hours} hours')`,
  );
}

export async function sendAbandonedReminder(sub: AbandonedSub): Promise<{ ok: boolean; channel: string }> {
  const prenom = sub.first_name?.trim() || "cher élève";
  const planName = sub.plan_name;
  const price = sub.price_cents != null ? Math.round(sub.price_cents / 100) : null;
  const priceText = price != null ? `${new Intl.NumberFormat("fr-FR").format(price)} FCFA` : "";

  const title = "Ton abonnement t'attend !";
  const body = `Tu as commencé ton abonnement ${planName}${priceText ? ` (${priceText})` : ""} mais le paiement n'a pas été confirmé. Finalise-le pour accéder à tous les cours !`;

  await notify(sub.user_id, title, body, "rocket_launch", "checkout");

  const pushOk = (await sendPushToUser(sub.user_id, {
    title,
    body,
    tag: "relance-checkout",
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
            ${priceText ? `<p style="font-size:22px;font-weight:700">${priceText}</p>` : ""}
            <p>Connecte-toi à ton compte Edukora pour finaliser ton paiement Mobile Money et commencer à réviser dès maintenant.</p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}/tarifs" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">Finaliser mon abonnement</a>
            <p style="color:#888;font-size:12px">Si tu as déjà payé, ignore ce message.</p>
          </div>`,
      })
    : false;

  const waOk = sub.phone ? await sendWhatsappText(`📚 *${title}*\n\n${body}\n\nFinalise ton paiement ici : ${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}/tarifs`, sub.phone) : false;

  await run("UPDATE subscriptions SET reminder_sent_at = datetime('now') WHERE id = ?", sub.id);
  const channel = waOk ? "whatsapp" : emailOk ? "email" : "push";
  return { ok: waOk || emailOk || pushOk, channel };
}