import { useEffect, useId, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { IconClose } from "./icons";

export type DrawerSide = "left" | "right";
export type DrawerSize = "sm" | "md" | "lg";
export type DrawerBodyPadding = "none" | "sm" | "md";

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  ariaLabel?: string;
  header?: ReactNode;
  side?: DrawerSide;
  size?: DrawerSize;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
  bodyPadding?: DrawerBodyPadding;
  mobileSheet?: boolean;
  height?: string;
  maxHeight?: string;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const FOCUSABLE = 'a[href], button, textarea, input:not([type="hidden"]), select, summary, [tabindex]';

function getFocusables(panel: HTMLElement | null): HTMLElement[] {
  if (!panel) return [];
  const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => {
    if (element.tabIndex < 0 && !element.matches("summary:not([tabindex])")) return false;
    if (element.matches(":disabled")) return false;
    if (element.closest('[hidden], [inert], [aria-hidden="true"]')) return false;
    if (window.getComputedStyle(element).visibility !== "visible") return false;
    for (let ancestor: HTMLElement | null = element; ancestor && ancestor !== panel; ancestor = ancestor.parentElement) {
      if (window.getComputedStyle(ancestor).display === "none") return false;
      if (ancestor !== element && ancestor.matches("details:not([open])")
        && !ancestor.querySelector(":scope > summary")?.contains(element)) return false;
    }
    return true;
  });

  // Stacked ActionGroups can reverse both the visual order and native Tab order.
  for (const group of Array.from(panel.querySelectorAll<HTMLElement>(".ink-action-group")).reverse()) {
    const style = window.getComputedStyle(group);
    if (style.getPropertyValue("reading-flow") !== "flex-visual" || style.flexDirection !== "column-reverse") continue;
    const first = focusables.findIndex((element) => group.contains(element));
    if (first === -1) continue;
    const ordered = Array.from(group.children).reverse().flatMap((child) =>
      focusables.filter((element) => child.contains(element)),
    );
    focusables.splice(first, ordered.length, ...ordered);
  }

  return focusables;
}

export function Drawer({
  open,
  onClose,
  title,
  ariaLabel,
  header,
  side = "right",
  size = "md",
  closeOnBackdrop = true,
  closeOnEscape = true,
  children,
  footer,
  bodyPadding = "md",
  mobileSheet = true,
  height,
  maxHeight,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
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
    if (!open || !rendered) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    (getFocusables(panel)[0] ?? panel)?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, rendered]);

  useEffect(() => {
    if (!open || !rendered) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented) return;
      if (event.key === "Escape" && closeOnEscape) {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      const focusable = getFocusables(panel);
      if (focusable.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }
      const first = focusable[0]!;
      const last = focusable[focusable.length - 1]!;
      if (!panel?.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === panel)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === panel)) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [closeOnEscape, onClose, open, rendered]);

  if (!rendered) return null;
  const panelStyle = { "--ink-drawer-height": height, "--ink-drawer-max-height": maxHeight } as CSSProperties;

  return (
    <div className="ink-drawer-root" data-state={animationState}>
      {/* Not a button: the header close control is the labeled affordance, and a
          second control with the same name (that does nothing when
          `closeOnBackdrop` is false) only adds noise for AT users. */}
      <div
        className="ink-drawer-backdrop"
        aria-hidden="true"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <section
        ref={panelRef}
        className={["ink-drawer", `ink-drawer--${side}`, `ink-drawer--${size}`, mobileSheet ? "ink-drawer--mobile-sheet" : "", className].filter(Boolean).join(" ")}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        inert={!open}
        aria-label={ariaLabel}
        aria-labelledby={title && header === undefined ? titleId : undefined}
        tabIndex={-1}
      >
        {header === undefined ? (
          <header className={["ink-drawer-header", headerClassName].filter(Boolean).join(" ")}>
            {title ? <h2 id={titleId}>{title}</h2> : <span />}
            <button type="button" className="ink-drawer-close" aria-label="Close drawer" onClick={onClose}>
              <IconClose />
            </button>
          </header>
        ) : header ? <header className={["ink-drawer-header", headerClassName].filter(Boolean).join(" ")}>{header}</header> : null}
        <div className={["ink-drawer-body", `ink-drawer-body--padding-${bodyPadding}`, bodyClassName].filter(Boolean).join(" ")}>{children}</div>
        {footer ? <footer className={["ink-drawer-footer", footerClassName].filter(Boolean).join(" ")}>{footer}</footer> : null}
      </section>
    </div>
  );
}
