# ─── Stage 1: deps ───────────────────────────────────────────────────────────
FROM node:20-alpine AS deps

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/contracts/package.json  packages/contracts/package.json
COPY packages/env/package.json        packages/env/package.json
COPY packages/config/package.json     packages/config/package.json
COPY apps/web/package.json            apps/web/package.json

RUN pnpm install --frozen-lockfile

# ─── Stage 2: build ──────────────────────────────────────────────────────────
FROM deps AS build

COPY tsconfig.base.json ./
COPY packages/contracts  packages/contracts
COPY packages/env        packages/env
COPY packages/config     packages/config
COPY apps/web            apps/web

# Build args become NEXT_PUBLIC_* env vars baked in at build time
ARG NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
ARG NEXT_PUBLIC_APP_NAME=BarberConnect
ARG NEXT_PUBLIC_APP_ENV=production

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_APP_ENV=$NEXT_PUBLIC_APP_ENV

RUN pnpm --filter @repo/web build

# ─── Stage 3: runner ─────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Next.js runs as a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

# Copy only what Next.js needs to run (standalone output)
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/standalone  ./
COPY --from=build --chown=nextjs:nodejs /app/apps/web/.next/static      apps/web/.next/static
COPY --from=build --chown=nextjs:nodejs /app/apps/web/public            apps/web/public

USER nextjs

EXPOSE 3000
ENV PORT=3000

CMD ["node", "apps/web/server.js"]
