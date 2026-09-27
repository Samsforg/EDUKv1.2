<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project: Edukora

**Stack**: Next.js 16.3.5 (proxy.ts = middleware), SQLite (dev), PostgreSQL (prod), Brevo (email), GeniusPay (payments), Sentry, Vercel

### Environment
- Git remote: `https://github.com/Samsforg/EDUKv1.2.git` branch `chore/next-16`
- Vercel project: `prj_yIkyDDcDaYbH1tsUeCzYEbswonGf`
- Production URL: https://edukora.net
- Local DB: `data/edukora.db` (SQLite)
- Dev server: `npm run dev` on localhost:3000

### Key Files
- `src/proxy.ts` — Middleware (CSRF, session, roles, CSP). **THIS IS the middleware** in Next.js 16.3.5 (no `middleware.ts` needed)
- `src/lib/mailer.ts` — Email via Brevo SMTP (`smtp-relay.brevo.com:587`) with API fallback
- `src/lib/session.ts` — HMAC-signed session tokens
- `src/lib/db.ts` — SQLite (dev) / PostgreSQL (prod via `DATABASE_URL`)
- `src/lib/geniuspay.ts` — GeniusPay API client
- `src/lib/admin-guard.ts` — `requireAdmin()` check (server-side only)
- `src/lib/rate-limit.ts` — Rate limiting presets (login, register, etc.)
- `next.config.mjs` — Security headers (HSTS, X-Frame-Options, etc.)

### Brevo Email
- SMTP: `smtp-relay.brevo.com:587` with STARTTLS
- SMTP_USER: `b2c8f9001@smtp-brevo.com`
- MAIL_FROM_EMAIL: `support@edukora.net`
- MAIL_USE_BREVO not set → defaults to SMTP path
- BREVO_API_KEY: raw `xkeysib-...` key (NOT base64-encoded)

### Testing Commands
- `npx tsc --noEmit` — typecheck
- `npx next build` — production build
- `Invoke-RestMethod -Uri "http://localhost:3000/api/health"` — health check
