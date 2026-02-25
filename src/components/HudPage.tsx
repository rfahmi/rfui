import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";
import { HudBackground } from "./HudBackground";

export interface HudPageProps {
  children: React.ReactNode;
  /** Override max content width. Default: 1100. */
  maxWidth?: number;
  style?: React.CSSProperties;
}

/**
 * Opinionated page wrapper: applies the RFUI background colour, font stack,
 * mounts `HudBackground`, and centres content inside a max-width container.
 *
 * @example
 * ```tsx
 * import { HudPage } from "@rfahmi/rfui";
 *
 * export default function App() {
 *   return (
 *     <HudPage>
 *       <h1>Hello RFUI</h1>
 *     </HudPage>
 *   );
 * }
 * ```
 */
export function HudPage({ children, maxWidth = 1100, style }: HudPageProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: colors.bg,
        color: colors.text,
        padding: `${spacing.xxl}px ${spacing.xl}px`,
        fontFamily: fontStack,
        fontSize: fontSizes.sm,
        lineHeight: 1.55,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <HudBackground />
      <div
        style={{
          maxWidth,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
}
