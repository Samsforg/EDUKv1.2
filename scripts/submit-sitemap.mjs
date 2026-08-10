#!/usr/bin/env node
/**
 * Script de soumission du sitemap Edukora à Google Search Console.
 *
 * Automatise :
 *   1. La vérification de la propriété (site) dans Search Console.
 *   2. La soumission de https://edukora.net/sitemap.xml.
 *   3. L'affichage de l'état de la soumission.
 *
 * Prérequis (une seule fois) :
 *   - Un projet Google Cloud avec l'API "Google Search Console API" activée.
 *   - Des identifiants OAuth 2.0 de type "Application de bureau" (OAuth client ID).
 *   - La propriété doit être vérifiée dans Search Console (voir étape VÉRIFIER ci-dessous).
 *
 * Usage :
 *   node scripts/submit-sitemap.mjs
 *
 * Le script demande d'ouvrir une URL de consentement Google dans le navigateur
 * (une seule fois), puis se connecte à l'API. Un fichier local tokens.json
 * stocke le refresh_token pour ne plus redemander à chaque exécution.
 */

import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOKEN_FILE = join(__dirname, "gsc-tokens.json");
const CLIENT_FILE = join(__dirname, "gsc-client.json");

const SITE_URL = "https://edukora.net/";
const SITEMAP_PATH = "https://edukora.net/sitemap.xml";

const SCOPES = "https://www.googleapis.com/auth/webmasters";
const OAUTH_AUTH = "https://accounts.google.com/o/oauth2/v2/auth";
const OAUTH_TOKEN = "https://oauth2.googleapis.com/token";
const GSC_BASE = "https://searchconsole.googleapis.com/webmasters/v3/sites";

const REDIRECT_PORT = 37123;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/oauth2callback`;
const REDIRECT_HOST = "localhost";

async function readJson(path) {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
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

function startAuthServer() {
  return new Promise((resolve, reject) => {
    const server = createServer((req, res) => {
      const url = new URL(req.url, `http://${REDIRECT_HOST}:${REDIRECT_PORT}`);
      if (url.pathname === "/oauth2callback") {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;text-align:center;margin-top:80px">
<h2>Connexion réussie ✓</h2><p>Vous pouvez fermer cet onglet et revenir au terminal.</p>
</body></html>`);
        server.close();
        resolve(url.searchParams.get("code"));
      } else {
        res.writeHead(404);
        res.end();
      }
    });
    server.on("error", reject);
    server.listen(REDIRECT_PORT, REDIRECT_HOST, () => {});
  });
}

async function getNewTokens(client) {
  const authUrl = new URL(OAUTH_AUTH);
  authUrl.searchParams.set("client_id", client.client_id);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  const pendingCode = startAuthServer();

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("👉 Ouvre cette URL dans ton navigateur et connecte-toi :\n");
  console.log(authUrl.toString());
  console.log("\n(Attends ensuite que le script reprenne automatiquement…)\n");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

  const code = await pendingCode;

  const res = await fetch(OAUTH_TOKEN, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: client.client_id,
      client_secret: client.client_secret,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Échec de l'échange du code : ${JSON.stringify(data)}`);
  await writeFile(TOKEN_FILE, JSON.stringify(data, null, 2));
  return data;
}

async function refreshAccessToken(client, tokens) {
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
  if (data.expires_in) tokens.expires_at = Date.now() + data.expires_in * 1000;
  await writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  return tokens;
}

async function getAccessToken(client) {
  const tokens = await readJson(TOKEN_FILE);
  if (tokens?.refresh_token) {
    try {
      return await refreshAccessToken(client, tokens);
    } catch (e) {
      console.error("⚠ Refresh token invalide, nouvelle connexion requise.\n");
    }
  }
  return getNewTokens(client);
}

async function gscCall(accessToken, path, options = {}) {
  const url = path ? `${GSC_BASE}/${path}` : GSC_BASE;
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }
  return { status: res.status, data };
}

async function main() {
  console.log("🤖 Soumission automatique du sitemap Edukora à Google Search Console\n");

  const client = await loadClient();
  if (!client) {
    console.error("❌ Identifiants OAuth introuvables.");
    console.error("\nPour générer gsc-client.json :");
    console.error("  1. Va sur https://console.cloud.google.com et crée un projet (ou utilise un projet existant).");
    console.error("  2. Recherche l'API « Google Search Console API » et active-la.");
    console.error("  3. Écran de consentement → configure (OAuth client de type « Application de bureau »).");
    console.error("  4. Identifiants → Créer des identifiants → ID client OAuth → Application de bureau → télécharge le .json.");
    console.error("  5. Copie le fichier téléchargé ici : scripts/gsc-client.json (renommé).");
    console.error("\n   OU définit les variables d'environnement : GSC_CLIENT_ID et GSC_CLIENT_SECRET.\n");
    process.exit(1);
  }
  console.log("✅ Identifiants OAuth chargés.");

  const tokens = await getAccessToken(client);
  console.log("✅ Accès Google autorisé.");

  // 1. Lister les propriétés du compte pour trouver celle d'Edukora
  console.log("\n🔎 Recherche de la propriété Edukora dans Search Console…");
  const sites = await gscCall(tokens.access_token, "");
  if (sites.status !== 200) {
    console.error(`❌ Impossible de lister les propriétés (statut ${sites.status}).`);
    console.error(`   ${JSON.stringify(sites.data)}`);
    process.exit(1);
  }
  const list = sites.data.siteEntry || [];
  const found = list.find((s) => s.siteUrl === SITE_URL);
  console.log(`   Propriétés trouvées : ${list.length}`);

  if (!found) {
    console.error(`\n❌ La propriété ${SITE_URL} n'existe pas encore dans Search Console.`);
    console.error("\nIl faut la créer et la vérifier d'abord. Tu peux soit :");
    console.error("  A) Ouvrir https://search.google.com/search-console → « Ajouter une propriété »");
    console.error("     → « Préfixe d'URL » → https://edukora.net");
    console.error("     → choisir la vérification « Balise HTML » :");
    console.error("         copie le contenu de <meta name=\"google-site-verification\" content=\"XXX\" />");
    console.error("         et donne-le-moi, je l'ajoute au site et je déploie immédiatement.");
    console.error("  B) Ou, si tu sais modifier les DNS de edukora.net :");
    console.error("     ajouter l'enregistrement TXT google-site-verification=XXX fourni par Google.");
    console.error("\nUne fois la propriété vérifiée, relance ce script : tout se fera automatiquement.\n");
    process.exit(1);
  }
  console.log(`   ✅ Propriété trouvée : ${found.siteUrl}`);

  // 2. Vérifier le statut de la propriété
  const perm = await gscCall(tokens.access_token, `${encodeURIComponent(SITE_URL)}/permissions`);
  const permLevel = perm.data?.sitePermission?.permissionType;
  console.log(`   Niveau d'accès : ${permLevel || "lecture"} (recherché : full ou siteRestrictedUser)`);

  // 3. Soumettre le sitemap (PUT)
  console.log(`\n📤 Soumission du sitemap ${SITEMAP_PATH}…`);
  const submit = await gscCall(
    tokens.access_token,
    `${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_PATH)}`,
    { method: "PUT" }
  );
  if (submit.status === 200 || submit.status === 204) {
    console.log("   ✅ Sitemap soumis avec succès.");
  } else {
    console.log(`   ⚠ Réponse ${submit.status} : ${JSON.stringify(submit.data)}`);
  }

  // 4. Vérifier l'état
  const status = await gscCall(tokens.access_token, `${encodeURIComponent(SITE_URL)}/sitemaps/${encodeURIComponent(SITEMAP_PATH)}`);
  if (status.status === 200) {
    const s = status.data;
    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📊 État de la soumission :`);
    console.log(`   Path      : ${s.path}`);
    console.log(`   Last submitted : ${s.lastSubmitted || "récemment"}`);
    console.log(`   Content type   : ${s.content}`);
    console.log(`   Errors    : ${s.errors || 0}`);
    console.log(`   Warnings  : ${s.warnings || 0}`);
    console.log(`   Is pending: ${s.isPending ? "oui" : "non"}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("🎉 Terminé. Google va maintenant explorer le sitemap (comptage des URLs sous 24-48 h).");
  } else {
    console.log(`\n⚠ Impossible de récupérer l'état (statut ${status.status}) : ${JSON.stringify(status.data)}`);
  }
}

main().catch((e) => {
  console.error("\n❌ Erreur :", e.message);
  process.exit(1);
});
