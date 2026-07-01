import { type ReactNode } from 'react';

import { Button } from '@/components/ui/Button';

import './AccountsPage.css';
import { useAccounts } from '../hooks/useAccounts';
import { selectAccountsSortedByName } from '../selectors';
import {
  useAccountForm,
  useCloseForm,
  useOpenCreateForm,
  useOpenEditForm,
} from '../store/account-ui.store';
import type { CreateAccountInput } from '../types';
import { AccountCard } from './AccountCard';
import { AccountForm } from './AccountForm';
import { AccountsSummary } from './AccountsSummary';

/**
 * Accounts screen.
 *
 * The domain's composition root: it wires the {@link useAccounts} data hook to
 * the presentation components and the UI-only form store. It holds no business
 * logic itself (docs/02_ARCHITECTURE.md §9) — every mutation flows through the
 * hook → service → repository pipeline.
 */
export function AccountsPage(): ReactNode {
  const { accounts, isLoading, error, createAccount, updateAccount, deleteAccount } = useAccounts();
  const form = useAccountForm();
  const openCreateForm = useOpenCreateForm();
  const openEditForm = useOpenEditForm();
  const closeForm = useCloseForm();

  const sorted = selectAccountsSortedByName(accounts);
  const editingAccount =
    form.mode === 'edit' ? accounts.find((account) => account.id === form.accountId) : undefined;
  const isFormOpen =
    form.mode === 'create' || (form.mode === 'edit' && editingAccount !== undefined);

  const handleSubmit = async (input: CreateAccountInput): Promise<void> => {
    if (form.mode === 'edit' && editingAccount) {
      await updateAccount(editingAccount.id, input);
    } else {
      await createAccount(input);
    }
    closeForm();
  };

  return (
    <main className="c-accounts-page">
      <header className="c-accounts-page__header">
        <div>
          <h1 className="c-accounts-page__title">Accounts</h1>
          <p className="c-accounts-page__subtitle">
            The accounts you track money in. Balances update once transactions arrive.
          </p>
        </div>
        {!isFormOpen ? <Button onClick={openCreateForm}>Add account</Button> : null}
      </header>

      {isFormOpen ? (
        <section className="c-accounts-page__panel" aria-label="Account form">
          <h2 className="c-accounts-page__panel-title">
            {form.mode === 'edit' ? 'Edit account' : 'New account'}
          </h2>
          <AccountForm
            key={form.mode === 'edit' ? form.accountId : 'create'}
            account={editingAccount}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </section>
      ) : null}

      {error ? (
        <p className="c-accounts-page__error" role="alert">
          {error}
        </p>
      ) : null}

      {accounts.length > 0 ? <AccountsSummary accounts={accounts} /> : null}

      {isLoading && accounts.length === 0 ? (
        <p className="c-accounts-page__empty">Loading accounts…</p>
      ) : null}

      {!isLoading && accounts.length === 0 ? (
        <p className="c-accounts-page__empty">
          No accounts yet. Add your first one to get started.
        </p>
      ) : null}

      <div className="c-accounts-page__list">
        {sorted.map((account) => (
          <AccountCard
            key={account.id}
            account={account}
            onEdit={openEditForm}
            onDelete={(id) => void deleteAccount(id)}
          />
        ))}
      </div>
    </main>
  );
}
