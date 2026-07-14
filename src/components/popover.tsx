import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";

export interface PopoverTriggerProps {
  ref: (node: HTMLElement | null) => void;
  "aria-expanded": boolean;
  "aria-controls": string;
  onClick: () => void;
}

export interface PopoverProps {
  trigger: (props: PopoverTriggerProps) => ReactNode;
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  className?: string;
  mobileSheet?: boolean;
}

export function Popover({
  trigger,
  children,
  open,
  defaultOpen = false,
  onOpenChange,
  placement = "bottom-start",
  className = "",
  mobileSheet = false,
}: PopoverProps) {
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  function setOpen(next: boolean) {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  }

  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={rootRef} className="ink-popover">
      {trigger({
        ref: (node) => { triggerRef.current = node; },
        "aria-expanded": isOpen,
        "aria-controls": id,
        onClick: () => setOpen(!isOpen),
      })}
      {isOpen ? (
        <div id={id} className={["ink-popover-panel", `ink-popover-panel--${placement}`, mobileSheet ? "ink-popover-panel--mobile-sheet" : "", className].filter(Boolean).join(" ")}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

export const PopoverGeneral = Popover;
