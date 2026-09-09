/**
 * Brevo (ex Sendinblue) — client centralisé Edukora
 * Utilisé par mailer.ts (transactionnel) et newsletter (contacts).
 * 100% gratuit jusqu'à 300 emails/jour en Brevo Free.
 */

const BREVO_BASE = "https://api.brevo.com/v3";

function apiKey(): string | null {
  return process.env.BREVO_API_KEY ?? null;
}

async function brevoFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const key = apiKey();
  if (!key) throw new Error("BREVO_API_KEY non configurée");
  return fetch(`${BREVO_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "api-key": key,
      ...(init.headers ?? {}),
    },
  });
}

export interface BrevoContact {
  email: string;
  attributes?: Record<string, string | number | boolean>;
  listIds?: number[];
  updateEnabled?: boolean;
}

export async function upsertContact({ email, attributes, listIds, updateEnabled = true }: BrevoContact): Promise<boolean> {
  const key = apiKey();
  if (!key) {
    console.warn("[brevo] BREVO_API_KEY manquante — contact non synchronisé");
    return false;
  }
  try {
    const res = await brevoFetch("/contacts", {
      method: "POST",
      body: JSON.stringify({
        email,
        attributes,
        listIds,
        updateEnabled,
      }),
    });
    if (res.status === 204 || res.ok) return true;
    // 400 si déjà existant mais updateEnabled false — on tente l'update
    const text = await res.text().catch(() => "");
    console.warn("[brevo] upsert contact", res.status, text);
    return false;
  } catch (e) {
    console.error("[brevo] upsertContact erreur:", e);
    return false;
  }
}

export async function addNewsletterContact(email: string, source = "home"): Promise<boolean> {
  const listId = process.env.BREVO_NEWSLETTER_LIST_ID ? Number(process.env.BREVO_NEWSLETTER_LIST_ID) : undefined;
  return upsertContact({
    email: email.trim().toLowerCase(),
    attributes: { SOURCE: source },
    listIds: listId ? [listId] : undefined,
  });
}

export async function sendBrevoTemplate(to: string, templateId: number, params: Record<string, string | number> = {}): Promise<boolean> {
  const key = apiKey();
  if (!key) return false;
  try {
    const res = await brevoFetch("/smtp/email", {
      method: "POST",
      body: JSON.stringify({
        to: [{ email: to }],
        templateId,
        params,
      }),
    });
    if (!res.ok) {
      console.error("[brevo] template", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (e) {
    console.error("[brevo] sendBrevoTemplate erreur:", e);
    return false;
  }
}

export async function deleteContact(email: string): Promise<boolean> {
  const key = apiKey();
  if (!key) return false;
  try {
    const res = await brevoFetch(`/contacts/${encodeURIComponent(email)}`, { method: "DELETE" });
    return res.ok || res.status === 204;
  } catch {
    return false;
  }
}

export function isBrevoConfigured(): boolean {
  return !!apiKey();
}
