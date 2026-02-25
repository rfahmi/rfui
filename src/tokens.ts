/**
 * RFUI Design Tokens
 *
 * Muted steel-blue monochrome palette for HUD / military-grade interfaces.
 * Import the token objects directly or use individual named exports.
 */

/* ── Color palette ─────────────────────────────────────── */
export const colors = {
  /** Page / canvas background */
  bg:       "#080d1a",
  /** Panel fill (semi-transparent) */
  panel:    "rgba(10, 20, 44, 0.80)",
  /** High-emphasis text / labels */
  hi:       "#b8daff",
  /** Mid-emphasis text / secondary */
  mid:      "#6a9ec8",
  /** Low-emphasis / muted / decorative */
  dim:      "#3d5a7a",
  /** Default body text */
  text:     "#8abcd8",
  /** Subtle border */
  border:   "rgba(100, 168, 224, 0.28)",
  /** Highlighted / hovered border */
  borderHi: "rgba(120, 190, 255, 0.50)",
} as const;

export type Colors = typeof colors;

/* ── Type scale ────────────────────────────────────────── */
export const fontSizes = {
  xs:    "0.65rem",
  sm:    "0.75rem",
  base:  "0.85rem",
  lg:    "1rem",
  xl:    "1.25rem",
  xxl:   "2rem",
  title: "2.5rem",
} as const;

export type FontSizes = typeof fontSizes;

/* ── Spacing scale (px values) ─────────────────────────── */
export const spacing = {
  xs:  4,
  sm:  8,
  md:  12,
  lg:  16,
  xl:  24,
  xxl: 32,
} as const;

export type Spacing = typeof spacing;

/* ── Breakpoints ───────────────────────────────────────── */
export const breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export type Breakpoints = typeof breakpoints;

/* ── Background layers ─────────────────────────────────── */
/**
 * Ready-to-use CSS background-image value for the dotted grid.
 * Apply to a `position: fixed; inset: 0` overlay element.
 */
export const dotGridBackground = {
  backgroundImage: `radial-gradient(circle, rgba(100,150,200,0.15) 1px, transparent 1px)`,
  backgroundSize: "24px 24px",
} as const;

/**
 * Ambient gradient layers (top-center cool blue + secondary).
 * Apply as `background` on a `position: fixed; inset: 0` overlay element.
 */
export const ambientGradient = `
  radial-gradient(ellipse 80% 50% at 50% 0%, rgba(30, 60, 100, 0.35) 0%, transparent 70%),
  radial-gradient(ellipse 60% 40% at 80% 20%, rgba(20, 50, 90, 0.2) 0%, transparent 60%)
`.trim();

/**
 * Dark-edge vignette overlay.
 * Apply as `background` on a `position: fixed; inset: 0` overlay element.
 */
export const vignetteBackground =
  "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)";

/* ── Convenience bundle ────────────────────────────────── */
/** All tokens in a single object — mirrors the legacy C / F / SPACE locals. */
export const tokens = {
  colors,
  fontSizes,
  spacing,
  breakpoints,
} as const;

export default tokens;
