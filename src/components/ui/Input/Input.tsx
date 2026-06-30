import { forwardRef } from 'react';

import './Input.css';
import type { InputProps } from './Input.types';

/**
 * Text input primitive.
 *
 * A single token-styled control (docs/04_DESIGN_SYSTEM.md §10). Renders a real
 * `<input>` so labels, validation, and assistive tech work natively; callers
 * associate a `<label>` and describe errors via `aria-describedby`.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { isInvalid = false, type = 'text', className, ...rest },
  ref,
) {
  const classes = ['c-input', className].filter(Boolean).join(' ');

  return (
    <input
      ref={ref}
      type={type}
      className={classes}
      aria-invalid={isInvalid || undefined}
      {...rest}
    />
  );
});
