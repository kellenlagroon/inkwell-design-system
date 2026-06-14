import { useEffect, useRef, useState } from "react";
import { IconArrowDown, IconCheck, IconClose } from "./icons.jsx";

export function Button({ children, className = "primary-button", type = "button", ...props }) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}

export function Panel({ children, className = "panel", ...props }) {
  return (
    <section className={className} {...props}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, copy, compact = false, children, className = "" }) {
  const classes = ["section-heading", compact ? "compact" : "", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        {title ? <h2>{title}</h2> : null}
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

const MODAL_SIZE_CLASSES = {
  default: "modal-card panel modal-panel",
  compact: "modal-card panel modal-panel modal-panel--compact",
};

export function ModalFrame({
  id,
  titleId,
  title,
  onClose,
  children,
  size = "default",
  cardClassName,
  describedBy,
  open = false,
  className = "",
}) {
  const resolvedCardClass = cardClassName ?? MODAL_SIZE_CLASSES[size] ?? MODAL_SIZE_CLASSES.default;
  const classes = ["modal", open ? "" : "hidden", className].filter(Boolean).join(" ");

  return (
    <div
      id={id}
      className={classes}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={describedBy}
      aria-hidden={open ? "false" : "true"}
    >
      <div className="modal-backdrop" onClick={onClose} />
      <div className={resolvedCardClass}>
        <SectionHeading title={title}>
          <Button className="ghost-button modal-close-button" aria-label="Close" onClick={onClose}>
            <IconClose />
          </Button>
        </SectionHeading>
        {children}
      </div>
    </div>
  );
}

export function StatusBanner({ message, tone, onDismiss }) {
  if (!message) return null;
  const toneClass = tone === "error" ? "error" : tone === "warning" ? "warning" : "";

  return (
    <div className={["status-banner", toneClass].filter(Boolean).join(" ")}>
      <span>{message}</span>
      {onDismiss ? (
        <button type="button" className="banner-dismiss" aria-label="Dismiss" onClick={onDismiss}>
          <IconClose />
        </button>
      ) : null}
    </div>
  );
}

export function Toast({ id, message, tone, onDismiss }) {
  return (
    <article className={["toast", tone].filter(Boolean).join(" ")}>
      <div>
        <strong>{message}</strong>
        {id ? <div className="subtle">#{id}</div> : null}
      </div>
      <button type="button" aria-label="Dismiss" onClick={onDismiss}>
        <IconClose />
      </button>
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

export function Pill({ tone = "default", children, className = "", ...props }) {
  const toneClass = ["pill", tone !== "default" ? tone : ""].filter(Boolean).join(" ");
  const classes = [toneClass, className].filter(Boolean).join(" ");
  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

export function IconButton({ icon, size, className = "", ...props }) {
  const sizeClass = size === "sm" ? "icon-btn--sm" : size === "lg" ? "icon-btn--lg" : "";
  return (
    <button type="button" className={["icon-btn", sizeClass, className].filter(Boolean).join(" ")} {...props}>
      {icon}
    </button>
  );
}

export function Select({
  value,
  onChange,
  options = [],
  placeholder = "",
  variant = "form",
  disabled = false,
  "aria-label": ariaLabel,
  id,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function handleOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  function handleSelect(option) {
    setOpen(false);
    onChange?.(option.value);
  }

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label ?? placeholder;
  const isPlaceholder = !selectedOption;
  const containerClass = ["cselect", variant === "control" ? "cselect--control" : "", open ? "open" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass} ref={ref}>
      <button
        type="button"
        className="cselect-trigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        aria-label={ariaLabel}
        id={id}
        onClick={() => setOpen((current) => !current)}
      >
        <span className={["cselect-value", isPlaceholder ? "placeholder" : ""].filter(Boolean).join(" ")}>
          {displayLabel}
        </span>
        <IconArrowDown className="cselect-chevron" />
      </button>
      {open && (
        <div className="cselect-dropdown" role="listbox">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={[
                "cselect-option",
                option.value === value ? "selected" : "",
                option.disabled ? "cselect-option--disabled" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              role="option"
              aria-selected={option.value === value ? "true" : "false"}
              disabled={option.disabled}
              onClick={() => handleSelect(option)}
            >
              <span>{option.label}</span>
              {option.value === value && <IconCheck className="check-icon" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function PopoverMenu({
  trigger,
  children,
  menuClassName = "header-account-menu",
  popoverClassName = "header-account-popover",
  menuRole = "menu",
  menuLabel = "Menu",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    function handleOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    }
    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, [open]);

  return (
    <div ref={ref} className={[menuClassName, open ? "open" : ""].filter(Boolean).join(" ")}>
      {trigger({ open, onToggle: () => setOpen((current) => !current) })}
      <div className={popoverClassName} role={menuRole} aria-label={menuLabel}>
        {children}
      </div>
    </div>
  );
}
