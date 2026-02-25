import { colors, fontSizes, spacing } from "../tokens";

export interface PanelHeaderProps {
  /** Label displayed in the panel header bar. */
  children: string;
}

/**
 * A standardised panel header with a decorative diamond glyph, uppercase
 * label, and a bottom separator line.
 *
 * @example
 * ```tsx
 * <PanelHeader>Entity Viewer</PanelHeader>
 * ```
 */
export function PanelHeader({ children }: PanelHeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.xl,
        paddingBottom: spacing.md,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <span style={{ color: colors.dim, fontSize: fontSizes.xs }}>◆</span>
      <span
        style={{
          color: colors.hi,
          fontSize: fontSizes.base,
          fontWeight: 400,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
        }}
      >
        {children}
      </span>
    </div>
  );
}
