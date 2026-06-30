import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Marks the field invalid; sets `aria-invalid` and error styling. */
  readonly isInvalid?: boolean;
}
