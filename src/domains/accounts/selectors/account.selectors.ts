import { ACCOUNT_TYPES, type Account, type AccountType } from '../types';

/**
 * Pure derived views over a list of accounts. Derived state is never stored —
 * it is computed here on demand (docs/02_ARCHITECTURE.md §19,
 * docs/03_DATA_LAYER.md §12). Inputs are treated as immutable.
 */

/** Accounts sorted alphabetically by name (case-insensitive, stable copy). */
export const selectAccountsSortedByName = (accounts: readonly Account[]): Account[] =>
  [...accounts].sort((a, b) => a.name.localeCompare(b.name));

/** Accounts grouped by type, with every type present (empty arrays included). */
export const selectAccountsByType = (
  accounts: readonly Account[],
): Record<AccountType, Account[]> => {
  const grouped = Object.fromEntries(
    ACCOUNT_TYPES.map((type) => [type, [] as Account[]]),
  ) as Record<AccountType, Account[]>;
  for (const account of accounts) {
    grouped[account.type].push(account);
  }
  return grouped;
};

/** Distinct currencies present, sorted. */
export const selectCurrencies = (accounts: readonly Account[]): string[] =>
  [...new Set(accounts.map((account) => account.currency))].sort();

/**
 * Total opening balance (minor units) per currency. Once the transactions
 * domain lands, the transaction-aware balance replaces the opening figure here.
 */
export const selectBalanceByCurrency = (accounts: readonly Account[]): Record<string, number> => {
  const totals: Record<string, number> = {};
  for (const account of accounts) {
    totals[account.currency] = (totals[account.currency] ?? 0) + account.initialBalance;
  }
  return totals;
};
