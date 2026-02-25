# @rfahmi/rfui

> **RFUI** — a military-grade steel-blue design language for React.  
> Tokens · Components · Hooks

[![npm version](https://img.shields.io/npm/v/@rfahmi/rfui)](https://www.npmjs.com/package/@rfahmi/rfui)
[![license](https://img.shields.io/npm/l/@rfahmi/rfui)](LICENSE)

---

## Overview

RFUI provides a cohesive set of visual primitives for building HUD-style,
monochrome interfaces in React:

| Export type | Contents |
|---|---|
| **Design tokens** | Color palette, type scale, spacing scale, breakpoints |
| **Components** | `HudPage`, `HudBackground`, `PanelCorners`, `PanelHeader` |
| **Hooks** | `useWindowWidth`, `useClock` |
| **Style fragments** | `panelStyle`, `cornerStyle`, `sectionLabelStyle`, `fontStack` |

---

## Installation

```bash
npm install @rfahmi/rfui
# peer dependency
npm install react
```

---

## Quick Start

```tsx
import {
  HudPage,
  PanelHeader,
  PanelCorners,
  panelStyle,
  colors,
  useClock,
  useWindowWidth,
} from "@rfahmi/rfui";

export default function App() {
  const clock = useClock();
  const { isMobile } = useWindowWidth();

  return (
    <HudPage>
      <div style={{ ...panelStyle, padding: isMobile ? 16 : 24 }}>
        <PanelCorners />
        <PanelHeader>System Status</PanelHeader>

        <p style={{ color: colors.hi }}>{clock}</p>
        <p style={{ color: colors.mid }}>All systems nominal</p>
      </div>
    </HudPage>
  );
}
```

---

## API Reference

### Design Tokens

```ts
import { colors, fontSizes, spacing, breakpoints } from "@rfahmi/rfui";
```

#### `colors`

| Key | Value | Purpose |
|---|---|---|
| `bg` | `#0a0f1e` | Page / canvas background |
| `panel` | `rgba(12,22,42,0.75)` | Panel fill |
| `hi` | `#c8d8ec` | High-emphasis text |
| `mid` | `#7a90a8` | Secondary text |
| `dim` | `#3e5068` | Muted / decorative |
| `text` | `#9aacbf` | Default body text |
| `border` | `rgba(120,160,200,0.2)` | Subtle border |
| `borderHi` | `rgba(160,190,220,0.35)` | Highlighted border |

#### `fontSizes`

`xs` · `sm` · `base` · `lg` · `xl` · `xxl` · `title`

#### `spacing`

`xs` (4) · `sm` (8) · `md` (12) · `lg` (16) · `xl` (24) · `xxl` (32) — all in **px**

#### `breakpoints`

`mobile` (768) · `tablet` (1024) · `desktop` (1280) — all in **px**

---

### Components

#### `<HudPage>`

Full-page wrapper. Sets background, font, mounts `HudBackground`, and constrains content width.

```tsx
<HudPage maxWidth={1200}>…</HudPage>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Page content |
| `maxWidth` | `number` | `1100` | Max content width (px) |
| `style` | `CSSProperties` | — | Overrides for the outer container |

#### `<HudBackground>`

Three fixed overlay layers: dotted grid · ambient blue gradient · dark vignette.
Included automatically by `HudPage`, but can be used alone.

#### `<PanelCorners>`

Four L-shaped bracket accents at each corner of the nearest `position: relative` parent.

```tsx
<div style={{ position: "relative" }}>
  <PanelCorners />
  …content…
</div>
```

#### `<PanelHeader>`

Uppercase label with a diamond glyph and a bottom separator line.

```tsx
<PanelHeader>Control Panel</PanelHeader>
```

---

### Hooks

#### `useWindowWidth()`

```ts
const { windowWidth, isMobile, isTablet, isDesktop } = useWindowWidth();
```

#### `useClock(locale?, options?)`

```ts
const clock = useClock();           // "14:30:00"
const clock = useClock("en-US");    // "2:30:00 PM"
```

---

### Style Fragments

```ts
import { panelStyle, cornerStyle, sectionLabelStyle, fontStack } from "@rfahmi/rfui";
```

- **`panelStyle`** — `React.CSSProperties` for a standard panel box  
- **`cornerStyle(pos)`** — generates a corner bracket style given a position record  
- **`sectionLabelStyle`** — uppercase, letter-spaced section label  
- **`fontStack`** — monospace font family string  

---

## License

MIT © Nur Fahmi
