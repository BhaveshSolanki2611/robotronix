# Security Operations

## Rotating The Exposed Database Password

The previous local `.env` contained a PostgreSQL password and must be treated as exposed.

1. Rotate the PostgreSQL password in the database provider or local Postgres instance.
2. Update `DATABASE_URL` only in non-committed environment storage, such as Vercel project environment variables or a local `.env` file.
3. Keep committed examples limited to `.env.example`.

## Applying The Admin Auth Migration

Run the Prisma migration before using the new admin authentication flow:

```bash
npm run db:deploy
```

For local development, use:

```bash
npm run db:migrate
```

## Creating Or Rotating An Admin User

Set these variables in your local shell or non-committed `.env`:

```bash
ADMIN_BOOTSTRAP_EMAIL="admin@example.com"
ADMIN_BOOTSTRAP_PASSWORD="use-a-long-random-password"
ADMIN_BOOTSTRAP_NAME="Robotronix Admin"
```

Then run:

```bash
npm run admin:create
```

The password is stored as a salted scrypt hash. The admin session cookie stores only an opaque random token; the database stores the token hash and expiration.

## Production Rate Limiting

The repository includes a dependency-free in-memory limiter for immediate protection. In multi-instance production, replace `src/lib/rateLimit.ts` with a shared limiter such as Upstash Redis, Vercel Firewall rate rules, or a CAPTCHA verification step for public forms.
