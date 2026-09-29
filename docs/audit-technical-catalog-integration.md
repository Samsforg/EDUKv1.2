# Audit — Intégration du catalogue technique dans l'espace élève (Phase 3c)

**Date**: 2026-09-29
**Portée**: lecture seule, aucune modification de code.

## 1. Page actuelle du catalogue

- **Page** : `src/app/cours/page.tsx` (client) — sections « Mon niveau » (boutons grades) puis « Matières disponibles » (cartes → `/cours/[subjectCode]/[gradeCode]`).
- **Pages voisines** : `src/app/matieres/page.tsx` (toutes matières + progression, sans filtre niveau), `src/app/cours/[subjectCode]/[gradeCode]/page.tsx` (chapitres), `src/app/cours/chapitres/[chapterId]/page.tsx` (leçons), `src/app/cours/lecon/[lessonId]/page.tsx` (contenu).
- **Routes utilisées** : convention existante `/cours/...` conservée (aucune route `/classes/*` à créer).

## 2. Composant responsable et API/service utilisé

- `CoursPage` consomme **`GET /api/cours`** (`src/app/api/cours/route.ts`) qui retourne `grades` + `subjects` + `userGrade` **depuis la DB** (aucune liste codée en dur).
- Détail chapitres : `GET /api/cours/[subjectCode]/[gradeCode]` (chapitres `approved` par codes).
- Inscription (Phase 5) : dropdown alimenté par `GET /api/grades` ; résolution via `findGradeDirect` + `gradeNeedsSerie`.

## 3. Source des données et données hardcodées trouvées

- **Niveaux** : 17 grades en DB (11 généraux + 6 techniques) ; boutons rendus depuis l'API — **aucun dur**.
- **Filtre matières** : `subjects.filter(coefficient_json[selectedGrade])` + badge coef — lit le champ **dénormalisé legacy**, pas `subject_grades` (source de vérité admin depuis Phase 2).
- **Regroupement filières** : absent (17 boutons plats) ; aucun champ `track`/`filière` en base (seul `cycle` existe : collège/lycée, insuffisant car techniques = lycée).
- **Durs résiduels** : `inscription` FALLBACK_CLASSES (repli hors-ligne, acceptable), `bienvenue-enseignant` QUICK_GRADES (côté prof, hors scope), `level.ts` (tables de normalisation + mapping séries, règle métier stable).
- `content_slug` (colonne `chapters`) : jamais remplie ni lue — laissée intacte (aucun routing à changer).

## 4. Cause exacte (classification A–H)

**E + B** : l'API élève sert le champ dénormalisé `coefficient_json` au lieu de la table normalisée `subject_grades` (les éditions admin de coefficients sont invisibles côté élève), et l'UI ne distingue pas les filières. Les niveaux techniques SONT retournés et cliquables, mais : pas de regroupement Général/Technique, et **0 leçon approuvée** sur les 6 classes (32 chapitres présents) → parcours mort après les chapitres.

## 5. Données disponibles côté utilisateur (vérifié DB + live)

- 6/6 classes, 6/6 matières techniques, 32 chapitres `approved`, 32 curricula `BO TECHNIQUE 2024` actifs, 32 coefficients.
- `/api/grades` live : 17 classes avec `needs_serie` correct (7 générales `true`, techniques `false`).
- `/sitemap.xml` live : 44 URLs, 0 `/fiches/`, 7 annales (décision Phase SEO : pas d'URLs auth-walled).

## 6. Architecture recommandée

1. Migration additive `grades.track TEXT DEFAULT 'general'` + backfill des 6 codes → `'technique'` (zéro impact lectures existantes).
2. `/api/cours` : exposer `track` par grade + map `coefficients` depuis `subject_grades` (1 requête) ; conserver `coefficient_json` en repli.
3. `/cours` : filtrer/badge via `subject_grades`, regrouper Général/Technique (+ groupes futurs automatiques), état vide explicite « Aucun cours disponible pour le moment ».
4. Helper testable `trackGroupLabel()` + tests unitaires ; **aucune** nouvelle route, table (hors `track`), ni contenu inventé (0 leçon technique = état vide affiché, ÉTAPE K).
