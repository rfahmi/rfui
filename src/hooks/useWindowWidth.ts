import { useState, useEffect } from "react";
import { breakpoints } from "../tokens";

/**
 * Tracks `window.innerWidth` and re-renders on resize.
 * Returns `{ windowWidth, isMobile, isTablet, isDesktop }`.
 *
 * @example
 * ```tsx
 * const { isMobile } = useWindowWidth();
 * return <div style={{ padding: isMobile ? 12 : 24 }}>…</div>;
 * ```
 */
export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handle = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);

  return {
    windowWidth,
    isMobile:  windowWidth < breakpoints.mobile,
    isTablet:  windowWidth >= breakpoints.mobile && windowWidth < breakpoints.desktop,
    isDesktop: windowWidth >= breakpoints.desktop,
  };
}
