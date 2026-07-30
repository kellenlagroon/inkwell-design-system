import { useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { IconClose } from "./icons";

export type StatusBannerTone = "info" | "success" | "warning" | "danger" | "neutral" | "brand" | "error";

export interface StatusBannerProps {
  /** Banner copy. When empty/falsy the banner renders nothing. */
  message?: ReactNode;
  /** Semantic tone. `success` uses the default styling (no modifier). */
  tone?: StatusBannerTone;
  /** When provided, renders a dismiss button that calls this handler. */
  onDismiss?: () => void;
}

/**
 * An inline, persistent status message for a surface or form. Use for state
 * that should stay visible (vs. a transient Toast).
 */
export function StatusBanner({ message, tone, onDismiss }: StatusBannerProps) {
  const messageRef = useRef<HTMLSpanElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const resolvedTone = tone === "error" ? "danger" : tone;
  const toneClass = resolvedTone && resolvedTone !== "success" ? `status-banner--${resolvedTone}` : "";

  useLayoutEffect(() => {
    const element = messageRef.current;
    if (!element) return undefined;

    const updateLineCount = () => {
      const range = document.createRange();
      range.selectNodeContents(element);
      if (typeof range.getClientRects === "function") {
        setIsMultiline(range.getClientRects().length > 1);
      }
    };

    updateLineCount();
    const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(updateLineCount);
    observer?.observe(element);
    window.addEventListener("resize", updateLineCount);

    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", updateLineCount);
    };
  }, [message]);

  if (!message) return null;

  return (
    <div className={["status-banner", toneClass, isMultiline ? "status-banner--multiline" : ""].filter(Boolean).join(" ")}>
      <span ref={messageRef}>{message}</span>
      {onDismiss ? (
        <button type="button" className="banner-dismiss" aria-label="Dismiss" onClick={onDismiss}>
          <IconClose />
        </button>
      ) : null}
    </div>
  );
}
