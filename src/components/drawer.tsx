import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { IconClose } from "./icons";

export type DrawerSide = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
  mobileSheet?: boolean;
  height?: string;
  maxHeight?: string;
  className?: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function Drawer({
  open,
  onClose,
  title,
  side = "right",
  size = "md",
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  footer,
  mobileSheet = true,
  height,
  maxHeight,
  className = "",
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const [rendered, setRendered] = useState(open);
  const [animationState, setAnimationState] = useState<"open" | "closed">(open ? "open" : "closed");

  useEffect(() => {
    if (open) {
      setRendered(true);
      setAnimationState("closed");
      return;
    }
    setAnimationState("closed");
    const timer = window.setTimeout(() => setRendered(false), 220);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open || !rendered) return;
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => setAnimationState("open"));
    });
    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
    };
  }, [open, rendered]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    previousFocus.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []);
      if (focusable.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeOnEscape, onClose, open]);

  if (!rendered) return null;
  const panelStyle = { "--ink-drawer-height": height, "--ink-drawer-max-height": maxHeight } as CSSProperties;

  return (
    <div className="ink-drawer-root" data-state={animationState} role="presentation">
      <button
        type="button"
        className="ink-drawer-backdrop"
        aria-label="Close drawer"
        tabIndex={open ? 0 : -1}
        onClick={() => closeOnBackdrop && onClose()}
      />
      <section
        ref={panelRef}
        className={["ink-drawer", `ink-drawer--${side}`, `ink-drawer--${size}`, mobileSheet ? "ink-drawer--mobile-sheet" : "", className].filter(Boolean).join(" ")}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        aria-labelledby={title ? titleId : undefined}
        tabIndex={-1}
      >
        <header className="ink-drawer-header">
          {title ? <h2 id={titleId}>{title}</h2> : <span />}
          <button type="button" className="ink-drawer-close" aria-label="Close drawer" onClick={onClose}>
            <IconClose />
          </button>
        </header>
        <div className="ink-drawer-body">{children}</div>
        {footer ? <footer className="ink-drawer-footer">{footer}</footer> : null}
      </section>
    </div>
  );
}
