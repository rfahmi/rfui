import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * RFUI Design Tokens
 *
 * Muted steel-blue monochrome palette for HUD / military-grade interfaces.
 * Import the token objects directly or use individual named exports.
 */
declare const colors: {
    /** Page / canvas background */
    readonly bg: "#0a0f1e";
    /** Panel fill (semi-transparent) */
    readonly panel: "rgba(12, 22, 42, 0.75)";
    /** High-emphasis text / labels */
    readonly hi: "#c8d8ec";
    /** Mid-emphasis text / secondary */
    readonly mid: "#7a90a8";
    /** Low-emphasis / muted / decorative */
    readonly dim: "#3e5068";
    /** Default body text */
    readonly text: "#9aacbf";
    /** Subtle border */
    readonly border: "rgba(120, 160, 200, 0.2)";
    /** Highlighted / hovered border */
    readonly borderHi: "rgba(160, 190, 220, 0.35)";
};
type Colors = typeof colors;
declare const fontSizes: {
    readonly xs: "0.65rem";
    readonly sm: "0.75rem";
    readonly base: "0.85rem";
    readonly lg: "1rem";
    readonly xl: "1.25rem";
    readonly xxl: "2rem";
    readonly title: "2.5rem";
};
type FontSizes = typeof fontSizes;
declare const spacing: {
    readonly xs: 4;
    readonly sm: 8;
    readonly md: 12;
    readonly lg: 16;
    readonly xl: 24;
    readonly xxl: 32;
};
type Spacing = typeof spacing;
declare const breakpoints: {
    readonly mobile: 768;
    readonly tablet: 1024;
    readonly desktop: 1280;
};
type Breakpoints = typeof breakpoints;
/**
 * Ready-to-use CSS background-image value for the dotted grid.
 * Apply to a `position: fixed; inset: 0` overlay element.
 */
declare const dotGridBackground: {
    readonly backgroundImage: "radial-gradient(circle, rgba(100,150,200,0.15) 1px, transparent 1px)";
    readonly backgroundSize: "24px 24px";
};
/**
 * Ambient gradient layers (top-center cool blue + secondary).
 * Apply as `background` on a `position: fixed; inset: 0` overlay element.
 */
declare const ambientGradient: string;
/**
 * Dark-edge vignette overlay.
 * Apply as `background` on a `position: fixed; inset: 0` overlay element.
 */
declare const vignetteBackground = "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)";
/** All tokens in a single object — mirrors the legacy C / F / SPACE locals. */
declare const tokens: {
    readonly colors: {
        /** Page / canvas background */
        readonly bg: "#0a0f1e";
        /** Panel fill (semi-transparent) */
        readonly panel: "rgba(12, 22, 42, 0.75)";
        /** High-emphasis text / labels */
        readonly hi: "#c8d8ec";
        /** Mid-emphasis text / secondary */
        readonly mid: "#7a90a8";
        /** Low-emphasis / muted / decorative */
        readonly dim: "#3e5068";
        /** Default body text */
        readonly text: "#9aacbf";
        /** Subtle border */
        readonly border: "rgba(120, 160, 200, 0.2)";
        /** Highlighted / hovered border */
        readonly borderHi: "rgba(160, 190, 220, 0.35)";
    };
    readonly fontSizes: {
        readonly xs: "0.65rem";
        readonly sm: "0.75rem";
        readonly base: "0.85rem";
        readonly lg: "1rem";
        readonly xl: "1.25rem";
        readonly xxl: "2rem";
        readonly title: "2.5rem";
    };
    readonly spacing: {
        readonly xs: 4;
        readonly sm: 8;
        readonly md: 12;
        readonly lg: 16;
        readonly xl: 24;
        readonly xxl: 32;
    };
    readonly breakpoints: {
        readonly mobile: 768;
        readonly tablet: 1024;
        readonly desktop: 1280;
    };
};

declare const panelStyle: React.CSSProperties;
type Position = Partial<Record<"top" | "bottom" | "left" | "right", number | string>>;
/**
 * Returns a style object for a single corner bracket accent.
 * Pass `{ top, left }`, `{ top, right }`, `{ bottom, left }`, or `{ bottom, right }`.
 */
declare const cornerStyle: (pos: Position) => React.CSSProperties;
declare const sectionLabelStyle: React.CSSProperties;
declare const fontStack = "'Consolas', 'SF Mono', 'Fira Code', 'Courier New', monospace";

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
declare function PanelCorners(): react_jsx_runtime.JSX.Element;

interface PanelHeaderProps {
    /** Label displayed in the panel header bar. */
    children: string;
}
/**
 * A standardised panel header with a decorative diamond glyph, uppercase
 * label, and a bottom separator line.
 *
 * @example
 * ```tsx
 * <PanelHeader>Entity Viewer</PanelHeader>
 * ```
 */
declare function PanelHeader({ children }: PanelHeaderProps): react_jsx_runtime.JSX.Element;

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
declare function HudBackground(): react_jsx_runtime.JSX.Element;

interface HudPageProps {
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
declare function HudPage({ children, maxWidth, style }: HudPageProps): react_jsx_runtime.JSX.Element;

interface HudTextFieldProps {
    /** Current value of the input. */
    value: string;
    /** Called when the input value changes. */
    onChange: (value: string) => void;
    /** Placeholder text shown when empty. */
    placeholder?: string;
    /** Optional label displayed above the input. */
    label?: string;
    /** Text for the submit button. Renders a form with button when provided. */
    submitLabel?: string;
    /** Called when the form is submitted (Enter key or button click). */
    onSubmit?: () => void;
    /** Whether the input is disabled. */
    disabled?: boolean;
    /** Override styles on the outer wrapper. */
    style?: React.CSSProperties;
}
/**
 * A HUD-styled text input with optional label and submit button.
 * Follows the RFUI steel-blue monochrome design language.
 *
 * @example
 * ```tsx
 * <HudTextField
 *   label="Message"
 *   value={text}
 *   onChange={setText}
 *   submitLabel="SEND"
 *   onSubmit={handleSend}
 *   placeholder="Type something…"
 * />
 * ```
 */
declare function HudTextField({ value, onChange, placeholder, label, submitLabel, onSubmit, disabled, style, }: HudTextFieldProps): react_jsx_runtime.JSX.Element;

interface SpeechBubbleProps {
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
declare function SpeechBubble({ children, visible, style }: SpeechBubbleProps): react_jsx_runtime.JSX.Element;

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
declare function useWindowWidth(): {
    windowWidth: number;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
};

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
declare function useClock(locale?: string, options?: Intl.DateTimeFormatOptions): string;

export { type Breakpoints, type Colors, type FontSizes, HudBackground, HudPage, type HudPageProps, HudTextField, type HudTextFieldProps, PanelCorners, PanelHeader, type PanelHeaderProps, type Spacing, SpeechBubble, type SpeechBubbleProps, ambientGradient, breakpoints, colors, cornerStyle, tokens as default, dotGridBackground, fontSizes, fontStack, panelStyle, sectionLabelStyle, spacing, tokens, useClock, useWindowWidth, vignetteBackground };
