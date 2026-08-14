// Dates des sessions officielles BAC / BEPC en Côte d'Ivoire.
// Mettre à jour ici chaque année (début des épreuves écrites).
// La session 2027 est ciblée (cf. écran bienvenue). Si la date est passée,
// on bascule automatiquement sur la session suivante.

export type ExamKind = "BAC" | "BEPC";

interface ExamDateConfig {
  month: number; // 0-based (5 = juin, 6 = juillet)
  day: number;
}

export const EXAM_DATES: Record<ExamKind, ExamDateConfig> = {
  BAC: { month: 6, day: 5 }, // 5 juillet
  BEPC: { month: 5, day: 21 }, // 21 juin
};

export interface ExamCountdownInfo {
  kind: ExamKind;
  date: Date;
  days: number;
  passed: boolean;
}

/** Prochaine date de session pour un examen donné (rollover auto si passée). */
export function nextExamDate(kind: ExamKind, now = new Date()): ExamCountdownInfo {
  const { month, day } = EXAM_DATES[kind];
  let date = new Date(now.getFullYear(), month, day, 8, 0, 0, 0);
  if (date.getTime() <= now.getTime()) {
    date = new Date(now.getFullYear() + 1, month, day, 8, 0, 0, 0);
  }
  const days = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  return { kind, date, days, passed: false };
}

const FR_MONTHS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

/** Date lisible en français, ex. « 5 juillet 2027 ». */
export function formatExamDate(date: Date): string {
  return `${date.getDate()} ${FR_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
