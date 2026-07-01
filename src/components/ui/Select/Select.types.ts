import type { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Marks the field invalid; sets `aria-invalid` and error styling. */
  readonly isInvalid?: boolean;
}
