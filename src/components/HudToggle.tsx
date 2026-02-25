import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudToggleProps {
  /** Whether the toggle is on. */
  value: boolean;
  /** Called when toggled. */
  onChange: (value: boolean) => void;
  /** Label shown beside the toggle. */
  label?: string;
  /** Alternative label shown when toggle is off. If omitted, `label` is used for both states. */
  offLabel?: string;
  /** Whether the toggle is disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled toggle switch with a mechanical, angular aesthetic.
 *
 * @example
 * ```tsx
 * <HudToggle value={enabled} onChange={setEnabled} label="ACTIVE" offLabel="STANDBY" />
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
  const trackW = 64;
  const trackH = 22;
  const knobW = 22;
  const pad = 0;
  // space available for the status label (opposite side from knob)
  const labelSpace = trackW - knobW - pad * 3;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: spacing.sm,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        userSelect: "none",
        fontFamily: fontStack,
        ...style,
      }}
      onClick={() => !disabled && onChange(!value)}
    >
      {/* ── Track ───────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          width: trackW,
          height: trackH,
          boxSizing: "border-box",
          background: value
            ? "rgba(100, 168, 224, 0.12)"
            : "rgba(8, 16, 32, 0.6)",
          border: `1px solid ${value ? colors.borderHi : colors.border}`,
          transition: "background 0.25s, border-color 0.25s",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        {/* Fill sweep */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: value ? "100%" : "0%",
            height: "100%",
            background: `linear-gradient(90deg, rgba(100,168,224,0.18) 0%, rgba(120,190,255,0.06) 100%)`,
            transition: "width 0.25s ease",
            pointerEvents: "none",
          }}
        />

        {/* Sliding knob */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: value ? trackW - knobW - 2 : 0,
            width: knobW,
            height: "100%",
            boxSizing: "border-box",
            background: value
              ? `linear-gradient(135deg, ${colors.borderHi} 0%, rgba(100,168,224,0.7) 100%)`
              : `rgba(60, 90, 120, 0.6)`,
            border: `1px solid ${value ? colors.borderHi : "rgba(100,140,180,0.35)"}`,
            transition: "left 0.25s ease, background 0.25s, border-color 0.25s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Knob grip lines */}
          <div style={{ display: "flex", gap: 2, pointerEvents: "none" }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                style={{
                  width: 1,
                  height: 6,
                  background: value ? "rgba(255,255,255,0.5)" : "rgba(140,180,210,0.4)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Status label — sits in the gap opposite the knob */}
        <span
          style={{
            position: "absolute",
            top: "50%",
            ...(value
              ? { left: pad + 3, width: labelSpace, textAlign: "left" }
              : { right: pad + 3, width: labelSpace, textAlign: "right" }),
            transform: "translateY(-50%)",
            fontSize: "0.44rem",
            letterSpacing: "0.12em",
            color: value ? colors.borderHi : colors.dim,
            fontFamily: fontStack,
            transition: "color 0.25s",
            pointerEvents: "none",
            overflow: "hidden",
          }}
        >
          {value ? "ON" : "OFF"}
        </span>
      </div>

      {/* ── External label ───────────────────────────────── */}
      {displayLabel && (
        <span
          style={{
            fontSize: fontSizes.xs,
            color: value ? colors.hi : colors.mid,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            transition: "color 0.25s",
          }}
        >
          {displayLabel}
        </span>
      )}
    </div>
  );
}
