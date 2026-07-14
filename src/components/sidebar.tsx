import type { HTMLAttributes, ReactNode } from "react";
import { NavVariantContext } from "./navContext";

export type SidebarSize = "sm" | "md" | "lg";
export type SidebarSide = "start" | "end";

export interface SidebarProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Content of the scrollable main region. Typically a `<Nav orientation="vertical" />`. */
  children?: ReactNode;
  /** Pinned content above the scroll region (brand, workspace switcher). */
  header?: ReactNode;
  /** Pinned content below the scroll region (user menu, sign out). */
  footer?: ReactNode;
  /** Which edge of the parent to anchor to. Defaults to `"start"` (left in LTR). */
  side?: SidebarSide;
  /** Named width token. `sm` = 200px, `md` = 240px, `lg` = 280px. Defaults to `md`. */
  size?: SidebarSize;
  /** Promote from `position: sticky` to `position: fixed` so the sidebar frees the parent's layout entirely. Use for full-page app shells. */
  fixed?: boolean;
}

/**
 * A full-height side frame for primary navigation. Provides `header`, scroll
 * `main`, and `footer` regions; consumers drop a `Nav` (or anything) into the
 * main slot. Sticky by default; pass `fixed` for full-page shells.
 */
export function Sidebar({
  children,
  header,
  footer,
  side = "start",
  size = "md",
  fixed = false,
  className,
  ...rest
}: SidebarProps) {
  const classes = [
    "ink-sidebar",
    `ink-sidebar--${size}`,
    `ink-sidebar--${side}`,
    fixed ? "ink-sidebar--fixed" : "ink-sidebar--sticky",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <NavVariantContext.Provider value="list">
      <aside className={classes} {...rest}>
        {header ? <div className="ink-sidebar-header">{header}</div> : null}
        <div className="ink-sidebar-main">{children}</div>
        {footer ? <div className="ink-sidebar-footer">{footer}</div> : null}
      </aside>
    </NavVariantContext.Provider>
  );
}
