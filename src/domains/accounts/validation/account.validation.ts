import { ValidationError } from '@/shared/errors';

import { ACCOUNT_TYPES, type CreateAccountInput, type UpdateAccountInput } from '../types';

/** Maximum length of an account name. */
export const ACCOUNT_NAME_MAX_LENGTH = 60;

const CURRENCY_PATTERN = /^[A-Z]{3}$/;

/** A validation message per field, present only for fields that fail. */
export interface AccountFieldErrors {
  readonly name?: string;
  readonly type?: string;
  readonly currency?: string;
  readonly initialBalance?: string;
}

/**
 * Validate an account input, returning a message per failing field.
 *
 * The single source of validation truth, shared by the form (per-field
 * feedback) and the service (enforcement) so rules are never duplicated
 * (docs/02_ARCHITECTURE.md §14). In `partial` mode (updates) only provided
 * fields are checked. Pure — performs no I/O (docs/03_DATA_LAYER.md §13).
 */
export const validateAccount = (
  input: UpdateAccountInput,
  { partial }: { readonly partial: boolean },
): AccountFieldErrors => {
  const errors: { -readonly [K in keyof AccountFieldErrors]: string } = {};
  const check = (key: keyof CreateAccountInput): boolean => !partial || input[key] !== undefined;

  if (check('name')) {
    const name = input.name?.trim() ?? '';
    if (name.length === 0) {
      errors.name = 'Name is required.';
    } else if (name.length > ACCOUNT_NAME_MAX_LENGTH) {
      errors.name = `Name must be at most ${String(ACCOUNT_NAME_MAX_LENGTH)} characters.`;
    }
  }

  if (check('type') && !(ACCOUNT_TYPES as readonly string[]).includes(input.type ?? '')) {
    errors.type = 'Choose an account type.';
  }

  if (check('currency') && !CURRENCY_PATTERN.test(input.currency ?? '')) {
    errors.currency = 'Use a 3-letter ISO code (e.g. USD).';
  }

  if (check('initialBalance') && !Number.isInteger(input.initialBalance)) {
    errors.initialBalance = 'Enter a valid amount.';
  }

  return errors;
};

const ACCOUNT_FIELDS: readonly (keyof AccountFieldErrors)[] = [
  'name',
  'type',
  'currency',
  'initialBalance',
];

/** Every validation message for an input, order-stable. */
export const collectAccountIssues = (
  input: UpdateAccountInput,
  options: { readonly partial: boolean },
): readonly string[] => {
  const errors = validateAccount(input, options);
  return ACCOUNT_FIELDS.map((field) => errors[field]).filter(
    (message): message is string => message !== undefined,
  );
};

/** Throw a {@link ValidationError} if a create input is invalid. */
export const assertValidCreateAccount: (input: CreateAccountInput) => void = (input) => {
  const issues = collectAccountIssues(input, { partial: false });
  if (issues.length > 0) {
    throw new ValidationError('Invalid account.', issues);
  }
};

/** Throw a {@link ValidationError} if an update input is invalid. */
export const assertValidUpdateAccount: (input: UpdateAccountInput) => void = (input) => {
  const issues = collectAccountIssues(input, { partial: true });
  if (issues.length > 0) {
    throw new ValidationError('Invalid account update.', issues);
  }
};
