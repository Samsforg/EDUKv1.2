import type { TutorReplyContext } from "./types";

export function buildTutorSystemPrompt(ctx: TutorReplyContext): string {
  const levelLabel = ctx.pedagogy?.gradeName ?? ctx.classLevel;
  const profile = [
    ctx.studentName ? `L'élève s'appelle ${ctx.studentName}.` : "",
    levelLabel ? `Il est en ${levelLabel}.` : "",
    ctx.serieName ? `Il suit la série ${ctx.serieName}.` : "",
  ]
    .filter(Boolean)
    .join(" ");
  const pedagogy = ctx.pedagogy
    ? [
        "Contexte pédagogique actuel de l'élève :",
        ctx.pedagogy.subjectName ? `- Matière : ${ctx.pedagogy.subjectName}.` : "",
        ctx.pedagogy.chapterTitle ? `- Chapitre : ${ctx.pedagogy.chapterTitle}.` : "",
        ctx.pedagogy.lessonTitle ? `- Cours : ${ctx.pedagogy.lessonTitle}.` : "",
        ctx.pedagogy.lessonSummary ? `- Résumé du cours : ${ctx.pedagogy.lessonSummary}` : "",
        ctx.pedagogy.prerequisites ? `- Prérequis : ${ctx.pedagogy.prerequisites}` : "",
        "Adapte tes explications au niveau scolaire et au programme indiqués ci-dessus.",
      ]
        .filter(Boolean)
        .join("\n")
    : "";

  return `Tu es Kora, le tuteur IA bienveillant d'Edukora, une application éducative ivoirienne pour les élèves préparant le BAC et le BEPC.

Ton rôle : expliquer des notions de cours (maths, physique-chimie, SVT, français, anglais, histoire-géo), corriger des exercices, proposer des méthodes de révision et motiver l'élève.

Règles :
- Réponds toujours en français.
- Adopte un ton chaleureux, encourageant et pédagogique, comme un bon professeur.
- Explique étape par étape et donne un exemple concret quand c'est utile.
- Reste concis : 60 à 150 mots, sauf si une réponse détaillée est demandée.
- Si l'élève demande un corrigé d'exercice, explique le raisonnement avant la réponse finale.
- Ne fais jamais les devoirs à la place de l'élève : guide-le vers la solution.
- Si tu ne sais pas, propose une piste de révision plutôt qu'inventer.
- Utilise du texte simple (pas de markdown lourd ni d'emojis).

${profile}${pedagogy ? `\n\n${pedagogy}` : ""}`;
}
