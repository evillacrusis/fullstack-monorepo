import { z } from 'zod';
import { validateEnv } from './validate';

/**
 * API (NestJS) environment schema.
 * All variables here are server-only and must NEVER be exposed to the browser.
 */
const ApiEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Server
  PORT: z.coerce.number().int().positive().default(3001),
  API_BASE_URL: z.string().url().default('http://localhost:3001'),

  // Database
  DATABASE_URL: z.string().url().startsWith('postgresql://', {
    message: 'DATABASE_URL must be a PostgreSQL connection string',
  }),

  // Auth
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRY: z.string().default('15m'),
  REFRESH_TOKEN_SECRET: z
    .string()
    .min(32, 'REFRESH_TOKEN_SECRET must be at least 32 characters')
    .optional(),
  REFRESH_TOKEN_EXPIRY: z.string().default('7d'),

  // CORS
  ALLOWED_ORIGINS: z
    .string()
    .transform((val: string) => val.split(',').map((s: string) => s.trim()))
    .default('http://localhost:3000'),
});

export type ApiEnv = z.infer<typeof ApiEnvSchema>;

// Singleton — validated once at process startup
export const apiEnv: ApiEnv = validateEnv(ApiEnvSchema, process.env);
