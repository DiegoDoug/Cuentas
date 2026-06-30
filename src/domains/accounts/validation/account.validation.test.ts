import { describe, expect, it } from 'vitest';

import { ValidationError } from '@/shared/errors';

import type { CreateAccountInput } from '../types';
import {
  assertValidCreateAccount,
  assertValidUpdateAccount,
  collectAccountIssues,
  validateAccount,
} from './account.validation';

const validInput: CreateAccountInput = {
  name: 'Checking',
  type: 'checking',
  currency: 'USD',
  initialBalance: 10000,
};

describe('validateAccount', () => {
  it('returns no errors for a valid input', () => {
    expect(validateAccount(validInput, { partial: false })).toEqual({});
    expect(collectAccountIssues(validInput, { partial: false })).toEqual([]);
  });

  it('requires a non-empty name', () => {
    expect(validateAccount({ ...validInput, name: '   ' }, { partial: false }).name).toBeDefined();
  });

  it('rejects an over-long name', () => {
    const name = 'a'.repeat(61);
    expect(validateAccount({ ...validInput, name }, { partial: false }).name).toBeDefined();
  });

  it('rejects an unsupported type', () => {
    const errors = validateAccount(
      { ...validInput, type: 'crypto' as CreateAccountInput['type'] },
      { partial: false },
    );
    expect(errors.type).toBeDefined();
  });

  it('rejects a malformed currency code', () => {
    expect(
      validateAccount({ ...validInput, currency: 'us' }, { partial: false }).currency,
    ).toBeDefined();
    expect(
      validateAccount({ ...validInput, currency: 'usd' }, { partial: false }).currency,
    ).toBeDefined();
  });

  it('rejects a non-integer balance', () => {
    expect(
      validateAccount({ ...validInput, initialBalance: 1.5 }, { partial: false }).initialBalance,
    ).toBeDefined();
    expect(
      validateAccount({ ...validInput, initialBalance: Number.NaN }, { partial: false })
        .initialBalance,
    ).toBeDefined();
  });

  it('allows a negative integer balance (e.g. credit)', () => {
    expect(validateAccount({ ...validInput, initialBalance: -5000 }, { partial: false })).toEqual(
      {},
    );
  });

  it('only checks provided fields in partial mode', () => {
    expect(validateAccount({ name: 'Savings' }, { partial: true })).toEqual({});
    expect(validateAccount({ currency: 'eur' }, { partial: true }).currency).toBeDefined();
  });
});

describe('assert helpers', () => {
  it('does not throw for valid inputs', () => {
    expect(() => {
      assertValidCreateAccount(validInput);
    }).not.toThrow();
    expect(() => {
      assertValidUpdateAccount({ name: 'New name' });
    }).not.toThrow();
  });

  it('throws ValidationError with issues for invalid create input', () => {
    try {
      assertValidCreateAccount({ ...validInput, name: '', currency: 'x' });
      expect.unreachable('should have thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      expect((error as ValidationError).issues.length).toBeGreaterThan(0);
    }
  });

  it('throws ValidationError for an invalid update patch', () => {
    expect(() => {
      assertValidUpdateAccount({ currency: 'bad' });
    }).toThrow(ValidationError);
  });
});
