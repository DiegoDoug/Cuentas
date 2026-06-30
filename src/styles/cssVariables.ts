import { duration, fontSize, fontWeight, radius, shadows, spacing } from './tokens';

/**
 * Bridge between the TypeScript design tokens (the single source of truth) and
 * CSS. Non-color tokens never change at runtime, so they are emitted once as
 * CSS custom properties that stylesheets reference via `var(--…)`. This keeps
 * CSS free of hardcoded values (docs/04_DESIGN_SYSTEM.md §4) without duplicating
 * the token definitions.
 */
export const buildStaticTokenVariables = (): Record<string, string> => {
  const variables: Record<string, string> = {};

  for (const [key, value] of Object.entries(spacing)) {
    variables[`--space-${key}`] = value;
  }
  for (const [key, value] of Object.entries(radius)) {
    variables[`--radius-${key}`] = value;
  }
  for (const [key, value] of Object.entries(shadows)) {
    variables[`--shadow-${key}`] = value;
  }
  for (const [key, value] of Object.entries(duration)) {
    variables[`--duration-${key}`] = value;
  }
  for (const [key, value] of Object.entries(fontSize)) {
    variables[`--font-size-${key}`] = value;
  }
  for (const [key, value] of Object.entries(fontWeight)) {
    variables[`--font-weight-${key}`] = String(value);
  }

  return variables;
};
