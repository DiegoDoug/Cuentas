import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef, type ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { Select } from './Select';

function Options(): ReactNode {
  return (
    <>
      <option value="a">A</option>
      <option value="b">B</option>
    </>
  );
}

describe('Select', () => {
  it('renders a native select with its options', () => {
    render(
      <Select aria-label="Choice">
        <Options />
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: 'Choice' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'A' })).toBeInTheDocument();
  });

  it('sets aria-invalid when invalid', () => {
    render(
      <Select aria-label="Choice" isInvalid>
        <Options />
      </Select>,
    );
    expect(screen.getByRole('combobox', { name: 'Choice' })).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  });

  it('reports selection changes', async () => {
    const onChange = vi.fn();
    render(
      <Select aria-label="Choice" defaultValue="a" onChange={onChange}>
        <Options />
      </Select>,
    );
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Choice' }), 'b');
    expect(onChange).toHaveBeenCalled();
  });

  it('forwards the ref to the underlying select', () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select aria-label="Choice" ref={ref}>
        <Options />
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
