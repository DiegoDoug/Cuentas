import { type ReactNode } from 'react';

import { formatMoney } from '@/shared/utils';

import './AccountsSummary.css';
import { selectBalanceByCurrency } from '../selectors';
import type { Account } from '../types';

interface AccountsSummaryProps {
  readonly accounts: readonly Account[];
}

/**
 * Headline totals for the accounts screen. All figures are derived on render via
 * selectors — never stored (docs/02_ARCHITECTURE.md §19).
 */
export function AccountsSummary({ accounts }: AccountsSummaryProps): ReactNode {
  const balanceByCurrency = selectBalanceByCurrency(accounts);
  const currencies = Object.keys(balanceByCurrency).sort();

  return (
    <section className="c-accounts-summary" aria-label="Account totals">
      <div className="c-accounts-summary__metric">
        <span className="c-accounts-summary__label">Accounts</span>
        <span className="c-accounts-summary__value">{accounts.length}</span>
      </div>
      {currencies.map((currency) => (
        <div key={currency} className="c-accounts-summary__metric">
          <span className="c-accounts-summary__label">Total ({currency})</span>
          <span className="c-accounts-summary__value">
            {formatMoney(balanceByCurrency[currency] ?? 0, currency)}
          </span>
        </div>
      ))}
    </section>
  );
}
