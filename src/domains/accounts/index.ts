/**
 * Public API of the accounts domain.
 *
 * The presentation/app layer composes the domain through this barrel; other
 * domains must not import it (domains are isolated, docs/02_ARCHITECTURE.md §6).
 */
export { AccountsPage } from './components';
export { useAccounts } from './hooks/useAccounts';
export {
  ACCOUNT_TYPES,
  ACCOUNT_TYPE_LABELS,
  type Account,
  type AccountType,
  type CreateAccountInput,
  type UpdateAccountInput,
} from './types';
