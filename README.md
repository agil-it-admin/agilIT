# Colonegotiator monorepo

Marketing site + Payload CMS, structured like a `frontend` / `backend` workspace.

## Structure

```
frontend/   Next.js site (port 3000) — homepage, blog, lead gen
backend/    Payload CMS 3 (port 4001) — articles admin + REST API
```

Style playground routes (`/blog-styles`, `/faq-styles`, `/services-styles`, `/team-styles`, `/effects`, `/globe-examples`, `/floating-nav`) stay static and are **not** wired to the CMS.

## Setup

```bash
pnpm install
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

## Develop

```bash
# both apps
pnpm dev

# or separately
pnpm dev:frontend   # http://localhost:3000
pnpm dev:backend    # http://localhost:4001/admin
```

## Seed blog posts into CMS

With the backend deps installed:

```bash
pnpm --filter backend seed
```

Default admin (created by seed if missing):

- Email: `admin@colonegotiator.com`
- Password: `changeme123`

## Blog wiring

- CMS collection: `articles` (`backend/src/collections/Articles.ts`)
- Frontend fetch: `frontend/lib/cms/blog.ts` → Payload REST `http://localhost:4001/api/articles`
- Falls back to static `frontend/lib/blog.ts` when the CMS is offline or empty

Production surfaces that use CMS blog data:

- `/` Resource Center section
- `/blog`
- `/blog/[slug]`

## Deploy on Vercel (Services)

This repo is set up as a single Vercel project with two [Services](https://vercel.com/docs/services) via root [`vercel.json`](vercel.json):

| Service | Root | Public routes |
| --- | --- | --- |
| `frontend` | `frontend/` | `/` (marketing site) |
| `backend` | `backend/` | `/cms/*` (Payload admin + API + assets) |

The CMS is mounted at **`/cms`** so its `/_next` assets don’t collide with the marketing site. Admin: `/cms/admin`. API: `/cms/api/...`. The frontend binds to the backend via `PAYLOAD_API_URL` for server-side CMS fetches.

### Import steps

1. In Vercel → **Add New Project** → import `agil-it-admin/agilIT`.
2. Set **Framework** to **Services** (Build & Deployment settings). Root Directory stays empty (repo root).
3. Add environment variables (Production + Preview):

| Name | Service / scope | Value |
| --- | --- | --- |
| `PAYLOAD_SECRET` | backend (or shared) | long random secret |
| `FRONTEND_URL` | backend | `https://YOUR_DOMAIN` |
| `PAYLOAD_PUBLIC_SERVER_URL` | backend | `https://YOUR_DOMAIN` (no `/admin` or `/cms`) |
| `DATABASE_URL` | backend | persistent DB URL (see note below) |

Leave `NEXT_PUBLIC_PAYLOAD_API_URL` unset on Vercel (local only). Do not set `PAYLOAD_API_URL` manually — Vercel injects it from the service binding.

4. Deploy. After deploy:
   - Site: `https://YOUR_DOMAIN/`
   - CMS: `https://YOUR_DOMAIN/cms/admin`
   - API: `https://YOUR_DOMAIN/cms/api/...`

### Database note

Local SQLite (`backend/agilit.db`) is fine for development. On Vercel the filesystem is ephemeral, so point `DATABASE_URL` at a hosted store (e.g. Turso/libSQL, Neon/Postgres with a Payload Postgres adapter) before relying on CMS writes in production.
