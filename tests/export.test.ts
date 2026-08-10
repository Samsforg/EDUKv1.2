import { buildClassCsv, buildClassPdf, type ClassExport } from "../src/lib/export";

const sample: ClassExport = {
  class_id: 1,
  name: "Test",
  subject_name: "Mathématiques",
  grade_name: "3ème",
  year: "2025-2026",
  member_count: 2,
  global: { attempts: 8, avg_pct: 78, best_pct: 100, students: 2 },
  by_subject: [{ subject_name: "Mathématiques", attempts: 8, avg_pct: 78 }],
  by_quiz: [
    { quiz_id: 1, title: "Limites", subject_name: "Mathématiques", attempts: 4, avg_pct: 80, best_pct: 100, students: 2 },
  ],
  by_assignment: [
    { id: 1, title: "DM n°1", subject_name: "Mathématiques", deadline: "2026-02-01", max_score: 20, submissions: 2, graded: 1, avg_score: 16 },
  ],
  students: [
    { first_name: "Awa", last_name: "Diallo", email: "a@x.dev", class_level: "3eme", joined_at: "2026-01-01", attempts: 5, avg_pct: 82, best_pct: 100 },
    { first_name: "Ylo;risque", last_name: "Koné", email: null, class_level: "3eme", joined_at: "2026-01-02", attempts: 3, avg_pct: 70, best_pct: 85 },
  ],
};

describe("export.ts — CSV classe", () => {
  it("produces a BOM-prefixed CSV with expected sections", () => {
    const csv = buildClassCsv(sample);
    expect(csv.startsWith("\uFEFF")).toBe(true);
    expect(csv).toContain("PAR MATIÈRE");
    expect(csv).toContain("PAR QUIZ");
    expect(csv).toContain("PAR DEVOIR");
    expect(csv).toContain("PAR ÉLÈVE");
    expect(csv).toContain("Mathématiques");
    expect(csv).toContain("Limites");
    expect(csv).toContain("DM n°1");
    expect(csv).toContain("Awa");
  });

  it("quotes fields containing semicolons", () => {
    const csv = buildClassCsv(sample);
    expect(csv).toContain('"Ylo;risque"');
  });
});

describe("export.buildPdf — classe", () => {
  it("returns a valid PDF buffer", async () => {
    const pdf = await buildClassPdf(sample);
    expect(pdf[0]).toBe(37);
    expect(pdf[1]).toBe(80);
    expect(pdf[2]).toBe(68);
    expect(pdf[3]).toBe(70);
    expect(pdf.byteLength).toBeGreaterThan(1000);
  });
});