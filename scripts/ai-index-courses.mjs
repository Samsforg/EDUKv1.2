#!/usr/bin/env node
/**
 * Indexe le contenu des cours (leçons) dans `document_chunks` pour le RAG tutor.
 *
 * Usage:
 *   node scripts/ai-index-courses.mjs                  # local sqlite data/edukora.db
 *   DATABASE_URL=postgres://... node scripts/ai-index-courses.mjs
 *   node scripts/ai-index-courses.mjs --force          # re-indexe TOUTES les leçons
 *   node scripts/ai-index-courses.mjs --dry-run        # affiche sans écrire
 *
 * Idempotent : les chunks d'une leçon déjà indexés (même hash de contenu) sont
 * conservés ; seuls les changés / nouveaux sont re-embeddés et réécrits.
 */
import { createRequire } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const DRY_RUN = args.includes("--dry-run");
const VERBOSE = args.includes("--verbose");

// Charge .env.local par défaut (dev) ou --env=<fichier> ; sinon variables déjà présentes.
try {
  const envIdx = args.findIndex((a) => a.startsWith("--env="));
  const envFile = envIdx >= 0 ? args[envIdx].slice("--env=".length) : path.resolve(__dirname, "..", ".env.local");
  if (existsSync(envFile)) {
    const { parse } = require("dotenv");
    const parsed = parse(readFileSync(envFile)) || {};
    for (const [k, v] of Object.entries(parsed)) if (process.env[k] === undefined) process.env[k] = v;
  }
} catch {
  // dotenv optionnel — on continue avec l'environnement courant.
}

const DATABASE_URL =
  process.env.AI_DATABASE_URL ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  "";

// ---------------------------------------------------------------- connect
let db = null;
let isPg = Boolean(DATABASE_URL);

function isSqliteDb() {
  if (isPg) return false;
  const defaultPath = path.resolve(__dirname, "..", "data", "edukora.db");
  if (existsSync(defaultPath)) return defaultPath;
  if (process.env.SQLITE_PATH && existsSync(process.env.SQLITE_PATH)) return process.env.SQLITE_PATH;
  return null;
}

async function open() {
  if (isPg) {
    const { Client } = require("pg");
    db = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
    await db.connect();
    return;
  }
  const sqlitePath = isSqliteDb();
  if (!sqlitePath) {
    console.error("Aucune base trouvée. Passez DATABASE_URL (Postgres) ou placez data/edukora.db (SQLite).");
    process.exit(2);
  }
  const { DatabaseSync } = require("node:sqlite");
  db = new DatabaseSync(sqlitePath, { open: true });
  console.error(`[index] SQLite : ${sqlitePath}`);
}

async function all(sql, params = []) {
  if (isPg) return db.query(sql, params).then((r) => r.rows);
  return Promise.resolve(db.prepare(sql).all(...params));
}
function get(sql, params = []) {
  if (isPg) return db.query(sql, params).then((r) => r.rows[0] ?? null);
  return Promise.resolve(db.prepare(sql).get(...params));
}
async function run(sql, params = []) {
  if (isPg) return db.query(sql, params);
  return Promise.resolve(db.prepare(sql).run(...params));
}

// ---------------------------------------------------------------- chunker (même logique que src/lib/ai/chunker.ts)
const MAX_LENGTH = 1200;
const OVERLAP = 100;

function splitParagraphs(text) {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}
function splitSentences(text) {
  return text.split(/(?<=[.!?…])\s+/).map((s) => s.trim()).filter(Boolean);
}

function chunkText(text) {
  const normalized = String(text ?? "").replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const headingRe = /^(#{1,3})\s+(.+)$/gm;
  const sections = [];
  let lastIndex = 0;
  let lastTitle = "";
  let match;
  while ((match = headingRe.exec(normalized))) {
    if (match.index > lastIndex) {
      sections.push({ title: lastTitle, body: normalized.slice(lastIndex, match.index).trim() });
    }
    lastTitle = match[2].trim();
    lastIndex = match.index + match[0].length;
  }
  sections.push({ title: lastTitle, body: normalized.slice(lastIndex).trim() });

  const chunks = [];
  let currentTitle = "";
  let current = "";
  const flush = () => {
    if (!current.trim()) return;
    chunks.push(currentTitle ? `${currentTitle}\n${current.trim()}` : current.trim());
    current = "";
  };

  for (const section of sections) {
    currentTitle = section.title;
    if (!section.body) {
      if (section.title) {
        if (current) flush();
        chunks.push(section.title);
      }
      continue;
    }
    if (section.body.length <= MAX_LENGTH) {
      if (current) flush();
      current = section.title ? `${section.title}\n${section.body}` : section.body;
      flush();
      continue;
    }

    const paragraphs = splitParagraphs(section.body);
    let paragraphBuffer = "";
    for (const paragraph of paragraphs) {
      if (paragraph.length > MAX_LENGTH) {
        flush();
        const sentences = splitSentences(paragraph);
        let sentenceBuffer = "";
        for (const sentence of sentences) {
          if (sentence.length > MAX_LENGTH) {
            flush();
            for (let i = 0; i < sentence.length; i += MAX_LENGTH - OVERLAP) {
              chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentence.slice(i, i + MAX_LENGTH)}`);
            }
            continue;
          }
          if (sentenceBuffer && sentenceBuffer.length + sentence.length + 1 > MAX_LENGTH) {
            chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentenceBuffer.trim()}`);
            const trimmed = sentenceBuffer.trim();
            sentenceBuffer = trimmed.length > OVERLAP ? trimmed.slice(-OVERLAP) + " " : "";
          }
          sentenceBuffer += `${sentenceBuffer ? " " : ""}${sentence}`;
        }
        if (sentenceBuffer.trim()) {
          chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentenceBuffer.trim()}`);
        }
        continue;
      }
      if (paragraphBuffer && paragraphBuffer.length + paragraph.length + 2 > MAX_LENGTH) {
        flush();
        const trimmed = paragraphBuffer.trim();
        paragraphBuffer = trimmed.length > OVERLAP ? trimmed.slice(-OVERLAP) + "\n" : "";
      }
      paragraphBuffer += `${paragraphBuffer ? "\n" : ""}${paragraph}`;
    }
    if (paragraphBuffer.trim()) {
      if (current && current.length + paragraphBuffer.length + 2 > MAX_LENGTH) {
        flush();
      }
      current += `${current ? "\n\n" : ""}${paragraphBuffer.trim()}`;
      if (current.length >= MAX_LENGTH) flush();
    }
  }
  flush();
  return chunks.filter(Boolean);
}

// ---------------------------------------------------------------- embeddings
async function embedGemini(texts) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY manquante");
  const model = process.env.GEMINI_EMBEDDING_MODEL || "gemini-embedding-2";
  const dim = Number(process.env.GEMINI_EMBEDDING_DIMENSION || 768);
  const concurrency = 8;
  const results = [];
  for (let i = 0; i < texts.length; i += concurrency) {
    const batch = texts.slice(i, i + concurrency);
    const responses = await Promise.all(
      batch.map(async (text) => {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: `models/${model}`,
              content: { parts: [{ text }] },
              outputDimensionality: dim,
            }),
          },
        );
        if (!res.ok) {
          const body = await res.text().catch(() => "");
          throw new Error(`Gemini embeddings ${res.status}: ${body.slice(0, 200)}`);
        }
        const data = await res.json();
        return data.embedding?.values;
      }),
    );
    results.push(...responses);
  }
  return results;
}

async function embedHuggingFace(texts) {
  const apiKey = process.env.HF_API_KEY;
  if (!apiKey) throw new Error("HF_API_KEY manquante");
  const model = process.env.HF_EMBEDDING_MODEL || "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2";
  const res = await fetch("https://router.huggingface.co/v1/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model, input: texts }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`HuggingFace embeddings ${res.status}: ${body.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.data?.map((d) => d.embedding);
}

async function embedBatch(texts) {
  if (!texts.length) return [];
  const preferred = process.env.AI_EMBEDDING_PROVIDER;
  const providers = [];
  if (preferred === "huggingface") providers.push("huggingface", "gemini");
  else providers.push("gemini", "huggingface");
  let lastErr = null;
  for (const name of providers) {
    try {
      const vectors = name === "gemini" ? await embedGemini(texts) : await embedHuggingFace(texts);
      if (vectors && vectors.length === texts.length) return vectors;
      lastErr = new Error(`${name}: réponse de longueur inattendue`);
    } catch (err) {
      lastErr = err;
      console.error(`[index] provider ${name} en échec : ${err.message}`);
    }
  }
  throw lastErr || new Error("Aucun provider d'embedding disponible");
}

// ---------------------------------------------------------------- main
async function main() {
  await open();
  console.error(`[index] mode : ${isPg ? "Postgres" : "SQLite"}${DRY_RUN ? " (DRY RUN)" : ""}`);

  // Leçons à indexer (générées par IA + manuelles), avec leur chapitre/matière/classe.
  const lessons = await all(
    `SELECT l.id AS lesson_id, l.title, l.summary, l.content_md, l.content, l.is_premium,
            c.id AS chapter_id, c.title AS chapter_title, c.subject_id, c.grade_id
     FROM lessons l
     JOIN chapters c ON c.id = l.chapter_id
     WHERE l.status = 'approved'
       AND (l.content_md IS NOT NULL AND l.content_md <> '' OR l.content IS NOT NULL AND l.content <> '')
     ORDER BY l.id ASC`,
  );

  console.error(`[index] ${lessons.length} leçons à traiter`);
  let indexed = 0;
  let skipped = 0;
  let failed = 0;

  const existingRows = await all(
    `SELECT source_id, content, position FROM document_chunks WHERE source_type = 'lesson'`,
  );
  const existingByLesson = new Map();
  for (const row of existingRows) {
    if (!existingByLesson.has(row.source_id)) existingByLesson.set(row.source_id, []);
    existingByLesson.get(row.source_id).push(row);
  }

  for (const lesson of lessons) {
    const source = `${lesson.content_md || ""}`.trim() || `${lesson.content || ""}`.trim();
    const chunks = chunkText(source.length ? source : `${lesson.title}\n\n${lesson.summary || ""}`);
    if (!chunks.length) {
      if (VERBOSE) console.error(`[index] skip leçon ${lesson.lesson_id} (vide)`);
      skipped++;
      continue;
    }

    const prev = existingByLesson.get(lesson.lesson_id) || [];
    const hash = (s) => {
      let h = 0;
      for (let i = 0; i < s.length; i++) {
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
      }
      return h >>> 0;
    };
    const prevHashes = new Set(prev.map((p) => `${p.position}:${hash(p.content)}`));
    const newChunks = [];
    for (let i = 0; i < chunks.length; i++) {
      const key = `${i}:${hash(chunks[i])}`;
      if (!prevHashes.has(key)) newChunks.push({ position: i, content: chunks[i] });
    }

    if (!FORCE && newChunks.length === 0) {
      if (VERBOSE) console.error(`[index] leçon ${lesson.lesson_id} déjà à jour`);
      skipped++;
      continue;
    }

    const toEmbed = (FORCE ? chunks.map((c, i) => ({ position: i, content: c })) : newChunks)
      .map((c) => c.content);

    if (DRY_RUN) {
      if (VERBOSE) console.error(`[index] leçon ${lesson.lesson_id} : ${chunks.length} chunks, ${toEmbed.length} à (ré)embeder`);
      indexed += chunks.length;
      continue;
    }

    let vectors = [];
    try {
      vectors = await embedBatch(toEmbed);
    } catch (err) {
      console.error(`[index] ECHEC embeddings leçon ${lesson.lesson_id} : ${err.message}`);
      failed++;
      continue;
    }

    const title = lesson.chapter_title
      ? `${lesson.chapter_title} — ${lesson.title}`
      : lesson.title;

    if (isPg) {
      await db.query("DELETE FROM document_chunks WHERE source_type = 'lesson' AND source_id = $1", [lesson.lesson_id]);
      if (FORCE || newChunks.length) {
        for (let k = 0; k < vectors.length; k++) {
          const pos = (FORCE ? chunks : newChunks)[k].position;
          await db.query(
            `INSERT INTO document_chunks
               (source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position, embedding)
             VALUES ('lesson', $1, $1, $2, $3, $4, $5, $6, $7, $8::vector)`,
            [
              lesson.lesson_id,
              lesson.chapter_id,
              lesson.subject_id || null,
              lesson.grade_id || null,
              title,
              (FORCE ? chunks : newChunks)[k].content,
              pos,
              JSON.stringify(vectors[k]),
            ],
          );
        }
      }
    } else {
      db.prepare("DELETE FROM document_chunks WHERE source_type = 'lesson' AND source_id = ?").run(lesson.lesson_id);
      const insert = db.prepare(
        `INSERT INTO document_chunks
           (source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position, embedding)
         VALUES ('lesson', ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      );
      const list = FORCE ? chunks.map((c, i) => ({ position: i, content: c })) : newChunks;
      for (let k = 0; k < vectors.length; k++) {
        insert.run(
          lesson.lesson_id,
          lesson.chapter_id,
          lesson.subject_id || null,
          lesson.grade_id || null,
          title,
          list[k].content,
          list[k].position,
          JSON.stringify(vectors[k]),
        );
      }
    }

    indexed += vectors.length;
    if (VERBOSE) console.error(`[index] OK leçon ${lesson.lesson_id} : ${vectors.length} chunks`);
  }

  if (isPg) await db.end();

  console.error(
    `[index] terminé : ${indexed} chunks indexés, ${skipped} à jour, ${failed} en échec${DRY_RUN ? " (dry-run, rien écrit)" : ""}`,
  );
  process.exit(failed ? 1 : 0);
}

main().catch((err) => {
  console.error(`[index] erreur fatale : ${err.message}`);
  process.exit(1);
});
