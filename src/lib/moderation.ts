// Moderation de contenu — filtre les insultes, contenus inappropriés
// Utilise un dictionnaire local + détection de patterns suspects.
// Pas de dépendance externe : 100% côté serveur, rapide et gratuit.

const BANNED_WORDS = new Set([
  // Insultes graves (français CI / familier)
  "enculé", "encule", "enculer", "bite", "bite", "couilles", "couillon", "connard", "connasse",
  "salope", "salaud", "fils de pute", "fdp", "ntm", "nique", "niquer", "nique ta mère",
  "tg", "ta gueule", "ferme ta gueule", "bâtard", "batard", "gro sale", "gros con",
  "gros nul", "débile", "debile", "abruti", "abrutie", "crétin", "cretin", "idiot",
  "imbecile", "imbécile", "stupide", "nul", "nulle", "merde", "putain", "PUTE",
  "chiottes", "chier", "déconnage", "déconner",
  // Insultes raciales / discriminatoires
  "négro", "negro", "bamboula", "bougnoule", "bouffi", "race de", "sang mêlé",
  // Menaces
  "je vais te tuer", "je te tue", "mort", "tuer",
  // Spam patterns
  "achetez", "achete", "promo exclusive", "gagner de l'argent", "click ici",
  "lien sponsorisé", "devenez riche", "argent facile",
  // Contenu sexuel
  "sexe", "porn", "nude", "nues", "cul nu", "seins",
]);

const SUSPICIOUS_PATTERNS = [
  /(.)\1{5,}/, // Caractères répétés (spam)
  /https?:\/\/[^\s]+/gi, // URLs (potentiel spam)
  /@\w+/g, // Mentions multiples
  /\b\d{10,}\b/, // Numéros de téléphone longs
];

export interface ModerationResult {
  approved: boolean;
  reason?: string;
  score: number; // 0 = clean, 100 = definitely bad
  flags: string[];
}

export function moderateContent(text: string): ModerationResult {
  if (!text || text.trim().length === 0) {
    return { approved: true, score: 0, flags: [] };
  }

  const normalized = text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const flags: string[] = [];
  let score = 0;

  // Check banned words
  for (const word of BANNED_WORDS) {
    const normalizedWord = word
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .trim();
    if (normalized.includes(normalizedWord)) {
      flags.push(`banned_word:${word}`);
      score += 40;
    }
  }

  // Check suspicious patterns
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(text)) {
      flags.push(`pattern:${pattern.source.slice(0, 30)}`);
      score += 15;
    }
  }

  // ALL CAPS (shouting)
  const words = text.split(/\s+/);
  const capsWords = words.filter((w) => w.length >= 3 && w === w.toUpperCase() && /[A-Z]/.test(w));
  if (capsWords.length > 3 && capsWords.length / words.length > 0.4) {
    flags.push("excessive_caps");
    score += 10;
  }

  // Excessive punctuation
  if (/[!?]{4,}/.test(text)) {
    flags.push("excessive_punctuation");
    score += 10;
  }

  // Repeated phrases
  const phrases = text.split(/[.!?]+/).map((s) => s.trim().toLowerCase());
  const uniquePhrases = new Set(phrases);
  if (phrases.length > 3 && uniquePhrases.size < phrases.length * 0.5) {
    flags.push("repeated_phrases");
    score += 15;
  }

  score = Math.min(100, score);
  const approved = score < 40;

  let reason: string | undefined;
  if (!approved) {
    if (flags.some((f) => f.startsWith("banned_word"))) {
      reason = "Ce contenu contient des termes inappropriés.";
    } else if (flags.includes("excessive_caps")) {
      reason = "Trop de majuscules. Écris normalement s'il te plaît.";
    } else if (flags.some((f) => f.startsWith("pattern"))) {
      reason = "Ce contenu contient des éléments suspect (liens, numéros).";
    } else {
      reason = "Ce contenu a été flaggé pour modération.";
    }
  }

  return { approved, reason, score, flags };
}

export function moderateQuizQuestion(question: string, options: string[]): ModerationResult {
  const allText = [question, ...options].join(" ");
  const result = moderateContent(allText);

  // Additional check: ensure options are not empty
  const emptyOptions = options.filter((o) => !o.trim());
  if (emptyOptions.length > 0) {
    result.flags.push("empty_options");
    result.score += 20;
    result.approved = false;
    if (!result.reason) result.reason = "Toutes les options doivent être remplies.";
  }

  // Check minimum question length
  if (question.trim().length < 10) {
    result.flags.push("short_question");
    result.score += 10;
    result.approved = false;
    if (!result.reason) result.reason = "La question est trop courte.";
  }

  return result;
}
