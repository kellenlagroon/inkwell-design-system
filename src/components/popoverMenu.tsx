import type { ReactNode } from "react";
import { Popover, type PopoverPlacement } from "./popover";

export interface PopoverMenuTriggerProps {
  open: boolean;
  onToggle: () => void;
}

export interface PopoverMenuProps {
  /** @deprecated Use `Popover mode="menu"` directly. */
  trigger: (props: PopoverMenuTriggerProps) => ReactNode;
  children?: ReactNode;
  menuClassName?: string;
  popoverClassName?: string;
  menuRole?: string;
  menuLabel?: string;
  placement?: PopoverPlacement;
}

/** @deprecated Use `Popover mode="menu"`. Retained for compatibility. */
export function PopoverMenu({
  trigger,
  children,
  menuClassName = "ink-popover-menu",
  popoverClassName = "ink-popover-surface",
  menuRole = "menu",
  menuLabel = "Menu",
  placement = "bottom-end",
}: PopoverMenuProps) {
  // A legacy `menuRole` could technically be changed by consumers, but the
  // unified component intentionally keeps the correct ARIA menu role.
  void menuRole;

  return (
    <Popover
      trigger={({ open, onToggle }) => trigger({ open, onToggle })}
      mode="menu"
      placement={placement}
      ariaLabel={menuLabel}
      rootClassName={menuClassName}
      className={popoverClassName}
    >
      {children}
    </Popover>
  );
}
