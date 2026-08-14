# AI Provider Fallback — Chaîne de secours multi-provider

## 1. Ordre de la chaîne

| Rang | Provider | Déclencheur | Modèle par défaut |
|---|---|---|---|
| 1 | **Groq** (principal) | `GROQ_API_KEY` | `llama-3.3-70b-versatile` |
| 2 | **Hugging Face** (fallback 1) | `HF_API_KEY` | `mistralai/Mistral-7B-Instruct-v0.3` |
| 3 | **Cloudflare** (fallback 2) | `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` | `@cf/meta/llama-3.1-8b-instruct` |
| 4 | **Gemini** (fallback 3) | `GEMINI_API_KEY` | `gemini-3.1-flash-lite` (via `GEMINI_TUTOR_MODEL`) |
| 5 | **OpenAI** (fallback 4) | `OPENAI_API_KEY` | `gpt-4o-mini` |

Les providers sans clé sont **skippés** (jamais d'échec inutile).

## 2. Réordonnancement

`AI_PRIMARY_PROVIDER` déplace un provider en tête de chaîne. Exemples :
- `AI_PRIMARY_PROVIDER=groq` → Groq d'abord (par défaut du projet).
- `AI_PRIMARY_PROVIDER=gemini` → Gemini d'abord (repli économique si Groq épuisé).

## 3. Mode legacy

`AI_GATEWAY_ENABLED=false` (ou aucune clé Groq/HF/CF et flag non défini) → chaîne **OpenAI → Gemini** (comportement antérieur au projet, conservé à l'identique).

## 4. Gestion des échecs

- Échec d'un provider (erreur HTTP, timeout 30 s, réponse vide, réponse > 2000 caractères tronquée) → **passage au provider suivant**.
- Aucun provider disponible / tous en échec → la route renvoie la réponse locale `localReply()` (regex hors-ligne) pour l'élève connecté, ou le message de repli de la démo.
- Chaque tentative est journalisée (JSON `[ai]`) : provider, modèle, statut, latence, erreur. Aucun secret n'est journalisé.

## 5. Limites

- Les quotas gratuits Groq/HF (requêtes/minute) sont couverts par le rate limiting local (`AI_MAX_*`) et par le fallback automatique.
- Le streaming reste désactivé (fiabilité > effets visuels) — décision documentée dans `AI_ARCHITECTURE_DECISIONS.md`.
