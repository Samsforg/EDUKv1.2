import { NextRequest, NextResponse } from "next/server";
import { run, query, queryOne } from "@/lib/db";
import { getCurrentUser, addXp } from "@/lib/session";
import { generateTutorReply, isTutorAIConfigured, type TutorHistoryItem } from "@/lib/tutor-ai";
import { creditLigueChallenges } from "@/lib/ligue";

const FALLBACK_ANSWERS: { match: RegExp; reply: string }[] = [
  { match: /bonjour|salut|hello|yo/i, reply: "Bonjour ! Je suis Kora, ton tuteur IA Edukora. Je peux t'expliquer une leçon, te corriger ou t'entraîner. Qu'est-ce qu'on révise aujourd'hui ?" },
  { match: /(bac|bepc).*(simulateur|entra[îi]ne)/i, reply: "Excellent choix ! Rends-toi dans le Simulateur d'examen : tu y trouveras des sujets officiels BAC et BEPC 2024, notés sur 20, avec chronomètre. N'oublie pas : il est noté sur 20 et te rapporte de l'XP !" },
  { match: /(quiz|quizz)/i, reply: "Les quiz sont le meilleur moyen de progresser ! Dans l'onglet Quiz, tu as plus de 10 quiz couvrant toutes les matières. Après chaque quiz, tu reçois un corrigé détaillé et de l'XP." },
  { match: /xp|points|score/i, reply: "Ton XP (points d'expérience) augmente à chaque quiz et examen terminé. Il alimente ton score global sur ta page d'accueil. Continue tes séries pour maintenir ta séquence !" },
  { match: /math|calcul|int[eé]grale|d[eé]riv[eé]e/i, reply: "En maths, la méthode est reine ! 1) Lis l'énoncé deux fois. 2) Repère la formule du cours correspondante. 3) Vérifie tes calculs avec des valeurs simples. Tu peux t'entraîner avec le quiz de Maths du niveau correspondant à ta série." },
  { match: /physique|chimie|force|newton|volt/i, reply: "En Physique-Chimie, retiens que chaque grandeur a son unité (force → Newton, tension → Volt, pression → Pascal). Associe chaque formule à une situation type de ton manuel, puis entraîne-toi au simulateur BAC." },
  { match: /merci/i, reply: "Avec plaisir ! N'oublie pas : la régularité bat l'intensité. Un peu chaque jour, et tu seras prêt·e pour l'examen. Courage !" },
];

function localReply(message: string): string {
  for (const fa of FALLBACK_ANSWERS) {
    if (fa.match.test(message)) return fa.reply;
  }
  return "Bonne question ! En mode hors-ligne, je te conseille de revoir la leçon concernée dans tes cours, puis de te tester avec un quiz. Branche ta clé API pour que je puisse répondre en détail à toutes tes questions !";
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body.message !== "string" || !body.message.trim()) {
    return NextResponse.json({ error: "Message vide" }, { status: 400 });
  }
  const message = body.message.trim().slice(0, 1000);

  const chatId = body.chatId
    ? Number(body.chatId)
    : (() => {
        const r = query<{ id: number }>(
          "SELECT id FROM tutor_messages WHERE user_id = ? AND role = 'user' AND chat_id IS NOT NULL ORDER BY id DESC LIMIT 1",
          user.id,
        )[0];
        return r ? r.id : null;
      })();

  const newChatId =
    chatId ??
    (() => {
      const r = query<{ id: number }>(
        "SELECT id FROM tutor_messages WHERE user_id = ? AND role = 'assistant' ORDER BY id DESC LIMIT 1",
        user.id,
      )[0];
      return r ? r.id : null;
    })() ??
    user.id;

  const history = (chatId
    ? query<{ role: "user" | "assistant"; content: string }>(
        "SELECT role, content FROM tutor_messages WHERE user_id = ? AND chat_id = ? ORDER BY id ASC LIMIT ?",
        user.id,
        newChatId,
        16,
      )
    : []
  ).map((m) => ({ role: m.role, content: m.content })) as TutorHistoryItem[];

  let reply: string | null = null;
  if (isTutorAIConfigured()) {
    const serie = user.serie_id
      ? queryOne<{ name: string }>("SELECT name FROM series WHERE id = ?", user.serie_id)?.name ?? null
      : null;
    reply = await generateTutorReply({
      message,
      history,
      studentName: user.first_name,
      serieName: serie,
      classLevel: user.class_level,
    });
  }
  if (!reply) reply = localReply(message);

  run("INSERT INTO tutor_messages (user_id, chat_id, role, content) VALUES (?, ?, ?, ?)", user.id, newChatId, "user", message);
  run("INSERT INTO tutor_messages (user_id, chat_id, role, content) VALUES (?, ?, ?, ?)", user.id, newChatId, "assistant", reply);
  addXp(user.id, 2);
  creditLigueChallenges(user.id, "xp_total", 2);

  return NextResponse.json({ chatId: newChatId, reply });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Non connecté" }, { status: 401 });

  const messages = query<{ id: number; role: string; content: string; created_at: string }>(
    "SELECT id, role, content, created_at FROM tutor_messages WHERE user_id = ? ORDER BY id DESC LIMIT 50",
    user.id,
  ).reverse();

  return NextResponse.json({ messages });
}
