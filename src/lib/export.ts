import { query, queryOne } from "@/lib/db";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

export interface ClassExport {
  class_id: number;
  name: string;
  subject_name: string | null;
  grade_name: string | null;
  year: string | null;
  member_count: number;
  global: { attempts: number; avg_pct: number | null; best_pct: number | null; students: number };
  by_subject: { subject_name: string; attempts: number; avg_pct: number | null }[];
  by_quiz: {
    quiz_id: number;
    title: string;
    subject_name: string;
    attempts: number;
    avg_pct: number | null;
    best_pct: number | null;
    students: number;
  }[];
  by_assignment: {
    id: number;
    title: string;
    subject_name: string | null;
    deadline: string | null;
    max_score: number;
    submissions: number;
    graded: number;
    avg_score: number | null;
  }[];
  students: {
    first_name: string;
    last_name: string;
    email: string | null;
    class_level: string | null;
    joined_at: string;
    attempts: number;
    avg_pct: number | null;
    best_pct: number | null;
  }[];
}

export async function fetchClassExport(classId: number): Promise<ClassExport | null> {
  const cls = await queryOne<{
    id: number;
    teacher_id: number;
    name: string;
    subject_name: string | null;
    grade_name: string | null;
    year: string | null;
  }>(
    `SELECT c.id, c.teacher_id, c.name, c.year,
            s.name AS subject_name, g.name AS grade_name
     FROM classes c
     LEFT JOIN subjects s ON s.id = c.subject_id
     LEFT JOIN grades g ON g.id = c.grade_id
     WHERE c.id = ?`,
    classId,
  );
  if (!cls) return null;

  const members = await query<{ user_id: number }>(
    "SELECT user_id FROM class_students WHERE class_id = ?",
    classId,
  );
  const memberIds = members.map((m) => m.user_id);

  const globalRows = memberIds.length > 0
    ? await query<{ attempts: number; avg_pct: number | null; best_pct: number | null; students: number }>(
        `SELECT COUNT(*) AS attempts,
                ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct,
                MAX(ROUND(a.score * 100.0 / a.max_score)) AS best_pct,
                COUNT(DISTINCT a.user_id) AS students
         FROM quiz_attempts a
         WHERE a.user_id IN (${memberIds.map(() => "?").join(",")})`,
        ...memberIds,
      )
    : [];

  let bySubject: { subject_name: string; attempts: number; avg_pct: number | null }[] = [];
  let byQuiz: ClassExport["by_quiz"] = [];
  let byAssignment: ClassExport["by_assignment"] = [];
  let students: ClassExport["students"] = [];

  if (memberIds.length > 0) {
    const placeholders = memberIds.map(() => "?").join(",");

    bySubject = await query(
      `SELECT s.name AS subject_name,
              COUNT(*) AS attempts,
              ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct
       FROM quiz_attempts a
       JOIN quizzes q ON q.id = a.quiz_id
       JOIN subjects s ON s.id = q.subject_id
       WHERE a.user_id IN (${placeholders})
       GROUP BY s.id, s.name
       ORDER BY attempts DESC`,
      ...memberIds,
    );

    byQuiz = await query(
      `SELECT q.id AS quiz_id, q.title, s.name AS subject_name,
              COUNT(*) AS attempts,
              ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct,
              MAX(ROUND(a.score * 100.0 / a.max_score)) AS best_pct,
              COUNT(DISTINCT a.user_id) AS students
       FROM quiz_attempts a
       JOIN quizzes q ON q.id = a.quiz_id
       JOIN subjects s ON s.id = q.subject_id
       WHERE a.user_id IN (${placeholders})
       GROUP BY q.id, q.title, s.name
       ORDER BY attempts DESC`,
      ...memberIds,
    );

    byAssignment = await query(
      `SELECT a.id, a.title, a.deadline, a.max_score, s.name AS subject_name,
              COUNT(sub.assignment_id) AS submissions,
              SUM(CASE WHEN sub.score IS NOT NULL THEN 1 ELSE 0 END) AS graded,
              ROUND(AVG(sub.score), 2) AS avg_score
       FROM class_assignments a
       LEFT JOIN subjects s ON s.id = a.subject_id
       LEFT JOIN assignment_submissions sub ON sub.assignment_id = a.id
       WHERE a.class_id = ?
       GROUP BY a.id, a.title, a.deadline, a.max_score, s.name
       ORDER BY a.created_at DESC`,
      classId,
    );

    const studentStats = await query<{
      user_id: number;
      attempts: number;
      avg_pct: number | null;
      best_pct: number | null;
    }>(
      `SELECT a.user_id,
              COUNT(*) AS attempts,
              ROUND(AVG(a.score * 100.0 / a.max_score)) AS avg_pct,
              MAX(ROUND(a.score * 100.0 / a.max_score)) AS best_pct
       FROM quiz_attempts a
       WHERE a.user_id IN (${placeholders})
       GROUP BY a.user_id`,
      ...memberIds,
    );
    const byUser = new Map(studentStats.map((s) => [s.user_id, s]));

    const memberRows = await query<{
      user_id: number;
      first_name: string;
      last_name: string;
      email: string | null;
      class_level: string | null;
      joined_at: string;
    }>(
      `SELECT u.id AS user_id, u.first_name, u.last_name, u.email, u.class_level, cs.joined_at
       FROM class_students cs JOIN users u ON u.id = cs.user_id
       WHERE cs.class_id = ?
       ORDER BY u.last_name, u.first_name`,
      classId,
    );
    students = memberRows.map((m) => {
      const s = byUser.get(m.user_id);
      return { ...m, attempts: s?.attempts ?? 0, avg_pct: s?.avg_pct ?? null, best_pct: s?.best_pct ?? null };
    });
  }

  return {
    class_id: cls.id,
    name: cls.name,
    subject_name: cls.subject_name,
    grade_name: cls.grade_name,
    year: cls.year,
    member_count: memberIds.length,
    global: globalRows[0] ?? { attempts: 0, avg_pct: null, best_pct: null, students: 0 },
    by_subject: bySubject,
    by_quiz: byQuiz,
    by_assignment: byAssignment,
    students,
  };
}

function esc(v: unknown): string {
  const s = v == null ? "" : String(v);
  return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function row(cells: (string | number | null | undefined)[]): string {
  return cells.map(esc).join(";") + "\r\n";
}

export function buildClassCsv(data: ClassExport): string {
  const d = new Date().toLocaleString("fr-FR");
  const out: string[] = [];
  const label = [data.name, data.subject_name, data.grade_name, data.year].filter(Boolean).join(" · ") || "Classe";

  out.push(row(["Edukora - Statistiques de classe"]));
  out.push(row(["Classe", label]));
  out.push(row(["Date d'export", d]));
  out.push(row([]));

  out.push(row(["SYNTHÈSE"]));
  out.push(row(["Indicateur", "Valeur"]));
  out.push(row(["Élèves", data.member_count]));
  out.push(row(["Tentatives quiz", data.global.attempts]));
  out.push(row(["Élèves actifs", data.global.students]));
  out.push(row(["Moyenne classe (%)", data.global.avg_pct ?? "n/a"]));
  out.push(row(["Meilleur score (%)", data.global.best_pct ?? "n/a"]));
  out.push(row([]));

  out.push(row(["PAR MATIÈRE"]));
  out.push(row(["Matière", "Tentatives", "Moyenne (%)"]));
  if (data.by_subject.length === 0) out.push(row(["Aucune donnée"]));
  data.by_subject.forEach((s) => out.push(row([s.subject_name, s.attempts, s.avg_pct ?? "n/a"])));
  out.push(row([]));

  out.push(row(["PAR QUIZ"]));
  out.push(row(["Quiz", "Matière", "Tentatives", "Moyenne (%)", "Meilleur (%)", "Élèves"]));
  if (data.by_quiz.length === 0) out.push(row(["Aucune donnée"]));
  data.by_quiz.forEach((q) =>
    out.push(row([q.title, q.subject_name, q.attempts, q.avg_pct ?? "n/a", q.best_pct ?? "n/a", q.students])),
  );
  out.push(row([]));

  out.push(row(["PAR DEVOIR"]));
  out.push(row(["Devoir", "Matière", "Rendu le", "Remises", "Notées", "Moyenne"]));
  if (data.by_assignment.length === 0) out.push(row(["Aucun devoir"]));
  data.by_assignment.forEach((x) =>
    out.push(
      row([
        x.title,
        x.subject_name ?? "—",
        x.deadline?.slice(0, 10) ?? "—",
        x.submissions,
        x.graded,
        x.avg_score != null ? `${x.avg_score}/${x.max_score}` : "n/a",
      ]),
    ),
  );
  out.push(row([]));

  out.push(row(["PAR ÉLÈVE"]));
  out.push(row(["Nom", "Prénom", "Email", "Classe", "Rejoint le", "Tentatives", "Moyenne (%)", "Meilleur (%)"]));
  if (data.students.length === 0) out.push(row(["Aucun élève"]));
  data.students.forEach((s) =>
    out.push(
      row([
        s.last_name, s.first_name, s.email, s.class_level,
        s.joined_at?.slice(0, 10), s.attempts, s.avg_pct ?? "n/a", s.best_pct ?? "n/a",
      ]),
    ),
  );

  return "\uFEFF" + out.join("");
}

export async function buildClassPdf(data: ClassExport): Promise<Uint8Array> {
  const doc = new jsPDF();

  const label = [data.name, data.subject_name, data.grade_name, data.year].filter(Boolean).join(" · ") || "Classe";

  doc.setFontSize(16);
  doc.text("Statistiques de classe", 14, 16);
  doc.setFontSize(11);
  doc.text(label, 14, 24);
  doc.setFontSize(9);
  doc.text(`Export du ${new Date().toLocaleString("fr-FR")}`, 14, 30);

  const table = (options: Parameters<typeof autoTable>[1]): number => {
    autoTable(doc, options);
    return (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY;
  };

  doc.setFontSize(12);
  doc.text("Synthèse", 14, 38);
  const afterGlobal = table({
    startY: 40,
    head: [["Indicateur", "Valeur"]],
    body: [
      ["Élèves", String(data.member_count)],
      ["Tentatives quiz", String(data.global.attempts)],
      ["Élèves actifs", String(data.global.students)],
      ["Moyenne classe (%)", data.global.avg_pct != null ? String(data.global.avg_pct) : "n/a"],
      ["Meilleur score (%)", data.global.best_pct != null ? String(data.global.best_pct) : "n/a"],
    ],
    theme: "grid",
    headStyles: { fillColor: [30, 60, 120] },
  });

  doc.text("Par matière", 14, afterGlobal + 10);
  const afterSubject = table({
    startY: afterGlobal + 12,
    head: [["Matière", "Tentatives", "Moyenne (%)"]],
    body:
      data.by_subject.length === 0
        ? [["Aucune donnée", "", ""]]
        : data.by_subject.map((s) => [
            s.subject_name,
            String(s.attempts),
            s.avg_pct != null ? String(s.avg_pct) : "n/a",
          ]),
    theme: "grid",
    headStyles: { fillColor: [30, 60, 120] },
  });

  doc.text("Par quiz", 14, afterSubject + 10);
  const afterQuiz = table({
    startY: afterSubject + 12,
    head: [["Quiz", "Matière", "Tentatives", "Moyenne (%)", "Meilleur (%)", "Élèves"]],
    body:
      data.by_quiz.length === 0
        ? [["Aucune donnée", "", "", "", "", ""]]
        : data.by_quiz.map((q) => [
            q.title,
            q.subject_name,
            String(q.attempts),
            q.avg_pct != null ? String(q.avg_pct) : "n/a",
            q.best_pct != null ? String(q.best_pct) : "n/a",
            String(q.students),
          ]),
    theme: "grid",
    headStyles: { fillColor: [30, 60, 120] },
  });

  doc.text("Par devoir", 14, afterQuiz + 10);
  const afterAssignment = table({
    startY: afterQuiz + 12,
    head: [["Devoir", "Matière", "Rendu le", "Remises", "Notées", "Moyenne"]],
    body:
      data.by_assignment.length === 0
        ? [["Aucun devoir", "", "", "", "", ""]]
        : data.by_assignment.map((x) => [
            x.title,
            x.subject_name ?? "—",
            x.deadline?.slice(0, 10) ?? "-",
            String(x.submissions),
            String(x.graded),
            x.avg_score != null ? `${x.avg_score}/${x.max_score}` : "n/a",
          ]),
    theme: "grid",
    headStyles: { fillColor: [30, 60, 120] },
  });

  doc.text("Par élève", 14, afterAssignment + 10);
  table({
    startY: afterAssignment + 12,
    head: [["Nom", "Prénom", "Email", "Tentatives", "Moyenne (%)", "Meilleur (%)"]],
    body:
      data.students.length === 0
        ? [["Aucun élève", "", "", "", "", ""]]
        : data.students.map((s) => [
            s.last_name,
            s.first_name,
            s.email ?? "",
            String(s.attempts),
            s.avg_pct != null ? String(s.avg_pct) : "n/a",
            s.best_pct != null ? String(s.best_pct) : "n/a",
          ]),
    theme: "grid",
    headStyles: { fillColor: [30, 60, 120] },
  });

  return new Uint8Array(doc.output("arraybuffer"));
}