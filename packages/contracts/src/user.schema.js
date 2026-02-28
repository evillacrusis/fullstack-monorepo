"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponseSchema = exports.PaginationQuerySchema = exports.ApiErrorSchema = exports.ApiSuccessSchema = exports.AuthTokenSchema = exports.LoginSchema = exports.UserResponseSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.PasswordSchema = exports.EmailSchema = exports.UuidSchema = void 0;
const zod_1 = require("zod");
// ─── Primitives ──────────────────────────────────────────────────────────────
exports.UuidSchema = zod_1.z.string().uuid();
exports.EmailSchema = zod_1.z.string().email().toLowerCase().trim();
exports.PasswordSchema = zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one digit');
// ─── User Contracts ──────────────────────────────────────────────────────────
exports.CreateUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters').max(100).trim(),
    email: exports.EmailSchema,
    password: exports.PasswordSchema,
    role: zod_1.z.enum(['CLIENT', 'BARBER', 'ADMIN']).default('CLIENT'),
});
exports.UpdateUserSchema = exports.CreateUserSchema.partial().omit({ password: true }).extend({
    id: exports.UuidSchema,
});
exports.UserResponseSchema = zod_1.z.object({
    id: exports.UuidSchema,
    name: zod_1.z.string(),
    email: exports.EmailSchema,
    role: zod_1.z.enum(['CLIENT', 'BARBER', 'ADMIN']),
    createdAt: zod_1.z.string().datetime(),
    updatedAt: zod_1.z.string().datetime(),
});
// ─── Auth Contracts ──────────────────────────────────────────────────────────
exports.LoginSchema = zod_1.z.object({
    email: exports.EmailSchema,
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.AuthTokenSchema = zod_1.z.object({
    accessToken: zod_1.z.string(),
    refreshToken: zod_1.z.string().optional(),
    expiresIn: zod_1.z.number().int().positive(),
});
// ─── API Response Wrappers ────────────────────────────────────────────────────
const ApiSuccessSchema = (dataSchema) => zod_1.z.object({
    success: zod_1.z.literal(true),
    data: dataSchema,
    message: zod_1.z.string().optional(),
    timestamp: zod_1.z.string().datetime(),
});
exports.ApiSuccessSchema = ApiSuccessSchema;
exports.ApiErrorSchema = zod_1.z.object({
    success: zod_1.z.literal(false),
    error: zod_1.z.object({
        code: zod_1.z.string(),
        message: zod_1.z.string(),
        details: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
    }),
    timestamp: zod_1.z.string().datetime(),
});
// ─── Pagination ───────────────────────────────────────────────────────────────
exports.PaginationQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().int().positive().default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(20),
    sortBy: zod_1.z.string().optional(),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
const PaginatedResponseSchema = (itemSchema) => zod_1.z.object({
    items: zod_1.z.array(itemSchema),
    meta: zod_1.z.object({
        totalItems: zod_1.z.number().int().nonnegative(),
        totalPages: zod_1.z.number().int().nonnegative(),
        currentPage: zod_1.z.number().int().positive(),
        itemsPerPage: zod_1.z.number().int().positive(),
    }),
});
exports.PaginatedResponseSchema = PaginatedResponseSchema;
//# sourceMappingURL=user.schema.js.map