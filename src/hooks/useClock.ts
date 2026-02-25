import { useState, useEffect } from "react";

/**
 * Returns the current time as a formatted string, updating every second.
 *
 * @param locale BCP 47 locale string. Default: `"en-GB"` (24-hour HH:MM:SS).
 * @param options `Intl.DateTimeFormatOptions` passed to `toLocaleTimeString`.
 *
 * @example
 * ```tsx
 * const clock = useClock();          // "14:30:00"
 * const clock = useClock("en-US");   // "2:30:00 PM"
 * ```
 */
export function useClock(
  locale: string = "en-GB",
  options?: Intl.DateTimeFormatOptions
): string {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString(locale, options));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [locale, options]);

  return time;
}
