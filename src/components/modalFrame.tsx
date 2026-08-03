import { useEffect, useId, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { Button } from "./button";
import { IconClose } from "./icons";
import { SectionHeading } from "./ui";

export type ModalSize = "default" | "compact" | "settings";

const MODAL_SIZE_CLASSES: Record<ModalSize, string> = {
  default: "modal-card panel modal-panel modal-panel--wide",
  compact: "modal-card panel modal-panel modal-panel--compact",
  settings: "modal-card panel modal-panel--settings",
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export interface ModalFrameProps {
  id?: string;
  /**
   * id of the element that labels the dialog (`aria-labelledby`). Generated
   * automatically from `title` when omitted — only set this to point at a
   * heading you render yourself.
   */
  titleId?: string;
  /** Heading rendered at the top of the modal card. */
  title?: ReactNode;
  /** Accessible name, for dialogs with no visible `title`. */
  ariaLabel?: string;
  /** Called when the backdrop, close button, or Escape is activated. */
  onClose?: () => void;
  children?: ReactNode;
  /** Preset card sizing. */
  size?: ModalSize;
  /** Overrides the size preset's card class entirely. */
  cardClassName?: string;
  /** id of the element that describes the dialog (`aria-describedby`). */
  describedBy?: string;
  /** Whether the modal is visible. */
  open?: boolean;
  /** Renders the header close control. Defaults to `true`. */
  showCloseButton?: boolean;
  /** Accessible label for the close control. */
  closeLabel?: string;
  className?: string;
}

/**
 * A dialog surface with a titled header and close control. When `open` it:
 * moves focus into the dialog, traps Tab within it, closes on Escape, locks
 * background scroll, and restores focus to the previously focused element on
 * close.
 *
 * Note: intentionally rendered in place (not portalled). `.modal` is
 * `position: fixed`, and portalling to `document.body` would break Storybook's
 * canvas rendering, which relies on the story container to scope fixed
 * positioning. Consumers who need portal behavior can wrap it themselves.
 */
export function ModalFrame({
  id,
  titleId,
  title,
  ariaLabel,
  onClose,
  children,
  size = "default",
  cardClassName,
  describedBy,
  open = false,
  showCloseButton = true,
  closeLabel = "Close",
  className = "",
}: ModalFrameProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const generatedTitleId = useId();
  const resolvedTitleId = titleId ?? (title != null ? generatedTitleId : undefined);
  const resolvedCardClass = cardClassName ?? MODAL_SIZE_CLASSES[size] ?? MODAL_SIZE_CLASSES.default;
  const classes = ["modal", open ? "" : "hidden", className].filter(Boolean).join(" ");

  useEffect(() => {
    if (!open) return;
    const card = cardRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Move focus into the dialog (first focusable, else the card itself).
    const focusables = card ? Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)) : [];
    (focusables[0] ?? card)?.focus();

    // Lock background scroll while open.
    const body = document.body;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    // Hide everything outside the dialog from assistive tech, so the virtual
    // cursor can't wander into the page behind it.
    const root = rootRef.current;
    const inerted: HTMLElement[] = [];
    if (root) {
      for (let node: HTMLElement | null = root; node && node !== body; node = node.parentElement) {
        for (const sibling of Array.from(node.parentElement?.children ?? [])) {
          if (sibling === node || !(sibling instanceof HTMLElement)) continue;
          if (sibling.hasAttribute("aria-hidden")) continue;
          sibling.setAttribute("aria-hidden", "true");
          inerted.push(sibling);
        }
      }
    }

    return () => {
      body.style.overflow = previousOverflow;
      for (const element of inerted) element.removeAttribute("aria-hidden");
      previouslyFocused?.focus?.();
    };
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!open) return;
    if (event.key === "Escape") {
      event.stopPropagation();
      onClose?.();
      return;
    }
    if (event.key !== "Tab") return;

    const card = cardRef.current;
    if (!card) return;
    const items = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
      (el) => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement,
    );
    if (items.length === 0) {
      event.preventDefault();
      card.focus();
      return;
    }
    const first = items[0]!;
    const last = items[items.length - 1]!;
    const active = document.activeElement;
    if (event.shiftKey) {
      if (active === first || !card.contains(active)) {
        event.preventDefault();
        last.focus();
      }
    } else if (active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div
      id={id}
      ref={rootRef}
      className={classes}
      role={open ? "dialog" : undefined}
      aria-modal={open ? "true" : undefined}
      aria-labelledby={resolvedTitleId}
      aria-label={resolvedTitleId ? undefined : ariaLabel}
      aria-describedby={describedBy}
      aria-hidden={open ? undefined : "true"}
      onKeyDown={handleKeyDown}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className={resolvedCardClass} ref={cardRef} tabIndex={-1}>
        <SectionHeading title={title} titleId={resolvedTitleId}>
          {showCloseButton ? (
            <Button variant="ghost" className="modal-close-button" aria-label={closeLabel} onClick={onClose}>
              <IconClose />
            </Button>
          ) : null}
        </SectionHeading>
        {children}
      </div>
    </div>
  );
}
