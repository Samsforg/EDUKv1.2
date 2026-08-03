import fs from "node:fs";
import path from "node:path";

const pairs = [
  ["AI Personal Tutor", "Tuteur IA personnel"],
  ["à l'AI Tutor", "au tuteur IA"],
  ["L'AI Tutor", "Le tuteur IA"],
  ["AI Tutor", "Tuteur IA"],
  ["IA Tutor", "tuteur IA"],
  ["Offline Ready", "Prêt hors ligne"],
  ["Expert Status: Lead", "Statut d'expert : Responsable"],
  ["Validation Queue", "File de validation"],
  ["Send via Email", "Envoyer par email"],
  ["24/7 Support", "Support 24h/24"],
  ["IA Settings", "Paramètres IA"],
  ["Exam Settings", "Paramètres d'examen"],
  ["Live Sessions", "Sessions en direct"],
  ["Confidence Level (%)", "Niveau de confiance (%)"],
  ["Flag Different City", "Signaler une autre ville"],
  ["Flag as high-risk if exceeded", "Signaler comme à risque si dépassé"],
  ["Save Changes to Live Engine?", "Enregistrer les changements du moteur en direct ?"],
  ["Edukora Academic Security", "Sécurité académique Edukora"],
  ["Academic Authority Security Portal", "Portail de Sécurité Académique"],
  ["Contact Support", "Contacter l'assistance"],
  ["Forgot password?", "Mot de passe oublié ?"],
  ["Identity Verification", "Vérification d'identité"],
  ["Security Policy", "Politique de sécurité"],
  ["Welcome back, Expert. Please enter your credentials to access the teacher dashboard.", "Bon retour, Expert. Saisissez vos identifiants pour accéder au tableau de bord professeur."],
  ["Assign Score", "Attribuer une note"],
  ["Save &amp; Next", "Enregistrer et suivant"],
  ["Attendance (Today)", "Présences (aujourd'hui)"],
  ["Attendance", "Présences"],
  ["Flag Issues", "Signaler un problème"],
  ["View Profile", "Voir le profil"],
  ["Support Lead", "Responsable support"],
  ["Billing Verification", "Vérification de facturation"],
  ["(Billing Dispute)", "(Litige de facturation)"],
  ["Security Dashboard", "Tableau de bord de sécurité"],
  ["Security Settings", "Paramètres de sécurité"],
  ["Back to Verification Queue", "Retour à la file de validation"],
  ["Verify Transaction:", "Vérifier la transaction :"],
  ["Return to Dashboard", "Retour au tableau de bord"],
  ["Edukora Support Console", "Console de support Edukora"],
  ["Edukora Dashboard", "Tableau de bord Edukora"],
  ["Edukora Support", "Support Edukora"],
  ["Edukora Professor Dashboard", "Tableau de bord Edukora"],
  ["Console Support Edukora", "Console de support Edukora"],
  ["Expert Community", "Communauté d'experts"],
  ["Astuce de Coach", "Astuce du coach"],
  ["Edukora Certified", "Certifié Edukora"],
  ["Grade", "Note"],
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

let total = 0;
let filesTouched = 0;

for (const file of walk(root)) {
  let c = fs.readFileSync(file, "utf8");
  let before = c;
  for (const [from, to] of pairs) {
    c = c.split(from).join(to);
  }
  if (c !== before) {
    fs.writeFileSync(file, c);
    filesTouched++;
    total += [...before].length - [...c].length > 0 ? 1 : 1;
    console.log(path.relative(root, file).split(path.sep)[0]);
  }
}

console.log(`\nFichiers modifiés : ${filesTouched}`);
