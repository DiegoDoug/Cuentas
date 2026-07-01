import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Input } from './Input';

describe('Input', () => {
  it('renders a native text input by default', () => {
    render(<Input aria-label="Field" />);
    const input = screen.getByLabelText('Field');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('sets aria-invalid only when invalid', () => {
    const { rerender } = render(<Input aria-label="Field" />);
    expect(screen.getByLabelText('Field')).not.toHaveAttribute('aria-invalid');
    rerender(<Input aria-label="Field" isInvalid />);
    expect(screen.getByLabelText('Field')).toHaveAttribute('aria-invalid', 'true');
  });

  it('forwards typing to onChange', async () => {
    const onChange = vi.fn();
    render(<Input aria-label="Field" onChange={onChange} />);
    await userEvent.type(screen.getByLabelText('Field'), 'hi');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards the ref to the underlying input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input aria-label="Field" ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
