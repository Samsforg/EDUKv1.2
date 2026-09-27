# Audit Architecture Contenu — Edukora

**Date**: 2026-09-21
**Auteur**: Assistant IA

---

## ARCHITECTURE ACTUELLE

**Tech Stack**: Next.js 16.3.5 (App Router, middleware in `src/proxy.ts`), React 19, TypeScript 5.7, TailwindCSS 3.4. SQLite (dev via `node:sqlite`) / PostgreSQL (prod via `DATABASE_URL` + `pg`). Auth: HMAC-signed stateless session cookies (`edukora_session`, 30 jours, SHA-256). Email: Brevo SMTP + API fallback. Paiements: GeniusPay. Observabilité: Sentry + Vercel Analytics.

**Structure des dossiers**:
- `src/lib/` — Cœur : `db.ts` (driver SQL/PG unifié), `auth.ts`, `session.ts`, `admin.ts`, `admin-content.ts`, `prof-content.ts`, `prof-subjects.ts`, `level.ts`, `seed.ts`, `college-content.ts`, `init.ts`, `types.ts`, `api-guard.ts`, `admin-guard.ts`, `validation.ts`, modules IA (`ai/*`), growth AI (`growth/*`)
- `src/app/api/` — REST endpoints groupés par domaine (`/admin`, `/prof`, `/classes`, `/auth`, `/cours`, `/subjects`, `/lessons`, `/quiz`, etc.)
- `src/app/*/page.tsx` — Pages client : `matieres/`, `cours/`, `espace-admin/`, `espace-prof/`, `espace-parent/`, `espace-eleve/`
- `src/components/` — UI : `PageHeader`, `AdminShell`, `TrendChart`, `ConfirmDialog`, `AdSenseBanner`, etc.

**Patterns clés**:
- `query`/`run` côté serveur avec conversion automatique `?`→`$n` pour PG
- Guards `requireAdmin()` / `requireTeacherSubject()` via `admin-guard.ts`
- Wrapper `guardApi()` pour rate-limiting + validation méthode
- Workflow statut contenu : `pending` → `approved`/`rejected` (prof crée → admin valide)
- Résolution niveau : `class_level` (string user) + `serie_id` → `grade_id` via `level.ts:gradeCandidates()`

---

## DONNÉES EXISTANTES

**Tables Core** (depuis `src/lib/db.ts:SCHEMA`):

| Table | Champs clés | Relations |
|-------|------------|-----------|
| `series` | `id, code, name` | → users.serie_id |
| `grades` | `id, code, name, cycle(collège/lycée), order_index` | → chapters.grade_id, users.grade_id |
| `subjects` | `id, code, name, icon, color, coefficient_json` | → chapters.subject_id, quizzes.subject_id, exam_papers.subject_id |
| `chapters` | `id, subject_id, grade_id, code, title, description, order_index, position, status, created_by` | → lessons.chapter_id, quizzes.chapter_id |
| `lessons` | `id, chapter_id, title, summary, content_md, content_html, video_url, duration_min, difficulty, is_premium, position, status, created_by` | → exercises.lesson_id, user_progress.lesson_id, saved_lessons.lesson_id, lesson_reads.lesson_id |
| `exercises` | `id, lesson_id, type(qcm/ouvert/calcul/dissertation/vrai_faux), question_md, answer_md, explanation_md, difficulty, points` | |
| `quizzes` | `id, subject_id, chapter_id, title, level, position, status, created_by` | → questions.quiz_id, quiz_attempts.quiz_id |
| `exam_papers` | `id, category(BAC/BEPC), series_id, subject_id, year, title, duration_minutes, status, created_by` | → questions.paper_id, exam_attempts.paper_id |
| `questions` | `id, quiz_id/paper_id, question, options(JSON), answer_index, explanation, points, position` | |
| `users` | `id, role(student/teacher/admin/parent/expert), email, phone, password_hash, first_name, last_name, serie_id, class_level, grade_id, xp, streak, blocked...` | |
| `classes` | `id, teacher_id, name, subject_id, grade_id, invite_code, year` | → class_students.class_id, class_assignments.class_id |
| `teacher_subjects` / `teacher_grades` | Liens M:N permissions prof | |

**Données seed** (`seed.ts`):
- 4 séries: C, D, A, B
- 11 grades: 6ème→3ème (collège), 2nde, 1ère S/L/ES, Term S/L/ES (lycée)
- 6 matières: maths, pc, svt, francais, anglais, espagnol, allemand
- Chapitres/leçons par matière (focus Term S), ~240 questions quiz, 7 annales (BAC/BEPC), badges

**Contenu Collège** (`college-content.ts`): Banque markdown complète 6ème→3ème + 2nde + 1ère L/ES + Term L/ES sur 10 matières — ~500 blocs leçon avec définition/points-clés/exemple/exercice

---

## ÉLÉMENTS HARDCODÉS

1. **DEFAULT_GRADES** (`admin-content.ts:93-105`, `seed.ts:24-36`) — 11 grades codes/noms/cycles/ordre fixés
2. **Subject seeds** (`seed.ts:47-61`) — 6 matières avec icônes/couleurs fixes
3. **Structure chapitres** (`seed.ts:63-92`) — Titres chapitres codés par matière (ex: Maths: Analyse, Algèbre, Géométrie, Probabilités)
4. **Questions Quiz/Exam** (`seed.ts:115-473`) — ~240 questions quiz + 7 annales complètes codées en dur
5. **DEFAULT_SUBJECTS** inline dans `seed.ts`
6. **Mappings niveaux** (`level.ts:3-21`) — `COLLEGE_GRADES / SERIE_GRADES / LYCEE_BY_CLASS` logique codée
7. **COLLEGE_CONTENT** (`college-content.ts`) — Banque leçons entière en constantes TypeScript
8. **Admin UI KINDS** (`admin-content.ts:22`) — `["subject", "chapter", "lesson", "quiz", "paper", "challenge", "league_challenge"]`
9. **Matières prof défaut** — Seules 6 matières seedées ; pas de découverte dynamique

---

## ÉLÉMENTS RÉUTILISABLES

**Services / Lib**:
- `db.ts` — `query`/`queryOne`/`run` unifié SQLite/PG, conversion placeholders, traduction datetime
- `session.ts` — `getCurrentUser()` (React `cache`), `createSession`, `destroySession`, `addXp`, `notify`, `awardBadge`
- `auth.ts` — `hashPassword` (scrypt+salt), `verifyPassword`, `generateToken`
- `admin-content.ts` — CRUD complet subjects/chapters/lessons/quizzes/papers/challenges + exercises/questions
- `prof-content.ts` — CRUD scope prof (chapters/lessons/exercises) avec ownership `created_by`
- `prof-subjects.ts` — Permissions prof matière/niveau avec backfill depuis `classes`
- `level.ts` — `resolveUserGradeIds()`, `gradeCandidates()` mapping `class_level`→`grade_id`
- `seed.ts` / `college-content.ts` — Bibliothèque massive seed contenu (réutilisable données initiales)
- `init.ts` — Migrations idempotentes + orchestration seeding
- `api-guard.ts` / `admin-guard.ts` — Rate limiting, validation méthode, vérification rôles
- `validation.ts` — Schémas Zod inscription, login, passwords, etc.

**Composants**:
- `PageHeader`, `AdminShell`, `TrendChart` — Shell UI admin
- `ConfirmDialog` — Confirmation suppression réutilisable
- `AdSenseBanner` — Composant monétisation

**Patterns API**:
- `/api/admin/content/[kind]` — Router CRUD générique pour 7 types contenu
- `/api/admin/content/[kind]/[id]` — PATCH/DELETE par kind
- `/api/prof/*` — Endpoints scope prof miroir admin mais filtrés ownership
- `/api/cours` + `/api/cours/[subjectCode]/[gradeCode]` — Navigateur cours public avec détection grade user

---

## PROBLÈMES

| Catégorie | Problème |
|-----------|---------|
| **Modèle Données** | `class_level` (string libre user) + `grade_id` (FK) coexistent → incohérence ; `resolveUserGradeIds` heuristique fragile |
| **Hiérarchie Contenu** | Pas d'entité "Course" — Subject→Chapter→Lesson seulement ; "Course" UI = vue filtrée Subject+Grade |
| **Seeds Hardcodés** | Toute structure curriculum dans `seed.ts`/`college-content.ts` — non éditable via admin UI |
| **Workflow Prof** | Profs créent contenu `pending` ; pas de versioning, pas de diff, pas d'édition collaborative |
| **Confusion Grade/Classe** | Table `classes` = groupes élèves gérés par prof ; `grades` = niveaux curriculum (6ème, Term S...) ; nommage chevauchant |
| **Coefficients Matières** | Stockés `coefficient_json` TEXT — pas d'accesseur typé, parsing répété UI |
| **Statut Contenu** | `approved`/`pending`/`rejected` sur chapters/lessons/quizzes/papers mais pas d'UI workflow prof pour suivre |
| **Entités Manquantes** | Pas table `curriculum`/`programme` liant grade↔subject↔ref_officiel ; pas discriminateur `contentType` |
| **Pas Réordonnancement** | `position`/`order_index` existent mais pas d'API drag-drop |
| **Génération IA** | `admin-ai-generate-chapter` existe mais pas intégré au flux prof |
| **Duplication** | `admin-content.ts` et `prof-content.ts` partagent ~80% logique — pas DRY |
| **Pas Opérations Bulk** | Admin ne peut bulk-approuver, réordonner, cloner contenu |

---

## PLAN DE MIGRATION

### Phase 2 — Modélisation Curriculum (Priorité)
1. Table `curricula` : `id, grade_id, subject_id, official_ref, year, status` — programme officiel par grade×subject
2. Enum `content_type` sur lessons : `lesson` \| `exercise` \| `video` \| `summary` \| `fiche` (remplace `is_premium`)
3. Vue `Course` : `grade_id + subject_id` = un "Course" (correspond `/cours/[subjectCode]/[gradeCode]`)
4. Migration `coefficient_json` → table normalisée `subject_grades(subject_id, grade_id, coefficient)`
4. Remplacer `class_level` string par `grade_id` FK obligatoire users ; backfill via `resolveUserGradeIds`

### Phase 3 — Gestion Contenu
1. Extraire CRUD partagé dans `content-service.ts` (générique `createEntity`, `updateEntity`, `deleteEntity` avec hooks)
2. Ajouter versioning : table `content_versions` pour chapters/lessons
4. API réordonnancement : `POST /api/admin/content/reorder` avec array `position`
5. Endpoints bulk approve/clone
6. Dashboard prof : compteurs pending/rejected, visualiseur diff

### Phase 4 — Autonomisation Prof
1. Prof crée arbre Chapter→Lesson complet en un flux (wizard)
2. Génération IA leçon intégrée dans `/espace-prof/creer-lecon`
3. Contenu spécifique classe : `class_chapters` liant `classes` à `chapters` avec scheduling
4. Moteur devoirs : lier `class_assignments` à leçons/quiz spécifiques

### Phase 5 — Expérience Élève
1. Page `/cours` → fetch depuis `curricula` + `grade_id` user (pas heuristique)
2. Suivi progression par milestone curriculum
3. Sync offline : `offline-chapter.ts` existe — étendre au cours complet

**Migrations Schéma Nécessaires**:
```sql
-- Nouvelles tables
CREATE TABLE curricula (id, grade_id, subject_id, official_ref, year, status, created_at);
CREATE TABLE subject_grades (subject_id, grade_id, coefficient, PRIMARY KEY(subject_id, grade_id));
CREATE TABLE content_versions (id, entity_type, entity_id, payload_json, created_by, created_at);
CREATE TABLE class_chapters (class_id, chapter_id, scheduled_at, PRIMARY KEY(class_id, chapter_id));

-- Alter users
ALTER TABLE users DROP COLUMN class_level; -- après backfill
ALTER TABLE users ADD COLUMN grade_id INTEGER REFERENCES grades(id);
```

**Compatibilité Arrière**:
- Conserver `class_level` transition ; peupler `grade_id` via `backfillUserGrades()` dans `init.ts`
- `coefficient_json` lecture fallback → `subject_grades` écriture
- API `cours` : accepter `grade_code` et `grade_id`

---

## RÉSUMÉ EXÉCUTIF

Edukora possède déjà une **architecture solide et fonctionnelle** pour la gestion de contenu pédagogique (Subject→Chapter→Lesson + Exercises/Quiz). Le système admin/prof existe avec workflow de validation. **Le gap principal** : tout le curriculum est figé dans les seeds TypeScript (`seed.ts`, `college-content.ts`) au lieu d'être géré via l'admin UI.

**Stratégie recommandée** : Ne pas refactorer l'existant. Étendre le modèle avec `curricula` + `subject_grades` + `content_type`, puis exposer les opérations CRUD existantes (`admin-content.ts`/`prof-content.ts`) pour les nouvelles entités. L'admin UI existante (`/espace-admin/*`) peut être étendue simplement.

**Risque de régression** : Faible si on suit le pattern `admin-content.ts` (router `[kind]` générique). Les pages élève (`/cours`, `/matieres`) utiliseront les nouvelles tables via les mêmes services.