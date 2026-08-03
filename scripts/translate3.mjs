import fs from "node:fs";
import path from "node:path";

const pairs = [
  ["OCR Verification: Transaction ID Matches Receipt", "Vérification OCR : l'ID de transaction correspond au reçu"],
  ["Confirm 5,500 FCFA exactly (No partial payments).", "Confirmez exactement 5 500 FCFA (aucun paiement partiel)."],
  ["Forgot password, email not arriving", "Mot de passe oublié, e-mail non reçu"],
  ["Reject &amp; Flag for Fraud", "Rejeter et signaler pour fraude"],
  ["Reject & Flag for Fraud", "Rejeter et signaler pour fraude"],
  ["Update Rule Engine", "Mettre à jour le moteur de règles"],
  ["Contact Faculty Support", "Contacter le support académique"],
  ["Academic Integrity Flag", "Alerte d'intégrité académique"],
  ["No threats detected", "Aucune menace détectée"],
  ["Transaction History", "Historique des transactions"],
  ["Transaction Amount", "Montant de la transaction"],
  ["Auto-Session Timeout", "Expiration automatique de session"],
  ["Expiration de Session Auto", "Expiration automatique de session"],
  ["Current Session", "Session en cours"],
  ["Overall Risk Score", "Score de risque global"],
  ["Security Protocol", "Protocole de sécurité"],
  ["Security Audit", "Audit de sécurité"],
  ["Platform Settings", "Paramètres de la plateforme"],
  ["Schedule Session", "Planifier la session"],
  ["Session Replay", "Replay de session"],
  ["Billing Disputes", "Litiges de facturation"],
  ["Admin Console", "Console admin"],
  ["Admin Profile", "Profil admin"],
  ["Expert Login", "Connexion Expert"],
  ["Expert Dashboard", "Tableau de bord Expert"],
  ["Identity Check", "Vérification d'identité"],
  ["Identity Fraud", "Fraude d'identité"],
  ["Search Admin / Rule", "Rechercher admin / règle"],
  ["Trigger Score", "Score de déclenchement"],
  ["Ticket Queue", "File des tickets"],
  ["Queue Status", "Statut de la file"],
  ["Queue Load", "Charge de la file"],
  ["Transaction Ref", "Réf. transaction"],
  ["Kora AI Engine", "Moteur IA Kora"],
  ["Kora IA Engine Active", "Moteur IA Kora actif"],
  ["AI Engine (Edukora Tutor)", "Moteur IA (tuteur Edukora)"],
  ["Rule Engine", "Moteur de règles"],
  ["Tuteur IA Engine", "Moteur du tuteur IA"],
  ["No pending tasks", "Aucune tâche en attente"],
  ["Offline Mode", "Mode hors ligne"],
  ["Study Settings", "Paramètres d'étude"],
  ["Impact Score", "Score d'impact"],
  ["Max Score", "Note maximale"],
  ["Health Score", "Score de santé"],
  ["Retour au Dashboard", "Retour au tableau de bord"],
  ["Accéder au Dashboard", "Accéder au tableau de bord"],
  ["Vérifier la Transaction :", "Vérifier la transaction :"],
  ["ID Transaction", "Réf. transaction"],
  ["Support &amp; Informations", "Support et informations"],
  ["Dernier Back-up", "Dernière sauvegarde"],
  ["Security", "Sécurité"],
  ["Queue", "File"],
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
