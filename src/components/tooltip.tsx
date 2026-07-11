import { cloneElement, isValidElement, useId, useState } from "react";
import type { KeyboardEvent, ReactElement, ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  /** The tooltip body, revealed on hover/focus. */
  content: ReactNode;
  /** Which side of the trigger the popover appears on. Defaults to "top". */
  placement?: TooltipPlacement;
  /**
   * The trigger. Defaults to a small round "i" info button. Pass a custom
   * element (it should be focusable so keyboard users can reveal the tooltip);
   * it will be wired to the content via `aria-describedby`.
   */
  trigger?: ReactNode;
  /** Accessible label for the default info trigger. Defaults to "More information". */
  triggerLabel?: string;
  id?: string;
  className?: string;
}

/**
 * A tooltip: a trigger paired with a popover shown above it on hover or focus.
 * Seeded from the app's info tooltip. The reveal is CSS-driven (`:hover` /
 * `:focus-within`), so it works for pointer and keyboard alike; `Escape`
 * dismisses it while focused. The content carries `role="tooltip"` and is wired
 * to the trigger with `aria-describedby`.
 */
export function Tooltip({
  content,
  placement = "top",
  trigger,
  triggerLabel = "More information",
  id,
  className = "",
}: TooltipProps) {
  const generatedId = useId();
  const contentId = `${id ?? generatedId}-content`;

  // Escape hides the tooltip even while hovered/focused; leaving or blurring the
  // wrapper re-arms it so the next hover/focus reveals it again.
  const [dismissed, setDismissed] = useState(false);

  function handleKeyDown(event: KeyboardEvent<HTMLSpanElement>) {
    if (event.key === "Escape" && !dismissed) setDismissed(true);
  }

  function rearm() {
    if (dismissed) setDismissed(false);
  }

  const triggerNode =
    trigger != null ? (
      isValidElement(trigger) ? (
        cloneElement(trigger as ReactElement<{ "aria-describedby"?: string }>, { "aria-describedby": contentId })
      ) : (
        trigger
      )
    ) : (
      <button type="button" className="info-tooltip-trigger" aria-describedby={contentId} aria-label={triggerLabel}>
        i
      </button>
    );

  return (
    <span
      className={["info-tooltip", className].filter(Boolean).join(" ")}
      data-tooltip-dismissed={dismissed ? "" : undefined}
      onKeyDown={handleKeyDown}
      onMouseLeave={rearm}
      onBlur={rearm}
    >
      {triggerNode}
      <span id={contentId} role="tooltip" className="info-tooltip-content" data-placement={placement}>
        {content}
      </span>
    </span>
  );
}
