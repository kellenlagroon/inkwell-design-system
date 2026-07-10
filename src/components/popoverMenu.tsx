import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, ReactNode } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function getFocusables(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetWidth > 0 || el.offsetHeight > 0,
  );
}

export interface PopoverMenuTriggerProps {
  open: boolean;
  onToggle: () => void;
}

export interface PopoverMenuProps {
  /** Render prop for the trigger; receives the open state and a toggle handler. */
  trigger: (props: PopoverMenuTriggerProps) => ReactNode;
  children?: ReactNode;
  menuClassName?: string;
  popoverClassName?: string;
  menuRole?: string;
  menuLabel?: string;
}

/**
 * A trigger + popover surface. Fully keyboard operable: ArrowDown opens and
 * focuses the first item; Up/Down and Home/End move between items; Escape
 * closes and returns focus to the trigger; Tab closes.
 */
export function PopoverMenu({
  trigger,
  children,
  menuClassName = "header-account-menu",
  popoverClassName = "header-account-popover",
  menuRole = "menu",
  menuLabel = "Menu",
}: PopoverMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerFocusRef = useRef<HTMLElement | null>(null);
  const onToggle = () => setOpen((v) => !v);

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    function handleOutside(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  // On open, remember the trigger and move focus to the first menu item.
  useEffect(() => {
    if (!open) return;
    triggerFocusRef.current = document.activeElement as HTMLElement | null;
    getFocusables(popoverRef.current)[0]?.focus();
  }, [open]);

  function moveFocus(dir: 1 | -1) {
    const items = getFocusables(popoverRef.current);
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next = (index + dir + items.length) % items.length;
    items[next]!.focus();
  }

  function focusEdge(edge: "first" | "last") {
    const items = getFocusables(popoverRef.current);
    if (items.length === 0) return;
    (edge === "first" ? items[0]! : items[items.length - 1]!).focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    switch (event.key) {
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
          triggerFocusRef.current?.focus();
        }
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!open) setOpen(true);
        else moveFocus(1);
        break;
      case "ArrowUp":
        if (open) {
          event.preventDefault();
          moveFocus(-1);
        }
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          focusEdge("first");
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          focusEdge("last");
        }
        break;
      case "Tab":
        if (open) setOpen(false);
        break;
    }
  }

  return (
    <div
      ref={containerRef}
      className={[menuClassName, open ? "open" : ""].filter(Boolean).join(" ")}
      onKeyDown={onKeyDown}
    >
      {trigger({ open, onToggle })}
      <div ref={popoverRef} className={popoverClassName} role={menuRole} aria-label={menuLabel}>
        {children}
      </div>
    </div>
  );
}
