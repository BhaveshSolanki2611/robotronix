# Robotronix Web App

Production website and lead-capture application for Robotronix and Scalability Technology Pvt. Ltd.

The app is built with Next.js App Router, React, Tailwind CSS, Prisma, and PostgreSQL. It includes marketing pages, solution and industry pages, contact/demo/career/newsletter submission APIs, a lightweight admin dashboard, and an in-browser heat-exchanger tube sheet analyzer.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Prisma 7
- PostgreSQL
- GSAP, Framer Motion, Three.js, and Lucide icons

## Environment Variables

Create a local `.env` from `.env.example`.

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE"
ADMIN_SECRET_KEY="replace-with-at-least-32-random-characters"
NEXT_PUBLIC_SITE_URL="https://www.robotronix.in"
```

`DATABASE_URL` and `ADMIN_SECRET_KEY` are server-only secrets and must not be committed. In production, `ADMIN_SECRET_KEY` must be at least 32 characters.

## Local Development

```bash
npm ci
npm run db:generate
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`.

## Production Checks

```bash
npm run db:validate
npm run db:generate
npm run lint
npm run build
npm audit --omit=dev --audit-level=moderate
```

## Database

The application uses Prisma migrations under `prisma/migrations`.

For production or CI deploys:

```bash
npm run db:deploy
```

For local schema iteration:

```bash
npm run db:migrate
```

## Deployment

The app is ready for Vercel. Configure the project with these production environment variables:

- `DATABASE_URL`
- `ADMIN_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`

Then deploy:

```bash
npm run db:deploy
vercel deploy --prod
```

## Security Notes

- `.env`, local databases, logs, and build artifacts are ignored.
- Prisma routes run on the Node.js runtime.
- Public form APIs validate and trim submitted input before writing to the database.
- Admin data APIs require a signed HTTP-only session cookie.
- The project does not include an open-source license by default.
