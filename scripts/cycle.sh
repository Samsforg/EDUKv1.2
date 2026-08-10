#!/bin/bash
cd "$(dirname "$0")/.." || exit 1
FILES=$(find src \( -name "*.ts" -o -name "*.tsx" \) ! -name "*.d.ts")
PREV=-1
for ROUND in 1 2 3 4 5 6 7 8; do
  TOTAL=$(npx tsc --noEmit 2>&1 | grep -cE "error TS")
  echo "=== round $ROUND: $TOTAL erreurs"
  [ "$TOTAL" -eq 0 ] && echo "ZERO ERREURS" && break
  [ "$TOTAL" = "$PREV" ] && echo "stable (plus rien à automatiser)" && break
  PREV=$TOTAL
  grep -rhn "async function [A-Za-z0-9_]*" src/lib/*.ts | sed -E 's/.*async function ([A-Za-z0-9_]+).*/\1/' | sort -u > scripts/lib-async-names.txt
  node scripts/add-await.cjs $FILES
  node scripts/wrap-chains.cjs $FILES
  node scripts/fix-multi-async.cjs $FILES
  npx tsc --noEmit 2>&1 | grep TS1308 > /tmp/ts1308.txt
  node scripts/fix-async.mjs /tmp/ts1308.txt
  npx tsc --noEmit 2>&1 | grep TS1064 > /tmp/ts1064.txt
  node scripts/fix-promise-return.mjs /tmp/ts1064.txt
done
