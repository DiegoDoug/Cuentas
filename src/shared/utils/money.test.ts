import { describe, expect, it } from 'vitest';

import { formatMoney, toMajorUnits, toMinorUnits } from './money';

describe('money', () => {
  it('converts major units to integer minor units', () => {
    expect(toMinorUnits(12.34, 'USD')).toBe(1234);
    expect(toMinorUnits(0, 'USD')).toBe(0);
    expect(toMinorUnits(-5.5, 'USD')).toBe(-550);
  });

  it('rounds to the nearest minor unit', () => {
    // 0.125 is exactly representable, so 12.5 rounds up deterministically.
    expect(toMinorUnits(0.125, 'USD')).toBe(13);
    expect(toMinorUnits(0.124, 'USD')).toBe(12);
  });

  it('respects zero-decimal currencies', () => {
    expect(toMinorUnits(1000, 'JPY')).toBe(1000);
    expect(toMajorUnits(1000, 'JPY')).toBe(1000);
  });

  it('round-trips minor and major units', () => {
    expect(toMajorUnits(toMinorUnits(99.99, 'EUR'), 'EUR')).toBeCloseTo(99.99, 5);
  });

  it('formats minor units as a localized currency string', () => {
    // Locale-independent assertions: digits and separators only.
    const formatted = formatMoney(123456, 'USD');
    expect(formatted).toMatch(/1[.,\s]?234[.,]56/);
  });
});
