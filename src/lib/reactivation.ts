import { query, run } from "@/lib/db";
import { notify } from "@/lib/session";
import { sendPushToUser } from "@/lib/push";
import { sendMail } from "@/lib/mailer";
import { sendBrevoTemplate } from "@/lib/brevo";

interface ReactivationUser {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  streak: number;
  xp: number;
  last_active: string | null;
  reactivation_step: number | null;
  last_reactivation_at: string | null;
}

// Seuil d'inactivité avant la 1re relance (7 jours).
const FIRST_INACTIVE_DAYS = 7;
// Espacement entre les relances (7 jours) → séquence J+7 / J+14 / J+21.
const LAPSE_DAYS = 7;
// Au-delà de 3 relances, on arrête (pas de harcèlement).
export const MAX_REACTIVATION_STEP = 3;

const TRACK_URL = `${process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net"}`;

export async function findReactivationCandidates(): Promise<ReactivationUser[]> {
  return query<ReactivationUser>(
    `SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.phone,
            u.streak, u.xp, u.last_active, u.reactivation_step, u.last_reactivation_at
     FROM users u
     WHERE u.role = 'student'
       AND u.blocked = 0
       AND u.email IS NOT NULL AND u.email <> ''
       AND COALESCE(u.reactivation_step, 0) < ${MAX_REACTIVATION_STEP}
       AND (
         (COALESCE(u.reactivation_step, 0) = 0
           AND u.last_reactivation_at IS NULL
           AND COALESCE(u.last_active, u.created_at, '2000-01-01') <= datetime('now', '-${FIRST_INACTIVE_DAYS} days'))
         OR
         (u.reactivation_step = 1
           AND u.last_reactivation_at IS NOT NULL
           AND u.last_reactivation_at <= datetime('now', '-${LAPSE_DAYS} days'))
         OR
         (u.reactivation_step = 2
           AND u.last_reactivation_at IS NOT NULL
           AND u.last_reactivation_at <= datetime('now', '-${LAPSE_DAYS} days'))
       )
     ORDER BY u.id LIMIT 500`,
  );
}

function stepCopy(step: number, streak: number, xp: number): { title: string; body: string; cta: string } {
  if (step >= 2) {
    return {
      title: "Tes révisions t'attendent encore 📚",
      body: `Ton compte est prêt. ${xp > 0 ? `Tu as déjà gagné ${xp} XP` : "Démarre dès aujourd'hui"} — reprends tes cours, fais les quiz et prépare sereinement le BAC/BEPC. Ne perds pas tes progrès !`,
      cta: "Reprendre mes révisions",
    };
  }
  if (step === 1) {
    return {
      title: "On ne lâche rien 💪",
      body: `Tu n'es pas revenu depuis quelques jours. ${streak > 0 ? `Ta série était de ${streak} jours — allons plus loin ! ` : ""}Les cours, quiz et exercices du programme ivoirien t'attendent sur Edukora.`,
      cta: "Continuer mes révisions",
    };
  }
  return {
    title: "Tes révisions t'attendent 📘",
    body: `Ça fait un moment que tu ne t'es pas connecté. Retrouve tous tes cours, quiz et exercices (programme ivoirien BAC/BEPC) et reprends ta lancée en quelques minutes.`,
    cta: "Reprendre mes révisions",
  };
}

export async function sendReactivation(user: ReactivationUser): Promise<{ ok: boolean; channel: string }> {
  const prenom = user.first_name?.trim() || user.last_name?.trim() || "cher élève";
  const step = user.reactivation_step ?? 0;
  const { title, body, cta } = stepCopy(step, user.streak ?? 0, user.xp ?? 0);

  await notify(user.user_id, title, body, "rocket_launch", "reactivation");

  const pushOk = (await sendPushToUser(user.user_id, {
    title,
    body,
    tag: `reactivation-${step}`,
  }).catch(() => 0)) > 0;

  let emailOk = false;
  if (user.email) {
    if (process.env.BREVO_REACTIVATION_TEMPLATE_ID) {
      emailOk = await sendBrevoTemplate(
        user.email,
        Number(process.env.BREVO_REACTIVATION_TEMPLATE_ID),
        { prenom, title, body, cta, track_url: TRACK_URL },
      );
    }
    if (!emailOk) {
      emailOk = await sendMail({
        to: user.email,
        subject: title,
        html: `
          <div style="font-family:system-ui,sans-serif;max-width:520px;margin:auto;padding:8px">
            <h2>${title}</h2>
            <p>Bonjour ${prenom},</p>
            <p>${body}</p>
            <a href="${TRACK_URL}" style="display:inline-block;background:#7c3aed;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:600">${cta}</a>
            <p style="color:#888;font-size:12px">Si tu ne souhaites plus recevoir ces rappels, tu peux te reconnecter et gérer tes préférences.</p>
          </div>`,
      });
    }
  }

  const nextStep = step + 1;
  await run(
    "UPDATE users SET reactivation_step = ?, last_reactivation_at = datetime('now') WHERE id = ?",
    nextStep,
    user.user_id,
  );
  const channel = emailOk ? "email" : pushOk ? "push" : "none";
  return { ok: emailOk || pushOk, channel };
}
