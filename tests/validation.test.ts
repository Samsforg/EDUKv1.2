import { validate, LoginSchema, RegisterSchema, QuizSubmitSchema, ForumPostSchema, LiveMessageSchema } from "@/lib/validation";

describe("validation.ts", () => {
  describe("LoginSchema", () => {
    it("should accept valid login", () => {
      const v = validate(LoginSchema, { identifier: "test@test.ci", password: "1234" });
      expect(v.ok).toBe(true);
    });

    it("should reject missing identifier", () => {
      const v = validate(LoginSchema, { password: "1234" });
      expect(v.ok).toBe(false);
    });

    it("should reject short password", () => {
      const v = validate(LoginSchema, { identifier: "test", password: "ab" });
      expect(v.ok).toBe(false);
    });
  });

  describe("RegisterSchema", () => {
    it("should accept valid register with email", () => {
      const v = validate(RegisterSchema, {
        first_name: "Aya",
        last_name: "Traore",
        email: "aya@test.ci",
        password: "123456",
      });
      expect(v.ok).toBe(true);
    });

    it("should accept valid register with phone", () => {
      const v = validate(RegisterSchema, {
        first_name: "Aya",
        last_name: "Traore",
        phone: "0707070707",
        password: "123456",
      });
      expect(v.ok).toBe(true);
    });

    it("should reject when neither email nor phone", () => {
      const v = validate(RegisterSchema, {
        first_name: "Aya",
        last_name: "Traore",
        password: "123456",
      });
      expect(v.ok).toBe(false);
    });

    it("should reject short password", () => {
      const v = validate(RegisterSchema, {
        first_name: "Aya",
        last_name: "Traore",
        email: "a@b.c",
        password: "12345",
      });
      expect(v.ok).toBe(false);
    });
  });

  describe("QuizSubmitSchema", () => {
    it("should accept valid quiz submission", () => {
      const v = validate(QuizSubmitSchema, { quiz_id: 1, answers: [0, 1, 2, 3] });
      expect(v.ok).toBe(true);
    });

    it("should reject empty answers", () => {
      const v = validate(QuizSubmitSchema, { quiz_id: 1, answers: [] });
      expect(v.ok).toBe(false);
    });

    it("should reject answer out of range", () => {
      const v = validate(QuizSubmitSchema, { quiz_id: 1, answers: [0, 5] });
      expect(v.ok).toBe(false);
    });
  });

  describe("ForumPostSchema", () => {
    it("should accept valid post", () => {
      const v = validate(ForumPostSchema, { title: "Mon titre", body: "Contenu suffisamment long" });
      expect(v.ok).toBe(true);
    });

    it("should reject short title", () => {
      const v = validate(ForumPostSchema, { title: "ab", body: "Contenu suffisamment long" });
      expect(v.ok).toBe(false);
    });

    it("should reject short body", () => {
      const v = validate(ForumPostSchema, { title: "Mon titre", body: "court" });
      expect(v.ok).toBe(false);
    });
  });

  describe("LiveMessageSchema", () => {
    it("should accept valid message", () => {
      const v = validate(LiveMessageSchema, { content: "Bonjour!" });
      expect(v.ok).toBe(true);
    });

    it("should reject empty message", () => {
      const v = validate(LiveMessageSchema, { content: "" });
      expect(v.ok).toBe(false);
    });

    it("should reject too long message", () => {
      const v = validate(LiveMessageSchema, { content: "a".repeat(1001) });
      expect(v.ok).toBe(false);
    });
  });
});