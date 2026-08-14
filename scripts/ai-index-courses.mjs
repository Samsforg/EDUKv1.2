#!/usr/bin/env node
// Indexe les contenus pédagogiques (chapitres + leçons) pour le RAG Kora.
// Prérequis : DATABASE_URL (PostgreSQL/Neon) + clé embeddings (Gemini ou Hugging Face).
// Usage : npm run ai:index-courses

import { Pool } from "pg";

const DEFAULT_MAX_LENGTH = 1200;
const DEFAULT_OVERLAP = 100;

function splitParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function splitSentences(text) {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function chunkText(text, maxLength = DEFAULT_MAX_LENGTH, overlap = DEFAULT_OVERLAP) {
  const normalized = text.replace(/\r\n/g, "\n").trim();
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
      if (section.title) chunks.push(section.title);
      continue;
    }
    if (section.body.length <= maxLength) {
      if (current && current.length + section.body.length + 2 > maxLength) flush();
      current += `${current ? "\n\n" : ""}${section.body}`;
      if (current.length >= maxLength) flush();
      continue;
    }

    const paragraphs = splitParagraphs(section.body);
    let paragraphBuffer = "";
    for (const paragraph of paragraphs) {
      if (paragraph.length > maxLength) {
        flush();
        const sentences = splitSentences(paragraph);
        let sentenceBuffer = "";
        for (const sentence of sentences) {
          if (sentence.length > maxLength) {
            flush();
            for (let i = 0; i < sentence.length; i += maxLength - overlap) {
              chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentence.slice(i, i + maxLength)}`);
            }
            continue;
          }
          if (sentenceBuffer && sentenceBuffer.length + sentence.length + 1 > maxLength) {
            chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentenceBuffer.trim()}`);
            const trimmed = sentenceBuffer.trim();
            sentenceBuffer = trimmed.length > overlap ? trimmed.slice(-overlap) + " " : "";
          }
          sentenceBuffer += `${sentenceBuffer ? " " : ""}${sentence}`;
        }
        if (sentenceBuffer.trim()) {
          chunks.push(`${currentTitle ? `${currentTitle}\n` : ""}${sentenceBuffer.trim()}`);
        }
        continue;
      }
      if (paragraphBuffer && paragraphBuffer.length + paragraph.length + 2 > maxLength) {
        flush();
        const trimmed = paragraphBuffer.trim();
        paragraphBuffer = trimmed.length > overlap ? trimmed.slice(-overlap) + "\n" : "";
      }
      paragraphBuffer += `${paragraphBuffer ? "\n" : ""}${paragraph}`;
    }
    if (paragraphBuffer.trim()) {
      if (current && current.length + paragraphBuffer.length + 2 > maxLength) flush();
      current += `${current ? "\n\n" : ""}${paragraphBuffer.trim()}`;
      if (current.length >= maxLength) flush();
    }
  }
  flush();
  return chunks.filter(Boolean);
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithRetry(url, options, maxAttempts = 8) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, options);
    if (res.ok) return res;
    const body = (await res.text()).slice(0, 300);
    if (res.status === 429) {
      lastError = new Error(`Gemini embeddings 429: ${body}`);
      console.log(`  [rate-limit] 429 — attente 60s (tentative ${attempt}/${maxAttempts})...`);
      await sleep(60000);
      continue;
    }
    if (res.status >= 500) {
      lastError = new Error(`Gemini embeddings ${res.status}: ${body}`);
      console.log(`  [transitoire] ${res.status} — attente 30s (tentative ${attempt}/${maxAttempts})...`);
      await sleep(30000);
      continue;
    }
    throw new Error(`Gemini embeddings ${res.status}: ${body}`);
  }
  throw lastError;
}

function vectorToString(vector) {
  return `[${vector.join(",")}]`;
}

async function embedWithProvider(batches) {
  const providerName = process.env.AI_EMBEDDING_PROVIDER;
  const preferGemini =
    (!providerName || providerName === "gemini") && process.env.GEMINI_API_KEY;
  const preferHF =
    (!providerName || providerName === "huggingface") && process.env.HF_API_KEY;
  const useGemini = preferGemini || !preferHF;

  const out = [];
  if (useGemini) {
    const model = "gemini-embedding-2";
    const dimension = 768;
    const all = batches.flat();
    const concurrency = 8;
    for (let i = 0; i < all.length; i += concurrency) {
      const slice = all.slice(i, i + concurrency);
      const responses = await Promise.all(
        slice.map(async (text) => {
          const res = await fetchWithRetry(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:embedContent?key=${process.env.GEMINI_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                model: `models/${model}`,
                content: { parts: [{ text }] },
                outputDimensionality: dimension,
              }),
            },
          );
          const data = await res.json();
          const values = data.embedding?.values;
          if (!values || values.length !== dimension) throw new Error("Gemini embeddings: réponse invalide");
          return values;
        }),
      );
      out.push(...responses);
      if ((i / concurrency + 1) % 10 === 0 || i + concurrency >= all.length) {
        console.log(`  embeddings Gemini : ${Math.min(i + concurrency, all.length)}/${all.length}`);
      }
      await sleep(8000);
    }
  } else {
    const model = process.env.HF_EMBEDDING_MODEL ?? "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2";
    for (const batch of batches) {
      const res = await fetch("https://router.huggingface.co/v1/embeddings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        body: JSON.stringify({ model, input: batch }),
      });
      if (!res.ok) throw new Error(`HF embeddings ${res.status}: ${(await res.text()).slice(0, 300)}`);
      const data = await res.json();
      const values = data.data?.map((d) => d.embedding);
      if (!values || values.length !== batch.length) throw new Error("HF embeddings: réponse invalide");
      out.push(...values);
      console.log(`  embeddings HF : ${out.length}/${batches.flat().length}`);
    }
  }
  return out;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    console.error("ERREUR : DATABASE_URL (PostgreSQL) requis pour l'indexation RAG.");
    process.exit(1);
  }
  const useGemini =
    (process.env.AI_EMBEDDING_PROVIDER !== "huggingface" && process.env.GEMINI_API_KEY) ||
    !process.env.HF_API_KEY;
  if (!process.env.GEMINI_API_KEY && !process.env.HF_API_KEY) {
    console.error("ERREUR : clé embeddings requise (GEMINI_API_KEY ou HF_API_KEY).");
    process.exit(1);
  }
  const dimension = useGemini ? 768 : 384;
  const embeddingProvider = useGemini ? "gemini" : "huggingface";

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL_DISABLED === "true"
      ? undefined
      : { rejectUnauthorized: false },
    max: 5,
  });

  try {
    console.log("Préparation du schéma (pgvector)...");
    await pool.query("CREATE EXTENSION IF NOT EXISTS vector");
    const dimCheck = await pool.query(
      `SELECT udt_name FROM information_schema.columns
       WHERE table_schema='public' AND table_name='document_chunks' AND column_name='embedding'`,
    );
    const exists = dimCheck.rowCount > 0 && dimCheck.rows[0].udt_name === "vector";
    let dimOk = false;
    if (exists) {
      const typmod = await pool.query(
        `SELECT atttypmod FROM pg_attribute
         WHERE attrelid = 'document_chunks'::regclass AND attname = 'embedding'`,
      );
      const atttypmod = typmod.rows[0]?.atttypmod ?? -1;
      dimOk = atttypmod === -1 || atttypmod === dimension;
    }
    if (!exists || !dimOk) {
      if (exists) console.log(`Dimension d'embedding changée (attendu ${dimension}) — recréation de la table.`);
      await pool.query("DROP TABLE IF EXISTS document_chunks");
      await pool.query(`CREATE TABLE document_chunks (
        id SERIAL PRIMARY KEY,
        source_type TEXT NOT NULL,
        source_id INTEGER NOT NULL,
        lesson_id INTEGER,
        chapter_id INTEGER,
        subject_id INTEGER,
        grade_id INTEGER,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        position INTEGER NOT NULL DEFAULT 0,
        embedding vector(${dimension}),
        created_at TEXT NOT NULL DEFAULT (now())
      )`);
      await pool.query("CREATE INDEX IF NOT EXISTS idx_document_chunks_source ON document_chunks (source_type, source_id)");
      await pool.query("CREATE INDEX IF NOT EXISTS idx_document_chunks_lesson ON document_chunks (lesson_id)");
      await pool.query("CREATE INDEX IF NOT EXISTS idx_document_chunks_subject ON document_chunks (subject_id)");
      await pool.query("CREATE INDEX IF NOT EXISTS idx_document_chunks_grade ON document_chunks (grade_id)");
    }

    console.log("Chargement des contenus (chapitres + leçons)...");
    const chapters = await pool.query(
      `SELECT c.id, c.title, c.description, c.subject_id, c.grade_id, c.code,
              s.name AS subject_name, g.name AS grade_name
       FROM chapters c
       LEFT JOIN subjects s ON s.id = c.subject_id
       LEFT JOIN grades g ON g.id = c.grade_id
       ORDER BY c.id`,
    );
    const lessons = await pool.query(
      `SELECT l.id AS lesson_id, l.title, l.summary,
              COALESCE(NULLIF(l.content_md,''), NULLIF(l.content_html,''), l.content, l.summary) AS content,
              l.chapter_id, c.subject_id, c.grade_id,
              c.title AS chapter_title, s.name AS subject_name, g.name AS grade_name
       FROM lessons l
       JOIN chapters c ON c.id = l.chapter_id
       LEFT JOIN subjects s ON s.id = c.subject_id
       LEFT JOIN grades g ON g.id = c.grade_id
       WHERE l.status = 'approved'
       ORDER BY l.id`,
    );

    const docs = [];
    for (const ch of chapters.rows) {
      const body = stripHtml(ch.description);
      if (!body) continue;
      const prefix = [ch.code, ch.subject_name, ch.grade_name].filter(Boolean).join(" — ");
      docs.push({
        sourceType: "chapter",
        sourceId: ch.id,
        lessonId: null,
        chapterId: ch.id,
        subjectId: ch.subject_id,
        gradeId: ch.grade_id,
        title: prefix ? `${ch.title} (${prefix})` : ch.title,
        content: body,
      });
    }
    for (const l of lessons.rows) {
      const body = stripHtml(l.content);
      if (!body) continue;
      const prefix = [l.subject_name, l.grade_name, l.chapter_title].filter(Boolean).join(" — ");
      docs.push({
        sourceType: "lesson",
        sourceId: l.lesson_id,
        lessonId: l.lesson_id,
        chapterId: l.chapter_id,
        subjectId: l.subject_id,
        gradeId: l.grade_id,
        title: prefix ? `${l.title} (${prefix})` : l.title,
        content: body,
      });
    }

    console.log(`Sources : ${docs.length} documents (${chapters.rowCount} chapitres, ${lessons.rowCount} leçons)`);
    const chunks = [];
    for (const doc of docs) {
      const pieces = chunkText(doc.content);
      pieces.forEach((piece, i) => {
        chunks.push({ ...doc, content: piece, position: i });
      });
    }
    console.log(`Chunks : ${chunks.length}`);

    console.log("Chargement des chunks déjà indexés...");
    const existing = await pool.query(
      `SELECT source_type, source_id, position FROM document_chunks WHERE embedding IS NOT NULL`,
    );
    const doneKeys = new Set(existing.rows.map((r) => `${r.source_type}:${r.source_id}:${r.position}`));
    const pending = chunks.filter((c) => !doneKeys.has(`${c.sourceType}:${c.sourceId}:${c.position}`));
    const skipped = chunks.length - pending.length;
    if (skipped > 0) console.log(`  déjà indexés : ${skipped} (repris)`);

    console.log(`Génération des embeddings (${pending.length} à traiter)...`);
    const batchSize = 64;
    const insertCols =
      "(source_type, source_id, lesson_id, chapter_id, subject_id, grade_id, title, content, position, embedding)";
    let inserted = 0;
    for (let i = 0; i < pending.length; i += batchSize) {
      const batch = pending.slice(i, i + batchSize);
      const vectors = await embedWithProvider([batch.map((c) => c.content)]);
      const params = [];
      const rows = [];
      let p = 1;
      for (let j = 0; j < batch.length; j++) {
        const c = batch[j];
        rows.push(`($${p},$${p + 1},$${p + 2},$${p + 3},$${p + 4},$${p + 5},$${p + 6},$${p + 7},$${p + 8},$${p + 9}::vector)`);
        params.push(
          c.sourceType,
          c.sourceId,
          c.lessonId,
          c.chapterId,
          c.subjectId,
          c.gradeId,
          c.title,
          c.content,
          c.position,
          vectorToString(vectors[j]),
        );
        p += 10;
      }
      await pool.query(`INSERT INTO document_chunks ${insertCols} VALUES ${rows.join(",")}`, params);
      inserted += batch.length;
      console.log(`  insert : ${inserted}/${pending.length} (cumul : ${skipped + inserted}/${chunks.length})`);
    }

    console.log("Nettoyage des chunks orphelins...");
    await pool.query(
      `DELETE FROM document_chunks WHERE embedding IS NOT NULL AND
       (source_type, source_id) NOT IN (
         SELECT 'chapter', id FROM chapters
         UNION ALL
         SELECT 'lesson', id FROM lessons WHERE status = 'approved'
       )`,
    );

    await pool.query(`CREATE TABLE IF NOT EXISTS ai_index_status (
       id INTEGER PRIMARY KEY,
       provider TEXT NOT NULL,
       model TEXT NOT NULL,
       dimension INTEGER NOT NULL,
       chunk_count INTEGER NOT NULL,
       last_indexed_at TEXT NOT NULL
     )`);
    const chunkCount = await pool.query("SELECT COUNT(*) AS n FROM document_chunks");
    await pool.query(
      `INSERT INTO ai_index_status (id, provider, model, dimension, chunk_count, last_indexed_at)
       VALUES (1, $1, $2, $3, $4, now())
       ON CONFLICT (id) DO UPDATE SET
         provider = EXCLUDED.provider, model = EXCLUDED.model,
         dimension = EXCLUDED.dimension, chunk_count = EXCLUDED.chunk_count,
         last_indexed_at = EXCLUDED.last_indexed_at`,
      [embeddingProvider, useGemini ? "gemini-embedding-2" : "sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2", dimension, chunkCount.rows[0].n],
    );

    console.log(`✅ Indexation terminée : ${chunkCount.rows[0].n} chunks (${embeddingProvider}, dim ${dimension}).`);
  } finally {
    await pool.end();
  }
}

main().catch((err) => {
  console.error("ERREUR :", err.message);
  process.exit(1);
});
