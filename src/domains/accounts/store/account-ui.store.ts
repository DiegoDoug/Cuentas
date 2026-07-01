import { create } from 'zustand';

/**
 * Accounts UI store.
 *
 * Holds transient presentation state for the accounts screen — which form (if
 * any) is open. This is UI state, so Zustand owns it (docs/03_DATA_LAYER.md
 * §6 explicitly allows dialog/selection state); the accounts themselves live in
 * Dexie and are never duplicated here. Single responsibility — not a God store.
 */

export type AccountFormState =
  | { readonly mode: 'closed' }
  | { readonly mode: 'create' }
  | { readonly mode: 'edit'; readonly accountId: string };

interface AccountUiState {
  readonly form: AccountFormState;
}

interface AccountUiActions {
  readonly openCreateForm: () => void;
  readonly openEditForm: (accountId: string) => void;
  readonly closeForm: () => void;
}

type AccountUiStore = AccountUiState & AccountUiActions;

const useAccountUiStore = create<AccountUiStore>((set) => ({
  form: { mode: 'closed' },
  openCreateForm: () => {
    set({ form: { mode: 'create' } });
  },
  openEditForm: (accountId) => {
    set({ form: { mode: 'edit', accountId } });
  },
  closeForm: () => {
    set({ form: { mode: 'closed' } });
  },
}));

// Selectors — subscribe to the narrowest slice (docs/03_DATA_LAYER.md §6).
export const useAccountForm = (): AccountFormState => useAccountUiStore((state) => state.form);
export const useOpenCreateForm = (): AccountUiActions['openCreateForm'] =>
  useAccountUiStore((state) => state.openCreateForm);
export const useOpenEditForm = (): AccountUiActions['openEditForm'] =>
  useAccountUiStore((state) => state.openEditForm);
export const useCloseForm = (): AccountUiActions['closeForm'] =>
  useAccountUiStore((state) => state.closeForm);
