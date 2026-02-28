# ─── Stage 1: deps ───────────────────────────────────────────────────────────
# Install ALL workspace dependencies and generate the Prisma client.
# This layer is shared with the migrate service in docker-compose.
FROM node:20-alpine AS deps

# pg_isready is needed for the migrate healthcheck
RUN apk add --no-cache postgresql-client

WORKDIR /app

# Enable pnpm via corepack
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy workspace manifests first (maximises Docker layer cache)
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/contracts/package.json  packages/contracts/package.json
COPY packages/env/package.json        packages/env/package.json
COPY packages/database/package.json   packages/database/package.json
COPY packages/config/package.json     packages/config/package.json
COPY apps/api/package.json            apps/api/package.json

# Install with frozen lockfile — production deps only for runtime
RUN pnpm install --frozen-lockfile

# Copy source after deps are installed
COPY tsconfig.base.json ./
COPY packages/contracts  packages/contracts
COPY packages/env        packages/env
COPY packages/database   packages/database
COPY packages/config     packages/config
COPY apps/api            apps/api

# Generate Prisma client (output goes into node_modules)
RUN pnpm --filter @repo/database db:generate

# ─── Stage 2: build ──────────────────────────────────────────────────────────
FROM deps AS build

RUN pnpm --filter @repo/api build

# ─── Stage 3: runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/contracts/package.json  packages/contracts/package.json
COPY packages/env/package.json        packages/env/package.json
COPY packages/database/package.json   packages/database/package.json
COPY packages/config/package.json     packages/config/package.json
COPY apps/api/package.json            apps/api/package.json

# Production deps only
RUN pnpm install --frozen-lockfile --prod

# Copy compiled output + Prisma schema (needed at runtime for query engine)
COPY --from=build /app/apps/api/dist              apps/api/dist
COPY --from=build /app/packages/database/prisma   packages/database/prisma
COPY --from=build /app/node_modules/.prisma       node_modules/.prisma
COPY --from=build /app/node_modules/@prisma       node_modules/@prisma

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "apps/api/dist/main"]
