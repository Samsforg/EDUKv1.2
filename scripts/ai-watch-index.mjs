#!/usr/bin/env node
// Watcher d'indexation RAG : attend la libération du quota Gemini
// puis lance scripts/ai-index-courses.mjs (reposable, idempotent).
// Usage : AI_EMBEDDING_PROVIDER=gemini GEMINI_API_KEY=... DATABASE_URL=... npm run ai:watch-index
// Réglages : AI_WATCH_POLL_MINUTES (défaut 5), AI_WATCH_DEADLINE_MINUTES (défaut 720 = 12 h).

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const INDEXER = join(__dirname, "ai-index-courses.mjs");
const POLL_MS = (Number(process.env.AI_WATCH_POLL_MINUTES) || 5) * 60_000;
const DEADLINE_MS = (Number(process.env.AI_WATCH_DEADLINE_MINUTES) || 720) * 60_000;

const now = () => new Date().toISOString();
const log = (...args) => console.log(`[watcher ${now()}]`, ...args);

async function quotaFree() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return false;
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-2:embedContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "models/gemini-embedding-2",
          content: { parts: [{ text: "ping" }] },
          outputDimensionality: 768,
        }),
      },
    );
    if (res.ok) {
      log("Quota Gemini libre.");
      return true;
    }
    if (res.status === 429) {
      const body = await res.text();
      const m = body.match(/retry in ([0-9.]+)s/i);
      if (m) log(`Quota encore bloqué (429, retry conseillé dans ${Math.round(Number(m[1]))}s).`);
      else log("Quota encore bloqué (429).");
      return false;
    }
    log(`Réponse inattendue (HTTP ${res.status}) — considéré bloqué.`);
    return false;
  } catch (e) {
    log("Erreur réseau pendant le test de quota :", e.message);
    return false;
  }
}

function runIndexer() {
  return new Promise((resolve) => {
    log("Lancement de l'indexation...");
    const child = spawn(process.execPath, [INDEXER], {
      stdio: "inherit",
      env: process.env,
    });
    child.on("exit", (code) => {
      log(`Indexation terminée (code ${code}).`);
      resolve(code === 0);
    });
    child.on("error", (e) => {
      log("Erreur au lancement de l'indexeur :", e.message);
      resolve(false);
    });
  });
}

async function main() {
  if (!process.env.DATABASE_URL || !process.env.GEMINI_API_KEY) {
    console.error(
      "ERREUR : DATABASE_URL et GEMINI_API_KEY requis (cf. scripts/ai-index-courses.mjs).",
    );
    process.exit(1);
  }
  const deadline = Date.now() + DEADLINE_MS;
  log(
    `Watcher démarré (poll ${POLL_MS / 60000} min, deadline ${new Date(deadline).toISOString()}).`,
  );
  while (Date.now() < deadline) {
    if (await quotaFree()) {
      if (await runIndexer()) {
        log("✅ Indexation RAG terminée avec succès.");
        process.exit(0);
      }
      log("Indexation interrompue — nouvelle tentative après poll.");
    } else {
      log(`Nouveau test dans ${POLL_MS / 60000} min...`);
    }
    await new Promise((r) => setTimeout(r, POLL_MS));
  }
  console.error(`[watcher ${now()}] ❌ Deadline atteinte — quota toujours bloqué.`);
  process.exit(2);
}

main();
