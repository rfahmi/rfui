import { useState, useRef, useEffect, useCallback } from "react";
import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudSelectOption {
  /** Machine-readable value. */
  value: string;
  /** Human-readable label. Falls back to `value` when omitted. */
  label?: string;
  /** Prevents selection of this option. */
  disabled?: boolean;
}

export interface HudSelectProps {
  /** Currently selected value. */
  value: string;
  /** Called with the new value when the user selects an option. */
  onChange: (value: string) => void;
  /** Available options. */
  options: HudSelectOption[];
  /** Optional label displayed above the select. */
  label?: string;
  /** Placeholder shown when no value is selected. */
  placeholder?: string;
  /** Whether the select is disabled. */
  disabled?: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled custom select / dropdown component.
 * Renders a fully keyboard-accessible custom dropdown following the RFUI
 * steel-blue monochrome design language.
 *
 * @example
 * ```tsx
 * <HudSelect
 *   label="Target"
 *   value={target}
 *   onChange={setTarget}
 *   options={[
 *     { value: "alpha", label: "Alpha" },
 *     { value: "bravo", label: "Bravo" },
 *   ]}
 *   placeholder="Select target…"
 * />
 * ```
 */
export function HudSelect({
  value,
  onChange,
  options,
  label,
  placeholder = "Select…",
  disabled,
  style,
}: HudSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const displayLabel = selectedOption?.label ?? selectedOption?.value;

  const close = useCallback(() => setOpen(false), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, close]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen((o) => !o);
    }
    if (e.key === "Escape") close();
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const enabled = options.filter((o) => !o.disabled);
      const idx = enabled.findIndex((o) => o.value === value);
      const next = e.key === "ArrowDown"
        ? enabled[Math.min(idx + 1, enabled.length - 1)]
        : enabled[Math.max(idx - 1, 0)];
      if (next) onChange(next.value);
    }
  };

  const triggerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    padding: `${spacing.sm}px ${spacing.md}px`,
    border: `1px solid ${open ? colors.borderHi : colors.border}`,
    background: "rgba(8, 16, 32, 0.9)",
    color: displayLabel ? colors.hi : colors.dim,
    fontSize: fontSizes.sm,
    fontFamily: fontStack,
    letterSpacing: "0.04em",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.5 : 1,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative", ...style }}>
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

      {/* Trigger */}
      <div
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
        style={triggerStyle}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        onMouseEnter={(e) => { if (!disabled) (e.currentTarget as HTMLDivElement).style.borderColor = colors.borderHi; }}
        onMouseLeave={(e) => { if (!disabled && !open) (e.currentTarget as HTMLDivElement).style.borderColor = colors.border; }}
      >
        <span>{displayLabel ?? placeholder}</span>
        <span
          style={{
            color: colors.dim,
            fontSize: fontSizes.xs,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          ▼
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 100,
            border: `1px solid ${colors.borderHi}`,
            borderTop: "none",
            background: "rgba(8, 16, 32, 0.97)",
            backdropFilter: "blur(8px)",
            boxShadow: `0 8px 24px rgba(0,0,0,0.5)`,
            overflow: "hidden",
            animation: "rfui-selectIn 0.14s ease-out",
          }}
        >
          <style>{`
            @keyframes rfui-selectIn {
              from { opacity: 0; transform: translateY(-6px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                aria-disabled={opt.disabled}
                style={{
                  padding: `${spacing.sm}px ${spacing.md}px`,
                  fontSize: fontSizes.sm,
                  fontFamily: fontStack,
                  letterSpacing: "0.04em",
                  color: opt.disabled ? colors.dim : isSelected ? colors.hi : colors.text,
                  background: isSelected
                    ? "rgba(120, 160, 200, 0.1)"
                    : "transparent",
                  cursor: opt.disabled ? "not-allowed" : "pointer",
                  opacity: opt.disabled ? 0.45 : 1,
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.sm,
                  borderLeft: isSelected
                    ? `2px solid ${colors.borderHi}`
                    : "2px solid transparent",
                  transition: "background 0.12s, border-color 0.12s",
                }}
                onClick={() => {
                  if (!opt.disabled) {
                    onChange(opt.value);
                    close();
                  }
                }}
                onMouseEnter={(e) => {
                  if (!opt.disabled) (e.currentTarget as HTMLDivElement).style.background = "rgba(120, 160, 200, 0.07)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = isSelected
                    ? "rgba(120, 160, 200, 0.1)"
                    : "transparent";
                }}
              >
                <span style={{ color: isSelected ? colors.mid : "transparent", fontSize: fontSizes.xs }}>◆</span>
                {opt.label ?? opt.value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
