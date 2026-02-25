import { useContext, createContext } from "react";
import type React from "react";
import { spacing as defaultSpacing, breakpoints } from "../tokens";
import { useWindowWidth } from "../hooks";

/* ── Types ─────────────────────────────────────────────── */

/** Responsive column spec — pass a number for a fixed layout, or an object for breakpoint-aware columns. */
export type ResponsiveCols =
  | number
  | { mobile?: number; tablet?: number; desktop?: number };

export interface HudGridProps {
  /** Number of columns, or a responsive map. @default 12 */
  cols?: ResponsiveCols;
  /** Uniform gap between cells (px). Overridden by `rowGap`/`colGap`. */
  gap?: number;
  /** Row gap override (px). */
  rowGap?: number;
  /** Column gap override (px). */
  colGap?: number;
  /** Align items along the row axis. @default "stretch" */
  alignItems?: React.CSSProperties["alignItems"];
  /** Justify items along the column axis. @default "stretch" */
  justifyItems?: React.CSSProperties["justifyItems"];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export interface HudGridItemProps {
  /** How many columns this item spans. @default 1 */
  span?: number | ResponsiveCols;
  /** How many rows this item spans. @default 1 */
  rowSpan?: number;
  /** Explicit column start line (1-based). */
  colStart?: number;
  /** Explicit row start line (1-based). */
  rowStart?: number;
  /** Align this item along the row axis. */
  alignSelf?: React.CSSProperties["alignSelf"];
  /** Justify this item along the column axis. */
  justifySelf?: React.CSSProperties["justifySelf"];
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/* ── Context: share total cols count down to items ─────── */

const GridContext = createContext<{ totalCols: number }>({ totalCols: 12 });

/* ── Helpers ───────────────────────────────────────────── */

function resolveCols(
  cols: ResponsiveCols,
  windowWidth: number,
): number {
  if (typeof cols === "number") return cols;
  if (windowWidth < breakpoints.mobile)  return cols.mobile  ?? cols.tablet  ?? cols.desktop ?? 1;
  if (windowWidth < breakpoints.desktop) return cols.tablet  ?? cols.desktop ?? cols.mobile  ?? 2;
  return cols.desktop ?? cols.tablet ?? cols.mobile ?? 12;
}

/* ── HudGrid ───────────────────────────────────────────── */

/**
 * A flexible CSS-grid wrapper that follows the RFUI token system.
 * Supports fixed and responsive column counts, uniform or axis-specific
 * gaps, and exposes `HudGridItem` for fine-grained cell control.
 *
 * @example
 * ```tsx
 * // Fixed 3-column grid
 * <HudGrid cols={3} gap={16}>
 *   <HudGridItem span={2}>Wide cell</HudGridItem>
 *   <HudGridItem>Narrow cell</HudGridItem>
 * </HudGrid>
 *
 * // Responsive grid
 * <HudGrid cols={{ mobile: 1, tablet: 2, desktop: 4 }} gap={16}>
 *   …
 * </HudGrid>
 * ```
 */
export function HudGrid({
  cols = 12,
  gap,
  rowGap,
  colGap,
  alignItems = "stretch",
  justifyItems = "stretch",
  children,
  style,
}: HudGridProps) {
  const { windowWidth } = useWindowWidth();
  const resolvedCols = resolveCols(cols, windowWidth);

  const gapPx = gap ?? defaultSpacing.lg;

  return (
    <GridContext.Provider value={{ totalCols: resolvedCols }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${resolvedCols}, 1fr)`,
          gap: gap !== undefined ? gapPx : undefined,
          rowGap: rowGap !== undefined ? rowGap : gap !== undefined ? gapPx : defaultSpacing.lg,
          columnGap: colGap !== undefined ? colGap : gap !== undefined ? gapPx : defaultSpacing.lg,
          alignItems,
          justifyItems,
          width: "100%",
          ...style,
        }}
      >
        {children}
      </div>
    </GridContext.Provider>
  );
}

/* ── HudGridItem ───────────────────────────────────────── */

/**
 * A grid cell for use inside `HudGrid`. Controls column/row span and
 * placement overrides.
 *
 * @example
 * ```tsx
 * <HudGridItem span={2} rowSpan={2}>Tall wide cell</HudGridItem>
 * <HudGridItem colStart={3}>Pinned to column 3</HudGridItem>
 * ```
 */
export function HudGridItem({
  span = 1,
  rowSpan,
  colStart,
  rowStart,
  alignSelf,
  justifySelf,
  children,
  style,
}: HudGridItemProps) {
  const { totalCols } = useContext(GridContext);
  const { windowWidth } = useWindowWidth();

  const resolvedSpan = typeof span === "number"
    ? span
    : resolveCols(span, windowWidth);

  // Clamp span so it never exceeds totalCols
  const clampedSpan = Math.min(resolvedSpan, totalCols);

  return (
    <div
      style={{
        gridColumn: colStart
          ? `${colStart} / span ${clampedSpan}`
          : `span ${clampedSpan}`,
        gridRow: rowStart
          ? `${rowStart} / span ${rowSpan ?? 1}`
          : rowSpan
          ? `span ${rowSpan}`
          : undefined,
        alignSelf,
        justifySelf,
        minWidth: 0, // prevent overflow in narrow spans
        ...style,
      }}
    >
      {children}
    </div>
  );
}
