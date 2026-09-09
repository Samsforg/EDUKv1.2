import { query, queryOne, run } from "@/lib/db";
import { notify } from "@/lib/session";

export type BadgeCategory =
  | "Découverte"
  | "Quiz"
  | "Examens"
  | "Assiduité"
  | "XP"
  | "Cours"
  | "Communauté";

export interface BadgeDef {
  code: string;
  name: string;
  icon: string;
  description: string;
  category: BadgeCategory;
  goal: number;
  hint: string;
}

export interface BadgeProgress extends BadgeDef {
  earned_at: string | null;
  measure: number;
  progress: number;
}

export const CATEGORY_ORDER: BadgeCategory[] = [
  "Découverte",
  "Quiz",
  "Examens",
  "Assiduité",
  "XP",
  "Cours",
  "Communauté",
];

export const BADGE_DEFS: BadgeDef[] = [
  // Découverte
  { code: "first_quiz", name: "Premier pas", icon: "flag", category: "Découverte", goal: 1, description: "Termine ton premier quiz", hint: "Termine un quiz pour commencer" },
  { code: "first_lesson", name: "Curieux", icon: "menu_book", category: "Découverte", goal: 1, description: "Lire ta première fiche de cours", hint: "Ouvre une fiche de cours" },
  { code: "first_post", name: "Pris la parole", icon: "forum", category: "Découverte", goal: 1, description: "Poster ton premier sujet sur le forum", hint: "Crée un sujet dans la communauté" },
  // Quiz
  { code: "quiz_master", name: "Maître du quiz", icon: "quiz", category: "Quiz", goal: 10, description: "Termine 10 quiz", hint: "Fais 10 quiz au total" },
  { code: "quiz_25", name: "Machine à quiz", icon: "bolt", category: "Quiz", goal: 25, description: "Termine 25 quiz", hint: "Fais 25 quiz au total" },
  { code: "perfect_score", name: "Sans faute", icon: "workspace_premium", category: "Quiz", goal: 1, description: "Obtenir 100 % à un quiz", hint: "Réussis un quiz sans aucune erreur" },
  { code: "perfect_3", name: "Impeccable", icon: "verified", category: "Quiz", goal: 3, description: "Réussir 3 quiz à 100 %", hint: "Enchaîne 3 quiz sans faute" },
  // Examens
  { code: "exam_ready", name: "Prêt pour l'examen", icon: "school", category: "Examens", goal: 1, description: "Termine un simulateur complet", hint: "Termine un sujet d'examen simulé" },
  { code: "exam_3", name: "Marathonien", icon: "timer", category: "Examens", goal: 3, description: "Termine 3 examens simulés", hint: "Termine 3 sujets d'examen" },
  // Assiduité
  { code: "streak_3", name: "Série de 3", icon: "local_fire_department", category: "Assiduité", goal: 3, description: "3 jours d'activité consécutifs", hint: "Reviens 3 jours de suite" },
  { code: "streak_7", name: "Série de 7", icon: "local_fire_department", category: "Assiduité", goal: 7, description: "7 jours d'activité consécutifs", hint: "Reviens 7 jours de suite" },
  { code: "streak_30", name: "Imbattable", icon: "whatshot", category: "Assiduité", goal: 30, description: "30 jours d'activité consécutifs", hint: "Reviens 30 jours de suite" },
  { code: "daily_steel", name: "Série d'acier", icon: "flag", category: "Assiduité", goal: 7, description: "Relever le Défi du jour 7 jours", hint: "Termine le Défi du jour 7 jours" },
  // XP
  { code: "xp_100", name: "Expérimenté", icon: "stars", category: "XP", goal: 100, description: "Atteins 100 XP", hint: "Gagne 100 XP au total" },
  { code: "xp_500", name: "Expert", icon: "stars", category: "XP", goal: 500, description: "Atteins 500 XP", hint: "Gagne 500 XP au total" },
  { code: "xp_1000", name: "Champion", icon: "military_tech", category: "XP", goal: 1000, description: "Atteins 1 000 XP", hint: "Gagne 1 000 XP au total" },
  { code: "xp_2000", name: "Légende", icon: "emoji_events", category: "XP", goal: 2000, description: "Atteins 2 000 XP", hint: "Gagne 2 000 XP au total" },
  // Cours
  { code: "lesson_10", name: "Lecteur assidu", icon: "auto_stories", category: "Cours", goal: 10, description: "Lire 10 fiches de cours", hint: "Lis 10 fiches de cours" },
  { code: "lesson_25", name: "Bibliothèque vivante", icon: "library_books", category: "Cours", goal: 25, description: "Lire 25 fiches de cours", hint: "Lis 25 fiches de cours" },
  // Communauté
  { code: "forum_helper", name: "Solidaire", icon: "volunteer_activism", category: "Communauté", goal: 1, description: "Répondre à un sujet sur le forum", hint: "Aide un camarade sur le forum" },
  { code: "saved_5", name: "Collectionneur", icon: "bookmark", category: "Communauté", goal: 5, description: "Sauvegarder 5 éléments", hint: "Ajoute 5 éléments à tes favoris" },
  // Défis de ligue
  { code: "ligue_expert", name: "Perfectionniste", icon: "workspace_premium", category: "Quiz", goal: 3, description: "Réussir 3 quiz à 100 % dans ta ligue", hint: "Enchaîne 3 quiz parfaits" },
  { code: "ligue_mentor", name: "Mentor de la Ligue", icon: "groups", category: "Communauté", goal: 5, description: "Aider 5 étudiants dans le forum", hint: "Réponds à 5 questions de camarades" },
  { code: "ligue_master", name: "Maître de l'Analyse", icon: "calculate", category: "Quiz", goal: 5, description: "Réussir 5 quiz parfaits en Ligue Or", hint: "Enchaîne 5 quiz sans faute" },
  // Matières — badges dynamiques générés via getSubjectBadges()
];

export interface BadgeContext {
  quizCount: number;
  perfectCount: number;
  examCount: number;
  lessonCount: number;
  postCount: number;
  replyCount: number;
  savedCount: number;
  streak: number;
  xp: number;
  dailyDays: number;
}

export async function computeContext(userId: number): Promise<BadgeContext >{
  const u = await queryOne<{ xp: number; streak: number }>("SELECT xp, streak FROM users WHERE id = ?", userId);
  const quizCount = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ?", userId))!.c;
  const perfectCount = (await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM quiz_attempts WHERE user_id = ? AND max_score > 0 AND score = max_score",
    userId,
  ))!.c;
  const examCount = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM exam_attempts WHERE user_id = ?", userId))!.c;
  const lessonCount = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM lesson_reads WHERE user_id = ?", userId))!.c;
  const postCount = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_posts WHERE user_id = ?", userId))!.c;
  const replyCount = (await queryOne<{ c: number }>("SELECT COUNT(*) AS c FROM forum_replies WHERE user_id = ?", userId))!.c;
  const savedCount = (await queryOne<{ c: number }>(
    "SELECT (SELECT COUNT(*) FROM favorites WHERE user_id = ?) + (SELECT COUNT(*) FROM saved_lessons WHERE user_id = ?) AS c",
    userId,
    userId,
  ))!.c;
  const dailyDays = (await queryOne<{ c: number }>(
    "SELECT COUNT(*) AS c FROM daily_challenges WHERE user_id = ?",
    userId,
  ))!.c;
  return {
    quizCount,
    perfectCount,
    examCount,
    lessonCount,
    postCount,
    replyCount,
    savedCount,
    streak: u?.streak ?? 0,
    xp: u?.xp ?? 0,
    dailyDays,
  };
}

function measure(code: string, ctx: BadgeContext): number {
  switch (code) {
    case "first_quiz":
    case "quiz_master":
    case "quiz_25":
      return ctx.quizCount;
    case "perfect_score":
    case "perfect_3":
      return ctx.perfectCount;
    case "exam_ready":
    case "exam_3":
      return ctx.examCount;
    case "first_lesson":
    case "lesson_10":
    case "lesson_25":
      return ctx.lessonCount;
    case "first_post":
      return ctx.postCount;
    case "forum_helper":
      return ctx.replyCount;
    case "saved_5":
      return ctx.savedCount;
    case "streak_3":
    case "streak_7":
    case "streak_30":
      return ctx.streak;
    case "daily_steel":
      return ctx.dailyDays;
    case "xp_100":
    case "xp_500":
    case "xp_1000":
    case "xp_2000":
      return ctx.xp;
    default:
      return 0;
  }
}

export async function getSubjectBadges(): Promise<BadgeDef[]> {
  const subjects = await query<{ code: string; name: string; icon: string }>("SELECT code, name, icon FROM subjects ORDER BY name");
  return subjects.flatMap((s) => [
    { code: `mat_${s.code}_5`, name: `${s.name} · Curieux`, icon: s.icon, category: "Cours" as BadgeCategory, goal: 5, description: `Terminer 5 quiz de ${s.name}`, hint: `Fais 5 quiz de ${s.name}` },
    { code: `mat_${s.code}_10`, name: `${s.name} · Expert`, icon: s.icon, category: "Cours" as BadgeCategory, goal: 10, description: `Terminer 10 quiz de ${s.name}`, hint: `Fais 10 quiz de ${s.name}` },
    { code: `mat_${s.code}_perfect`, name: `${s.name} · Sans faute`, icon: "verified", category: "Quiz" as BadgeCategory, goal: 1, description: `100% à un quiz de ${s.name}`, hint: `Sans faute en ${s.name}` },
  ]);
}

export async function ensureBadges() {
  const allDefs = [...BADGE_DEFS, ...(await getSubjectBadges())];
  for (const def of allDefs) {
    const existing = await queryOne<{ id: number }>("SELECT id FROM badges WHERE code = ?", def.code);
    if (!existing) {
      await run("INSERT INTO badges (code, name, icon, description) VALUES (?, ?, ?, ?)", def.code, def.name, def.icon, def.description);
    }
  }
}

export async function computeBadgeProgress(userId: number): Promise<BadgeProgress[] >{
  const ctx = await computeContext(userId);
  const earnedMap = new Map<string, string>();
  const earned = await query<{ code: string; earned_at: string }>(
    "SELECT b.code, ub.earned_at FROM badges b JOIN user_badges ub ON ub.badge_id = b.id WHERE ub.user_id = ?",
    userId,
  );
  for (const e of earned) earnedMap.set(e.code, e.earned_at);
  const allDefs = [...BADGE_DEFS, ...(await getSubjectBadges())];

  return allDefs.map((def) => {
    const m = measure(def.code, ctx);
    const progress = Math.min(100, Math.round((m / def.goal) * 100));
    return { ...def, earned_at: earnedMap.get(def.code) ?? null, measure: m, progress };
  });
}

export async function refreshBadges(userId: number): Promise<string[] >{
  const ctx = await computeContext(userId);
  const allDefs = [...BADGE_DEFS, ...(await getSubjectBadges())];
  const newly: string[] = [];
  for (const def of allDefs) {
    if (measure(def.code, ctx) < def.goal) continue;
    // pour badges matière dynamiques, mesure nécessite comptage par matière
    if (def.code.startsWith("mat_")) {
      const parts = def.code.split("_");
      const subjectCode = parts[1];
      const type = parts[2];
      const subject = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = ?", subjectCode);
      if (!subject) continue;
      let count = 0;
      if (type === "5" || type === "10") {
        const r = await queryOne<{ c: number }>(
          "SELECT COUNT(*) AS c FROM quiz_attempts qa JOIN quizzes q ON q.id = qa.quiz_id WHERE qa.user_id = ? AND q.subject_id = ?",
          userId,
          subject.id
        );
        count = r?.c ?? 0;
        if (count < def.goal) continue;
      } else if (type === "perfect") {
        const r = await queryOne<{ c: number }>(
          "SELECT COUNT(*) AS c FROM quiz_attempts qa JOIN quizzes q ON q.id = qa.quiz_id WHERE qa.user_id = ? AND q.subject_id = ? AND qa.score = qa.max_score AND qa.max_score > 0",
          userId,
          subject.id
        );
        count = r?.c ?? 0;
        if (count < 1) continue;
      }
    }
    const badge = await queryOne<{ id: number; name: string; icon: string; description: string }>(
      "SELECT id, name, icon, description FROM badges WHERE code = ?",
      def.code,
    );
    if (!badge) continue;
    const exists = await queryOne<{ user_id: number }>(
      "SELECT user_id FROM user_badges WHERE user_id = ? AND badge_id = ?",
      userId,
      badge.id,
    );
    if (exists) continue;
    await run("INSERT INTO user_badges (user_id, badge_id) VALUES (?, ?)", userId, badge.id);
    await notify(userId, "Badge gagné !", `Tu as débloqué « ${badge.name} » : ${badge.description}`, badge.icon);
    newly.push(def.code);
  }
  return newly;
}
