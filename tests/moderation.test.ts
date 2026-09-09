import { moderateContent, moderateQuizQuestion } from "@/lib/moderation";

describe("moderation.ts", () => {
  describe("moderateContent", () => {
    it("should approve clean content", () => {
      const result = moderateContent("Bonjour, je voudrais comprendre les dérivées.");
      expect(result.approved).toBe(true);
      expect(result.score).toBe(0);
    });

    it("should reject content with banned words", () => {
      const result = moderateContent("Tu es un connard");
      expect(result.approved).toBe(false);
      expect(result.score).toBeGreaterThan(0);
      expect(result.flags.some((f) => f.startsWith("banned_word"))).toBe(true);
    });

    it("should approve empty content", () => {
      const result = moderateContent("");
      expect(result.approved).toBe(true);
    });

    it("should flag excessive caps", () => {
      const result = moderateContent("ARRÊTEZ DE ME DÉRANGER C'EST PAS POSSIBLE VOUS ÊTES VRAIMENT NULS");
      expect(result.flags).toContain("excessive_caps");
    });

    it("should flag excessive punctuation", () => {
      const result = moderateContent("Qu'est-ce que c'est????");
      expect(result.flags).toContain("excessive_punctuation");
    });

    it("should flag repeated phrases", () => {
      const result = moderateContent("test. test. test. test. test. test.");
      expect(result.flags).toContain("repeated_phrases");
    });
  });

  describe("moderateQuizQuestion", () => {
    it("should approve valid quiz content", () => {
      const result = moderateQuizQuestion("Quel est le résultat de 2+2 ?", ["3", "4", "5", "6"]);
      expect(result.approved).toBe(true);
    });

    it("should reject short questions", () => {
      const result = moderateQuizQuestion("Test?", ["A", "B"]);
      expect(result.approved).toBe(false);
      expect(result.flags).toContain("short_question");
    });

    it("should reject quiz with empty options", () => {
      const result = moderateQuizQuestion("Quel est le résultat de l'addition?", ["4", "", "6"]);
      expect(result.approved).toBe(false);
      expect(result.flags).toContain("empty_options");
    });
  });
});
