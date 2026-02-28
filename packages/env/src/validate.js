"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnv = validateEnv;
const zod_1 = require("zod");
/**
 * Validates and parses environment variables against a Zod schema.
 * Throws a descriptive error at startup if any variable is missing or invalid.
 */
function validateEnv(schema, raw) {
    try {
        return schema.parse(raw);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const formatted = err.issues
                .map((issue) => `  [${issue.path.join('.')}] ${issue.message}`)
                .join('\n');
            throw new Error(`\n❌ Invalid environment variables:\n${formatted}\n`);
        }
        throw err;
    }
}
//# sourceMappingURL=validate.js.map