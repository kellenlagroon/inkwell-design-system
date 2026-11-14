import { useRef, useState } from "react";
import type { ReactNode } from "react";
import { IconClose } from "./icons";
import { Popover } from "./popover";
import type { PopoverPlacement } from "./popover";

export type StatusDetailsTone = "neutral" | "success" | "warning" | "danger";

export interface StatusDetailsPopoverProps {
  /** Visible status name and default dialog title. */
  label: string;
  /** Decorative icon; the label carries the accessible name. */
  icon: ReactNode;
  /** Short explanation shown in the trigger. */
  summary?: string;
  title?: ReactNode;
  description?: ReactNode;
  evidence?: ReactNode;
  actions?: ReactNode;
  tone?: StatusDetailsTone;
  placement?: PopoverPlacement;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

/** Reusable presentation for a status and its supporting details. */
export function StatusDetailsPopover({
  label,
  icon,
  summary,
  title,
  description,
  evidence,
  actions,
  tone = "neutral",
  placement = "bottom-start",
  open,
  defaultOpen = false,
  onOpenChange,
  className = "",
}: StatusDetailsPopoverProps) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;
  const setOpen = (next: boolean) => {
    if (open === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setOpen}
      dialog
      mobileSheet
      placement={placement}
      ariaLabel={`${label} details`}
      rootClassName={["ink-status-details", className].filter(Boolean).join(" ")}
      panelClassName="ink-status-details__panel"
      trigger={({ ref, onClick, onToggle: _onToggle, open: triggerOpen, ...triggerProps }) => (
        <button
          ref={(node) => { triggerRef.current = node; ref(node); }}
          type="button"
          className={["ink-status-details__trigger", `ink-status-details__trigger--${tone}`].join(" ")}
          onClick={onClick}
          {...triggerProps}
          aria-expanded={triggerOpen}
        >
          <span className="ink-status-details__icon" aria-hidden="true">{icon}</span>
          <span className="ink-status-details__copy">
            <strong>{label}</strong>
            {summary ? <span>{summary}</span> : null}
          </span>
        </button>
      )}
    >
      <div className="ink-status-details__heading">
        <h2>{title ?? label}</h2>
        <button type="button" className="ink-status-details__close" aria-label="Close details" onClick={close}>
          <IconClose />
        </button>
      </div>
      {description ? <div className="ink-status-details__description">{description}</div> : null}
      {evidence ? <div className="ink-status-details__evidence">{evidence}</div> : null}
      {actions ? <div className="ink-status-details__actions">{actions}</div> : null}
    </Popover>
  );
}
