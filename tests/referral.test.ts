import { buildWhatsAppReferralLink, buildReferralWhatsappMessage } from "@/lib/referral";

describe("referral.ts", () => {
  describe("buildWhatsAppReferralLink", () => {
    it("should include the referral code in the URL", () => {
      const link = buildWhatsAppReferralLink("TEST123");
      expect(link).toContain("wa.me/?text=");
      expect(link).toContain("TEST123");
    });

    it("should include first name when provided", () => {
      const link = buildWhatsAppReferralLink("CODE1", "Aya");
      const decoded = decodeURIComponent(link);
      expect(decoded).toContain("Aya t'invite");
    });

    it("should use generic message when no first name", () => {
      const link = buildWhatsAppReferralLink("CODE1");
      const decoded = decodeURIComponent(link);
      expect(decoded).toContain("Rejoins-moi");
    });

    it("should contain the registration URL", () => {
      const link = buildWhatsAppReferralLink("CODE1");
      const decoded = decodeURIComponent(link);
      expect(decoded).toContain("edukora.net/inscription-1-2-edukora");
    });
  });

  describe("buildReferralWhatsappMessage", () => {
    it("should include the code", () => {
      const msg = buildReferralWhatsappMessage("XYZ789");
      expect(msg).toContain("XYZ789");
    });

    it("should include +50 XP", () => {
      const msg = buildReferralWhatsappMessage("XYZ789");
      expect(msg).toContain("+50 XP");
    });

    it("should include registration link", () => {
      const msg = buildReferralWhatsappMessage("XYZ789");
      expect(msg).toContain("edukora.net/inscription-1-2-edukora?ref=XYZ789");
    });
  });
});
