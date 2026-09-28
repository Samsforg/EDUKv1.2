import { buildTutorSystemPrompt } from "@/lib/ai/prompts";

const BASE = {
  message: "Bonjour",
  history: [],
  studentName: "Aya",
  serieName: "C",
  classLevel: "Terminale",
};

describe("buildTutorSystemPrompt (non-régression)", () => {
  it("profil de base sans pédagogie, identique à l'ancien format", () => {
    const prompt = buildTutorSystemPrompt(BASE);
    expect(prompt).toContain("Kora");
    expect(prompt).toContain("Aya");
    expect(prompt).toContain("Il est en Terminale.");
    expect(prompt).toContain("série C");
    expect(prompt).not.toContain("Contexte pédagogique");
  });
});

describe("buildTutorSystemPrompt (contexte pédagogique Phase 6)", () => {
  it("ajoute le bloc pédagogique et préfère le nom exact du grade", () => {
    const prompt = buildTutorSystemPrompt({
      ...BASE,
      pedagogy: {
        gradeName: "2nde-G2",
        subjectName: "Comptabilité",
        chapterTitle: "Comptabilité générale",
        lessonTitle: "Introduction au bilan",
        lessonSummary: "Notions de bilan.",
        prerequisites: "Aucun.",
      },
    });
    expect(prompt).toContain("Il est en 2nde-G2.");
    expect(prompt).not.toContain("Il est en Terminale.");
    expect(prompt).toContain("Contexte pédagogique actuel");
    expect(prompt).toContain("Matière : Comptabilité.");
    expect(prompt).toContain("Chapitre : Comptabilité générale.");
    expect(prompt).toContain("Cours : Introduction au bilan.");
    expect(prompt).toContain("Résumé du cours : Notions de bilan.");
    expect(prompt).toContain("Prérequis : Aucun.");
  });

  it("omet les lignes vides quand le contexte est partiel", () => {
    const prompt = buildTutorSystemPrompt({
      ...BASE,
      pedagogy: {
        gradeName: null,
        subjectName: "Droit",
        chapterTitle: null,
        lessonTitle: null,
        lessonSummary: null,
        prerequisites: null,
      },
    });
    expect(prompt).toContain("Il est en Terminale.");
    expect(prompt).toContain("Matière : Droit.");
    expect(prompt).not.toContain("Chapitre :");
    expect(prompt).not.toContain("Prérequis :");
  });
});
