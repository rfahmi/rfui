import { useRef, useLayoutEffect, useState } from "react";
import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudDocumentProps {
  /** Document title. */
  title: string;
  /** Short metadata line (e.g. date, type, author). */
  meta?: string;
  /** Glyph / character used as the document type icon. @default "◫" */
  icon?: string;
  /** Badge label shown in the top corner (e.g. "PDF", "TS"). */
  badge?: string;
  /** Whether this document is selected. */
  selected?: boolean;
  /** Corner that has the fold. @default "top-right" */
  foldCorner?: "top-right" | "top-left";
  /** Size of the folded corner (px). @default 20 */
  foldSize?: number;
  /** Whether the document is disabled. */
  disabled?: boolean;
  /** Click handler. */
  onClick?: () => void;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A compact HUD-styled document / file icon with a 2:3 aspect ratio and
 * folded-corner shape. Intended as a file picker tile — icon + title + optional
 * meta/badge only, no body preview.
 *
 * The border — including the diagonal fold edge — is drawn with an SVG overlay
 * for pixel-perfect rendering at any size.
 *
 * @example
 * ```tsx
 * <HudDocument
 *   title="MISSION BRIEF"
 *   meta="2026-02-25"
 *   badge="PDF"
 *   icon="◫"
 *   selected={active === "brief"}
 *   onClick={() => setActive("brief")}
 * />
 * ```
 */
export function HudDocument({
  title,
  meta,
  icon = "◫",
  badge,
  selected = false,
  foldCorner = "top-right",
  foldSize = 20,
  disabled = false,
  onClick,
  style,
}: HudDocumentProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 180, h: 120 });

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
  const panelBg = selected ? "rgba(14, 26, 52, 0.95)" : "rgba(10, 18, 36, 0.90)";

  // clip-path masks the content to the polygon shape
  const clipPath =
    foldCorner === "top-right"
      ? `polygon(0% 0%, calc(100% - ${foldSize}px) 0%, 100% ${foldSize}px, 100% 100%, 0% 100%)`
      : `polygon(${foldSize}px 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${foldSize}px)`;

  // SVG polygon points — inset 0.5px so stroke stays inside clip
  const s = 0.5;
  const { w, h } = dims;
  // Main outline
  const outlinePoints =
    foldCorner === "top-right"
      ? `${s},${s} ${w - foldSize - s},${s} ${w - s},${foldSize + s} ${w - s},${h - s} ${s},${h - s}`
      : `${foldSize + s},${s} ${w - s},${s} ${w - s},${h - s} ${s},${h - s} ${s},${foldSize + s}`;
  // Fold crease line (the inner diagonal)
  const foldX = foldCorner === "top-right" ? w - foldSize : foldSize;
  const creasePoints =
    foldCorner === "top-right"
      ? `${foldX - s},${s + 1} ${foldX - s},${foldSize - s} ${w - s - 1},${foldSize - s}`
      : `${foldX + s},${s + 1} ${foldX + s},${foldSize - s} ${s + 1},${foldSize - s}`;

  return (
    <div
      ref={panelRef}
      style={{
        position: "relative",
        clipPath,
        background: panelBg,
        aspectRatio: "2 / 3",
        minWidth: 120,
        fontFamily: fontStack,
        cursor: disabled ? "not-allowed" : onClick ? "pointer" : "default",
        opacity: disabled ? 0.45 : 1,
        userSelect: "none",
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
      {/* ── SVG border + fold crease ──────────────────────── */}
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
        {/* Outer outline */}
        <polygon
          points={outlinePoints}
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          style={{ transition: "stroke 0.2s" }}
        />
        {/* Fold crease */}
        <polyline
          points={creasePoints}
          fill="none"
          stroke={accentColor}
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>

      {/* Selected glow */}
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

      {/* ── Content ──────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: spacing.sm,
          paddingLeft: foldCorner === "top-left" ? foldSize + spacing.xs : spacing.sm,
          paddingRight: foldCorner === "top-right" ? foldSize + spacing.xs : spacing.sm,
        }}
      >
        {/* Mounting hole */}
        <div
          style={{
            position: "absolute",
            top: 8,
            ...(foldCorner === "top-right" ? { left: 10 } : { right: 10 }),
            width: 6,
            height: 6,
            borderRadius: "50%",
            border: `1px solid ${colors.dim}`,
            background: "rgba(8,16,32,0.9)",
          }}
        />

        {/* Top row: icon + badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <span
            style={{
              color: selected ? colors.mid : colors.dim,
              fontSize: fontSizes.lg,
              lineHeight: 1,
              transition: "color 0.2s",
              marginTop: spacing.xs,
            }}
          >
            {icon}
          </span>
          {badge && (
            <span
              style={{
                fontSize: "0.48rem",
                color: colors.dim,
                border: `1px solid ${colors.border}`,
                padding: `1px ${spacing.xs}px`,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontFamily: fontStack,
                marginTop: foldCorner === "top-right" ? foldSize + 2 : spacing.xs,
                marginRight: foldCorner === "top-right" ? 0 : foldSize + 2,
              }}
            >
              {badge}
            </span>
          )}
        </div>

        {/* Bottom: title + meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              color: selected ? colors.hi : colors.text,
              fontSize: fontSizes.xs,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontWeight: 400,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              transition: "color 0.2s",
            }}
          >
            {title}
          </span>
          {meta && (
            <span
              style={{
                color: colors.dim,
                fontSize: "0.55rem",
                letterSpacing: "0.05em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {meta}
            </span>
          )}
        </div>
      </div>

      {/* Selected bottom bar */}
      {selected && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: foldCorner === "top-left" ? foldSize : 0,
            right: foldCorner === "top-right" ? foldSize : 0,
            height: 2,
            background: foldCorner === "top-left"
              ? `linear-gradient(90deg, transparent, ${colors.borderHi})`
              : `linear-gradient(90deg, ${colors.borderHi}, transparent)`,
            zIndex: 3,
          }}
        />
      )}
    </div>
  );
}
