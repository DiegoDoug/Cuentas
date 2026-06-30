/**
 * Typed application errors.
 *
 * The data layer must throw typed, predictable errors — never generic strings
 * (docs/03_DATA_LAYER.md §17, docs/02_ARCHITECTURE.md §15). Every error carries
 * a machine-readable `code` so callers can branch without string matching.
 */

export type ErrorCode =
  | 'APP_ERROR'
  | 'DATABASE_ERROR'
  | 'VALIDATION_ERROR'
  | 'DUPLICATE_ERROR'
  | 'NOT_FOUND_ERROR'
  | 'MIGRATION_ERROR';

export abstract class AppError extends Error {
  abstract readonly code: ErrorCode;

  constructor(message: string, options?: { cause?: unknown }) {
    super(message);
    this.name = new.target.name;
    if (options?.cause !== undefined) {
      this.cause = options.cause;
    }
    // Preserve prototype chain when targeting ES5-ish runtimes.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DatabaseError extends AppError {
  readonly code = 'DATABASE_ERROR';
}

export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';

  constructor(
    message: string,
    readonly issues: readonly string[] = [],
    options?: { cause?: unknown },
  ) {
    super(message, options);
  }
}

export class DuplicateError extends AppError {
  readonly code = 'DUPLICATE_ERROR';
}

export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND_ERROR';
}

export class MigrationError extends AppError {
  readonly code = 'MIGRATION_ERROR';
}

export const isAppError = (value: unknown): value is AppError => value instanceof AppError;
