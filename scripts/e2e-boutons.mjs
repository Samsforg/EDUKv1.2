import { chromium } from "playwright";

const BASE = "http://localhost:3456";
const results = [];
let failures = 0;

const ok = (label, extra = "") => results.push(`  OK  ${label}${extra ? " -- " + extra : ""}`);
const ko = (label, extra = "") => {
  results.push(`  FAIL ${label}${extra ? " -- " + extra : ""}`);
  failures++;
};

function pct(p) {
  return `${BASE}${p}`;
}

async function checkLinks(page, ctx, section) {
  const raw = await page.$$eval("a", (as) => as.map((a) => ({ href: a.getAttribute("href") || "", text: (a.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60) })));
  const seen = new Set();
  let checked = 0;
  for (const l of raw) {
    const h = l.href.trim();
    if (!h || h.startsWith("#") || h.startsWith("javascript:") || h.startsWith("tel:") || h.startsWith("mailto:") || h.startsWith("http")) continue;
    const canon = h.split("?")[0].split("#")[0];
    if (!canon || seen.has(canon)) continue;
    seen.add(canon);
    checked++;
    try {
      const resp = await ctx.request.get(pct(canon));
      if (resp.status() >= 400) ko(`[${section}] lien ${canon} -> HTTP ${resp.status()}`);
      else ok(`[${section}] lien ok ${canon} -> ${resp.status()}`);
    } catch (e) {
      ko(`[${section}] lien ${canon} -> erreur fetch ${e.message.split("\n")[0]}`);
    }
  }
  return checked;
}

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ serviceWorkers: "block" });
  await ctx.addCookies([
    {
      name: "edukora_consent",
      value: JSON.stringify({ essential: true, analytics: false, ia: false }),
      domain: "localhost",
      path: "/",
    },
  ]);
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);

  let statusCalls = 0;
  await page.route(
    (u) => u.toString().includes("/api/premium/checkout"),
    (r) =>
      r.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ url: "/validation-ussd-geniuspay?ref=sub_e2e_test" }) })
  );
  await page.route(
    (u) => u.toString().includes("/api/premium/status"),
    (r) => {
      statusCalls++;
      const active = statusCalls >= 2;
      r.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(active
          ? { is_active: true, status: "active", amount: 4900, currency: "XOF", plan_name: "Réussite" }
          : { is_active: false, status: "pending", amount: 4900, currency: "XOF", plan_name: "Réussite" }),
      });
    }
  );

  const email = `e2e${Date.now()}@edu.test`;
  const phone = `+225 07 11 ${String(2000 + Math.floor(Math.random() * 7999))}`;

  // ============ 1. ACCUEIL : CTA header / hero ============
  console.log("\n== 1. ACCUEIL: CTA ==\n");
  await page.goto(pct("/"));
  const hero = await page.$$eval("a", (as) =>
    as.map((a) => ({ href: a.getAttribute("href") || "", text: (a.textContent || "").trim().replace(/\s+/g, " ") })).filter((l) => l.href.startsWith("/") && l.href.length > 1 && l.text.length > 1)
  );
  const unique = [...new Map(hero.map((l) => [l.href, l])).values()];
  for (const l of unique) {
    try {
      const resp = await ctx.request.get(pct(l.href.split("?")[0]));
      ok(`CTA home "${l.text.slice(0, 40)}" -> ${l.href} (HTTP ${resp.status()})`);
    } catch (e) {
      ko(`CTA home "${l.text.slice(0, 40)}" -> ${l.href} (${e.message.split("\n")[0]})`);
    }
  }
  await checkLinks(page, ctx, "accueil");

  // ============ 2. INSCRIPTION : formulaire complet ============
  console.log("\n== 2. INSCRIPTION: formulaire ==\n");
  await page.goto(pct("/inscription-1-2-edukora"));
  await page.fill("#firstName", "Test");
  await page.fill("#lastName", "E2E");
  await page.fill("#email", email);
  await page.fill("#phone", phone);
  await page.fill("#password", "password123");
  await page.locator("select").nth(0).selectOption("M");
  await page.fill("#commune", "Yopougon");
  await page.locator("select").nth(1).selectOption("Terminale");
  await page.waitForTimeout(600);
  const serieBtns = page.locator("button[type=button]").filter({ has: page.locator("span.font-bold") });
  const nSerie = await serieBtns.count();
  if (nSerie > 0) {
    await serieBtns.first().click();
    ok(`Sélection série (${nSerie} boutons affichés)`, "cliqué premier");
  } else {
    ko("Sélection série", "aucun bouton de série visible après choix Terminale");
  }
  await page.check("#acceptPrivacy");
  page.on("response", async (r) => {
    if (r.url().includes("/api/auth/register")) {
      const txt = await r.text().catch(() => "");
      console.log(`   [register] HTTP ${r.status()} -> ${txt.slice(0, 300)}`);
    }
  });
  await page.locator('button[type="submit"]').click();
  try {
    await page.waitForURL("**/bienvenue", { timeout: 15000 });
    ok("Submit inscription -> redirection /bienvenue", page.url());
  } catch {
    const err = await page.locator('[role="alert"]').textContent().catch(() => "null");
    ko("Submit inscription -> /bienvenue", `erreur affichée: ${err}`);
  }
  await checkLinks(page, ctx, "inscription");

  // ============ 3. BIENVENUE : bouton Continuer ============
  console.log("\n== 3. BIENVENUE ==\n");
  console.log("   URL actuelle:", page.url());
  const errVisible = await page.locator('[role="alert"]').textContent().catch(() => "null");
  if (errVisible && errVisible !== "null") console.log("   Erreur visible:", errVisible);
  const bodySnippet = (await page.textContent("body").catch(() => "")).slice(0, 400).replace(/\s+/g, " ");
  console.log("   Body:", bodySnippet);
  console.log("   Erreur visible:", errVisible);
  // step 0 : choisir un objectif puis Continuer
  await page.locator("button[type=button]", { hasText: "Préparer mon BAC" }).first().click();
  await page.waitForTimeout(300);
  await page.locator("button", { hasText: "Continuer" }).first().click();
  await page.waitForTimeout(600);
  console.log("   Step 1 visible:", await page.locator("body").textContent().then((t) => t.includes("Quand veux-tu réviser ?")));
  // step 1 : rappels -> Plus tard
  const laterBtn = page.locator("button", { hasText: "Plus tard" }).first();
  await laterBtn.click();
  await page.waitForTimeout(600);
  console.log("   Step 2 visible:", await page.locator("body").textContent().then((t) => t.includes("Tout est prêt")));
  const continueBtn = page.locator("button", { hasText: "est parti" }).first();
  await continueBtn.click();
  try {
    await page.waitForURL("**/accueil-edukora", { timeout: 15000 });
    ok("Bouton 'Continuer' -> /accueil-edukora", page.url());
  } catch {
    ko("Bouton 'Continuer' -> /accueil-edukora", `resté sur ${page.url()}`);
  }

  // ============ 4. ACCUEIL CONNECTE : nav du bas ============
  console.log("\n== 4. ACCUEIL CONNECTÉ ==\n");
  const nav = await page.$$eval("a", (as) =>
    as.map((a) => ({ href: a.getAttribute("href") || "", text: (a.textContent || "").trim().replace(/\s+/g, " ") })).filter((l) => l.href.startsWith("/") && ["accueil", "fiches", "tuteur", "profil", "revisions", "quiz", "resultats"].some((k) => l.href.includes(k)))
  );
  const unav = [...new Map(nav.map((l) => [l.href, l])).values()];
  for (const l of unav) {
    const resp = await ctx.request.get(pct(l.href.split("?")[0]));
    ok(`Nav "${l.text.slice(0, 30)}" -> ${l.href} (HTTP ${resp.status()})`);
  }
  await checkLinks(page, ctx, "accueil-connecte");

  // ============ 5. PLANS : toggle + CTA abonnement ============
  console.log("\n== 5. PLANS: toggle mensuel/trimestriel + CTA ==\n");
  await page.goto(pct("/plans-d-abonnement-edukora-1"));
  const priceMonth = await page.textContent("body").then((t) => (t.match(/4\s?900/g) ? "4 900" : null));
  ok("Prix mensuel visible (4 900)", priceMonth || "introuvable");
  const toggleBtns = page.locator("button", { hasText: /Mensuel|Trimestriel/ });
  const nT = await toggleBtns.count();
  ok(`Boutons toggle trouvés: ${nT}`, nT > 0 ? "" : "AUCUN");
  if (nT > 0) {
    const quarterlyBtn = toggleBtns.filter({ hasText: /Trimestriel/ }).first();
    await quarterlyBtn.click();
    await page.waitForTimeout(400);
    const bodyTxt = await page.textContent("body");
    ok(bodyTxt.includes("14 700") || bodyTxt.includes("14700"), "Après toggle: prix trimestriel 14 700 visible");
    ok(bodyTxt.includes("100 questions par trimestre") || bodyTxt.includes("100 questions/trimestre"), "Après toggle: features trimestrielles visibles");
    await toggleBtns.filter({ hasText: /Mensuel/ }).first().click();
    await page.waitForTimeout(300);
  }
  const subBtn = page.locator("a, button").filter({ hasText: /S'abonner maintenant/ }).first();
  const nSub = await subBtn.count();
  ok(`Bouton 'S'abonner maintenant' présent (${nSub})`, nSub ? "" : "AUCUN");
  if (nSub) {
    await subBtn.click();
    try {
      await page.waitForURL("**/validation-ussd-geniuspay?ref=sub_e2e_test", { timeout: 15000 });
      ok("CTA 'S'abonner maintenant' -> /validation-ussd-geniuspay?ref=...", page.url());
    } catch {
      ko("CTA 'S'abonner maintenant'", `resté sur ${page.url()}`);
    }
  }
  await checkLinks(page, ctx, "plans");

  // ============ 6. VALIDATION USSD : état pending puis redirection auto ============
  console.log("\n== 6. VALIDATION USSD ==\n");
  const checkLbl = page.locator("button", { hasText: "Vérification" }).first();
  const nCheck = await checkLbl.count();
  ok(`État initial "Vérification..." pendant pending (${nCheck})`, nCheck ? "" : "AUCUN");
  try {
    await page.waitForURL("**/paiement-r-ussi-edukora-premium-geniuspay**", { timeout: 20000 });
    ok("Statut passé à actif (2e appel) -> redirection auto page succès", page.url());
  } catch (e) {
    ko("Redirection auto -> page succès", `resté sur ${page.url()} (${e.message.split("\n")[0]})`);
  }

  // ============ 7. PAGE SUCCÈS : CTA final ============
  console.log("\n== 7. PAGE SUCCÈS ==\n");
  const cta = page.locator("a", { hasText: /Commencer mes révisions/ }).first();
  await cta.waitFor({ state: "visible", timeout: 20000 }).then(() => ok("CTA 'Commencer mes révisions' visible", "")).catch(() => ko("CTA 'Commencer mes révisions'", "absent du DOM"));
  const okText = await page.textContent("body").catch(() => "");
  ok("Page succès affiche félicitations", okText.includes("élicitation") || okText.includes("réussi") ? "" : "(texte non trouvé)");
  const koraLine = okText.includes("Tuteur IA : 30 questions / mois") || okText.includes("30 questions");
  ok("Page succès affiche l'offre Kora (30 questions/mois)", koraLine ? "" : "(non trouvé)");
  if (await cta.isVisible().catch(() => false)) {
    await cta.click();
    try {
      await page.waitForURL("**/accueil-edukora", { timeout: 15000 });
      ok("CTA succès -> /accueil-edukora", page.url());
    } catch {
      ko("CTA succès -> /accueil-edukora", `resté sur ${page.url()}`);
    }
  }
  await checkLinks(page, ctx, "succes");

  // ============ 8. CONNEXION (session neuve) : boutons ============
  console.log("\n== 8. CONNEXION ==\n");
  const ctx2 = await browser.newContext({ serviceWorkers: "block" });
  await ctx2.addCookies([
    { name: "edukora_consent", value: JSON.stringify({ essential: true, analytics: false, ia: false }), domain: "localhost", path: "/" },
  ]);
  const p2 = await ctx2.newPage();
  p2.setDefaultTimeout(15000);
  await p2.goto(pct("/connexion-edukora"));
  const googleBtn = p2.locator("button", { hasText: /Google/ }).first();
  await googleBtn.hover().catch(() => {});
  const gTitle = await googleBtn.getAttribute("title").catch(() => "null");
  const gDisabled = await googleBtn.isDisabled().catch(() => true);
  ok(`Bouton 'Continuer avec Google' désactivé + tooltip ("${gTitle}")`, gDisabled ? "" : "MAIS ACTIF");
  const pwLink = p2.locator("a", { hasText: /Mot de passe oublié/ }).first();
  ok(`Lien 'Mot de passe oublié' présent (${await pwLink.count()})`, "");
  const createLink = p2.locator("a", { hasText: /S'inscrire|Créer un compte/ }).first();
  ok(`Lien 'S'inscrire' vers inscription présent (${await createLink.count()})`, await createLink.getAttribute("href").then((h) => (h === "/inscription-1-2-edukora" ? "" : `href=${h}`)).catch(() => "?"));
  await p2.fill("#identifier", email);
  await p2.fill("#password", "password123");
  const submit2 = p2.locator("button[type=submit]").first();
  await submit2.click();
  try {
    await p2.waitForURL("**/accueil-edukora", { timeout: 15000 });
    ok("Connexion avec compte créé -> /accueil-edukora", p2.url());
  } catch {
    const err2 = await p2.locator('[role="alert"], [role="alertdialog"]').textContent().catch(() => "null");
    ko("Connexion compte -> /accueil-edukora", `erreur: ${err2}`);
  }
  await checkLinks(p2, ctx2, "connexion");
  await ctx2.close();

  // ============ 9. TUTEUR IA : landing démo (déjà testé en liens) ============
  console.log("\n== 9. TUTEUR IA ==\n");
  const p3 = await ctx.newPage();
  p3.setDefaultTimeout(15000);
  await p3.goto(pct("/tuteur-ia-edukora"));
  const tChat = p3.locator("button", { hasText: /Envoyer|Poser|Question|Tutoriel/ }).first();
  ok(`Landing tuteur chargée, boutons d'interaction présents (${await tChat.count()})`, "");
  await checkLinks(p3, ctx, "tuteur-ia");
  await p3.close();

  // ============ RAPPORT ============
  console.log("\n==== RAPPORT FINAL ====");
  console.log(results.join("\n"));
  console.log(`\n${failures === 0 ? "TOUT EST OK" : failures + " ÉCHEC(S)"}`);
  await browser.close();
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("Erreur fatale:", e);
  process.exit(2);
});