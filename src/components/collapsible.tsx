import { useId, useState } from "react";
import type { ReactNode } from "react";
import { IconArrowDown } from "./icons";

export interface CollapsibleProps {
  /** The trigger's main label. */
  title: ReactNode;
  /** Optional secondary line under the title. */
  description?: ReactNode;
  /** Optional trailing meta (e.g. a count), before the chevron. */
  meta?: ReactNode;
  /** Uncontrolled initial open state. Ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called with the next open state when the trigger is activated. */
  onOpenChange?: (open: boolean) => void;
  /** The revealed content. */
  children?: ReactNode;
  id?: string;
  className?: string;
}

/**
 * A disclosure: a header that toggles a region of content, with a chevron that
 * rotates when open. Works controlled (`open` + `onOpenChange`) or uncontrolled
 * (`defaultOpen`). The content stays mounted and is hidden via the `hidden`
 * attribute so `aria-controls` always resolves.
 */
export function Collapsible({
  title,
  description,
  meta,
  defaultOpen = false,
  open,
  onOpenChange,
  children,
  id,
  className = "",
}: CollapsibleProps) {
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  function toggle() {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }

  return (
    <div className={["collapsible", className].filter(Boolean).join(" ")}>
      <button
        type="button"
        id={triggerId}
        className="collapsible-trigger"
        aria-expanded={isOpen ? "true" : "false"}
        aria-controls={contentId}
        onClick={toggle}
      >
        <span className="collapsible-main">
          <strong>{title}</strong>
          {description ? <span className="subtle">{description}</span> : null}
        </span>
        {meta ? <span className="collapsible-meta">{meta}</span> : null}
        <IconArrowDown
          className={["collapsible-chevron", isOpen ? "collapsible-chevron--open" : ""].filter(Boolean).join(" ")}
          aria-hidden="true"
        />
      </button>
      <div id={contentId} className="collapsible-content" role="region" aria-labelledby={triggerId} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
