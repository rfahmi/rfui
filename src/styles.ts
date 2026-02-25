import type React from "react";
import { colors } from "./tokens";

/* ── Panel container ───────────────────────────────────── */
export const panelStyle: React.CSSProperties = {
  background: colors.panel,
  border: `1px solid ${colors.border}`,
  padding: 24,
  position: "relative",
};

/* ── Corner accent helpers ─────────────────────────────── */
type Position = Partial<Record<"top" | "bottom" | "left" | "right", number | string>>;

/**
 * Returns a style object for a single corner bracket accent.
 * Pass `{ top, left }`, `{ top, right }`, `{ bottom, left }`, or `{ bottom, right }`.
 */
export const cornerStyle = (pos: Position): React.CSSProperties => ({
  position: "absolute",
  ...pos,
  width: 12,
  height: 12,
  ...(pos.top !== undefined && pos.left  !== undefined && { borderTop: `1px solid ${colors.borderHi}`, borderLeft:  `1px solid ${colors.borderHi}` }),
  ...(pos.top !== undefined && pos.right !== undefined && { borderTop: `1px solid ${colors.borderHi}`, borderRight: `1px solid ${colors.borderHi}` }),
  ...(pos.bottom !== undefined && pos.left  !== undefined && { borderBottom: `1px solid ${colors.borderHi}`, borderLeft:  `1px solid ${colors.borderHi}` }),
  ...(pos.bottom !== undefined && pos.right !== undefined && { borderBottom: `1px solid ${colors.borderHi}`, borderRight: `1px solid ${colors.borderHi}` }),
});

/* ── Section label ─────────────────────────────────────── */
export const sectionLabelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 8,
  fontWeight: 400,
  color: colors.hi,
  textTransform: "uppercase",
  fontSize: "0.65rem",
  letterSpacing: "0.1em",
};

/* ── Base font stack ───────────────────────────────────── */
export const fontStack =
  "'Consolas', 'SF Mono', 'Fira Code', 'Courier New', monospace";
