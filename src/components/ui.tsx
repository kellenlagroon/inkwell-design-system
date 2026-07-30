import type { HTMLAttributes, ReactNode } from "react";
import { IconClose } from "./icons.jsx";

// Typed components extracted into their own modules; re-exported here so
// existing imports from "./ui" keep resolving. ModalFrame is intentionally
// NOT re-exported — it imports SectionHeading from this file, so re-exporting it
// here would create an import cycle. Import ModalFrame from "./modalFrame".
export { Button } from "./button";
export { IconButton } from "./iconButton";
export { Pill } from "./pill";
export { StatusBanner } from "./statusBanner";
export { Select } from "./select";
export { Popover, PopoverMenuItem } from "./popover";

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

/** A section-level surface. Sibling to the content-level `Card`. */
export function Panel({ className = "", children, ...props }: PanelProps) {
  return (
    <section className={["panel", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </section>
  );
}

export interface SectionHeadingProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Small label above the title. */
  eyebrow?: ReactNode;
  /** The heading text. */
  title?: ReactNode;
  /** id applied to the title heading, for `aria-labelledby`. */
  titleId?: string;
  /** Supporting copy below the title. */
  copy?: ReactNode;
  /** Tighter vertical rhythm. */
  compact?: boolean;
  /** Trailing content, typically actions. */
  children?: ReactNode;
}

/** A titled section header with optional eyebrow, supporting copy, and actions. */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  copy,
  compact = false,
  className = "",
  children,
  ...props
}: SectionHeadingProps) {
  const classes = ["section-heading", compact ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...props}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? <h2 id={titleId}>{title}</h2> : null}
      </div>
      {copy ? <div className="section-heading-copy subtle">{copy}</div> : null}
      {children}
    </div>
  );
}

export interface EmptyStateProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** Placeholder content for a region with nothing to show yet. */
export function EmptyState({ className = "", children, ...props }: EmptyStateProps) {
  return (
    <div className={["empty-state", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export type ToastTone = "success" | "error" | "warning" | "danger" | "info" | "brand" | "neutral";

export interface ToastProps extends Omit<HTMLAttributes<HTMLElement>, "id" | "title"> {
  /** Stable identifier, used as the React key by `ToastRegion`. */
  id?: string;
  /** The message body. */
  message?: ReactNode;
  /** Semantic tone. Drives the border color. */
  tone?: ToastTone;
  /** Renders a dismiss control that calls this handler. */
  onDismiss?: () => void;
  /** Accessible label for the dismiss control. */
  dismissLabel?: string;
}

/**
 * A transient notification. Use inside a `ToastRegion` so the message is
 * announced; for a message that should stay on screen, use `StatusBanner`.
 */
export function Toast({
  id,
  message,
  tone,
  onDismiss,
  dismissLabel = "Dismiss",
  className = "",
  ...props
}: ToastProps) {
  return (
    <article
      className={["toast", tone ?? "", className].filter(Boolean).join(" ")}
      // Atomic belongs on the individual toast: the region announces only what
      // changed, rather than re-reading every queued toast on each update.
      aria-atomic="true"
      {...props}
    >
      <div><strong>{message}</strong></div>
      {onDismiss ? (
        <button type="button" aria-label={dismissLabel} onClick={onDismiss}>
          <IconClose />
        </button>
      ) : null}
    </article>
  );
}

export interface ToastItem {
  id: string;
  message?: ReactNode;
  tone?: ToastTone;
}

export interface ToastRegionProps extends HTMLAttributes<HTMLDivElement> {
  /** The queue to render, in order. */
  toasts?: ToastItem[];
  /** Called with the dismissed toast's id. */
  onDismiss?: (id: string) => void;
}

/**
 * The persistent live region that hosts toasts. It must stay mounted even when
 * empty — a live region added at the same moment as its content is often not
 * announced.
 *
 * Announcements are polite for every tone. Routing problem tones to a separate
 * `assertive` region would group toasts by urgency and so change their on-screen
 * order; that is deliberately not done here.
 */
export function ToastRegion({ toasts = [], onDismiss, className = "", ...props }: ToastRegionProps) {
  return (
    <div
      className={["toast-region", className].filter(Boolean).join(" ")}
      role="status"
      aria-live="polite"
      {...props}
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={onDismiss ? () => onDismiss(toast.id) : undefined} />
      ))}
    </div>
  );
}
