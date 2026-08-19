import { test, expect } from "@playwright/test";

const P = "/plans-d-abonnement-edukora-1";

async function openPlansPage(page: import("@playwright/test").Page) {
  await page.goto(P);
  await page.waitForSelector("#price-container", { state: "visible", timeout: 30000 });
}

test("T32-T34 : bannière rentrée présente, code RENTREE30 appliqué en navigateur (-30 %, mensuel et trimestriel)", async ({ page }) => {
  await openPlansPage(page);

  // T32: bannière promotionnelle + mention du code
  await expect(page.locator("#promo-box")).toBeVisible();
  await expect(page.locator("#promo-input")).toBeVisible();
  const pageText = await page.locator("body").innerText();
  expect(pageText).toContain("RENTREE30");
  expect(pageText).toContain("Offre de Rentrée");

  // Prix de base (mensuel) lu dans le DOM
  const priceMonthBase = Number(await page.getAttribute("#price-container", "data-price-month"));
  const priceQuarterBase = Number(await page.getAttribute("#price-container", "data-price-quarter"));
  expect(priceMonthBase).toBeGreaterThan(0);
  expect(priceQuarterBase).toBeGreaterThan(0);
  expect(priceMonthBase).toBe(4900); // Réussite 4 900 FCFA/mois en prod
  expect(priceQuarterBase).toBe(14700); // Réussite Trimestriel 14 700 FCFA
  const initialDisplay = (await page.textContent("#price-value"))!.trim();
  expect(initialDisplay.replace(/\s/g, "")).toBe(String(priceMonthBase));

  // T34: application du code RENTREE30
  await page.fill("#promo-input", "rentree30");
  await page.click("#promo-apply");
  const status = page.locator("#promo-status");
  await expect(status).toBeVisible({ timeout: 15000 });
  await expect(status).toContainText("-30 %");
  const discountedMonth = await page.textContent("#price-value");
  expect(discountedMonth!.replace(/\s/g, "")).toBe(String(Math.round((priceMonthBase * 70) / 100)));
  expect(discountedMonth!.replace(/\s/g, "")).toBe("3430"); // 4900 - 30%

  // Bascule trimestriel : prix remisé aussi
  await page.click("#toggle-trim");
  const discountedQuarter = await page.textContent("#price-value");
  expect(discountedQuarter!.replace(/\s/g, "")).toBe("10290"); // 14700 - 30%
  await page.click("#toggle-monthly");
  expect((await page.textContent("#price-value"))!.replace(/\s/g, "")).toBe("3430");
});

test("T35 : code promo invalide refusé, prix inchangé, puis reprise avec code valide", async ({ page }) => {
  await openPlansPage(page);

  const priceMonthBase = Number(await page.getAttribute("#price-container", "data-price-month"));
  await page.fill("#promo-input", "PROMO-FAKE-999");
  await page.click("#promo-apply");
  const status = page.locator("#promo-status");
  await expect(status).toBeVisible({ timeout: 15000 });
  await expect(status).toContainText("invalide");
  const priceAfterBad = (await page.textContent("#price-value"))!.trim();
  expect(priceAfterBad.replace(/\s/g, "")).toBe(String(priceMonthBase));

  // Récupération : un code valide après un invalide recalcule le prix
  await page.fill("#promo-input", "RENTREE30");
  await page.click("#promo-apply");
  await expect(status).toContainText("-30 %", { timeout: 15000 });
  expect((await page.textContent("#price-value"))!.replace(/\s/g, "")).toBe(
    String(Math.round((priceMonthBase * 70) / 100)),
  );
});