import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { isAppError } from '@/shared/errors';
import { toMajorUnits, toMinorUnits } from '@/shared/utils';

import './AccountForm.css';
import {
  ACCOUNT_TYPES,
  ACCOUNT_TYPE_LABELS,
  type Account,
  type AccountType,
  type CreateAccountInput,
} from '../types';
import { validateAccount } from '../validation';

interface AccountFormProps {
  /** The account being edited, or `undefined` when creating. */
  readonly account?: Account | undefined;
  /** Persist the assembled input. Resolves on success; rejects to show an error. */
  readonly onSubmit: (input: CreateAccountInput) => Promise<void>;
  /** Dismiss the form without saving. */
  readonly onCancel: () => void;
}

const CURRENCY_PATTERN = /^[A-Z]{3}$/;
const DEFAULT_CURRENCY = 'USD';

/**
 * Create/edit form for an account.
 *
 * Presentation only: it parses user input (major-unit amount → integer minor
 * units) and defers all business rules to the domain validator and service
 * (docs/02_ARCHITECTURE.md §14). Money is entered in major units (e.g. dollars)
 * and stored in minor units (e.g. cents).
 */
export function AccountForm({ account, onSubmit, onCancel }: AccountFormProps): ReactNode {
  const isEditing = account !== undefined;

  const [name, setName] = useState(account?.name ?? '');
  const [type, setType] = useState<AccountType>(account?.type ?? 'checking');
  const [currency, setCurrency] = useState(account?.currency ?? DEFAULT_CURRENCY);
  const [balanceText, setBalanceText] = useState(
    account ? String(toMajorUnits(account.initialBalance, account.currency)) : '',
  );
  const [attempted, setAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const mountedRef = useRef(true);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const balanceNumber = Number(balanceText);
  const balanceParseOk = balanceText.trim() !== '' && Number.isFinite(balanceNumber);
  const currencyValid = CURRENCY_PATTERN.test(currency);
  const initialBalance =
    currencyValid && balanceParseOk ? toMinorUnits(balanceNumber, currency) : Number.NaN;

  const fieldErrors = validateAccount({ name, type, currency, initialBalance }, { partial: false });
  const hasErrors = Object.keys(fieldErrors).length > 0 || !balanceParseOk;

  const showError = (message?: string): string | undefined => (attempted ? message : undefined);
  const nameError = showError(fieldErrors.name);
  const currencyError = showError(fieldErrors.currency);
  const balanceError = showError(
    !balanceParseOk
      ? 'Enter a valid opening balance.'
      : currencyValid
        ? fieldErrors.initialBalance
        : undefined,
  );

  const handleSubmit = (): void => {
    setAttempted(true);
    if (hasErrors) return;

    setSubmitError(null);
    setIsSubmitting(true);
    void (async (): Promise<void> => {
      try {
        await onSubmit({ name: name.trim(), type, currency, initialBalance });
      } catch (cause) {
        if (mountedRef.current) {
          setSubmitError(isAppError(cause) ? cause.message : 'Could not save the account.');
        }
      } finally {
        if (mountedRef.current) setIsSubmitting(false);
      }
    })();
  };

  return (
    <form
      className="c-account-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
      noValidate
      aria-label="Account details"
    >
      <div className="c-account-form__field">
        <label htmlFor="account-name">Name</label>
        <Input
          id="account-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          isInvalid={nameError !== undefined}
          aria-describedby={nameError ? 'account-name-error' : undefined}
          autoComplete="off"
          maxLength={80}
        />
        {nameError ? (
          <span id="account-name-error" className="c-account-form__error" role="alert">
            {nameError}
          </span>
        ) : null}
      </div>

      <div className="c-account-form__field">
        <label htmlFor="account-type">Type</label>
        <Select
          id="account-type"
          value={type}
          onChange={(event) => {
            setType(event.target.value as AccountType);
          }}
        >
          {ACCOUNT_TYPES.map((value) => (
            <option key={value} value={value}>
              {ACCOUNT_TYPE_LABELS[value]}
            </option>
          ))}
        </Select>
      </div>

      <div className="c-account-form__row">
        <div className="c-account-form__field">
          <label htmlFor="account-currency">Currency</label>
          <Input
            id="account-currency"
            value={currency}
            onChange={(event) => {
              setCurrency(event.target.value.toUpperCase());
            }}
            isInvalid={currencyError !== undefined}
            aria-describedby={currencyError ? 'account-currency-error' : undefined}
            autoComplete="off"
            maxLength={3}
            placeholder="USD"
          />
          {currencyError ? (
            <span id="account-currency-error" className="c-account-form__error" role="alert">
              {currencyError}
            </span>
          ) : null}
        </div>

        <div className="c-account-form__field">
          <label htmlFor="account-balance">Opening balance</label>
          <Input
            id="account-balance"
            value={balanceText}
            onChange={(event) => {
              setBalanceText(event.target.value);
            }}
            isInvalid={balanceError !== undefined}
            aria-describedby={balanceError ? 'account-balance-error' : undefined}
            inputMode="decimal"
            placeholder="0.00"
          />
          {balanceError ? (
            <span id="account-balance-error" className="c-account-form__error" role="alert">
              {balanceError}
            </span>
          ) : null}
        </div>
      </div>

      {submitError ? (
        <p className="c-account-form__error" role="alert">
          {submitError}
        </p>
      ) : null}

      <div className="c-account-form__actions">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isEditing ? 'Save changes' : 'Create account'}
        </Button>
      </div>
    </form>
  );
}
