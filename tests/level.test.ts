import { gradeCandidates, gradeNeedsSerie } from "@/lib/level";

describe("gradeNeedsSerie", () => {
  it("vrai pour la filière générale du lycée uniquement", () => {
    for (const code of ["2nde", "1ere_s", "1ere_l", "1ere_es", "term_s", "term_l", "term_es"]) {
      expect(gradeNeedsSerie(code)).toBe(true);
    }
  });
  it("faux pour les classes techniques", () => {
    for (const code of ["2nde_g2", "2nde_ab", "1ere_g2", "1ere_b", "term_b", "term_g2"]) {
      expect(gradeNeedsSerie(code)).toBe(false);
    }
  });
  it("faux pour le collège, valeurs vides et inconnues", () => {
    for (const code of ["6eme", "5eme", "4eme", "3eme", "inconnu", "", null, undefined]) {
      expect(gradeNeedsSerie(code)).toBe(false);
    }
  });
});

describe("gradeCandidates (non-régression heuristique)", () => {
  it("collège direct", () => {
    expect(gradeCandidates("6ème", null)).toEqual(["6eme"]);
    expect(gradeCandidates("3ème", null)).toEqual(["3eme"]);
  });
  it("seconde générale sans série", () => {
    expect(gradeCandidates("2nde", null)).toEqual(["2nde"]);
  });
  it("lycée général avec série", () => {
    expect(gradeCandidates("1ère", "C")).toEqual(["1ere_s"]);
    expect(gradeCandidates("Terminale", "A")).toEqual(["term_l"]);
    expect(gradeCandidates("Terminale", "B")).toEqual(["term_es"]);
  });
  it("retourne null pour entrée vide ou inconnue", () => {
    expect(gradeCandidates(null, null)).toBeNull();
    expect(gradeCandidates("", null)).toBeNull();
    expect(gradeCandidates("XYZ", null)).toBeNull();
  });
});
