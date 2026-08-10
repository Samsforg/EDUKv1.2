import { test, expect, Page } from "@playwright/test";

const unique = () => `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
const password = "Azerty123!";

/** Inscription via la page web réelle. */
async function registerViaUI(page: Page, email: string, firstName: string, lastName: string, role: "student" | "teacher") {
  await page.goto("/inscription-1-2-edukora");
  await page.waitForSelector('input#firstName', { state: "visible" });

  if (role === "teacher") {
    await page.getByRole("button", { name: "Professeur" }).click();
  } else {
    await page.getByRole("button", { name: "Élève" }).click();
  }

  await page.fill('input#firstName', firstName);
  await page.fill('input#lastName', lastName);
  await page.fill('input#email', email);
  await page.fill('input#password', password);

  if (role === "student") {
    await page.locator("select").nth(1).selectOption({ label: "3ème" });
  }

  await page.click('button:has-text("Créer mon compte")');
  await page.waitForURL((url) => role === "teacher" ? url.pathname === "/espace-prof" : ["/accueil-edukora", "/bienvenue"].includes(url.pathname), { timeout: 15000 });
}

async function loginViaUI(page: Page, email: string) {
  await page.goto("/connexion-edukora");
  await page.waitForSelector('input#identifier', { state: "visible" });
  await page.fill('input#identifier', email);
  await page.fill('input#password', password);
  await page.click('button:has-text("Se connecter")');
  await page.waitForURL(/\/accueil-edukora/);
}

async function createClassViaUI(page: Page, name: string): Promise<number> {
  await page.goto("/espace-prof/classes");
  await page.click('button:has-text("Créer une classe")');
  await page.fill('input[placeholder="Ex : Terminale C1 - Mathématiques"]', name);
  await page.click('button[type="submit"]');
  // La création rafraîchit la liste; cliquer sur le nom de la classe pour ouvrir la fiche
  await page.waitForSelector(`text=${name}`, { state: "visible", timeout: 10000 });
  // Le nom de la classe n'est pas un lien : naviguer via le lien "Voir la classe et les statistiques" du même bloc
  const card = page.locator("div", { hasText: name });
  await card.getByRole("link", { name: /Voir la classe/ }).click();
  await page.waitForURL(/\/espace-prof\/classes\/\d+/);
  const url = page.url();
  const m = url.match(/\/espace-prof\/classes\/(\d+)/);
  expect(m, "La classe n'a pas été créée (URL inattendue)").not.toBeNull();
  return parseInt(m![1], 10);
}

async function createAssignmentViaUI(page: Page, classId: number, title: string) {
  await page.goto(`/espace-prof/classes/${classId}/devoirs`);
  await page.click('button:has-text("+ Nouveau devoir")');
  await page.fill('input[placeholder="Titre du devoir *"]', title);
  await page.fill('textarea[placeholder="Description / consignes"]', "Travail à rendre pour le test E2E");
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  await page.fill('input[type="date"]', deadline.toISOString().split("T")[0]);
  await page.click('button:has-text("Créer et notifier la classe")');
  await expect(page.locator(`text=${title}`)).toBeVisible();
}

async function joinClassViaUI(page: Page, inviteCode: string) {
  await page.goto("/mes-classes");
  await page.fill('input[placeholder="CODE (ex : ABCD12)"]', inviteCode);
  await page.click('button:has-text("Rejoindre")');
  await expect(page.locator("text=/Rejoint/")).toBeVisible({ timeout: 10000 });
}

async function submitAssignmentViaUI(page: Page, assignmentTitle: string, content: string) {
  await page.goto("/mes-classes/devoirs");
  await expect(page.locator(`text=${assignmentTitle}`)).toBeVisible();
  await page.fill('textarea[placeholder="Écris ta réponse ici…"]', content);
  await page.click('button:has-text("Rendre le devoir")');
  await expect(page.locator("text=Devoir rendu")).toBeVisible();
}

async function getProfCookieHeader(page: Page): Promise<string> {
  const cookies = await page.context().cookies();
  const session = cookies.find((c) => c.name === "edukora_session");
  return `edukora_session=${session ? session.value : ""}`;
}

test.describe("Parcours prof complet — E2E", () => {
  test("Flux : création classe → devoir → élève rejoint → rend → prof note → export CSV/PDF", async ({ page }) => {
    const teacherEmail = `prof_${unique()}@test.dev`;
    const studentEmail = `eleve_${unique()}@test.dev`;

    // 1. Inscription prof
    await registerViaUI(page, teacherEmail, "Marie", "Prof", "teacher");
    await expect(page).toHaveURL(/\/espace-prof/);

    // 2. Création classe
    const className = `Classe E2E ${unique()}`;
    const classId = await createClassViaUI(page, className);

    // 3. Récupération du code d'invitation via l'API
    const clsRes = await page.request.get(`/api/prof/classes/${classId}`);
    expect(clsRes.ok()).toBeTruthy();
    const inviteCode: string = (await clsRes.json()).cls.invite_code;
    expect(inviteCode).toBeTruthy();

    // 4. Création d'un devoir
    const assignmentTitle = `Devoir E2E ${unique()}`;
    await createAssignmentViaUI(page, classId, assignmentTitle);

    // 5. Récupération de l'assignment_id via l'API
    const listRes = await page.request.get(`/api/prof/classes/${classId}/assignments`);
    const listData = await listRes.json();
    const assignment = listData.assignments.find((a: { title: string }) => a.title === assignmentTitle);
    expect(assignment).toBeTruthy();
    const assignmentId = assignment.id;

    // 6. Déconnexion prof → inscription élève
    await page.context().clearCookies();
    await page.goto("/");
    await registerViaUI(page, studentEmail, "Paul", "Eleve", "student");

    // 7. Élève rejoint la classe
    await joinClassViaUI(page, inviteCode);

    // 8. Élève rend le devoir
    await submitAssignmentViaUI(page, assignmentTitle, "Voici ma réponse E2E");

    // 9. Déconnexion élève → reconnexion prof
    await page.context().clearCookies();
    await page.goto("/");
    await loginViaUI(page, teacherEmail);

    // 10. Prof note le devoir
    await page.goto(`/espace-prof/classes/${classId}/devoirs/${assignmentId}`);
    await page.locator('input[type="number"]').first().fill("16");
    await page.fill('input[placeholder="Feedback (optionnel)"]', "Bon travail !");
    await page.click('button:has-text("Noter")');
    await expect(page.locator("text=Note enregistrée")).toBeVisible();

    // 11. Vérification des stats
    await page.goto(`/espace-prof/classes/${classId}`);
    await expect(page.getByText("Moyenne", { exact: true })).toBeVisible();

    // 12. Export CSV
    const cookie = await getProfCookieHeader(page);
    const csvRes = await page.request.get(`/api/prof/classes/${classId}/stats/export?format=csv`, {
      headers: { cookie },
    });
    expect(csvRes.ok()).toBeTruthy();
    expect(csvRes.headers()["content-type"]).toContain("text/csv");
    expect(csvRes.headers()["content-disposition"]).toContain("attachment");
    expect(csvRes.headers()["content-disposition"]).toContain(".csv");
    const csvText = await csvRes.text();
    expect(csvText).toContain("SYNTHÈSE");
    expect(csvText).toContain(assignmentTitle);

    // 13. Export PDF
    const pdfRes = await page.request.get(`/api/prof/classes/${classId}/stats/export?format=pdf`, {
      headers: { cookie },
    });
    expect(pdfRes.ok()).toBeTruthy();
    expect(pdfRes.headers()["content-type"]).toContain("application/pdf");
    const pdfBytes = await pdfRes.body();
    expect(pdfBytes[0]).toBe(37); // %
    expect(pdfBytes[1]).toBe(80); // P
    expect(pdfBytes[2]).toBe(68); // D
    expect(pdfBytes[3]).toBe(70); // F
  });
});