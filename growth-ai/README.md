# Edukora Growth AI V1

Module indépendant de growth marketing piloté par IA pour la plateforme Edukora.

## Installation

Le module fait partie du monorepo edukora-app. Aucune installation supplémentaire nécessaire.

## Variables d'environnement

```env
# Requis
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=llama-3.3-70b-versatile  # optionnel, défaut: llama-3.3-70b-versatile
ADMIN_API_KEY=your_admin_api_key     # optionnel, protection API supplémentaire

# Optionnel (si non défini, fallback JSON local)
DATABASE_URL=postgresql://...        # Utilise la DB Edukora existante
```

## Développement local

```bash
# Depuis la racine du projet edukora-app
npm run dev

# Accéder à l'interface admin
open http://localhost:3000/admin/growth
```

## Production

Le module est automatiquement déployé avec le reste de l'app Edukora sur Vercel.

## API

### `GET /api/growth/strategy`
Liste les stratégies (admin uniquement).

### `POST /api/growth/strategy`
Génère une stratégie via IA. Body: `{ date?: string }`

### `GET /api/growth/content`
Liste les contenus générés (admin uniquement).

### `POST /api/growth/content`
Génère un contenu. Body: `{ platform: "facebook"|"tiktok"|"whatsapp", strategyId: string, topic?: string, includeVisual?: boolean }`

### `GET /api/growth/metrics`
Récupère les dernières métriques (admin uniquement).

### `POST /api/growth/metrics`
Enregistre des métriques. Body: `{ date, signups, activeUsers, premiumConversions, referralCount, quizCompletions, koraInteractions, pageViews, utm? }`

### `GET /api/growth/recommendation`
Liste les recommandations (admin uniquement).

### `POST /api/growth/recommendation`
Génère une recommandation via IA.

## Architecture

```
growth-ai/
├── src/
│   ├── ai/
│   │   ├── types.ts          # Interfaces TypeScript
│   │   ├── provider.ts       # AIProvider abstrait
│   │   └── groq-provider.ts  # Implémentation Groq
│   ├── marketing/
│   │   ├── strategy.ts       # generateStrategy(), generateRecommendation()
│   │   ├── content.ts        # generateFacebook/TikTok/WhatsAppContent()
│   │   ├── visual.ts         # generateVisualPrompt()
│   │   └── scoring.ts        # calculateContentScore()
│   ├── data/
│   │   ├── store.ts          # PostgreSQL (prod) ou JSON (dev)
│   │   └── analytics-events.ts # Événements + UTM tracking
│   └── routes/               # API routes Next.js
├── prompts/                  # Prompts IA (markdown)
├── admin/                    # Interface admin
├── tests/                    # Tests unitaires
└── README.md
```

## Sécurité

- Toutes les routes API vérifient `user.role === "admin"`
- `GROQ_API_KEY` n'est jamais exposée au frontend (uniquement `process.env` côté serveur)
- Pas de dépendance lourde : fetch natif Node.js vers l'API Groq
- Validation des inputs sur chaque route
- Logs sans données personnelles

## Événements analytics trackés

| Événement | Description |
|-----------|-------------|
| `page_view` | Vue de page |
| `signup_started` | Début d'inscription |
| `signup_completed` | Inscription terminée |
| `kora_opened` | Ouverture du tuteur IA |
| `kora_question` | Question posée à Kora |
| `quiz_started` | Début de quiz |
| `quiz_completed` | Quiz terminé |
| `simulation_started` | Début de simulation |
| `simulation_completed` | Simulation terminée |
| `pricing_viewed` | Page tarifs consultée |
| `premium_checkout_started` | Début de checkout premium |
| `premium_purchase` | Achat premium confirmé |
| `referral_opened` | Page parrainage ouverte |
| `referral_shared` | Lien parrainage partagé |
| `referral_signup` | Inscription via parrainage |

## Extensions futures V2

- Publication automatique via APIs Meta/TikTok
- A/B testing des contenus
- Dashboard analytics en temps réel
- Optimisation UTM automatisée
- Intégration WhatsApp Business API
- Prédiction de tendances via IA
