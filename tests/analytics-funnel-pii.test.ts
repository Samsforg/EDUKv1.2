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
// C2. demo_message_sent — instrumentation demo Kora (P2.7.1)
// ------------------------------------------------------------------
describe("P2.7.1 — demo_message_sent (demo publique Kora)", () => {
  const tutorDemoSrc = read("src", "components", "TutorDemoPage.tsx");

  it("est present dans EVENTS", () => {
    expect(Object.values(EVENTS)).toContain("demo_message_sent");
    expect(EVENTS.demoMessageSent).toBe("demo_message_sent");
  });

  it("est declenche depuis TutorDemoPage via trackEvent", () => {
    expect(tutorDemoSrc).toMatch(/trackEvent\(EVENTS\.demoMessageSent/);
  });

  it("l'appel ne transmet aucune propriete de message ni de reponse", () => {
    // aucun parametre : ni message, prompt, content, query, question_text
    expect(tutorDemoSrc).toMatch(/trackEvent\(EVENTS\.demoMessageSent,\s*\{\}/);
    expect(tutorDemoSrc).not.toMatch(
      /trackEvent\(EVENTS\.demoMessageSent,\s*\{[^}]*(message|prompt|content|query|question)/,
    );
  });

  it("l'evenement est emis apres le guard (message non vide + !sending)", () => {
    const guard = tutorDemoSrc.indexOf("if (!message || sending) return;");
    const track = tutorDemoSrc.indexOf("trackEvent(EVENTS.demoMessageSent");
    expect(guard).toBeGreaterThan(-1);
    expect(track).toBeGreaterThan(guard);
  });

  it("utilise dedupe: false pour permettre les messages successifs", () => {
    expect(tutorDemoSrc).toMatch(/trackEvent\(EVENTS\.demoMessageSent,\s*\{\},\s*\{\s*dedupe:\s*false\s*\}\)/);
  });
});

// ------------------------------------------------------------------
// C3. signup_validation_failed — echecs validation client (P2.7.2)
// ------------------------------------------------------------------
describe("P2.7.2 — signup_validation_failed (validation client inscription)", () => {
  const inscriptionSrc2 = read("src", "app", "inscription-1-2-edukora", "page.tsx");

  it("est present dans EVENTS", () => {
    expect(Object.values(EVENTS)).toContain("signup_validation_failed");
    expect(EVENTS.signupValidationFailed).toBe("signup_validation_failed");
  });

  it("est declenche via le helper failValidation", () => {
    expect(inscriptionSrc2).toMatch(/trackEvent\(EVENTS\.signupValidationFailed/);
  });

  it("le helper utilise une enum fermee de rules, sans donnee utilisateur", () => {
    // la signature du helper ne contient que rule (enum) et message (affiche, jamais tracke)
    expect(inscriptionSrc2).toMatch(
      /function failValidation\(\s*rule:\s*"name"\s*\|\s*"phone"\s*\|\s*"password"\s*\|\s*"email"\s*\|\s*"class"\s*\|\s*"serie"\s*\|\s*"privacy"/,
    );
    // trackEvent ne reçoit que { rule } — jamais le message
    expect(inscriptionSrc2).toMatch(
      /trackEvent\(EVENTS\.signupValidationFailed,\s*\{\s*rule\s*\},\s*\{\s*dedupe:\s*false\s*\}\)/,
    );
  });

  it("les 12 sites de validation client passent par failValidation", () => {
    // chaque setError des bornes de validation est remplace par failValidation
    const calls = inscriptionSrc2.match(/failValidation\("/g) ?? [];
    expect(calls).toHaveLength(12);
  });

  it("aucun appel failValidation n'est fait apres setLoading (hors validation)", () => {
    const lastValidation = inscriptionSrc2.lastIndexOf('failValidation("privacy"');
    const setLoading = inscriptionSrc2.indexOf("setLoading(true)");
    expect(lastValidation).toBeGreaterThan(-1);
    expect(setLoading).toBeGreaterThan(lastValidation);
  });

  it("les erreurs reseau et serveur ne declenchent pas signup_validation_failed", () => {
    // le catch reseau et la branche serveur utilisent toujours setError, pas failValidation
    const catchBlock = inscriptionSrc2.indexOf('setError("Erreur réseau. Réessayez.")');
    const serverBlock = inscriptionSrc2.indexOf("setError(data.error ??");
    const eventCall = inscriptionSrc2.indexOf("trackEvent(EVENTS.signupValidationFailed");
    // failValidation est appele avant setLoading, les erreurs reseau/serveur apres
    expect(eventCall).toBeLessThan(inscriptionSrc2.indexOf("setLoading(true)"));
    // ni le catch ni la branche serveur ne contiennent failValidation
    expect(inscriptionSrc2.slice(catchBlock, catchBlock + 40)).not.toMatch(/failValidation/);
    expect(inscriptionSrc2.slice(serverBlock, serverBlock + 60)).not.toMatch(/failValidation/);
  });

  it("dedupe: false permet de compter chaque echec distinct", () => {
    expect(inscriptionSrc2).toMatch(/dedupe:\s*false/);
  });
});

// ------------------------------------------------------------------
// C4. P2.7.4 — cta_impression, demo_opened, demo_signup_clicked
// ------------------------------------------------------------------
describe("P2.7.4 — instrumentation tunnel conversion", () => {
  const tutorDemoSrc2 = read("src", "components", "TutorDemoPage.tsx");
  const homepageSrc = read("src", "app", "page.tsx");

  it("cta_impression est present dans EVENTS", () => {
    expect(Object.values(EVENTS)).toContain("cta_impression");
    expect(EVENTS.ctaImpression).toBe("cta_impression");
  });

  it("demo_opened est present dans EVENTS", () => {
    expect(Object.values(EVENTS)).toContain("demo_opened");
    expect(EVENTS.demoOpened).toBe("demo_opened");
  });

  it("demo_signup_clicked est present dans EVENTS (deprecated, non emis)", () => {
    // P2.7.6 — l'evenement reste declare pour la taxonomie historique
    // mais n'est plus emis : le clic est capte par cta_clicked {cta_id}.
    expect(Object.values(EVENTS)).toContain("demo_signup_clicked");
    expect(EVENTS.demoSignupClicked).toBe("demo_signup_clicked");
  });

  it("cta_impression utilise IntersectionObserver avec data-cta-id", () => {
    expect(eduAnalyticsSrc).toMatch(/IntersectionObserver/);
    expect(eduAnalyticsSrc).toMatch(/\[data-cta-id\]/);
    expect(eduAnalyticsSrc).toMatch(/trackEvent\(EVENTS\.ctaImpression/);
  });

  it("cta_impression detecte les elements ajoutes dynamiquement (MutationObserver)", () => {
    // P2.7.6 — L1 : le CTA kora_demo_signup est rendu apres 2 messages.
    // MutationObserver re-observe les nouveaux [data-cta-id] dans le DOM.
    expect(eduAnalyticsSrc).toMatch(/MutationObserver/);
    expect(eduAnalyticsSrc).toMatch(/mutationObserver\.observe\(document\.body/);
    expect(eduAnalyticsSrc).toMatch(/childList:\s*true/);
    expect(eduAnalyticsSrc).toMatch(/subtree:\s*true/);
  });

  it("cta_impression n'est emise qu'une fois par element et par vue", () => {
    // le Set `seen` empeche les re-emissions pour le meme cta_id
    expect(eduAnalyticsSrc).toMatch(/seen\.has\(id\)/);
    expect(eduAnalyticsSrc).toMatch(/seen\.add\(id\)/);
  });

  it("cta_impression ne transmet que cta_id (clé contrôlée)", () => {
    expect(eduAnalyticsSrc).toMatch(/trackEvent\(EVENTS\.ctaImpression,\s*\{\s*cta_id:\s*id\s*\}\)/);
  });

  it("la homepage porte data-cta-id sur le CTA hero", () => {
    expect(homepageSrc).toMatch(/data-cta-id="home_hero_primary"/);
  });

  it("demo_opened est emis au mount de TutorDemoPage avec guard useRef", () => {
    expect(tutorDemoSrc2).toMatch(/trackEvent\(EVENTS\.demoOpened\)/);
    expect(tutorDemoSrc2).toMatch(/openedRef\.current/);
    // guard avant l'emission
    const guard = tutorDemoSrc2.indexOf("if (openedRef.current) return;");
    const track = tutorDemoSrc2.indexOf("trackEvent(EVENTS.demoOpened)");
    expect(guard).toBeGreaterThan(-1);
    expect(track).toBeGreaterThan(guard);
  });

  it("demo_opened ne transmet aucune propriete", () => {
    expect(tutorDemoSrc2).toMatch(/trackEvent\(EVENTS\.demoOpened\)/);
    expect(tutorDemoSrc2).not.toMatch(/trackEvent\(EVENTS\.demoOpened,\s*\{/);
  });

  it("kora_demo_signup a data-cta-id mais plus d'onClick (L2 : pas de double comptage)", () => {
    // P2.7.6 — L2 : le listener delege cta_clicked capte le clic via
    // data-cta-id. Plus d'onClick sur le Link = un seul cta_clicked.
    expect(tutorDemoSrc2).toMatch(/data-cta-id="kora_demo_signup"/);
    // Ne doit PLUS y avoir d'emission demo_signup_clicked sur le Link
    const linkSection = tutorDemoSrc2.slice(
      tutorDemoSrc2.indexOf('data-cta-id="kora_demo_signup"'),
    );
    const linkEnd = linkSection.indexOf(">");
    const linkTag = linkSection.slice(0, linkEnd);
    expect(linkTag).not.toMatch(/onClick/);
  });

  it("cta_clicked inclut cta_id depuis data-cta-id", () => {
    // P2.7.6 — L2 : un seul cta_clicked par clic physique, avec cta_id
    // pour distinguer home_hero_primary de kora_demo_signup.
    expect(eduAnalyticsSrc).toMatch(/getAttribute\("data-cta-id"\)/);
    expect(eduAnalyticsSrc).toMatch(/\.\.\.\(ctaId\s*\?\s*\{\s*cta_id:\s*ctaId\s*\}\s*:\s*\{\}\)/);
  });

  it("demo_opened et demo_opened ne transmettent aucune donnee de conversation", () => {
    expect(tutorDemoSrc2).not.toMatch(/trackEvent\(EVENTS\.demoOpened,[^)]*(message|content|reply)/);
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