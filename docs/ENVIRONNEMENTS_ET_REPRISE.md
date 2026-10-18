# P2.15 — Fiche opérateur : configuration, déploiement, récupération (K)

Destinataire : personne autorisée (accès dashboard Vercel + gestionnaire de
secrets). Aucune valeur secrète dans ce document — uniquement des noms et
des procédures. Ne jamais copier une valeur depuis un terminal vers un
rapport ou une conversation.

## 1. Identifier le projet concerné

- Tableau de bord Vercel → projets du compte → **`edu-kv1-2`** (secondaire,
  URLs `*.vercel.app` uniquement) vs **`edukora-app`** (production :
  alias `edukora.net` + `www.edukora.net`, déploiement Ready du 12 oct.).
- Ne jamais confondre les deux : mêmes code et branche (`master`,
  dépôt `EDUKv1.2`), configurations différentes.

## 2. Confirmer les variables nécessaires

Référence : `P2146_ENVIRONMENT_VARIABLE_AUDIT_FINAL.md` (table P0–P3) et
`src/lib/env-validation.ts` (`ENV_SPECS`, test `tests/env-validation.test.ts`).
Minimum vital : `DATABASE_URL`, `SESSION_SECRET`, `GENIUSPAY_API_KEY`,
`GENIUSPAY_API_SECRET`.

## 3. Configurer `DATABASE_URL` (dashboard uniquement)

1. Projet `edu-kv1-2` → *Settings → Environment Variables → Add*.
2. Nom : `DATABASE_URL`. Valeur : URL de la base **décidée par l'humain**
   (même base prod si miroir assumé, base séparée si staging — ne pas
   deviner : trancher explicitement avant).
3. Environnements : **Production, Build + Runtime** (le build collecte
   `/api/csrf` et exige l'URL).
4. Enregistrer. Vérifier la présence par métadonnées (nom + environnements),
   sans relire la valeur.

## 4. Configurer `GENIUSPAY_API_SECRET` (même écran, P0 runtime)

Sans elle, les 5 routes `/api/premium/*` répondent 500 par appel.
Même procédure, environnement Production.

## 5. Relancer les validations

1. `npx tsc --noEmit` → 0 erreur.
2. `npm run lint` → 0 erreur (25 warnings documentés admis).
3. `npx jest tests/env-validation.test.ts tests/p16-f2-db-mode.test.ts --runInBand`.
4. Redéployer `master` (dashboard : *Deployments → Redeploy*, ou push) ;
   attendre **Ready**.

## 6. Contrôler le déploiement

- Journal : `Collecting page data` passe `/api/csrf`, `Compiled successfully`.
- URL du projet : 200, accueil, thème, consentement.
- `POST` soumission simulateur (compte de test) : 1 tentative, pas de doublon.
- `/api/health` : 200 ; 15 min sans 500 (journaux runtime).
- Variables : aucune valeur n'apparaît ni dans les logs ni dans les réponses.

## 7. Réagir à une erreur `DB_CONFIG`

Message `DB_CONFIG: DATABASE_URL absente ou vide sur Vercel` = variable
absente/vide au build (ou non propagée à l'environnement Build).
Ne pas toucher au code (`db.ts` fait son travail). Reprendre §3 en vérifiant
que la variable couvre bien l'environnement **Build**, pas seulement Runtime.

## 8. Revenir en arrière (si autorisé)

- Code : *Deployments* → déploiement Ready précédent → *Promote*.
  (Ici : tout déploiement antérieur au 7 oct. est pré-fail-fast ; après
  correction, le précédent sain est le nouveau build vert.)
- Schéma/données : **aucune action destructive** — migrations additives
  uniquement ; pas de `DROP` ; pas de restauration aveugle (PITR Neon via
  console, à confirmer).
- Post-rollback : accueil 200, login, 1 soumission test, consentement.
