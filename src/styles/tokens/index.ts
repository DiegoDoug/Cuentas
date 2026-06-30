/** Design token barrel. The single entry point for primitive design tokens. */

export { palette, type Palette } from './colors';
export { spacing, SPACING_BASE_PX, type Spacing, type SpacingToken } from './spacing';
export {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  type FontFamily,
  type FontSize,
  type FontWeight,
  type LineHeight,
  type LetterSpacing,
} from './typography';
export { radius, type Radius, type RadiusToken } from './radius';
export { shadows, type Shadows, type ShadowToken } from './shadows';
export { opacity, type Opacity, type OpacityToken } from './opacity';
export { duration, easing, type Duration, type Easing, type DurationToken } from './motion';
export { zIndex, type ZIndex, type ZIndexToken } from './zIndex';
