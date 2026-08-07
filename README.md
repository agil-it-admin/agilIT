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
