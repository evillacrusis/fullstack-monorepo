import type { Prisma } from '@prisma/client';
export { prisma } from './client';
export type {
  User,
  BarberSlot,
  Appointment,
  UserRole,
  AppointmentStatus,
  Prisma,
} from '@prisma/client';
export type UserSelect = Prisma.UserSelect;
export type AppointmentSelect = Prisma.AppointmentSelect;
export type BarberSlotSelect = Prisma.BarberSlotSelect;
export type CreateUserInput = Prisma.UserCreateInput;
export type UpdateUserInput = Prisma.UserUpdateInput;
export type CreateAppointmentInput = Prisma.AppointmentCreateInput;
export type UpdateAppointmentInput = Prisma.AppointmentUpdateInput;
export type CreateBarberSlotInput = Prisma.BarberSlotCreateInput;
export type UpdateBarberSlotInput = Prisma.BarberSlotUpdateInput;
//# sourceMappingURL=index.d.ts.map
