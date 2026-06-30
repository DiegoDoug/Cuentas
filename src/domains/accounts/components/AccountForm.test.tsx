import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import type { Account } from '../types';
import { AccountForm } from './AccountForm';

const noop = (): void => undefined;

const existingAccount: Account = {
  id: 'a1',
  name: 'Savings',
  type: 'savings',
  currency: 'USD',
  initialBalance: 2500,
  createdAt: 0,
  updatedAt: 0,
  deletedAt: null,
  syncStatus: 'synced',
  version: 1,
  deviceId: 'test',
};

describe('AccountForm', () => {
  it('renders empty create fields by default', () => {
    render(<AccountForm onSubmit={vi.fn()} onCancel={noop} />);
    expect(screen.getByLabelText('Name')).toHaveValue('');
    expect(screen.getByLabelText('Currency')).toHaveValue('USD');
    expect(screen.getByRole('button', { name: 'Create account' })).toBeInTheDocument();
  });

  it('blocks submit and shows field errors for empty input', async () => {
    const onSubmit = vi.fn();
    render(<AccountForm onSubmit={onSubmit} onCancel={noop} />);

    await userEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Name is required.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid opening balance.')).toBeInTheDocument();
  });

  it('submits a valid input with the balance converted to minor units', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined);
    render(<AccountForm onSubmit={onSubmit} onCancel={noop} />);

    await userEvent.type(screen.getByLabelText('Name'), 'Wallet');
    await userEvent.type(screen.getByLabelText('Opening balance'), '100.50');
    await userEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'Wallet',
      type: 'checking',
      currency: 'USD',
      initialBalance: 10050,
    });
  });

  it('prefills fields when editing and labels the submit accordingly', () => {
    render(<AccountForm account={existingAccount} onSubmit={vi.fn()} onCancel={noop} />);
    expect(screen.getByLabelText('Name')).toHaveValue('Savings');
    expect(screen.getByLabelText('Opening balance')).toHaveValue('25');
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('invokes onCancel when cancelled', async () => {
    const onCancel = vi.fn();
    render(<AccountForm onSubmit={vi.fn()} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
