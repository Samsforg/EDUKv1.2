/**
 * P2.4 — dates UTC pour fenêtres de mesure (aucune dépendance externe).
 * Mêmes conventions que `decision/data.ts` : jours `YYYY-MM-DD` en UTC,
 * comparaison lexicographique sur `created_at` textuel (SQLite `datetime`
 * et PG `to_char` produit le même format — cf. contrats P1.x).
 */

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

export function isValidDay(day: string): boolean {
  if (!DAY_RE.test(day)) return false;
  const d = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === day;
}

export function utcDay(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function addDays(day: string, days: number): string {
  const d = new Date(`${day}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Partie jour d'un horodatage `YYYY-MM-DD HH:MM:SS` (ou ISO). */
export function dayOfTimestamp(ts: string): string | null {
  const part = ts.slice(0, 10);
  return isValidDay(part) ? part : null;
}

/** Jours civils entre deux jours (b - a), signé. */
export function daysBetween(a: string, b: string): number {
  const da = new Date(`${a}T00:00:00Z`).getTime();
  const db = new Date(`${b}T00:00:00Z`).getTime();
  return Math.round((db - da) / 86400000);
}

/** Bornes textuelles `[début, lendemain[` — même convention que `decision/data.ts`. */
export function dayStart(date: string): string {
  return `${date} 00:00:00`;
}
