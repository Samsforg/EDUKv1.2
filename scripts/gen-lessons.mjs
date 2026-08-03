import { DatabaseSync } from "node:sqlite";
import { readFileSync } from "node:fs";

const db = new DatabaseSync("data/edukora.db");

try {
  const cols = db.prepare("PRAGMA table_info(lessons)").all();
  if (!cols.some((c) => c.name === "content")) {
    db.exec("ALTER TABLE lessons ADD COLUMN content TEXT");
    console.log("colonne lessons.content ajoutée");
  }
} catch (e) {
  console.error("migration échouée:", e.message);
  process.exit(1);
}

function env(key) {
  const m = readFileSync(".env.local", "utf8").match(new RegExp(`^${key}=(.*)$`, "m"));
  return m ? m[1].trim() : null;
}

const KEY = env("GEMINI_API_KEY");
const MODEL = env("GEMINI_TUTOR_MODEL") ?? "gemini-3-flash-preview";
if (!KEY) {
  console.error("GEMINI_API_KEY introuvable dans .env.local");
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function callGemini(subject, chapter, lesson) {
  const prompt = `Rédige une fiche de cours complète et pédagogique en français pour un élève préparant le BAC/BEPC en Côte d'Ivoire.
Matière : ${subject}
Chapitre : ${chapter}
Leçon : ${lesson}

Structure exacte de la fiche (markdown simple) :
## À retenir
3 à 5 idées essentielles (2-3 lignes chacune)
## Définitions et notions clés
liste à puces de définitions précises
## Méthode pas à pas
étapes numérotées pour résoudre les exercices types
## Exemples concrets
2 exemples résolus avec les calculs
## Pièges à éviter
3 erreurs fréquentes des élèves

Règles : 400 à 600 mots ; langage simple, précis et direct ; AUCUNE introduction ni conclusion ; pas d'emojis ; utilise uniquement ces balises markdown : ##, -, 1., **.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 1200, temperature: 0.4 },
      }),
    },
  );
  if (!res.ok) {
    const j = await res.json().catch(() => null);
    const msg = j?.error?.message ?? res.statusText;
    throw new Error(`${res.status}: ${msg}`);
  }
  const j = await res.json();
  const text = j?.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  if (!text) throw new Error("réponse vide");
  return text.replace(/\s+$/gm, "\n").trim() + "\n";
}

const lessons = db
  .prepare(
    `SELECT l.id, l.title, l.chapter_id, c.title AS chapter, s.name AS subject
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     JOIN subjects s ON s.id = c.subject_id
     WHERE l.content IS NULL OR l.content = ''
     ORDER BY l.id`,
  )
  .all();

console.log(`${lessons.length} fiches à générer`);
let done = 0, failed = 0;
const queue = [...lessons];

async function worker() {
  while (queue.length > 0) {
    const lesson = queue.shift();
    if (!lesson) return;
    let ok = false;
    for (let attempt = 1; attempt <= 5; attempt++) {
      try {
        const content = await callGemini(lesson.subject, lesson.chapter, lesson.title);
        db.prepare("UPDATE lessons SET content = ? WHERE id = ?").run(content, lesson.id);
        ok = true;
        done++;
        console.log(`✓ [${done}/${lessons.length}] ${lesson.subject} — ${lesson.title}`);
        break;
      } catch (e) {
        const wait = Math.min(60000, attempt * 20000);
        console.warn(`  ⚠ ${lesson.title} (essai ${attempt}): ${e.message.slice(0, 80)} — attente ${wait / 1000}s`);
        await sleep(wait);
        if (e.message.startsWith("403") || e.message.startsWith("404")) break;
      }
    }
    if (!ok) {
      failed++;
      console.error(`✗ ÉCHEC: ${lesson.title}`);
    }
    await sleep(4000);
  }
}

await worker();
console.log(`\nTerminé : ${done} générées, ${failed} en échec, ${lessons.length - done - failed} restantes`);
