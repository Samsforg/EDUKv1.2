/**
 * P1.0 — Attribution acquisition first-party (contract §5-§7).
 *
 * Capture des paramètres d'acquisition au premier contact (landing) :
 * utm_source, utm_medium, utm_campaign, utm_content, utm_term, gclid, fbclid.
 *
 * - First-touch : la première valeur capturée dans l'onglet gagne ; les
 *   captures suivantes ne font qu'ajouter les clés absentes.
 * - `ref` (parrainage) est VOLONTAIREMENT exclu d'ici : il suit son propre
 *   parcours validé côté serveur (/api/auth/register) — jamais mélangé aux
 *   UTM (contract §5).
 * - Aucune PII : liste blanche stricte de 7 clés, valeurs tronquées ; rien
 *   n'est persisté sur le compte (pas de colonne users.utm_*).
 * - Persistance sessionStorage (onglet courant) : suffit au parcours
 *   landing → inscription ; la jointure conversion se fait ensuite par
 *   user_id sur l'événement signup_completed.
 * - P2.5.4 — gclid/fbclid (identifiants publicitaires) ne sont capturés
 *   que si le consentement marketing est accordé (cookie edukora_consent).
 *   Les UTM restent capturés (analytics first-party).
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

/** P2.5.4 — clés soumises au consentement marketing (identifiants publicitaires). */
const MARKETING_CONSENT_KEYS = new Set<AttributionKey>(["gclid", "fbclid"]);

const STORAGE_KEY = "edukora_attr";
const MAX_VALUE_LEN = 120;

/** P2.5.4 — lit le consentement marketing depuis le cookie `edukora_consent`. */
function hasMarketingConsent(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const match = document.cookie.match(/(?:^|; )edukora_consent=([^;]*)/);
    if (!match) return false;
    const prefs = JSON.parse(decodeURIComponent(match[1])) as { marketing?: boolean };
    return prefs.marketing === true;
  } catch {
    return false;
  }
}

/** Extrait la whitelist d'attribution d'une query string (?a=1&b=2 ou a=1). */
export function parseAttribution(search: string): StoredAttribution {
  const out: StoredAttribution = {};
  if (!search) return out;
  const marketingOk = hasMarketingConsent();
  try {
    const params = new URLSearchParams(search.startsWith("?") ? search.slice(1) : search);
    for (const key of ATTRIBUTION_KEYS) {
      // P2.5.4 — identifiants publicitaires soumis au consentement marketing.
      if (MARKETING_CONSENT_KEYS.has(key) && !marketingOk) continue;
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
  const marketingOk = hasMarketingConsent();
  try {
    const raw = s.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const out: StoredAttribution = {};
    for (const key of ATTRIBUTION_KEYS) {
      // P2.5.4 — identifiants publicitaires soumis au consentement marketing
      // à la relecture aussi (retrait de consentement respecté).
      if (MARKETING_CONSENT_KEYS.has(key) && !marketingOk) continue;
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
