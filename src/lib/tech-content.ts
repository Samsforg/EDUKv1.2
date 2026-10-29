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
    "INSERT INTO lessons (chapter_id, title, summary, content_md, position, status) VALUES (?, ?, ?, ?, ?, 'pending')",
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
