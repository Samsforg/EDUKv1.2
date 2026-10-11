import crypto from "node:crypto";

// ============================================================
// GA4 Measurement Protocol (événements serveur)
// Utilisé pour l'événement `purchase` (webhook GeniusPay),
// que le navigateur ne peut pas garantir.
// ============================================================

const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const GA4_API_SECRET = process.env.GA4_API_SECRET ?? "";

function isEnabled(): boolean {
  return GA4_MEASUREMENT_ID !== "" && GA4_API_SECRET !== "";
}

function randomClientId(): string {
  const cid = crypto.randomBytes(8).readBigUInt64BE(0).toString();
  const gid = Date.now();
  return `${cid}.${gid}`;
}

export interface Ga4PurchaseParams {
  clientId: string | null;
  value: number;
  currency: string;
  planName: string | null;
  transactionId: string;
  userId: number;
  promo?: string | null;
}

/**
 * Envoie l'événement `purchase` vers GA4 via Measurement Protocol.
 * Ne fait rien (log uniquement) si GA4_API_SECRET n'est pas configuré.
 */
export async function sendGa4Purchase(p: Ga4PurchaseParams): Promise<boolean> {
  if (!isEnabled()) {
    console.log(`[ga4] purchase skip (GA4_API_SECRET non configuré) — ref ${p.transactionId}`);
    return false;
  }

  const clientId = p.clientId && p.clientId.includes(".") ? p.clientId : randomClientId();
  const payload = {
    client_id: clientId,
    user_id: String(p.userId),
    currency: p.currency || "XOF",
    value: p.value,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: p.transactionId,
          value: p.value,
          currency: p.currency || "XOF",
          user_id: String(p.userId),
          items: [
            {
              item_id: p.transactionId,
              item_name: p.planName ?? "Abonnement Edukora",
              quantity: 1,
              price: p.value,
              promotion_name: p.promo ?? undefined,
            },
          ],
        },
      },
    ],
  };

  try {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(GA4_MEASUREMENT_ID)}&api_secret=${encodeURIComponent(GA4_API_SECRET)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn(`[ga4] purchase ref ${p.transactionId} rejeté (${res.status}): ${await res.text().catch(() => "")}`);
      return false;
    }
    console.log(`[ga4] purchase envoyé ref ${p.transactionId} (${p.value} ${p.currency}) clientId ${clientId}`);
    return true;
  } catch (err) {
    console.warn(`[ga4] purchase ref ${p.transactionId} échec réseau:`, err);
    return false;
  }
}

// ------------------------------------------------------------------
// P2.7.8 — signup_completed via Measurement Protocol
// ------------------------------------------------------------------

export interface Ga4SignupCompletedParams {
  userId: number;
  role: string;
  method: string;
  attribution?: Record<string, string>;
}

/**
 * P2.7.8 — Envoie `signup_completed` vers GA4 via Measurement Protocol.
 * Appelé UNIQUEMENT côté serveur après confirmation que maybeRecordSignup
 * a réellement créé une ligne (idempotence en amont).
 *
 * Consentement : l'appelant doit avoir vérifié le consentement analytics
 * (cookie edukora_consent.analytics) avant d'invoquer cette fonction.
 * Cette fonction ne vérifie pas le consentement elle-même.
 *
 * Identité : un client_id aléatoire est généré. Aucun lien avec une
 * session anonyme antérieure n'est créé (pas de rapprochement
 * anonyme→identifié). user_id est transmis comme dimension interne.
 *
 * Jamais bloquant : un échec GA4 ne doit pas faire échouer l'inscription.
 */
export async function sendGa4SignupCompleted(p: Ga4SignupCompletedParams): Promise<boolean> {
  // Lecture à l'exécution (pas au import) pour permettre le test et le
  // rechargement de configuration sans redémarrage.
  const measurementId = process.env.NEXT_PUBLIC_GA_ID ?? "";
  const apiSecret = process.env.GA4_API_SECRET ?? "";
  if (!measurementId || !apiSecret) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[ga4] signup_completed skip (GA4_API_SECRET non configuré) — user ${p.userId}`);
    }
    return false;
  }

  const clientId = randomClientId();
  const params: Record<string, string | number> = {
    role: p.role,
    method: p.method,
  };
  // Attribution (UTM, etc.) — déjà sanitisée par sanitizeAttribution côté appelant
  if (p.attribution) {
    for (const [k, v] of Object.entries(p.attribution)) {
      if (typeof v === "string" && v.length <= 120) params[k] = v;
    }
  }

  const payload = {
    client_id: clientId,
    user_id: String(p.userId),
    events: [
      {
        name: "signup_completed",
        params,
      },
    ],
  };

  try {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      console.warn(`[ga4] signup_completed user ${p.userId} rejeté (${res.status})`);
      return false;
    }
    if (process.env.NODE_ENV === "development") {
      console.warn(`[ga4] signup_completed envoyé user ${p.userId}`);
    }
    return true;
  } catch (err) {
    console.warn(`[ga4] signup_completed user ${p.userId} échec:`, err instanceof Error ? err.message : err);
    return false;
  }
}