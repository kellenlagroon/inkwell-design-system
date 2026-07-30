import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, KeyboardEvent, ReactNode } from "react";

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
    (element) => element.offsetWidth > 0 || element.offsetHeight > 0,
  );
}

function oppositePlacement(placement: PopoverPlacement): PopoverPlacement {
  const [side, alignment] = placement.split("-") as [string, string | undefined];
  const opposite = side === "top" ? "bottom"
    : side === "bottom" ? "top"
      : side === "left" ? "right"
        : "left";
  return `${opposite}${alignment ? `-${alignment}` : ""}` as PopoverPlacement;
}

export type PopoverMode = "content" | "menu";
export type PopoverPlacement =
  | "top-start" | "top" | "top-end"
  | "right-start" | "right" | "right-end"
  | "bottom-start" | "bottom" | "bottom-end"
  | "left-start" | "left" | "left-end";

export interface PopoverTriggerProps {
  ref: (node: HTMLElement | null) => void;
  open: boolean;
  onClick: () => void;
  onToggle: () => void;
  "aria-expanded": boolean;
  "aria-controls": string;
  "aria-haspopup"?: "menu" | "dialog";
}

export interface PopoverProps {
  /** Render prop for the trigger. Spread its props onto the interactive trigger element. */
  trigger: (props: PopoverTriggerProps) => ReactNode;
  children: ReactNode;
  /** `menu` adds WAI-ARIA menu keyboard behavior; `content` is for arbitrary compact content. */
  mode?: PopoverMode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Anchor side and alignment. */
  placement?: PopoverPlacement;
  /** Additional class on the surface. */
  className?: string;
  /** Additional class on the positioned trigger wrapper. */
  rootClassName?: string;
  /** Additional class on the surface. Preferred over the legacy `className` alias. */
  panelClassName?: string;
  /** Accessible name for a menu or mobile sheet dialog. */
  ariaLabel?: string;
  /** Render as a bottom sheet on narrow screens. */
  mobileSheet?: boolean;
}

/**
 * An anchored surface for compact content and action menus. Menu mode provides
 * roving keyboard navigation; content mode remains flexible for text and forms.
 */
export function Popover({
  trigger,
  children,
  mode = "content",
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  className = "",
  rootClassName = "",
  panelClassName = "",
  ariaLabel,
  mobileSheet = false,
}: PopoverProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const hasFlippedForOpenRef = useRef(false);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [resolvedPlacement, setResolvedPlacement] = useState<PopoverPlacement>(placement);
  const [mobileSheetActive, setMobileSheetActive] = useState(
    () => mobileSheet
      && typeof window !== "undefined"
      && typeof window.matchMedia === "function"
      && window.matchMedia("(max-width: 759px)").matches,
  );
  const isOpen = open ?? internalOpen;

  function setOpen(next: boolean) {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }

  function close(returnFocus = false) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  function moveFocus(direction: 1 | -1) {
    const items = getFocusables(panelRef.current);
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[(index + direction + items.length) % items.length]?.focus();
  }

  function focusEdge(edge: "first" | "last") {
    const items = getFocusables(panelRef.current);
    if (items.length === 0) return;
    (edge === "first" ? items[0] : items[items.length - 1])?.focus();
  }

  useEffect(() => {
    if (!mobileSheet || typeof window === "undefined" || typeof window.matchMedia !== "function") {
      setMobileSheetActive(false);
      return;
    }
    const media = window.matchMedia("(max-width: 759px)");
    const updateMobileSheet = () => setMobileSheetActive(media.matches);
    updateMobileSheet();
    media.addEventListener?.("change", updateMobileSheet);
    return () => media.removeEventListener?.("change", updateMobileSheet);
  }, [mobileSheet]);

  useEffect(() => {
    setResolvedPlacement(placement);
    hasFlippedForOpenRef.current = false;
  }, [placement]);

  useEffect(() => {
    if (!isOpen) hasFlippedForOpenRef.current = false;
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen || mobileSheetActive || hasFlippedForOpenRef.current || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const side = resolvedPlacement.split("-")[0];
    const overflowsPreferredSide = (
      (side === "bottom" && rect.bottom > window.innerHeight)
      || (side === "top" && rect.top < 0)
      || (side === "right" && rect.right > window.innerWidth)
      || (side === "left" && rect.left < 0)
    );
    if (overflowsPreferredSide) {
      hasFlippedForOpenRef.current = true;
      setResolvedPlacement(oppositePlacement(resolvedPlacement));
    }
  }, [isOpen, mobileSheetActive, resolvedPlacement]);

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || (mode !== "menu" && !mobileSheetActive)) return;
    getFocusables(panelRef.current)[0]?.focus();
  }, [isOpen, mode, mobileSheetActive]);

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      close(true);
      return;
    }

    if (mode === "menu") {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!isOpen) setOpen(true);
        else moveFocus(1);
      } else if (event.key === "ArrowUp" && isOpen) {
        event.preventDefault();
        moveFocus(-1);
      } else if (event.key === "Home" && isOpen) {
        event.preventDefault();
        focusEdge("first");
      } else if (event.key === "End" && isOpen) {
        event.preventDefault();
        focusEdge("last");
      } else if (event.key === "Tab" && isOpen) {
        setOpen(false);
      }
      return;
    }

    if (mobileSheetActive && isOpen && event.key === "Tab") {
      const items = getFocusables(panelRef.current);
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  const triggerProps: PopoverTriggerProps = {
    ref: (node) => { triggerRef.current = node; },
    open: isOpen,
    onClick: () => setOpen(!isOpen),
    onToggle: () => setOpen(!isOpen),
    "aria-expanded": isOpen,
    "aria-controls": id,
    "aria-haspopup": mode === "menu" ? "menu" : mobileSheet ? "dialog" : undefined,
  };

  const panelClasses = [
    "ink-popover-panel",
    `ink-popover-panel--${resolvedPlacement}`,
    `ink-popover-panel--${mode}`,
    mobileSheet ? "ink-popover-panel--mobile-sheet" : "",
    className,
    panelClassName,
  ].filter(Boolean).join(" ");

  return (
    <div ref={rootRef} className={["ink-popover", isOpen ? "ink-popover--open" : "", rootClassName].filter(Boolean).join(" ")} onKeyDown={onKeyDown}>
      {trigger(triggerProps)}
      {isOpen ? (
        <>
          {mobileSheetActive ? <div className="ink-popover-scrim" aria-hidden="true" onClick={() => close(true)} /> : null}
          <div
            id={id}
            ref={panelRef}
            className={panelClasses}
            role={mode === "menu" ? "menu" : mobileSheetActive ? "dialog" : undefined}
            aria-label={ariaLabel}
            aria-modal={mobileSheetActive || undefined}
          >
            {children}
          </div>
        </>
      ) : null}
    </div>
  );
}

export interface PopoverMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/** Standard focusable action for a Popover in `menu` mode. */
export function PopoverMenuItem({ className = "", type = "button", children, ...props }: PopoverMenuItemProps) {
  return (
    <button type={type} role="menuitem" className={["ink-popover-item", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </button>
  );
}

/** @deprecated Use `Popover` directly. */
export const PopoverGeneral = Popover;
