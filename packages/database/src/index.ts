import type { Prisma } from '@prisma/client';

// Re-export prisma client singleton
export { prisma } from './client';

// Re-export all generated Prisma types for consumers
export type { User, UserRole, Prisma } from '@prisma/client';

// Re-export select-input helper types for building typed queries
export type UserSelect = Prisma.UserSelect;

// Re-export create/update input types for use in service layers
export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;
