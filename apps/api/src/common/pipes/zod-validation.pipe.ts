import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ZodSchema, ZodError } from 'zod';

/**
 * A NestJS pipe that validates request body/params against a Zod schema.
 * Throws a 400 BadRequestException with structured field errors on failure.
 */
@Injectable()
export class ZodValidationPipe<T> implements PipeTransform {
  constructor(private readonly schema: ZodSchema<T>) {}

  transform(value: unknown, _meta: ArgumentMetadata): T {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const zodError = result.error as ZodError;
      const fieldErrors = zodError.issues.reduce<Record<string, string[]>>((acc, issue) => {
        const key = issue.path.join('.') || 'root';
        const existing = acc[key] ?? [];
        return { ...acc, [key]: [...existing, issue.message] };
      }, {});

      throw new BadRequestException({
        statusCode: 400,
        message: 'Validation failed',
        errors: fieldErrors,
      });
    }

    return result.data;
  }
}
