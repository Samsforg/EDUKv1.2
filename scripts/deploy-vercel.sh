#!/usr/bin/env bash
# ============================================================
# Deploiement Vercel — edukora-app
#
# 1. Verifie la presence des variables Sentry (pose les manquantes
#    via `vercel env add`, en production et preview).
# 2. Construit et depose en production (`vercel deploy --prod`).
#
# Usage:
#   ./scripts/deploy-vercel.sh            # deploy avec l'env local
#   SENTRY_AUTH_TOKEN=... ./scripts/deploy-vercel.sh
#
# Pre-requis:
#   - vercel CLI connecte (`vercel whoami`)
#   - Variables Sentry a la racine du projet, soit exportees dans le
#     shell, soit presentes dans .env.local / .env.prod.pull
# ============================================================
set -euo pipefail

cd "$(dirname "$0")/.."

# --- Environnements Vercel cibles ---
ENVS=("production" "preview")

# --- Variables Sentry gerees par ce script ---
SENTRY_VARS=(
  "SENTRY_DSN"
  "NEXT_PUBLIC_SENTRY_DSN"
  "SENTRY_ORG"
  "SENTRY_PROJECT"
  "SENTRY_AUTH_TOKEN"
  "SENTRY_RELEASE"
  "NEXT_PUBLIC_SENTRY_RELEASE"
)

# --- Variables Analytics gerees par ce script ---
ANALYTICS_VARS=(
  "NEXT_PUBLIC_GA_ID"
  "NEXT_PUBLIC_CLARITY_ID"
  "GA4_API_SECRET"
)

# --- Charger les valeurs depuis .env.local / .env.prod.pull si non exportees ---
if [ -f .env.prod.pull ]; then
  set -a; source .env.prod.pull 2>/dev/null || true; set +a
fi
if [ -f .env.local ]; then
  set -a; source .env.local 2>/dev/null || true; set +a
fi

echo "==> Vercel CLI: $(vercel whoami 2>/dev/null || echo 'NON CONNECTE')"

# --- Verification des valeurs requises ---
missing=()
[ -z "${SENTRY_DSN:-}" ] && missing+=("SENTRY_DSN")
[ -z "${NEXT_PUBLIC_SENTRY_DSN:-}" ] && missing+=("NEXT_PUBLIC_SENTRY_DSN")
if [ ${#missing[@]} -gt 0 ]; then
  echo "!! Variables Sentry manquantes: ${missing[*]}"
  echo "   Ajoutez-les a .env.local puis relancez le script."
  exit 1
fi

# --- Pousser les variables vers Vercel (idempotent) ---
push_env() {
  local var="$1"
  local value="${!var:-}"
  [ -z "$value" ] && return
  for env in "${ENVS[@]}"; do
    if vercel env ls "$env" 2>/dev/null | grep -qE "[[:space:]]$var[[:space:]]"; then
      echo "==> $var ($env): deja presente"
    else
      echo "==> $var ($env): ajout..."
      printf '%s' "$value" | vercel env add "$var" "$env" --yes || { echo "!! echec ajout $var ($env)"; exit 1; }
    fi
  done
}

for var in "${SENTRY_VARS[@]}"; do push_env "$var"; done
for var in "${ANALYTICS_VARS[@]}"; do push_env "$var"; done

echo "==> Build + deploy production..."
vercel deploy --prod --yes

echo "==> Deploiement termine."
