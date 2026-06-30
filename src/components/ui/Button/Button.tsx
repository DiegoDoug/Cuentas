import { forwardRef } from 'react';

import './Button.css';
import type { ButtonProps } from './Button.types';

/**
 * Button primitive.
 *
 * A single, variant-driven control — never duplicate it for style differences
 * (docs/04_DESIGN_SYSTEM.md §10/§20). Accessible by default: it renders a real
 * `<button>`, exposes `aria-busy` while loading, and is disabled when loading.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'md',
    isLoading = false,
    fullWidth = false,
    type = 'button',
    disabled,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isDisabled = disabled ?? isLoading;
  const classes = ['c-button', className].filter(Boolean).join(' ');

  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth ? 'true' : undefined}
      aria-busy={isLoading}
      disabled={isDisabled}
      {...rest}
    >
      {isLoading ? <span className="c-button__spinner" aria-hidden="true" /> : null}
      <span className="c-button__label">{children}</span>
    </button>
  );
});
