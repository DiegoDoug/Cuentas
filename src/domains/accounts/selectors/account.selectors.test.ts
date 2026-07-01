import { describe, expect, it } from 'vitest';

import type { Account } from '../types';
import {
  selectAccountsByType,
  selectAccountsSortedByName,
  selectBalanceByCurrency,
  selectCurrencies,
} from './account.selectors';

const makeAccount = (overrides: Partial<Account>): Account => ({
  id: overrides.id ?? crypto.randomUUID(),
  name: overrides.name ?? 'Account',
  type: overrides.type ?? 'checking',
  currency: overrides.currency ?? 'USD',
  initialBalance: overrides.initialBalance ?? 0,
  createdAt: 0,
  updatedAt: 0,
  deletedAt: null,
  syncStatus: 'pending',
  version: 1,
  deviceId: 'test',
});

const accounts: Account[] = [
  makeAccount({ name: 'Wallet', type: 'cash', currency: 'USD', initialBalance: 5000 }),
  makeAccount({ name: 'Bank', type: 'checking', currency: 'USD', initialBalance: 20000 }),
  makeAccount({ name: 'Euro savings', type: 'savings', currency: 'EUR', initialBalance: 30000 }),
];

describe('account selectors', () => {
  it('sorts accounts by name without mutating the input', () => {
    const input = [...accounts];
    const sorted = selectAccountsSortedByName(input);
    expect(sorted.map((account) => account.name)).toEqual(['Bank', 'Euro savings', 'Wallet']);
    expect(input.map((account) => account.name)).toEqual(['Wallet', 'Bank', 'Euro savings']);
  });

  it('groups accounts by type with every type present', () => {
    const grouped = selectAccountsByType(accounts);
    expect(grouped.cash).toHaveLength(1);
    expect(grouped.checking).toHaveLength(1);
    expect(grouped.savings).toHaveLength(1);
    expect(grouped.credit).toEqual([]);
    expect(grouped.investment).toEqual([]);
  });

  it('lists distinct currencies sorted', () => {
    expect(selectCurrencies(accounts)).toEqual(['EUR', 'USD']);
  });

  it('totals the opening balance per currency', () => {
    expect(selectBalanceByCurrency(accounts)).toEqual({ USD: 25000, EUR: 30000 });
  });

  it('returns empty results for no accounts', () => {
    expect(selectCurrencies([])).toEqual([]);
    expect(selectBalanceByCurrency([])).toEqual({});
    expect(selectAccountsSortedByName([])).toEqual([]);
  });
});
