import { cornerStyle } from "../styles";

/**
 * Renders four L-shaped bracket accents at each corner of the nearest
 * `position: relative` ancestor. Place as a direct child of any panel.
 *
 * @example
 * ```tsx
 * <div style={{ position: "relative" }}>
 *   <PanelCorners />
 *   …content…
 * </div>
 * ```
 */
export function PanelCorners() {
  return (
    <>
      <div style={cornerStyle({ top: 6, left: 6 })} />
      <div style={cornerStyle({ top: 6, right: 6 })} />
      <div style={cornerStyle({ bottom: 6, left: 6 })} />
      <div style={cornerStyle({ bottom: 6, right: 6 })} />
    </>
  );
}
