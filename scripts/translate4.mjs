import fs from "node:fs";
import path from "node:path";

const pairs = [
  ["Automatic flag triggered: Exam Simulator access from multiple geo-locations within 15 minutes.", "Alerte automatique : accès au simulateur d'examen depuis plusieurs zones géographiques en 15 minutes."],
  ["New Fraud Rule 'BAC_EXAM_TICKET' enabled", "Nouvelle règle de fraude « BAC_EXAM_TICKET » activée"],
  ["Bot-like Behavior in Exam Simulator", "Comportement de bot dans le simulateur d'examen"],
  ["Fraud Rule Configuration", "Configuration des règles de fraude"],
  ["Rule Configuration Update", "Mise à jour de la configuration des règles"],
  ["Votre précision de validation est de 99.8% (Elite Status).", "Votre précision de validation est de 99,8 % (Statut Élite)."],
  ["Professional Email Address", "Adresse e-mail professionnelle"],
  ["Avg. Daily Study Time", "Temps d'étude quotidien moyen"],
  ["Internal Admin Notes", "Notes internes admin"],
  ["Internal Audit Note", "Note d'audit interne"],
  ["Live Alerts Feed", "Flux d'alertes en direct"],
  ["Live Monitoring", "Surveillance en direct"],
  ["Exam Monitoring", "Surveillance des examens"],
  ["Encryption Status", "État du chiffrement"],
  ["User Uploaded Receipt", "Reçu téléversé par l'utilisateur"],
  ["Status from Provider", "Statut du fournisseur"],
  ["Amount Matches", "Montant correspondant"],
  ["Load 20 more sheets", "Charger 20 fiches de plus"],
  ["Rule: BRUTE_FORCE_DETECTED", "Règle : BRUTE_FORCE_DETECTED"],
  ["Rule: IP_VELOCITY_LIMIT", "Règle : IP_VELOCITY_LIMIT"],
  ["Rule: RECURRING_PAYMENT_FAILURE", "Règle : RECURRING_PAYMENT_FAILURE"],
  ["Financial Health", "Santé financière"],
  ["System Health", "Santé du système"],
  ["System Status", "État du système"],
  ["System Audit", "Audit système"],
  ["Exam Compromise", "Compromission d'examen"],
  ["Fraud Category", "Catégorie de fraude"],
  ["Fraud Alerts", "Alertes de fraude"],
  ["Fraud Monitoring", "Surveillance de la fraude"],
  ["Exam Reports", "Rapports d'examens"],
  ["Upcoming Exam", "Examen à venir"],
  ["Login Loop Issue", "Problème de boucle de connexion"],
  ["Quiz Score Not Saved", "Score du quiz non sauvegardé"],
  ["Reject Dispute", "Rejeter le litige"],
  ["Status: Pending", "Statut : En attente"],
  ["Status: Active", "Statut : Actif"],
  ["Audit Log", "Journal d'audit"],
  ["Admin Panel", "Panneau Admin"],
  ["Panel Admin", "Panneau Admin"],
  ["Platform Controller", "Contrôleur de plateforme"],
  ["Platform Manager", "Responsable de plateforme"],
  ["Admin Central", "Administration centrale"],
  ["Admin User", "Utilisateur admin"],
  ["Super Admin", "Super Admin"],
  ["Expert Status", "Statut d'expert"],
  ["Exam Season", "Saison des examens"],
  ["Faculty Admin", "Admin de la faculté"],
  ["Live Chat", "Chat en direct"],
  ["(Audit Staff)", "(Personnel d'audit)"],
  ["User #8829 banned by Admin Ibrahim", "Utilisateur #8829 banni par Admin Ibrahim"],
  ["82% High Load", "Charge élevée 82 %"],
  ["Live Node: CI-01", "Nœud Live : CI-01"],
  ["Timeout API Gateway", "Délai d'expiration API Gateway"],
  ["Top 5 Study Sheets", "Top 5 des fiches d'étude"],
];

const root = path.join(import.meta.dirname, "..", "src", "app");

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".tsx")) out.push(p);
  }
  return out;
}

let filesTouched = 0;
const touched = [];

for (const file of walk(root)) {
  let c = fs.readFileSync(file, "utf8");
  const before = c;
  for (const [from, to] of pairs) {
    c = c.split(from).join(to);
  }
  if (c !== before) {
    fs.writeFileSync(file, c);
    filesTouched++;
    touched.push(path.relative(root, file).split(path.sep)[0]);
  }
}

console.log(`Fichiers modifiés : ${filesTouched}`);
console.log(touched.join("\n"));
