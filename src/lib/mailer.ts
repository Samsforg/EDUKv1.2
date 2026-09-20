import { sendMailSmtp } from "./smtp";
import { queryOne } from "@/lib/db";

const FROM_EMAIL = process.env.MAIL_FROM_EMAIL || "support@edukora.net";
const FROM_NAME = "EduKora";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://edukora.net";

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendMail(input: MailInput): Promise<boolean> {
  const useBrevo = process.env.MAIL_USE_BREVO === "1";
  if (process.env.SMTP_USER && process.env.SMTP_PASS && !useBrevo) {
    const okSmtp = await sendMailSmtp(input);
    if (okSmtp) return true;
    console.warn("[mailer] SMTP échoué, tentative via API Brevo...");
    if (process.env.BREVO_API_KEY) return sendMailViaApi(input);
    return false;
  }
  if (process.env.BREVO_API_KEY) {
    return sendMailViaApi(input);
  }
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return sendMailSmtp(input);
  }
  console.warn("[mailer] Aucun canal d'envoi configuré (BREVO_API_KEY ou SMTP) — email non envoyé.");
  return false;
}

async function sendMailViaApi(input: MailInput): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[mailer] BREVO_API_KEY non configurée — email non envoyé.");
    return false;
  }
  try {
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: FROM_NAME, email: FROM_EMAIL },
        to: [{ email: input.to }],
        subject: input.subject,
        htmlContent: input.html,
        ...(input.text ? { textContent: input.text } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[mailer] Brevo a répondu", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[mailer] erreur réseau:", e);
    return false;
  }
}

export function resetPasswordHtml(resetUrl: string): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px">
    <h2 style="color:#0047ab;margin-bottom:16px">R&eacute;initialisation de votre mot de passe</h2>
    <p>Bonjour,</p>
    <p>Vous avez demand&eacute; la r&eacute;initialisation de votre mot de passe EduKora.</p>
    <p style="margin:24px 0">
      <a href="${resetUrl}"
         style="background:#0047ab;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold">
        R&eacute;initialiser mon mot de passe
      </a>
    </p>
    <p>Ce lien est valable <strong>1 heure</strong>. Si vous n'&ecirc;tes pas &agrave; l'origine de cette demande, ignorez cet email.</p>
    <p style="color:#666;font-size:12px;margin-top:32px">&copy; EduKora — La plateforme d'apprentissage intelligente.</p>
  </div>`;
}

export interface ReceiptData {
  planName: string;
  amount: number;
  currency?: string;
  endAt?: string | null;
  reference?: string | null;
}

export function receiptHtml(d: ReceiptData): string {
  const amount = `${(d.amount ?? 0).toLocaleString("fr-FR")} ${d.currency || "FCFA"}`;
  const end = d.endAt ? new Date(d.endAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "—";
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px">
    <h2 style="color:#0047ab;margin-bottom:16px">Re&ccedil;u de paiement EduKora</h2>
    <p>Bonjour,</p>
    <p>Votre abonnement <strong>${d.planName || "EduKora Premium"}</strong> est actif. Merci de votre confiance !</p>
    <table style="width:100%;border-collapse:collapse;margin:24px 0;font-size:14px">
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666">Abonnement</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:bold;text-align:right">${d.planName || "—"}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666">Montant</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;font-weight:bold;text-align:right">${amount}</td>
      </tr>
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;color:#666">Prochaine &eacute;ch&eacute;ance</td>
        <td style="padding:10px 12px;border-bottom:1px solid #eee;text-align:right">${end}</td>
      </tr>
      ${d.reference ? `<tr>
        <td style="padding:10px 12px;color:#666">R&eacute;f&eacute;rence</td>
        <td style="padding:10px 12px;text-align:right;font-family:monospace;font-size:12px">${d.reference}</td>
      </tr>` : ""}
    </table>
    <p>Retrouvez vos fiches, quizzes et le tuteur IA Kora sur <a href="${APP_URL}" style="color:#0047ab;font-weight:bold">edukora.net</a>.</p>
    <p style="color:#666;font-size:12px;margin-top:32px">&copy; EduKora — La plateforme d'apprentissage intelligente.</p>
  </div>`;
}

export async function sendSubscriptionReceipt(userId: number, data: ReceiptData): Promise<boolean> {
  const user = await queryOne<{ email: string }>("SELECT email FROM users WHERE id = ?", userId);
  if (!user?.email) {
    console.warn(`[mailer] reçu non envoyé : pas d'email pour le user ${userId}`);
    return false;
  }
  return await sendMail({
    to: user.email,
    subject: `Reçu de paiement — ${data.planName || "EduKora Premium"}`,
    html: receiptHtml(data),
  });
}

export function welcomeHtml(firstName: string, referralCode: string): string {
  return `
  <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;padding:24px">
    <h2 style="color:#0047ab;margin-bottom:8px">Bienvenue sur Edukora, ${firstName} ! 🎉</h2>
    <p>Votre compte est créé. Vous pouvez dès maintenant réviser le BAC & BEPC avec nos fiches, quiz et le tuteur IA Kora.</p>
    <p style="margin:16px 0;padding:12px;background:#f0f6ff;border-radius:8px">Votre code de parrainage : <strong style="letter-spacing:0.12em">${referralCode}</strong> — partagez-le, gagnez <strong>+150 XP</strong> par filleul.</p>
    <p style="margin:24px 0"><a href="${APP_URL}/accueil-edukora" style="background:#0047ab;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:bold">Commencer à réviser</a></p>
    <p style="color:#666;font-size:12px;margin-top:32px">&copy; Edukora — La plateforme d'apprentissage intelligente.</p>
  </div>`;
}

export async function sendWelcomeEmail(userId: number): Promise<boolean> {
  const user = await queryOne<{ email: string; first_name: string; referral_code: string }>(
    "SELECT email, first_name, referral_code FROM users WHERE id = ?",
    userId
  );
  if (!user?.email) return false;
  return await sendMail({
    to: user.email,
    subject: `Bienvenue sur Edukora, ${user.first_name} !`,
    html: welcomeHtml(user.first_name, user.referral_code),
  });
}
