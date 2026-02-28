"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiEnv = void 0;
const zod_1 = require("zod");
const validate_1 = require("./validate");
/**
 * API (NestJS) environment schema.
 * All variables here are server-only and must NEVER be exposed to the browser.
 */
const ApiEnvSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    // Server
    PORT: zod_1.z.coerce.number().int().positive().default(3001),
    API_BASE_URL: zod_1.z.string().url().default('http://localhost:3001'),
    // Database
    DATABASE_URL: zod_1.z
        .string()
        .url()
        .startsWith('postgresql://', { message: 'DATABASE_URL must be a PostgreSQL connection string' }),
    // Auth
    JWT_SECRET: zod_1.z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_EXPIRY: zod_1.z.string().default('15m'),
    REFRESH_TOKEN_SECRET: zod_1.z.string().min(32, 'REFRESH_TOKEN_SECRET must be at least 32 characters').optional(),
    REFRESH_TOKEN_EXPIRY: zod_1.z.string().default('7d'),
    // CORS
    ALLOWED_ORIGINS: zod_1.z
        .string()
        .transform((val) => val.split(',').map((s) => s.trim()))
        .default('http://localhost:3000'),
});
// Singleton — validated once at process startup
exports.apiEnv = (0, validate_1.validateEnv)(ApiEnvSchema, process.env);
//# sourceMappingURL=api.env.js.map