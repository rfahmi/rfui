import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";

export interface HudToggleProps {
  /** Whether the toggle is on. */
  value: boolean;
  /** Called when toggled. */
  onChange: (value: boolean) => void;
  /** Label shown to the right of the toggle. */
  label?: string;
  /** Alternative label shown when toggle is off. If omitted, `label` is used for both states. */
  offLabel?: string;
  /** Whether the toggle is disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled toggle switch with an optional label.
 * Follows the RFUI steel-blue monochrome design language.
 *
 * @example
 * ```tsx
 * <HudToggle value={enabled} onChange={setEnabled} label="ACTIVE" offLabel="DISABLED" />
 * ```
 */
export function HudToggle({
  value,
  onChange,
  label,
  offLabel,
  disabled,
  style,
}: HudToggleProps) {
  const displayLabel = value ? label : (offLabel ?? label);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      onClick={() => !disabled && onChange(!value)}
    >
      <div
        style={{
          width: 36,
          height: 18,
          borderRadius: 9,
          background: value ? colors.mid : "rgba(120, 160, 200, 0.12)",
          border: `1px solid ${colors.border}`,
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 2,
            left: value ? 18 : 2,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: value ? colors.hi : colors.dim,
            transition: "left 0.2s, background 0.2s",
          }}
        />
      </div>
      {displayLabel && (
        <span
          style={{
            fontSize: fontSizes.xs,
            color: value ? colors.hi : colors.dim,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            transition: "color 0.2s",
          }}
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
}
