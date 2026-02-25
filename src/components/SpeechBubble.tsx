import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface SpeechBubbleProps {
  /** The text to display inside the bubble. */
  children: React.ReactNode;
  /** Whether the bubble is currently visible (controls enter/exit animation). */
  visible: boolean;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-themed speech bubble with enter/exit animations.
 * Designed to pair with the Banaspati avatar but works anywhere.
 *
 * Uses the RFUI steel-blue design language: monochrome panel background,
 * monospace font, subtle border accents, and a downward-pointing tail.
 *
 * @example
 * ```tsx
 * <SpeechBubble visible={showBubble}>
 *   Hello from the HUD!
 * </SpeechBubble>
 * ```
 */
export function SpeechBubble({ children, visible, style }: SpeechBubbleProps) {
  return (
    <>
      <style>{`
        @keyframes rfui-bubbleIn {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.7) translateY(6px); }
          100% { opacity: 1; transform: translateX(-50%) scale(1)   translateY(0); }
        }
        @keyframes rfui-bubbleOut {
          0%   { opacity: 1; transform: translateX(-50%) scale(1)   translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) scale(0.7) translateY(6px); }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          pointerEvents: "none",
          animation: visible
            ? "rfui-bubbleIn 0.28s cubic-bezier(0.34,1.56,0.64,1) forwards"
            : "rfui-bubbleOut 0.22s ease-in forwards",
          ...style,
        }}
      >
        <div
          style={{
            position: "relative",
            background: colors.panel,
            borderTop: `1px solid ${colors.borderHi}`,
            borderRight: `1px solid ${colors.borderHi}`,
            borderBottom: `1px solid ${colors.borderHi}`,
            borderLeft: `3px solid ${colors.borderHi}`,
            color: colors.hi,
            fontFamily: fontStack,
            fontSize: fontSizes.sm,
            fontWeight: 400,
            lineHeight: 1.55,
            letterSpacing: "0.04em",
            padding: `${spacing.sm}px ${spacing.lg}px`,
            maxWidth: 240,
            minWidth: 40,
            textAlign: "center",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {children}
        </div>

        {/* Tail — downward triangle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: -1,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "7px solid transparent",
              borderRight: "7px solid transparent",
              borderTop: `7px solid ${colors.borderHi}`,
            }}
          />
        </div>
        {/* Inner tail to match panel background */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: -9,
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: `6px solid rgba(12, 22, 42, 0.92)`,
            }}
          />
        </div>
      </div>
    </>
  );
}
