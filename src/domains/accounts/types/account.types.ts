import type { BaseEntity, EntityDraft } from '@/shared/types';

/**
 * The kind of account. A literal union (not an enum) per the TypeScript
 * standards (docs/02_ARCHITECTURE.md §8).
 */
export type AccountType = 'checking' | 'savings' | 'cash' | 'credit' | 'investment';

/** Every supported account type, in display order. */
export const ACCOUNT_TYPES: readonly AccountType[] = [
  'checking',
  'savings',
  'cash',
  'credit',
  'investment',
];

/** Human-readable label for each account type. */
export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  checking: 'Checking',
  savings: 'Savings',
  cash: 'Cash',
  credit: 'Credit',
  investment: 'Investment',
};

/**
 * A financial account the user holds money in (a bank account, a wallet, a
 * credit line…). Persisted in Dexie (docs/03_DATA_LAYER.md §3); contains domain
 * data only — never UI flags (docs/03_DATA_LAYER.md §9).
 */
export interface Account extends BaseEntity {
  /** Human-readable label, unique among active accounts. */
  readonly name: string;
  /** The account's kind. */
  readonly type: AccountType;
  /** ISO 4217 currency code, e.g. `USD`. */
  readonly currency: string;
  /**
   * Opening balance in integer minor units (e.g. cents). May be negative for
   * credit accounts. The transaction-aware running balance is derived later,
   * once the transactions domain exists.
   */
  readonly initialBalance: number;
}

/** The domain fields a caller supplies; lifecycle metadata is repository-owned. */
export type AccountDraft = EntityDraft<Account>;

/** Input accepted by the service when creating an account. */
export interface CreateAccountInput {
  readonly name: string;
  readonly type: AccountType;
  readonly currency: string;
  readonly initialBalance: number;
}

/** Input accepted by the service when updating an account (all fields optional). */
export type UpdateAccountInput = Partial<CreateAccountInput>;
