import { IconClose } from "./icons.jsx";

// Typed components extracted into their own modules; re-exported here so
// existing imports from "./ui.jsx" keep resolving. ModalFrame is intentionally
// NOT re-exported — it imports SectionHeading from this file, so re-exporting it
// here would create an import cycle. Import ModalFrame from "./modalFrame".
export { Button } from "./button";
export { IconButton } from "./iconButton";
export { Pill } from "./pill";
export { StatusBanner } from "./statusBanner";
export { Select } from "./select";
export { Popover, PopoverMenuItem } from "./popover";
export { PopoverMenu } from "./popoverMenu";

export function Panel({ children, className = "panel", ...props }) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
}

/**
 * @param {Object} props
 * @param {import("react").ReactNode} [props.eyebrow]
 * @param {import("react").ReactNode} [props.title]
 * @param {string} [props.titleId] id applied to the title heading (for `aria-labelledby`).
 * @param {import("react").ReactNode} [props.copy]
 * @param {boolean} [props.compact]
 * @param {import("react").ReactNode} [props.children]
 * @param {string} [props.className]
 */
export function SectionHeading({ eyebrow, title, titleId, copy, compact = false, children, className = "" }) {
  const classes = ["section-heading", compact ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? <h2 id={titleId}>{title}</h2> : null}
      </div>
      {copy ? <div className="section-heading-copy subtle">{copy}</div> : null}
      {children}
    </div>
  );
}

export function EmptyState({ children, className = "empty-state", ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function Toast({ id, message, tone, onDismiss }) {
  return (
    <article className={["toast", tone].filter(Boolean).join(" ")}>
      <div><strong>{message}</strong></div>
      <button type="button" aria-label="Dismiss" onClick={onDismiss}><IconClose /></button>
    </article>
  );
}

export function ToastRegion({ toasts = [], onDismiss }) {
  return (
    <div id="toastRegion" className="toast-region" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={() => onDismiss?.(toast.id)} />
      ))}
    </div>
  );
}

