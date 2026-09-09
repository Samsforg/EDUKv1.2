#!/usr/bin/env node
/**
 * Mode "watch" : surveille les nouveaux/anciens contenus et les indexe
 * périodiquement dans `document_chunks` (RAG).
 *
 * S'appuie sur scripts/ai-index-courses.mjs (déjà idempotent : seuls les
 * chunks nouveaux ou modifiés sont ré-embeddés, ce qui est rapide et sûr).
 *
 * Usage:
 *   node scripts/ai-watch-index.mjs              # intervalle 300s (défaut)
 *   node scripts/ai-watch-index.mjs --interval 60
 *   DATABASE_URL=postgres://... node scripts/ai-watch-index.mjs
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const indexScript = path.join(__dirname, "ai-index-courses.mjs");

const args = process.argv.slice(2);
const idx = args.findIndex((a) => a === "--interval");
const INTERVAL_SEC = idx >= 0 ? Number(args[idx + 1]) || 300 : 300;

function runOnce() {
  return new Promise((resolve) => {
    console.error(`\n[watch] exécution du cycle d'indexation (${new Date().toISOString()})…`);
    const child = spawn(process.execPath, [indexScript], {
      stdio: "inherit",
      env: process.env,
    });
    child.on("close", (code) => {
      console.error(`[watch] cycle terminé (code ${code})`);
      resolve(code);
    });
  });
}

async function main() {
  console.error(`[watch] supervision d'indexation — intervalle ${INTERVAL_SEC}s (Ctrl+C pour arrêter)`);
  // Premier cycle immédiat.
  await runOnce();
  // Puis boucle.
  const timer = setInterval(async () => {
    await runOnce();
  }, INTERVAL_SEC * 1000);
  // Garder le process vivant et gérer Ctrl+C proprement.
  process.on("SIGINT", () => {
    clearInterval(timer);
    console.error("\n[watch] arrêt.");
    process.exit(0);
  });
}

main().catch((err) => {
  console.error(`[watch] erreur fatale : ${err.message}`);
  process.exit(1);
});
