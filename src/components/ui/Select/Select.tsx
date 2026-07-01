import { forwardRef } from 'react';

import './Select.css';
import type { SelectProps } from './Select.types';

/**
 * Native select primitive.
 *
 * A single token-styled `<select>` (docs/04_DESIGN_SYSTEM.md §10). Options are
 * supplied as `<option>` children so native keyboard and screen-reader support
 * is preserved.
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { isInvalid = false, className, children, ...rest },
  ref,
) {
  const classes = ['c-select', className].filter(Boolean).join(' ');

  return (
    <select ref={ref} className={classes} aria-invalid={isInvalid || undefined} {...rest}>
      {children}
    </select>
  );
});
