import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudCheckboxOption {
  /** Machine-readable value. */
  value: string;
  /** Human-readable label. Falls back to `value` when omitted. */
  label?: string;
  /** Prevents toggling this option. */
  disabled?: boolean;
}

/* ── Single checkbox ───────────────────────────────────── */

export interface HudCheckboxProps {
  /** Whether the checkbox is checked. */
  checked: boolean;
  /** Called when the checkbox state changes. */
  onChange: (checked: boolean) => void;
  /** Label displayed next to the checkbox. */
  label?: string;
  /** Whether the checkbox is in an indeterminate state. */
  indeterminate?: boolean;
  /** Whether the checkbox is disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled single checkbox.
 * Follows the RFUI steel-blue monochrome design language.
 *
 * @example
 * ```tsx
 * <HudCheckbox checked={accepted} onChange={setAccepted} label="CONFIRM LAUNCH" />
 * ```
 */
export function HudCheckbox({
  checked,
  onChange,
  label,
  indeterminate = false,
  disabled,
  style,
}: HudCheckboxProps) {
  const indicator = indeterminate ? "—" : checked ? "✕" : null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: spacing.sm,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        userSelect: "none",
        ...style,
      }}
      onClick={() => !disabled && onChange(!checked)}
      role="checkbox"
      aria-checked={indeterminate ? "mixed" : checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === " " || e.key === "Enter")) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      {/* Box */}
      <div
        style={{
          width: 16,
          height: 16,
          flexShrink: 0,
          border: `1px solid ${checked || indeterminate ? colors.borderHi : colors.border}`,
          background: checked || indeterminate
            ? "rgba(120, 160, 200, 0.12)"
            : "rgba(8, 16, 32, 0.9)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.15s, background 0.15s",
          position: "relative",
        }}
      >
        {indicator && (
          <span
            style={{
              color: colors.hi,
              fontSize: "0.6rem",
              lineHeight: 1,
              fontFamily: fontStack,
              letterSpacing: 0,
              fontWeight: 700,
            }}
          >
            {indicator}
          </span>
        )}
        {/* Corner accents */}
        <div style={{ position: "absolute", top: -1, left: -1, width: 4, height: 4, borderTop: `1px solid ${colors.borderHi}`, borderLeft: `1px solid ${colors.borderHi}` }} />
        <div style={{ position: "absolute", top: -1, right: -1, width: 4, height: 4, borderTop: `1px solid ${colors.borderHi}`, borderRight: `1px solid ${colors.borderHi}` }} />
        <div style={{ position: "absolute", bottom: -1, left: -1, width: 4, height: 4, borderBottom: `1px solid ${colors.borderHi}`, borderLeft: `1px solid ${colors.borderHi}` }} />
        <div style={{ position: "absolute", bottom: -1, right: -1, width: 4, height: 4, borderBottom: `1px solid ${colors.borderHi}`, borderRight: `1px solid ${colors.borderHi}` }} />
      </div>

      {/* Label */}
      {label && (
        <span
          style={{
            fontSize: fontSizes.xs,
            color: checked ? colors.hi : colors.text,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontFamily: fontStack,
            transition: "color 0.15s",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

/* ── Checkbox group ────────────────────────────────────── */

export interface HudCheckboxGroupProps {
  /** Currently selected values. */
  value: string[];
  /** Called with the new selection when any checkbox changes. */
  onChange: (value: string[]) => void;
  /** Options to render. */
  options: HudCheckboxOption[];
  /** Group label displayed above the checkboxes. */
  label?: string;
  /** Layout direction. @default "vertical" */
  direction?: "vertical" | "horizontal";
  /** Whether all checkboxes are disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A group of HUD-styled checkboxes sharing a common selection state.
 *
 * @example
 * ```tsx
 * <HudCheckboxGroup
 *   label="Systems"
 *   value={active}
 *   onChange={setActive}
 *   options={[
 *     { value: "radar",  label: "Radar" },
 *     { value: "shield", label: "Shields" },
 *     { value: "drive",  label: "Drive" },
 *   ]}
 * />
 * ```
 */
export function HudCheckboxGroup({
  value,
  onChange,
  options,
  label,
  direction = "vertical",
  disabled,
  style,
}: HudCheckboxGroupProps) {
  const toggle = (opt: string) => {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt],
    );
  };

  return (
    <div style={{ ...style }}>
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
        style={{
          display: "flex",
          flexDirection: direction === "horizontal" ? "row" : "column",
          gap: direction === "horizontal" ? spacing.lg : spacing.sm,
          flexWrap: direction === "horizontal" ? "wrap" : undefined,
        }}
      >
        {options.map((opt) => (
          <HudCheckbox
            key={opt.value}
            checked={value.includes(opt.value)}
            onChange={() => toggle(opt.value)}
            label={opt.label ?? opt.value}
            disabled={disabled || opt.disabled}
          />
        ))}
      </div>
    </div>
  );
}
