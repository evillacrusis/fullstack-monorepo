"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicWebEnv = exports.webEnv = void 0;
const zod_1 = require("zod");
const validate_1 = require("./validate");
/**
 * Web (Next.js) environment schema.
 *
 * RULE: Only NEXT_PUBLIC_* variables may be used in client components.
 * Server-only variables (no NEXT_PUBLIC_ prefix) are restricted to
 * Next.js Server Components, API Routes, and middleware.
 */
const WebEnvSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(['development', 'test', 'production']).default('development'),
    // Public — safe to expose to the browser
    NEXT_PUBLIC_API_URL: zod_1.z.string().url('NEXT_PUBLIC_API_URL must be a valid URL'),
    NEXT_PUBLIC_APP_NAME: zod_1.z.string().min(1).default('BarberConnect'),
    NEXT_PUBLIC_APP_ENV: zod_1.z.enum(['development', 'staging', 'production']).default('development'),
    // Server-only — used in Next.js API routes / RSC only
    NEXTAUTH_SECRET: zod_1.z
        .string()
        .min(32, 'NEXTAUTH_SECRET must be at least 32 characters')
        .optional(),
    NEXTAUTH_URL: zod_1.z.string().url().optional(),
});
// Only validate the variables that are available in the current context.
// On the client, only NEXT_PUBLIC_* vars are set by Next.js.
exports.webEnv = (0, validate_1.validateEnv)(WebEnvSchema, process.env);
exports.publicWebEnv = {
    NEXT_PUBLIC_API_URL: exports.webEnv.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_APP_NAME: exports.webEnv.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_ENV: exports.webEnv.NEXT_PUBLIC_APP_ENV,
};
//# sourceMappingURL=web.env.js.map