import { z } from 'zod';

// ─── Primitives ──────────────────────────────────────────────────────────────

export const UuidSchema = z.string().uuid();

export const EmailSchema = z.string().email().toLowerCase().trim();

export const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must not exceed 128 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one digit');

// ─── User Contracts ──────────────────────────────────────────────────────────

export const CreateUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
  email: EmailSchema,
  password: PasswordSchema,
  role: z.enum(['CLIENT', 'BARBER', 'ADMIN']).default('CLIENT'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true }).extend({
  id: UuidSchema,
});

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export const UserResponseSchema = z.object({
  id: UuidSchema,
  name: z.string(),
  email: EmailSchema,
  role: z.enum(['CLIENT', 'BARBER', 'ADMIN']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type UserResponse = z.infer<typeof UserResponseSchema>;

// ─── Auth Contracts ──────────────────────────────────────────────────────────

export const LoginSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, 'Password is required'),
});

export type LoginDto = z.infer<typeof LoginSchema>;

export const AuthTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresIn: z.number().int().positive(),
});

export type AuthToken = z.infer<typeof AuthTokenSchema>;

// ─── API Response Wrappers ────────────────────────────────────────────────────

export const ApiSuccessSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
    timestamp: z.string().datetime(),
  });

export const ApiErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.unknown()).optional(),
  }),
  timestamp: z.string().datetime(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
};

// ─── Pagination ───────────────────────────────────────────────────────────────

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(itemSchema),
    meta: z.object({
      totalItems: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
      currentPage: z.number().int().positive(),
      itemsPerPage: z.number().int().positive(),
    }),
  });
