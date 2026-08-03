const GP_BASE = process.env.GENIUSPAY_API_BASE ?? "https://pay.genius.ci/api/v1/merchant";

function gpFetch(path: string, init?: RequestInit) {
  const apiKey = process.env.GENIUSPAY_API_KEY;
  if (!apiKey) throw new Error("GENIUSPAY_API_KEY non configuré");
  return fetch(`${GP_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      ...(init?.headers ?? {}),
    },
  });
}

function normalizePhone(phone: string): string {
  const cleaned = phone.replace(/[^+\d]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  const countryCode = process.env.GENIUSPAY_COUNTRY_CODE ?? "225";
  return `+${countryCode}${cleaned}`;
}

export async function gpCreateSubscription(params: {
  phone: string;
  name: string;
  planName: string;
  amount: number;
  billingCycle: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
  trialDays?: number;
}) {
  const res = await gpFetch("/subscriptions", {
    method: "POST",
    body: JSON.stringify({
      customer: { phone: normalizePhone(params.phone), name: params.name },
      plan_name: params.planName,
      amount: params.amount,
      billing_cycle: params.billingCycle,
      ...(params.trialDays ? { trial_days: params.trialDays } : {}),
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[geniuspay] create subscription failed:", res.status, JSON.stringify(json));
    throw new Error(json?.error?.message ?? "Échec de création de l'abonnement");
  }
  return json?.data as {
    id: string;
    status: string;
    next_billing_date?: string;
  };
}

export async function gpGetSubscriptionStatus(uuid: string) {
  const res = await gpFetch(`/subscriptions/${encodeURIComponent(uuid)}/status`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[geniuspay] status failed:", res.status, JSON.stringify(json));
    throw new Error(json?.error?.message ?? "Impossible de vérifier le statut");
  }
  return json?.data as {
    is_active: boolean;
    status: string;
    status_label?: string;
    next_billing_date?: string;
    days_until_next_billing?: number;
    is_trialing?: boolean;
  };
}

export async function gpCancelSubscription(uuid: string, cancelImmediately = false, reason?: string) {
  const res = await gpFetch(`/subscriptions/${encodeURIComponent(uuid)}/cancel`, {
    method: "POST",
    body: JSON.stringify({
      cancel_immediately: cancelImmediately,
      ...(reason ? { reason } : {}),
    }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.error("[geniuspay] cancel failed:", res.status, JSON.stringify(json));
    throw new Error(json?.error?.message ?? "Échec de l'annulation");
  }
  return json?.data;
}
