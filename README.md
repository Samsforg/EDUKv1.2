# Edukora

Plateforme d'apprentissage IA pour le BAC et le BEPC en Côte d'Ivoire.

**Production** : [https://edukora.net](https://edukora.net)

---

## Stack technique

| Couche | Technologie |
|---|---|
| Framework | Next.js 16 (App Router + Proxy) |
| UI | React 19, Tailwind CSS 3, Material Symbols |
| Langage | TypeScript 5.7, Node.js ≥ 22.5 |
| Base de données | Neon Postgres (prod) / SQLite local (dev) |
| Déploiement | Vercel |
| Paiements | GeniusPay (Mobile Money) |
| IA | Groq (principal), HuggingFace, Cerebras, Gemini, OpenRouter |
| Monitoring | Sentry, Vercel Analytics, Vercel Speed Insights |
| Tests | Jest, Playwright (E2E) |

---

## Démarrage rapide

### Prérequis

- Node.js ≥ 22.5
- npm
- Compte Vercel (pour le déploiement)

### Installation

```bash
git clone <URL_DU_REPO>
cd edukora-app
npm install
```

### Configuration

```bash
cp .env.example .env.local
```

Remplir `.env.local` avec les variables minimales :

```env
SESSION_SECRET=votre_clé_secrète
CRON_SECRET=un_autre_secret
NEXT_PUBLIC_GROQ_API_KEY=gsk_...
NEXT_PUBLIC_HF_API_KEY=hf_...
```

Sans `DATABASE_URL`, l'application utilise automatiquement SQLite local (`data/edukora.db`).

### Lancement

```bash
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

---

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Démarrer le build |
| `npm run typecheck` | Vérification TypeScript |
| `npm run lint` | Lint ESLint |
| `npm run lint:fix` | Lint + auto-correction |
| `npm run test:e2e` | Tests end-to-end (Playwright) |
| `npm run ai:index-courses` | Indexer les cours pour l'IA |
| `npm run ai:watch-index` | Watch mode pour l'indexation IA |

---

## Structure du projet

```
edukora-app/
├── public/                  # Assets statiques (images, sw.js, theme-init.js)
├── src/
│   ├── app/                 # Pages Next.js (App Router)
│   │   ├── api/             # Routes API REST
│   │   ├── accueil-edukora/ # Dashboard élève
│   │   ├── espace-admin/    # Panel admin
│   │   ├── espace-prof/     # Espace professeur
│   │   ├── espace-parent/   # Espace parent
│   │   ├── cours/           # Fiches de révision
│   │   ├── quiz/            # Quiz interactifs
│   │   ├── tuteur-ia/       # Tuteur IA (Groq)
│   │   ├── forum/           # Forum d'entraide
│   │   └── ...              # 70+ pages
│   ├── components/          # Composants React
│   ├── lib/                 # Utilitaires (auth, db, IA, validation, etc.)
│   └── proxy.ts             # Middleware (CSRF, headers sécurité, sessions)
├── growth-ai/               # Module Growth AI (marketing IA)
├── scripts/                 # Scripts de déploiement et d'indexation
├── eslint.config.mjs        # Configuration ESLint 9
├── tailwind.config.ts       # Configuration Tailwind
└── tsconfig.json            # Configuration TypeScript
```

---

## Fonctionnalités principales

### Pour les élèves
- **Fiches de révision** par matière et chapitre
- **Quiz interactifs** avec scoring et explications
- **Tuteur IA** (Groq) disponible 24h/24
- **Simulateur d'examen** BAC / BEPC
- **Classement** et défis entre élèves
- **Espace live** avec professeurs

### Pour les professeurs
- Création de quiz et sujets d'examen
- Gestion des classes et des élèves
- Espace live avec chat

### Pour les parents
- Suivi de progression des enfants
- Tableau de bord parent

### pour l'administration
- Dashboard de gestion des utilisateurs
- Growth AI (stratégie marketing, scoring, recommandations)
- Gestion du contenu et des abonnements

---

## Variables d'environnement

### Obligatoires

| Variable | Description |
|---|---|
| `SESSION_SECRET` | Secret pour les sessions (min 32 caractères) |
| `CRON_SECRET` | Secret pour les tâches cron |

### Base de données

| Variable | Description |
|---|---|
| `DATABASE_URL` | URL PostgreSQL Neon (optionnel, fallback SQLite) |

### IA (une ou plusieurs)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GROQ_API_KEY` | Clé API Groq (provider principal) |
| `NEXT_PUBLIC_HF_API_KEY` | Clé API HuggingFace |
| `CEREBRAS_API_KEY` | Clé API Cerebras |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Clé API Google Gemini |
| `OPENROUTER_API_KEY` | Clé API OpenRouter |

### Paiements

| Variable | Description |
|---|---|
| `GENIUSPAY_WEBHOOK_SECRET` | Secret webhook GeniusPay |

### Monitoring

| Variable | Description |
|---|---|
| `SENTRY_DSN` | DSN Sentry pour le monitoring |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID |

---

## Déploiement

```bash
# Connexion Vercel
vercel login

# Lier le projet
vercel link

# Déployer en production
vercel --prod
```

Le projet est lié au compte Vercel `somasamakeforgo-5732`.

---

## Sécurité

- **CSRF** : Protection sur toutes les routes POST/PUT/PATCH/DELETE via header `x-csrf-token`
- **Rate limiting** : 120 req/min (globale) + 20 req/hour (inscription)
- **CSP** : Content Security Policy avec nonce dynamique
- **Sessions** : HMAC signé avec cookie HttpOnly
- **Validation** : Zod pour toutes les entrées API
- **Noms** : Sanitisation anti-XSS avant stockage
- **Phone** : Normalisation + index UNIQUE en base
- **Passwords** : Minimum 8 caractères + 1 lettre + 1 chiffre, hashé avec scrypt

---

## Licence

Propriétaire — Tous droits réservés.
