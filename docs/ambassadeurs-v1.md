# Edukora — Ambassadeurs & Referral v1

> **Phase 3j — transformer le parrainage existant en canal mesurable.**
> Aucun code. Aucune refonte. **Aucun commit, push ni déploiement.**
>
> **Le système de parrainage existe et fonctionne de bout en bout.**
> Ce document ne le recrée pas : il le **rend mesurable** et le **protège**.

---

## 0. Résumé exécutif

| Verdict | Détail |
|---|---|
| **Le système existe** | de la génération du code aux statistiques admin |
| **Il n'a produit aucun filleul réel** | les 11 « filleuls » en base sont des comptes de test `@test.ci` |
| **La récompense est versée trop tôt** | +150 XP **à l'inscription**, avant toute activation |
| **Le code n'est pas pré-rempli** | le visiteur arrivant par lien doit **retaper** le code |
| **Conclusion** | **3 corrections ciblées**, pas un nouveau système |

> **Le goulot n'est pas le code, c'est la mesure et la protection.**
> today le système confond « inscrit » et « élève actif » — et paie les deux.

---

## 1. Ce qui existe déjà — ne pas recréer

### 1.1 Modèle de données

`src/lib/db.ts:175-176`

```sql
referral_code TEXT UNIQUE,                    -- code du parrain
referred_by   INTEGER REFERENCES users(id),   -- FK vers le parrain
```

**Ce sont les deux seules colonnes. Il n'y a pas de table de parrainage.**
La relation est portée par `users` lui-même. C'est **suffisant** pour la
relation, **insuffisant** pour l'historique (voir §4).

### 1.2 Chaîne complète, étape par étape

| # | Étape | Emplacement | État |
|---|---|---|---|
| 1 | Génération du code `EDK-XXXXXXXX` | `src/app/api/auth/register/route.ts:163` | ✅ |
| 2 | Collision de code : **5 tentatives** | `register/route.ts:187-194` | ✅ |
| 3 | Affichage + copie + partage WhatsApp | `src/app/parrainage/page.tsx` | ✅ |
| 4 | Tracking `referral_link_shared`, `referral_code_copied` | `src/app/parrainage/page.tsx:41,68` | ✅ |
| 5 | **Clic** : `?ref=` lu, `referral_clicked` émis | `src/app/inscription-1-2-edukora/page.tsx:78-79` | ✅ |
| 6 | Champ « Code de parrainage » au formulaire | `inscription-1-2-edukora/page.tsx:410-421, 682-697` | ✅ |
| 7 | Résolution du code → `referredBy` | `register/route.ts:80-85` | ✅ |
| 8 | Écriture `referred_by` | `register/route.ts:166` | ✅ |
| 9 | **Récompense** `addXp(referrer, 150)` | `register/route.ts:216` | ⚠️ trop tôt |
| 10 | **Récompense** `addXp(filleul, 50)` | `register/route.ts:223` | ⚠️ trop tôt |
| 11 | Notifications parrain + filleul | `register/route.ts:210-227` | ✅ |
| 12 | Journal d'audit `logAudit` | `register/route.ts:213` | ✅ |
| 13 | Statistiques admin `getReferralStats()` | `src/lib/admin.ts:925-960` | ✅ |
| 14 | Écran admin `/espace-admin/parrainage` | `espace-admin/parrainage/page.tsx` | ✅ |

> **Le tunnel est complet.** Aucune étape ne manque. C'est une acquisition
> remarkable — le problème n'est pas la construction.

### 1.3 Ce que fait déjà `getReferralStats()`

`src/lib/admin.ts:925`

| Sortie | Contenu |
|---|---|
| `totals.referrers` | nombre de parrains |
| `totals.referred` | nombre de filleuls |
| `totals.active_week` | filleuls actifs sur 7 jours |
| `top` | top 10 parrains : nom, code, `count`, `active_week`, `xp` |
| `list` | tous les filleuls : nom, email, classe, **nom du parrain**, code, dates |

> L'écran admin est **complet et opérationnel**. Il manque seulement les
> **filtres anti-fraude** et la **notion d'activation** (§4).

---

## 2. État réel — la mesure honnête

`data/edukora.db`

| Mesure | Valeur |
|---|---|
| Utilisateurs | **290** |
| Avec `referral_code` | **284** |
| Avec `referred_by` (filleuls) | **11** |
| Parrains distincts | **3** |
| Codes en doublon | **0** |
| Auto-parrainage | **0** |
| **Filleuls avec au moins une leçon** | **0 / 11** |
| Filleuls jamais connectés | **7 / 11** |

### 2.1 Le verdict

> **Les 11 filleuls sont des comptes de test.** Tous leurs emails sont en `@test.ci`
> (51 comptes de test au total dans la base).
>
> **Le système de parrainage n'a produit aucun filleul organique.**
> Et les 11 test-comptes ont été créés **avant** l'obligation de téléphone :
> **270 des 290 utilisateurs n'ont pas de téléphone**.

### 2.2 Les 3 parrains

| Code | Parrain | Filleuls | Actifs |
|---|---|---|---|
| `EDK-1JZWZ3` | Yao Kouadio | 6 | 2 |
| `EDK-CYL39L` | Luc Yao | 3 | 2 |
| `EDK-ZZ3WRB` | Mariam Diabaté | 2 | 1 |

> Trois profils de test. **Le classement n'a jamais été testé en conditions réelles.**

### 2.3 Deux corrections apportées aux phases précédentes

| Affirmation antérieure | Réalité vérifiée |
|---|---|
| « récompense = **-20 % + 300 XP** » | **Faux.** La récompense est **+150 XP** (parrain) / **+50 XP** (filleul). La remise de 20 % vient de `promo_codes`, un système **distinct** |
| « `referral_clicked` n'est jamais émis » | **Faux.** Il est émis en `inscription-1-2-edukora/page.tsx:79`. Ma recherche précédente était erronée |

---

## 3. Architecture cible

```
                    AMBASSADEUR
                         │
              code EDK-XXXXXXXX (déjà généré)
              + lien  /inscription-…?ref=EDK-XXXXXXXX
                         │
                         ▼
                    VISITEUR
                         │
          ┌──────────────┴───────────────┐
          │ code NON pré-rempli          │  ← E10 : fuite principale
          │ → recopier à la main         │
          └──────────────┬───────────────┘
                         ▼
                   INSCRIPTION
             referred_by = parrain.id      ← ✅ existe
                         │
          ┌──────────────┴───────────────┐
│              +150 XP, immédiatement             │  ← E11 : trop tôt, non validé
          └──────────────┬───────────────┘
                         ▼
                   ACTIVATION              ← ❌ n'existe pas (E12)
                 1re leçon
                         │
                         ▼
                RÉCOMPENSE VALIDÉE
                         │
                         ▼
              /espace-admin/parrainage
```

> **Une seule brique manque vraiment** : le jalon **ACTIVATION**.
> Tout le reste est une question de mesure et de garde-fous.

---

## 4. Les 6 écarts

| # | Écart | Preuve | Effet |
|---|---|---|---|
| **E10** | **`?ref=` n'est jamais pré-rempli** | `inscription-1-2-edukora/page.tsx:55` — `useState("")`, seuls des `onChange` | **le visiteur doit retaper le code** |
| **E11** | **Récompense à l'inscription, sans validation** | `register/route.ts:216, 223` — `addXp` immédiat | **la fraude est récompensée instantanément** |
| **E12** | **Aucun jalon d'activation** | `referred_by` est un entier, pas un objet | **impossible de distinguer inscrit et actif** |
| **E13** | **`referred_by` non indexé** | aucun `idx_users_referred_by` dans `db.ts` | le `JOIN` admin scanne `users` |
| **E14** | **Dédoublonnage téléphone contournable** | `register/route.ts:16` — `digits.slice(-10)` | ajouter des chiffres crée un autre canon |
| **E15** | **Pas de registre XP** | pas de table `xp_events` | **origine des XP non auditable** |
| **E16** | **`?ref=` surchargé** | code parrain sur `/inscription`, réf. transaction sur `/validation-ussd-geniuspay` | confusion de nomenclature |

### 4.1 E10 en détail — la fuite qui coûte le plus

Le code est lu (`page.tsx:78`) et l'événement est émis, **mais le champ du
formulaire n'est jamais rempli**. Le visiteur doit retaper `EDK-XXXXXXXX` à la main.

> **La plupart des mobils ne le feront pas.** L'ambassadeur partage un lien ;
> l'ami clic, arrive sur l'inscription, et **le code a disparu**.
> **C'est la raison pour laquelle un système Referral bien construit peut
> ne produire aucune inscription.**

Le commentaire du code explique que le code n'est pas remonté en analytics —
**c'est une bonne décision** (le code est un identifiant lié à un compte).
Mais la conséquence n'a pas été tirée : il fallait aussi le **passer au
formulaire en local**, pas en analytics.

### 4.2 E11 en détail — la faille anti-fraude

```
inscription  ──►  addXp(parrain, 150) + addXp(filleul, 50)
                     ▲
                     └── aucune vérification d'activité
```

Un compte créé puis jamais utilisé **produit déjà la récompense**.
Un fraudeur n'a rien à faire d'autre qu'apporter des inscriptions.

### 4.3 E14 en détail

```ts
const digits = raw.replace(/\D/g, "");
if (digits.startsWith("225")) return digits.slice(-10);
return digits.slice(-10);
```

| Saisie | Canon | Collision ? |
|---|---|---|
| `07 12 34 56 78` | `0712345678` | — |
| `+225 07 12 34 56 78` | `0712345678` | ✅ bloquée |
| `0712345678 99` | `3456787899` | ❌ **passé** |

Le `slice(-10)` prend les **derniers** 10 chiffres : ajouter des chiffres à la
finie change le canon. L'index unique `idx_users_phone_canonical` ne bloque donc
**pas** les comptes multiples.

---

## 5. Mesures

Le funnel demandé, avec ce qui existe et ce qui manque.

| Étape | Mesure | Available ? | Source |
|---|---|---|---|
| Ambassadeur | comptes avec `referral_code` | ✅ | SQL |
| **Clic** | `referral_clicked` | ✅ | `analytics_events` |
| Partage | `referral_link_shared` | ✅ | `analytics_events` |
| Copie | `referral_code_copied` | ✅ | `analytics_events` |
| **Inscription** | `referred_by IS NOT NULL` | ✅ | SQL |
| **Activation** | 1ʳᵉ leçon du filleul | ⚠️ **calculable** | `lesson_reads` |
| Élève actif | activité 30 j | ⚠️ **calculable** | `lesson_reads` |
| **Conversion** | filleul payant | ⚠️ **calculable** | `subscriptions` |
| **Coût / récompense** | coût par filleul activé | ❌ **à définir** | voir §6 |

> **Bonne nouvelle :** les 4 étapes manquantes sont **déjà calculables en SQL**,
> aujourd'hui, sans développement. `getReferralStats()` ne les exploite pas encore.

### 5.1 Requêtes de référence

**Funnel complet, par mois**

```sql
--/vue : statistiques de parrainage
WITH filleuls AS (
  SELECT u.id, u.referred_by, u.created_at, u.last_active,
    EXISTS (SELECT 1 FROM lesson_reads l WHERE l.user_id = u.id) AS a_une_lecon,
    EXISTS (SELECT 1 FROM lesson_reads l
            WHERE l.user_id = u.id AND l.read_at > NOW() - INTERVAL '30 days') AS a_actif_30j,
    EXISTS (SELECT 1 FROM subscriptions s
            WHERE s.user_id = u.id AND s.status = 'active') AS a_payant
  FROM users u WHERE u.referred_by IS NOT NULL
)
SELECT
  COUNT(*)::int                                        AS filleuls,
  COUNT(*) FILTER (WHERE a_une_lecon)::int              AS activation,
  COUNT(*) FILTER (WHERE a_actif_30j)::int              AS actifs_30j,
  COUNT(*) FILTER (WHERE a_payant)::int                 AS payants,
  ROUND(100.0 * COUNT(*) FILTER (WHERE a_une_lecon)
        / NULLIF(COUNT(*), 0), 1)                       AS taux_activation_pct,
  ROUND(100.0 * COUNT(*) FILTER (WHERE a_payant)
        / NULLIF(COUNT(*), 0), 1)                       AS taux_conversion_pct
FROM filleuls;
```

**Détection d'auto-parrainage et de doublons**

```sql
-- 1. Auto-parrainage (doit renvoyer 0)
SELECT COUNT(*) FROM users WHERE referred_by = id;

-- 2. Un même parrain au-delà de 20 filleuls (seuil d'alerte)
SELECT referred_by, COUNT(*) n
FROM users WHERE referred_by IS NOT NULL
GROUP BY referred_by HAVING COUNT(*) > 20;

-- 3. Filleuls sans aucune leçon (fuite)
SELECT COUNT(*) FROM users u
WHERE u.referred_by IS NOT NULL
  AND NOT EXISTS (SELECT 1 FROM lesson_reads l WHERE l.user_id = u.id);
```

---

## 6. Coût et récompense

### 6.1 Coût réel aujourd'hui : **0 FCFA**

| Poste | Coût |
|---|---|
| Génération du code | 0 FCFA |
| Partage WhatsApp / natif | 0 FCFA |
| Statistiques admin | 0 FCFA |
| **+150 XP / +50 XP** | **0 FCFA** |

> **L'XP n'est pas de la monnaie.** Vérifié : il n'existe **aucune table de
> conversion XP → avantage**, aucun catalogue de récompense, aucun
> `xp_events`. L'XP est un **score de gamification** (badges, ligues, paliers
> de série). Il sert d'**engagement**, pas de rémunération.

### 6.2 Le coût réel d'un filleul

| Poste | Valeur | Commentaire |
|---|---|---|
| Prime d'inscription | **0 FCFA** | le quota gratuit permet l'activation |
| XP | **0 FCFA** | pas de conversion en avantage |
| **Coût = 0 FCFA** | | **tant qu'aucune récompense matérielle n'est versée** |

> C'est un point crucial : **le modèle actuel est intégralement gratuit**,
> et c'est ce qui le rend soutenable à l'échelle. Toute récompense en
> espèces le ferait basculer en acquisition payante.

---

## 7. Anti-fraude

### 7.1 Ce qui est déjà en place

| Protection | Emplacement | Efficacité |
|---|---|---|
| **Téléphone obligatoire** | `register/route.ts:62-64` | 🟢 forte |
| **Index unique `phone_canonical`** | `db.ts:1191, 1203` | 🟢 forte — sauf E14 |
| **`referral_code` UNIQUE** | `db.ts:175` | 🟢 forte |
| **Retry sur collision de code** | `register/route.ts:187-194` | 🟢 correct |
| **Rate limit inscription** | `rate-limit.ts:10` — **20 / heure / IP** | 🟡 moyenne |
| **`referral_code` normalisé en majuscules** | formulaire + `register:83` | 🟢 correct |
| **Codes de test exclus des statistiques** | `src/lib/test-users.ts` | 🟢 bonne pratique existante |

> `src/lib/test-users.ts` exclut déjà les emails `%.test@edukora.net` des
> statistiques. **Les 51 comptes `@test.ci` n'ont simplement pas été retrofités
> dans cette liste** — d'où des statistiques trompeuses.

### 7.2 Les 5 vecteurs demandés

| Vecteur | Menace actuelle | Parade |
|---|---|---|
| **Auto-parrainage** | 🟡 `referred_by = id` impossible à l'inscription (le compte n'existe pas encore), **mais un compte antérieur peut parrainer un nouveau compte** | interdire explicitement `referred_by` = tout compte créé par le même `phone_canonical` ou la même IP dans 30 jours |
| **Doublons** | 🔴 **E14** — `slice(-10)` contourne l'index unique | normaliser à 10 chiffres **et rejeter** les saisies de plus de 10 chiffres après `+225` |
| **Faux comptes** | 🔴 **E11** — récompense à l'inscription, sans activation | **conditionner la récompense à l'activation** |
| **Spam** | 🟡 20 inscriptions / heure / IP ; rien sur le partage | plafonner les Rewards par compte et par IP ; limiter les filleuls par parrain |
| **Inscriptions artificielles** | 🔴 **aucun journal XP** (E15) | crée `referral_rewards` avec statut ; ne payer qu'après activation |

### 7.3 Règle Anti-fraude — le changement de principe

> **Ne jamais récompenser une inscription. Toujours récompenser une activation.**

```
AUJOURD'HUI (fraudulent)          PROPOSÉ (sûr)
──────────────────────────        ──────────────────────────
inscription  ──► +150 XP          inscription ──► rien
                                   1re leçon  ──► +150 XP
                                   30 j actif ──► badge ambassadeur
```

**Coût de la fraude après correctif : 0.** Il faut créer un compte, le-mail
confirmer, et **réviser une leçon**. Un attaquant ne le fera pas à l'échelle.

### 7.4 Garde-fous recommandés

| Garde-fou | Seuil | Raison |
|---|---|---|
| Filleuls par parrain | **max 30 / mois** | au-delà, vérifier manuellement |
| Filleuls par IP | max 5 / mois | détecte un réseau |
| Récompense par compte | max 10 XP / jour | empêche le cumul artificiel |
| Rétention à 30 j | si < 10 %, **suspendre temporairement** | bloque les réseaux |
| Audit mensuel | `getReferralStats()` filtré | revue humaine |

---

## 8. Récompenses

### 8.1 La position retenue

> **Ne pas introduire de commission. Pas maintenant.**

Raison : le taux d'activation des filleuls est de **0 %** et il n'existe
**aucun filleul réel**. Payer une commission avant d'avoir un funnel qui
fonctionnerait serait **payer pour des test-comptes**.

### 8.2 Barème non financier, séquencé

| Palier | Condition | Récompense | Coût | Availability |
|---|---|---|---|---|
| **Bronze** | 1 filleul activé | badge + 150 XP | **0** | ✅ simple |
| **Argent** | 3 filleuls activés | badge + accès anticipé aux nouveautés | **0** | ✅ simple |
| **Or** | 10 filleuls activés | badge + 1 mois premium offert | **~135 FCFA** | ⚠️ récurrent |
| **Platine** | 25 filleuls + 3 actifs 30 j | badge + 2 mois premium + mention « Ambassadeur » | **~270 FCFA** | ⚠️ récurrent |

### 8.3 Pourquoi le premium et pas une prime

| Type | Coût | Risque | Verdict |
|---|---|---|---|
| **Badge** | 0 FCFA | aucun | ✅ immédiatement |
| **Accès anticipé** | 0 FCFA | aucun | ✅ immédiatement |
| **XP** | 0 FCFA | aucun | ✅ immédiatement |
| **Premium offert** | 135 FCFA / mois | récurrent | 🟡 palier Or |
| **Prime en espèces** | variable | **fracture de budget** | ❌ **exclu** |

> **Le coût est dominé par l'accès premium, pas par la prime.** Le ratio
> est favorable tant que le taux d'activation dépasse ~5 %.

### 8.4 Le badge comme levier — 0 FCFA, et il existe déjà

`badges` (78 en base) + `user_badges` (42) + composants `ShareBadgeButton`,
`ShareLeagueButton` : **l'infrastructure de partage social existe déjà**.

Un badge « Ambassadeur Edukora » partageable est :
- **gratuit**,
- **visible** sur le profil,
- **partageable en un clic** sur WhatsApp.

> C'est la récompense la plus rentable du dispositif, et elle est déjà
> techniquement supportée.

---

## 9. UX

### 9.1 `/parrainage` aujourd'hui

| Élément | État |
|---|---|
| Code affiché en gros | ✅ |
| Copier le code | ✅ + `referral_code_copied` |
| Partage WhatsApp avec code | ✅ `wa.me` |
| Partage natif (`navigator.share`) | ✅ + `referral_link_shared` |
| Texte « +150 XP / +50 XP » | ✅ |
| **Compteur de filleuls** | ⚠️ non affiché sur la page |
| **Progression vers le prochain palier** | ❌ |
| **Message après chaque filleul** | ✅ notification |

### 9.2 Les 4 améliorations à fort levier

| # | Amélioration | Pourquoi |
|---|---|---|
| **1** | **Pré-remplir `?ref=` dans le formulaire** | supprime la recopie manuelle (E10) |
| **2** | **Afficher le compteur de filleuls activés** | rend le progrès visible → relance le partage |
| **3** | **Barre de progression vers le palier suivant** | « 2 / 3 pour Argent » motive |
| **4** | **Distinguer inscrit / activé** | évite la déception « j'ai invite 5 personnes, rien » |

### 9.3 Le parcours cible

```
Ambassadeur copie son lien  →  /inscription-…?ref=EDK-XXXXXXXX
                              →  code PRÉ-REMPLI, badge « Invité par … »
                              →  inscription
                              →  « +150 XP en attente »  (pas encore validé)
                              →  1ʳᵉ leçon
                              →  « +150 XP validés » 🔔
                              →  compteur : 1 filleul activé
                              →  « Encore 2 pour le badge Argent »
```

> **Le changement de messaging est essentiel** : « en attente » → « validés »
> rend le délai légitime au lieu d'être un bug.

---

## 10. Stratégie de lancement

### 10.1 Séquence en 4 temps

| Temps | Action | Coût |
|---|---|---|
| **J+0** | Corriger E10 (pré-remplissage) + E14 (téléphone) | 0 FCFA |
| **J+7** | Ajouter le jalon activation + récompense conditionnelle | 0 FCFA |
| **J+14** | Recruter **10 ambassadeurs** parmi les 45 professeurs et 241 élèves | badges only |
| **J+30** | Premier bilan sur `/espace-admin/parrainage` | 0 FCFA |

### 10.2 Qui recruter en premier

| Cible | Pourquoi | Volume |
|---|---|---|
| **Professeurs** (45 inscrits) | prescripteurs naturels ; amènent des classes entières | 5 |
| **Élèves actifs** | usage réel du produit | 10 |
| **Parents** | multiplicateurs (Phase 3i P3) | 5 |

> **Les professeurs d'abord.** Un professeur ambassadeur apporte une classe
> entière — c'est le levier le plus efficace du dispositif.

### 10.3 Le premier objectif

> **10 ambassadeurs actifs × 3 filleuls activés = 30 élèves activés.**
>
> C'est **4 fois** l'activité actuelle (7 comptes actifs).

**Ce n'est pas un objectif de croissance. C'est un test de fonctionnement.**

---

## 11. Conformité

- **Aucune refonte** : le système existant est réutilisé tel quel.
- **Aucune modification de production** dans cette phase.
- **Aucune campagne payante.**
- **Aucune commission en espèces** : récompenses non financières, coût 0 FCFA.
- **Aucun commit, aucun push, aucun déploiement.**

---

## Voir aussi
- `docs/acquisition-ci-v1.md` — ambassadeurs dans la stratégie d'acquisition (Phase 3i)
- `docs/personas-ci.md` — personas, dont P3 Parent, multiplicateur naturel
- `docs/growth-metrics.md` — définitions KPI (Phase 3h)
- `docs/analytics-funnel.md` — taxonomie `referral_clicked` (Phase 3f)