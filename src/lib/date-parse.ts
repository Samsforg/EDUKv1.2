// Parse robuste des timestamps renvoyés par SQLite ET PostgreSQL.
// Formats gérés :
//   SQLite  : "2026-08-24 10:30:32"            (UTC implicite)
//   PG      : "2026-08-24 10:30:32+00"         (offset sans deux-points)
//   PG      : "2026-08-24 10:30:32.123+00"
//   PG timestamptz JSON : "2026-08-24T10:30:32.000Z"
//   Date seule : "2026-08-24"
// Renvoie un Date valide, sinon null (jamais "Invalid Date").

export function parseDbDate(iso: string | null | undefined): Date | null {
  if (!iso || typeof iso !== "string") return null;
  let s = iso.trim();
  if (!s) return null;

  // Normalise l'espace séparateur en "T" si pas déjà ISO
  if (!s.includes("T")) s = s.replace(" ", "T");

  // Corrige les offsets PG du type "+00", "+0000", "-0230" → "+00:00"
  s = s.replace(/([+-]\d{2})$/, "$1:00").replace(/([+-]\d{2})(\d{2})$/, "$1:$2");

  // Si aucun fuseau ni Z : considérer UTC (comportement SQLite datetime('now'))
  if (!/[Zz]|[+-]\d{2}:\d{2}$/.test(s)) s += "Z";

  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}
