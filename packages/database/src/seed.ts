import { PrismaClient } from '@prisma/client';
import type { Prisma } from '@prisma/client';

// ─── Seed Script ─────────────────────────────────────────────────────────────
// Run with: pnpm --filter @repo/database db:seed

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // Admin user seed
  const admin = await prisma.user.upsert({
    where: { email: 'admin@barberconnect.dev' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@barberconnect.dev',
      // NOTE: In production, use bcrypt to hash. This is seed-only.
      passwordHash: '$2b$10$placeholderHashForSeedOnly',
      role: 'ADMIN',
    } satisfies Prisma.UserCreateInput,
  });

  console.log(`✅ Admin user: ${admin.email}`);

  // Demo barber
  const barber = await prisma.user.upsert({
    where: { email: 'barber@barberconnect.dev' },
    update: {},
    create: {
      name: 'Demo Barber',
      email: 'barber@barberconnect.dev',
      passwordHash: '$2b$10$placeholderHashForSeedOnly',
      role: 'BARBER',
    } satisfies Prisma.UserCreateInput,
  });

  console.log(`✅ Barber user: ${barber.email}`);
  console.log('✅ Seeding complete.');
}

main()
  .catch((e: unknown) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
