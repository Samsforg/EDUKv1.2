import {
  getAdminStats,
  getActivityFeed,
  getSubjectStats,
  getTrends,
  getAdminUsers,
  getContentOverview,
} from "./admin";

function esc(v: unknown): string {
  const s = v == null ? "" : String(v);
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function row(cells: (string | number | null | undefined)[]): string {
  return cells.map(esc).join(";") + "\r\n";
}

function section(lines: string[]): string {
  return lines.join("");
}

export function buildReportCsv(): string {
  const stats = getAdminStats();
  const users = getAdminUsers();
  const subjects = getSubjectStats();
  const trends = getTrends(14);
  const activity = getActivityFeed(50);
  const content = getContentOverview();

  const out: string[] = [];

  out.push(
    row(["Edukora - Rapport de la plateforme"]),
    row(["Date d'export", new Date().toLocaleString("fr-FR")]),
    row([]),
  );

  out.push(row(["SYNTHESE"]));
  out.push(
    row(["Indicateur", "Valeur"]),
    row(["Utilisateurs (total)", stats.users.total]),
    row(["Eleves", stats.users.students]),
    row(["Professeurs", stats.users.teachers]),
    row(["Parents", stats.users.parents]),
    row(["Admins", stats.users.admins]),
    row(["Experts", stats.users.experts]),
    row(["En ligne aujourd'hui", stats.online_today]),
    row(["Nouveaux inscrits (7 jours)", stats.new_week]),
    row(["Tentatives quiz", stats.attempts.quiz]),
    row(["Tentatives examens blancs", stats.attempts.exam]),
    row(["Score moyen quiz (%)", stats.engagement.avg_quiz_percent ?? "n/a"]),
    row(["Moyenne examens blancs (/20)", stats.engagement.avg_exam_over_20 ?? "n/a"]),
    row(["XP total communaute", stats.engagement.total_xp]),
    row(["Sujets forum", stats.forum.posts]),
    row(["Reponses forum", stats.forum.replies]),
    row(["Jumelages parent-enfant", stats.parent_links]),
    row(["Lecons", stats.content.lessons]),
    row(["Chapitres", stats.content.chapters]),
    row(["Quiz", stats.content.quizzes]),
    row(["Sujets d'examen", stats.content.papers]),
    row(["Questions", stats.content.questions]),
    row([]),
  );

  out.push(row(["UTILISATEURS"]));
  out.push(
    row(["ID", "Nom", "Prenom", "Email", "Telephone", "Role", "Classe", "Serie", "XP", "Streak", "Quiz termines", "Examens termines", "Posts forum", "Statut", "Inscrit le", "Derniere activite"]),
  );
  users.forEach((u) =>
    out.push(
      row([
        u.id,
        u.last_name,
        u.first_name,
        u.email,
        u.phone,
        u.role,
        u.class_level,
        u.serie_name,
        u.xp,
        u.streak,
        u.quiz_attempts,
        u.exam_attempts,
        u.forum_posts,
        u.blocked ? "Bloque" : u.online ? "En ligne" : "Actif",
        u.created_at?.slice(0, 10),
        u.last_active?.slice(0, 10),
      ]),
    ),
  );
  out.push(row([]));

  out.push(row(["PERFORMANCE PAR MATIERE"]));
  out.push(
    row(["Matiere", "Quiz", "Sujets", "Tentatives quiz", "Tentatives examen", "Moyenne quiz (%)", "Moyenne examen (/20)"]),
  );
  subjects.forEach((s) =>
    out.push(
      row([s.name, s.quizzes, s.papers, s.quiz_attempts, s.exam_attempts, s.avg_quiz_percent ?? "n/a", s.avg_exam_over_20 ?? "n/a"]),
    ),
  );
  out.push(row([]));

  out.push(row(["INVENTAIRE PAR MATIERE"]));
  out.push(
    row(["Matiere", "Chapitres", "Lecons", "Quiz", "Sujets", "Questions"]),
  );
  content.subjects.forEach((s) =>
    out.push(row([s.name, s.chapters, s.lessons, s.quizzes, s.papers, s.questions])),
  );
  out.push(row([]));

  out.push(row(["TENDANCES 14 JOURS"]));
  out.push(row(["Date", "Inscriptions", "Tentatives quiz", "Tentatives examen"]));
  trends.forEach((t) => out.push(row([t.date, t.registrations, t.quiz_attempts, t.exam_attempts])));
  out.push(row([]));

  out.push(row(["ACTIVITE RECENTE (50 dernieres)"]));
  out.push(row(["Type", "Utilisateur", "Intitule", "Detail", "Date"]));
  activity.forEach((a) => out.push(row([a.kind, a.user_name, a.label, a.detail, a.created_at])));

  return "\uFEFF" + out.join("");
}
