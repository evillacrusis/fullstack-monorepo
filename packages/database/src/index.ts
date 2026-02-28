import type { Prisma } from '@prisma/client';

// Re-export prisma client singleton
export { prisma } from './client';

// Re-export all generated Prisma types for consumers
export type {
  User,
  BarberSlot,
  Appointment,
  UserRole,
  AppointmentStatus,
  Prisma,
} from '@prisma/client';

// Re-export select-input helper types for building typed queries
export type UserSelect = Prisma.UserSelect;
export type AppointmentSelect = Prisma.AppointmentSelect;
export type BarberSlotSelect = Prisma.BarberSlotSelect;

// Re-export create/update input types for use in service layers
export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;
export type CreateAppointmentInput = Prisma.AppointmentCreateInput;
export type UpdateAppointmentInput = Prisma.AppointmentUpdateInput;
export type CreateBarberSlotInput = Prisma.BarberSlotCreateInput;
export type UpdateBarberSlotInput = Prisma.BarberSlotUpdateInput;
