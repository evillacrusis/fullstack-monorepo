import { PrismaClient } from '@prisma/client';

// ─── Singleton Pattern ────────────────────────────────────────────────────────
// Prevents multiple PrismaClient instances in development (Next.js hot-reload)
// In production a single instance is created per process.

declare global {
  // eslint-disable-next-line no-var
  var __prismaClient: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
  return new PrismaClient({
    log: process.env['NODE_ENV'] === 'development' ? ['query', 'warn', 'error'] : ['warn', 'error'],
  });
}

export const prisma: PrismaClient = globalThis.__prismaClient ?? createPrismaClient();

if (process.env['NODE_ENV'] !== 'production') {
  globalThis.__prismaClient = prisma;
}
