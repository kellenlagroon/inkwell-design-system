import { useId, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { IconArrowDown } from "./icons";

export type CollapsibleStyle = CSSProperties &
  Record<`--ink-collapsible-${string}`, string | number | undefined>;

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
  /** Adds a hairline divider under the row — matches the app's stacked submission rows. */
  divided?: boolean;
  /** The revealed content. */
  children?: ReactNode;
  id?: string;
  className?: string;
  /** Scoped visual overrides using the `--ink-collapsible-*` CSS variables. */
  style?: CollapsibleStyle;
}

/**
 * A disclosure: the whole header is the toggle button, with a chevron that
 * rotates when open. The chevron sits in a contained box that carries the
 * hover/focus fill, so the affordance reads as a control even though the full
 * row is clickable. Works controlled (`open` + `onOpenChange`) or uncontrolled
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
  divided = false,
  children,
  id,
  className = "",
  style,
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
    <div className={["collapsible", divided ? "collapsible--divided" : "", className].filter(Boolean).join(" ")} style={style}>
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
        <span className="collapsible-chevron-box" aria-hidden="true">
          <IconArrowDown
            className={["collapsible-chevron", isOpen ? "collapsible-chevron--open" : ""].filter(Boolean).join(" ")}
          />
        </span>
      </button>
      <div id={contentId} className="collapsible-content" role="region" aria-labelledby={triggerId} hidden={!isOpen}>
        {children}
      </div>
    </div>
  );
}
