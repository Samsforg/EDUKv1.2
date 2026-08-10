#!/usr/bin/env node
/**
 * Script de surveillance de l'indexation des URLs Edukora.
 *
 * Parcourt le sitemap publié, vérifie via l'URL Inspection API
 * de Google Search Console si chaque URL est indexée, et affiche
 * un rapport. Option --resubmit : demande une nouvelle indexation
 * pour les URLs non indexées / en attente.
 *
 * Prérequis : scripts/gsc-client.json et scripts/gsc-tokens.json
 * (générés par submit-sitemap.mjs).
 *
 * Usage :
 *   node scripts/check-indexing.mjs [--resubmit] [--limit N]
 */

import { readFile, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = join(__dirname, "gsc-tokens.json");
const CLIENT_FILE = join(__dirname, "gsc-client.json");

const SITE_URL = "https://edukora.net/";
const SITEMAP_URL = "https://edukora.net/sitemap.xml";
const SCOPES = "https://www.googleapis.com/auth/webmasters";
const OAUTH_TOKEN = "https://oauth2.googleapis.com/token";
const INSPECT_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect";

const args = process.argv.slice(2);
const RESUBMIT = args.includes("--resubmit");
const LIMIT_ARG = args.find((a) => a.startsWith("--limit="));
const LIMIT = LIMIT_ARG ? parseInt(LIMIT_ARG.split("=")[1], 10) : Infinity;

async function readJson(path) {
  try {
    return JSON.parse(await readFile(path, "utf-8"));
  } catch {
    return null;
  }
}

async function loadClient() {
  const envClient = {
    client_id: process.env.GSC_CLIENT_ID,
    client_secret: process.env.GSC_CLIENT_SECRET,
  };
  if (envClient.client_id && envClient.client_secret) return envClient;
  const fileClient = await readJson(CLIENT_FILE);
  if (fileClient?.installed) {
    return {
      client_id: fileClient.installed.client_id,
      client_secret: fileClient.installed.client_secret,
    };
  }
  if (fileClient?.web) {
    return {
      client_id: fileClient.web.client_id,
      client_secret: fileClient.web.client_secret,
    };
  }
  return null;
}

async function getAccessToken(client) {
  const tokens = await readJson(TOKEN_FILE);
  if (!tokens?.refresh_token) throw new Error("Aucun refresh_token. Lance d'abord submit-sitemap.mjs.");
  const res = await fetch(OAUTH_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: client.client_id,
      client_secret: client.client_secret,
      refresh_token: tokens.refresh_token,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Impossible de rafraîchir le token : ${JSON.stringify(data)}`);
  tokens.access_token = data.access_token;
  await writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  return data.access_token;
}

async function inspect(accessToken, url) {
  const res = await fetch(INSPECT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inspectionUrl: url, siteUrl: SITE_URL }),
  });
  const data = await res.json();
  if (!res.ok) {
    return { error: `${res.status} ${JSON.stringify(data)}` };
  }
  return data.inspectionResult;
}

// États Google -> verdict lisible
const INDEXED_STATES = [
  "Submitted and indexed",
  "Indexed",
  "Crawled and indexed",
];
const URL_INDEXED_ANCHOR = "indexed";

function classify(ir) {
  const cov = ir?.indexStatusResult?.coverageState || "inconnue";
  const fetch = ir?.indexStatusResult?.pageFetchState || "";
  const robots = ir?.indexStatusResult?.robotsTxtState || "";
  let label = cov;
  if (fetch && robots) label += ` | fetch:${fetch} robots:${robots}`;
  return label;
}

function isIndexed(ir) {
  const cov = ir?.indexStatusResult?.coverageState || "";
  return INDEXED_STATES.some((s) => cov.toLowerCase().includes(s.toLowerCase()));
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log(`🤖 Vérification de l'indexation des URLs Edukora\n`);
  console.log(`   Mode : ${RESUBMIT ? "VÉRIFIER + DEMANDER RÉ-INDEXATION" : "vérification seule"}\n`);

  const client = await loadClient();
  if (!client) {
    console.error("❌ Identifiants OAuth introuvables (lance d'abord submit-sitemap.mjs).");
    process.exit(1);
  }
  const token = await getAccessToken(client);
  console.log("✅ Connexion Google OK.\n");

  // 1. Récupérer les URLs depuis le sitemap publié
  const sitemapRes = await fetch(SITEMAP_URL);
  if (!sitemapRes.ok) {
    console.error(`❌ Sitemap inaccessible (statut ${sitemapRes.status}).`);
    process.exit(1);
  }
  const sitemapXml = await sitemapRes.text();
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  console.log(`📄 ${urls.length} URLs trouvées dans le sitemap.\n`);

  const toCheck = urls.slice(0, LIMIT);
  const results = [];
  let indexed = 0;

  for (const [i, url] of toCheck.entries()) {
    process.stdout.write(`   [${i + 1}/${toCheck.length}] ${url} ... `);
    const ir = await inspect(token, url);
    if (ir?.error) {
      console.log(`⚠ ${ir.error}`);
      results.push({ url, status: "error", detail: ir.error });
      continue;
    }
    const label = classify(ir);
    const isIdx = isIndexed(ir);
    if (isIdx) indexed++;
    console.log(label);
    results.push({
      url,
      status: isIdx ? "indexée" : label,
      coverageState: ir?.indexStatusResult?.coverageState,
      pageFetchState: ir?.indexStatusResult?.pageFetchState,
      robotsTxtState: ir?.indexStatusResult?.robotsTxtState,
      userCanonical: ir?.indexStatusResult?.userCanonical,
      googleCanonical: ir?.indexStatusResult?.googleCanonical,
      lastCrawlTime: ir?.indexStatusResult?.lastCrawlTime,
      sitemap: ir?.indexStatusResult?.sitemap?.[0] || "",
    });
    await sleep(250);
  }

  // 2. Rapport
  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log(`📊 Résumé : ${indexed}/${toCheck.length} URLs indexées`);
  const notIndexed = results.filter((r) => r.status !== "indexée" && r.status !== "error");
  if (notIndexed.length) {
    console.log("\n⚠ URLs NON indexées :");
    for (const r of notIndexed) {
      console.log(`   • ${r.url}`);
      console.log(`     → ${r.status}`);
      if (r.googleCanonical && r.googleCanonical !== r.url) {
        console.log(`       canonical Google : ${r.googleCanonical}`);
      }
    }
  } else {
    console.log("   ✅ Toutes les URLs sont indexées !");
  }
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  // 3. Option : demander une nouvelle indexation
  if (RESUBMIT && notIndexed.length) {
    console.log(`🚀 Demande de ré-indexation de ${notIndexed.length} URL(s)…`);
    for (const [i, r] of notIndexed.entries()) {
      process.stdout.write(`   [${i + 1}/${notIndexed.length}] ${r.url} ... `);
      // La soumission du sitemap déclenche l'exploration. On renvoie le sitemap.
      const res = await fetch(
        `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_URL)}`,
        { method: "PUT", headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200 || res.status === 204) {
        console.log("demande envoyée ✓");
      } else {
        const t = await res.text();
        console.log(`⚠ ${res.status} ${t.slice(0, 100)}`);
      }
      await sleep(500);
    }
    console.log("\n✅ Demandes envoyées. Google ré-étudiera ces URLs (souvent sous 24-72 h).");
  } else if (RESUBMIT) {
    console.log("Rien à re-soumettre : toutes les URLs sont déjà indexées.");
  }

  // 4. Sauvegarde du rapport
  const report = {
    generatedAt: new Date().toISOString(),
    site: SITE_URL,
    results,
  };
  await writeFile(join(__dirname, "gsc-indexing-report.json"), JSON.stringify(report, null, 2));
  console.log(`\n📝 Rapport sauvegardé : scripts/gsc-indexing-report.json`);
}

main().catch((e) => {
  console.error("\n❌ Erreur :", e.message);
  process.exit(1);
});
