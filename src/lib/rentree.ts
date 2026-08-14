export const RENTREE_PROMO_CODE = "RENTREE30";
export const RENTREE_PROMO_PERCENT = 30;
export const RENTREE_PROMO_MAX_USES = 2000;
export const RENTREE_PROMO_ENDS_AT = "2026-09-30";

export function isRentreePromoActive(date = new Date()): boolean {
  return date.toISOString().slice(0, 10) <= RENTREE_PROMO_ENDS_AT;
}