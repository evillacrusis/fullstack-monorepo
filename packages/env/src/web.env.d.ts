import { z } from 'zod';
/**
 * Web (Next.js) environment schema.
 *
 * RULE: Only NEXT_PUBLIC_* variables may be used in client components.
 * Server-only variables (no NEXT_PUBLIC_ prefix) are restricted to
 * Next.js Server Components, API Routes, and middleware.
 */
declare const WebEnvSchema: z.ZodObject<
  {
    NODE_ENV: z.ZodDefault<z.ZodEnum<['development', 'test', 'production']>>;
    NEXT_PUBLIC_API_URL: z.ZodString;
    NEXT_PUBLIC_APP_NAME: z.ZodDefault<z.ZodString>;
    NEXT_PUBLIC_APP_ENV: z.ZodDefault<z.ZodEnum<['development', 'staging', 'production']>>;
    NEXTAUTH_SECRET: z.ZodOptional<z.ZodString>;
    NEXTAUTH_URL: z.ZodOptional<z.ZodString>;
  },
  'strip',
  z.ZodTypeAny,
  {
    NODE_ENV: 'development' | 'production' | 'test';
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_APP_NAME: string;
    NEXT_PUBLIC_APP_ENV: 'development' | 'production' | 'staging';
    NEXTAUTH_SECRET?: string | undefined;
    NEXTAUTH_URL?: string | undefined;
  },
  {
    NEXT_PUBLIC_API_URL: string;
    NODE_ENV?: 'development' | 'production' | 'test' | undefined;
    NEXT_PUBLIC_APP_NAME?: string | undefined;
    NEXT_PUBLIC_APP_ENV?: 'development' | 'production' | 'staging' | undefined;
    NEXTAUTH_SECRET?: string | undefined;
    NEXTAUTH_URL?: string | undefined;
  }
>;
export type WebEnv = z.infer<typeof WebEnvSchema>;
export declare const webEnv: WebEnv;
/**
 * Type-safe helper to access only public (browser-safe) env variables.
 * Use this inside client components to prevent accidental secret exposure.
 */
export type PublicWebEnv = Pick<
  WebEnv,
  'NEXT_PUBLIC_API_URL' | 'NEXT_PUBLIC_APP_NAME' | 'NEXT_PUBLIC_APP_ENV'
>;
export declare const publicWebEnv: PublicWebEnv;
export {};
//# sourceMappingURL=web.env.d.ts.map
