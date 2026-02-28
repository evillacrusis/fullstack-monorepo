import { z } from 'zod';
/**
 * Validates and parses environment variables against a Zod schema.
 * Throws a descriptive error at startup if any variable is missing or invalid.
 */
export declare function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  raw: Record<string, unknown>,
): z.infer<T>;
//# sourceMappingURL=validate.d.ts.map
