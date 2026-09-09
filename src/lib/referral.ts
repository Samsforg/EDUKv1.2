export function buildWhatsAppReferralLink(code: string, firstName?: string): string {
  const base = "https://edukora.net/inscription-1-2-edukora";
  const text = `${firstName ? firstName + " t'invite" : "Rejoins-moi"} sur Edukora ! Révisons le BAC/BEPC ensemble. Inscris-toi avec mon code parrain ${code} et gagne +50 XP. Lien: ${base}?ref=${code}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

export function buildReferralWhatsappMessage(code: string): string {
  return `Rejoins Edukora avec mon code ${code} — +50 XP offerts ! https://edukora.net/inscription-1-2-edukora?ref=${code}`;
}
