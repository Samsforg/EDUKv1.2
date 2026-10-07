/**
 * P1.0 — Attribution acquisition first-party (contract §5-§7).
 *
 * Capture des paramètres d'acquisition au premier contact (landing) :
 * utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid.
 *
 * - First-touch : la première valeur capturée dans l'onglet gagne ; les
 *   captures suivantes ne font qu'ajouter des clés absentes.
 * - `ref` (parrainage) est VOLONTAIREMENT exclu d'ici : il suit son propre
 *   parcours validé côté serveur (/api/auth/register) — jamais mélangé aux
 *   UTM (contract §5).
 * - Aucune PII : liste blanche stricte de 7 clés, valeurs tronquées ; rien
 *   n'est persisté sur le compte (pas de colonne users.utm_*).
 * - Persistance sessionStorage (onglet courant) : suffit au parcours
 *   landing → inscription ; la jointure conversion se fait ensuite par
 *   user_id sur l'événement signup_completed.
 */

export const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
] as const;

export type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type StoredAttribution = Partial<Record<AttributionKey, string>>;

const STORAGE_KEY = "edukora_attr";
const MAX_VALUE_LEN = 120;

/** Extrait la whitelist d'attribution d'une query string (?a=1&b=2 ou a=1). */
export function parseAttribution(search: string): StoredAttribution {
  const out: StoredAttribution = {};
  if (!search) return out;
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    for (const key of ATTRIBUTION_KEYS) {
      const v = params.get(key)?.trim();
      if (v) out[key] = v.slice(0, MAX_VALUE_LEN);
    }
  } catch {
    // query string illisible — aucune attribution (jamais d'erreur jetée)
  }
  return out;
}

function storage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.sessionStorage ?? null;
  } catch {
    return null; // stockage refusé (mode privé strict)
  }
}

/** Relecture du first-touch stocké ({} hors navigateur ou si vide). */
export function getStoredAttribution(): StoredAttribution {
  const s = storage();
  if (!s) return {};
  try {
    const raw = s.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: StoredAttribution = {};
    for (const key of ATTRIBUTION_KEYS) {
      const v = parsed[key];
      if (typeof v === "string" && v) out[key] = v.slice(0, MAX_VALUE_LEN);
    }
    return out;
  } catch {
    return {};
  }
}

/**
 * Capture first-touch depuis l'URL courante. N'écrase jamais une valeur
 * déjà stockée ; les clés manquantes sont complétées.
 */
export function captureLandingAttribution(): StoredAttribution {
  const s = storage();
  if (!s || typeof window === "undefined") return {};
  const incoming = parseAttribution(window.location.search);
  const stored = getStoredAttribution();
  if (Object.keys(incoming).length === 0) return stored;
  const merged: StoredAttribution = { ...incoming, ...stored };
  try {
    s.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch {
    // quota — la valeur courante reste lue depuis incoming à l'usage
  }
  return merged;
}

/**
 * Props à fusionner dans `signup_completed` : mappées sur la taxonomie
 * existante du contrat (source/medium/campaign + content/term + clics).
 * Retourne uniquement les clés réellement présentes (objet vide si rien).
 */
export function signupAttributionProps(): Record<string, string> {
  const a = getStoredAttribution();
  const out: Record<string, string> = {};
  if (a.utm_source) out.source = a.utm_source;
  if (a.utm_medium) out.medium = a.utm_medium;
  if (a.utm_campaign) out.campaign = a.utm_campaign;
  if (a.utm_content) out.content = a.utm_content;
  if (a.utm_term) out.term = a.utm_term;
  if (a.gclid) out.gclid = a.gclid;
  if (a.fbclid) out.fbclid = a.fbclid;
  return out;
}
