#!/usr/bin/env python3
"""
Audit des routes API jamais appelées (src/app/api/**/route.ts).

Usage:
  python scripts/audit-api-routes.py

Détecte les routes du code applicatif jamais référencées par :
  - le frontend (src/**/*.tsx|ts) et le backend (fetch/routes internes)
  - les tests (tests/**/*.ts) et scripts (scripts/**/*.ts)
  - public/sw.js (PWA) et vercel.json (crons)

Attention : les webhooks (ex. /api/premium/webhook) sont appelés DEPUIS
L'EXTÉRIEUR — une route "orpheline" dans le code peut rester nécessaire.
"""
import re
import glob
import os

STRIP_SUFFIX = ".,;:)]}\"" + chr(96) + "'"


def read(path: str) -> str:
    try:
        return open(path, encoding="utf-8", errors="ignore").read()
    except OSError:
        return ""


def main() -> None:
    routes = set()
    for p in glob.glob("src/app/api/**/route.ts", recursive=True):
        route = os.path.relpath(p, "src/app/api").replace(os.sep, "/").replace("/route.ts", "")
        routes.add(route)

    pat = re.compile(r"/api[A-Za-z0-9_./${}\-]*")
    hunks: set[str] = set()
    files = (
        glob.glob("src/**/*.tsx", recursive=True)
        + glob.glob("src/**/*.ts", recursive=True)
        + glob.glob("tests/**/*.ts", recursive=True)
        + glob.glob("scripts/**/*.ts", recursive=True)
    )
    files += ["public/sw.js", "vercel.json"]
    for f in files:
        for m in pat.finditer(read(f)):
            seg = m.group(0).rstrip(STRIP_SUFFIX)
            hunks.add(seg.split("?")[0].split("#")[0])

    calls = {h for h in hunks if h.startswith("/api/")}
    normalized = {
        re.sub(r"\$\{[^}]*\}", "[dyn]", h).lstrip("/").removeprefix("api/")
        for h in calls
    }

    def matches(route: str, call: str) -> bool:
        r_segs, c_segs = route.split("/"), call.split("/")
        if len(r_segs) != len(c_segs):
            return False
        return all(r.startswith("[") or r == c for r, c in zip(r_segs, c_segs))

    matched = {}
    for route in routes:
        refs = [c for c in normalized if matches(route, c)]
        if refs:
            matched[route] = refs

    orphans = sorted(routes - set(matched))
    print(f"Routes: {len(routes)} | référencées: {len(matched)} | orphelines: {len(orphans)}")
    print("\n=== ORPHELINES ===")
    for r in orphans:
        print("  " + r)
    if not orphans:
        print("  (aucune)")


if __name__ == "__main__":
    main()