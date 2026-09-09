import { resetPasswordHtml, receiptHtml, welcomeHtml } from "@/lib/mailer";

describe("mailer.ts", () => {
  describe("resetPasswordHtml", () => {
    it("should include the reset URL", () => {
      const html = resetPasswordHtml("https://edukora.net/reset?token=abc123");
      expect(html).toContain("https://edukora.net/reset?token=abc123");
    });

    it("should mention 1 hour validity", () => {
      const html = resetPasswordHtml("https://example.com");
      expect(html).toContain("1 heure");
    });

    it("should contain EduKora branding", () => {
      const html = resetPasswordHtml("https://example.com");
      expect(html).toContain("EduKora");
    });
  });

  describe("receiptHtml", () => {
    it("should display plan name", () => {
      const html = receiptHtml({ planName: "Réussite", amount: 5000 });
      expect(html).toContain("Réussite");
    });

    it("should display formatted amount with FCFA", () => {
      const html = receiptHtml({ planName: "Test", amount: 15000 });
      expect(html).toContain("FCFA");
      expect(html).toMatch(/15[\s\u00a0]000/);
    });

    it("should use custom currency", () => {
      const html = receiptHtml({ planName: "Test", amount: 100, currency: "EUR" });
      expect(html).toContain("EUR");
    });

    it("should display reference when provided", () => {
      const html = receiptHtml({ planName: "Test", amount: 100, reference: "TXN-ABC" });
      expect(html).toContain("TXN-ABC");
    });

    it("should omit reference when not provided", () => {
      const html = receiptHtml({ planName: "Test", amount: 100 });
      expect(html).not.toContain("TXN-");
    });

    it("should display formatted end date", () => {
      const html = receiptHtml({ planName: "Test", amount: 100, endAt: "2026-12-31T00:00:00Z" });
      expect(html).toContain("31");
      expect(html).toContain("2026");
    });
  });

  describe("welcomeHtml", () => {
    it("should include first name", () => {
      const html = welcomeHtml("Aya", "REF123");
      expect(html).toContain("Aya");
    });

    it("should include referral code", () => {
      const html = welcomeHtml("Aya", "MYCODE");
      expect(html).toContain("MYCODE");
    });

    it("should mention +150 XP", () => {
      const html = welcomeHtml("Aya", "CODE");
      expect(html).toContain("+150 XP");
    });

    it("should contain CTA link", () => {
      const html = welcomeHtml("Aya", "CODE");
      expect(html).toContain("edukora.net/accueil-edukora");
    });
  });
});
