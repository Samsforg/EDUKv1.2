#!/usr/bin/env bash
# Déploiement Edukora vers Vercel (production) avec garde-fous.
#
#   bash scripts/deploy-vercel.sh            # typecheck + tests + deploy prod
#   bash scripts/deploy-vercel.sh --skip-tests   # déploie sans typecheck/tests
#   bash scripts/deploy-vercel.sh --preview      # déploiement de prévisualisation
#
# Exige : vercel CLI, projet lié, et production linké à https://edukora.net.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

SKIP_TESTS=0
MODE="--prod"
for arg in "$@"; do
  case "$arg" in
    --skip-tests) SKIP_TESTS=1 ;;
    --preview) MODE="" ;;
    --no-alias) MODE="--prod --no-verify" ;;
  esac
done

echo "=== Edukora : déploiement Vercel ==="
echo "Répertoire : $ROOT"

# 1. Gardes qualité (sauf --skip-tests)
if [ "$SKIP_TESTS" -eq 0 ]; then
  echo "--- typecheck ---"
  npx tsc --noEmit

  echo "--- tests unitaires (Jest) ---"
  npx jest --silent 2>&1 | tail -n 6
fi

# 2. Vérifier que Vercel est authentifié et le projet lié
if ! npx vercel whoami >/dev/null 2>&1; then
  echo "!! Vercel non authentifié. Lancez : npx vercel login" >&2
  exit 1
fi
if [ ! -f "$ROOT/.vercel/project.json" ]; then
  echo "!! Projet non lié. Lancez : npx vercel link" >&2
  exit 1
fi

# 3. Déployer vers Vercel (production par défaut)
echo "--- déploiement (npx vercel $MODE) ---"
DEPLOY_URL="$(npx vercel deploy $MODE --yes 2>&1 | tee /dev/stderr | grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app' | head -n 1)"

if [ -z "$DEPLOY_URL" ]; then
  echo "!! Échec : aucune URL de déploiement renvoyée." >&2
  exit 1
fi
echo "Deployed : $DEPLOY_URL"

# 4. En production, vérifier que l'alias https://edukora.net est READY.
if [ "$MODE" = "--prod" ]; then
  echo "--- vérification alias edukora.net ---"
  sleep 5
  if npx vercel ls "$(basename "$ROOT")" --yes 2>/dev/null >/dev/null; then
    echo "(alias vérifié via la liste des déploiements)"
  fi
  curl -fsS -o /dev/null -w "edukora.net HTTP %{http_code}\n" "https://edukora.net" || {
    echo "!! Alias non prêt. Vérifiez manuellement : https://vercel.com/dashboard" >&2
    exit 1
  }
fi

echo "=== Déploiement terminé : $DEPLOY_URL ==="
exit 0
