import { DuplicateError, NotFoundError } from '@/shared/errors';

import { type AccountRepository, getAccountRepository } from '../repositories/account.repository';
import type { Account, AccountDraft, CreateAccountInput, UpdateAccountInput } from '../types';
import { assertValidCreateAccount, assertValidUpdateAccount } from '../validation';

/**
 * Coordinates account workflows: validate → enforce business rules → persist
 * (docs/03_DATA_LAYER.md §11). The service owns rules the repository must not
 * (uniqueness); the repository owns persistence the service must not touch
 * directly. Framework-independent so it is trivially unit-testable.
 */
export class AccountService {
  constructor(private readonly accounts: AccountRepository) {}

  /** List every active account. */
  list(): Promise<Account[]> {
    return this.accounts.getAll();
  }

  /** Fetch one active account by id, or `undefined`. */
  get(id: string): Promise<Account | undefined> {
    return this.accounts.getById(id);
  }

  /** Validate, enforce unique name, then persist a new account. */
  async create(input: CreateAccountInput): Promise<Account> {
    assertValidCreateAccount(input);
    const name = input.name.trim();
    await this.assertNameAvailable(name);

    const draft: AccountDraft = {
      name,
      type: input.type,
      currency: input.currency,
      initialBalance: input.initialBalance,
    };
    return this.accounts.create(draft);
  }

  /** Validate the patch, enforce unique name, then update the account. */
  async update(id: string, input: UpdateAccountInput): Promise<Account> {
    assertValidUpdateAccount(input);

    const patch: { -readonly [K in keyof AccountDraft]?: AccountDraft[K] } = {};
    if (input.name !== undefined) {
      const name = input.name.trim();
      await this.assertNameAvailable(name, id);
      patch.name = name;
    }
    if (input.type !== undefined) patch.type = input.type;
    if (input.currency !== undefined) patch.currency = input.currency;
    if (input.initialBalance !== undefined) patch.initialBalance = input.initialBalance;

    return this.accounts.update(id, patch);
  }

  /** Soft-delete an account, retaining the row for future sync. */
  async remove(id: string): Promise<void> {
    const existing = await this.accounts.getById(id);
    if (!existing) {
      throw new NotFoundError(`Account "${id}" not found.`);
    }
    await this.accounts.softDelete(id);
  }

  /** Throw {@link DuplicateError} if `name` is taken by another active account. */
  private async assertNameAvailable(name: string, ignoreId?: string): Promise<void> {
    const existing = await this.accounts.findByName(name);
    if (existing && existing.id !== ignoreId) {
      throw new DuplicateError(`An account named "${name}" already exists.`);
    }
  }
}

/** Resolve the shared {@link AccountService}, bound to the app database. */
export const getAccountService = async (): Promise<AccountService> =>
  new AccountService(await getAccountRepository());
