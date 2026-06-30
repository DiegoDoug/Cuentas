import { type ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { formatMoney } from '@/shared/utils';

import './AccountCard.css';
import { ACCOUNT_TYPE_LABELS, type Account } from '../types';

interface AccountCardProps {
  readonly account: Account;
  readonly onEdit: (id: string) => void;
  readonly onDelete: (id: string) => void;
}

/** Presents a single account with its balance and edit/delete actions. */
export function AccountCard({ account, onEdit, onDelete }: AccountCardProps): ReactNode {
  return (
    <article className="c-account-card">
      <div className="c-account-card__header">
        <h3 className="c-account-card__name">{account.name}</h3>
        <span className="c-account-card__type">{ACCOUNT_TYPE_LABELS[account.type]}</span>
      </div>

      <p className="c-account-card__balance">
        {formatMoney(account.initialBalance, account.currency)}
      </p>

      <div className="c-account-card__actions">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            onEdit(account.id);
          }}
          aria-label={`Edit ${account.name}`}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            onDelete(account.id);
          }}
          aria-label={`Delete ${account.name}`}
        >
          Delete
        </Button>
      </div>
    </article>
  );
}
