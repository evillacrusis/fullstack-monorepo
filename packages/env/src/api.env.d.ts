import { z } from 'zod';
/**
 * API (NestJS) environment schema.
 * All variables here are server-only and must NEVER be exposed to the browser.
 */
declare const ApiEnvSchema: z.ZodObject<
  {
    NODE_ENV: z.ZodDefault<z.ZodEnum<['development', 'test', 'production']>>;
    PORT: z.ZodDefault<z.ZodNumber>;
    API_BASE_URL: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    JWT_SECRET: z.ZodString;
    JWT_EXPIRY: z.ZodDefault<z.ZodString>;
    REFRESH_TOKEN_SECRET: z.ZodOptional<z.ZodString>;
    REFRESH_TOKEN_EXPIRY: z.ZodDefault<z.ZodString>;
    ALLOWED_ORIGINS: z.ZodDefault<z.ZodEffects<z.ZodString, string[], string>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: number;
    API_BASE_URL: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRY: string;
    REFRESH_TOKEN_EXPIRY: string;
    ALLOWED_ORIGINS: string[];
    REFRESH_TOKEN_SECRET?: string | undefined;
  },
  {
    DATABASE_URL: string;
    JWT_SECRET: string;
    NODE_ENV?: 'development' | 'production' | 'test' | undefined;
    PORT?: number | undefined;
    API_BASE_URL?: string | undefined;
    JWT_EXPIRY?: string | undefined;
    REFRESH_TOKEN_SECRET?: string | undefined;
    REFRESH_TOKEN_EXPIRY?: string | undefined;
    ALLOWED_ORIGINS?: string | undefined;
  }
>;
export type ApiEnv = z.infer<typeof ApiEnvSchema>;
export declare const apiEnv: ApiEnv;
export {};
//# sourceMappingURL=api.env.d.ts.map
