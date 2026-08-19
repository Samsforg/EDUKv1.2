import { test, expect } from "@playwright/test";
import { unique, password, registerStudentViaUI } from "./helpers";

test.setTimeout(90000);

test.describe("Parcours élève", () => {
  test("inscription → accueil → ouverture d'un cours et d'une leçon", async ({ page }) => {
    const email = `${unique()}@e2e.test`;
    await registerStudentViaUI(page, email, "E2E", "Test");

    // Bienvenue (2e étape d'inscription) puis accueil personnalisé
    if (page.url().includes("/bienvenue")) {
      await expect(page.locator("main h1, body > h1")).toContainText("Bienvenue");
    }
    await page.goto("/accueil-edukora");
    await expect(page.locator("main h1, body > h1")).toContainText("Salut");

    // Page niveau/matières
    await page.goto("/cours");
    await expect(page.getByRole("heading", { name: /Matières disponibles/ })).toBeVisible({ timeout: 15000 });

    // Matières : premier lien vers un code matière
    const firstSubject = page.locator('a[href^="/cours/"]').first();
    await expect(firstSubject).toBeVisible({ timeout: 15000 });
    await firstSubject.click();
    await page.waitForURL(/\/cours\/[^/]+\/[^/]+/);

    // Chapitres listés sur la page matière, puis première leçon
    const chapter = page.locator('a[href*="/chapitres/"]').first();
    await expect(chapter).toBeVisible({ timeout: 15000 });
    await chapter.click();
    await page.waitForURL(/\/chapitres\//);

    // Première leçon
    const lesson = page.locator('a[href*="/lecon/"]').first();
    await expect(lesson).toBeVisible({ timeout: 15000 });
    await lesson.click();
    await page.waitForURL(/\/lecon\//);
    await expect(page.locator("h1").first()).toBeVisible();

    const body = await page.locator("body").innerText();
    expect(body.length).toBeGreaterThan(200);
  });

  test("fiches : la bibliothèque liste les fiches et une fiche se lit", async ({ page }) => {
    const email = `${unique()}@e2e.test`;
    await registerStudentViaUI(page, email, "E2E", "Fiches");

    await page.goto("/fiches");
    await expect(page.locator('a[href^="/fiches/"]').first()).toBeVisible({ timeout: 20000 });

    // Ouvrir l'accordéon de la première matière puis lire la première fiche
    await page.locator("section button").first().click();
    const firstFiche = page.locator('a[href^="/fiches/"]').first();
    await expect(firstFiche).toBeVisible();
    await firstFiche.click();

    await page.waitForURL(/\/fiches\/\d+/);
    await expect(page.locator("main h1, body > h1")).toBeVisible();
  });

  test("simulateur : les épreuves du niveau s'affichent", async ({ page }) => {
    const email = `${unique()}@e2e.test`;
    await registerStudentViaUI(page, email, "E2E", "Simulateur");

    await page.goto("/simulateur");
    await expect(page.locator("h1").first()).toBeVisible({ timeout: 15000 });
    // attendre que le contenu remplace le spinner de chargement
    await page.waitForFunction(
      () => !document.querySelector("main .progress_activity, main [class*='spinner']"),
      null,
      { timeout: 20000 },
    );
    await expect(page.locator("main a[href*='/simulateur/']").first()).toBeVisible({ timeout: 15000 });
  });

  test("connexion : un élève inscrit se reconnecte", async ({ page }) => {
    const email = `${unique()}@e2e.test`;
    await registerStudentViaUI(page, email, "E2E", "Reconnexion");

    await page.context().clearCookies();
    await page.goto("/connexion-edukora");
    await page.waitForSelector('input#identifier', { state: "visible", timeout: 20000 });
    const { acceptConsentIfVisible } = require("./helpers");
    await acceptConsentIfVisible(page);
    await page.fill('input#identifier', email);
    await page.fill('input#password', password);
    await page.click('button:has-text("Se connecter")');
    await page.waitForURL(/\/accueil-edukora/, { timeout: 25000 });
    await expect(page.locator("main h1, body > h1")).toContainText("Salut");
  });
});