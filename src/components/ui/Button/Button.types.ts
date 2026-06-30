import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual intent. Defaults to `primary`. */
  readonly variant?: ButtonVariant;
  /** Control size. Defaults to `md`. */
  readonly size?: ButtonSize;
  /** Shows a spinner and marks the control busy/disabled. */
  readonly isLoading?: boolean;
  /** Stretch to the full width of the container. */
  readonly fullWidth?: boolean;
  readonly children?: ReactNode;
}
