import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudTextFieldProps {
  /** Current value of the input. */
  value: string;
  /** Called when the input value changes. */
  onChange: (value: string) => void;
  /** Placeholder text shown when empty. */
  placeholder?: string;
  /** Optional label displayed above the input. */
  label?: string;
  /** Text for the submit button. Renders a form with button when provided. */
  submitLabel?: string;
  /** Called when the form is submitted (Enter key or button click). */
  onSubmit?: () => void;
  /** Whether the input is disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

const inputStyle: React.CSSProperties = {
  flex: 1,
  padding: `${spacing.sm}px ${spacing.md}px`,
  border: `1px solid ${colors.border}`,
  background: "rgba(8, 16, 32, 0.9)",
  color: colors.hi,
  fontSize: fontSizes.sm,
  fontFamily: fontStack,
  fontWeight: 400,
  letterSpacing: "0.04em",
  outline: "none",
  transition: "border-color 0.2s",
  lineHeight: 1.55,
};

const buttonStyle: React.CSSProperties = {
  padding: `${spacing.sm}px ${spacing.lg}px`,
  background: "rgba(120, 160, 200, 0.06)",
  color: colors.hi,
  border: `1px solid ${colors.border}`,
  cursor: "pointer",
  fontWeight: 400,
  textTransform: "uppercase",
  fontFamily: fontStack,
  fontSize: fontSizes.xs,
  letterSpacing: "0.1em",
  transition: "all 0.2s",
  lineHeight: 1.55,
};

/**
 * A HUD-styled text input with optional label and submit button.
 * Follows the RFUI steel-blue monochrome design language.
 *
 * @example
 * ```tsx
 * <HudTextField
 *   label="Message"
 *   value={text}
 *   onChange={setText}
 *   submitLabel="SEND"
 *   onSubmit={handleSend}
 *   placeholder="Type something…"
 * />
 * ```
 */
export function HudTextField({
  value,
  onChange,
  placeholder,
  label,
  submitLabel,
  onSubmit,
  disabled,
  style,
}: HudTextFieldProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.();
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors.borderHi;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors.border;
  };

  const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(120, 160, 200, 0.14)";
    e.currentTarget.style.borderColor = colors.borderHi;
  };

  const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.background = "rgba(120, 160, 200, 0.06)";
    e.currentTarget.style.borderColor = colors.border;
  };

  const labelEl = label ? (
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
  ) : null;

  const inputEl = (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      style={inputStyle}
    />
  );

  if (submitLabel) {
    return (
      <div style={style}>
        {labelEl}
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: spacing.sm }}>
          {inputEl}
          <button
            type="submit"
            disabled={disabled}
            style={buttonStyle}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={handleBtnLeave}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={style}>
      {labelEl}
      {inputEl}
    </div>
  );
}
