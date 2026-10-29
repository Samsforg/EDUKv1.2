/**
 * P239 — Extension du contenu pédagogique technique
 * Répare ls1 (exercises manquantes) + ajoute des leçons aux 20 combinaisons vides.
 */
import { queryOne, run } from "./db";
import { logger } from "@/lib/logger";

interface ExerciseSeed {
  type: "qcm" | "ouvert" | "calcul" | "dissertation" | "vrai_faux";
  question: string;
  answer: string;
  explanation: string;
}

interface LessonSeed {
  title: string;
  summary: string;
  content: string;
  exercises: ExerciseSeed[];
}

// ─── Helper ──────────────────────────────────────────────────────────────────
async function insertLesson(
  chapterId: number,
  lesson: LessonSeed,
  position: number,
): Promise<number | null> {
  const existing = await queryOne<{ id: number }>(
    "SELECT id FROM lessons WHERE chapter_id = ? AND title = ?",
    chapterId, lesson.title,
  );
  if (existing) return existing.id;

  const contentMd = `# ${lesson.title}\n\n## Objectifs\n${lesson.summary}\n\n## Leçon\n\n${lesson.content}\n\n## Exercices\n\n${lesson.exercises.map((ex, ei) =>
    `### Exercice ${ei + 1} (${ex.type.toUpperCase()})\n\n**Énoncé :** ${ex.question}\n\n**Réponse :** ${ex.answer}\n\n**Explication :** ${ex.explanation}`,
  ).join("\n\n")}`;

  const result = await run(
    "INSERT INTO lessons (chapter_id, title, summary, content_md, position, status) VALUES (?, ?, ?, ?, ?, 'approved')",
    chapterId, lesson.title, lesson.summary, contentMd, position,
  );
  const lessonId = Number(result.lastInsertRowid);

  for (let ei = 0; ei < lesson.exercises.length; ei++) {
    const ex = lesson.exercises[ei];
    await run(
      "INSERT INTO exercises (lesson_id, type, question_md, answer_md, explanation_md, difficulty, points) VALUES (?, ?, ?, ?, ?, 1, 1)",
      lessonId, ex.type, ex.question, ex.answer, ex.explanation,
    );
  }
  return lessonId;
}

// ─── Réparation ls1 : exercices manquants pour ch1 ──────────────────────────
async function repairMissingExercises(): Promise<void> {
  // Find ls1 by subject+grade, not by hardcoded chapter_id (chapter IDs differ across environments)
  const subjId = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = ?", "comptabilite");
  const gradeId = await queryOne<{ id: number }>("SELECT id FROM grades WHERE code = ?", "2nde_g2");
  if (!subjId || !gradeId) { logger.info("[P239] ls1 subject/grade not found, skip repair"); return; }
  const chId = await queryOne<{ id: number }>(
    "SELECT id FROM chapters WHERE subject_id = ? AND grade_id = ?", subjId.id, gradeId.id,
  );
  if (!chId) { logger.info("[P239] ls1 chapter not found, skip repair"); return; }
  const ls1 = await queryOne<{ id: number }>(
    "SELECT id FROM lessons WHERE chapter_id = ? AND title = ?",
    chId.id, "Qu'est-ce que la comptabilité ?",
  );
  if (!ls1) { logger.info("[P239] ls1 not found, skip repair"); return; }

  const count = await queryOne<{ cnt: number }>("SELECT COUNT(*) as cnt FROM exercises WHERE lesson_id = ?", ls1.id);
  if (count && count.cnt >= 5) { logger.info("[P239] ls1 already has enough exercises, skip"); return; }

  logger.info("[P239] Repairing ls1 exercises...");
  const exercises: ExerciseSeed[] = [
    { type: "qcm", question: "La comptabilité ivoirienne est régie par :", answer: "Le SYSCOHADA", explanation: "Le SYSCOHADA est le référentiel comptable applicable en Côte d'Ivoire." },
    { type: "qcm", question: "Quel document justifie une vente de marchandises ?", answer: "La facture", explanation: "La facture est le document commercial qui constate une vente." },
    { type: "calcul", question: "Une entreprise achète des marchandises pour 500 000 FCFA avec une remise de 10%. Quel est le montant net ?", answer: "450 000 FCFA", explanation: "Remise = 500 000 × 10% = 50 000. Net = 500 000 − 50 000 = 450 000 FCFA." },
    { type: "vrai_faux", question: "Le relevé bancaire est émis par l'entreprise.", answer: "Faux", explanation: "Le relevé bancaire est émis par la banque, pas par l'entreprise." },
    { type: "ouvert", question: "Expliquez pourquoi la comptabilité est importante pour une petite entreprise ivoirienne.", answer: "La comptabilité permet de : (1) suivre les recettes et dépenses pour connaître le bénéfice, (2) justifier les charges auprès du fisc, (3) obtenir un crédit bancaire, (4) prendre des décisions éclairées.", explanation: "" },
  ];
  for (let ei = 0; ei < exercises.length; ei++) {
    await run(
      "INSERT INTO exercises (lesson_id, type, question_md, answer_md, explanation_md, difficulty, points) VALUES (?, ?, ?, ?, ?, 1, 1)",
      ls1.id, exercises[ei].type, exercises[ei].question, exercises[ei].answer, exercises[ei].explanation,
    );
  }
  logger.info("[P239] ls1 repaired with 5 exercises.");
}

// ─── COMPTABILITÉ ────────────────────────────────────────────────────────────
const COMPTA_LESSONS: Record<string, LessonSeed[]> = {
  // 2nde-AB : Comptabilité générale — niveau débutant
  "2nde_ab": [
    {
      title: "Les bases de la comptabilité",
      summary: "Définition, finalités et premiers principes de la comptabilité.",
      content: `La comptabilité est le langage des affaires. Elle permet de traduire en chiffres la vie de l'entreprise.\n\n**Pourquoi tenir une comptabilité ?**\n- Connaître le résultat (bénéfice ou perte)\n- Justifier chaque opération (pièces comptables)\n- Préparer les déclarations fiscales\n- Prendre des décisions éclairées\n\n**Les principes fondamentaux (SYSCOHADA) :**\n1. Indépendance des exercices : chaque exercice couvre une année\n2. Intégrité : l'ensemble des opérations doit être enregistré\n3. Image fidèle : les états financiers doivent refléter la réalité\n4. Continuité d'exploitation : l'entreprise poursuit son activité\n\n**Le compte : outil de base**\nChaque opération est inscrite sur des comptes. Un compte a deux côtés :\n- **Débit** (gauche) : ce que l'entreprise reçoit\n- **Crédit** (droite) : ce que l'entreprise donne\n\n**Exemple :** L'entreprise achète du matériel pour 200 000 FCFA.\n- Débit : Compte 2182 (Autres immobilisations corporelles) = 200 000\n- Crédit : Compte 531 (Caisse) = 200 000`,
      exercises: [
        { type: "qcm", question: "Le SYSCOHADA s'applique en Côte d'Ivoire depuis :", answer: "2001", explanation: "La Côte d'Ivoire a adopté le SYSCOHADA révisé en 2001." },
        { type: "qcm", question: "Un compte de classe 2 contient :", answer: "Des immobilisations", explanation: "La classe 2 regroupe les immobilisations (actif non courant)." },
        { type: "calcul", question: "Acheter du mobilier pour 150 000 FCFA payé en espèces. Quel est le montant au débit ?", answer: "150 000 FCFA", explanation: "Le mobilier (compte 2181) est débité de 150 000 FCFA." },
        { type: "vrai_faux", question: "Le principe d'indépendance des exercices signifie qu'on peut regrouper plusieurs années.", answer: "Faux", explanation: "Chaque exercice est indépendant et couvre une période d'un an." },
        { type: "ouvert", question: "Expliquez avec vos propres mots la différence entre le débit et le crédit.", answer: "Le débit (à gauche) enregistre les entrées ou augmentations d'actif. Le crédit (à droite) enregistre les sorties ou augmentations de passif. Toute écriture doit avoir autant au débit qu'au crédit.", explanation: "" },
      ],
    },
  ],
  // 1ère-G2 : Comptabilité analytique
  "1ere_g2": [
    {
      title: "Les coûts complets et partiels",
      summary: "Distinction entre charges directes et indirectes, calcul du coût de revient.",
      content: `La comptabilité analytique analyse les coûts par produit, service ou département.\n\n**Charges directes** :directement attribuables à un produit (matière première, main-d'œuvre directe)\n**Charges indirectes** :nécessitent un répartiteur (électricité, loyer, amortissements)\n\n**Calcul du coût de revient unitaire :**\nCoût de revient = Coût d'achat + Coûts de transformation + Frais commerciaux\n\n**Exemple :** Production de 500 unités de chocolat.\n- Matière première : 250 000 FCFA\n- Main-d'œuvre directe : 150 000 FCFA\n- Frais indirects (répartis) : 100 000 FCFA\n- Coût total = 500 000 FCFA\n- Coût unitaire = 500 000 / 500 = 1 000 FCFA/unité\n\n**Seuil de rentabilité :** Point où CA = Coûts totaux.\nAu-delà = bénéfice. En deçà = perte.`,
      exercises: [
        { type: "qcm", question: "Un charge indirecte se caractérise par :", answer: "Un besoin de répartiteur", explanation: "Les charges indirectes ne peuvent pas être directement rattachées à un produit." },
        { type: "calcul", question: "Coût total = 800 000 FCFA pour 400 unités. Coût unitaire ?", answer: "2 000 FCFA", explanation: "Coût unitaire = 800 000 / 400 = 2 000 FCFA." },
        { type: "qcm", question: "Le seuil de rentabilité est le niveau d'activité où :", answer: "Le résultat est nul", explanation: "Au seuil de rentabilité, le chiffre d'affaires égale les charges totales." },
        { type: "vrai_faux", question: "La main-d'œuvre directe est une charge indirecte.", answer: "Faux", explanation: "La main-d'œuvre directe est une charge directe : on peut la rattacher à un produit." },
        { type: "calcul", question: "CA = 1 200 000 FCFA, Coût variable = 720 000 FCFA, Charges fixes = 300 000 FCFA. Marge sur coûts variables ?", answer: "480 000", explanation: "MCV = CA - CV = 1 200 000 - 720 000 = 480 000 FCFA." },
      ],
    },
  ],
  // 1ère-B : Comptabilité analytique
  "1ere_b": [
    {
      title: "L'analyse des charges par comportement",
      summary: "Charges fixes, variables et mixtes — outil de décision.",
      content: `Analyser le comportement des charges permet de prévoir l'impact d'une variation d'activité.\n\n**Charges fixes** :ne varient pas avec le volume (loyer, assurance)\n**Charges variables** :proportionnelles au volume (matières premières)\n**Charges mixtes** :partie fixe + partie variable (électricité)\n\n**Méthode de High-Low :**\nPour séparer les charges mixtes :\n1. Prendre le point d'activité le plus élevé et le plus bas\n2. Calculer le coût variable unitaire = (Charge max − Charge min) / (Activité max − Activité min)\n3. Déduire la part fixe\n\n**Exemple :** Électricité d'une usine.\n- Juin (1 000 h) : 450 000 FCFA\n- Janvier (400 h) : 270 000 FCFA\n- CV unitaire = (450 000 − 270 000) / (1 000 − 400) = 180 000 / 600 = 300 FCFA/h\n- Fixe = 450 000 − (1 000 × 300) = 150 000 FCFA\n- Pour 800 h : Charge = 150 000 + (800 × 300) = 390 000 FCFA`,
      exercises: [
        { type: "qcm", question: "Un loyer est une charge :", answer: "Fixe", explanation: "Le loyer ne varie pas avec le volume de production." },
        { type: "calcul", question: "CV unitaire = 200 FCFA, Charges fixes = 100 000 FCFA. Charge totale pour 500 unités ?", answer: "200 000", explanation: "Charge totale = 100 000 + (500 × 200) = 200 000 FCFA." },
        { type: "qcm", question: "La méthode de High-Low sert à :", answer: "Séparer les charges mixtes", explanation: "Elle utilise les points extrêmes d'activité pour isoler la part fixe et variable." },
        { type: "vrai_faux", question: "Les charges variables totales augmentent quand l'activité augmente.", answer: "Vrai", explanation: "Les charges variables varient proportionnellement au volume d'activité." },
        { type: "calcul", question: "Point haut : 2 000 unités, charge = 600 000. Point bas : 800 unités, charge = 360 000. CV unitaire ?", answer: "200", explanation: "CV unitaire = (600 000 − 360 000) / (2 000 − 800) = 240 000 / 1 200 = 200 FCFA." },
      ],
    },
  ],
  // Tle-G2 : Comptabilité approfondie
  "term_g2": [
    {
      title: "Les regroupements comptables",
      summary: "Tableau de regroupement, bilan fonctionnel et analyse de la trésorerie.",
      content: `Le tableau de regroupement classe les postes du bilan par nature fonctionnelle.\n\n**Emplois stabiles** = Actif immobilisé + Capital circulant nécessaire (BCA)\n**Ressources stabiles** = Capitaux propres + Dettes long terme + Provisions\n\n**Fonds de roulement (FR) = Ressources stabiles − Emplois stabiles**\n**Besoins en fonds de roulement (BFR) = Actif circulant − Dettes court terme**\n**Trésorerie nette = FR − BFR**\n\n**Application :** Une PME ivoirienne de transformation agroalimentaire :\n- Capitaux propres : 50 M FCFA\n- Emprunts LT : 30 M FCFA\n- Actif immobilisé : 60 M FCFA\n- BCA : 20 M FCFA\n- Dettes CT : 25 M FCFA\n\nFR = (50 + 30) − (60 + 20) = 0\nBFR = BCA − Dettes CT = 20 − 25 = −5 M\nTrésorerie = 0 − (−5) = 5 M FCFA (positive ✓)`,
      exercises: [
        { type: "qcm", question: "Le BFR représente :", answer: "Les emplois liés au cycle d'exploitation", explanation: "Le BFR mesure le décalage entre les encaissements et les décaissements." },
        { type: "calcul", question: "Ressources stabiles = 80M, Emplois stabiles = 60M. FR ?", answer: "20M", explanation: "FR = 80 − 60 = 20 millions FCFA." },
        { type: "vrai_faux", question: "Un BFR négatif est toujours mauvais pour l'entreprise.", answer: "Faux", explanation: "Un BFR négatif signifie que les dettes CT dépassent le BCA : l'entreprise est financée par ses fournisseurs." },
        { type: "qcm", question: "La trésorerie nette est positive quand :", answer: "Le FR > le BFR", explanation: "Trésorerie nette = FR − BFR. Elle est positive si le FR couvre le BFR." },
        { type: "calcul", question: "FR = 15M, BFR = 8M. Trésorerie nette ?", answer: "7M", explanation: "Trésorerie = 15 − 8 = 7 millions FCFA." },
      ],
    },
  ],
};

// ─── ÉCONOMIE ────────────────────────────────────────────────────────────────
const ECO_LESSONS: Record<string, LessonSeed[]> = {
  "2nde_ab": [
    {
      title: "Les agents économiques et leurs interactions",
      summary: "Ménages, entreprises, État et reste du monde — circuits économiques.",
      content: `L'économie étudie la manière dont les sociétés utilisent des ressources rares pour satisfaire des besoins illimités.\n\n**Les 4 agents économiques :**\n| Agent | Rôle |\n|-------|------|\n| Ménages | Consomment, épargnent, offrent du travail |\n| Entreprises | Produisent des biens et services |\n| État | Collecte impôts, fournit services publics |\n| Reste du monde | Échanges avec l'étranger (exportations/importations) |\n\n**Le circuit économique en Côte d'Ivoire :**\n1. Les ménages offrent du travail aux entreprises → reçoivent des salaires\n2. Les entreprises produisent → vendent aux ménages → réalisent du CA\n3. L'État prélève des impôts → finance services publics\n4. Le reste du monde échange (cacao contre machines)\n\n**PIB = Consommation + Investment + Dépenses publiques + (Exportations − Importations)`,
      exercises: [
        { type: "qcm", question: "Quel agent économique offre du travail ?", answer: "Les ménages", explanation: "Les ménages fournissent les facteurs de production (travail, capital)." },
        { type: "qcm", question: "Le cacao exporté par la Côte d'Ivoire entre dans :", answer: "Les exportations (X)", explanation: "Le cacao est la principale exportation ivoirienne." },
        { type: "calcul", question: "C = 30M, I = 10M, G = 15M, X = 8M, M = 12M. Calculez le PIB.", answer: "51M", explanation: "PIB = 30 + 10 + 15 + (8−12) = 51 millions." },
        { type: "vrai_faux", question: "L'État est à la fois preneur et vendeur sur le marché des biens.", answer: "Vrai", explanation: "L'État achète des biens (marchés publics) et en produit (services publics)." },
        { type: "ouvert", question: "Expliquez le rôle du reste du monde dans l'économie ivoirienne.", answer: "Le reste du monde représente les échanges extérieurs : exportations de cacao, café, mangue ; importations de pétrole, machines, médicaments. La balance commerciale ivoirienne est déficitaire car les importations dépassent les exportations.", explanation: "" },
      ],
    },
  ],
  "1ere_g2": [
    {
      title: "La politique monétaire en zone UEMOA",
      summary: "Rôle de la BCEAO, instruments de politique monétaire et impact sur l'économie.",
      content: `La BCEAO (Banque Centrale des États de l'Afrique de l'Ouest) supervise la politique monétaire de la zone UEMOA (8 pays).\n\n**Mission principale :** Maintenir la stabilité des prix (inflation < 3% en zone).\n\n**Instruments :**\n- Taux directeur : taux auquel la BCEAO prête aux banques commerciales\n- Taux minimum d'enchère : taux lors des opérations d'affinage\n- Réserves obligatoires : pourcentage des dépôts que les banques doivent garder en réserve\n- Opérations de marché ouvert : achats/ventes d'obligations\n\n**Transmission :**\nTaux directeur ↑ → Coût du crédit ↑ → Investissement ↓ → Inflation ↓\n\n**Contexte ivoirien :** En 2023, l'inflation en Côte d'Ivoire était d'environ 3,5%, légèrement au-dessus de la cible de la BCEAO, en raison des tensions géopolitiques et des coûts énergétiques.`,
      exercises: [
        { type: "qcm", question: "La BCEAO siège à :", answer: "Abidjan", explanation: "Le siège de la BCEAO est à Abidjan, en Côte d'Ivoire." },
        { type: "qcm", question: "L'objectif principal de la BCEAO est :", answer: "La stabilité des prix", explanation: "Stabilité des prix = inflation faible et stable (< 3% en zone UEMOA)." },
        { type: "calcul", question: "Si le taux directeur passe de 3% à 4%, que se passe-t-il pour le coût du crédit ?", answer: "Il augmente", explanation: "Un taux directeur plus élevé renchérit le coût du crédit pour les banques et leurs clients." },
        { type: "vrai_faux", question: "La monnaie commune de la zone UEMOA est le franc CFA.", answer: "Vrai", explanation: "Le franc CFA (XOF) est la monnaie de la zone UEMOA, liée à l'euro." },
        { type: "ouvert", question: "Pourquoi la BCEAO est-elle indépendante du gouvernement ivoirien ?", answer: "L'indépendance de la BCEAO évite que le gouvernement ne finance ses déficits par l'impression monétaire, ce qui provoquerait de l'inflation. Cette indépendance garantit la crédibilité de la politique monétaire.", explanation: "" },
      ],
    },
  ],
  "1ere_b": [
    {
      title: "La demande et l'offre — équilibre de marché",
      summary: "Lois de la demande et de l'offre, détermination du prix d'équilibre.",
      content: `Sur un marché concurrentiel, le prix se forme par l'interaction de la demande et de l'offre.\n\n**Loi de la demande :** À prix constant, plus le prix baisse, plus la quantité demandée augmente (relation inverse).\n\n**Loi de l'offre :** À prix constant, plus le prix augmente, plus la quantité offerte augmente (relation directe).\n\n**Équilibre de marché :** Point où Quantités Offerte = Quantités Demandée.\n\n| Prix (FCFA/kg) | Qd | Qo | Déséquilibre |\n|---------------|-----|-----|-------------|\n| 800 | 1000 | 400 | Pénurie (+600) |\n| 1000 | 800 | 800 | **Équilibre** |\n| 1200 | 600 | 1200 | Surplus (−600) |\n\n**Application :** Marché du riz en Côte d'Ivoire. Le gouvernement peut intervenir via :\n- Prix plancher (minimum garanti aux riziculteurs)\n- Prix plafond (accessibilité pour les consommateurs)\n- Subventions aux intrants`,
      exercises: [
        { type: "qcm", question: "Quand le prix est supérieur au prix d'équilibre, il y a :", answer: "Un surplus", explanation: "À un prix trop élevé, l'offre excède la demande." },
        { type: "qcm", question: "Une augmentation du revenu des ménages déplace la courbe de demande vers :", answer: "La droite", explanation: "Un revenu plus élevé augmente la demande à chaque prix." },
        { type: "calcul", question: "Qd = 200 − 10P, Qo = 50 + 5P. Trouvez le prix d'équilibre.", answer: "10", explanation: "200 − 10P = 50 + 5P → 150 = 15P → P = 10." },
        { type: "vrai_faux", question: "Une subvention aux producteurs déplace l'offre vers la droite.", answer: "Vrai", explanation: "Une subvention réduit le coût de production, augmentant l'offre à chaque prix." },
        { type: "ouvert", question: "Analysez l'impact d'une sécheresse sur le marché du mangue en Côte d'Ivoire.", answer: "La sécheresse réduit la production (offre se déplace vers la gauche). Le prix augmente, la quantité échangée diminue. Les consommateurs paient plus cher, les producteurs peuvent gagner plus par unité mais vendent moins.", explanation: "" },
      ],
    },
  ],
  "term_g2": [
    {
      title: "La croissance économique et le développement",
      summary: "Distinction croissance/développement, indicateurs, rôle de la Côte d'Ivoire.",
      content: `**Croissance** = augmentation du PIB réel sur une période.\n**Développement** = amélioration du niveau de vie (santé, éducation, infrastructure).\n\n**Indicateurs de développement :**\n- IDH (Indice de Développement Humain) = espérance de vie + éducation + revenu\n- Taux d'alphabétisation\n- Taux de mortalité infantile\n- Accès à l'eau potable\n\n**Côte d'Ivoire — Données 2023 :**\n- PIB : ~75 000 milliards FCFA\n- Croissance : ~6,5%/an\n- IDH : 0,548 (moyen, rang ~160)\n- Secteurs porteurs : agriculture (cacao), industriesagroalimentaires, BTP, télécoms\n\n**Défis du développement :** Informel (>80% de l'emploi), inégalités territoriales, besoin d'industrialisation.`,
      exercises: [
        { type: "qcm", question: "L'IDH comprend trois dimensions :", answer: "Santé, éducation, revenu", explanation: "L'IDH combine espérance de vie, niveau d'instruction et revenu par habitant." },
        { type: "qcm", question: "Le PIB réel par rapport au PIB nominal :", answer: "Corrige l'inflation", explanation: "Le PIB réel est exprimé en prix constants, sans effet inflation." },
        { type: "calcul", question: "PIB N = 100M, indice des prix = 125. PIB réel ?", answer: "80M", explanation: "PIB réel = PIB nominal / Indice × 100 = 100/1,25 = 80 millions." },
        { type: "vrai_faux", question: "Un pays avec un PIB élevé a nécessairement un IDH élevé.", answer: "Faux", explanation: "Certains pays pétroliers ont un PIB élevé mais un IDH modéré (inégalités fortes)." },
        { type: "ouvert", question: "Pourquoi la croissance du PIB ivoirien ne se traduit-elle pas toujours par une amélioration du niveau de vie ?", answer: "Parce que : (1) l'économie informelle n'est pas mesurée, (2) les inégalités sont fortes, (3) la croissance peut être tirée par les exportations de matières premières sans créer d'emplois qualifiés, (4) l'accès aux services de base reste inégal selon les territoires.", explanation: "" },
      ],
    },
  ],
};

// ─── DROIT ───────────────────────────────────────────────────────────────────
const DROIT_LESSONS: Record<string, LessonSeed[]> = {
  "2nde_ab": [
    {
      title: "Les sources du droit en Côte d'Ivoire",
      summary: "Constitution, lois, règlements — hiérarchie des normes.",
      content: `Le droit ivoirien repose sur plusieurs sources, hiérarchisées selon la pyramide de Kelsen.\n\n**Pyramide des normes :**\n1. Constitution (norme suprême, révisée en 2016)\n2. Traités internationaux ratifiés (art. 85)\n3. Lois organiques et ordinaires\n4. Décrets (Président)\n5. Arrêtés (Ministres, Préfets, Maires)\n\n**L'OHADA** (Organisation pour l'Harmonisation en Afrique du Droit des Affaires) : les Actes Uniformes prévalent sur le droit interne national. La Côte d'Ivoire est membre fondateur (1993).\n\n**Actes uniformes OHADA appliqués :** Droit commercial général, Sociétés commerciales, Droit des sûretés, Procédures collectives, Arbitrage.`,
      exercises: [
        { type: "qcm", question: "Quelle est la norme suprême en Côte d'Ivoire ?", answer: "La Constitution", explanation: "La Constitution de 1960 (révisée) est la norme suprême." },
        { type: "qcm", question: "Un traité international ratifié a une valeur :", answer: "Supérieure à la loi", explanation: "Art. 85 de la Constitution ivoirienne." },
        { type: "vrai_faux", question: "Un arrêté préfectoral peut contredire une loi.", answer: "Faux", explanation: "Un arrêté ne peut contredire une loi : hiérarchie des normes." },
        { type: "qcm", question: "L'OHADA a été fondée en :", answer: "1993", explanation: "L'OHADA a été créée par le traité d'Algésiras le 17 octobre 1993." },
        { type: "ouvert", question: "Pourquoi les Actes Uniformes OHADA sont-ils supérieurs au droit national ivoirien ?", answer: "Par le principe de primauté du droit communautaire : les Actes Uniformes sont directement applicables dans tous les États membres et prévalent sur les lois nationales contradictoires, assurant une sécurité juridique pour les affaires transfrontalières.", explanation: "" },
      ],
    },
  ],
  "1ere_b": [
    {
      title: "Le droit du travail en Côte d'Ivoire",
      summary: "Code du travail, contrat de travail, droits et obligations des parties.",
      content: `Le Code du travail ivoirien (Loi n°60-224 du 28 mars 1960, modifiée) régit les relations de travail.\n\n**Types de contrats :**\n| Contrat | Durée | Usage |\n|---------|-------|-------|\n| CDI | Indéterminée | Emploi stable |\n| CDD | Déterminée | Remplacement, saisonnier |\n| Contrat temporaire | Court terme | Travaux ponctuels |\n\n**Durée légale du travail :** 40h/semaine (8h/jour).\n**Salarié minimum interprofessionnel (SMI) 2024 :** 51 000 FCFA/mois (revalorisé annuellement).\n\n**Droits du salarié :**\n- Droit à un salaire équitable\n- Droit syndical et grève\n- Congés payés (2,5 jours ouvrables/mois = 30 jours/an)\n- Sécurité et santé au travail\n\n**Licenciement :** Doit être réel et sérieux. Indemnité légale = 1 mois de salaire par année d'ancienneté (plafonnée).`,
      exercises: [
        { type: "qcm", question: "La durée légale du travail en Côte d'Ivoire est de :", answer: "40h par semaine", explanation: "40 heures par semaine, soit 8h par jour." },
        { type: "calcul", question: "Un salarié avec 5 ans d'ancienneté et un salaire de 150 000 FCFA est licencié. Quelle est son indemnité ?", answer: "750 000", explanation: "Indemnité = 150 000 × 5 = 750 000 FCFA." },
        { type: "vrai_faux", question: "Un CDD peut être renouvelé indéfiniment.", answer: "Faux", explanation: "Un CDD a une durée limitée. Le renouvellement est encadré par la loi." },
        { type: "qcm", question: "Le salaire minimum interprofessionnel (SMI) en 2024 est de :", answer: "51 000 FCFA/mois", explanation: "Le SMI a été revalorisé à 51 000 FCFA en 2024." },
        { type: "ouvert", question: "Quels sont les recours d'un salarié qui estime son licenciement abusif ?", answer: "Le salarié peut saisir le Conseil de prud'hommes (juridiction compétente). Si le licenciement est jugé abusif, l'employeur devra payer des dommages et intérêts. Le salarié peut aussi demander sa réintégration.", explanation: "" },
      ],
    },
  ],
  "term_g2": [
    {
      title: "Les procédures collectives",
      summary: "Redressement judiciaire, liquidation judiciaire — cadre OHADA.",
      content: `L'Acte Uniforme OHADA relatif aux procédures collectives (révisé en 2015) protège les entreprises en difficulté.\n\n**Deux procédures :**\n1. **Redressement judiciaire** : l'entreprise continue son activité sous surveillance, avec un plan de redressement\n2. **Liquidation judiciaire** : cessation d'activité, vente des actifs, paiement des créanciers\n\n**Conditions d'ouverture :**\n- Difficultés entraînant l'incapacité de payer les dettes exigibles\n- Demande du débiteur, d'un créancier ou du ministère public\n\n**Effets du jugement d'ouverture :**\n- Suspension des poursuites individuelles\n- Désignation d'un administrateur judiciaire\n- Publication au bordereau des créances\n\n**Application :** Une usine de transformation de cacao à Abidjan, confrontée à une crise de trésorerie, peut demander le redressement judiciaire pour négocier un plan avec ses créanciers.`,
      exercises: [
        { type: "qcm", question: "Le redressement judiciaire vise à :", answer: "Permettre la continuation de l'activité", explanation: "Le redressement vise à sauvegarder l'emploi et l'activité de l'entreprise." },
        { type: "qcm", question: "Qui peut demander l'ouverture d'une procédure collective ?", answer: "Le débiteur, un créancier ou le ministère public", explanation: "Trois catégories peuvent saisir le tribunal." },
        { type: "vrai_faux", question: "Un jugement de liquidation judiciaire met fin à l'activité de l'entreprise.", answer: "Vrai", explanation: "La liquidation judiciaire entraîne la cessation de l'activité et la vente des actifs." },
        { type: "calcul", question: "Une entreprise a 500M de dettes et 300M d'actifs. Quel est le Passif Net Comptable ?", answer: "200M", explanation: "PNC = Dettes − Actifs = 500 − 300 = 200 millions FCFA." },
        { type: "ouvert", question: "Expliquez pourquoi le droit des procédures collectives est important pour l'économie ivoirienne.", answer: "Il protège les entreprises viables en difficulté temporaire, préserve les emplois, assure un traitement équitable des créanciers et permet le redressement plutôt que la liquidation systématique.", explanation: "" },
      ],
    },
  ],
};

// ─── INFORMATIQUE ────────────────────────────────────────────────────────────
const INFO_LESSONS: Record<string, LessonSeed[]> = {
  "2nde_ab": [
    {
      title: "Introduction à l'informatique",
      summary: "Historique, définition et composants d'un ordinateur.",
      content: `L'informatique est la science du traitement automatique de l'information.\n\n**Définition :** Infor(mation) + auto(matique) + matiqu(e)\n\n**Les 4 générations d'ordinateurs :**\n1. 1ère (1940-50) : Tubes électroniques (ENIAC)\n2. 2ème (1950-60) : Transistors\n3. 3ème (1960-70) : Circuits intégrés\n4. 4ème (1970-aujourd'hui) : Microprocesseurs\n\n**Composants d'un PC :**\n- CPU (processeur) : unité centrale de traitement\n- RAM : mémoire vive temporaire\n- Disque dur/SSD : stockage permanent\n- Carte mère : connecte tous les composants\n- Alimentation : fournit l'énergie\n\n**Systèmes d'exploitation :** Windows, macOS, Linux (Ubuntu, Fedora). En Côte d'Ivoire, Windows domine dans les écoles et entreprises.`,
      exercises: [
        { type: "qcm", question: "Le processeur (CPU) est surnommé :", answer: "Le cerveau de l'ordinateur", explanation: "Le CPU exécute les instructions et coordonne les autres composants." },
        { type: "qcm", question: "La RAM est une mémoire :", answer: "Volatile", explanation: "La RAM perd son contenu quand l'ordinateur est éteint." },
        { type: "vrai_faux", question: "Linux est un système d'exploitation propriétaire.", answer: "Faux", explanation: "Linux est open source : son code source est librement accessible." },
        { type: "calcul", question: "Combien de bits dans 1 octet ?", answer: "8", explanation: "1 octet = 8 bits." },
        { type: "ouvert", question: "Pourquoi un ordinateur a-t-il besoin d'un système d'exploitation ?", answer: "Le SE gère les ressources matérielles, fournit une interface utilisateur, permet l'exécution des programmes et la gestion des fichiers. Sans SE, l'ordinateur ne peut rien faire d'utilitaire.", explanation: "" },
      ],
    },
  ],
  "1ere_g2": [
    {
      title: "Algorithmique et structures de données",
      summary: "Algorithmes, variables, conditions et boucles en Python.",
      content: `L'algorithmique est l'art de concevoir des suites d'instructions pour résoudre un problème.\n\n**Structure d'un algorithme :**\n\`\nALGORITHME TriBubble\nVARIABLES : T : Tableau[N]; i, j, temp : Entier\nDEBUT\n  POUR i DE 0 A N-1 FAIRE\n    POUR j DE 0 A N-i-2 FAIRE\n      SI T[j] > T[j+1] ALORS\n        temp <- T[j]\n        T[j] <- T[j+1]\n        T[j+1] <- temp\n      FIN SI\n    FIN POUR\n  FIN POUR\n  AFFICHER T\nFIN\n\`\n\n**En Python :**\n\`python\nnotes = [12, 8, 15, 10, 14]\nn = len(notes)\nfor i in range(n):\n    for j in range(0, n-i-1):\n        if notes[j] > notes[j+1]:\n            notes[j], notes[j+1] = notes[j+1], notes[j]\nprint(f"Notes triees : {notes}")\n# Sortie : [8, 10, 12, 14, 15]\n\``,
      exercises: [
        { type: "qcm", question: "Un algorithme de tri par bulles a une complexité :", answer: "O(n²)", explanation: "Le tri à bulles effectue n×(n−1)/2 comparaisons dans le pire cas." },
        { type: "calcul", question: "Combien d'itérations pour trier 5 éléments avec le tri à bulles ?", answer: "10", explanation: "5×4/2 = 10 comparaisons dans le pire cas." },
        { type: "qcm", question: "En Python, `range(1, 5)` génère :", answer: "1, 2, 3, 4", explanation: "range(1, 5) va de 1 inclus à 5 exclus." },
        { type: "vrai_faux", question: "Un tableau est une structure de données dynamique.", answer: "Faux", explanation: "Un tableau a une taille fixe. Les listes Python sont dynamiques." },
        { type: "ouvert", question: "Écrivez un algorithme qui calcule la somme des nombres pairs entre 1 et 100.", answer: "ALGORITHME SommePairs\nVARIABLE s : Entier ← 0\nVARIABLE i : Entier\nDEBUT\n  POUR i DE 2 A 100 PAS 2 FAIRE\n    s <- s + i\n  FIN POUR\n  AFFICHER s  // Résultat : 2550\nFIN", explanation: "" },
      ],
    },
  ],
  "1ere_b": [
    {
      title: "Introduction à la programmation — Python",
      summary: "Variables, types, entrées/sorties et premières fonctions.",
      content: `Python est un langage de programmation interprété, idéal pour débuter.\n\n**Variables et types :**\n\`python\nnom = "Kouassi"        # Chaîne (str)\nage = 17              # Entier (int)\ntaille = 1.75         # Décimal (float)\nest_etudiant = True   # Booléen (bool)\nnotes = [12, 15, 9]   # Liste\n\`\n\n**Entrées et sorties :**\n\`python\nnom = input("Entrez votre nom : ")  # Lecture clavier\nprint(f"Bonjour {nom}, bienvenue!")   # Affichage\n\`\n\n**Conditions :**\n\`python\nmoyenne = float(input("Moyenne : "))\nif moyenne >= 10:\n    print("Admis")\nelif moyenne >= 8:\n    print("Rattrapage")\nelse:\n    print("Redoublement")\n\`\n\n**Application :** Calculatrice simple pour élèves de 1ère-B.`,
      exercises: [
        { type: "qcm", question: "Quel type de donnée est `42` en Python ?", answer: "int", explanation: "42 est un entier (integer)." },
        { type: "qcm", question: "La fonction `input()` retourne :", answer: "Une chaîne de caractères", explanation: "input() lit une ligne au clavier et la retourne toujours comme str." },
        { type: "calcul", question: "Que vaut `17 % 5` en Python ?", answer: "2", explanation: "% est l'opérateur modulo (reste de la division entière). 17 = 3×5 + 2." },
        { type: "vrai_faux", question: "En Python, `True` et `False` sont des mots-clés.", answer: "Vrai", explanation: "True et False sont des booléens intégrés au langage." },
        { type: "ouvert", question: "Écrivez un programme qui demande un âge et affiche si la personne est majeure en Côte d'Ivoire (âge légal = 18 ans).", answer: "age = int(input('Age : '))\nif age >= 18:\n    print('Majeur')\nelse:\n    print('Mineur')", explanation: "" },
      ],
    },
  ],
  "term_g2": [
    {
      title: "Les réseaux informatiques",
      summary: "Topologies, modèles OSI/TCP-IP, adresses IP et équipements.",
      content: `Un réseau informatique relie plusieurs ordinateurs pour partager des ressources.\n\n**Topologies :**\n- Bus : tous les nœuds sur un même câble\n- Étoile : tous connectés à un switch central\n- Anneau : chaque nœud connecté à deux voisins\n- Maillée : Redondance maximale (Internet)\n\n**Modèle OSI (7 couches) :**\n1. Physique (câbles, signaux)\n2. Liaison (adresses MAC, commutateurs)\n3. Réseau (adresses IP, routeurs)\n4. Transport (TCP/UDP, ports)\n5. Session (établissement de connexion)\n6. Présentation (encryption, compression)\n7. Application (HTTP, FTP, SMTP)\n\n**Adressage IPv4 en Côte d'Ivoire :** Les FAI locaux (Orange CI, MTN CI, Moov CI) attribuent des IP publiques ou privées (192.168.x.x).`,
      exercises: [
        { type: "qcm", question: "Un commutateur (switch) fonctionne à la couche :", answer: "2 (Liaison)", explanation: "Le switch utilise les adresses MAC (couche 2 du modèle OSI)." },
        { type: "qcm", question: "L'adresse IP 192.168.1.1 est une adresse :", answer: "Privée", explanation: "192.168.0.0/16 est réservé aux réseaux privés (RFC 1918)." },
        { type: "calcul", question: "Combien d'hôtes maximum dans un réseau /24 ?", answer: "254", explanation: "2^8 − 2 = 256 − 2 = 254 hôtes (adresse réseau + broadcast exclus)." },
        { type: "vrai_faux", question: "Le protocole TCP est non orienté connexion.", answer: "Faux", explanation: "TCP est orienté connexion (3-way handshake). UDP est non orienté." },
        { type: "ouvert", question: "Quels équipements réseau trouve-t-on dans un lycée ivoirien équipé d'un laboratoire informatique ?", answer: "Un routeur (connexion Internet), un switch (distribution du réseau local), des points d'accès WiFi, des ordinateurs, et éventuellement un serveur pour les ressources partagées.", explanation: "" },
      ],
    },
  ],
};

// ─── MARKETING ───────────────────────────────────────────────────────────────
const MKT_LESSONS: Record<string, LessonSeed[]> = {
  "2nde_ab": [
    {
      title: "Les fondamentaux du marketing",
      summary: "Définition, besoin, demande et valeur perçue.",
      content: `Le marketing est l'art et la science de créer, communiquer, livrer et échanger des offres ayant de la valeur.\n\n**Concepts clés :**\n- **Besoin** : sentiment de privation (faim, besoin de mobilité)\n- **Demande** : besoin soutenu par un pouvoir d'achat\n- **Échange** : acte consistant à obtenir ce dont on a besoin d'une autre partie\n- **Transaction** : accord entre deux parties\n\n**Le processus marketing :**\n1. Analyser le marché et les consommateurs\n2. Rechercher et sélectionner les segments\n3. Concevoir une stratégie de ciblage\n4. Développer le positionnement\n5. Maîtriser le mix marketing (4P)\n\n**Application ivoirienne :** Glo brand (chocolat) — besoin de chocolat → demande des Ivoiriens → produit adapté au goût local → prix accessible (100-500 FCFA) → distribution en kiosques et supermarchés.`,
      exercises: [
        { type: "qcm", question: "Un besoin devient une demande quand il est soutenu par :", answer: "Un pouvoir d'achat", explanation: "La demande = besoin + capacité à payer." },
        { type: "qcm", question: "Le processus marketing commence par :", answer: "L'analyse du marché", explanation: "Avant toute action, il faut comprendre le marché et les consommateurs." },
        { type: "vrai_faux", question: "Le marketing et la vente sont la même chose.", answer: "Faux", explanation: "Le marketing est plus large : il inclut la recherche, le positioning, le mix marketing." },
        { type: "calcul", question: "Une entreprise vend 200 unités à 5 000 FCFA. Quel est le CA ?", answer: "1 000 000", explanation: "CA = 200 × 5 000 = 1 000 000 FCFA." },
        { type: "ouvert", question: "Donnez un exemple concret de segmentation de marché appliquée à Abidjan.", answer: "Segmentation géographique : Cocody (cadres, pouvoir d'achat élevé) vs Yopougon (population nombreuse, prix sensibles). segmentation socio-professionnelle : étudiants (prix bas, rapide) vs employés de bureau (qualité, confort).", explanation: "" },
      ],
    },
  ],
  "1ere_b": [
    {
      title: "Le mix marketing opérationnel",
      summary: "Produit, prix, place, promotion — application au contexte ivoirien.",
      content: `Le mix marketing (4P) est l'ensemble des leviers actionnables par le marketeur.\n\n**Produit :** Caractéristiques, qualité, marque, emballage, gamme.\n**Prix :** Stratégie d'écrémage, pénétration, psychologique (999 FCFA au lieu de 1 000).\n**Place :** Canaux de distribution — direct (boutique) ou indirect (détaillants).\n**Promotion :** Publicité TV/radio (RTI, Nord Comua), réseaux sociaux (Facebook, Instagram), sponsoring.\n\n**Application : Marque ivoirienne « AfriChips » (chips de plantain)**\n| P | Application |\n|---|-------------|\n| Produit | Chips de plantain, 5 saveurs (nature, piment, fromage, etc.) |\n| Prix | 200-500 FCFA l'emballage (positionnement accessible) |\n| Place | Supermarchés (Prosuma, Siècl), marchés, distributeurs automatiques |\n| Promotion | Spot TV RTI, influenceurs Instagram,sampling dans les lycées |\n\n**Tendance :** Le e-commerce en Côte d'Ivoire explose ( Jumia CI, Yala, vendeurs WhatsApp).`,
      exercises: [
        { type: "qcm", question: "La stratégie d'écrémage consiste à :", answer: "Fixer un prix élevé au lancement", explanation: "Écrémage : prix haut pour maximiser la marge sur les early adopters." },
        { type: "qcm", question: "Le prix psychologique 999 FCFA au lieu de 1 000 FCFA est une stratégie de :", answer: "Prix charmant", explanation: "Le prix charming crée une illusion de prix inférieur." },
        { type: "vrai_faux", question: "La promotion ne comprend que la publicité.", answer: "Faux", explanation: "La promotion inclut publicité, relations publiques, vente promotionnelle, marketing direct." },
        { type: "calcul", question: "Budget promo = 2M FCFA. Coût d'acquisition client = 5 000 FCFA. Combien de clients ?", answer: "400", explanation: "Clients = 2 000 000 / 5 000 = 400 clients acquis." },
        { type: "ouvert", question: "Proposez une stratégie de distribution pour un nouveau soda ivoirien destiné aux jeunes.", answer: "Distribution semi-directe : (1) grossistes pour les points de vente traditionnels (3-4M de points), (2) supermarchés modernes (Prosuma, Leader, etc.), (3) bars/restaurants, (4) distribution mobile avec triporteurs dans les quartiers populaires. Budget logistique à maîtriser.", explanation: "" },
      ],
    },
  ],
  "term_b": [
    {
      title: "Le marketing stratégique",
      summary: "SWOT, matrice BCG, positionnement et différenciation.",
      content: `Le marketing stratégique anticipe les évolutions du marché et définit la position de l'entreprise.\n\n**Analyse SWOT :**\n| Interne | Externe |\n|---------|---------|\n| Forces | Opportunités |\n| Faiblesses | Menaces |\n\n**Matrice BCG (Growth-Share) :**\n| | Fort Part de marché | Faible Part de marché |\n|---|---|---|\n| Marché en croissance | ★ Stars | ? Questions |\n| Marché mature | 💰 Vaches à lait | 🗑 Dogs |\n\n**Positionnement :** Place occupée dans l'esprit du consommateur par rapport à la concurrence.\n\n**Application :** « Sankofa Cosmétiques » (cosmétiques naturels ivoiriens) — Forces : savoir-faire local, matières premières naturelles. Menace : concurrence des grandes marques. Positionnement : cosmétique bio, fabrication locale, prix moyen.`,
      exercises: [
        { type: "qcm", question: "Dans la matrice BCG, une « vache à lait » a :", answer: "Fort part de marché, faible croissance", explanation: "Les vaches à lait génèrent du cash avec peu d'investissement." },
        { type: "qcm", question: "Le SWOT analyse :", answer: "Forces, faiblesses, opportunités, menaces", explanation: "SWOT = Strengths, Weaknesses, Opportunities, Threats." },
        { type: "vrai_faux", question: "Le positionnement concerne uniquement le prix du produit.", answer: "Faux", explanation: "Le positionnement englobe l'image, la qualité perçue, le target, etc." },
        { type: "calcul", question: "CA entreprise = 50M, CA marché total = 250M. Part de marché ?", answer: "20%", explanation: "Part de marché = 50/250 = 20%." },
        { type: "ouvert", question: "Rédigez une analyse SWOT pour une start-up ivoirienne de livraison de repas.", answer: "Forces : app mobile intuitive, flotte de motos, connaissance du terrain. Faiblesses : trésorerie limitée, marque peu connue. Opportunités : urbanisation rapide, classe moyenne croissante à Abidjan. Menaces : concurrence (Yamo, Gloria Food), réglementation des livraisons.", explanation: "" },
      ],
    },
  ],
};

// ─── GESTION ─────────────────────────────────────────────────────────────────
const GESTION_LESSONS: Record<string, LessonSeed[]> = {
  "2nde_ab": [
    {
      title: "L'entreprise et son environnement",
      summary: "Définition, formes juridiques, environnement interne et externe.",
      content: `L'entreprise est une organisation économique qui produit des biens ou services pour satisfaire les besoins.\n\n**Formes juridiques en Côte d'Ivoire (OHADA) :**\n| Forme | Capital min. | Responsabilité |\n|-------|-------------|----------------|\n| SARL | 1 000 000 FCFA | Limitée aux apports |\n| SA | 10 000 000 FCFA | Limitée aux apports |\n| SNC | Aucun | Solidaire et indéfinie |\n| EURL | 1 000 000 FCFA | Limitée aux apports |\n\n**Environnement interne :** direction, RH, production, marketing, finance.\n**Environnement externe :** fournisseurs, clients, concurrence, pouvoirs publics, climat économique.\n\n**Importance de la gestion :** Une bonne gestion permet la survie et la croissance. Une mauvaise gestion mène à la faillite.`,
      exercises: [
        { type: "qcm", question: "Une SARL a un capital minimum de :", answer: "1 000 000 FCFA", explanation: "Fixé par l'Acte Uniforme OHADA sur les sociétés commerciales." },
        { type: "qcm", question: "Le climat économique fait partie de l'environnement :", answer: "Externe", explanation: "Le climat économique est une force externe à l'entreprise." },
        { type: "vrai_faux", question: "Dans une SNC, la responsabilité des associés est limitée à leurs apports.", answer: "Faux", explanation: "Dans une SNC, la responsabilité est solidaire et indéfinie : chaque associé répond sur tout son patrimoine." },
        { type: "calcul", question: "Une SA a 10 000 actions à 1 000 FCFA. Capital social ?", answer: "10 000 000", explanation: "Capital = 10 000 × 1 000 = 10 millions FCFA (minimum légal)." },
        { type: "ouvert", question: "Pourquoi la forme juridique est-elle un choix stratégique pour un entrepreneur ivoirien ?", answer: "Le choix de la forme juridique impacte : (1) la responsabilité financière, (2) la fiscalité, (3) les possibilités de levée de capitaux, (4) la gouvernance. Une SARL est souvent idéale pour une PME ivoirienne : responsabilité limitée, gouvernance souple.", explanation: "" },
      ],
    },
  ],
  "1ere_g2": [
    {
      title: "La gestion des ressources humaines",
      summary: "Recrutement, formation, évaluation et climat social en entreprise.",
      content: `La GRH couvre l'ensemble des pratiques visant à optimiser le capital humain.\n\n**Cycle de la GRH :**\n1. Recrutement : attractivité, sélection, intégration\n2. Formation : développement des compétences\n3. Évaluation : entretiens annuels, objectifs\n4. Rémunération : salaire, primes, avantages\n5. Climat social : relations, prévention des conflits\n\n**Indicateurs clés :**\n- Taux de turnover = Départés / Effectif moyen × 100\n- Absentéisme = Jours d'absence / Jours travaillés × 100\n- Coût moyen par employé = Charges RH / Nombre d'employés\n\n**Contexte ivoirien :** La loi impose des comités d'entreprise, des délégués du personnel, et le respect du Code du travail. Le syndicat (UGTI, CSTI) joue un rôle important dans les négociations.`,
      exercises: [
        { type: "qcm", question: "Le turnover mesure :", answer: "La rotation du personnel", explanation: "Turnover = taux de départ des employés sur une période." },
        { type: "calcul", question: "25 employés partent sur un effectif moyen de 200. Taux de turnover ?", answer: "12,5%", explanation: "Turnover = (25 / 200) × 100 = 12,5%." },
        { type: "vrai_faux", question: "Le comité d'entreprise est obligatoire dans toutes les entreprises ivoiriennes.", answer: "Faux", explanation: "Le CE est obligatoire à partir d'un certain seuil d'effectif (généralement 20+ salariés)." },
        { type: "qcm", question: "La formation vise à :", answer: "Développer les compétences des salariés", explanation: "La formation améliore les compétences, la motivation et la productivité." },
        { type: "ouvert", question: "Quels sont les défis de la GRH pour une PME ivoirienne ?", answer: "Les principaux défis : (1) attractivité face aux grandes entreprises, (2) formation continue limitée par le budget, (3) gestion des générations (baby-boomers vs jeunes diplômés), (4) climat social souvent tendu, (5) concurrence sur les talents qualifiés.", explanation: "" },
      ],
    },
  ],
  "term_g2": [
    {
      title: "La gestion stratégique d'entreprise",
      summary: "Plan stratégique, objectifs SMART, tableaux de bord et pilotage.",
      content: `La gestion stratégique consiste à définir les orientations à long terme et à les déployer.\n\n**Processus stratégique :**\n1. Analyse stratégique (SWOT, PESTEL)\n2. Définition de la vision et mission\n3. Fixation d'objectifs SMART\n4. élaboration du plan d'action\n5. Mise en œuvre et suivi\n6. Évaluation et ajustement\n\n**Objectifs SMART :**\n- S = Spécifique\n- M = Mesurable\n- A = Atteignable\n- R = Réaliste\n- T = Temporel\n\n**Tableau de bord :** Outil de pilotage combinant indicateurs financiers (ROI, marge) et non-financiers (satisfaction client, qualité).\n\n**Application :** Plan stratégique d'une PME de transport à Abidjan — Objectif : doubler la flotte en 3 ans. Actions : acquisition de 10 nouveaux bus, recrutement de 20 chauffeurs, digitalisation de la réservation.`,
      exercises: [
        { type: "qcm", question: "L'acronyme SMART signifie :", answer: "Spécifique, Mesurable, Atteignable, Réaliste, Temporel", explanation: "Framework de fixation d'objectifs efficace." },
        { type: "qcm", question: "Le PESTEL analyse :", answer: "Les facteurs politiques, économiques, sociaux, technologiques, environnementaux et légaux", explanation: "Analyse macro-environnementale complète." },
        { type: "vrai_faux", question: "Un tableau de bord ne contient que des indicateurs financiers.", answer: "Faux", explanation: "Un tableau de bord moderne combine KPI financiers et non-financiers." },
        { type: "calcul", question: "ROI = (Gain − Coût) / Coût. Si Gain = 3M, Coût = 2M. ROI ?", answer: "50%", explanation: "ROI = (3 − 2) / 2 = 0,5 = 50%." },
        { type: "ouvert", question: "Élaborez un objectif SMART pour une entreprise de livraison à Abidjan.", answer: "Augmenter le nombre de livraisons quotidiennes de 200 à 350 d'ici 6 mois (SMART : Spécifique = livraisons, Mesurable = 350, Atteignable = +75%, Réaliste = progression graduelle, Temporel = 6 mois).", explanation: "" },
      ],
    },
  ],
};

// ─── MAIN SEED FUNCTION ──────────────────────────────────────────────────────
export async function seedTechnicalLessons(): Promise<void> {
  await repairMissingExercises();

  const allContent = { comptabilite: {...COMPTA_LESSONS}, economie: {...ECO_LESSONS}, droit: {...DROIT_LESSONS}, informatique: {...INFO_LESSONS}, marketing: {...MKT_LESSONS}, gestion: {...GESTION_LESSONS} };

  for (const [subjCode, gradeData] of Object.entries(allContent)) {
    const dbSubjCode = subjCode.toLowerCase();
    const subjId = await queryOne<{ id: number }>("SELECT id FROM subjects WHERE code = ?", dbSubjCode);
    if (!subjId) { logger.warn(`[P239] Subject ${dbSubjCode} not found`); continue; }

    for (const [gradeCode, lessons] of Object.entries(gradeData)) {
      const gradeMap: Record<string, string> = {
        "2nde_g2": "2nde_g2", "2nde_ab": "2nde_ab",
        "1ere_g2": "1ere_g2", "1ere_b": "1ere_b",
        "tle_b": "term_b", "tle_g2": "term_g2",
        "term_b": "term_b", "term_g2": "term_g2",
      };
      const dbGradeCode = gradeMap[gradeCode] ?? gradeCode;
      const gradeId = await queryOne<{ id: number }>("SELECT id FROM grades WHERE code = ?", dbGradeCode);
      if (!gradeId) { logger.warn(`[P239] Grade ${dbGradeCode} not found`); continue; }

      const lsArr: LessonSeed[] = Array.isArray(lessons) ? lessons : [lessons]; for (const lesson of lsArr) {
        const existing = await queryOne<{ id: number }>(
          "SELECT id FROM lessons WHERE chapter_id = (SELECT id FROM chapters WHERE subject_id = ? AND grade_id = ? LIMIT 1) AND title = ?",
          subjId.id, gradeId.id, lesson.title,
        );
        if (existing) { logger.info(`[P239] Skip: ${lesson.title}`); continue; }

        const ch = await queryOne<{ id: number }>(
          "SELECT id FROM chapters WHERE subject_id = ? AND grade_id = ? LIMIT 1",
          subjId.id, gradeId.id,
        );
        if (!ch) { logger.warn(`[P239] No chapter for ${subjCode}/${gradeCode}`); continue; }

        const lessonId = await insertLesson(ch.id, lesson, 0);
        if (lessonId) logger.info(`[P239] Created: ${lesson.title} (ls${lessonId})`);
      }
    }
  }

  logger.info("[P239] Technical lessons seeding completed.");
}

// ─── QUIZ DATA ───────────────────────────────────────────────────────────────
const TECH_QUIZZES: Record<number, { subject: string; questions: { q: string; opts: string[]; ans: number; exp: string }[] }> = {
  // ls10455: Comptabilité — 2nde-AB — Les bases de la comptabilité
  10455: {
    subject: "comptabilite",
    questions: [
      { q: "La comptabilité ivoirienne est régie par :", opts: ["Le SYSCOHADA", "Le PLAN COMPTABLE", "L'OFCE", "Le Code civil"], ans: 0, exp: "Le SYSCOHADA est le référentiel comptable de l'UEMOA." },
      { q: "Quel document justifie une vente de marchandises ?", opts: ["La facture", "Le bon de commande", "Le procès-verbal", "La lettre de transport"], ans: 0, exp: "La facture est la pièce justificative de toute vente." },
      { q: "Un compte de la classe 2 du plan comptable SYSCOHADA contient :", opts: ["Des immobilisations", "Des stocks", "Des fournisseurs", "Du capital"], ans: 0, exp: "La classe 2 regroupe les immobilisations corporelles et incorporelles." },
      { q: "Le fonds de roulement se calcule comme :", opts: ["Actif circulant − Dettes CT", "Actif total − Passif total", "Chiffre d'affaires − Achats", "Capitaux propres + Dettes"], ans: 0, exp: "FR = Actif circulant − Dettes à court terme." },
      { q: "Quelle est la principale fonction de la comptabilité ?", opts: ["Enregistrer et analyser les opérations", "Payer les impôts", "Gérer les salariés", "Vendre des produits"], ans: 0, exp: "La comptabilité enregistre, classe et analyse les données financières." },
    ],
  },
  // ls10456: Comptabilité — 1ère-G2 — Les coûts complets et partiels
  10456: {
    subject: "comptabilite",
    questions: [
      { q: "Une charge indirecte nécessite :", opts: ["Un répartiteur", "Aucun calcul", "Un budget prévisionnel", "Un audit externe"], ans: 0, exp: "Les charges indirectes sont réparties via des clés de répartition." },
      { q: "Le coût de revient unitaire se calcule en divisant :", opts: ["Le coût total par le nombre d'unités", "Le CA par le nombre d'unités", "Le prix de vente par le nombre d'unités", "La marge par le nombre d'unités"], ans: 0, exp: "Coût unitaire = Coût total / Quantité produite." },
      { q: "Au seuil de rentabilité :", opts: ["Le résultat est nul", "L'entreprise fait un bénéfice", "L'entreprise fait une perte", "Le CA est maximal"], ans: 0, exp: "Au seuil de rentabilité, CA = Coûts totaux, donc résultat = 0." },
      { q: "La main-d'œuvre directe est une charge :", opts: ["Directe", "Indirecte", "Fixe uniquement", "Non déductible"], ans: 0, exp: "La main-d'œuvre directe est imputable directement au produit." },
      { q: "La marge sur coûts variables = :", opts: ["CA − Coûts variables", "CA − Coûts fixes", "CA − Coûts totaux", "Prix de vente − Coût unitaire"], ans: 0, exp: "MCV = CA − CV. Elle couvre les charges fixes puis génère le résultat." },
    ],
  },
  // ls10457: Comptabilité — 1ère-B — L'analyse des charges par comportement
  10457: {
    subject: "comptabilite",
    questions: [
      { q: "Un loyer est une charge :", opts: ["Fixe", "Variable", "Mixte", "Non déductible"], ans: 0, exp: "Le loyer est fixe : il ne varie pas avec le volume de production." },
      { q: "La méthode de High-Low sert à :", opts: ["Séparer charges fixes et variables", "Calculer le CA", "Évaluer les stocks", "Déterminer le prix de vente"], ans: 0, exp: "Elle utilise les points extrêmes d'activité pour isoler la part fixe." },
      { q: "Si le CV unitaire est de 200 FCFA et les CF de 100 000 FCFA, la charge totale pour 500 unités est :", opts: ["200 000 FCFA", "100 000 FCFA", "300 000 FCFA", "150 000 FCFA"], ans: 0, exp: "Charge totale = 100 000 + (500 × 200) = 200 000 FCFA." },
      { q: "Les charges variables totales :", opts: ["Augmentent avec l'activité", "Restent constantes", "Diminuent avec l'activité", "Sont indépendantes de l'activité"], ans: 0, exp: "Les charges variables varient proportionnellement au volume d'activité." },
      { q: "CV unitaire avec point haut 2 000 unités/600 000 FCFA et point bas 800 unités/360 000 FCFA :", opts: ["200 FCFA", "300 FCFA", "400 FCFA", "150 FCFA"], ans: 0, exp: "CV = (600 000 − 360 000) / (2 000 − 800) = 200 FCFA." },
    ],
  },
  // ls10458: Comptabilité — Tle-G2 — Les regroupements comptables
  10458: {
    subject: "comptabilite",
    questions: [
      { q: "Le BFR mesure :", opts: ["Le décalage entre encaissements et décaissements", "Le résultat net", "Le chiffre d'affaires", "La trésorerie bancaire"], ans: 0, exp: "Le BFR reflète le besoin en trésorerie lié au cycle d'exploitation." },
      { q: "Le FR = Ressources stabiles − :", opts: ["Emplois stabiles", "Dettes CT", "Capitaux propres", "Actif circulant"], ans: 0, exp: "FR = Ressources stabiles − Emplois stabiles." },
      { q: "Un BFR négatif signifie :", opts: ["Les dettes CT dépassent le BCA", "L'entreprise est en faillite", "Le FR est négatif", "L'actif immobilisé est insuffisant"], ans: 0, exp: "BFR négatif = dettes CT > BCA : l'entreprise est financée par ses fournisseurs." },
      { q: "La trésorerie nette est positive si :", opts: ["FR > BFR", "FR < BFR", "BFR = 0", "FR = 0"], ans: 0, exp: "Trésorerie nette = FR − BFR. Positive si le FR couvre le BFR." },
      { q: "FR = 80M, BFR = 60M. Trésorerie nette :", opts: ["20M", "140M", "−20M", "80M"], ans: 0, exp: "Trésorerie = 80 − 60 = 20 millions FCFA." },
    ],
  },
  // ls10459: Économie — 2nde-AB — Les agents économiques
  10459: {
    subject: "economie",
    questions: [
      { q: "Quel agent offre du travail sur le marché ?", opts: ["Les ménages", "Les entreprises", "L'État", "Le reste du monde"], ans: 0, exp: "Les ménages fournissent les facteurs de production (travail, capital)." },
      { q: "Le cacao exporté entre dans :", opts: ["Les exportations (X)", "La consommation (C)", "L'investissement (I)", "Les dépenses publiques (G)"], ans: 0, exp: "Le cacao est la principale exportation ivoirienne." },
      { q: "PIB = C + I + G + :", opts: ["(X − M)", "(M − X)", "C × I", "G × X"], ans: 0, exp: "PIB par la dépense : C + I + G + (Exportations − Importations)." },
      { q: "L'État en Côte d'Ivoire :", opts: ["Prélève des impôts et fournit des services", "Produit uniquement des biens privés", "N'intervient pas dans l'économie", "Ne facture aucun service"], ans: 0, exp: "L'État collecte les impôts et finance les services publics." },
      { q: "Le secteur informelle en Côte d'Ivoire représente :", opts: ["> 80% de l'emploi", "< 10% de l'emploi", "Exactement 50%", "Uniquement le secteur agricole"], ans: 0, exp: "L'informeldomine l'emploi ivoirien (>80%)." },
    ],
  },
  // ls10460: Économie — 1ère-G2 — La politique monétaire UEMOA
  10460: {
    subject: "economie",
    questions: [
      { q: "Le siège de la BCEAO est à :", opts: ["Abidjan", "Paris", "Douala", "Lagos"], ans: 0, exp: "La BCEAO a son siège à Abidjan, Côte d'Ivoire." },
      { q: "L'objectif principal de la BCEAO est :", opts: ["La stabilité des prix", "La croissance du PIB", "La réduction du chômage", "L'équilibre commercial"], ans: 0, exp: "Stabilité des prix = inflation < 3% en zone UEMOA." },
      { q: "Quand la BCEAO augmente le taux directeur :", opts: ["Le coût du crédit augmente", "Le coût du crédit diminue", "Le PIB augmente immédiatement", "L'inflation chute instantanément"], ans: 0, exp: "Taux directeur ↑ → coût du crédit ↑ → investissement ↓ → inflation ↓." },
      { q: "Le franc CFA (XOF) est adossé à :", opts: ["L'euro", "Le dollar américain", "Le livre sterling", "Le franc suisse"], ans: 0, exp: "Le franc CFA est lié à l'euro à un taux de fixée (655,957 XOF = 1 EUR)." },
      { q: "L'indépendance de la BCEAO vise à :", opts: ["Éviter le financement monetaire des déficits", "Augmenter les profits bancaires", "Contrôler les taux de change privés", "Remplacer la Banque de France"], ans: 0, exp: "Sans indépendance, le gouvernement pourrait imprimer de la monnaie, causant de l'inflation." },
    ],
  },
  // ls10461: Économie — 1ère-B — Demande et offre
  10461: {
    subject: "economie",
    questions: [
      { q: "Quand le prix est au-dessus de l'équilibre, il y a :", opts: ["Un surplus", "Une pénurie", "Un équilibre parfait", "Une demande excessive"], ans: 0, exp: "À un prix trop élevé, l'offre excède la demande → surplus." },
      { q: "Une hausse du revenu des ménages déplace la demande vers :", opts: ["La droite", "La gauche", "Reste inchangée", "Vers le bas"], ans: 0, exp: "Un revenu plus élevé augmente la demande à chaque prix." },
      { q: "Si Qd = 200 − 10P et Qo = 50 + 5P, le prix d'équilibre est :", opts: ["10", "5", "15", "20"], ans: 0, exp: "200 − 10P = 50 + 5P → 150 = 15P → P = 10." },
      { q: "Une subvention aux producteurs déplace l'offre vers :", opts: ["La droite", "La gauche", "Reste inchangée", "Vers le haut"], ans: 0, exp: "Une subvention réduit le coût de production → offre augmente." },
      { q: "Une sécheresse sur le marché du mangue déplace :", opts: ["L'offre vers la gauche", "La demande vers la droite", "L'offre vers la droite", "La demande vers la gauche"], ans: 0, exp: "La sécheresse réduit la production → offre se déplace vers la gauche." },
    ],
  },
  // ls10462: Économie — Tle-G2 — Croissance et développement
  10462: {
    subject: "economie",
    questions: [
      { q: "L'IDH combine trois dimensions :", opts: ["Santé, éducation, revenu", "PIB, inflation, chômage", "Exportations, importations, IDE", "Population, surface, PIB"], ans: 0, exp: "IDH = espérance de vie + niveau d'instruction + revenu par habitant." },
      { q: "Le PIB réel corrige :", opts: ["L'inflation", "Le taux de change", "La population", "Le chômage"], ans: 0, exp: "Le PIB réel est exprimé en prix constants, sans effet inflation." },
      { q: "PIB nominal = 100M, indice des prix = 125. PIB réel :", opts: ["80M", "125M", "100M", "60M"], ans: 0, exp: "PIB réel = 100 / 1,25 = 80 millions FCFA." },
      { q: "Un PIB élevé garantit un IDH élevé :", opts: ["Non, pas nécessairement", "Oui, toujours", "Seulement en Afrique", "Uniquement pour les pays riches"], ans: 0, exp: "Certains pays pétroliers ont un PIB élevé mais un IDH modéré." },
      { q: "Le secteur agricole représente environ :", opts: ["~20% du PIB ivoirien", "~60%", "~80%", "< 5%"], ans: 0, exp: "L'agriculture (cacao, café, anacarde) représente ~20% du PIB." },
    ],
  },
  // ls10463: Droit — 2nde-AB — Sources du droit en CI
  10463: {
    subject: "droit",
    questions: [
      { q: "La norme suprême en Côte d'Ivoire est :", opts: ["La Constitution", "La loi", "Le décret", "L'arrêté"], ans: 0, exp: "La Constitution de 1960 (révisée 2016) est la norme suprême." },
      { q: "Un traité international ratifié a une valeur :", opts: ["Supérieure à la loi", "Inférieure à la loi", "Égale à la loi", "Nulle"], ans: 0, exp: "Art. 85 de la Constitution : les traités ratifiés priment sur les lois." },
      { q: "L'OHADA a été fondée en :", opts: ["1993", "2001", "1960", "2010"], ans: 0, exp: "Traité d'Algésiras, 17 octobre 1993." },
      { q: "Les actes uniformes OHADA prévalent sur :", opts: ["Le droit interne national", "La Constitution", "Les traités internationaux", "La coutume"], ans: 0, exp: "Les Actes Uniformes OHADA sont directement applicables et prévalent sur le droit national." },
      { q: "Qui promulgue les lois en Côte d'Ivoire ?", opts: ["Le Président de la République", "L'Assemblée nationale", "Le Conseil constitutionnel", "Le Premier ministre"], ans: 0, exp: "Le Président promulgue les lois dans les 15 jours suivant leur adoption." },
    ],
  },
  // ls10464: Droit — 1ère-B — Droit du travail en CI
  10464: {
    subject: "droit",
    questions: [
      { q: "La durée légale du travail en Côte d'Ivoire est de :", opts: ["40h par semaine", "35h par semaine", "48h par semaine", "38h par semaine"], ans: 0, exp: "40 heures par semaine, soit 8h par jour (Code du travail ivoirien)." },
      { q: "Le SMI en 2024 est de :", opts: ["51 000 FCFA/mois", "30 000 FCFA/mois", "100 000 FCFA/mois", "25 000 FCFA/mois"], ans: 0, exp: "Le SMI a été revalorisé à 51 000 FCFA/mois en 2024." },
      { q: "Un salarié licencié avec 5 ans d'ancienneté et 150 000 FCFA de salaire touche :", opts: ["750 000 FCFA d'indemnité", "150 000 FCFA", "300 000 FCFA", "Aucune indemnité"], ans: 0, exp: "Indemnité = 1 mois × 5 ans × 150 000 = 750 000 FCFA." },
      { q: "Un CDD peut être renouvelé indéfiniment :", opts: ["Non, c'est interdit", "Oui, sans limite", "Oui, mais 3 fois max", "Oui, si le salarié accepte"], ans: 0, exp: "Le CDD a une durée limitée. Le renouvellement est strictement encadré." },
      { q: "Les congés payés annuels en Côte d'Ivoire sont de :", opts: ["30 jours ouvrables", "15 jours", "20 jours", "25 jours"], ans: 0, exp: "2,5 jours ouvrables par mois de travail = 30 jours par an." },
    ],
  },
  // ls10465: Droit — Tle-G2 — Procédures collectives
  10465: {
    subject: "droit",
    questions: [
      { q: "Le redressement judiciaire vise à :", opts: ["Permettre la continuation de l'activité", "Liquidater tous les actifs", "Fermer l'entreprise", "Remplacer le dirigeant"], ans: 0, exp: "Le redressement judiciaire sauvegarde l'emploi et l'activité." },
      { q: "Qui peut demander l'ouverture d'une procédure collective ?", opts: ["Le débiteur, un créancier ou le ministère public", "Uniquement le débiteur", "Uniquement le créancier", "Uniquement le juge"], ans: 0, exp: "Trois catégories peuvent saisir le tribunal." },
      { q: "Un jugement de liquidation judiciaire met fin à :", opts: ["L'activité de l'entreprise", "Uniquement les dettes", "Les contrats de travail", "Les emprunts"], ans: 0, exp: "La liquidation judiciaire entraîne la cessation d'activité." },
      { q: "Passif Net Comptable = Dettes − Actifs. Dettes 500M, Actifs 300M :", opts: ["200M", "800M", "−200M", "300M"], ans: 0, exp: "PNC = 500 − 300 = 200 millions FCFA." },
      { q: "L'Acte Uniforme OHADA relatif aux procédures collectives a été révisé en :", opts: ["2015", "2000", "1993", "2020"], ans: 0, exp: "L'AU PC a été révisé en 2015 pour moderniser le droit des procédures collectives." },
    ],
  },
  // ls10466: Informatique — 2nde-AB — Introduction à l'informatique
  10466: {
    subject: "informatique",
    questions: [
      { q: "Le processeur (CPU) est surnommé :", opts: ["Le cerveau de l'ordinateur", "La mémoire de l'ordinateur", "L'écran de l'ordinateur", "Le disque dur"], ans: 0, exp: "Le CPU exécute les instructions et coordonne les composants." },
      { q: "La RAM est une mémoire :", opts: ["Volatile", "Permanente", "Optique", "Magnétique"], ans: 0, exp: "La RAM perd son contenu lorsque l'ordinateur est éteint." },
      { q: "Linux est un système d'exploitation :", opts: ["Open source", "Propriétaire", "Exclusivement Windows", "Un antivirus"], ans: 0, exp: "Linux est open source : son code source est librement accessible." },
      { q: "Combien de bits dans 1 octet ?", opts: ["8", "4", "16", "32"], ans: 0, exp: "1 octet = 8 bits." },
      { q: "Un SSD se distingue d'un disque dur par :", opts: ["Son absence de pièces mobiles", "Sa capacité moindre", "Son prix plus bas", "Son poids plus élevé"], ans: 0, exp: "Le SSD utilise des puces mémoire sans pièces mécaniques." },
    ],
  },
  // ls10467: Informatique — 1ère-G2 — Algorithmique
  10467: {
    subject: "informatique",
    questions: [
      { q: "Le tri à bulles a une complexité en :", opts: ["O(n²)", "O(n)", "O(log n)", "O(1)"], ans: 0, exp: "Le tri à bulles effectue n×(n−1)/2 comparaisons dans le pire cas." },
      { q: "`range(1, 5)` en Python génère :", opts: ["1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4", "2, 3, 4, 5"], ans: 0, exp: "range(1, 5) va de 1 inclus à 5 exclus." },
      { q: "Un tableau a une taille :", opts: ["Fixe", "Dynamique", "Aléatoire", "Infinie"], ans: 0, exp: "Les tableaux ont une taille fixe. Les listes Python sont dynamiques." },
      { q: "Combien d'itérations pour trier 5 éléments avec le tri à bulles ?", opts: ["10", "5", "25", "20"], ans: 0, exp: "5×4/2 = 10 comparaisons dans le pire cas." },
      { q: "L'opérateur `%` en Python est :", opts: ["Le modulo (reste de la division)", "La multiplication", "La puissance", "La division"], ans: 0, exp: "`17 % 5` donne 2, le reste de la division entière." },
    ],
  },
  // ls10468: Informatique — 1ère-B — Programmation Python
  10468: {
    subject: "informatique",
    questions: [
      { q: "Quel type de donnée est `42` en Python ?", opts: ["int", "str", "float", "bool"], ans: 0, exp: "42 est un entier (integer)." },
      { q: "La fonction `input()` retourne :", opts: ["Une chaîne de caractères", "Un entier", "Un flottant", "Un booléen"], ans: 0, exp: "input() lit une ligne au clavier et la retourne toujours comme str." },
      { q: "`True` et `False` en Python sont :", opts: ["Des booléens intégrés", "Des chaînes de caractères", "Des fonctions", "Des variables"], ans: 0, exp: "True et False sont des booléens intégrés au langage." },
      { q: "Pour convertir une chaîne en entier en Python :", opts: ["int('42')", "str(42)", "float('42')", "bool('42')"], ans: 0, exp: "int() convertit une chaîne numérique en entier." },
      { q: "L'âge légal de la majorité en Côte d'Ivoire est :", opts: ["18 ans", "16 ans", "21 ans", "25 ans"], ans: 0, exp: "La majorité civile en Côte d'Ivoire est fixée à 18 ans." },
    ],
  },
  // ls10469: Informatique — Tle-G2 — Réseaux
  10469: {
    subject: "informatique",
    questions: [
      { q: "Un switch fonctionne à la couche :", opts: ["2 (Liaison)", "3 (Réseau)", "1 (Physique)", "7 (Application)"], ans: 0, exp: "Le switch utilise les adresses MAC (couche 2 OSI)." },
      { q: "L'adresse IP 192.168.1.1 est :", opts: ["Privée", "Publique", "De broadcast", "De multicast"], ans: 0, exp: "192.168.0.0/16 est réservé aux réseaux privés (RFC 1918)." },
      { q: "Combien d'hôtes dans un réseau /24 ?", opts: ["254", "256", "255", "253"], ans: 0, exp: "2^8 − 2 = 254 hôtes (adresse réseau + broadcast exclus)." },
      { q: "TCP est un protocole :", opts: ["Orienté connexion", "Non orienté connexion", "Sans fichier", "Sans protocole"], ans: 0, exp: "TCP établit une connexion avant transfert (3-way handshake)." },
      { q: "Le protocole HTTP fonctionne à la couche :", opts: ["7 (Application)", "4 (Transport)", "3 (Réseau)", "2 (Liaison)"], ans: 0, exp: "HTTP est un protocole de la couche application (couche 7 OSI)." },
    ],
  },
  // ls10470: Marketing — 2nde-AB — Fondamentaux
  10470: {
    subject: "marketing",
    questions: [
      { q: "Un besoin devient une demande quand il est soutenu par :", opts: ["Un pouvoir d'achat", "Une publicité", "Un marketing", "Une marque"], ans: 0, exp: "La demande = besoin + capacité à payer." },
      { q: "Le processus marketing commence par :", opts: ["L'analyse du marché", "La vente", "La production", "La publicité"], ans: 0, exp: "Avant toute action, il faut comprendre le marché." },
      { q: "Marketing et vente sont :", opts: ["Différents mais complémentaires", "Identiques", "Opposés", "Indépendants"], ans: 0, exp: "Le marketing est plus large : recherche, positionnement, mix marketing." },
      { q: "Segmenter un marché consiste à :", opts: ["Diviser en groupes homogènes", "Vendre à tout le monde", "Fixer un prix bas", "Créer une marque"], ans: 0, exp: "La segmentation divise un marché hétérogène en sous-marchés homogènes." },
      { q: "Le CA de 200 unités à 5 000 FCFA est :", opts: ["1 000 000 FCFA", "200 000 FCFA", "5 000 FCFA", "2 000 000 FCFA"], ans: 0, exp: "CA = 200 × 5 000 = 1 000 000 FCFA." },
    ],
  },
  // ls10471: Marketing — 1ère-B — Mix marketing opérationnel
  10471: {
    subject: "marketing",
    questions: [
      { q: "La stratégie d'écrémage consiste à :", opts: ["Fixer un prix élevé au lancement", "Fixer un prix bas", "Ne pas publisier", "Distribuer gratuitement"], ans: 0, exp: "Écrémage : prix haut pour maximiser la marge sur les early adopters." },
      { q: "Le prix 999 FCFA au lieu de 1 000 FCFA est une stratégie de :", opts: ["Prix charmant", "Prix d'écrémage", "Prix de pénétration", "Prix psychological"], ans: 0, exp: "Le prix charmant crée une illusion de prix inférieur." },
      { q: "La promotion comprend :", opts: ["Publicité, RP, vente promo, marketing direct", "Uniquement la publicité", "Uniquement les réseaux sociaux", "Uniquement le bouche-à-oreille"], ans: 0, exp: "La promotion intègre tous les outils de communication commerciale." },
      { q: "Budget promo 2M FCFA,CAC 5 000 FCFA. Clients acquis :", opts: ["400", "2 000", "100", "10 000"], ans: 0, exp: "Clients = 2 000 000 / 5 000 = 400." },
      { q: "Le e-commerce en Côte d'Ivoire est porté par :", opts: ["Jumia CI, Yala, vendeurs WhatsApp", "Uniquement Facebook", "Uniquement Amazon", "Uniquement Instagram"], ans: 0, exp: "Le e-commerce ivoirien combine plateformes et réseaux sociaux." },
    ],
  },
  // ls10472: Marketing — Tle-B — Marketing stratégique
  10472: {
    subject: "marketing",
    questions: [
      { q: "Dans la matrice BCG, une vache à lait a :", opts: ["Fort part de marché, faible croissance", "Faible part de marché, forte croissance", "Fort part et forte croissance", "Faible part et faible croissance"], ans: 0, exp: "Les vaches à lait génèrent du cash avec peu d'investissement." },
      { q: "SWOT analyse :", opts: ["Forces, faiblesses, opportunités, menaces", "Prix, produit, place, promotion", "Coûts, revenus, profits, pertes", "Clients, concurrents, fournisseurs, employés"], ans: 0, exp: "SWOT = Strengths, Weaknesses, Opportunities, Threats." },
      { q: "Le positionnement concerne :", opts: ["L'image du produit dans l'esprit du consommateur", "Uniquement le prix", "Uniquement la distribution", "Uniquement la publicité"], ans: 0, exp: "Le positionnement englobe image, qualité perçue, target, etc." },
      { q: "Part de marché = CA entreprise / CA marché. CA entreprise 50M, marché 250M :", opts: ["20%", "50%", "25%", "10%"], ans: 0, exp: "Part de marché = 50/250 = 20%." },
      { q: "L'analyse PESTEL étudie :", opts: ["Facteurs politiques, économiques, sociaux, technologiques, environnementaux, légaux", "Uniquement les facteurs financiers", "Uniquement la concurrence", "Uniquement les clients"], ans: 0, exp: "PESTEL = Political, Economic, Social, Technological, Environmental, Legal." },
    ],
  },
  // ls10473: Gestion — 1ère-G2 — GRH
  10473: {
    subject: "gestion",
    questions: [
      { q: "Le turnover mesure :", opts: ["La rotation du personnel", "Le chiffre d'affaires", "Le nombre de clients", "Le volume de production"], ans: 0, exp: "Turnover = taux de départ des employés sur une période." },
      { q: "25 départs sur 200 employés. Taux de turnover :", opts: ["12,5%", "25%", "50%", "10%"], ans: 0, exp: "Turnover = (25 / 200) × 100 = 12,5%." },
      { q: "Le comité d'entreprise est obligatoire à partir de :", opts: ["20 salariés environ", "5 salariés", "100 salariés", "Jamais"], ans: 0, exp: "Le CE est obligatoire à partir d'un seuil d'effectif (généralement 20+)." },
      { q: "La formation vise à :", opts: ["Développer les compétences des salariés", "Réduire les salaires", "Augmenter le turnover", "Supprimer les postes"], ans: 0, exp: "La formation améliore les compétences, la motivation et la productivité." },
      { q: "Un défi de la GRH en PME ivoirienne est :", opts: ["L'attractivité face aux grandes entreprises", "Le trop grand nombre d'employés", "L'absence de.getCode du travail", "La saturation du marché du travail"], ans: 0, exp: "Les PME ivoiriennes peinent à attirer et retenir les talents qualifiés." },
    ],
  },
  // ls10474: Gestion — Tle-G2 — Gestion stratégique
  10474: {
    subject: "gestion",
    questions: [
      { q: "SMART signifie :", opts: ["Spécifique, Mesurable, Atteignable, Réaliste, Temporel", "Simple, Rapide, Moderne, Agile, Rentable", "Stratégique, Méthodique, Ambitieux, Réfléchi, Temporel", "Standard, Mesuré, Adapté, Rigoureux, Mesurable"], ans: 0, exp: "Framework de fixation d'objectifs efficace." },
      { q: "L'analyse PESTEL étudie :", opts: ["Facteurs macro-environnementaux", "Uniquement la concurrence", "Uniquement les finances", "Uniquement les RH"], ans: 0, exp: "PESTEL analyse le contexte politique, économique, social, etc." },
      { q: "Un tableau de bord contient :", opts: ["KPI financiers et non-financiers", "Uniquement des chiffres financiers", "Uniquement des objectifs", "Uniquement des budgets"], ans: 0, exp: "Un tableau de bord moderne combine indicateurs financiers et qualitatifs." },
      { q: "ROI = (Gain − Coût) / Coût. Gain 3M, Coût 2M :", opts: ["50%", "100%", "33%", "150%"], ans: 0, exp: "ROI = (3 − 2) / 2 = 0,5 = 50%." },
      { q: "Le processus stratégique commence par :", opts: ["L'analyse stratégique (SWOT, PESTEL)", "La mise en œuvre", "L'évaluation", "La définition des objectifs"], ans: 0, exp: "Avant de fixer des objectifs, il faut analyser le contexte interne et externe." },
    ],
  },
  // ls10475: ls1 repair — Comptabilité — 2nde-G2
  10475: {
    subject: "comptabilite",
    questions: [
      { q: "La comptabilité ivoirienne est régie par :", opts: ["Le SYSCOHADA", "Le code de commerce", "La loi financière", "Le plan Comptable français"], ans: 0, exp: "Le SYSCOHADA est le référentiel comptable applicable en Côte d'Ivoire." },
      { q: "Quel document justifie une vente de marchandises ?", opts: ["La facture", "Le bordereau", "Le reçu", "Le contrat"], ans: 0, exp: "La facture est le document commercial qui constate une vente." },
      { q: "Une remise de 10% sur 500 000 FCFA donne un net de :", opts: ["450 000 FCFA", "500 000 FCFA", "400 000 FCFA", "550 000 FCFA"], ans: 0, exp: "500 000 − (500 000 × 10%) = 450 000 FCFA." },
      { q: "Le relevé bancaire est émis par :", opts: ["La banque", "L'entreprise", "Le fisc", "Le client"], ans: 0, exp: "Le relevé bancaire est émis par la banque." },
      { q: "La comptabilité permet notamment de :", opts: ["Suivre les recettes et dépenses", "Éviter de payer des impôts", "Remplacer le dirigeant", "Supprimer les employés"], ans: 0, exp: "La comptabilité permet de suivre la situation financière et prendre des décisions." },
    ],
  },
};

// ─── SEED TECHNICAL QUIZZES ──────────────────────────────────────────────────

// Mapping from original lesson IDs to lesson titles (for idempotent quiz creation across environments)
const TECH_QUIZ_LESSON_TITLES: Record<number, string> = {
  10455: "Les bases de la comptabilité",
  10456: "Les coûts complets et partiels",
  10457: "L'analyse des charges par comportement",
  10458: "Les regroupements comptables",
  10459: "Les agents économiques et leurs interactions",
  10460: "La politique monétaire en zone UEMOA",
  10461: "La demande et l'offre — équilibre de marché",
  10462: "La croissance économique et le développement",
  10463: "Les sources du droit en Côte d'Ivoire",
  10464: "Le droit du travail en Côte d'Ivoire",
  10465: "Les procédures collectives",
  10466: "Introduction à l'informatique",
  10467: "Algorithmique et structures de données",
  10468: "Introduction à la programmation — Python",
  10469: "Les réseaux informatiques",
  10470: "Les fondamentaux du marketing",
  10471: "Le mix marketing opérationnel",
  10472: "Le marketing stratégique",
  10473: "La gestion des ressources humaines",
  10474: "La gestion stratégique d'entreprise",
};

export async function seedTechnicalQuizzes(): Promise<void> {
  for (const [lessonIdStr, quizData] of Object.entries(TECH_QUIZZES)) {
    const lid = Number(lessonIdStr);

    const lessonTitle = TECH_QUIZ_LESSON_TITLES[lid];
    if (!lessonTitle) { logger.info("[P239] Quiz skip: no title mapping for " + lid); continue; }
    const lessonRow = await queryOne<{ id: number; chapter_id: number }>(
      "SELECT id, chapter_id FROM lessons WHERE title = ?", lessonTitle,
    );
    if (!lessonRow) { logger.info("[P239] Quiz skip: lesson " + lid + " not found"); continue; }

    const chRow = await queryOne<{ subject_id: number }>(
      "SELECT subject_id FROM chapters WHERE id = ?", lessonRow.chapter_id,
    );
    if (!chRow) { logger.info("[P239] Quiz skip: chapter not found for lesson " + lid); continue; }

    const existingQuiz = await queryOne<{ id: number }>(
      "SELECT id FROM quizzes WHERE chapter_id = ? AND title LIKE ?",
      lessonRow.chapter_id, "%Leçon " + lessonRow.id + "%",
    );
    if (existingQuiz) { logger.info("[P239] Quiz skip: quiz already exists for lesson " + lid); continue; }

    const quizTitle = "Quiz : " + quizData.subject.toUpperCase() + " — Leçon " + lessonRow.id;
    const quizResult = await run(
      "INSERT INTO quizzes (subject_id, chapter_id, title, level, position, status) VALUES (?, ?, ?, '', 0, 'approved')",
      chRow.subject_id, lessonRow.chapter_id, quizTitle,
    );
    const quizId = Number(quizResult.lastInsertRowid);
    logger.info("[P239] Created quiz q" + quizId + " for lesson " + lid);

    for (let qi = 0; qi < quizData.questions.length; qi++) {
      const q = quizData.questions[qi];
      await run(
        "INSERT INTO questions (quiz_id, question, options, answer_index, explanation, points, position) VALUES (?, ?, ?, ?, ?, 1, ?)",
        quizId, q.q, JSON.stringify(q.opts), q.ans, q.exp, qi,
      );
    }
  }
  logger.info("[P239] Technical quizzes seeding completed.");
}
