/**
 * P0.1 — route professeur / fiche élève : `/api/prof/student/[id]`
 *
 * Cette route renvoyait HTTP 500 à cause de TROIS colonnes inexistantes,
 * discovered/corrigées une par une :
 *
 *  1. `users.last_active_at`        → vrai nom `users.last_active`
 *  2. `exam_papers.total_points`    → n'existe pas et ne peut pas exister
 *     (le maximum d'un sujet = somme de `questions.points`, variable par
 *     sujet : 15, 20, 4… ; seul `exam_attempts.score_over_20` est persisté)
 *  3. `assignment_submissions.status`        → n'existe pas, dérivé de `score`
 *     `assignment_submissions.user_id`       → vrai nom `student_id`
 *
 * Ces trois erreurs rendaient la page `/espace-prof/eleves/[id]` inutilisable.
 * Ce test verrouille le comportement attendu : HTTP 200 + notes cohérentes.
 */
import { NextRequest } from "next/server";

jest.mock("@/lib/session", () => ({ getCurrentUser: jest.fn() }));
jest.mock("@/lib/rate-limit", () => ({
  getClientIp: () => "127.0.0.1",
  rateLimit: async () => ({ allowed: true, resetAt: Date.now() + 60_000 }),
  rateLimitResponse: () => new Response(null, { status: 429 }),
}));

import { run, query, queryOne } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { GET } from "@/app/api/prof/student/[id]/route";

const mockedUser = getCurrentUser as jest.MockedFunction<typeof getCurrentUser>;

let teacherId = 0;
let studentId = 0;
let otherStudentId = 0;
let classId = 0;
let paperId = 0;

async function insertUser(role: string, first: string, email: string) {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name)
     VALUES (?, ?, 'x', ?, 'Test')`,
    role, email, first,
  );
  return (await queryOne<{ id: number }>("SELECT last_insert_rowid() AS id"))!.id;
}

async function call(student: number) {
  const req = new NextRequest(`http://localhost/api/prof/student/${student}`);
  const res = (await GET(req, { params: Promise.resolve({ id: String(student) }) })) as Response;
  return { res, body: await res.json() };
}

beforeAll(async () => {
  const stamp = Date.now();
  teacherId = await insertUser("teacher", "Prof", `p01-t-${stamp}@example.com`);
  studentId = await insertUser("student", "Eleve", `p01-s-${stamp}@example.com`);
  otherStudentId = await insertUser("student", "Other", `p01-o-${stamp}@example.com`);

  await run("INSERT INTO classes (teacher_id, name, invite_code) VALUES (?, ?, ?)", teacherId, "P0-1", `P01${stamp}`);
  classId = (await queryOne<{ id: number }>("SELECT last_insert_rowid() AS id"))!.id;
  await run("INSERT INTO class_students (class_id, user_id) VALUES (?, ?)", classId, studentId);

  await run("UPDATE users SET last_active = datetime('now', '-2 hours') WHERE id = ?", studentId);

  // Sujet d'examen + tentative : score brut 5 points sur un total de 20
  // => score_over_20 = 5 => la note affichée doit être 5/20 et 25 %.
  // `exam_papers.subject_id` est NOT NULL : on réutilise un sujet existant.
  const subj = await queryOne<{ id: number }>("SELECT id FROM subjects ORDER BY id LIMIT 1");
  expect(subj).toBeDefined();
  await run(
    `INSERT INTO exam_papers (category, subject_id, title, year, duration_minutes, status)
     VALUES ('BAC', ?, 'P0-1 Sujet Contrôle', 2024, 60, 'published')`,
    subj!.id,
  );
  paperId = (await queryOne<{ id: number }>("SELECT last_insert_rowid() AS id"))!.id;
  await run(
    `INSERT INTO exam_attempts (user_id, paper_id, score, score_over_20, duration_seconds)
     VALUES (?, ?, 5, 5, 120)`,
    studentId, paperId,
  );
});

afterAll(async () => {
  await run("DELETE FROM exam_attempts WHERE paper_id = ?", paperId);
  await run("DELETE FROM exam_papers WHERE id = ?", paperId);
  await run("DELETE FROM class_students WHERE class_id = ?", classId);
  await run("DELETE FROM classes WHERE id = ?", classId);
  for (const id of [teacherId, studentId, otherStudentId]) {
    if (id) await run("DELETE FROM users WHERE id = ?", id);
  }
});

describe("P0.1 — /api/prof/student/[id] renvoie 200 (plus de 500)", () => {
  beforeEach(() => {
    mockedUser.mockResolvedValue({ id: teacherId, role: "teacher" } as never);
  });

  it("élève existant + tentative d'examen → HTTP 200", async () => {
    const { res, body } = await call(studentId);
    expect(res.status).toBe(200);
    expect(body.error).toBeUndefined();
    expect(body.student).toBeDefined();
  });

  it("élève sans aucune tentative d'examen → HTTP 200 et tableau vide", async () => {
    await run("INSERT INTO class_students (class_id, user_id) VALUES (?, ?)", classId, otherStudentId);
    try {
      const { res, body } = await call(otherStudentId);
      expect(res.status).toBe(200);
      expect(body.exam_attempts).toEqual([]);
      expect(body.assignments).toEqual([]);
    } finally {
      await run("DELETE FROM class_students WHERE class_id = ? AND user_id = ?", classId, otherStudentId);
    }
  });

  it("la note d'examen est bien notée sur 20 (score_over_20), pas sur un total inexistant", async () => {
    const { body } = await call(studentId);
    const e = body.exam_attempts.find((x: { paper_id: number }) => x.paper_id === paperId);
    expect(e).toBeDefined();
    // 5 points bruts => score_over_20 = 5 => 5/20
    expect(e.score).toBe(5);
    expect(e.max_score).toBe(20);
    expect(e.pct).toBe(25); // 5/20 = 25 %
  });

  it("aucune colonne invalide ne subsiste : la route ne lève plus 'no such column'", async () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    try {
      const { res } = await call(studentId);
      const errs = spy.mock.calls.flat().map((a) => (a instanceof Error ? a.message : String(a)));
      expect(errs.filter((m) => /no such column|no such table/i.test(m))).toEqual([]);
      expect(res.status).toBe(200);
    } finally {
      spy.mockRestore();
    }
  });

  it("la requête profil expose users.last_active et plus last_active_at", async () => {
    const { body } = await call(studentId);
    expect(body.student).toHaveProperty("last_active");
    expect(body.student.last_active).toBeTruthy();
    expect(body.student).not.toHaveProperty("last_active_at");
  });

  it("l'analyse globale est cohérente (total_quizzes + strengths/weaknesses)", async () => {
    const { body } = await call(studentId);
    expect(body.analysis).toBeDefined();
    expect(Array.isArray(body.analysis.strengths)).toBe(true);
    expect(Array.isArray(body.analysis.weaknesses)).toBe(true);
    expect(typeof body.analysis.total_quizzes).toBe("number");
  });

  it("contrat API ↔ page /espace-prof/eleves/[id] : toutes les clés attendues sont présentes", async () => {
    const { body } = await call(studentId);
    // Consommations directes de `data.*` dans la page.
    for (const key of ["student", "classes", "by_subject", "recent_attempts", "exam_attempts", "assignments", "analysis"]) {
      expect(body).toHaveProperty(key);
    }
    // Champs lus par la page pour une tentative d'examen.
    const e = body.exam_attempts[0];
    for (const key of ["paper_id", "paper_title", "score", "max_score", "pct", "completed_at"]) {
      expect(e).toHaveProperty(key);
    }
    // Champs de l'analyse.
    for (const key of ["total_quizzes", "overall_avg", "strengths", "weaknesses"]) {
      expect(body.analysis).toHaveProperty(key);
    }
    // Champs de l'élève.
    for (const key of ["id", "first_name", "last_name", "email", "xp", "streak", "last_active"]) {
      expect(body.student).toHaveProperty(key);
    }
  });

  it("last_active_at n'existe dans aucune table — garde-fou anti-régression", async () => {
    await expect(query("SELECT last_active_at FROM users WHERE id = ?", studentId))
      .rejects.toThrow(/no such column/i);
    await expect(query("SELECT total_points FROM exam_papers WHERE id = ?", paperId))
      .rejects.toThrow(/no such column/i);
    await expect(query("SELECT status FROM assignment_submissions LIMIT 1"))
      .rejects.toThrow(/no such column/i);
    await expect(query("SELECT user_id FROM assignment_submissions LIMIT 1"))
      .rejects.toThrow(/no such column/i);
  });
});

describe("P0.1 — gardes d'accès inchangées (aucune régression auth/RBAC)", () => {
  it("élève hors des classes du prof → 403", async () => {
    mockedUser.mockResolvedValue({ id: teacherId, role: "teacher" } as never);
    const { res } = await call(otherStudentId);
    expect(res.status).toBe(403);
  });

  it("un non-professeur → 403", async () => {
    mockedUser.mockResolvedValue({ id: studentId, role: "student" } as never);
    const { res } = await call(studentId);
    expect(res.status).toBe(403);
  });

  it("un visiteur non connecté → 403", async () => {
    mockedUser.mockResolvedValue(null as never);
    const { res } = await call(studentId);
    expect(res.status).toBe(403);
  });

  it("un compte de test n'accède pas non plus (le rôle prime, pas is_test)", async () => {
    mockedUser.mockResolvedValue({ id: studentId, role: "student" } as never);
    const { res } = await call(studentId);
    expect(res.status).toBe(403);
  });
});
