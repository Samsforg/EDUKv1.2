# AI Setup — Configuration du Tuteur IA (Kora)

## 1. Variables d'environnement

Copier `.env.example` vers `.env.local` et renseigner (côté serveur uniquement) :

```env
# ===== AI Gateway =====
AI_GATEWAY_ENABLED=true
# "true" : chaîne Groq → HF → Cloudflare → Gemini → OpenAI
# "false" : mode legacy OpenAI → Gemini
# Non défini : activé automatiquement dès qu'une clé Groq/HF/Cloudflare est présente
AI_PRIMARY_PROVIDER=groq            # groq | huggingface | cloudflare | gemini | openai

# Groq (principal) — https://console.groq.com/keys
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile

# Hugging Face (fallback 1) — https://huggingface.co/settings/tokens
HF_API_KEY=
HF_MODEL=mistralai/Mistral-7B-Instruct-v0.3

# Cloudflare Workers AI (fallback 2) — https://dash.cloudflare.com/profile/api-tokens
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_API_TOKEN=
CLOUDFLARE_MODEL=@cf/meta/llama-3.1-8b-instruct

# Fallbacks legacy (déjà configurés en prod)
GEMINI_API_KEY=
GEMINI_TUTOR_MODEL=gemini-3.1-flash-lite
OPENAI_API_KEY=
OPENAI_TUTOR_MODEL=gpt-4o-mini

# ===== RAG / Embeddings =====
# gemini par défaut si GEMINI_API_KEY présente (dim 768), sinon huggingface (dim 384)
AI_EMBEDDING_PROVIDER=gemini
HF_EMBEDDING_MODEL=sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2

# ===== Rate limiting IA =====
AI_MAX_REQUESTS_PER_MINUTE=10
AI_MAX_DAILY_REQUESTS=100
```

## 2. Vercel (production)

```bash
npx vercel env add AI_GATEWAY_ENABLED production
npx vercel env add GROQ_API_KEY production
# ... etc pour chaque variable
npx vercel deploy --prod --yes
```

## 3. Modèles recommandés

| Provider | Modèle chat | Modèle embeddings |
|---|---|---|
| Groq | `llama-3.3-70b-versatile` (gratuit, rapide) | — |
| Hugging Face | `mistralai/Mistral-7B-Instruct-v0.3` | `sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2` (384) |
| Cloudflare | `@cf/meta/llama-3.1-8b-instruct` | — |
| Gemini | `gemini-3.1-flash-lite` | `gemini-embedding-2` (768, outputDimensionality=768) |
| OpenAI | `gpt-4o-mini` | — |

## 4. Vérification rapide

- `npm run typecheck` : aucun type d'erreur.
- `npx jest` : 123 tests dont la suite `ai-gateway` (chaîne de fallback) et `ai-rag`.
- `npm run dev` puis `POST /api/tutor/demo` avec `{ "message": "Bonjour" }` : réponse Kora si au moins un provider configuré.
