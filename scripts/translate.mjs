import fs from "node:fs";
import path from "node:path";

const dict = {
  "Dashboard": "Tableau de bord",
  "Home": "Accueil",
  "Profile": "Profil",
  "Settings": "Paramètres",
  "Courses": "Cours",
  "Status": "Statut",
  "Library": "Bibliothèque",
  "Chat": "Discussion",
  "Nov": "nov.",
  "Support": "Assistance",
  "Reports": "Rapports",
  "Verify": "Vérifier",
  "Welcome": "Bienvenue",
  "Invite": "Inviter",
  "Live": "En direct",
  "Billing": "Facturation",
  "Active": "Actif",
  "Explore": "Explorer",
  "Search": "Rechercher",
  "Password": "Mot de passe",
  "Filter": "Filtre",
  "Amount": "Montant",
  "Success": "Succès",
  "Failed": "Échec",
  "Export": "Exporter",
  "Yesterday": "Hier",
  "Account": "Compte",
  "Exams": "Examens",
  "Timestamp": "Horodatage",
  "Submitted": "Soumis",
  "Completed": "Terminé",
  "Payments": "Paiements",
  "All": "Tous",
  "Downloads": "Téléchargements",
  "Apply": "Appliquer",
  "Certified": "Certifié",
  "Offline": "Hors ligne",
  "Schedule": "Planifier",
  "Lives": "En direct",
  "Free": "Gratuit",
  "Skip": "Passer",
  "Date:": "Date :",
  "Welcome back": "Bon retour",
  "Forgot password": "Mot de passe oublié",
  "Sign in": "Se connecter",
  "Sign up": "S'inscrire",
  "Get started": "Commencer",
  "Create an account": "Créer un compte",
  "Login": "Se connecter",
  "Continue with": "Continuer avec",
  "Log out": "Se déconnecter",
  "Logout": "Se déconnecter",
  "Sign out": "Se déconnecter",
  "Cancel": "Annuler",
  "Save": "Enregistrer",
  "Submit": "Soumettre",
  "Edit": "Modifier",
  "Add": "Ajouter",
  "View all": "Voir tout",
  "See all": "Voir tout",
  "Next": "Suivant",
  "Back": "Retour",
  "Yes": "Oui",
  "No": "Non",
  "Done": "Terminé",
  "Close": "Fermer",
  "Share": "Partager",
  "Delete": "Supprimer",
  "Send": "Envoyer",
  "Record": "Enregistrer",
  "Start": "Commencer",
  "Finish": "Terminer",
  "Error": "Erreur",
  "Loading": "Chargement",
  "Search results": "Résultats de recherche",
  "No results": "Aucun résultat",
  "Try again": "Réessayer",
  "Learn more": "En savoir plus",
  "Read more": "Lire la suite",
};

const root = path.join(import.meta.dirname, "..", "src", "app");
const skip = new Set(["connexion-edukora"]);

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
  const rel = path.relative(root, file).split(path.sep)[0];
  if (skip.has(rel)) continue;
  let c = fs.readFileSync(file, "utf8");
  let count = 0;
  c = c.replace(/>([^<>{}]+)</gs, (match, inner) => {
    const t = inner.trim();
    if (dict[t]) {
      count++;
      return ">" + inner.replace(t, dict[t]) + "<";
    }
    return match;
  });
  if (count > 0) {
    fs.writeFileSync(file, c);
    filesTouched++;
    total += count;
    console.log(`${count}\t${rel}`);
  }
}

console.log(`\nFichiers modifiés : ${filesTouched}, remplacements : ${total}`);
