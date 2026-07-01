import { useCallback, useEffect, useState } from 'react';

import { isAppError } from '@/shared/errors';

import { getAccountService } from '../services/account.service';
import type { Account, CreateAccountInput, UpdateAccountInput } from '../types';

interface UseAccountsResult {
  readonly accounts: Account[];
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly createAccount: (input: CreateAccountInput) => Promise<Account>;
  readonly updateAccount: (id: string, input: UpdateAccountInput) => Promise<Account>;
  readonly deleteAccount: (id: string) => Promise<void>;
  readonly refresh: () => Promise<void>;
}

const messageOf = (error: unknown): string =>
  isAppError(error) ? error.message : 'Something went wrong loading accounts.';

/**
 * Read-and-mutate access to accounts for the presentation layer.
 *
 * Follows the mandated pipeline UI → service → repository → Dexie
 * (docs/03_DATA_LAYER.md §4): the list is loaded through the service and
 * re-read after every mutation, keeping Dexie the single source of truth — the
 * hook holds only a local, derived copy for rendering. Mutations re-throw so
 * callers (forms) can present field-level errors.
 */
export const useAccounts = (): UseAccountsResult => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      const service = await getAccountService();
      setAccounts(await service.list());
      setError(null);
    } catch (cause) {
      setError(messageOf(cause));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const createAccount = useCallback(
    async (input: CreateAccountInput): Promise<Account> => {
      const service = await getAccountService();
      const created = await service.create(input);
      await refresh();
      return created;
    },
    [refresh],
  );

  const updateAccount = useCallback(
    async (id: string, input: UpdateAccountInput): Promise<Account> => {
      const service = await getAccountService();
      const updated = await service.update(id, input);
      await refresh();
      return updated;
    },
    [refresh],
  );

  const deleteAccount = useCallback(
    async (id: string): Promise<void> => {
      const service = await getAccountService();
      await service.remove(id);
      await refresh();
    },
    [refresh],
  );

  return { accounts, isLoading, error, createAccount, updateAccount, deleteAccount, refresh };
};
