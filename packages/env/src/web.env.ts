import { z } from 'zod';
import { validateEnv } from './validate';

/**
 * Web (Next.js) environment schema.
 *
 * RULE: Only NEXT_PUBLIC_* variables may be used in client components.
 * Server-only variables (no NEXT_PUBLIC_ prefix) are restricted to
 * Next.js Server Components, API Routes, and middleware.
 */
const WebEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Public — safe to expose to the browser
  NEXT_PUBLIC_API_URL: z.string().url('NEXT_PUBLIC_API_URL must be a valid URL'),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('BarberConnect'),
  NEXT_PUBLIC_APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  // Server-only — used in Next.js API routes / RSC only
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters').optional(),
  NEXTAUTH_URL: z.string().url().optional(),
});

export type WebEnv = z.infer<typeof WebEnvSchema>;

// Only validate the variables that are available in the current context.
// On the client, only NEXT_PUBLIC_* vars are set by Next.js.
export const webEnv: WebEnv = validateEnv(WebEnvSchema, process.env);

/**
 * Type-safe helper to access only public (browser-safe) env variables.
 * Use this inside client components to prevent accidental secret exposure.
 */
export type PublicWebEnv = Pick<
  WebEnv,
  'NEXT_PUBLIC_API_URL' | 'NEXT_PUBLIC_APP_NAME' | 'NEXT_PUBLIC_APP_ENV'
>;

export const publicWebEnv: PublicWebEnv = {
  NEXT_PUBLIC_API_URL: webEnv.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_NAME: webEnv.NEXT_PUBLIC_APP_NAME,
  NEXT_PUBLIC_APP_ENV: webEnv.NEXT_PUBLIC_APP_ENV,
};
