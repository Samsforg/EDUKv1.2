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