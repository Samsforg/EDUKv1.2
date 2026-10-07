import { readFileSync } from "node:fs";
import { join } from "node:path";
import { sanitizeForThirdParty, EVENTS } from "@/lib/analytics";

// Phase 3f — Funnel analytics & protection PII.
//
// A. Le filtre PII doit empêcher toute diffusion d'identifiant vers un
//    tiers (GA4, Clarity, Meta, TikTok, Google Ads), y compris pour les
//    call sites futurs.
// B. Les deux call sites qui expediaient une PII doivent etre corriges a
//    la source : le filtre est une defense en profondeur, pas le
//    mecanisme principal.
// C. La taxonomie du funnel doit exister sans renommer les evenements
//    historiques (les rapports GA4 deja configures en dependent).
// D. Non-regression des phases 3d (Clarity, nonce CSP, first-party).

const read = (...p: string[]) => readFileSync(join(__dirname, "..", ...p), "utf8");

const analyticsSrc = read("src", "lib", "analytics.ts");
const parrainageSrc = read("src", "app", "parrainage", "page.tsx");
const ussdSrc = read("src", "app", "validation-ussd-geniuspay", "page.tsx");
const coursSrc = read("src", "app", "cours", "page.tsx");
const matieresSrc = read("src", "app", "matieres", "page.tsx");
const inscriptionSrc = read("src", "app", "inscription-1-2-edukora", "page.tsx");
const eduAnalyticsSrc = read("src", "components", "EdukoraAnalytics.tsx");

// ------------------------------------------------------------------
// A. Filtre PFI applique aux tiers
// ------------------------------------------------------------------
describe("3f — filtre PII avant envoi aux tiers", () => {
  it("supprime un code de parrainage (identifiant unique lie a un compte)", () => {
    expect(sanitizeForThirdParty({ code: "KORA-4821" })).toEqual({});
  });

  it("supprime une reference de transaction (add_payment_info)", () => {
    expect(sanitizeForThirdParty({ ref: "GP-8812345", value: 2000 })).toEqual({
      value: 2000,
    });
  });

  it("supprime les identifiants personnels nommes", () => {
    const out = sanitizeForThirdParty({
      first_name: "Awa",
      last_name: "Kouame",
      email: "awa@example.com",
      phone: "+225 07 00 00 00 00",
      password: "secret123",
    });
    expect(out).toEqual({});
  });

  it("supprime le contenu prive du tuteur IA", () => {
    const out = sanitizeForThirdParty({
      message: "comment calculer une derivée",
      prompt: "systeme",
      content: "reponse du modele",
    });
    expect(out).toEqual({});
  });

  it("supprime une valeur qui ressemble a un e-mail, meme sous une cle anodine", () => {
    expect(sanitizeForThirdParty({ cta_label: "contact@edukora.net" })).toEqual({});
  });

  it("supprime une valeur qui ressemble a un numero de telephone", () => {
    expect(sanitizeForThirdParty({ cta_label: "+225 07 12 34 56 78" })).toEqual({});
  });

  it("coupe un texte trop long (anti-fuite de contenu)", () => {
    expect(sanitizeForThirdParty({ note: "x".repeat(101) })).toEqual({});
    expect(sanitizeForThirdParty({ note: "x".repeat(100) })).toEqual({
      note: "x".repeat(100),
    });
  });

  it("conserve les parametres non personnels de la taxonomie", () => {
    const params = {
      grade: "3eme",
      subject: "maths",
      content_type: "fiche",
      source: "facebook",
      campaign: "rentree",
      referrer_type: "social",
      device_type: "mobile",
    };
    expect(sanitizeForThirdParty(params)).toEqual(params);
  });

  it("conserve les valeurs numeriques de performance", () => {
    const params = { quiz_id: 42, score: 7, max: 10, pct: 70, value: 2000, currency: "XOF" };
    expect(sanitizeForThirdParty(params)).toEqual(params);
  });

  it("ne mute pas l'objet d'origine (le stockage first-party reste complet)", () => {
    const params = { code: "ABC", grade: "3eme" };
    sanitizeForThirdParty(params);
    expect(params).toEqual({ code: "ABC", grade: "3eme" });
  });

  it("preserve le statut null (absence de donnee != PII)", () => {
    expect(sanitizeForThirdParty({ campaign: null, grade: null })).toEqual({
      campaign: null,
      grade: null,
    });
  });
});

// ------------------------------------------------------------------
// B. Correction a la source des deux fuites PII
// ------------------------------------------------------------------
describe("3f — aucune PII aux call sites", () => {
  it("parrainage : referral_code_copied n'envoie plus le code", () => {
    expect(parrainageSrc).toMatch(/referralCodeCopied,\s*\{\s*copied:\s*true\s*\}/);
    expect(parrainageSrc).not.toMatch(/referralCodeCopied,\s*\{\s*code/);
  });

  it("parrainage : referral_link_shared n'envoie plus le code", () => {
    expect(parrainageSrc).not.toMatch(/referralLinkShared,\s*\{\s*code/);
  });

  it("parrainage : conserve la methode de partage (mesure conservee)", () => {
    expect(parrainageSrc).toMatch(/referralLinkShared,\s*\{\s*method:/);
  });

  it("validation USSD : add_payment_info n'envoie plus la reference de paiement", () => {
    expect(ussdSrc).toMatch(/addPaymentInfo,\s*\{/);
    expect(ussdSrc).not.toMatch(/addPaymentInfo,\s*\{\s*ref\s*,/);
  });

  it("validation USSD : conserve montant, devisee et plan", () => {
    expect(ussdSrc).toMatch(/addPaymentInfo[\s\S]{0,240}value: d\.amount/);
    expect(ussdSrc).toMatch(/addPaymentInfo[\s\S]{0,240}currency:/);
  });

  it("tuteur IA : le message de l'eleve n'est jamais envoye en parametre", () => {
    const tuteurSrc = read("src", "app", "tuteur-ia", "page.tsx");
    expect(tuteurSrc).toMatch(/aiQuestionSent,\s*\{\s*blocked:\s*false\s*\}/);
    expect(tuteurSrc).not.toMatch(/aiQuestionSent,\s*\{[^}]*message/);
  });

  it("inscription : signup_started/completed sans PII", () => {
    expect(inscriptionSrc).toMatch(/signupStarted,\s*\{\s*role,/);
    expect(inscriptionSrc).not.toMatch(/signupStarted,\s*\{[^}]*email:/);
    expect(inscriptionSrc).not.toMatch(/signupCompleted,\s*\{[^}]*first_name/);
  });
});

// ------------------------------------------------------------------
// C. Taxonomie du funnel
// ------------------------------------------------------------------
describe("3f — taxonomie du funnel", () => {
  const nouveaux = [
    "landing_viewed",
    "cta_clicked",
    "referral_clicked",
    "subject_selected",
    "grade_selected",
    "return_visit",
  ] as const;

  it.each(nouveaux)("declare l'evenement %s", (nom) => {
    expect(Object.values(EVENTS)).toContain(nom);
  });

  it("ne renomme aucun evenement historique (rapports GA4 existants)", () => {
    // Ces noms sont stables depuis la phase 3c : les changer casserait
    // les explorations et les tableaux de bord deja configures.
    for (const nom of [
      "signup_started",
      "signup_completed",
      "login_completed",
      "course_opened",
      "lesson_started",
      "lesson_completed",
      "quiz_started",
      "quiz_completed",
      "fiche_opened",
      "ai_tutor_opened",
      "ai_question_sent",
      "begin_checkout",
      "add_payment_info",
    ]) {
      expect(Object.values(EVENTS)).toContain(nom);
    }
  });

  it("landing_viewed et return_visit sont emis depuis le point central", () => {
    expect(eduAnalyticsSrc).toMatch(/landingViewed/);
    expect(eduAnalyticsSrc).toMatch(/returnVisit/);
  });

  it("cta_clicked passe par un listener delegue (coverage de tous les CTA)", () => {
    expect(eduAnalyticsSrc).toMatch(/document\.addEventListener\("click"/);
    expect(eduAnalyticsSrc).toMatch(/closest\?\.\("a\[href\]"\)/);
  });

  it("cta_clicked n'est pas dedupe (chaque clic est reel)", () => {
    expect(eduAnalyticsSrc).toMatch(/dedupe:\s*false/);
  });

  it("grade_selected n'est emis que sur un clic explicite", () => {
    expect(coursSrc).toMatch(/gradeSelected/);
    // la detection automatique userGrade ne doit pas etre confondue
    // avec un choix de l'utilisateur : l'evenement doit etre emis
    // dans le meme gestionnaire que l'affectation d'etat.
    const select = coursSrc.indexOf("setSelectedGrade(g.code)");
    const track = coursSrc.indexOf("gradeSelected", select);
    expect(select).toBeGreaterThan(-1);
    expect(track).toBeGreaterThan(select);
    expect(track - select).toBeLessThan(400);
  });

  it("subject_selected est emis depuis le catalogue et les matieres", () => {
    expect(coursSrc).toMatch(/subjectSelected/);
    expect(matieresSrc).toMatch(/subjectSelected/);
  });

  it("referral_clicked ne remonte que la presence d'un code", () => {
    expect(inscriptionSrc).toMatch(/referralClicked,\s*\{\s*has_code:\s*true/);
    expect(inscriptionSrc).not.toMatch(/referralClicked,\s*\{[^}]*code:\s*params/);
  });

  it("les nouveaux evenements passent par trackEvent (donc par le filtre PII)", () => {
    // pas de gtag direct : le canal unique garantit le filtrage
    expect(eduAnalyticsSrc).not.toMatch(/gtag\(/);
    expect(coursSrc).not.toMatch(/gtag\(/);
    expect(matieresSrc).not.toMatch(/gtag\(/);
  });
});

// ------------------------------------------------------------------
// D. Non-regression 3d (Clarity, nonce CSP, first-party)
// ------------------------------------------------------------------
describe("3f — non-regression analytics 3d", () => {
  it("le stub Clarity precede toujours l'injection du tag", () => {
    const stub = analyticsSrc.indexOf("w.clarity = (...args");
    const tag = analyticsSrc.indexOf("clarity.ms/tag/");
    expect(stub).toBeGreaterThan(-1);
    expect(tag).toBeGreaterThan(stub);
  });

  it("le bootstrap gtag inline conserve le nonce CSP", () => {
    expect(analyticsSrc).toMatch(/currentCspNonce\(\)/);
    expect(analyticsSrc).toMatch(/inline\.nonce = nonce/);
  });

  it("le stockage first-party reste disponible sans consentement marketing", () => {
    // sendToInternal est appele avant le test de consentement analytics,
    // au sein de trackEvent (et non dans loadAnalyticsScripts, qui
    // contient aussi un test de consentement).
    const body = analyticsSrc.slice(analyticsSrc.indexOf("export function trackEvent"));
    const internal = body.indexOf("sendToInternal(name, params)");
    const gate = body.indexOf("if (!analyticsAccepted()) return;");
    expect(internal).toBeGreaterThan(-1);
    expect(gate).toBeGreaterThan(internal);
  });

  it("le filtre est applique aux trois destinations tierces", () => {
    expect(analyticsSrc).toMatch(/trackMarketing\(mEvent, safe/);
    expect(analyticsSrc).toMatch(/\.\.\.out,\s*\n\s*event_source/);
    expect(analyticsSrc).toMatch(/Object\.entries\(out\)/);
  });

  it("le cache du statut premium alimente toujours la dimension plan", () => {
    expect(analyticsSrc).toMatch(/params\.plan = plan/);
  });
});