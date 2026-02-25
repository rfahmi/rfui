/**
 * @rfahmi/rfui — RFUI Design Language
 *
 * A military-grade steel-blue design system for React.
 * Provides tokens, layout components, and utility hooks
 * for building HUD-style interfaces.
 *
 * @example
 * ```tsx
 * import { HudPage, PanelHeader, PanelCorners, colors, useClock } from "@rfahmi/rfui";
 * ```
 */

/* ── Design tokens ─────────────────────────────────────── */
export {
  colors,
  fontSizes,
  spacing,
  breakpoints,
  dotGridBackground,
  ambientGradient,
  vignetteBackground,
  tokens,
} from "./tokens";
export type { Colors, FontSizes, Spacing, Breakpoints } from "./tokens";
export { default } from "./tokens";

/* ── Style fragments ───────────────────────────────────── */
export { panelStyle, cornerStyle, sectionLabelStyle, fontStack } from "./styles";

/* ── Components ────────────────────────────────────────── */
export {
  PanelCorners,
  PanelHeader,
  HudBackground,
  HudPage,
  HudTextField,
  SpeechBubble,
  HudToggle,
  HudTrackpad,
  HudSelect,
  HudCheckbox,
  HudCheckboxGroup,
  HudNavBar,
  HudGrid,
  HudGridItem,
  HudFolder,
  HudDocument,
} from "./components";
export type {
  PanelHeaderProps,
  HudPageProps,
  HudTextFieldProps,
  SpeechBubbleProps,
  HudToggleProps,
  HudTrackpadProps,
  HudSelectProps,
  HudSelectOption,
  HudCheckboxProps,
  HudCheckboxGroupProps,
  HudCheckboxOption,
  HudNavBarProps,
  HudNavItem,
  HudGridProps,
  HudGridItemProps,
  ResponsiveCols,
  HudFolderProps,
  HudDocumentProps,
} from "./components";

/* ── Hooks ─────────────────────────────────────────────── */
export { useWindowWidth, useClock } from "./hooks";
