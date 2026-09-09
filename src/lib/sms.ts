import { queryOne } from "./db";

const AT_BASE = process.env.AFRICASTALKING_BASE_URL || "https://api.africastalking.com/version1";
const AT_API_KEY = process.env.AFRICASTALKING_API_KEY || "";
const AT_USERNAME = process.env.AFRICASTALKING_USERNAME || "sandbox";
const SMS_FROM = process.env.AFRICASTALKING_SENDER_ID || "Edukora";

export interface SmsResult {
  ok: boolean;
  recipients?: number;
  error?: string;
}

export async function sendSms(to: string, message: string): Promise<SmsResult> {
  if (!AT_API_KEY) {
    console.warn("[sms] AFRICASTALKING_API_KEY non configuré — SMS ignoré");
    return { ok: false, error: "SMS non configuré" };
  }

  const phone = normalizePhone(to);

  try {
    const res = await fetch(`${AT_BASE}/messaging`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        to: phone,
        from: SMS_FROM,
        message,
      }).toString(),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data.SMSMessageData?.Recipients?.[0]?.status === "Failed") {
      const errMsg = data.SMSMessageData?.Recipients?.[0]?.messageId
        ? "Échec envoi SMS"
        : data.errorMessage || "Erreur inconnue";
      console.error("[sms] échec:", errMsg);
      return { ok: false, error: errMsg };
    }

    const recipients = data.SMSMessageData?.Recipients?.length ?? 1;
    return { ok: true, recipients };
  } catch (err: unknown) {
    console.error("[sms] exception:", err instanceof Error ? err.message : err);
    return { ok: false, error: err instanceof Error ? err.message : "Erreur réseau" };
  }
}

export async function sendBulkSms(phones: string[], message: string): Promise<SmsResult> {
  if (!AT_API_KEY) return { ok: false, error: "SMS non configuré" };
  if (phones.length === 0) return { ok: true, recipients: 0 };

  const normalized = phones.map(normalizePhone);

  try {
    const res = await fetch(`${AT_BASE}/messaging`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        apiKey: AT_API_KEY,
        Accept: "application/json",
      },
      body: new URLSearchParams({
        username: AT_USERNAME,
        to: normalized.join(","),
        from: SMS_FROM,
        message,
      }).toString(),
    });

    const data = await res.json().catch(() => ({}));
    const recipients = data.SMSMessageData?.Recipients?.length ?? 0;
    return { ok: res.ok, recipients };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : "Erreur réseau" };
  }
}

export async function sendSubscriptionReminder(userId: number): Promise<boolean> {
  const user = await queryOne<{ phone: string | null; first_name: string }>(
    "SELECT phone, first_name FROM users WHERE id = ?",
    userId,
  );
  if (!user?.phone) return false;

  const msg = `Edukora: Bonjour ${user.first_name}, ton abonnement premium arrive à expiration. Renouvelle pour continuer à profiter de tout le contenu !`;
  const result = await sendSms(user.phone, msg);
  return result.ok;
}

export async function sendExamReminder(phone: string, firstName: string, subject: string): Promise<boolean> {
  const msg = `Edukora: Rappel — session de révision ${subject} prévue ce soir. Prépare-toi !`;
  const result = await sendSms(phone, msg);
  return result.ok;
}

export async function sendNewQuizNotification(phone: string, firstName: string, subject: string): Promise<boolean> {
  const msg = `Edukora: Nouveau quiz ${subject} disponible ! Teste tes connaissances maintenant.`;
  const result = await sendSms(phone, msg);
  return result.ok;
}

export async function sendResultsAlert(phone: string, firstName: string, score: number, subject: string): Promise<boolean> {
  const msg = `Edukora: Bravo ${firstName} ! Tu as obtenu ${score}/20 en ${subject}. Continue comme ça !`;
  const result = await sendSms(phone, msg);
  return result.ok;
}

function normalizePhone(phone: string): string {
  let p = phone.replace(/[\s\-().]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  if (p.startsWith("0") && !p.startsWith("+")) p = "+225" + p;
  if (!p.startsWith("+")) p = "+" + p;
  return p;
}
