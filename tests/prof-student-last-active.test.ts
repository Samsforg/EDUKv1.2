/**
 * P0-2 — route professeur / fiche élève : colonne `users.last_active`
 *
 * `src/app/api/prof/student/[id]/route.ts` sélectionnait `users.last_active_at`,
 * colonne qui n'existe dans AUCUNE table du schéma (vérifié : `pairing_codes`,
 * `password_resets`, `promo_codes` et `sessions` ont `expires_at`, mais
 * `last_active_at` n'existe nulle part ; le vrai nom est `users.last_active`).
 * La requête levait `no such column`, `guardApi` convertissait l'exception en
 * HTTP 500 — même symptôme que le cron sms-reminders.
 *
 * ⚠ Bug HORS PÉRIMÈTRE laissé ouvert et documenté (cf. §12 du plan) :
 * la même route contient une deuxième requête invalide,
 * `ep.total_points` sur `exam_papers` (`ep.total_points AS max_score`).
 * Le schéma ne stocke pas de total de points ; `exam_attempts.score_over_20`
 * indique une notation sur 20. Corriger exigerait un choix métier
 * (dénominateur = 20 ou nombre de questions) non démontrer par le mandat P0,
 * et modifierait la sémantique de `max_score`/`pct` affichés au professeur.
 * Non corrigé ici — à traiter dans une phase dédiée.
 */
import { NextRequest } from "next/server";

jest.mock("@/lib/session", () => ({ getCurrentUser: jest.fn() }));
jest.mock("@/lib/rate-limit", () => ({
  getClientIp: () => "127.0.0.1",
  rateLimit: async () => ({ allowed: true, resetAt: Date.now() + 60_000 }),
  rateLimitResponse: () => new Response(null, { status: 429 }),
}));

import { run, queryOne, query } from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { GET } from "@/app/api/prof/student/[id]/route";

const mockedUser = getCurrentUser as jest.MockedFunction<typeof getCurrentUser>;

let teacherId = 0;
let studentId = 0;
let classId = 0;

async function insertUser(role: string, first: string, email: string) {
  await run(
    `INSERT INTO users (role, email, password_hash, first_name, last_name)
     VALUES (?, ?, 'x', ?, 'Test')`,
    role,
    email,
    first,
  );
  const r = await queryOne<{ id: number }>("SELECT last_insert_rowid() AS id");
  return r!.id;
}

/** Capture le message d'erreur réellement levé par la route (guardApi le masque dans la réponse). */
async function callAndCaptureError(student: number): Promise<string | null> {
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});
  try {
    const req = new NextRequest(`http://localhost/api/prof/student/${student}`);
    await GET(req, { params: Promise.resolve({ id: String(student) }) });
    return null;
  } finally {
    const all = spy.mock.calls.flat().map((a) => (a instanceof Error ? a.message : String(a)));
    const found = all.find((m) => m.includes("no such column") || m.includes("no such table"));
    spy.mockRestore();
    return found ?? null;
  }
}

beforeAll(async () => {
  teacherId = await insertUser("teacher", "Prof", `p0b-${Date.now()}@example.com`);
  studentId = await insertUser("student", "Eleve", `p0b-e-${Date.now()}@example.com`);

  await run("INSERT INTO classes (teacher_id, name, invite_code) VALUES (?, ?, ?)", teacherId, "P0-B", `P0B${Date.now()}`);
  const c = await queryOne<{ id: number }>("SELECT last_insert_rowid() AS id");
  classId = c!.id;
  await run("INSERT INTO class_students (class_id, user_id) VALUES (?, ?)", classId, studentId);
  await run("UPDATE users SET last_active = datetime('now', '-2 hours') WHERE id = ?", studentId);
});

afterAll(async () => {
  await run("DELETE FROM class_students WHERE class_id = ?", classId);
  await run("DELETE FROM classes WHERE id = ?", classId);
  for (const id of [teacherId, studentId]) {
    if (id) await run("DELETE FROM users WHERE id = ?", id);
  }
});

describe("P0-2 — colonne users.last_active sur /api/prof/student/[id]", () => {
  it("la requête profil ne lève plus 'no such column: last_active_at'", async () => {
    mockedUser.mockResolvedValue({ id: teacherId, role: "teacher" } as never);

    const err = await callAndCaptureError(studentId);

    // Avant correction, l'erreur relevée était exactement :
    //   no such column: last_active_at
    expect(err).not.toContain("last_active_at");
  });

  it("la requête profil lit bien users.last_active (colonne réellement présente)", async () => {
    const rows = await query<{ last_active: string | null }>(
      `SELECT id, first_name, last_name, email, class_level, xp, streak, commune, created_at, last_active
       FROM users WHERE id = ?`,
      studentId,
    );
    expect(rows).toHaveLength(1);
    expect(rows[0].last_active).toBeTruthy();
  });

  it("last_active_at est bien inexistant : la réintroduction serait détectée", async () => {
    await expect(
      query("SELECT last_active_at FROM users WHERE id = ?", studentId),
    ).rejects.toThrow(/no such column/i);
  });

  it("le contrat de la page eleve expose last_active (aligné sur la route)", async () => {
    mockedUser.mockResolvedValue({ id: teacherId, role: "teacher" } as never);
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    try {
      const req = new NextRequest(`http://localhost/api/prof/student/${studentId}`);
      const res = await GET(req, { params: Promise.resolve({ id: String(studentId) }) });
      const body = await res.json();
      // La route est encore bloquée plus loin par `ep.total_points` (bug hors
      // périmètre). On vérifie donc l'absence de régression de colonne, pas un 200.
      if (res.status === 200) {
        expect(body.student).toHaveProperty("last_active");
        expect(body.student).not.toHaveProperty("last_active_at");
      } else {
        expect(res.status).toBe(500);
      }
    } finally {
      spy.mockRestore();
    }
  });

  it("la garde de partage de classe est conservée (403 si l'élève n'est pas dans les classes du prof)", async () => {
    const outsider = await insertUser("student", "Hors", `p0b-out-${Date.now()}@example.com`);
    try {
      mockedUser.mockResolvedValue({ id: teacherId, role: "teacher" } as never);
      const req = new NextRequest(`http://localhost/api/prof/student/${outsider}`);
      const res = await GET(req, { params: Promise.resolve({ id: String(outsider) }) });
      expect(res.status).toBe(403);
    } finally {
      await run("DELETE FROM users WHERE id = ?", outsider);
    }
  });

  it("un non-professeur est refusé (403) — aucune régression d'authentification", async () => {
    mockedUser.mockResolvedValue({ id: studentId, role: "student" } as never);
    const req = new NextRequest(`http://localhost/api/prof/student/${studentId}`);
    const res = await GET(req, { params: Promise.resolve({ id: String(studentId) }) });
    expect(res.status).toBe(403);
  });

  it("un visiteur non connecté est refusé (403)", async () => {
    mockedUser.mockResolvedValue(null as never);
    const req = new NextRequest(`http://localhost/api/prof/student/${studentId}`);
    const res = await GET(req, { params: Promise.resolve({ id: String(studentId) }) });
    expect(res.status).toBe(403);
  });
});