import {
  dotGridBackground,
  ambientGradient,
  vignetteBackground,
} from "../tokens";

/**
 * Full-viewport layered background: dotted grid + ambient gradient + vignette.
 * Renders three `position: fixed; inset: 0; pointer-events: none` layers.
 * Mount once at the root of your page.
 *
 * @example
 * ```tsx
 * <div style={{ position: "relative", minHeight: "100vh" }}>
 *   <HudBackground />
 *   …page content…
 * </div>
 * ```
 */
export function HudBackground() {
  return (
    <>
      {/* Dotted grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          ...dotGridBackground,
          pointerEvents: "none",
        }}
      />
      {/* Ambient gradient */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: ambientGradient,
          pointerEvents: "none",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: vignetteBackground,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
