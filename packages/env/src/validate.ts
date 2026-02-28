import { z, ZodError } from 'zod';

/**
 * Validates and parses environment variables against a Zod schema.
 * Throws a descriptive error at startup if any variable is missing or invalid.
 */
export function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  raw: Record<string, unknown>,
): z.infer<T> {
  try {
    return schema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      const formatted = err.issues
        .map((issue: z.ZodIssue) => `  [${issue.path.join('.')}] ${issue.message}`)
        .join('\n');
      throw new Error(`\n❌ Invalid environment variables:\n${formatted}\n`);
    }
    throw err;
  }
}
