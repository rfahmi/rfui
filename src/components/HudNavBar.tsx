import { useState } from "react";
import type React from "react";
import { colors, fontSizes, spacing } from "../tokens";
import { fontStack } from "../styles";

export interface HudNavItem {
  /** Unique identifier for this item. */
  id: string;
  /** Display label. */
  label: string;
  /** Optional icon / glyph character shown before the label. */
  icon?: string;
  /** Nested child items (one level supported). */
  children?: Omit<HudNavItem, "children">[];
  /** Whether this item is disabled. */
  disabled?: boolean;
}

export interface HudNavBarProps {
  /** Navigation items. */
  items: HudNavItem[];
  /** Currently active item id. */
  activeId?: string;
  /** Called when the user clicks an item. */
  onSelect?: (id: string) => void;
  /** Optional title shown at the top of the nav bar. */
  title?: string;
  /** Width of the nav bar. @default 220 */
  width?: number | string;
  /** Override styles on the outer wrapper. */
  style?: React.CSSProperties;
}

/**
 * A HUD-styled vertical navigation bar with support for nested menu items.
 * Groups automatically expand / collapse on click.
 *
 * @example
 * ```tsx
 * <HudNavBar
 *   title="Navigation"
 *   activeId={page}
 *   onSelect={setPage}
 *   items={[
 *     { id: "dashboard", label: "Dashboard", icon: "◈" },
 *     {
 *       id: "systems",
 *       label: "Systems",
 *       icon: "◉",
 *       children: [
 *         { id: "radar",  label: "Radar" },
 *         { id: "shield", label: "Shields" },
 *       ],
 *     },
 *   ]}
 * />
 * ```
 */
export function HudNavBar({
  items,
  activeId,
  onSelect,
  title,
  width = 220,
  style,
}: HudNavBarProps) {
  // Track which parent items are open; default: open the parent of active item
  const defaultOpen = new Set<string>();
  items.forEach((item) => {
    if (item.children?.some((c) => c.id === activeId)) defaultOpen.add(item.id);
  });
  const [openGroups, setOpenGroups] = useState<Set<string>>(defaultOpen);

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const itemBase = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    padding: `${spacing.sm}px ${spacing.md}px`,
    fontSize: fontSizes.sm,
    fontFamily: fontStack,
    letterSpacing: "0.05em",
    color: active ? colors.hi : disabled ? colors.dim : colors.text,
    background: active ? "rgba(120, 160, 200, 0.1)" : "transparent",
    borderLeft: active ? `2px solid ${colors.borderHi}` : "2px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.45 : 1,
    transition: "background 0.15s, border-color 0.15s, color 0.15s",
  });

  const childBase = (active: boolean, disabled?: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    padding: `${spacing.xs}px ${spacing.md}px ${spacing.xs}px ${spacing.xl + spacing.sm}px`,
    fontSize: fontSizes.xs,
    fontFamily: fontStack,
    letterSpacing: "0.06em",
    color: active ? colors.hi : disabled ? colors.dim : colors.mid,
    background: active ? "rgba(120, 160, 200, 0.08)" : "transparent",
    borderLeft: active ? `2px solid ${colors.border}` : "2px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    userSelect: "none",
    opacity: disabled ? 0.45 : 1,
    textTransform: "uppercase",
    transition: "background 0.15s, color 0.15s",
  });

  return (
    <nav
      style={{
        width,
        background: "rgba(8, 16, 32, 0.85)",
        border: `1px solid ${colors.border}`,
        fontFamily: fontStack,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Corner accents */}
      <div style={{ position: "absolute", top: 4, left: 4, width: 8, height: 8, borderTop: `1px solid ${colors.borderHi}`, borderLeft: `1px solid ${colors.borderHi}` }} />
      <div style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderTop: `1px solid ${colors.borderHi}`, borderRight: `1px solid ${colors.borderHi}` }} />
      <div style={{ position: "absolute", bottom: 4, left: 4, width: 8, height: 8, borderBottom: `1px solid ${colors.borderHi}`, borderLeft: `1px solid ${colors.borderHi}` }} />
      <div style={{ position: "absolute", bottom: 4, right: 4, width: 8, height: 8, borderBottom: `1px solid ${colors.borderHi}`, borderRight: `1px solid ${colors.borderHi}` }} />

      {/* Title */}
      {title && (
        <div
          style={{
            padding: `${spacing.md}px ${spacing.md}px`,
            borderBottom: `1px solid ${colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: spacing.sm,
          }}
        >
          <span style={{ color: colors.dim, fontSize: fontSizes.xs }}>◆</span>
          <span
            style={{
              color: colors.hi,
              fontSize: fontSizes.xs,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 400,
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* Items */}
      <div style={{ paddingTop: spacing.xs, paddingBottom: spacing.xs }}>
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openGroups.has(item.id);
          const isActive = item.id === activeId;

          return (
            <div key={item.id}>
              {/* Top-level row */}
              <div
                style={itemBase(isActive, item.disabled)}
                onClick={() => {
                  if (item.disabled) return;
                  if (hasChildren) {
                    toggleGroup(item.id);
                  } else {
                    onSelect?.(item.id);
                  }
                }}
                onMouseEnter={(e) => {
                  if (!item.disabled && !isActive)
                    (e.currentTarget as HTMLDivElement).style.background = "rgba(120, 160, 200, 0.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                {/* Icon */}
                {item.icon && (
                  <span style={{ color: isActive ? colors.mid : colors.dim, fontSize: fontSizes.xs, flexShrink: 0, width: 14, textAlign: "center" }}>
                    {item.icon}
                  </span>
                )}

                {/* Label */}
                <span style={{ flex: 1, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {item.label}
                </span>

                {/* Expand chevron */}
                {hasChildren && (
                  <span
                    style={{
                      color: colors.dim,
                      fontSize: "0.55rem",
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                    }}
                  >
                    ▼
                  </span>
                )}
              </div>

              {/* Children */}
              {hasChildren && isOpen && (
                <div
                  style={{
                    borderLeft: `1px solid ${colors.border}`,
                    marginLeft: spacing.md + spacing.sm,
                    animation: "rfui-navExpand 0.18s ease-out",
                  }}
                >
                  <style>{`
                    @keyframes rfui-navExpand {
                      from { opacity: 0; transform: translateY(-4px); }
                      to   { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>
                  {item.children!.map((child) => {
                    const isChildActive = child.id === activeId;
                    return (
                      <div
                        key={child.id}
                        style={childBase(isChildActive, child.disabled)}
                        onClick={() => {
                          if (!child.disabled) onSelect?.(child.id);
                        }}
                        onMouseEnter={(e) => {
                          if (!child.disabled && !isChildActive)
                            (e.currentTarget as HTMLDivElement).style.background = "rgba(120, 160, 200, 0.05)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isChildActive)
                            (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                      >
                        <span style={{ color: isChildActive ? colors.border : "transparent", fontSize: "0.5rem", flexShrink: 0 }}>◆</span>
                        {child.icon && (
                          <span style={{ color: colors.dim, fontSize: fontSizes.xs }}>{child.icon}</span>
                        )}
                        {child.label}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
