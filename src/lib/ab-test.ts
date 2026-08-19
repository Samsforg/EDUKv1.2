export type PricingVariant = "A" | "B";

export const AB_PRICING_COOKIE = "ab_pricing";
export const AB_PRICING_MAX_AGE = 15552000;

export function isPricingAbEnabled(): boolean {
  return process.env.AB_PRICING !== "off";
}

export function isValidPricingVariant(v: string | undefined | null): v is PricingVariant {
  return v === "A" || v === "B";
}

export function assignPricingVariant(): PricingVariant {
  return Math.random() < 0.5 ? "A" : "B";
}

export function parsePricingVariant(raw: string | undefined | null, fallback: PricingVariant = "A"): PricingVariant {
  return isValidPricingVariant(raw) ? raw : fallback;
}

export function getClientPricingVariant(): PricingVariant | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${AB_PRICING_COOKIE}=`));
  if (!m) return null;
  const v = m.split("=")[1];
  return isValidPricingVariant(v) ? v : null;
}