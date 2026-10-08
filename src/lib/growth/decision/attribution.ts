/**
 * P2.2 — lecture déterministe des propriétés d'attribution (§3, §4).
 *
 * Source de vérité : `analytics_events.props` (JSON), clés courtes émises
 * par `signupAttributionProps()` (P1.0) — `source`, `medium`, `campaign`,
 * `content`, `term`, `gclid`, `fbclid` — avec tolérance pour les alias
 * longs `utm_*` si un événement les porte. Aucune colonne SQL dédiée
 * n'est créée (§3).
 *
 * Normalisation : trim, chaîne vide → null, troncature à
 * MAX_ATTRIBUTION_VALUE_LEN (aligné P1.0), casse réduite pour les
 * comparaisons de canal. Fonctions pures : aucun accès base, aucun
 * appel réseau, aucune PII (7 clés blanchies + ref de parrainage).
 */

import type { AttributionCoverage, AttributionSourceType, InsightStatus } from "./types";
import { MIN_SAMPLE } from "./thresholds";

/** Longueur max d'une valeur (alignée sur MAX_VALUE_LEN de P1.0). */
export const MAX_ATTRIBUTION_VALUE_LEN = 120;

/** Modèle conceptuel §3 — lecture d'une seule attribution. */
export type AttributionData = {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  content: string | null;
  term: string | null;
  gclid: string | null;
  fbclid: string | null;
  ref: string | null;
};

export const EMPTY_ATTRIBUTION: AttributionData = {
  source: null,
  medium: null,
  campaign: null,
  content: null,
  term: null,
  gclid: null,
  fbclid: null,
  ref: null,
};

/** Whitelist : clés lues (forme courte P1.0 + alias longs tolérés). */
const SHORT_TO_FIELD: Record<string, keyof AttributionData> = {
  source: "source",
  medium: "medium",
  campaign: "campaign",
  content: "content",
  term: "term",
  gclid: "gclid",
  fbclid: "fbclid",
  ref: "ref",
  referral: "ref",
  referred_by: "ref",
};

const LONG_TO_FIELD: Record<string, keyof AttributionData> = {
  utm_source: "source",
  utm_medium: "medium",
  utm_campaign: "campaign",
  utm_content: "content",
  utm_term: "term",
};

/** Normalisation : trim, vide → null, troncature, casse réduite. */
export function normalizeAttrValue(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const trimmed = v.trim().toLowerCase();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_ATTRIBUTION_VALUE_LEN);
}

/**
 * Extrait l'attribution d'un props JSON brut (ou d'un objet déjà parsé).
 * Props absent / illisible / non JSON → toute l'attribution à null
 * (jamais d'exception, jamais de valeur inventée).
 */
export function parseAttributionProps(raw: unknown): AttributionData {
  let obj: Record<string, unknown> | null = null;
  if (typeof raw === "string") {
    if (!raw.trim()) return { ...EMPTY_ATTRIBUTION };
    try {
      const parsed: unknown = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        obj = parsed as Record<string, unknown>;
      }
    } catch {
      return { ...EMPTY_ATTRIBUTION };
    }
  } else if (raw && typeof raw === "object" && !Array.isArray(raw)) {
    obj = raw as Record<string, unknown>;
  }
  if (!obj) return { ...EMPTY_ATTRIBUTION };

  const out: AttributionData = { ...EMPTY_ATTRIBUTION };
  for (const [key, value] of Object.entries(obj)) {
    const field = SHORT_TO_FIELD[key] ?? LONG_TO_FIELD[key];
    if (!field) continue;
    const normalized = normalizeAttrValue(value);
    // First-touch : la première valeur rencontrée gagne (jamais écrasée
    // par une suivante sur la même ligne).
    if (normalized !== null && out[field] === null) out[field] = normalized;
  }
  return out;
}

/** Un inscrit est « attribué » s'il porte au moins un signal d'acquisition. */
export function isAttributed(a: AttributionData): boolean {
  return a.source !== null || a.gclid !== null || a.fbclid !== null || a.ref !== null;
}

/**
 * §4 — classification first-touch par priorité :
 *   1. UTM (utm_source présent)      → "utm"
 *   2. gclid / fbclid                → "paid_click"
 *   3. referral (ref/referred_by)    → "referral"
 *   4. sinon                         → "unknown"
 *
 * `direct` et `organic` ne sont PAS distinguables sans signal
 * first-party (aucun props de page_view ne porte l'information) :
 * la classe reste `unknown` — aucune supposition (§4, §12).
 */
export function classifySourceType(a: AttributionData): AttributionSourceType {
  if (a.source !== null) return "utm";
  if (a.gclid !== null || a.fbclid !== null) return "paid_click";
  if (a.ref !== null) return "referral";
  return "unknown";
}

/**
 * §5 — canal d'acquisition d'un inscrit :
 *   utm_source normalisé → le nom du canal ("facebook", "google", …)
 *   sinon gclid/fbclid   → "paid_click"
 *   sinon referral       → "referral"
 *   sinon                → "unknown"
 * Déterministe : mêmes props → même canal.
 */
export function deriveChannel(a: AttributionData): string {
  const type = classifySourceType(a);
  if (type === "utm") return normalizeAttrValue(a.source) ?? "unknown";
  if (type === "paid_click") return "paid_click";
  if (type === "referral") return "referral";
  return "unknown";
}

/**
 * §11 — couverture d'attribution : inscrits attribués / inscrits
 * identifiés. Dénominateur nul → coverageRate null + INSUFFICIENT_DATA
 * (jamais un 0 fabriqué).
 */
export function computeCoverage(attributed: number, unattributed: number): AttributionCoverage {
  const total = attributed + unattributed;
  if (total <= 0) {
    return {
      attributed: 0,
      unattributed: 0,
      coverageRate: null,
      status: "INSUFFICIENT_DATA",
      basis: "signups_identified",
    };
  }
  const coverageRate = attributed / total;
  const status: InsightStatus = total >= MIN_SAMPLE.segment ? "VALID" : "INSUFFICIENT_DATA";
  return { attributed, unattributed, coverageRate, status, basis: "signups_identified" };
}
