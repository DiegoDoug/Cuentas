/**
 * Money helpers.
 *
 * Monetary amounts are stored as integer **minor units** (e.g. cents) so that
 * arithmetic stays exact and free of floating-point drift (docs/03_DATA_LAYER.md
 * §18). Formatting is generic and domain-agnostic, so it lives in `shared`
 * (docs/02_ARCHITECTURE.md §7).
 */

/** Number of minor units in one major unit for the given ISO 4217 currency. */
const minorUnitFactor = (currency: string): number => {
  // Intl exposes the currency's fraction-digit count; default to 2.
  const format = new Intl.NumberFormat(undefined, { style: 'currency', currency });
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  return 10 ** digits;
};

/** Convert a major-unit amount (e.g. dollars) to integer minor units (cents). */
export const toMinorUnits = (major: number, currency: string): number =>
  Math.round(major * minorUnitFactor(currency));

/** Convert integer minor units back to a major-unit number. */
export const toMajorUnits = (minor: number, currency: string): number =>
  minor / minorUnitFactor(currency);

/**
 * Format an integer minor-unit amount as a localized currency string, e.g.
 * `formatMoney(123456, 'USD')` → `"$1,234.56"`.
 */
export const formatMoney = (minor: number, currency: string): string =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(
    toMajorUnits(minor, currency),
  );
