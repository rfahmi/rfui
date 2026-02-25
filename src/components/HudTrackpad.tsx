import { useRef, useCallback } from "react";
import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";

export interface HudTrackpadProps {
  /** Current position. Both axes normalised from -1 to 1. */
  value: { x: number; y: number };
  /** Called with the new position when the user drags or clicks the pad. */
  onChange: (value: { x: number; y: number }) => void;
  /** Optional label displayed above the trackpad. */
  label?: string;
  /** Show axis labels (U/D/L/R) on the pad edges. @default true */
  showAxisLabels?: boolean;
  /** Show coordinate readout and centre button below the pad. @default true */
  showReadout?: boolean;
  /** Whether the trackpad is disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled 2D trackpad for controlling an (x, y) position.
 * Drag or click anywhere on the pad to set the value.
 *
 * Follows the RFUI steel-blue monochrome design language with crosshair
 * guides, a glowing cursor dot, and an optional coordinate readout.
 *
 * @example
 * ```tsx
 * <HudTrackpad value={pos} onChange={setPos} label="Gaze" />
 * ```
 */
export function HudTrackpad({
  value,
  onChange,
  label,
  showAxisLabels = true,
  showReadout = true,
  disabled,
  style,
}: HudTrackpadProps) {
  const padRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const pad = padRef.current;
      if (!pad) return;
      const rect = pad.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
      const y = Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));
      onChange({ x, y });
    },
    [onChange],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      draggingRef.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updateFromPointer(e.clientX, e.clientY);
    },
    [disabled, updateFromPointer],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!draggingRef.current) return;
      updateFromPointer(e.clientX, e.clientY);
    },
    [updateFromPointer],
  );

  const handlePointerUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  const dotLeft = ((value.x + 1) / 2) * 100;
  const dotTop = ((value.y + 1) / 2) * 100;

  return (
    <div style={{ opacity: disabled ? 0.5 : 1, ...style }}>
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: spacing.sm,
            fontWeight: 400,
            color: colors.hi,
            textTransform: "uppercase",
            fontSize: fontSizes.xs,
            letterSpacing: "0.1em",
          }}
        >
          ▸ {label}
        </label>
      )}

      <div
        ref={padRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1",
          border: `1px solid ${colors.border}`,
          background: "rgba(8, 16, 32, 0.6)",
          cursor: disabled ? "not-allowed" : "crosshair",
          touchAction: "none",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        {/* Crosshair lines */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: 0,
            right: 0,
            height: 1,
            background: colors.border,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: colors.border,
          }}
        />

        {/* Cursor dot */}
        <div
          style={{
            position: "absolute",
            left: `${dotLeft}%`,
            top: `${dotTop}%`,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: colors.hi,
            border: `2px solid ${colors.borderHi}`,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 8px ${colors.mid}`,
          }}
        />

        {/* Axis labels */}
        {showAxisLabels && (
          <>
            <span style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", fontSize: fontSizes.xs, color: colors.dim, letterSpacing: "0.1em" }}>U</span>
            <span style={{ position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)", fontSize: fontSizes.xs, color: colors.dim, letterSpacing: "0.1em" }}>D</span>
            <span style={{ position: "absolute", left: 6, top: "50%", transform: "translateY(-50%)", fontSize: fontSizes.xs, color: colors.dim }}>L</span>
            <span style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", fontSize: fontSizes.xs, color: colors.dim }}>R</span>
          </>
        )}
      </div>

      {/* Readout + centre button */}
      {showReadout && (
        <div
          style={{
            marginTop: spacing.xs,
            display: "flex",
            justifyContent: "space-between",
            fontSize: fontSizes.xs,
          }}
        >
          <span style={{ color: colors.dim }}>
            X: <span style={{ color: colors.hi }}>{value.x.toFixed(2)}</span>
          </span>
          <span style={{ color: colors.dim }}>
            Y: <span style={{ color: colors.hi }}>{value.y.toFixed(2)}</span>
          </span>
          <span
            style={{
              color: colors.mid,
              cursor: disabled ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
            onClick={() => !disabled && onChange({ x: 0, y: 0 })}
          >
            ◆ CENTER
          </span>
        </div>
      )}
    </div>
  );
}
