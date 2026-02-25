import { useRef, useLayoutEffect, useState } from "react";
import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudFolderProps {
  /** Folder title displayed on the face. */
  title: string;
  /** Optional sub-label or metadata line. */
  subtitle?: string;
  /** Whether this folder is in a selected / active state. */
  selected?: boolean;
  /** Numeric count / badge shown in the bottom-right corner (e.g. number of files). */
  count?: number;
  /** Corner that is cut. @default "top-left" */
  cutCorner?: "top-left" | "top-right";
  /** Size of the diagonal cut (px). @default 28 */
  cutSize?: number;
  /** Whether the folder is disabled. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: () => void;
  /** Override styles on the outermost wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled single-layer folder with a cut-corner shape.
 * The border — including the diagonal cut edge — is drawn with an SVG
 * overlay so every line renders pixel-perfectly regardless of element size.
 *
 * @example
 * ```tsx
 * <HudFolder
 *   title="SECTOR_16"
 *   subtitle="Special Project"
 *   count={5}
 *   selected={active === "sector16"}
 *   onClick={() => setActive("sector16")}
 * />
 * ```
 */
export function HudFolder({
  title,
  subtitle,
  selected = false,
  count,
  cutCorner = "top-left",
  cutSize = 28,
  disabled = false,
  onClick,
  style,
}: HudFolderProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 200, h: 120 });

  // Track actual rendered size for the SVG polygon
  useLayoutEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const accentColor = selected ? colors.borderHi : colors.border;
  const panelBg = selected ? "rgba(14, 26, 52, 0.95)" : "rgba(10, 18, 36, 0.92)";

  // clip-path on the wrapper so content is also masked to the shape
  const clipPath =
    cutCorner === "top-left"
      ? `polygon(${cutSize}px 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${cutSize}px)`
      : `polygon(0% 0%, calc(100% - ${cutSize}px) 0%, 100% ${cutSize}px, 100% 100%, 0% 100%)`;

  // SVG polygon points — inset by 0.5px so the 1px stroke stays inside the clip
  const s = 0.5;
  const { w, h } = dims;
  const svgPoints =
    cutCorner === "top-left"
      ? `${cutSize + s},${s} ${w - s},${s} ${w - s},${h - s} ${s},${h - s} ${s},${cutSize + s}`
      : `${s},${s} ${w - cutSize - s},${s} ${w - s},${cutSize + s} ${w - s},${h - s} ${s},${h - s}`;

  return (
    <div
      ref={panelRef}
      style={{
        position: "relative",
        clipPath,
        background: panelBg,
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
        opacity: disabled ? 0.45 : 1,
        userSelect: "none",
        aspectRatio: "1 / 1",
        minWidth: 120,
        transition: "background 0.2s",
        ...style,
      }}
      onClick={() => !disabled && onClick?.()}
      onMouseEnter={() => {
        if (!disabled && !selected && panelRef.current)
          panelRef.current.style.background = "rgba(18, 32, 60, 0.95)";
      }}
      onMouseLeave={() => {
        if (!selected && panelRef.current)
          panelRef.current.style.background = panelBg;
      }}
    >
      {/* ── SVG border overlay (draws all edges incl. diagonal) ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        <polygon
          points={svgPoints}
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          style={{ transition: "stroke 0.2s" }}
        />
      </svg>

      {/* Selected glow inset */}
      {selected && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(120,160,200,0.04)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Content ────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: `${spacing.lg}px ${spacing.lg}px ${spacing.lg}px ${
            cutCorner === "top-left" ? cutSize + spacing.sm : spacing.lg
          }px`,
          paddingRight: cutCorner === "top-right" ? cutSize + spacing.sm : spacing.lg,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Mounting hole */}
        <div
          style={{
            position: "absolute",
            top: 10,
            ...(cutCorner === "top-left" ? { right: 14 } : { left: 14 }),
            width: 8,
            height: 8,
            borderRadius: "50%",
            border: `1px solid ${colors.dim}`,
            background: "rgba(8,16,32,0.9)",
          }}
        />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <span
            style={{
              color: selected ? colors.hi : colors.text,
              fontSize: fontSizes.sm,
              fontFamily: fontStack,
              fontWeight: 400,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              lineHeight: 1.3,
              transition: "color 0.2s",
            }}
          >
            {title}
          </span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: spacing.md,
          }}
        >
          {subtitle && (
            <span
              style={{
                color: colors.dim,
                fontSize: fontSizes.xs,
                fontFamily: fontStack,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                lineHeight: 1.4,
              }}
            >
              {subtitle}
            </span>
          )}
          {count !== undefined && (
            <span
              style={{
                marginLeft: "auto",
                color: colors.dim,
                fontSize: "0.55rem",
                fontFamily: fontStack,
                letterSpacing: "0.05em",
                flexShrink: 0,
              }}
            >
              {count.toString().padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Selected indicator bar */}
        {selected && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: cutCorner === "top-left" ? cutSize : 0,
              right: cutCorner === "top-right" ? cutSize : 0,
              height: 2,
              background: cutCorner === "top-left"
                ? `linear-gradient(90deg, transparent, ${colors.borderHi})`
                : `linear-gradient(90deg, ${colors.borderHi}, transparent)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
