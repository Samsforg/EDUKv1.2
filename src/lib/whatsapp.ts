const INSTANCE = process.env.WHATSAPP_INSTANCE;
const API_URL = process.env.WHATSAPP_API_URL;
const API_KEY = process.env.WHATSAPP_API_KEY;
const ADMIN_GROUP = process.env.WHATSAPP_REPORT_GROUP;

export const whatsappConfigured = !!(INSTANCE && API_URL && API_KEY);

export async function sendWhatsappText(text: string, target: string = ""): Promise<boolean> {
  if (!whatsappConfigured) return false;
  const chatId = target?.trim() || ADMIN_GROUP?.trim();
  if (!chatId) {
    console.warn("[whatsapp] Aucune cible (WHATSAPP_REPORT_GROUP) — message non envoyé.");
    return false;
  }
  try {
    const res = await fetch(`${API_URL}/message/sendText/${INSTANCE}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "apikey": API_KEY! },
      body: JSON.stringify({
        number: chatId.replace(/[^\d]/g, ""),
        text,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error("[whatsapp] Evolution API", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[whatsapp] erreur envoi:", e);
    return false;
  }
}