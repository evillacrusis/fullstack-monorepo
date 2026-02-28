# Production-Grade Turborepo Monorepo

A full-stack TypeScript monorepo boilerplate built for scale. Uses **NestJS** for the API, **Next.js 16** for the web frontend, **Prisma + PostgreSQL** for the database, and **Zod** for end-to-end type-safe validation — all wired together with **Turborepo** and **pnpm workspaces**.

---

## Stack

| Layer      | Technology                                                                  |
| ---------- | --------------------------------------------------------------------------- |
| Monorepo   | [Turborepo v2](https://turbo.build) + [pnpm v9](https://pnpm.io) workspaces |
| API        | [NestJS 10](https://nestjs.com) + Express + Swagger                         |
| Web        | [Next.js 16](https://nextjs.org) + React 19 (App Router)                    |
| Database   | [Prisma 5](https://www.prisma.io) + PostgreSQL 16                           |
| Validation | [Zod 3](https://zod.dev) — shared contracts + env validation                |
| Language   | TypeScript 5.4 (strict)                                                     |
| Linting    | ESLint 9 + @typescript-eslint v8                                            |
| Formatting | Prettier                                                                    |
| Git hooks  | Husky v9 + lint-staged                                                      |
| Local DB   | Docker Compose (Postgres only)                                              |

---

## Project Structure

```
.
├── apps/
│   ├── api/          # NestJS REST API (port 3001)
│   └── web/          # Next.js 16 App Router (port 3000)
├── packages/
│   ├── contracts/    # Shared Zod schemas & inferred DTO types
│   ├── database/     # Prisma client, schema, seed script
│   ├── env/          # Type-safe environment validation (api + web)
│   └── config/       # Shared ESLint presets & TypeScript configs
├── docker-compose.yml
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v20+
- [pnpm](https://pnpm.io) v9 (`npm install -g pnpm@9`)
- [Docker](https://www.docker.com) (for local Postgres)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Start the database

```bash
docker compose up -d
```

This starts a PostgreSQL 16 container on port `5432`.

### 3. Configure environment variables

```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env   # if present
```

Edit `apps/api/.env` with your values:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/myapp?schema=public
JWT_SECRET=change_me_to_a_random_32_char_secret
PORT=3001
ALLOWED_ORIGINS=http://localhost:3000
```

### 4. Run database migrations

```bash
pnpm --filter @repo/database db:migrate
```

### 5. (Optional) Seed the database

```bash
pnpm --filter @repo/database db:seed
```

### 6. Start development (all apps, with watch)

```bash
pnpm dev
```

- **API** → http://localhost:3001
- **Web** → http://localhost:3000
- **Swagger docs** → http://localhost:3001/docs

---

## Package Scripts

### Root

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `pnpm dev`       | Start all apps in watch mode |
| `pnpm build`     | Build all apps and packages  |
| `pnpm lint`      | Lint all packages            |
| `pnpm typecheck` | Type-check all packages      |

### API (`apps/api`)

| Command      | Description                               |
| ------------ | ----------------------------------------- |
| `pnpm dev`   | Start with nodemon + ts-node (hot reload) |
| `pnpm build` | Compile to `dist/`                        |
| `pnpm start` | Run compiled output                       |

### Web (`apps/web`)

| Command      | Description                 |
| ------------ | --------------------------- |
| `pnpm dev`   | Next.js dev server with HMR |
| `pnpm build` | Next.js production build    |
| `pnpm start` | Start production server     |

### Database (`packages/database`)

| Command            | Description            |
| ------------------ | ---------------------- |
| `pnpm db:generate` | Generate Prisma client |
| `pnpm db:migrate`  | Run migrations (dev)   |
| `pnpm db:seed`     | Seed the database      |
| `pnpm db:studio`   | Open Prisma Studio     |

---

## Packages

### `@repo/contracts`

Shared Zod schemas that produce inferred TypeScript types. Import in both the API and web so request/response shapes are validated at both ends.

```ts
import { CreateUserSchema, type CreateUserDto } from '@repo/contracts';
```

### `@repo/env`

Type-safe environment validation using Zod. Import only the subpath you need to avoid loading unrelated env vars.

```ts
// In the API
import { apiEnv } from '@repo/env/api';

// In Next.js
import { webEnv } from '@repo/env/web';
```

### `@repo/database`

Singleton Prisma client + re-exported Prisma input/select types. Import from one place across all server-side code.

```ts
import { prisma } from '@repo/database';
```

### `@repo/config`

Shared ESLint presets and TypeScript base configs extended by each app.

---

## Architecture Notes

- **Turborepo** orchestrates tasks with correct dependency order (`build` respects `^build`; `dev` runs all in parallel).
- **pnpm workspaces** link local packages as `workspace:*` dependencies — no publishing needed.
- **ts-node + tsconfig-paths** power the API's dev watch mode, avoiding the output path issues that `nest start --watch` has in cross-package monorepos.
- **Zod subpath imports** (`@repo/env/api` vs `@repo/env/web`) prevent the API from eagerly validating frontend env vars and vice versa.
- **Prisma schema** lives in `packages/database` and is shared; apps never reference Prisma directly — they import the singleton client.
- **Docker Compose** runs Postgres only. Apps run on the host via `pnpm dev` for the fastest feedback loop.

---

## Adding a New App

1. Create `apps/my-app/package.json` with `"name": "@repo/my-app"`.
2. Add it to the Turborepo task pipeline in `turbo.json` if it needs custom tasks.
3. Extend the relevant shared tsconfig from `@repo/config`.
4. Import `@repo/contracts`, `@repo/env/*`, or `@repo/database` as needed.

## Adding a New Package

1. Create `packages/my-package/package.json` with `"name": "@repo/my-package"`.
2. Add a `tsconfig.json` that extends `@repo/config`.
3. Reference it from apps via `"@repo/my-package": "workspace:*"` in their `package.json`.

---

## License

MIT
